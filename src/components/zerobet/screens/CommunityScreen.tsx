"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ChevronLeft, ChevronDown, Heart, MessageCircle, Flame, BadgeCheck, Plus, X,
  MessageSquare, Users, GraduationCap, ShieldCheck, Star, Clock,
  Trophy, Lock, Send, Globe, Sparkles, Stethoscope, Crown,
  TrendingUp, Zap, Share2,
} from "lucide-react";
import { useStore, type Testimonial, type ForumPost, type ForumReply } from "@/store/zerobet-store";
import { useT, useLanguage } from "@/lib/i18n/useT";
import {
  SEED_TESTIMONIALS, SEED_MENTORS, SEED_PSYCHOLOGISTS,
  type SeedPsychologist,
} from "@/lib/data/community-data";
import {
  isOnlineFromSeed,
  getResponseTime,
  QUICK_REPLIES,
} from "@/lib/data/search-data";
import { formatCurrency, getCurrency } from "@/lib/data/currency-data";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { ListSkeleton } from "@/components/zerobet/components/Skeletons";
import JourneyShareModal from "@/components/zerobet/components/JourneyShareModal";
import type { JourneyCardData } from "@/lib/share-card";
import { getCurrentRank } from "@/lib/data/parcours-data";
import { PullToRefresh } from "@/components/zerobet/components/PullToRefresh";
import { EmptyState } from "@/components/zerobet/components/EmptyState";
import {
  containerVariants,
  itemVariants,
} from "@/lib/animations";

// Map our internal `Language` union to BCP-47 locale codes accepted by Intl.
const INTL_LOCALES: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
  es: "es-ES",
};

type Translate = (key: string, params?: Record<string, string | number>) => string;

/**
 * Locale-aware relative time formatter.
 * Replaces the previous hardcoded French strings ("à l'instant", "il y a 1 j", ...).
 * Uses existing `justNow` / `minutesAgo` / `hoursAgo` / `daysAgo` keys for the
 * generic cases, plus a separate `communityDayAgo` key for the day === 1
 * singular form ("1 day ago" vs "{n} days ago").
 */
function formatRelative(iso: string, t: Translate, language: string): string {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return t("communityJustNow");
  if (min < 60) return t("minutesAgo", { n: min });
  const hr = Math.floor(min / 60);
  if (hr < 24) return t("hoursAgo", { n: hr });
  const day = Math.floor(hr / 24);
  if (day === 1) return t("communityDayAgo");
  if (day < 7) return t("daysAgo", { n: day });
  const locale = INTL_LOCALES[language] ?? "fr-FR";
  try {
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(d);
  } catch {
    return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(d);
  }
}

/**
 * Render a FCFA amount in the user's selected currency.
 * Replaces the previous `formatPrice` helper which always rendered in FCFA.
 */
function formatPrice(fcfa: number, currency: string): string {
  return formatCurrency(fcfa, currency as Parameters<typeof formatCurrency>[1]);
}

/**
 * Returns the translated country name from a 2-letter ISO code (ci, sn, ml, ...).
 * Falls back to the raw code if the dictionary key is missing.
 */
function getCountryName(code: string | undefined, t: Translate): string | undefined {
  if (!code) return undefined;
  const key = `country${code.toUpperCase()}`;
  const translated = t(key);
  // `t()` returns the raw key when the lookup fails — fall back to the code.
  return translated === key ? code : translated;
}

type TabKey = "testimonials" | "forum" | "mentors" | "psychologists";

const TABS: { key: TabKey; labelKey: string; icon: typeof Heart }[] = [
  { key: "testimonials", labelKey: "communityTestimonials", icon: MessageSquare },
  { key: "forum", labelKey: "communityForum", icon: Users },
  { key: "mentors", labelKey: "communityMentors", icon: ShieldCheck },
  { key: "psychologists", labelKey: "communityPsychologists", icon: GraduationCap },
];

// Zerobet 2.0 — live-chat entry pill (navigates to its own screen).
const CHAT_TAB = { labelKey: "communityTabChat", icon: MessageCircle };

const FORUM_CATEGORIES: {
  key: ForumPost["category"]; labelKey: string; color: string; emoji: string;
}[] = [
  { key: "success", labelKey: "communityCategorySuccess", color: "#4ADE80", emoji: "🎉" },
  { key: "struggle", labelKey: "communityCategoryStruggle", color: "#FF3B30", emoji: "💪" },
  { key: "motivation", labelKey: "communityCategoryMotivation", color: "#F59E0B", emoji: "🔥" },
  { key: "question", labelKey: "communityCategoryQuestion", color: "#2DD4BF", emoji: "❓" },
];

const CATEGORY_BY_KEY = Object.fromEntries(
  FORUM_CATEGORIES.map((c) => [c.key, c])
) as Record<ForumPost["category"], (typeof FORUM_CATEGORIES)[number]>;

type ForumSortKey = "recent" | "popular" | "unanswered";
const FORUM_SORTS: { key: ForumSortKey; labelKey: string; icon: typeof Clock }[] = [
  { key: "recent", labelKey: "communitySortRecent", icon: Clock },
  { key: "popular", labelKey: "communitySortPopular", icon: TrendingUp },
  { key: "unanswered", labelKey: "communitySortUnanswered", icon: MessageCircle },
];

type TestimonialFilterKey = "all" | "verified" | "100plus" | "365";
const TESTIMONIAL_FILTERS: { key: TestimonialFilterKey; labelKey: string }[] = [
  { key: "all", labelKey: "communityFilterAll" },
  { key: "verified", labelKey: "communityFilterVerified" },
  { key: "100plus", labelKey: "communityFilter100Days" },
  { key: "365", labelKey: "communityFilter365Days" },
];

// Pre-computed deterministic online status for seed mentors & psychologists (70% online)
const MENTOR_ONLINE: Record<string, boolean> = Object.fromEntries(
  SEED_MENTORS.map((m) => [m.displayName, isOnlineFromSeed(`mentor-${m.displayName}`)])
);
const PSY_ONLINE: Record<string, boolean> = Object.fromEntries(
  SEED_PSYCHOLOGISTS.map((p) => [p.license, isOnlineFromSeed(`psy-${p.license}`)])
);

