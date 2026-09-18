"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { QUIZ_QUESTIONS, calculateScore } from "@/lib/data/quiz-questions";
import { formatCurrency } from "@/lib/data/currency-data";
import { OnboardingProgress } from "@/components/zerobet/components/OnboardingProgress";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { useT } from "@/lib/i18n/useT";

const CATEGORY_KEYS: Record<string, { labelKey: string; color: string }> = {
  behavior: { labelKey: "quizCategoryBehavior", color: "#FF3B30" },
  finance: { labelKey: "quizCategoryFinance", color: "#FBBF24" },
  emotions: { labelKey: "quizCategoryEmotions", color: "#BF5AF2" },
  social: { labelKey: "quizCategorySocial", color: "#64D2FF" },
};

/**
 * Q1 option thresholds in FCFA (the app's internal currency).
 * Used to re-format Q1 options in the user's selected display currency
 * instead of the hardcoded "FCFA" from the legacy translation keys.
 *
 * Task 17-a: the user reported that quiz Q1 always shows "FCFA" even when
 * they picked EUR / USD / NGN / etc. We fix this by formatting the amounts
 * with `formatCurrency(amount, currency)` using the new placeholder keys
 * `quizQ1LessThan` / `quizQ1Range` / `quizQ1MoreThan`.
 */
const Q1_THRESHOLDS_FCFA: Array<
  | { kind: "lessThan"; max: number }
  | { kind: "range"; min: number; max: number }
  | { kind: "moreThan"; min: number }
> = [
  { kind: "lessThan", max: 2000 },
  { kind: "range", min: 2000, max: 10000 },
  { kind: "range", min: 10000, max: 50000 },
  { kind: "moreThan", min: 50000 },
];

export function QuizScreen() {
  const {
    quizCurrentIndex,
    setQuizCurrentIndex,
    quizAnswers,
    setQuizAnswer,
    setAddictionResult,
    navigate,
    goBack,
    currency,
  } = useStore();
  const t = useT();

  const question = QUIZ_QUESTIONS[quizCurrentIndex];
  const total = QUIZ_QUESTIONS.length;
  const progress = ((quizCurrentIndex + 1) / total) * 100;
  const selectedAnswer = quizAnswers[quizCurrentIndex];
  const cat = CATEGORY_KEYS[question.category];

  /**
   * Returns the localized text for option `idx` of the current question.
   * Q1 (id=1) is special-cased: it has currency amounts that must adapt to
   * the user's selected currency via the new placeholder keys
   * `quizQ1LessThan` / `quizQ1Range` / `quizQ1MoreThan`.
   * All other questions use the legacy `quizQ{n}Opt{idx}` keys.
   */
  const getOptionLabel = (idx: number): string => {
    if (question.id === 1) {
      const threshold = Q1_THRESHOLDS_FCFA[idx];
      if (threshold) {
        if (threshold.kind === "lessThan") {
          return t("quizQ1LessThan", { amount: formatCurrency(threshold.max, currency) });
        }
        if (threshold.kind === "moreThan") {
          return t("quizQ1MoreThan", { amount: formatCurrency(threshold.min, currency) });
        }
        return t("quizQ1Range", {
          min: formatCurrency(threshold.min, currency),
          max: formatCurrency(threshold.max, currency),
        });
      }
    }
    return t(`${question.optionsKey}${idx}`);
  };

  const handleSelect = (optionIdx: number) => {
    sound.playPop();
    haptics.light();
    setQuizAnswer(quizCurrentIndex, optionIdx);
    setTimeout(() => {
      if (quizCurrentIndex < total - 1) {
        setQuizCurrentIndex(quizCurrentIndex + 1);
      } else {
        // Calculate score
        const finalAnswers = [...quizAnswers];
        finalAnswers[quizCurrentIndex] = optionIdx;
        const result = calculateScore(finalAnswers);
        setAddictionResult(result.score, result.level);
        navigate("results");
      }
    }, 300);
  };

  const handleBack = () => {
    if (quizCurrentIndex > 0) {
      setQuizCurrentIndex(quizCurrentIndex - 1);
    } else {
      goBack();
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-8">
      <OnboardingProgress currentStep={4} />
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-white/60 mb-1.5">
            <span>{t("quizProgress", { n: quizCurrentIndex + 1, total })}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-primary"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            />
          </div>
        </div>
      </div>

      {/* Category badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            background: `${cat.color}20`,
            color: cat.color,
            border: `1px solid ${cat.color}40`,
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
          {t(cat.labelKey)}
        </div>
      </motion.div>

      {/* Question card */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={quizCurrentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1"
          >
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2 leading-tight">
              {t(question.questionKey)}
            </h2>
            <p className="text-white/50 text-sm mb-6">{t("quizAnswer")}</p>

            <div className="space-y-3">
              {question.points.map((_, idx) => {
                const isSelected = selectedAnswer === idx;
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(idx)}
                    className={`w-full p-4 rounded-2xl text-left font-medium text-base transition-all border ${
                      isSelected
                        ? "gradient-primary text-white border-transparent glow-green"
                        : "glass-card text-white/90 border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{getOptionLabel(idx)}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check size={18} strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      <div className="mt-6 flex items-center justify-between text-xs text-white/40">
        <span>{t("quizPrivacy")}</span>
        {selectedAnswer !== undefined && quizCurrentIndex < total - 1 && (
          <button
            onClick={() => setQuizCurrentIndex(quizCurrentIndex + 1)}
            className="flex items-center gap-1 text-white/60"
          >
            {t("next")} <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
