"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Award,
  Lock,
  Trophy,
  Flame,
  Wind,
  Sparkles,
  Calendar,
  Check,
  TrendingUp,
  Star,
  Footprints,
  PenLine,
  Coins,
  Flower2,
  ShieldCheck,
  MessagesSquare,
  HandHeart,
  Crown,
  BookOpen,
  Waves,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import {
  PARCOURS_RANKS,
  getCurrentRank,
} from "@/lib/data/parcours-data";
import type { ParcoursRank } from "@/lib/data/parcours-data";
import { TiltCard } from "@/components/zerobet/components/TiltCard";
import { ArtifactIcon } from "@/components/zerobet/components/ArtifactIcon";
import { BadgeMedal, type MedalTier } from "@/components/zerobet/components/BadgeMedal";
import { useT } from "@/lib/i18n/useT";

// ---------------------------------------------------------------------------
// Special achievements — not tied to ranks
// ---------------------------------------------------------------------------

export interface SpecialAchievement {
  key: string;
  name: string;
  description: string;
  /** Crafted Lucide icon rendered inside a metallic BadgeMedal */
  icon: LucideIcon;
  color: string;
  target: number;
  getCurrent: (ctx: AchievementContext) => number;
  unlockHint?: (ctx: AchievementContext) => string | null;
}

export interface AchievementContext {
  streakDays: number;
  panicEventsCount: number;
  resolvedPanicCount: number;
  journalCount: number;
  totalSaved: number;
  meditationStreak: number;
  testimonialsCount: number;
  forumPostsCount: number;
  articlesRead: number;
}

