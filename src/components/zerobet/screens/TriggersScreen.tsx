"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ChevronLeft,
  ScanSearch,
  Plus,
  Brain,
  UserX,
  Banknote,
  Wine,
  Coffee,
  Users,
  Moon,
  Flame,
  Megaphone,
  MoreHorizontal,
  Activity,
  TrendingUp,
  Shield,
  Sparkles,
  Clock,
  Quote,
  Trash2,
  Check,
  X,
  Lock,
  Bot,
  type LucideIcon,
} from "lucide-react";
import {
  useStore,
  type Trigger,
  type TriggerCategory,
} from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { EmptyState } from "@/components/zerobet/components/EmptyState";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import {
  containerVariants,
  itemVariants,
} from "@/lib/animations";

// ---------- Category metadata ----------

const CATEGORY_META: Record<
  TriggerCategory,
  { labelKey: string; icon: LucideIcon; color: string }
> = {
  stress: { labelKey: "triggersCatStress", icon: Brain, color: "#FF3B30" },
  solitude: { labelKey: "triggersCatSolitude", icon: UserX, color: "#64D2FF" },
  payday: { labelKey: "triggersCatPayday", icon: Banknote, color: "#4ADE80" },
  alcohol: { labelKey: "triggersCatAlcohol", icon: Wine, color: "#BF5AF2" },
  boredom: { labelKey: "triggersCatBoredom", icon: Coffee, color: "#FF9500" },
  social: { labelKey: "triggersCatSocial", icon: Users, color: "#FBBF24" },
  insomnia: { labelKey: "triggersCatInsomnia", icon: Moon, color: "#5E5CE6" },
  anger: { labelKey: "triggersCatAnger", icon: Flame, color: "#FF453A" },
  ads: { labelKey: "triggersCatAds", icon: Megaphone, color: "#FF2D55" },
  other: { labelKey: "triggersCatOther", icon: MoreHorizontal, color: "#8E8E93" },
};

const COPING_METHODS: { key: string }[] = [
  { key: "triggersCopingBreathing" },
  { key: "triggersCopingCall" },
  { key: "triggersCopingJournal" },
  { key: "triggersCopingExercise" },
  { key: "triggersCopingMeditation" },
  { key: "triggersCopingDistraction" },
  { key: "triggersCopingNone" },
];

const FILTER_TABS = [
  { id: "7d", labelKey: "triggersFilter7d", days: 7 },
  { id: "30d", labelKey: "triggersFilter30d", days: 30 },
  { id: "all", labelKey: "triggersFilterAll", days: null },
] as const;

type FilterTabId = (typeof FILTER_TABS)[number]["id"];

// ---------- Helpers ----------

function formatRelativeTime(iso: string, t: (k: string, p?: Record<string, string | number>) => string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);
  if (diffMin < 1) return t("triggersTimeJustNow");
  if (diffMin < 60) return t("triggersTimeMinAgo", { n: diffMin });
  if (diffHours < 24) return t("triggersTimeHoursAgo", { n: diffHours });
  if (diffDays === 1) return t("triggersTimeYesterday");
  if (diffDays < 7) return t("triggersTimeDaysAgo", { n: diffDays });
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function getTimeOfDay(hour: number): { key: string; labelKey: string } {
  if (hour >= 5 && hour < 12)
    return { key: "morning", labelKey: "triggersTimeMorning" };
  if (hour >= 12 && hour < 18)
    return { key: "afternoon", labelKey: "triggersTimeAfternoon" };
  if (hour >= 18 && hour < 24)
    return { key: "evening", labelKey: "triggersTimeEvening" };
  return { key: "night", labelKey: "triggersTimeNight" };
}

function intensityColor(i: number): string {
  if (i <= 2) return "#4ADE80";
  if (i === 3) return "#FF9500";
  return "#FF3B30";
}

// ---------- CountUp ----------

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const duration = 800;
    const start = performance.now();
    const from = 0;
    const to = value;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

// ---------- Main component ----------

