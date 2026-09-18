"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Target,
  Plus,
  X,
  Trash2,
  Calendar,
  Sparkles,
  Check,
  Pencil,
  HeartPulse,
  Wallet,
  Heart,
  Briefcase,
  Sunrise,
  Lock,
  Quote,
  type LucideIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useStore, type LifeGoal, type LifeGoalCategory } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { formatCurrency } from "@/lib/data/currency-data";
import { EmptyState } from "@/components/zerobet/components/EmptyState";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { toast } from "sonner";

/* ========================================================================
   Constants & helpers
   ======================================================================== */

const CATEGORY_META: Record<
  LifeGoalCategory,
  { labelKey: string; icon: LucideIcon; color: string; gradient: string }
> = {
  health: {
    labelKey: "goalCategoryHealth",
    icon: HeartPulse,
    color: "#4ADE80",
    gradient: "from-emerald-500/20 to-emerald-700/10",
  },
  finance: {
    labelKey: "goalCategoryFinance",
    icon: Wallet,
    color: "#FF9500",
    gradient: "from-orange-500/20 to-orange-700/10",
  },
  relationship: {
    labelKey: "goalCategoryRelationship",
    icon: Heart,
    color: "#FF2D55",
    gradient: "from-pink-500/20 to-pink-700/10",
  },
  career: {
    labelKey: "goalCategoryCareer",
    icon: Briefcase,
    color: "#64D2FF",
    gradient: "from-cyan-500/20 to-cyan-700/10",
  },
  personal: {
    labelKey: "goalCategoryPersonal",
    icon: Sparkles,
    color: "#BF5AF2",
    gradient: "from-purple-500/20 to-purple-700/10",
  },
  spiritual: {
    labelKey: "goalCategorySpiritual",
    icon: Sunrise,
    color: "#FBBF24",
    gradient: "from-amber-500/20 to-amber-700/10",
  },
};

const CATEGORY_ORDER: LifeGoalCategory[] = [
  "health",
  "finance",
  "relationship",
  "career",
  "personal",
  "spiritual",
];

interface AiSuggestion {
  titleKey: string;
  titleParams?: Record<string, string | number>;
  descriptionKey: string;
  category: LifeGoalCategory;
  targetDaysFromNow: number;
  milestoneKeys: string[];
  /** Optional per-milestone params (for currency-aware amounts). */
  milestoneParams?: Record<string, string | number>[];
}

// FCFA amounts used in suggestion 1 — converted to user currency at render time.
const SUGGESTION1_TARGET_FCFA = 500_000;
const SUGGESTION1_MS2_FCFA = 50_000;
const SUGGESTION1_MS3_FCFA = 200_000;

const AI_SUGGESTIONS: AiSuggestion[] = [
  {
    titleKey: "goalsSuggestion1Title",
    descriptionKey: "goalsSuggestion1Desc",
    category: "finance",
    targetDaysFromNow: 180,
    milestoneKeys: [
      "goalsSuggestion1Milestone1",
      "goalsSuggestion1Milestone2",
      "goalsSuggestion1Milestone3",
      "goalsSuggestion1Milestone4",
    ],
    // milestoneParams are injected at render time via formatCurrency.
  },
  {
    titleKey: "goalsSuggestion2Title",
    descriptionKey: "goalsSuggestion2Desc",
    category: "health",
    targetDaysFromNow: 90,
    milestoneKeys: [
      "goalsSuggestion2Milestone1",
      "goalsSuggestion2Milestone2",
      "goalsSuggestion2Milestone3",
      "goalsSuggestion2Milestone4",
    ],
  },
  {
    titleKey: "goalsSuggestion3Title",
    descriptionKey: "goalsSuggestion3Desc",
    category: "relationship",
    targetDaysFromNow: 30,
    milestoneKeys: [
      "goalsSuggestion3Milestone1",
      "goalsSuggestion3Milestone2",
      "goalsSuggestion3Milestone3",
      "goalsSuggestion3Milestone4",
    ],
  },
];

interface DaysRemaining {
  text: string;
  urgent: boolean;
  past: boolean;
}

