"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Wallet,
  TrendingUp,
  Target,
  Calendar,
  Flame,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Sparkles,
  Trophy,
  GraduationCap,
  PiggyBank,
  Banknote,
  Lightbulb,
  Info,
  Award,
  ChevronRight,
  PieChart as PieChartIcon,
  BarChart3,
  Car,
  Home,
  Utensils,
  Ellipsis,
  ArrowRight,
  Gift,
} from "lucide-react";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { toast } from "sonner";
import { useStore, type SavingsGoal } from "@/store/zerobet-store";
import { useT, useLanguage } from "@/lib/i18n/useT";
import { SAVINGS_GOALS } from "@/lib/data/app-data";

// ---------- Constants & helpers ----------

function formatFCFA(n: number, lang: string = "fr"): string {
  const locale = lang === "en" ? "en-GB" : lang === "es" ? "es-ES" : "fr-FR";
  return Math.round(n).toLocaleString(locale);
}

interface SavingCategory {
  key: string;
  nameKey: string;
  percent: number;
  color: string;
  descKey: string;
  icon: string;
}

const SAVING_CATEGORIES: SavingCategory[] = [
  {
    key: "necessites",
    nameKey: "financeCategoryNecessities",
    percent: 50,
    color: "#4ADE80",
    descKey: "financeSavingCatNecessitiesDesc",
    icon: "🏠",
  },
  {
    key: "epargne",
    nameKey: "financeCategorySavings",
    percent: 30,
    color: "#64D2FF",
    descKey: "financeSavingCatSavingsDesc",
    icon: "🏦",
  },
  {
    key: "investissement",
    nameKey: "financeCategoryInvestment",
    percent: 15,
    color: "#BF5AF2",
    descKey: "financeSavingCatInvestmentDesc",
    icon: "📈",
  },
  {
    key: "plaisirs",
    nameKey: "financeCategoryPleasures",
    percent: 5,
    color: "#FF9500",
    descKey: "financeSavingCatPleasuresDesc",
    icon: "🎨",
  },
];

interface EducationTip {
  id: string;
  icon: string;
  color: string;
  titleKey: string;
  shortKey: string;
  detailsKey: string;
}

const EDUCATION_TIPS: EducationTip[] = [
  {
    id: "rule-50-30-20",
    icon: "⚖️",
    color: "#4ADE80",
    titleKey: "financeTip1Title",
    shortKey: "financeTip1Short",
    detailsKey: "financeTip1Details",
  },
  {
    id: "emergency-fund",
    icon: "🛟",
    color: "#64D2FF",
    titleKey: "financeTip2Title",
    shortKey: "financeTip2Short",
    detailsKey: "financeTip2Details",
  },
  {
    id: "small-amounts",
    icon: "💧",
    color: "#BF5AF2",
    titleKey: "financeTip3Title",
    shortKey: "financeTip3Short",
    detailsKey: "financeTip3Details",
  },
  {
    id: "mobile-money",
    icon: "📲",
    color: "#FF9500",
    titleKey: "financeTip4Title",
    shortKey: "financeTip4Short",
    detailsKey: "financeTip4Details",
  },
];

interface Milestone {
  amount: number;
  labelKey: string;
  icon: string;
  reached: boolean;
}

interface SuggestionPreset {
  nameKey: string;
  targetAmount: number;
  icon: string;
}

const SUGGESTION_PRESETS: SuggestionPreset[] = [
  { nameKey: "financePresetPhone", targetAmount: 75000, icon: "📱" },
  { nameKey: "financePresetMoto", targetAmount: 450000, icon: "🏍️" },
  { nameKey: "financePresetBusiness", targetAmount: 500000, icon: "🏪" },
  { nameKey: "financePresetEducation", targetAmount: 800000, icon: "🎓" },
  { nameKey: "financePresetEmergency", targetAmount: 150000, icon: "🛟" },
  { nameKey: "financePresetLand", targetAmount: 1500000, icon: "🏠" },
];

// Month labels per language (used in the comparison BarChart's XAxis).
const MONTH_LABELS: Record<string, string[]> = {
  fr: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
};

// ---------- Sub-components ----------

function SectionTitle({
  icon: Icon,
  iconColor,
  title,
  right,
}: {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-white font-semibold text-sm flex items-center gap-2 font-[family-name:var(--font-poppins)]">
        <Icon size={16} style={{ color: iconColor }} />
        {title}
      </h3>
      {right}
    </div>
  );
}

// ---------- Main Screen ----------

