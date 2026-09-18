"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Target,
  CheckCircle2,
  Circle,
  Lock,
  Share2,
  Sparkles,
  BookOpen,
  Wind,
  Coins,
  Heart,
  Users,
  Award,
  TrendingUp,
  Crown,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { toast } from "sonner";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

/* ========================================================================
   Types & Data
   ======================================================================== */

interface Phase {
  id: 1 | 2 | 3;
  name: string;
  subtitle: string;
  dayRange: [number, number];
  gradient: string;
  color: string;
  description: string;
  goalKeys: string[];
  tipKeys: string[];
}

interface DailyTask {
  id: string;
  titleKey: string;
  descKey: string;
  xp: number;
  icon: LucideIcon;
  color: string;
  /** Auto-completed when this returns true, based on store data */
  autoDone?: (ctx: TaskAutoCtx) => boolean;
}

interface TaskAutoCtx {
  lastCheckInDate: string;
  todayStr: string;
  hasJournalToday: boolean;
  meditationStreak: number;
  hasCommunityActivity: boolean;
  hasSavingsGoal: boolean;
}

interface WeekTheme {
  week: number;
  titleKey: string;
  focusKey: string;
  descriptionKey: string;
}

interface Milestone {
  day: number;
  labelKey: string;
  descKey: string;
  badge: string;
  color: string;
}

interface DailyQuote {
  textKey: string;
  authorKey: string;
}

const PHASES: Phase[] = [
  {
    id: 1,
    name: "Phase 1: Fondations",
    subtitle: "Reprendre le contrôle",
    dayRange: [1, 30],
    gradient: "linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)",
    color: "#4ADE80",
    description:
      "Les 30 premiers jours sont les plus importants. Tu apprends à connaître tes déclencheurs, à utiliser tes outils et à construire les fondations de ta récupération.",
    goalKeys: [
      "programPhase1Goal1",
      "programPhase1Goal2",
      "programPhase1Goal3",
      "programPhase1Goal4",
    ],
    tipKeys: [
      "programPhase1Tip1",
      "programPhase1Tip2",
      "programPhase1Tip3",
    ],
  },
  {
    id: 2,
    name: "Phase 2: Consolidation",
    subtitle: "Renforcer tes défenses",
    dayRange: [31, 60],
    gradient: "linear-gradient(135deg, #FBBF24 0%, #FF9500 100%)",
    color: "#FF9500",
    description:
      "Maintenant que les fondations sont posées, tu vas renforcer tes défenses. Tu apprends à gérer tes finances, à réparer tes relations et à fixer de nouveaux objectifs.",
    goalKeys: [
      "programPhase2Goal1",
      "programPhase2Goal2",
      "programPhase2Goal3",
      "programPhase2Goal4",
    ],
    tipKeys: [
      "programPhase2Tip1",
      "programPhase2Tip2",
      "programPhase2Tip3",
    ],
  },
  {
    id: 3,
    name: "Phase 3: Transformation",
    subtitle: "Devenir une nouvelle personne",
    dayRange: [61, 90],
    gradient: "linear-gradient(135deg, #BF5AF2 0%, #FF3B30 100%)",
    color: "#BF5AF2",
    description:
      "La dernière phase est celle de la transformation. Tu deviens une inspiration pour les autres, tu partages ton témoignage et tu construis la version de toi que tu veux être.",
    goalKeys: [
      "programPhase3Goal1",
      "programPhase3Goal2",
      "programPhase3Goal3",
      "programPhase3Goal4",
    ],
    tipKeys: [
      "programPhase3Tip1",
      "programPhase3Tip2",
      "programPhase3Tip3",
    ],
  },
];

