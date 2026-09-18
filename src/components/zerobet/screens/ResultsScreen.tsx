"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, TrendingUp, Heart } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { OnboardingProgress } from "@/components/zerobet/components/OnboardingProgress";
import { useT } from "@/lib/i18n/useT";

const LEVEL_CONFIG = {
  faible: { labelKey: "resultsLevelLow", messageKey: "resultsMessageLow", color: "#4ADE80", gradient: "linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)", glow: "glow-green" },
  modere: { labelKey: "resultsLevelModerate", messageKey: "resultsMessageModerate", color: "#FBBF24", gradient: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)", glow: "glow-yellow" },
  severe: { labelKey: "resultsLevelSevere", messageKey: "resultsMessageSevere", color: "#FF9500", gradient: "linear-gradient(135deg, #FF9500 0%, #FF3B30 100%)", glow: "glow-orange" },
  critique: { labelKey: "resultsLevelCritical", messageKey: "resultsMessageCritical", color: "#FF3B30", gradient: "linear-gradient(135deg, #FF3B30 0%, #8B0000 100%)", glow: "glow-red" },
};

export function ResultsScreen() {
  const { addictionScore, addictionLevel, navigate } = useStore();
  const t = useT();
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedPercentile, setAnimatedPercentile] = useState(0);

  const config = LEVEL_CONFIG[addictionLevel];
  const percentile = Math.min(95, Math.round(addictionScore * 0.95));

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedScore(Math.round(addictionScore * progress));
      setAnimatedPercentile(Math.round(percentile * progress));
      if (step >= steps) clearInterval(interval);
    }, stepTime);
    return () => clearInterval(interval);
  }, [addictionScore, percentile]);

  // SVG circle properties
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-8">
      <OnboardingProgress currentStep={5} />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <p className="text-white/50 text-sm">{t("resultsTitle")}</p>
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)]">
          {t("resultsYourScore")}
        </h1>
      </motion.div>

      {/* Score gauge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 14 }}
        className="flex justify-center mb-6"
      >
        <div className="relative w-56 h-56">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
            <defs>
              <linearGradient id="score-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={config.color} />
                <stop offset="100%" stopColor="#FF9500" />
              </linearGradient>
            </defs>
            {/* Background circle */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="14"
            />
            {/* Progress circle */}
            <motion.circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="url(#score-grad)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ filter: `drop-shadow(0 0 12px ${config.color})` }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              key={animatedScore}
              className="text-6xl font-extrabold font-[family-name:var(--font-poppins)]"
              style={{ color: config.color }}
            >
              {animatedScore}
            </motion.div>
            <div className="text-white/50 text-sm mt-1">/ 100</div>
            <div
              className="mt-3 px-4 py-1.5 rounded-full text-sm font-bold text-white"
              style={{ background: config.gradient }}
            >
              {t(config.labelKey)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-4 mb-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center">
          <TrendingUp size={18} className="text-[#FF9500]" />
        </div>
        <div className="flex-1">
          {(() => {
            const text = t("resultsComparison", { pct: "__PCT__" });
            const [before, after] = text.split("__PCT__");
            return (
              <p className="text-white text-sm font-medium">
                {before}
                <span className="text-[#FF9500] font-bold">{animatedPercentile}</span>
                {after}
              </p>
            );
          })()}
        </div>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-5 mb-4"
      >
        <div className="flex items-start gap-3">
          <Heart size={20} className="text-[#FF3B30] mt-1 flex-shrink-0" />
          <p className="text-white/80 text-sm leading-relaxed">{t(config.messageKey)}</p>
        </div>
      </motion.div>

      {/* Good news */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-card p-5 mb-6 border-l-2 border-[#4ADE80]"
      >
        <p className="text-[#4ADE80] font-semibold text-sm mb-1">
          ✨ {t("resultsGoodNewsTitle")}
        </p>
        <p className="text-white/80 text-sm">
          {t("resultsRecovery90")}
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("symptoms")}
        className="w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-green flex items-center justify-center gap-2"
      >
        {t("resultsCta")}
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );
}
