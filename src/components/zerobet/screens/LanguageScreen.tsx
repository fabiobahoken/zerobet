"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { LANGUAGES, type Language } from "@/lib/i18n/dictionary";
import { useT } from "@/lib/i18n/useT";
import { Flag } from "@/components/zerobet/components/Flag";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { OnboardingProgress } from "@/components/zerobet/components/OnboardingProgress";

export function LanguageScreen() {
  const { language, setLanguage, navigate } = useStore();
  const t = useT();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    sound.playClick();
    haptics.light();
  };

  const handleContinue = () => {
    if (language) navigate("gender");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-14 pb-8">
      <OnboardingProgress currentStep={1} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2">
          {t("languageTitle")}
        </h1>
        <p className="text-white/60 text-sm">
          {t("languageSubtitle")}
        </p>
      </motion.div>

      <div className="flex-1 max-w-sm mx-auto w-full space-y-3">
        {LANGUAGES.map((lang, idx) => {
          const selected = language === lang.code;
          return (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => handleSelect(lang.code)}
              aria-pressed={selected}
              aria-label={`${lang.nativeName} — ${lang.name}`}
              className={`relative w-full glass-card p-5 flex items-center gap-4 transition-all overflow-hidden ${
                selected ? "ring-2 ring-[#FF3B30] glow-red" : ""
              }`}
            >
              {/* Subtle accent wash on the selected card */}
              {selected && (
                <motion.div
                  layoutId="lang-accent"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(255,59,48,0.08) 0%, rgba(255,149,0,0.05) 100%)",
                  }}
                />
              )}
              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full gradient-primary flex items-center justify-center z-10"
                >
                  <Check size={14} className="text-white" strokeWidth={3} />
                </motion.div>
              )}
              <div className="relative z-10 shrink-0">
                <Flag code={lang.flag} size={48} />
              </div>
              <div className="text-left flex-1 relative z-10">
                <div className="text-white font-semibold text-lg font-[family-name:var(--font-poppins)]">
                  {lang.nativeName}
                </div>
                <div className="text-white/50 text-xs tracking-wide uppercase">
                  {lang.name}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        disabled={!language}
        className={`mt-6 mx-auto max-w-sm w-full py-4 rounded-2xl font-[family-name:var(--font-poppins)] font-semibold text-base transition-all ${
          language
            ? "gradient-primary text-white glow-red"
            : "bg-white/5 text-white/30 cursor-not-allowed"
        }`}
      >
        {t("continue")}
      </motion.button>
    </div>
  );
}
