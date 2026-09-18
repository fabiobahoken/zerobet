"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { CAROUSEL_SLIDES } from "@/lib/data/carousel-data";
import { OnboardingProgress } from "@/components/zerobet/components/OnboardingProgress";
import { useT } from "@/lib/i18n/useT";
import type { Language } from "@/lib/i18n/dictionary";
import {
  formatCurrency,
  type CurrencyCode,
} from "@/lib/data/currency-data";

/* ----------------------------------------------------------------------------
 * Story variant — slide 7 ("true story") adapts to the user's currency and
 * language. The amount lost is stored internally in FCFA and converted to the
 * user's display currency via formatCurrency(). The name/city/achievement are
 * picked from a culturally appropriate variant for each currency region.
 * -------------------------------------------------------------------------- */
type AchievementKey =
  | "moto-taxi"
  | "used-car"
  | "scooter"
  | "motorcycle"
  | "generator-business"
  | "phone-repair-shop"
  | "food-cart"
  | "taxi"
  | "small-shop"
  | "electric-scooter"
  | "delivery-bike";

interface StoryVariant {
  name: string;
  age: number;
  city: string;
  /** Amount lost, stored internally in FCFA (the app's canonical currency). */
  amountLostFCFA: number;
  days: number;
  achievementKey: AchievementKey;
}

const STORY_VARIANTS: Record<CurrencyCode, StoryVariant> = {
  XOF: { name: "Moussa", age: 28, city: "Dakar", amountLostFCFA: 3_000_000, days: 187, achievementKey: "moto-taxi" },
  USD: { name: "Michael", age: 32, city: "Chicago", amountLostFCFA: 3_000_000, days: 156, achievementKey: "used-car" },
  EUR: { name: "Marco", age: 29, city: "Lyon", amountLostFCFA: 3_000_000, days: 203, achievementKey: "scooter" },
  GBP: { name: "James", age: 30, city: "Manchester", amountLostFCFA: 3_000_000, days: 175, achievementKey: "motorcycle" },
  NGN: { name: "Chidi", age: 27, city: "Lagos", amountLostFCFA: 3_000_000, days: 142, achievementKey: "generator-business" },
  GHS: { name: "Kwame", age: 26, city: "Accra", amountLostFCFA: 3_000_000, days: 168, achievementKey: "phone-repair-shop" },
  ZAR: { name: "Sipho", age: 31, city: "Johannesburg", amountLostFCFA: 3_000_000, days: 191, achievementKey: "used-car" },
  MAD: { name: "Youssef", age: 29, city: "Casablanca", amountLostFCFA: 3_000_000, days: 210, achievementKey: "food-cart" },
  TND: { name: "Karim", age: 30, city: "Tunis", amountLostFCFA: 3_000_000, days: 184, achievementKey: "taxi" },
  BRL: { name: "Rafael", age: 28, city: "São Paulo", amountLostFCFA: 3_000_000, days: 162, achievementKey: "used-car" },
  INR: { name: "Arjun", age: 27, city: "Mumbai", amountLostFCFA: 3_000_000, days: 145, achievementKey: "small-shop" },
  CNY: { name: "Wei", age: 30, city: "Shanghai", amountLostFCFA: 3_000_000, days: 178, achievementKey: "electric-scooter" },
  JPY: { name: "Kenji", age: 32, city: "Osaka", amountLostFCFA: 3_000_000, days: 195, achievementKey: "delivery-bike" },
};

const ACHIEVEMENT_TRANSLATIONS: Record<AchievementKey, { fr: string; en: string; es: string }> = {
  "moto-taxi": { fr: "une moto-taxi", en: "a moto-taxi", es: "una moto-taxi" },
  "used-car": { fr: "une voiture d'occasion", en: "a used car", es: "un coche de segunda mano" },
  scooter: { fr: "un scooter", en: "a scooter", es: "un scooter" },
  motorcycle: { fr: "une moto", en: "a motorcycle", es: "una motocicleta" },
  "generator-business": {
    fr: "une activité de location de groupes électrogènes",
    en: "a generator rental business",
    es: "un negocio de alquiler de generadores",
  },
  "phone-repair-shop": {
    fr: "une boutique de réparation de téléphones",
    en: "a phone repair shop",
    es: "una tienda de reparación de teléfonos",
  },
  "food-cart": { fr: "un food-truck", en: "a food cart", es: "un carrito de comida" },
  taxi: { fr: "un taxi", en: "a taxi", es: "un taxi" },
  "small-shop": { fr: "une petite boutique", en: "a small shop", es: "una pequeña tienda" },
  "electric-scooter": { fr: "un scooter électrique", en: "an electric scooter", es: "un patinete eléctrico" },
  "delivery-bike": { fr: "une moto de livraison", en: "a delivery bike", es: "una moto de reparto" },
};

