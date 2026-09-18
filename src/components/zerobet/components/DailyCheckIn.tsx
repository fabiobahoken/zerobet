"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, X } from "lucide-react";
import { toast } from "sonner";
import { useStore, getStreakMultiplier } from "@/store/zerobet-store";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { useT } from "@/lib/i18n/useT";
import { useLanguage } from "@/lib/i18n/useT";
import type { Language } from "@/lib/i18n/dictionary";

const MOOD_OPTIONS = [
  { key: "super", emoji: "😀", labelKey: "checkinMoodSuper", color: "#4ADE80", bg: "rgba(74,222,128,0.15)" },
  { key: "bien", emoji: "😊", labelKey: "checkinMoodBien", color: "#64D2FF", bg: "rgba(100,210,255,0.15)" },
  { key: "neutre", emoji: "😐", labelKey: "checkinMoodNeutre", color: "#FBBF24", bg: "rgba(251,191,36,0.15)" },
  { key: "difficile", emoji: "😟", labelKey: "checkinMoodDifficile", color: "#FF9500", bg: "rgba(255,149,0,0.15)" },
  { key: "critique", emoji: "😢", labelKey: "checkinMoodCritique", color: "#FF3B30", bg: "rgba(255,59,48,0.15)" },
];

const RESISTANCE_OPTIONS = [
  { key: "respiration", labelKey: "checkinResistanceRespiration", icon: "🌬️" },
  { key: "journal", labelKey: "checkinResistanceJournal", icon: "📓" },
  { key: "atlas", labelKey: "checkinResistanceAtlas", icon: "🤖" },
  { key: "appel", labelKey: "checkinResistanceAppel", icon: "📞" },
  { key: "autre", labelKey: "checkinResistanceAutre", icon: "✨" },
];

