"use client";

import { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, Flame, TrendingUp, Award, Percent } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/zerobet-store";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { AnimatedNumber } from "@/components/zerobet/components/AnimatedNumber";
import { useT } from "@/lib/i18n/useT";
import { useLanguage } from "@/lib/i18n/useT";
import type { Language } from "@/lib/i18n/dictionary";

export interface HeatmapCalendarProps {
  /** Number of weeks to render (columns). @default 26 */
  weeks?: number;
  /** Optional className applied to the root wrapper. */
  className?: string;
  /** Show the header (title + subtitle). @default true */
  showHeader?: boolean;
  /** Show the legend + stats summary. @default true */
  showLegend?: boolean;
}

const CELL_SIZE = 12;
const CELL_GAP = 2;
// In our grid row 0 = Monday (we start the grid on Monday),
// so visible labels are rows 0, 2, 4 (Mon, Wed, Fri — GitHub style).
const VISIBLE_ROWS = new Set([0, 2, 4]);

/** Map a Zerobet language code to a BCP-47 locale for Intl APIs. */
function getLocale(lang: Language): string {
  switch (lang) {
    case "en":
      return "en-US";
    case "es":
      return "es-ES";
    case "fr":
    default:
      return "fr-FR";
  }
}

/** Build the 12 short month labels localized to the user's language. */
function getMonthLabels(lang: Language): string[] {
  const locale = getLocale(lang);
  const formatter = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2024, i, 1);
    return formatter.format(date);
  });
}

/**
 * Build the 7 weekday short labels (Mon..Sun) localized to the user's
 * language. Returns the *full short* label (e.g., "Lun", "Mon", "lun.").
 * The caller is responsible for taking the first character when rendering
 * the narrow day-column gutter.
 */
function getDayLabels(lang: Language): string[] {
  const locale = getLocale(lang);
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 2024-01-01 is a Monday — anchor for Mon..Sun.
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(2024, 0, 1 + i);
    return formatter.format(date);
  });
}