const TASKS_BY_PHASE: Record<1 | 2 | 3, DailyTask[]> = {
  1: [
    {
      id: "task-checkin",
      titleKey: "programTaskCheckinTitle",
      descKey: "programTaskCheckinDesc",
      xp: 50,
      icon: CheckCircle2,
      color: "#4ADE80",
      autoDone: (ctx) => ctx.lastCheckInDate === ctx.todayStr,
    },
    {
      id: "task-journal",
      titleKey: "programTaskJournalTitle",
      descKey: "programTaskJournalDesc",
      xp: 30,
      icon: BookOpen,
      color: "#64D2FF",
      autoDone: (ctx) => ctx.hasJournalToday,
    },
    {
      id: "task-breathing",
      titleKey: "programTaskBreathingTitle",
      descKey: "programTaskBreathingDesc",
      xp: 40,
      icon: Wind,
      color: "#22D3EE",
      autoDone: (ctx) => ctx.meditationStreak >= 1,
    },
    {
      id: "task-article",
      titleKey: "programTaskArticleTitle",
      descKey: "programTaskArticleDesc",
      xp: 20,
      icon: BookOpen,
      color: "#BF5AF2",
    },
  ],
  2: [
    {
      id: "task-checkin",
      titleKey: "programTaskCheckinTitle",
      descKey: "programTaskCheckinDesc",
      xp: 50,
      icon: CheckCircle2,
      color: "#4ADE80",
      autoDone: (ctx) => ctx.lastCheckInDate === ctx.todayStr,
    },
    {
      id: "task-journal",
      titleKey: "programTaskJournalTitle",
      descKey: "programTaskJournalDesc",
      xp: 30,
      icon: BookOpen,
      color: "#64D2FF",
      autoDone: (ctx) => ctx.hasJournalToday,
    },
    {
      id: "task-breathing",
      titleKey: "programTaskBreathingTitle",
      descKey: "programTaskBreathingDesc",
      xp: 40,
      icon: Wind,
      color: "#22D3EE",
      autoDone: (ctx) => ctx.meditationStreak >= 1,
    },
    {
      id: "task-article",
      titleKey: "programTaskArticleTitle",
      descKey: "programTaskArticleDesc",
      xp: 20,
      icon: BookOpen,
      color: "#BF5AF2",
    },
    {
      id: "task-meditate",
      titleKey: "programTaskMeditateTitle",
      descKey: "programTaskMeditateDesc",
      xp: 40,
      icon: Sparkles,
      color: "#FBBF24",
      autoDone: (ctx) => ctx.meditationStreak >= 1,
    },
    {
      id: "task-savings",
      titleKey: "programTaskSavingsTitle",
      descKey: "programTaskSavingsDesc",
      xp: 25,
      icon: Coins,
      color: "#FF9500",
      autoDone: (ctx) => ctx.hasSavingsGoal,
    },
  ],
  3: [
    {
      id: "task-checkin",
      titleKey: "programTaskCheckinTitle",
      descKey: "programTaskCheckinDesc",
      xp: 50,
      icon: CheckCircle2,
      color: "#4ADE80",
      autoDone: (ctx) => ctx.lastCheckInDate === ctx.todayStr,
    },
    {
      id: "task-journal",
      titleKey: "programTaskJournalTitle",
      descKey: "programTaskJournalDesc",
      xp: 30,
      icon: BookOpen,
      color: "#64D2FF",
      autoDone: (ctx) => ctx.hasJournalToday,
    },
    {
      id: "task-breathing",
      titleKey: "programTaskBreathingTitle",
      descKey: "programTaskBreathingDesc",
      xp: 40,
      icon: Wind,
      color: "#22D3EE",
      autoDone: (ctx) => ctx.meditationStreak >= 1,
    },
    {
      id: "task-meditate",
      titleKey: "programTaskMeditateTitle",
      descKey: "programTaskMeditateDesc",
      xp: 40,
      icon: Sparkles,
      color: "#FBBF24",
      autoDone: (ctx) => ctx.meditationStreak >= 1,
    },
    {
      id: "task-share",
      titleKey: "programTaskShareTitle",
      descKey: "programTaskShareDesc",
      xp: 60,
      icon: Users,
      color: "#FF9500",
      autoDone: (ctx) => ctx.hasCommunityActivity,
    },
    {
      id: "task-help",
      titleKey: "programTaskHelpTitle",
      descKey: "programTaskHelpDesc",
      xp: 80,
      icon: Heart,
      color: "#FF3B30",
      autoDone: (ctx) => ctx.hasCommunityActivity,
    },
    {
      id: "task-mentor",
      titleKey: "programTaskMentorTitle",
      descKey: "programTaskMentorDesc",
      xp: 100,
      icon: Crown,
      color: "#BF5AF2",
    },
    {
      id: "task-testimony",
      titleKey: "programTaskTestimonyTitle",
      descKey: "programTaskTestimonyDesc",
      xp: 90,
      icon: Award,
      color: "#FFD700",
      autoDone: (ctx) => ctx.hasCommunityActivity,
    },
  ],
};

