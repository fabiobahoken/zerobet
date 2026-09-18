import type { Affirmation, AffirmationCategory } from "@/store/zerobet-store";

/**
 * Affirmations data — daily affirmations tool to help users rewire their
 * mindset with positive self-talk (Task 12-b).
 *
 * 60 seed affirmations: 10 per category × 6 categories.
 * Each seed affirmation exposes a `textKey` that maps to a localized string
 * in `src/lib/i18n/dictionary.ts` (keys `affirmation1Text` … `affirmation60Text`
 * × fr / en / es). Task 19-a.
 *
 * Custom (user-entered) affirmations store their raw text directly in
 * `textKey`. The `t()` helper falls back to returning the key itself when it
 * isn't found in the dictionary, so custom text renders as-is.
 */

export const CATEGORY_META: Record<
  AffirmationCategory,
  {
    label: string;
    emoji: string;
    color: string;
    description: string;
    gradient: string;
  }
> = {
  morning: {
    label: "Matin",
    emoji: "🌅",
    color: "#FF9500",
    description: "Pour démarrer la journée du bon pied",
    gradient: "linear-gradient(135deg, #FF9500 0%, #FBBF24 100%)",
  },
  crisis: {
    label: "Crise",
    emoji: "🆘",
    color: "#FF3B30",
    description: "Quand l'envie devient forte",
    gradient: "linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)",
  },
  "self-worth": {
    label: "Valeur personnelle",
    emoji: "💎",
    color: "#BF5AF2",
    description: "Te rappeler qui tu es",
    gradient: "linear-gradient(135deg, #BF5AF2 0%, #FF2D55 100%)",
  },
  future: {
    label: "Avenir",
    emoji: "🚀",
    color: "#64D2FF",
    description: "Visualiser la vie que tu construis",
    gradient: "linear-gradient(135deg, #64D2FF 0%, #5E5CE6 100%)",
  },
  gratitude: {
    label: "Gratitude",
    emoji: "🙏",
    color: "#4ADE80",
    description: "Reconnaître le positif",
    gradient: "linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)",
  },
  strength: {
    label: "Force",
    emoji: "💪",
    color: "#FBBF24",
    description: "Puiser dans ta puissance",
    gradient: "linear-gradient(135deg, #FBBF24 0%, #FF9500 100%)",
  },
};

export const CATEGORY_ORDER: AffirmationCategory[] = [
  "morning",
  "crisis",
  "self-worth",
  "future",
  "gratitude",
  "strength",
];

