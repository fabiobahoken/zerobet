"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Crown,
  Flame,
  Globe,
  Info,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import type { BlockedSite } from "@/store/zerobet-store";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type CategoryKey = "international" | "africa" | "crypto" | "france" | "other";
type CategoryFilter = CategoryKey | "all";

interface CategoryMeta {
  key: CategoryFilter;
  labelKey: string;
  icon: typeof Globe;
  color: string;
}

const CATEGORIES: CategoryMeta[] = [
  { key: "all", labelKey: "blockerCategoryAll", icon: Globe, color: "#9CA3AF" },
  { key: "international", labelKey: "blockerCategoryIntl", icon: Globe, color: "#FFB020" },
  { key: "africa", labelKey: "blockerCategoryAfrica", icon: Globe, color: "#F59E0B" },
  { key: "crypto", labelKey: "blockerCategoryCrypto", icon: Globe, color: "#FFD166" },
  { key: "france", labelKey: "blockerCategoryFrance", icon: Globe, color: "#FFC94D" },
  { key: "other", labelKey: "blockerCategoryOther", icon: Globe, color: "#FBBF24" },
];

const DANGEROUS_SITES = [
  { id: "s1", name: "1xBet", emoji: "🔴", color: "#FF3B30" },
  { id: "s2", name: "Bet365", emoji: "🟡", color: "#FBBF24" },
  { id: "s11", name: "Betika", emoji: "🟢", color: "#FFC94D" },
  { id: "s13", name: "Melbet", emoji: "🟣", color: "#FFD166" },
  { id: "s27", name: "PMU", emoji: "🔵", color: "#FFB020" },
];

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatCountdown(iso: string | null): string {
  if (!iso) return "";
  const target = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function BlockerScreen() {
  const t = useT();
  const {
    navigate,
    plan,
    blockedSites,
    toggleSiteBlock,
    toggleAllSites,
    addCustomSite,
    blockerEnabled,
    setBlockerEnabled,
    strictMode,
    setStrictMode,
    strictUntil,
    activateStrictMode,
    streakDays,
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [customUrl, setCustomUrl] = useState("");
  // Tick state used only to trigger re-renders for the live countdown display.
  const [tick, setTick] = useState(0);

  // Live countdown tick for strict mode
  useEffect(() => {
    if (!strictMode || !strictUntil) return;
    const interval = setInterval(() => setTick((t) => (t + 1) % 1_000_000), 1000);
    return () => clearInterval(interval);
  }, [strictMode, strictUntil]);

  // Derived countdown string (recomputed on every render thanks to the tick).
  const countdown =
    strictMode && strictUntil ? formatCountdown(strictUntil) : "";
  void tick;

  const isPremiumLocked = plan === "free";

  const blockedCount = useMemo(
    () => blockedSites.filter((s) => s.blocked).length,
    [blockedSites]
  );
  const totalCount = blockedSites.length;

  const bypassAttempts = useMemo(
    () => Math.max(streakDays * 3, 1),
    [streakDays]
  );

  const groupedSites = useMemo(() => {
    const groups: Record<CategoryKey, BlockedSite[]> = {
      international: [],
      africa: [],
      crypto: [],
      france: [],
      other: [],
    };
    blockedSites.forEach((site) => {
      groups[site.category].push(site);
    });
    return groups;
  }, [blockedSites]);

  const visibleCategories: CategoryMeta[] = useMemo(() => {
    if (activeCategory === "all") {
      return CATEGORIES.filter((c) => c.key !== "all" && groupedSites[c.key as CategoryKey]?.length > 0);
    }
    return CATEGORIES.filter((c) => c.key === activeCategory);
  }, [activeCategory, groupedSites]);

  const handleStrictToggle = (next: boolean) => {
    if (next) {
      activateStrictMode();
    } else {
      setStrictMode(false);
    }
  };

  const handleAddCustomSite = () => {
    const trimmed = customUrl.trim();
    if (!trimmed) return;
    // Basic URL cleanup
    const cleanUrl = trimmed.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const name = cleanUrl.split(".")[0]?.charAt(0).toUpperCase() + cleanUrl.split(".")[0]?.slice(1) || cleanUrl;
    addCustomSite(cleanUrl, name);
    setCustomUrl("");
    toast.success(t("blockerSiteAdded"), {
      description: t("blockerSiteAddedDesc", { name }),
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
  };

  return (
    <div className="min-h-screen px-5 pt-12 pb-10 safe-bottom">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-5"
      >
        <button
          onClick={() => navigate("dashboard")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight">
            {t("blockerTitle")}
          </h1>
          <p className="text-white/40 text-[11px]">{t("blockerProtection247")}</p>
        </div>
        <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <Shield size={18} className={blockerEnabled ? "text-[#FFC94D]" : "text-[#FF3B30]"} />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* Protection active banner */}
        <AnimatePresence>
          {blockerEnabled && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative overflow-hidden rounded-2xl p-3.5 flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, rgba(255,201,77,0.2) 0%, rgba(255,201,77,0.05) 100%)",
                border: "1px solid rgba(255,201,77,0.3)",
              }}
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#FFC94D]/15 blur-2xl" />
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 rounded-xl bg-[#FFC94D]/20 flex items-center justify-center flex-shrink-0"
              >
                <ShieldCheck size={20} className="text-[#FFC94D]" />
              </motion.div>
              <div className="relative flex-1">
                <p className="text-sm font-bold text-[#FFC94D] font-[family-name:var(--font-poppins)]">
                  {t("blockerProtectionActive")}
                </p>
                <p className="text-[11px] text-white/60">
                  {t("blockerAllSitesBlocked")}
                </p>
              </div>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#FFC94D]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info card: How it works */}
        <motion.div variants={itemVariants} className="glass-card p-4 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#FBBF24]/10 blur-3xl" />
          <div className="relative flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FBBF24]/20 flex items-center justify-center flex-shrink-0">
              <Info size={18} className="text-[#FBBF24]" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm mb-1">{t("blockerHowItWorks")}</h3>
              <p className="text-white/60 text-xs leading-relaxed">
                {t("blockerHowItWorksDesc")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Master toggle card with enhanced animation */}
        <motion.div
          variants={itemVariants}
          className={`relative glass-card-strong p-6 overflow-hidden transition-all duration-700 ${
            blockerEnabled ? "glow-green" : "glow-red"
          }`}
        >
          <motion.div
            animate={{
              scale: blockerEnabled ? [1, 1.05, 1] : [1, 1.03, 1],
              opacity: blockerEnabled ? [0.25, 0.4, 0.25] : [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl ${
              blockerEnabled ? "bg-[#FFC94D]" : "bg-[#FF3B30]"
            }`}
          />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  scale: blockerEnabled ? [1, 1.1, 1] : 1,
                  rotate: blockerEnabled ? [0, 5, -5, 0] : 0,
                }}
                transition={{ duration: 1.5, repeat: blockerEnabled ? Infinity : 0 }}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                  blockerEnabled ? "gradient-success" : "gradient-primary"
                }`}
              >
                {blockerEnabled ? (
                  <ShieldCheck size={32} className="text-white" />
                ) : (
                  <ShieldAlert size={32} className="text-white" />
                )}
              </motion.div>
              <div>
                <p className="text-white/50 text-xs mb-0.5">{t("blockerStatus")}</p>
                <p className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
                  {blockerEnabled ? t("blockerProtected") : t("blockerInactive")}
                </p>
                <p className={`text-xs mt-0.5 ${blockerEnabled ? "text-[#FFC94D]" : "text-[#FF3B30]"}`}>
                  {blockerEnabled ? t("blockerSitesBlockedStatus") : t("blockerVulnerable")}
                </p>
              </div>
            </div>
            <motion.div
              animate={{ scale: blockerEnabled ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Switch
                checked={blockerEnabled}
                onCheckedChange={(v) => setBlockerEnabled(v)}
                className="data-[state=checked]:bg-[#FFC94D] data-[state=unchecked]:bg-[#FF3B30]/40"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats + Strict Mode row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Stats card */}
          <motion.div variants={itemVariants} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-[#FFC94D]/20 flex items-center justify-center">
                <ShieldCheck size={16} className="text-[#FFC94D]" />
              </div>
              <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
                {t("blockerBlocked")}
              </span>
            </div>
            <p className="text-2xl font-extrabold text-white font-[family-name:var(--font-poppins)]">
              {blockedCount}
              <span className="text-white/40 text-sm font-normal">/{totalCount}</span>
            </p>
            <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-success"
                initial={{ width: 0 }}
                animate={{ width: `${totalCount > 0 ? (blockedCount / totalCount) * 100 : 0}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Strict mode card */}
          <motion.div
            variants={itemVariants}
            className={`relative glass-card p-4 overflow-hidden ${
              strictMode ? "border-[#FF3B30]/40" : ""
            }`}
          >
            <div
              className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl transition-opacity ${
                strictMode ? "bg-[#FF3B30]/30 opacity-100" : "bg-[#FF3B30]/10 opacity-50"
              }`}
            />
            <div className="relative flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-[#FF3B30]/20 flex items-center justify-center">
                <Flame size={16} className="text-[#FF3B30]" />
              </div>
              <Switch
                checked={strictMode}
                onCheckedChange={handleStrictToggle}
                disabled={isPremiumLocked}
                className="data-[state=checked]:bg-[#FF6B00]"
              />
            </div>
            <p className="text-sm font-bold text-white">{t("blockerStrictModeShort")}</p>
            <p className="text-[11px] text-white/50">{t("blockerStrict72h")}</p>
            {strictMode && countdown && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-mono font-bold text-[#FF3B30] mt-1 tabular-nums"
              >
                {countdown}
              </motion.p>
            )}
            {isPremiumLocked && (
              <p className="text-[10px] text-[#FBBF24] mt-1 flex items-center gap-1">
                <Crown size={9} /> {t("premium")}
              </p>
            )}
          </motion.div>
        </div>

        {/* Bypass attempts stats card */}
        <motion.div variants={itemVariants} className="glass-card p-4 relative overflow-hidden">
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#FFD166]/15 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD166]/20 flex items-center justify-center flex-shrink-0">
              <BarChart3 size={18} className="text-[#FFD166]" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">{t("blockerBypassAttempts")}</p>
              <p className="text-white/50 text-xs">{t("blockerBypassAttemptsDesc")}</p>
            </div>
            <motion.p
              key={bypassAttempts}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-extrabold text-[#FFD166] font-[family-name:var(--font-poppins)]"
            >
              {bypassAttempts}
            </motion.p>
          </div>
        </motion.div>

        {/* Strict mode active banner */}
        <AnimatePresence>
          {strictMode && countdown && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card p-3 border border-[#FF3B30]/30 flex items-center gap-3"
            >
              <AlertTriangle size={16} className="text-[#FF3B30] flex-shrink-0" />
              <p className="text-xs text-white/80 flex-1">
                {t("blockerStrictActiveBanner")}
              </p>
              <span className="text-xs font-mono font-bold text-[#FF3B30] tabular-nums">
                {countdown}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Most dangerous sites section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-[#FF3B30]" />
            <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
              {t("blockerMostDangerous")}
            </h3>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {DANGEROUS_SITES.map((ds) => {
              const site = blockedSites.find((s) => s.id === ds.id);
              const isBlocked = site?.blocked ?? true;
              return (
                <motion.div
                  key={ds.id}
                  layout
                  className="flex-shrink-0 w-[90px] relative overflow-hidden rounded-2xl p-3 flex flex-col items-center gap-2"
                  style={{
                    background: isBlocked
                      ? `linear-gradient(180deg, ${ds.color}20 0%, ${ds.color}08 100%)`
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isBlocked ? ds.color + "40" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <span className="text-2xl">{ds.emoji}</span>
                  <span className={`text-[11px] font-semibold ${isBlocked ? "text-white" : "text-white/40"}`}>
                    {ds.name}
                  </span>
                  {isBlocked && (
                    <Lock size={10} className="text-white/30" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bulk actions */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          <button
            onClick={() => toggleAllSites(true)}
            className="glass-card p-3 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Lock size={14} className="text-[#FFC94D]" />
            <span className="text-sm font-medium text-white">{t("blockerBlockAll")}</span>
          </button>
          <button
            onClick={() => toggleAllSites(false)}
            className="glass-card p-3 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <XCircle size={14} className="text-[#FF3B30]" />
            <span className="text-sm font-medium text-white">{t("blockerUnblockAll")}</span>
          </button>
        </motion.div>

        {/* Category filter tabs with AnimatePresence */}
        <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.key}
                layout
                onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "glass-card-strong text-white"
                    : "glass-card text-white/60"
                }`}
                style={isActive ? { boxShadow: `0 0 20px ${cat.color}40` } : undefined}
              >
                <Icon size={12} style={{ color: cat.color }} />
                {t(cat.labelKey)}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Sites list grouped by category with AnimatePresence transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {visibleCategories.map((cat) => {
              const sites = groupedSites[cat.key as CategoryKey] ?? [];
              if (sites.length === 0) return null;
              const Icon = cat.icon;
              return (
                <div key={cat.key} className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${cat.color}25` }}
                      >
                        <Icon size={14} style={{ color: cat.color }} />
                      </div>
                      <h3 className="text-sm font-semibold text-white">{t(cat.labelKey)}</h3>
                    </div>
                    <span className="text-[10px] text-white/40 font-medium">
                      {sites.filter((s) => s.blocked).length}/{sites.length}
                    </span>
                  </div>
                  <div className="space-y-1.5 max-h-72 overflow-y-auto custom-scroll pr-1">
                    {sites.map((site) => (
                      <SiteRow
                        key={site.id}
                        site={site}
                        onToggle={() => toggleSiteBlock(site.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Add custom site section */}
        <motion.div variants={itemVariants} className="glass-card p-4 relative overflow-hidden">
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#FBBF24]/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#FBBF24]/20 flex items-center justify-center">
                <Plus size={14} className="text-[#FBBF24]" />
              </div>
              <h3 className="text-white font-semibold text-sm">{t("blockerAddSite")}</h3>
            </div>
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAddCustomSite(); }}
                placeholder={t("blockerSiteUrlPlaceholder")}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FBBF24]/50 transition-colors"
              />
              <button
                onClick={handleAddCustomSite}
                disabled={!customUrl.trim()}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                  customUrl.trim()
                    ? "bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/30"
                    : "bg-white/5 text-white/20 border border-transparent"
                }`}
              >
                {t("blockerAddButton")}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer reassurance */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-4 flex items-center gap-3"
        >
          <CheckCircle2 size={18} className="text-[#FFC94D] flex-shrink-0" />
          <p className="text-xs text-white/60 leading-relaxed">
            {t("blockerFooterReassurance")}
          </p>
        </motion.div>
      </motion.div>

      {/* Premium gating overlay */}
      <AnimatePresence>
        {isPremiumLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-md p-5"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="glass-card-strong p-7 w-full max-w-sm text-center relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#FBBF24]/20 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-[#FF3B30]/15 blur-3xl" />

              <div className="relative">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 rounded-3xl gradient-primary mx-auto flex items-center justify-center mb-4 glow-green"
                >
                  <Lock size={36} className="text-white" />
                </motion.div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBBF24]/15 border border-[#FBBF24]/30 mb-3">
                  <Crown size={12} className="text-[#FBBF24]" />
                  <span className="text-[10px] font-bold text-[#FBBF24] uppercase tracking-wider">
                    {t("blockerPremiumFeature")}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-2">
                  {t("blockerTitle")}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {t("blockerPremiumDesc")}
                </p>

                <ul className="text-left space-y-2 mb-6">
                  {[
                    t("blockerPremiumFeature1"),
                    t("blockerPremiumFeature2"),
                    t("blockerPremiumFeature3"),
                    t("blockerPremiumFeature4"),
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-white/70">
                      <CheckCircle2 size={14} className="text-[#FFC94D] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate("paywall")}
                  className="w-full py-3.5 rounded-2xl gradient-primary text-white font-bold text-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                  <Crown size={16} />
                  {t("blockerUnlockWithPremium")}
                </button>
                <button
                  onClick={() => navigate("dashboard")}
                  className="w-full py-2.5 mt-2 text-white/50 text-xs hover:text-white/70 transition-colors"
                >
                  {t("blockerLater")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SiteRowProps {
  site: BlockedSite;
  onToggle: () => void;
}

function SiteRow({ site, onToggle }: SiteRowProps) {
  return (
    <motion.div
      layout
      className="flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-white/[0.03] transition-colors"
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <motion.div
          layout
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
            site.blocked ? "bg-[#FFC94D]/15" : "bg-white/5"
          }`}
        >
          {site.blocked ? (
            <Lock size={13} className="text-[#FFC94D]" />
          ) : (
            <Globe size={13} className="text-white/40" />
          )}
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-medium truncate ${site.blocked ? "text-white" : "text-white/50"}`}>
            {site.name}
          </p>
          <p className="text-[10px] text-white/30 truncate">{site.url}</p>
        </div>
      </div>
      <Switch
        checked={site.blocked}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-[#FFC94D] data-[state=unchecked]:bg-white/10"
      />
    </motion.div>
  );
}

export default BlockerScreen;
