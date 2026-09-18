"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, BookOpen, Wallet, Bot, Shield, Users, Flame, TrendingUp,
  Crown, ChevronRight, Quote, Award, Settings as SettingsIcon, Bell,
  Target, Sparkles, Phone, BarChart3, Wind, Search, Trophy, User, Gamepad2,
  Calendar, HelpCircle, Activity, ScanSearch, HeartPulse,
  MessageCircle, Lock, CheckCircle2, ArrowRight,
} from "lucide-react";
import { useStore } from "@/store/zerobet-store";
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
import { StreakFlame } from "@/components/zerobet/components/StreakFlame";
import { HeatmapCalendar } from "@/components/zerobet/components/HeatmapCalendar";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { getDailyQuote } from "@/lib/data/community-data";
import { getCurrentRank, getNextRank, PARCOURS_RANKS } from "@/lib/data/parcours-data";
import { PLAN_OPTIONS } from "@/lib/data/app-data";
import { getCurrency } from "@/lib/data/currency-data";
import {
  containerVariants,
  itemVariants,
} from "@/lib/animations";
import { useT } from "@/lib/i18n/useT";
import { ArtifactIcon } from "@/components/zerobet/components/ArtifactIcon";

const PLAN_BADGES: Record<string, { labelKey: string; color: string; icon: string }> = {
  free: { labelKey: "planFree", color: "#9CA3AF", icon: "🌱" },
  premium: { labelKey: "planPremium", color: "#10B981", icon: "⭐" },
  mentor: { labelKey: "planMentor", color: "#4ADE80", icon: "🛡️" },
  psychologist: { labelKey: "planPsychologist", color: "#BF5AF2", icon: "🎓" },
};

function getMotivationalMessage(t: (k: string) => string, streak: number): string {
  if (streak === 0) return t("motiv0");
  if (streak <= 3) return t("motiv3");
  if (streak <= 7) return t("motiv7");
  if (streak <= 30) return t("motiv30");
  if (streak <= 90) return t("motiv90");
  return t("motiv90plus");
}

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

