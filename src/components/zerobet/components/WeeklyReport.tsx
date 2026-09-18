"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarDays, BookOpen, LifeBuoy, Zap, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n/useT";

/**
 * Zerobet 2.0 — WeeklyReport
 *
 * Auto-generated weekly recovery report rendered at the top of the Stats
 * screen. Pure client-side aggregation of the last 7 days of local data:
 * clean days, journal entries, managed panic crises and XP earned.
 * The verdict adapts the tone (celebrating progress without guilt-tripping
 * during hard weeks — core Zerobet principle).
 */

interface WeeklyReportProps {
  streakHistory: { date: string; clean: boolean; intensity: number }[];
  journalEntries: { createdAt: string }[];
  panicEvents: { createdAt: string }[];
  xpHistory: { amount: number; timestamp: string }[];
}

type Verdict = "empty" | "start" | "great" | "good" | "tough";

export function WeeklyReport({ streakHistory, journalEntries, panicEvents, xpHistory }: WeeklyReportProps) {
  const t = useT();

  const report = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 6);
    weekAgo.setHours(0, 0, 0, 0);
    const inWindow = (iso: string) => {
      const d = new Date(iso);
      return d >= weekAgo && d <= now;
    };

    const windowKeys = new Set<string>();
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekAgo);
      d.setDate(weekAgo.getDate() + i);
      windowKeys.add(d.toISOString().slice(0, 10));
    }

    const tracked = streakHistory.filter((d) => windowKeys.has(d.date));
    const cleanDays = tracked.filter((d) => d.clean).length;
    const journalCount = journalEntries.filter((e) => inWindow(e.createdAt)).length;
    const panicCount = panicEvents.filter((e) => inWindow(e.createdAt)).length;
    const xpGained = xpHistory
      .filter((e) => inWindow(e.timestamp))
      .reduce((sum, e) => sum + Math.max(0, e.amount), 0);

    const hasData =
      tracked.length > 0 || journalCount > 0 || panicCount > 0 || xpGained > 0;

    let verdict: Verdict = "start";
    if (!hasData) verdict = "empty";
    else if (tracked.length > 0 && cleanDays >= 6 && panicCount <= 1) verdict = "great";
    else if (panicCount >= 3 || (tracked.length > 0 && cleanDays <= 2)) verdict = "tough";
    else verdict = "good";

    return {
      cleanDays,
      journalCount,
      panicCount,
      xpGained,
      verdict,
      from: weekAgo,
      to: now,
    };
  }, [streakHistory, journalEntries, panicEvents, xpHistory]);

  const dateFmt = (d: Date) =>
    d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

  const verdictStyle: Record<Verdict, { pill: string; icon: string }> = {
    empty: { pill: "bg-white/10 text-white/60", icon: "🌱" },
    start: { pill: "bg-[#64D2FF]/15 text-[#64D2FF]", icon: "🌱" },
    great: { pill: "bg-[#4ADE80]/15 text-[#4ADE80]", icon: "🏆" },
    good: { pill: "bg-[#10B981]/15 text-[#10B981]", icon: "💪" },
    tough: { pill: "bg-[#FBBF24]/15 text-[#FBBF24]", icon: "🌤️" },
  };

  const metrics = [
    {
      icon: CalendarDays,
      color: "#10B981",
      value: `${report.cleanDays}/7`,
      labelKey: "weeklyReportClean",
    },
    {
      icon: BookOpen,
      color: "#64D2FF",
      value: String(report.journalCount),
      labelKey: "weeklyReportJournal",
    },
    {
      icon: LifeBuoy,
      color: "#FF9500",
      value: String(report.panicCount),
      labelKey: "weeklyReportPanic",
    },
    {
      icon: Zap,
      color: "#FBBF24",
      value: String(report.xpGained),
      labelKey: "weeklyReportXP",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="glass-card p-5 mb-5 relative overflow-hidden"
      aria-label={t("weeklyReportTitle")}
    >
      {/* Aurora accent */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.16) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-[#2DD4BF]" />
            <h2 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("weeklyReportTitle")}
            </h2>
          </div>
          <p className="text-white/45 text-[11px]">
            {t("weeklyReportPeriod", {
              from: dateFmt(report.from),
              to: dateFmt(report.to),
            })}
          </p>
        </div>
        <span
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold ${verdictStyle[report.verdict].pill}`}
        >
          {verdictStyle[report.verdict].icon}{" "}
          {t(`weeklyReportVerdict${report.verdict.charAt(0).toUpperCase()}${report.verdict.slice(1)}`)}
        </span>
      </div>

      {report.verdict === "empty" ? (
        <p className="text-white/50 text-sm">{t("weeklyReportEmpty")}</p>
      ) : (
        <>
          {/* Metrics grid */}
          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.labelKey}
                  className="rounded-2xl bg-white/5 border border-white/5 p-2.5 text-center"
                >
                  <Icon size={15} style={{ color: m.color }} className="mx-auto mb-1.5" />
                  <p className="text-white font-bold text-base leading-none mb-1 font-[family-name:var(--font-poppins)]">
                    {m.value}
                  </p>
                  <p className="text-white/45 text-[9.5px] leading-tight">
                    {t(m.labelKey)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Verdict message */}
          <p className="text-white/65 text-xs leading-relaxed">
            {t(
              `weeklyReportVerdict${report.verdict.charAt(0).toUpperCase()}${report.verdict.slice(1)}Desc`
            )}
          </p>
        </>
      )}
    </motion.section>
  );
}

export default WeeklyReport;
