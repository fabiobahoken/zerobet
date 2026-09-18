"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Wind,
  Play,
  Pause,
  Square,
  X,
  Flame,
  Sparkles,
  Moon,
  Brain,
  HeartPulse,
  Clock,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useStore, getStreakMultiplier } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { sound } from "@/lib/sound";

/* ============================================================
   Types & static data
   ============================================================ */

type PhaseAction = "scale-up" | "hold" | "scale-down";

interface BreathPhase {
  nameKey: string;
  duration: number;
  color: string;
  action: PhaseAction;
}

interface BreathingTechnique {
  id: string;
  nameKey: string;
  descKey: string;
  durationKey: string;
  totalSeconds: number;
  cycles: number;
  difficulty: "easy" | "medium" | "advanced";
  difficultyLevel: 1 | 2 | 3;
  gradient: string;
  glow: string;
  accent: string;
  emoji: string;
  phases: BreathPhase[];
}

interface GuidedMeditation {
  id: string;
  titleKey: string;
  durationKey: string;
  durationMinutes: number;
  category: "crise" | "motivation" | "relaxation" | "énergie";
  narratorKey: string;
  descKey: string;
  gradient: string;
  accent: string;
  emoji: string;
}

const BREATHING_TECHNIQUES: BreathingTechnique[] = [
  {
    id: "4-7-8",
    nameKey: "meditationTech478Name",
    descKey: "meditationTech478Desc",
    durationKey: "meditationTech478Duration",
    totalSeconds: 57,
    cycles: 3,
    difficulty: "medium",
    difficultyLevel: 2,
    gradient: "linear-gradient(135deg, #64D2FF 0%, #5E5CE6 100%)",
    glow: "rgba(100, 210, 255, 0.45)",
    accent: "#64D2FF",
    emoji: "🌊",
    phases: [
      { nameKey: "meditationPhaseInspire", duration: 4, color: "#64D2FF", action: "scale-up" },
      { nameKey: "meditationPhaseHold", duration: 7, color: "#FBBF24", action: "hold" },
      { nameKey: "meditationPhaseExhale", duration: 8, color: "#FF3B30", action: "scale-down" },
    ],
  },
  {
    id: "carre",
    nameKey: "meditationTechSquareName",
    descKey: "meditationTechSquareDesc",
    durationKey: "meditationTechSquareDuration",
    totalSeconds: 64,
    cycles: 4,
    difficulty: "easy",
    difficultyLevel: 1,
    gradient: "linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)",
    glow: "rgba(74, 222, 128, 0.45)",
    accent: "#4ADE80",
    emoji: "🟩",
    phases: [
      { nameKey: "meditationPhaseInspire", duration: 4, color: "#4ADE80", action: "scale-up" },
      { nameKey: "meditationPhaseHold", duration: 4, color: "#FBBF24", action: "hold" },
      { nameKey: "meditationPhaseExhale", duration: 4, color: "#FF3B30", action: "scale-down" },
      { nameKey: "meditationPhaseHold", duration: 4, color: "#FBBF24", action: "hold" },
    ],
  },
  {
    id: "2-4-6",
    nameKey: "meditationTech246Name",
    descKey: "meditationTech246Desc",
    durationKey: "meditationTech246Duration",
    totalSeconds: 60,
    cycles: 5,
    difficulty: "easy",
    difficultyLevel: 1,
    gradient: "linear-gradient(135deg, #BF5AF2 0%, #6366F1 100%)",
    glow: "rgba(191, 90, 242, 0.45)",
    accent: "#BF5AF2",
    emoji: "💜",
    phases: [
      { nameKey: "meditationPhaseInspire", duration: 2, color: "#BF5AF2", action: "scale-up" },
      { nameKey: "meditationPhaseHold", duration: 4, color: "#FBBF24", action: "hold" },
      { nameKey: "meditationPhaseExhale", duration: 6, color: "#FF3B30", action: "scale-down" },
    ],
  },
  {
    id: "5-5",
    nameKey: "meditationTech55Name",
    descKey: "meditationTech55Desc",
    durationKey: "meditationTech55Duration",
    totalSeconds: 40,
    cycles: 4,
    difficulty: "advanced",
    difficultyLevel: 3,
    gradient: "linear-gradient(135deg, #FF9500 0%, #FF3B30 100%)",
    glow: "rgba(255, 149, 0, 0.45)",
    accent: "#FF9500",
    emoji: "🌅",
    phases: [
      { nameKey: "meditationPhaseInspire", duration: 5, color: "#FF9500", action: "scale-up" },
      { nameKey: "meditationPhaseExhale", duration: 5, color: "#FF3B30", action: "scale-down" },
    ],
  },
];

