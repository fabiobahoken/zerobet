"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ChevronLeft,
  Activity,
  Brain,
  Heart,
  Sparkles,
  Check,
  ChevronDown,
  AlertTriangle,
  Phone,
  Zap,
  Wind,
  Users,
  Moon,
  Coffee,
  Dumbbell,
  PenLine,
  TrendingDown,
  TrendingUp,
  Minus,
  Info,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { Slider } from "@/components/ui/slider";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

// ---------- Types & constants ----------

interface SymptomDef {
  key: string;
  nameKey: string;
  category: "physique" | "mental";
  emoji: string;
}

const SYMPTOMS: SymptomDef[] = [
  // Physique
  { key: "headache", nameKey: "withdrawalSymptomHeadache", category: "physique", emoji: "🤕" },
  { key: "insomnia", nameKey: "withdrawalSymptomInsomnia", category: "physique", emoji: "😴" },
  { key: "fatigue", nameKey: "withdrawalSymptomFatigue", category: "physique", emoji: "🥱" },
  { key: "sweats", nameKey: "withdrawalSymptomSweats", category: "physique", emoji: "💦" },
  { key: "digestive", nameKey: "withdrawalSymptomDigestive", category: "physique", emoji: "🤢" },
  { key: "palpitations", nameKey: "withdrawalSymptomPalpitations", category: "physique", emoji: "💓" },
  // Mental
  { key: "anxiety", nameKey: "withdrawalSymptomAnxiety", category: "mental", emoji: "😰" },
  { key: "irritability", nameKey: "withdrawalSymptomIrritability", category: "mental", emoji: "😤" },
  { key: "concentration", nameKey: "withdrawalSymptomConcentration", category: "mental", emoji: "🧩" },
  { key: "depression", nameKey: "withdrawalSymptomDepression", category: "mental", emoji: "🌧️" },
  { key: "cravings", nameKey: "withdrawalSymptomCravings", category: "mental", emoji: "🎰" },
  { key: "agitation", nameKey: "withdrawalSymptomAgitation", category: "mental", emoji: "⚡" },
];

interface PhaseDef {
  id: string;
  rangeKey: string;
  titleKey: string;
  descriptionKey: string;
  symptomsKey: string;
  tipKey: string;
  color: string;
  startDay: number;
  endDay: number;
}

const PHASES: PhaseDef[] = [
  {
    id: "acute",
    rangeKey: "withdrawalPhaseAcuteRange",
    titleKey: "withdrawalPhaseAcuteTitle",
    descriptionKey: "withdrawalPhaseAcuteDesc",
    symptomsKey: "withdrawalPhaseAcuteSymptoms",
    tipKey: "withdrawalPhaseAcuteTip",
    color: "#FF3B30",
    startDay: 1,
    endDay: 7,
  },
  {
    id: "stabilization",
    rangeKey: "withdrawalPhaseStabRange",
    titleKey: "withdrawalPhaseStabTitle",
    descriptionKey: "withdrawalPhaseStabDesc",
    symptomsKey: "withdrawalPhaseStabSymptoms",
    tipKey: "withdrawalPhaseStabTip",
    color: "#F59E0B",
    startDay: 8,
    endDay: 30,
  },
  {
    id: "recovery",
    rangeKey: "withdrawalPhaseRecRange",
    titleKey: "withdrawalPhaseRecTitle",
    descriptionKey: "withdrawalPhaseRecDesc",
    symptomsKey: "withdrawalPhaseRecSymptoms",
    tipKey: "withdrawalPhaseRecTip",
    color: "#FBBF24",
    startDay: 31,
    endDay: 90,
  },
  {
    id: "healing",
    rangeKey: "withdrawalPhaseHealRange",
    titleKey: "withdrawalPhaseHealTitle",
    descriptionKey: "withdrawalPhaseHealDesc",
    symptomsKey: "withdrawalPhaseHealSymptoms",
    tipKey: "withdrawalPhaseHealTip",
    color: "#FFC94D",
    startDay: 91,
    endDay: 365,
  },
];

