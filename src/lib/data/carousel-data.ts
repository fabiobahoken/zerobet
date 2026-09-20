/**
 * Carousel Éducatif — 8 slides (PRD v2.0 Annexe A)
 *
 * Each slide references translation keys (titleKey / bodyKey / statKey)
 * instead of hardcoded French text. The actual copy lives in
 * `src/lib/i18n/dictionary.ts` (carousel1Title … carousel8Stat for FR/EN/ES).
 *
 * Slide 7 ("true story") uses placeholder tokens ({name}, {age}, {city},
 * {amountLost}, {days}, {achievement}) that are filled in at render time
 * by `getStoryVariant()` in CarouselScreen — the story adapts to the
 * user's currency and language.
 *
 * Slide 2 stat uses {amount} which is replaced with a currency-formatted
 * "-62 000 FCFA/an"-style string at render time.
 */
export interface CarouselSlide {
  id: number;
  titleKey: string;
  bodyKey: string;
  emoji: string;
  bgGradient: string;
  accentColor: string;
  /** Optional stat translation key. May contain placeholders ({amount}). */
  statKey?: string;
}

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    titleKey: "carousel1Title",
    bodyKey: "carousel1Body",
    emoji: "🧠",
    bgGradient: "linear-gradient(135deg, #FF3B30 0%, #8B0000 100%)",
    accentColor: "#FF3B30",
    statKey: "carousel1Stat",
  },
  {
    id: 2,
    titleKey: "carousel2Title",
    bodyKey: "carousel2Body",
    emoji: "🎰",
    bgGradient: "linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)",
    accentColor: "#FFB020",
    statKey: "carousel2Stat",
  },
  {
    id: 3,
    titleKey: "carousel3Title",
    bodyKey: "carousel3Body",
    emoji: "🎯",
    bgGradient: "linear-gradient(135deg, #D9480F 0%, #2D1B69 100%)",
    accentColor: "#FFD166",
    statKey: "carousel3Stat",
  },
  {
    id: 4,
    titleKey: "carousel4Title",
    bodyKey: "carousel4Body",
    emoji: "🔬",
    bgGradient: "linear-gradient(135deg, #93410F 0%, #7C2D12 100%)",
    accentColor: "#FFC94D",
    statKey: "carousel4Stat",
  },
  {
    id: 5,
    titleKey: "carousel5Title",
    bodyKey: "carousel5Body",
    emoji: "💔",
    bgGradient: "linear-gradient(135deg, #991B1B 0%, #450A0A 100%)",
    accentColor: "#FF3B30",
    statKey: "carousel5Stat",
  },
  {
    id: 6,
    titleKey: "carousel6Title",
    bodyKey: "carousel6Body",
    emoji: "🌅",
    bgGradient: "linear-gradient(135deg, #FFC94D 0%, #93410F 100%)",
    accentColor: "#FFC94D",
    statKey: "carousel6Stat",
  },
  {
    id: 7,
    titleKey: "carousel7Title",
    bodyKey: "carousel7Body",
    emoji: "🧑🏾",
    bgGradient: "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)",
    accentColor: "#FBBF24",
    statKey: "carousel7Stat",
  },
  {
    id: 8,
    titleKey: "carousel8Title",
    bodyKey: "carousel8Body",
    emoji: "⚡",
    bgGradient: "linear-gradient(135deg, #FF3B30 0%, #F59E0B 100%)",
    accentColor: "#F59E0B",
    statKey: "carousel8Stat",
  },
];
