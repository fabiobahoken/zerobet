"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, BookOpen, Wallet, Bot, Shield, Users, Flame, TrendingUp,
  Crown, ChevronRight, Quote, Award, Settings as SettingsIcon, Bell,
  Target, Sparkles, Phone, BarChart3, Wind, Search, Trophy, User, Gamepad2,
  Calendar, HelpCircle, Activity, ScanSearch, HeartPulse,
  MessageCircle, Lock, Hand, RotateCcw, MoreHorizontal, Share2,
  Sprout, Star, ShieldCheck, GraduationCap, type LucideIcon,
} from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { AuroraOrb } from "@/components/zerobet/components/AuroraOrb";
import {
  ProgressRing,
  milestoneProgress,
} from "@/components/zerobet/components/ProgressRing";
import { ZerobetLogo } from "@/components/zerobet/components/ZerobetLogo";
import { NotificationCenter } from "@/components/zerobet/components/NotificationCenter";
import { DailyCheckIn } from "@/components/zerobet/components/DailyCheckIn";
import { AchievementPopup } from "@/components/zerobet/components/AchievementPopup";
import { MilestoneCelebration } from "@/components/zerobet/components/MilestoneCelebration";
import { RelapseModal } from "@/components/zerobet/components/RelapseModal";
import { SearchModal } from "@/components/zerobet/components/SearchModal";
import { PullToRefresh } from "@/components/zerobet/components/PullToRefresh";
import { TutorialTooltips } from "@/components/zerobet/components/TutorialTooltips";
import { DailyInsights } from "@/components/zerobet/components/DailyInsights";
import { MoodTracker } from "@/components/zerobet/components/MoodTracker";
import { DailyChallengeCard } from "@/components/zerobet/components/DailyChallengeCard";
import { AnimatedNumber } from "@/components/zerobet/components/AnimatedNumber";
import { HeatmapCalendar } from "@/components/zerobet/components/HeatmapCalendar";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { getDailyQuote } from "@/lib/data/community-data";
import { getCurrentRank, getNextRank, PARCOURS_RANKS } from "@/lib/data/parcours-data";
import { getCurrency } from "@/lib/data/currency-data";
import {
  containerVariants,
  itemVariants,
} from "@/lib/animations";
import { useT, useLanguage } from "@/lib/i18n/useT";
import { ArtifactIcon } from "@/components/zerobet/components/ArtifactIcon";
import JourneyShareModal from "@/components/zerobet/components/JourneyShareModal";
import type { JourneyCardData } from "@/lib/share-card";

const PLAN_BADGES: Record<string, { labelKey: string; color: string; icon: LucideIcon }> = {
  free: { labelKey: "planFree", color: "#9CA3AF", icon: Sprout },
  premium: { labelKey: "planPremium", color: "#FF6B00", icon: Star },
  mentor: { labelKey: "planMentor", color: "#FFC94D", icon: ShieldCheck },
  psychologist: { labelKey: "planPsychologist", color: "#FFD166", icon: GraduationCap },
};

const INTL_LOCALES: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
  es: "es-ES",
};

const DAY_MS = 86_400_000;

const DAILY_CHALLENGES = [
  { textKey: "challenge1", screen: "journal" as const },
  { textKey: "challenge2", screen: "community" as const },
  { textKey: "challenge3", screen: "panic" as const },
  { textKey: "challenge4", screen: "journal" as const },
  { textKey: "challenge5", screen: "finance" as const },
  { textKey: "challenge6", screen: "community" as const },
  { textKey: "challenge7", screen: "atlas" as const },
  { textKey: "challenge8", screen: "panic" as const },
  { textKey: "challenge9", screen: "journal" as const },
  { textKey: "challenge10", screen: "panic" as const },
  { textKey: "challenge11", screen: "atlas" as const },
  { textKey: "challenge12", screen: "journal" as const },
];

function getDailyChallenge() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
}

/* ------------------------------------------------------------------ */
/* Week strip — QUITTR-style M T W T F S S check-in dots               */
/* ------------------------------------------------------------------ */
type DayState = "done" | "missed" | "today" | "upcoming";

