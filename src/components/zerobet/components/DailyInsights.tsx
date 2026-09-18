"use client";

import { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RefreshCw, Sparkles } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { useT } from "@/lib/i18n/useT";

type InsightType =
  | "early"
  | "repair"
  | "control"
  | "inspiration"
  | "journal"
  | "panic"
  | "default";

interface Insight {
  /** i18n key for the insight message text. */
  textKey: string;
  /** Optional interpolation params for the text key. */
  textParams?: Record<string, string | number>;
  type: InsightType;
  emoji: string;
  accent: string;
  gradient: string;
}

function getStreakInsight(streak: number): Pick<Insight, "textKey" | "type"> {
  if (streak < 7) {
    return { textKey: "dailyInsightEarly", type: "early" };
  }
  if (streak < 30) {
    return { textKey: "dailyInsightRepair", type: "repair" };
  }
  if (streak < 90) {
    return { textKey: "dailyInsightControl", type: "control" };
  }
  return { textKey: "dailyInsightInspiration", type: "inspiration" };
}

function analyzeJournalEmotions(
  emotions: { emotion: string; intensity: number }[]
): Pick<Insight, "textKey" | "type"> | null {
  if (emotions.length === 0) return null;
  const frustratedCount = emotions.filter(
    (e) => e.emotion === "frustrated" || e.emotion === "tempted"
  ).length;
  const positiveCount = emotions.filter(
    (e) => e.emotion === "calm" || e.emotion === "proud" || e.emotion === "strong"
  ).length;
  const avgIntensity =
    emotions.reduce((s, e) => s + e.intensity, 0) / emotions.length;

  if (positiveCount > frustratedCount) {
    return { textKey: "dailyInsightJournalPositive", type: "journal" };
  }
  if (frustratedCount > positiveCount && avgIntensity > 3) {
    return { textKey: "dailyInsightJournalTension", type: "journal" };
  }
  return { textKey: "dailyInsightJournalDefault", type: "journal" };
}

const TYPE_STYLE: Record<InsightType, { emoji: string; accent: string; gradient: string }> = {
  early: {
    emoji: "🌱",
    accent: "#4ADE80",
    gradient: "linear-gradient(135deg, rgba(74,222,128,0.18) 0%, rgba(255,149,0,0.12) 100%)",
  },
  repair: {
    emoji: "🧠",
    accent: "#64D2FF",
    gradient: "linear-gradient(135deg, rgba(100,210,255,0.18) 0%, rgba(74,222,128,0.12) 100%)",
  },
  control: {
    emoji: "💪",
    accent: "#FF9500",
    gradient: "linear-gradient(135deg, rgba(255,149,0,0.20) 0%, rgba(255,59,48,0.14) 100%)",
  },
  inspiration: {
    emoji: "🌟",
    accent: "#FBBF24",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.20) 0%, rgba(191,90,242,0.14) 100%)",
  },
  journal: {
    emoji: "📓",
    accent: "#BF5AF2",
    gradient: "linear-gradient(135deg, rgba(191,90,242,0.18) 0%, rgba(100,210,255,0.12) 100%)",
  },
  panic: {
    emoji: "🛡️",
    accent: "#FF3B30",
    gradient: "linear-gradient(135deg, rgba(255,59,48,0.18) 0%, rgba(74,222,128,0.12) 100%)",
  },
  default: {
    emoji: "💡",
    accent: "#FF9500",
    gradient: "linear-gradient(135deg, rgba(255,149,0,0.18) 0%, rgba(251,191,36,0.10) 100%)",
  },
};

