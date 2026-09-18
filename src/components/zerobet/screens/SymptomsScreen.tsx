"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { SYMPTOM_CATEGORIES } from "@/lib/data/app-data";
import { OnboardingProgress } from "@/components/zerobet/components/OnboardingProgress";
import { useT } from "@/lib/i18n/useT";

export function SymptomsScreen() {
  const { selectedSymptoms, toggleSymptom, navigate, goBack } = useStore();
  const t = useT();
  const [activeCategory, setActiveCategory] = useState(SYMPTOM_CATEGORIES[0].key);

  const totalSelected = Object.values(selectedSymptoms).reduce((sum, arr) => sum + arr.length, 0);
  const category = SYMPTOM_CATEGORIES.find((c) => c.key === activeCategory)!;

  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-8">
      <OnboardingProgress currentStep={6} />
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <p className="text-white/50 text-xs">{t("symptomsStep", { n: 6, total: 8 })}</p>
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
            {t("symptomsTitle")}
          </h1>
        </div>
      </div>

      <p className="text-white/60 text-sm mb-5">
        {t("symptomsSubtitle")}{" "}{t("symptomsHelpPersonalize")}
      </p>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-4 -mx-6 px-6">
        {SYMPTOM_CATEGORIES.map((cat) => {
          const count = (selectedSymptoms[cat.key] || []).length;
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all flex items-center gap-2 ${
                isActive
                  ? "text-white"
                  : "glass-card text-white/60"
              }`}
              style={isActive ? { background: cat.color, boxShadow: `0 0 20px ${cat.color}50` } : {}}
            >
              <span>{cat.icon}</span>
              {t(cat.labelKey)}
              {count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20" : "bg-white/10"
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Symptoms list */}
      <div className="flex-1 overflow-y-auto custom-scroll -mx-6 px-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            {category.symptomKeys.map((symptomKey, idx) => {
              const isSelected = (selectedSymptoms[category.key] || []).includes(symptomKey);
              return (
                <motion.button
                  key={symptomKey}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleSymptom(category.key, symptomKey)}
                  className={`w-full p-4 rounded-2xl text-left flex items-center justify-between transition-all border ${
                    isSelected
                      ? "border-transparent text-white"
                      : "glass-card text-white/80 border-white/5"
                  }`}
                  style={isSelected ? { background: `${category.color}25`, border: `1px solid ${category.color}` } : {}}
                >
                  <span className="font-medium text-sm">{t(symptomKey)}</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? "" : "bg-white/10"
                    }`}
                    style={isSelected ? { background: category.color } : {}}
                  >
                    {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-4">
        <div className="text-center text-white/40 text-xs mb-3">
          {t("symptomsCount", { n: totalSelected })}
        </div>
        <button
          onClick={() => navigate("carousel")}
          className="w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-red flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          {t("continue")}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