function WeekStrip({ streak, checkedToday }: { streak: number; checkedToday: boolean }) {
  const lang = useLanguage();

  const { labels, states } = useMemo(() => {
    const locale = INTL_LOCALES[lang] ?? "fr-FR";
    const narrow = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dow = (now.getDay() + 6) % 7; // 0 = Monday
    const monday = new Date(startOfToday.getTime() - dow * DAY_MS);
    const streakStart =
      streak > 0 ? new Date(startOfToday.getTime() - (streak - 1) * DAY_MS) : null;

    const labels: string[] = [];
    const states: DayState[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday.getTime() + i * DAY_MS);
      labels.push(narrow.format(day).toUpperCase());
      if (day.getTime() > startOfToday.getTime()) {
        states.push("upcoming");
      } else if (day.getTime() === startOfToday.getTime()) {
        states.push(streak > 0 && checkedToday ? "done" : "today");
      } else if (streakStart && day.getTime() >= streakStart.getTime()) {
        states.push("done");
      } else {
        states.push("missed");
      }
    }
    return { labels, states };
  }, [lang, streak, checkedToday]);

  return (
    <div className="flex items-start justify-between px-1">
      {labels.map((label, i) => {
        const state = states[i];
        return (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                state === "done"
                  ? "gradient-primary text-white glow-blue"
                  : state === "today"
                    ? "animate-glow-pulse border border-dashed border-white/40 text-white/80"
                    : state === "missed"
                      ? "text-white/25"
                      : "text-white/35"
              }`}
              style={
                state === "missed"
                  ? { background: "rgba(255,255,255,0.04)" }
                  : undefined
              }
              aria-label={`${label} — ${state}`}
            >
              {state === "done" ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2.5 6.5L5 9L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : state === "missed" ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <span className="h-1 w-3 rounded-full bg-current" />
              )}
            </div>
            <span
              className={`text-[9px] font-semibold tracking-wide ${
                state === "today" ? "text-white" : "text-white/30"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Live sober clock — ticks every second, QUITTR-style                 */
/* ------------------------------------------------------------------ */
function useLiveSoberClock(streak: number) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const elapsedSubDay = Math.max(0, now.getTime() - startOfToday.getTime());
  const h = Math.floor(elapsedSubDay / 3_600_000);
  const m = Math.floor((elapsedSubDay % 3_600_000) / 60_000);
  const s = Math.floor((elapsedSubDay % 60_000) / 1000);

  const soberOn = streak > 0
    ? new Date(startOfToday.getTime() - (streak - 1) * DAY_MS)
    : null;

  return { h, m, s, soberOn };
}

export function DashboardScreen() {
  const {
    streakDays, weeklyBetAmount, addictionScore, plan, name, gender,
    navigate, setStreak, resetStreak, adminStreakOverride, isAdmin, setIsAdmin,
    unlockedRanks, unlockRank, setPlan, notifications,
    lastCheckInDate, currency,
    completeDailyChallenge, challengeCompletedDate, challengeStreak,
    journalEntries, xp, level,
  } = useStore();
  const t = useT();
  const lang = useLanguage();
  const currencyInfo = getCurrency(currency);

  const [relapseOpen, setRelapseOpen] = useState(false);
  const [relapsePrevStreak, setRelapsePrevStreak] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [challengeJustDone, setChallengeJustDone] = useState(false);

  // Track when the daily check-in modal is dismissed so the onboarding
  // tutorial can start afterwards (avoids overlapping with the modal).
  const todayStr = new Date().toISOString().split("T")[0];
  const [checkInDismissed, setCheckInDismissed] = useState(
    lastCheckInDate === todayStr
  );

  const effectiveStreak = adminStreakOverride !== null ? adminStreakOverride : streakDays;
  const currentRank = getCurrentRank(effectiveStreak);
  const nextRank = getNextRank(effectiveStreak);
  const planBadge = PLAN_BADGES[plan];
  const quote = getDailyQuote();
  const dailyChallenge = useMemo(() => getDailyChallenge(), []);
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );
  const { h, m, s, soberOn } = useLiveSoberClock(effectiveStreak);
  const checkedToday = lastCheckInDate === todayStr;

  // Brain rewiring — the reference model: ~90 days to fully rewire
  const rewirePct = Math.min(100, Math.round((effectiveStreak / 90) * 100));

  // QUITTR "DAYS CLEAN" ring — progress toward the next streak milestone.
  const STREAK_MILESTONES = [7, 14, 30, 60, 90, 180, 365];
  const milestone = milestoneProgress(effectiveStreak, STREAK_MILESTONES);
  // Quarter checkpoints inside the current segment — they ignite as the
  // streak advances toward the next milestone.
  const ringTicks = [0.25, 0.5, 0.75];

  // Notification panel state
  const [notifOpen, setNotifOpen] = useState(false);
  // Global search modal state
  const [searchOpen, setSearchOpen] = useState(false);
  // Zerobet 2.0.8 — journey card share modal state
  const [journeyOpen, setJourneyOpen] = useState(false);

  // Admin mode detection (4 taps on logo)
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleLogoTap = () => {
    tapCountRef.current += 1;
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 600);
    if (tapCountRef.current >= 4) {
      tapCountRef.current = 0;
      setIsAdmin(!isAdmin);
      setShowAdmin(true);
    }
  };

  // Auto-unlock ranks based on streak
  useEffect(() => {
    PARCOURS_RANKS.forEach((rank) => {
      if (effectiveStreak >= rank.requiredDays && !unlockedRanks.includes(rank.key)) {
        unlockRank(rank.key);
      }
    });
  }, [effectiveStreak, unlockedRanks, unlockRank]);

  const totalSaved = effectiveStreak * Math.round(weeklyBetAmount / 7);

  // Zerobet 2.0.8 — data for the shareable journey card
  const journeyData = useMemo<JourneyCardData>(() => {
    const fmt = new Intl.NumberFormat(INTL_LOCALES[lang] ?? "fr-FR");
    const saved = Math.round(totalSaved * currencyInfo.rateFromFCFA);
    const savedValue =
      currencyInfo.position === "before"
        ? `${currencyInfo.symbol} ${fmt.format(saved)}`
        : `${fmt.format(saved)} ${currencyInfo.symbol}`;
    return {
      days: effectiveStreak,
      headerLabel: t("journeyCardHeader"),
      daysLabel: t("journeyCardDaysLabel"),
      savedLine: t("journeyCardSavedLine", { n: savedValue }),
      accent: currentRank.color,
      stats: [
        { emoji: "🏅", label: t("journeyStatRank"), value: t(currentRank.nameKey) },
        {
          emoji: "⚡",
          label: t("journeyStatLevel"),
          value: t("journeyStatLevelValue", { level: String(level), xp: fmt.format(xp) }),
        },
        { emoji: "📖", label: t("journeyStatJournal"), value: t("journeyStatJournalValue", { n: journalEntries.length }) },
      ],
      tagline: t("journeyCardTagline"),
    };
  }, [effectiveStreak, totalSaved, currencyInfo, currentRank, level, xp, journalEntries.length, t, lang]);

  const soberOnLabel = useMemo(() => {
    if (!soberOn) return null;
    return new Intl.DateTimeFormat(INTL_LOCALES[lang] ?? "fr-FR", {
      day: "numeric",
      month: "long",
    }).format(soberOn);
  }, [soberOn, lang]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setRefreshing(false);
  };

  const openRelapseModal = () => {
    sound.playClick();
    haptics.medium();
    setRelapsePrevStreak(effectiveStreak);
    setRelapseOpen(true);
  };

  const quickActions = [
    { icon: Zap, labelKey: "qaPanic", color: "#FF3B30", screen: "panic" as const, premium: false },
    { icon: Gamepad2, labelKey: "qaQuests", color: "#FBBF24", screen: "gamification" as const, premium: false },
    { icon: BookOpen, labelKey: "qaJournal", color: "#FFB020", screen: "journal" as const, premium: false },
    { icon: Wallet, labelKey: "qaSavings", color: "#FFC94D", screen: "finance" as const, premium: false },
    { icon: BarChart3, labelKey: "qaStats", color: "#FFB020", screen: "stats" as const, premium: false },
    { icon: Wind, labelKey: "qaMeditation", color: "#FFB020", screen: "meditation" as const, premium: false },
    { icon: Bot, labelKey: "qaAtlas", color: "#FFD166", screen: "atlas" as const, premium: false },
    { icon: Shield, labelKey: "qaBlocker", color: "#FBBF24", screen: "blocker" as const, premium: true },
    { icon: Users, labelKey: "qaCommunity", color: "#F59E0B", screen: "community" as const, premium: false },
    { icon: MessageCircle, labelKey: "qaChat", color: "#FFC94D", screen: "community-chat" as const, premium: false },
    { icon: Trophy, labelKey: "qaTrophies", color: "#FBBF24", screen: "achievements" as const, premium: false },
    { icon: BookOpen, labelKey: "qaResources", color: "#FFD166", screen: "resources" as const, premium: false },
    { icon: User, labelKey: "qaProfile", color: "#FFD166", screen: "profile" as const, premium: false },
    { icon: Phone, labelKey: "qaSOS", color: "#FF3B30", screen: "sos" as const, premium: false },
    { icon: Calendar, labelKey: "qaCalendar", color: "#F59E0B", screen: "calendar" as const, premium: false },
    { icon: HelpCircle, labelKey: "qaHelp", color: "#FFB020", screen: "support" as const, premium: false },
    { icon: Target, labelKey: "qaProgram", color: "#FFC94D", screen: "program" as const, premium: false },
    { icon: Users, labelKey: "qaMentor", color: "#FFC94D", screen: "mentorship" as const, premium: false },
    { icon: Target, labelKey: "qaGoals", color: "#F59E0B", screen: "goals" as const, premium: false },
    { icon: Sparkles, labelKey: "qaAffirmations", color: "#FFD166", screen: "affirmations" as const, premium: false },
    { icon: Activity, labelKey: "qaWithdrawal", color: "#FFD166", screen: "withdrawal" as const, premium: false },
    { icon: ScanSearch, labelKey: "qaTriggers", color: "#FF6B6B", screen: "triggers" as const, premium: false },
    { icon: HeartPulse, labelKey: "qaRelapse", color: "#FF3B30", screen: "relapse-recovery" as const, premium: false },
    { icon: Bell, labelKey: "qaNotifications", color: "#FBBF24", screen: "notifications" as const, premium: false },
  ];

  return (
    <div className="min-h-screen pb-4">
      {/* Daily Check-In Modal */}
      <DailyCheckIn onDismiss={() => setCheckInDismissed(true)} />

      {/* Onboarding tutorial (first dashboard visit, after check-in dismissed) */}
      <TutorialTooltips startWhen={checkInDismissed} />

      {/* Achievement Unlock Popup */}
      <AchievementPopup />
      <MilestoneCelebration />
      <JourneyShareModal open={journeyOpen} onClose={() => setJourneyOpen(false)} data={journeyData} />

      {/* ================================================================ */}
      {/* QUITTR-STYLE HEADER — logo wordmark + streak pill + actions      */}
      {/* ================================================================ */}
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <button
          onClick={handleLogoTap}
          className="flex items-center gap-2.5 active:scale-95 transition-transform"
          aria-label="Zerobet"
        >
          <ZerobetLogo size={36} animated={false} />
          <span className="text-left font-[family-name:var(--font-poppins)] text-lg font-extrabold leading-none tracking-tight text-white">
            ZERO<span className="gradient-primary-text">BET</span>
          </span>
          <span
            className="ml-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white"
            style={{ background: planBadge.color }}
          >
            <planBadge.icon size={9} strokeWidth={3} />
          </span>
        </button>

        <div className="flex items-center gap-2">
          {/* Gold streak pill — QUITTR "7 days" badge */}
          <div
            className="flex h-8 items-center gap-1.5 rounded-full px-3"
            style={{
              background: "linear-gradient(135deg,#F59E0B,#FBBF24)",
              boxShadow: "0 4px 16px rgba(245,158,11,0.35)",
            }}
          >
            <Flame size={13} className="text-[#7C2D12]" fill="#7C2D12" />
            <span className="text-[12px] font-extrabold tabular-nums text-[#451A03]">
              {effectiveStreak}
              {t("homeBadgeDays")}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              haptics.light();
              setSearchOpen(true);
            }}
            className="glass-card btn-press flex h-9 w-9 items-center justify-center rounded-full transition-transform active:scale-95"
            aria-label={t("dashboardSearch")}
          >
            <Search size={16} className="text-white/70" />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              haptics.light();
              setNotifOpen(true);
            }}
            className="glass-card btn-press relative flex h-9 w-9 items-center justify-center rounded-full transition-transform active:scale-95"
            aria-label={t("dashboardNotifications")}
          >
            <Bell size={16} className="text-white/70" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full gradient-primary px-1"
              >
                <span className="text-[9px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </motion.span>
            )}
          </button>
        </div>
      </header>

      <PullToRefresh onRefresh={handleRefresh} isRefreshing={refreshing} hideDesktopButton>
        {/* -------------------------------------------------------------- */}
        {/* HERO — week strip, aurora orb, live sober clock                 */}
        {/* -------------------------------------------------------------- */}
        <section
          className="relative flex flex-col items-center px-5 pb-2"
          data-tutorial="streak"
        >
          {/* Ambient purple-violet glow behind the hero (QUITTR vibe) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-10 h-[420px]"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 32%, rgba(139,92,246,0.22) 0%, rgba(236,72,153,0.10) 45%, transparent 70%)",
            }}
          />

          <div className="relative w-full">
            <WeekStrip streak={effectiveStreak} checkedToday={checkedToday} />
          </div>

          {/* Aurora orb wrapped in the QUITTR "days clean" milestone ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.1 }}
            className="relative mt-4"
          >
            <ProgressRing
              progress={milestone.fraction}
              size={236}
              strokeWidth={7}
              ticks={ringTicks}
              delay={0.35}
              ariaLabel={`${t("homeMilestoneNext")} ${milestone.next} ${t("dashboardDays")}`}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sound.playSuccess();
                  haptics.light();
                }}
                className="relative outline-none"
                aria-label={t("homeStreakStable")}
              >
                <AuroraOrb size={172} />
              </motion.button>
            </ProgressRing>

            {/* Milestone pill — floats right under the ring */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="pointer-events-none absolute -bottom-2 left-1/2 z-10 -translate-x-1/2"
            >
              <span className="pr-milestone-pill whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFC94D] shadow-[0_0_6px_#FFC94D]" />
                {effectiveStreak >= 365 ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD166]">
                    {t("homeMilestoneMax")}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-white/80">
                    {t("homeMilestoneNext")}{" "}
                    <span className="font-extrabold text-[#FFC94D]">
                      {milestone.next}j{" \u00b7 "}
                      {t("homeMilestoneIn", { n: milestone.daysLeft })}
                    </span>
                  </span>
                )}
              </span>
            </motion.div>
          </motion.div>

          {/* Sober since label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 text-[13px] font-medium text-white/55"
          >
            {t("homeSoberSince")}
          </motion.p>

          {/* Big counter + live seconds pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-1 flex items-baseline justify-center gap-2"
          >
            <span className="font-[family-name:var(--font-poppins)] text-[56px] font-extrabold leading-none tracking-tight text-white">
              <AnimatedNumber value={effectiveStreak} duration={1200} />
            </span>
            <span className="text-xl font-semibold text-white/70">
              {effectiveStreak > 1 ? t("dashboardDays") : t("dashboardDay")}
            </span>
            <motion.span
              key={s}
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              className="ml-0.5 flex h-6 min-w-[34px] items-center justify-center rounded-lg border border-white/10 bg-white/10 px-1.5 text-[11px] font-bold tabular-nums text-white/90"
            >
              {s}s
            </motion.span>
          </motion.div>

          {/* Live h/m/s line */}
          <p className="mt-2 text-base font-medium tabular-nums text-white/60">
            {h}h {String(m).padStart(2, "0")}m {String(s).padStart(2, "0")}s
          </p>

          {/* ---------------------------------------------------------- */}
          {/* 4 circular quick actions — Pledge / Meditate / Reset / More */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex items-start justify-center gap-7"
          >
            {[
              {
                icon: Hand,
                labelKey: "homePledge",
                onClick: () => navigate("goals"),
              },
              {
                icon: Wind,
                labelKey: "homeMeditate",
                onClick: () => navigate("meditation"),
              },
              {
                icon: RotateCcw,
                labelKey: "homeReset",
                onClick: openRelapseModal,
              },
              {
                icon: MoreHorizontal,
                labelKey: "homeMore",
                onClick: () => navigate("journal"),
              },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.labelKey}
                  onClick={() => {
                    sound.playClick();
                    haptics.light();
                    action.onClick();
                  }}
                  className="group flex flex-col items-center gap-1.5 outline-none"
                >
                  <span className="glass-card-strong btn-press flex h-[52px] w-[52px] items-center justify-center rounded-full transition-all group-active:scale-90 group-hover:glow-blue">
                    <Icon size={21} className="text-white/85" strokeWidth={2.1} />
                  </span>
                  <span className="text-[10px] font-semibold text-white/55">
                    {t(action.labelKey)}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Brain rewiring progress + sober-on date */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 w-full"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-[family-name:var(--font-poppins)] text-sm font-bold gradient-primary-text">
                  {rewirePct}%
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/45">
                  {t("homeRewire")}
                </span>
              </div>
              {soberOnLabel && (
                <span className="text-[10px] font-medium text-white/40">
                  {t("homeSoberOn", { date: soberOnLabel })}
                </span>
              )}
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full gradient-primary"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(2, rewirePct)}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
              />
            </div>
          </motion.div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* PANIC BUTTON — QUITTR-style red pill                            */}
        {/* -------------------------------------------------------------- */}
        <div className="px-5" data-tutorial="panic">
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                "0 10px 34px rgba(225,29,72,0.42), inset 0 1px 0 rgba(255,255,255,0.18)",
                "0 10px 44px rgba(225,29,72,0.62), inset 0 1px 0 rgba(255,255,255,0.18)",
                "0 10px 34px rgba(225,29,72,0.42), inset 0 1px 0 rgba(255,255,255,0.18)",
              ],
            }}
            transition={{
              opacity: { delay: 0.55, duration: 0.4 },
              y: { delay: 0.55, duration: 0.4 },
              boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              sound.playClick();
              haptics.medium();
              navigate("panic");
            }}
            className="relative mt-4 flex w-full items-center justify-center gap-2.5 rounded-full py-3.5"
            style={{
              background: "linear-gradient(135deg, #E11D48 0%, #DC2626 100%)",
            }}
          >
            <Zap size={17} className="text-white" fill="white" />
            <span className="text-sm font-bold text-white">{t("homePanicCta")}</span>
          </motion.button>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* TODAY — stats, quote, insights, mood, challenge                 */}
        {/* -------------------------------------------------------------- */}
        <section className="mt-6 px-5">
          <h2 className="mb-3 text-sm font-semibold text-white">
            {t("homeTodaySection")}
          </h2>

          {/* Stats row */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("finance")}
              className="glass-card card-hover btn-press p-4 text-left"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFC94D]/20">
                  <Wallet size={18} className="text-[#FFC94D]" />
                </div>
                <TrendingUp size={14} className="text-[#FFC94D]" />
              </div>
              <p className="text-white/50 text-xs">{t("dashboardSaved")}</p>
              <p className="font-[family-name:var(--font-poppins)] text-xl font-bold text-white">
                <AnimatedNumber
                  value={totalSaved * currencyInfo.rateFromFCFA}
                  duration={1400}
                  decimals={currencyInfo.decimals}
                  prefix={currencyInfo.position === "before" ? currencyInfo.symbol : ""}
                  suffix={currencyInfo.position === "after" ? ` ${currencyInfo.symbol}` : ""}
                />
              </p>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("parcours")}
              className="glass-card card-hover btn-press p-4 text-left"
            >
              <div className="mb-2 flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: `${currentRank.color}30` }}
                >
                  <Award size={18} style={{ color: currentRank.color }} />
                </div>
                <Flame size={14} style={{ color: currentRank.color }} />
              </div>
              <p className="text-white/50 text-xs">{t("parcoursCurrentRank")}</p>
              <p className="font-[family-name:var(--font-poppins)] text-xl font-bold text-white">
                {t(currentRank.nameKey)}
              </p>
            </motion.button>
          </div>

          {/* Quote of the day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card card-hover relative mb-4 overflow-hidden p-4"
          >
            <div className="absolute -left-2 -top-4 font-serif text-6xl text-[#F59E0B]/20">"</div>
            <div className="relative flex items-start gap-3">
              <Quote size={16} className="mt-1 flex-shrink-0 text-[#F59E0B]" />
              <div>
                <p className="text-sm italic leading-relaxed text-white">{t(quote.textKey)}</p>
                <p className="mt-1.5 text-xs text-white/40">— {t(quote.authorKey)}</p>
              </div>
            </div>
          </motion.div>

          {/* AI-powered daily insight */}
          <DailyInsights />

          {/* Quick mood tracker */}
          <MoodTracker />

          {/* Daily Challenge Card — completable, +15 XP, streak tracking */}
          <DailyChallengeCard
            challenge={dailyChallenge}
            completedToday={challengeCompletedDate === new Date().toDateString()}
            justDone={challengeJustDone}
            streak={challengeStreak}
            t={t}
            onComplete={() => {
              completeDailyChallenge();
              setChallengeJustDone(true);
              haptics.success();
            }}
            onNavigate={(screen) => {
              const isLocked =
                screen !== "panic" &&
                screen !== "finance" &&
                screen !== "community" &&
                plan === "free";
              navigate(isLocked ? "paywall" : screen);
            }}
          />

          {/* Share journey */}
          <button
            onClick={() => {
              sound.playClick();
              haptics.light();
              setJourneyOpen(true);
            }}
            className="glass-card card-hover btn-press mb-4 flex w-full items-center gap-3 p-4 text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFB020]/20">
              <Share2 size={18} className="text-[#FFB020]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{t("journeyCardBtn")}</p>
              <p className="text-xs text-white/50">{t("journeyCardTagline")}</p>
            </div>
            <ChevronRight size={18} className="text-white/30" />
          </button>
        </section>

        {/* Quick actions */}
        <section className="mb-4 px-5" data-tutorial="quickActions">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">{t("dashboardQuickActions")}</h2>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-3"
          >
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              const isLocked = action.premium && plan === "free";
              const tutorialKey =
                action.screen === "atlas"
                  ? "atlas"
                  : action.screen === "community"
                    ? "community"
                    : undefined;
              return (
                <motion.button
                  key={action.screen}
                  variants={itemVariants}
                  custom={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    sound.playClick();
                    haptics.light();
                    if (isLocked) navigate("paywall");
                    else navigate(action.screen);
                  }}
                  style={{ "--tw-glow-color": action.color } as React.CSSProperties}
                  className="glass-card card-hover btn-press relative flex flex-col items-center p-3 text-center transition-shadow hover:shadow-[0_0_20px_-5px_var(--tw-glow-color)]"
                  data-tutorial={tutorialKey}
                >
                  {isLocked && (
                    <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FBBF24]">
                      <Crown size={9} className="text-[#0B0704]" />
                    </div>
                  )}
                  {!isLocked && action.premium && (
                    <Crown
                      size={12}
                      className="absolute right-1.5 top-1.5 text-[#FBBF24]"
                      style={{
                        filter: "drop-shadow(0 0 4px rgba(251,191,36,0.7))",
                      }}
                      fill="rgba(251,191,36,0.3)"
                    />
                  )}
                  <div
                    className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${action.color}33, ${action.color}11)`,
                    }}
                  >
                    <Icon size={18} style={{ color: action.color }} />
                  </div>
                  <span className="font-[family-name:var(--font-poppins)] text-xs font-medium text-white">
                    {t(action.labelKey)}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </section>

        {/* Recent badges preview */}
        <section className="mb-4 px-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">{t("dashboardBadges")}</h2>
            <button
              onClick={() => navigate("parcours")}
              className="flex items-center gap-1 text-xs text-white/50"
            >
              {t("dashboardSeeAll")} <ChevronRight size={12} />
            </button>
          </div>
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
            {PARCOURS_RANKS.slice(0, 8).map((rank) => {
              const isUnlocked = effectiveStreak >= rank.requiredDays;
              return (
                <button
                  key={rank.key}
                  onClick={() => navigate("parcours")}
                  className="flex flex-shrink-0 flex-col items-center gap-1"
                >
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${
                      isUnlocked ? "badge-aura" : "opacity-30 grayscale"
                    }`}
                    style={isUnlocked ? ({
                      background: rank.gradient,
                      "--aura-color": rank.glow,
                    } as React.CSSProperties) : { background: "rgba(255,255,255,0.05)" }}
                  >
                    {isUnlocked
                      ? <ArtifactIcon artifactKey={rank.key} size={32} glow={false} />
                      : <Lock size={20} className="text-white/30" />}
                  </div>
                  <span className={`text-[10px] ${isUnlocked ? "text-white" : "text-white/30"}`}>
                    {t("dayLabel")} {rank.requiredDays}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Heatmap calendar — year-long recovery journey */}
        <section className="px-5">
          <HeatmapCalendar weeks={18} />
        </section>

        {/* Reset streak (subtle) */}
        <button
          onClick={openRelapseModal}
          className="mt-4 w-full py-3 text-xs text-white/40 transition-colors hover:text-white/60"
        >
          {t("dashboardResetStreak")}
        </button>
      </PullToRefresh>

      {/* Relapse Recovery Modal */}
      <RelapseModal
        open={relapseOpen}
        onClose={() => setRelapseOpen(false)}
        previousStreak={relapsePrevStreak}
      />

      {/* Admin panel */}
      <AnimatePresence>
        {showAdmin && isAdmin && (
          <AdminPanel
            streak={effectiveStreak}
            setStreak={setStreak}
            plan={plan}
            setPlan={setPlan}
            addictionScore={addictionScore}
            onClose={() => setShowAdmin(false)}
            onAddJournal={() => {
              useStore.getState().addJournalEntry({
                content: "Test entry from admin panel",
                emotion: "calm",
                intensity: 3,
              });
            }}
            onSimulateMilestone={() => {
              const next = PARCOURS_RANKS.find((r) => r.requiredDays > effectiveStreak);
              if (next) setStreak(next.requiredDays);
            }}
          />
        )}
      </AnimatePresence>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}