function getMotivationalMessage(t: (k: string, p?: Record<string, string | number>) => string, streak: number, mood: string): string {
  if (mood === "critique" || mood === "difficile") {
    if (streak >= 30) return t("checkinMotivHard30");
    if (streak >= 7) return t("checkinMotivHard7");
    return t("checkinMotivHard0");
  }
  if (mood === "neutre") {
    if (streak >= 30) return t("checkinMotivNeutre30");
    return t("checkinMotivNeutre0");
  }
  if (streak >= 90) return t("checkinMotivGood90");
  if (streak >= 30) return t("checkinMotivGood30");
  if (streak >= 7) return t("checkinMotivGood7");
  return t("checkinMotivGood0");
}

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function formatDate(dateStr: string, lang: Language): string {
  const d = new Date(dateStr + "T00:00:00");
  const locale = lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "fr-FR";
  return d.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function DailyCheckIn({ onDismiss }: { onDismiss?: () => void } = {}) {
  const t = useT();
  const lang = useLanguage();
  const {
    lastCheckInDate, setLastCheckInDate,
    todayMood, setTodayMood,
    todayCraving, setTodayCraving,
    streakDays,
    addXP, completeQuest, dailyQuests,
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(todayMood);
  const [hasCraving, setHasCraving] = useState<boolean>(todayCraving);
  const [resistanceMethod, setResistanceMethod] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const todayStr = getTodayString();
  const shouldShow = lastCheckInDate !== todayStr;

  useEffect(() => {
    if (shouldShow) {
      // Small delay for smooth page load
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
    // If check-in was already done today, notify parent that we're "dismissed"
    if (onDismiss) {
      const t = setTimeout(onDismiss, 600);
      return () => clearTimeout(t);
    }
  }, [shouldShow, onDismiss]);

  // Notify parent when modal closes (either via confirm or X button)
  const closeWithDismiss = useCallback(() => {
    setIsOpen(false);
    if (onDismiss) onDismiss();
  }, [onDismiss]);

  const handleConfirm = useCallback(() => {
    if (!selectedMood) return;

    setTodayMood(selectedMood);
    setTodayCraving(hasCraving);
    setLastCheckInDate(todayStr);

    // Success feedback
    try {
      sound.playSuccess();
      haptics.light();
    } catch {
      /* noop — audio not ready */
    }

    // Gamification — award XP & mark check-in quest complete (once per day)
    const wasCheckinDoneToday = dailyQuests.checkin;
    if (!wasCheckinDoneToday) {
      completeQuest("checkin");
      const multiplier = getStreakMultiplier(streakDays);
      const adjusted = Math.round(50 * multiplier);
      toast.success(`+${adjusted} XP`, {
        description: t("checkinCompleted"),
        duration: 3000,
      });
    } else {
      // If quest already claimed today, still award XP for the check-in
      addXP(50, "Check-in");
    }

    // Trigger confetti
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      closeWithDismiss();
    }, 1200);
  }, [selectedMood, hasCraving, setTodayMood, setTodayCraving, setLastCheckInDate, todayStr, dailyQuests.checkin, completeQuest, addXP, streakDays, closeWithDismiss, t]);

  const motivationalMsg = selectedMood ? getMotivationalMessage(t, streakDays, selectedMood) : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => {}}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-5 pointer-events-none"
          >
            <div className="glass-card-strong p-6 max-w-[390px] w-full pointer-events-auto relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#FF3B30]/15 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#FF9500]/10 blur-3xl" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} className="text-[#FF9500]" />
                    <h2 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)]">
                      {t("checkinTitle")}
                    </h2>
                  </div>
                  <button
                    onClick={closeWithDismiss}
                    className="w-8 h-8 rounded-full glass-pill flex items-center justify-center"
                    aria-label="Fermer"
                  >
                    <X size={16} className="text-white/50" />
                  </button>
                </div>

                {/* Date */}
                <p className="text-white/50 text-sm mb-5">
                  {formatDate(todayStr, lang)}
                </p>

                {/* Mood selector */}
                <div className="mb-5">
                  <p className="text-white text-sm font-medium mb-3">
                    {t("checkinMoodQuestion")}
                  </p>
                  <div className="flex gap-2 justify-between">
                    {MOOD_OPTIONS.map((mood) => (
                      <button
                        key={mood.key}
                        onClick={() => setSelectedMood(mood.key)}
                        className={`flex flex-col items-center gap-1 p-2.5 rounded-2xl transition-all duration-200 flex-1 ${
                          selectedMood === mood.key
                            ? "scale-105 ring-2"
                            : "opacity-60 hover:opacity-80"
                        }`}
                        style={{
                          background: selectedMood === mood.key ? mood.bg : "transparent",
                          borderColor: selectedMood === mood.key ? mood.color : undefined,
                          ...(selectedMood === mood.key ? { boxShadow: `0 0 20px ${mood.color}30` } : {}),
                        }}
                        aria-label={t(mood.labelKey)}
                      >
                        <span className="text-2xl">{mood.emoji}</span>
                        <span
                          className="text-[10px] font-medium"
                          style={{ color: selectedMood === mood.key ? mood.color : "rgba(255,255,255,0.5)" }}
                        >
                          {t(mood.labelKey)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Craving question */}
                <div className="mb-5">
                  <p className="text-white text-sm font-medium mb-3">
                    {t("checkinCravingQuestion")}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setHasCraving(true)}
                      className={`flex-1 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                        hasCraving
                          ? "bg-[#FF3B30]/20 text-[#FF3B30] ring-2 ring-[#FF3B30]/50"
                          : "glass-pill text-white/50"
                      }`}
                    >
                      {t("yes")}
                    </button>
                    <button
                      onClick={() => setHasCraving(false)}
                      className={`flex-1 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                        hasCraving === false
                          ? "bg-[#4ADE80]/20 text-[#4ADE80] ring-2 ring-[#4ADE80]/50"
                          : "glass-pill text-white/50"
                      }`}
                    >
                      {t("no")}
                    </button>
                  </div>
                </div>

                {/* If craving = Oui, show resistance method */}
                <AnimatePresence>
                  {hasCraving && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mb-5"
                    >
                      <p className="text-white text-sm font-medium mb-3">
                        {t("checkinResistanceQuestion")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {RESISTANCE_OPTIONS.map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => setResistanceMethod(opt.key)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                              resistanceMethod === opt.key
                                ? "bg-[#FF9500]/20 text-[#FF9500] ring-1 ring-[#FF9500]/40"
                                : "glass-pill text-white/50"
                            }`}
                          >
                            <span>{opt.icon}</span>
                            {t(opt.labelKey)}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Motivational message */}
                <AnimatePresence>
                  {motivationalMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="glass-card p-4 mb-5"
                    >
                      <p className="text-white/80 text-sm leading-relaxed italic">
                        {motivationalMsg}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Confirm button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConfirm}
                  disabled={!selectedMood}
                  className={`w-full py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                    selectedMood
                      ? "gradient-primary text-white glow-green"
                      : "bg-white/5 text-white/30 cursor-not-allowed"
                  }`}
                >
                  <Check size={20} />
                  {t("confirm")}
                </motion.button>
              </div>

              {/* CSS-only Confetti */}
              <AnimatePresence>
                {showConfetti && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const colors = ["#FF3B30", "#FF9500", "#4ADE80", "#64D2FF", "#FBBF24", "#BF5AF2"];
                      const color = colors[i % colors.length];
                      const leftPos = `${5 + (i * 4.5) % 90}%`;
                      const delay = `${(i * 0.05).toFixed(2)}s`;
                      const duration = `${(0.8 + (i % 5) * 0.15).toFixed(2)}s`;
                      const size = 6 + (i % 4) * 2;
                      const rotation = (i * 37) % 360;
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
                            animation: `confetti-fall ${duration} ease-out ${delay} forwards`,
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Confetti keyframes injected via style tag */}
          <style>{`
            @keyframes confetti-fall {
              0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
              }
              100% {
                transform: translateY(500px) rotate(720deg) scale(0.3);
                opacity: 0;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
