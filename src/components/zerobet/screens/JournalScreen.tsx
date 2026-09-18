"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Plus, Trash2, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useStore, type Emotion, getStreakMultiplier } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { useLanguage } from "@/lib/i18n/useT";
import { EmptyState } from "@/components/zerobet/components/EmptyState";

// Map our internal `Language` union to BCP-47 locale codes accepted by Intl.
const INTL_LOCALES: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
  es: "es-ES",
};

/**
 * Returns a short weekday abbreviation (e.g. "Mon", "lun.", "lun") for the
 * given date, in the user's UI language. Uses Intl.DateTimeFormat so we
 * don't have to maintain per-language weekday dictionaries.
 */
function getWeekdayShort(date: Date, language: string): string {
  const locale = INTL_LOCALES[language] ?? "fr-FR";
  try {
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  } catch {
    return new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(date);
  }
}

/**
 * Returns a short locale-aware date label (e.g. "12 mars" / "Mar 12" / "12 mar").
 * Used for journal entries older than a week.
 */
function formatLocaleDate(iso: string, language: string): string {
  const locale = INTL_LOCALES[language] ?? "fr-FR";
  try {
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(new Date(iso));
  } catch {
    return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(new Date(iso));
  }
}

/**
 * Auto-generated mood entries (from MoodTracker) are stored as text:
 * "Humeur du jour : Calme 😌" (FR), "Today's mood: Calm 😌" (EN),
 * "Humor del día: Calma 😌" (ES). When the user switches languages, those
 * stored strings stay in their original language. This helper detects any
 * of the 3 known prefixes at the start of an entry's content and rewrites
 * it with the current language's prefix, so the journal always reads in
 * the user's active language.
 */
const MOOD_PREFIXES_BY_LANG: Record<string, string> = {
  fr: "Humeur du jour :",
  en: "Today's mood:",
  es: "Humor del día:",
};
function localizeMoodEntry(content: string, language: string, t: (k: string) => string): string {
  const currentPrefix = t("moodEntryPrefix");
  for (const lang of Object.keys(MOOD_PREFIXES_BY_LANG)) {
    const prefix = MOOD_PREFIXES_BY_LANG[lang];
    if (lang !== language && content.startsWith(prefix)) {
      return currentPrefix + content.slice(prefix.length);
    }
  }
  return content;
}

const EMOTIONS: { key: Emotion; labelKey: string; emoji: string; color: string }[] = [
  { key: "frustrated", labelKey: "emotionFrustrated", emoji: "😤", color: "#FF3B30" },
  { key: "strong", labelKey: "emotionStrong", emoji: "💪", color: "#4ADE80" },
  { key: "tempted", labelKey: "emotionTempted", emoji: "🎭", color: "#FBBF24" },
  { key: "calm", labelKey: "emotionCalm", emoji: "😌", color: "#64D2FF" },
  { key: "proud", labelKey: "emotionProud", emoji: "🦸", color: "#BF5AF2" },
  { key: "anxious", labelKey: "emotionAnxious", emoji: "😰", color: "#FF9500" },
];

const JOURNAL_PROMPTS = [
  { tKey: "journalPrompt1", emoji: "💭", color: "#64D2FF" },
  { tKey: "journalPrompt2", emoji: "🌟", color: "#4ADE80" },
  { tKey: "journalPrompt3", emoji: "🏆", color: "#FBBF24" },
];

function formatRelativeTime(iso: string, language: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1) return ""; // caller provides translation
  if (diffMin < 60) return `${diffMin}`;
  if (diffHours < 24) return `${diffHours}`;
  if (diffDays === 1) return "";
  if (diffDays < 7) return `${diffDays}`;
  return formatLocaleDate(iso, language);
}

function getDaysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(12, 0, 0, 0);
  return d;
}