export const SPECIAL_ACHIEVEMENTS: SpecialAchievement[] = [
  {
    key: "premier-pas",
    name: "Premier Pas",
    description: "Complète ton premier jour sans pari",
    icon: Footprints,
    color: "#FFC94D",
    target: 1,
    getCurrent: (c) => c.streakDays,
  },
  {
    key: "respirateur",
    name: "Respirateur",
    description: "Utilise le bouton d'urgence 5 fois",
    icon: Wind,
    color: "#FF9A3D",
    target: 5,
    getCurrent: (c) => c.panicEventsCount,
  },
  {
    key: "ecrivain",
    name: "Écrivain",
    description: "Écris 10 entrées dans ton journal",
    icon: PenLine,
    color: "#FFD166",
    target: 10,
    getCurrent: (c) => c.journalCount,
  },
  {
    key: "econome",
    name: "Économe",
    description: "Économise 100 000 FCFA",
    icon: Coins,
    color: "#FFB020",
    target: 100000,
    getCurrent: (c) => c.totalSaved,
  },
  {
    key: "mediant",
    name: "Méditant",
    description: "7 jours de méditation d'affilée",
    icon: Flower2,
    color: "#FF8A00",
    target: 7,
    getCurrent: (c) => c.meditationStreak,
  },
  {
    key: "survivant",
    name: "Survivant",
    description: "Résiste à 10 envies fortes",
    icon: ShieldCheck,
    color: "#FF6B00",
    target: 10,
    getCurrent: (c) => c.resolvedPanicCount,
  },
  {
    key: "sociable",
    name: "Sociable",
    description: "Partage 5 témoignages",
    icon: MessagesSquare,
    color: "#FFD166",
    target: 5,
    getCurrent: (c) => c.testimonialsCount,
  },
  {
    key: "mentor",
    name: "Mentor",
    description: "Aide 10 personnes dans le forum",
    icon: HandHeart,
    color: "#FFC94D",
    target: 10,
    getCurrent: (c) => c.forumPostsCount * 2,
  },
  {
    key: "legende",
    name: "Légende",
    description: "365 jours sans pari",
    icon: Crown,
    color: "#FFD700",
    target: 365,
    getCurrent: (c) => c.streakDays,
  },
  {
    key: "perseverant",
    name: "Persévérant",
    description: "30 jours sans rechute",
    icon: Flame,
    color: "#FF6B00",
    target: 30,
    getCurrent: (c) => c.streakDays,
  },
  {
    key: "erudit",
    name: "Érudit",
    description: "Lis 20 articles",
    icon: BookOpen,
    color: "#FF9A3D",
    target: 20,
    getCurrent: (c) => c.articlesRead,
  },
  {
    key: "zen-master",
    name: "Zen Master",
    description: "30 jours de méditation d'affilée",
    icon: Waves,
    color: "#FFB020",
    target: 30,
    getCurrent: (c) => c.meditationStreak,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

function relativeTimeLabel(daysAgo: number): string {
  if (daysAgo <= 0) return "Aujourd'hui";
  if (daysAgo === 1) return "Hier";
  if (daysAgo < 7) return `Il y a ${daysAgo} jours`;
  if (daysAgo < 30) {
    const weeks = Math.floor(daysAgo / 7);
    return weeks === 1 ? "Il y a 1 semaine" : `Il y a ${weeks} semaines`;
  }
  const months = Math.floor(daysAgo / 30);
  return months === 1 ? "Il y a 1 mois" : `Il y a ${months} mois`;
}

interface RecentUnlock {
  key: string;
  name: string;
  /** For rank unlocks: the ArtifactIcon key. */
  artifactKey?: string;
  /** For special unlocks: the crafted Lucide icon. */
  Icon?: LucideIcon;
  color: string;
  type: "rank" | "special";
  daysAgo: number;
}

// ---------------------------------------------------------------------------
// Tier helpers (Task 13-d)
// ---------------------------------------------------------------------------

type TierKey = "all" | "bronze" | "silver" | "gold" | "diamond" | "legendary";

type ExcludedTierKey = Exclude<TierKey, "all">;

// TIER_META — the tier emoji icons were removed because they collided with
// the parcours medal imagery. The colored pill background already conveys
// the tier visually, so the emoji is purely decorative. We now use a small
// colored dot instead.
const TIER_META: Record<ExcludedTierKey, { label: string; color: string; metal: string }> = {
  bronze: { label: "Bronze", color: "#CD7F32", metal: "metal-bronze" },
  silver: { label: "Argent", color: "#C0C0C0", metal: "metal-silver" },
  gold: { label: "Or", color: "#FFD700", metal: "metal-gold" },
  diamond: { label: "Diamant", color: "#CFF2FF", metal: "metal-diamond" },
  legendary: { label: "Légende", color: "#FF6B00", metal: "metal-legendary" },
};

function getTierForTarget(target: number): ExcludedTierKey {
  if (target >= 365) return "legendary";
  if (target >= 30) return "gold";
  if (target >= 10) return "diamond";
  if (target >= 5) return "silver";
  return "bronze";
}

// ---------------------------------------------------------------------------
// Premium sub-components (Task 13-d)
// ---------------------------------------------------------------------------

type ComputedAchievement = SpecialAchievement & {
  current: number;
  unlocked: boolean;
  progress: number;
};

/**
 * ProgressRing — premium SVG circle that animates its stroke-dashoffset over
 * 1.2s using the `.progress-ring-circle` utility class (globals.css).
 */
function ProgressRing({
  percent,
  color,
  size = 72,
  stroke = 6,
}: {
  percent: number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference - (clamped / 100) * circumference;
  return (
    <svg width={size} height={size} className="flex-shrink-0" aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={stroke}
      />
      <motion.circle
        className="progress-ring-circle"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
        style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-[family-name:var(--font-poppins)] font-extrabold fill-white"
        style={{ fontSize: size * 0.22 }}
      >
        {Math.round(clamped)}%
      </text>
    </svg>
  );
}

/**
 * TierTab — a filter pill. Active state shows the tier's real metal gradient
 * (forged ring classes) + aura glow; inactive state shows a plain glass pill.
 */
function TierTab({
  active,
  label,
  color,
  metal,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  color: string;
  metal: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-semibold transition-all btn-press overflow-hidden ${
        active ? "text-[#1A0D02]" : "text-white/65 glass-card"
      }`}
      style={
        active
          ? {
              boxShadow: `0 0 18px ${color}80, 0 0 6px ${color}90, 0 4px 16px rgba(0,0,0,0.4)`,
            }
          : {}
      }
    >
      {active && (
        <span aria-hidden className={`absolute inset-0 ${metal} opacity-95`} />
      )}
      <span
        className="relative inline-block w-2 h-2 rounded-full flex-shrink-0"
        style={{
          background: color,
          boxShadow: active
            ? "0 0 6px rgba(255,255,255,0.85), 0 0 12px " + color
            : `0 0 6px ${color}80`,
        }}
      />
      <span className="relative leading-none">{label}</span>
      <span
        className={`relative text-[9px] px-1.5 py-0.5 rounded-full ml-0.5 ${
          active ? "bg-black/25 text-white" : "bg-white/10 text-white/70"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

/**
 * FlipBadge — a 3D flip card for a single achievement. Front shows a forged
 * metallic BadgeMedal + name; back shows the description + unlock state.
 * Tap (or hover on desktop) to flip. Unlocked medals carry light rays,
 * shine sweep, sparkles and a tier heat-aura; locked ones get a
 * desaturated treatment via .achievement-locked.
 */
function FlipBadge({
  achievement,
  index,
}: {
  achievement: ComputedAchievement;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const tier = getTierForTarget(achievement.target);
  const colorVar = {
    ["--achievement-color" as string]: achievement.color,
  } as CSSProperties;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.05 + index * 0.03,
        type: "spring",
        stiffness: 280,
        damping: 22,
      }}
    >
      <div
        className={`badge-3d w-full h-36 select-none cursor-pointer ${
          achievement.unlocked ? "" : "achievement-locked"
        }`}
        onClick={() => setFlipped((f) => !f)}
        style={colorVar}
        role="button"
        tabIndex={0}
        aria-label={`${achievement.name} — ${achievement.unlocked ? "débloqué" : "verrouillé"}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
      >
        <div
          className="badge-3d-inner w-full h-full"
          style={flipped ? { transform: "rotateY(180deg)" } : undefined}
        >
          {/* FRONT */}
          <div
            className="badge-3d-front glass-card p-2 flex flex-col items-center justify-center text-center rounded-2xl overflow-hidden"
            style={
              achievement.unlocked
                ? { boxShadow: `0 0 22px ${achievement.color}30, inset 0 0 18px rgba(255,176,32,0.06)` }
                : {}
            }
          >
            <BadgeMedal
              tier={tier}
              icon={achievement.icon}
              color={achievement.color}
              unlocked={achievement.unlocked}
              size={58}
              shineDelay={(index % 4) * 0.55}
            />
            <p
              className={`text-[10px] font-bold leading-tight mt-1.5 mb-0.5 ${
                achievement.unlocked ? "text-white" : "text-white/60"
              }`}
            >
              {achievement.name}
            </p>
            <p className="text-white/30 text-[8px] uppercase tracking-wider">
              {achievement.unlocked ? "Tap pour retourner" : "Verrouillé"}
            </p>
          </div>

          {/* BACK */}
          <div
            className="badge-3d-back glass-card-strong p-2.5 flex flex-col items-center justify-center text-center rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${achievement.color}26 0%, rgba(18,9,4,0.85) 100%)`,
              boxShadow: `0 0 20px ${achievement.color}30`,
            }}
          >
            <p className="text-white text-[10px] font-bold leading-tight mb-1">
              {achievement.name}
            </p>
            <p className="text-white/75 text-[8.5px] leading-tight line-clamp-3 mb-1.5">
              {achievement.description}
            </p>
            {achievement.unlocked ? (
              <p
                className="text-[9px] font-semibold uppercase tracking-wider flex items-center gap-1"
                style={{ color: achievement.color }}
              >
                <Check size={9} strokeWidth={3} /> Débloqué
              </p>
            ) : (
              <div className="w-full">
                <p className="text-white/55 text-[8px] font-mono mb-0.5">
                  {achievement.target > 1000
                    ? `${Math.min(achievement.current, achievement.target).toLocaleString("fr-FR")}/${achievement.target.toLocaleString("fr-FR")}`
                    : `${Math.min(achievement.current, achievement.target)}/${achievement.target}`}
                </p>
                <p className="text-white/45 text-[8px] uppercase tracking-wider">
                  Verrouillé
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function AchievementsScreen() {
  const t = useT();
  const {
    navigate,
    streakDays,
    adminStreakOverride,
    unlockedRanks,
    meditationStreak,
    weeklyBetAmount,
    panicEvents,
    journalEntries,
    testimonials,
    forumPosts,
    articlesRead,
  } = useStore();

  const effectiveStreak = adminStreakOverride !== null ? adminStreakOverride : streakDays;
  const currentRank = getCurrentRank(effectiveStreak);
  const totalSaved = effectiveStreak * Math.round(weeklyBetAmount / 7);

  const achievementContext: AchievementContext = useMemo(
    () => ({
      streakDays: effectiveStreak,
      panicEventsCount: panicEvents.length,
      resolvedPanicCount: panicEvents.filter((p) => p.resolved).length,
      journalCount: journalEntries.length,
      totalSaved,
      meditationStreak,
      testimonialsCount: testimonials.filter((t) => t.isMine).length,
      forumPostsCount: forumPosts.length,
      articlesRead,
    }),
    [
      effectiveStreak,
      panicEvents,
      journalEntries.length,
      totalSaved,
      meditationStreak,
      testimonials,
      forumPosts.length,
      articlesRead,
    ]
  );

  // Compute progress for each special achievement
  const computedAchievements = useMemo(
    () =>
      SPECIAL_ACHIEVEMENTS.map((a) => {
        const current = a.getCurrent(achievementContext);
        const unlocked = current >= a.target;
        const progress = Math.min(100, (current / a.target) * 100);
        return { ...a, current, unlocked, progress };
      }),
    [achievementContext]
  );

  const unlockedAchievements = computedAchievements.filter((a) => a.unlocked);
  const unlockedRanksCount = unlockedRanks.length;

  // ----- Task 13-d: tier filter + totals -----
  const [activeTier, setActiveTier] = useState<TierKey>("all");
  const filteredAchievements = useMemo(
    () =>
      activeTier === "all"
        ? computedAchievements
        : computedAchievements.filter(
            (a) => getTierForTarget(a.target) === activeTier,
          ),
    [activeTier, computedAchievements],
  );

  const totalUnlocked = unlockedAchievements.length + unlockedRanksCount;
  const totalAchievements = SPECIAL_ACHIEVEMENTS.length + PARCOURS_RANKS.length;
  const unlockedPercent =
    totalAchievements > 0 ? (totalUnlocked / totalAchievements) * 100 : 0;

  const tierCounts = useMemo(() => {
    const counts: Record<ExcludedTierKey, number> = {
      bronze: 0,
      silver: 0,
      gold: 0,
      diamond: 0,
      legendary: 0,
    };
    for (const a of computedAchievements) {
      counts[getTierForTarget(a.target)] += 1;
    }
    return counts;
  }, [computedAchievements]);

  // Build a "recent unlocks" list
  const recentUnlocks: RecentUnlock[] = useMemo(() => {
    const items: RecentUnlock[] = [];

    // Ranks — derive "days ago" from streak (when streakDays first crossed requiredDays)
    PARCOURS_RANKS.forEach((rank) => {
      const isUnlocked =
        effectiveStreak >= rank.requiredDays || unlockedRanks.includes(rank.key);
      if (!isUnlocked) return;
      const daysAgo = Math.max(0, effectiveStreak - rank.requiredDays);
      items.push({
        key: `rank-${rank.key}`,
        name: t(rank.nameKey),
        artifactKey: rank.key,
        color: rank.color,
        type: "rank",
        daysAgo,
      });
    });

    // Special achievements — derive a rough "days ago" from each metric
    computedAchievements.forEach((a) => {
      if (!a.unlocked) return;
      let daysAgo = 0;
      if (a.key === "premier-pas" || a.key === "perseverant" || a.key === "legende") {
        daysAgo = Math.max(0, effectiveStreak - a.target);
      } else if (a.key === "respirateur" || a.key === "survivant") {
        // Use latest panic event as a proxy
        const latest = panicEvents[0];
        if (latest) {
          const diff = Math.floor(
            (Date.now() - new Date(latest.createdAt).getTime()) / 86400000
          );
          daysAgo = Math.max(0, diff);
        }
      } else if (a.key === "ecrivain") {
        const tenth = journalEntries[9]; // 10th entry (0-indexed)
        if (tenth) {
          const diff = Math.floor(
            (Date.now() - new Date(tenth.createdAt).getTime()) / 86400000
          );
          daysAgo = Math.max(0, diff);
        }
      } else if (a.key === "mediant" || a.key === "zen-master") {
        daysAgo = 0; // meditation streak resets if broken — assume today
      } else if (a.key === "econome") {
        daysAgo = Math.max(0, effectiveStreak - 30);
      } else {
        daysAgo = 0;
      }
      items.push({
        key: `special-${a.key}`,
        name: a.name,
        Icon: a.icon,
        color: a.color,
        type: "special",
        daysAgo,
      });
    });

    // Sort by most recent (smallest daysAgo first)
    return items.sort((a, b) => a.daysAgo - b.daysAgo).slice(0, 5);
  }, [effectiveStreak, unlockedRanks, computedAchievements, panicEvents, journalEntries]);

  // Next goals: locked achievements closest to completion (by progress %)
  const nextGoals = useMemo(
    () =>
      computedAchievements
        .filter((a) => !a.unlocked)
        .sort((a, b) => b.progress - a.progress)
        .slice(0, 3),
    [computedAchievements]
  );

  // ----- Stats summary cards -----
  const statsCards = [
    {
      label: "Badges débloqués",
      value: `${unlockedRanksCount}`,
      suffix: "/13",
      icon: Trophy,
      gradient: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
      glow: "rgba(251, 191, 36, 0.5)",
    },
    {
      label: "Jours cumulés",
      value: `${effectiveStreak}`,
      suffix: "",
      icon: Flame,
      gradient: "linear-gradient(135deg, #FF3B30 0%, #F59E0B 100%)",
      glow: "rgba(255, 59, 48, 0.5)",
    },
    {
      label: "Série méditation",
      value: `${meditationStreak}`,
      suffix: "j",
      icon: Wind,
      gradient: "linear-gradient(135deg, #FFD166 0%, #FF9A3D 100%)",
      glow: "rgba(255,176,32, 0.5)",
    },
  ];

  return (
    <div className="min-h-screen px-5 pt-12 pb-10 safe-bottom">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-5"
      >
        <button
          onClick={() => navigate("dashboard")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform focus-ring"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-extrabold font-[family-name:var(--font-poppins)] tracking-tight shimmer-text">
            {t("achievementsHeaderTitle")}
          </h1>
          <p className="text-white/40 text-[11px]">{t("achievementsYourExploits")}</p>
        </div>
        <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <Trophy size={18} className="text-[#FBBF24]" />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        {/* ====== SECTION 1: Premium Hero Card (Task 13-d) ====== */}
        <motion.div variants={itemVariants}>
          <TiltCard
            className="rounded-2xl gradient-border-card p-5 overflow-hidden"
            maxTilt={8}
            scale={1.01}
          >
            {/* Aurora mesh background layer */}
            <div
              aria-hidden
              className="absolute inset-0 mesh-bg-aurora opacity-70 pointer-events-none"
            />
            {/* Floating decorative icons */}
            <Trophy
              className="absolute top-3 right-4 text-[#FBBF24] float pointer-events-none"
              size={28}
              strokeWidth={1.5}
              aria-hidden
              style={{ opacity: 0.15 }}
            />
            <Star
              className="absolute bottom-8 left-3 text-[#F59E0B] float-slow pointer-events-none"
              size={20}
              strokeWidth={1.5}
              aria-hidden
              style={{ opacity: 0.15 }}
            />
            <Award
              className="absolute top-1/2 right-10 text-[#FFD166] float pointer-events-none"
              size={22}
              strokeWidth={1.5}
              aria-hidden
              style={{ opacity: 0.15 }}
            />

            <div className="relative z-10">
              {/* Progress ring + count */}
              <div className="flex items-center gap-4 mb-4">
                <ProgressRing percent={unlockedPercent} color={currentRank.color} />
                <div className="flex-1 min-w-0">
                  <p className="text-white/55 text-[9px] uppercase tracking-[0.16em] mb-1">
                    Achievements débloqués
                  </p>
                  <p className="font-[family-name:var(--font-poppins)] text-2xl font-extrabold leading-none mb-1.5">
                    <span className="shimmer-text">{totalUnlocked}</span>
                    <span className="text-white/40 text-base font-bold ml-1">
                      / {totalAchievements}
                    </span>
                  </p>
                  <p className="text-white/55 text-[11px] leading-tight">
                    Rang actuel :{" "}
                    <span
                      style={{ color: currentRank.color }}
                      className="font-semibold inline-flex items-center gap-1 align-middle"
                    >
                      <ArtifactIcon artifactKey={currentRank.key} size={14} glow={true} />
                      {t(currentRank.nameKey)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {statsCards.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.1 + idx * 0.08,
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      className="glass-card p-2.5 flex flex-col items-center text-center relative overflow-hidden"
                      style={{ boxShadow: `0 0 18px ${stat.glow}` }}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center mb-1.5"
                        style={{ background: stat.gradient }}
                      >
                        <Icon size={14} className="text-white" />
                      </div>
                      <p className="text-base font-extrabold text-white font-[family-name:var(--font-poppins)] leading-none">
                        {stat.value}
                        <span className="text-white/50 text-[10px] font-medium ml-0.5">
                          {stat.suffix}
                        </span>
                      </p>
                      <p className="text-white/55 text-[8.5px] mt-1 leading-tight">
                        {stat.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* ====== SECTION 2: Rank Progress Timeline ====== */}
        <motion.div variants={itemVariants} className="glass-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Award size={14} className="text-[#FBBF24]" />
            <h2 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              Parcours des rangs
            </h2>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-1 px-1 pb-2">
            <div className="flex items-start gap-0 min-w-max">
              {PARCOURS_RANKS.map((rank, idx) => (
                <RankTimelineNode
                  key={rank.key}
                  rank={rank}
                  isUnlocked={
                    effectiveStreak >= rank.requiredDays ||
                    unlockedRanks.includes(rank.key)
                  }
                  isCurrent={rank.key === currentRank.key}
                  isLast={idx === PARCOURS_RANKS.length - 1}
                  nextUnlocked={
                    idx < PARCOURS_RANKS.length - 1
                      ? effectiveStreak >= PARCOURS_RANKS[idx + 1].requiredDays ||
                        unlockedRanks.includes(PARCOURS_RANKS[idx + 1].key)
                      : false
                  }
                />
              ))}
            </div>
          </div>

          <p className="text-white/40 text-[10px] mt-2 text-center">
            Glisse pour explorer les 13 rangs • Tu es à{" "}
            <span className="text-white font-semibold">{t(currentRank.nameKey)}</span>
          </p>
        </motion.div>

        {/* ====== SECTION 3: Special Achievements Grid (Task 13-d) ====== */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#FFD166]" />
              <h2 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
                Exploits spéciaux
              </h2>
            </div>
            <span className="text-[10px] text-white/50">
              {unlockedAchievements.length}/{SPECIAL_ACHIEVEMENTS.length}
            </span>
          </div>

          {/* Tier filter tabs */}
          <div className="overflow-x-auto no-scrollbar -mx-1 px-1 pb-3 mb-1">
            <div className="flex items-center gap-2 min-w-max">
              <TierTab
                active={activeTier === "all"}
                label="Tous"
                color="#F59E0B"
                metal="metal-gold"
                count={computedAchievements.length}
                onClick={() => setActiveTier("all")}
              />
              {(["bronze", "silver", "gold", "diamond", "legendary"] as const).map((t) => (
                <TierTab
                  key={t}
                  active={activeTier === t}
                  label={TIER_META[t].label}
                  color={TIER_META[t].color}
                  metal={TIER_META[t].metal}
                  count={tierCounts[t]}
                  onClick={() => setActiveTier(t)}
                />
              ))}
            </div>
          </div>

          {/* 3D flip badges */}
          <div className="grid grid-cols-3 gap-3">
            {filteredAchievements.map((achv, idx) => (
              <FlipBadge key={achv.key} achievement={achv} index={idx} />
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <p className="text-center text-white/40 text-[11px] py-6">
              {t("achievementsNoItems")}
            </p>
          )}
        </motion.div>

        {/* ====== SECTION 4: Recent Unlocks ====== */}
        {recentUnlocks.length > 0 && (
          <motion.div variants={itemVariants} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-[#FFC94D]" />
              <h2 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
                {t("achievementsRecentUnlocks")}
              </h2>
            </div>

            <div className="flex items-center gap-2 mb-4 p-3 rounded-2xl bg-[#FFC94D]/10 border border-[#FFC94D]/20">
              <motion.div
                animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.12, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <PartyPopper
                  size={26}
                  className="text-[#FFC94D]"
                  style={{ filter: "drop-shadow(0 0 8px rgba(255,201,77,0.5))" }}
                />
              </motion.div>
              <p className="text-white/80 text-xs leading-relaxed">
                <span className="text-white font-semibold">Félicitations !</span> Tu as débloqué{" "}
                <span className="text-[#FFC94D] font-bold">{recentUnlocks.length}</span> réalisation
                {recentUnlocks.length !== 1 ? "s" : ""} récemment.
              </p>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {recentUnlocks.map((unlock, idx) => (
                <motion.div
                  key={unlock.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05 }}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${unlock.color} 0%, ${unlock.color}99 100%)`,
                      boxShadow: `0 0 12px ${unlock.color}60`,
                    }}
                  >
                    {unlock.type === "rank" && unlock.artifactKey ? (
                      <ArtifactIcon artifactKey={unlock.artifactKey} size={22} glow={false} />
                    ) : (
                      unlock.Icon && <unlock.Icon size={17} strokeWidth={2.2} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold leading-tight">{unlock.name}</p>
                    <p className="text-white/40 text-[10px] mt-0.5">
                      {unlock.type === "rank" ? "Rang débloqué" : "Exploit spécial"}
                    </p>
                  </div>
                  <span className="text-white/50 text-[10px] flex-shrink-0">
                    {relativeTimeLabel(unlock.daysAgo)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ====== SECTION 5: Next Goals ====== */}
        {nextGoals.length > 0 && (
          <motion.div variants={itemVariants} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-[#F59E0B]" />
              <h2 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
                Tes prochains défis
              </h2>
            </div>

            <div className="space-y-3">
              {nextGoals.map((goal, idx) => {
                const remaining = Math.max(0, goal.target - goal.current);
                const remainingLabel =
                  goal.target > 1000
                    ? remaining.toLocaleString("fr-FR")
                    : `${remaining}`;
                const GoalIcon = goal.icon;
                return (
                  <motion.div
                    key={goal.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${goal.color}25`,
                        border: `1px solid ${goal.color}40`,
                        boxShadow: `0 0 10px ${goal.color}30`,
                      }}
                    >
                      <GoalIcon size={18} strokeWidth={2.2} style={{ color: goal.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white text-xs font-semibold truncate">{goal.name}</p>
                        <span className="text-[10px] font-mono text-white/50 ml-2">
                          {goal.target > 1000
                            ? `${Math.min(goal.current, goal.target).toLocaleString("fr-FR")}/${goal.target.toLocaleString("fr-FR")}`
                            : `${Math.min(goal.current, goal.target)}/${goal.target}`}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: goal.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 + idx * 0.07 }}
                        />
                      </div>
                      <p className="text-[10px] text-white/40 mt-1">
                        Plus que{" "}
                        <span className="font-semibold" style={{ color: goal.color }}>
                          {remainingLabel}
                        </span>
                        ...
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Footer motivation */}
        <motion.div variants={itemVariants} className="glass-card p-4 text-center">
          <p className="text-white/60 text-xs leading-relaxed">
            Chaque exploit est une preuve de ta force.
            <br />
            <span className="text-white font-semibold">
              Continue, ta collection grandit chaque jour.
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Rank timeline node
// ---------------------------------------------------------------------------

interface RankTimelineNodeProps {
  rank: ParcoursRank;
  isUnlocked: boolean;
  isCurrent: boolean;
  isLast: boolean;
  nextUnlocked: boolean;
}

function RankTimelineNode({
  rank,
  isUnlocked,
  isCurrent,
  isLast,
  nextUnlocked,
}: RankTimelineNodeProps) {
  const t = useT();
  return (
    <div className="flex items-center flex-shrink-0">
      <div className="flex flex-col items-center w-16">
        <div className="relative">
          {/* Pulsing aura for current rank */}
          {isCurrent && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${rank.color}` }}
              animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          {isUnlocked ? (
            <motion.div
              className="relative w-11 h-11 rounded-full flex items-center justify-center badge-aura"
              style={{
                background: rank.gradient,
                ["--aura-color" as string]: rank.glow,
              }}
              animate={isCurrent ? { scale: [1, 1.06, 1] } : {}}
              transition={{ duration: 2.5, repeat: isCurrent ? Infinity : 0 }}
            >
              <ArtifactIcon artifactKey={rank.key} size={28} glow={true} />
            </motion.div>
          ) : (
            <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center opacity-40">
              <Lock size={14} className="text-white/40" />
            </div>
          )}
        </div>
        <p
          className={`text-[9px] font-semibold mt-1.5 text-center leading-tight truncate w-full ${
            isUnlocked ? "text-white" : "text-white/40"
          }`}
        >
          {t(rank.nameKey)}
        </p>
        <p className={`text-[8px] mt-0.5 ${isUnlocked ? "text-white/50" : "text-white/30"}`}>
          {rank.requiredDays}j
        </p>
      </div>

      {/* Connecting line */}
      {!isLast && (
        <div className="h-0.5 w-5 -mt-7 rounded-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full"
            style={{
              background:
                isUnlocked && nextUnlocked
                  ? "linear-gradient(90deg, #FF3B30, #F59E0B, #FBBF24)"
                  : "rgba(255,255,255,0.1)",
            }}
            initial={{ width: isUnlocked && nextUnlocked ? "0%" : "100%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      )}
    </div>
  );
}

export default AchievementsScreen;
