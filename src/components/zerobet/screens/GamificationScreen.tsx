"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Gamepad2,
  Sparkles,
  Trophy,
  Zap,
  Calendar,
  BookOpen,
  Wallet,
  Users,
  Crown,
  Medal,
  Star,
  TrendingUp,
  Flame,
  X,
  Check,
  Award,
  History,
  ChevronRight,
  Target,
} from "lucide-react";
import {
  useStore,
  computeLevel,
  getMultiplierTier,
  getStreakMultiplier,
  type LevelTier,
} from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { DailyQuests } from "@/components/zerobet/components/DailyQuests";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { toast } from "sonner";

/* ========================================================================
   Static data — Weekly challenges & Leaderboard seed
   ======================================================================== */

interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon: typeof Flame;
  color: string;
  bg: string;
  current: number;
  target: number;
  unit: string;
}

const WEEKLY_CHALLENGES: WeeklyChallenge[] = [
  {
    id: "week-streak",
    title: "7 jours sans pari",
    description: "Complète une semaine complète sans pari",
    reward: 500,
    icon: Flame,
    color: "#FF3B30",
    bg: "rgba(255,59,48,0.15)",
    current: 4,
    target: 7,
    unit: "jours",
  },
  {
    id: "week-savings",
    title: "Économise 10 000 FCFA",
    description: "Mets de l'argent de côté cette semaine",
    reward: 300,
    icon: Wallet,
    color: "#4ADE80",
    bg: "rgba(74,222,128,0.15)",
    current: 6500,
    target: 10000,
    unit: "FCFA",
  },
  {
    id: "week-community",
    title: "Aide la communauté",
    description: "Publie un témoignage ou réponds à un post",
    reward: 200,
    icon: Users,
    color: "#FF9500",
    bg: "rgba(255,149,0,0.15)",
    current: 1,
    target: 3,
    unit: "actions",
  },
];

interface LeaderUser {
  id: string;
  name: string;
  xp: number;
  country: string;
  badge: string;
  isMe?: boolean;
}

const LEADERBOARD_SEED: LeaderUser[] = [
  { id: "u1", name: "Aïssatou D.", xp: 8420, country: "🇸🇳", badge: "👑" },
  { id: "u2", name: "Moussa K.", xp: 7310, country: "🇲🇱", badge: "🥈" },
  { id: "u3", name: "Fatou B.", xp: 6150, country: "🇨🇮", badge: "🥉" },
  { id: "u4", name: "Ibrahima S.", xp: 4980, country: "🇸🇳", badge: "⭐" },
  { id: "u5", name: "Awa T.", xp: 3760, country: "🇧🇫", badge: "⭐" },
  { id: "u6", name: "You", xp: 0, country: "🌍", badge: "🌱", isMe: true },
  { id: "u7", name: "Mamadou D.", xp: 2900, country: "🇬🇳", badge: "🌱" },
  { id: "u8", name: "Rokya C.", xp: 2240, country: "🇨🇩", badge: "🌱" },
  { id: "u9", name: "Sékou O.", xp: 1580, country: "🇸🇳", badge: "🌱" },
  { id: "u10", name: "Bineta M.", xp: 890, country: "🇸🇳", badge: "🌱" },
];

/* ========================================================================
   Helpers
   ======================================================================== */

const TIER_GRADIENTS: Record<LevelTier, string> = {
  Novice: "linear-gradient(135deg, #9CA3AF 0%, #64D2FF 100%)",
  Apprenti: "linear-gradient(135deg, #64D2FF 0%, #4ADE80 100%)",
  Guerrier: "linear-gradient(135deg, #FF9500 0%, #FF3B30 100%)",
  Champion: "linear-gradient(135deg, #FF3B30 0%, #BF5AF2 100%)",
  Légende: "linear-gradient(135deg, #FBBF24 0%, #FF3B30 50%, #BF5AF2 100%)",
};

const TIER_EMOJIS: Record<LevelTier, string> = {
  Novice: "🌱",
  Apprenti: "⚔️",
  Guerrier: "🛡️",
  Champion: "🏆",
  Légende: "👑",
};

function formatRelativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);
  if (diffMin < 1) return "à l'instant";
  if (diffMin < 60) return `il y a ${diffMin} min`;
  if (diffHours < 24) return `il y a ${diffHours}h`;
  if (diffDays === 1) return "hier";
  if (diffDays < 7) return `il y a ${diffDays}j`;
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function getSourceIcon(source: string) {
  switch (source.toLowerCase()) {
    case "check-in":
      return { icon: Calendar, color: "#FF9500" };
    case "journal":
      return { icon: BookOpen, color: "#64D2FF" };
    case "méditation":
      return { icon: Zap, color: "#4ADE80" };
    case "sans pari":
      return { icon: Flame, color: "#FF3B30" };
    case "article":
      return { icon: BookOpen, color: "#BF5AF2" };
    default:
      return { icon: Sparkles, color: "#FBBF24" };
  }
}

/* ========================================================================
   Level-up confetti burst
   ======================================================================== */

function ConfettiBurst({ show }: { show: boolean }) {
  if (!show) return null;
  const colors = ["#FF3B30", "#FF9500", "#4ADE80", "#64D2FF", "#FBBF24", "#BF5AF2"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => {
        const color = colors[i % colors.length];
        const leftPos = `${(i * 3.4) % 100}%`;
        const delay = `${(i * 0.04).toFixed(2)}s`;
        const duration = `${(1.0 + (i % 5) * 0.18).toFixed(2)}s`;
        const size = 7 + (i % 4) * 2;
        const rotation = (i * 41) % 360;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: leftPos,
              top: "-10px",
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "2px" : "0",
              transform: `rotate(${rotation}deg)`,
              animation: `confetti-burst ${duration} ease-out ${delay} forwards`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-burst {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translateY(560px) rotate(720deg) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ========================================================================
   Section: Level & XP Hero Card
   ======================================================================== */

function LevelXPCard() {
  const { xp, streakDays } = useStore();
  const levelInfo = computeLevel(xp);
  const prevLevelRef = useRef(levelInfo.level);
  const [showConfetti, setShowConfetti] = useState(false);
  const [levelPulse, setLevelPulse] = useState(false);

  // Trigger confetti when level increases (deferred to avoid cascading renders)
  useEffect(() => {
    if (levelInfo.level > prevLevelRef.current) {
      const enterTimeout = setTimeout(() => {
        setShowConfetti(true);
        setLevelPulse(true);
      }, 0);
      const t1 = setTimeout(() => setShowConfetti(false), 2000);
      const t2 = setTimeout(() => setLevelPulse(false), 1200);
      // Level-up fanfare + success haptic
      try {
        sound.playLevelUp();
        haptics.success();
      } catch {
        /* noop — audio not ready */
      }
      toast.success(`Niveau ${levelInfo.level} atteint !`, {
        description: `Tu es maintenant ${levelInfo.tier}`,
        icon: <Trophy size={16} className="text-[#FBBF24]" />,
        duration: 4000,
      });
      prevLevelRef.current = levelInfo.level;
      return () => {
        clearTimeout(enterTimeout);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    prevLevelRef.current = levelInfo.level;
  }, [levelInfo.level, levelInfo.tier]);

  const progress = Math.max(0, Math.min(100, levelInfo.progress));
  const tierGradient = TIER_GRADIENTS[levelInfo.tier];
  const tierEmoji = TIER_EMOJIS[levelInfo.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong p-5 mb-4 relative overflow-hidden"
    >
      <ConfettiBurst show={showConfetti} />

      {/* Decorative blurs */}
      <div
        className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-60"
        style={{ background: tierGradient }}
      />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-[#FF9500]/15 blur-3xl" />

      <div className="relative">
        {/* Top row: tier + level badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-[#FBBF24]" />
            <span className="text-white/60 text-[11px] font-medium uppercase tracking-wider">
              Niveau & XP
            </span>
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1"
            style={{ background: tierGradient }}
          >
            {tierEmoji} {levelInfo.tier}
          </span>
        </div>

        {/* Big level number + tier emoji */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-white/50 text-xs mb-0.5">Niveau actuel</p>
            <motion.div
              animate={
                levelPulse
                  ? { scale: [1, 1.25, 1], rotate: [0, 4, -4, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.6 }}
              className="text-6xl font-extrabold leading-none font-[family-name:var(--font-poppins)]"
              style={{
                background: tierGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {levelInfo.level}
            </motion.div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl"
          >
            {tierEmoji}
          </motion.div>
        </div>

        {/* XP progress bar */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-white/60 text-xs font-medium">
            {xp.toLocaleString("fr-FR")} XP
          </span>
          <span className="text-white/60 text-xs">
            {levelInfo.maxXP.toLocaleString("fr-FR")} XP
          </span>
        </div>
        <div className="h-3 bg-white/8 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full relative rounded-full"
            style={{ background: tierGradient }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* shimmer overlay */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2.5s linear infinite",
              }}
            />
          </motion.div>
        </div>
        <p className="text-white/40 text-xs mt-2 text-center">
          Plus que{" "}
          <span className="text-white font-semibold">
            {(levelInfo.maxXP - xp).toLocaleString("fr-FR")} XP
          </span>{" "}
          pour atteindre le niveau {levelInfo.level + 1}
        </p>

        {/* Streak bonus indicator */}
        {streakDays >= 7 && (
          <div className="mt-4 flex items-center justify-center gap-2 px-3 py-2 rounded-2xl bg-[#FBBF24]/10 border border-[#FBBF24]/20">
            <Flame size={14} className="text-[#FBBF24]" />
            <span className="text-[#FBBF24] text-xs font-semibold">
              Bonus de série actif : ×{getStreakMultiplier(streakDays)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ========================================================================
   Section: Weekly Challenges
   ======================================================================== */

function WeeklyChallenges() {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-[#FF3B30]" />
          <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
            Défis hebdomadaires
          </h2>
        </div>
        <span className="text-white/40 text-[10px]">Réinitialisé chaque lundi</span>
      </div>
      <div className="space-y-3">
        {WEEKLY_CHALLENGES.map((challenge, idx) => {
          const Icon = challenge.icon;
          const progress = Math.min(100, (challenge.current / challenge.target) * 100);
          const isComplete = challenge.current >= challenge.target;
          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className={`glass-card p-4 relative overflow-hidden ${
                isComplete ? "border border-[#4ADE80]/40" : ""
              }`}
            >
              <div
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl opacity-40"
                style={{ background: challenge.bg }}
              />
              <div className="relative flex items-start gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: challenge.bg }}
                >
                  <Icon size={20} style={{ color: challenge.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm font-semibold font-[family-name:var(--font-poppins)]">
                    {challenge.title}
                  </h3>
                  <p className="text-white/50 text-xs mt-0.5">{challenge.description}</p>
                </div>
                <span
                  className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                  style={{
                    background: `${challenge.color}20`,
                    color: challenge.color,
                  }}
                >
                  <Zap size={10} />
                  +{challenge.reward}
                </span>
              </div>
              <div className="relative">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-white/70 font-medium">
                    {challenge.current.toLocaleString("fr-FR")} /{" "}
                    {challenge.target.toLocaleString("fr-FR")} {challenge.unit}
                  </span>
                  <span className="text-white/50">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: isComplete
                        ? "linear-gradient(90deg, #4ADE80 0%, #22D3EE 100%)"
                        : `linear-gradient(90deg, ${challenge.color} 0%, ${challenge.color}99 100%)`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ========================================================================
   Section: Streak Multipliers
   ======================================================================== */

const MULTIPLIER_TIERS = [
  { range: "1 - 6 jours", multiplier: "1.0x", label: "Normal", min: 0, max: 6, color: "#9CA3AF" },
  { range: "7 - 13 jours", multiplier: "1.2x", label: "+20% XP", min: 7, max: 13, color: "#4ADE80" },
  { range: "14 - 29 jours", multiplier: "1.5x", label: "+50% XP", min: 14, max: 29, color: "#FBBF24" },
  { range: "30 - 89 jours", multiplier: "2.0x", label: "Double XP", min: 30, max: 89, color: "#FF9500" },
  { range: "90+ jours", multiplier: "3.0x", label: "Triple XP", min: 90, max: Infinity, color: "#BF5AF2" },
];

function StreakMultipliers() {
  const { streakDays } = useStore();
  const currentTier = getMultiplierTier(streakDays);

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Flame size={14} className="text-[#FF9500]" />
          <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
            Multiplicateurs de série
          </h2>
        </div>
      </div>

      {/* Current multiplier hero card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl p-5 mb-3"
        style={{
          background: `linear-gradient(135deg, ${currentTier.color}25 0%, rgba(11,19,43,0.7) 70%)`,
          border: `1px solid ${currentTier.color}40`,
          boxShadow: `0 0 40px ${currentTier.color}30, 0 0 80px ${currentTier.color}15`,
        }}
      >
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-60"
          style={{ background: `${currentTier.color}40` }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <span className="text-white/60 text-[11px] font-medium uppercase tracking-wider">
              Ton multiplicateur
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <motion.span
                key={currentTier.multiplier}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="text-5xl font-extrabold font-[family-name:var(--font-poppins)] tabular-nums"
                style={{ color: currentTier.color }}
              >
                ×{currentTier.multiplier.toFixed(1)}
              </motion.span>
            </div>
            <p className="text-white/70 text-xs font-semibold mt-1">
              {currentTier.label}
            </p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl"
          >
            {streakDays >= 90 ? "👑" : streakDays >= 30 ? "🔥" : streakDays >= 14 ? "⚡" : streakDays >= 7 ? "🌟" : "🌱"}
          </motion.div>
        </div>
        <div className="relative mt-3 px-3 py-2 rounded-xl bg-black/30">
          <p className="text-white/70 text-xs">
            Série actuelle : <span className="text-white font-bold">{streakDays} jour{streakDays !== 1 ? "s" : ""}</span>
          </p>
        </div>
      </motion.div>

      {/* Tier ladder */}
      <div className="glass-card p-3 space-y-2">
        {MULTIPLIER_TIERS.map((tier) => {
          const isCurrent =
            streakDays >= tier.min && streakDays <= (tier.max === Infinity ? 99999 : tier.max);
          const isUnlocked = streakDays >= tier.min;
          return (
            <motion.div
              key={tier.range}
              animate={
                isCurrent
                  ? { boxShadow: `0 0 18px ${tier.color}50` }
                  : { boxShadow: "0 0 0 rgba(0,0,0,0)" }
              }
              className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-300 ${
                isCurrent ? "bg-white/5" : ""
              } ${!isUnlocked ? "opacity-40" : ""}`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs"
                style={{
                  background: isUnlocked ? `${tier.color}25` : "rgba(255,255,255,0.05)",
                  color: isUnlocked ? tier.color : "rgba(255,255,255,0.4)",
                }}
              >
                {isUnlocked && !isCurrent ? (
                  <Check size={14} strokeWidth={3} />
                ) : isCurrent ? (
                  <Flame size={14} />
                ) : (
                  "🔒"
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-semibold ${
                    isCurrent ? "text-white" : isUnlocked ? "text-white/80" : "text-white/40"
                  }`}
                >
                  {tier.range}
                </p>
                <p className="text-white/50 text-[10px]">{tier.label}</p>
              </div>
              <span
                className="font-extrabold text-sm tabular-nums font-[family-name:var(--font-poppins)]"
                style={{ color: isUnlocked ? tier.color : "rgba(255,255,255,0.3)" }}
              >
                {tier.multiplier}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ========================================================================
   Section: XP History
   ======================================================================== */

function XPHistory() {
  const { xpHistory } = useStore();

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <History size={14} className="text-[#64D2FF]" />
          <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
            Historique XP
          </h2>
        </div>
        <span className="text-white/40 text-xs">{xpHistory.length} entrée{xpHistory.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="glass-card p-3 max-h-96 overflow-y-auto custom-scroll">
        {xpHistory.length === 0 ? (
          <div className="py-10 text-center">
            <div className="text-4xl mb-2 opacity-50">📜</div>
            <p className="text-white/50 text-sm">Aucun XP gagné pour l'instant</p>
            <p className="text-white/30 text-xs mt-1">Complète des quêtes pour commencer</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {xpHistory.slice(0, 10).map((entry, idx) => {
              const { icon: Icon, color } = getSourceIcon(entry.source);
              return (
                <motion.li
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}20` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {entry.source}
                    </p>
                    <p className="text-white/40 text-[11px]">
                      {formatRelativeTime(entry.timestamp)}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-[#4ADE80] font-bold text-sm tabular-nums">
                    +{entry.amount} XP
                  </span>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ========================================================================
   Section: Leaderboard Preview + Full modal
   ======================================================================== */

function Leaderboard() {
  const { xp, name } = useStore();
  const [showFull, setShowFull] = useState(false);

  // Build leaderboard with the current user's real XP injected
  const fullBoard = useMemo(() => {
    const me: LeaderUser = {
      id: "me",
      name: name || "Toi",
      xp,
      country: "🌍",
      badge: xp >= 8000 ? "👑" : xp >= 4000 ? "🏆" : xp >= 1500 ? "🛡️" : xp >= 500 ? "⚔️" : "🌱",
      isMe: true,
    };
    const others = LEADERBOARD_SEED.filter((u) => !u.isMe);
    return [...others, me].sort((a, b) => b.xp - a.xp);
  }, [xp, name]);

  const top5 = fullBoard.slice(0, 5);
  const myRank = fullBoard.findIndex((u) => u.isMe) + 1;

  const rankBadge = (rank: number): string => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const rankColor = (rank: number): string => {
    if (rank === 1) return "#FBBF24";
    if (rank === 2) return "#9CA3AF";
    if (rank === 3) return "#FF9500";
    return "rgba(255,255,255,0.4)";
  };

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Trophy size={14} className="text-[#FBBF24]" />
          <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
            Classement de la semaine
          </h2>
        </div>
        <button
          onClick={() => setShowFull(true)}
          className="text-white/50 text-xs flex items-center gap-1 hover:text-white/80 transition-colors"
        >
          Voir tout <ChevronRight size={12} />
        </button>
      </div>

      <div className="glass-card p-3 space-y-1.5">
        {/* My rank banner */}
        <div className="mb-2 px-3 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF3B30]/15 to-[#FF9500]/15 border border-[#FF3B30]/25 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Medal size={16} className="text-[#FF9500]" />
            <span className="text-white/80 text-xs font-medium">Ton rang</span>
          </div>
          <span className="text-white font-bold text-sm">#{myRank}</span>
        </div>

        {top5.map((user, idx) => {
          const rank = idx + 1;
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${
                user.isMe
                  ? "bg-gradient-to-r from-[#FF3B30]/15 to-transparent border border-[#FF3B30]/30"
                  : "hover:bg-white/5"
              }`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs"
                style={{
                  background: `${rankColor(rank)}25`,
                  color: rankColor(rank),
                }}
              >
                {rankBadge(rank)}
              </div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                {user.badge}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold truncate ${
                    user.isMe ? "text-white" : "text-white/80"
                  }`}
                >
                  {user.name} {user.country}
                </p>
                <p className="text-white/40 text-[11px]">
                  {user.xp.toLocaleString("fr-FR")} XP
                </p>
              </div>
              {rank <= 3 && (
                <span className="flex-shrink-0">
                  <Crown
                    size={14}
                    style={{ color: rankColor(rank) }}
                    fill={rankColor(rank)}
                  />
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Full leaderboard modal */}
      <AnimatePresence>
        {showFull && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setShowFull(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-5 max-w-[430px] w-full rounded-t-3xl max-h-[85vh] overflow-y-auto custom-scroll safe-bottom"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sticky top-0 pb-3 -mt-1 bg-gradient-to-b from-[#0B132B]/95 to-transparent backdrop-blur-sm z-10">
                <div className="flex items-center gap-2">
                  <Trophy size={18} className="text-[#FBBF24]" />
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)]">
                    Classement complet
                  </h3>
                </div>
                <button
                  onClick={() => setShowFull(false)}
                  className="w-8 h-8 rounded-full glass-pill flex items-center justify-center"
                  aria-label="Fermer"
                >
                  <X size={16} className="text-white/60" />
                </button>
              </div>

              {/* Podium for top 3 */}
              <div className="flex items-end justify-center gap-2 mb-4">
                {fullBoard.slice(0, 3).map((user, idx) => {
                  const rank = idx + 1;
                  const heights = ["h-20", "h-16", "h-12"];
                  return (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1, type: "spring", stiffness: 200 }}
                      className={`flex-1 flex flex-col items-center ${user.isMe ? "ring-2 ring-[#FF3B30] rounded-2xl" : ""}`}
                    >
                      <div className="text-2xl mb-1">{user.badge}</div>
                      <div className="text-[10px] text-white/70 font-medium text-center truncate w-full px-1">
                        {user.name.split(" ")[0]}
                      </div>
                      <div className="text-[10px] text-white/50">{user.xp.toLocaleString("fr-FR")} XP</div>
                      <div
                        className={`w-full ${heights[idx]} rounded-t-xl mt-1 flex items-center justify-center text-2xl`}
                        style={{
                          background: `linear-gradient(180deg, ${rankColor(rank)}40 0%, ${rankColor(rank)}10 100%)`,
                          border: `1px solid ${rankColor(rank)}40`,
                        }}
                      >
                        {rankBadge(rank)}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Full list */}
              <div className="space-y-1">
                {fullBoard.map((user, idx) => {
                  const rank = idx + 1;
                  return (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
                        user.isMe
                          ? "bg-gradient-to-r from-[#FF3B30]/15 to-transparent border border-[#FF3B30]/30"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="w-7 text-center font-bold text-xs tabular-nums"
                        style={{ color: rankColor(rank) }}
                      >
                        {rankBadge(rank)}
                      </span>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        {user.badge}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${user.isMe ? "text-white" : "text-white/80"}`}>
                          {user.name} {user.country}
                        </p>
                        <p className="text-white/40 text-[11px]">
                          {user.xp.toLocaleString("fr-FR")} XP
                        </p>
                      </div>
                      {rank <= 3 && (
                        <Crown
                          size={14}
                          style={{ color: rankColor(rank) }}
                          fill={rankColor(rank)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-white/40 text-[11px] text-center mt-4">
                Le classement se réinitialise chaque lundi à minuit.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ========================================================================
   Main screen
   ======================================================================== */

export function GamificationScreen() {
  const t = useT();
  const { navigate, lastQuestReset, resetDailyQuests, dailyQuests } = useStore();

  // Auto-reset daily quests if it's a new day (defensive — also done in page.tsx)
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastQuestReset !== today) {
      // Only reset if there was a previous reset (don't wipe on first ever load)
      if (lastQuestReset !== null) {
        resetDailyQuests();
      }
    }
  }, [lastQuestReset, resetDailyQuests, dailyQuests]);

  return (
    <div className="min-h-screen px-5 pt-12 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("dashboard")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)] leading-tight flex items-center gap-2">
            {t("gamificationTitle")}
          </h1>
          <p className="text-white/50 text-xs">{t("gamificationSubtitle")}</p>
        </div>
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center glow-red">
          <Gamepad2 size={20} className="text-white" />
        </div>
      </div>

      {/* Section 1: Level & XP Hero Card */}
      <LevelXPCard />

      {/* Section 2: Daily Quests */}
      <div className="mb-6">
        <DailyQuests compact showHeader />
      </div>

      {/* Section 3: Weekly Challenges */}
      <WeeklyChallenges />

      {/* Section 4: Streak Multipliers */}
      <StreakMultipliers />

      {/* Section 5: XP History */}
      <XPHistory />

      {/* Section 6: Leaderboard Preview */}
      <Leaderboard />

      {/* Footer hint */}
      <div className="text-center mt-8">
        <p className="text-white/30 text-[11px] flex items-center justify-center gap-1.5">
          <Award size={11} />
          Gagne de l'XP en restant actif dans ta récupération
        </p>
      </div>
    </div>
  );
}

export default GamificationScreen;