export function FinanceScreen() {
  const t = useT();
  const language = useLanguage();
  const {
    weeklyBetAmount,
    setWeeklyBetAmount,
    savingsGoal,
    setSavingsGoal,
    streakDays,
    navigate,
    adminStreakOverride,
    weeklyIncome,
    setWeeklyIncome,
    weeklyExpenses,
    setWeeklyExpenses,
    savingsGoals,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    addXP,
  } = useStore();

  const effectiveStreak = adminStreakOverride !== null ? adminStreakOverride : streakDays;

  // ----- Weekly bet input state -----
  const [editBet, setEditBet] = useState(false);
  const [betInput, setBetInput] = useState(weeklyBetAmount.toString());

  // ----- Budget input state -----
  const [editBudget, setEditBudget] = useState(false);
  const [incomeInput, setIncomeInput] = useState(weeklyIncome.toString());
  const [rentInput, setRentInput] = useState(weeklyExpenses.rent.toString());
  const [foodInput, setFoodInput] = useState(weeklyExpenses.food.toString());
  const [transportInput, setTransportInput] = useState(weeklyExpenses.transport.toString());
  const [otherInput, setOtherInput] = useState(weeklyExpenses.other.toString());

  const startEditBet = () => {
    setBetInput(weeklyBetAmount.toString());
    setEditBet(true);
  };

  const startEditBudget = () => {
    setIncomeInput(weeklyIncome.toString());
    setRentInput(weeklyExpenses.rent.toString());
    setFoodInput(weeklyExpenses.food.toString());
    setTransportInput(weeklyExpenses.transport.toString());
    setOtherInput(weeklyExpenses.other.toString());
    setEditBudget(true);
  };

  // ----- Savings goal modal state -----
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalIcon, setNewGoalIcon] = useState("🎯");

  // ----- Contribution modal -----
  const [contribGoalId, setContribGoalId] = useState<string | null>(null);
  const [contribAmount, setContribAmount] = useState("");

  // ----- Education modal -----
  const [openTip, setOpenTip] = useState<EducationTip | null>(null);
  const [tipIndex, setTipIndex] = useState(0);

  // Auto-rotate education tips
  useEffect(() => {
    const t = setInterval(() => {
      setTipIndex((i) => (i + 1) % EDUCATION_TIPS.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  // ----- Derived values -----
  const dailySaved = Math.round(weeklyBetAmount / 7);
  const totalSaved = effectiveStreak * dailySaved;
  const weekSaved = Math.min(7, effectiveStreak) * dailySaved;
  const monthProjection = totalSaved + 30 * dailySaved;
  const yearProjection = totalSaved + 365 * dailySaved;

  const goalProgress = savingsGoal > 0 ? Math.min(100, (totalSaved / savingsGoal) * 100) : 0;
  const daysToGoal =
    savingsGoal > 0 && dailySaved > 0 ? Math.ceil((savingsGoal - totalSaved) / dailySaved) : 0;

  // 30-day projection chart data
  const chartData = useMemo(() => {
    const data: { day: number; amount: number; isToday: boolean }[] = [];
    for (let i = 1; i <= 30; i++) {
      data.push({
        day: i,
        amount: i <= effectiveStreak ? i * dailySaved : effectiveStreak * dailySaved,
        isToday: i === effectiveStreak,
      });
    }
    return data;
  }, [effectiveStreak, dailySaved]);

  const maxAmount = Math.max(...chartData.map((d) => d.amount), 1);

  const handleSaveBet = () => {
    const n = parseInt(betInput) || 0;
    setWeeklyBetAmount(Math.max(0, n));
    setEditBet(false);
  };

  // ----- Budget calculations -----
  const totalExpenses =
    weeklyExpenses.rent + weeklyExpenses.food + weeklyExpenses.transport + weeklyExpenses.other;
  const availableWithZerobet = weeklyIncome - totalExpenses; // no gambling
  const availableBeforeZerobet = weeklyIncome - totalExpenses - weeklyBetAmount; // with gambling
  const weeklyDifference = availableWithZerobet - availableBeforeZerobet; // = weeklyBetAmount

  const handleSaveBudget = () => {
    setWeeklyIncome(Math.max(0, parseInt(incomeInput) || 0));
    setWeeklyExpenses({
      rent: Math.max(0, parseInt(rentInput) || 0),
      food: Math.max(0, parseInt(foodInput) || 0),
      transport: Math.max(0, parseInt(transportInput) || 0),
      other: Math.max(0, parseInt(otherInput) || 0),
    });
    setEditBudget(false);
    toast.success(t("financeBudgetUpdatedToast"));
  };

  // ----- Savings goals handlers -----
  const handleAddGoal = (preset?: SuggestionPreset) => {
    const name = preset ? t(preset.nameKey) : newGoalName.trim();
    const target = preset?.targetAmount ?? parseInt(newGoalTarget);
    if (!name) {
      toast.error(t("financeGoalNameRequired"));
      return;
    }
    if (!target || target <= 0) {
      toast.error(t("financeInvalidAmount"));
      return;
    }
    addSavingsGoal({
      name,
      targetAmount: target,
      currentAmount: 0,
      icon: preset?.icon ?? newGoalIcon,
    });
    toast.success(t("financeGoalAddedToast", { name }));
    setNewGoalName("");
    setNewGoalTarget("");
    setNewGoalIcon("🎯");
    setShowAddGoal(false);
  };

  const handleContribute = () => {
    if (!contribGoalId) return;
    const amt = parseInt(contribAmount) || 0;
    if (amt <= 0) {
      toast.error(t("financeInvalidAmount"));
      return;
    }
    const goal = savingsGoals.find((g) => g.id === contribGoalId);
    if (!goal) return;
    const newAmount = goal.currentAmount + amt;
    const justReached = goal.currentAmount < goal.targetAmount && newAmount >= goal.targetAmount;
    updateSavingsGoal(contribGoalId, { currentAmount: newAmount });
    if (justReached) {
      addXP(150, t("financeGoalReachedXP"));
      toast.success(t("financeGoalReachedToast", { name: goal.name }));
    } else {
      toast.success(t("financeContributedToast", { amount: formatFCFA(amt, language), name: goal.name }));
    }
    setContribAmount("");
    setContribGoalId(null);
  };

  const handleDeleteGoal = (id: string, name: string) => {
    deleteSavingsGoal(id);
    toast.success(t("financeGoalDeletedToast", { name }));
  };

  // ----- Spending categories pie data -----
  const pieData = useMemo(
    () =>
      SAVING_CATEGORIES.map((c) => ({
        name: t(c.nameKey),
        value: Math.round((totalSaved * c.percent) / 100),
        percent: c.percent,
        color: c.color,
        key: c.key,
        description: t(c.descKey),
        icon: c.icon,
      })),
    [totalSaved, t]
  );

  const [activeCategory, setActiveCategory] = useState<SavingCategory | null>(null);

  // ----- Savings streak (weeks) -----
  const savedWeeks = Math.floor(effectiveStreak / 7);
  const last8Weeks = useMemo(() => {
    const arr: { weekIndex: number; saved: boolean }[] = [];
    for (let i = 7; i >= 0; i--) {
      const weekFromEnd = 7 - i; // 0 = most recent (this week)
      const saved = weekFromEnd < savedWeeks;
      arr.push({ weekIndex: i, saved });
    }
    return arr;
  }, [savedWeeks]);

  const streakBonusXP = savedWeeks * 25;

  // ----- Financial milestones -----
  const milestones: Milestone[] = useMemo(
    () =>
      [
        { amount: 10000, labelKey: "financeMilestone10k", icon: "🥉" },
        { amount: 50000, labelKey: "financeMilestone50k", icon: "🥈" },
        { amount: 100000, labelKey: "financeMilestone100k", icon: "🥇" },
        { amount: 500000, labelKey: "financeMilestone500k", icon: "🏆" },
        { amount: 1000000, labelKey: "financeMilestone1M", icon: "👑" },
      ].map((m) => ({ ...m, reached: totalSaved >= m.amount })),
    [totalSaved]
  );

  // ----- Spending comparison bar chart (6 months) -----
  const monthlyAmount = Math.round(weeklyBetAmount * 4.33);
  const comparisonData = useMemo(() => {
    const now = new Date();
    const labels = MONTH_LABELS[language] ?? MONTH_LABELS.fr;
    const data: { month: string; avant: number; maintenant: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      data.push({
        month: labels[d.getMonth()],
        avant: monthlyAmount,
        maintenant: monthlyAmount,
      });
    }
    return data;
  }, [monthlyAmount, language]);

  const sixMonthNetGain = monthlyAmount * 6 * 2; // savings + losses avoided

  return (
    <div className="min-h-screen px-5 pt-12 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("dashboard")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
            {t("financeTitle")}
          </h1>
          <p className="text-white/50 text-xs">{t("financeSubtitle")}</p>
        </div>
      </div>

      {/* Total saved hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong animate-glow-pulse p-6 mb-4 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#4ADE80]/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#4ADE80]/20 flex items-center justify-center">
                <Wallet size={18} className="text-[#4ADE80]" />
              </div>
              <span className="text-white/60 text-sm">{t("financeTotalSaved")}</span>
            </div>
            <Flame size={16} className="text-[#FF9500]" />
          </div>
          <motion.div
            key={totalSaved}
            initial={{ scale: 1.1, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-extrabold bg-clip-text text-transparent font-[family-name:var(--font-poppins)]"
            style={{
              background: "linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {formatFCFA(totalSaved, language)}
            <span className="text-white/50 text-base font-normal ml-1">FCFA</span>
          </motion.div>
          <p className="text-white/50 text-xs mt-1">
            {t("financeSavedOverDays", { n: effectiveStreak })}
          </p>
        </div>
      </motion.div>

      {/* Weekly bet input */}
      <div className="glass-card card-hover p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-white/60 text-sm flex items-center gap-2">
            <TrendingUp size={14} className="text-[#FF9500]" />
            {t("financeWeeklyBet")}
          </label>
          <button onClick={() => (editBet ? setEditBet(false) : startEditBet())} className="text-[#FF9500] text-xs">
            {editBet ? t("cancel") : t("edit")}
          </button>
        </div>
        {editBet ? (
          <div className="flex gap-2">
            <input
              type="number"
              value={betInput}
              onChange={(e) => setBetInput(e.target.value)}
              className="flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#10B981]"
              placeholder={t("financeAmountFCFA")}
            />
            <button
              onClick={handleSaveBet}
              className="px-4 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold"
            >
              OK
            </button>
          </div>
        ) : (
          <p className="text-white font-bold text-2xl font-[family-name:var(--font-poppins)]">
            {weeklyBetAmount.toLocaleString(language === "en" ? "en-GB" : language === "es" ? "es-ES" : "fr-FR")}{" "}
            <span className="text-white/50 text-sm font-normal">{t("financeFCFAperWeek")}</span>
          </p>
        )}
        <p className="text-white/40 text-xs mt-1">
          {t("financeSavedPerDay", { n: formatFCFA(dailySaved, language) })}
        </p>
      </div>

      {/* 30-day progress chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card card-hover p-4 mb-4"
      >
        <SectionTitle
          icon={Calendar}
          iconColor="#64D2FF"
          title={t("financeProgress30Days")}
        />
        <div className="overflow-x-auto custom-scroll -mx-1 px-1">
          <div className="flex gap-1 min-w-max pb-2">
            {chartData.map((d) => (
              <div
                key={d.day}
                className="flex flex-col items-center gap-1"
                style={{ width: 32 }}
              >
                <div className="h-32 w-full flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.amount / maxAmount) * 100}%` }}
                    transition={{ duration: 0.5, delay: d.day * 0.01 }}
                    className={`w-full rounded-t-md ${
                      d.isToday
                        ? "gradient-primary"
                        : d.day <= effectiveStreak
                        ? "bg-[#4ADE80]/60"
                        : "bg-white/10"
                    }`}
                    style={{ minHeight: 2 }}
                  />
                </div>
                <span
                  className={`text-[9px] ${
                    d.isToday ? "text-[#FF9500] font-bold" : "text-white/40"
                  }`}
                >
                  J{d.day}
                </span>
              </div>
            ))}
          </div>
        </div>
        {effectiveStreak > 0 && (
          <div className="mt-2 pt-2 border-t border-white/5 flex justify-between text-xs">
            <span className="text-white/40">
              {t("today")}:{" "}
              <span className="text-[#FF9500] font-bold">
                +{formatFCFA(dailySaved, language)}
              </span>{" "}
              FCFA
            </span>
            <span className="text-white/40">
              {t("total")}:{" "}
              <span className="text-[#4ADE80] font-bold">
                {formatFCFA(totalSaved, language)}
              </span>{" "}
              FCFA
            </span>
          </div>
        )}
      </motion.div>

      {/* Projections */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass-card card-hover p-4">
          <div className="text-white/50 text-xs mb-1">{t("financeMonth")}</div>
          <div className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
            {formatFCFA(monthProjection, language)}
          </div>
          <div className="text-white/40 text-xs">FCFA</div>
        </div>
        <div className="glass-card card-hover p-4">
          <div className="text-white/50 text-xs mb-1">{t("financeYear")}</div>
          <div className="text-xl font-bold gradient-primary-text font-[family-name:var(--font-poppins)]">
            {formatFCFA(yearProjection, language)}
          </div>
          <div className="text-white/40 text-xs">FCFA</div>
        </div>
      </div>

      {/* ========== NEW: Spending Categories PieChart ========== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong p-4 mb-4"
      >
        <SectionTitle
          icon={PieChartIcon}
          iconColor="#BF5AF2"
          title={t("financeSavingsDistribution")}
          right={
            <span className="text-[10px] text-white/40">
              {t("total")}: {formatFCFA(totalSaved, language)} FCFA
            </span>
          }
        />
        <p className="text-white/50 text-xs mb-3">
          Voici comment répartir intelligemment ton argent sauvé.
        </p>

        <div className="w-full h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                stroke="rgba(10,10,15,0.6)"
                strokeWidth={2}
              >
                {pieData.map((entry) => (
                  <Cell
                    key={`cell-${entry.key}`}
                    fill={entry.color}
                    onClick={() =>
                      setActiveCategory(
                        SAVING_CATEGORIES.find((c) => c.key === entry.key) ?? null
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(11,19,43,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                  backdropFilter: "blur(20px)",
                }}
                labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                itemStyle={{ color: "rgba(255,255,255,0.9)" }}
                formatter={(value: number, _name, entry) => {
                  const pct = (entry?.payload as { percent?: number } | undefined)?.percent ?? 0;
                  return [`${formatFCFA(value, language)} FCFA (${pct}%)`, ""] as [string, string];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-white/40 text-[10px] uppercase tracking-wider">Total</span>
            <span className="text-white font-bold text-lg font-[family-name:var(--font-poppins)]">
              {formatFCFA(totalSaved, language)}
            </span>
            <span className="text-white/40 text-[10px]">FCFA</span>
          </div>
        </div>

        {/* Category legend (tap to see details) */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5">
          {pieData.map((c) => (
            <button
              key={c.key}
              onClick={() =>
                setActiveCategory(
                  SAVING_CATEGORIES.find((sc) => sc.key === c.key) ?? null
                )
              }
              className="flex items-center gap-2 text-left p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: c.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-white/80 text-xs font-medium truncate">
                  {c.icon} {c.name}
                </div>
                <div className="text-white/40 text-[10px]">
                  {c.percent}% · {formatFCFA(c.value, language)} FCFA
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ========== NEW: Budget Tracker ========== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong p-4 mb-4"
      >
        <SectionTitle
          icon={Banknote}
          iconColor="#4ADE80"
          title={t("financeBudgetWeekly")}
          right={
            <button
              onClick={() => (editBudget ? setEditBudget(false) : startEditBudget())}
              className="text-[#FF9500] text-xs"
            >
              {editBudget ? t("cancel") : t("edit")}
            </button>
          }
        />

        {!editBudget ? (
          <>
            {/* Income & expense summary */}
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-xs">
                <span className="text-white/60 flex items-center gap-1">
                  <TrendingUp size={12} className="text-[#4ADE80]" /> {t("financeIncomeWeekly")}
                </span>
                <span className="text-white font-semibold">
                  {formatFCFA(weeklyIncome, language)} FCFA
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/60 flex items-center gap-1">
                  <Home size={12} className="text-[#64D2FF]" /> {t("financeCategoryRent")}
                </span>
                <span className="text-white/70">{formatFCFA(weeklyExpenses.rent, language)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/60 flex items-center gap-1">
                  <Utensils size={12} className="text-[#FF9500]" /> {t("financeCategoryFood")}
                </span>
                <span className="text-white/70">{formatFCFA(weeklyExpenses.food, language)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/60 flex items-center gap-1">
                  <Car size={12} className="text-[#BF5AF2]" /> {t("financeCategoryTransport")}
                </span>
                <span className="text-white/70">{formatFCFA(weeklyExpenses.transport, language)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/60 flex items-center gap-1">
                  <Ellipsis size={12} className="text-white/50" /> {t("financeCategoryOther")}
                </span>
                <span className="text-white/70">{formatFCFA(weeklyExpenses.other, language)}</span>
              </div>
            </div>

            {/* Visual bar showing budget breakdown */}
            {weeklyIncome > 0 && (
              <div className="mb-3">
                <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#64D2FF]"
                    style={{
                      width: `${Math.min(100, (weeklyExpenses.rent / weeklyIncome) * 100)}%`,
                    }}
                    title={t("financeCategoryRent")}
                  />
                  <div
                    className="bg-[#FF9500]"
                    style={{
                      width: `${Math.min(100, (weeklyExpenses.food / weeklyIncome) * 100)}%`,
                    }}
                    title={t("financeCategoryFood")}
                  />
                  <div
                    className="bg-[#BF5AF2]"
                    style={{
                      width: `${Math.min(100, (weeklyExpenses.transport / weeklyIncome) * 100)}%`,
                    }}
                    title={t("financeCategoryTransport")}
                  />
                  <div
                    className="bg-white/40"
                    style={{
                      width: `${Math.min(100, (weeklyExpenses.other / weeklyIncome) * 100)}%`,
                    }}
                    title={t("financeCategoryOther")}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-white/40">
                  <span>0</span>
                  <span>{formatFCFA(weeklyIncome, language)} FCFA ({t("financeIncome").toLowerCase()})</span>
                </div>
              </div>
            )}

            {/* Before vs With Zerobet comparison */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/20">
                <div className="text-[#FF3B30] text-[10px] uppercase tracking-wide mb-1">
                  {t("financeBeforeZerobet")}
                </div>
                <div className="text-white/80 text-lg font-bold">
                  {formatFCFA(Math.max(0, availableBeforeZerobet), language)}
                </div>
                <div className="text-white/40 text-[10px]">{t("financeRemainingPerWeek")}</div>
                <div className="text-[#FF3B30]/70 text-[10px] mt-1">
                  -{formatFCFA(weeklyBetAmount, language)} {t("financeLostToBets")}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20">
                <div className="text-[#4ADE80] text-[10px] uppercase tracking-wide mb-1">
                  {t("financeWithZerobet")}
                </div>
                <div className="text-white text-lg font-bold">
                  {formatFCFA(Math.max(0, availableWithZerobet), language)}
                </div>
                <div className="text-white/40 text-[10px]">{t("financeRemainingPerWeek")}</div>
                <div className="text-[#4ADE80] text-[10px] mt-1">
                  +{formatFCFA(weeklyDifference, language)} {t("financeGained")}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-white/60 text-xs flex items-center gap-1 mb-1">
                <TrendingUp size={12} className="text-[#4ADE80]" /> {t("financeIncomeWeekly")}
              </label>
              <input
                type="number"
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#4ADE80]"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-white/60 text-xs flex items-center gap-1 mb-1">
                  <Home size={12} className="text-[#64D2FF]" /> {t("financeCategoryRent")}
                </label>
                <input
                  type="number"
                  value={rentInput}
                  onChange={(e) => setRentInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#64D2FF]"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-white/60 text-xs flex items-center gap-1 mb-1">
                  <Utensils size={12} className="text-[#FF9500]" /> {t("financeCategoryFood")}
                </label>
                <input
                  type="number"
                  value={foodInput}
                  onChange={(e) => setFoodInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500]"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-white/60 text-xs flex items-center gap-1 mb-1">
                  <Car size={12} className="text-[#BF5AF2]" /> {t("financeCategoryTransport")}
                </label>
                <input
                  type="number"
                  value={transportInput}
                  onChange={(e) => setTransportInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#BF5AF2]"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-white/60 text-xs flex items-center gap-1 mb-1">
                  <Ellipsis size={12} className="text-white/50" /> {t("financeCategoryOther")}
                </label>
                <input
                  type="number"
                  value={otherInput}
                  onChange={(e) => setOtherInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditBudget(false)}
                className="flex-1 py-2.5 rounded-xl glass-card text-white/70 text-sm"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSaveBudget}
                className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-1"
              >
                <Check size={14} /> {t("save")}
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* ========== NEW: Enhanced Savings Goals (multiple) ========== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong p-4 mb-4"
      >
        <SectionTitle
          icon={Target}
          iconColor="#FF9500"
          title={t("financeMyGoals")}
          right={
            <button
              onClick={() => setShowAddGoal(true)}
              className="flex items-center gap-1 text-[#FF9500] text-xs"
            >
              <Plus size={14} /> {t("add")}
            </button>
          }
        />

        {savingsGoals.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-white/60 text-sm mb-3">
              {t("financeNoGoalSet")}
            </p>
            <button
              onClick={() => setShowAddGoal(true)}
              className="px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold"
            >
              {t("financeCreateFirstGoal")}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {savingsGoals.map((goal) => {
              const progress =
                goal.targetAmount > 0
                  ? Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)
                  : 0;
              const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
              const isReached = goal.currentAmount >= goal.targetAmount;
              return (
                <div
                  key={goal.id}
                  className="p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                      {goal.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm truncate">
                        {goal.name}
                      </div>
                      <div className="text-white/50 text-[11px]">
                        {formatFCFA(goal.currentAmount, language)} / {formatFCFA(goal.targetAmount, language)} FCFA
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => setContribGoalId(goal.id)}
                        className="w-7 h-7 rounded-lg bg-[#4ADE80]/20 flex items-center justify-center"
                        aria-label={t("financeSaveForThisGoal")}
                      >
                        <Plus size={14} className="text-[#4ADE80]" />
                      </button>
                      <button
                        onClick={() => handleDeleteGoal(goal.id, goal.name)}
                        className="w-7 h-7 rounded-lg bg-[#FF3B30]/20 flex items-center justify-center"
                        aria-label={t("financeDeleteGoal")}
                      >
                        <Trash2 size={14} className="text-[#FF3B30]" />
                      </button>
                    </div>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full ${
                        isReached
                          ? "gradient-success"
                          : "gradient-primary"
                      } flex items-center justify-end pr-1.5`}
                    >
                      {progress > 12 && (
                        <span className="text-[9px] font-bold text-[#070B0E]">
                          {Math.round(progress)}%
                        </span>
                      )}
                    </motion.div>
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px]">
                    {isReached ? (
                      <span className="text-[#4ADE80] font-semibold flex items-center gap-1">
                        <Check size={11} /> {t("financeGoalReached")}
                      </span>
                    ) : (
                      <span className="text-white/40">
                        {t("financeRemainingAmount", { n: formatFCFA(remaining, language) })}
                      </span>
                    )}
                    {goal.deadline && (
                      <span className="text-white/40 flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(goal.deadline).toLocaleDateString(
                          language === "en" ? "en-GB" : language === "es" ? "es-ES" : "fr-FR",
                          { day: "numeric", month: "short" }
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick suggestions */}
        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-white/50 text-[11px] mb-2">💡 {t("financeQuickSuggestions")}</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {SUGGESTION_PRESETS.map((preset) => (
              <button
                key={preset.nameKey}
                onClick={() => handleAddGoal(preset)}
                className="flex-shrink-0 px-3 py-1.5 rounded-lg glass-card text-white/70 text-xs flex items-center gap-1.5 hover:bg-white/10 transition-colors"
              >
                <span>{preset.icon}</span>
                {t(preset.nameKey)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ========== NEW: Savings Streak (weeks) ========== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 mb-4 relative overflow-hidden"
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#FF9500]/15 blur-3xl pointer-events-none" />
        <SectionTitle
          icon={Flame}
          iconColor="#FF9500"
          title={t("financeSavingsStreak")}
          right={
            <span className="text-[10px] text-[#4ADE80] font-semibold flex items-center gap-1">
              <Gift size={10} /> +{formatFCFA(streakBonusXP, language)} {t("financeXpBonus")}
            </span>
          }
        />
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-extrabold text-white font-[family-name:var(--font-poppins)]">
            {savedWeeks}
          </span>
          <span className="text-white/60 text-sm">
            {t("financeSavingsWeeksConsecutive", { n: savedWeeks })}
          </span>
        </div>

        {/* Last 8 weeks calendar */}
        <div>
          <div className="text-white/50 text-[11px] mb-2">{t("financeLast8Weeks")}</div>
          <div className="flex gap-1.5">
            {last8Weeks.map((w, idx) => (
              <motion.div
                key={w.weekIndex}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex-1 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                  w.saved
                    ? "gradient-success text-[#070B0E]"
                    : "bg-white/5 text-white/30 border border-white/5"
                }`}
                title={w.saved ? t("financeSavingsWeek") : t("financeNotYet")}
              >
                {w.saved ? <Check size={14} /> : "—"}
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-[9px] text-white/30">
            <span>{t("finance8WeeksAgo")}</span>
            <span>{t("financeThisWeek")}</span>
          </div>
        </div>

        {savedWeeks > 0 && (
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#FF9500]" />
              <span className="text-white/70 text-xs">
                {t("financeSavingStreakMsg", { n: savedWeeks })}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* ========== NEW: Financial Milestones ========== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong p-4 mb-4"
      >
        <SectionTitle
          icon={Trophy}
          iconColor="#FBBF24"
          title={t("financeMilestones")}
          right={
            <span className="text-[10px] text-white/40">
              {milestones.filter((m) => m.reached).length} / {milestones.length} {t("financeReached")}
            </span>
          }
        />
        <div className="space-y-2">
          {milestones.map((m, idx) => {
            const progress =
              totalSaved > 0
                ? Math.min(100, (totalSaved / m.amount) * 100)
                : 0;
            return (
              <motion.div
                key={m.amount}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06 }}
                className={`p-3 rounded-xl flex items-center gap-3 ${
                  m.reached
                    ? "bg-[#FBBF24]/10 border border-[#FBBF24]/30"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                    m.reached ? "bg-[#FBBF24]/20" : "bg-white/5 grayscale opacity-50"
                  }`}
                >
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-medium ${
                        m.reached ? "text-white" : "text-white/60"
                      }`}
                    >
                      {t(m.labelKey)}
                    </span>
                    {m.reached ? (
                      <span className="text-[#FBBF24] text-[10px] font-bold flex items-center gap-1">
                        <Check size={11} /> {t("financeReached")}
                      </span>
                    ) : (
                      <span className="text-white/40 text-[10px]">
                        {formatFCFA(totalSaved, language)} / {formatFCFA(m.amount, language)}
                      </span>
                    )}
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.06 }}
                      className={`h-full ${
                        m.reached ? "bg-[#FBBF24]" : "gradient-primary"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ========== NEW: Spending Comparison BarChart ========== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong p-4 mb-4"
      >
        <SectionTitle
          icon={BarChart3}
          iconColor="#4ADE80"
          title={t("financeBeforeVsAfter")}
          right={
            <span className="text-[10px] text-white/40">{t("financeLast6Months")}</span>
          }
        />
        <p className="text-white/50 text-xs mb-3">
          {t("financeProjectionBarDesc")}
        </p>

        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 8, right: 8, bottom: 4, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="month"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${Math.round(v / 1000)}k`}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{
                  background: "rgba(11,19,43,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                  backdropFilter: "blur(20px)",
                }}
                labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                itemStyle={{ color: "rgba(255,255,255,0.9)" }}
                formatter={(value: number, name: string) => [
                  `${formatFCFA(value, language)} FCFA`,
                  name === "avant" ? t("financeBeforeLosses") : t("financeNowSavings"),
                ]}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-white/70 text-[11px]">
                    {value === "avant" ? `🔴 ${t("financeBeforeLosses")}` : `🟢 ${t("financeNowSavings")}`}
                  </span>
                )}
                wrapperStyle={{ fontSize: 11, paddingTop: 4 }}
              />
              <Bar dataKey="avant" fill="#FF3B30" radius={[4, 4, 0, 0]} name="avant" />
              <Bar dataKey="maintenant" fill="#4ADE80" radius={[4, 4, 0, 0]} name="maintenant" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Net gain calculation */}
        <div className="mt-3 p-3 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20 flex items-center justify-between">
          <div>
            <div className="text-[#4ADE80] text-[11px] uppercase tracking-wide">
              {t("financeNetGain6Months")}
            </div>
            <div className="text-white font-bold text-lg font-[family-name:var(--font-poppins)]">
              +{formatFCFA(sixMonthNetGain, language)} FCFA
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/50 text-[10px]">
              {t("financeSavingsLabel")}: {formatFCFA(monthlyAmount * 6, language)}
            </div>
            <div className="text-white/50 text-[10px]">
              {t("financeLossesAvoidedLabel")}: {formatFCFA(monthlyAmount * 6, language)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ========== NEW: Financial Education ========== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong p-4 mb-4"
      >
        <SectionTitle
          icon={GraduationCap}
          iconColor="#64D2FF"
          title={t("financeEducation")}
        />

        {/* Rotating tip preview */}
        <div className="relative h-[140px] mb-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={tipIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 p-4 rounded-2xl flex items-start gap-3"
              style={{
                background: `linear-gradient(135deg, ${EDUCATION_TIPS[tipIndex].color}22 0%, rgba(11,19,43,0.4) 100%)`,
                border: `1px solid ${EDUCATION_TIPS[tipIndex].color}33`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${EDUCATION_TIPS[tipIndex].color}22` }}
              >
                {EDUCATION_TIPS[tipIndex].icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className="font-semibold text-sm mb-1 font-[family-name:var(--font-poppins)]"
                  style={{ color: EDUCATION_TIPS[tipIndex].color }}
                >
                  {t(EDUCATION_TIPS[tipIndex].titleKey)}
                </h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  {t(EDUCATION_TIPS[tipIndex].shortKey)}
                </p>
                <button
                  onClick={() => setOpenTip(EDUCATION_TIPS[tipIndex])}
                  className="mt-2 text-[11px] font-medium flex items-center gap-1 hover:underline"
                  style={{ color: EDUCATION_TIPS[tipIndex].color }}
                >
                  {t("financeLearnMore")} <ChevronRight size={11} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mb-3">
          {EDUCATION_TIPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setTipIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                tipIndex === idx ? "w-6 bg-white" : "w-1.5 bg-white/30"
              }`}
              aria-label={t("financeTipNumber", { n: idx + 1 })}
            />
          ))}
        </div>

        {/* All tips grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
          {EDUCATION_TIPS.map((tip, idx) => (
            <button
              key={tip.id}
              onClick={() => setOpenTip(tip)}
              className={`p-2.5 rounded-xl text-left flex flex-col gap-1 transition-all ${
                tipIndex === idx
                  ? "bg-white/10 border border-white/15"
                  : "bg-white/5 border border-white/5 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-base">{tip.icon}</span>
                <span
                  className="text-[11px] font-semibold truncate"
                  style={{ color: tip.color }}
                >
                  {t(tip.titleKey)}
                </span>
              </div>
              <span className="text-white/50 text-[10px] line-clamp-2">{t(tip.shortKey)}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Add goal modal */}
      <AnimatePresence>
        {showAddGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddGoal(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-5 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold font-[family-name:var(--font-poppins)]">
                  {t("financeNewGoalTitle")}
                </h3>
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">{t("financeGoalName")}</label>
                  <input
                    type="text"
                    value={newGoalName}
                    onChange={(e) => setNewGoalName(e.target.value)}
                    placeholder={t("financeGoalNamePlaceholder")}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500]"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">
                    {t("financeTargetAmount")}
                  </label>
                  <input
                    type="number"
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(e.target.value)}
                    placeholder={t("financeAmountPlaceholder")}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500]"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-2 block">{t("financeIcon")}</label>
                  <div className="flex gap-2 flex-wrap">
                    {["🎯", "📱", "🏍️", "🏪", "🎓", "🛟", "🏠", "✈️", "💻", "💊"].map((ic) => (
                      <button
                        key={ic}
                        onClick={() => setNewGoalIcon(ic)}
                        className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${
                          newGoalIcon === ic
                            ? "bg-[#FF9500]/30 border border-[#FF9500]"
                            : "bg-white/5 border border-white/10"
                        }`}
                      >
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleAddGoal()}
                  className="w-full py-3 rounded-xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-1.5"
                >
                  <Plus size={16} /> {t("financeCreateGoal")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contribute to goal modal */}
      <AnimatePresence>
        {contribGoalId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContribGoalId(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-5 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold font-[family-name:var(--font-poppins)]">
                  {t("financeContributeTitle")}
                </h3>
                <button
                  onClick={() => setContribGoalId(null)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
              {(() => {
                const goal = savingsGoals.find((g) => g.id === contribGoalId);
                if (!goal) return null;
                return (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                      <span className="text-2xl">{goal.icon}</span>
                      <div>
                        <div className="text-white font-semibold text-sm">{goal.name}</div>
                        <div className="text-white/50 text-xs">
                          {formatFCFA(goal.currentAmount, language)} / {formatFCFA(goal.targetAmount, language)} FCFA
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">
                        {t("financeAmountToAdd")}
                      </label>
                      <input
                        type="number"
                        value={contribAmount}
                        onChange={(e) => setContribAmount(e.target.value)}
                        placeholder={t("financeAmountPlaceholder")}
                        autoFocus
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#4ADE80]"
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[1000, 2500, 5000, 10000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setContribAmount(amt.toString())}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs hover:bg-white/10"
                        >
                          +{formatFCFA(amt, language)}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleContribute}
                      className="w-full py-3 rounded-xl gradient-success text-[#070B0E] text-sm font-bold flex items-center justify-center gap-1.5"
                    >
                      <PiggyBank size={16} /> {t("financeAddToGoal")}
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Education tip detail modal */}
      <AnimatePresence>
        {openTip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenTip(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-5 w-full max-w-md"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: `${openTip.color}22` }}
                >
                  {openTip.icon}
                </div>
                <button
                  onClick={() => setOpenTip(null)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
              <h3
                className="text-lg font-bold mb-2 font-[family-name:var(--font-poppins)]"
                style={{ color: openTip.color }}
              >
                {t(openTip.titleKey)}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">{t(openTip.detailsKey)}</p>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                <Lightbulb size={16} className="text-[#FF9500] flex-shrink-0" />
                <span className="text-white/60 text-xs">
                  {t("financeTipApplyRule")}
                </span>
              </div>
              <button
                onClick={() => setOpenTip(null)}
                className="w-full mt-4 py-3 rounded-xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-1.5"
              >
                <Check size={16} /> {t("financeUnderstood")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