export function JournalScreen() {
  const t = useT();
  const language = useLanguage();
  const { journalEntries, addJournalEntry, deleteJournalEntry, navigate, plan, addXP, completeQuest, dailyQuests, streakDays, journalUsage, consumeJournalEntry } = useStore();

  // Helper bound to the current language — used both for calendar weekday
  // headers and for the entry date footer.
  const formatWeekday = useCallback((d: Date) => getWeekdayShort(d, language), [language]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState<Emotion>("calm");
  const [trigger, setTrigger] = useState("");
  const [intensity, setIntensity] = useState(3);

  // Premium gating
  const isPremium = plan !== "free";

  // Weekly analysis
  const weeklyStats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
    const recent = journalEntries.filter((e) => new Date(e.createdAt).getTime() > weekAgo);
    const counts: Record<Emotion, number> = {
      frustrated: 0, strong: 0, tempted: 0, calm: 0, proud: 0, anxious: 0,
    };
    recent.forEach((e) => { counts[e.emotion]++; });
    const total = recent.length;
    return { counts, total, recent };
  }, [journalEntries]);

  // Mini calendar: last 7 days
  const calendarDays = useMemo(() => {
    const days: { date: Date; label: string; isToday: boolean; hasEntries: boolean; dotColor: string; entryCount: number; }[] = [];
    for (let i = 6; i >= 0; i--) {
      const dayDate = getDaysAgo(i);
      const dayStr = dayDate.toDateString();
      const entries = journalEntries.filter(
        (e) => new Date(e.createdAt).toDateString() === dayStr
      );
      const isToday = i === 0;
      // Get dominant emotion color for that day
      let dotColor = "rgba(255,255,255,0.1)";
      if (entries.length > 0) {
        const emotionCounts: Record<string, number> = {};
        entries.forEach((e) => {
          emotionCounts[e.emotion] = (emotionCounts[e.emotion] || 0) + 1;
        });
        const dominant = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
        if (dominant) {
          const emoData = EMOTIONS.find((em) => em.key === dominant[0]);
          dotColor = emoData?.color ?? "rgba(255,255,255,0.1)";
        }
      }
      days.push({
        date: dayDate,
        label: formatWeekday(dayDate),
        isToday,
        hasEntries: entries.length > 0,
        dotColor,
        entryCount: entries.length,
      });
    }
    return days;
  }, [journalEntries, formatWeekday]);

  const handleSubmit = () => {
    if (!content.trim()) return;
    addJournalEntry({
      content: content.trim(),
      emotion,
      trigger: trigger.trim() || undefined,
      intensity,
    });

    // Gamification — award XP & mark journal quest complete
    if (!dailyQuests.journal) {
      completeQuest("journal");
    } else {
      addXP(30, t("journalTitle"));
    }
    // Zerobet 2.0 — consume a free-tier journal slot when on the free plan
    if (!isPremium) consumeJournalEntry();
    const multiplier = getStreakMultiplier(streakDays);
    const adjusted = Math.round(30 * multiplier);
    toast.success(t("successXp", { n: adjusted }), {
      description: t("journalAddedEntry"),
      duration: 3000,
    });

    setContent("");
    setTrigger("");
    setEmotion("calm");
    setIntensity(3);
    setShowNewEntry(false);
  };

  const handlePromptClick = (promptText: string) => {
    setContent(promptText + " ");
    setShowNewEntry(true);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    const yesterday = new Date(Date.now() - 86400000);
    const isYesterday = d.toDateString() === yesterday.toDateString();
    const timeStr = `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
    if (isToday) return `${t("today")} ${timeStr}`;
    if (isYesterday) return `${t("yesterday")} ${timeStr}`;
    return formatLocaleDate(iso, language);
  };

  // Zerobet 2.0 — freemium rebalance: free users get 3 journal entries per
  // rolling week instead of a hard lock. Premium stays unlimited.
  const FREE_WEEKLY_LIMIT = 3;
  const now = new Date();
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - ((now.getUTCDay() + 6) % 7));
  const weekStartKey = monday.toISOString().slice(0, 10);
  const usedThisWeek =
    journalUsage.weekStart === weekStartKey ? journalUsage.count : 0;
  const remainingFree = isPremium ? Infinity : Math.max(0, FREE_WEEKLY_LIMIT - usedThisWeek);
  const quotaExhausted = !isPremium && remainingFree <= 0;

  if (quotaExhausted) {
    return (
      <div className="min-h-screen px-6 pt-14 pb-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mb-4 glow-yellow">
          <span className="text-4xl">📝</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">{t("journalQuotaTitle")}</h2>
        <p className="text-white/60 text-sm mb-6 max-w-xs">
          {t("journalQuotaDesc", { n: FREE_WEEKLY_LIMIT })}
        </p>
        <div className="glass-card p-4 mb-6 max-w-sm w-full">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-white/60">{t("journalQuotaUsedThisWeek")}</span>
            <span className="text-[#FBBF24] font-bold">
              {t("atlasQuotaCount", { used: FREE_WEEKLY_LIMIT, total: FREE_WEEKLY_LIMIT })}
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-full gradient-gold rounded-full" />
          </div>
          <p className="text-white/40 text-[11px] mt-3">{t("journalQuotaReset")}</p>
        </div>
        <button
          onClick={() => navigate("paywall")}
          className="w-full max-w-xs py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold glow-green"
        >
          {t("journalUpgradeToPremium")}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 pt-12 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("dashboard")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
            {t("journalTitle")}
          </h1>
          <p className="text-white/50 text-xs">{t("journalEntryCount", { n: journalEntries.length })}</p>
        </div>
        {/* Zerobet 2.0 — free-tier quota chip (hidden for premium users) */}
        {!isPremium && (
          <button
            onClick={() => navigate("paywall")}
            className={`flex-shrink-0 px-2.5 py-1.5 rounded-full text-[10px] font-semibold border ${
              remainingFree <= 1
                ? "bg-[#FBBF24]/10 border-[#FBBF24]/30 text-[#FBBF24]"
                : "bg-[#4ADE80]/10 border-[#4ADE80]/25 text-[#4ADE80]"
            }`}
            aria-label={t("journalQuotaChip", { n: remainingFree })}
          >
            {t("journalQuotaChip", { n: remainingFree })}
          </button>
        )}
        <button
          onClick={() => setShowNewEntry(true)}
          className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center active:scale-95"
          aria-label={t("journalNewEntry")}
        >
          <Plus size={20} className="text-white" />
        </button>
      </div>

      {/* Journal prompt suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <div className="flex items-center gap-2 mb-2.5">
          <Sparkles size={14} className="text-[#FBBF24]" />
          <h3 className="text-white/60 text-xs font-medium">{t("journalSuggestions")}</h3>
        </div>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1">
          {JOURNAL_PROMPTS.map((prompt, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.97 }}
              onClick={() => handlePromptClick(t(prompt.tKey))}
              className="flex-shrink-0 w-[200px] snap-start glass-card p-3.5 rounded-2xl text-left relative overflow-hidden"
              style={{
                borderLeft: `3px solid ${prompt.color}`,
              }}
            >
              <div
                className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl"
                style={{ background: `${prompt.color}15` }}
              />
              <div className="relative">
                <span className="text-xl mb-1.5 block">{prompt.emoji}</span>
                <p className="text-white/80 text-xs leading-relaxed">{t(prompt.tKey)}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mini calendar - last 7 days */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass-card p-3.5 mb-4"
      >
        <div className="flex items-center gap-2 mb-2.5">
          <Calendar size={14} className="text-[#64D2FF]" />
          <h3 className="text-white font-semibold text-xs">{t("journal7Days")}</h3>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day) => (
            <div key={day.date.toISOString()} className="flex flex-col items-center gap-1.5">
              <span className={`text-[9px] font-medium ${day.isToday ? "text-white" : "text-white/40"}`}>
                {t(day.label)}
              </span>
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold transition-all ${
                    day.isToday
                      ? "bg-white/10 text-white ring-1 ring-white/20"
                      : "text-white/30"
                  }`}
                >
                  {day.date.getDate()}
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: day.hasEntries ? day.dotColor : "rgba(255,255,255,0.1)",
                      boxShadow: day.hasEntries ? `0 0 6px ${day.dotColor}` : "none",
                    }}
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly analysis */}
      {weeklyStats.total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 mb-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-[#FF9500]" />
            <h3 className="text-white font-semibold text-sm">{t("journalAnalysis")}</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {EMOTIONS.slice(0, 6).map((emo) => {
              const count = weeklyStats.counts[emo.key];
              const pct = weeklyStats.total > 0 ? (count / weeklyStats.total) * 100 : 0;
              return (
                <div key={emo.key} className="text-center">
                  <div className="text-2xl mb-1">{emo.emoji}</div>
                  <div className="text-white font-bold text-sm">{count}</div>
                  <div className="text-white/40 text-[10px]">{t(emo.labelKey)}</div>
                  {pct > 0 && (
                    <div className="mt-1 h-0.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: emo.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Emotion distribution bar */}
          <div className="flex h-2 rounded-full overflow-hidden bg-white/5">
            {EMOTIONS.map((emo) => {
              const count = weeklyStats.counts[emo.key];
              const pct = weeklyStats.total > 0 ? (count / weeklyStats.total) * 100 : 0;
              if (pct === 0) return null;
              return (
                <motion.div
                  key={emo.key}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5 }}
                  style={{ background: emo.color }}
                />
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Entries */}
      <div className="space-y-3">
        <AnimatePresence>
          {journalEntries.map((entry, idx) => {
            const emo = EMOTIONS.find((e) => e.key === entry.emotion)!;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ delay: idx * 0.03 }}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  borderLeft: `3px solid ${emo.color}`,
                  background: `linear-gradient(135deg, ${emo.color}10 0%, rgba(255,255,255,0.03) 100%)`,
                }}
              >
                {/* Subtle glow behind emoji */}
                <div
                  className="absolute top-3 left-3 w-16 h-16 rounded-full blur-2xl pointer-events-none"
                  style={{ background: `${emo.color}20` }}
                />
                <div className="relative p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="text-3xl"
                        style={{
                          filter: `drop-shadow(0 0 8px ${emo.color}60)`,
                        }}
                      >
                        {emo.emoji}
                      </span>
                      <div>
                        <span className="text-white font-semibold text-sm">{t(emo.labelKey)}</span>
                        <div className="flex items-center gap-1.5 text-white/40 text-xs">
                          <Calendar size={10} />
                          {formatDate(entry.createdAt)}
                          <span className="text-white/20">•</span>
                          <span className="text-white/30">{formatRelativeTime(entry.createdAt, language)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < entry.intensity ? "" : "bg-white/10"
                          }`}
                          style={i < entry.intensity ? { background: emo.color } : {}}
                        />
                      ))}
                      <button
                        onClick={() => deleteJournalEntry(entry.id)}
                        className="ml-2 text-white/30 hover:text-[#FF3B30] transition-colors"
                        aria-label={t("delete")}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{localizeMoodEntry(entry.content, language, t)}</p>
                  {entry.trigger && (
                    <div className="mt-2 pt-2 border-t border-white/5">
                      <p className="text-white/40 text-xs">
                        <span className="text-white/60">{t("journalTriggerLabel")}</span> {entry.trigger}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {journalEntries.length === 0 && (
        <EmptyState
          variant="journal"
          title={t("journalEmptyTitle")}
          description={t("journalEmptyDesc")}
          onCta={() => setShowNewEntry(true)}
          ctaLabel={t("journalNewEntry")}
        />
      )}

      {/* New entry modal */}
      <AnimatePresence>
        {showNewEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNewEntry(false)}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-5 max-w-[430px] w-full rounded-t-3xl safe-bottom max-h-[90vh] overflow-y-auto custom-scroll"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{t("journalNewEntry")}</h3>
                <button onClick={() => setShowNewEntry(false)} className="text-white/50 text-sm">
                  {t("cancel")}
                </button>
              </div>

              {/* Emotion selector */}
              <label className="text-white/60 text-xs mb-2 block">{t("journalHowFeel")}</label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {EMOTIONS.map((emo) => (
                  <button
                    key={emo.key}
                    onClick={() => setEmotion(emo.key)}
                    className={`p-3 rounded-2xl flex flex-col items-center gap-1 transition-all border ${
                      emotion === emo.key ? "" : "glass-card border-transparent"
                    }`}
                    style={emotion === emo.key ? {
                      background: `${emo.color}25`,
                      borderColor: emo.color,
                    } : {}}
                  >
                    <span className="text-2xl">{emo.emoji}</span>
                    <span className={`text-xs ${emotion === emo.key ? "text-white" : "text-white/60"}`}>
                      {t(emo.labelKey)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <label className="text-white/60 text-xs mb-2 block">{t("journalWhatYouFeel")}</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t("journalContentPlaceholder")}
                rows={4}
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/40 resize-none mb-4 transition-all"
              />

              {/* Trigger */}
              <label className="text-white/60 text-xs mb-2 block">{t("journalTrigger")}</label>
              <input
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                placeholder={t("journalTriggerPlaceholder")}
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/40 mb-4 transition-all"
              />

              {/* Intensity */}
              <label className="text-white/60 text-xs mb-2 block">
                {t("journalIntensityLabel", { n: intensity })}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full accent-[#10B981] mb-5"
              />

              <button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className={`w-full py-4 rounded-2xl font-[family-name:var(--font-poppins)] font-semibold text-base transition-all ${
                  content.trim()
                    ? "gradient-primary text-white glow-green active:scale-[0.98]"
                    : "bg-white/5 text-white/30"
                }`}
              >
                {t("journalSave")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
