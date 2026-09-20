"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Language } from "@/lib/i18n/dictionary";
import type { CurrencyCode } from "@/lib/data/currency-data";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { PROTOCOL_STEPS } from "@/lib/data/relapse-data";

export type ScreenName =
  | "splash"
  | "gender"
  | "language"
  | "currency"
  | "welcome"
  | "quiz"
  | "results"
  | "symptoms"
  | "carousel"
  | "engagement"
  | "paywall"
  | "dashboard"
  | "panic"
  | "journal"
  | "finance"
  | "atlas"
  | "blocker"
  | "community"
  | "parcours"
  | "settings"
  | "parcours-evolution"
  | "stats"
  | "resources"
  | "sos"
  | "meditation"
  | "achievements"
  | "profile"
  | "gamification"
  | "calendar"
  | "support"
  | "program"
  | "mentorship"
  | "withdrawal"
  | "triggers"
  | "goals"
  | "relapse-recovery"
  | "affirmations"
  | "notifications"
  | "community-chat" // Task 13-a — live community chat
  | "subscription" // Zerobet 2.0.5 — manage subscription + payment history
  | "data-rights"; // Zerobet 2.0.9 — GDPR hub: inventory, export, erasure

// Community chat — real-time room messages (Task 13-a)
// NOTE: existing `chatMessages`/`addChatMessage` are for the Atlas AI coach
// (1-on-1 chat). To avoid a type clash we use `chatRoomMessages` here.
export interface ChatRoomMessage {
  id: string;
  nickname: string;
  content: string;
  timestamp: string;
  color: string;
  type: "user" | "system";
  room: string;
}

// Appearance / notification / privacy / sound preferences (Task 9-a)
export type ThemeMode = "dark" | "auto";
export interface NotificationPrefs {
  streak: boolean;
  motivation: boolean;
  milestones: boolean;
  checkin: boolean;
  weekly: boolean;
}

// Notification preferences (Task 13-c) — richer per-channel preferences
// for the new NotificationSettingsScreen + PWA push notifications.
export interface NotificationPreferences {
  dailyReminder: boolean;
  dailyReminderTime: string; // "07:00"
  cravingCheckin: boolean; // check if user is ok during typical craving hours
  milestoneAlerts: boolean;
  communityActivity: boolean;
  weeklyReport: boolean;
  motivationalQuotes: boolean;
  silentHours: boolean;
  silentHoursStart: string; // "22:00"
  silentHoursEnd: string; // "07:00"
}

export interface DailyQuest {
  checkin: boolean;
  journal: boolean;
  meditation: boolean;
  streak: boolean;
  article: boolean;
}

export interface XPHistoryEntry {
  id: string;
  amount: number;
  source: string;
  timestamp: string;
}

export type LevelTier = "Novice" | "Apprenti" | "Guerrier" | "Champion" | "Légende";

export interface LevelInfo {
  level: number;
  tier: LevelTier;
  minXP: number;
  maxXP: number;
  progress: number;
}

export const QUEST_REWARDS: Record<keyof DailyQuest, number> = {
  checkin: 50,
  journal: 30,
  meditation: 40,
  streak: 100,
  article: 20,
};

export const QUEST_LABELS: Record<keyof DailyQuest, string> = {
  checkin: "Check-in",
  journal: "Journal",
  meditation: "Méditation",
  streak: "Sans pari",
  article: "Article",
};

/** XP granted when the user marks the dashboard Daily Challenge as done. */
export const DAILY_CHALLENGE_XP = 15;

export function getStreakMultiplier(streakDays: number): number {
  if (streakDays >= 90) return 3.0;
  if (streakDays >= 30) return 2.0;
  if (streakDays >= 14) return 1.5;
  if (streakDays >= 7) return 1.2;
  return 1.0;
}

export function getMultiplierTier(streakDays: number): {
  multiplier: number;
  label: string;
  min: number;
  max: number;
  color: string;
} {
  if (streakDays >= 90)
    return { multiplier: 3.0, label: "Triple XP", min: 90, max: Infinity, color: "#FFD166" };
  if (streakDays >= 30)
    return { multiplier: 2.0, label: "Double XP", min: 30, max: 90, color: "#F59E0B" };
  if (streakDays >= 14)
    return { multiplier: 1.5, label: "+50% XP", min: 14, max: 30, color: "#FBBF24" };
  if (streakDays >= 7)
    return { multiplier: 1.2, label: "+20% XP", min: 7, max: 14, color: "#FFC94D" };
  return { multiplier: 1.0, label: "XP normal", min: 0, max: 7, color: "#9CA3AF" };
}

export function computeLevel(xp: number): LevelInfo {
  if (xp >= 8000) {
    const extraLevels = Math.floor((xp - 8000) / 1000);
    const level = 31 + extraLevels;
    const minXP = 8000 + extraLevels * 1000;
    const maxXP = minXP + 1000;
    return {
      level,
      tier: "Légende",
      minXP,
      maxXP,
      progress: ((xp - minXP) / (maxXP - minXP)) * 100,
    };
  }
  if (xp >= 4000) {
    const level = 21 + Math.floor((xp - 4000) / 400);
    const minXP = 4000 + (level - 21) * 400;
    const maxXP = minXP + 400;
    return {
      level,
      tier: "Champion",
      minXP,
      maxXP,
      progress: ((xp - minXP) / (maxXP - minXP)) * 100,
    };
  }
  if (xp >= 1500) {
    const level = 11 + Math.floor((xp - 1500) / 250);
    const minXP = 1500 + (level - 11) * 250;
    const maxXP = minXP + 250;
    return {
      level,
      tier: "Guerrier",
      minXP,
      maxXP,
      progress: ((xp - minXP) / (maxXP - minXP)) * 100,
    };
  }
  if (xp >= 500) {
    const level = 6 + Math.floor((xp - 500) / 200);
    const minXP = 500 + (level - 6) * 200;
    const maxXP = minXP + 200;
    return {
      level,
      tier: "Apprenti",
      minXP,
      maxXP,
      progress: ((xp - minXP) / (maxXP - minXP)) * 100,
    };
  }
  const level = 1 + Math.floor(xp / 100);
  const minXP = (level - 1) * 100;
  const maxXP = level * 100;
  return {
    level,
    tier: "Novice",
    minXP,
    maxXP,
    progress: ((xp - minXP) / (maxXP - minXP)) * 100,
  };
}

export type Gender = "male" | "female" | null;
export type Plan = "free" | "premium" | "mentor" | "psychologist";
export type AddictionLevel = "faible" | "modere" | "severe" | "critique";
export type Emotion = "frustrated" | "strong" | "tempted" | "calm" | "proud" | "anxious";

/**
 * Zerobet 2.1.0 — Exit survey captured after a voluntary downgrade.
 * reason: dictionary key suffix (surveyPrice | surveyUnused | surveyBreak |
 * surveyTechnical | surveyOther). comment: optional free text (≤200 chars).
 */
export interface DowngradeSurvey {
  reason: string;
  comment: string | null;
  at: string;
}

export interface JournalEntry {
  id: string;
  content: string;
  emotion: Emotion;
  trigger?: string;
  intensity: number;
  createdAt: string;
}

export interface PanicEvent {
  id: string;
  trigger?: string;
  intensity: number;
  resolved: boolean;
  method?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  section?: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorStreak: number;
  category: "success" | "struggle" | "motivation" | "question";
  title: string;
  content: string;
  likes: number;
  replies: ForumReply[];
  liked?: boolean;
  createdAt: string;
}

export interface ForumReply {
  id: string;
  authorName: string;
  isMentor?: boolean;
  isPsychologist?: boolean;
  content: string;
  likes: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorAge?: number;
  authorCountry?: string;
  streakDays: number;
  title: string;
  content: string;
  isVerified: boolean;
  isAnonymous: boolean;
  isMine?: boolean;
  likes: number;
  liked?: boolean;
  replies: ForumReply[];
  createdAt: string;
}

export interface Notification {
  id: string;
  type: "streak" | "motivation" | "milestone" | "weekly" | "checkin";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface BlockedSite {
  id: string;
  url: string;
  name: string;
  category: "international" | "africa" | "crypto" | "france" | "other";
  blocked: boolean;
}

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  deadline?: string;
}

export type TriggerCategory =
  | "stress"
  | "solitude"
  | "payday"
  | "alcohol"
  | "boredom"
  | "social"
  | "insomnia"
  | "anger"
  | "ads"
  | "other";