export const SEED_AFFIRMATIONS: Affirmation[] = [
  // ---------- Morning (10) ----------
  { id: "aff-m-1", textKey: "affirmation1Text", category: "morning", isCustom: false },
  { id: "aff-m-2", textKey: "affirmation2Text", category: "morning", isCustom: false },
  { id: "aff-m-3", textKey: "affirmation3Text", category: "morning", isCustom: false },
  { id: "aff-m-4", textKey: "affirmation4Text", category: "morning", isCustom: false },
  { id: "aff-m-5", textKey: "affirmation5Text", category: "morning", isCustom: false },
  { id: "aff-m-6", textKey: "affirmation6Text", category: "morning", isCustom: false },
  { id: "aff-m-7", textKey: "affirmation7Text", category: "morning", isCustom: false },
  { id: "aff-m-8", textKey: "affirmation8Text", category: "morning", isCustom: false },
  { id: "aff-m-9", textKey: "affirmation9Text", category: "morning", isCustom: false },
  { id: "aff-m-10", textKey: "affirmation10Text", category: "morning", isCustom: false },

  // ---------- Crisis (10) ----------
  { id: "aff-c-1", textKey: "affirmation11Text", category: "crisis", isCustom: false },
  { id: "aff-c-2", textKey: "affirmation12Text", category: "crisis", isCustom: false },
  { id: "aff-c-3", textKey: "affirmation13Text", category: "crisis", isCustom: false },
  { id: "aff-c-4", textKey: "affirmation14Text", category: "crisis", isCustom: false },
  { id: "aff-c-5", textKey: "affirmation15Text", category: "crisis", isCustom: false },
  { id: "aff-c-6", textKey: "affirmation16Text", category: "crisis", isCustom: false },
  { id: "aff-c-7", textKey: "affirmation17Text", category: "crisis", isCustom: false },
  { id: "aff-c-8", textKey: "affirmation18Text", category: "crisis", isCustom: false },
  { id: "aff-c-9", textKey: "affirmation19Text", category: "crisis", isCustom: false },
  { id: "aff-c-10", textKey: "affirmation20Text", category: "crisis", isCustom: false },

  // ---------- Self-worth (10) ----------
  { id: "aff-sw-1", textKey: "affirmation21Text", category: "self-worth", isCustom: false },
  { id: "aff-sw-2", textKey: "affirmation22Text", category: "self-worth", isCustom: false },
  { id: "aff-sw-3", textKey: "affirmation23Text", category: "self-worth", isCustom: false },
  { id: "aff-sw-4", textKey: "affirmation24Text", category: "self-worth", isCustom: false },
  { id: "aff-sw-5", textKey: "affirmation25Text", category: "self-worth", isCustom: false },
  { id: "aff-sw-6", textKey: "affirmation26Text", category: "self-worth", isCustom: false },
  { id: "aff-sw-7", textKey: "affirmation27Text", category: "self-worth", isCustom: false },
  { id: "aff-sw-8", textKey: "affirmation28Text", category: "self-worth", isCustom: false },
  { id: "aff-sw-9", textKey: "affirmation29Text", category: "self-worth", isCustom: false },
  { id: "aff-sw-10", textKey: "affirmation30Text", category: "self-worth", isCustom: false },

  // ---------- Future (10) ----------
  { id: "aff-f-1", textKey: "affirmation31Text", category: "future", isCustom: false },
  { id: "aff-f-2", textKey: "affirmation32Text", category: "future", isCustom: false },
  { id: "aff-f-3", textKey: "affirmation33Text", category: "future", isCustom: false },
  { id: "aff-f-4", textKey: "affirmation34Text", category: "future", isCustom: false },
  { id: "aff-f-5", textKey: "affirmation35Text", category: "future", isCustom: false },
  { id: "aff-f-6", textKey: "affirmation36Text", category: "future", isCustom: false },
  { id: "aff-f-7", textKey: "affirmation37Text", category: "future", isCustom: false },
  { id: "aff-f-8", textKey: "affirmation38Text", category: "future", isCustom: false },
  { id: "aff-f-9", textKey: "affirmation39Text", category: "future", isCustom: false },
  { id: "aff-f-10", textKey: "affirmation40Text", category: "future", isCustom: false },

  // ---------- Gratitude (10) ----------
  { id: "aff-g-1", textKey: "affirmation41Text", category: "gratitude", isCustom: false },
  { id: "aff-g-2", textKey: "affirmation42Text", category: "gratitude", isCustom: false },
  { id: "aff-g-3", textKey: "affirmation43Text", category: "gratitude", isCustom: false },
  { id: "aff-g-4", textKey: "affirmation44Text", category: "gratitude", isCustom: false },
  { id: "aff-g-5", textKey: "affirmation45Text", category: "gratitude", isCustom: false },
  { id: "aff-g-6", textKey: "affirmation46Text", category: "gratitude", isCustom: false },
  { id: "aff-g-7", textKey: "affirmation47Text", category: "gratitude", isCustom: false },
  { id: "aff-g-8", textKey: "affirmation48Text", category: "gratitude", isCustom: false },
  { id: "aff-g-9", textKey: "affirmation49Text", category: "gratitude", isCustom: false },
  { id: "aff-g-10", textKey: "affirmation50Text", category: "gratitude", isCustom: false },

  // ---------- Strength (10) ----------
  { id: "aff-s-1", textKey: "affirmation51Text", category: "strength", isCustom: false },
  { id: "aff-s-2", textKey: "affirmation52Text", category: "strength", isCustom: false },
  { id: "aff-s-3", textKey: "affirmation53Text", category: "strength", isCustom: false },
  { id: "aff-s-4", textKey: "affirmation54Text", category: "strength", isCustom: false },
  { id: "aff-s-5", textKey: "affirmation55Text", category: "strength", isCustom: false },
  { id: "aff-s-6", textKey: "affirmation56Text", category: "strength", isCustom: false },
  { id: "aff-s-7", textKey: "affirmation57Text", category: "strength", isCustom: false },
  { id: "aff-s-8", textKey: "affirmation58Text", category: "strength", isCustom: false },
  { id: "aff-s-9", textKey: "affirmation59Text", category: "strength", isCustom: false },
  { id: "aff-s-10", textKey: "affirmation60Text", category: "strength", isCustom: false },
];

/**
 * Returns the deterministic "affirmation of the day" based on day-of-year.
 * Stable within a day, changes the next day.
 */
export function getDailyAffirmation(
  seed: Affirmation[] = SEED_AFFIRMATIONS,
  now: Date = new Date()
): Affirmation {
  if (seed.length === 0) {
    return {
      id: "fallback",
      textKey: "affirmation1Text",
      category: "morning",
      isCustom: false,
    };
  }
  const dayIndex = Math.floor(now.getTime() / 86_400_000);
  const idx = ((dayIndex % seed.length) + seed.length) % seed.length;
  return seed[idx];
}

/**
 * Returns a random affirmation, optionally excluding a given id
 * (used by the "Nouvelle affirmation" button so we don't show the same twice).
 */
export function getRandomAffirmation(
  seed: Affirmation[] = SEED_AFFIRMATIONS,
  excludeId?: string
): Affirmation {
  if (seed.length === 0) {
    return {
      id: "fallback",
      textKey: "affirmation1Text",
      category: "morning",
      isCustom: false,
    };
  }
  const pool = excludeId
    ? seed.filter((a) => a.id !== excludeId)
    : seed;
  const list = pool.length > 0 ? pool : seed;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}
