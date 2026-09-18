/**
 * Quiz d'Addiction — 15 questions complètes (PRD v2.0)
 * Categories: Comportement (5Q), Finance (4Q), Émotions (3Q), Social (3Q)
 *
 * i18n (Task 16-b): questions and options are no longer hardcoded in French.
 * Each question exposes `questionKey` and `optionsKey` — translations live in
 * `src/lib/i18n/dictionary.ts` under keys `quizQ{n}` and `quizQ{n}Opt{0..3}`.
 */
export interface QuizQuestion {
  id: number;
  category: "behavior" | "finance" | "emotions" | "social";
  /** Translation key for the question text (resolves via `t(questionKey)`). */
  questionKey: string;
  /** Translation key prefix for the 4 options (resolves via `t(optionsKey + i)`). */
  optionsKey: string;
  /** Points per option (0 = least severe, 3 = most severe) */
  points: number[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Comportement (5Q)
  {
    id: 1,
    category: "behavior",
    questionKey: "quizQ1",
    optionsKey: "quizQ1Opt",
    points: [0, 1, 2, 3],
  },
  {
    id: 2,
    category: "behavior",
    questionKey: "quizQ2",
    optionsKey: "quizQ2Opt",
    points: [0, 1, 2, 3],
  },
  {
    id: 3,
    category: "behavior",
    questionKey: "quizQ3",
    optionsKey: "quizQ3Opt",
    points: [0, 1, 2, 3],
  },
  {
    id: 4,
    category: "behavior",
    questionKey: "quizQ4",
    optionsKey: "quizQ4Opt",
    points: [0, 1, 2, 3],
  },
  {
    id: 5,
    category: "behavior",
    questionKey: "quizQ5",
    optionsKey: "quizQ5Opt",
    points: [0, 1, 2, 3],
  },
  // Finance (4Q)
  {
    id: 6,
    category: "finance",
    questionKey: "quizQ6",
    optionsKey: "quizQ6Opt",
    points: [0, 1, 2, 3],
  },
  {
    id: 7,
    category: "finance",
    questionKey: "quizQ7",
    optionsKey: "quizQ7Opt",
    points: [0, 1, 2, 3],
  },
  {
    id: 8,
    category: "finance",
    questionKey: "quizQ8",
    optionsKey: "quizQ8Opt",
    points: [0, 1, 2, 3],
  },
  {
    id: 9,
    category: "finance",
    questionKey: "quizQ9",
    optionsKey: "quizQ9Opt",
    points: [0, 1, 2, 3],
  },
  // Émotions (3Q)
  {
    id: 10,
    category: "emotions",
    questionKey: "quizQ10",
    optionsKey: "quizQ10Opt",
    points: [0, 1, 2, 3],
  },
  {
    id: 11,
    category: "emotions",
    questionKey: "quizQ11",
    optionsKey: "quizQ11Opt",
    points: [0, 1, 2, 3],
  },
  {
    id: 12,
    category: "emotions",
    questionKey: "quizQ12",
    optionsKey: "quizQ12Opt",
    points: [0, 1, 2, 3],
  },
  // Social (3Q)
  {
    id: 13,
    category: "social",
    questionKey: "quizQ13",
    optionsKey: "quizQ13Opt",
    points: [0, 1, 2, 3],
  },
  {
    id: 14,
    category: "social",
    questionKey: "quizQ14",
    optionsKey: "quizQ14Opt",
    points: [0, 1, 2, 3],
  },
  {
    id: 15,
    category: "social",
    questionKey: "quizQ15",
    optionsKey: "quizQ15Opt",
    points: [0, 1, 2, 3],
  },
];

export function calculateScore(answers: number[]): { score: number; level: "faible" | "modere" | "severe" | "critique"; percentile: number } {
  const total = answers.reduce((sum, aIdx, qIdx) => {
    const q = QUIZ_QUESTIONS[qIdx];
    if (!q) return sum;
    return sum + (q.points[aIdx] || 0);
  }, 0);
  const maxScore = QUIZ_QUESTIONS.length * 3;
  const score = Math.round((total / maxScore) * 100);
  let level: "faible" | "modere" | "severe" | "critique";
  if (score < 25) level = "faible";
  else if (score < 50) level = "modere";
  else if (score < 75) level = "severe";
  else level = "critique";
  // Percentile: rough estimate based on score
  const percentile = Math.min(95, Math.round(score * 0.95));
  return { score, level, percentile };
}
