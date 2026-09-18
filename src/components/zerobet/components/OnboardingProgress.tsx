"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Home } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";

// The 8 visible onboarding steps (Splash & Welcome excluded from count).
// 1. Langue       -> LanguageScreen
// 2. Genre        -> GenderScreen
// 3. Devise       -> CurrencyScreen
// 4. Quiz         -> QuizScreen
// 5. Résultats    -> ResultsScreen
// 6. Symptômes    -> SymptomsScreen
// 7. Éducation    -> CarouselScreen
// 8. Engagement   -> EngagementScreen / PaywallScreen

const TOTAL_STEPS = 8;

export interface OnboardingProgressProps {
  /** 1-based step index (1..8) */
  currentStep: number;
}

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  const { setCompletedOnboarding, setPlan, navigate } = useStore();
  const t = useT();
  const [showConfirm, setShowConfirm] = useState(false);

  const clamped = Math.max(1, Math.min(TOTAL_STEPS, currentStep));
  const progress = (clamped / TOTAL_STEPS) * 100;

  // Skip button appears from step 3 onwards (Quiz and beyond)
  const showSkip = clamped >= 3;

  const handleSkipConfirm = () => {
    // Force free plan, mark onboarding complete, go to dashboard
    setPlan("free");
    setCompletedOnboarding(true);
    setShowConfirm(false);
    navigate("dashboard");
  };

  return (
    <>
      <div className="sticky top-0 z-30 -mx-6 px-6 pt-3 pb-2.5 mb-2 backdrop-blur-xl bg-[#070B0E]/80 border-b border-white/5">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-[11px] font-medium text-white/60 font-[family-name:var(--font-poppins)]">
            {t("onboardingStep")} <span className="text-white font-bold">{clamped}</span> {t("onboardingOf")} {TOTAL_STEPS}
          </span>
          <AnimatePresence>
            {showSkip && (
              <motion.button
                key="skip-btn"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full glass-pill text-[11px] text-white/70 font-medium active:scale-95 transition-transform"
                aria-label="Passer l'onboarding"
              >
                <X size={12} />
                {t("skip")}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Progress bar with gradient fill */}
        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden relative">
          <motion.div
            className="h-full rounded-full gradient-primary relative"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            style={{ boxShadow: "0 0 12px rgba(255,59,48,0.4)" }}
          >
            <div className="absolute inset-0 shimmer rounded-full" />
          </motion.div>
        </div>

        {/* Step dots */}
        <div className="flex justify-between mt-2 px-0.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
            const stepNum = i + 1;
            const isDone = stepNum < clamped;
            const isCurrent = stepNum === clamped;
            return (
              <motion.div
                key={stepNum}
                initial={false}
                animate={{
                  scale: isCurrent ? 1.15 : 1,
                  opacity: isDone || isCurrent ? 1 : 0.35,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="w-1 h-1 rounded-full"
                style={{
                  background: isDone
                    ? "linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)"
                    : isCurrent
                      ? "#FF9500"
                      : "rgba(255,255,255,0.4)",
                  boxShadow: isCurrent
                    ? "0 0 8px rgba(255,149,0,0.6)"
                    : isDone
                      ? "0 0 6px rgba(255,59,48,0.4)"
                      : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Skip confirmation modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirm(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-6 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.05 }}
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(255,59,48,0.2) 0%, rgba(255,149,0,0.15) 100%)",
                  border: "1px solid rgba(255,149,0,0.3)",
                }}
              >
                <AlertTriangle size={28} className="text-[#FF9500]" />
              </motion.div>

              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)] mb-2">
                {t("onboardingSkipTitle")}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {t("onboardingSkipDesc")}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 rounded-2xl glass-card text-white/80 font-medium text-sm active:scale-[0.98] transition-transform"
                >
                  {t("onboardingContinue")}
                </button>
                <button
                  onClick={handleSkipConfirm}
                  className="flex-1 py-3 rounded-2xl gradient-primary text-white font-semibold text-sm flex items-center justify-center gap-1.5 glow-green active:scale-[0.98] transition-transform"
                >
                  <Home size={14} />
                  {t("onboardingGoDashboard")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
