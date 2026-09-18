"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  CheckSquare,
  Cloud,
  CloudOff,
  CreditCard,
  Download,
  FileJson,
  RefreshCw,
  Smartphone,
  Square,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { getDeviceId } from "@/lib/device";
import { haptics } from "@/lib/haptics";
import { computeLevel } from "@/store/zerobet-store";

/**
 * Zerobet 2.0.9 — DataRightsScreen (« Mes données » — RGPD)
 *
 * Reached from Settings → Sauvegarde cloud & Export → "Mes données & RGPD".
 *   1. Inventory — three glass cards showing exactly what Zerobet keeps:
 *      local device progress, cloud backup snapshot, payment history.
 *   2. Right of access & portability — one tap downloads a complete JSON
 *      archive (server export merged with the local store snapshot).
 *   3. Right to erasure — deletes the cloud snapshot + payment history
 *      server-side, behind an explicit confirmation modal (acknowledgement
 *      checkbox required). Local progress is NEVER touched (local-first).
 */

interface ExportResponse {
  device: {
    deviceId: string;
    snapshotCreatedAt: string | null;
    snapshotUpdatedAt: string | null;
  };
  cloudSnapshot: {
    streakDays: number;
    xp: number;
    plan: string;
  } | null;
  payments: Array<{ id: string }>;
  stats: {
    paymentsCount: number;
    paymentsSuccess: number;
    totalSpent: number;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function formatDateTime(iso: string, locale: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DataRightsScreen() {
  const t = useT();
  const language = useStore((s) => s.language);
  const plan = useStore((s) => s.plan);
  const streakDays = useStore((s) => s.streakDays);
  const xp = useStore((s) => s.xp);
  const journalEntries = useStore((s) => s.journalEntries);
  const navigate = useStore((s) => s.navigate);

  const locale = language === "en" ? "en-US" : language === "es" ? "es-ES" : "fr-FR";
  const levelInfo = computeLevel(xp);

  const [exportData, setExportData] = useState<ExportResponse | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showEraseModal, setShowEraseModal] = useState(false);
  const [ackChecked, setAckChecked] = useState(false);
  const [erasing, setErasing] = useState(false);
  const mountedRef = useRef(true);

  const loadInventory = useCallback(async () => {
    setLoadError(false);
    setExportData(null);
    try {
      const deviceId = getDeviceId();
      if (!deviceId) throw new Error("no device id");
      const res = await fetch(`/api/export?deviceId=${encodeURIComponent(deviceId)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as ExportResponse;
      if (mountedRef.current) setExportData(data);
    } catch {
      if (mountedRef.current) {
        setLoadError(true);
        setExportData(null);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    loadInventory();
    return () => {
      mountedRef.current = false;
    };
  }, [loadInventory]);

  /** Right of access & portability — full JSON archive download. */
  const handleExport = async () => {
    setExporting(true);
    try {
      const deviceId = getDeviceId();
      const res = await fetch(`/api/export?deviceId=${encodeURIComponent(deviceId)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const serverData = await res.json();

      // Merge the local store snapshot into the archive so the export is
      // genuinely complete: server data + on-device data in one file.
      const localState = useStore.getState();
      const archive = {
        ...serverData,
        localSnapshot: {
          exportedAt: new Date().toISOString(),
          streakDays: localState.streakDays,
          xp: localState.xp,
          plan: localState.plan,
          journalEntries: localState.journalEntries,
          milestonesUnlocked: localState.unlockedRanks,
          goals: localState.selectedGoals,
        },
      };

      const blob = new Blob([JSON.stringify(archive, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `zerobet-mes-donnees-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      haptics.success();
      toast.success(t("dataRightsExportDone"));
    } catch {
      toast.error(t("dataRightsExportError"));
    } finally {
      if (mountedRef.current) setExporting(false);
    }
  };

  /** Right to erasure — delete server-side data only. */
  const handleErase = async () => {
    setErasing(true);
    try {
      const deviceId = getDeviceId();
      const res = await fetch(`/api/export?deviceId=${encodeURIComponent(deviceId)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      haptics.warning();
      toast.success(t("dataRightsEraseDone"));
      setShowEraseModal(false);
      setAckChecked(false);
      await loadInventory();
    } catch {
      toast.error(t("dataRightsEraseError"));
    } finally {
      if (mountedRef.current) setErasing(false);
    }
  };

  const closeEraseModal = () => {
    setShowEraseModal(false);
    setAckChecked(false);
  };

  const cloud = exportData?.cloudSnapshot ?? null;
  const stats = exportData?.stats ?? null;

  return (
    <div className="min-h-screen px-5 pt-12 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-5"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("settings")}
            aria-label={t("backToSettings")}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform focus-ring"
          >
            <ArrowLeft size={18} className="text-white/70" />
          </button>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)]">
            {t("dataRightsTitle")}
          </h1>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        <motion.p variants={itemVariants} className="text-white/50 text-sm leading-relaxed px-1">
          {t("dataRightsSubtitle")}
        </motion.p>

        {/* ============ Inventory ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileJson size={16} className="text-[#2DD4BF]" />
            <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-white/80 font-[family-name:var(--font-poppins)]">
              {t("dataRightsInventoryTitle")}
            </h2>
          </div>

          {loadError && (
            <div className="text-center py-6">
              <p className="text-white/50 text-sm mb-3">{t("dataRightsLoadError")}</p>
              <button
                onClick={loadInventory}
                className="px-4 py-2 rounded-xl bg-white/8 hover:bg-white/12 text-white/80 text-xs font-medium inline-flex items-center gap-2 transition-colors focus-ring"
              >
                <RefreshCw size={13} /> {t("retry")}
              </button>
            </div>
          )}

          {exportData === null && !loadError && (
            <div className="space-y-3" aria-hidden>
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[76px] rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          )}

          {exportData !== null && !loadError && (
            <div className="space-y-3">
              {/* 1. Local device data — always present (local-first) */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#10B981]/8 border border-[#10B981]/20">
                <div className="w-9 h-9 rounded-xl bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                  <Smartphone size={16} className="text-[#4ADE80]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{t("dataRightsLocalTitle")}</p>
                  <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                    {t("dataRightsLocalDesc")}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
                      {t("dataRightsChipStreak", { n: streakDays })}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
                      {t("dataRightsChipLevel", { level: levelInfo.level })}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
                      {t("dataRightsChipJournal", { n: journalEntries.length })}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Cloud backup snapshot */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#2DD4BF]/8 border border-[#2DD4BF]/20">
                <div className="w-9 h-9 rounded-xl bg-[#2DD4BF]/20 flex items-center justify-center flex-shrink-0">
                  {cloud ? (
                    <Cloud size={16} className="text-[#2DD4BF]" />
                  ) : (
                    <CloudOff size={16} className="text-white/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{t("dataRightsCloudTitle")}</p>
                  <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                    {t("dataRightsCloudDesc")}
                  </p>
                  {cloud ? (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
                        {t("dataRightsChipStreak", { n: cloud.streakDays })}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
                        {t("dataRightsChipPlan", { plan: cloud.plan })}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
                        {t("dataRightsSyncedAt", {
                          date: formatDateTime(
                            exportData.device.snapshotUpdatedAt ?? new Date().toISOString(),
                            locale
                          ),
                        })}
                      </span>
                    </div>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/50 mt-2">
                      {t("dataRightsNoCloud")}
                    </span>
                  )}
                </div>
              </div>

              {/* 3. Payment history */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F59E0B]/8 border border-[#F59E0B]/20">
                <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
                  <CreditCard size={16} className="text-[#FBBF24]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{t("dataRightsPaymentsTitle")}</p>
                  <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                    {t("dataRightsPaymentsDesc")}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
                      {t("dataRightsPaymentsCount", { n: stats?.paymentsCount ?? 0 })}
                    </span>
                    {stats && stats.totalSpent > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
                        {t("dataRightsSpentTotal", {
                          amount: stats.totalSpent.toLocaleString("fr-FR"),
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.section>

        {/* ============ Export (access & portability) ============ */}
        <motion.section
          variants={itemVariants}
          className="glass-card p-5 relative overflow-hidden"
        >
          <div
            className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl bg-[#10B981]/10 pointer-events-none"
            aria-hidden
          />
          <div className="flex items-start gap-3 mb-4 relative">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 flex items-center justify-center flex-shrink-0">
              <Download size={18} className="text-[#4ADE80]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white text-base font-bold font-[family-name:var(--font-poppins)] leading-tight">
                {t("dataRightsExportTitle")}
              </h2>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">
                {t("dataRightsExportDesc")}
              </p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleExport}
            disabled={exporting}
            className={`w-full py-3.5 rounded-2xl font-[family-name:var(--font-poppins)] font-semibold text-sm flex items-center justify-center gap-2 transition-transform focus-ring ${
              exporting
                ? "bg-white/10 text-white/40 cursor-wait"
                : "gradient-primary text-white glow-green"
            }`}
          >
            {exporting ? (
              <>
                <RefreshCw size={15} className="animate-spin" /> {t("dataRightsExporting")}
              </>
            ) : (
              <>
                <FileJson size={15} /> {t("dataRightsExportBtn")}
              </>
            )}
          </motion.button>
        </motion.section>

        {/* ============ Right to erasure ============ */}
        <motion.section
          variants={itemVariants}
          className="glass-card p-5 relative overflow-hidden border-[#FF453A]/15"
        >
          <div
            className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl bg-[#FF453A]/10 pointer-events-none"
            aria-hidden
          />
          <div className="flex items-start gap-3 mb-4 relative">
            <div className="w-10 h-10 rounded-xl bg-[#FF453A]/12 flex items-center justify-center flex-shrink-0">
              <Trash2 size={18} className="text-[#FF6B61]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white text-base font-bold font-[family-name:var(--font-poppins)] leading-tight">
                {t("dataRightsEraseTitle")}
              </h2>
              <p className="text-white/50 text-xs mt-1 leading-relaxed">
                {t("dataRightsEraseDesc")}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowEraseModal(true)}
            disabled={erasing}
            className="relative w-full py-3 rounded-2xl border border-[#FF453A]/30 bg-[#FF453A]/8 text-[#FF6B61] text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform focus-ring"
          >
            <Trash2 size={15} /> {t("dataRightsEraseBtn")}
          </button>
        </motion.section>

        {/* Trust note */}
        <motion.p variants={itemVariants} className="text-center text-[11px] text-white/30 px-4">
          {t("dataRightsNote")}
        </motion.p>
      </motion.div>

      {/* ============ Erase confirmation modal ============ */}
      {showEraseModal && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("dataRightsEraseConfirmTitle")}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card-strong p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FF453A]/15 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-[#FF6B61]" />
              </div>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)]">
                {t("dataRightsEraseConfirmTitle")}
              </h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {t("dataRightsEraseConfirmDesc")}
            </p>

            <button
              onClick={() => setAckChecked((v) => !v)}
              role="checkbox"
              aria-checked={ackChecked}
              className="w-full flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-left mb-5 hover:bg-white/8 transition-colors focus-ring"
            >
              {ackChecked ? (
                <CheckSquare size={18} className="text-[#FF6B61] shrink-0 mt-0.5" />
              ) : (
                <Square size={18} className="text-white/40 shrink-0 mt-0.5" />
              )}
              <span className="text-white/80 text-sm leading-relaxed">
                {t("dataRightsEraseAck")}
              </span>
            </button>

            <div className="flex gap-3">
              <button
                onClick={closeEraseModal}
                className="flex-1 py-3 rounded-2xl gradient-primary text-white font-semibold text-sm glow-green active:scale-[0.98] transition-transform focus-ring"
              >
                {t("dataRightsEraseCancel")}
              </button>
              <button
                onClick={handleErase}
                disabled={!ackChecked || erasing}
                className={`flex-1 py-3 rounded-2xl border border-[#FF453A]/30 font-semibold text-sm active:scale-[0.98] transition-transform focus-ring flex items-center justify-center gap-2 ${
                  ackChecked && !erasing
                    ? "bg-[#FF453A]/15 text-[#FF6B61]"
                    : "bg-white/5 text-white/30 cursor-not-allowed"
                }`}
              >
                {erasing && <RefreshCw size={14} className="animate-spin" />}
                {t("dataRightsEraseConfirmBtn")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
