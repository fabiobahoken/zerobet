"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useStore } from "@/store/zerobet-store";
import { useCloudSync } from "@/hooks/useCloudSync";
import { useReminders } from "@/hooks/useReminders";
import { BottomNav } from "@/components/zerobet/components/BottomNav";
import { ErrorBoundary } from "@/components/zerobet/components/ErrorBoundary";
import { ScreenLoader } from "@/components/zerobet/components/ScreenLoader";

// Splash screen stays eagerly loaded — it's the very first thing users see
// and we don't want a flash of a loader before the splash paints.
import { SplashScreen } from "@/components/zerobet/screens/SplashScreen";

// ---------------------------------------------------------------------
// Dynamic (code-split) screen imports.
// Each screen becomes its own chunk and is fetched on demand.
// The ScreenLoader renders while the chunk downloads.
// ---------------------------------------------------------------------
const GenderScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/GenderScreen").then((m) => ({
      default: m.GenderScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const LanguageScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/LanguageScreen").then((m) => ({
      default: m.LanguageScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const CurrencyScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/CurrencyScreen").then((m) => ({
      default: m.CurrencyScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const WelcomeScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/WelcomeScreen").then((m) => ({
      default: m.WelcomeScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const QuizScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/QuizScreen").then((m) => ({
      default: m.QuizScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const ResultsScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/ResultsScreen").then((m) => ({
      default: m.ResultsScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const SymptomsScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/SymptomsScreen").then((m) => ({
      default: m.SymptomsScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const CarouselScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/CarouselScreen").then((m) => ({
      default: m.CarouselScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const EngagementScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/EngagementScreen").then((m) => ({
      default: m.EngagementScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const PaywallScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/PaywallScreen").then((m) => ({
      default: m.PaywallScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const DashboardScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/DashboardScreen").then((m) => ({
      default: m.DashboardScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const PanicScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/PanicScreen").then((m) => ({
      default: m.PanicScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const JournalScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/JournalScreen").then((m) => ({
      default: m.JournalScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const FinanceScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/FinanceScreen").then((m) => ({
      default: m.FinanceScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const AtlasScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/AtlasScreen").then((m) => ({
      default: m.AtlasScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const BlockerScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/BlockerScreen").then((m) => ({
      default: m.BlockerScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const CommunityScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/CommunityScreen").then((m) => ({
      default: m.CommunityScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const ParcoursScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/ParcoursScreen").then((m) => ({
      default: m.ParcoursScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const SettingsScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/SettingsScreen").then((m) => ({
      default: m.SettingsScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const SubscriptionScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/SubscriptionScreen").then((m) => ({
      default: m.SubscriptionScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const ParcoursEvolutionScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/ParcoursEvolutionScreen").then((m) => ({
      default: m.ParcoursEvolutionScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const StatsScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/StatsScreen").then((m) => ({
      default: m.StatsScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const ResourcesScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/ResourcesScreen").then((m) => ({
      default: m.ResourcesScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const SOSScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/SOSScreen").then((m) => ({
      default: m.SOSScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const MeditationScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/MeditationScreen").then((m) => ({
      default: m.MeditationScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const GamificationScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/GamificationScreen").then((m) => ({
      default: m.GamificationScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const AchievementsScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/AchievementsScreen").then((m) => ({
      default: m.AchievementsScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const ProfileScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/ProfileScreen").then((m) => ({
      default: m.ProfileScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const CalendarScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/CalendarScreen").then((m) => ({
      default: m.CalendarScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const SupportScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/SupportScreen").then((m) => ({
      default: m.SupportScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const ProgramScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/ProgramScreen").then((m) => ({
      default: m.ProgramScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const MentorshipScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/MentorshipScreen").then((m) => ({
      default: m.MentorshipScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const WithdrawalScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/WithdrawalScreen").then((m) => ({
      default: m.WithdrawalScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const GoalsScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/GoalsScreen").then((m) => ({
      default: m.GoalsScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const TriggersScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/TriggersScreen").then((m) => ({
      default: m.TriggersScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const RelapseRecoveryScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/RelapseRecoveryScreen").then((m) => ({
      default: m.RelapseRecoveryScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const AffirmationsScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/AffirmationsScreen").then((m) => ({
      default: m.AffirmationsScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const NotificationSettingsScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/NotificationSettingsScreen").then((m) => ({
      default: m.NotificationSettingsScreen,
    })),
  { loading: () => <ScreenLoader /> }
);
const CommunityChatScreen = dynamic(
  () =>
    import("@/components/zerobet/screens/CommunityChatScreen").then((m) => ({
      default: m.CommunityChatScreen,
    })),
  { loading: () => <ScreenLoader /> }
);

