"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Share2, Sparkles, Trophy, TrendingUp, Wallet, Flame, ImageIcon } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { toast } from "sonner";
import { ArtifactIcon } from "@/components/zerobet/components/ArtifactIcon";
import { useT, useLanguage } from "@/lib/i18n/useT";
import { showLocalNotification } from "@/lib/pwa";
import { markReminderSent, wasReminderSent } from "@/lib/reminders";
import { shareMilestoneCard } from "@/lib/share-card";

const MILESTONE_DAYS = [7, 14, 30, 60, 90, 180, 365];

const MILESTONE_META: Record<
  number,
  {
    titleKey: string;
    messageKey: string;
    emoji: string;
    /** Parcours artifact key — when set, renders ArtifactIcon instead of the emoji */
    artifactKey?: string;
    color: string;
    gradient: string;
  }
> = {
  7: {
    titleKey: "milestoneTitle7",
    messageKey: "milestoneMessage7",
    emoji: "🥉",
    artifactKey: "jour-7",
    color: "#CD7F32",
    gradient: "from-amber-700/40 via-amber-600/20 to-transparent",
  },
  14: {
    titleKey: "milestoneTitle14",
    messageKey: "milestoneMessage14",
    emoji: "🥈",
    artifactKey: "jour-14",
    color: "#C0C0C0",
    gradient: "from-slate-400/40 via-slate-300/20 to-transparent",
  },
  30: {
    titleKey: "milestoneTitle30",
    messageKey: "milestoneMessage30",
    emoji: "🥇",
    artifactKey: "jour-30",
    color: "#FFD700",
    gradient: "from-yellow-500/40 via-amber-500/20 to-transparent",
  },
  60: {
    titleKey: "milestoneTitle60",
    messageKey: "milestoneMessage60",
    emoji: "💎",
    artifactKey: "jour-60",
    color: "#2DD4BF",
    gradient: "from-teal-500/40 via-emerald-500/20 to-transparent",
  },
  90: {
    titleKey: "milestoneTitle90",
    messageKey: "milestoneMessage90",
    emoji: "🔥",
    color: "#C084FC",
    gradient: "from-purple-500/40 via-pink-500/20 to-transparent",
  },
  180: {
    titleKey: "milestoneTitle180",
    messageKey: "milestoneMessage180",
    emoji: "👑",
    artifactKey: "jour-365",
    color: "#F59E0B",
    gradient: "from-amber-500/40 via-orange-500/20 to-transparent",
  },
  365: {
    titleKey: "milestoneTitle365",
    messageKey: "milestoneMessage365",
    emoji: "🏆",
    color: "#10B981",
    gradient: "from-emerald-500/40 via-teal-500/20 to-transparent",
  },
};

const CONFETTI_COLORS = [
  "#10B981",
  "#F59E0B",
  "#4ADE80",
  "#2DD4BF",
  "#FBBF24",
  "#C084FC",
  "#FFD700",
];

interface ConfettiParticle {
  id: number;
  color: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  drift: number;
  shape: 0 | 1 | 2;
}

function generateConfetti(count: number): ConfettiParticle[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1.2,
    size: 6 + Math.floor(Math.random() * 8),
    rotation: Math.floor(Math.random() * 360),
    drift: Math.random() * 120 - 60,
    shape: (i % 3) as 0 | 1 | 2,
  }));
}

// Locale mapping for locale-aware FCFA formatting
const INTL_LOCALES: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
  es: "es-ES",
};

