"use client";

import { useState, useRef, useEffect, useMemo, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Send,
  Bot,
  Sparkles,
  BookOpen,
  Zap,
  Trophy,
  AlertTriangle,
  Brain,
  Users,
  Heart,
  Wind,
  ClipboardList,
  Dumbbell,
  LifeBuoy,
  Trash2,
  X,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { MessageSkeleton } from "@/components/zerobet/components/Skeletons";

type Section = "journal" | "motivation" | "progress" | "crisis";

const SECTIONS: { id: Section; labelKey: string; icon: LucideIcon; color: string }[] = [
  { id: "journal", labelKey: "atlasJournal", icon: BookOpen, color: "#64D2FF" },
  { id: "motivation", labelKey: "atlasMotivation", icon: Sparkles, color: "#FF9500" },
  { id: "progress", labelKey: "atlasProgress", icon: Trophy, color: "#4ADE80" },
  { id: "crisis", labelKey: "atlasCrisis", icon: AlertTriangle, color: "#FF3B30" },
];

interface SuggestedPrompt {
  labelKey: string;
  icon: LucideIcon;
  color: string;
}

const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { labelKey: "atlasSuggested1", icon: Wind, color: "#64D2FF" },
  { labelKey: "atlasSuggested2", icon: BookOpen, color: "#4ADE80" },
  { labelKey: "atlasSuggested3", icon: Sparkles, color: "#FF9500" },
  { labelKey: "atlasSuggested4", icon: Brain, color: "#BF5AF2" },
  { labelKey: "atlasSuggested5", icon: Users, color: "#4ADE80" },
  { labelKey: "atlasSuggested6", icon: Heart, color: "#FF3B30" },
];

interface QuickAction {
  id: string;
  labelKey: string;
  icon: LucideIcon;
  color: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: "journal", labelKey: "atlasAnalyzeJournal", icon: ClipboardList, color: "#64D2FF" },
  { id: "motivation", labelKey: "atlasAskMotivation", icon: Dumbbell, color: "#FF9500" },
  { id: "progress", labelKey: "atlasSeeProgress", icon: Trophy, color: "#4ADE80" },
  { id: "crisis", labelKey: "atlasCrisis", icon: LifeBuoy, color: "#FF3B30" },
];

