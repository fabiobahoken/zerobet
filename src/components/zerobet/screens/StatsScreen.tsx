"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Flame,
  Wallet,
  BookOpen,
  Shield,
  Calendar,
  TrendingUp,
  Grid3x3,
  PieChart as PieChartIcon,
  Award,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Clock,
  Crown,
  Lock,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useStore, type Emotion } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { getCurrentRank, getNextRank, PARCOURS_RANKS } from "@/lib/data/parcours-data";
import {
  MOOD_OPTIONS,
  getMoodMeta,
  MOOD_INSIGHTS,
} from "@/lib/data/mood-data";
import {
  ChartSkeleton,
  StatsCardGridSkeleton,
} from "@/components/zerobet/components/Skeletons";
import { PullToRefresh } from "@/components/zerobet/components/PullToRefresh";
import { WeeklyReport } from "@/components/zerobet/components/WeeklyReport";
import { EmptyState } from "@/components/zerobet/components/EmptyState";
import { AnimatedNumber } from "@/components/zerobet/components/AnimatedNumber";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { toast } from "sonner";

// ---------- Constants & helpers ----------

const MOOD_VALUE: Record<Emotion, number> = {
  frustrated: 1,
  anxious: 2,
  tempted: 3,
  calm: 4,
  proud: 5,
  strong: 5,
};

const EMOTION_LABELS: Record<Emotion, string> = {
  frustrated: "Frustré",
  anxious: "Anxieux",
  tempted: "Tenté",
  calm: "Calme",
  proud: "Fier",
  strong: "Fort",
};

const EMOTION_COLORS: Record<Emotion, string> = {
  frustrated: "#FF3B30",
  anxious: "#F59E0B",
  tempted: "#FBBF24",
  calm: "#2DD4BF",
  proud: "#C084FC",
  strong: "#4ADE80",
};

const EMOTION_EMOJI: Record<Emotion, string> = {
  frustrated: "😤",
  anxious: "😰",
  tempted: "🎭",
  calm: "😌",
  proud: "🦸",
  strong: "💪",
};

const WEEKDAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

function formatFCFA(n: number): string {
  return Math.round(n).toLocaleString("fr-FR");
}

function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function dateKey(d: Date): string {
  return startOfDay(d).toISOString();
}

function isSameDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

function shortDay(d: Date): string {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

// ---------- Motion variants ----------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 26 },
  },
};

// ---------- Section title ----------

function SectionTitle({
  icon: Icon,
  iconColor,
  title,
  right,
}: {
  icon: typeof Calendar;
  iconColor: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-white font-semibold text-sm flex items-center gap-2 font-[family-name:var(--font-poppins)]">
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: `${iconColor}22` }}
        >
          <Icon size={15} style={{ color: iconColor }} />
        </span>
        {title}
      </h2>
      {right}
    </div>
  );
}

// ---------- Custom tooltips ----------

interface MoodTooltipPayloadEntry {
  value: number | null;
  payload: {
    date: string;
    mood: number | null;
    emotion: Emotion | null;
    count: number;
  };
}

function MoodTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: MoodTooltipPayloadEntry[];
}) {
  const t = useT();
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0].payload;
  if (p.mood === null) {
    return (
      <div className="glass-card-strong px-3 py-2 rounded-xl text-xs">
        <div className="text-white/80 font-medium">{p.date}</div>
        <div className="text-white/50">{t("statsNoEntry")}</div>
      </div>
    );
  }
  return (
    <div className="glass-card-strong px-3 py-2 rounded-xl text-xs">
      <div className="text-white/80 font-medium">{p.date}</div>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span>{EMOTION_EMOJI[p.emotion as Emotion]}</span>
        <span
          className="font-semibold"
          style={{ color: EMOTION_COLORS[p.emotion as Emotion] }}
        >
          {EMOTION_LABELS[p.emotion as Emotion]}
        </span>
      </div>
      {p.count > 1 && (
        <div className="text-white/40 mt-0.5">{p.count} entrées</div>
      )}
    </div>
  );
}

interface SavingsTooltipPayloadEntry {
  value: number;
  payload: {
    date: string;
    cumul: number;
    daily: number;
    isToday: boolean;
  };
}

function SavingsTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: SavingsTooltipPayloadEntry[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0].payload;
  return (
    <div className="glass-card-strong px-3 py-2 rounded-xl text-xs">
      <div className="text-white/80 font-medium">{p.date}</div>
      <div className="text-[#4ADE80] font-semibold mt-0.5">
        {formatFCFA(p.cumul)} FCFA
      </div>
      <div className="text-white/40">
        +{formatFCFA(p.daily)} aujourd&apos;hui
      </div>
    </div>
  );
}

// ---------- Main screen ----------