const WEEK_THEMES: WeekTheme[] = [
  { week: 1, titleKey: "programWeek1Title", focusKey: "programWeek1Focus", descriptionKey: "programWeek1Desc" },
  { week: 2, titleKey: "programWeek2Title", focusKey: "programWeek2Focus", descriptionKey: "programWeek2Desc" },
  { week: 3, titleKey: "programWeek3Title", focusKey: "programWeek3Focus", descriptionKey: "programWeek3Desc" },
  { week: 4, titleKey: "programWeek4Title", focusKey: "programWeek4Focus", descriptionKey: "programWeek4Desc" },
  { week: 5, titleKey: "programWeek5Title", focusKey: "programWeek5Focus", descriptionKey: "programWeek5Desc" },
  { week: 6, titleKey: "programWeek6Title", focusKey: "programWeek6Focus", descriptionKey: "programWeek6Desc" },
  { week: 7, titleKey: "programWeek7Title", focusKey: "programWeek7Focus", descriptionKey: "programWeek7Desc" },
  { week: 8, titleKey: "programWeek8Title", focusKey: "programWeek8Focus", descriptionKey: "programWeek8Desc" },
  { week: 9, titleKey: "programWeek9Title", focusKey: "programWeek9Focus", descriptionKey: "programWeek9Desc" },
  { week: 10, titleKey: "programWeek10Title", focusKey: "programWeek10Focus", descriptionKey: "programWeek10Desc" },
  { week: 11, titleKey: "programWeek11Title", focusKey: "programWeek11Focus", descriptionKey: "programWeek11Desc" },
  { week: 12, titleKey: "programWeek12Title", focusKey: "programWeek12Focus", descriptionKey: "programWeek12Desc" },
  { week: 13, titleKey: "programWeek13Title", focusKey: "programWeek13Focus", descriptionKey: "programWeek13Desc" },
];

const MILESTONES: Milestone[] = [
  { day: 1, labelKey: "programMilestone1Label", descKey: "programMilestone1Desc", badge: "🌱", color: "#4ADE80" },
  { day: 7, labelKey: "programMilestone7Label", descKey: "programMilestone7Desc", badge: "🔥", color: "#FF9500" },
  { day: 14, labelKey: "programMilestone14Label", descKey: "programMilestone14Desc", badge: "💪", color: "#FBBF24" },
  { day: 30, labelKey: "programMilestone30Label", descKey: "programMilestone30Desc", badge: "🥇", color: "#FFD700" },
  { day: 45, labelKey: "programMilestone45Label", descKey: "programMilestone45Desc", badge: "💎", color: "#64D2FF" },
  { day: 60, labelKey: "programMilestone60Label", descKey: "programMilestone60Desc", badge: "🏆", color: "#BF5AF2" },
  { day: 90, labelKey: "programMilestone90Label", descKey: "programMilestone90Desc", badge: "👑", color: "#FF3B30" },
];

// Daily quotes — text & author live in the dictionary under programQuote{n}Text / Author
// (93 entries × 2 fields × 3 languages = 558 translation keys).
const DAILY_QUOTES: DailyQuote[] = Array.from({ length: 93 }, (_, i) => ({
  textKey: `programQuote${i + 1}Text`,
  authorKey: `programQuote${i + 1}Author`,
}));

/* ========================================================================
   Helpers
   ======================================================================== */

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getPhaseForDay(day: number): Phase {
  if (day <= 30) return PHASES[0];
  if (day <= 60) return PHASES[1];
  return PHASES[2];
}

function getWeekForDay(day: number): number {
  return Math.min(13, Math.ceil(day / 7));
}

function getMilestoneStatus(
  day: number,
  milestoneDay: number
): "achieved" | "current" | "locked" {
  if (day > milestoneDay) return "achieved";
  if (day === milestoneDay) return "current";
  return "locked";
}