const GUIDED_MEDITATIONS: GuidedMeditation[] = [
  {
    id: "calmer-envie",
    titleKey: "meditationGuided1Title",
    durationKey: "meditationDuration5min",
    durationMinutes: 5,
    category: "crise",
    narratorKey: "meditationNarratorAissata",
    descKey: "meditationGuided1Desc",
    gradient: "linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)",
    accent: "#FF3B30",
    emoji: "🛟",
  },
  {
    id: "confiance",
    titleKey: "meditationGuided2Title",
    durationKey: "meditationDuration10min",
    durationMinutes: 10,
    category: "motivation",
    narratorKey: "meditationNarratorMarc",
    descKey: "meditationGuided2Desc",
    gradient: "linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)",
    accent: "#4ADE80",
    emoji: "💪",
  },
  {
    id: "lacher-prise",
    titleKey: "meditationGuided3Title",
    durationKey: "meditationDuration8min",
    durationMinutes: 8,
    category: "relaxation",
    narratorKey: "meditationNarratorLea",
    descKey: "meditationGuided3Desc",
    gradient: "linear-gradient(135deg, #64D2FF 0%, #5E5CE6 100%)",
    accent: "#64D2FF",
    emoji: "🕊️",
  },
  {
    id: "visualisation-succes",
    titleKey: "meditationGuided4Title",
    durationKey: "meditationDuration12min",
    durationMinutes: 12,
    category: "motivation",
    narratorKey: "meditationNarratorKarim",
    descKey: "meditationGuided4Desc",
    gradient: "linear-gradient(135deg, #FBBF24 0%, #FF9500 100%)",
    accent: "#FBBF24",
    emoji: "🌟",
  },
  {
    id: "scan-corporel",
    titleKey: "meditationGuided5Title",
    durationKey: "meditationDuration7min",
    durationMinutes: 7,
    category: "relaxation",
    narratorKey: "meditationNarratorLea",
    descKey: "meditationGuided5Desc",
    gradient: "linear-gradient(135deg, #BF5AF2 0%, #6366F1 100%)",
    accent: "#BF5AF2",
    emoji: "🧘",
  },
  {
    id: "meditation-matin",
    titleKey: "meditationGuided6Title",
    durationKey: "meditationDuration5min",
    durationMinutes: 5,
    category: "énergie",
    narratorKey: "meditationNarratorMarc",
    descKey: "meditationGuided6Desc",
    gradient: "linear-gradient(135deg, #FF9500 0%, #FBBF24 100%)",
    accent: "#FF9500",
    emoji: "🌅",
  },
];

const CATEGORY_LABELS: Record<GuidedMeditation["category"], { labelKey: string; color: string }> = {
  crise: { labelKey: "meditationCatCrisis", color: "#FF3B30" },
  motivation: { labelKey: "meditationCatMotivation", color: "#4ADE80" },
  relaxation: { labelKey: "meditationCatRelaxation", color: "#64D2FF" },
  énergie: { labelKey: "meditationCatEnergy", color: "#FF9500" },
};