export function StatsScreen() {
  const t = useT();
  const {
    streakDays,
    weeklyBetAmount,
    journalEntries,
    panicEvents,
    addictionScore,
    unlockedRanks,
    navigate,
    adminStreakOverride,
    plan,
    streakHistory,
    xpHistory,
  } = useStore();

  const isPremium = plan !== "free";

  // Brief loading state so the ChartSkeleton is visible on first mount
  const [chartsLoading, setChartsLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setChartsLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  // Pull-to-refresh handler — re-trigger the chart loading skeleton briefly.
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    setRefreshing(true);
    setChartsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setChartsLoading(false);
    setRefreshing(false);
  };

  const effectiveStreak =
    adminStreakOverride !== null ? adminStreakOverride : streakDays;

  const dailySaved = Math.round(weeklyBetAmount / 7);
  const totalSaved = effectiveStreak * dailySaved;
  const journalCount = journalEntries.length;
  const panicCount = panicEvents.length;

  // ---------- Section 2: Mood trends (last 14 days) ----------
  const moodData = useMemo(() => {
    const today = startOfDay(new Date());
    const days: {
      date: string;
      mood: number | null;
      emotion: Emotion | null;
      count: number;
    }[] = [];
    for (let i = 13; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      const dayEntries = journalEntries.filter((e) =>
        isSameDay(new Date(e.createdAt), day)
      );
      if (dayEntries.length === 0) {
        days.push({
          date: shortDay(day),
          mood: null,
          emotion: null,
          count: 0,
        });
      } else {
        const avg =
          dayEntries.reduce((s, e) => s + MOOD_VALUE[e.emotion], 0) /
          dayEntries.length;
        // Pick dominant emotion (highest value, tie -> most recent)
        const counts: Record<Emotion, number> = {
          frustrated: 0,
          anxious: 0,
          tempted: 0,
          calm: 0,
          proud: 0,
          strong: 0,
        };
        dayEntries.forEach((e) => {
          counts[e.emotion] += 1;
        });
        const dominant = (Object.keys(counts) as Emotion[]).sort(
          (a, b) => counts[b] - counts[a]
        )[0];
        days.push({
          date: shortDay(day),
          mood: Math.round(avg),
          emotion: dominant,
          count: dayEntries.length,
        });
      }
    }
    return days;
  }, [journalEntries]);

  const hasMoodData = moodData.some((d) => d.mood !== null);

  // ---------- Section 3: Savings growth (last 30 days, cumulative) ----------
  const savingsData = useMemo(() => {
    const today = startOfDay(new Date());
    const days: {
      date: string;
      cumul: number;
      daily: number;
      isToday: boolean;
    }[] = [];
    for (let i = 29; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      // Did the user have a streak active on this day?
      // Streak started `effectiveStreak` days ago. Days within streak are the
      // last `effectiveStreak` days (including today).
      const withinStreak = i < effectiveStreak;
      const daily = withinStreak ? dailySaved : 0;
      days.push({
        date: shortDay(day),
        cumul: 0, // computed below
        daily,
        isToday: i === 0,
      });
    }
    // Compute cumulative
    let running = 0;
    for (const d of days) {
      running += d.daily;
      d.cumul = running;
    }
    return days;
  }, [effectiveStreak, dailySaved]);

  const savingsTotal30 = savingsData[savingsData.length - 1]?.cumul ?? 0;

  // ---------- Section 4: Heatmap (last 35 days, 7x5 grid) ----------
  const heatmapCells = useMemo(() => {
    const today = startOfDay(new Date());
    // Find the Monday of the current week, then go back 4 weeks (5 weeks total)
    const dow = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const daysSinceMonday = dow === 0 ? 6 : dow - 1;
    const start = new Date(today);
    start.setDate(start.getDate() - daysSinceMonday - 28);

    // Map panic event day keys
    const panicDayKeys = new Set(
      panicEvents.map((p) => dateKey(new Date(p.createdAt)))
    );

    // Streak window: [today - effectiveStreak + 1, today]
    const streakStart = new Date(today);
    streakStart.setDate(streakStart.getDate() - Math.max(0, effectiveStreak - 1));

    const cells: {
      date: Date;
      status: "green" | "red" | "gray" | "future";
      isToday: boolean;
    }[] = [];
    for (let i = 0; i < 35; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const key = dateKey(d);
      const isToday = isSameDay(d, today);
      const isFuture = d.getTime() > today.getTime();
      let status: "green" | "red" | "gray" | "future" = "gray";
      if (isFuture) {
        status = "future";
      } else if (panicDayKeys.has(key)) {
        status = "red";
      } else if (d.getTime() >= streakStart.getTime() && d.getTime() <= today.getTime()) {
        status = "green";
      } else {
        status = "gray";
      }
      cells.push({ date: d, status, isToday });
    }
    return cells;
  }, [panicEvents, effectiveStreak]);

  // Counts for legend summary
  const heatCounts = useMemo(() => {
    let green = 0;
    let red = 0;
    let gray = 0;
    for (const c of heatmapCells) {
      if (c.status === "green") green++;
      else if (c.status === "red") red++;
      else if (c.status === "gray") gray++;
    }
    return { green, red, gray };
  }, [heatmapCells]);

  // ---------- Section 5: Emotion distribution ----------
  const emotionData = useMemo(() => {
    const counts: Record<Emotion, number> = {
      frustrated: 0,
      anxious: 0,
      tempted: 0,
      calm: 0,
      proud: 0,
      strong: 0,
    };
    journalEntries.forEach((e) => {
      counts[e.emotion] += 1;
    });
    return (Object.keys(counts) as Emotion[])
      .map((k) => ({
        name: EMOTION_LABELS[k],
        key: k,
        value: counts[k],
        color: EMOTION_COLORS[k],
      }))
      .filter((d) => d.value > 0);
  }, [journalEntries]);

  const totalEmotions = emotionData.reduce((s, d) => s + d.value, 0);
  const hasEmotionData = emotionData.length > 0;

  // ---------- Mood visualizations (distribution / timeline / streak / insight) ----------

  /**
   * Relative time formatter for the timeline card.
   * Mirrors the format used elsewhere in the app (Journal/Triggers screens).
   */
  const formatRelativeTime = useCallback((iso: string): string => {
    const now = Date.now();
    const then = new Date(iso).getTime();
    const diffMs = Math.max(0, now - then);
    const diffMin = Math.floor(diffMs / 60_000);
    const diffHours = Math.floor(diffMs / 3_600_000);
    const diffDays = Math.floor(diffMs / 86_400_000);
    if (diffMin < 1) return t("statsJustNow");
    if (diffMin < 60) return t("statsMinutesAgo", { n: diffMin });
    if (diffHours < 24) return t("statsHoursAgo", { n: diffHours });
    if (diffDays === 1) return t("yesterday");
    if (diffDays < 7) return t("statsDaysAgo", { n: diffDays });
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  }, [t]);

  // (a) Distribution over the last 14 days — one row per quick-capture mood.
  const moodDistribution = useMemo(() => {
    const cutoff = Date.now() - 14 * 86_400_000;
    const recent = journalEntries.filter(
      (e) => new Date(e.createdAt).getTime() >= cutoff
    );
    const total = recent.length;
    return MOOD_OPTIONS.map((m) => {
      const count = recent.filter((e) => e.emotion === m.key).length;
      const percent = total > 0 ? Math.round((count / total) * 100) : 0;
      return { ...m, count, percent, total };
    });
  }, [journalEntries]);

  const hasMoodDistribution = moodDistribution.some((m) => m.count > 0);

  // (b) Timeline — last 10 mood entries (most recent first).
  const moodTimeline = useMemo(() => {
    return [...journalEntries]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 10)
      .map((e) => {
        const meta = getMoodMeta(e.emotion);
        // Treat the auto-generated "Humeur du jour : ..." content as having no
        // user-written preview — only show a preview for real journal entries.
        const isQuickMood =
          e.trigger === "mood-tracker" ||
          (e.content ?? "").startsWith("Humeur du jour :");
        const preview = isQuickMood
          ? ""
          : (e.content ?? "").slice(0, 40).trim() +
            ((e.content ?? "").length > 40 ? "…" : "");
        return {
          id: e.id,
          emoji: meta.emoji,
          label: meta.label,
          color: meta.color,
          relative: formatRelativeTime(e.createdAt),
          isQuickMood: e.trigger === "mood-tracker",
          preview,
          createdAt: e.createdAt,
        };
      });
  }, [journalEntries, formatRelativeTime]);

  // (c) Streak — for each of the last 7 days, did the user log ≥1 mood?
  const moodStreak = useMemo(() => {
    const today = startOfDay(new Date());
    const days: {
      date: Date;
      label: string;
      hasEntry: boolean;
      dominantColor: string;
      dominantEmoji: string;
    }[] = [];
    const weekdayLetters = ["L", "M", "M", "J", "V", "S", "D"];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      const dayEntries = journalEntries.filter((e) =>
        isSameDay(new Date(e.createdAt), day)
      );
      // Dominant mood = most frequent emotion that day (tie → most recent)
      let dominantColor = "rgba(255,255,255,0.08)";
      let dominantEmoji = "";
      if (dayEntries.length > 0) {
        const counts: Record<Emotion, number> = {
          frustrated: 0,
          anxious: 0,
          tempted: 0,
          calm: 0,
          proud: 0,
          strong: 0,
        };
        dayEntries.forEach((e) => {
          counts[e.emotion] += 1;
        });
        const sorted = (Object.keys(counts) as Emotion[]).sort((a, b) => {
          if (counts[b] !== counts[a]) return counts[b] - counts[a];
          // Tie-break: most recent entry among the two
          const lastA =
            dayEntries
              .filter((e) => e.emotion === a)
              .map((e) => new Date(e.createdAt).getTime())
              .sort((x, y) => y - x)[0] ?? 0;
          const lastB =
            dayEntries
              .filter((e) => e.emotion === b)
              .map((e) => new Date(e.createdAt).getTime())
              .sort((x, y) => y - x)[0] ?? 0;
          return lastB - lastA;
        });
        const dom = sorted[0];
        const meta = getMoodMeta(dom);
        dominantColor = meta.color;
        dominantEmoji = meta.emoji;
      }
      // ISO weekday: Mon=1..Sun=7 → index 0..6 for our letters
      const isoDow = ((day.getDay() + 6) % 7); // 0=Mon..6=Sun
      days.push({
        date: day,
        label: weekdayLetters[isoDow],
        hasEntry: dayEntries.length > 0,
        dominantColor,
        dominantEmoji,
      });
    }
    const activeDays = days.filter((d) => d.hasEntry).length;
    return { days, activeDays, total: 7 };
  }, [journalEntries]);

  // (d) Dominant mood across all journal entries — used for the insight card.
  const dominantMood = useMemo<{
    key: Emotion;
    emoji: string;
    label: string;
    color: string;
    count: number;
    percent: number;
  } | null>(() => {
    if (journalEntries.length === 0) return null;
    const counts: Record<Emotion, number> = {
      frustrated: 0,
      anxious: 0,
      tempted: 0,
      calm: 0,
      proud: 0,
      strong: 0,
    };
    journalEntries.forEach((e) => {
      counts[e.emotion] += 1;
    });
    const sorted = (Object.keys(counts) as Emotion[]).sort(
      (a, b) => counts[b] - counts[a]
    );
    const key = sorted[0];
    const meta = getMoodMeta(key);
    const count = counts[key];
    return {
      key,
      emoji: meta.emoji,
      label: meta.label,
      color: meta.color,
      count,
      percent: Math.round((count / journalEntries.length) * 100),
    };
  }, [journalEntries]);

  const handlePremiumInsightTap = useCallback(() => {
    sound.playClick();
    haptics.medium();
    toast.info(t("statsPremiumInsightToast"), {
      description: t("statsPremiumInsightToastDesc"),
      duration: 2500,
    });
    navigate("paywall");
  }, [navigate, t]);

  // ---------- Section 6: Achievement progress ----------
  const totalRanks = PARCOURS_RANKS.length; // 13
  const unlockedCount = unlockedRanks.length;
  const achievementPercent = Math.min(
    100,
    Math.round((unlockedCount / totalRanks) * 100)
  );
  const currentRank = getCurrentRank(effectiveStreak);
  const nextRank = getNextRank(effectiveStreak);

  // ---------- Section 7: Weekly summary ----------
  const weekDaysClean = Math.min(7, effectiveStreak);
  const weekSavings = weeklyBetAmount; // 7 * (weeklyBetAmount/7)
  const weekCrisesAvoided = panicEvents.filter((p) => {
    const d = new Date(p.createdAt);
    const weekAgo = Date.now() - 7 * 86400000;
    return d.getTime() >= weekAgo;
  }).length;

  // ---------- Overview cards config ----------
  const overviewCards = [
    {
      icon: Flame,
      label: t("statsDaysWithoutBet"),
      value: effectiveStreak.toString(),
      suffix: effectiveStreak > 1 ? t("days") : t("statsDay"),
      gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
      iconBg: "rgba(251,191,36,0.18)",
      iconColor: "#FBBF24",
      glow: "glow-yellow",
    },
    {
      icon: Wallet,
      label: t("financeTotalSaved"),
      value: formatFCFA(totalSaved),
      suffix: "FCFA",
      gradient: "linear-gradient(135deg, #4ADE80 0%, #2DD4BF 100%)",
      iconBg: "rgba(74,222,128,0.18)",
      iconColor: "#4ADE80",
      glow: "glow-green",
    },
    {
      icon: BookOpen,
      label: t("statsJournalEntries"),
      value: journalCount.toString(),
      suffix: journalCount > 1 ? t("statsEntries") : t("statsEntry"),
      gradient: "linear-gradient(135deg, #2DD4BF 0%, #2DD4BF 100%)",
      iconBg: "rgba(45, 212, 191,0.18)",
      iconColor: "#2DD4BF",
      glow: "glow-blue",
    },
    {
      icon: Shield,
      label: t("statsCrisesAvoided"),
      value: panicCount.toString(),
      suffix: panicCount > 1 ? t("statsCrises") : t("statsCrisis"),
      gradient: "linear-gradient(135deg, #C084FC 0%, #7C3AED 100%)",
      iconBg: "rgba(192, 132, 252,0.18)",
      iconColor: "#C084FC",
      glow: "glow-purple",
    },
  ];

  return (
    <div className="min-h-screen px-5 pt-12 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="flex items-center gap-3 mb-6"
      >
        <button
          onClick={() => navigate("dashboard")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
          aria-label={t("backToDashboard")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)] tracking-tight">
            {t("statsTitleMain")}
          </h1>
          <p className="text-white/50 text-xs">{t("statsSubtitle")}</p>
        </div>
        {addictionScore > 0 && (
          <div className="glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles size={12} className="text-[#F59E0B]" />
            <span className="text-white/80 text-xs font-semibold">
              {t("statsScoreLabel")} {addictionScore}
            </span>
          </div>
        )}
      </motion.div>

      <PullToRefresh onRefresh={handleRefresh} isRefreshing={refreshing}>
      {/* ============== Zerobet 2.0: Weekly report (renders instantly) ============== */}
      <WeeklyReport
        streakHistory={streakHistory}
        journalEntries={journalEntries}
        panicEvents={panicEvents}
        xpHistory={xpHistory}
      />
      {chartsLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-5"
        >
          <StatsCardGridSkeleton />
          <ChartSkeleton height={200} />
          <ChartSkeleton height={180} />
          <ChartSkeleton height={220} />
        </motion.div>
      ) : (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        {/* ============== Section 1: Overview cards (2x2 grid) ============== */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          {overviewCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                whileTap={{ scale: 0.97 }}
                className={`glass-card-strong p-4 relative overflow-hidden ${card.glow}`}
              >
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 blur-2xl"
                  style={{ background: card.iconColor }}
                />
                <div className="relative">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                    style={{ background: card.iconBg }}
                  >
                    <Icon size={18} style={{ color: card.iconColor }} />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-2xl font-extrabold text-white font-[family-name:var(--font-poppins)] leading-tight"
                  >
                    {card.value}
                  </motion.div>
                  <div className="text-white/40 text-[10px] mt-0.5">
                    {card.suffix}
                  </div>
                  <div className="text-white/60 text-xs mt-1 font-medium">
                    {card.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ============== Section 2: Mood trends chart ============== */}
        <motion.div variants={itemVariants} className="glass-card p-4">
          <SectionTitle
            icon={Calendar}
            iconColor="#2DD4BF"
            title={t("statsMoodTrend")}
            right={
              <span className="text-[10px] text-white/40">{t("statsLast14Days")}</span>
            }
          />
          {hasMoodData ? (
            <div className="w-full" style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={moodData}
                  margin={{ top: 8, right: 8, left: -22, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ADE80" stopOpacity={0.5} />
                      <stop offset="50%" stopColor="#FBBF24" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#FF3B30" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.06)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={false}
                    interval={1}
                  />
                  <YAxis
                    domain={[1, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }}
                    axisLine={false}
                    tickLine={false}
                    width={32}
                  />
                  <Tooltip
                    content={<MoodTooltip />}
                    cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="#FBBF24"
                    strokeWidth={2.5}
                    fill="url(#moodGradient)"
                    connectNulls
                    dot={(props: {
                      cx?: number;
                      cy?: number;
                      payload?: MoodTooltipPayloadEntry["payload"];
                      index?: number;
                    }) => {
                      const { cx, cy, payload } = props;
                      if (!payload || payload.mood === null)
                        // Unique key per index — two "empty" dots must not share a key
                        return <g key={`empty-${props.index}`} />;
                      const color = payload.emotion
                        ? EMOTION_COLORS[payload.emotion]
                        : "#FBBF24";
                      return (
                        <circle
                          key={`dot-${payload.date}`}
                          cx={cx}
                          cy={cy}
                          r={3}
                          fill={color}
                          stroke="#070B0E"
                          strokeWidth={1.5}
                        />
                      );
                    }}
                    activeDot={{ r: 5, fill: "#F59E0B", stroke: "#070B0E", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState
              variant="stats"
              title={t("statsNoMoodTitle")}
              description={t("statsNoMoodDesc")}
              ctaLabel={t("statsWriteNow")}
              onCta={() => navigate("journal")}
              compact
            />
          )}
          {/* Mood legend */}
          {hasMoodData && (
            <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-2 justify-center">
              {(Object.keys(EMOTION_LABELS) as Emotion[]).map((e) => (
                <div
                  key={e}
                  className="flex items-center gap-1 text-[10px] text-white/50"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: EMOTION_COLORS[e] }}
                  />
                  {EMOTION_LABELS[e]}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ============== Section 2b: Mood distribution (last 14 days) ============== */}
        {hasMoodDistribution && (
          <motion.div
            variants={itemVariants}
            className="glass-card p-4 premium-shimmer relative overflow-hidden card-hover"
          >
            <SectionTitle
              icon={BarChart3}
              iconColor="#F59E0B"
              title={t("statsMoodDistribution")}
              right={
                <span className="text-[10px] text-white/40">
                  {t("statsLast14Days")}
                </span>
              }
            />
            <p className="text-white/40 text-[11px] -mt-1 mb-3">
              {t("statsOverEntries", { n: moodDistribution[0]?.total ?? 0 })}
            </p>
            <div className="space-y-2.5">
              {moodDistribution
                .slice()
                .sort((a, b) => b.count - a.count)
                .map((m) => {
                  const widthPct = Math.max(
                    2,
                    m.percent
                  );
                  return (
                    <div key={m.key} className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 w-[88px] flex-shrink-0">
                        <span className="text-sm leading-none">{m.emoji}</span>
                        <span
                          className="text-[11px] font-medium truncate"
                          style={{ color: m.color }}
                        >
                          {m.label}
                        </span>
                      </div>
                      <div className="flex-1 h-2.5 rounded-full bg-white/5 overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPct}%` }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full relative"
                          style={{
                            background: `linear-gradient(90deg, ${m.color}aa 0%, ${m.color} 100%)`,
                            boxShadow: `0 0 10px ${m.color}55`,
                          }}
                        >
                          <div
                            className="absolute inset-0 opacity-50"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                            }}
                          />
                        </motion.div>
                      </div>
                      <div className="flex items-center gap-1 w-[58px] justify-end flex-shrink-0">
                        <span className="text-white text-[11px] font-bold tabular-nums">
                          {m.count}
                        </span>
                        <span className="text-white/40 text-[10px]">
                          · {m.percent}%
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}

        {/* ============== Section 2c: Mood timeline (last 10 entries) ============== */}
        {moodTimeline.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="glass-card p-4 relative overflow-hidden"
          >
            <SectionTitle
              icon={Clock}
              iconColor="#2DD4BF"
              title={t("statsRecentMoods")}
              right={
                <span className="text-[10px] text-white/40">
                  {t("statsRecentCount", { n: moodTimeline.length })}
                </span>
              }
            />
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
              {moodTimeline.map((entry, idx) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 w-[112px] glass-card-strong p-2.5 rounded-2xl relative flex flex-col gap-1.5"
                  style={{
                    borderColor: `${entry.color}33`,
                  }}
                >
                  {entry.isQuickMood && (
                    <span
                      className="absolute top-1.5 right-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: `${entry.color}22`,
                        color: entry.color,
                      }}
                    >
                      Quick
                    </span>
                  )}
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
                      style={{
                        background: `${entry.color}1f`,
                        boxShadow: `0 0 12px ${entry.color}33`,
                      }}
                    >
                      {entry.emoji}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span
                        className="text-[11px] font-semibold leading-tight"
                        style={{ color: entry.color }}
                      >
                        {entry.label}
                      </span>
                      <span className="text-white/40 text-[9px] leading-tight">
                        {entry.relative}
                      </span>
                    </div>
                  </div>
                  {entry.preview && (
                    <p className="text-white/60 text-[10px] leading-snug line-clamp-2">
                      {entry.preview}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ============== Section 2d: Mood streak (last 7 days) ============== */}
        {journalEntries.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="glass-card-strong p-4 relative overflow-hidden glow-orange card-hover"
          >
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#F59E0B]/20 blur-2xl" />
            <SectionTitle
              icon={Flame}
              iconColor="#F59E0B"
              title={t("statsConsistency")}
              right={
                moodStreak.activeDays === 7 ? (
                  <motion.span
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
                      color: "#070B0E",
                      boxShadow: "0 0 14px rgba(251,191,36,0.65)",
                    }}
                  >
                    {t("statsPerfect")}
                  </motion.span>
                ) : undefined
              }
            />
            {/* 7 day-dots */}
            <div className="flex items-center justify-between gap-1.5 mb-3">
              {moodStreak.days.map((d, idx) => (
                <motion.div
                  key={`streak-${idx}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: idx * 0.05,
                    type: "spring",
                    stiffness: 280,
                    damping: 20,
                  }}
                  className="flex flex-col items-center gap-1 flex-1"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm"
                    style={{
                      background: d.hasEntry ? d.dominantColor : "rgba(255,255,255,0.04)",
                      border: d.hasEntry
                        ? `1px solid ${d.dominantColor}66`
                        : "1px solid rgba(255,255,255,0.06)",
                      boxShadow: d.hasEntry
                        ? `0 0 14px ${d.dominantColor}55`
                        : "none",
                    }}
                    title={d.date.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                    })}
                  >
                    {d.hasEntry ? (
                      <span className="text-base leading-none">
                        {d.dominantEmoji}
                      </span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                    )}
                  </div>
                  <span className="text-white/40 text-[10px] font-medium">
                    {d.label}
                  </span>
                </motion.div>
              ))}
            </div>
            {/* Progress */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-white/60 text-[11px]">
                {t("statsDaysWithMood")}
              </span>
              <span className="text-white text-xs font-bold tabular-nums">
                <AnimatedNumber
                  value={moodStreak.activeDays}
                  duration={700}
                  suffix={` / ${moodStreak.total}`}
                />
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(moodStreak.activeDays / moodStreak.total) * 100}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 20,
                  delay: 0.2,
                }}
                className="h-full rounded-full relative"
                style={{
                  background:
                    moodStreak.activeDays === 7
                      ? "linear-gradient(90deg, #FBBF24 0%, #F59E0B 100%)"
                      : "linear-gradient(90deg, #F59E0B 0%, #FF3B30 100%)",
                  boxShadow:
                    moodStreak.activeDays === 7
                      ? "0 0 12px rgba(251,191,36,0.55)"
                      : "0 0 8px rgba(245, 158, 11,0.4)",
                }}
              >
                <div className="absolute inset-0 shimmer rounded-full" />
              </motion.div>
            </div>
            <p className="text-white/40 text-[10px] mt-2 leading-snug">
              {moodStreak.activeDays === 7
                ? t("statsStreakPerfect")
                : moodStreak.activeDays >= 4
                ? t("statsStreakGood")
                : t("statsStreakLow")}
            </p>
          </motion.div>
        )}

        {/* ============== Section 2e: Dominant mood insight (premium-gated) ============== */}
        {dominantMood && (
          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl p-4 overflow-hidden card-hover"
            style={{
              background:
                "linear-gradient(135deg, rgba(192, 132, 252,0.18) 0%, rgba(255,59,130,0.18) 100%)",
              border: "1px solid rgba(192, 132, 252,0.35)",
              boxShadow: "0 0 24px rgba(192, 132, 252,0.2)",
            }}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#C084FC]/25 blur-3xl" />
            <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-[#FF3B83]/15 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-[#C084FC]" />
                <h2 className="text-white text-sm font-semibold font-[family-name:var(--font-poppins)]">
                  {t("statsDominantMood")}
                </h2>
                {!isPremium && (
                  <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FBBF24]/15 text-[#FBBF24]">
                    <Crown size={10} />
                    {t("premium")}
                  </span>
                )}
              </div>

              {isPremium ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2.5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{
                        background: `${dominantMood.color}33`,
                        boxShadow: `0 0 16px ${dominantMood.color}55`,
                      }}
                    >
                      {dominantMood.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-lg font-bold font-[family-name:var(--font-poppins)]"
                          style={{ color: dominantMood.color }}
                        >
                          {dominantMood.label}
                        </span>
                        <span className="text-white/50 text-xs">
                          {dominantMood.percent}% · {dominantMood.count} entrée
                          {dominantMood.count > 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-white/70 text-[11px] leading-snug mt-0.5">
                        {MOOD_INSIGHTS[dominantMood.key]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  onClick={handlePremiumInsightTap}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left relative"
                  aria-label={t("statsUnlockWithPremium")}
                >
                  {/* Blurred preview */}
                  <div
                    aria-hidden
                    className="absolute inset-0 flex items-center gap-3 blur-[6px] opacity-60 pointer-events-none select-none"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${dominantMood.color}33` }}
                    >
                      {dominantMood.emoji}
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 w-24 rounded-full bg-white/30" />
                      <div className="h-2.5 w-full rounded-full bg-white/15" />
                      <div className="h-2.5 w-4/5 rounded-full bg-white/15" />
                    </div>
                  </div>
                  {/* Foreground CTA */}
                  <div className="relative flex items-center gap-3 py-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                      <Lock size={16} className="text-[#FBBF24]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">
                        {t("statsUnlockWithPremium")}
                      </div>
                      <div className="text-white/60 text-[11px]">
                        {t("statsUnlockWithPremiumDesc")}
                      </div>
                    </div>
                    <Crown size={18} className="text-[#FBBF24] flex-shrink-0" />
                  </div>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ============== Section 3: Savings growth chart ============== */}
        <motion.div variants={itemVariants} className="glass-card p-4">
          <SectionTitle
            icon={TrendingUp}
            iconColor="#4ADE80"
            title={t("statsCumulativeSavings")}
            right={
              <span className="text-[10px] text-white/40">{t("statsLast30Days")}</span>
            }
          />
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-extrabold text-white font-[family-name:var(--font-poppins)]">
              {formatFCFA(savingsTotal30)}
            </span>
            <span className="text-white/50 text-sm">FCFA</span>
            <span className="ml-auto text-[10px] text-white/40">
              +{formatFCFA(dailySaved)} / jour
            </span>
          </div>
          <div className="w-full" style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={savingsData}
                margin={{ top: 8, right: 8, left: -22, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="barGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ADE80" stopOpacity={1} />
                    <stop offset="100%" stopColor="#2DD4BF" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="barOrange" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={1} />
                    <stop offset="100%" stopColor="#FF3B30" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`
                  }
                />
                <Tooltip
                  content={<SavingsTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar dataKey="cumul" radius={[4, 4, 0, 0]} maxBarSize={14}>
                  {savingsData.map((entry, idx) => (
                    <Cell
                      key={`bar-${idx}`}
                      fill={entry.isToday ? "url(#barOrange)" : "url(#barGreen)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5 text-white/50">
              <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-b from-[#4ADE80] to-[#2DD4BF]" />
              {t("financeSaved")}
            </div>
            <div className="flex items-center gap-1.5 text-white/50">
              <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-b from-[#F59E0B] to-[#FF3B30]" />
              {t("today")}
            </div>
          </div>
        </motion.div>

        {/* ============== Section 4: Streak heatmap ============== */}
        <motion.div variants={itemVariants} className="glass-card p-4">
          <SectionTitle
            icon={Grid3x3}
            iconColor="#F59E0B"
            title={t("statsHeatmap")}
            right={
              <span className="text-[10px] text-white/40">{t("statsWeeks5")}</span>
            }
          />
          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {WEEKDAY_LABELS.map((d, i) => (
              <div
                key={`wd-${i}`}
                className="text-center text-[10px] text-white/40 font-medium"
              >
                {d}
              </div>
            ))}
          </div>
          {/* 7x5 grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {heatmapCells.map((cell, idx) => {
              const bg =
                cell.status === "green"
                  ? "linear-gradient(135deg, #4ADE80 0%, #2DD4BF 100%)"
                  : cell.status === "red"
                  ? "linear-gradient(135deg, #FF3B30 0%, #F59E0B 100%)"
                  : cell.status === "future"
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(255,255,255,0.06)";
              const border = cell.isToday
                ? "2px solid #F59E0B"
                : "1px solid rgba(255,255,255,0.04)";
              return (
                <motion.div
                  key={`cell-${idx}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: idx * 0.012,
                    type: "spring",
                    stiffness: 300,
                    damping: 22,
                  }}
                  whileTap={{ scale: 0.92 }}
                  className="aspect-square rounded-md relative"
                  style={{
                    background: bg,
                    border,
                    boxShadow: cell.isToday
                      ? "0 0 12px rgba(245, 158, 11,0.5)"
                      : cell.status === "green"
                      ? "0 0 8px rgba(74,222,128,0.25)"
                      : cell.status === "red"
                      ? "0 0 8px rgba(255,59,48,0.3)"
                      : "none",
                  }}
                  title={cell.date.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                >
                  {cell.isToday && (
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">
                      •
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10px]">
            <div className="flex items-center gap-1.5 text-white/60">
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{
                  background: "linear-gradient(135deg, #4ADE80, #2DD4BF)",
                }}
              />
              {t("statsNoBet")}
              <span className="text-white/40">({heatCounts.green})</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{
                  background: "linear-gradient(135deg, #FF3B30, #F59E0B)",
                }}
              />
              {t("panicTitle")}
              <span className="text-white/40">({heatCounts.red})</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />
              {t("statsNoData")}
              <span className="text-white/40">({heatCounts.gray})</span>
            </div>
          </div>
        </motion.div>

        {/* ============== Section 5: Emotion distribution pie ============== */}
        <motion.div variants={itemVariants} className="glass-card p-4">
          <SectionTitle
            icon={PieChartIcon}
            iconColor="#C084FC"
            title={t("statsEmotionDistribution")}
            right={
              hasEmotionData ? (
                <span className="text-[10px] text-white/40">
                  {t("statsEmotionCount", { n: totalEmotions })}
                </span>
              ) : undefined
            }
          />
          {hasEmotionData ? (
            <div className="flex flex-col items-center">
              <div className="w-full" style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emotionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      stroke="rgba(10,10,15,0.6)"
                      strokeWidth={2}
                    >
                      {emotionData.map((entry) => (
                        <Cell key={`cell-${entry.key}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(11,19,43,0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12,
                        fontSize: 12,
                        backdropFilter: "blur(20px)",
                      }}
                      labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                      itemStyle={{ color: "rgba(255,255,255,0.9)" }}
                      formatter={(value: number, _name, entry) => {
                        const pct = totalEmotions > 0
                          ? Math.round((value / totalEmotions) * 100)
                          : 0;
                        const color =
                          (entry?.payload as { color?: string } | undefined)?.color ?? "#fff";
                        return [
                          `${value} (${pct}%)`,
                          "",
                        ] as [string, string];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div className="w-full mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-x-3 gap-y-2">
                {emotionData
                  .slice()
                  .sort((a, b) => b.value - a.value)
                  .map((e) => {
                    const pct =
                      totalEmotions > 0
                        ? Math.round((e.value / totalEmotions) * 100)
                        : 0;
                    return (
                      <div
                        key={e.key}
                        className="flex items-center gap-2 text-xs"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: e.color }}
                        />
                        <span className="text-white/70 flex-1 truncate">
                          {EMOTION_EMOJI[e.key]} {e.name}
                        </span>
                        <span className="text-white/40 text-[10px]">
                          {pct}% · {e.value}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <EmptyState
              variant="stats"
              title={t("statsNoEmotionTitle")}
              description={t("statsNoEmotionDesc")}
              hideCta
              compact
            />
          )}
        </motion.div>

        {/* ============== Section 6: Achievement progress ============== */}
        <motion.div variants={itemVariants} className="glass-card-strong p-4">
          <SectionTitle
            icon={Award}
            iconColor="#FBBF24"
            title={t("statsRanksProgress")}
            right={
              <span className="text-[10px] text-white/40">
                {unlockedCount} / {totalRanks}
              </span>
            }
          />
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: currentRank.gradient,
                boxShadow: `0 0 24px ${currentRank.glow}`,
              }}
            >
              {currentRank.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)] truncate">
                {currentRank.name}
              </div>
              <div className="text-white/40 text-[11px] truncate">
                {currentRank.subtitle}
              </div>
            </div>
            {nextRank ? (
              <div className="text-right flex-shrink-0">
                <div className="text-white/40 text-[10px]">{t("statsNextRank")}</div>
                <div className="text-white/70 text-xs font-medium truncate max-w-[110px]">
                  {nextRank.icon} {nextRank.name}
                </div>
              </div>
            ) : (
              <div className="text-right flex-shrink-0">
                <div className="text-[#FBBF24] text-[10px] font-bold">MAX</div>
                <div className="text-white/70 text-xs font-medium">{t("statsUltimateRank")}</div>
              </div>
            )}
          </div>
          {/* Progress bar */}
          <div className="relative">
            <div className="h-3 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${achievementPercent}%` }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  delay: 0.2,
                }}
                className="h-full rounded-full relative"
                style={{
                  background:
                    "linear-gradient(90deg, #FF3B30 0%, #F59E0B 35%, #FBBF24 70%, #4ADE80 100%)",
                  boxShadow: "0 0 12px rgba(245, 158, 11,0.5)",
                }}
              >
                <div className="absolute inset-0 shimmer rounded-full" />
              </motion.div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-white/40 text-[10px]">
                {t("statsPercentCompleted", { pct: achievementPercent })}
              </span>
              <span className="text-white/40 text-[10px]">
                {t("statsRanksRemaining", { n: totalRanks - unlockedCount })}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("parcours")}
            className="mt-3 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/80 text-xs font-medium flex items-center justify-center gap-1.5"
          >
            <Award size={12} />
            {t("statsSeeAllRanks")}
          </button>
        </motion.div>

        {/* ============== Section 7: Weekly summary ============== */}
        <motion.div variants={itemVariants} className="glass-card p-4">
          <SectionTitle
            icon={BarChart3}
            iconColor="#2DD4BF"
            title={t("statsWeeklySummary")}
            right={
              <span className="text-[10px] text-white/40">{t("statsLast7Days")}</span>
            }
          />
          <div className="grid grid-cols-3 gap-2.5">
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="glass-card-strong p-3 text-center relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-[#F59E0B]/15 blur-2xl" />
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 flex items-center justify-center mx-auto mb-1.5">
                  <Flame size={15} className="text-[#F59E0B]" />
                </div>
                <div className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)]">
                  {weekDaysClean}
                </div>
                <div className="text-white/40 text-[9px] mt-0.5">/ 7 {t("days")}</div>
                <div className="text-white/60 text-[10px] mt-1 font-medium leading-tight">
                  {t("statsDaysWithoutBet")}
                </div>
              </div>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.96 }}
              className="glass-card-strong p-3 text-center relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-[#4ADE80]/15 blur-2xl" />
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-[#4ADE80]/15 flex items-center justify-center mx-auto mb-1.5">
                  <Wallet size={15} className="text-[#4ADE80]" />
                </div>
                <div className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] leading-tight">
                  {formatFCFA(weekSavings)}
                </div>
                <div className="text-white/40 text-[9px] mt-0.5">FCFA</div>
                <div className="text-white/60 text-[10px] mt-1 font-medium leading-tight">
                  {t("financeSaved")}
                </div>
              </div>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.96 }}
              className="glass-card-strong p-3 text-center relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-[#C084FC]/15 blur-2xl" />
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-[#C084FC]/15 flex items-center justify-center mx-auto mb-1.5">
                  <Shield size={15} className="text-[#C084FC]" />
                </div>
                <div className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)]">
                  {weekCrisesAvoided}
                </div>
                <div className="text-white/40 text-[9px] mt-0.5">
                  {weekCrisesAvoided > 1 ? t("statsCrises") : t("statsCrisis")}
                </div>
                <div className="text-white/60 text-[10px] mt-1 font-medium leading-tight">
                  {t("statsCrisesAvoided")}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Encouragement banner */}
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#4ADE80] flex-shrink-0" />
            <p className="text-white/60 text-[11px] leading-snug">
              {weekDaysClean >= 7
                ? t("statsWeekPerfect")
                : weekCrisesAvoided > 0
                ? t("statsWeekOvercame")
                : t("statsWeekVictory")}
            </p>
          </div>
        </motion.div>

        {/* Footer motivational note */}
        <motion.div
          variants={itemVariants}
          className="text-center pt-2 pb-2"
        >
          <p className="text-white/30 text-[10px] italic">
            {t("statsQuote")}
          </p>
        </motion.div>
      </motion.div>
      )}
      </PullToRefresh>
    </div>
  );
}