export function TriggersScreen() {
  const t = useT();
  // Selectors (per spec: plan & navigate via selectors)
  const navigate = useStore((s) => s.navigate);
  const plan = useStore((s) => s.plan);
  const triggers = useStore((s) => s.triggers);
  const addTrigger = useStore((s) => s.addTrigger);
  const deleteTrigger = useStore((s) => s.deleteTrigger);
  const isPremium = plan !== "free";

  // Modal & UI state
  const [modalOpen, setModalOpen] = useState(false);
  const [filterTab, setFilterTab] = useState<FilterTabId>("7d");
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  // Form state
  const [category, setCategory] = useState<TriggerCategory | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [situation, setSituation] = useState("");
  const [copingMethod, setCopingMethod] = useState<string>(COPING_METHODS[0].key);
  const [resisted, setResisted] = useState(true);

  // ---------- Derived data ----------

  const weekAgoMs = useMemo(() => Date.now() - 7 * 86_400_000, []);
  const triggersThisWeek = useMemo(
    () => triggers.filter((t) => new Date(t.createdAt).getTime() >= weekAgoMs),
    [triggers, weekAgoMs]
  );

  const topCategory = useMemo(() => {
    const counts: Partial<Record<TriggerCategory, number>> = {};
    triggersThisWeek.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    const entries = Object.entries(counts).sort(
      (a, b) => (b[1] as number) - (a[1] as number)
    );
    if (entries.length === 0) return null;
    return {
      category: entries[0][0] as TriggerCategory,
      count: entries[0][1] as number,
    };
  }, [triggersThisWeek]);

  const resistanceRate = useMemo(() => {
    if (triggersThisWeek.length === 0) return 0;
    const resistedCount = triggersThisWeek.filter((t) => t.resisted).length;
    return Math.round((resistedCount / triggersThisWeek.length) * 100);
  }, [triggersThisWeek]);

  const filterCounts = useMemo(() => {
    return FILTER_TABS.map((t) => {
      if (t.days === null) return { id: t.id, count: triggers.length };
      const cutoff = Date.now() - t.days * 86_400_000;
      return {
        id: t.id,
        count: triggers.filter(
          (tr) => new Date(tr.createdAt).getTime() >= cutoff
        ).length,
      };
    });
  }, [triggers]);

  const filteredTriggers = useMemo(() => {
    const activeTab = FILTER_TABS.find((t) => t.id === filterTab);
    if (!activeTab || activeTab.days === null) return triggers;
    const cutoff = Date.now() - activeTab.days * 86_400_000;
    return triggers.filter(
      (t) => new Date(t.createdAt).getTime() >= cutoff
    );
  }, [triggers, filterTab]);

  const insights = useMemo(() => {
    if (triggersThisWeek.length === 0) return null;

    // 1. Most frequent trigger
    const catCounts: Partial<Record<TriggerCategory, number>> = {};
    triggersThisWeek.forEach((t) => {
      catCounts[t.category] = (catCounts[t.category] || 0) + 1;
    });
    const sortedCats = Object.entries(catCounts).sort(
      (a, b) => (b[1] as number) - (a[1] as number)
    );
    const topCat = sortedCats[0]
      ? {
          category: sortedCats[0][0] as TriggerCategory,
          count: sortedCats[0][1] as number,
          pct: Math.round(
            ((sortedCats[0][1] as number) / triggersThisWeek.length) * 100
          ),
        }
      : null;

    // 2. Most vulnerable time of day
    const todCounts: Record<
      string,
      { key: string; labelKey: string; count: number }
    > = {};
    triggersThisWeek.forEach((t) => {
      const h = new Date(t.createdAt).getHours();
      const tod = getTimeOfDay(h);
      if (!todCounts[tod.key])
        todCounts[tod.key] = { key: tod.key, labelKey: tod.labelKey, count: 0 };
      todCounts[tod.key].count++;
    });
    const sortedTod = Object.values(todCounts).sort((a, b) => b.count - a.count);
    const topTod = sortedTod[0] || null;

    // 3. Most effective coping method (highest resistance rate)
    const copingStats: Record<string, { total: number; resisted: number }> = {};
    triggersThisWeek.forEach((t) => {
      if (!copingStats[t.copingMethod])
        copingStats[t.copingMethod] = { total: 0, resisted: 0 };
      copingStats[t.copingMethod].total++;
      if (t.resisted) copingStats[t.copingMethod].resisted++;
    });
    const sortedCoping = Object.entries(copingStats)
      .map(([k, v]) => ({
        method: k,
        rate: Math.round((v.resisted / v.total) * 100),
        total: v.total,
      }))
      .sort((a, b) => b.rate - a.rate);
    const topCoping = sortedCoping[0] || null;

    return { topCat, topTod, topCoping };
  }, [triggersThisWeek]);

  const heatMap = useMemo(() => {
    const days: { date: Date; count: number; label: string }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const dayStr = d.toDateString();
      const count = triggers.filter(
        (t) => new Date(t.createdAt).toDateString() === dayStr
      ).length;
      days.push({
        date: d,
        count,
        label: d.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "short",
        }),
      });
    }
    return days;
  }, [triggers]);

  const aiInsightText = useMemo(() => {
    if (!insights || !insights.topCat || !insights.topTod) {
      return t("triggersInsightsEmpty");
    }
    const catMeta = CATEGORY_META[insights.topCat.category];
    const hourSuggestion =
      insights.topTod.key === "evening"
        ? "19h"
        : insights.topTod.key === "morning"
          ? "7h"
          : insights.topTod.key === "afternoon"
            ? "13h"
            : "22h";
    const coping = insights.topCoping?.method ?? t("triggersCopingMeditation");
    return t("triggersInsightTopCat", { cat: t(catMeta.labelKey), pct: insights.topCat.pct }) + " " + t("triggersInsightTopTod", { time: t(insights.topTod.labelKey) }) + " • " + coping + " @ " + hourSuggestion;
  }, [insights, t]);

  // ---------- Handlers ----------

  const resetForm = () => {
    setCategory(null);
    setIntensity(3);
    setSituation("");
    setCopingMethod(COPING_METHODS[0].key);
    setResisted(true);
  };

  const openModal = () => {
    sound.playClick();
    haptics.light();
    resetForm();
    setModalOpen(true);
  };

  const closeModal = () => {
    sound.playClick();
    haptics.light();
    setModalOpen(false);
  };

  const handleCategorySelect = (c: TriggerCategory) => {
    sound.playPop();
    haptics.selection();
    setCategory(c);
  };

  const handleCopingSelect = (m: string) => {
    sound.playPop();
    haptics.selection();
    setCopingMethod(m);
  };

  const handleResistedChange = (v: boolean) => {
    sound.playClick();
    haptics.light();
    setResisted(v);
  };

  const handleSave = () => {
    if (!category || situation.trim().length < 5) {
      sound.playError();
      haptics.error();
      toast.error(t("triggersEmptyDesc"), {
        description: t("triggersEmptyDesc"),
      });
      return;
    }
    addTrigger({
      category,
      intensity,
      situation: situation.trim().slice(0, 280),
      copingMethod,
      resisted,
    });
    sound.playSuccess();
    haptics.success();
    toast.success(t("triggersSaveBtn"), {
      description: t("triggersFooterQuote"),
      duration: 3000,
    });
    setModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirmingId === id) {
      deleteTrigger(id);
      sound.playWhoosh();
      haptics.medium();
      toast.success(t("triggersEmptyTitle"));
      setConfirmingId(null);
    } else {
      sound.playClick();
      haptics.light();
      setConfirmingId(id);
      // Auto-clear confirm state after 3s if no further action
      setTimeout(() => {
        setConfirmingId((curr) => (curr === id ? null : curr));
      }, 3000);
    }
  };

  const handleAskAtlas = () => {
    sound.playClick();
    haptics.light();
    navigate("atlas");
  };

  const handlePremiumCta = () => {
    sound.playClick();
    haptics.light();
    navigate("paywall");
  };

  const handleBack = () => {
    sound.playClick();
    haptics.light();
    navigate("dashboard");
  };

  const handleTabChange = (id: FilterTabId) => {
    sound.playClick();
    haptics.selection();
    setFilterTab(id);
  };

  const situationValid = situation.trim().length >= 5;
  const canSave = category !== null && situationValid;

  // ---------- Render ----------

  return (
    <div className="min-h-screen px-5 pt-12 pb-8">
      {/* ---------- Header ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 mb-5 px-1"
      >
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center btn-press focus-ring"
          aria-label={t("backToDashboard")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight leading-tight">
            {t("triggersTitle")}
          </h1>
          <p className="text-white/50 text-xs">{t("triggersSubtitle")}</p>
        </div>
        <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <ScanSearch size={18} className="text-[#FF6B6B]" />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* ---------- Hero Stats Card ---------- */}
        <motion.div
          variants={itemVariants}
          className="glass-card-strong p-5 animate-glow-pulse"
        >
          <div className="grid grid-cols-3 gap-3">
            <StatBlock
              icon={Activity}
              color="#FF3B30"
              label={t("triggersThisWeek")}
              value={<CountUp value={triggersThisWeek.length} />}
            />
            <StatBlock
              icon={TrendingUp}
              color="#FF9500"
              label={topCategory ? t(CATEGORY_META[topCategory.category].labelKey) : t("triggersTopCat")}
              value={
                topCategory ? (
                  <span className="text-2xl">{topCategory.count}</span>
                ) : (
                  <span className="text-2xl text-white/30">—</span>
                )
              }
            />
            <StatBlock
              icon={Shield}
              color="#4ADE80"
              label={t("triggersResistance")}
              value={<CountUp value={resistanceRate} suffix="%" />}
            />
          </div>
        </motion.div>

        {/* ---------- Add Trigger CTA ---------- */}
        <motion.button
          variants={itemVariants}
          whileTap={{ scale: 0.97 }}
          onClick={openModal}
          className="w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold flex items-center justify-center gap-2 glow-green btn-press"
        >
          <Plus size={20} />
          {t("triggersReport")}
        </motion.button>

        {/* ---------- Filter Tabs ---------- */}
        <motion.div
          variants={itemVariants}
          className="flex gap-2 overflow-x-auto no-scrollbar pb-1"
        >
          {FILTER_TABS.map((tab) => {
            const count = filterCounts.find((c) => c.id === tab.id)?.count ?? 0;
            const active = filterTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all btn-press whitespace-nowrap ${
                  active
                    ? "gradient-primary text-white glow-green"
                    : "glass-card text-white/60"
                }`}
              >
                {tab.labelKey ? t(tab.labelKey) : ""}
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ---------- Triggers History List ---------- */}
        <motion.div variants={itemVariants}>
          {filteredTriggers.length === 0 ? (
            triggers.length === 0 ? (
              <EmptyState
                variant="default"
                title={t("triggersEmptyTitle")}
                description={t("triggersEmptyDesc")}
                ctaLabel={t("triggersEmptyCta")}
                onCta={openModal}
              />
            ) : (
              <div className="glass-card p-6 text-center">
                <p className="text-white/60 text-sm">
                  {t("triggersNoPeriod")}
                </p>
                <p className="text-white/40 text-xs mt-1">
                  {t("triggersNoPeriodHint")}
                </p>
              </div>
            )
          ) : (
            <div className="max-h-96 overflow-y-auto custom-scroll space-y-3 pr-1">
              {filteredTriggers.map((trig, idx) => {
                const meta = CATEGORY_META[trig.category];
                const Icon = meta.icon;
                const isConfirming = confirmingId === trig.id;
                return (
                  <motion.div
                    key={trig.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: Math.min(idx * 0.03, 0.3),
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className="relative glass-card card-hover overflow-hidden"
                    style={{ borderLeft: `4px solid ${meta.color}` }}
                  >
                    <div className="p-4">
                      {/* Top row */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${meta.color}20` }}
                          >
                            <Icon size={16} style={{ color: meta.color }} />
                          </div>
                          <div>
                            <span className="text-white font-semibold text-sm block">
                              {t(meta.labelKey)}
                            </span>
                            <span className="text-white/40 text-[11px]">
                              {formatRelativeTime(trig.createdAt, t)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(trig.id)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all btn-press ${
                            isConfirming
                              ? "bg-[#FF3B30] text-white"
                              : "text-white/30 hover:text-[#FF3B30]"
                          }`}
                          aria-label={
                            isConfirming
                              ? t("triggersAriaDeleteConfirm")
                              : t("triggersAriaDelete")
                          }
                        >
                          {isConfirming ? (
                            <>
                              <Check size={12} />
                              {t("triggersConfirmDelete")}
                            </>
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>

                      {/* Intensity */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-white/40 text-[11px] mr-1">
                          {t("triggersFieldIntensity")}
                        </span>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{
                              background:
                                i < trig.intensity
                                  ? intensityColor(trig.intensity)
                                  : "rgba(255,255,255,0.1)",
                              boxShadow:
                                i < trig.intensity
                                  ? `0 0 6px ${intensityColor(trig.intensity)}80`
                                  : "none",
                            }}
                          />
                        ))}
                      </div>

                      {/* Situation */}
                      <p className="text-white/70 text-sm italic line-clamp-2 mb-2">
                        “{trig.situation}”
                      </p>

                      {/* Chips */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full glass-pill text-white/70 text-[11px]">
                          {(() => {
                            const found = COPING_METHODS.find((m) => m.key === trig.copingMethod);
                            return found ? t(found.key) : trig.copingMethod;
                          })()}
                        </span>
                        {trig.resisted ? (
                          <span
                            className="px-2 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1"
                            style={{
                              background: "rgba(74,222,128,0.15)",
                              color: "#4ADE80",
                            }}
                          >
                            <Check size={10} /> {t("triggersResisted")}
                          </span>
                        ) : (
                          <span
                            className="px-2 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1"
                            style={{
                              background: "rgba(255,59,48,0.15)",
                              color: "#FF3B30",
                            }}
                          >
                            <X size={10} /> {t("triggersSuccumbed")}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* ---------- Pattern Insights Card ---------- */}
        <motion.div variants={itemVariants} className="glass-card-strong gradient-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(191,90,242,0.15)" }}
            >
              <Sparkles size={16} className="text-[#BF5AF2]" />
            </div>
            <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
              {t("triggersInsightsTitle")}
            </h3>
          </div>
          {insights ? (
            <div className="space-y-3">
              {insights.topCat && (
                <InsightRow
                  icon={CATEGORY_META[insights.topCat.category].icon}
                  color={CATEGORY_META[insights.topCat.category].color}
                  text={t("triggersInsightTopCat", { cat: t(CATEGORY_META[insights.topCat.category].labelKey), pct: insights.topCat.pct })}
                />
              )}
              {insights.topTod && (
                <InsightRow
                  icon={Clock}
                  color="#FF9500"
                  text={t("triggersInsightTopTod", { time: t(insights.topTod.labelKey) })}
                />
              )}
              {insights.topCoping && (
                <InsightRow
                  icon={TrendingUp}
                  color="#4ADE80"
                  text={t("triggersInsightTopCoping", { method: insights.topCoping.method, rate: insights.topCoping.rate })}
                />
              )}
            </div>
          ) : (
            <p className="text-white/40 text-xs italic">
              {t("triggersInsightsEmpty")}
            </p>
          )}
        </motion.div>

        {/* ---------- Heat Map Calendar ---------- */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-[#FF6B6B]" />
            <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
              {t("triggersHeatmapTitle")}
            </h3>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {heatMap.map((day) => {
              const count = day.count;
              const bg =
                count === 0
                  ? "rgba(255,255,255,0.05)"
                  : count <= 2
                    ? "rgba(255,59,48,0.3)"
                    : count <= 4
                      ? "rgba(255,149,0,0.6)"
                      : "rgba(255,59,48,0.95)";
              return (
                <div
                  key={day.date.toISOString()}
                  title={`${day.label} • ${count} déclencheur${count !== 1 ? "s" : ""}`}
                  className="aspect-square rounded-md flex items-center justify-center text-[9px] font-medium transition-transform hover:scale-110"
                  style={{
                    background: bg,
                    color: count > 2 ? "white" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {count > 0 ? count : ""}
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="text-white/40 text-[10px]">{t("triggersHeatmapLegendLess")}</span>
            <div
              className="w-3 h-3 rounded"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
            <div
              className="w-3 h-3 rounded"
              style={{ background: "rgba(255,59,48,0.3)" }}
            />
            <div
              className="w-3 h-3 rounded"
              style={{ background: "rgba(255,149,0,0.6)" }}
            />
            <div
              className="w-3 h-3 rounded"
              style={{ background: "rgba(255,59,48,0.95)" }}
            />
            <span className="text-white/40 text-[10px]">{t("triggersHeatmapLegendMore")}</span>
          </div>
        </motion.div>

        {/* ---------- AI Insight Card (Premium) ---------- */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-3xl p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(191,90,242,0.18) 0%, rgba(255,45,85,0.18) 100%)",
            border: "1px solid rgba(191,90,242,0.3)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(191,90,242,0.25)" }}
            >
              <Bot size={16} className="text-[#BF5AF2]" />
            </div>
            <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
              {t("triggersAtlasTitle")}
            </h3>
            {!isPremium && (
              <span
                className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: "rgba(255,149,0,0.2)", color: "#FF9500" }}
              >
                <Lock size={10} /> {t("premium")}
              </span>
            )}
          </div>

          {isPremium ? (
            <>
              <p className="text-white/85 text-sm leading-relaxed mb-4">
                {aiInsightText}
              </p>
              <button
                onClick={handleAskAtlas}
                className="w-full py-3 rounded-2xl text-white font-medium text-sm flex items-center justify-center gap-2 btn-press"
                style={{
                  background: "linear-gradient(135deg, #BF5AF2 0%, #FF2D55 100%)",
                }}
              >
                <Bot size={16} />
                {t("triggersAtlasAsk")}
              </button>
            </>
          ) : (
            <>
              <div className="relative">
                <p className="text-white/40 text-sm leading-relaxed blur-sm select-none">
                  {t("triggersAtlasBlurb")}
                </p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Lock size={20} className="text-white/60 mx-auto mb-1" />
                    <p className="text-white/60 text-xs">{t("triggersAtlasLocked")}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePremiumCta}
                className="w-full mt-4 py-3 rounded-2xl text-white font-medium text-sm flex items-center justify-center gap-2 btn-press"
                style={{
                  background: "linear-gradient(135deg, #FF9500 0%, #FF3B30 100%)",
                }}
              >
                <Lock size={14} />
                {t("triggersPremiumCta")}
              </button>
            </>
          )}
        </motion.div>

        {/* ---------- Footer Encouragement Card ---------- */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-5 flex items-start gap-3"
        >
          <Quote size={20} className="text-[#FF9500] flex-shrink-0 mt-0.5" />
          <p className="text-white/70 text-sm italic font-[family-name:var(--font-poppins)] leading-relaxed">
            {t("triggersFooterQuote")}
          </p>
        </motion.div>
      </motion.div>

      {/* ---------- Add Trigger Bottom-Sheet Modal ---------- */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={t("triggersReport")}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-5 max-w-[430px] w-full rounded-t-3xl safe-bottom max-h-[92vh] overflow-y-auto custom-scroll"
            >
              {/* Title row */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)]">
                  {t("triggersModalTitle")}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-white/50 text-sm"
                  aria-label={t("cancel")}
                >
                  {t("cancel")}
                </button>
              </div>

              {/* Category selector */}
              <label className="text-white/60 text-xs mb-2 block">
                {t("triggersFieldCategory")}
              </label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {(Object.keys(CATEGORY_META) as TriggerCategory[]).map((c) => {
                  const meta = CATEGORY_META[c];
                  const Icon = meta.icon;
                  const active = category === c;
                  return (
                    <button
                      key={c}
                      onClick={() => handleCategorySelect(c)}
                      className={`flex items-center gap-2 p-3 rounded-2xl text-left transition-all border btn-press ${
                        active
                          ? "gradient-primary text-white border-transparent glow-green"
                          : "glass-card text-white/70 border-transparent"
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-xs font-medium">{t(meta.labelKey)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Intensity slider */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white/60 text-xs">{t("triggersFieldIntensity")}</label>
                  <span
                    className="text-2xl font-bold font-[family-name:var(--font-poppins)]"
                    style={{ color: intensityColor(intensity) }}
                  >
                    {intensity}
                  </span>
                </div>
                <Slider
                  value={[intensity]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(v) => {
                    setIntensity(v[0]);
                    haptics.selection();
                  }}
                  className="w-full"
                />
                <div className="flex items-center justify-between mt-2 text-[10px] text-white/40">
                  <span>{t("triggersIntensityLow")}</span>
                  <span>{t("triggersIntensityHigh")}</span>
                </div>
              </div>

              {/* Situation */}
              <label className="text-white/60 text-xs mb-2 block">
                {t("triggersFieldSituation")}
              </label>
              <Textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value.slice(0, 280))}
                placeholder={t("triggersFieldSituationPlaceholder")}
                rows={3}
                className="bg-white/5 border-white/10 text-white text-sm placeholder-white/30 focus-visible:border-[#10B981] resize-none mb-1 min-h-[80px]"
              />
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[11px] ${
                    situationValid ? "text-white/40" : "text-[#FF9500]"
                  }`}
                >
                  {situationValid
                    ? t("confirm")
                    : t("triggersSituationMin", { n: Math.max(0, 5 - situation.trim().length) })}
                </span>
                <span className="text-white/40 text-[11px]">
                  {situation.length}/280
                </span>
              </div>

              {/* Coping method chips */}
              <label className="text-white/60 text-xs mb-2 block">
                {t("triggersFieldCoping")}
              </label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
                {COPING_METHODS.map((m) => {
                  const active = copingMethod === m.key;
                  return (
                    <button
                      key={m.key}
                      onClick={() => handleCopingSelect(m.key)}
                      className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium transition-all border btn-press ${
                        active
                          ? "gradient-primary text-white border-transparent"
                          : "glass-pill text-white/60 border-transparent"
                      }`}
                    >
                      {t(m.key)}
                    </button>
                  );
                })}
              </div>

              {/* Resisted toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl glass-card mb-4">
                <div className="flex items-center gap-2">
                  {resisted ? (
                    <Check size={16} className="text-[#4ADE80]" />
                  ) : (
                    <X size={16} className="text-[#FF3B30]" />
                  )}
                  <span className="text-white text-sm">
                    {t("triggersResistedToggle")}
                  </span>
                </div>
                <Switch
                  checked={resisted}
                  onCheckedChange={handleResistedChange}
                  aria-label={t("triggersResistedToggle")}
                />
              </div>

              {/* Save button */}
              <button
                onClick={handleSave}
                disabled={!canSave}
                className={`w-full py-4 rounded-2xl font-[family-name:var(--font-poppins)] font-semibold text-base transition-all btn-press ${
                  canSave
                    ? "gradient-primary text-white glow-green"
                    : "bg-white/5 text-white/30"
                }`}
              >
                {t("triggersSaveBtn")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Sub-components ----------

function StatBlock({
  icon: Icon,
  color,
  label,
  value,
}: {
  icon: LucideIcon;
  color: string;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-1.5"
        style={{ background: `${color}20` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)] leading-tight">
        {value}
      </div>
      <div className="text-white/50 text-[10px] leading-tight mt-0.5 line-clamp-2">
        {label}
      </div>
    </div>
  );
}

function InsightRow({
  icon: Icon,
  color,
  text,
}: {
  icon: LucideIcon;
  color: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}20` }}
      >
        <Icon size={14} style={{ color }} />
      </div>
      <p className="text-white/80 text-xs leading-relaxed">{text}</p>
    </div>
  );
}