function buildInsights(
  streak: number,
  journal: { emotion: string; intensity: number; createdAt: string }[],
  panicEvents: { createdAt: string; resolved: boolean }[]
): Insight[] {
  const insights: Insight[] = [];

  // Streak insight
  const streakInsight = getStreakInsight(streak);
  insights.push({
    ...streakInsight,
    ...TYPE_STYLE[streakInsight.type],
  });

  // Panic events insight (this week)
  const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
  const recentPanics = panicEvents.filter(
    (p) => new Date(p.createdAt).getTime() > weekAgo
  );
  if (recentPanics.length > 0) {
    insights.push({
      textKey: "dailyInsightPanic",
      textParams: { count: recentPanics.length },
      type: "panic",
      ...TYPE_STYLE.panic,
    });
  }

  // Journal emotions insight
  const recentJournal = journal.filter(
    (j) => new Date(j.createdAt).getTime() > weekAgo
  );
  const journalInsight = analyzeJournalEmotions(
    recentJournal.map((j) => ({ emotion: j.emotion, intensity: j.intensity }))
  );
  if (journalInsight) {
    insights.push({ ...journalInsight, ...TYPE_STYLE[journalInsight.type] });
  }

  // Default if no other insights (shouldn't happen since streak always returns one)
  if (insights.length === 0) {
    insights.push({
      textKey: "dailyInsightDefault",
      type: "default",
      ...TYPE_STYLE.default,
    });
  }

  return insights;
}

export function DailyInsights() {
  const { streakDays, journalEntries, panicEvents, navigate } = useStore();
  const t = useT();
  const [insightIdx, setInsightIdx] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const insights = useMemo(
    () =>
      buildInsights(
        streakDays,
        journalEntries.map((j) => ({
          emotion: j.emotion,
          intensity: j.intensity,
          createdAt: j.createdAt,
        })),
        panicEvents.map((p) => ({
          createdAt: p.createdAt,
          resolved: p.resolved,
        }))
      ),
    [streakDays, journalEntries, panicEvents]
  );

  const current = insights[insightIdx % insights.length];

  const handleRefresh = useCallback(() => {
    sound.playPop();
    haptics.light();
    setRefreshing(true);
    setTimeout(() => {
      setInsightIdx((i) => (i + 1) % insights.length);
      setRefreshing(false);
    }, 400);
  }, [insights.length]);

  const handleViewStats = useCallback(() => {
    sound.playClick();
    haptics.light();
    navigate("stats");
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong p-5 mb-4 relative overflow-hidden"
      style={{ background: current.gradient }}
    >
      {/* Decorative blurs */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30"
        style={{ background: current.accent }}
      />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/5 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">{current.emoji}</span>
            <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">
              {t("dailyInsightTitle")}
            </span>
          </div>
          <button
            onClick={handleRefresh}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center active:scale-95 transition-transform"
            aria-label={t("dailyInsightAriaRefresh")}
          >
            <motion.div
              animate={refreshing ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: refreshing ? 0.6 : 0,
                repeat: refreshing ? Infinity : 0,
                ease: "linear",
              }}
            >
              <RefreshCw size={14} className="text-white/60" />
            </motion.div>
          </button>
        </div>

        {/* Insight text with transition */}
        <AnimatePresence mode="wait">
          <motion.p
            key={insightIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-white text-sm leading-relaxed font-medium mb-4"
          >
            {t(current.textKey, current.textParams)}
          </motion.p>
        </AnimatePresence>

        {/* Insight indicator dots */}
        {insights.length > 1 && (
          <div className="flex items-center gap-1.5 mb-3">
            {insights.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  sound.playClick();
                  haptics.selection();
                  setInsightIdx(i);
                }}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === insightIdx % insights.length ? 20 : 6,
                  background:
                    i === insightIdx % insights.length
                      ? current.accent
                      : "rgba(255,255,255,0.2)",
                }}
                aria-label={t("dailyInsightAriaDot", { n: i + 1 })}
              />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-white/40 text-[11px]">
            <Sparkles size={11} />
            <span>{t("dailyInsightGenerated")}</span>
          </div>
          <button
            onClick={handleViewStats}
            className="flex items-center gap-1 text-xs font-semibold active:scale-95 transition-transform"
            style={{ color: current.accent }}
          >
            {t("dailyInsightViewMore")}
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