function formatDaysRemaining(
  targetDate: string,
  t: (key: string, params?: Record<string, string | number>) => string
): DaysRemaining {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(targetDate + "T00:00:00");
  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return { text: `J${diffDays}`, urgent: false, past: true };
  if (diffDays === 0) return { text: t("goalsDetailToday"), urgent: true, past: false };
  if (diffDays === 1) return { text: t("goalsDetailTomorrow"), urgent: true, past: false };
  return { text: `J-${diffDays}`, urgent: diffDays <= 7, past: false };
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function isoPlusDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

/* ========================================================================
   AnimatedNumber — counts up to value with ease-out
   ======================================================================== */

function AnimatedNumber({
  value,
  duration = 800,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const from = 0;
    const to = value;
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return <span className={className}>{display}</span>;
}

/* ========================================================================
   ProgressRing — SVG circular progress
   ======================================================================== */

function ProgressRing({
  progress,
  size = 120,
  stroke = 10,
  color = "#FF9500",
  children,
}: {
  progress: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: React.ReactNode;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, progress));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/* ========================================================================
   CategoryChip — small icon-only category badge
   ======================================================================== */

function CategoryChip({
  category,
  size = 36,
}: {
  category: LifeGoalCategory;
  size?: number;
}) {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: `${meta.color}22`,
        border: `1px solid ${meta.color}55`,
      }}
    >
      <Icon size={size * 0.5} style={{ color: meta.color }} strokeWidth={2} />
    </div>
  );
}

/* ========================================================================
   Main screen
   ======================================================================== */

