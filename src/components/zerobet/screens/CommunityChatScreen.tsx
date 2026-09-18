"use client";

/**
 * CommunityChatScreen — real-time community chat for Zerobet.
 *
 * Connects to the socket.io mini-service on port 3003 via the gateway
 * pattern `io("/?XTransformPort=3003")`. Premium-only (free users see a
 * paywall overlay). Three rooms: general / crisis-support / veterans.
 *
 * NOTE on naming: the store already has `chatMessages`/`addChatMessage` for
 * the Atlas AI coach. To avoid a type clash we use `chatRoomMessages` +
 * `addChatRoomMessage` + `clearChatRoomMessages` for community chat.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io, type Socket } from "socket.io-client";
import {
  ChevronLeft,
  MessageCircle,
  Send,
  Shuffle,
  Users,
  Wifi,
  WifiOff,
  Loader2,
  Info,
  ShieldAlert,
  Phone,
  Lock,
  ChevronDown,
  ChevronUp,
  Flag,
} from "lucide-react";
import { toast } from "sonner";
import {
  useStore,
  type ChatRoomMessage,
  type Plan,
} from "@/store/zerobet-store";
import { useT, useLanguage } from "@/lib/i18n/useT";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

/* ========================================================================
   Types — strict typing for socket payloads
   ======================================================================== */

type RoomKey = "general" | "crisis-support" | "veterans";
type ConnectionStatus = "connecting" | "connected" | "disconnected";

interface ServerChatMessage {
  id: string;
  nickname: string;
  content: string;
  timestamp: string;
  color: string;
  type: "user" | "system";
  room: string;
}

interface JoinPayload {
  nickname: string;
  room: RoomKey;
  streakDays: number;
  color: string;
}

interface MessagePayload {
  nickname: string;
  content: string;
  room: RoomKey;
  color: string;
}

interface UserEventPayload {
  nickname: string;
  color?: string;
  streakDays?: number;
}

interface TypingPayload {
  nickname: string;
  room: string;
}

/* ========================================================================
   Constants
   ======================================================================== */

const ROOMS: {
  key: RoomKey;
  labelKey: string;
  emoji: string;
  color: string;
  descKey: string;
  minStreak?: number;
}[] = [
  {
    key: "general",
    labelKey: "chatRoomGeneralLabel",
    emoji: "💬",
    color: "#64D2FF",
    descKey: "chatRoomGeneralDesc",
  },
  {
    key: "crisis-support",
    labelKey: "chatRoomCrisisLabel",
    emoji: "🆘",
    color: "#FF3B30",
    descKey: "chatRoomCrisisDesc",
  },
  {
    key: "veterans",
    labelKey: "chatRoomVeteransLabel",
    emoji: "👑",
    color: "#FBBF24",
    descKey: "chatRoomVeteransDesc",
    minStreak: 90,
  },
];

const ROOM_BY_KEY: Record<RoomKey, (typeof ROOMS)[number]> = Object.fromEntries(
  ROOMS.map((r) => [r.key, r])
) as Record<RoomKey, (typeof ROOMS)[number]>;

/** Nickname palette — deterministic per nickname hash. */
const NICKNAME_COLORS = [
  "#FF3B30",
  "#FF9500",
  "#FBBF24",
  "#4ADE80",
  "#64D2FF",
  "#BF5AF2",
  "#FF2D55",
  "#5E5CE6",
  "#30D158",
  "#FF6B6B",
];

const NICKNAME_ADJECTIVES = [
  "Fort",
  "Calme",
  "Brave",
  "Libre",
  "Serein",
  "Fier",
  "Patient",
  "Audacieux",
  "Determiné",
  "Lumineux",
];

const NICKNAME_ANIMALS = [
  "Lion",
  "Tigre",
  "Aigle",
  "Panthère",
  "Loup",
  "Faucon",
  "Ours",
  "Renard",
  "Phenix",
  "Dragon",
];

const COMMUNITY_RULES_KEYS = [
  "chatRule1",
  "chatRule2",
  "chatRule3",
  "chatRule4",
  "chatRule5",
];

