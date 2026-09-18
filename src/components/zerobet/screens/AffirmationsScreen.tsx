"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Sparkles,
  Calendar,
  Heart,
  Share2,
  RefreshCw,
  Plus,
  X,
  Trash2,
  Bell,
  Lightbulb,
  Quote,
  Lock,
  Check,
  Volume2,
  Wind,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { useStore, type Affirmation, type AffirmationCategory } from "@/store/zerobet-store";
import { useT, useLanguage } from "@/lib/i18n/useT";
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  SEED_AFFIRMATIONS,
  getDailyAffirmation,
  getRandomAffirmation,
} from "@/lib/data/affirmations-data";
import { EmptyState } from "@/components/zerobet/components/EmptyState";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { toast } from "sonner";
import { containerVariants, itemVariants } from "@/lib/animations";

/* ========================================================================
   Helpers
   ======================================================================== */

type FilterCat = AffirmationCategory | "all";

/** Returns a localized long-form date like "Jeudi 18 juin". */
function formatDate(date: Date, lang: "fr" | "en" | "es"): string {
  const locale =
    lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "fr-FR";
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
      .format(date)
      .replace(/^\w/, (c) => c.toUpperCase());
  } catch {
    return date.toLocaleDateString();
  }
}

/** Merge seed + custom affirmations. Custom first so users see their own on top. */
function mergeAffirmations(
  seed: Affirmation[],
  custom: Affirmation[]
): Affirmation[] {
  return [...custom, ...seed];
}

/** Filter by active category. */
function filterAffirmations(
  list: Affirmation[],
  cat: FilterCat
): Affirmation[] {
  if (cat === "all") return list;
  return list.filter((a) => a.category === cat);
}

/** Share text + clipboard fallback. */
async function shareAffirmation(aff: Affirmation, t: (key: string) => string): Promise<void> {
  const meta = CATEGORY_META[aff.category];
  const text = `"${t(aff.textKey)}"\n\n${meta.emoji} · Zerobet`;
  try {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      await navigator.share({
        title: "Zerobet — Affirmation",
        text,
      });
      return;
    }
  } catch {
    /* fall through to clipboard */
  }
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(text);
      toast.success(t("affirmationsToastCopied"));
      return;
    }
  } catch {
    /* noop */
  }
  toast.error(t("affirmationsToastShareErr"));
}

/* ========================================================================
   Sub-components
   ======================================================================== */

function CategoryBadge({
  category,
  size = "md",
}: {
  category: AffirmationCategory;
  size?: "sm" | "md";
}) {
  const t = useT();
  const meta = CATEGORY_META[category];
  const labelKey =
    category === "morning"
      ? "affirmationsCatMorning"
      : category === "crisis"
      ? "affirmationsCatCrisis"
      : category === "self-worth"
      ? "affirmationsCatSelfWorth"
      : category === "future"
      ? "affirmationsCatFuture"
      : category === "gratitude"
      ? "affirmationsCatGratitude"
      : "affirmationsCatStrength";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
      }`}
      style={{
        background: `${meta.color}22`,
        color: meta.color,
        border: `1px solid ${meta.color}55`,
      }}
    >
      <span aria-hidden>{meta.emoji}</span>
      {t(labelKey)}
    </span>
  );
}

function FilterPill({
  label,
  emoji,
  count,
  active,
  color,
  onClick,
}: {
  label: string;
  emoji?: string;
  count: number;
  active: boolean;
  color?: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`relative shrink-0 px-3.5 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
        active
          ? "text-white"
          : "glass-pill text-white/60 hover:text-white/80"
      }`}
      style={
        active && color
          ? {
              background: color,
              boxShadow: `0 0 24px ${color}66, 0 0 48px ${color}33`,
            }
          : active
          ? { background: "linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)" }
          : undefined
      }
      aria-pressed={active}
    >
      {emoji && <span aria-hidden>{emoji}</span>}
      {label}
      <span
        className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
          active ? "bg-white/25" : "bg-white/10 text-white/60"
        }`}
      >
        {count}
      </span>
    </motion.button>
  );
}

