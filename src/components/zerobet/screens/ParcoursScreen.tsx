"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Lock,
  Sparkles,
  TrendingUp,
  Award,
  ChevronRight,
  Crown,
  Zap,
  X,
  Scroll,
  Shield,
} from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import {
  PARCOURS_RANKS,
  getCurrentRank,
  getNextRank,
} from "@/lib/data/parcours-data";
import type { ParcoursRank } from "@/lib/data/parcours-data";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { ArtifactIcon } from "@/components/zerobet/components/ArtifactIcon";
import { useT } from "@/lib/i18n/useT";

type FilterTab = "all" | "unlocked" | "locked";

const TABS: { key: FilterTab; labelKey: string }[] = [
  { key: "all", labelKey: "parcoursAll" },
  { key: "unlocked", labelKey: "parcoursUnlocked" },
  { key: "locked", labelKey: "parcoursLocked" },
];

/**
 * Build a small deterministic particle config for an artifact,
 * used inside the aura-particles layer of high-tier cards.
 */
function buildAuraParticles(rank: ParcoursRank) {
  const count = rank.tier >= 11 ? 8 : rank.tier >= 7 ? 5 : 0;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${15 + ((i * 13) % 70)}%`,
    bottom: `${10 + ((i * 17) % 30)}%`,
    delay: `${(i * 0.7).toFixed(2)}s`,
    duration: `${(5 + (i % 4)).toFixed(2)}s`,
    drift: `${(i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 6)}px`,
  }));
}

export function ParcoursScreen() {
  const {
    navigate,
    streakDays,
    adminStreakOverride,
    unlockedRanks,
  } = useStore();
  const t = useT();

  const [filter, setFilter] = useState<FilterTab>("all");
  const [selectedRank, setSelectedRank] = useState<ParcoursRank | null>(null);

  const effectiveStreak = adminStreakOverride !== null ? adminStreakOverride : streakDays;
  const currentRank = getCurrentRank(effectiveStreak);
  const nextRank = getNextRank(effectiveStreak);

  const isUnlocked = (rank: ParcoursRank): boolean =>
    effectiveStreak >= rank.requiredDays || unlockedRanks.includes(rank.key);

  const progressToNext = useMemo(() => {
    if (!nextRank) return 100;
    const range = nextRank.requiredDays - currentRank.requiredDays;
    if (range <= 0) return 100;
    return Math.min(100, Math.max(0, ((effectiveStreak - currentRank.requiredDays) / range) * 100));
  }, [currentRank, nextRank, effectiveStreak]);

  const filteredRanks = useMemo(() => {
    const checkUnlocked = (rank: ParcoursRank) =>
      effectiveStreak >= rank.requiredDays || unlockedRanks.includes(rank.key);
    if (filter === "unlocked") return PARCOURS_RANKS.filter(checkUnlocked);
    if (filter === "locked") return PARCOURS_RANKS.filter((r) => !checkUnlocked(r));
    return PARCOURS_RANKS;
  }, [filter, effectiveStreak, unlockedRanks]);

  const unlockedCount = useMemo(
    () =>
      PARCOURS_RANKS.filter(
        (r) => effectiveStreak >= r.requiredDays || unlockedRanks.includes(r.key)
      ).length,
    [effectiveStreak, unlockedRanks]
  );

  const openRankDetail = (rank: ParcoursRank) => {
    const unlocked = isUnlocked(rank);
    if (!unlocked) {
      sound.playPop();
      haptics.light();
      return;
    }
    sound.playPop();
    haptics.medium();
    setSelectedRank(rank);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
  };

  const isLegendary = currentRank.tier >= 12;

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
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight">
            {t("parcoursQuestTitle")}
          </h1>
          <p className="text-white/40 text-[11px]">
            {t("parcoursArtifactsCount", { n: unlockedCount, total: PARCOURS_RANKS.length })}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <Award size={18} style={{ color: currentRank.color }} />
        </div>
      </motion.div>

      {/* Narrative subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-center text-white/55 text-[12px] italic mb-4 px-2"
      >
        {t("parcoursEachArtifactCloser")}
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* Current artifact hero card */}
        <motion.div
          variants={itemVariants}
          className={`relative glass-card-strong p-6 overflow-hidden artifact-aura aura-tier-${currentRank.tier} ${
            isLegendary ? "legendary-aura" : ""
          }`}
          style={
            {
              boxShadow: `0 0 60px ${currentRank.glow}`,
              "--aura-color": currentRank.auraColor,
            } as React.CSSProperties
          }
        >
          {/* Decorative gradient backgrounds */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{ background: currentRank.color }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: currentRank.color }}
          />

          <div className="relative flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.7, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="relative"
            >
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center badge-aura artifact-shine aura-breathe"
                style={{
                  background: currentRank.gradient,
                  ["--aura-color" as string]: currentRank.auraColor,
                }}
              >
                <ArtifactIcon artifactKey={currentRank.key} size={64} glow={true} />
              </div>
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ border: `2px solid ${currentRank.color}` }}
                animate={{ scale: [1, 1.2], opacity: [0.6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 mb-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: currentRank.color }}
                />
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">
                  {t("parcoursCurrentArtifact")}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white font-[family-name:var(--font-poppins)] leading-tight">
                {t(currentRank.nameKey)}
              </h2>
              <p className="text-white/60 text-xs mt-1">{t(currentRank.subtitleKey)}</p>

              {/* Artifact type badge */}
              <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md border border-white/10 bg-white/5">
                <Scroll size={9} className="text-white/60" />
                <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">
                  {currentRank.artifactType}
                </span>
              </div>
            </div>
          </div>

          {/* Power display */}
          <div className="relative mt-4 p-3 rounded-xl bg-black/30 border border-white/[0.06]">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap size={12} style={{ color: currentRank.auraColor }} fill={currentRank.auraColor} />
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: currentRank.auraColor }}
              >
                {t("parcoursPowerLabel", { name: currentRank.powerName })}
              </span>
            </div>
            <p className="text-white/70 text-[11px] leading-relaxed">
              {currentRank.powerDescription}
            </p>
          </div>

          {/* Story / lore */}
          <div className="relative mt-2 flex items-start gap-2 px-1">
            <Sparkles size={11} className="text-white/30 mt-0.5 flex-shrink-0" />
            <p className="text-white/45 text-[11px] italic leading-relaxed">
              {t(currentRank.storyKey)}
            </p>
          </div>

          {/* Evolution button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("parcours-evolution")}
            className="relative mt-5 w-full py-3 rounded-2xl glass-card flex items-center justify-center gap-2 text-sm font-semibold text-white"
          >
            <Sparkles size={15} style={{ color: currentRank.color }} />
            {t("parcoursEvolution")}
            <ChevronRight size={14} className="text-white/50" />
          </motion.button>
        </motion.div>

        {/* Progress to next artifact */}
        <AnimatePresence>
          {nextRank && (
            <motion.div
              variants={itemVariants}
              className="glass-card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#FFC94D]" />
                  <span className="text-xs text-white/70 font-medium">
                    {t("parcoursNextArtifactLabel")} : <span className="text-white font-semibold">{t(nextRank.nameKey)}</span>
                  </span>
                </div>
                <span className="text-[10px] text-white/40 font-mono">
                  {Math.round(progressToNext)}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: nextRank.gradient }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-[11px] text-white/50 mt-2 text-center">
                {t("parcoursDaysUntilRank", { n: nextRank.requiredDays - effectiveStreak })}{" "}
                <span style={{ color: nextRank.color }} className="font-semibold inline-flex items-center gap-1 align-middle">
                  <ArtifactIcon artifactKey={nextRank.key} size={16} glow={true} />
                  {t(nextRank.nameKey)}
                </span>
              </p>
              <p className="text-[10px] text-white/40 mt-1 text-center italic">
                {t("parcoursUpcomingPower", { name: nextRank.powerName })}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter tabs */}
        <motion.div variants={itemVariants} className="flex gap-2">
          {TABS.map((tab) => {
            const isActive = filter === tab.key;
            const count =
              tab.key === "all"
                ? PARCOURS_RANKS.length
                : tab.key === "unlocked"
                ? unlockedCount
                : PARCOURS_RANKS.length - unlockedCount;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "glass-card-strong text-white"
                    : "glass-card text-white/50"
                }`}
              >
                {t(tab.labelKey)}
                <span className={`ml-1.5 text-[10px] ${isActive ? "text-white/70" : "text-white/30"}`}>
                  {" "}{count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Artifacts grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredRanks.map((rank, idx) => {
              const unlocked = isUnlocked(rank);
              const isCurrent = rank.key === currentRank.key;
              const particles = buildAuraParticles(rank);
              return (
                <motion.button
                  key={rank.key}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ delay: idx * 0.03, type: "spring", stiffness: 280, damping: 22 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openRankDetail(rank)}
                  aria-label={`${t(rank.nameKey)}${unlocked ? ` — ${t("parcoursUnlocked")}` : ` — ${t("parcoursLocked")}`}`}
                  className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-2 text-left artifact-aura aura-tier-${rank.tier} ${
                    unlocked ? "glass-card artifact-shine" : "glass-card"
                  } ${isCurrent ? "ring-2" : ""}`}
                  style={
                    {
                      "--aura-color": rank.auraColor,
                      "--tw-ring-color": isCurrent ? rank.color : undefined,
                    } as React.CSSProperties
                  }
                >
                  {unlocked && particles.length > 0 && (
                    <div className="aura-particles">
                      {particles.map((p) => (
                        <span
                          key={p.id}
                          className="aura-particle"
                          style={
                            {
                              left: p.left,
                              bottom: p.bottom,
                              animationDelay: p.delay,
                              animationDuration: p.duration,
                              ["--particle-drift" as string]: p.drift,
                            } as React.CSSProperties
                          }
                        />
                      ))}
                    </div>
                  )}

                  {unlocked ? (
                    <div
                      className={`relative w-12 h-12 rounded-xl flex items-center justify-center badge-aura ${
                        isCurrent ? "aura-breathe" : ""
                      }`}
                      style={{
                        background: rank.gradient,
                        ["--aura-color" as string]: rank.auraColor,
                      }}
                    >
                      <ArtifactIcon artifactKey={rank.key} size={36} glow={true} />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center opacity-40 grayscale">
                      <Lock size={18} className="text-white/50" />
                    </div>
                  )}

                  <p
                    className={`text-[10px] font-semibold mt-1.5 text-center leading-tight ${
                      unlocked ? "text-white" : "text-white/40"
                    }`}
                  >
                    {unlocked ? t(rank.nameKey) : `???`}
                  </p>
                  <p className={`text-[9px] ${unlocked ? "text-white/50" : "text-white/30"}`}>
                    {unlocked ? (
                      <span className="inline-flex items-center gap-0.5">
                        <Zap size={7} style={{ color: rank.auraColor }} />
                        {rank.powerName}
                      </span>
                    ) : (
                      t("parcoursDaysShort", { n: rank.requiredDays })
                    )}
                  </p>
                  {!unlocked && (
                    <p className="text-[8px] text-white/25 mt-0.5">
                      {t("parcoursDaysShort", { n: rank.requiredDays })}
                    </p>
                  )}

                  {/* Current rank indicator */}
                  {isCurrent && (
                    <motion.div
                      layoutId="current-rank-indicator"
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full gradient-primary flex items-center justify-center"
                      style={{ boxShadow: "0 0 12px rgba(255,59,48,0.6)" }}
                    >
                      <Crown size={10} className="text-white" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state for locked filter */}
        {filter === "locked" && PARCOURS_RANKS.length - unlockedCount === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-6 text-center"
          >
            <Crown size={32} className="text-[#FBBF24] mx-auto mb-2" />
            <p className="text-white font-semibold text-sm">{t("parcoursLegend")}</p>
            <p className="text-white/50 text-xs mt-1">
              {t("parcoursAllUnlockedDesc")}
            </p>
          </motion.div>
        )}

        {/* Footer motivation */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-4 text-center"
        >
          <p className="text-white/60 text-xs leading-relaxed">
            {t("parcoursFooterMotivationNew1")}
            <br />
            <span className="text-white font-semibold">{t("parcoursFooterMotivationNew2")}</span>
          </p>
        </motion.div>
      </motion.div>

      {/* ============ Power detail bottom-sheet modal ============ */}
      <AnimatePresence>
        {selectedRank && (
          <PowerDetailSheet
            rank={selectedRank}
            isCurrent={selectedRank.key === currentRank.key}
            onClose={() => {
              haptics.light();
              setSelectedRank(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   PowerDetailSheet — bottom-sheet modal showing the full
   artifact card with aura, power, lore, and close button.
   ============================================================ */
function PowerDetailSheet({
  rank,
  isCurrent,
  onClose,
}: {
  rank: ParcoursRank;
  isCurrent: boolean;
  onClose: () => void;
}) {
  const t = useT();
  const isLegendary = rank.tier >= 12;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[430px] rounded-t-3xl glass-card-strong p-6 pb-8 max-h-[88vh] overflow-y-auto artifact-aura aura-tier-${rank.tier} ${
          isLegendary ? "legendary-aura" : ""
        }`}
        style={
          {
            "--aura-color": rank.auraColor,
            boxShadow: `0 -10px 60px ${rank.glow}`,
          } as React.CSSProperties
        }
      >
        {/* Drag handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={t("close")}
          className="absolute top-4 right-4 w-8 h-8 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
        >
          <X size={16} className="text-white/70" />
        </button>

        {/* Artifact type badge */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10">
            <Scroll size={10} className="text-white/70" />
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">
              {t("parcoursTierLabel", { tier: rank.tier, type: rank.artifactType })}
            </span>
          </div>
        </div>

        {/* Artifact icon with full aura */}
        <div className="relative flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0.5, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="relative w-28 h-28 rounded-3xl flex items-center justify-center badge-aura artifact-shine aura-breathe"
            style={
              {
                background: rank.gradient,
                ["--aura-color" as string]: rank.auraColor,
                boxShadow: `0 0 50px ${rank.glow}`,
              } as React.CSSProperties
            }
          >
            <ArtifactIcon artifactKey={rank.key} size={80} glow={true} />
          </motion.div>
        </div>

        {/* Artifact name (big, with aura color) */}
        <h2
          className="text-center text-2xl font-extrabold font-[family-name:var(--font-poppins)] tracking-tight leading-tight"
          style={{ color: rank.color }}
        >
          {t(rank.nameKey)}
        </h2>
        <p className="text-center text-white/55 text-xs mt-1">{t(rank.subtitleKey)}</p>

        {isCurrent && (
          <div className="flex justify-center mt-2">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
              style={{ background: rank.color, color: "#0B0704" }}
            >
              <Crown size={9} /> {t("parcoursCurrentArtifact")}
            </span>
          </div>
        )}

        {/* Power card */}
        <div className="mt-5 p-4 rounded-2xl bg-black/30 border border-white/[0.06]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Zap size={14} style={{ color: rank.auraColor }} fill={rank.auraColor} />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: rank.auraColor }}
            >
              {t("parcoursPowerNameLabel", { name: rank.powerName })}
            </span>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            {rank.powerDescription}
          </p>
        </div>

        {/* Story / lore */}
        <div className="mt-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Shield size={11} className="text-white/40" />
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
              {t("artifactSectionLabel")}
            </span>
          </div>
          <p className="text-white/60 text-[12px] italic leading-relaxed">
            {t(rank.storyKey)}
          </p>
        </div>

        {/* Days required */}
        <div className="mt-3 flex items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">{t("parcoursThreshold")}</span>
            <span className="text-sm font-bold text-white font-mono">
              {t("parcoursDaysShort", { n: rank.requiredDays })}
            </span>
          </div>
        </div>

        {/* Close button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-2xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-2 btn-press"
        >
          <X size={15} />
          {t("close")}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default ParcoursScreen;