export default function Home() {
  const {
    currentScreen,
    hasCompletedOnboarding,
    navigate,
    incrementStreak,
    lastQuestReset,
    resetDailyQuests,
    streakDays,
    dailyQuests,
    completeQuest,
  } = useStore();

  // Zerobet 2.0 — anonymous cloud backup of core recovery progress
  // (auto-syncs on streak/check-in/journal/XP changes; status lives in the store)
  useCloudSync();

  // Zerobet 2.0.6 — smart local reminders (check-in, craving hours, quote, weekly)
  useReminders();

  // Auto-increment streak once per day when app opens (after onboarding)
  useEffect(() => {
    if (hasCompletedOnboarding) {
      incrementStreak();
    }
  }, [hasCompletedOnboarding, incrementStreak]);

  // Auto-reset daily quests when a new day begins
  useEffect(() => {
    if (!hasCompletedOnboarding) return;
    const today = new Date().toDateString();
    if (lastQuestReset !== today && lastQuestReset !== null) {
      resetDailyQuests();
    }
  }, [hasCompletedOnboarding, lastQuestReset, resetDailyQuests]);

  // Auto-complete the "streak" daily quest once a streak is active today
  useEffect(() => {
    if (!hasCompletedOnboarding) return;
    if (streakDays >= 1 && !dailyQuests.streak) {
      completeQuest("streak");
    }
  }, [hasCompletedOnboarding, streakDays, dailyQuests.streak, completeQuest]);

  // Scroll to top on screen change
  useEffect(() => {
    const container = document.querySelector(".app-container");
    if (container) container.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash": return <SplashScreen />;
      case "gender": return <GenderScreen />;
      case "language": return <LanguageScreen />;
      case "currency": return <CurrencyScreen />;
      case "welcome": return <WelcomeScreen />;
      case "quiz": return <QuizScreen />;
      case "results": return <ResultsScreen />;
      case "symptoms": return <SymptomsScreen />;
      case "carousel": return <CarouselScreen />;
      case "engagement": return <EngagementScreen />;
      case "paywall": return <PaywallScreen />;
      case "dashboard": return <DashboardScreen />;
      case "panic": return <PanicScreen />;
      case "journal": return <JournalScreen />;
      case "finance": return <FinanceScreen />;
      case "atlas": return <AtlasScreen />;
      case "blocker": return <BlockerScreen />;
      case "community": return <CommunityScreen />;
      case "parcours": return <ParcoursScreen />;
      case "settings": return <SettingsScreen />;
      case "subscription": return <SubscriptionScreen />;
      case "parcours-evolution": return <ParcoursEvolutionScreen />;
      case "stats": return <StatsScreen />;
      case "resources": return <ResourcesScreen />;
      case "sos": return <SOSScreen />;
      case "meditation": return <MeditationScreen />;
      case "gamification": return <GamificationScreen />;
      case "achievements": return <AchievementsScreen />;
      case "profile": return <ProfileScreen />;
      case "calendar": return <CalendarScreen />;
      case "support": return <SupportScreen />;
      case "program": return <ProgramScreen />;
      case "mentorship": return <MentorshipScreen />;
      case "withdrawal": return <WithdrawalScreen />;
      case "goals": return <GoalsScreen />;
      case "triggers": return <TriggersScreen />;
      case "relapse-recovery": return <RelapseRecoveryScreen />;
      case "affirmations": return <AffirmationsScreen />;
      case "notifications": return <NotificationSettingsScreen />;
      case "community-chat": return <CommunityChatScreen />;
      default: return <SplashScreen />;
    }
  };

  return (
    <ErrorBoundary>
      <main className="app-container relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
        <BottomNav />
        <div className="h-24" aria-hidden />
      </main>
    </ErrorBoundary>
  );
}