export interface Trigger {
  id: string;
  category: TriggerCategory;
  intensity: number; // 1..5
  situation: string; // free text description
  copingMethod: string; // one of the coping methods
  resisted: boolean; // did the user resist the urge?
  createdAt: string; // ISO date
}

// Life goals (Task 11-b)
export type LifeGoalCategory =
  | "health"
  | "finance"
  | "relationship"
  | "career"
  | "personal"
  | "spiritual";

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface LifeGoal {
  id: string;
  title: string;
  description?: string;
  category: LifeGoalCategory;
  targetDate: string; // ISO date
  progress: number; // 0..100
  milestones: Milestone[];
  createdAt: string;
}

// Relapse recovery (Task 12-c)
export interface RelapseEvent {
  id: string;
  timestamp: string; // ISO date
  trigger?: string; // what triggered it
  amountLost?: number; // FCFA lost
  emotion: Emotion; // how they feel after
  reflection?: string; // what they learned
  protocolCompleted: boolean; // did they finish the 24h protocol
}

export interface RelapseProtocolStep {
  id: string;
  phase: "immediate" | "hour1" | "hour6" | "hour24";
  titleKey: string;
  descKey: string;
  actionKey: string; // what to do
  duration: string; // e.g., "5 min"
  completed: boolean;
  completedAt?: string;
}

// Streak history (Task 13-b) — daily record for the heatmap calendar
export interface StreakDay {
  date: string; // ISO date "YYYY-MM-DD"
  clean: boolean; // true = no gambling that day
  intensity: number; // 0-3, how "strong" the day was (0=relapse, 1=hard, 2=okay, 3=great)
}

// Affirmations (Task 12-b)
export type AffirmationCategory =
  | "morning"
  | "crisis"
  | "self-worth"
  | "future"
  | "gratitude"
  | "strength";

export interface Affirmation {
  id: string;
  textKey: string;
  category: AffirmationCategory;
  isCustom: boolean; // true if user-created
  author?: string; // optional attribution
}

interface AppState {
  // Navigation
  currentScreen: ScreenName;
  previousScreens: ScreenName[];
  navigate: (screen: ScreenName) => void;
  goBack: () => void;
  resetToOnboarding: () => void;

  // Onboarding state
  hasStartedOnboarding: boolean;
  hasCompletedOnboarding: boolean;
  setStartedOnboarding: (v: boolean) => void;
  setCompletedOnboarding: (v: boolean) => void;

  // User profile
  gender: Gender;
  setGender: (g: Gender) => void;

  language: Language;
  setLanguage: (l: Language) => void;

  name: string;
  setName: (n: string) => void;

  // Avatar color (for profile customization)
  avatarColor: string;
  setAvatarColor: (color: string) => void;

  // Profile photo (base64 data URL, null = use initials avatar)
  profilePhoto: string | null;
  setProfilePhoto: (photo: string | null) => void;

  // Articles read counter (for Érudit achievement)
  articlesRead: number;
  incrementArticlesRead: () => void;

  // Quiz
  quizAnswers: number[]; // index of selected option per question
  quizCurrentIndex: number;
  setQuizAnswer: (qIndex: number, aIndex: number) => void;
  setQuizCurrentIndex: (i: number) => void;
  addictionScore: number;
  addictionLevel: AddictionLevel;
  setAddictionResult: (score: number, level: AddictionLevel) => void;

  // Symptoms
  selectedSymptoms: Record<string, string[]>;
  toggleSymptom: (category: string, symptom: string) => void;

  // Engagement
  selectedGoals: string[];
  toggleGoal: (goal: string) => void;
  signatureData: string | null;
  setSignature: (data: string | null) => void;

  // Plan
  plan: Plan;
  setPlan: (p: Plan) => void;
  /** Billing cycle of the ACTIVE paid plan ("monthly" | "annual"). */
  planBillingCycle: "monthly" | "annual";
  /** ISO date of the moment the current paid plan was activated (null = free). */
  planStartedAt: string | null;
  /** ISO renewal date confirmed by the SERVER (webhook/gateway). null = no
   *  server confirmation yet — UI falls back to a client-side estimate. */
  planRenewsAt: string | null;
  /** Activate a paid plan together with its cycle + activation date. */
  activatePaidPlan: (p: Plan, cycle: "monthly" | "annual") => void;
  /** Downgrade to free (subscription cancelled). */
  cancelPaidPlan: () => void;
  /** Apply a SERVER-confirmed plan (cloud-sync pull): used when a webhook
   *  activated the plan while the device was offline. Never downgrades. */
  applyServerPlan: (p: {
    plan: Plan;
    planBillingCycle: "monthly" | "annual";
    planStartedAt: string;
    planRenewsAt: string;
  }) => void;
  /** Exit survey captured after a voluntary downgrade (Zerobet 2.1.0). */
  downgradeSurvey: DowngradeSurvey | null;
  setDowngradeSurvey: (s: DowngradeSurvey | null) => void;
  dataConsent: boolean;
  setDataConsent: (v: boolean) => void;

  // Streak
  streakDays: number;
  lastStreakDate: string | null;
  incrementStreak: () => void;
  resetStreak: () => void;
  setStreak: (days: number) => void;

  // Meditation streak
  meditationStreak: number;
  lastMeditationDate: string | null;
  incrementMeditationStreak: () => void;

  // Finance
  weeklyBetAmount: number;
  setWeeklyBetAmount: (n: number) => void;
  savingsGoal: number;
  setSavingsGoal: (n: number) => void;
  weeklyIncome: number;
  setWeeklyIncome: (n: number) => void;
  weeklyExpenses: { rent: number; food: number; transport: number; other: number };
  setWeeklyExpenses: (expenses: {
    rent: number;
    food: number;
    transport: number;
    other: number;
  }) => void;
  savingsGoals: SavingsGoal[];
  addSavingsGoal: (goal: Omit<SavingsGoal, "id">) => void;
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void;
  deleteSavingsGoal: (id: string) => void;

  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (e: Omit<JournalEntry, "id" | "createdAt">) => void;
  deleteJournalEntry: (id: string) => void;

  // Free-tier usage quotas (Zerobet 2.0 — freemium rebalance)
  // Atlas AI: N free messages per rolling day for non-premium users.
  // Journal: N free entries per rolling week for non-premium users.
  // Community live chat: N free messages per rolling day for non-premium users.
  atlasUsage: { date: string; count: number };
  consumeAtlasMessage: () => void;
  journalUsage: { weekStart: string; count: number };
  consumeJournalEntry: () => void;
  chatUsage: { date: string; count: number };
  consumeChatMessage: () => void;

  // Backend sync (Zerobet 2.0 — cloud backup of core progress)
  lastSyncAt: string | null;
  setLastSyncAt: (iso: string) => void;
  cloudSyncStatus: "idle" | "syncing" | "ok" | "error";
  setCloudSyncStatus: (s: "idle" | "syncing" | "ok" | "error") => void;
  syncRequestId: number;
  requestSync: () => void;
  restoreFromSnapshot: (payload: Record<string, unknown>) => boolean;

  // Panic events
  panicEvents: PanicEvent[];
  addPanicEvent: (e: Omit<PanicEvent, "id" | "createdAt">) => void;

  // Chat (Atlas AI)
  chatMessages: ChatMessage[];
  addChatMessage: (m: Omit<ChatMessage, "id" | "createdAt">) => void;
  clearChat: () => void;

  // Community
  testimonials: Testimonial[];
  addTestimonial: (t: Omit<Testimonial, "id" | "createdAt" | "likes" | "replies">) => void;
  toggleTestimonialLike: (id: string) => void;
  addTestimonialReply: (id: string, reply: Omit<ForumReply, "id" | "createdAt" | "likes">) => void;

  forumPosts: ForumPost[];
  addForumPost: (p: Omit<ForumPost, "id" | "createdAt" | "likes" | "replies" | "liked">) => void;
  toggleForumLike: (id: string) => void;
  addForumReply: (postId: string, reply: Omit<ForumReply, "id" | "createdAt" | "likes">) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAllRead: () => void;