function AffirmationCard({
  affirmation,
  isFavorite,
  onToggleFavorite,
  onDelete,
  index,
}: {
  affirmation: Affirmation;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onDelete?: () => void;
  index: number;
}) {
  const t = useT();
  const meta = CATEGORY_META[affirmation.category];
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handleDeleteClick = () => {
    if (!onDelete) return;
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      sound.playClick();
      haptics.light();
      // Auto-clear after 3s
      window.setTimeout(() => setConfirmingDelete(false), 3000);
      return;
    }
    onDelete();
  };

  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      transition={{ delay: Math.min(index * 0.04, 0.4) }}
      className="glass-card card-hover p-4 relative break-inside-avoid mb-3"
      style={{ borderLeft: `4px solid ${meta.color}` }}
    >
      {/* Category emoji in top-right corner */}
      <span
        aria-hidden
        className="absolute top-3 right-3 text-lg opacity-70"
      >
        {meta.emoji}
      </span>

      {/* Favorite heart button (top-right, below emoji) */}
      <button
        onClick={onToggleFavorite}
        className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        aria-label={
          isFavorite ? t("affirmationsAriaRemoveFav") : t("affirmationsAriaAddFav")
        }
        aria-pressed={isFavorite}
      >
        <motion.span
          key={isFavorite ? "filled" : "outline"}
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Heart
            size={14}
            className={isFavorite ? "text-[#FF3B30]" : "text-white/40"}
            fill={isFavorite ? "#FF3B30" : "none"}
          />
        </motion.span>
      </button>

      {/* Quote marks */}
      <span
        aria-hidden
        className="text-2xl leading-none mr-1 align-top"
        style={{ color: `${meta.color}88`, fontFamily: "Georgia, serif" }}
      >
        “
      </span>
      <span className="italic text-white/90 text-sm leading-relaxed font-[family-name:var(--font-poppins)]">
        {t(affirmation.textKey)}
      </span>

      {/* Bottom row: badge */}
      <div className="mt-3 flex items-center gap-2">
        {affirmation.isCustom ? (
          <span className="px-2 py-0.5 rounded-full bg-[#BF5AF2]/15 text-[#BF5AF2] text-[10px] font-semibold border border-[#BF5AF2]/30">
            {t("affirmationsCustom")}
          </span>
        ) : (
          <CategoryBadge category={affirmation.category} size="sm" />
        )}
      </div>

      {/* Delete button for custom affirmations */}
      {onDelete && (
        <button
          onClick={handleDeleteClick}
          className={`mt-2 flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg transition-colors ${
            confirmingDelete
              ? "bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/40"
              : "text-white/40 hover:text-[#FF3B30] hover:bg-[#FF3B30]/10"
          }`}
          aria-label={t("affirmationsAriaDelete")}
        >
          {confirmingDelete ? (
            <>
              <Check size={11} /> {t("affirmationsConfirm")}
            </>
          ) : (
            <>
              <Trash2 size={11} /> {t("affirmationsDeleteBtn")}
            </>
          )}
        </button>
      )}
    </motion.div>
  );
}

function FavoriteMiniCard({
  affirmation,
  onClick,
}: {
  affirmation: Affirmation;
  onClick: () => void;
}) {
  const t = useT();
  const meta = CATEGORY_META[affirmation.category];
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="shrink-0 w-44 text-left glass-card card-hover p-3 relative"
      style={{ borderLeft: `4px solid ${meta.color}` }}
    >
      <span
        aria-hidden
        className="absolute top-2 right-2 text-base"
      >
        {meta.emoji}
      </span>
      <p className="text-white/80 text-xs italic line-clamp-2 leading-snug pr-4 font-[family-name:var(--font-poppins)]">
        {t(affirmation.textKey)}
      </p>
      <div className="mt-2 flex items-center gap-1">
        <Heart
          size={10}
          className="text-[#FF3B30]"
          fill="#FF3B30"
        />
        <span className="text-white/40 text-[10px]">{t("affirmationsFavoriteLabel")}</span>
      </div>
    </motion.button>
  );
}

/* ========================================================================
   Main screen
   ======================================================================== */

