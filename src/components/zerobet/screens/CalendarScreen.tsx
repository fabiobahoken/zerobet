"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Check,
  X,
  Star,
  TrendingUp,
  Award,
  Target,
  Calendar as CalendarIcon,
  BookOpen,
  Wind,
  Zap,
  Lock,
  Sparkles,
  Wallet,
  BarChart3,
  Plus,
} from "lucide-react";
import { useStore, type Emotion } from "@/store/zerobet-store";
import { useT, useLanguage } from "@/lib/i18n/useT";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { ArtifactIcon } from "@/components/zerobet/components/ArtifactIcon";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// Weekday & month labels per language.
const WEEK_DAYS: Record<string, string[]> = {
  fr: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  es: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
};
const MONTH_NAMES: Record<string, string[]> = {
  fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
};

// Locale string for toLocaleDateString / toLocaleString
function localeFor(lang: string): string {
  return lang === "en" ? "en-GB" : lang === "es" ? "es-ES" : "fr-FR";
}

// Milestones: 1, 3, 7, 14, 30, 60, 90, 180, 365
// `artifactKey` (optional) renders the ArtifactIcon SVG for parcours-rank
// milestones; milestones without a key (90 = 🔥, 365 = 🏆) keep their emoji.
const MILESTONES = [
  { day: 1, labelKey: "calendarMilestone1Label", icon: "🌱", artifactKey: "jour-1", color: "#4ADE80", descKey: "calendarMilestone1Desc" },
  { day: 3, labelKey: "calendarMilestone3Label", icon: "💧", artifactKey: "jour-3", color: "#22D3EE", descKey: "calendarMilestone3Desc" },
  { day: 7, labelKey: "calendarMilestone7Label", icon: "🥉", artifactKey: "jour-7", color: "#CD7F32", descKey: "calendarMilestone7Desc" },
  { day: 14, labelKey: "calendarMilestone14Label", icon: "🥈", artifactKey: "jour-14", color: "#C0C0C0", descKey: "calendarMilestone14Desc" },
  { day: 30, labelKey: "calendarMilestone30Label", icon: "🥇", artifactKey: "jour-30", color: "#FFD700", descKey: "calendarMilestone30Desc" },
  { day: 60, labelKey: "calendarMilestone60Label", icon: "💎", artifactKey: "jour-60", color: "#64D2FF", descKey: "calendarMilestone60Desc" },
  { day: 90, labelKey: "calendarMilestone90Label", icon: "🔥", color: "#BF5AF2", descKey: "calendarMilestone90Desc" },
  { day: 180, labelKey: "calendarMilestone180Label", icon: "👑", artifactKey: "jour-365", color: "#FF9500", descKey: "calendarMilestone180Desc" },
  { day: 365, labelKey: "calendarMilestone365Label", icon: "🏆", color: "#FF3B30", descKey: "calendarMilestone365Desc" },
];

// Days that should display a milestone star when reached inside the streak
const MILESTONE_DAYS = new Set(MILESTONES.map((m) => m.day));

const EMOTION_LABEL_KEYS: Record<Emotion, string> = {
  frustrated: "calendarEmotionFrustrated",
  anxious: "calendarEmotionAnxious",
  tempted: "calendarEmotionTempted",
  calm: "calendarEmotionCalm",
  proud: "calendarEmotionProud",
  strong: "calendarEmotionStrong",
};

const EMOTION_EMOJI: Record<Emotion, string> = {
  frustrated: "😤",
  anxious: "😰",
  tempted: "🎭",
  calm: "😌",
  proud: "🦸",
  strong: "💪",
};

// ---------------------------------------------------------------------------
// Helpers — date utils
// ---------------------------------------------------------------------------

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Monday-based index (0=Mon, 6=Sun) */
function getMondayIndex(d: Date): number {
  const js = d.getDay(); // 0=Sun
  return (js + 6) % 7;
}

