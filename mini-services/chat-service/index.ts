/**
 * Zerobet — Community Chat Socket.IO Service
 *
 * Real-time community chat for the gambling addiction recovery app.
 * Users join rooms (general / crisis-support / veterans), exchange messages
 * and typing indicators, and the server broadcasts user-joined / user-left
 * system messages.
 *
 * Path MUST be "/" so Caddy forwards correctly. Port is fixed at 3003.
 * Clients connect via `io("/?XTransformPort=3003")` — never a direct
 * localhost URL.
 */

import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { Server, type Socket } from "socket.io";

// ----------------------------- Types ----------------------------------

interface JoinPayload {
  nickname: string;
  room: string;
  streakDays: number;
}

interface LeavePayload {
  nickname: string;
  room: string;
}

interface MessagePayload {
  nickname: string;
  content: string;
  room: string;
  color: string;
}

interface TypingPayload {
  nickname: string;
  room: string;
}

interface StopTypingPayload {
  nickname: string;
  room: string;
}

interface ChatMessage {
  id: string;
  nickname: string;
  content: string;
  timestamp: string;
  color: string;
  type: "user" | "system";
  room: string;
}

interface RoomUser {
  id: string; // socket.id
  nickname: string;
  color: string;
  streakDays: number;
  joinedAt: string;
}

// ----------------------------- Setup ----------------------------------

const PORT = 3003;

const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
  // Lightweight health endpoint — Caddy / curl probes hit "/" and socket.io
  // answers engine.io requests. Anything else returns 200 OK.
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      service: "zerobet-chat-service",
      status: "ok",
      port: PORT,
    })
  );
});

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:81",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:81",
  // Add production origins here when deployed
  ...(process.env.CHAT_ALLOWED_ORIGINS?.split(",") || []),
];

const io = new Server(httpServer, {
  // DO NOT change the path — Caddy uses it to forward to the correct port.
  path: "/",
  cors: {
    origin: (origin, callback) => {
      // Allow same-origin requests (no Origin header) and whitelisted origins
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: false,
  },
  pingInterval: 25000,
  pingTimeout: 60000,
  maxHttpBufferSize: 1e6, // 1MB max message size
});

// ----------------------------- State ----------------------------------

/** room -> Map<socketId, RoomUser> */
const rooms = new Map<string, Map<string, RoomUser>>();

const VALID_ROOMS = new Set(["general", "crisis-support", "veterans"]);

// ----------------------------- Helpers --------------------------------

function generateMessageId(): string {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getOrCreateRoom(room: string): Map<string, RoomUser> {
  let r = rooms.get(room);
  if (!r) {
    r = new Map();
    rooms.set(room, r);
  }
  return r;
}

function activeUserCount(room: string): number {
  return rooms.get(room)?.size ?? 0;
}

function emitActiveUsers(room: string): void {
  io.to(room).emit("active-users", activeUserCount(room));
}

function createSystemMessage(content: string, room: string): ChatMessage {
  return {
    id: generateMessageId(),
    nickname: "Système",
    content,
    timestamp: new Date().toISOString(),
    color: "#9CA3AF",
    type: "system",
    room,
  };
}

/**
 * Content normalization (safe-by-contract):
 *  - trim whitespace
 *  - cap at 500 chars
 *  - strip control characters (keep \n)
 *  - collapse 3+ consecutive newlines
 *
 * NOTE: we intentionally do NOT HTML-entity-escape here. Messages are
 * rendered by the client through React text nodes (which never interpret
 * HTML), and escaping here caused double-escaped artifacts like
 * `aujourd&#39;hui` appearing literally in the chat UI (bug found in QA).
 */
function sanitizeContent(raw: string): string {
  const trimmed = (raw ?? "").trim();
  const capped = trimmed.slice(0, 500);
  return capped
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\n{3,}/g, "\n\n");
}

// ----------------------------- Rate limiting (flood control) -----------

// Server-side sliding-window limiter. The client enforces the free-plan
// daily quota, but a tampered client could bypass it — this protects the
// rooms regardless of what the client sends.
const RATE_WINDOW_MS = 15_000;
const RATE_MAX_MESSAGES = 6; // generous for humans, blocks floods
const RATE_MAX_JOINS = 5; // prevents join/leave room-flooding

interface RateEntry {
  timestamps: number[];
}
const messageLimiter = new Map<string, RateEntry>();
const joinLimiter = new Map<string, RateEntry>();

function allowAction(
  map: Map<string, RateEntry>,
  key: string,
  max: number,
  windowMs: number = RATE_WINDOW_MS
): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = map.get(key) ?? { timestamps: [] };
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
  if (entry.timestamps.length >= max) {
    const oldest = entry.timestamps[0];
    map.set(key, entry);
    return { ok: false, retryAfterMs: Math.max(0, windowMs - (now - oldest)) };
  }
  entry.timestamps.push(now);
  map.set(key, entry);
  return { ok: true, retryAfterMs: 0 };
}

