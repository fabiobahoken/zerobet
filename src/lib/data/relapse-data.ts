import type { RelapseProtocolStep } from "@/store/zerobet-store";

/**
 * 24-hour relapse recovery protocol.
 * 4 phases, 8 steps total. Each step has a compassionate tone + concrete action.
 *
 * All copy is exposed via i18n keys (`titleKey`, `descKey`, `actionKey`)
 * resolved against `src/lib/i18n/dictionary.ts` (Task 19-a). Phases and
 * inspirational quotes are similarly keyed (`labelKey`, `textKey`, `authorKey`).
 */
export const PROTOCOL_STEPS: Omit<RelapseProtocolStep, "completed" | "completedAt">[] = [
  // Phase 1: Immediate (first 5 minutes)
  {
    id: "step-1",
    phase: "immediate",
    titleKey: "relapseStep1Title",
    descKey: "relapseStep1Desc",
    actionKey: "relapseStep1Action",
    duration: "3 min",
  },
  {
    id: "step-2",
    phase: "immediate",
    titleKey: "relapseStep2Title",
    descKey: "relapseStep2Desc",
    actionKey: "relapseStep2Action",
    duration: "2 min",
  },
  // Phase 2: First hour
  {
    id: "step-3",
    phase: "hour1",
    titleKey: "relapseStep3Title",
    descKey: "relapseStep3Desc",
    actionKey: "relapseStep3Action",
    duration: "5 min",
  },
  {
    id: "step-4",
    phase: "hour1",
    titleKey: "relapseStep4Title",
    descKey: "relapseStep4Desc",
    actionKey: "relapseStep4Action",
    duration: "10 min",
  },
  // Phase 3: 6 hours later
  {
    id: "step-5",
    phase: "hour6",
    titleKey: "relapseStep5Title",
    descKey: "relapseStep5Desc",
    actionKey: "relapseStep5Action",
    duration: "30 min",
  },
  {
    id: "step-6",
    phase: "hour6",
    titleKey: "relapseStep6Title",
    descKey: "relapseStep6Desc",
    actionKey: "relapseStep6Action",
    duration: "5 min",
  },
  // Phase 4: 24 hours later
  {
    id: "step-7",
    phase: "hour24",
    titleKey: "relapseStep7Title",
    descKey: "relapseStep7Desc",
    actionKey: "relapseStep7Action",
    duration: "10 min",
  },
  {
    id: "step-8",
    phase: "hour24",
    titleKey: "relapseStep8Title",
    descKey: "relapseStep8Desc",
    actionKey: "relapseStep8Action",
    duration: "2 min",
  },
];

export const RELAPSE_QUOTES = [
  {
    textKey: "relapseQuote1Text",
    authorKey: "relapseQuote1Author",
  },
  {
    textKey: "relapseQuote2Text",
    authorKey: "relapseQuote2Author",
  },
  {
    textKey: "relapseQuote3Text",
    authorKey: "relapseQuote3Author",
  },
  {
    textKey: "relapseQuote4Text",
    authorKey: "relapseQuote4Author",
  },
];

export const PHASE_META: Record<
  RelapseProtocolStep["phase"],
  { labelKey: string; timeframe: string; color: string; emoji: string }
> = {
  immediate: { labelKey: "relapsePhaseImmediate", timeframe: "0-5 min", color: "#FF3B30", emoji: "🚨" },
  hour1: { labelKey: "relapsePhaseHour1", timeframe: "5-60 min", color: "#F59E0B", emoji: "⚡" },
  hour6: { labelKey: "relapsePhaseHour6", timeframe: "1-6h", color: "#FBBF24", emoji: "🌱" },
  hour24: { labelKey: "relapsePhaseHour24", timeframe: "6-24h", color: "#4ADE80", emoji: "💪" },
};
