"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { X, Lock, Sparkles, Crown, Zap, Scroll } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import {
  PARCOURS_RANKS,
  getCurrentRank,
} from "@/lib/data/parcours-data";
import type { ParcoursRank } from "@/lib/data/parcours-data";
import { ArtifactIcon } from "@/components/zerobet/components/ArtifactIcon";
import { useT } from "@/lib/i18n/useT";

interface ParticleConfig {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

function buildParticles(rank: ParcoursRank): ParticleConfig[] {
  return Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 80}%`,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 4,
    color: rank.color,
  }));
}

function getMotivationalMessage(rank: ParcoursRank): string {
  const tier = rank.tier;
  if (tier <= 2) {
    return "parcoursMotivTier1";
  }
  if (tier <= 4) {
    return "parcoursMotivTier3";
  }
  if (tier <= 6) {
    return "parcoursMotivTier5";
  }
  if (tier <= 8) {
    return "parcoursMotivTier7";
  }
  if (tier <= 10) {
    return "parcoursMotivTier9";
  }
  if (tier === 12) {
    return "parcoursMotivTier12";
  }
  return "parcoursMotivTier13";
}

/**
 * Build a multi-stop vertical gradient from the auras of all 13 ranks,
 * so the timeline connector visually shifts color as you progress.
 */
function buildTimelineGradient(unlockedCount: number): string {
  const stops = PARCOURS_RANKS.map((r, i) => {
    // Unlocked ranks keep their full color; locked ranks fade.
    const isUnlocked = i < unlockedCount;
    const color = r.auraColor;
    const alpha = isUnlocked ? 0.85 : 0.15;
    const pct = (i / (PARCOURS_RANKS.length - 1)) * 100;
    // Convert hex to rgba inline for the alpha overlay.
    const rgba = hexToRgba(color, alpha);
    return `${rgba} ${pct.toFixed(1)}%`;
  });
  return `linear-gradient(180deg, ${stops.join(", ")})`;
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ParcoursEvolutionScreen() {
  const { navigate, streakDays, adminStreakOverride, unlockedRanks } = useStore();
  const t = useT();

  const effectiveStreak = adminStreakOverride !== null ? adminStreakOverride : streakDays;
  const currentRank = getCurrentRank(effectiveStreak);

  const isUnlocked = (rank: ParcoursRank): boolean =>
    effectiveStreak >= rank.requiredDays || unlockedRanks.includes(rank.key);

  const particles = useMemo(() => buildParticles(currentRank), [currentRank]);

  const motivKey = useMemo(
    () => getMotivationalMessage(currentRank),
    [currentRank]
  );

  const unlockedCount = useMemo(
    () =>
      PARCOURS_RANKS.filter(
        (r) => effectiveStreak >= r.requiredDays || unlockedRanks.includes(r.key)
      ).length,
    [effectiveStreak, unlockedRanks]
  );

  const timelineGradient = useMemo(
    () => buildTimelineGradient(unlockedCount),
    [unlockedCount]
  );

  const isLegendary = currentRank.tier >= 12;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 220, damping: 22 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden safe-top safe-bottom">
      {/* Cinematic ambient background gradient that shifts with current rank */}
      <motion.div
        key={`bg-${currentRank.key}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${currentRank.glow} 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, ${currentRank.glow} 0%, transparent 50%)`,
        }}
      />

      {/* Floating particles (CSS only) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={`${currentRank.key}-${p.id}`}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-5 pt-12 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-white/40 text-[11px] uppercase tracking-widest font-medium">
              {t("parcoursYourEvolution")}
            </p>
            <h1 className="text-base font-bold text-white font-[family-name:var(--font-poppins)]">
              {t("parcoursVoyage")}
            </h1>
          </div>
          <button
            onClick={() => navigate("parcours")}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
            aria-label={t("close")}
          >
            <X size={20} className="text-white" />
          </button>
        </motion.div>

        {/* Current artifact hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className={`relative flex flex-col items-center justify-center py-6 mb-6 ${
            isLegendary ? "legendary-aura" : ""
          }`}
        >
          {/* Aura rings */}
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 140 + ring * 50,
                height: 140 + ring * 50,
                border: `1.5px solid ${currentRank.color}`,
                opacity: 0.4 - ring * 0.1,
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4 - ring * 0.1, 0.1, 0.4 - ring * 0.1] }}
              transition={{ duration: 3 + ring * 0.5, repeat: Infinity, ease: "easeInOut", delay: ring * 0.3 }}
            />
          ))}

          {/* Big animated badge with magnetic artifact aura */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.2 }}
            className={`relative w-32 h-32 rounded-[2rem] flex items-center justify-center badge-aura artifact-aura aura-tier-${currentRank.tier} aura-breathe artifact-shine`}
            style={
              {
                background: currentRank.gradient,
                ["--aura-color" as string]: currentRank.auraColor,
                boxShadow: `0 0 60px ${currentRank.glow}, 0 0 120px ${currentRank.glow}`,
              } as React.CSSProperties
            }
          >
            <ArtifactIcon artifactKey={currentRank.key} size={88} glow={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-5"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card mb-2">
              <Scroll size={11} className="text-white/60" />
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">
                {t("parcoursTierLabel", { tier: currentRank.tier, type: currentRank.artifactType })}
              </span>
            </div>
            <h2
              className="text-3xl font-extrabold font-[family-name:var(--font-poppins)] tracking-tight"
              style={{ color: currentRank.color }}
            >
              {t(currentRank.nameKey)}
            </h2>
            <p
              className="text-sm font-medium mt-1"
              style={{ color: currentRank.color }}
            >
              {t(currentRank.subtitleKey)}
            </p>

            {/* Power display */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 border border-white/[0.06]">
              <Zap size={12} style={{ color: currentRank.auraColor }} fill={currentRank.auraColor} />
              <span
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: currentRank.auraColor }}
              >
                {currentRank.powerName}
              </span>
            </div>
            <p className="text-white/65 text-xs mt-2 max-w-xs mx-auto leading-relaxed">
              {currentRank.powerDescription}
            </p>
            <p className="text-white/45 text-[11px] mt-2 max-w-xs mx-auto leading-relaxed italic">
              {t(currentRank.storyKey)}
            </p>
          </motion.div>
        </motion.div>

        {/* Vertical timeline of all artifacts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative pl-2"
        >
          {/* Timeline vertical line — multi-color gradient shifting across tiers */}
          <div
            className="absolute left-[26px] top-2 bottom-2 w-[2px] rounded-full"
            style={{ background: timelineGradient }}
          />

          <div className="space-y-3">
            {PARCOURS_RANKS.map((rank, idx) => {
              const unlocked = isUnlocked(rank);
              const isCurrent = rank.key === currentRank.key;
              const isPast = unlocked && !isCurrent;
              const nodeLegendary = rank.tier >= 12 && unlocked;

              return (
                <motion.div
                  key={rank.key}
                  variants={rowVariants}
                  className="relative flex items-start gap-4 pl-0"
                >
                  {/* Timeline node */}
                  <div className={`relative flex-shrink-0 mt-1 ${nodeLegendary ? "legendary-aura" : ""}`}>
                    {unlocked ? (
                      <motion.div
                        animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2.5, repeat: isCurrent ? Infinity : 0 }}
                        className={`relative w-12 h-12 rounded-2xl flex items-center justify-center badge-aura artifact-aura aura-tier-${rank.tier} ${
                          isCurrent ? "aura-breathe artifact-shine" : ""
                        }`}
                        style={
                          {
                            background: rank.gradient,
                            ["--aura-color" as string]: rank.auraColor,
                            boxShadow: isPast
                              ? `0 0 12px ${rank.glow}`
                              : isCurrent
                              ? `0 0 40px ${rank.glow}`
                              : "none",
                          } as React.CSSProperties
                        }
                      >
                        <ArtifactIcon artifactKey={rank.key} size={36} glow={true} />
                      </motion.div>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                        <Lock size={16} className="text-white/30" />
                      </div>
                    )}

                    {/* Current rank glow ring */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ border: `2px solid ${rank.color}` }}
                        animate={{ scale: [1, 1.3], opacity: [0.7, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                  </div>

                  {/* Artifact content card */}
                  <motion.div
                    whileTap={{ scale: 0.99 }}
                    className={`flex-1 rounded-2xl p-3.5 transition-all ${
                      unlocked
                        ? "glass-card"
                        : "bg-white/[0.02] border border-white/[0.04]"
                    } ${isCurrent ? "ring-1" : ""}`}
                    style={
                      isCurrent
                        ? ({ "--tw-ring-color": rank.color, boxShadow: `0 0 24px ${rank.glow}` } as React.CSSProperties)
                        : undefined
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`text-sm font-bold ${
                              unlocked ? "text-white" : "text-white/40"
                            }`}
                          >
                            {unlocked ? t(rank.nameKey) : t("parcoursUnknownArtifact", { tier: rank.tier })}
                          </h3>
                          {isCurrent && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                              style={{ background: rank.color, color: "#070B0E" }}
                            >
                              {t("parcoursCurrentBadge")}
                            </motion.span>
                          )}
                          {isPast && (
                            <span className="text-[9px] text-[#4ADE80] font-bold uppercase tracking-wider">
                              {t("parcoursConquered")}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[11px] mt-0.5 ${
                            unlocked ? "text-white/60" : "text-white/30"
                          }`}
                          style={unlocked ? { color: rank.color } : undefined}
                        >
                          {t(rank.subtitleKey)}
                        </p>
                        {/* Power subtitle for each node */}
                        {unlocked ? (
                          <p className="text-[10px] text-white/55 mt-0.5 flex items-center gap-1">
                            <Zap size={8} style={{ color: rank.auraColor }} fill={rank.auraColor} />
                            <span className="font-semibold" style={{ color: rank.auraColor }}>
                              {rank.powerName}
                            </span>
                            <span className="text-white/35">·</span>
                            <span className="text-white/50">{rank.artifactType}</span>
                          </p>
                        ) : (
                          <p className="text-[10px] text-white/30 mt-0.5 italic">
                            {t("parcoursUnknownPower", { type: rank.artifactType })}
                          </p>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          unlocked ? "text-white/70 bg-white/5" : "text-white/30 bg-white/[0.02]"
                        }`}
                      >
                        {t("parcoursDaysShort", { n: rank.requiredDays })}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] mt-1.5 leading-relaxed ${
                        unlocked ? "text-white/55" : "text-white/25"
                      }`}
                    >
                      {unlocked ? t(rank.descKey) : t("parcoursLockedCardDesc")}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Motivational footer message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 glass-card-strong p-5 text-center relative overflow-hidden"
        >
          <div
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: currentRank.color }}
          />
          <div className="relative">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex mb-3"
            >
              <Crown size={20} style={{ color: currentRank.color }} />
            </motion.div>
            <p className="text-white text-sm font-medium leading-relaxed italic">
              {t(motivKey)}
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-white/50">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: currentRank.color }}
              />
              {t("parcoursContinueQuest")}
            </div>
          </div>
        </motion.div>

        {/* Bottom close button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("parcours")}
          className="w-full mt-5 py-3.5 rounded-2xl glass-card text-white text-sm font-semibold flex items-center justify-center gap-2"
        >
          <X size={15} className="text-white/70" />
          {t("parcoursBackToArtifacts")}
        </motion.button>
      </div>
    </div>
  );
}

export default ParcoursEvolutionScreen;