// Seed forum posts (displayed when store is empty / merged with user posts).
//
// Note (Task 18-b): seed posts store i18n KEYS in `title` / `content`
// (resolved at render time via `t(post.title)` / `t(post.content)`).
// User-submitted posts store the raw text directly. We detect seed posts
// by their `seed-f-` ID prefix and branch in the ForumTab render.
// Seed replies do the same: a `seed-f-*-r*` reply stores a translation key
// in its `content` field (e.g. `forumSeed0Reply0`).
const SEED_FORUM_POSTS: ForumPost[] = [
  {
    id: "seed-f-0",
    authorName: "Moussa D.",
    authorStreak: 187,
    category: "success",
    title: "forumSeed0Title",
    content: "forumSeed0Content",
    likes: 24,
    replies: [
      {
        id: "seed-f-0-r1",
        authorName: "Karim L.",
        isMentor: true,
        content: "forumSeed0Reply0",
        likes: 5,
        createdAt: new Date(Date.now() - 3600_000).toISOString(),
      },
    ],
    liked: false,
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
  },
  {
    id: "seed-f-1",
    authorName: "Awa N.",
    authorStreak: 156,
    category: "struggle",
    title: "forumSeed1Title",
    content: "forumSeed1Content",
    likes: 12,
    replies: [],
    liked: false,
    createdAt: new Date(Date.now() - 14400_000).toISOString(),
  },
  {
    id: "seed-f-2",
    authorName: "Cheikh D.",
    authorStreak: 410,
    category: "motivation",
    title: "forumSeed2Title",
    content: "forumSeed2Content",
    likes: 58,
    replies: [],
    liked: false,
    createdAt: new Date(Date.now() - 86400_000).toISOString(),
  },
];

// Convert seed testimonials to the store Testimonial shape.
// Note (Task 18-b): we store the translation KEYS in `title` / `content`
// and resolve them at render time via `t(testimonial.title)`. The amount
// (if any) is stashed in a side-table keyed by the seed ID so testimonials
// that mention money can be re-rendered in the user's selected currency.
const SEED_AS_TESTIMONIALS: Testimonial[] = SEED_TESTIMONIALS.map((s) => ({
  id: s.id,
  authorName: s.authorName,
  authorAge: s.authorAge,
  authorCountry: s.authorCountry, // ISO 3166-1 alpha-2 code
  streakDays: s.streakDays,
  title: s.titleKey, // translation key (resolved at render)
  content: s.bodyKey, // translation key (resolved at render)
  isVerified: s.isVerified,
  isAnonymous: false,
  isMine: false,
  likes: s.likes,
  liked: false,
  replies: [],
  createdAt: s.createdAt,
}));

// Side-table of FCFA amounts for seed testimonials that mention money.
// Used at render time to interpolate `{amount}` in the bodyKey with the
// user's selected currency via `formatCurrency`.
const SEED_AMOUNT_FCFA: Record<string, number> = Object.fromEntries(
  SEED_TESTIMONIALS
    .filter((s) => s.amountFCFA !== undefined)
    .map((s) => [s.id, s.amountFCFA as number])
);

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "?";
  const first = parts[0][0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}

// ========================================
// AVATAR
// ========================================
function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = getInitials(name);
  // deterministic gradient from name
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const grads = [
    "linear-gradient(135deg, #FF3B30, #F59E0B)",
    "linear-gradient(135deg, #4ADE80, #2DD4BF)",
    "linear-gradient(135deg, #C084FC, #FF3B30)",
    "linear-gradient(135deg, #2DD4BF, #2DD4BF)",
    "linear-gradient(135deg, #F59E0B, #FBBF24)",
    "linear-gradient(135deg, #4ADE80, #FBBF24)",
  ];
  const grad = grads[hash % grads.length];
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white shrink-0"
      style={{ width: size, height: size, background: grad, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

// ========================================
// STAR RATING
// ========================================
function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= Math.round(rating) ? "text-[#FBBF24] fill-[#FBBF24]" : "text-white/20"}
        />
      ))}
      <span className="text-white/70 text-xs ml-1 font-semibold">{rating.toFixed(1)}</span>
    </div>
  );
}

// ========================================
// COUNT-UP HOOK
// ========================================
function useCountUp(target: number, duration = 1200): number {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

// ========================================
// COMMUNITY STATS BANNER
// ========================================
function CommunityStatsBanner() {
  const t = useT();
  const language = useLanguage();
  const members = useCountUp(12847);
  const cumulativeDays = useCountUp(2341);
  const verifiedTestimonials = useCountUp(847);
  const locale = INTL_LOCALES[language] ?? "fr-FR";
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong p-4 mb-4 relative overflow-hidden"
    >
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#F59E0B]/15 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#4ADE80]/10 blur-3xl" />
      <div className="relative grid grid-cols-3 gap-2 text-center">
        <StatItem
          value={members.toLocaleString(locale)}
          label={t("communityMembers")}
          emoji="👥"
        />
        <StatItem
          value={cumulativeDays.toLocaleString(locale)}
          label={t("communityCumulativeDays")}
          emoji="🔥"
        />
        <StatItem
          value={verifiedTestimonials.toLocaleString(locale)}
          label={t("communityVerifiedTestimonials")}
          emoji="✅"
        />
      </div>
    </motion.div>
  );
}

function StatItem({ value, label, emoji }: { value: string; label: string; emoji: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg mb-0.5">{emoji}</div>
      <div className="text-base font-extrabold gradient-primary-text font-[family-name:var(--font-poppins)] leading-tight">
        {value}
      </div>
      <div className="text-white/50 text-[10px] leading-tight">{label}</div>
    </div>
  );
}

// ========================================
// PREMIUM LOCK SCREEN
// ========================================
function PremiumLock({
  featureName, description, onCta,
}: { featureName: string; description: string; onCta: () => void }) {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-6 pt-16 pb-12 flex flex-col items-center justify-center text-center min-h-[60vh]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-4 glow-green"
      >
        <Lock className="text-white" size={32} />
      </motion.div>
      <h2 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-poppins)]">
        {featureName} <span className="gradient-primary-text">Premium</span>
      </h2>
      <p className="text-white/60 text-sm mb-6 max-w-xs leading-relaxed">{description}</p>
      <button
        onClick={onCta}
        className="w-full max-w-xs py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold glow-green active:scale-[0.98] transition-transform"
      >
        {t("upgrade")}
      </button>
    </motion.div>
  );
}