/** Format an ISO date (YYYY-MM-DD) in the user's locale long form. */
function formatLocaleLong(iso: string, lang: Language): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat(getLocale(lang), {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Build a YYYY-MM-DD string for a local Date (no UTC shift). */
function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

interface DayCell {
  iso: string;
  date: Date;
  row: number; // 0..6 (Mon..Sun)
  col: number; // 0..weeks-1
  future: boolean;
  clean?: boolean;
  intensity?: number;
  isToday: boolean;
  hasData: boolean;
}

interface CellClassification {
  bg: string;
  glow: string;
  /** i18n key for the cell label (translated at the render site). */
  labelKey: string;
}

function classifyCell(cell: DayCell): CellClassification {
  if (cell.future) {
    return { bg: "transparent", glow: "none", labelKey: "heatmapCellFuture" };
  }
  if (!cell.hasData) {
    return {
      bg: "rgba(255,255,255,0.04)",
      glow: "none",
      labelKey: "heatmapCellNoData",
    };
  }
  if (cell.clean === false) {
    return {
      bg: "rgba(255,59,48,0.85)",
      glow: "0 0 6px rgba(255,59,48,0.45)",
      labelKey: "heatmapCellRelapse",
    };
  }
  // clean === true — intensity drives the orange shade
  switch (cell.intensity) {
    case 1:
      return {
        bg: "rgba(255,149,0,0.30)",
        glow: "none",
        labelKey: "heatmapCellDifficult",
      };
    case 2:
      return {
        bg: "rgba(255,149,0,0.60)",
        glow: "0 0 4px rgba(255,149,0,0.30)",
        labelKey: "heatmapCellCorrect",
      };
    case 3:
      return {
        bg: "rgba(255,149,0,0.95)",
        glow: "0 0 8px rgba(255,149,0,0.55)",
        labelKey: "heatmapCellExcellent",
      };
    default:
      return {
        bg: "rgba(255,149,0,0.45)",
        glow: "none",
        labelKey: "heatmapCellClean",
      };
  }
}

interface DayRatingModalProps {
  open: boolean;
  onClose: () => void;
  onSelectClean: (intensity: 1 | 2 | 3) => void;
  onSelectRelapse: () => void;
  t: (k: string, params?: Record<string, string | number>) => string;
}

function DayRatingModal({
  open,
  onClose,
  onSelectClean,
  onSelectRelapse,
  t,
}: DayRatingModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="heatmap-rating-title"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative glass-card-strong premium-shimmer w-full max-w-sm rounded-3xl p-6 border border-white/10"
          >
            <button
              onClick={onClose}
              aria-label={t("heatmapClose")}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
            <div className="text-center mb-5">
              <div className="inline-flex w-12 h-12 rounded-2xl gradient-primary items-center justify-center mb-3">
                <Calendar size={22} className="text-white" />
              </div>
              <h3
                id="heatmap-rating-title"
                className="text-white font-semibold text-lg font-[family-name:var(--font-poppins)]"
              >
                {t("heatmapRatingTitle")}
              </h3>
              <p className="text-white/50 text-xs mt-1">
                {t("heatmapRatingDesc")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => onSelectClean(1)}
                className="w-full py-3 px-4 rounded-2xl flex items-center gap-3 bg-[rgba(255,149,0,0.12)] hover:bg-[rgba(255,149,0,0.22)] border border-[rgba(255,149,0,0.25)] transition-colors text-left btn-press"
              >
                <span
                  className="w-4 h-4 rounded-sm flex-shrink-0"
                  style={{ background: "rgba(255,149,0,0.30)" }}
                />
                <div>
                  <div className="text-white text-sm font-medium">
                    {t("heatmapDifficult")}
                  </div>
                  <div className="text-white/40 text-xs">
                    {t("heatmapDifficultDesc")}
                  </div>
                </div>
              </button>

              <button
                onClick={() => onSelectClean(2)}
                className="w-full py-3 px-4 rounded-2xl flex items-center gap-3 bg-[rgba(255,149,0,0.18)] hover:bg-[rgba(255,149,0,0.28)] border border-[rgba(255,149,0,0.35)] transition-colors text-left btn-press"
              >
                <span
                  className="w-4 h-4 rounded-sm flex-shrink-0"
                  style={{ background: "rgba(255,149,0,0.60)" }}
                />
                <div>
                  <div className="text-white text-sm font-medium">
                    {t("heatmapCorrect")}
                  </div>
                  <div className="text-white/40 text-xs">
                    {t("heatmapCorrectDesc")}
                  </div>
                </div>
              </button>

              <button
                onClick={() => onSelectClean(3)}
                className="w-full py-3 px-4 rounded-2xl flex items-center gap-3 bg-[rgba(255,149,0,0.28)] hover:bg-[rgba(255,149,0,0.40)] border border-[rgba(255,149,0,0.55)] transition-colors text-left btn-press"
              >
                <span
                  className="w-4 h-4 rounded-sm flex-shrink-0"
                  style={{ background: "rgba(255,149,0,0.95)" }}
                />
                <div>
                  <div className="text-white text-sm font-medium">
                    {t("heatmapExcellent")}
                  </div>
                  <div className="text-white/40 text-xs">
                    {t("heatmapExcellentDesc")}
                  </div>
                </div>
              </button>

              <button
                onClick={onSelectRelapse}
                className="w-full py-3 px-4 rounded-2xl flex items-center gap-3 bg-[rgba(255,59,48,0.14)] hover:bg-[rgba(255,59,48,0.24)] border border-[rgba(255,59,48,0.40)] transition-colors text-left btn-press"
              >
                <span
                  className="w-4 h-4 rounded-sm flex-shrink-0"
                  style={{ background: "rgba(255,59,48,0.85)" }}
                />
                <div>
                  <div className="text-[#FF6961] text-sm font-medium">
                    {t("heatmapCracked")}
                  </div>
                  <div className="text-white/40 text-xs">
                    {t("heatmapCrackedDesc")}
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function HeatmapCalendar({
  weeks = 26,
  className,
  showHeader = true,
  showLegend = true,
}: HeatmapCalendarProps) {
  const streakHistory = useStore((s) => s.streakHistory);
  const streakDays = useStore((s) => s.streakDays);
  const markDayClean = useStore((s) => s.markDayClean);
  const markDayRelapse = useStore((s) => s.markDayRelapse);
  const navigate = useStore((s) => s.navigate);
  const t = useT();
  const language = useLanguage();

  // Locale-aware month / day label arrays (recomputed when language changes).
  const monthLabelsArr = useMemo(() => getMonthLabels(language), [language]);
  const dayLabelsArr = useMemo(() => getDayLabels(language), [language]);

  const [ratingOpen, setRatingOpen] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<DayCell | null>(null);

  // Build the day grid: weeks columns × 7 rows (Mon..Sun).
  // We anchor the grid so that today sits in the last column.
  const { cells, monthLabels, cleanCount, totalPastDays, longestStreak } =
    useMemo(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = toISODate(today);

      // Find Monday of the current week (today's week).
      const todayDow = (today.getDay() + 6) % 7; // 0 = Monday, 6 = Sunday
      const mondayThisWeek = new Date(today);
      mondayThisWeek.setDate(today.getDate() - todayDow);

      // The last column is the current week. So the grid's first Monday
      // is (weeks - 1) weeks before mondayThisWeek.
      const startMonday = new Date(mondayThisWeek);
      startMonday.setDate(mondayThisWeek.getDate() - (weeks - 1) * 7);

      // Build a quick lookup of streakHistory by ISO date.
      const lookup = new Map<string, { clean: boolean; intensity: number }>();
      for (const d of streakHistory) {
        lookup.set(d.date, { clean: d.clean, intensity: d.intensity });
      }

      const cells: DayCell[] = [];
      let clean = 0;
      let pastDays = 0;
      // Running streak (longest run of clean days in the visible window).
      let running = 0;
      let longest = 0;

      for (let w = 0; w < weeks; w++) {
        for (let r = 0; r < 7; r++) {
          const date = new Date(startMonday);
          date.setDate(startMonday.getDate() + w * 7 + r);
          const iso = toISODate(date);
          const future = date.getTime() > today.getTime();
          const entry = lookup.get(iso);
          const hasData = !!entry;
          const isToday = iso === todayISO;
          cells.push({
            iso,
            date,
            row: r,
            col: w,
            future,
            clean: entry?.clean,
            intensity: entry?.intensity,
            isToday,
            hasData,
          });
          if (!future) {
            pastDays += 1;
            if (entry?.clean) {
              clean += 1;
              running += 1;
              if (running > longest) longest = running;
            } else {
              running = 0;
            }
          }
        }
      }

      // Month labels: for each week column, take the date of the Monday
      // and label it if the month differs from the previous column's month.
      const monthLabels: { col: number; label: string }[] = [];
      let lastMonth = -1;
      for (let w = 0; w < weeks; w++) {
        const mondayDate = new Date(startMonday);
        mondayDate.setDate(startMonday.getDate() + w * 7);
        const m = mondayDate.getMonth();
        if (m !== lastMonth) {
          monthLabels.push({ col: w, label: monthLabelsArr[m] });
          lastMonth = m;
        }
      }

      return {
        cells,
        monthLabels,
        cleanCount: clean,
        totalPastDays: pastDays,
        longestStreak: longest,
      };
    }, [streakHistory, weeks, monthLabelsArr]);

  // Recovery rate over the visible window.
  const recoveryRate =
    totalPastDays > 0 ? Math.round((cleanCount / totalPastDays) * 100) : 0;

  const handleTodayClick = useCallback(() => {
    sound.playClick();
    haptics.medium();
    setRatingOpen(true);
  }, []);

  const handleSelectClean = useCallback(
    (intensity: 1 | 2 | 3) => {
      const todayISO = toISODate(new Date());
      markDayClean(todayISO, intensity);
      const labelKeys: Record<number, string> = {
        1: "heatmapDifficult",
        2: "heatmapCorrect",
        3: "heatmapExcellent",
      };
      sound.playSuccess();
      haptics.success();
      setRatingOpen(false);
      toast.success(t("heatmapDayRecorded"), {
        description: t("heatmapDayRecordedDesc", { label: t(labelKeys[intensity]) }),
        duration: 2600,
      });
    },
    [markDayClean, t]
  );

  const handleSelectRelapse = useCallback(() => {
    const todayISO = toISODate(new Date());
    markDayRelapse(todayISO);
    sound.playError();
    haptics.error();
    setRatingOpen(false);
    toast.error(t("heatmapRelapseTitle"), {
      description: t("heatmapRelapseDesc"),
      duration: 3200,
    });
    // Navigate to the relapse recovery screen for the compassionate protocol.
    setTimeout(() => navigate("relapse-recovery"), 400);
  }, [markDayRelapse, navigate, t]);

  // Grid width = weeks × (CELL_SIZE + CELL_GAP) - CELL_GAP + label column.
  const gridWidth = weeks * (CELL_SIZE + CELL_GAP) - CELL_GAP;
  const labelColumnWidth = 22;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card premium-shimmer p-4 mb-4 relative overflow-hidden ${className ?? ""}`}
    >
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FF9500]/10 blur-3xl pointer-events-none" />

      <div className="relative">
        {showHeader && (
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <Calendar size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-sm font-semibold font-[family-name:var(--font-poppins)]">
                {t("heatmapTitle")}
              </h3>
              <p className="text-white/50 text-xs mt-0.5">
                {t("heatmapSubtitle", { clean: cleanCount, total: totalPastDays })}
              </p>
            </div>
          </div>
        )}

        {/* Heatmap grid + day labels */}
        <div className="flex gap-1.5">
          {/* Day-of-week labels column (Mon/Wed/Fri) */}
          <div
            className="flex-shrink-0 flex flex-col"
            style={{ gap: CELL_GAP, width: labelColumnWidth }}
            aria-hidden="true"
          >
            <div style={{ height: 14 }} /> {/* Spacer aligning with month row */}
            {dayLabelsArr.map((label, i) => (
              <div
                key={label}
                style={{
                  height: CELL_SIZE,
                  lineHeight: `${CELL_SIZE}px`,
                  fontSize: 9,
                }}
                className={`text-white/40 ${
                  VISIBLE_ROWS.has(i) ? "opacity-100" : "opacity-0"
                }`}
              >
                {label.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>

          {/* Scrollable grid container */}
          <div className="flex-1 overflow-x-auto no-scrollbar">
            <div style={{ width: gridWidth, minWidth: "100%" }}>
              {/* Month labels row */}
              <div
                className="relative mb-1"
                style={{ height: 14, width: gridWidth }}
              >
                {monthLabels.map((m) => (
                  <span
                    key={`${m.col}-${m.label}`}
                    className="absolute text-white/40"
                    style={{
                      left: m.col * (CELL_SIZE + CELL_GAP),
                      fontSize: 9,
                      lineHeight: "14px",
                    }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* The grid itself */}
              <div
                className="grid"
                style={{
                  gridTemplateRows: `repeat(7, ${CELL_SIZE}px)`,
                  gridAutoFlow: "column",
                  gridAutoColumns: `${CELL_SIZE}px`,
                  gap: CELL_GAP,
                  width: gridWidth,
                }}
              >
                {cells.map((cell) => {
                  const cls = classifyCell(cell);
                  const isToday = cell.isToday;
                  const tooltipText = cell.future
                    ? `${formatLocaleLong(cell.iso, language)} • ${t("heatmapCellUpcoming")}`
                    : cell.hasData
                    ? `${t(cls.labelKey)} • ${formatLocaleLong(cell.iso, language)}`
                    : `${t("heatmapCellNoData")} • ${formatLocaleLong(cell.iso, language)}`;
                  const baseStyle: React.CSSProperties = {
                    background: cls.bg,
                    boxShadow: cls.glow === "none" ? undefined : cls.glow,
                  };
                  const baseClass = `rounded-[3px] transition-transform ${
                    isToday
                      ? "ring-2 ring-[#FF9500] ring-offset-1 ring-offset-[#070B0E] cursor-pointer hover:scale-125 hover:z-10"
                      : cell.future
                      ? "cursor-default"
                      : "hover:scale-125 hover:z-10"
                  }`;

                  if (isToday) {
                    return (
                      <button
                        key={cell.iso}
                        type="button"
                        onClick={handleTodayClick}
                        onMouseEnter={() => setHoveredCell(cell)}
                        onMouseLeave={() =>
                          setHoveredCell((c) => (c?.iso === cell.iso ? null : c))
                        }
                        onFocus={() => setHoveredCell(cell)}
                        onBlur={() =>
                          setHoveredCell((c) => (c?.iso === cell.iso ? null : c))
                        }
                        aria-label={t("heatmapTodayAria", { tooltip: tooltipText })}
                        title={tooltipText}
                        className={baseClass}
                        style={baseStyle}
                      />
                    );
                  }
                  return (
                    <div
                      key={cell.iso}
                      role="img"
                      aria-label={tooltipText}
                      title={tooltipText}
                      onMouseEnter={() => setHoveredCell(cell)}
                      onMouseLeave={() =>
                        setHoveredCell((c) => (c?.iso === cell.iso ? null : c))
                      }
                      className={baseClass}
                      style={baseStyle}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Hover tooltip (desktop) — small floating bubble under the grid */}
        <AnimatePresence>
          {hoveredCell && !hoveredCell.future && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-xs"
            >
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ background: classifyCell(hoveredCell).bg }}
              />
              <span className="text-white/80">
                {t(classifyCell(hoveredCell).labelKey)}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-white/60">
                {formatLocaleLong(hoveredCell.iso, language)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {showLegend && (
          <>
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-white/50">
              <span>{t("heatmapLess")}</span>
              <div className="flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ background: "rgba(255,149,0,0.30)" }}
                />
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ background: "rgba(255,149,0,0.60)" }}
                />
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ background: "rgba(255,149,0,0.95)" }}
                />
              </div>
              <span>{t("heatmapMore")}</span>
              <div className="flex items-center gap-1 ml-1">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ background: "rgba(255,59,48,0.85)" }}
                />
                <span>{t("heatmapRelapse")}</span>
              </div>
              <div className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] text-white/30">
                <Calendar size={11} />
                <span>{t("heatmapTapToRate")}</span>
              </div>
            </div>

            {/* Stats summary */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="glass-depth-1 rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF9500]/15 flex items-center justify-center flex-shrink-0">
                  <Flame size={16} className="text-[#FF9500]" />
                </div>
                <div className="min-w-0">
                  <div className="text-white/50 text-[10px] uppercase tracking-wide">
                    {t("heatmapCurrentStreak")}
                  </div>
                  <div className="text-white text-base font-semibold leading-tight">
                    <AnimatedNumber value={streakDays} />{" "}
                    <span className="text-white/40 text-xs font-normal">
                      {t("heatmapDayUnitShort")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="glass-depth-1 rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#BF5AF2]/15 flex items-center justify-center flex-shrink-0">
                  <Award size={16} className="text-[#BF5AF2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-white/50 text-[10px] uppercase tracking-wide">
                    {t("heatmapLongestStreak")}
                  </div>
                  <div className="text-white text-base font-semibold leading-tight">
                    <AnimatedNumber value={longestStreak} />{" "}
                    <span className="text-white/40 text-xs font-normal">
                      {t("heatmapDayUnitShort")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="glass-depth-1 rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#4ADE80]/15 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={16} className="text-[#4ADE80]" />
                </div>
                <div className="min-w-0">
                  <div className="text-white/50 text-[10px] uppercase tracking-wide">
                    {t("heatmapCleanDays")}
                  </div>
                  <div className="text-white text-base font-semibold leading-tight">
                    <AnimatedNumber value={cleanCount} />
                    <span className="text-white/40 text-xs font-normal">
                      {" "}
                      / <AnimatedNumber value={totalPastDays} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="glass-depth-1 rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF3B30]/15 flex items-center justify-center flex-shrink-0">
                  <Percent size={16} className="text-[#FF6961]" />
                </div>
                <div className="min-w-0">
                  <div className="text-white/50 text-[10px] uppercase tracking-wide">
                    {t("heatmapRecoveryRate")}
                  </div>
                  <div className="text-white text-base font-semibold leading-tight">
                    <AnimatedNumber value={recoveryRate} />
                    <span className="text-white/40 text-xs font-normal"> %</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <DayRatingModal
        open={ratingOpen}
        onClose={() => setRatingOpen(false)}
        onSelectClean={handleSelectClean}
        onSelectRelapse={handleSelectRelapse}
        t={t}
      />
    </motion.div>
  );
}

export default HeatmapCalendar;
