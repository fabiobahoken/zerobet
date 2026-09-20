"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Crown,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  ServerCog,
  Send,
  HeartHandshake,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { getDeviceId } from "@/lib/device";
import { haptics } from "@/lib/haptics";
import { PLAN_INFO } from "./SettingsScreen";

/**
 * Zerobet 2.0.5 — SubscriptionScreen
 *
 * "Gérer mon abonnement" destination:
 *   1. Current plan card — name, billing cycle, active since, next renewal
 *      estimate (client-side: activation date + 30/365 days) and a cancel
 *      flow (downgrade to free) behind an explicit confirmation modal.
 *   2. Payment history — last 50 Mobile Money attempts for this deviceId,
 *      fetched from /api/payment/history (phones already masked server-side).
 *
 * The history endpoint is the same trust model as /api/progress: the
 * deviceId is an unguessable random ID, no account needed.
 */

type PaymentStatus = "pending" | "processing" | "success" | "failed" | "expired";

interface PaymentRow {
  id: string;
  plan: string;
  billingCycle: string;
  operator: string;
  phone: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  failReason: string | null;
  createdAt: string;
}

const OPERATORS: Record<
  string,
  { name: string; color: string; textDark?: boolean }
> = {
  orange: { name: "Orange Money", color: "#FF7900" },
  mtn: { name: "MTN MoMo", color: "#FFCB05", textDark: true },
  wave: { name: "Wave", color: "#FFC94D" },
  moov: { name: "Moov Money", color: "#F43F5E" },
  // Zerobet 2.1.0 — real-gateway providers (webhook records)
  cinetpay: { name: "CinetPay", color: "#009E60" },
  flutterwave: { name: "Flutterwave", color: "#FB4E20" },
};

const STATUS_STYLE: Record<PaymentStatus, { badgeClass: string; dotClass: string }> = {
  success: {
    badgeClass: "bg-[#FF6B00]/15 text-[#FFC94D] border-[#FF6B00]/30",
    dotClass: "bg-[#FFC94D]",
  },
  failed: {
    badgeClass: "bg-[#FF453A]/12 text-[#FF6B61] border-[#FF453A]/25",
    dotClass: "bg-[#FF6B61]",
  },
  expired: {
    badgeClass: "bg-white/8 text-white/50 border-white/15",
    dotClass: "bg-white/40",
  },
  pending: {
    badgeClass: "bg-[#F59E0B]/12 text-[#FBBF24] border-[#F59E0B]/25",
    dotClass: "bg-[#FBBF24]",
  },
  processing: {
    badgeClass: "bg-[#F59E0B]/12 text-[#FBBF24] border-[#F59E0B]/25",
    dotClass: "bg-[#FBBF24]",
  },
};

/** Exit-survey reason keys (Zerobet 2.1.0). */
const SURVEY_REASONS = [
  "surveyReasonPrice",
  "surveyReasonUnused",
  "surveyReasonBreak",
  "surveyReasonTechnical",
  "surveyReasonOther",
] as const;

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

function formatMoney(amount: number, currency: string): string {
  return `${amount.toLocaleString("fr-FR")} ${currency}`;
}