const BENEFITS = [
  {
    icon: HeartPulse,
    titleKey: "meditationBenefit1Title",
    valueKey: "meditationBenefit1Value",
    color: "#64D2FF",
  },
  {
    icon: Brain,
    titleKey: "meditationBenefit2Title",
    valueKey: "meditationBenefit2Value",
    color: "#4ADE80",
  },
  {
    icon: Flame,
    titleKey: "meditationBenefit3Title",
    valueKey: "meditationBenefit3Value",
    color: "#FF9500",
  },
  {
    icon: Moon,
    titleKey: "meditationBenefit4Title",
    valueKey: "meditationBenefit4Value",
    color: "#BF5AF2",
  },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ============================================================
   Breathing exercise player (full-screen modal)
   ============================================================ */

interface BreathingPlayerProps {
  technique: BreathingTechnique;
  onClose: () => void;
  onComplete: () => void;
}

function BreathingPlayer({ technique, onClose, onComplete }: BreathingPlayerProps) {
  const t = useT();
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [countdown, setCountdown] = useState(technique.phases[0].duration);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [completed, setCompleted] = useState(false);

  const phaseIdxRef = useRef(0);
  const cycleCountRef = useRef(0);
  const elapsedRef = useRef(0);
  const pausedRef = useRef(false);
  const prevPhaseIdxRef = useRef(0);
  const prevCycleCountRef = useRef(0);

  // Play whoosh on breathing phase changes & cycle restarts
  useEffect(() => {
    if (paused || completed) return;
    if (prevPhaseIdxRef.current !== phaseIdx || prevCycleCountRef.current !== cycleCount) {
      try {
        sound.playWhoosh();
      } catch {
        /* noop */
      }
      prevPhaseIdxRef.current = phaseIdx;
      prevCycleCountRef.current = cycleCount;
    }
  }, [phaseIdx, cycleCount, paused, completed]);

  useEffect(() => {
    phaseIdxRef.current = phaseIdx;
  }, [phaseIdx]);
  useEffect(() => {
    cycleCountRef.current = cycleCount;
  }, [cycleCount]);
  useEffect(() => {
    elapsedRef.current = elapsed;
  }, [elapsed]);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const finish = useCallback(() => {
    setCompleted(true);
    onComplete();
  }, [onComplete]);

  // Main tick — advances phases & cycles
  useEffect(() => {
    if (paused || completed) return;
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (pausedRef.current) return c;
        if (c <= 1) {
          // advance
          const curIdx = phaseIdxRef.current;
          const curCycle = cycleCountRef.current;
          if (curIdx < technique.phases.length - 1) {
            const nextIdx = curIdx + 1;
            setPhaseIdx(nextIdx);
            return technique.phases[nextIdx].duration;
          } else {
            // cycle done
            if (curCycle + 1 < technique.cycles) {
              setCycleCount(curCycle + 1);
              setPhaseIdx(0);
              return technique.phases[0].duration;
            } else {
              clearInterval(interval);
              setTimeout(() => finish(), 400);
              return 0;
            }
          }
        }
        return c - 1;
      });
      setElapsed((e) => e + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [paused, completed, technique, finish]);

  const currentPhase = technique.phases[phaseIdx];
  const progress = Math.min(100, (elapsed / technique.totalSeconds) * 100);

  // Background gradient based on phase color
  const bgGradient = `radial-gradient(circle at 50% 50%, ${currentPhase.color}25 0%, transparent 60%), linear-gradient(180deg, #070B0E 0%, #0B132B 100%)`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-6 safe-top safe-bottom"
      style={{ background: bgGradient }}
    >
      {/* Stop button (top-right) */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full glass-card flex items-center justify-center"
        aria-label={t("close")}
      >
        <X size={20} className="text-white/80" />
      </button>

      {/* Total session timer (top-left) */}
      <div className="absolute top-6 left-6 flex items-center gap-2 glass-pill px-3 py-1.5 rounded-full">
        <Clock size={14} className="text-white/70" />
        <span className="text-white/90 text-sm font-medium tabular-nums">
          {formatTime(Math.max(0, technique.totalSeconds - elapsed))}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {completed ? (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="w-28 h-28 rounded-full flex items-center justify-center mb-6 glow-green"
              style={{ background: technique.gradient }}
            >
              <Check size={48} className="text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2">
              {t("meditationBravo")}
            </h2>
            <p className="text-white/60 text-sm max-w-xs mb-8">
              {t("meditationBreathingDoneDesc")}
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold glow-red active:scale-[0.98] transition-transform"
            >
              {t("back")}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="breathing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* Technique name */}
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
              {t(technique.nameKey)}
            </p>
            <p className="text-white/70 text-sm mb-8">
              {t("meditationCycleProgress", { current: cycleCount + 1, total: technique.cycles })}
            </p>

            {/* Cycle dots */}
            <div className="flex gap-1.5 mb-10">
              {Array.from({ length: technique.cycles }).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 w-10 rounded-full transition-all duration-500"
                  style={{
                    background:
                      i < cycleCount
                        ? technique.accent
                        : i === cycleCount
                          ? `${technique.accent}80`
                          : "rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>

            {/* Breathing circle */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <motion.div
                key={`${cycleCount}-${phaseIdx}`}
                initial={{
                  scale:
                    currentPhase.action === "scale-down" ? 1.45 : 0.55,
                  opacity: 0.5,
                }}
                animate={{
                  scale:
                    currentPhase.action === "scale-up"
                      ? 1.45
                      : currentPhase.action === "hold"
                        ? 1.45
                        : 0.55,
                  opacity: 1,
                }}
                transition={{
                  duration: currentPhase.duration,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${currentPhase.color}45 0%, ${currentPhase.color}15 60%, transparent 100%)`,
                  border: `2px solid ${currentPhase.color}`,
                  boxShadow: `0 0 80px ${currentPhase.color}50, inset 0 0 40px ${currentPhase.color}20`,
                }}
              >
                <div className="text-center">
                  <div className="text-white text-xl font-semibold font-[family-name:var(--font-poppins)]">
                    {t(currentPhase.nameKey)}
                  </div>
                  <div className="text-white text-6xl font-extrabold font-[family-name:var(--font-poppins)] mt-1 tabular-nums">
                    {countdown}
                  </div>
                </div>
              </motion.div>
            </div>

            <p className="text-white/50 text-sm max-w-xs mb-8">
              {t("meditationBreathingHint")}
            </p>

            {/* Progress bar */}
            <div className="w-full max-w-xs mb-6">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: technique.gradient }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPaused((p) => !p)}
                className="w-14 h-14 rounded-full glass-card-strong flex items-center justify-center active:scale-95 transition-transform"
                aria-label={paused ? t("meditationResume") : t("meditationPause")}
              >
                {paused ? (
                  <Play size={22} className="text-white ml-0.5" fill="white" />
                ) : (
                  <Pause size={22} className="text-white" fill="white" />
                )}
              </button>
              <button
                onClick={onClose}
                className="w-14 h-14 rounded-full bg-[#FF3B30]/20 border border-[#FF3B30]/40 flex items-center justify-center active:scale-95 transition-transform"
                aria-label={t("meditationStop")}
              >
                <Square size={20} className="text-[#FF3B30]" fill="#FF3B30" />
              </button>
            </div>

            {paused && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/40 text-xs mt-4"
              >
                {t("meditationPaused")}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================
   Meditation player modal (guided session)
   ============================================================ */

interface MeditationPlayerProps {
  meditation: GuidedMeditation;
  onClose: () => void;
  onComplete: () => void;
}

function MeditationPlayer({ meditation, onClose, onComplete }: MeditationPlayerProps) {
  const t = useT();
  const totalSeconds = meditation.durationMinutes * 60;
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [completed, setCompleted] = useState(false);
  const pausedRef = useRef(false);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setElapsed((e) => {
        if (e + 1 >= totalSeconds) {
          clearInterval(interval);
          setCompleted(true);
          onComplete();
          return totalSeconds;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [totalSeconds, onComplete]);

  const progress = (elapsed / totalSeconds) * 100;
  const remaining = totalSeconds - elapsed;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-6 safe-top safe-bottom"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${meditation.accent}25 0%, transparent 60%), linear-gradient(180deg, #070B0E 0%, #0B132B 100%)`,
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full glass-card flex items-center justify-center"
        aria-label={t("close")}
      >
        <X size={20} className="text-white/80" />
      </button>

      <div className="absolute top-6 left-6 flex items-center gap-2 glass-pill px-3 py-1.5 rounded-full">
        <Clock size={14} className="text-white/70" />
        <span className="text-white/90 text-sm font-medium tabular-nums">
          {formatTime(remaining)}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {completed ? (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="w-28 h-28 rounded-full flex items-center justify-center mb-6"
              style={{ background: meditation.gradient }}
            >
              <span className="text-5xl">{meditation.emoji}</span>
            </motion.div>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2">
              {t("meditationSessionComplete")}
            </h2>
            <p className="text-white/60 text-sm max-w-xs mb-8">
              {t("meditationSessionCompleteDesc", { minutes: meditation.durationMinutes })}
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold glow-red active:scale-[0.98] transition-transform"
            >
              {t("back")}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center w-full"
          >
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
              {t(CATEGORY_LABELS[meditation.category].labelKey)}
            </p>
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)] mb-1 max-w-xs">
              {t(meditation.titleKey)}
            </h2>
            <p className="text-white/40 text-xs mb-8">{t(meditation.narratorKey)}</p>

            {/* Animated breathing circle */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              <div className="absolute inset-0 rounded-full border border-white/5" />
              {[0, 1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-full"
                  style={{
                    inset: ring * 20,
                    background: `radial-gradient(circle, ${meditation.accent}30 0%, transparent 70%)`,
                    border: `1px solid ${meditation.accent}40`,
                  }}
                  animate={{
                    scale: [0.85, 1.15, 0.85],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: ring * 0.8,
                  }}
                />
              ))}
              <motion.div
                className="absolute inset-8 rounded-full flex items-center justify-center"
                style={{
                  background: meditation.gradient,
                  boxShadow: `0 0 60px ${meditation.accent}50`,
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-5xl">{meditation.emoji}</span>
              </motion.div>
            </div>

            <p className="text-white/60 text-sm max-w-xs mb-8 leading-relaxed italic">
              {paused
                ? t("meditationResumePrompt")
                : t("meditationGuidedHint")}
            </p>

            {/* Progress bar */}
            <div className="w-full max-w-xs mb-6">
              <div className="flex justify-between text-xs text-white/40 mb-1.5 tabular-nums">
                <span>{formatTime(elapsed)}</span>
                <span>{formatTime(totalSeconds)}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: meditation.gradient }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPaused((p) => !p)}
                className="w-14 h-14 rounded-full glass-card-strong flex items-center justify-center active:scale-95 transition-transform"
                aria-label={paused ? t("meditationResume") : t("meditationPause")}
              >
                {paused ? (
                  <Play size={22} className="text-white ml-0.5" fill="white" />
                ) : (
                  <Pause size={22} className="text-white" fill="white" />
                )}
              </button>
              <button
                onClick={onClose}
                className="w-14 h-14 rounded-full bg-[#FF3B30]/20 border border-[#FF3B30]/40 flex items-center justify-center active:scale-95 transition-transform"
                aria-label={t("meditationStop")}
              >
                <Square size={20} className="text-[#FF3B30]" fill="#FF3B30" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================
   Main screen
   ============================================================ */

export function MeditationScreen() {
  const t = useT();
  const { navigate, goBack, meditationStreak, incrementMeditationStreak, addXP, completeQuest, dailyQuests, streakDays } = useStore();

  const [activeTechnique, setActiveTechnique] = useState<BreathingTechnique | null>(null);
  const [activeMeditation, setActiveMeditation] = useState<GuidedMeditation | null>(null);

  const handleSessionComplete = useCallback(() => {
    incrementMeditationStreak();
    // Gamification — award XP & mark meditation quest complete
    if (!dailyQuests.meditation) {
      completeQuest("meditation");
    } else {
      addXP(40, t("meditationTitle"));
    }
    const multiplier = getStreakMultiplier(streakDays);
    const adjusted = Math.round(40 * multiplier);
    toast.success(t("successXp", { n: adjusted }), {
      description: t("meditationSessionDone"),
      duration: 3000,
    });
  }, [incrementMeditationStreak, addXP, completeQuest, dailyQuests.meditation, streakDays, t]);

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
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)] leading-tight">
            {t("meditationTitleFull")}
          </h1>
          <p className="text-white/50 text-xs">{t("meditationSubtitle")}</p>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(100, 210, 255, 0.18)" }}
        >
          <Wind size={20} className="text-[#64D2FF]" />
        </div>
      </div>

      {/* Daily streak */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong p-5 mb-6 relative overflow-hidden"
      >
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl"
          style={{ background: "rgba(100, 210, 255, 0.20)" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl"
          style={{ background: "rgba(191, 90, 242, 0.15)" }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles size={12} className="text-[#64D2FF]" />
              <span className="text-white/60 text-[11px] font-medium uppercase tracking-wider">
                {t("statsMeditationStreak")}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold gradient-primary-text font-[family-name:var(--font-poppins)] tabular-nums">
                {meditationStreak}
              </span>
              <span className="text-white/60 text-sm">
                {meditationStreak > 1 ? t("meditationDaysConsecutive") : t("meditationDay")}
              </span>
            </div>
            <p className="text-white/40 text-xs mt-1">
              {meditationStreak === 0
                ? t("meditationStreak0")
                : meditationStreak < 7
                  ? t("meditationStreak7")
                  : meditationStreak < 30
                    ? t("meditationStreak30")
                    : t("meditationStreak30plus")}
            </p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl"
          >
            {meditationStreak === 0 ? "🌱" : meditationStreak < 7 ? "🌿" : meditationStreak < 30 ? "🔥" : "🌟"}
          </motion.div>
        </div>
      </motion.div>

      {/* Section 1: Quick Breathing Exercises */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-sm">{t("meditationBreathing")}</h2>
          <span className="text-white/40 text-xs">{t("meditationSwipeHint")}</span>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
          {BREATHING_TECHNIQUES.map((tech, idx) => (
            <motion.button
              key={tech.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTechnique(tech)}
              className="flex-shrink-0 w-[220px] rounded-3xl p-5 text-left relative overflow-hidden"
              style={{
                background: tech.gradient,
                boxShadow: `0 8px 32px ${tech.glow}`,
              }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/15 blur-2xl" />
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{tech.emoji}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-1.5 h-3 rounded-full"
                        style={{
                          background:
                            i < tech.difficultyLevel ? "white" : "rgba(255,255,255,0.3)",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-white font-bold text-base font-[family-name:var(--font-poppins)] leading-tight mb-1">
                  {t(tech.nameKey)}
                </h3>
                <p className="text-white/80 text-xs mb-3 leading-snug">
                  {t(tech.descKey)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-[11px] flex items-center gap-1">
                    <Clock size={11} /> {t(tech.durationKey)}
                  </span>
                  <span className="text-white text-[11px] font-semibold bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Play size={9} fill="white" /> {t("meditationStart")}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Section 2: Guided Meditations */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-sm">{t("meditationGuided")}</h2>
          <span className="text-white/40 text-xs">{GUIDED_MEDITATIONS.length} {t("meditationSessions")}</span>
        </div>
        <div className="space-y-3">
          {GUIDED_MEDITATIONS.map((med, idx) => {
            const cat = CATEGORY_LABELS[med.category];
            return (
              <motion.button
                key={med.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActiveMeditation(med)}
                className="glass-card p-4 w-full flex items-center gap-3 text-left active:scale-[0.99] transition-transform"
              >
                {/* Play button */}
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: med.gradient }}
                >
                  <Play size={20} className="text-white ml-0.5" fill="white" />
                  <div
                    className="absolute inset-0 rounded-2xl opacity-50"
                    style={{ boxShadow: `0 0 24px ${med.accent}60` }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)] truncate">
                      {t(med.titleKey)}
                    </h3>
                  </div>
                  <p className="text-white/50 text-xs truncate mb-1.5">
                    {t(med.narratorKey)}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${cat.color}25`, color: cat.color }}
                    >
                      {t(cat.labelKey)}
                    </span>
                    <span className="text-white/40 text-[11px] flex items-center gap-1">
                      <Clock size={10} /> {t(med.durationKey)}
                    </span>
                  </div>
                </div>

                <ChevronLeft size={16} className="text-white/30 rotate-180 flex-shrink-0" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Section: Benefits card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong p-5 mb-6 relative overflow-hidden"
      >
        <div
          className="absolute -top-10 -left-10 w-32 h-32 rounded-full blur-3xl"
          style={{ background: "rgba(74, 222, 128, 0.15)" }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(74, 222, 128, 0.18)" }}
            >
              <Brain size={16} className="text-[#4ADE80]" />
            </div>
            <h3 className="text-white font-bold text-base font-[family-name:var(--font-poppins)]">
              {t("meditationWhyMeditate")}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {BENEFITS.map((b, idx) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.titleKey}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="glass-card p-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                    style={{ background: `${b.color}20` }}
                  >
                    <Icon size={14} style={{ color: b.color }} />
                  </div>
                  <p className="text-white/80 text-[11px] leading-snug mb-0.5">
                    {t(b.titleKey)}
                  </p>
                  <p
                    className="text-sm font-bold font-[family-name:var(--font-poppins)]"
                    style={{ color: b.color }}
                  >
                    {t(b.valueKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <p className="text-white/40 text-[11px] mt-4 text-center italic">
            {t("meditationMuscleDesc")}
          </p>
        </div>
      </motion.div>

      <div className="h-4" />

      {/* Breathing player modal */}
      <AnimatePresence>
        {activeTechnique && (
          <BreathingPlayer
            technique={activeTechnique}
            onClose={() => setActiveTechnique(null)}
            onComplete={handleSessionComplete}
          />
        )}
      </AnimatePresence>

      {/* Meditation player modal */}
      <AnimatePresence>
        {activeMeditation && (
          <MeditationPlayer
            meditation={activeMeditation}
            onClose={() => setActiveMeditation(null)}
            onComplete={handleSessionComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
