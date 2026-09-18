"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Phone, BookHeart, PenLine, Check } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { sound } from "@/lib/sound";

type Phase = "intro" | "breathing" | "motivation" | "options" | "done";

type BreathingPhaseKey = "inhale" | "hold" | "exhale";

const BREATHING_CYCLES = 3;
const PHASES: { key: BreathingPhaseKey; tKey: string; duration: number; color: string; action: string }[] = [
  { key: "inhale", tKey: "panicInhale", duration: 4, color: "#64D2FF", action: "scale-up" },
  { key: "hold", tKey: "panicHold", duration: 7, color: "#FBBF24", action: "hold" },
  { key: "exhale", tKey: "panicExhale", duration: 8, color: "#FF3B30", action: "scale-down" },
];

export function PanicScreen() {
  const { navigate, goBack, streakDays, addPanicEvent } = useStore();
  const t = useT();
  const [phase, setPhase] = useState<Phase>("intro");
  const [cycleCount, setCycleCount] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [breathingCycleKey, setBreathingCycleKey] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  // Use refs to track latest values inside interval without re-creating effect
  const phaseIdxRef = useRef(0);
  const cycleCountRef = useRef(0);
  const prevPhaseRef = useRef<Phase>("intro");

  // Play whoosh on phase transitions (intro → breathing → motivation → done)
  useEffect(() => {
    if (prevPhaseRef.current !== phase) {
      try {
        sound.playWhoosh();
      } catch {
        /* noop */
      }
      prevPhaseRef.current = phase;
    }
  }, [phase]);

  // Play whoosh on breathing phase changes (Inspire → Retiens → Expire)
  const prevPhaseIdxRef = useRef(0);
  useEffect(() => {
    if (phase !== "breathing") return;
    if (prevPhaseIdxRef.current !== phaseIdx) {
      try {
        sound.playWhoosh();
      } catch {
        /* noop */
      }
      prevPhaseIdxRef.current = phaseIdx;
    }
  }, [phaseIdx, phase]);

  // Sync refs with state via effect
  useEffect(() => {
    phaseIdxRef.current = phaseIdx;
  }, [phaseIdx]);
  useEffect(() => {
    cycleCountRef.current = cycleCount;
  }, [cycleCount]);

  // Single breathing effect that handles the full cycle
  useEffect(() => {
    if (phase !== "breathing") return;

    // Initialize countdown for current phase
    setCountdown(PHASES[phaseIdxRef.current].duration);

    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          const curIdx = phaseIdxRef.current;
          const curCycle = cycleCountRef.current;

          if (curIdx < PHASES.length - 1) {
            // Move to next phase within current cycle
            const nextIdx = curIdx + 1;
            setPhaseIdx(nextIdx);
            return PHASES[nextIdx].duration;
          } else {
            // Cycle complete
            if (curCycle + 1 < BREATHING_CYCLES) {
              setCycleCount(curCycle + 1);
              setPhaseIdx(0);
              setBreathingCycleKey((k) => k + 1);
              return PHASES[0].duration;
            } else {
              // All cycles done
              clearInterval(interval);
              setTimeout(() => setPhase("motivation"), 500);
              return 0;
            }
          }
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, breathingCycleKey]);

  const startBreathing = () => {
    setCycleCount(0);
    setPhaseIdx(0);
    setBreathingCycleKey((k) => k + 1);
    setPhase("breathing");
  };

  const continueBreathing = () => {
    setCycleCount(0);
    setPhaseIdx(0);
    setBreathingCycleKey((k) => k + 1);
    setPhase("breathing");
  };

  const markDone = () => {
    addPanicEvent({
      trigger: "manual",
      intensity: 3,
      resolved: true,
      method: "breathing",
    });
    setPhase("done");
  };

  const currentPhase = PHASES[phaseIdx];

  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            if (phase === "breathing") return; // don't allow back during breathing
            goBack();
          }}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div>
          <p className="text-white/50 text-xs">{t("panicMode")}</p>
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
            {t("panicTitle")}
          </h1>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Intro */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 rounded-full gradient-primary flex items-center justify-center mb-8 pulse-glow"
            >
              <span className="text-6xl">🫁</span>
            </motion.div>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)] mb-3">
              {t("panicBreatheTogether")}
            </h2>
            <p className="text-white/60 text-sm mb-2 max-w-xs">
              {t("panicWaveDesc")}
            </p>
            <p className="text-[#FF9500] text-sm font-semibold mb-8">
              {t("panicMessage2")}
            </p>
            <button
              onClick={startBreathing}
              className="w-full max-w-xs py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-green active:scale-[0.98] transition-transform"
            >
              {t("panicStartBreathing")}
            </button>
          </motion.div>
        )}

        {/* Breathing */}
        {phase === "breathing" && (
          <motion.div
            key={`breathing-${breathingCycleKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="text-white/50 text-sm mb-2">
              {t("panicCycle", { n: cycleCount + 1, total: BREATHING_CYCLES })}
            </div>
            <div className="flex gap-1.5 mb-8">
              {Array.from({ length: BREATHING_CYCLES }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-12 rounded-full transition-all ${
                    i <= cycleCount ? "gradient-primary" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              {/* Background ring */}
              <div className="absolute inset-0 rounded-full border-2 border-white/5" />
              {/* Animated breathing circle */}
              <motion.div
                key={`${breathingCycleKey}-${phaseIdx}`}
                initial={{
                  scale: currentPhase.action === "scale-down" ? 1.4 : 0.6,
                  opacity: 0.6,
                }}
                animate={{
                  scale: currentPhase.action === "scale-up" ? 1.4 : currentPhase.action === "hold" ? 1.4 : 0.6,
                  opacity: 1,
                }}
                transition={{
                  duration: currentPhase.duration,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${currentPhase.color}40 0%, ${currentPhase.color}10 70%, transparent 100%)`,
                  border: `2px solid ${currentPhase.color}`,
                  boxShadow: `0 0 60px ${currentPhase.color}60`,
                }}
              >
                <div className="text-center">
                  <div className="text-white text-2xl font-bold font-[family-name:var(--font-poppins)]">
                    {t(currentPhase.tKey)}
                  </div>
                  <div className="text-white/70 text-5xl font-extrabold font-[family-name:var(--font-poppins)] mt-1">
                    {countdown}
                  </div>
                </div>
              </motion.div>
            </div>

            <p className="text-white/60 text-sm max-w-xs">
              {t("panicFollowRhythm")}
            </p>
          </motion.div>
        )}

        {/* Motivation */}
        {phase === "motivation" && (
          <motion.div
            key="motivation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="w-20 h-20 rounded-full bg-[#4ADE80]/20 flex items-center justify-center mb-6"
            >
              <span className="text-4xl">💪</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card-strong p-6 mb-6 max-w-sm"
            >
              <p className="text-white text-lg font-semibold leading-relaxed">
                {t("panicMessage1", { days: streakDays })}
              </p>
              <p className="text-white/70 text-sm mt-2">
                {t("panicStrongerThan")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-4 mb-6 max-w-sm"
            >
              <p className="text-white/70 text-sm">
                {t("panicPercent73")}
              </p>
            </motion.div>

            <div className="w-full max-w-sm space-y-2.5">
              <button
                onClick={markDone}
                className="w-full py-4 rounded-2xl bg-[#4ADE80]/20 border border-[#4ADE80] text-[#4ADE80] font-[family-name:var(--font-poppins)] font-semibold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <Check size={18} />
                {t("panicDone")}
              </button>
              <button
                onClick={continueBreathing}
                className="w-full py-4 rounded-2xl glass-card text-white font-[family-name:var(--font-poppins)] font-semibold text-base active:scale-[0.98] transition-transform"
              >
                {t("panicContinueBreathing")}
              </button>
              <button
                onClick={() => setShowOptions(true)}
                className="w-full py-3 rounded-2xl glass-pill text-white/70 font-medium text-sm"
              >
                {t("panicNeedSomethingElse")}
              </button>
            </div>
          </motion.div>
        )}

        {/* Done */}
        {phase === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="w-32 h-32 rounded-full bg-[#4ADE80]/20 flex items-center justify-center mb-6 glow-green"
            >
              <span className="text-6xl">🏆</span>
            </motion.div>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)] mb-3">
              {t("panicYouDidIt")}
            </h2>
            <p className="text-white/60 text-sm max-w-xs mb-2">
              {t("panicVictoryCount")}
            </p>
            <p className="text-[#4ADE80] text-sm font-semibold mb-8">
              {t("panicStreakIntact", { n: streakDays })}
            </p>

            <button
              onClick={() => navigate("journal")}
              className="w-full max-w-xs py-3 rounded-2xl glass-card text-white font-medium text-sm mb-2 flex items-center justify-center gap-2"
            >
              <PenLine size={16} />
              {t("panicNotedTrigger")}
            </button>
            <button
              onClick={() => navigate("dashboard")}
              className="w-full max-w-xs py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-green active:scale-[0.98] transition-transform"
            >
              {t("panicBackHome")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Options modal */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOptions(false)}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-5 max-w-[430px] w-full rounded-t-3xl safe-bottom"
            >
              <h3 className="text-lg font-bold text-white mb-4 text-center">{t("panicWhatDoYouWant")}</h3>
              <div className="space-y-2">
                <button className="w-full p-4 rounded-2xl glass-card flex items-center gap-3 text-left active:scale-[0.98] transition-transform">
                  <div className="w-10 h-10 rounded-full bg-[#64D2FF]/20 flex items-center justify-center">
                    <Phone size={18} className="text-[#64D2FF]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t("panicCallFriend")}</p>
                    <p className="text-white/50 text-xs">{t("panicCallFriendDesc")}</p>
                  </div>
                </button>
                <button
                  onClick={() => { setShowOptions(false); navigate("community"); }}
                  className="w-full p-4 rounded-2xl glass-card flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FF9500]/20 flex items-center justify-center">
                    <BookHeart size={18} className="text-[#FF9500]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t("panicReadTestimony")}</p>
                    <p className="text-white/50 text-xs">{t("panicReadTestimonyDesc")}</p>
                  </div>
                </button>
                <button
                  onClick={() => { setShowOptions(false); navigate("journal"); }}
                  className="w-full p-4 rounded-2xl glass-card flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
                >
                  <div className="w-10 h-10 rounded-full bg-[#BF5AF2]/20 flex items-center justify-center">
                    <PenLine size={18} className="text-[#BF5AF2]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t("panicJournal")}</p>
                    <p className="text-white/50 text-xs">{t("panicJournalDesc")}</p>
                  </div>
                </button>
              </div>
              <button
                onClick={() => setShowOptions(false)}
                className="w-full py-3 mt-3 text-white/60 text-sm"
              >
                {t("close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