export function AffirmationsScreen() {
  const t = useT();
  const lang = useLanguage();
  const navigate = useStore((s) => s.navigate);
  const plan = useStore((s) => s.plan);
  const favoriteAffirmations = useStore((s) => s.favoriteAffirmations);
  const customAffirmations = useStore((s) => s.customAffirmations);
  const toggleFavoriteAffirmation = useStore((s) => s.toggleFavoriteAffirmation);
  const addCustomAffirmation = useStore((s) => s.addCustomAffirmation);
  const deleteCustomAffirmation = useStore((s) => s.deleteCustomAffirmation);

  const isPremium = plan !== "free";

  const [activeCategory, setActiveCategory] = useState<FilterCat>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [dailyAffirmation, setDailyAffirmation] = useState<Affirmation>(() =>
    getDailyAffirmation()
  );

  // Add-form state
  const [newText, setNewText] = useState("");
  const [newCategory, setNewCategory] = useState<AffirmationCategory | null>(
    null
  );

  const allAffirmations = useMemo(
    () => mergeAffirmations(SEED_AFFIRMATIONS, customAffirmations),
    [customAffirmations]
  );

  const filteredAffirmations = useMemo(
    () => filterAffirmations(allAffirmations, activeCategory),
    [allAffirmations, activeCategory]
  );

  const favoriteAffirmationObjects = useMemo(
    () =>
      favoriteAffirmations
        .map((id) => allAffirmations.find((a) => a.id === id))
        .filter((a): a is Affirmation => a !== undefined),
    [favoriteAffirmations, allAffirmations]
  );

  const counts = useMemo(() => {
    const c: Record<FilterCat, number> = {
      all: allAffirmations.length,
      morning: 0,
      crisis: 0,
      "self-worth": 0,
      future: 0,
      gratitude: 0,
      strength: 0,
    };
    for (const a of allAffirmations) {
      c[a.category] += 1;
    }
    return c;
  }, [allAffirmations]);

  const dailyMeta = CATEGORY_META[dailyAffirmation.category];
  const dailyIsFavorite = favoriteAffirmations.includes(dailyAffirmation.id);
  const todayLabel = formatDate(new Date(), lang);

  /* ---- Handlers ---- */

  const handleBack = () => {
    sound.playClick();
    haptics.light();
    navigate("dashboard");
  };

  const handleToggleDailyFavorite = () => {
    toggleFavoriteAffirmation(dailyAffirmation.id);
    if (dailyIsFavorite) {
      sound.playClick();
      haptics.light();
      toast(t("affirmationsToastRemoved"));
    } else {
      sound.playPop();
      haptics.selection();
      toast.success(t("affirmationsToastAdded"));
    }
  };

  const handleToggleFavorite = (id: string) => {
    const wasFav = favoriteAffirmations.includes(id);
    toggleFavoriteAffirmation(id);
    if (wasFav) {
      sound.playClick();
      haptics.light();
    } else {
      sound.playPop();
      haptics.selection();
    }
  };

  const handleShare = () => {
    sound.playClick();
    haptics.light();
    void shareAffirmation(dailyAffirmation, t);
  };

  const handleNewDaily = () => {
    sound.playWhoosh();
    haptics.medium();
    setDailyAffirmation(
      getRandomAffirmation(SEED_AFFIRMATIONS, dailyAffirmation.id)
    );
  };

  const handleFilterChange = (cat: FilterCat) => {
    setActiveCategory(cat);
    sound.playClick();
    haptics.selection();
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
    sound.playClick();
    haptics.light();
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    sound.playClick();
    haptics.light();
  };

  const handleSubmitCustom = () => {
    const trimmed = newText.trim();
    if (trimmed.length < 10 || trimmed.length > 200) {
      sound.playError();
      haptics.warning();
      toast.error(t("affirmationsToastErrLen"));
      return;
    }
    if (!newCategory) {
      sound.playError();
      haptics.warning();
      toast.error(t("affirmationsToastErrCat"));
      return;
    }
    addCustomAffirmation(trimmed, newCategory);
    sound.playSuccess();
    haptics.success();
    toast.success(t("affirmationsToastCreated"));
    setNewText("");
    setNewCategory(null);
    setShowAddModal(false);
  };

  const handleDeleteCustom = (id: string) => {
    deleteCustomAffirmation(id);
    sound.playWhoosh();
    haptics.medium();
    toast.success(t("affirmationsToastDeleted"));
  };

  const handleCategoryChip = (cat: AffirmationCategory) => {
    setNewCategory((prev) => (prev === cat ? null : cat));
    sound.playPop();
    haptics.selection();
  };

  const handlePremiumCta = () => {
    sound.playClick();
    haptics.light();
    navigate("paywall");
  };

  const handleFavoriteTap = (aff: Affirmation) => {
    sound.playClick();
    haptics.light();
    const catLabelKey =
      aff.category === "morning"
        ? "affirmationsCatMorning"
        : aff.category === "crisis"
        ? "affirmationsCatCrisis"
        : aff.category === "self-worth"
        ? "affirmationsCatSelfWorth"
        : aff.category === "future"
        ? "affirmationsCatFuture"
        : aff.category === "gratitude"
        ? "affirmationsCatGratitude"
        : "affirmationsCatStrength";
    toast(
      <span className="italic font-[family-name:var(--font-poppins)]">
        “{t(aff.textKey)}”
      </span>,
      { description: `${CATEGORY_META[aff.category].emoji} ${t(catLabelKey)}` }
    );
  };

  /* ---- Derived ---- */

  const isFormValid =
    newText.trim().length >= 10 &&
    newText.trim().length <= 200 &&
    newCategory !== null;

  const TIPS: { icon: LucideIcon; key: string }[] = [
    { icon: Volume2, key: "affirmationsTipA" },
    { icon: Wind, key: "affirmationsTipB" },
    { icon: Eye, key: "affirmationsTipC" },
  ];

  return (
    <div className="min-h-screen px-4 pt-10 pb-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        {/* ====================================================================
            1. Header
            ==================================================================== */}
        <motion.div
          variants={itemVariants}
          className="sticky top-0 z-30 -mx-4 px-4 py-3 mb-1 glass-card-strong backdrop-blur-xl"
          style={{ borderRadius: 0 }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center btn-press"
              aria-label={t("backToDashboard")}
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-white font-bold text-xl font-[family-name:var(--font-poppins)] leading-tight flex items-center gap-2">
                {t("affirmationsTitle")}
                <Sparkles size={18} className="text-[#BF5AF2]" />
              </h1>
              <p className="text-white/50 text-xs">{t("affirmationsSubtitle")}</p>
            </div>
          </div>
        </motion.div>

        {/* ====================================================================
            2. Affirmation of the Day Card (HERO)
            ==================================================================== */}
        <motion.div
          variants={itemVariants}
          className="relative glass-card-strong p-6 overflow-hidden animate-glow-pulse premium-shimmer"
          style={{
            background: `linear-gradient(135deg, ${dailyMeta.color}22 0%, rgba(11,19,43,0.75) 60%)`,
          }}
        >
          {/* Decorative quote marks */}
          <span
            aria-hidden
            className="absolute -top-4 -left-2 text-7xl leading-none opacity-10"
            style={{ color: dailyMeta.color, fontFamily: "Georgia, serif" }}
          >
            “
          </span>
          <span
            aria-hidden
            className="absolute -bottom-12 -right-2 text-7xl leading-none opacity-10"
            style={{ color: dailyMeta.color, fontFamily: "Georgia, serif" }}
          >
            ”
          </span>

          {/* Glow blob */}
          <div
            aria-hidden
            className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-30"
            style={{ background: dailyMeta.color }}
          />

          <div className="relative z-10">
            {/* Label + date */}
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={12} style={{ color: dailyMeta.color }} />
              <span
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{ color: dailyMeta.color }}
              >
                {t("affirmationsHeroLabel")}
              </span>
            </div>
            <p className="text-white/50 text-xs mb-4">{todayLabel}</p>

            {/* Quote text */}
            <p className="text-white text-lg italic leading-relaxed font-[family-name:var(--font-poppins)] mb-5">
              {t(dailyAffirmation.textKey)}
            </p>

            {/* Category badge */}
            <div className="mb-5">
              <CategoryBadge category={dailyAffirmation.category} />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleToggleDailyFavorite}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all btn-press ${
                  dailyIsFavorite
                    ? "bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/40"
                    : "bg-white/10 text-white/80 border border-white/10"
                }`}
                aria-pressed={dailyIsFavorite}
              >
                <motion.span
                  key={dailyIsFavorite ? "fav" : "nofav"}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}
                >
                  <Heart
                    size={14}
                    fill={dailyIsFavorite ? "#FF3B30" : "none"}
                  />
                </motion.span>
                {t("affirmationsFavorite")}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white/80 border border-white/10 btn-press"
                aria-label={t("affirmationsShare")}
              >
                <Share2 size={14} />
                {t("affirmationsShare")}
              </button>

              <button
                onClick={handleNewDaily}
                className="ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border btn-press"
                style={{
                  background: `${dailyMeta.color}22`,
                  color: dailyMeta.color,
                  borderColor: `${dailyMeta.color}55`,
                }}
                aria-label={t("affirmationsNewBtn")}
              >
                <RefreshCw size={14} />
                {t("affirmationsNewBtn")}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ====================================================================
            3. Category Filter Tabs
            ==================================================================== */}
        <motion.div
          variants={itemVariants}
          className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1"
        >
          <FilterPill
            label={t("affirmationsAll")}
            count={counts.all}
            active={activeCategory === "all"}
            onClick={() => handleFilterChange("all")}
          />
          {CATEGORY_ORDER.map((cat) => {
            const meta = CATEGORY_META[cat];
            const labelKey =
              cat === "morning"
                ? "affirmationsCatMorning"
                : cat === "crisis"
                ? "affirmationsCatCrisis"
                : cat === "self-worth"
                ? "affirmationsCatSelfWorth"
                : cat === "future"
                ? "affirmationsCatFuture"
                : cat === "gratitude"
                ? "affirmationsCatGratitude"
                : "affirmationsCatStrength";
            return (
              <FilterPill
                key={cat}
                label={t(labelKey)}
                emoji={meta.emoji}
                count={counts[cat]}
                active={activeCategory === cat}
                color={meta.color}
                onClick={() => handleFilterChange(cat)}
              />
            );
          })}
        </motion.div>

        {/* ====================================================================
            4. "Créer mon affirmation" CTA
            ==================================================================== */}
        <motion.button
          variants={itemVariants}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenAddModal}
          className="w-full py-3.5 rounded-2xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-2 glow-green btn-press"
        >
          <Plus size={16} /> {t("affirmationsCreateMine")}
        </motion.button>

        {/* ====================================================================
            6. Affirmations Grid
            ==================================================================== */}
        <motion.div variants={itemVariants}>
          {filteredAffirmations.length === 0 ? (
            <EmptyState
              variant="default"
              title={t("affirmationsEmptyTitle")}
              description={t("affirmationsEmptyDesc")}
              ctaLabel={t("affirmationsCreateMine")}
              onCta={handleOpenAddModal}
              compact
            />
          ) : (
            <div
              className="columns-2 gap-3 max-h-[60vh] overflow-y-auto custom-scroll pr-1"
              style={{ columnFill: "balance" }}
            >
              {filteredAffirmations.map((aff, idx) => (
                <AffirmationCard
                  key={aff.id}
                  affirmation={aff}
                  index={idx}
                  isFavorite={favoriteAffirmations.includes(aff.id)}
                  onToggleFavorite={() => handleToggleFavorite(aff.id)}
                  onDelete={
                    aff.isCustom
                      ? () => handleDeleteCustom(aff.id)
                      : undefined
                  }
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* ====================================================================
            7. My Favorites Section
            ==================================================================== */}
        {favoriteAffirmationObjects.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-3">
              <Heart size={16} className="text-[#FF3B30]" fill="#FF3B30" />
              <h2 className="text-white font-bold text-base font-[family-name:var(--font-poppins)]">
                {t("affirmationsMyFavorites")}
              </h2>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-[#FF3B30]/15 text-[#FF3B30] text-[10px] font-bold">
                {favoriteAffirmationObjects.length}
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
              {favoriteAffirmationObjects.map((aff) => (
                <FavoriteMiniCard
                  key={aff.id}
                  affirmation={aff}
                  onClick={() => handleFavoriteTap(aff)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ====================================================================
            8. Daily Reminder Card (premium-gated)
            ==================================================================== */}
        <motion.div
          variants={itemVariants}
          className="relative glass-card-strong p-5 overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-25"
            style={{ background: "#FF9500" }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Bell size={16} className="text-[#FF9500]" />
              <h3 className="text-white font-bold font-[family-name:var(--font-poppins)] text-sm">
                {t("affirmationsDailyReminder")}
              </h3>
            </div>

            {!isPremium ? (
              <div className="relative">
                <div
                  className="absolute inset-0 backdrop-blur-md bg-[#070B0E]/70 flex flex-col items-center justify-center gap-3 z-10 rounded-2xl py-6"
                  aria-hidden={false}
                >
                  <div className="w-12 h-12 rounded-full bg-[#FF9500]/15 flex items-center justify-center">
                    <Lock size={20} className="text-[#FF9500]" />
                  </div>
                  <p className="text-white/70 text-xs text-center max-w-[240px] px-4">
                    {t("affirmationsPremiumLock")}
                  </p>
                  <button
                    onClick={handlePremiumCta}
                    className="px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold glow-green btn-press"
                  >
                    {t("goalsPremiumCta")}
                  </button>
                </div>

                {/* Blurred preview */}
                <div className="flex flex-col gap-3 opacity-50 select-none" aria-hidden>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-xs">
                      {t("affirmationsReminderToggle")}
                    </span>
                    <div className="w-9 h-5 rounded-full bg-[#FF9500]/40 relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-xs">{t("affirmationsReminderTime")}</span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-mono">
                      07:00
                    </span>
                  </div>
                  <p className="text-white/50 text-[11px] leading-relaxed">
                    {t("affirmationsReminderDesc")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <span className="text-white text-sm block">
                      {t("affirmationsReminderToggle")}
                    </span>
                    <span className="text-white/40 text-[11px]">
                      {t("affirmationsReminderSoon")}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      haptics.light();
                      toast(t("affirmationsReminderSoon"), {
                        description: t("affirmationsReminderSoon"),
                      });
                    }}
                    className="w-11 h-6 rounded-full bg-[#FF9500] relative shrink-0"
                    aria-label={t("affirmationsDailyReminder")}
                    aria-pressed={true}
                  >
                    <span className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-xs">{t("affirmationsReminderTime")}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-mono">
                    07:00
                  </span>
                </div>

                <p className="text-white/50 text-[11px] leading-relaxed">
                  {t("affirmationsReminderDesc")}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* ====================================================================
            9. Affirmation Tips Card
            ==================================================================== */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-[#FBBF24]" />
            <h3 className="text-white font-bold font-[family-name:var(--font-poppins)] text-sm">
              {t("affirmationsTipsTitle")}
            </h3>
          </div>
          <ul className="space-y-2.5">
            {TIPS.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FBBF24]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-[#FBBF24]" />
                  </div>
                  <span className="text-white/75 text-xs leading-relaxed pt-1">
                    {t(tip.key)}
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* ====================================================================
            10. Footer Quote
            ==================================================================== */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-5 text-center"
        >
          <Quote
            size={20}
            className="text-[#BF5AF2] mx-auto mb-2"
            aria-hidden
          />
          <p className="text-white/70 text-xs italic font-[family-name:var(--font-poppins)] leading-relaxed">
            {t("affirmationsFooterQuote")}
          </p>
        </motion.div>
      </motion.div>

      {/* ====================================================================
          5. Add Custom Affirmation Bottom-Sheet Modal
          ==================================================================== */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseAddModal}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 safe-bottom"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-5 w-full max-w-md max-h-[88vh] overflow-y-auto custom-scroll"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold font-[family-name:var(--font-poppins)] text-lg">
                  {t("affirmationsModalTitle")}
                </h3>
                <button
                  onClick={handleCloseAddModal}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                  aria-label={t("close")}
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-white/60 text-xs">
                      {t("affirmationsFieldText")}
                    </label>
                    <span
                      className={`text-[10px] ${
                        newText.trim().length < 10
                          ? "text-white/40"
                          : newText.trim().length > 200
                          ? "text-[#FF3B30]"
                          : "text-[#4ADE80]"
                      }`}
                    >
                      {newText.trim().length}/200
                    </span>
                  </div>
                  <textarea
                    value={newText}
                    onChange={(e) =>
                      setNewText(e.target.value.slice(0, 220))
                    }
                    placeholder={t("affirmationsPlaceholder")}
                    rows={4}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF9500] resize-none italic font-[family-name:var(--font-poppins)]"
                  />
                  {newText.trim().length > 0 && newText.trim().length < 10 && (
                    <p className="text-[#FF9500] text-[10px] mt-1">
                      {t("affirmationsCharMin", { n: newText.trim().length })}
                    </p>
                  )}
                </div>

                {/* Category selector */}
                <div>
                  <label className="text-white/60 text-xs mb-2 block">
                    {t("affirmationsFieldCategory")}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORY_ORDER.map((cat) => {
                      const meta = CATEGORY_META[cat];
                      const labelKey =
                        cat === "morning"
                          ? "affirmationsCatMorning"
                          : cat === "crisis"
                          ? "affirmationsCatCrisis"
                          : cat === "self-worth"
                          ? "affirmationsCatSelfWorth"
                          : cat === "future"
                          ? "affirmationsCatFuture"
                          : cat === "gratitude"
                          ? "affirmationsCatGratitude"
                          : "affirmationsCatStrength";
                      const selected = newCategory === cat;
                      return (
                        <motion.button
                          key={cat}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCategoryChip(cat)}
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
                          aria-pressed={selected}
                        >
                          <span className="text-lg" aria-hidden>
                            {meta.emoji}
                          </span>
                          <span className="text-white/80 text-[10px] font-medium text-center leading-tight">
                            {t(labelKey)}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmitCustom}
                  disabled={!isFormValid}
                  className="w-full py-3 rounded-xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed btn-press"
                >
                  <Plus size={16} /> {t("affirmationsSaveBtn")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