function getQuoteForDay(day: number): DailyQuote {
  const idx = (day - 1) % DAILY_QUOTES.length;
  return DAILY_QUOTES[idx];
}

/* ========================================================================
   Main Component
   ======================================================================== */

export function ProgramScreen() {
  const t = useT();
  const {
    navigate,
    streakDays,
    journalEntries,
    meditationStreak,
    lastCheckInDate,
    testimonials,
    forumPosts,
    savingsGoals,
    programTasksCompleted,
    programLastReset,
    markProgramTask,
    resetProgramTasks,
    addXP,
  } = useStore();

  const todayStr = toISODate(startOfDay(new Date()));

  // Auto-reset program tasks daily
  useEffect(() => {
    if (programLastReset !== new Date().toDateString()) {
      resetProgramTasks();
    }
  }, [programLastReset, resetProgramTasks]);

  // Current program day (clamped 1-90). streakDays = days without betting.
  const currentDay = Math.min(90, Math.max(1, streakDays || 1));
  const currentPhase = getPhaseForDay(currentDay);
  const currentWeek = getWeekForDay(currentDay);
  const progressPercent = (currentDay / 90) * 100;
  const phaseProgress = currentPhase.id === 1
    ? (currentDay / 30) * 100
    : currentPhase.id === 2
      ? ((currentDay - 30) / 30) * 100
      : ((currentDay - 60) / 30) * 100;
  const daysRemainingInPhase = currentPhase.dayRange[1] - currentDay;

  // Auto-completion context
  const autoCtx: TaskAutoCtx = useMemo(() => {
    const todayJournal = journalEntries.some((entry) => {
      const d = startOfDay(new Date(entry.createdAt));
      return toISODate(d) === todayStr;
    });
    return {
      lastCheckInDate: lastCheckInDate ?? "",
      todayStr,
      hasJournalToday: todayJournal,
      meditationStreak,
      hasCommunityActivity: testimonials.length > 0 || forumPosts.length > 0,
      hasSavingsGoal: savingsGoals.length > 0,
    };
  }, [journalEntries, lastCheckInDate, todayStr, meditationStreak, testimonials, forumPosts, savingsGoals]);

  // Compute task list for current phase + completion status
  const tasks = TASKS_BY_PHASE[currentPhase.id];
  const tasksWithStatus = tasks.map((task) => {
    const autoCompleted = task.autoDone ? task.autoDone(autoCtx) : false;
    const manuallyCompleted = programTasksCompleted.includes(task.id);
    return {
      ...task,
      done: autoCompleted || manuallyCompleted,
      autoCompleted,
    };
  });

  const completedCount = tasksWithStatus.filter((t) => t.done).length;
  const allDone = completedCount === tasksWithStatus.length;
  const totalXP = tasksWithStatus.filter((t) => t.done).reduce((sum, t) => sum + t.xp, 0);

  const handleToggleTask = (taskId: string, alreadyDone: boolean) => {
    if (alreadyDone) return;
    sound.playPop();
    haptics.light();
    markProgramTask(taskId);
    toast.success(t("programTaskDone"));
  };

  const handleClaimRewards = () => {
    if (!allDone) return;
    sound.playSuccess();
    haptics.success();
    addXP(totalXP, t("programTitle"));
    toast.success(`+${totalXP} XP 🎉`);
  };

  const handleShare = () => {
    sound.playClick();
    haptics.light();
    const quote = getQuoteForDay(currentDay);
    const text = `"${t(quote.textKey)}" — ${t(quote.authorKey)} | ${t("programShareTemplate", { n: currentDay })}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: t("programShareTitle"), text }).catch(() => {
        toast.success(t("programShareBtn"));
        navigator.clipboard?.writeText(text);
      });
    } else {
      navigator.clipboard?.writeText(text);
      toast.success(t("programShareBtn"));
    }
  };

  const quote = getQuoteForDay(currentDay);

  return (
    <div className="min-h-screen px-5 pt-12 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 mb-6"
      >
        <button
          onClick={() => {
            sound.playClick();
            haptics.light();
            navigate("dashboard");
          }}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
          aria-label={t("backToDashboard")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight">
            {t("programTitle")}
          </h1>
          <p className="text-white/50 text-xs">{t("programSubtitle")}</p>
        </div>
        <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <Target size={18} className="text-[#4ADE80]" />
        </div>
      </motion.div>

      {/* Section 1: Program Overview Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl mb-6 p-5 border border-white/10"
        style={{
          background: "linear-gradient(135deg, rgba(74,222,128,0.18) 0%, rgba(34,211,238,0.10) 50%, rgba(191,90,242,0.10) 100%)",
        }}
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(74,222,128,0.25)" }} />

        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-[#4ADE80]" />
            <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-wider">
              {t("programOverviewLabel")}
            </span>
          </div>
          <h2 className="text-white font-extrabold text-2xl font-[family-name:var(--font-poppins)] leading-tight mb-3">
            {t("programOverviewTitle")}
          </h2>

          {/* Day indicator */}
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl font-extrabold text-white font-[family-name:var(--font-poppins)]">
              {currentDay}
            </div>
            <div className="flex-1">
              <div className="text-white/60 text-xs">{t("programDayOn90")}</div>
              <div className="text-white/40 text-[10px]">
                {t("programDaysRemaining", { n: 90 - currentDay })}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#4ADE80] text-lg font-bold">{Math.round(progressPercent)}%</div>
              <div className="text-white/40 text-[10px]">{t("programCompletedShort")}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-3 rounded-full bg-white/10 overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: "linear-gradient(90deg, #4ADE80 0%, #FBBF24 50%, #BF5AF2 100%)" }}
            />
            {/* Phase markers */}
            {[33.33, 66.66].map((pos) => (
              <div
                key={pos}
                className="absolute inset-y-0 w-px bg-white/30"
                style={{ left: `${pos}%` }}
                aria-hidden
              />
            ))}
          </div>

          {/* Phases overview */}
          <div className="grid grid-cols-3 gap-2">
            {PHASES.map((phase) => {
              const active = phase.id === currentPhase.id;
              const passed = currentDay > phase.dayRange[1];
              return (
                <div
                  key={phase.id}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    active
                      ? "border-white/30 bg-white/10"
                      : passed
                        ? "border-[#4ADE80]/30 bg-[#4ADE80]/10"
                        : "border-white/5 bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    {active && <div className="w-1.5 h-1.5 rounded-full" style={{ background: phase.color }} />}
                    <span className="text-white text-[10px] font-bold uppercase">
                      {t("programPhase", { n: phase.id })}
                    </span>
                  </div>
                  <p className="text-white text-[11px] font-semibold leading-tight mb-0.5">
                    {phase.id === 1 ? t("programPhase1Short") : phase.id === 2 ? t("programPhase2Short") : t("programPhase3Short")}
                  </p>
                  <p className="text-white/50 text-[9px]">
                    J{phase.dayRange[0]}-J{phase.dayRange[1]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Section 2: Current Phase Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="glass-card-strong p-5 mb-6 relative overflow-hidden"
      >
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none"
          style={{ background: `${currentPhase.color}33` }}
        />

        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: currentPhase.color }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: currentPhase.color }}
              >
                {currentPhase.id === 1 ? t("programPhase1Name") : currentPhase.id === 2 ? t("programPhase2Name") : t("programPhase3Name")}
              </span>
            </div>
            <span className="text-white/50 text-[11px]">
              {daysRemainingInPhase > 0
                ? t("programDaysLeftInPhase", { n: daysRemainingInPhase })
                : t("programPhaseComplete")}
            </span>
          </div>

          <h3 className="text-white font-bold text-base font-[family-name:var(--font-poppins)] mb-2">
            {currentPhase.id === 1 ? t("programPhase1Subtitle") : currentPhase.id === 2 ? t("programPhase2Subtitle") : t("programPhase3Subtitle")}
          </h3>
          <p className="text-white/60 text-xs leading-relaxed mb-3">
            {currentPhase.id === 1 ? t("programPhase1Desc") : currentPhase.id === 2 ? t("programPhase2Desc") : t("programPhase3Desc")}
          </p>

          {/* Phase progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/50 text-[10px]">{t("programPhaseProgressLabel")}</span>
              <span className="text-white text-[10px] font-semibold">
                {Math.round(phaseProgress)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${phaseProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: currentPhase.gradient }}
              />
            </div>
          </div>

          {/* Goals */}
          <div className="mb-3">
            <div className="text-white/60 text-[10px] font-semibold uppercase mb-1.5">
              {t("programPhaseGoalsLabel")}
            </div>
            <div className="space-y-1">
              {currentPhase.goalKeys.map((goalKey, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="text-white/30 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-xs">{t(goalKey)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="text-white/60 text-[10px] font-semibold uppercase mb-1.5 flex items-center gap-1">
              <Sparkles size={10} /> {t("programTipsLabel")}
            </div>
            <ul className="space-y-1">
              {currentPhase.tipKeys.map((tipKey, i) => (
                <li key={i} className="text-white/70 text-xs flex items-start gap-1.5">
                  <span className="text-[#4ADE80] mt-0.5">•</span>
                  <span>{t(tipKey)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Section 3: Today's Tasks */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target size={14} className="text-[#FF9500]" />
            <h2 className="text-white font-semibold text-sm">{t("programTasksTitle")}</h2>
          </div>
          <span className="text-white/50 text-xs">
            {completedCount}/{tasksWithStatus.length}
          </span>
        </div>

        <div className="space-y-2 mb-3">
          {tasksWithStatus.map((task, idx) => {
            const Icon = task.icon;
            return (
              <motion.button
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleToggleTask(task.id, task.done)}
                disabled={task.done}
                className={`w-full glass-card p-3.5 flex items-center gap-3 text-left transition-opacity ${
                  task.done ? "opacity-60" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  {task.done ? (
                    <CheckCircle2 size={22} style={{ color: task.color }} fill={task.color} fillOpacity={0.2} />
                  ) : (
                    <Circle size={22} className="text-white/30" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icon size={12} style={{ color: task.color }} />
                    <h3 className={`text-sm font-semibold ${task.done ? "text-white/60 line-through" : "text-white"}`}>
                      {t(task.titleKey)}
                    </h3>
                  </div>
                  <p className="text-white/50 text-[11px]">{t(task.descKey)}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-[#FBBF24] text-xs font-bold">+{task.xp}</span>
                  <div className="text-white/40 text-[9px]">XP</div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Claim rewards button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleClaimRewards}
          disabled={!allDone}
          className={`w-full py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-opacity ${
            allDone
              ? "gradient-primary text-white pulse-glow"
              : "glass-pill text-white/40 cursor-not-allowed"
          }`}
        >
          {allDone ? (
            <>
              <Award size={16} /> {t("programClaimBtn", { n: totalXP })}
            </>
          ) : (
            <>
              <Lock size={14} /> {t("programClaimLocked")}
            </>
          )}
        </motion.button>
      </section>

      {/* Section 4: Weekly Themes */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-[#64D2FF]" />
          <h2 className="text-white font-semibold text-sm">{t("programWeeklyTitle")}</h2>
        </div>

        <div className="relative pl-4">
          {/* Vertical line */}
          <div className="absolute left-[6px] top-2 bottom-2 w-px bg-white/10" aria-hidden />

          <div className="space-y-2.5">
            {WEEK_THEMES.map((week) => {
              const isCurrent = week.week === currentWeek;
              const isPassed = week.week < currentWeek;
              return (
                <motion.div
                  key={week.week}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(week.week * 0.02, 0.4) }}
                  className={`relative pl-4 ${isCurrent ? "" : ""}`}
                >
                  {/* Dot */}
                  <div
                    className={`absolute -left-[10px] top-3 w-3 h-3 rounded-full border-2 ${
                      isCurrent
                        ? "bg-[#FF9500] border-[#FF9500]"
                        : isPassed
                          ? "bg-[#4ADE80] border-[#4ADE80]"
                          : "bg-[#070B0E] border-white/20"
                    }`}
                  />

                  <div
                    className={`p-3 rounded-xl transition-colors ${
                      isCurrent
                        ? "glass-card-strong border border-[#FF9500]/30"
                        : isPassed
                          ? "glass-card"
                          : "glass-card opacity-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 text-[10px] font-bold">{t("programWeekLabel", { n: week.week })}</span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#FF9500]/20 text-[#FF9500] text-[9px] font-bold uppercase">
                            {t("programWeekCurrent")}
                          </span>
                        )}
                        {isPassed && (
                          <CheckCircle2 size={11} className="text-[#4ADE80]" />
                        )}
                      </div>
                      <span className="text-white/40 text-[9px]">{t(week.focusKey)}</span>
                    </div>
                    <h3 className={`text-sm font-semibold mb-0.5 ${isPassed || isCurrent ? "text-white" : "text-white/60"}`}>
                      {t(week.titleKey)}
                    </h3>
                    <p className="text-white/50 text-[11px] leading-relaxed">{t(week.descriptionKey)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Milestones */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Award size={14} className="text-[#FBBF24]" />
          <h2 className="text-white font-semibold text-sm">{t("programMilestonesTitle")}</h2>
        </div>

        <div className="relative pl-4">
          {/* Vertical line */}
          <div className="absolute left-[14px] top-2 bottom-2 w-px bg-white/10" aria-hidden />

          <div className="space-y-3">
            {MILESTONES.map((milestone, idx) => {
              const status = getMilestoneStatus(currentDay, milestone.day);
              return (
                <motion.div
                  key={milestone.day}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative pl-7"
                >
                  {/* Badge circle on the line */}
                  <div
                    className={`absolute -left-[10px] top-1 w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${
                      status === "achieved"
                        ? "border-transparent"
                        : status === "current"
                          ? "border-white/30 bg-white/5 pulse-glow"
                          : "border-white/10 bg-[#070B0E]"
                    }`}
                    style={
                      status === "achieved"
                        ? { background: `${milestone.color}30`, borderColor: milestone.color }
                        : status === "current"
                          ? { boxShadow: `0 0 16px ${milestone.color}66` }
                          : undefined
                    }
                  >
                    {status === "locked" ? (
                      <Lock size={12} className="text-white/30" />
                    ) : (
                      <span>{milestone.badge}</span>
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-xl ${
                      status === "current"
                        ? "glass-card-strong border border-white/15"
                        : status === "achieved"
                          ? "glass-card"
                          : "glass-card opacity-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-semibold ${status === "locked" ? "text-white/50" : "text-white"}`}>
                          {t(milestone.labelKey)}
                        </h3>
                        {status === "current" && (
                          <span
                            className="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase"
                            style={{ background: `${milestone.color}25`, color: milestone.color }}
                          >
                            {t("programMilestoneNow")}
                          </span>
                        )}
                        {status === "achieved" && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#4ADE80]/20 text-[#4ADE80] text-[9px] font-bold uppercase">
                            {t("programMilestoneReached")}
                          </span>
                        )}
                      </div>
                      <span className="text-white/40 text-[10px] font-bold">J{milestone.day}</span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">{t(milestone.descKey)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 6: Daily Inspiration */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl mb-4 p-6 border border-white/10"
        style={{
          background: "linear-gradient(135deg, rgba(191,90,242,0.18) 0%, rgba(255,149,0,0.10) 100%)",
        }}
      >
        <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(191,90,242,0.3)" }} />

        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Quote size={16} className="text-[#BF5AF2]" />
            <span className="text-[#BF5AF2] text-[11px] font-bold uppercase tracking-wider">
              {t("programInspirationLabel", { n: currentDay })}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentDay}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-white text-base font-medium leading-relaxed font-[family-name:var(--font-poppins)] mb-3">
                « {t(quote.textKey)} »
              </p>
              <p className="text-white/50 text-xs text-right mb-4">— {t(quote.authorKey)}</p>
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            className="w-full py-2.5 rounded-2xl glass-pill text-white text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Share2 size={14} /> {t("programShareBtn")}
          </motion.button>
        </div>
      </motion.div>

      {/* Completion celebration (if day 90 reached) */}
      <AnimatePresence>
        {currentDay >= 90 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card-strong p-5 mb-4 text-center border border-[#FFD700]/30"
            style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,59,48,0.10) 100%)" }}
          >
            <div className="text-4xl mb-2">👑</div>
            <h3 className="text-white font-bold text-base font-[family-name:var(--font-poppins)] mb-1">
              {t("programCompletedTitle")}
            </h3>
            <p className="text-white/60 text-xs">
              {t("programCompletedDesc")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