function addMonths(d: Date, months: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + months, 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// ---------------------------------------------------------------------------
// Day status derivation
// ---------------------------------------------------------------------------

type DayStatus = "future" | "no-data" | "crisis" | "streak" | "today";

interface DayInfo {
  date: Date;
  status: DayStatus;
  streakDay: number; // 0 if not in streak
  isMilestone: boolean;
  isToday: boolean;
  isFuture: boolean;
  journalEntry?: { content: string; emotion: Emotion };
  meditationDone: boolean;
  panicEvent?: { intensity: number; resolved: boolean };
}

interface DayDetail {
  date: Date;
  info: DayInfo;
  xpEarned: number;
}

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------

export function CalendarScreen() {
  const t = useT();
  const language = useLanguage();
  const {
    navigate,
    streakDays,
    lastStreakDate,
    weeklyBetAmount,
    journalEntries,
    panicEvents,
    meditationStreak,
    lastMeditationDate,
    addJournalEntry,
    unlockedRanks,
  } = useStore();

  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<DayDetail | null>(null);
  const [noteText, setNoteText] = useState("");

  // Derive the streak start date.
  // streakDays is the current streak length. lastStreakDate is the day the
  // streak counter was last incremented (today if the user has been active).
  const streakStart = useMemo(() => {
    if (streakDays <= 0) return null;
    const anchor = lastStreakDate ? new Date(lastStreakDate) : today;
    const normalized = startOfDay(anchor);
    // streakDays includes the anchor day itself, so start = anchor - (streakDays - 1)
    return new Date(normalized.getTime() - (streakDays - 1) * 86400000);
  }, [streakDays, lastStreakDate, today]);

  // Build a lookup of journal entries & panic events by ISO date
  const journalByDate = useMemo(() => {
    const map = new Map<string, { content: string; emotion: Emotion }>();
    for (const entry of journalEntries) {
      const d = startOfDay(new Date(entry.createdAt));
      map.set(toISODate(d), {
        content: entry.content,
        emotion: entry.emotion,
      });
    }
    return map;
  }, [journalEntries]);

  const panicByDate = useMemo(() => {
    const map = new Map<string, { intensity: number; resolved: boolean }>();
    for (const p of panicEvents) {
      const d = startOfDay(new Date(p.createdAt));
      map.set(toISODate(d), { intensity: p.intensity, resolved: p.resolved });
    }
    return map;
  }, [panicEvents]);

  const meditationByDate = useMemo(() => {
    // We only know the current meditation streak anchor; treat the last N days
    // (where N = meditationStreak) up to lastMeditationDate as meditation days.
    const set = new Set<string>();
    if (meditationStreak > 0) {
      const anchor = lastMeditationDate ? new Date(lastMeditationDate) : today;
      const normalized = startOfDay(anchor);
      for (let i = 0; i < meditationStreak; i++) {
        const d = new Date(normalized.getTime() - i * 86400000);
        set.add(toISODate(d));
      }
    }
    return set;
  }, [meditationStreak, lastMeditationDate, today]);

  // Build day grid for the current viewMonth
  const dayGrid = useMemo<DayInfo[]>(() => {
    const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const offset = getMondayIndex(firstOfMonth);
    const daysInMonth = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth() + 1,
      0
    ).getDate();

    const cells: DayInfo[] = [];

    // Leading blanks (rendered as empty cells in UI but we still push real prev-month dates for completeness)
    for (let i = 0; i < offset; i++) {
      const d = new Date(firstOfMonth);
      d.setDate(d.getDate() - (offset - i));
      cells.push(buildDayInfo(d, today, streakStart, streakDays, journalByDate, panicByDate, meditationByDate));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
      cells.push(buildDayInfo(d, today, streakStart, streakDays, journalByDate, panicByDate, meditationByDate));
    }

    // Trailing blanks to reach a full 6-row grid (42 cells)
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1].date;
      const d = new Date(last.getTime() + 86400000);
      cells.push(buildDayInfo(d, today, streakStart, streakDays, journalByDate, panicByDate, meditationByDate));
    }

    return cells;
  }, [viewMonth, today, streakStart, streakDays, journalByDate, panicByDate, meditationByDate]);

  // Monthly stats for the currently-viewed month
  const monthStats = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    let noBetDays = 0;
    let crisisDays = 0;
    let journalDays = 0;
    let meditationDays = 0;

    for (const cell of dayGrid) {
      if (cell.date.getMonth() !== month || cell.date.getFullYear() !== year) continue;
      if (cell.isFuture) continue;
      if (cell.status === "crisis") crisisDays++;
      if (cell.status === "streak" || cell.status === "today") noBetDays++;
      if (cell.journalEntry) journalDays++;
      if (cell.meditationDone) meditationDays++;
    }

    // The "days without betting this month" should NOT include crisis days that
    // happened within the streak — but in our model crises are days where the
    // streak broke, so they don't overlap with noBetDays.
    const savings = Math.round(noBetDays * (weeklyBetAmount / 7));
    return { noBetDays, crisisDays, journalDays, meditationDays, savings };
  }, [dayGrid, viewMonth, weeklyBetAmount]);

  // Monthly daily-activity mini bar chart data
  const dailyActivity = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const bars: { day: number; value: number; isCrisis: boolean }[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const iso = toISODate(d);
      const inStreak = streakStart && d >= streakStart && d <= today;
      const isFuture = d > today;
      let value = 0;
      if (!isFuture && inStreak) value = 1;
      if (journalByDate.has(iso)) value += 1;
      if (meditationByDate.has(iso)) value += 1;
      if (panicByDate.has(iso)) value = 0; // crisis day — zero score
      bars.push({ day, value, isCrisis: panicByDate.has(iso) });
    }
    return bars;
  }, [viewMonth, streakStart, today, journalByDate, meditationByDate, panicByDate]);

  // All-time stats
  const allTimeStats = useMemo(() => {
    // Best streak — use streakDays plus a simulated historical peak based on
    // the number of resolved panics (each resolved panic = one prior streak).
    const historicalStreaks = panicEvents.filter((p) => p.resolved).length;
    const priorBest = Math.min(historicalStreaks * 3, 21);
    const bestStreak = Math.max(streakDays, priorBest);

    const currentStreak = streakDays;
    const totalNoBetDays = streakDays + priorBest * 2;

    // Months since starting (use streakStart if available, else today)
    const startRef = streakStart ?? today;
    const monthsSinceStart =
      (today.getFullYear() - startRef.getFullYear()) * 12 +
      (today.getMonth() - startRef.getMonth()) +
      1;
    const monthlyAverage = monthsSinceStart > 0
      ? Math.round((totalNoBetDays / monthsSinceStart) * 10) / 10
      : 0;

    return { bestStreak, currentStreak, totalNoBetDays, monthlyAverage };
  }, [streakDays, panicEvents, streakStart, today]);

  // Month navigation
  const canGoNext = useMemo(() => {
    const next = addMonths(viewMonth, 1);
    return next <= new Date(today.getFullYear(), today.getMonth() + 1, 1);
  }, [viewMonth, today]);

  const monthLabel = `${MONTH_NAMES[language]?.[viewMonth.getMonth()] ?? MONTH_NAMES.fr[viewMonth.getMonth()]} ${viewMonth.getFullYear()}`;

  // Day click handler — compute XP earned that day (simulated)
  const handleDayClick = (info: DayInfo) => {
    if (info.isFuture) return;
    let xp = 0;
    if (info.status === "streak" || info.status === "today") xp += 50;
    if (info.journalEntry) xp += 30;
    if (info.meditationDone) xp += 40;
    if (info.isMilestone) xp += 100;
    if (info.status === "crisis") xp = 20; // participation XP for journaling through a crisis
    setSelectedDay({ date: info.date, info, xpEarned: xp });
    setNoteText("");
  };

  const handleAddNote = () => {
    if (!noteText.trim() || !selectedDay) return;
    addJournalEntry({
      content: noteText.trim(),
      emotion: "calm",
      intensity: 1,
    });
    toast.success("Note ajoutée à ton journal 📝");
    setNoteText("");
    setSelectedDay(null);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setNoteText("");
  };

  const unlockedSet = new Set(unlockedRanks);
  // Helpers for milestones
  const milestoneDates = useMemo(() => {
    return MILESTONES.map((m) => {
      const achieved = streakDays >= m.day;
      let dateAchieved: Date | null = null;
      if (achieved && streakStart) {
        dateAchieved = new Date(streakStart.getTime() + (m.day - 1) * 86400000);
      }
      return {
        ...m,
        achieved,
        dateAchieved,
        gradient: `linear-gradient(135deg, ${m.color}, ${m.color}99)`,
        glow: `${m.color}66`,
      };
    });
  }, [streakDays, streakStart]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <div className="min-h-screen px-4 pt-12 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-5 px-1"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("dashboard")}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform focus-ring"
            aria-label={t("backToDashboard")}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight leading-tight">
              {t("calendarTitle")}
            </h1>
            <p className="text-white/50 text-xs">{t("calendarSubtitle")}</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center" aria-hidden>
          <CalendarIcon size={18} className="text-[#FF9500]" />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* ============================================================ */}
        {/* SECTION 1: Month Overview                                    */}
        {/* ============================================================ */}
        <motion.section variants={itemVariants} className="glass-card-strong p-5 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none bg-[#FF9500]/20" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-3xl pointer-events-none bg-[#FF3B30]/15" />

          {/* Month nav */}
          <div className="relative flex items-center justify-between mb-4">
            <button
              onClick={() => setViewMonth((m) => addMonths(m, -1))}
              className="w-9 h-9 rounded-full glass-pill flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Mois précédent"
            >
              <ChevronLeft size={18} className="text-white/80" />
            </button>
            <h2 className="text-base font-bold text-white font-[family-name:var(--font-poppins)]">
              {monthLabel}
            </h2>
            <button
              onClick={() => canGoNext && setViewMonth((m) => addMonths(m, 1))}
              disabled={!canGoNext}
              className={`w-9 h-9 rounded-full glass-pill flex items-center justify-center transition-transform ${
                canGoNext ? "active:scale-95" : "opacity-30 cursor-not-allowed"
              }`}
              aria-label="Mois suivant"
            >
              <ChevronRight size={18} className="text-white/80" />
            </button>
          </div>

          {/* Big streak number */}
          <div className="relative flex flex-col items-center justify-center py-2">
            <motion.div
              key={monthStats.noBetDays}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative"
            >
              <div className="absolute inset-0 blur-2xl bg-[#FF9500]/40 rounded-full" aria-hidden />
              <Flame size={56} className="relative text-[#FF9500]" fill="currentColor" />
            </motion.div>
            <p className="mt-1 text-4xl font-extrabold text-white font-[family-name:var(--font-poppins)] leading-none">
              {monthStats.noBetDays}
            </p>
            <p className="text-white/60 text-xs mt-1.5">
              {monthStats.noBetDays > 1
                ? t("calendarNoBetDaysMany", { n: monthStats.noBetDays })
                : monthStats.noBetDays === 1
                  ? t("calendarNoBetDaysOne", { n: monthStats.noBetDays })
                  : t("calendarNoBetDaysNone")}
            </p>
          </div>

          {/* Monthly savings */}
          <div className="relative mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#4ADE80]/15 to-[#22D3EE]/10 border border-[#4ADE80]/20">
            <Wallet size={14} className="text-[#4ADE80]" />
            <span className="text-white text-sm font-semibold">
              {monthStats.savings.toLocaleString(localeFor(language))} FCFA
            </span>
            <span className="text-white/50 text-xs">{t("calendarSavedThisMonth")}</span>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 2: Calendar Grid                                     */}
        {/* ============================================================ */}
        <motion.section variants={itemVariants} className="glass-card p-4">
          {/* Weekday header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {(WEEK_DAYS[language] ?? WEEK_DAYS.fr).map((d) => (
              <div
                key={d}
                className="text-center text-[10px] font-bold text-white/40 uppercase tracking-wider py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <AnimatePresence mode="wait">
            <motion.div
              key={monthLabel}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-7 gap-1"
            >
              {dayGrid.map((cell, idx) => (
                <DayCell
                  key={`${cell.date.toISOString()}-${idx}`}
                  info={cell}
                  inViewMonth={cell.date.getMonth() === viewMonth.getMonth() && cell.date.getFullYear() === viewMonth.getFullYear()}
                  onClick={() => handleDayClick(cell)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-white/50">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80]" /> {t("calendarLegendNoBet")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF3B30]" /> {t("calendarLegendCrisis")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/20" /> {t("calendarLegendNoData")}
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={10} className="text-[#FFD700]" fill="currentColor" /> {t("calendarLegendMilestone")}
            </span>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 4: Streak Statistics                                 */}
        {/* ============================================================ */}
        <motion.section variants={itemVariants}>
          <SectionTitle icon={<TrendingUp size={16} className="text-[#64D2FF]" />} label={t("calendarStatsTitle")} />
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label={t("calendarBestStreak")}
              value={`${allTimeStats.bestStreak}`}
              unit={t("calendarUnitDays")}
              icon={<Award size={18} className="text-[#FFD700]" />}
              gradient="linear-gradient(135deg, #FFD700 0%, #FF9500 100%)"
              glow="rgba(255, 215, 0, 0.25)"
            />
            <StatCard
              label={t("calendarCurrentStreak")}
              value={`${allTimeStats.currentStreak}`}
              unit={t("calendarUnitDays")}
              icon={<Flame size={18} className="text-[#FF3B30]" />}
              gradient="linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)"
              glow="rgba(255, 59, 48, 0.25)"
            />
            <StatCard
              label={t("calendarTotalNoBetDays")}
              value={`${allTimeStats.totalNoBetDays}`}
              unit={t("calendarUnitDays")}
              icon={<Target size={18} className="text-[#4ADE80]" />}
              gradient="linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)"
              glow="rgba(74, 222, 128, 0.25)"
            />
            <StatCard
              label={t("calendarMonthlyAverage")}
              value={`${allTimeStats.monthlyAverage}`}
              unit={t("calendarUnitDaysPerMonth")}
              icon={<BarChart3 size={18} className="text-[#BF5AF2]" />}
              gradient="linear-gradient(135deg, #BF5AF2 0%, #5E5CE6 100%)"
              glow="rgba(191, 90, 242, 0.25)"
            />
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 5: Milestones Timeline                               */}
        {/* ============================================================ */}
        <motion.section variants={itemVariants}>
          <SectionTitle
            icon={<Sparkles size={16} className="text-[#FFD700]" />}
            label={t("calendarMilestonesTitle")}
          />
          <div className="glass-card p-4">
            <div className="relative">
              {/* vertical line */}
              <div
                className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#FF9500]/40 via-white/10 to-transparent"
                aria-hidden
              />
              <div className="space-y-3">
                {milestoneDates.map((m, idx) => {
                  const daysFromStart = m.day;
                  return (
                    <motion.div
                      key={m.day}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`relative flex items-start gap-3 ${m.achieved ? "" : "opacity-50"}`}
                    >
                      {/* badge */}
                      <div
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 z-10 ${
                          m.achieved ? "" : "grayscale"
                        }`}
                        style={{
                          background: m.achieved ? m.gradient : "rgba(255,255,255,0.06)",
                          boxShadow: m.achieved ? `0 0 16px ${m.glow}` : "none",
                          border: m.achieved ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {m.achieved ? (
                          m.artifactKey ? (
                            <ArtifactIcon artifactKey={m.artifactKey} size={22} glow={false} />
                          ) : (
                            <span className="text-lg leading-none">{m.icon}</span>
                          )
                        ) : (
                          <Lock size={14} className="text-white/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm font-semibold ${m.achieved ? "text-white" : "text-white/60"}`}>
                            {t("calendarDayNumber", { n: m.day })} · {t(m.labelKey)}
                          </p>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                              m.achieved
                                ? "bg-[#4ADE80]/15 text-[#4ADE80]"
                                : "bg-white/5 text-white/40"
                            }`}
                          >
                            {m.achieved ? t("calendarReached") : t("calendarDaysBefore", { n: m.day - streakDays })}
                          </span>
                        </div>
                        <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                          {t(m.descKey)}
                        </p>
                        <p className="text-white/40 text-[10px] mt-1">
                          {m.dateAchieved
                            ? t("calendarAchievedOn", { date: m.dateAchieved.toLocaleDateString(localeFor(language), { day: "numeric", month: "short", year: "numeric" }) })
                            : t("calendarUpcoming")}
                          {" · "}
                          {t("calendarDaysSinceStart", { n: daysFromStart })}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 6: Monthly Insights                                  */}
        {/* ============================================================ */}
        <motion.section variants={itemVariants}>
          <SectionTitle
            icon={<BarChart3 size={16} className="text-[#FF9500]" />}
            label={`${t("calendarInsightsTitle")} — ${MONTH_NAMES[language]?.[viewMonth.getMonth()] ?? MONTH_NAMES.fr[viewMonth.getMonth()]}`}
          />
          <div className="glass-card p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <InsightChip
                label={t("calendarInsightNoBetDays")}
                value={`${monthStats.noBetDays}`}
                color="#4ADE80"
                icon={<Flame size={14} />}
              />
              <InsightChip
                label={t("calendarInsightCrisesAvoided")}
                value={`${monthStats.crisisDays}`}
                color="#FF3B30"
                icon={<Zap size={14} />}
              />
              <InsightChip
                label={t("calendarInsightJournalEntries")}
                value={`${monthStats.journalDays}`}
                color="#BF5AF2"
                icon={<BookOpen size={14} />}
              />
              <InsightChip
                label={t("calendarInsightFcfASaved")}
                value={monthStats.savings.toLocaleString(localeFor(language))}
                color="#FF9500"
                icon={<Wallet size={14} />}
              />
            </div>

            {/* Mini bar chart */}
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">
                {t("calendarDailyActivity")}
              </p>
              <div className="flex items-end gap-[2px] h-20">
                {dailyActivity.map((bar) => {
                  const max = 3;
                  const heightPct = Math.min((bar.value / max) * 100, 100);
                  const isCrisis = bar.isCrisis;
                  return (
                    <div
                      key={bar.day}
                      className="flex-1 flex items-end justify-center"
                      title={t("calendarDayActivityTitle", { n: bar.day, suffix: isCrisis ? ` (${t("calendarLegendCrisis")})` : "" })}
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ duration: 0.4, delay: bar.day * 0.01 }}
                        className={`w-full rounded-t-sm ${
                          isCrisis
                            ? "bg-[#FF3B30]/60"
                            : bar.value === 0
                              ? "bg-white/5"
                              : "bg-gradient-to-t from-[#FF9500]/60 to-[#4ADE80]/60"
                        }`}
                        style={{ minHeight: bar.value > 0 ? 4 : 2 }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-1 text-[9px] text-white/30">
                <span>1</span>
                <span>{dailyActivity.length}</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.p variants={itemVariants} className="text-center text-white/30 text-[10px] pt-1">
          {t("calendarMilestonesUnlocked", { n: unlockedSet.size })}
        </motion.p>
      </motion.div>

      {/* ============================================================ */}
      {/* SECTION 3: Day Detail Modal                                   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedDay && (
          <DayDetailModal
            detail={selectedDay}
            noteText={noteText}
            setNoteText={setNoteText}
            onClose={closeModal}
            onSubmitNote={handleAddNote}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function buildDayInfo(
  date: Date,
  today: Date,
  streakStart: Date | null,
  streakDays: number,
  journalByDate: Map<string, { content: string; emotion: Emotion }>,
  panicByDate: Map<string, { intensity: number; resolved: boolean }>,
  meditationByDate: Set<string>
): DayInfo {
  const iso = toISODate(date);
  const isToday = isSameDay(date, today);
  const isFuture = date > today;

  const journalEntry = journalByDate.get(iso);
  const panicEvent = panicByDate.get(iso);
  const meditationDone = meditationByDate.has(iso);

  let status: DayStatus = "no-data";
  let streakDay = 0;

  if (isFuture) {
    status = "future";
  } else if (panicEvent) {
    status = "crisis";
  } else if (streakStart && date >= streakStart && date <= today) {
    streakDay = Math.floor((date.getTime() - streakStart.getTime()) / 86400000) + 1;
    status = isToday ? "today" : "streak";
  } else {
    status = "no-data";
  }

  const isMilestone = streakDay > 0 && MILESTONE_DAYS.has(streakDay);

  return {
    date,
    status,
    streakDay,
    isMilestone,
    isToday,
    isFuture,
    journalEntry,
    meditationDone,
    panicEvent,
  };
}

interface DayCellProps {
  info: DayInfo;
  inViewMonth: boolean;
  onClick: () => void;
}

function DayCell({ info, inViewMonth, onClick }: DayCellProps) {
  const language = useLanguage();
  const { date, status, streakDay, isMilestone, isToday, isFuture } = info;
  const dimmed = !inViewMonth || isFuture;

  return (
    <button
      onClick={onClick}
      disabled={isFuture}
      className={`relative aspect-square flex flex-col items-center justify-center rounded-xl transition-all ${
        dimmed ? "opacity-30" : "active:scale-95 hover:bg-white/5"
      } ${isToday ? "ring-2 ring-[#FF9500]/60 bg-[#FF9500]/10" : ""}`}
      aria-label={`${date.getDate()} ${date.toLocaleDateString(localeFor(language), { month: "long" })}`}
    >
      {/* Pulsing aura for today */}
      {isToday && (
        <motion.span
          className="absolute inset-0 rounded-xl"
          style={{ boxShadow: "0 0 16px rgba(255, 149, 0, 0.6)" }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      )}

      <span
        className={`text-xs font-semibold leading-none ${
          isToday ? "text-[#FF9500]" : inViewMonth ? "text-white/90" : "text-white/30"
        }`}
      >
        {date.getDate()}
      </span>

      {/* Status dot or milestone star */}
      <div className="absolute bottom-1 flex items-center justify-center">
        {isMilestone ? (
          <Star size={10} className="text-[#FFD700]" fill="currentColor" />
        ) : status === "streak" || status === "today" ? (
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] flex items-center justify-center">
            <Check size={6} className="text-white" strokeWidth={4} />
          </span>
        ) : status === "crisis" ? (
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] flex items-center justify-center">
            <X size={6} className="text-white" strokeWidth={3} />
          </span>
        ) : status === "no-data" && inViewMonth && !isFuture ? (
          <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
        ) : null}
      </div>

      {/* Streak day number for milestone days */}
      {isMilestone && streakDay > 0 && (
        <span className="absolute top-0.5 right-0.5 text-[7px] font-bold text-[#FFD700]/80">
          {streakDay}
        </span>
      )}
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  gradient: string;
  glow: string;
}

function StatCard({ label, value, unit, icon, gradient, glow }: StatCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="glass-card p-3.5 relative overflow-hidden"
      style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${glow}` }}
    >
      <div
        className="absolute -top-8 -right-8 w-20 h-20 rounded-full blur-2xl opacity-50 pointer-events-none"
        style={{ background: gradient }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center gap-1.5 mb-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: gradient }}
          >
            {icon}
          </div>
        </div>
        <p className="text-2xl font-extrabold text-white font-[family-name:var(--font-poppins)] leading-none">
          {value}
          <span className="text-xs font-medium text-white/50 ml-1">{unit}</span>
        </p>
        <p className="text-white/50 text-[10px] mt-1.5 leading-tight">{label}</p>
      </div>
    </motion.div>
  );
}

