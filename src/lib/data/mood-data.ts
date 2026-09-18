import type { Emotion } from "@/store/zerobet-store";

/**
 * Shared mood metadata for the Zerobet app.
 *
 * Used by:
 * - {@link MoodTracker} component (dashboard quick mood capture)
 * - {@link StatsScreen} mood visualisations (distribution, timeline, streak, insight)
 *
 * Keeping a single source of truth avoids drift between the emoji shown to the
 * user when they tap a mood and the emoji shown back to them in their stats.
 */

export interface MoodOption {
  /** Stable emotion key persisted in journal entries. */
  key: Emotion;
  /** Emoji rendered in the UI. */
  emoji: string;
  /** French label shown under the emoji. */
  label: string;
  /** Hex colour used for bars / dots / glows. */
  color: string;
  /** Short French description of what the mood represents. */
  description: string;
}

/**
 * The 5 distinct moods surfaced in the MoodTracker quick-capture widget.
 *
 * Note: `tempted` is intentionally omitted from this list because it is a
 * craving state (handled by the Panic Button flow) rather than a mood. The
 * full Emotion union still includes it for legacy journal entries.
 */
export const MOOD_OPTIONS: MoodOption[] = [
  {
    key: "frustrated",
    emoji: "😤",
    label: "Frustré",
    color: "#FF3B30",
    description: "Stress, irritation, envie de craquer",
  },
  {
    key: "anxious",
    emoji: "😰",
    label: "Anxieux",
    color: "#FBBF24",
    description: "Inquiétude, tension, nervosité",
  },
  {
    key: "calm",
    emoji: "😌",
    label: "Calme",
    color: "#64D2FF",
    description: "Sérénité, équilibre, paix",
  },
  {
    key: "proud",
    emoji: "🦸",
    label: "Fier",
    color: "#BF5AF2",
    description: "Fierté, accomplissement, confiance",
  },
  {
    key: "strong",
    emoji: "💪",
    label: "Fort",
    color: "#4ADE80",
    description: "Détermination, volonté, énergie",
  },
];

/**
 * Resolve a {@link MoodOption} from an {@link Emotion} key.
 * Falls back to the first option if the key is unknown (e.g. `tempted`).
 */
export function getMoodMeta(key: Emotion): MoodOption {
  return MOOD_OPTIONS.find((m) => m.key === key) ?? MOOD_OPTIONS[0];
}

/**
 * Personalised insight shown in the StatsScreen "Dominant Mood" card.
 * Covers every emotion in the union so we never key into `undefined`.
 */
export const MOOD_INSIGHTS: Record<Emotion, string> = {
  frustrated:
    "Le stress accompagne souvent les premiers jours. Sois patient avec toi-même.",
  anxious:
    "L'anxiété diminue avec le temps. Tes pratiques de respiration aident.",
  tempted:
    "Les envies sont normales. Chaque envie surmontée te renforce.",
  calm: "Tu trouves ton équilibre. Continue tes pratiques quotidiennes.",
  proud:
    "Tu prends confiance. Célèbre chaque victoire, petite ou grande.",
  strong:
    "Ta force grandit. Tu es en train de devenir une inspiration.",
};