const QUICK_REACTIONS = ["💪", "❤️", "🙏", "🔥", "👏"];

const MAX_MESSAGE_LENGTH = 500;
const MIN_NICKNAME_LENGTH = 3;
const MAX_NICKNAME_LENGTH = 20;
const MAX_STORED_MESSAGES = 100;
const TYPING_DEBOUNCE_MS = 2000;

/* ========================================================================
   Helpers
   ======================================================================== */

function formatTime(timestamp: string, lang: string = "fr"): string {
  try {
    const d = new Date(timestamp);
    if (Number.isNaN(d.getTime())) return "";
    const locale = lang === "en" ? "en-GB" : lang === "es" ? "es-ES" : "fr-FR";
    return d.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function getNicknameColor(nickname: string): string {
  if (!nickname) return "#9CA3AF";
  return NICKNAME_COLORS[hashString(nickname) % NICKNAME_COLORS.length];
}

function generateRandomNickname(): string {
  const adj =
    NICKNAME_ADJECTIVES[Math.floor(Math.random() * NICKNAME_ADJECTIVES.length)];
  const animal =
    NICKNAME_ANIMALS[Math.floor(Math.random() * NICKNAME_ANIMALS.length)];
  // Random 2-digit suffix for uniqueness.
  const suffix = Math.floor(10 + Math.random() * 90);
  return `${adj}${animal}${suffix}`;
}

const LEGACY_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
};

/**
 * Decode HTML entities left over from the old server-side escaping era
 * (pre-2.0.2 messages stored `&#39;` / `&amp;#39;` literally). Runs twice
 * to also repair double-escaped text.
 */
function decodeLegacyEntities(s: string): string {
  let out = s;
  for (let i = 0; i < 2; i++) {
    out = out.replace(
      /&(?:amp|lt|gt|quot|#39|#x27);/g,
      (m) => LEGACY_ENTITIES[m] ?? m
    );
  }
  return out;
}

function sanitizeForDisplay(s: string): string {
  // Messages render through React text nodes, which never interpret HTML,
  // so no escaping is needed (escaping caused visible `&#39;` artifacts —
  // bug found in QA). We still normalize: strip control chars, cap length,
  // and repair legacy entity-escaped text.
  const cleaned = s
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .slice(0, 500);
  return decodeLegacyEntities(cleaned);
}

function isPremiumPlan(plan: Plan): boolean {
  return plan !== "free";
}

/* ========================================================================
   Sub-components
   ======================================================================== */

interface StatusDotProps {
  status: ConnectionStatus;
}

function StatusDot({ status }: StatusDotProps) {
  const t = useT();
  const color =
    status === "connected"
      ? "#4ADE80"
      : status === "connecting"
        ? "#FBBF24"
        : "#FF3B30";
  const label =
    status === "connected"
      ? t("chatConnected")
      : status === "connecting"
        ? t("chatConnecting")
        : t("chatDisconnected");
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
      aria-label={label}
    >
      <span className="relative flex items-center justify-center">
        <span
          className="absolute w-2 h-2 rounded-full animate-ping opacity-60"
          style={{ background: color }}
        />
        <span
          className="relative w-2 h-2 rounded-full"
          style={{ background: color }}
        />
      </span>
      <span className="text-[10px] text-white/70 font-medium">{label}</span>
    </span>
  );
}

interface RoomTabProps {
  room: (typeof ROOMS)[number];
  isActive: boolean;
  activeUsers: number;
  isLocked: boolean;
  onSelect: () => void;
}

function RoomTab({ room, isActive, activeUsers, isLocked, onSelect }: RoomTabProps) {
  const t = useT();
  return (
    <button
      onClick={onSelect}
      disabled={isLocked}
      className={`relative shrink-0 px-3.5 py-2 rounded-2xl flex items-center gap-2 text-sm font-medium transition-all btn-press ${
        isActive
          ? "text-white"
          : isLocked
            ? "text-white/30"
            : "text-white/70 hover:text-white"
      }`}
      style={
        isActive
          ? {
              background: `linear-gradient(135deg, ${room.color}40, ${room.color}20)`,
              boxShadow: `0 0 12px ${room.color}40, inset 0 0 0 1px ${room.color}50`,
            }
          : {
              background: "rgba(255,255,255,0.04)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            }
      }
      aria-pressed={isActive}
      aria-disabled={isLocked}
    >
      <span className="text-base leading-none">{room.emoji}</span>
      <span className="font-[family-name:var(--font-poppins)]">{t(room.labelKey)}</span>
      <span
        className="text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
        style={{
          background: isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
          color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
        }}
      >
        {isLocked ? (
          <Lock size={10} />
        ) : (
          <>
            <Users size={10} />
            {activeUsers}
          </>
        )}
      </span>
    </button>
  );
}

interface MessageBubbleProps {
  msg: ChatRoomMessage;
  isMine: boolean;
  isPremium: boolean;
  onReact: (msg: ChatRoomMessage, emoji: string) => void;
}

function MessageBubble({ msg, isMine, isPremium, onReact }: MessageBubbleProps) {
  const t = useT();
  const language = useLanguage();
  const [showReactions, setShowReactions] = useState(false);
  const initial = (msg.nickname || "?").charAt(0).toUpperCase();
  const color = msg.color || getNicknameColor(msg.nickname);

  if (msg.type === "system") {
    return (
      <div className="flex justify-center my-2">
        <span className="text-[11px] italic text-white/40 px-3 py-1 rounded-full bg-white/[0.03]">
          {msg.content}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className={`flex gap-2 px-1 ${isMine ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}99)`,
          boxShadow: `0 2px 8px ${color}40`,
        }}
        aria-hidden
      >
        {initial}
      </div>
      <div className={`max-w-[78%] ${isMine ? "items-end" : "items-start"} flex flex-col`}>
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className="text-xs font-semibold font-[family-name:var(--font-poppins)]"
            style={{ color }}
          >
            {isMine ? t("chatYou") : msg.nickname}
          </span>
          <span className="text-[10px] text-white/30">
            {formatTime(msg.timestamp, language)}
          </span>
        </div>
        <div
          onDoubleClick={() => setShowReactions((v) => !v)}
          className={`relative rounded-2xl px-3.5 py-2 text-sm leading-relaxed break-words ${
            isMine
              ? "gradient-primary text-white rounded-tr-md"
              : "glass-card text-white/90 rounded-tl-md"
          }`}
          style={
            isMine
              ? { boxShadow: "0 4px 16px rgba(255,59,48,0.18)" }
              : undefined
          }
        >
          {sanitizeForDisplay(msg.content)}

          {/* Reactions popover — premium only */}
          <AnimatePresence>
            {showReactions && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className={`absolute z-10 ${
                  isMine ? "right-0" : "left-0"
                } -top-12 glass-card-strong rounded-2xl px-2 py-1.5 flex items-center gap-1`}
              >
                {isPremium ? (
                  QUICK_REACTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        onReact(msg, emoji);
                        setShowReactions(false);
                      }}
                      className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-base active:scale-90 transition-transform"
                      aria-label={t("chatReactWith", { emoji })}
                    >
                      {emoji}
                    </button>
                  ))
                ) : (
                  <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] text-white/70">
                    <Lock size={12} className="text-[#FF9500]" />
                    <span>{t("chatPremiumReactions")}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

interface NicknameSetupProps {
  onJoin: (nickname: string) => void;
}

function NicknameSetup({ onJoin }: NicknameSetupProps) {
  const t = useT();
  const [name, setName] = useState("");

  const isValid =
    name.trim().length >= MIN_NICKNAME_LENGTH &&
    name.trim().length <= MAX_NICKNAME_LENGTH;

  const handleShuffle = () => {
    sound.playClick();
    haptics.selection();
    setName(generateRandomNickname());
  };

  const handleSubmit = () => {
    if (!isValid) {
      sound.playError();
      haptics.error();
      toast.error(t("chatNicknameError", { min: MIN_NICKNAME_LENGTH, max: MAX_NICKNAME_LENGTH }));
      return;
    }
    sound.playSuccess();
    haptics.success();
    onJoin(name.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="glass-card-strong mesh-bg-aurora rounded-3xl p-6 mt-4 mx-4"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-3xl gradient-primary glow-red flex items-center justify-center mb-4">
          <MessageCircle size={28} className="text-white" strokeWidth={2.2} />
        </div>
        <h2 className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-1">
          {t("chatChooseNickname")}
        </h2>
        <p className="text-sm text-white/60 mb-5 leading-relaxed">
          {t("chatNicknameHelp")}
        </p>
      </div>

      <div className="relative mb-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, MAX_NICKNAME_LENGTH))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isValid) handleSubmit();
          }}
          placeholder={t("chatNicknamePlaceholder")}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-14 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF9500]/50 transition-all"
          maxLength={MAX_NICKNAME_LENGTH}
          aria-label={t("chatNickname")}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button
          onClick={handleShuffle}
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-white/10 btn-press"
          aria-label={t("chatRandomNickname")}
          title={t("chatRandomNickname")}
        >
          <Shuffle size={16} className="text-[#FF9500]" />
        </button>
      </div>

      <div className="flex items-center justify-between mb-4 text-[11px] text-white/40">
        <span>{t("chatNicknameRange", { min: MIN_NICKNAME_LENGTH, max: MAX_NICKNAME_LENGTH })}</span>
        <span className={isValid ? "text-[#4ADE80]" : ""}>
          {name.trim().length}/{MAX_NICKNAME_LENGTH}
        </span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className={`w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
          isValid
            ? "gradient-primary glow-red btn-press"
            : "bg-white/5 text-white/30 cursor-not-allowed"
        }`}
      >
        <MessageCircle size={18} />
        {t("chatJoinBtn")}
      </button>
    </motion.div>
  );
}