export function CarouselScreen() {
  const { navigate, goBack, currency } = useStore();
  const t = useT();
  const language = useStore((s) => s.language) as Language;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slide = CAROUSEL_SLIDES[currentIndex];
  const isLast = currentIndex === CAROUSEL_SLIDES.length - 1;

  /* Resolve translated slide content. Slides 2 and 7 have currency/language
   * sensitive placeholders that we fill in here. */
  const storyVariant =
    STORY_VARIANTS[currency] ?? STORY_VARIANTS.XOF;
  const achievementText =
    ACHIEVEMENT_TRANSLATIONS[storyVariant.achievementKey][language];

  const slideTitle =
    slide.id === 7
      ? t(slide.titleKey, {
          name: storyVariant.name,
          age: storyVariant.age,
          city: storyVariant.city,
        })
      : t(slide.titleKey);

  const slideBody =
    slide.id === 2
      ? t(slide.bodyKey, {
          weeklyBet: formatCurrency(1000, currency),
          minLoss: formatCurrency(26000, currency),
          maxLoss: formatCurrency(62000, currency),
        })
      : slide.id === 7
        ? t(slide.bodyKey, {
            amountLost: formatCurrency(storyVariant.amountLostFCFA, currency),
            days: storyVariant.days,
            achievement: achievementText,
          })
        : t(slide.bodyKey);

  const slideStat =
    slide.statKey === undefined
      ? ""
      : slide.id === 2
        ? t(slide.statKey, { amount: formatCurrency(62000, currency) })
        : slide.id === 7
          ? t(slide.statKey, { days: storyVariant.days })
          : t(slide.statKey);

  const handleNext = () => {
    if (isLast) {
      navigate("engagement");
    } else {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      goBack();
    } else {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-8">
      <OnboardingProgress currentStep={7} />
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <p className="text-white/50 text-xs">{t("carouselTitle")}</p>
          <div className="flex gap-1 mt-2">
            {CAROUSEL_SLIDES.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all ${
                  idx === currentIndex ? "gradient-primary" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="glass-card-strong p-8 text-center relative overflow-hidden"
          >
            {/* Decorative gradient blob */}
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-30 blur-3xl"
              style={{ background: slide.bgGradient }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-20 blur-3xl"
              style={{ background: slide.bgGradient }}
            />

            <div className="relative">
              {/* Emoji icon */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                className="text-7xl mb-4 inline-block"
              >
                {slide.emoji}
              </motion.div>

              {/* Stat badge */}
              {slideStat && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-4"
                  style={{
                    background: `${slide.accentColor}30`,
                    border: `1px solid ${slide.accentColor}`,
                    color: slide.accentColor,
                  }}
                >
                  {slideStat}
                </motion.div>
              )}

              <h2 className="text-2xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-4 leading-tight">
                {slideTitle}
              </h2>
              <p className="text-white/70 text-base leading-relaxed text-pretty">
                {slideBody}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "w-8 gradient-primary" : "w-2 bg-white/20"
              }`}
              aria-label={t("carouselSlide", { n: idx + 1 })}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            setDirection(1);
            setCurrentIndex(Math.min(currentIndex + 1, CAROUSEL_SLIDES.length - 1));
          }}
          className="px-5 py-3 rounded-2xl glass-card text-white/70 font-medium text-sm active:scale-95"
          disabled={isLast}
        >
          {t("skip")}
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-green flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          {isLast ? t("carouselCommit") : t("continue")}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