// Periodic cleanup so the limiter maps never grow unbounded.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of messageLimiter) {
    if (entry.timestamps.every((t) => now - t >= RATE_WINDOW_MS))
      messageLimiter.delete(key);
  }
  for (const [key, entry] of joinLimiter) {
    if (entry.timestamps.every((t) => now - t >= RATE_WINDOW_MS))
      joinLimiter.delete(key);
  }
}, RATE_WINDOW_MS).unref();

// ----------------------------- Connection -----------------------------

io.on("connection", (socket: Socket) => {
  console.log(`[chat] connected: ${socket.id}`);

  // Track which room this socket is currently in (for clean disconnect cleanup).
  let currentRoom: string | null = null;
  let currentNickname: string | null = null;

  // ---- join ----
  socket.on("join", (payload: JoinPayload) => {
    try {
      // Flood guard: too many room switches in a short window.
      const joinRl = allowAction(joinLimiter, socket.id, RATE_MAX_JOINS);
      if (!joinRl.ok) {
        socket.emit("rate-limited", { retryAfterMs: joinRl.retryAfterMs, scope: "join" });
        console.log(`[chat] rate-limited join from ${socket.id}`);
        return;
      }

      const nickname = (payload?.nickname ?? "").trim().slice(0, 20);
      const room = (payload?.room ?? "").trim();
      const streakDays = Math.max(0, Math.min(9999, Number(payload?.streakDays ?? 0) || 0));

      if (!nickname || !room || !VALID_ROOMS.has(room)) {
        socket.emit("error", { message: "Pseudo ou salon invalide." });
        return;
      }

      // Veterans room is gated to 90+ day streaks.
      if (room === "veterans" && streakDays < 90) {
        socket.emit("error", {
          message: "Le salon Vétérans est réservé aux membres avec 90+ jours d'abstinence.",
        });
        return;
      }

      // Leave previous room if any.
      if (currentRoom && currentNickname) {
        leaveRoom(socket, currentRoom, currentNickname);
      }

      currentRoom = room;
      currentNickname = nickname;

      const color =
        typeof payload === "object" && payload && "color" in payload && typeof (payload as { color?: unknown }).color === "string"
          ? ((payload as { color: string }).color as string)
          : "#FF9500";

      const user: RoomUser = {
        id: socket.id,
        nickname,
        color,
        streakDays,
        joinedAt: new Date().toISOString(),
      };

      const r = getOrCreateRoom(room);
      r.set(socket.id, user);
      socket.join(room);

      // Welcome message to the joining user.
      const welcome = createSystemMessage(
        `Bienvenue ${nickname} dans le salon. Sois bienveillant. 👋`,
        room
      );
      socket.emit("message", welcome);

      // Broadcast join to the rest of the room.
      const joinMsg = createSystemMessage(`${nickname} a rejoint le salon`, room);
      socket.to(room).emit("message", joinMsg);
      socket.to(room).emit("user-joined", { nickname, color, streakDays });

      emitActiveUsers(room);
      console.log(`[chat] ${nickname} joined #${room} (streak=${streakDays}) — ${activeUserCount(room)} users`);
    } catch (err) {
      console.error("[chat] join error:", err);
    }
  });

  // ---- leave ----
  socket.on("leave", (payload: LeavePayload) => {
    try {
      const nickname = (payload?.nickname ?? "").trim();
      const room = (payload?.room ?? "").trim();
      if (!room || !nickname) return;
      leaveRoom(socket, room, nickname);
      if (currentRoom === room) {
        currentRoom = null;
        currentNickname = null;
      }
    } catch (err) {
      console.error("[chat] leave error:", err);
    }
  });

  // ---- message ----
  socket.on("message", (payload: MessagePayload) => {
    try {
      if (!currentRoom || !currentNickname) return;

      // Flood guard (server-authoritative — client quota is advisory only).
      const rl = allowAction(messageLimiter, socket.id, RATE_MAX_MESSAGES);
      if (!rl.ok) {
        socket.emit("rate-limited", { retryAfterMs: rl.retryAfterMs, scope: "message" });
        console.log(`[chat] rate-limited message from ${socket.id} (${currentNickname})`);
        return;
      }

      const content = sanitizeContent(payload?.content ?? "");
      if (!content) return;

      const msg: ChatMessage = {
        id: generateMessageId(),
        nickname: currentNickname,
        content,
        timestamp: new Date().toISOString(),
        color: typeof payload?.color === "string" && payload.color ? payload.color : "#FF9500",
        type: "user",
        room: currentRoom,
      };
      // Broadcast to the room EXCEPT the sender: the sender already renders a
      // local echo (optimistic UI). Emitting to the sender too caused every
      // message to appear twice (bug found in QA).
      socket.to(currentRoom).emit("message", msg);
      console.log(`[chat] ${currentNickname}@${currentRoom}: ${content}`);
    } catch (err) {
      console.error("[chat] message error:", err);
    }
  });

  // ---- typing ----
  socket.on("typing", (payload: TypingPayload) => {
    try {
      if (!currentRoom || !currentNickname) return;
      socket.to(currentRoom).emit("typing", { nickname: currentNickname, room: currentRoom });
    } catch (err) {
      console.error("[chat] typing error:", err);
    }
  });

  // ---- stop-typing ----
  socket.on("stop-typing", (payload: StopTypingPayload) => {
    try {
      if (!currentRoom || !currentNickname) return;
      socket.to(currentRoom).emit("stop-typing", { nickname: currentNickname, room: currentRoom });
    } catch (err) {
      console.error("[chat] stop-typing error:", err);
    }
  });

  // ---- disconnect ----
  socket.on("disconnect", () => {
    try {
      if (currentRoom && currentNickname) {
        leaveRoom(socket, currentRoom, currentNickname);
      }
      console.log(`[chat] disconnected: ${socket.id}`);
    } catch (err) {
      console.error("[chat] disconnect error:", err);
    }
  });

  socket.on("error", (err: unknown) => {
    console.error(`[chat] socket error (${socket.id}):`, err);
  });
});

function leaveRoom(socket: Socket, room: string, nickname: string): void {
  const r = rooms.get(room);
  if (!r) return;
  r.delete(socket.id);
  socket.leave(room);
  const leftMsg = createSystemMessage(`${nickname} a quitté le salon`, room);
  socket.to(room).emit("message", leftMsg);
  socket.to(room).emit("user-left", { nickname });
  emitActiveUsers(room);
  if (r.size === 0) rooms.delete(room);
}

// ----------------------------- Bootstrap ------------------------------

httpServer.listen(PORT, () => {
  console.log(`[zerobet-chat-service] Socket.IO server listening on port ${PORT}`);
  console.log(`[zerobet-chat-service] path=/, cors=*, ping=25s/60s`);
});

// ----------------------------- Graceful shutdown ----------------------

function shutdown(signal: string): void {
  console.log(`[zerobet-chat-service] ${signal} received, shutting down...`);
  io.disconnectSockets(true);
  httpServer.close(() => {
    console.log("[zerobet-chat-service] closed");
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