/* ========================================================================
   Main screen
   ======================================================================== */

export function CommunityChatScreen() {
  const t = useT();
  const {
    navigate,
    chatNickname,
    setChatNickname,
    chatRoomMessages,
    addChatRoomMessage,
    clearChatRoomMessages,
    streakDays,
    plan,
    chatUsage,
    consumeChatMessage,
  } = useStore();

  const isPremium = isPremiumPlan(plan);

  // Zerobet 2.0 — freemium: live chat is free to read; sending is limited
  // to FREE_CHAT_DAILY_LIMIT messages/day on the free plan.
  const FREE_CHAT_DAILY_LIMIT = 5;
  const chatTodayKey = new Date().toISOString().slice(0, 10);
  const chatUsedToday = chatUsage.date === chatTodayKey ? chatUsage.count : 0;
  const chatRemaining = isPremium
    ? Infinity
    : Math.max(0, FREE_CHAT_DAILY_LIMIT - chatUsedToday);

  const [activeRoom, setActiveRoom] = useState<RoomKey>("general");
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [activeUsersByRoom, setActiveUsersByRoom] = useState<
    Record<RoomKey, number>
  >({ general: 0, "crisis-support": 0, veterans: 0 });
  const [showRules, setShowRules] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesListRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);

  /* -------------------- Auto-scroll on new messages -------------------- */
  const visibleMessages = useMemo(
    () => chatRoomMessages.filter((m) => m.room === activeRoom),
    [chatRoomMessages, activeRoom]
  );

  useEffect(() => {
    const el = messagesListRef.current;
    if (!el) return;
    // Only autoscroll if user is near the bottom (within 120px).
    const nearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (nearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [visibleMessages.length, activeRoom]);

  /* -------------------- Socket lifecycle -------------------- */
  useEffect(() => {
    if (!chatNickname) return;
    // Zerobet 2.0 — reading the live chat is free; only SENDING is quota-limited.

    // Defer the status update out of the synchronous effect body to
    // satisfy the react-hooks/set-state-in-effect rule (the actual
    // status is also driven by socket connect/disconnect events below).
    queueMicrotask(() => setConnectionStatus("connecting"));

    const socket = io("/?XTransformPort=3003", {
      transports: ["websocket", "polling"],
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: 8,
      reconnectionDelay: 1200,
      timeout: 10000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnectionStatus("connected");
      const payload: JoinPayload = {
        nickname: chatNickname,
        room: activeRoom,
        streakDays,
        color: getNicknameColor(chatNickname),
      };
      socket.emit("join", payload);
    });

    socket.on("disconnect", () => {
      setConnectionStatus("disconnected");
    });

    socket.on("connect_error", () => {
      setConnectionStatus("disconnected");
    });

    // Server-side flood control feedback (Zerobet 2.0.2). The limiter is
    // authoritative on the server — this just surfaces a friendly message.
    socket.on(
      "rate-limited",
      (data: { retryAfterMs?: number; scope?: string }) => {
        const secs = Math.max(1, Math.ceil((data?.retryAfterMs ?? 0) / 1000));
        if (data?.scope === "join") {
          // Room-switch flood: silent reconnect shortly after; no toast spam.
          return;
        }
        toast.warning(t("chatRateLimited", { n: secs }));
        haptics.light();
      }
    );

    socket.on(
      "message",
      (msg: ServerChatMessage) => {
        if (!msg || typeof msg.content !== "string") return;
        const normalized: ChatRoomMessage = {
          id: msg.id,
          nickname: msg.nickname,
          content: msg.content,
          timestamp: msg.timestamp,
          color: msg.color || getNicknameColor(msg.nickname),
          type: msg.type === "system" ? "system" : "user",
          room: msg.room || activeRoom,
        };
        addChatRoomMessage(normalized);
        // Don't play sound/haptic for system messages or our own echoed messages.
        if (
          normalized.type === "user" &&
          normalized.nickname !== chatNickname
        ) {
          sound.playPop();
          haptics.light();
        }
      }
    );

    socket.on("user-joined", (_data: UserEventPayload) => {
      // System message is broadcast separately by the server — no need to
      // duplicate here. Just a tiny tick.
    });

    socket.on("user-left", (_data: UserEventPayload) => {
      // Same — server already broadcasts a system message.
    });

    socket.on("typing", (data: TypingPayload) => {
      if (!data || data.nickname === chatNickname) return;
      setTypingUsers((prev) =>
        prev.includes(data.nickname) ? prev : [...prev, data.nickname]
      );
    });

    socket.on("stop-typing", (data: TypingPayload) => {
      if (!data) return;
      setTypingUsers((prev) => prev.filter((n) => n !== data.nickname));
    });

    socket.on("active-users", (count: number) => {
      const n = Math.max(0, Number(count) || 0);
      setActiveUsersByRoom((prev) => ({ ...prev, [activeRoom]: n }));
    });

    return () => {
      try {
        socket.emit("leave", { nickname: chatNickname, room: activeRoom });
      } catch {
        /* noop */
      }
      socket.disconnect();
      socketRef.current = null;
      setTypingUsers([]);
    };
  }, [chatNickname, activeRoom, isPremium]);

  /* -------------------- Typing indicator -------------------- */
  const notifyTyping = useCallback(() => {
    const socket = socketRef.current;
    if (!socket || !socket.connected || !chatNickname) return;
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      socket.emit("typing", { nickname: chatNickname, room: activeRoom });
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      isTypingRef.current = false;
      socket.emit("stop-typing", { nickname: chatNickname, room: activeRoom });
    }, TYPING_DEBOUNCE_MS);
  }, [chatNickname, activeRoom]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  /* -------------------- Handlers -------------------- */
  const handleJoinChat = useCallback(
    (nickname: string) => {
      setChatNickname(nickname);
      clearChatRoomMessages();
      toast.success(t("chatWelcome", { nickname }));
    },
    [setChatNickname, clearChatRoomMessages, t]
  );

  const handleSelectRoom = useCallback(
    (room: RoomKey) => {
      if (room === activeRoom) return;
      const cfg = ROOM_BY_KEY[room];
      if (cfg.minStreak && streakDays < cfg.minStreak) {
        sound.playError();
        haptics.warning();
        toast.error(
          t("chatRoomLockedMsg", { label: t(cfg.labelKey), n: cfg.minStreak })
        );
        return;
      }
      sound.playClick();
      haptics.selection();

      // Leave current room, switch, then re-join via the useEffect dependency.
      const socket = socketRef.current;
      if (socket && socket.connected) {
        socket.emit("leave", { nickname: chatNickname, room: activeRoom });
      }
      setTypingUsers([]);
      setActiveRoom(room);
      // The useEffect will re-run on activeRoom change and emit join.
    },
    [activeRoom, chatNickname, streakDays, t]
  );

  const handleSend = useCallback(() => {
    const content = input.trim();
    if (!content) return;
    // Zerobet 2.0 — free plan: 5 messages/day quota (reading stays free).
    if (!isPremium) {
      const todayKey = new Date().toISOString().slice(0, 10);
      const used = chatUsage.date === todayKey ? chatUsage.count : 0;
      if (used >= FREE_CHAT_DAILY_LIMIT) {
        sound.playError();
        haptics.error();
        toast.error(t("chatQuotaToast", { n: FREE_CHAT_DAILY_LIMIT }), {
          action: {
            label: t("chatQuotaUpgrade"),
            onClick: () => navigate("paywall"),
          },
        });
        return;
      }
      consumeChatMessage();
    }
    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      sound.playError();
      haptics.error();
      toast.error(t("chatOfflineRetry"));
      return;
    }

    const payload: MessagePayload = {
      nickname: chatNickname,
      content,
      room: activeRoom,
      color: getNicknameColor(chatNickname),
    };
    socket.emit("message", payload);

    // Local echo — server broadcasts to everyone including us, but a local
    // echo makes the UI feel instant even on high-latency connections.
    const echo: ChatRoomMessage = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nickname: chatNickname,
      content,
      timestamp: new Date().toISOString(),
      color: payload.color,
      type: "user",
      room: activeRoom,
    };
    addChatRoomMessage(echo);

    // Stop typing indicator.
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    isTypingRef.current = false;
    socket.emit("stop-typing", { nickname: chatNickname, room: activeRoom });
    setTypingUsers((prev) => prev.filter((n) => n !== chatNickname));

    setInput("");
    sound.playPop();
    haptics.light();
  }, [input, chatNickname, activeRoom, addChatRoomMessage, t, isPremium, chatUsage, consumeChatMessage, navigate]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const v = e.target.value.slice(0, MAX_MESSAGE_LENGTH);
      setInput(v);
      if (v.trim()) notifyTyping();
    },
    [notifyTyping]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleReact = useCallback(
    (msg: ChatRoomMessage, emoji: string) => {
      if (!isPremium) return;
      sound.playPop();
      haptics.light();
      toast(t("chatReactionSent", { emoji, nickname: msg.nickname }), {
        duration: 1500,
      });
    },
    [isPremium, t]
  );

  const handleRetry = useCallback(() => {
    sound.playClick();
    haptics.medium();
    const socket = socketRef.current;
    if (socket) {
      socket.disconnect();
      socket.connect();
    } else {
      // Force effect to re-run by toggling connection status.
      setConnectionStatus("connecting");
    }
  }, []);

  const handleBack = useCallback(() => {
    sound.playClick();
    haptics.light();
    navigate("dashboard");
  }, [navigate]);

  /* -------------------- (Zerobet 2.0) hard paywall removed — free users
     read the chat freely and send up to 5 messages/day (quota chip below). */

  /* -------------------- Nickname gate -------------------- */
  if (!chatNickname) {
    return (
      <div className="min-h-screen">
        <Header
          onBack={handleBack}
          status="connecting"
          activeUsers={0}
        />
        <NicknameSetup onJoin={handleJoinChat} />
      </div>
    );
  }

  const activeRoomCfg = ROOM_BY_KEY[activeRoom];
  const typingDisplay = typingUsers.slice(0, 2).join(", ");
  const extraTyping = typingUsers.length - 2;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onBack={handleBack}
        status={connectionStatus}
        activeUsers={activeUsersByRoom[activeRoom]}
      />

      {/* Room selector */}
      <div className="px-4 pt-3 pb-2 sticky top-[68px] z-20 bg-[#070B0E]/80 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {ROOMS.map((room) => (
            <RoomTab
              key={room.key}
              room={room}
              isActive={activeRoom === room.key}
              activeUsers={activeUsersByRoom[room.key]}
              isLocked={!!room.minStreak && streakDays < room.minStreak}
              onSelect={() => handleSelectRoom(room.key)}
            />
          ))}
        </div>
        <p className="text-[11px] text-white/40 mt-1 px-1">
          <span className="mr-1">{activeRoomCfg.emoji}</span>
          {t(activeRoomCfg.descKey)}
        </p>
      </div>

      {/* Safety banner (crisis-support only) */}
      <AnimatePresence>
        {activeRoom === "crisis-support" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mt-2"
          >
            <div
              className="rounded-2xl p-3 flex items-start gap-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,59,48,0.18), rgba(255,149,0,0.10))",
                boxShadow: "inset 0 0 0 1px rgba(255,59,48,0.30)",
              }}
            >
              <ShieldAlert
                size={20}
                className="text-[#FF3B30] shrink-0 mt-0.5"
              />
              <div className="flex-1">
                <p className="text-[12px] text-white/85 leading-snug">
                  {t("chatCrisisRoomBanner")}
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    haptics.medium();
                    navigate("sos");
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF3B30] text-white text-xs font-semibold btn-press glow-red"
                >
                  <Phone size={12} />
                  {t("chatCallSos")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection retry banner */}
      <AnimatePresence>
        {connectionStatus === "disconnected" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mt-2"
          >
            <div className="rounded-2xl p-3 flex items-center gap-3 glass-card border border-[#FF3B30]/30">
              <WifiOff size={16} className="text-[#FF3B30] shrink-0" />
              <p className="text-[12px] text-white/70 flex-1">
                {t("chatConnectionLost")}
              </p>
              <button
                onClick={handleRetry}
                className="px-3 py-1.5 rounded-xl bg-[#FF9500] text-white text-xs font-semibold btn-press"
              >
                {t("chatRetry")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages list */}
      <div
        ref={messagesListRef}
        className="flex-1 overflow-y-auto custom-scroll px-4 py-3 min-h-[280px] max-h-[calc(100vh-280px)]"
      >
        {visibleMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center mb-3">
              <MessageCircle size={24} className="text-white/40" />
            </div>
            <p className="text-white/50 text-sm">
              {t("chatEmptyState")}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleMessages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                isMine={msg.nickname === chatNickname && msg.type === "user"}
                isPremium={isPremium}
                onReact={handleReact}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Typing indicator */}
        <AnimatePresence>
          {typingUsers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="flex items-center gap-2 px-2 mt-2"
            >
              <span className="text-[11px] text-white/50 italic">
                {typingDisplay}
                {extraTyping > 0 ? ` +${extraTyping}` : ""}{" "}
                {typingUsers.length > 1 ? t("chatTypingMany") : t("chatTypingOne")}
              </span>
              <span className="flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.18,
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                  />
                ))}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Community guidelines (collapsible) */}
      <div className="mx-4 mb-2">
        <button
          onClick={() => {
            sound.playClick();
            haptics.light();
            setShowRules((v) => !v);
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl glass-card text-xs text-white/70"
          aria-expanded={showRules}
        >
          <span className="flex items-center gap-2">
            <Info size={13} className="text-[#64D2FF]" />
            {t("chatRulesTitle")}
          </span>
          {showRules ? (
            <ChevronUp size={14} className="text-white/40" />
          ) : (
            <ChevronDown size={14} className="text-white/40" />
          )}
        </button>
        <AnimatePresence>
          {showRules && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card rounded-2xl p-4 mt-1 space-y-2">
                {COMMUNITY_RULES_KEYS.map((ruleKey, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-[12px] text-white/70"
                  >
                    <span className="text-[#FF9500] font-bold mt-0.5">
                      {i + 1}.
                    </span>
                    <span>{t(ruleKey)}</span>
                  </div>
                ))}
                <button
                  onClick={() => {
                    sound.playClick();
                    haptics.light();
                    toast.info(
                      t("chatReportHint")
                    );
                  }}
                  className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 text-[11px] text-white/60 hover:bg-white/10"
                >
                  <Flag size={11} />
                  {t("chatReportBtn")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message input */}
      <div className="sticky bottom-0 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-2 z-20 bg-[#070B0E]/85 backdrop-blur-md">
        {/* Zerobet 2.0 — free-plan quota chip above the composer */}
        {!isPremium && (
          <div className="flex items-center justify-between mb-1.5 px-2">
            <span className="text-[10px] text-white/40">
              {chatRemaining > 0
                ? t("chatQuotaRemaining", { n: chatRemaining })
                : t("chatQuotaEmpty")}
            </span>
            {chatRemaining <= 0 && (
              <button
                onClick={() => navigate("paywall")}
                className="text-[10px] font-semibold text-[#FBBF24] hover:underline"
              >
                {t("chatQuotaUpgrade")}
              </button>
            )}
          </div>
        )}
        <div className="glass-card-strong rounded-3xl p-2 flex items-end gap-2">
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={t("chatInputPlaceholder", { room: t(activeRoomCfg.labelKey) })}
            rows={1}
            maxLength={MAX_MESSAGE_LENGTH}
            className="flex-1 bg-transparent resize-none px-3 py-2 text-white placeholder:text-white/30 focus:outline-none text-sm max-h-28 custom-scroll"
            aria-label={t("chatMessage")}
            style={{ minHeight: 36 }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || connectionStatus !== "connected"}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
              input.trim() && connectionStatus === "connected"
                ? "gradient-primary glow-red btn-press"
                : "bg-white/5 text-white/30"
            }`}
            aria-label={t("chatSend")}
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-1 px-2 text-[10px] text-white/30">
          <span>
            {connectionStatus === "connected" ? (
              <span className="flex items-center gap-1">
                <Wifi size={10} className="text-[#4ADE80]" />
                {activeUsersByRoom[activeRoom] === 1
                  ? t("chatConnectedMemberOne")
                  : t("chatConnectedMembers", {
                      n: activeUsersByRoom[activeRoom],
                    })}
              </span>
            ) : connectionStatus === "connecting" ? (
              <span className="flex items-center gap-1">
                <Loader2 size={10} className="animate-spin text-[#FBBF24]" />
                {t("chatConnecting")}
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <WifiOff size={10} className="text-[#FF3B30]" />
                {t("chatOffline")}
              </span>
            )}
          </span>
          <span className={input.length > MAX_MESSAGE_LENGTH - 50 ? "text-[#FF9500]" : ""}>
            {input.length}/{MAX_MESSAGE_LENGTH}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   Header
   ======================================================================== */

interface HeaderProps {
  onBack: () => void;
  status: ConnectionStatus;
  activeUsers: number;
}

function Header({ onBack, status, activeUsers }: HeaderProps) {
  const t = useT();
  return (
    <header className="sticky top-0 z-30 px-4 pt-12 pb-3 bg-[#070B0E]/85 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl glass-card-strong flex items-center justify-center btn-press"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        <div className="flex-1 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl gradient-primary glow-red flex items-center justify-center">
            <MessageCircle size={18} className="text-white" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-extrabold text-white font-[family-name:var(--font-poppins)]">
              {t("chatTitle")}
            </h1>
            <p className="text-[11px] text-white/50">
              {t("chatSubtitle")}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <StatusDot status={status} />
          <span className="text-[10px] text-white/40 flex items-center gap-1">
            <Users size={10} />
            {t("chatUsersOnline", { n: activeUsers })}
          </span>
        </div>
      </div>
    </header>
  );
}