/** Lightweight inline markdown renderer: supports **bold** within a single line. */
function renderInlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export function AtlasScreen() {
  const t = useT();
  const {
    chatMessages,
    addChatMessage,
    clearChat,
    plan,
    navigate,
    journalEntries,
    streakDays,
    addictionScore,
    unlockedRanks,
    addictionLevel,
    atlasUsage,
    consumeAtlasMessage,
  } = useStore();
  const [activeSection, setSection] = useState<Section>("journal");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isPremium = plan !== "free";
  const messageCount = chatMessages.length;

  // Zerobet 2.0 — freemium rebalance: free users get a daily message quota
  // instead of a hard lock, so they can experience the coach before upgrading.
  const FREE_DAILY_LIMIT = 10;
  const todayKey = new Date().toISOString().slice(0, 10);
  const usedToday = atlasUsage.date === todayKey ? atlasUsage.count : 0;
  const remainingFree = Math.max(0, FREE_DAILY_LIMIT - usedToday);
  const quotaExhausted = !isPremium && remainingFree <= 0;

  const contextLabel = useMemo(() => {
    const planLabel =
      plan === "premium"
        ? t("settingsPlanPremium")
        : plan === "mentor"
          ? t("settingsPlanMentor")
          : plan === "psychologist"
            ? t("settingsPlanPsychologist")
            : t("planDiscovery");
    return t("atlasContextSummary", { days: streakDays, plan: planLabel });
  }, [plan, streakDays, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loading]);

  const sendMessage = async (content: string, section?: Section) => {
    if (!content.trim() || loading || quotaExhausted) return;
    const targetSection = section || activeSection;
    const userMsg = {
      role: "user" as const,
      content: content.trim(),
      section: targetSection,
    };
    addChatMessage(userMsg);
    if (!isPremium) consumeAtlasMessage();
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content.trim(),
          section: targetSection,
          context: {
            streakDays,
            addictionScore,
            addictionLevel,
            journalEntries: journalEntries
              .slice(0, 5)
              .map((e) => ({ emotion: e.emotion, content: e.content })),
            unlockedRanks: unlockedRanks.length,
          },
        }),
      });
      const data = await res.json();
      addChatMessage({
        role: "assistant",
        content: data.reply || t("atlasError"),
        section: targetSection,
      });
    } catch {
      addChatMessage({
        role: "assistant",
        content: t("atlasFallbackMessage"),
        section: targetSection,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === "journal") {
      sendMessage(t("atlasAnalyzeJournal"), "journal");
      setSection("journal");
    } else if (actionId === "motivation") {
      sendMessage(t("atlasAskMotivation"), "motivation");
      setSection("motivation");
    } else if (actionId === "progress") {
      sendMessage(t("atlasSeeProgress"), "progress");
      setSection("progress");
    } else if (actionId === "crisis") {
      navigate("panic");
    }
  };

  if (quotaExhausted) {
    return (
      <div className="min-h-screen px-6 pt-14 pb-8 flex flex-col items-center justify-center text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-24 h-24 rounded-3xl gradient-gold flex items-center justify-center mb-4 glow-yellow"
        >
          <Bot size={48} className="text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-poppins)]">
          {t("atlasQuotaTitle")}
        </h2>
        <p className="text-white/60 text-sm mb-6 max-w-xs">
          {t("atlasQuotaDesc", { n: FREE_DAILY_LIMIT })}
        </p>
        <div className="glass-card p-4 mb-6 max-w-sm w-full">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-white/60">{t("atlasQuotaUsedToday")}</span>
            <span className="text-[#FBBF24] font-bold">
              {t("atlasQuotaCount", { used: FREE_DAILY_LIMIT, total: FREE_DAILY_LIMIT })}
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-full gradient-gold rounded-full" />
          </div>
          <p className="text-white/40 text-[11px] mt-3">{t("atlasQuotaReset")}</p>
        </div>
        <button
          onClick={() => navigate("paywall")}
          className="w-full max-w-xs py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold glow-red"
        >
          {t("atlasUnlock")}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 pt-12 pb-4 flex flex-col relative">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => navigate("dashboard")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center flex-shrink-0"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ boxShadow: ["0 0 0px rgba(255,59,48,0.4)", "0 0 20px rgba(255,59,48,0.6)", "0 0 0px rgba(255,59,48,0.4)"] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0"
            >
              <Bot size={18} className="text-white" />
            </motion.div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white font-[family-name:var(--font-poppins)] truncate">
                  {t("atlasTitle")}
                </h1>
                <span className="flex items-center gap-1 text-[#4ADE80] text-[10px] flex-shrink-0">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"
                  />
                  {t("atlasOnline")}
                </span>
              </div>
              <p className="text-white/40 text-[10px] flex items-center gap-1 truncate">
                <MessageCircle size={9} />
                {t("atlasMessagesCount", { n: messageCount })}
              </p>
            </div>
          </div>
        </div>
        {/* Zerobet 2.0 — free-tier quota chip (hidden for premium users) */}
        {!isPremium && (
          <button
            onClick={() => navigate("paywall")}
            className={`flex-shrink-0 px-2.5 py-1.5 rounded-full text-[10px] font-semibold flex items-center gap-1.5 border transition-colors ${
              remainingFree <= 2
                ? "bg-[#FBBF24]/10 border-[#FBBF24]/30 text-[#FBBF24]"
                : "bg-[#4ADE80]/10 border-[#4ADE80]/25 text-[#4ADE80]"
            }`}
            aria-label={t("atlasQuotaChip", { n: remainingFree })}
          >
            <Sparkles size={11} />
            {t("atlasQuotaChip", { n: remainingFree })}
          </button>
        )}
        <button
          onClick={() => setShowClearConfirm(true)}
          disabled={messageCount === 0}
          className={`w-9 h-9 rounded-full glass-card flex items-center justify-center flex-shrink-0 transition-all ${
            messageCount === 0
              ? "opacity-30 cursor-not-allowed"
              : "active:scale-95 hover:bg-white/10"
          }`}
          aria-label={t("atlasClear")}
          title={t("atlasClear")}
        >
          <Trash2 size={16} className="text-white/70" />
        </button>
      </div>

      {/* Context badge */}
      <div className="mb-3">
        <div className="glass-pill rounded-full px-3 py-1.5 inline-flex items-center gap-1.5">
          <Sparkles size={11} className="text-[#FF9500]" />
          <span className="text-[10px] text-white/70">
            {t("atlasContextPrefix")}{" "}
            <span className="text-white font-medium">{contextLabel}</span>
          </span>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                isActive ? "text-white" : "glass-card text-white/60"
              }`}
              style={
                isActive
                  ? { background: s.color, boxShadow: `0 0 16px ${s.color}50` }
                  : {}
              }
            >
              <Icon size={12} />
              {t(s.labelKey)}
            </button>
          );
        })}
      </div>

      {/* Section quick actions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-3"
        >
          {activeSection === "journal" && (
            <div className="space-y-2">
              {journalEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="glass-card p-3 text-xs">
                  <span className="text-white/40">{entry.emotion} • </span>
                  <span className="text-white/70">
                    {entry.content.slice(0, 80)}
                    {entry.content.length > 80 ? "..." : ""}
                  </span>
                </div>
              ))}
              <button
                onClick={() =>
                  sendMessage(
                    t("atlasAnalyzeJournalPrompt"),
                    "journal",
                  )
                }
                className="w-full py-2.5 rounded-xl glass-card text-[#64D2FF] text-xs font-medium flex items-center justify-center gap-2"
              >
                <Sparkles size={14} />
                {t("atlasAnalyzeJournal")}
              </button>
            </div>
          )}
          {activeSection === "motivation" && (
            <div className="space-y-2">
              <div className="glass-card p-3 text-center">
                <p className="text-white/70 text-xs">{t("atlasCurrentStreak")}</p>
                <p className="text-2xl font-bold gradient-primary-text">
                  {streakDays} {t("atlasDays")} 🔥
                </p>
              </div>
              <button
                onClick={() => sendMessage(t("atlasAskMotivationPrompt"), "motivation")}
                className="w-full py-2.5 rounded-xl glass-card text-[#FF9500] text-xs font-medium flex items-center justify-center gap-2"
              >
                <Zap size={14} />
                {t("atlasAskMotivation")}
              </button>
            </div>
          )}
          {activeSection === "progress" && (
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="glass-card p-2 text-center">
                  <div className="text-white font-bold text-lg">{streakDays}</div>
                  <div className="text-white/40 text-[10px]">{t("atlasDays")}</div>
                </div>
                <div className="glass-card p-2 text-center">
                  <div className="text-white font-bold text-lg">{unlockedRanks.length}</div>
                  <div className="text-white/40 text-[10px]">{t("profileBadges")}</div>
                </div>
                <div className="glass-card p-2 text-center">
                  <div className="text-white font-bold text-lg">{addictionScore}</div>
                  <div className="text-white/40 text-[10px]">{t("atlasScore")}</div>
                </div>
              </div>
              <button
                onClick={() =>
                  sendMessage(t("atlasSeeProgressPrompt"), "progress")
                }
                className="w-full py-2.5 rounded-xl glass-card text-[#4ADE80] text-xs font-medium flex items-center justify-center gap-2"
              >
                <Trophy size={14} />
                {t("atlasSeeProgress")}
              </button>
            </div>
          )}
          {activeSection === "crisis" && (
            <div className="space-y-2">
              <div className="glass-card p-3 bg-[#FF3B30]/10 border border-[#FF3B30]/30">
                <p className="text-white/80 text-xs leading-relaxed">
                  {t("atlasCrisisDesc")}
                </p>
              </div>
              <button
                onClick={() => navigate("panic")}
                className="w-full py-3 rounded-xl gradient-primary text-white text-sm font-bold flex items-center justify-center gap-2 pulse-glow"
              >
                <AlertTriangle size={16} />
                {t("atlasPanicButton")}
              </button>
              <button
                onClick={() => sendMessage(t("atlasCrisisPrompt"), "crisis")}
                className="w-full py-2.5 rounded-xl glass-card text-[#FF3B30] text-xs font-medium"
              >
                {t("atlasTalkToAtlas")}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto custom-scroll space-y-3 pb-3 min-h-[180px]">
        <AnimatePresence mode="wait">
          {chatMessages.length === 0 && !loading ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-3 glow-red"
              >
                <Bot size={28} className="text-white" />
              </motion.div>
              <p className="text-white font-semibold text-sm mb-1 font-[family-name:var(--font-poppins)]">
                {t("atlasGreeting")}
              </p>
              <p className="text-white/50 text-xs max-w-xs mb-4">
                {t("atlasGreetingDesc")}
              </p>
              <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
                {SUGGESTED_PROMPTS.map((prompt, i) => {
                  const Icon = prompt.icon;
                  return (
                    <motion.button
                      key={prompt.labelKey}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i + 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendMessage(t(prompt.labelKey))}
                      className="glass-pill rounded-full px-4 py-2.5 flex items-center gap-2.5 text-left transition-all hover:bg-white/10 group"
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{ background: `${prompt.color}20`, color: prompt.color }}
                      >
                        <Icon size={13} />
                      </span>
                      <span className="text-xs text-white/80 font-medium">{t(prompt.labelKey)}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {chatMessages.map((msg, idx) => {
                const isUser = msg.role === "user";
                const showAvatar = !isUser && (idx === 0 || chatMessages[idx - 1].role !== "assistant");
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="flex-shrink-0 w-7 self-end">
                        {showAvatar ? (
                          <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
                            <Bot size={14} className="text-white" />
                          </div>
                        ) : null}
                      </div>
                    )}
                    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[80%]`}>
                      <div
                        className={`relative px-3.5 py-2.5 text-sm ${
                          isUser
                            ? "gradient-primary text-white rounded-2xl rounded-br-md"
                            : "glass-card text-white/90 rounded-2xl rounded-bl-md"
                        }`}
                      >
                        {msg.content.split("\n").map((line, lineIdx) => (
                          <p key={lineIdx} className="leading-relaxed">
                            {renderInlineMarkdown(line)}
                          </p>
                        ))}
                      </div>
                      <span className="text-[9px] text-white/30 mt-1 px-1">
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <MessageSkeleton />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick action icons row */}
      <div className="flex items-center justify-center gap-3 mb-2.5">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleQuickAction(action.id)}
              className="flex flex-col items-center gap-1 group"
              aria-label={t(action.labelKey)}
            >
              <span
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center transition-all group-hover:bg-white/10"
                style={{ color: action.color }}
              >
                <Icon size={16} />
              </span>
              <span className="text-[9px] text-white/50 font-medium">{t(action.labelKey)}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex gap-2 items-end">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(input);
          }}
          placeholder={t("atlasTypeMessage")}
          className="flex-1 p-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF3B30] transition-colors"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            input.trim() && !loading
              ? "gradient-primary text-white glow-red"
              : "bg-white/5 text-white/30"
          }`}
          aria-label={t("atlasSend")}
        >
          <Send size={18} />
        </motion.button>
      </div>

      {/* Clear confirmation modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowClearConfirm(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-6 max-w-xs w-full text-center relative"
            >
              <div className="w-12 h-12 rounded-full bg-[#FF3B30]/20 flex items-center justify-center mx-auto mb-3">
                <Trash2 size={20} className="text-[#FF3B30]" />
              </div>
              <h3 className="text-white font-semibold text-base mb-1 font-[family-name:var(--font-poppins)]">
                {t("atlasClear")}
              </h3>
              <p className="text-white/50 text-xs mb-5">
                {t("atlasClearConfirmDesc", { n: messageCount })}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl glass-card text-white/80 text-sm font-medium"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => {
                    clearChat();
                    setShowClearConfirm(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold"
                >
                  {t("atlasClearAction")}
                </button>
              </div>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full glass-card flex items-center justify-center"
                aria-label={t("close")}
              >
                <X size={14} className="text-white/60" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AtlasScreen;