export function DashboardScreen() {
  const {
    streakDays, weeklyBetAmount, addictionScore, plan, name, gender,
    navigate, setStreak, resetStreak, adminStreakOverride, isAdmin, setIsAdmin,
    unlockedRanks, unlockRank, setPlan, notifications,
    lastCheckInDate, currency,
    completeDailyChallenge, challengeCompletedDate, challengeStreak,
  } = useStore();
  const t = useT();
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

  // Notification panel state
  const [notifOpen, setNotifOpen] = useState(false);
  // Global search modal state
  const [searchOpen, setSearchOpen] = useState(false);

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
  const nextRankProgress = nextRank
    ? Math.min(100, ((effectiveStreak - currentRank.requiredDays) / (nextRank.requiredDays - currentRank.requiredDays)) * 100)
    : 100;

  const motivationalMessage = getMotivationalMessage(t, effectiveStreak);
  const displayName = name || "champion";

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate a brief data refresh (no remote source). The component
    // itself controls the spinner duration via the isRefreshing prop.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setRefreshing(false);
  };

  const quickActions = [
    { icon: Zap, labelKey: "qaPanic", color: "#FF3B30", screen: "panic" as const, premium: false },
    { icon: Gamepad2, labelKey: "qaQuests", color: "#FBBF24", screen: "gamification" as const, premium: false },
    { icon: BookOpen, labelKey: "qaJournal", color: "#64D2FF", screen: "journal" as const, premium: false },
    { icon: Wallet, labelKey: "qaSavings", color: "#4ADE80", screen: "finance" as const, premium: false },
    { icon: BarChart3, labelKey: "qaStats", color: "#64D2FF", screen: "stats" as const, premium: false },
    { icon: Wind, labelKey: "qaMeditation", color: "#64D2FF", screen: "meditation" as const, premium: false },
    { icon: Bot, labelKey: "qaAtlas", color: "#BF5AF2", screen: "atlas" as const, premium: false },
    { icon: Shield, labelKey: "qaBlocker", color: "#FBBF24", screen: "blocker" as const, premium: true },
    { icon: Users, labelKey: "qaCommunity", color: "#FF9500", screen: "community" as const, premium: false },
    { icon: MessageCircle, labelKey: "qaChat", color: "#4ADE80", screen: "community-chat" as const, premium: false },
    { icon: Trophy, labelKey: "qaTrophies", color: "#FBBF24", screen: "achievements" as const, premium: false },
    { icon: BookOpen, labelKey: "qaResources", color: "#BF5AF2", screen: "resources" as const, premium: false },
    { icon: User, labelKey: "qaProfile", color: "#BF5AF2", screen: "profile" as const, premium: false },
    { icon: Phone, labelKey: "qaSOS", color: "#FF3B30", screen: "sos" as const, premium: false },
    { icon: Calendar, labelKey: "qaCalendar", color: "#FF9500", screen: "calendar" as const, premium: false },
    { icon: HelpCircle, labelKey: "qaHelp", color: "#64D2FF", screen: "support" as const, premium: false },
    { icon: Target, labelKey: "qaProgram", color: "#4ADE80", screen: "program" as const, premium: false },
    { icon: Users, labelKey: "qaMentor", color: "#4ADE80", screen: "mentorship" as const, premium: false },
    { icon: Target, labelKey: "qaGoals", color: "#FF9500", screen: "goals" as const, premium: false },
    { icon: Sparkles, labelKey: "qaAffirmations", color: "#BF5AF2", screen: "affirmations" as const, premium: false },
    { icon: Activity, labelKey: "qaWithdrawal", color: "#BF5AF2", screen: "withdrawal" as const, premium: false },
    { icon: ScanSearch, labelKey: "qaTriggers", color: "#FF6B6B", screen: "triggers" as const, premium: false },
    { icon: HeartPulse, labelKey: "qaRelapse", color: "#FF3B30", screen: "relapse-recovery" as const, premium: false },
    { icon: Bell, labelKey: "qaNotifications", color: "#FBBF24", screen: "notifications" as const, premium: false },
  ];

  return (
    <div className="min-h-screen px-5 pt-12 pb-4">
      {/* Daily Check-In Modal */}
      <DailyCheckIn onDismiss={() => setCheckInDismissed(true)} />

      {/* Onboarding tutorial (first dashboard visit, after check-in dismissed) */}
      <TutorialTooltips startWhen={checkInDismissed} />

      {/* Achievement Unlock Popup */}
      <AchievementPopup />
      <MilestoneCelebration />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={handleLogoTap} className="flex items-center gap-3 active:scale-95">
          <ZerobetLogo size={40} animated={false} />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight">
                Zerobet
              </h1>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1"
                style={{ background: planBadge.color }}
              >
                {planBadge.icon} {t(planBadge.labelKey)}
              </span>
            </div>
            <p className="text-white/50 text-xs">
              {t("dashboardHello")}{name ? `, ${name}` : ""} 👋
            </p>
          </div>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              haptics.light();
              setSearchOpen(true);
            }}
            className="w-10 h-10 rounded-full glass-card btn-press flex items-center justify-center active:scale-95 transition-transform"
            aria-label={t("dashboardSearch")}
          >
            <Search size={18} className="text-white/70" />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              haptics.light();
              setNotifOpen(true);
            }}
            className="relative w-10 h-10 rounded-full glass-card btn-press flex items-center justify-center active:scale-95 transition-transform"
            aria-label={t("dashboardNotifications")}
          >
            <Bell size={18} className="text-white/70" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full gradient-primary flex items-center justify-center px-1"
              >
                <span className="text-[10px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </motion.span>
            )}
          </button>
        </div>
      </div>

      <PullToRefresh onRefresh={handleRefresh} isRefreshing={refreshing}>
      {/* Motivational Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl mb-4 p-5"
        style={{
          background: "linear-gradient(135deg, rgba(255,59,48,0.25) 0%, rgba(255,149,0,0.2) 50%, rgba(191,90,242,0.15) 100%)",
        }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-60">
          <motion.div
            animate={{
              background: [
                "linear-gradient(135deg, rgba(255,59,48,0.3) 0%, rgba(255,149,0,0.15) 50%, rgba(74,222,128,0.1) 100%)",
                "linear-gradient(135deg, rgba(74,222,128,0.2) 0%, rgba(255,149,0,0.25) 50%, rgba(255,59,48,0.15) 100%)",
                "linear-gradient(135deg, rgba(255,59,48,0.3) 0%, rgba(255,149,0,0.15) 50%, rgba(74,222,128,0.1) 100%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          />
        </div>

        {/* Decorative blurs */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#FF3B30]/20 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#FF9500]/15 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div className="flex-1 pr-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles size={14} className="text-[#FBBF24]" />
              <span className="text-white/60 text-[11px] font-medium uppercase tracking-wider">
                {t("dashboardMotivation")}
              </span>
            </div>
            <h2 className="text-white font-bold text-base leading-snug mb-1.5 font-[family-name:var(--font-poppins)]">
              {gender === "female" ? t("dashboardDearFemale") : t("dashboardDearMale")}
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              {motivationalMessage}
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl"
            >
              {effectiveStreak === 0
                ? "🌅"
                : effectiveStreak <= 7
                  ? "💪"
                  : effectiveStreak <= 30
                    ? "🔥"
                    : effectiveStreak <= 90
                      ? "🧠"
                      : "🌟"}
            </motion.div>
            <span className="text-white/40 text-[10px] mt-1.5 font-medium">
              {t("dashboardDay")}{effectiveStreak}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Streak hero card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong glass-shimmer premium-shimmer mesh-bg-aurora p-6 mb-4 relative overflow-hidden"
        data-tutorial="streak"
      >
        {/* Decorative glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#FF3B30]/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#FF9500]/15 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs mb-1">{t("dashboardYouAt")}</p>
            <div className="flex items-baseline gap-2">
              <motion.span
                key={effectiveStreak}
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-extrabold gradient-primary-text font-[family-name:var(--font-poppins)]"
              >
                <AnimatedNumber value={effectiveStreak} duration={1200} />
              </motion.span>
              <span className="text-white/60 text-lg font-medium">
                {effectiveStreak > 1 ? t("dashboardDays") : t("dashboardDay")}
              </span>
            </div>
            <p className="text-white/50 text-xs mt-1">{t("dashboardWithoutBetting")}</p>
          </div>
          <StreakFlame days={effectiveStreak} size="lg" showNumber={false} />
        </div>

        {/* Next rank progress */}
        {nextRank && (
          <div className="relative mt-4">
            <div className="flex justify-between text-xs text-white/60 mb-1.5">
              <span>{t(currentRank.nameKey)}</span>
              <span>{t("dayLabel")} {nextRank.requiredDays}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ background: currentRank.gradient }}
                initial={{ width: 0 }}
                animate={{ width: `${nextRankProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="text-white/40 text-xs mt-1.5 text-center">
              {t("dashboardDaysToRank", { days: nextRank.requiredDays - effectiveStreak, rank: t(nextRank.nameKey) })}
            </p>
          </div>
        )}
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("finance")}
          className="glass-card card-hover btn-press p-4 text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#4ADE80]/20 flex items-center justify-center">
              <Wallet size={18} className="text-[#4ADE80]" />
            </div>
            <TrendingUp size={14} className="text-[#4ADE80]" />
          </div>
          <p className="text-white/50 text-xs">{t("dashboardSaved")}</p>
          <p className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
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
          <div className="flex items-center justify-between mb-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${currentRank.color}30` }}
            >
              <Award size={18} style={{ color: currentRank.color }} />
            </div>
            <Flame size={14} style={{ color: currentRank.color }} />
          </div>
          <p className="text-white/50 text-xs">{t("parcoursCurrentRank")}</p>
          <p className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
            {t(currentRank.nameKey)}
          </p>
        </motion.button>
      </div>

      {/* Quote of the day */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card card-hover p-4 mb-4 relative overflow-hidden"
      >
        <div className="absolute -top-4 -left-2 text-6xl text-[#FF9500]/20 font-serif">"</div>
        <div className="relative flex items-start gap-3">
          <Quote size={16} className="text-[#FF9500] mt-1 flex-shrink-0" />
          <div>
            <p className="text-white text-sm leading-relaxed italic">{t(quote.textKey)}</p>
            <p className="text-white/40 text-xs mt-1.5">— {t(quote.authorKey)}</p>
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

      {/* Quick actions */}
      <div className="mb-4" data-tutorial="quickActions">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-sm">{t("dashboardQuickActions")}</h2>
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
                className="glass-card card-hover btn-press p-3 flex flex-col items-center text-center relative hover:shadow-[0_0_20px_-5px_var(--tw-glow-color)] transition-shadow"
                data-tutorial={tutorialKey}
              >
                {isLocked && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#FBBF24] flex items-center justify-center">
                    <Crown size={9} className="text-[#070B0E]" />
                  </div>
                )}
                {!isLocked && action.premium && (
                  <Crown
                    size={12}
                    className="absolute top-1.5 right-1.5 text-[#FBBF24]"
                    style={{
                      filter: "drop-shadow(0 0 4px rgba(251,191,36,0.7))",
                    }}
                    fill="rgba(251,191,36,0.3)"
                  />
                )}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-1.5"
                  style={{
                    background: `linear-gradient(135deg, ${action.color}33, ${action.color}11)`,
                  }}
                >
                  <Icon size={18} style={{ color: action.color }} />
                </div>
                <span className="text-white text-xs font-medium font-[family-name:var(--font-poppins)]">
                  {t(action.labelKey)}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Panic button - prominent */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          sound.playClick();
          haptics.medium();
          navigate("panic");
        }}
        data-tutorial="panic"
        className="w-full glass-card-strong btn-press p-5 mb-4 flex items-center gap-4 border-2 border-[#FF3B30]/30 pulse-glow"
      >
        <div className="relative">
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center">
            <Zap size={26} className="text-white" fill="white" />
          </div>
          <div className="absolute inset-0 rounded-full gradient-primary animate-ping opacity-30" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-white font-bold text-base">{t("dashboardPanicButton")}</h3>
          <p className="text-white/60 text-xs">{t("dashboardPanicDesc")}</p>
        </div>
        <ChevronRight size={20} className="text-white/40" />
      </motion.button>

      {/* Recent badges preview */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-sm">{t("dashboardBadges")}</h2>
          <button
            onClick={() => navigate("parcours")}
            className="text-white/50 text-xs flex items-center gap-1"
          >
            {t("dashboardViewAll")} <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {PARCOURS_RANKS.slice(0, 8).map((rank) => {
            const isUnlocked = effectiveStreak >= rank.requiredDays;
            return (
              <button
                key={rank.key}
                onClick={() => navigate("parcours")}
                className="flex-shrink-0 flex flex-col items-center gap-1"
              >
                <div
                  className={`relative w-14 h-14 rounded-2xl flex items-center justify-center ${
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
      </div>

      {/* Heatmap calendar — year-long recovery journey (Task 13-b) */}
      <HeatmapCalendar weeks={18} />

      {/* Reset streak (subtle) */}
      <button
        onClick={() => {
          setRelapsePrevStreak(effectiveStreak);
          setRelapseOpen(true);
        }}
        className="w-full py-3 text-white/40 text-xs hover:text-white/60 transition-colors"
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
            <SettingsIcon size={18} className="text-[#FF9500]" />
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