interface CopingStrategy {
  icon: typeof Wind;
  labelKey: string;
  color: string;
  screen: string;
  screenLabelKey: string;
}

interface CopingCategory {
  titleKey: string;
  emoji: string;
  color: string;
  strategies: CopingStrategy[];
}

const COPING: CopingCategory[] = [
  {
    titleKey: "withdrawalCopingInsomnia",
    emoji: "😴",
    color: "#FFB020",
    strategies: [
      { icon: Moon, labelKey: "affirmationsTipA", color: "#FFB020", screen: "meditation", screenLabelKey: "withdrawalCopingScreenMeditation" },
      { icon: Wind, labelKey: "affirmationsTipB", color: "#FFB020", screen: "panic", screenLabelKey: "withdrawalCopingScreenBreathing" },
      { icon: Coffee, labelKey: "triggersTip1", color: "#F59E0B", screen: "journal", screenLabelKey: "withdrawalCopingScreenJournal" },
    ],
  },
  {
    titleKey: "withdrawalCopingAnxiety",
    emoji: "😰",
    color: "#FFD166",
    strategies: [
      { icon: Wind, labelKey: "triggersCopingMeditation", color: "#FFD166", screen: "meditation", screenLabelKey: "withdrawalCopingScreenMeditate" },
      { icon: Dumbbell, labelKey: "triggersCopingExercise", color: "#FFC94D", screen: "panic", screenLabelKey: "withdrawalCopingScreenBouger" },
      { icon: Users, labelKey: "triggersCopingCall", color: "#F59E0B", screen: "sos", screenLabelKey: "withdrawalCopingScreenSos" },
    ],
  },
  {
    titleKey: "withdrawalCopingCravings",
    emoji: "🎰",
    color: "#FF3B30",
    strategies: [
      { icon: Zap, labelKey: "panicTitle", color: "#FF3B30", screen: "panic", screenLabelKey: "withdrawalCopingScreenPanic" },
      { icon: Activity, labelKey: "blockerTitle", color: "#F59E0B", screen: "blocker", screenLabelKey: "withdrawalCopingScreenBlocker" },
      { icon: Users, labelKey: "mentorshipTitle", color: "#FFC94D", screen: "mentorship", screenLabelKey: "withdrawalCopingScreenMentor" },
    ],
  },
  {
    titleKey: "withdrawalCopingIrritability",
    emoji: "😤",
    color: "#FBBF24",
    strategies: [
      { icon: Clock, labelKey: "triggersCopingDistraction", color: "#FBBF24", screen: "meditation", screenLabelKey: "withdrawalCopingScreenMeditate" },
      { icon: PenLine, labelKey: "triggersCopingJournal", color: "#FFB020", screen: "journal", screenLabelKey: "withdrawalCopingScreenJournal" },
      { icon: Dumbbell, labelKey: "triggersCopingExercise", color: "#FFC94D", screen: "panic", screenLabelKey: "withdrawalCopingScreenBouger" },
    ],
  },
];

const WARNING_SIGNS = [
  "withdrawalWarningSign1",
  "withdrawalWarningSign2",
  "withdrawalWarningSign3",
  "withdrawalWarningSign4",
];

// Generate typical withdrawal curve over 90 days
function generateWithdrawalCurve() {
  const data: { day: number; intensity: number }[] = [];
  for (let d = 1; d <= 90; d++) {
    let v: number;
    if (d <= 7) {
      // Acute: starts at 9.5, drops to ~6.5
      v = 9.5 - (d - 1) * (3.0 / 6);
    } else if (d <= 30) {
      // Stabilization: 6.5 -> 3.5 with small fluctuations
      v = 6.5 - ((d - 7) / 23) * 3.0;
      v += Math.sin(d * 0.6) * 0.4;
    } else if (d <= 90) {
      // Recovery: 3.5 -> 1.0
      v = 3.5 - ((d - 30) / 60) * 2.5;
      v += Math.sin(d * 0.4) * 0.25;
    } else {
      v = 1.0;
    }
    data.push({
      day: d,
      intensity: Math.max(0.5, Math.min(10, Math.round(v * 10) / 10)),
    });
  }
  return data;
}