export function GoalsScreen() {
  const t = useT();
  const {
    lifeGoals,
    addLifeGoal,
    updateLifeGoal,
    deleteLifeGoal,
    toggleMilestone,
    navigate,
    plan,
    currency,
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<LifeGoalCategory | "all">(
    "all"
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailGoalId, setDetailGoalId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Add form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<LifeGoalCategory | null>(null);
  const [targetDate, setTargetDate] = useState("");
  const [milestones, setMilestones] = useState<string[]>([]);
  const [milestoneInput, setMilestoneInput] = useState("");

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editMilestones, setEditMilestones] = useState<string[]>([]);
  const [editMilestoneInput, setEditMilestoneInput] = useState("");

  const isPremium = plan !== "free";

  const filteredGoals = useMemo(
    () =>
      activeCategory === "all"
        ? lifeGoals
        : lifeGoals.filter((g) => g.category === activeCategory),
    [lifeGoals, activeCategory]
  );

  const stats = useMemo(() => {
    const total = lifeGoals.length;
    const completed = lifeGoals.filter((g) => g.progress === 100).length;
    const inProgress = total - completed;
    const avg =
      total > 0
        ? Math.round(
            lifeGoals.reduce((s, g) => s + g.progress, 0) / total
          )
        : 0;
    return { total, completed, inProgress, avg };
  }, [lifeGoals]);

  const detailGoal: LifeGoal | null = detailGoalId
    ? lifeGoals.find((g) => g.id === detailGoalId) ?? null
    : null;

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory(null);
    setTargetDate("");
    setMilestones([]);
    setMilestoneInput("");
  };

  const isFormValid =
    title.trim().length >= 3 &&
    category !== null &&
    targetDate !== "" &&
    new Date(targetDate + "T00:00:00") > new Date() &&
    milestones.length >= 1;

  const handleAddMilestone = () => {
    const v = milestoneInput.trim();
    if (!v) return;
    setMilestones((arr) => [...arr, v]);
    setMilestoneInput("");
    sound.playPop();
    haptics.light();
  };

  const handleRemoveMilestone = (idx: number) => {
    setMilestones((arr) => arr.filter((_, i) => i !== idx));
    sound.playClick();
    haptics.light();
  };

  const handleCreate = () => {
    if (!isFormValid || category === null) {
      sound.playError();
      haptics.warning();
      return;
    }
    addLifeGoal({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      targetDate,
      milestones: milestones.map((m) => m.trim()).filter(Boolean),
    });
    sound.playSuccess();
    haptics.success();
    toast.success(t("goalsToastCreated"));
    resetForm();
    setShowAddModal(false);
  };

  const handleSuggestionUse = (s: AiSuggestion) => {
    // Compute currency-aware strings for suggestion 1 (only one with FCFA amounts).
    const isS1 = s.titleKey === "goalsSuggestion1Title";
    const targetAmount = isS1
      ? formatCurrency(SUGGESTION1_TARGET_FCFA, currency)
      : "";
    const ms2Amount = isS1
      ? formatCurrency(SUGGESTION1_MS2_FCFA, currency)
      : "";
    const ms3Amount = isS1
      ? formatCurrency(SUGGESTION1_MS3_FCFA, currency)
      : "";
    const ms4Amount = isS1
      ? formatCurrency(SUGGESTION1_TARGET_FCFA, currency)
      : "";

    setTitle(
      isS1
        ? t(s.titleKey, { amount: targetAmount })
        : t(s.titleKey)
    );
    setDescription(t(s.descriptionKey));
    setCategory(s.category);
    setTargetDate(isoPlusDays(s.targetDaysFromNow));
    setMilestones(
      s.milestoneKeys.map((k, i) => {
        if (isS1) {
          if (i === 1) return t(k, { amount: ms2Amount });
          if (i === 2) return t(k, { amount: ms3Amount });
          if (i === 3) return t(k, { amount: ms4Amount });
        }
        return t(k);
      })
    );
    setShowAddModal(true);
    sound.playWhoosh();
    haptics.medium();
  };

  const handleToggleMilestone = (
    goalId: string,
    milestoneId: string
  ) => {
    const goal = lifeGoals.find((g) => g.id === goalId);
    if (!goal) return;
    const ms = goal.milestones.find((m) => m.id === milestoneId);
    if (!ms) return;
    const willComplete = !ms.completed;
    const completedAfter = willComplete
      ? goal.milestones.filter((m) => m.completed).length + 1
      : goal.milestones.filter((m) => m.completed).length - 1;
    const willReach100 =
      goal.milestones.length > 0 &&
      completedAfter === goal.milestones.length &&
      goal.progress < 100;

    toggleMilestone(goalId, milestoneId);
    if (willReach100) {
      sound.playAchievement();
      haptics.success();
      toast.success(t("goalsToastCompleted"));
    } else {
      sound.playClick();
      haptics.light();
    }
  };

  const handleDelete = (id: string, goalTitle: string) => {
    deleteLifeGoal(id);
    sound.playError();
    haptics.warning();
    toast.success(t("goalsToastDeleted", { title: goalTitle }));
    if (detailGoalId === id) {
      setDetailGoalId(null);
      setEditMode(false);
    }
  };

  // ---- Edit mode handlers ----
  const enterEditMode = () => {
    if (!detailGoal) return;
    setEditTitle(detailGoal.title);
    setEditDescription(detailGoal.description ?? "");
    setEditDate(detailGoal.targetDate);
    setEditMilestones(detailGoal.milestones.map((m) => m.title));
    setEditMode(true);
    sound.playWhoosh();
    haptics.medium();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    sound.playClick();
    haptics.light();
  };

  const handleEditAddMilestone = () => {
    const v = editMilestoneInput.trim();
    if (!v) return;
    setEditMilestones((arr) => [...arr, v]);
    setEditMilestoneInput("");
    sound.playPop();
    haptics.light();
  };

  const handleEditRemoveMilestone = (idx: number) => {
    setEditMilestones((arr) => arr.filter((_, i) => i !== idx));
    sound.playClick();
    haptics.light();
  };

  const handleSaveEdit = () => {
    if (!detailGoal) return;
    if (editTitle.trim().length < 3) {
      toast.error(t("goalsErrTitleMin"));
      sound.playError();
      haptics.warning();
      return;
    }
    if (editMilestones.length < 1) {
      toast.error(t("goalsErrMilestone"));
      sound.playError();
      haptics.warning();
      return;
    }
    // Build new milestones preserving existing completed state where the title matches
    const oldByTitle = new Map(
      detailGoal.milestones.map((m) => [m.title, m])
    );
    const newMilestones = editMilestones.map((t, i) => {
      const existing = oldByTitle.get(t);
      return {
        id: existing?.id ?? `ms-${Date.now()}-${i}`,
        title: t,
        completed: existing?.completed ?? false,
      };
    });
    updateLifeGoal(detailGoal.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      targetDate: editDate,
      milestones: newMilestones,
    });
    sound.playSuccess();
    haptics.success();
    toast.success(t("goalsToastUpdated"));
    setEditMode(false);
  };

  // ---- Count per category for filter badges ----
  const countByCategory = (cat: LifeGoalCategory | "all") =>
    cat === "all"
      ? lifeGoals.length
      : lifeGoals.filter((g) => g.category === cat).length;

  return (
    <div className="min-h-screen px-5 pt-12 pb-8">
      {/* ---------- Header ---------- */}
      <div className="flex items-center gap-3 mb-6 sticky top-0 z-30 -mx-5 px-5 py-2 backdrop-blur-md bg-[#070B0E]/60">
        <button
          onClick={() => {
            sound.playClick();
            haptics.light();
            navigate("dashboard");
          }}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center btn-press"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)] flex items-center gap-2">
            <Target size={20} className="text-[#FF9500]" />
            {t("goalsTitle")}
          </h1>
          <p className="text-white/50 text-xs">
            {t("goalsSubtitle")}
          </p>
        </div>
      </div>

      {/* ---------- Hero progress card ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="glass-card-strong p-5 mb-5 animate-glow-pulse relative overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, #FF9500 0%, transparent 70%)",
          }}
        />
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-[#FF9500]" />
          <h2 className="text-white font-bold font-[family-name:var(--font-poppins)] text-sm tracking-wide">
            {t("goalsTransformation")}
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <ProgressRing progress={stats.avg} size={120} stroke={10} color="#FF9500">
            <span className="text-2xl font-extrabold text-white font-[family-name:var(--font-poppins)]">
              {stats.avg}
              <span className="text-sm text-white/60">%</span>
            </span>
            <span className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
              {t("goalsCompleted")}
            </span>
          </ProgressRing>

          <div className="grid grid-cols-3 gap-3 w-full mt-5">
            <div className="text-center">
              <div className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
                <AnimatedNumber value={stats.total} />
              </div>
              <div className="text-[10px] text-white/50 uppercase tracking-wide">
                {t("goalsTotal")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#FF9500] font-[family-name:var(--font-poppins)]">
                <AnimatedNumber value={stats.inProgress} />
              </div>
              <div className="text-[10px] text-white/50 uppercase tracking-wide">
                {t("goalsInProgress")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#4ADE80] font-[family-name:var(--font-poppins)]">
                <AnimatedNumber value={stats.completed} />
              </div>
              <div className="text-[10px] text-white/50 uppercase tracking-wide">
                {t("goalsCompletedLabel")}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ---------- Category filter ---------- */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 -mx-5 px-5 pb-1">
        <FilterPill
          label={t("goalsAll")}
          icon={Target}
          active={activeCategory === "all"}
          count={countByCategory("all")}
          onClick={() => {
            setActiveCategory("all");
            sound.playClick();
            haptics.light();
          }}
          color="#FF9500"
        />
        {CATEGORY_ORDER.map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <FilterPill
              key={cat}
              label={t(meta.labelKey)}
              icon={meta.icon}
              active={activeCategory === cat}
              count={countByCategory(cat)}
              onClick={() => {
                setActiveCategory(cat);
                sound.playClick();
                haptics.light();
              }}
              color={meta.color}
            />
          );
        })}
      </div>

      {/* ---------- New goal CTA ---------- */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          resetForm();
          setShowAddModal(true);
          sound.playClick();
          haptics.medium();
        }}
        className="w-full mb-5 py-3.5 rounded-2xl gradient-primary text-white font-semibold text-sm flex items-center justify-center gap-2 glow-red btn-press"
      >
        <Plus size={18} /> {t("goalsNewLifeGoal")}
      </motion.button>

      {/* ---------- Goals list ---------- */}
      {filteredGoals.length === 0 ? (
        <div className="glass-card p-4 mb-5">
          <EmptyState
            variant="default"
            title={t("goalsEmpty")}
            description={t("goalsEmptyDesc")}
            ctaLabel={t("goalsCreate")}
            onCta={() => {
              resetForm();
              setShowAddModal(true);
              sound.playClick();
              haptics.medium();
            }}
            compact
          />
        </div>
      ) : (
        <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto custom-scroll pr-1">
          <AnimatePresence initial={false}>
            {filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onToggle={(msId) => handleToggleMilestone(goal.id, msId)}
                onOpen={() => {
                  setDetailGoalId(goal.id);
                  setEditMode(false);
                  sound.playWhoosh();
                  haptics.medium();
                }}
                onDelete={() => handleDelete(goal.id, goal.title)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ---------- AI suggested goals (premium-gated) ---------- */}
      <div className="relative mb-5">
        <div className="glass-card-strong p-5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-[#BF5AF2]" />
            <h3 className="text-white font-bold font-[family-name:var(--font-poppins)] text-sm">
              {t("goalsSuggested")}
            </h3>
          </div>
          <p className="text-white/50 text-xs mb-4">
            {t("goalsSuggestedDesc")}
          </p>

          {!isPremium ? (
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-sm bg-[#070B0E]/60 flex flex-col items-center justify-center gap-3 z-10">
                <div className="w-12 h-12 rounded-full bg-[#FF9500]/15 flex items-center justify-center">
                  <Lock size={20} className="text-[#FF9500]" />
                </div>
                <p className="text-white/70 text-xs text-center max-w-[220px]">
                  {t("goalsPremiumLocked")}
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    haptics.medium();
                    navigate("paywall");
                  }}
                  className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold glow-red btn-press"
                >
                  {t("goalsPremiumCta")}
                </button>
              </div>
              <div className="flex flex-col gap-2 opacity-50 select-none" aria-hidden>
                {AI_SUGGESTIONS.map((s) => {
                  const isS1 = s.titleKey === "goalsSuggestion1Title";
                  const titleDisplay = isS1
                    ? t(s.titleKey, { amount: formatCurrency(SUGGESTION1_TARGET_FCFA, currency) })
                    : t(s.titleKey);
                  return (
                    <div
                      key={s.titleKey}
                      className="rounded-xl border border-white/10 bg-white/5 p-3"
                    >
                      <div className="text-white/80 text-sm font-medium">
                        {titleDisplay}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {AI_SUGGESTIONS.map((s) => {
                const meta = CATEGORY_META[s.category];
                const Icon = meta.icon;
                const isS1 = s.titleKey === "goalsSuggestion1Title";
                const titleDisplay = isS1
                  ? t(s.titleKey, { amount: formatCurrency(SUGGESTION1_TARGET_FCFA, currency) })
                  : t(s.titleKey);
                return (
                  <motion.button
                    key={s.titleKey}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestionUse(s)}
                    className="w-full text-left rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors flex items-center gap-3"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: `${meta.color}22`,
                        border: `1px solid ${meta.color}55`,
                      }}
                    >
                      <Icon size={16} style={{ color: meta.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium line-clamp-1">
                        {titleDisplay}
                      </div>
                      <div className="text-white/40 text-xs line-clamp-1">
                        {t(s.descriptionKey)}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-md bg-[#FF9500]/15 text-[#FF9500] font-semibold shrink-0">
                      {t("goalsUse")}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ---------- Footer motivation ---------- */}
      <div className="glass-card p-4 mb-2">
        <div className="flex items-start gap-3">
          <Quote size={20} className="text-[#FF9500] shrink-0 mt-0.5" />
          <p className="text-white/70 text-sm italic leading-relaxed">
            {t("goalsFooterQuote")}
          </p>
        </div>
      </div>

      {/* ========================================================================
          Add Goal Bottom-Sheet Modal
          ======================================================================== */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowAddModal(false);
              sound.playClick();
            }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 safe-bottom"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-5 w-full max-w-md max-h-[88vh] overflow-y-auto custom-scroll"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold font-[family-name:var(--font-poppins)] text-lg">
                  {t("goalsModalTitle")}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    sound.playClick();
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                  aria-label={t("close")}
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="text-white/60 text-xs mb-1 block">
                    {t("goalsFieldTitle")} <span className="text-[#FF3B30]">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t("goalsTitlePlaceholder2")}
                    maxLength={60}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500]"
                  />
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-white/60 text-xs">
                      {t("goalsFieldDescription")}
                    </label>
                    <span className="text-white/30 text-[10px]">
                      {description.length}/280
                    </span>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value.slice(0, 280))
                    }
                    placeholder={t("goalsDescPlaceholder")}
                    rows={3}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500] resize-none"
                  />
                </div>

                {/* Category selector */}
                <div>
                  <label className="text-white/60 text-xs mb-2 block">
                    {t("goalsFieldCategory")} <span className="text-[#FF3B30]">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORY_ORDER.map((cat) => {
                      const meta = CATEGORY_META[cat];
                      const Icon = meta.icon;
                      const selected = category === cat;
                      return (
                        <motion.button
                          key={cat}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setCategory(cat);
                            sound.playPop();
                            haptics.selection();
                          }}
                          className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            selected
                              ? "border-white/40 bg-white/10"
                              : "border-white/10 bg-white/5"
                          }`}
                          style={
                            selected
                              ? {
                                  borderColor: meta.color,
                                  background: `${meta.color}22`,
                                }
                              : undefined
                          }
                        >
                          <Icon
                            size={18}
                            style={{ color: meta.color }}
                            strokeWidth={2}
                          />
                          <span className="text-white/80 text-[11px] font-medium">
                            {t(meta.labelKey)}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Target date */}
                <div>
                  <label className="text-white/60 text-xs mb-1 block">
                    {t("goalsFieldTargetDate")} <span className="text-[#FF3B30]">*</span>
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    min={todayISO()}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500] [color-scheme:dark]"
                  />
                </div>

                {/* Milestones */}
                <div>
                  <label className="text-white/60 text-xs mb-2 block">
                    {t("goalsFieldMilestones")} <span className="text-[#FF3B30]">*</span>
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={milestoneInput}
                      onChange={(e) => setMilestoneInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddMilestone();
                        }
                      }}
                      placeholder={t("goalsMilestonePlaceholder")}
                      maxLength={50}
                      className="flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500]"
                    />
                    <button
                      onClick={handleAddMilestone}
                      disabled={!milestoneInput.trim()}
                      className="px-3 rounded-xl bg-[#FF9500]/20 border border-[#FF9500]/40 text-[#FF9500] text-xs font-semibold disabled:opacity-40 btn-press"
                    >
                      {t("goalsMilestoneAdd")}
                    </button>
                  </div>
                  {milestones.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {milestones.map((m, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs flex items-center gap-1.5"
                        >
                          {m}
                          <button
                            onClick={() => handleRemoveMilestone(i)}
                            className="text-white/40 hover:text-[#FF3B30]"
                            aria-label={`${t("delete")} ${m}`}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {milestones.length === 0 && (
                    <p className="text-white/40 text-[11px]">
                      {t("goalsMilestoneEmpty")}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  onClick={handleCreate}
                  disabled={!isFormValid}
                  className="w-full py-3 rounded-xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed btn-press"
                >
                  <Plus size={16} /> {t("goalsCreateButton")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================
          Goal Detail Modal
          ======================================================================== */}
      <AnimatePresence>
        {detailGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setDetailGoalId(null);
              setEditMode(false);
              sound.playClick();
            }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 safe-bottom"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-5 w-full max-w-md max-h-[88vh] overflow-y-auto custom-scroll"
            >
              {!editMode ? (
                <>
                  {/* View mode */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <CategoryChip category={detailGoal.category} size={42} />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold font-[family-name:var(--font-poppins)] text-lg leading-tight line-clamp-2">
                          {detailGoal.title}
                        </h3>
                        {detailGoal.description && (
                          <p className="text-white/50 text-xs italic mt-0.5 line-clamp-2">
                            {detailGoal.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setDetailGoalId(null);
                        setEditMode(false);
                        sound.playClick();
                      }}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"
                      aria-label={t("close")}
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>

                  {/* Big progress ring + countdown */}
                  <div className="flex flex-col items-center my-4">
                    <ProgressRing
                      progress={detailGoal.progress}
                      size={180}
                      stroke={14}
                      color={CATEGORY_META[detailGoal.category].color}
                    >
                      <span className="text-4xl font-extrabold text-white font-[family-name:var(--font-poppins)]">
                        {detailGoal.progress}
                        <span className="text-lg text-white/60">%</span>
                      </span>
                      <span className="text-[10px] text-white/50 uppercase tracking-wider mt-1">
                        {detailGoal.milestones.filter((m) => m.completed).length}/
                        {detailGoal.milestones.length} {t("goalsDetailSteps")}
                      </span>
                    </ProgressRing>

                    {(() => {
                      const dr = formatDaysRemaining(detailGoal.targetDate, t);
                      return (
                        <div
                          className="mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                          style={{
                            background: dr.past
                              ? "rgba(255,59,48,0.15)"
                              : dr.urgent
                              ? "rgba(255,149,0,0.15)"
                              : "rgba(255,255,255,0.05)",
                            color: dr.past
                              ? "#FF3B30"
                              : dr.urgent
                              ? "#FF9500"
                              : "rgba(255,255,255,0.7)",
                            border: `1px solid ${
                              dr.past
                                ? "rgba(255,59,48,0.3)"
                                : dr.urgent
                                ? "rgba(255,149,0,0.3)"
                                : "rgba(255,255,255,0.1)"
                            }`,
                          }}
                        >
                          <Calendar size={12} />
                          {dr.past ? t("goalsDetailPast") : dr.text}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Milestones checklist */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                      {t("goalsFieldMilestones")}
                    </div>
                    {detailGoal.milestones.map((m) => (
                      <button
                        key={m.id}
                        onClick={() =>
                          handleToggleMilestone(detailGoal.id, m.id)
                        }
                        className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <motion.div
                          whileTap={{ scale: 0.85 }}
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                            m.completed
                              ? "bg-[#4ADE80] border-[#4ADE80]"
                              : "bg-transparent border border-white/30"
                          }`}
                        >
                          {m.completed && (
                            <Check size={14} className="text-white" strokeWidth={3} />
                          )}
                        </motion.div>
                        <span
                          className={`text-sm flex-1 ${
                            m.completed
                              ? "text-white/40 line-through"
                              : "text-white/90"
                          }`}
                        >
                          {m.title}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={enterEditMode}
                      className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm font-semibold flex items-center justify-center gap-1.5 btn-press"
                    >
                      <Pencil size={14} /> {t("goalsEditButton")}
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="px-4 py-2.5 rounded-xl bg-[#FF3B30]/15 text-[#FF3B30] border border-[#FF3B30]/30 text-sm font-semibold flex items-center justify-center gap-1.5 btn-press"
                          aria-label={t("delete")}
                        >
                          <Trash2 size={14} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="glass-card-strong border-white/10 max-w-[360px] w-[calc(100%-2rem)] p-6 rounded-3xl bg-[#0B132B]/95 backdrop-blur-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white text-lg font-bold font-[family-name:var(--font-poppins)] flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-[#FF3B30]/20 flex items-center justify-center">
                              <Trash2 size={16} className="text-[#FF3B30]" />
                            </span>
                            {t("goalsDeleteTitle")}
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-white/60 text-sm leading-relaxed">
                            {t("goalsDeleteDesc", { title: detailGoal.title })}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-row gap-2 sm:justify-end mt-2">
                          <AlertDialogCancel className="mt-0 bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white rounded-xl h-11 flex-1 sm:flex-initial sm:px-6">
                            {t("cancel")}
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleDelete(detailGoal.id, detailGoal.title)
                            }
                            className="bg-[#FF3B30] hover:bg-[#FF3B30]/90 text-white rounded-xl h-11 font-semibold flex-1 sm:flex-initial sm:px-6 border-0"
                          >
                            {t("delete")}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </>
              ) : (
                <>
                  {/* Edit mode */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold font-[family-name:var(--font-poppins)] text-lg">
                      {t("goalsEditTitle")}
                    </h3>
                    <button
                      onClick={cancelEditMode}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                      aria-label={t("close")}
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">
                        {t("goalsFieldTitle")}
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        maxLength={60}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500]"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-white/60 text-xs">
                          {t("goalsFieldDescription")}
                        </label>
                        <span className="text-white/30 text-[10px]">
                          {editDescription.length}/280
                        </span>
                      </div>
                      <textarea
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(e.target.value.slice(0, 280))
                        }
                        rows={3}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500] resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">
                        {t("goalsFieldTargetDate")}
                      </label>
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500] [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-2 block">
                        {t("goalsFieldMilestones")}
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={editMilestoneInput}
                          onChange={(e) =>
                            setEditMilestoneInput(e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleEditAddMilestone();
                            }
                          }}
                          placeholder={t("goalsMilestonePlaceholder")}
                          maxLength={50}
                          className="flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500]"
                        />
                        <button
                          onClick={handleEditAddMilestone}
                          disabled={!editMilestoneInput.trim()}
                          className="px-3 rounded-xl bg-[#FF9500]/20 border border-[#FF9500]/40 text-[#FF9500] text-xs font-semibold disabled:opacity-40 btn-press"
                        >
                          {t("goalsMilestoneAdd")}
                        </button>
                      </div>
                      {editMilestones.length > 0 && (
                        <div className="flex flex-col gap-1.5">
                          {editMilestones.map((m, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10"
                            >
                              <span className="text-white/80 text-sm flex-1">
                                {m}
                              </span>
                              <button
                                onClick={() => handleEditRemoveMilestone(i)}
                                className="text-white/40 hover:text-[#FF3B30]"
                                aria-label={`${t("delete")} ${m}`}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={cancelEditMode}
                        className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/80 text-sm font-semibold btn-press"
                      >
                        {t("cancel")}
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-1.5 btn-press"
                      >
                        <Check size={14} /> {t("goalsSaveButton")}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========================================================================
   FilterPill — horizontal scroll category filter
   ======================================================================== */

function FilterPill({
  label,
  icon: Icon,
  active,
  count,
  onClick,
  color,
}: {
  label: string;
  icon: LucideIcon;
  active: boolean;
  count: number;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        active
          ? "text-white"
          : "text-white/60 bg-white/5 border border-white/10"
      }`}
      style={
        active
          ? {
              background: `${color}22`,
              border: `1px solid ${color}`,
              color,
              boxShadow: `0 0 12px ${color}44`,
            }
          : undefined
      }
    >
      <Icon size={13} />
      {label}
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
          active ? "bg-white/15" : "bg-white/10"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

/* ========================================================================
   GoalCard — compact card used in the list
   ======================================================================== */

function GoalCard({
  goal,
  onToggle,
  onOpen,
  onDelete,
}: {
  goal: LifeGoal;
  onToggle: (milestoneId: string) => void;
  onOpen: () => void;
  onDelete: () => void;
}) {
  const t = useT();
  const meta = CATEGORY_META[goal.category];
  const Icon = meta.icon;
  const dr = formatDaysRemaining(goal.targetDate, t);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="glass-card p-4 card-hover"
    >
      {/* Top row */}
      <div className="flex items-start gap-3 mb-2">
        <button
          onClick={onOpen}
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${meta.color}22`,
            border: `1px solid ${meta.color}55`,
          }}
          aria-label={`${t("goalsEditButton")} ${goal.title}`}
        >
          <Icon size={18} style={{ color: meta.color }} strokeWidth={2} />
        </button>

        <button
          onClick={onOpen}
          className="flex-1 min-w-0 text-left"
        >
          <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)] leading-tight line-clamp-2">
            {goal.title}
          </h3>
          {goal.description && (
            <p className="text-white/40 text-xs italic mt-0.5 line-clamp-2">
              {goal.description}
            </p>
          )}
        </button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors shrink-0"
              aria-label={t("delete")}
            >
              <Trash2 size={15} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="glass-card-strong border-white/10 max-w-[360px] w-[calc(100%-2rem)] p-6 rounded-3xl bg-[#0B132B]/95 backdrop-blur-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white text-lg font-bold font-[family-name:var(--font-poppins)] flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#FF3B30]/20 flex items-center justify-center">
                  <Trash2 size={16} className="text-[#FF3B30]" />
                </span>
                {t("goalsDeleteTitle")}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/60 text-sm leading-relaxed">
                {t("goalsDeleteDesc", { title: goal.title })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-row gap-2 sm:justify-end mt-2">
              <AlertDialogCancel className="mt-0 bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white rounded-xl h-11 flex-1 sm:flex-initial sm:px-6">
                {t("cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-[#FF3B30] hover:bg-[#FF3B30]/90 text-white rounded-xl h-11 font-semibold flex-1 sm:flex-initial sm:px-6 border-0"
              >
                {t("delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Progress bar + deadline */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${goal.progress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${meta.color}, ${meta.color}aa)`,
              boxShadow: `0 0 8px ${meta.color}66`,
            }}
          />
        </div>
        <span
          className="text-xs font-bold"
          style={{ color: meta.color }}
        >
          {goal.progress}%
        </span>
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={{
            background: dr.past
              ? "rgba(255,59,48,0.15)"
              : dr.urgent
              ? "rgba(255,149,0,0.15)"
              : "rgba(255,255,255,0.05)",
            color: dr.past
              ? "#FF3B30"
              : dr.urgent
              ? "#FF9500"
              : "rgba(255,255,255,0.6)",
          }}
        >
          <Calendar size={10} />
          {dr.text}
        </div>
      </div>

      {/* Compact milestones list */}
      <div className="space-y-1">
        {goal.milestones.slice(0, 4).map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => onToggle(m.id)}
              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                m.completed
                  ? "bg-[#4ADE80] border-[#4ADE80]"
                  : "bg-transparent border border-white/30 hover:border-white/50"
              }`}
              aria-label={`${t("goalsEditButton")} ${m.title}`}
            >
              {m.completed && (
                <Check size={11} className="text-white" strokeWidth={3} />
              )}
            </button>
            <span
              className={`text-xs flex-1 truncate ${
                m.completed ? "text-white/40 line-through" : "text-white/80"
              }`}
            >
              {m.title}
            </span>
          </div>
        ))}
        {goal.milestones.length > 4 && (
          <button
            onClick={onOpen}
            className="text-white/40 text-[11px] hover:text-white/70 transition-colors"
          >
            + {t("goalsDetailMoreSteps", { n: goal.milestones.length - 4 })}
          </button>
        )}
      </div>
    </motion.div>
  );
}