function InsightChip({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-3 border"
      style={{
        background: `${color}10`,
        borderColor: `${color}25`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1" style={{ color }}>
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-base font-bold text-white font-[family-name:var(--font-poppins)] leading-none">
        {value}
      </p>
    </div>
  );
}

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 px-1">
      {icon}
      <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">{label}</h3>
    </div>
  );
}

interface DayDetailModalProps {
  detail: DayDetail;
  noteText: string;
  setNoteText: (v: string) => void;
  onClose: () => void;
  onSubmitNote: () => void;
}

function DayDetailModal({
  detail,
  noteText,
  setNoteText,
  onClose,
  onSubmitNote,
}: DayDetailModalProps) {
  const t = useT();
  const language = useLanguage();
  const { date, info, xpEarned } = detail;
  const fullDate = date.toLocaleDateString(localeFor(language), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isCrisis = info.status === "crisis";
  const isNoBet = info.status === "streak" || info.status === "today";
  const isMilestone = info.isMilestone;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card-strong w-full max-w-md p-5 rounded-3xl relative overflow-hidden"
      >
        {/* glow */}
        <div
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl pointer-events-none"
          style={{
            background: isCrisis
              ? "rgba(255, 59, 48, 0.25)"
              : isMilestone
                ? "rgba(255, 215, 0, 0.25)"
                : "rgba(74, 222, 128, 0.22)",
          }}
          aria-hidden
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass-pill flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Fermer"
        >
          <X size={16} className="text-white/70" />
        </button>

        {/* Date */}
        <p className="text-white/50 text-xs capitalize mb-1 pr-8">{fullDate}</p>

        {/* Status badge */}
        <div className="flex items-center gap-2 mb-4">
          {isCrisis ? (
            <StatusBadge color="#FF3B30" icon={<Zap size={14} />} label={t("calendarDayWithCrisis")} />
          ) : isNoBet ? (
            <StatusBadge color="#4ADE80" icon={<Check size={14} />} label={t("calendarDayNoBet")} />
          ) : (
            <StatusBadge color="#9CA3AF" icon={<CalendarIcon size={14} />} label={t("calendarNoData")} />
          )}
          {isMilestone && (
            <StatusBadge color="#FFD700" icon={<Star size={14} />} label={t("calendarMilestoneBadge", { n: info.streakDay })} />
          )}
        </div>

        {/* Detail rows */}
        <div className="space-y-2.5 relative">
          <DetailRow
            icon={<Flame size={14} className="text-[#FF9500]" />}
            label={t("calendarStreakThatDay")}
            value={info.streakDay > 0 ? t("calendarDaysCount", { n: info.streakDay }) : "—"}
          />

          {info.journalEntry ? (
            <div className="rounded-2xl bg-white/5 border border-white/5 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-1.5 text-xs text-white/60">
                  <BookOpen size={12} className="text-[#BF5AF2]" /> {t("calendarEmotion")}
                </span>
                <span className="text-xs text-white/80">
                  {EMOTION_EMOJI[info.journalEntry.emotion]} {t(EMOTION_LABEL_KEYS[info.journalEntry.emotion])}
                </span>
              </div>
              <p className="text-white/70 text-xs italic leading-relaxed line-clamp-3">
                &ldquo;{info.journalEntry.content}&rdquo;
              </p>
            </div>
          ) : (
            <DetailRow
              icon={<BookOpen size={14} className="text-white/40" />}
              label={t("calendarJournal")}
              value={t("calendarNoEntry")}
              muted
            />
          )}

          <DetailRow
            icon={<Wind size={14} className={info.meditationDone ? "text-[#64D2FF]" : "text-white/40"} />}
            label={t("calendarMeditation")}
            value={info.meditationDone ? t("calendarCompleted") : t("calendarNotDone")}
            muted={!info.meditationDone}
          />

          {info.panicEvent && (
            <DetailRow
              icon={<Zap size={14} className="text-[#FF3B30]" />}
              label={t("calendarCrisisIntensity")}
              value={`${info.panicEvent.intensity}/10`}
            />
          )}

          <DetailRow
            icon={<Sparkles size={14} className="text-[#FFD700]" />}
            label={t("calendarXpEarned")}
            value={`${xpEarned} XP`}
          />
        </div>

        {/* Add note */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <label className="text-white/60 text-xs mb-2 block">{t("calendarAddNote")}</label>
          <Textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={t("calendarNotePlaceholder")}
            maxLength={500}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl text-sm min-h-[72px] resize-none focus-visible:border-[#FF9500]/60 focus-visible:ring-[#FF9500]/20"
          />
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onSubmitNote}
            disabled={!noteText.trim()}
            className="w-full mt-2.5 py-2.5 rounded-2xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <Plus size={14} /> {t("calendarSaveNote")}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatusBadge({
  color,
  icon,
  label,
}: {
  color: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      {icon}
      {label}
    </span>
  );
}

function DetailRow({
  icon,
  label,
  value,
  muted = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-white/60 text-xs">
        {icon}
        {label}
      </span>
      <span className={`text-xs font-semibold ${muted ? "text-white/40" : "text-white/90"}`}>
        {value}
      </span>
    </div>
  );
}
