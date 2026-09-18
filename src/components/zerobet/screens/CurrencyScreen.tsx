"use client";

import { motion } from "framer-motion";
import { Coins, Check, ChevronRight } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { OnboardingProgress } from "@/components/zerobet/components/OnboardingProgress";
import {
  CURRENCIES,
  formatCurrency,
  type CurrencyCode,
} from "@/lib/data/currency-data";
import { CurrencyFlag } from "@/components/zerobet/components/CurrencyFlag";

/**
 * CurrencyScreen — onboarding step that lets the user pick their preferred
 * display currency. All amounts stay stored internally in FCFA; this screen
 * only sets the user's display preference (`currency` field in the store).
 *
 * Inserted between LanguageScreen and WelcomeScreen. Renders the
 * OnboardingProgress header with currentStep=3 (the progress bar will show
 * 3/8 which is acceptable — OnboardingProgress is intentionally NOT modified
 * per the task coordination rules).
 */
export function CurrencyScreen() {
  const t = useT();
  const { currency, setCurrency, navigate } = useStore();

  const handleSelect = (code: CurrencyCode) => {
    setCurrency(code);
    sound.playClick();
    haptics.selection();
  };

  const handleContinue = () => {
    sound.playClick();
    haptics.light();
    navigate("welcome");
  };

  // Preview amount: 10 000 FCFA — the canonical "weekly bet" example.
  const PREVIEW_AMOUNT_FCFA = 10000;
  const previewFormatted = formatCurrency(PREVIEW_AMOUNT_FCFA, currency);

  return (
    <div className="min-h-screen flex flex-col px-6 pt-14 pb-8">
      <OnboardingProgress currentStep={3} />

      {/* Title section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
          style={{
            background:
              "linear-gradient(135deg, rgba(245, 158, 11,0.18) 0%, rgba(255,59,48,0.14) 100%)",
            border: "1px solid rgba(245, 158, 11,0.3)",
          }}
          aria-hidden
        >
          <Coins size={26} className="text-[#F59E0B]" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2">
          {t("currencyTitle")}
        </h1>
        <p className="text-white/60 text-sm max-w-xs mx-auto">
          {t("currencySubtitle")}
        </p>
      </motion.div>

      {/* Preview card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card-strong p-4 mb-5 rounded-2xl"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider text-white/50 font-[family-name:var(--font-poppins)] mb-1">
              {t("currencyPreview")}
            </p>
            <p className="text-xs text-white/60 leading-relaxed">
              10 000 FCFA
              <span className="mx-1.5 text-white/30">→</span>
              <span className="text-white font-semibold">
                {previewFormatted}
              </span>
            </p>
          </div>
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(245, 158, 11,0.16) 0%, rgba(255,59,48,0.10) 100%)",
            }}
            aria-hidden
          >
            <CurrencyFlag currencyCode={currency} size={28} />
          </div>
        </div>
      </motion.div>

      {/* Currency grid (2 columns, scrollable) */}
      <div
        className="flex-1 max-w-sm mx-auto w-full"
        role="radiogroup"
        aria-label={t("currencyTitle")}
      >
        <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1 pb-2 custom-scroll">
          {CURRENCIES.map((c, idx) => {
            const selected = currency === c.code;
            return (
              <motion.button
                key={c.code}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`${c.nativeName} — ${c.code} (${c.symbol})`}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.03 * idx, type: "spring", stiffness: 260, damping: 22 }}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleSelect(c.code)}
                className={`relative glass-card card-hover btn-press p-4 rounded-2xl flex flex-col items-start text-left overflow-hidden transition-all ${
                  selected ? "ring-2 ring-[#F59E0B] glow-orange" : ""
                }`}
              >
                {selected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full gradient-primary flex items-center justify-center z-10"
                    aria-hidden
                  >
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}

                <span className="leading-none mb-2 block" aria-hidden>
                  <CurrencyFlag currencyCode={c.code} size={36} />
                </span>
                <span className="text-white font-bold text-sm font-[family-name:var(--font-poppins)] tracking-wide">
                  {c.code}
                </span>
                <span className="text-white/55 text-[11px] leading-tight mt-0.5 line-clamp-1">
                  {c.nativeName}
                </span>
                <span className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{
                    background: "rgba(245, 158, 11,0.10)",
                    color: "#FFB84D",
                  }}
                >
                  {c.symbol}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Continue button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        className="mt-6 mx-auto max-w-sm w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-green btn-press flex items-center justify-center gap-2"
      >
        {t("continue")}
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );
}