function formatDate(iso: string, withTime = false): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const base = d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  if (!withTime) return base;
  return `${base} · ${d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function SubscriptionScreen() {
  const t = useT();
  const {
    plan,
    planBillingCycle,
    planStartedAt,
    planRenewsAt,
    navigate,
  } = useStore();

  const [payments, setPayments] = useState<PaymentRow[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyReason, setSurveyReason] = useState<string | null>(null);
  const [surveyComment, setSurveyComment] = useState("");
  const mountedRef = useRef(true);

  const loadHistory = useCallback(async () => {
    setLoadError(false);
    setPayments(null);
    try {
      const deviceId = getDeviceId();
      if (!deviceId) throw new Error("no device id");
      const res = await fetch(
        `/api/payment/history?deviceId=${encodeURIComponent(deviceId)}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (mountedRef.current) {
        setPayments(Array.isArray(data.payments) ? data.payments : []);
      }
    } catch {
      if (mountedRef.current) {
        setLoadError(true);
        setPayments([]);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    loadHistory();
    return () => {
      mountedRef.current = false;
    };
  }, [loadHistory]);

  const planInfo = PLAN_INFO[plan];
  const isPaid = plan !== "free";

  // Renewal date — Zerobet 2.1.0: prefer the SERVER-confirmed date
  // (webhook/gateway stored it in the snapshot) over the client estimate.
  const serverRenewsValid =
    !!planRenewsAt && !Number.isNaN(new Date(planRenewsAt).getTime());
  const renewalDate = (() => {
    if (!isPaid) return null;
    if (serverRenewsValid) return new Date(planRenewsAt as string);
    if (!planStartedAt) return null;
    const start = new Date(planStartedAt);
    if (Number.isNaN(start.getTime())) return null;
    const next = new Date(start);
    if (planBillingCycle === "annual") next.setFullYear(next.getFullYear() + 1);
    else next.setDate(next.getDate() + 30);
    return next;
  })();

  const handleCancel = () => {
    setShowCancelModal(false);
    useStore.getState().cancelPaidPlan();
    haptics.warning();
    toast.success(t("subscriptionCancelledToast"));
    // Zerobet 2.1.0 — capture the exit reason (optional, skippable).
    setSurveyReason(null);
    setSurveyComment("");
    setShowSurvey(true);
  };

  const handleSurveySend = () => {
    if (!surveyReason) return;
    useStore.getState().setDowngradeSurvey({
      reason: surveyReason,
      comment: surveyComment.trim() ? surveyComment.trim().slice(0, 200) : null,
      at: new Date().toISOString(),
    });
    setShowSurvey(false);
    haptics.light();
    toast.success(t("surveyThanksToast"));
  };

  const successCount = payments?.filter((p) => p.status === "success").length ?? 0;

  return (
    <div className="min-h-screen px-5 pt-12 pb-8">
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
            {t("subscriptionTitle")}
          </h1>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        {/* ============ Current plan card ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5 relative overflow-hidden">
          {/* ambient glow matching the plan */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: planInfo.color }}
            aria-hidden
          />
          <div className="flex items-start gap-3 relative">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${planInfo.glowClass}`}
              style={{ background: planInfo.gradient }}
              aria-hidden
            >
              {(() => {
                const PI = planInfo.icon as unknown as LucideIcon | string;
                return typeof PI === "string" ? (
                  PI
                ) : (
                  <PI
                    size={22}
                    strokeWidth={2.1}
                    style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.55))" }}
                  />
                );
              })()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-lg font-bold text-white font-[family-name:var(--font-poppins)] leading-tight">
                  {t(planInfo.labelKey)}
                </p>
                {isPaid && (
                  <span className="px-2 py-0.5 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-[#FFC94D] text-[10px] font-semibold uppercase tracking-wide">
                    {t("subscriptionActiveBadge")}
                  </span>
                )}
              </div>
              <p className="text-white/50 text-xs mt-1">
                {isPaid
                  ? planBillingCycle === "annual"
                    ? t("subscriptionCycleAnnual")
                    : t("subscriptionCycleMonthly")
                  : t("planFreeDesc")}
              </p>
            </div>
          </div>

          {isPaid && (
            <div className="mt-4 space-y-2 relative">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <ShieldCheck size={14} className="text-[#FFC94D] shrink-0" />
                <span>
                  {planStartedAt
                    ? t("subscriptionActiveSince", {
                        date: formatDate(planStartedAt),
                      })
                    : t("subscriptionActiveSinceUnknown")}
                </span>
              </div>
              {renewalDate && (
                <div className="flex items-center gap-2 text-xs text-white/60 flex-wrap">
                  <RefreshCw size={14} className="text-[#FFB020] shrink-0" />
                  <span>
                    {t("subscriptionNextRenewal", {
                      date: formatDate(renewalDate.toISOString()),
                    })}
                  </span>
                  {serverRenewsValid && (
                    <span
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#FFB020]/12 border border-[#FFB020]/25 text-[#5EEAD4] text-[9px] font-semibold uppercase tracking-wide"
                      title={t("subscriptionServerVerified")}
                    >
                      <ServerCog size={10} aria-hidden />
                      {t("subscriptionServerVerified")}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {isPaid ? (
            <button
              onClick={() => setShowCancelModal(true)}
              className="mt-5 w-full py-3 rounded-2xl border border-[#FF453A]/30 bg-[#FF453A]/8 text-[#FF6B61] text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform focus-ring"
            >
              <AlertTriangle size={15} />
              {t("subscriptionCancel")}
            </button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("paywall")}
              className="mt-5 w-full py-3.5 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-sm glow-green flex items-center justify-center gap-2 transition-transform focus-ring"
            >
              <Crown size={16} /> {t("upgradeToPremium")}
              <ChevronRight size={15} />
            </motion.button>
          )}
        </motion.section>

        {/* ============ Payment history ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-[#FFB020]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-white/50 font-[family-name:var(--font-poppins)]">
                {t("subscriptionHistoryTitle")}
              </h2>
            </div>
            {successCount > 0 && (
              <span className="text-[11px] text-white/40">
                {t("subscriptionSuccessCount", { n: successCount })}
              </span>
            )}
          </div>

          {payments === null && !loadError && (
            <div className="space-y-3" aria-hidden>
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-16 rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          )}

          {loadError && (
            <div className="text-center py-6">
              <p className="text-white/50 text-sm mb-3">
                {t("subscriptionLoadError")}
              </p>
              <button
                onClick={loadHistory}
                className="px-4 py-2 rounded-xl bg-white/8 hover:bg-white/12 text-white/80 text-xs font-medium inline-flex items-center gap-2 transition-colors focus-ring"
              >
                <RefreshCw size={13} /> {t("retry")}
              </button>
            </div>
          )}

          {payments !== null && payments.length === 0 && !loadError && (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-3">
                <CreditCard size={22} className="text-white/30" />
              </div>
              <p className="text-white/60 text-sm font-medium">
                {t("subscriptionNoPayments")}
              </p>
              <p className="text-white/35 text-xs mt-1">
                {t("subscriptionNoPaymentsDesc")}
              </p>
            </div>
          )}

          {payments !== null && payments.length > 0 && (
            <ul className="space-y-3 max-h-96 overflow-y-auto pr-1 nice-scrollbar">
              {payments.map((p) => {
                const op = OPERATORS[p.operator];
                const st = STATUS_STYLE[p.status] ?? STATUS_STYLE.processing;
                return (
                  <li
                    key={p.id}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06]"
                  >
                    {/* operator dot */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{
                        background: op?.color ?? "#6B7280",
                        color: op?.textDark ? "#2B1A0C" : "#FFFFFF",
                      }}
                      aria-hidden
                    >
                      {(op?.name ?? "?").slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white truncate">
                          {op?.name ?? p.operator}
                        </p>
                        <span
                          className={`px-1.5 py-0.5 rounded-full border text-[9px] font-semibold uppercase tracking-wide ${st.badgeClass}`}
                        >
                          {t(`subscriptionStatus_${p.status}`)}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/40 mt-0.5">
                        {formatDate(p.createdAt, true)}
                        {p.phone ? ` · ${p.phone}` : ""}
                      </p>
                      {p.status === "failed" && p.failReason && (
                        <p className="text-[11px] text-[#FF6B61]/80 mt-0.5">
                          {t("subscriptionFailReason", {
                            reason: t(`subscriptionFail_${p.failReason}`),
                          })}
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-white font-[family-name:var(--font-poppins)]">
                        {formatMoney(p.amount, p.currency)}
                      </p>
                      <p className="text-[10px] text-white/35">
                        {p.billingCycle === "annual"
                          ? t("subscriptionCycleAnnualShort")
                          : t("subscriptionCycleMonthlyShort")}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.section>

        {/* Trust note */}
        <motion.p
          variants={itemVariants}
          className="text-center text-[11px] text-white/30 px-4"
        >
          {t("subscriptionTrustNote")}
        </motion.p>
      </motion.div>

      {/* ============ Cancel confirmation modal ============ */}
      {showCancelModal && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("subscriptionCancelConfirmTitle")}
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
                {t("subscriptionCancelConfirmTitle")}
              </h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t("subscriptionCancelConfirmDesc")}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 rounded-2xl gradient-primary text-white font-semibold text-sm glow-green active:scale-[0.98] transition-transform focus-ring"
              >
                {t("subscriptionCancelKeep")}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-3 rounded-2xl border border-[#FF453A]/30 bg-[#FF453A]/8 text-[#FF6B61] font-semibold text-sm active:scale-[0.98] transition-transform focus-ring"
              >
                {t("subscriptionCancelYes")}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ============ Exit survey (optional, Zerobet 2.1.0) ============ */}
      {showSurvey && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("subscriptionSurveyTitle")}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card-strong p-6 max-w-md w-full max-h-[88dvh] overflow-y-auto nice-scrollbar"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF6B00]/15 flex items-center justify-center shrink-0">
                  <HeartHandshake size={20} className="text-[#FFC94D]" aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)] leading-tight">
                  {t("subscriptionSurveyTitle")}
                </h3>
              </div>
              <button
                onClick={() => setShowSurvey(false)}
                aria-label={t("surveySkip")}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors focus-ring shrink-0"
              >
                <X size={16} aria-hidden />
              </button>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-4">
              {t("subscriptionSurveyDesc")}
            </p>

            {/* Reason chips */}
            <div className="flex flex-wrap gap-2 mb-4" role="radiogroup" aria-label={t("subscriptionSurveyTitle")}>
              {SURVEY_REASONS.map((reasonKey) => {
                const selected = surveyReason === reasonKey;
                return (
                  <button
                    key={reasonKey}
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      setSurveyReason(selected ? null : reasonKey);
                      haptics.light();
                    }}
                    className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-all active:scale-95 focus-ring ${
                      selected
                        ? "bg-[#FF6B00]/20 border-[#FF6B00]/50 text-[#6EE7B7]"
                        : "bg-white/[0.04] border-white/10 text-white/60 hover:border-white/25 hover:text-white/80"
                    }`}
                  >
                    {t(reasonKey)}
                  </button>
                );
              })}
            </div>

            {/* Optional comment */}
            <textarea
              value={surveyComment}
              onChange={(e) => setSurveyComment(e.target.value.slice(0, 200))}
              placeholder={t("surveyCommentPlaceholder")}
              rows={2}
              maxLength={200}
              className="w-full rounded-2xl bg-white/[0.05] border border-white/10 focus:border-[#FFB020]/60 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors resize-none focus-ring mb-1"
            />
            <p className="text-right text-[10px] text-white/25 mb-4">
              {surveyComment.length}/200
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSurvey(false)}
                className="flex-1 py-3 rounded-2xl bg-white/6 hover:bg-white/10 border border-white/10 text-white/70 font-semibold text-sm active:scale-[0.98] transition-transform focus-ring"
              >
                {t("surveySkip")}
              </button>
              <button
                onClick={handleSurveySend}
                disabled={!surveyReason}
                className={`flex-1 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-transform focus-ring ${
                  surveyReason
                    ? "gradient-primary text-white glow-green active:scale-[0.98]"
                    : "bg-white/5 text-white/25 border border-white/8 cursor-not-allowed"
                }`}
              >
                <Send size={14} aria-hidden />
                {t("surveySend")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