export function MilestoneCelebration() {
  const reducedMotion = useReducedMotion();
  const streakDays = useStore((s) => s.streakDays);
  const weeklyBetAmount = useStore((s) => s.weeklyBetAmount);
  const unlockedRanks = useStore((s) => s.unlockedRanks);
  const celebratedMilestones = useStore((s) => s.celebratedMilestones);
  const markMilestoneCelebrated = useStore((s) => s.markMilestoneCelebrated);
  const t = useT();
  const lang = useLanguage();

  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [confetti] = useState<ConfettiParticle[]>(() =>
    generateConfetti(reducedMotion ? 0 : 36)
  );
  const hasPlayedSoundRef = useRef(false);

  // Detect milestone crossing
  useEffect(() => {
    if (!streakDays || streakDays < 1) return;
    // Find the highest milestone the user has reached that hasn't been celebrated
    const reached = MILESTONE_DAYS.filter(
      (d) => streakDays >= d && !celebratedMilestones.includes(d)
    );
    if (reached.length === 0) return;
    // Show the highest unreached one (most recent)
    const target = reached[reached.length - 1];
    // Defer to next tick so we don't setState during render
    const tt = setTimeout(() => {
      setActiveMilestone(target);
      markMilestoneCelebrated(target);
      // Zerobet 2.0.7 — milestone notification (event-driven, honours the
      // milestoneAlerts preference + browser permission + dedup log).
      const prefs = useStore.getState().notificationPreferences;
      if (
        prefs.milestoneAlerts &&
        typeof Notification !== "undefined" &&
        Notification.permission === "granted" &&
        !wasReminderSent(`milestone-${target}`)
      ) {
        markReminderSent(`milestone-${target}`);
        showLocalNotification(
          t(`milestoneTitle${target}`),
          t(`milestoneMessage${target}`),
          "program"
        ).catch(() => undefined);
      }
    }, 400);
    return () => clearTimeout(tt);
  }, [streakDays, celebratedMilestones, markMilestoneCelebrated, t]);

  // Play sound + haptics when popup opens
  useEffect(() => {
    if (activeMilestone !== null && !hasPlayedSoundRef.current) {
      hasPlayedSoundRef.current = true;
      sound.playAchievement();
      haptics.success();
      // Optional second pattern for emphasis
      setTimeout(() => haptics.heavy(), 200);
    }
    if (activeMilestone === null) {
      hasPlayedSoundRef.current = false;
    }
  }, [activeMilestone]);

  const handleClose = () => {
    setActiveMilestone(null);
  };

  const handleShare = async () => {
    if (!activeMilestone) return;
    const meta = MILESTONE_META[activeMilestone];
    const text = t("milestoneShareText", { n: activeMilestone, emoji: meta.emoji });
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: t("milestoneShareTitle"), text });
        toast.success(t("milestoneShareToast"));
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        toast.success(t("milestoneCopyToast"));
      } else {
        toast.info(t("milestoneShareUnavailable"));
      }
    } catch {
      // user cancelled or error - silent
    }
    sound.playClick();
    haptics.light();
  };

  const meta = activeMilestone !== null ? MILESTONE_META[activeMilestone] : null;

  // Compute savings estimate (weeks × weeklyBetAmount)
  const weeks = activeMilestone ? Math.floor(activeMilestone / 7) : 0;
  const savedEstimate = weeks * weeklyBetAmount;

  // Format with locale-aware thousands separator
  const formatFCFA = (n: number) =>
    new Intl.NumberFormat(INTL_LOCALES[lang] ?? "fr-FR").format(n) + " FCFA";

  // Zerobet 2.0.7 — canvas-drawn pride card (image share)
  const handleShareCard = async () => {
    if (!activeMilestone || !meta) return;
    sound.playClick();
    haptics.medium();
    const result = await shareMilestoneCard({
      days: activeMilestone,
      emoji: meta.emoji,
      color: meta.color,
      daysLabel: t("milestoneDays"),
      title: t(meta.titleKey),
      savedLine: t("milestoneCardSavedLine", {
        n: new Intl.NumberFormat(INTL_LOCALES[lang] ?? "fr-FR").format(savedEstimate),
      }),
      tagline: t("milestoneCardTagline"),
    });
    if (result === "shared") toast.success(t("milestoneCardToast"));
    else if (result === "copied") toast.success(t("milestoneCardCopiedToast"));
    else if (result === "downloaded") toast.success(t("milestoneCardSavedToast"));
    else toast.error(t("milestoneCardError"));
  };

  return (
    <AnimatePresence>
      {activeMilestone !== null && meta && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.95) 100%)",
            backdropFilter: "blur(8px)",
          }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={t("milestoneCelebrationAria", { n: activeMilestone })}
        >
          {/* Confetti layer */}
          {!reducedMotion && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {confetti.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{
                    y: -50,
                    x: `${p.x}vw`,
                    opacity: 1,
                    rotate: p.rotation,
                  }}
                  animate={{
                    y: "110vh",
                    x: `calc(${p.x}vw + ${p.drift}px)`,
                    opacity: [1, 1, 0.8, 0],
                    rotate: p.rotation + 360,
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "absolute",
                    width: p.size,
                    height: p.shape === 1 ? p.size * 1.4 : p.size,
                    background: p.color,
                    borderRadius: p.shape === 0 ? "50%" : p.shape === 2 ? "2px" : "3px",
                    transform: p.shape === 2 ? "rotate(45deg)" : "none",
                  }}
                />
              ))}
            </div>
          )}

          {/* Card */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm glass-card-strong rounded-3xl overflow-hidden"
            style={{
              borderColor: meta.color + "55",
              boxShadow: `0 0 60px -10px ${meta.color}99, 0 0 100px -20px ${meta.color}66`,
            }}
          >
            {/* Gradient backdrop */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${meta.gradient} pointer-events-none`}
            />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label={t("milestoneCloseAria")}
            >
              <X size={16} />
            </button>

            <div className="relative p-8 text-center">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-5"
                style={{
                  background: `radial-gradient(circle, ${meta.color}44 0%, transparent 70%)`,
                  filter: `drop-shadow(0 0 20px ${meta.color})`,
                }}
              >
                <motion.div
                  animate={
                    reducedMotion
                      ? {}
                      : { scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }
                  }
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="flex items-center justify-center"
                  style={{ filter: `drop-shadow(0 0 12px ${meta.color}aa)` }}
                >
                  {meta.artifactKey ? (
                    <ArtifactIcon artifactKey={meta.artifactKey} size={72} glow />
                  ) : (
                    <span className="text-6xl">{meta.emoji}</span>
                  )}
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3"
                  style={{
                    background: meta.color + "22",
                    color: meta.color,
                    border: `1px solid ${meta.color}55`,
                  }}
                >
                  <Sparkles size={11} />
                  {t("milestoneReached")}
                </div>
                <h2
                  className="text-3xl font-bold mb-1 font-[family-name:var(--font-poppins)]"
                  style={{ color: meta.color }}
                >
                  {t(meta.titleKey)}
                </h2>
                <p className="text-5xl font-bold text-white font-[family-name:var(--font-poppins)] mb-4">
                  {activeMilestone}
                  <span className="text-xl text-white/60 ml-2">{t("milestoneDays")}</span>
                </p>
                <p className="text-sm text-white/80 leading-relaxed mb-6 px-4 italic">
                  {t(meta.messageKey)}
                </p>
              </motion.div>

              {/* Stats recap */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-2 mb-6"
              >
                <div className="glass-card rounded-2xl p-3 flex flex-col items-center gap-1">
                  <Flame size={18} className="text-[#F59E0B]" />
                  <span className="text-base font-bold text-white">
                    {activeMilestone}
                  </span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider">
                    {t("milestoneStatDays")}
                  </span>
                </div>
                <div className="glass-card rounded-2xl p-3 flex flex-col items-center gap-1">
                  <Wallet size={18} className="text-[#4ADE80]" />
                  <span className="text-xs font-bold text-white">
                    {formatFCFA(savedEstimate)}
                  </span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider">
                    {t("milestoneStatSaved")}
                  </span>
                </div>
                <div className="glass-card rounded-2xl p-3 flex flex-col items-center gap-1">
                  <Trophy size={18} className="text-[#FFD700]" />
                  <span className="text-base font-bold text-white">
                    {unlockedRanks.length}
                  </span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider">
                    {t("milestoneStatBadges")}
                  </span>
                </div>
              </motion.div>

              {/* Trend indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card rounded-2xl p-3 mb-6 flex items-center gap-2"
              >
                <TrendingUp size={16} className="text-[#4ADE80] flex-shrink-0" />
                <p className="text-xs text-white/80 text-left">
                  {activeMilestone >= 90
                    ? t("milestoneTrendMentor")
                    : t("milestoneTrendNext", {
                        n: Math.max(
                          0,
                          (activeMilestone >= 90
                            ? 180
                            : activeMilestone >= 60
                            ? 90
                            : activeMilestone >= 30
                            ? 60
                            : activeMilestone >= 14
                            ? 30
                            : 14) - activeMilestone
                        ),
                      })}
                </p>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-2"
              >
                <button
                  onClick={handleShareCard}
                  aria-label={t("milestoneCardBtn")}
                  className="w-12 shrink-0 glass-card-strong rounded-2xl flex items-center justify-center text-[#2DD4BF] hover:bg-white/10 transition-colors btn-press"
                >
                  <ImageIcon size={18} />
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 glass-card-strong rounded-2xl py-3 flex items-center justify-center gap-2 text-sm font-medium text-white hover:bg-white/10 transition-colors btn-press"
                >
                  <Share2 size={16} />
                  {t("milestoneShareBtn")}
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 rounded-2xl py-3 flex items-center justify-center gap-2 text-sm font-bold text-white btn-press"
                  style={{
                    background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`,
                    boxShadow: `0 8px 24px -8px ${meta.color}`,
                  }}
                >
                  {t("milestoneContinueBtn")}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