// ========================================
// MAIN COMPONENT
// ========================================
export function CommunityScreen() {
  const t = useT();
  const language = useLanguage();
  const {
    testimonials, addTestimonial, toggleTestimonialLike, addTestimonialReply,
    forumPosts, addForumPost, toggleForumLike, addForumReply,
    plan, navigate, anonymousMode, streakDays, adminStreakOverride, currency,
    weeklyBetAmount, xp, level, journalEntries,
  } = useStore();

  const isPremium = plan !== "free";
  const effectiveStreak = adminStreakOverride !== null ? adminStreakOverride : streakDays;

  const [activeTab, setActiveTab] = useState<TabKey>("testimonials");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setRefreshing(false);
  };

  // Testimonial modal state
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [tTitle, setTTitle] = useState("");
  const [tContent, setTContent] = useState("");
  const [tAnonymous, setTAnonymous] = useState(false);

  // Reply state (per testimonial)
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Forum modal state
  const [showForumModal, setShowForumModal] = useState(false);
  const [fCategory, setFCategory] = useState<ForumPost["category"]>("motivation");
  const [fTitle, setFTitle] = useState("");
  const [fContent, setFContent] = useState("");

  // Psychologist reservation modal
  const [reservingPsy, setReservingPsy] = useState<SeedPsychologist | null>(null);

  // Merged data
  const allTestimonials = useMemo(
    () => [...testimonials, ...SEED_AS_TESTIMONIALS],
    [testimonials]
  );

  const allForumPosts = useMemo(
    () => [...forumPosts, ...SEED_FORUM_POSTS],
    [forumPosts]
  );

  // Mentor progress to 90 days
  const mentorProgress = Math.min(100, (effectiveStreak / 90) * 100);

  // Zerobet 2.0.8 — journey card share (banner + modal)
  const [journeyOpen, setJourneyOpen] = useState(false);
  const journeyData = useMemo<JourneyCardData>(() => {
    const fmt = new Intl.NumberFormat(
      language === "en" ? "en-US" : language === "es" ? "es-ES" : "fr-FR"
    );
    const rank = getCurrentRank(effectiveStreak);
    const saved = Math.round(effectiveStreak * Math.round(weeklyBetAmount / 7));
    const info = getCurrency(currency);
    const savedValue =
      info.position === "before"
        ? `${info.symbol} ${fmt.format(saved)}`
        : `${fmt.format(saved)} ${info.symbol}`;
    return {
      days: effectiveStreak,
      headerLabel: t("journeyCardHeader"),
      daysLabel: t("journeyCardDaysLabel"),
      savedLine: t("journeyCardSavedLine", { n: savedValue }),
      accent: rank.color,
      stats: [
        { emoji: "🏅", label: t("journeyStatRank"), value: t(rank.nameKey) },
        {
          emoji: "⚡",
          label: t("journeyStatLevel"),
          value: t("journeyStatLevelValue", { level: String(level), xp: fmt.format(xp) }),
        },
        { emoji: "📖", label: t("journeyStatJournal"), value: t("journeyStatJournalValue", { n: journalEntries.length }) },
      ],
      tagline: t("journeyCardTagline"),
    };
  }, [effectiveStreak, weeklyBetAmount, currency, level, xp, journalEntries.length, t, language]);

  // Handlers
  const handleTestimonialSubmit = () => {
    if (!tTitle.trim() || !tContent.trim()) return;
    const useAnon = anonymousMode || tAnonymous;
    addTestimonial({
      authorName: useAnon ? t("communityAnonymous") : (useStore.getState().name || t("me")),
      authorAge: undefined,
      authorCountry: undefined,
      streakDays: effectiveStreak,
      title: tTitle.trim(),
      content: tContent.trim(),
      isVerified: false,
      isAnonymous: useAnon,
      isMine: true,
    });
    setTTitle("");
    setTContent("");
    setTAnonymous(false);
    setShowTestimonialModal(false);
    toast.success(t("communityTestimonialPublishedToast"), {
      description: t("communityTestimonialPublishedToastDesc"),
    });
  };

  const handleReplySubmit = (testimonialId: string) => {
    if (!replyText.trim()) return;
    const useAnon = anonymousMode;
    const reply: Omit<ForumReply, "id" | "createdAt" | "likes"> = {
      authorName: useAnon ? t("communityAnonymous") : (useStore.getState().name || t("me")),
      content: replyText.trim(),
    };
    addTestimonialReply(testimonialId, reply);
    setReplyText("");
    setReplyingTo(null);
    toast.success(t("communityReplyPublishedToast"));
  };

  // Forum reply state (per post)
  const [forumReplyingTo, setForumReplyingTo] = useState<string | null>(null);
  const [forumReplyText, setForumReplyText] = useState("");

  const handleForumReplySubmit = (postId: string) => {
    if (!forumReplyText.trim()) return;
    const useAnon = anonymousMode;
    const reply: Omit<ForumReply, "id" | "createdAt" | "likes"> = {
      authorName: useAnon ? t("communityAnonymous") : (useStore.getState().name || t("me")),
      content: forumReplyText.trim(),
    };
    addForumReply(postId, reply);
    setForumReplyText("");
    setForumReplyingTo(null);
    toast.success(t("communityReplyPublishedToast"));
  };

  const handleForumSubmit = () => {
    if (!fTitle.trim() || !fContent.trim()) return;
    const useAnon = anonymousMode;
    addForumPost({
      authorName: useAnon ? t("communityAnonymous") : (useStore.getState().name || t("me")),
      authorStreak: effectiveStreak,
      category: fCategory,
      title: fTitle.trim(),
      content: fContent.trim(),
    });
    setFTitle("");
    setFContent("");
    setFCategory("motivation");
    setShowForumModal(false);
    toast.success(t("communityForumPostedToast"), {
      description: t("communityForumPostedToastDesc"),
    });
  };

  const handleContactMentor = (name: string) => {
    toast.success(t("communityMentorRequestToast", { name }), {
      description: t("communityMentorRequestToastDesc"),
    });
  };

  const handleReserveSession = (psy: SeedPsychologist) => {
    setReservingPsy(null);
    toast.success(t("communitySessionReservedToast", { name: psy.displayName }), {
      description: t("communitySessionReservedToastDesc", { price: formatPrice(psy.sessionPrice, currency) }),
    });
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="px-5 pt-12 pb-3 sticky top-0 z-20 backdrop-blur-xl bg-[#070B0E]/70">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("dashboard")}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
            aria-label={t("back")}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)] tracking-tight">
              {t("communityTitle")}
            </h1>
            <p className="text-white/50 text-xs flex items-center gap-1">
              <Users size={11} />
              {t("communitySubtitle")}
            </p>
          </div>
          {!isPremium && (
            <button
              onClick={() => navigate("paywall")}
              className="px-3 py-1.5 rounded-full gradient-primary text-white text-[11px] font-semibold flex items-center gap-1 glow-green active:scale-95 transition-transform"
            >
              <Crown size={12} />
              {t("settingsPlanPremium")}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
          {/* Zerobet 2.0 — live chat entry (own screen, opens overlay-style) */}
          <button
            onClick={() => {
              sound.playClick();
              haptics.light();
              navigate("community-chat");
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 gradient-gold text-[#1a1200]"
            aria-label={t(CHAT_TAB.labelKey)}
          >
            <CHAT_TAB.icon size={14} />
            {t(CHAT_TAB.labelKey)}
          </button>
          {TABS.map((tab) => {
            const active = activeTab === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  active
                    ? "gradient-primary text-white glow-green"
                    : "glass-card text-white/60"
                }`}
              >
                <Icon size={14} />
                {t(tab.labelKey)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Community Stats Banner */}
      <PullToRefresh onRefresh={handleRefresh} isRefreshing={refreshing}>
      <div className="px-5 mt-3">
        <CommunityStatsBanner />
      </div>

      {/* Tab content */}
      <div className="px-5 mt-4">
        <AnimatePresence mode="wait">
          {activeTab === "testimonials" && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Zerobet 2.0.8 — "Mon parcours" share banner */}
              <div className="relative overflow-hidden rounded-3xl mb-4 p-4 glass-card">
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#F59E0B]/15 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#10B981]/15 blur-2xl pointer-events-none" />
                <div className="relative flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl gradient-gold glow-green flex items-center justify-center flex-shrink-0">
                    <Share2 size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                      {t("journeyBannerTitle")}
                    </p>
                    <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                      {t("journeyBannerSubtitle")}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      haptics.light();
                      setJourneyOpen(true);
                    }}
                    className="px-4 py-2 rounded-full gradient-primary glow-green text-white text-xs font-bold flex-shrink-0 transition-transform active:scale-95"
                  >
                    {t("journeyBannerCta")}
                  </button>
                </div>
              </div>
              <TestimonialsTab
                testimonials={allTestimonials}
                isPremium={isPremium}
                anonymousMode={anonymousMode}
                onWrite={() => setShowTestimonialModal(true)}
                onLike={toggleTestimonialLike}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
                replyText={replyText}
                setReplyText={setReplyText}
                onSubmitReply={handleReplySubmit}
                onGoPremium={() => navigate("paywall")}
              />
            </motion.div>
          )}

          {activeTab === "forum" && (
            <motion.div
              key="forum"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Zerobet 2.0 — forum reading & replies are free; creating a
                  new post is the premium action (acquisition funnel). */}
              <ForumTab
                posts={allForumPosts}
                onNew={() =>
                  isPremium ? setShowForumModal(true) : navigate("paywall")
                }
                onLike={toggleForumLike}
                forumReplyingTo={forumReplyingTo}
                setForumReplyingTo={setForumReplyingTo}
                forumReplyText={forumReplyText}
                setForumReplyText={setForumReplyText}
                onSubmitForumReply={(id) =>
                  isPremium
                    ? handleForumReplySubmit(id)
                    : navigate("paywall")
                }
              />
            </motion.div>
          )}

          {activeTab === "mentors" && (
            <motion.div
              key="mentors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {!isPremium ? (
                <PremiumLock
                  featureName={t("communityMentors")}
                  description={t("communityMentorsLockDesc")}
                  onCta={() => navigate("paywall")}
                />
              ) : (
                <MentorsTab
                  effectiveStreak={effectiveStreak}
                  mentorProgress={mentorProgress}
                  onContact={handleContactMentor}
                />
              )}
            </motion.div>
          )}

          {activeTab === "psychologists" && (
            <motion.div
              key="psychologists"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {!isPremium ? (
                <PremiumLock
                  featureName={t("communityPsychologists")}
                  description={t("communityPsychologistsLockDesc")}
                  onCta={() => navigate("paywall")}
                />
              ) : (
                <PsychologistsTab onReserve={setReservingPsy} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </PullToRefresh>

      {/* ========================================
          TÉMOIGNAGE MODAL
          ======================================== */}
      <AnimatePresence>
        {showTestimonialModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTestimonialModal(false)}
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
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)]">
                  {t("communityMyTestimonial")}
                </h3>
                <button
                  onClick={() => setShowTestimonialModal(false)}
                  className="w-8 h-8 rounded-full glass-card flex items-center justify-center"
                  aria-label={t("close")}
                >
                  <X size={16} className="text-white/60" />
                </button>
              </div>

              <label className="text-white/60 text-xs mb-2 block">{t("communityTitleLabel")}</label>
              <input
                value={tTitle}
                onChange={(e) => setTTitle(e.target.value)}
                placeholder={t("communityTestimonialTitlePlaceholder")}
                maxLength={80}
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#10B981] mb-4"
              />

              <label className="text-white/60 text-xs mb-2 block">{t("communityYourStory")}</label>
              <textarea
                value={tContent}
                onChange={(e) => setTContent(e.target.value)}
                placeholder={t("communityYourStoryPlaceholder")}
                rows={5}
                maxLength={1000}
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#10B981] resize-none mb-4"
              />
              <div className="text-right text-white/30 text-xs mb-4">{tContent.length}/1000</div>

              <label className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={tAnonymous}
                  onChange={(e) => setTAnonymous(e.target.checked)}
                  className="w-4 h-4 accent-[#FF3B30]"
                />
                <div>
                  <div className="text-white text-sm font-medium">{t("communityPublishAnonymous")}</div>
                  <div className="text-white/40 text-xs">
                    {t("communityPublishAnonymousDesc")}
                  </div>
                </div>
              </label>

              {anonymousMode && (
                <div className="text-[11px] text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl px-3 py-2 mb-4">
                  {t("communityAnonymousModeActive")}
                </div>
              )}

              <button
                onClick={handleTestimonialSubmit}
                disabled={!tTitle.trim() || !tContent.trim()}
                className={`w-full py-4 rounded-2xl font-[family-name:var(--font-poppins)] font-semibold text-base transition-all ${
                  tTitle.trim() && tContent.trim()
                    ? "gradient-primary text-white glow-green active:scale-[0.98]"
                    : "bg-white/5 text-white/30"
                }`}
              >
                {t("communityPublishMyTestimonial")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================
          FORUM MODAL
          ======================================== */}
      <AnimatePresence>
        {showForumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForumModal(false)}
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
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)]">
                  {t("communityNewTopic")}
                </h3>
                <button
                  onClick={() => setShowForumModal(false)}
                  className="w-8 h-8 rounded-full glass-card flex items-center justify-center"
                  aria-label={t("close")}
                >
                  <X size={16} className="text-white/60" />
                </button>
              </div>

              <label className="text-white/60 text-xs mb-2 block">{t("communityCategoryLabel")}</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {FORUM_CATEGORIES.map((cat) => {
                  const active = fCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setFCategory(cat.key)}
                      className={`p-3 rounded-2xl flex items-center gap-2 border transition-all ${
                        active ? "border-transparent" : "glass-card border-transparent"
                      }`}
                      style={active ? {
                        background: `${cat.color}25`,
                        borderColor: cat.color,
                      } : {}}
                    >
                      <span className="text-xl">{cat.emoji}</span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: active ? cat.color : "rgba(255,255,255,0.6)" }}
                      >
                        {t(cat.labelKey)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <label className="text-white/60 text-xs mb-2 block">{t("communityTitleLabel")}</label>
              <input
                value={fTitle}
                onChange={(e) => setFTitle(e.target.value)}
                placeholder={t("communityForumTitlePlaceholder")}
                maxLength={80}
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#10B981] mb-4"
              />

              <label className="text-white/60 text-xs mb-2 block">{t("communityMessageLabel")}</label>
              <textarea
                value={fContent}
                onChange={(e) => setFContent(e.target.value)}
                placeholder={t("communityForumMessagePlaceholder")}
                rows={5}
                maxLength={1500}
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#10B981] resize-none mb-4"
              />
              <div className="text-right text-white/30 text-xs mb-4">{fContent.length}/1500</div>

              <button
                onClick={handleForumSubmit}
                disabled={!fTitle.trim() || !fContent.trim()}
                className={`w-full py-4 rounded-2xl font-[family-name:var(--font-poppins)] font-semibold text-base transition-all ${
                  fTitle.trim() && fContent.trim()
                    ? "gradient-primary text-white glow-green active:scale-[0.98]"
                    : "bg-white/5 text-white/30"
                }`}
              >
                {t("communityPublishTopic")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zerobet 2.0.8 — journey card share modal */}
      <JourneyShareModal open={journeyOpen} onClose={() => setJourneyOpen(false)} data={journeyData} />

      {/* ========================================
          PSYCHOLOGIST RESERVATION MODAL
          ======================================== */}
      <AnimatePresence>
        {reservingPsy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReservingPsy(null)}
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
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)]">
                  {t("communityReserveSession")}
                </h3>
                <button
                  onClick={() => setReservingPsy(null)}
                  className="w-8 h-8 rounded-full glass-card flex items-center justify-center"
                  aria-label={t("close")}
                >
                  <X size={16} className="text-white/60" />
                </button>
              </div>

              <div className="glass-card p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={reservingPsy.displayName} size={48} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-semibold text-sm truncate">
                        {reservingPsy.displayName}
                      </span>
                      <BadgeCheck size={14} className="text-[#2DD4BF] shrink-0" />
                    </div>
                    <p className="text-white/50 text-xs truncate">{reservingPsy.specialty}</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/50">{t("communityLicense")}</span>
                    <span className="text-white/80 font-mono">{reservingPsy.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">{t("communityCountry")}</span>
                    <span className="text-white/80">{reservingPsy.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">{t("communityDuration")}</span>
                    <span className="text-white/80">{t("communityDurationMinutes")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">{t("communityFormat")}</span>
                    <span className="text-white/80">{t("communitySecureVideo")}</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 mb-4 flex items-center justify-between">
                <div>
                  <p className="text-white/50 text-xs">{t("communitySessionPrice")}</p>
                  <p className="text-2xl font-bold gradient-primary-text font-[family-name:var(--font-poppins)]">
                    {formatPrice(reservingPsy.sessionPrice, currency)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-xs">{t("communityRating")}</p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-[#FBBF24] fill-[#FBBF24]" />
                    <span className="text-white font-bold text-sm">
                      {reservingPsy.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-white/40 bg-white/5 border border-white/10 rounded-xl px-3 py-2 mb-4">
                {t("communityPaymentInfo")}
              </div>

              <button
                onClick={() => handleReserveSession(reservingPsy)}
                className="w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold glow-green active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
              >
                <Stethoscope size={18} />
                {t("communityConfirm")} — {formatPrice(reservingPsy.sessionPrice, currency)}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ========================================
// TAB 1: TÉMOIGNAGES
// ========================================
function TestimonialsTab({
  testimonials, isPremium, anonymousMode, onWrite, onLike,
  replyingTo, setReplyingTo, replyText, setReplyText, onSubmitReply, onGoPremium,
}: {
  testimonials: Testimonial[];
  isPremium: boolean;
  anonymousMode: boolean;
  onWrite: () => void;
  onLike: (id: string) => void;
  replyingTo: string | null;
  setReplyingTo: (id: string | null) => void;
  replyText: string;
  setReplyText: (s: string) => void;
  onSubmitReply: (id: string) => void;
  onGoPremium: () => void;
}) {
  const t = useT();
  const language = useLanguage();
  const currency = useStore((s) => s.currency);
  const FREE_LIMIT = 5;
  const PAGE_SIZE = 6;
  const [filter, setFilter] = useState<TestimonialFilterKey>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(timer);
  }, []);
  // Reset pagination whenever the filter changes (handler-based, no effect)
  const handleFilterChange = (f: TestimonialFilterKey) => {
    setFilter(f);
    setVisibleCount(PAGE_SIZE);
  };

  const filtered = useMemo(() => {
    return testimonials.filter((tm) => {
      if (filter === "verified") return tm.isVerified;
      if (filter === "100plus") return tm.streakDays >= 100;
      if (filter === "365") return tm.streakDays >= 365;
      return true;
    });
  }, [testimonials, filter]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );
  const remaining = filtered.length - visible.length;

  return (
    <div>
      <button
        onClick={onWrite}
        className="w-full mb-4 py-3.5 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold flex items-center justify-center gap-2 glow-green active:scale-[0.98] transition-transform"
      >
        <Plus size={18} />
        {t("communityWriteTestimonial")}
      </button>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
        {TESTIMONIAL_FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => handleFilterChange(f.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${
                active ? "gradient-primary text-white" : "glass-card text-white/60"
              }`}
            >
              {f.key === "365"
                ? t("communityFilter365Days")
                : t(f.labelKey)}
            </button>
          );
        })}
      </div>

      {loading ? (
        <ListSkeleton count={3} />
      ) : (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {visible.map((testimonial, idx) => {
          const isLocked = !isPremium && idx >= FREE_LIMIT;
          // Seed testimonials store translation keys in `title` / `content`.
          // User-submitted testimonials store the raw text directly.
          const isSeed = testimonial.id.startsWith("seed-t-");
          const titleText = isSeed ? t(testimonial.title) : testimonial.title;
          const bodyText = isSeed
            ? (SEED_AMOUNT_FCFA[testimonial.id] !== undefined
                ? t(testimonial.content, {
                    amount: formatCurrency(SEED_AMOUNT_FCFA[testimonial.id], currency),
                  })
                : t(testimonial.content))
            : testimonial.content;
          const countryName = isSeed
            ? getCountryName(testimonial.authorCountry, t)
            : testimonial.authorCountry;
          return (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="relative"
            >
              <div className={`glass-card card-hover p-4 ${isLocked ? "blur-md pointer-events-none select-none" : ""}`}>
                {/* Author header */}
                <div className="flex items-start gap-3 mb-3">
                  <Avatar name={testimonial.isAnonymous ? t("communityAnonymous") : testimonial.authorName} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.isAnonymous ? t("communityAnonymous") : testimonial.authorName}
                      </span>
                      {testimonial.isVerified && (
                        <BadgeCheck size={14} className="text-[#2DD4BF]" />
                      )}
                      {testimonial.isMine && (
                        <span className="px-2 py-0.5 rounded-full bg-[#FF3B30]/20 text-[#FF3B30] text-[10px] font-bold">
                          {t("communityMyTestimonial")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-xs mt-0.5 flex-wrap">
                      {!testimonial.isAnonymous && testimonial.authorAge && (
                        <span>{testimonial.authorAge} {t("yearsOld")}</span>
                      )}
                      {!testimonial.isAnonymous && countryName && (
                        <span className="flex items-center gap-0.5">
                          <Globe size={10} />
                          {countryName}
                        </span>
                      )}
                      <span className="flex items-center gap-0.5 text-[#F59E0B]">
                        <Flame size={11} />
                        {testimonial.streakDays} {t("dayShort")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title + content */}
                <h3 className="text-white font-bold text-base font-[family-name:var(--font-poppins)] mb-1.5">
                  {titleText}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-3">{bodyText}</p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  <button
                    onClick={() => onLike(testimonial.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
                      testimonial.liked
                        ? "bg-[#FF3B30]/20 text-[#FF3B30]"
                        : "glass-pill text-white/60"
                    }`}
                  >
                    <Heart size={14} className={testimonial.liked ? "fill-[#FF3B30]" : ""} />
                    {testimonial.likes}
                  </button>
                  <button
                    onClick={() => setReplyingTo(replyingTo === testimonial.id ? null : testimonial.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-white/60 text-xs font-medium active:scale-95 transition-transform"
                  >
                    <MessageCircle size={14} />
                    {testimonial.replies.length}
                  </button>
                  <span className="ml-auto text-white/30 text-xs">{formatRelative(testimonial.createdAt, t, language)}</span>
                </div>

                {/* Replies */}
                {testimonial.replies.length > 0 && (
                  <div className="mt-3 space-y-2 pl-2 border-l-2 border-white/5">
                    {testimonial.replies.map((r) => (
                      <div key={r.id} className="flex items-start gap-2">
                        <Avatar name={r.authorName} size={28} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-white text-xs font-semibold">{r.authorName}</span>
                            {r.isMentor && (
                              <span className="px-1.5 py-0.5 rounded-full bg-[#4ADE80]/20 text-[#4ADE80] text-[9px] font-bold">
                                {t("mentorBadge")}
                              </span>
                            )}
                            {r.isPsychologist && (
                              <span className="px-1.5 py-0.5 rounded-full bg-[#C084FC]/20 text-[#C084FC] text-[9px] font-bold">
                                {t("psyBadge")}
                              </span>
                            )}
                          </div>
                          <p className="text-white/70 text-xs leading-relaxed">{r.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline reply input */}
                <AnimatePresence>
                  {replyingTo === testimonial.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-3"
                    >
                      {/* Quick reply suggestions */}
                      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                        <span className="text-white/40 text-[10px] mr-1">{t("communityQuickReplies")}</span>
                        {QUICK_REPLIES.map((qr) => (
                          <button
                            key={qr}
                            onClick={() => setReplyText(qr)}
                            className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] hover:text-white hover:border-white/20 active:scale-95 transition-all"
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={t("communityReplyPlaceholder")}
                          className="flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#10B981]"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") onSubmitReply(testimonial.id);
                          }}
                        />
                        <button
                          onClick={() => onSubmitReply(testimonial.id)}
                          disabled={!replyText.trim()}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                            replyText.trim()
                              ? "gradient-primary text-white active:scale-95"
                              : "bg-white/5 text-white/30"
                          }`}
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Premium blur overlay */}
              {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center rounded-3xl bg-[#070B0E]/40">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-2 glow-green">
                    <Lock size={20} className="text-white" />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1 font-[family-name:var(--font-poppins)]">
                    {t("communityUnlockWithPremium")}
                  </p>
                  <p className="text-white/50 text-xs mb-3 max-w-[200px]">
                    {t("communityUnlockTestimonialsDesc")}
                  </p>
                  <button
                    onClick={onGoPremium}
                    className="px-4 py-2 rounded-full gradient-primary text-white text-xs font-semibold active:scale-95 transition-transform"
                  >
                    {t("upgrade")}
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
      )}

      {/* Load more (pagination) — shown when more items exist beyond the
          current page, regardless of plan; free-gating still applies above. */}
      {remaining > 0 && (
        <div className="text-center mt-5">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="px-5 py-2.5 rounded-full glass-card text-white/80 hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 border border-white/10 hover:border-[#10B981]/40 transition-colors"
          >
            <ChevronDown size={14} />
            {t("communityLoadMore", { n: remaining })}
          </motion.button>
        </div>
      )}

      {!isPremium && filtered.length > FREE_LIMIT && (
        <div className="text-center mt-6">
          <p className="text-white/40 text-xs">
            {t("communityMoreTestimonialsPremium", { count: filtered.length - FREE_LIMIT })}
          </p>
        </div>
      )}
    </div>
  );
}

// ========================================
// TAB 2: FORUM
// ========================================
function ForumTab({
  posts, onNew, onLike,
  forumReplyingTo, setForumReplyingTo, forumReplyText, setForumReplyText, onSubmitForumReply,
}: {
  posts: ForumPost[];
  onNew: () => void;
  onLike: (id: string) => void;
  forumReplyingTo: string | null;
  setForumReplyingTo: (id: string | null) => void;
  forumReplyText: string;
  setForumReplyText: (s: string) => void;
  onSubmitForumReply: (id: string) => void;
}) {
  const [sort, setSort] = useState<ForumSortKey>("recent");
  const [loading, setLoading] = useState(true);
  const t = useT();
  const language = useLanguage();
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(timer);
  }, []);

  const sorted = useMemo(() => {
    const arr = [...posts];
    if (sort === "recent") {
      arr.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sort === "popular") {
      arr.sort((a, b) => b.likes - a.likes);
    } else {
      // unanswered first, then by likes
      arr.sort((a, b) => {
        const aUn = a.replies.length === 0 ? 0 : 1;
        const bUn = b.replies.length === 0 ? 0 : 1;
        if (aUn !== bUn) return aUn - bUn;
        return b.likes - a.likes;
      });
    }
    return arr;
  }, [posts, sort]);

  return (
    <div>
      <button
        onClick={onNew}
        className="w-full mb-4 py-3.5 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold flex items-center justify-center gap-2 glow-green active:scale-[0.98] transition-transform"
      >
        <Plus size={18} />
        {t("communityNewTopic")}
      </button>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-3">
        {FORUM_SORTS.map((s) => {
          const Icon = s.icon;
          const active = sort === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${
                active ? "gradient-primary text-white" : "glass-card text-white/60"
              }`}
            >
              <Icon size={11} />
              {t(s.labelKey)}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
        {FORUM_CATEGORIES.map((cat) => (
          <span
            key={cat.key}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
            style={{ background: `${cat.color}20`, color: cat.color }}
          >
            <span>{cat.emoji}</span>
            {t(cat.labelKey)}
          </span>
        ))}
      </div>

      {loading ? (
        <ListSkeleton count={3} />
      ) : (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {sorted.map((post, idx) => {
          const cat = CATEGORY_BY_KEY[post.category];
          // Seed forum posts (id starts with "seed-f-") store translation keys
          // in `title` / `content` and `replies[].content`. User-submitted
          // posts store raw text directly. We resolve seed posts through `t()`
          // at render time so they follow the user's UI language.
          const isSeedPost = post.id.startsWith("seed-f-");
          const postTitle = isSeedPost ? t(post.title) : post.title;
          const postContent = isSeedPost ? t(post.content) : post.content;
          return (
            <motion.div
              key={post.id}
              variants={itemVariants}
              custom={idx}
              className="glass-card card-hover p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Avatar name={post.authorName} size={32} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white text-xs font-semibold truncate">{post.authorName}</span>
                    <span className="flex items-center gap-0.5 text-[#F59E0B] text-[10px]">
                      <Flame size={10} />
                      {post.authorStreak}{t("dayShort")}
                    </span>
                  </div>
                  <span className="text-white/40 text-[10px]">{formatRelative(post.createdAt, t, language)}</span>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ background: `${cat.color}25`, color: cat.color }}
                >
                  {cat.emoji} {t(cat.labelKey)}
                </span>
              </div>

              <h3 className="text-white font-bold text-sm font-[family-name:var(--font-poppins)] mb-1">
                {postTitle}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-3 line-clamp-4">{postContent}</p>

              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => onLike(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
                    post.liked
                      ? "bg-[#FF3B30]/20 text-[#FF3B30]"
                      : "glass-pill text-white/60"
                  }`}
                >
                  <Heart size={13} className={post.liked ? "fill-[#FF3B30]" : ""} />
                  {post.likes}
                </button>
                <button
                  onClick={() =>
                    setForumReplyingTo(forumReplyingTo === post.id ? null : post.id)
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
                    forumReplyingTo === post.id
                      ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                      : "glass-pill text-white/60"
                  }`}
                >
                  <MessageCircle size={13} />
                  {post.replies.length}
                </button>
              </div>

              {post.replies.length > 0 && (
                <div className="mt-3 space-y-2 pl-2 border-l-2 border-white/5">
                  {post.replies.map((r) => {
                    // Seed replies (id starts with "seed-f-") store their
                    // body as a translation key in `content`.
                    const isSeedReply = r.id.startsWith("seed-f-");
                    const replyContent = isSeedReply ? t(r.content) : r.content;
                    return (
                    <div key={r.id} className="flex items-start gap-2">
                      <Avatar name={r.authorName} size={24} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-white text-[11px] font-semibold">{r.authorName}</span>
                          {r.isMentor && (
                            <span className="px-1.5 py-0.5 rounded-full bg-[#4ADE80]/20 text-[#4ADE80] text-[9px] font-bold">
                              {t("mentorBadge")}
                            </span>
                          )}
                          {r.isPsychologist && (
                            <span className="px-1.5 py-0.5 rounded-full bg-[#C084FC]/20 text-[#C084FC] text-[9px] font-bold">
                              {t("psyBadge")}
                            </span>
                          )}
                        </div>
                        <p className="text-white/60 text-xs leading-relaxed">{replyContent}</p>
                      </div>
                    </div>
                    );
                  })}
                </div>
              )}

              {/* Inline forum reply input */}
              <AnimatePresence>
                {forumReplyingTo === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-3"
                  >
                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                      <span className="text-white/40 text-[10px] mr-1">{t("communityQuickReplies")}</span>
                      {QUICK_REPLIES.map((qr) => (
                        <button
                          key={qr}
                          onClick={() => setForumReplyText(qr)}
                          className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] hover:text-white hover:border-white/20 active:scale-95 transition-all"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        value={forumReplyText}
                        onChange={(e) => setForumReplyText(e.target.value)}
                        placeholder={t("communityForumReplyPlaceholder")}
                        className="flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#10B981]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") onSubmitForumReply(post.id);
                        }}
                      />
                      <button
                        onClick={() => onSubmitForumReply(post.id)}
                        disabled={!forumReplyText.trim()}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          forumReplyText.trim()
                            ? "gradient-primary text-white active:scale-95"
                            : "bg-white/5 text-white/30"
                        }`}
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
      )}

      {posts.length === 0 && (
        <EmptyState
          variant="community"
          title={t("communityNoTopicsTitle")}
          description={t("communityNoTopicsDesc")}
          ctaLabel={t("communityStartDiscussion")}
          onCta={onNew}
        />
      )}
    </div>
  );
}

// ========================================
// TAB 3: MENTORS
// ========================================
function MentorsTab({
  effectiveStreak, mentorProgress, onContact,
}: {
  effectiveStreak: number;
  mentorProgress: number;
  onContact: (name: string) => void;
}) {
  const t = useT();
  const eligible = effectiveStreak >= 90;

  return (
    <div>
      {/* Devenir mentor card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong p-5 mb-5 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#4ADE80]/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-2xl gradient-success flex items-center justify-center">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold font-[family-name:var(--font-poppins)]">
                {t("communityBecomeMentor")}
              </h3>
              <p className="text-white/50 text-xs">{t("communityBecomeMentorDesc")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Trophy size={14} className="text-[#FBBF24]" />
            <p className="text-white/80 text-xs">
              {t("communityMentorObjective")}: <span className="text-white font-bold">{t("communityMentorObjectiveDays")}</span>
            </p>
          </div>

          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-white/60">{t("communityYourProgress")}</span>
            <span className="text-white font-bold">
              {effectiveStreak} / 90 {t("days")}
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mentorProgress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="h-full rounded-full gradient-success"
            />
          </div>

          {eligible ? (
            <div className="mt-4 p-3 rounded-2xl bg-[#4ADE80]/10 border border-[#4ADE80]/30">
              <p className="text-[#4ADE80] text-sm font-semibold flex items-center gap-1.5">
                <Sparkles size={14} />
                {t("communityEligibleMentor")}
              </p>
              <button
                onClick={() => onContact(t("communityZerobetTeam"))}
                className="mt-2 w-full py-2.5 rounded-xl gradient-success text-white text-sm font-semibold active:scale-95 transition-transform"
              >
                {t("communityApplyNow")}
              </button>
            </div>
          ) : (
            <p className="mt-3 text-white/40 text-xs">
              {t("communityDaysUntilMentor", { days: 90 - effectiveStreak })}
            </p>
          )}
        </div>
      </motion.div>

      <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 px-1">
        {t("communityVerifiedMentors")}
      </h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {SEED_MENTORS.map((m, idx) => {
          const online = MENTOR_ONLINE[m.displayName] ?? false;
          const response = getResponseTime(m.sessionsCount);
          return (
          <motion.div
            key={m.displayName}
            variants={itemVariants}
            custom={idx}
            className="glass-card card-hover p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="relative shrink-0">
                <Avatar name={m.displayName} size={52} />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#070B0E] ${
                    online ? "bg-[#4ADE80]" : "bg-white/30"
                  }`}
                  aria-hidden
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-white font-bold text-sm">{m.displayName}</span>
                  {m.verified && <BadgeCheck size={14} className="text-[#2DD4BF]" />}
                  <span
                    className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                      online
                        ? "bg-[#4ADE80]/15 text-[#4ADE80]"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        online ? "bg-[#4ADE80]" : "bg-white/40"
                      }`}
                    />
                    {online ? t("communityOnline") : t("communityOffline")}
                  </span>
                </div>
                <p className="text-[#F59E0B] text-xs font-medium">{m.specialty}</p>
                <div className="flex items-center gap-2 text-white/40 text-[11px] mt-0.5">
                  <span className="flex items-center gap-0.5">
                    <Globe size={10} />
                    {m.country}
                  </span>
                  <span className="flex items-center gap-0.5 text-[#F59E0B]">
                    <Flame size={10} />
                    {m.daysClean} {t("dayShort")} {t("cleanShort")}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-white/70 text-xs leading-relaxed mb-3">{m.bio}</p>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#2DD4BF]/10 text-[#2DD4BF] text-[10px] font-semibold">
                <Zap size={10} />
                {response.label}
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-white/60 text-[10px] font-semibold">
                <Users size={10} />
                {m.sessionsCount} {t("sessionsLabel")}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <StarRating rating={m.rating} />
              <button
                onClick={() => onContact(m.displayName)}
                className={`px-4 py-2 rounded-xl text-white text-xs font-semibold active:scale-95 transition-transform ${
                  online ? "gradient-primary glow-green" : "bg-white/10"
                }`}
              >
                {t("communityContact")}
              </button>
            </div>
          </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ========================================
// TAB 4: PSYCHOLOGUES
// ========================================
function PsychologistsTab({
  onReserve,
}: {
  onReserve: (psy: SeedPsychologist) => void;
}) {
  const t = useT();
  const currency = useStore((s) => s.currency);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 mb-4 flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#C084FC]/20 flex items-center justify-center">
          <Stethoscope size={22} className="text-[#C084FC]" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-poppins)]">
            {t("communityCertifiedSessions")}
          </h3>
          <p className="text-white/50 text-xs leading-snug">
            {t("communityPsychologistsDesc")}
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {SEED_PSYCHOLOGISTS.map((p, idx) => {
          const online = PSY_ONLINE[p.license] ?? false;
          return (
          <motion.div
            key={p.license}
            variants={itemVariants}
            custom={idx}
            className="glass-card card-hover p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="relative shrink-0">
                <Avatar name={p.displayName} size={52} />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#070B0E] ${
                    online ? "bg-[#4ADE80]" : "bg-white/30"
                  }`}
                  aria-hidden
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-white font-bold text-sm">{p.displayName}</span>
                  {p.verified && <BadgeCheck size={14} className="text-[#2DD4BF]" />}
                  <span className="px-2 py-0.5 rounded-full bg-[#C084FC]/20 text-[#C084FC] text-[9px] font-bold flex items-center gap-0.5">
                    <BadgeCheck size={9} />
                    {t("certifiedBadge")}
                  </span>
                  <span
                    className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                      online
                        ? "bg-[#4ADE80]/15 text-[#4ADE80]"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        online ? "bg-[#4ADE80]" : "bg-white/40"
                      }`}
                    />
                    {online ? t("communityOnline") : t("communityOffline")}
                  </span>
                </div>
                <p className="text-white text-xs font-medium truncate">{p.fullName}</p>
                <p className="text-[#C084FC] text-xs">{p.specialty}</p>
                <div className="flex items-center gap-2 text-white/40 text-[11px] mt-0.5 flex-wrap">
                  <span className="flex items-center gap-0.5">
                    <Globe size={10} />
                    {p.country}
                  </span>
                  <span className="font-mono">{p.license}</span>
                </div>
              </div>
            </div>

            <p className="text-white/70 text-xs leading-relaxed mb-3">{p.bio}</p>

            <div className="flex items-center justify-between mb-3">
              <StarRating rating={p.rating} />
              <span className="text-white/40 text-xs flex items-center gap-1">
                <Clock size={11} />
                {p.sessionsCount} {t("sessionsLabel")}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-white/40 text-[10px]">{t("communitySessionTariff")}</p>
                <p className="text-lg font-bold gradient-primary-text font-[family-name:var(--font-poppins)]">
                  {formatPrice(p.sessionPrice, currency)}
                </p>
              </div>
              <button
                onClick={() => onReserve(p)}
                className={`flex-1 max-w-[180px] py-3 rounded-2xl text-white text-sm font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform ${
                  online ? "gradient-primary glow-green" : "bg-white/10"
                }`}
              >
                <Stethoscope size={15} />
                {t("communityReserve")}
              </button>
            </div>
          </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