const CURVE_DATA = generateWithdrawalCurve();

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 22 },
  },
};

// ---------- Custom tooltip for chart ----------

interface ChartTipEntry {
  payload: { day: number; intensity: number };
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: ChartTipEntry[] }) {
  const t = useT();
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-card-strong rounded-xl px-3 py-2">
      <p className="text-white text-xs font-bold">Jour {d.day}</p>
      <p className="text-white/70 text-[11px]">
        {t("withdrawalIntensity")}: <span className="font-bold text-white">{d.intensity}/10</span>
      </p>
    </div>
  );
}

// ---------- Main component ----------

export function WithdrawalScreen() {
  const t = useT();
  const { navigate, streakDays, withdrawalSymptoms, setWithdrawalSymptoms, addXP } =
    useStore();

  // Local draft state for symptoms being edited (1-5)
  const [draft, setDraft] = useState<Record<string, number>>(() => {
    // Seed with persisted intensities, default to 3 for any present keys
    const seeded: Record<string, number> = {};
    Object.keys(withdrawalSymptoms).forEach((k) => {
      seeded[k] = withdrawalSymptoms[k] || 3;
    });
    return seeded;
  });
  const [openCategory, setOpenCategory] = useState<"physique" | "mental" | null>(
    "physique"
  );
  const [savedToday, setSavedToday] = useState(
    Object.keys(withdrawalSymptoms).length > 0
  );

  // ----- Derived data -----
  const currentPhase = useMemo(() => {
    const d = Math.max(1, streakDays);
    return (
      PHASES.find((p) => d >= p.startDay && d <= p.endDay) || PHASES[PHASES.length - 1]
    );
  }, [streakDays]);

  const todaySymptoms = Object.entries(withdrawalSymptoms);
  const overallIntensity = useMemo(() => {
    if (todaySymptoms.length === 0) return 0;
    const total = todaySymptoms.reduce((sum, [, v]) => sum + (v as number), 0);
    // Average intensity on 1-5 -> scale to 0-100
    return Math.round((total / todaySymptoms.length) * 20);
  }, [withdrawalSymptoms]);

  // Compare to yesterday — simulated based on overallIntensity
  const trend: "improving" | "stable" | "worsening" =
    overallIntensity === 0
      ? "stable"
      : overallIntensity < 30
        ? "improving"
        : overallIntensity < 60
          ? "stable"
          : "worsening";

  // ----- Handlers -----
  const toggleSymptom = (key: string) => {
    setDraft((prev) => {
      const next = { ...prev };
      if (key in next) {
        delete next[key];
      } else {
        next[key] = 3;
      }
      return next;
    });
    sound.playPop();
    haptics.light();
  };

  const setIntensity = (key: string, value: number) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setWithdrawalSymptoms(draft);
    setSavedToday(true);
    sound.playSuccess();
    haptics.success();
    addXP(30, "Suivi symptômes");
    toast.success("Symptômes enregistrés", {
      description: "Tu guéris. Chaque jour t'éloigne du jeu.",
      duration: 3000,
    });
  };

  const handleCoping = (strategy: CopingStrategy) => {
    sound.playClick();
    haptics.light();
    navigate(strategy.screen as never);
  };

  const activeKeys = Object.keys(draft);
  const physicalActive = SYMPTOMS.filter(
    (s) => s.category === "physique" && activeKeys.includes(s.key)
  ).length;
  const mentalActive = SYMPTOMS.filter(
    (s) => s.category === "mental" && activeKeys.includes(s.key)
  ).length;

  const trendInfo = {
    improving: {
      label: "En amélioration",
      icon: TrendingDown,
      color: "#FFC94D",
      msg: "Tes symptômes diminuent. Continue !",
    },
    stable: {
      label: "Stable",
      icon: Minus,
      color: "#FBBF24",
      msg: "C'est normal. Tu guéris.",
    },
    worsening: {
      label: "Plus intense aujourd'hui",
      icon: TrendingUp,
      color: "#FF3B30",
      msg: "C'est normal. Tu guéris.",
    },
  }[trend];

  // For radial gauge: overall intensity 0-100 -> max 100
  const gaugeData = [{ name: "intensity", value: overallIntensity, fill: trendInfo.color }];

  return (
    <div className="min-h-screen px-4 pt-12 pb-10 relative">
      {/* ---------- Header ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-5 px-1"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("dashboard")}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform focus-ring"
            aria-label={t("backToDashboard")}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight leading-tight">
              {t("withdrawalTitle")}
            </h1>
            <p className="text-white/50 text-xs">{t("withdrawalSubtitle")}</p>
          </div>
        </div>
        <div
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
          aria-hidden
        >
          <Activity size={18} className="text-[#FFD166]" />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* ============================================================ */}
        {/* SECTION 1: Educational banner                                */}
        {/* ============================================================ */}
        <motion.section
          variants={itemVariants}
          className="glass-card-strong p-5 relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none bg-[#FFD166]/20" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-3xl pointer-events-none bg-[#FF3B30]/15" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#FFD166]" />
              <h2 className="text-base font-bold text-white font-[family-name:var(--font-poppins)]">
                {t("withdrawalBannerTitle")}
              </h2>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-3">
              {t("withdrawalBannerDesc")}
            </p>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FFC94D]/10 border border-[#FFC94D]/25">
              <CalendarIcon size={14} className="text-[#FFC94D] flex-shrink-0" />
              <p className="text-[#FFC94D] text-xs font-medium">
                {t("withdrawalBannerInfo")}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 2: Symptoms tracker                                  */}
        {/* ============================================================ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white font-[family-name:var(--font-poppins)] flex items-center gap-2">
              <Heart size={16} className="text-[#FF3B30]" />
              {t("withdrawalSymptomsTitle")}
            </h2>
            <span className="text-[10px] text-white/40">
              {t("withdrawalSelectedCount", { n: activeKeys.length })}
            </span>
          </div>

          {/* Two category headers */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {(["physique", "mental"] as const).map((cat) => {
              const isOpen = openCategory === cat;
              const count = cat === "physique" ? physicalActive : mentalActive;
              const label = cat === "physique" ? t("withdrawalPhysical") : t("withdrawalMental");
              const emoji = cat === "physique" ? "💪" : "🧠";
              const color = cat === "physique" ? "#F59E0B" : "#FFD166";
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setOpenCategory(isOpen ? null : cat);
                    sound.playClick();
                    haptics.light();
                  }}
                  className="glass-pill rounded-xl p-3 flex items-center gap-2.5 transition-all"
                  style={isOpen ? { boxShadow: `0 0 0 1.5px ${color}55` } : {}}
                >
                  <span className="text-lg">{emoji}</span>
                  <div className="text-left flex-1">
                    <p className="text-white text-xs font-semibold">{label}</p>
                    {count > 0 ? (
                      <p className="text-[10px]" style={{ color }}>
                        {t("withdrawalActiveCount", { n: count })}
                      </p>
                    ) : (
                      <p className="text-white/40 text-[10px]">{t("withdrawalNone")}</p>
                    )}
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Symptom list for active category */}
          <AnimatePresence mode="wait">
            {openCategory && (
              <motion.div
                key={openCategory}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="space-y-2.5 pt-1">
                  {SYMPTOMS.filter((s) => s.category === openCategory).map((s) => {
                    const checked = s.key in draft;
                    const intensity = draft[s.key] ?? 3;
                    return (
                      <div
                        key={s.key}
                        className={`rounded-xl p-3 transition-colors ${
                          checked ? "glass-pill" : "bg-white/[0.03]"
                        }`}
                      >
                        <button
                          onClick={() => toggleSymptom(s.key)}
                          className="w-full flex items-center gap-2.5 text-left"
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all ${
                              checked
                                ? "bg-[#FFD166] border-[#FFD166]"
                                : "border-white/25"
                            }`}
                          >
                            {checked && <Check size={12} className="text-white" />}
                          </div>
                          <span className="text-base">{s.emoji}</span>
                          <span
                            className={`text-sm flex-1 ${
                              checked ? "text-white" : "text-white/70"
                            }`}
                          >
                            {t(s.nameKey)}
                          </span>
                        </button>
                        <AnimatePresence>
                          {checked && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 mt-2 border-t border-white/8">
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-white/50 text-[11px]">
                                    {t("withdrawalIntensity")}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((lvl) => (
                                      <span
                                        key={lvl}
                                        className={`w-1.5 h-1.5 rounded-full ${
                                          lvl <= intensity
                                            ? "bg-[#FFD166]"
                                            : "bg-white/15"
                                        }`}
                                      />
                                    ))}
                                    <span className="text-white text-xs font-bold ml-1.5">
                                      {intensity}/5
                                    </span>
                                  </div>
                                </div>
                                <Slider
                                  min={1}
                                  max={5}
                                  step={1}
                                  value={[intensity]}
                                  onValueChange={(v) => setIntensity(s.key, v[0])}
                                  className="[&_[data-slot=slider-range]]:bg-[#FFD166] [&_[data-slot=slider-thumb]]:border-[#FFD166]"
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={activeKeys.length === 0}
            className={`w-full h-11 mt-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              activeKeys.length > 0
                ? "gradient-primary text-white glow-green"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
          >
            <Check size={16} />
            {t("withdrawalSaveBtn")}
          </motion.button>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 3: Timeline                                          */}
        {/* ============================================================ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <CalendarIcon size={16} className="text-[#F59E0B]" />
            <h2 className="text-sm font-bold text-white font-[family-name:var(--font-poppins)]">
              {t("withdrawalTimelineTitle")}
            </h2>
          </div>

          {/* Progress bar showing current position */}
          <div className="relative h-2 rounded-full bg-white/8 overflow-hidden mb-4">
            <div
              className="absolute inset-y-0 left-0"
              style={{
                width: `${Math.min(100, (streakDays / 90) * 100)}%`,
                background: `linear-gradient(90deg, #FF3B30 0%, #F59E0B 35%, #FBBF24 65%, #FFC94D 100%)`,
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#0B0704]"
              style={{
                left: `calc(${Math.min(100, (streakDays / 90) * 100)}% - 6px)`,
                boxShadow: `0 0 12px ${currentPhase.color}`,
              }}
            />
          </div>

          <div className="space-y-2.5">
            {PHASES.map((phase) => {
              const isCurrent = phase.id === currentPhase.id;
              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`relative rounded-xl p-3.5 transition-all ${
                    isCurrent
                      ? "glass-pill"
                      : "bg-white/[0.03] opacity-70"
                  }`}
                  style={
                    isCurrent
                      ? { boxShadow: `0 0 0 1.5px ${phase.color}55` }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${phase.color}22` }}
                    >
                      <span className="text-sm font-bold" style={{ color: phase.color }}>
                        {phase.startDay > 90 ? "90+" : phase.startDay}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white text-sm font-semibold truncate">
                          {t(phase.titleKey)}
                        </p>
                        {isCurrent && (
                          <span
                            className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                            style={{ background: `${phase.color}25`, color: phase.color }}
                          >
                            {t("withdrawalYouAreHere")}
                          </span>
                        )}
                      </div>
                      <p className="text-white/40 text-[10px] mb-1">{t(phase.rangeKey)}</p>
                      <p className="text-white/70 text-xs">{t(phase.descriptionKey)}</p>
                      <p className="text-white/50 text-[11px] mt-1">
                        <span className="text-white/40">{t("withdrawalSymptomsLabel")}</span>{" "}
                        {t(phase.symptomsKey)}
                      </p>
                      <p
                        className="text-[11px] mt-1.5 italic"
                        style={{ color: phase.color }}
                      >
                        {t(phase.tipKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 4: Recharts LineChart                                */}
        {/* ============================================================ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={16} className="text-[#FFD166]" />
            <h2 className="text-sm font-bold text-white font-[family-name:var(--font-poppins)]">
              {t("withdrawalCurveTitle")}
            </h2>
          </div>
          <p className="text-white/50 text-xs mb-3">
            {t("withdrawalCurrentDay")}{" "}
            <span className="text-white font-bold">J{Math.max(1, streakDays)}</span>
          </p>

          <div className="w-full" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={CURVE_DATA}
                margin={{ top: 8, right: 8, left: -22, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF3B30" />
                    <stop offset="40%" stopColor="#F59E0B" />
                    <stop offset="70%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#FFC94D" />
                  </linearGradient>
                </defs>
                {/* Zones */}
                <ReferenceArea
                  x1={1}
                  x2={7}
                  fill="#FF3B30"
                  fillOpacity={0.08}
                  stroke="none"
                />
                <ReferenceArea
                  x1={7}
                  x2={30}
                  fill="#F59E0B"
                  fillOpacity={0.08}
                  stroke="none"
                />
                <ReferenceArea
                  x1={30}
                  x2={90}
                  fill="#FFC94D"
                  fillOpacity={0.08}
                  stroke="none"
                />

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                  tickLine={false}
                  interval={9}
                  label={{
                    value: t("dayLabel"),
                    position: "insideBottom",
                    fill: "rgba(255,255,255,0.4)",
                    fontSize: 9,
                    offset: -2,
                  }}
                />
                <YAxis
                  domain={[0, 10]}
                  ticks={[0, 5, 10]}
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ stroke: "rgba(255,255,255,0.25)", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="intensity"
                  stroke="url(#lineStroke)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "#F59E0B",
                    stroke: "#0B0704",
                    strokeWidth: 2,
                  }}
                />
                {streakDays >= 1 && streakDays <= 90 && (
                  <ReferenceLine
                    x={streakDays}
                    stroke="#FFD166"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    label={{
                      value: t("today"),
                      fill: "#FFD166",
                      fontSize: 9,
                      position: "top",
                    }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between gap-2 mt-2 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF3B30]/30" />
              <span className="text-white/50">1-7j ({t("withdrawalPhaseAcuteTitle").toLowerCase()})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]/30" />
              <span className="text-white/50">8-30j</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FFC94D]/30" />
              <span className="text-white/50">30-90j</span>
            </div>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 5: Coping strategies                                 */}
        {/* ============================================================ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wind size={16} className="text-[#FFB020]" />
            <h2 className="text-sm font-bold text-white font-[family-name:var(--font-poppins)]">
              {t("withdrawalCopingTitle")}
            </h2>
          </div>

          <div className="space-y-4">
            {COPING.map((cat) => (
              <div key={cat.titleKey}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{cat.emoji}</span>
                  <h3
                    className="text-xs font-bold"
                    style={{ color: cat.color }}
                  >
                    {t(cat.titleKey)}
                  </h3>
                </div>
                <div className="space-y-2">
                  {cat.strategies.map((strat, idx) => {
                    const Icon = strat.icon;
                    return (
                      <div
                        key={cat.titleKey + "-" + idx}
                        className="glass-pill rounded-xl p-3 flex items-center gap-3"
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${strat.color}22` }}
                        >
                          <Icon size={16} style={{ color: strat.color }} />
                        </div>
                        <p className="text-white/85 text-xs flex-1 leading-snug">
                          {t(strat.labelKey)}
                        </p>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCoping(strat)}
                          className="px-3 py-1.5 rounded-lg text-[10px] font-bold flex-shrink-0"
                          style={{ background: `${strat.color}22`, color: strat.color }}
                        >
                          {t("withdrawalDoNow")}
                        </motion.button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 6: Today's symptoms summary                          */}
        {/* ============================================================ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={16} className="text-[#FFC94D]" />
            <h2 className="text-sm font-bold text-white font-[family-name:var(--font-poppins)]">
              {t("withdrawalTodaySummaryTitle")}
            </h2>
          </div>

          {todaySymptoms.length === 0 ? (
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                <Info size={20} className="text-white/40" />
              </div>
              <p className="text-white/60 text-sm">
                {t("withdrawalTodayNone")}
              </p>
              <p className="text-white/40 text-xs mt-1">
                {t("withdrawalTodayNoneHint")}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Gauge */}
              <div className="relative w-28 h-28 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    data={gaugeData}
                    innerRadius="72%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      angleAxisId={0}
                      tick={false}
                    />
                    <RadialBar
                      dataKey="value"
                      cornerRadius={10}
                      background={{ fill: "rgba(255,255,255,0.06)" }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-white font-[family-name:var(--font-poppins)] leading-none">
                    {overallIntensity}
                  </span>
                  <span className="text-white/40 text-[10px] mt-0.5">/100</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2"
                  style={{ background: `${trendInfo.color}20` }}
                >
                  <trendInfo.icon size={12} style={{ color: trendInfo.color }} />
                  <span
                    className="text-[11px] font-bold"
                    style={{ color: trendInfo.color }}
                  >
                    {trendInfo.label}
                  </span>
                </div>
                <p className="text-white text-sm font-semibold mb-1">
                  {t("withdrawalTodayCount", { n: todaySymptoms.length })}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {todaySymptoms.slice(0, 4).map(([key, val]) => {
                    const sym = SYMPTOMS.find((s) => s.key === key);
                    if (!sym) return null;
                    return (
                      <span
                        key={key}
                        className="px-2 py-0.5 rounded-full text-[10px] glass-pill text-white/80 flex items-center gap-1"
                      >
                        <span>{sym.emoji}</span>
                        <span>{t(sym.nameKey)}</span>
                        <span className="text-white/40">·{val as number}/5</span>
                      </span>
                    );
                  })}
                  {todaySymptoms.length > 4 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] text-white/40">
                      +{todaySymptoms.length - 4}
                    </span>
                  )}
                </div>
                <p className="text-[#FFC94D] text-xs font-medium italic">
                  {trendInfo.msg}
                </p>
                {savedToday && (
                  <p className="text-white/30 text-[10px] mt-1.5">
                    {t("withdrawalSavedToday")}
                  </p>
                )}
              </div>
            </div>
          )}
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 7: When to seek help                                 */}
        {/* ============================================================ */}
        <motion.section
          variants={itemVariants}
          className="glass-card p-5 relative overflow-hidden border border-[#FF3B30]/20"
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none bg-[#FF3B30]/15" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={18} className="text-[#FF3B30]" />
              <h2 className="text-base font-bold text-white font-[family-name:var(--font-poppins)]">
                {t("withdrawalWarningTitle")}
              </h2>
            </div>
            <p className="text-white/60 text-xs mb-3">
              {t("withdrawalWarningDesc")}
            </p>
            <div className="space-y-2 mb-4">
              {WARNING_SIGNS.map((signKey) => (
                <div key={signKey} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FF3B30]/20 text-[#FF3B30] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    !
                  </span>
                  <span className="text-white/80 text-sm">{t(signKey)}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  sound.playClick();
                  haptics.medium();
                  navigate("community");
                }}
                className="h-11 rounded-xl bg-[#FFD166] text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Users size={14} />
                {t("withdrawalWarningContact")}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  sound.playClick();
                  haptics.medium();
                  navigate("sos");
                }}
                className="h-11 rounded-xl bg-[#FF3B30] text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone size={14} />
                {t("withdrawalWarningSos")}
              </motion.button>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