  // Betting blocker
  blockedSites: BlockedSite[];
  toggleSiteBlock: (id: string) => void;
  toggleAllSites: (blocked: boolean) => void;
  addCustomSite: (url: string, name: string) => void;
  blockerEnabled: boolean;
  setBlockerEnabled: (v: boolean) => void;
  strictMode: boolean;
  setStrictMode: (v: boolean) => void;
  strictUntil: string | null;
  activateStrictMode: () => void;

  // Unlocked milestones (rank keys)
  unlockedRanks: string[];
  unlockRank: (key: string) => void;

  // Settings
  anonymousMode: boolean;
  setAnonymousMode: (v: boolean) => void;

  // Appearance & preferences (Task 9-a)
  themeMode: ThemeMode;
  setThemeMode: (v: ThemeMode) => void;
  starfieldIntensity: number; // 0-100
  setStarfieldIntensity: (v: number) => void;
  glassEffect: boolean;
  setGlassEffect: (v: boolean) => void;

  // Notification preferences
  notificationPrefs: NotificationPrefs;
  setNotificationPref: (key: keyof NotificationPrefs, value: boolean) => void;
  notificationTime: string; // "HH:MM"
  setNotificationTime: (v: string) => void;

  // Privacy & security
  appLock: boolean;
  setAppLock: (v: boolean) => void;
  discreteMode: boolean;
  setDiscreteMode: (v: boolean) => void;
  autoLockMinutes: number;
  setAutoLockMinutes: (v: number) => void;

  // Sound & haptics
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  hapticsEnabled: boolean;
  setHapticsEnabled: (v: boolean) => void;
  volume: number; // 0-100
  setVolume: (v: number) => void;

  // Daily check-in
  lastCheckInDate: string | null;
  setLastCheckInDate: (date: string) => void;
  todayMood: string | null;
  setTodayMood: (mood: string) => void;
  todayCraving: boolean;
  setTodayCraving: (v: boolean) => void;

  // Trusted contacts (SOS)
  trustedContacts: TrustedContact[];
  addTrustedContact: (c: Omit<TrustedContact, "id">) => void;
  deleteTrustedContact: (id: string) => void;

  // Admin mode
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
  adminStreakOverride: number | null;
  setAdminStreakOverride: (n: number | null) => void;

  // Gamification — XP & Levels
  xp: number;
  level: number;
  addXP: (amount: number, source: string) => void;

  // Gamification — Daily Quests
  dailyQuests: DailyQuest;
  completeQuest: (questId: keyof DailyQuest) => void;
  resetDailyQuests: () => void;
  lastQuestReset: string | null;

  // Gamification — Daily Challenge (dashboard)
  challengeCompletedDate: string | null; // toDateString() of last completion
  challengeStreak: number; // consecutive days with a completed challenge
  completeDailyChallenge: () => void;

  // Gamification — XP History
  xpHistory: XPHistoryEntry[];

  // Onboarding tutorial
  hasSeenTutorial: boolean;
  setHasSeenTutorial: (v: boolean) => void;

  // 90-day Program tasks (Task 10-a)
  programTasksCompleted: string[]; // array of task IDs completed today
  programLastReset: string | null; // date string for daily reset
  markProgramTask: (taskId: string) => void;
  resetProgramTasks: () => void;

  // Withdrawal symptoms tracker (Task 10-b)
  withdrawalSymptoms: Record<string, number>; // symptom key -> intensity 1..5
  setWithdrawalSymptoms: (s: Record<string, number>) => void;

  // Triggers tracker (Task 11-a)
  triggers: Trigger[];
  addTrigger: (trigger: Omit<Trigger, "id" | "createdAt">) => void;
  deleteTrigger: (id: string) => void;

  // Life goals (Task 11-b)
  lifeGoals: LifeGoal[];
  addLifeGoal: (
    goal: Omit<LifeGoal, "id" | "createdAt" | "progress" | "milestones"> & {
      milestones: string[];
    }
  ) => void;
  updateLifeGoal: (
    id: string,
    updates: Partial<Omit<LifeGoal, "id" | "createdAt">>
  ) => void;
  deleteLifeGoal: (id: string) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;

  // Milestone celebrations (Task 11-d)
  celebratedMilestones: number[];
  markMilestoneCelebrated: (day: number) => void;

  // Relapse recovery (Task 12-c)
  relapseHistory: RelapseEvent[];
  currentRelapseProtocol: RelapseProtocolStep[] | null;
  addRelapseEvent: (
    event: Omit<RelapseEvent, "id" | "timestamp" | "protocolCompleted">
  ) => string;
  updateRelapseEvent: (id: string, updates: Partial<RelapseEvent>) => void;
  startRelapseProtocol: () => void;
  completeRelapseStep: (stepId: string) => void;
  resetRelapseProtocol: () => void;

  // Affirmations (Task 12-b)
  favoriteAffirmations: string[]; // array of affirmation IDs
  customAffirmations: Affirmation[]; // user-created affirmations
  toggleFavoriteAffirmation: (id: string) => void;
  addCustomAffirmation: (text: string, category: AffirmationCategory) => void;
  deleteCustomAffirmation: (id: string) => void;

  // Streak history / heatmap (Task 13-b)
  streakHistory: StreakDay[];
  markDayClean: (date: string, intensity?: number) => void;
  markDayRelapse: (date: string) => void;

  // Notification settings (Task 13-c) — PWA push + per-channel preferences
  notificationPreferences: NotificationPreferences;
  setNotificationPreferences: (prefs: Partial<NotificationPreferences>) => void;
  notificationPermission: "default" | "granted" | "denied";
  setNotificationPermission: (perm: "default" | "granted" | "denied") => void;
  pwaInstalled: boolean;
  setPwaInstalled: (installed: boolean) => void;

  // Community chat (Task 13-a) — real-time socket.io rooms.
  // NOTE: we use `chatNickname` + `chatRoomMessages` rather than `chatMessages`
  // (which is the Atlas AI coach history) to avoid a naming collision.
  chatNickname: string;
  setChatNickname: (name: string) => void;
  chatRoomMessages: ChatRoomMessage[];
  addChatRoomMessage: (msg: ChatRoomMessage) => void;
  /** Zerobet 2.1.0 — prepend OLDER room messages (history pagination).
   *  Unlike addChatRoomMessage this does NOT drop the oldest entries while
   *  the user is paging back through history (bounded hard cap 400). */
  prependChatRoomMessages: (msgs: ChatRoomMessage[]) => void;
  clearChatRoomMessages: () => void;

  // Currency selection (Task 15-a) — user's preferred display currency.
  // All amounts remain stored internally in FCFA; this only drives display.
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  // Optional override for the weekly bet amount, expressed in the user's
  // selected currency. When 0 (default) the app falls back to the canonical
  // weeklyBetAmount (FCFA). Reserved for future Task 15 sibling wiring.
  customWeeklyBet: number;

  // Reset
  resetAll: () => void;
}