function AdminPanel({
  streak, setStreak, plan, setPlan, addictionScore, onClose, onAddJournal, onSimulateMilestone,
}: {
  streak: number;
  setStreak: (n: number) => void;
  plan: string;
  setPlan: (p: "free" | "premium" | "mentor" | "psychologist") => void;
  addictionScore: number;
  onClose: () => void;
  onAddJournal: () => void;
  onSimulateMilestone: () => void;
}) {
  const [localStreak, setLocalStreak] = useState(streak);
  const { resetAll } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card-strong p-5 max-w-[430px] w-full rounded-t-3xl max-h-[85vh] overflow-y-auto custom-scroll safe-bottom"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SettingsIcon size={18} className="text-[#F59E0B]" />
            <h3 className="text-lg font-bold text-white">Panneau Admin</h3>
          </div>
          <button onClick={onClose} className="text-white/50 text-sm">Fermer</button>
        </div>

        <div className="space-y-4">
          {/* Streak */}
          <div>
            <label className="text-white/60 text-xs mb-2 block">Jours de série : <span className="text-white font-bold">{localStreak}</span></label>
            <input
              type="range"
              min="0"
              max="730"
              value={localStreak}
              onChange={(e) => setLocalStreak(Number(e.target.value))}
              onMouseUp={() => setStreak(localStreak)}
              onTouchEnd={() => setStreak(localStreak)}
              className="w-full accent-[#FF3B30]"
            />
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {[1, 7, 30, 60, 90, 180, 365].map((d) => (
                <button
                  key={d}
                  onClick={() => { setLocalStreak(d); setStreak(d); }}
                  className="px-2 py-1 rounded-lg glass-card text-white/70 text-xs"
                >
                  J{d}
                </button>
              ))}
            </div>
          </div>

          {/* Plan */}
          <div>
            <label className="text-white/60 text-xs mb-2 block">Plan</label>
            <div className="flex gap-2">
              {(["free", "premium", "mentor", "psychologist"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium ${
                    plan === p ? "gradient-primary text-white" : "glass-card text-white/60"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Score */}
          <div>
            <label className="text-white/60 text-xs mb-2 block">Score d'addiction : <span className="text-white font-bold">{addictionScore}/100</span></label>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onAddJournal}
              className="py-2.5 rounded-xl glass-card text-white text-xs"
            >
              + Entrée journal
            </button>
            <button
              onClick={onSimulateMilestone}
              className="py-2.5 rounded-xl glass-card text-white text-xs"
            >
              Simuler jalon
            </button>
          </div>

          <button
            onClick={() => {
              if (confirm("Réinitialiser TOUTES les données ?")) {
                resetAll();
                window.location.reload();
              }
            }}
            className="w-full py-3 rounded-xl bg-[#FF3B30]/20 text-[#FF3B30] text-sm font-medium border border-[#FF3B30]/30"
          >
            Réinitialiser toutes les données
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