const DEFAULT_BLOCKED_SITES: BlockedSite[] = [
  // International
  { id: "s1", url: "1xbet.com", name: "1xBet", category: "international", blocked: true },
  { id: "s2", url: "bet365.com", name: "Bet365", category: "international", blocked: true },
  { id: "s3", url: "betway.com", name: "Betway", category: "international", blocked: true },
  { id: "s4", url: "williamhill.com", name: "William Hill", category: "international", blocked: true },
  { id: "s5", url: "unibet.com", name: "Unibet", category: "international", blocked: true },
  { id: "s6", url: "bwin.com", name: "Bwin", category: "international", blocked: true },
  { id: "s7", url: "stake.com", name: "Stake", category: "international", blocked: true },
  { id: "s8", url: "pinnacle.com", name: "Pinnacle", category: "international", blocked: true },
  { id: "s9", url: "10bet.com", name: "10Bet", category: "international", blocked: true },
  { id: "s10", url: "22bet.com", name: "22Bet", category: "international", blocked: true },
  // Africa
  { id: "s11", url: "betika.com", name: "Betika", category: "africa", blocked: true },
  { id: "s12", url: "sportybet.com", name: "SportyBet", category: "africa", blocked: true },
  { id: "s13", url: "melbet.com", name: "Melbet", category: "africa", blocked: true },
  { id: "s14", url: "bet9ja.com", name: "Bet9ja", category: "africa", blocked: true },
  { id: "s15", url: "msport.com", name: "MSport", category: "africa", blocked: true },
  { id: "s16", url: "bangbet.com", name: "BangBet", category: "africa", blocked: true },
  { id: "s17", url: "betking.com", name: "BetKing", category: "africa", blocked: true },
  { id: "s18", url: "nairabet.com", name: "NairaBet", category: "africa", blocked: true },
  { id: "s19", url: "betwinner.com", name: "BetWinner", category: "africa", blocked: true },
  { id: "s20", url: "helabet.com", name: "Helabet", category: "africa", blocked: true },
  // Crypto
  { id: "s21", url: "stake.crypto", name: "Stake Crypto", category: "crypto", blocked: true },
  { id: "s22", url: "cloudbet.com", name: "Cloudbet", category: "crypto", blocked: true },
  { id: "s23", url: "nitrobetting.com", name: "Nitrobetting", category: "crypto", blocked: true },
  { id: "s24", url: "trustdice.com", name: "TrustDice", category: "crypto", blocked: true },
  { id: "s25", url: "fortunejack.com", name: "FortuneJack", category: "crypto", blocked: true },
  { id: "s26", url: "mbitcasino.com", name: "mBit Casino", category: "crypto", blocked: true },
  // France
  { id: "s27", url: "pmu.fr", name: "PMU", category: "france", blocked: true },
  { id: "s28", url: "parionssport.fdj.fr", name: "Parions Sport", category: "france", blocked: true },
  { id: "s29", url: "betclic.fr", name: "Betclic", category: "france", blocked: true },
  { id: "s30", url: "winamax.fr", name: "Winamax", category: "france", blocked: true },
  { id: "s31", url: "pariweb.fr", name: "Pariweb", category: "france", blocked: true },
  { id: "s32", url: "zebet.fr", name: "Zebet", category: "france", blocked: true },
  { id: "s33", url: "parisfoot.fr", name: "Paris Foot", category: "france", blocked: true },
  { id: "s34", url: "netbet.fr", name: "NetBet", category: "france", blocked: true },
  // Other
  { id: "s35", url: "draftkings.com", name: "DraftKings", category: "international", blocked: true },
  { id: "s36", url: "fanduel.com", name: "FanDuel", category: "international", blocked: true },
  { id: "s37", url: "pointsbet.com", name: "PointsBet", category: "international", blocked: true },
  { id: "s38", url: "betfair.com", name: "Betfair", category: "international", blocked: true },
  { id: "s39", url: "ladbrokes.com", name: "Ladbrokes", category: "international", blocked: true },
  { id: "s40", url: "coral.co.uk", name: "Coral", category: "international", blocked: true },
  { id: "s41", url: "sbobet.com", name: "SBOBet", category: "international", blocked: true },
  { id: "s42", url: "dafabet.com", name: "Dafabet", category: "international", blocked: true },
  { id: "s43", url: "fun88.com", name: "Fun88", category: "international", blocked: true },
  { id: "s44", url: "1xstavka.ru", name: "1xStavka", category: "international", blocked: true },
  { id: "s45", url: "leonbets.com", name: "Leonbets", category: "international", blocked: true },
  { id: "s46", url: "parimatch.com", name: "Parimatch", category: "international", blocked: true },
  { id: "s47", url: "melbet.ng", name: "Melbet NG", category: "africa", blocked: true },
  { id: "s48", url: "betbonanza.com", name: "BetBonanza", category: "africa", blocked: true },
  { id: "s49", url: "ebet.co.za", name: "eBET", category: "africa", blocked: true },
  { id: "s50", url: "hollywoodbets.net", name: "Hollywoodbets", category: "africa", blocked: true },
  { id: "s51", url: "supabets.co.za", name: "Supabets", category: "africa", blocked: true },
  { id: "s52", url: "worldstarbet.com", name: "Worldstar Bet", category: "africa", blocked: true },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Navigation
      currentScreen: "splash",
      previousScreens: [],
      navigate: (screen) =>
        set((s) => ({
          previousScreens: [...s.previousScreens, s.currentScreen].slice(-10),
          currentScreen: screen,
        })),
      goBack: () =>
        set((s) => {
          if (s.previousScreens.length === 0) return s;
          const prev = s.previousScreens[s.previousScreens.length - 1];
          return {
            currentScreen: prev,
            previousScreens: s.previousScreens.slice(0, -1),
          };
        }),
      resetToOnboarding: () => set({ currentScreen: "splash", previousScreens: [] }),

      // Onboarding
      hasStartedOnboarding: false,
      hasCompletedOnboarding: false,
      setStartedOnboarding: (v) => set({ hasStartedOnboarding: v }),
      setCompletedOnboarding: (v) => set({ hasCompletedOnboarding: v }),

      // Profile
      gender: null,
      setGender: (g) => set({ gender: g }),
      language: "fr",
      setLanguage: (l) => set({ language: l }),
      name: "",
      setName: (n) => set({ name: n }),

      // Avatar color
      avatarColor: "#FF6B00",
      setAvatarColor: (color) => set({ avatarColor: color }),

      // Profile photo (base64 data URL or null)
      profilePhoto: null,
      setProfilePhoto: (photo) => set({ profilePhoto: photo }),

      // Articles read
      articlesRead: 0,
      incrementArticlesRead: () => set((s) => ({ articlesRead: s.articlesRead + 1 })),

      // Quiz
      quizAnswers: [],
      quizCurrentIndex: 0,
      setQuizAnswer: (qIndex, aIndex) =>
        set((s) => {
          const answers = [...s.quizAnswers];
          answers[qIndex] = aIndex;
          return { quizAnswers: answers };
        }),
      setQuizCurrentIndex: (i) => set({ quizCurrentIndex: i }),
      addictionScore: 0,
      addictionLevel: "faible",
      setAddictionResult: (score, level) => set({ addictionScore: score, addictionLevel: level }),

      // Symptoms
      selectedSymptoms: {},
      toggleSymptom: (category, symptom) =>
        set((s) => {
          const current = s.selectedSymptoms[category] || [];
          const updated = current.includes(symptom)
            ? current.filter((x) => x !== symptom)
            : [...current, symptom];
          return {
            selectedSymptoms: { ...s.selectedSymptoms, [category]: updated },
          };
        }),

      // Engagement
      selectedGoals: [],
      toggleGoal: (goal) =>
        set((s) => ({
          selectedGoals: s.selectedGoals.includes(goal)
            ? s.selectedGoals.filter((g) => g !== goal)
            : [...s.selectedGoals, goal],
        })),
      signatureData: null,
      setSignature: (data) => set({ signatureData: data }),

      // Plan
      plan: "free",
      setPlan: (p) => set({ plan: p }),
      planBillingCycle: "monthly",
      planStartedAt: null,
      planRenewsAt: null,
      activatePaidPlan: (p, cycle) =>
        set({
          plan: p,
          planBillingCycle: cycle,
          planStartedAt: new Date().toISOString(),
          // The webhook/gateway will confirm the exact date server-side; the
          // optimistic estimate keeps the UI honest until the pull lands.
          planRenewsAt: null,
        }),
      cancelPaidPlan: () =>
        set({ plan: "free", planBillingCycle: "monthly", planStartedAt: null, planRenewsAt: null }),
      applyServerPlan: ({ plan, planBillingCycle, planStartedAt, planRenewsAt }) =>
        set({
          plan,
          planBillingCycle,
          planStartedAt,
          planRenewsAt,
        }),
      downgradeSurvey: null,
      setDowngradeSurvey: (s) => set({ downgradeSurvey: s }),
      dataConsent: false,
      setDataConsent: (v) => set({ dataConsent: v }),

      // Streak
      streakDays: 0,
      lastStreakDate: null,
      incrementStreak: () =>
        set((s) => {
          const today = new Date().toDateString();
          if (s.lastStreakDate === today) return s;
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          const newStreak = s.lastStreakDate === yesterday ? s.streakDays + 1 : 1;
          return { streakDays: newStreak, lastStreakDate: today };
        }),
      resetStreak: () => set({ streakDays: 0, lastStreakDate: null }),
      setStreak: (days) => set({ streakDays: days, lastStreakDate: new Date().toDateString() }),

      // Meditation streak
      meditationStreak: 0,
      lastMeditationDate: null,
      incrementMeditationStreak: () =>
        set((s) => {
          const today = new Date().toDateString();
          if (s.lastMeditationDate === today) return s;
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          const newStreak =
            s.lastMeditationDate === yesterday ? s.meditationStreak + 1 : 1;
          return { meditationStreak: newStreak, lastMeditationDate: today };
        }),

      // Finance
      weeklyBetAmount: 10000,
      setWeeklyBetAmount: (n) => set({ weeklyBetAmount: n }),
      savingsGoal: 100000,
      setSavingsGoal: (n) => set({ savingsGoal: n }),
      weeklyIncome: 50000,
      setWeeklyIncome: (n) => set({ weeklyIncome: n }),
      weeklyExpenses: { rent: 15000, food: 10000, transport: 4000, other: 6000 },
      setWeeklyExpenses: (expenses) => set({ weeklyExpenses: expenses }),
      savingsGoals: [
        {
          id: "sg-default-emergency",
          name: "Fonds d'urgence",
          targetAmount: 150000,
          currentAmount: 0,
          icon: "🛟",
        },
        {
          id: "sg-default-phone",
          name: "Nouveau téléphone",
          targetAmount: 75000,
          currentAmount: 0,
          icon: "📱",
        },
      ],
      addSavingsGoal: (goal) =>
        set((s) => ({
          savingsGoals: [
            ...s.savingsGoals,
            { ...goal, id: `sg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` },
          ],
        })),
      updateSavingsGoal: (id, updates) =>
        set((s) => ({
          savingsGoals: s.savingsGoals.map((g) =>
            g.id === id ? { ...g, ...updates } : g
          ),
        })),
      deleteSavingsGoal: (id) =>
        set((s) => ({
          savingsGoals: s.savingsGoals.filter((g) => g.id !== id),
        })),

      // Journal
      journalEntries: [],
      addJournalEntry: (e) =>
        set((s) => ({
          journalEntries: [
            { ...e, id: `j${Date.now()}`, createdAt: new Date().toISOString() },
            ...s.journalEntries,
          ],
        })),
      deleteJournalEntry: (id) =>
        set((s) => ({ journalEntries: s.journalEntries.filter((j) => j.id !== id) })),

      // Panic
      panicEvents: [],
      addPanicEvent: (e) =>
        set((s) => ({
          panicEvents: [
            { ...e, id: `p${Date.now()}`, createdAt: new Date().toISOString() },
            ...s.panicEvents,
          ],
        })),

      // Chat
      chatMessages: [],
      addChatMessage: (m) =>
        set((s) => ({
          chatMessages: [
            ...s.chatMessages,
            { ...m, id: `c${Date.now()}`, createdAt: new Date().toISOString() },
          ],
        })),
      clearChat: () => set({ chatMessages: [] }),

      // Free-tier quotas (Zerobet 2.0)
      atlasUsage: { date: "", count: 0 },
      consumeAtlasMessage: () =>
        set((s) => {
          const today = new Date().toISOString().slice(0, 10);
          const usage =
            s.atlasUsage.date === today
              ? { date: today, count: s.atlasUsage.count + 1 }
              : { date: today, count: 1 };
          return { atlasUsage: usage };
        }),
      journalUsage: { weekStart: "", count: 0 },
      consumeJournalEntry: () =>
        set((s) => {
          const now = new Date();
          const day = now.getUTCDay();
          const monday = new Date(now);
          monday.setUTCDate(now.getUTCDate() - ((day + 6) % 7));
          const weekStart = monday.toISOString().slice(0, 10);
          const usage =
            s.journalUsage.weekStart === weekStart
              ? { weekStart, count: s.journalUsage.count + 1 }
              : { weekStart, count: 1 };
          return { journalUsage: usage };
        }),
      chatUsage: { date: "", count: 0 },
      consumeChatMessage: () =>
        set((s) => {
          const today = new Date().toISOString().slice(0, 10);
          const usage =
            s.chatUsage.date === today
              ? { date: today, count: s.chatUsage.count + 1 }
              : { date: today, count: 1 };
          return { chatUsage: usage };
        }),

      // Backend sync (Zerobet 2.0)
      lastSyncAt: null,
      setLastSyncAt: (iso) => set({ lastSyncAt: iso }),
      cloudSyncStatus: "idle",
      setCloudSyncStatus: (s) => set({ cloudSyncStatus: s }),
      syncRequestId: 0,
      requestSync: () => set((s) => ({ syncRequestId: s.syncRequestId + 1 })),
      // Zerobet 2.0 — cloud restore: merge a server snapshot back into the
      // store. Only whitelisted backup keys are applied, so unknown/extra
      // fields from newer or older payloads can never corrupt state.
      restoreFromSnapshot: (payload) => {
        if (!payload || typeof payload !== "object") return false;
        const BACKUP_KEYS = [
          "gender", "language", "name", "hasCompletedOnboarding",
          "quizAnswers", "addictionScore", "addictionLevel",
          "selectedGoals", "selectedSymptoms", "plan",
          "planBillingCycle", "planStartedAt", "planRenewsAt",
          "downgradeSurvey",
          "streakDays", "lastStreakDate", "streakHistory",
          "lastCheckInDate", "todayMood", "todayCraving",
          "xp", "level", "dailyQuests",
          "challengeStreak",
          "savingsGoals", "weeklyIncome", "weeklyExpenses",
          "savingsGoal", "weeklyBetAmount", "currency",
          "unlockedRanks", "celebratedMilestones", "meditationStreak",
          "articlesRead", "relapseHistory", "avatarColor",
        ];
        const partial: Record<string, unknown> = {};
        let applied = 0;
        for (const k of BACKUP_KEYS) {
          if (k in payload && payload[k] !== undefined && payload[k] !== null) {
            partial[k] = payload[k];
            applied += 1;
          }
        }
        if (applied === 0) return false;
        set(partial as Partial<AppState>);
        return true;
      },

      // Community
      testimonials: [],
      addTestimonial: (t) =>
        set((s) => ({
          testimonials: [
            {
              ...t,
              id: `t${Date.now()}`,
              createdAt: new Date().toISOString(),
              likes: 0,
              replies: [],
            },
            ...s.testimonials,
          ],
        })),
      toggleTestimonialLike: (id) =>
        set((s) => ({
          testimonials: s.testimonials.map((t) =>
            t.id === id
              ? { ...t, liked: !t.liked, likes: t.liked ? t.likes - 1 : t.likes + 1 }
              : t
          ),
        })),
      addTestimonialReply: (id, reply) =>
        set((s) => ({
          testimonials: s.testimonials.map((t) =>
            t.id === id
              ? {
                  ...t,
                  replies: [
                    ...t.replies,
                    { ...reply, id: `r${Date.now()}`, createdAt: new Date().toISOString(), likes: 0 },
                  ],
                }
              : t
          ),
        })),

      forumPosts: [],
      addForumPost: (p) =>
        set((s) => ({
          forumPosts: [
            {
              ...p,
              id: `f${Date.now()}`,
              createdAt: new Date().toISOString(),
              likes: 0,
              replies: [],
              liked: false,
            },
            ...s.forumPosts,
          ],
        })),
      toggleForumLike: (id) =>
        set((s) => ({
          forumPosts: s.forumPosts.map((p) =>
            p.id === id
              ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
              : p
          ),
        })),
      addForumReply: (postId, reply) =>
        set((s) => ({
          forumPosts: s.forumPosts.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  replies: [
                    ...p.replies,
                    { ...reply, id: `fr${Date.now()}`, createdAt: new Date().toISOString(), likes: 0 },
                  ],
                }
              : p
          ),
        })),

      // Notifications
      notifications: [],
      addNotification: (n) =>
        set((s) => ({
          notifications: [
            {
              ...n,
              id: `n${Date.now()}`,
              createdAt: new Date().toISOString(),
              read: false,
            },
            ...s.notifications,
          ],
        })),
      markAllRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),

      // Blocker
      blockedSites: DEFAULT_BLOCKED_SITES,
      toggleSiteBlock: (id) =>
        set((s) => ({
          blockedSites: s.blockedSites.map((site) =>
            site.id === id ? { ...site, blocked: !site.blocked } : site
          ),
        })),
      toggleAllSites: (blocked) =>
        set((s) => ({
          blockedSites: s.blockedSites.map((site) => ({ ...site, blocked })),
        })),
      addCustomSite: (url, name) =>
        set((s) => ({
          blockedSites: [
            ...s.blockedSites,
            {
              id: `custom-${Date.now()}`,
              url,
              name,
              category: "other" as const,
              blocked: true,
            },
          ],
        })),
      blockerEnabled: false,
      setBlockerEnabled: (v) => set({ blockerEnabled: v }),
      strictMode: false,
      setStrictMode: (v) => set({ strictMode: v }),
      strictUntil: null,
      activateStrictMode: () =>
        set({
          strictMode: true,
          strictUntil: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
        }),

      // Ranks
      unlockedRanks: [],
      unlockRank: (key) =>
        set((s) =>
          s.unlockedRanks.includes(key)
            ? s
            : { unlockedRanks: [...s.unlockedRanks, key] }
        ),

      // Settings
      anonymousMode: false,
      setAnonymousMode: (v) => set({ anonymousMode: v }),

      // Appearance & preferences (Task 9-a)
      themeMode: "dark",
      setThemeMode: (v) => set({ themeMode: v }),
      starfieldIntensity: 60,
      setStarfieldIntensity: (v) => set({ starfieldIntensity: v }),
      glassEffect: true,
      setGlassEffect: (v) => set({ glassEffect: v }),

      // Notification preferences
      notificationPrefs: {
        streak: true,
        motivation: true,
        milestones: true,
        checkin: true,
        weekly: true,
      },
      setNotificationPref: (key, value) =>
        set((s) => ({
          notificationPrefs: { ...s.notificationPrefs, [key]: value },
        })),
      notificationTime: "20:00",
      setNotificationTime: (v) => set({ notificationTime: v }),

      // Privacy & security
      appLock: false,
      setAppLock: (v) => set({ appLock: v }),
      discreteMode: false,
      setDiscreteMode: (v) => set({ discreteMode: v }),
      autoLockMinutes: 5,
      setAutoLockMinutes: (v) => set({ autoLockMinutes: v }),

      // Sound & haptics
      soundEnabled: true,
      setSoundEnabled: (v) => set({ soundEnabled: v }),
      hapticsEnabled: true,
      setHapticsEnabled: (v) => set({ hapticsEnabled: v }),
      volume: 70,
      setVolume: (v) => set({ volume: v }),

      // Daily check-in
      lastCheckInDate: null,
      setLastCheckInDate: (date) => set({ lastCheckInDate: date }),
      todayMood: null,
      setTodayMood: (mood) => set({ todayMood: mood }),
      todayCraving: false,
      setTodayCraving: (v) => set({ todayCraving: v }),

      // Trusted contacts (SOS)
      trustedContacts: [],
      addTrustedContact: (c) =>
        set((s) => ({
          trustedContacts: [
            ...s.trustedContacts,
            { ...c, id: `tc${Date.now()}` },
          ],
        })),
      deleteTrustedContact: (id) =>
        set((s) => ({
          trustedContacts: s.trustedContacts.filter((c) => c.id !== id),
        })),

      // Admin
      isAdmin: false,
      setIsAdmin: (v) => set({ isAdmin: v }),
      adminStreakOverride: null,
      setAdminStreakOverride: (n) => set({ adminStreakOverride: n }),

      // Gamification — XP & Levels
      xp: 0,
      level: 1,
      addXP: (amount, source) =>
        set((s) => {
          const multiplier = getStreakMultiplier(s.streakDays);
          const adjustedAmount = Math.round(amount * multiplier);
          const newXP = s.xp + adjustedAmount;
          const { level: newLevel } = computeLevel(newXP);
          const newEntry: XPHistoryEntry = {
            id: `xp${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            amount: adjustedAmount,
            source,
            timestamp: new Date().toISOString(),
          };
          // Subtle XP feedback (coin ding + selection tick).
          // Level-up fanfare is handled by the GamificationScreen when
          // the computed level actually increases.
          try {
            sound.playCoin();
            haptics.selection();
          } catch {
            /* noop — audio not ready */
          }
          return {
            xp: newXP,
            level: newLevel,
            xpHistory: [newEntry, ...s.xpHistory].slice(0, 50),
          };
        }),

      // Gamification — Daily Quests
      dailyQuests: {
        checkin: false,
        journal: false,
        meditation: false,
        streak: false,
        article: false,
      },
      completeQuest: (questId) => {
        const state = get();
        if (state.dailyQuests[questId]) return;
        const reward = QUEST_REWARDS[questId] ?? 0;
        const label = QUEST_LABELS[questId] ?? questId;
        set((s) => ({
          dailyQuests: { ...s.dailyQuests, [questId]: true },
        }));
        get().addXP(reward, label);
      },
      resetDailyQuests: () =>
        set({
          dailyQuests: {
            checkin: false,
            journal: false,
            meditation: false,
            streak: false,
            article: false,
          },
          lastQuestReset: new Date().toDateString(),
        }),
      lastQuestReset: null,

      // Gamification — Daily Challenge (dashboard card)
      challengeCompletedDate: null,
      challengeStreak: 0,
      completeDailyChallenge: () => {
        const today = new Date().toDateString();
        if (get().challengeCompletedDate === today) return;
        const yesterday = new Date(Date.now() - 86_400_000).toDateString();
        const streak =
          get().challengeCompletedDate === yesterday
            ? get().challengeStreak + 1
            : 1;
        set({ challengeCompletedDate: today, challengeStreak: streak });
        get().addXP(DAILY_CHALLENGE_XP, "dailyChallenge");
      },

      // Gamification — XP History
      xpHistory: [],

      // Onboarding tutorial
      hasSeenTutorial: false,
      setHasSeenTutorial: (v) => set({ hasSeenTutorial: v }),

      // 90-day Program tasks (Task 10-a)
      programTasksCompleted: [],
      programLastReset: null,
      markProgramTask: (taskId) =>
        set((s) => ({
          programTasksCompleted: s.programTasksCompleted.includes(taskId)
            ? s.programTasksCompleted
            : [...s.programTasksCompleted, taskId],
        })),
      resetProgramTasks: () =>
        set({
          programTasksCompleted: [],
          programLastReset: new Date().toDateString(),
        }),

      // Withdrawal symptoms tracker (Task 10-b)
      withdrawalSymptoms: {},
      setWithdrawalSymptoms: (s) => set({ withdrawalSymptoms: s }),

      // Triggers tracker (Task 11-a)
      triggers: [],
      addTrigger: (trigger) =>
        set((s) => ({
          triggers: [
            {
              ...trigger,
              id: `trigger-${Date.now()}`,
              createdAt: new Date().toISOString(),
            },
            ...s.triggers,
          ],
        })),
      deleteTrigger: (id) =>
        set((s) => ({ triggers: s.triggers.filter((t) => t.id !== id) })),

      // Life goals (Task 11-b)
      lifeGoals: [],
      addLifeGoal: (goal) =>
        set((s) => {
          const now = Date.now();
          const milestones: Milestone[] = goal.milestones.map((title, i) => ({
            id: `ms-${now}-${i}`,
            title,
            completed: false,
          }));
          const newGoal: LifeGoal = {
            id: `goal-${now}`,
            title: goal.title,
            description: goal.description,
            category: goal.category,
            targetDate: goal.targetDate,
            progress: 0,
            milestones,
            createdAt: new Date().toISOString(),
          };
          return { lifeGoals: [newGoal, ...s.lifeGoals] };
        }),
      updateLifeGoal: (id, updates) =>
        set((s) => ({
          lifeGoals: s.lifeGoals.map((g) => {
            if (g.id !== id) return g;
            const merged: LifeGoal = { ...g, ...updates };
            if (updates.milestones) {
              const total = merged.milestones.length;
              const completed = merged.milestones.filter((m) => m.completed).length;
              merged.progress =
                total > 0 ? Math.round((completed / total) * 100) : 0;
            }
            return merged;
          }),
        })),
      deleteLifeGoal: (id) =>
        set((s) => ({
          lifeGoals: s.lifeGoals.filter((g) => g.id !== id),
        })),
      toggleMilestone: (goalId, milestoneId) =>
        set((s) => ({
          lifeGoals: s.lifeGoals.map((g) => {
            if (g.id !== goalId) return g;
            const milestones = g.milestones.map((m) =>
              m.id === milestoneId ? { ...m, completed: !m.completed } : m
            );
            const total = milestones.length;
            const completed = milestones.filter((m) => m.completed).length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
            return { ...g, milestones, progress };
          }),
        })),

      // Milestone celebrations (Task 11-d)
      celebratedMilestones: [],
      markMilestoneCelebrated: (day) =>
        set((s) =>
          s.celebratedMilestones.includes(day)
            ? s
            : { celebratedMilestones: [...s.celebratedMilestones, day] }
        ),

      // Relapse recovery (Task 12-c)
      relapseHistory: [],
      currentRelapseProtocol: null,
      addRelapseEvent: (event) => {
        const id = `relapse-${Date.now()}`;
        const newEvent: RelapseEvent = {
          ...event,
          id,
          timestamp: new Date().toISOString(),
          protocolCompleted: false,
        };
        set((s) => ({ relapseHistory: [newEvent, ...s.relapseHistory] }));
        return id;
      },
      updateRelapseEvent: (id, updates) =>
        set((s) => ({
          relapseHistory: s.relapseHistory.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),
      startRelapseProtocol: () =>
        set({
          currentRelapseProtocol: PROTOCOL_STEPS.map((step) => ({
            ...step,
            completed: false,
          })),
        }),
      completeRelapseStep: (stepId) =>
        set((s) => {
          if (!s.currentRelapseProtocol) return s;
          const now = new Date().toISOString();
          const updated = s.currentRelapseProtocol.map((step) =>
            step.id === stepId
              ? { ...step, completed: true, completedAt: now }
              : step
          );
          const allDone = updated.every((step) => step.completed);
          if (allDone && s.relapseHistory.length > 0) {
            const [first, ...rest] = s.relapseHistory;
            return {
              currentRelapseProtocol: updated,
              relapseHistory: [
                { ...first, protocolCompleted: true },
                ...rest,
              ],
            };
          }
          return { currentRelapseProtocol: updated };
        }),
      resetRelapseProtocol: () => set({ currentRelapseProtocol: null }),

      // Affirmations (Task 12-b)
      favoriteAffirmations: [],
      customAffirmations: [],
      toggleFavoriteAffirmation: (id) =>
        set((s) => ({
          favoriteAffirmations: s.favoriteAffirmations.includes(id)
            ? s.favoriteAffirmations.filter((x) => x !== id)
            : [...s.favoriteAffirmations, id],
        })),
      addCustomAffirmation: (text, category) =>
        set((s) => ({
          customAffirmations: [
            {
              id: `custom-aff-${Date.now()}`,
              textKey: text.trim(),
              category,
              isCustom: true,
            },
            ...s.customAffirmations,
          ],
        })),
      deleteCustomAffirmation: (id) =>
        set((s) => ({
          customAffirmations: s.customAffirmations.filter((a) => a.id !== id),
          favoriteAffirmations: s.favoriteAffirmations.filter((x) => x !== id),
        })),

      // Streak history / heatmap (Task 13-b)
      streakHistory: [],
      markDayClean: (date, intensity = 2) =>
        set((s) => {
          const clamped = Math.max(1, Math.min(3, intensity));
          const existing = s.streakHistory.find((d) => d.date === date);
          if (existing) {
            return {
              streakHistory: s.streakHistory.map((d) =>
                d.date === date ? { ...d, clean: true, intensity: clamped } : d
              ),
            };
          }
          const next: StreakDay[] = [
            ...s.streakHistory,
            { date, clean: true, intensity: clamped },
          ];
          // Cap at 366 entries (1 year), remove oldest by date.
          next.sort((a, b) => a.date.localeCompare(b.date));
          const capped = next.length > 366 ? next.slice(next.length - 366) : next;
          return { streakHistory: capped };
        }),
      markDayRelapse: (date) =>
        set((s) => {
          const existing = s.streakHistory.find((d) => d.date === date);
          if (existing) {
            return {
              streakHistory: s.streakHistory.map((d) =>
                d.date === date ? { ...d, clean: false, intensity: 0 } : d
              ),
            };
          }
          const next: StreakDay[] = [
            ...s.streakHistory,
            { date, clean: false, intensity: 0 },
          ];
          next.sort((a, b) => a.date.localeCompare(b.date));
          const capped = next.length > 366 ? next.slice(next.length - 366) : next;
          return { streakHistory: capped };
        }),

      // Notification settings (Task 13-c) — PWA push + per-channel preferences
      notificationPreferences: {
        dailyReminder: true,
        dailyReminderTime: "07:00",
        cravingCheckin: true,
        milestoneAlerts: true,
        communityActivity: true,
        weeklyReport: true,
        motivationalQuotes: true,
        silentHours: true,
        silentHoursStart: "22:00",
        silentHoursEnd: "07:00",
      },
      setNotificationPreferences: (prefs) =>
        set((s) => ({
          notificationPreferences: { ...s.notificationPreferences, ...prefs },
        })),
      notificationPermission: "default",
      setNotificationPermission: (perm) => set({ notificationPermission: perm }),
      pwaInstalled: false,
      setPwaInstalled: (installed) => set({ pwaInstalled: installed }),

      // Community chat (Task 13-a) — local echo + persisted nickname.
      // Real messages come from the socket.io service on port 3003.
      chatNickname: "",
      setChatNickname: (name) => set({ chatNickname: name }),
      chatRoomMessages: [],
      addChatRoomMessage: (msg) =>
        set((s) => {
          const next = [...s.chatRoomMessages, msg];
          // Cap at 100 — drop the oldest.
          const capped = next.length > 100 ? next.slice(next.length - 100) : next;
          return { chatRoomMessages: capped };
        }),
      prependChatRoomMessages: (msgs) =>
        set((s) => {
          if (!msgs.length) return {};
          const existing = new Set(s.chatRoomMessages.map((m) => m.id));
          const fresh = msgs.filter((m) => m && m.id && !existing.has(m.id));
          if (!fresh.length) return {};
          const next = [...fresh, ...s.chatRoomMessages];
          // Hard safety cap — generous enough for deep history paging.
          const capped = next.length > 400 ? next.slice(0, 400) : next;
          return { chatRoomMessages: capped };
        }),
      clearChatRoomMessages: () => set({ chatRoomMessages: [] }),

      // Currency selection (Task 15-a)
      // Default to XOF (FCFA) since the target market is African francophone.
      currency: "XOF",
      setCurrency: (c) => set({ currency: c }),
      customWeeklyBet: 0,

      // Reset
      resetAll: () =>
        set({
          currentScreen: "splash",
          previousScreens: [],
          hasStartedOnboarding: false,
          hasCompletedOnboarding: false,
          gender: null,
          language: "fr",
          name: "",
          quizAnswers: [],
          quizCurrentIndex: 0,
          addictionScore: 0,
          addictionLevel: "faible",
          selectedSymptoms: {},
          selectedGoals: [],
          signatureData: null,
          plan: "free",
          dataConsent: false,
          streakDays: 0,
          lastStreakDate: null,
          weeklyBetAmount: 10000,
          savingsGoal: 100000,
          weeklyIncome: 50000,
          weeklyExpenses: { rent: 15000, food: 10000, transport: 4000, other: 6000 },
          savingsGoals: [
            {
              id: "sg-default-emergency",
              name: "Fonds d'urgence",
              targetAmount: 150000,
              currentAmount: 0,
              icon: "🛟",
            },
            {
              id: "sg-default-phone",
              name: "Nouveau téléphone",
              targetAmount: 75000,
              currentAmount: 0,
              icon: "📱",
            },
          ],
          journalEntries: [],
          panicEvents: [],
          chatMessages: [],
          testimonials: [],
          forumPosts: [],
          notifications: [],
          blockerEnabled: false,
          strictMode: false,
          strictUntil: null,
          unlockedRanks: [],
          anonymousMode: false,
          themeMode: "dark",
          starfieldIntensity: 60,
          glassEffect: true,
          notificationPrefs: {
            streak: true,
            motivation: true,
            milestones: true,
            checkin: true,
            weekly: true,
          },
          notificationTime: "20:00",
          appLock: false,
          discreteMode: false,
          autoLockMinutes: 5,
          soundEnabled: true,
          hapticsEnabled: true,
          volume: 70,
          lastCheckInDate: null,
          todayMood: null,
          todayCraving: false,
          trustedContacts: [],
          isAdmin: false,
          adminStreakOverride: null,
          meditationStreak: 0,
          lastMeditationDate: null,
          avatarColor: "#FF6B00",
          profilePhoto: null,
          articlesRead: 0,
          xp: 0,
          level: 1,
          dailyQuests: {
            checkin: false,
            journal: false,
            meditation: false,
            streak: false,
            article: false,
          },
          lastQuestReset: null,
          challengeCompletedDate: null,
          challengeStreak: 0,
          xpHistory: [],
          hasSeenTutorial: false,
          programTasksCompleted: [],
          programLastReset: null,
          withdrawalSymptoms: {},
          triggers: [],
          lifeGoals: [],
          celebratedMilestones: [],
          relapseHistory: [],
          currentRelapseProtocol: null,
          favoriteAffirmations: [],
          customAffirmations: [],
          streakHistory: [],
          notificationPreferences: {
            dailyReminder: true,
            dailyReminderTime: "07:00",
            cravingCheckin: true,
            milestoneAlerts: true,
            communityActivity: true,
            weeklyReport: true,
            motivationalQuotes: true,
            silentHours: true,
            silentHoursStart: "22:00",
            silentHoursEnd: "07:00",
          },
          notificationPermission: "default",
          pwaInstalled: false,
          chatNickname: "",
          chatRoomMessages: [],
          currency: "XOF",
          customWeeklyBet: 0,
        }),
    }),
    {
      name: "zerobet-store-v1",
      version: 3,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: unknown, version: number) => {
        // Migration v0/v1 -> v2 (Task 19-a): convert Affirmation.text and
        // RelapseProtocolStep.title/description/action to the new key-based
        // fields. Older persisted entries may still hold raw French text;
        // we coerce them into the new shape so the UI doesn't crash.
        const s = (persistedState ?? {}) as Record<string, unknown>;
        if (version < 2) {
          // Migrate customAffirmations: text -> textKey
          if (Array.isArray(s.customAffirmations)) {
            s.customAffirmations = (s.customAffirmations as Array<Record<string, unknown>>).map(
              (aff) => {
                if (aff && typeof aff === "object") {
                  if ("text" in aff && !("textKey" in aff)) {
                    aff.textKey = aff.text as string;
                    delete aff.text;
                  } else if (!("textKey" in aff)) {
                    aff.textKey = "affirmation1Text";
                  }
                }
                return aff;
              }
            );
          }
          // Migrate currentRelapseProtocol: title/description/action -> *Key
          if (Array.isArray(s.currentRelapseProtocol)) {
            s.currentRelapseProtocol = (s.currentRelapseProtocol as Array<Record<string, unknown>>).map(
              (step) => {
                if (step && typeof step === "object") {
                  if ("title" in step && !("titleKey" in step)) {
                    step.titleKey = step.title as string;
                    delete step.title;
                  } else if (!("titleKey" in step)) {
                    step.titleKey = "relapseStep1Title";
                  }
                  if ("description" in step && !("descKey" in step)) {
                    step.descKey = step.description as string;
                    delete step.description;
                  } else if (!("descKey" in step)) {
                    step.descKey = "relapseStep1Desc";
                  }
                  if ("action" in step && !("actionKey" in step)) {
                    step.actionKey = step.action as string;
                    delete step.action;
                  } else if (!("actionKey" in step)) {
                    step.actionKey = "relapseStep1Action";
                  }
                }
                return step;
              }
            );
          }
        }
        return s as Partial<AppState>;
      },
      // Zerobet 2.0 — persist v2 -> v3: seed the new free-tier quota and
      // backend-sync fields so hydrated state never carries undefined.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Record<string, unknown>;
        const merged = { ...current, ...p } as AppState & Record<string, unknown>;
        if (!merged.atlasUsage || typeof merged.atlasUsage !== "object") {
          merged.atlasUsage = { date: "", count: 0 };
        }
        if (!merged.journalUsage || typeof merged.journalUsage !== "object") {
          merged.journalUsage = { weekStart: "", count: 0 };
        }
        if (!merged.chatUsage || typeof merged.chatUsage !== "object") {
          merged.chatUsage = { date: "", count: 0 };
        }
        if (!("lastSyncAt" in p)) merged.lastSyncAt = null;
        // Plan cycle/date sanitization (Zerobet 2.0.5 / 2.1.0)
        if (merged.planBillingCycle !== "annual") merged.planBillingCycle = "monthly";
        if (typeof merged.planStartedAt !== "string" && merged.planStartedAt !== null) {
          merged.planStartedAt = null;
        }
        if (typeof merged.planRenewsAt !== "string" && merged.planRenewsAt !== null) {
          merged.planRenewsAt = null;
        }
        // Exit survey sanitization (Zerobet 2.1.0)
        if (
          merged.downgradeSurvey !== null &&
          (typeof merged.downgradeSurvey !== "object" ||
            typeof (merged.downgradeSurvey as { reason?: unknown }).reason !== "string")
        ) {
          merged.downgradeSurvey = null;
        }
        return merged as AppState;
      },
      partialize: (state) => ({
        gender: state.gender,
        language: state.language,
        name: state.name,
        hasStartedOnboarding: state.hasStartedOnboarding,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        quizAnswers: state.quizAnswers,
        addictionScore: state.addictionScore,
        addictionLevel: state.addictionLevel,
        selectedSymptoms: state.selectedSymptoms,
        selectedGoals: state.selectedGoals,
        signatureData: state.signatureData,
        plan: state.plan,
        planBillingCycle: state.planBillingCycle,
        planStartedAt: state.planStartedAt,
        planRenewsAt: state.planRenewsAt,
        downgradeSurvey: state.downgradeSurvey,
        dataConsent: state.dataConsent,
        streakDays: state.streakDays,
        lastStreakDate: state.lastStreakDate,
        weeklyBetAmount: state.weeklyBetAmount,
        savingsGoal: state.savingsGoal,
        weeklyIncome: state.weeklyIncome,
        weeklyExpenses: state.weeklyExpenses,
        savingsGoals: state.savingsGoals,
        journalEntries: state.journalEntries,
        panicEvents: state.panicEvents,
        chatMessages: state.chatMessages,
        testimonials: state.testimonials,
        forumPosts: state.forumPosts,
        blockedSites: state.blockedSites,
        blockerEnabled: state.blockerEnabled,
        strictMode: state.strictMode,
        strictUntil: state.strictUntil,
        unlockedRanks: state.unlockedRanks,
        anonymousMode: state.anonymousMode,
        themeMode: state.themeMode,
        starfieldIntensity: state.starfieldIntensity,
        glassEffect: state.glassEffect,
        notificationPrefs: state.notificationPrefs,
        notificationTime: state.notificationTime,
        appLock: state.appLock,
        discreteMode: state.discreteMode,
        autoLockMinutes: state.autoLockMinutes,
        soundEnabled: state.soundEnabled,
        hapticsEnabled: state.hapticsEnabled,
        volume: state.volume,
        lastCheckInDate: state.lastCheckInDate,
        todayMood: state.todayMood,
        todayCraving: state.todayCraving,
        trustedContacts: state.trustedContacts,
        notifications: state.notifications,
        meditationStreak: state.meditationStreak,
        lastMeditationDate: state.lastMeditationDate,
        avatarColor: state.avatarColor,
        profilePhoto: state.profilePhoto,
        articlesRead: state.articlesRead,
        xp: state.xp,
        level: state.level,
        dailyQuests: state.dailyQuests,
        lastQuestReset: state.lastQuestReset,
        challengeCompletedDate: state.challengeCompletedDate,
        challengeStreak: state.challengeStreak,
        xpHistory: state.xpHistory,
        hasSeenTutorial: state.hasSeenTutorial,
        programTasksCompleted: state.programTasksCompleted,
        programLastReset: state.programLastReset,
        withdrawalSymptoms: state.withdrawalSymptoms,
        triggers: state.triggers,
        lifeGoals: state.lifeGoals,
        celebratedMilestones: state.celebratedMilestones,
        relapseHistory: state.relapseHistory,
        currentRelapseProtocol: state.currentRelapseProtocol,
        favoriteAffirmations: state.favoriteAffirmations,
        customAffirmations: state.customAffirmations,
        streakHistory: state.streakHistory,
        notificationPreferences: state.notificationPreferences,
        notificationPermission: state.notificationPermission,
        pwaInstalled: state.pwaInstalled,
        chatNickname: state.chatNickname,
        chatRoomMessages: state.chatRoomMessages,
        currency: state.currency,
        customWeeklyBet: state.customWeeklyBet,
        atlasUsage: state.atlasUsage,
        journalUsage: state.journalUsage,
        chatUsage: state.chatUsage,
        lastSyncAt: state.lastSyncAt,
      }),
    }
  )
);
