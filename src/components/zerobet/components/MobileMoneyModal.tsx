"use client";

/**
 * Zerobet 2.0.4 — Mobile Money payment modal (simulated gateway).
 *
 * Flow: operator → phone → confirm → processing (USSD push simulation)
 *       → success / failed (retry).
 *
 * QA: a phone number ending in "0000" triggers the simulated operator
 * rejection so the failure path is testable.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Smartphone,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  Phone,
  Repeat,
} from "lucide-react";
import { useT } from "@/lib/i18n/useT";
import { formatCurrency } from "@/lib/data/currency-data";
import { useStore } from "@/store/zerobet-store";
import { haptics } from "@/lib/haptics";

export type MobileMoneyOperator = "orange" | "mtn" | "wave" | "moov";

const OPERATORS: {
  id: MobileMoneyOperator;
  name: string;
  color: string;
  textDark?: boolean;
  countries: string;
}[] = [
  { id: "orange", name: "Orange Money", color: "#FF7900", countries: "CI · SN · CM · ML · BF" },
  { id: "mtn", name: "MTN MoMo", color: "#FFCB05", textDark: true, countries: "CI · GH · CM · BJ · UG" },
  { id: "wave", name: "Wave", color: "#1DC8FF", countries: "SN · CI · ML · BF" },
  { id: "moov", name: "Moov Money", color: "#F43F5E", countries: "CI · BJ · TG · GA" },
];

type PaymentStep = "operator" | "phone" | "confirm" | "processing" | "success" | "failed";

interface MobileMoneyModalProps {
  open: boolean;
  planId: string; // premium | mentor | psychologist
  planName: string;
  billingCycle: "monthly" | "annual";
  amountFCFA: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function MobileMoneyModal({
  open,
  planId,
  planName,
  billingCycle,
  amountFCFA,
  onClose,
  onSuccess,
}: MobileMoneyModalProps) {
  const t = useT();
  const { currency } = useStore();

  const [step, setStep] = useState<PaymentStep>("operator");
  const [operator, setOperator] = useState<MobileMoneyOperator | null>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [failReason, setFailReason] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const operatorInfo = OPERATORS.find((o) => o.id === operator);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  // NOTE: state is intentionally NOT reset when `open` flips to false.
  // The parent remounts this component (via `key`) on each open, which
  // resets all local state and stops polling on unmount.

  // Cleanup polling on unmount
  useEffect(() => stopPolling, [stopPolling]);

  const startPolling = useCallback(
    (id: string) => {
      stopPolling();
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/payment?id=${encodeURIComponent(id)}`);
          if (!res.ok) return; // transient — keep polling
          const data = await res.json();
          if (data.status === "success") {
            stopPolling();
            haptics.success();
            setStep("success");
          } else if (data.status === "failed") {
            stopPolling();
            haptics.error();
            setFailReason(data.reason || "unknown");
            setStep("failed");
          }
        } catch {
          // network hiccup — keep polling until unmount/close
        }
      }, 900);
    },
    [stopPolling]
  );

  const handlePay = async () => {
    if (!operator) return;
    const digits = phone.replace(/[\s\-().]/g, "");
    if (!/^\d{8,15}$/.test(digits)) {
      setPhoneError(t("paymentPhoneInvalid"));
      return;
    }
    setPhoneError(null);
    setStep("processing");
    haptics.light();

    try {
      let deviceId = "";
      try {
        deviceId = localStorage.getItem("zerobet-device-id") || "";
      } catch {
        /* private mode */
      }

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planId,
          billingCycle,
          operator,
          phone: digits,
          deviceId,
          currency: "FCFA",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.paymentId) {
        setFailReason(data.error || "invalid");
        setStep("failed");
        return;
      }
      setPaymentId(data.paymentId);
      startPolling(data.paymentId);
    } catch {
      setFailReason("network");
      setStep("failed");
    }
  };

  const selectOperator = (id: MobileMoneyOperator) => {
    setOperator(id);
    setStep("phone");
    haptics.light();
  };

  const goToConfirm = () => {
    const digits = phone.replace(/[\s\-().]/g, "");
    if (!/^\d{8,15}$/.test(digits)) {
      setPhoneError(t("paymentPhoneInvalid"));
      return;
    }
    setPhoneError(null);
    setStep("confirm");
    haptics.light();
  };

  const totalLabel = formatCurrency(amountFCFA, currency);
  const cycleLabel = billingCycle === "annual" ? t("paymentCycleAnnual") : t("paymentCycleMonthly");

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4">
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label={t("paymentTitle")}
            className="glass-card-strong w-full max-w-md p-5 relative overflow-hidden"
          >
            {/* Ambient glow of selected operator */}
            {operatorInfo && (
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ background: operatorInfo.color }}
              />
            )}

            {/* ===== Header ===== */}
            <div className="flex items-center justify-between mb-4 relative">
              <div className="flex items-center gap-2">
                {step !== "operator" && step !== "processing" && step !== "success" && (
                  <button
                    onClick={() => setStep(step === "confirm" ? "phone" : "operator")}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    aria-label={t("paymentBack")}
                  >
                    <ChevronLeft size={16} className="text-white/70" />
                  </button>
                )}
                <h2 className="text-base font-bold text-white font-[family-name:var(--font-poppins)]">
                  {step === "operator" && t("paymentTitle")}
                  {step === "phone" && t("paymentPhoneTitle")}
                  {step === "confirm" && t("paymentConfirmTitle")}
                  {step === "processing" && t("paymentProcessingTitle")}
                  {step === "success" && t("paymentSuccessTitle")}
                  {step === "failed" && t("paymentFailedTitle")}
                </h2>
              </div>
              {step !== "processing" && step !== "success" && (
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label={t("close")}
                >
                  <X size={16} className="text-white/70" />
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {/* ===== STEP 1: Operator ===== */}
              {step === "operator" && (
                <motion.div
                  key="operator"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p className="text-white/60 text-sm mb-4">{t("paymentSubtitle")}</p>
                  <div className="space-y-2.5" role="radiogroup" aria-label={t("paymentOperatorLabel")}>
                    {OPERATORS.map((op, idx) => (
                      <motion.button
                        key={op.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        role="radio"
                        aria-checked={operator === op.id}
                        onClick={() => selectOperator(op.id)}
                        className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 transition-all active:scale-[0.98]"
                      >
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold text-sm"
                          style={{ background: op.color, color: op.textDark ? "#1A1A1A" : "#FFFFFF" }}
                        >
                          {op.name.charAt(0)}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-white font-semibold text-sm">{op.name}</p>
                          <p className="text-white/40 text-[11px]">{op.countries}</p>
                        </div>
                        <Smartphone size={16} className="text-white/30" />
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-white/35">
                    <ShieldCheck size={12} />
                    {t("paymentSecure")}
                  </div>
                </motion.div>
              )}

              {/* ===== STEP 2: Phone number ===== */}
              {step === "phone" && operatorInfo && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm"
                      style={{ background: operatorInfo.color, color: operatorInfo.textDark ? "#1A1A1A" : "#FFFFFF" }}
                    >
                      {operatorInfo.name.charAt(0)}
                    </div>
                    <p className="text-white/70 text-sm">{operatorInfo.name}</p>
                  </div>

                  <label htmlFor="mm-phone" className="text-white/60 text-xs mb-2 block">
                    {t("paymentPhoneLabel")}
                  </label>
                  <div className="relative mb-1.5">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      id="mm-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (phoneError) setPhoneError(null);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && goToConfirm()}
                      placeholder="07 00 00 00 00"
                      maxLength={20}
                      autoFocus
                      className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 text-white text-base tracking-wide placeholder:text-white/20 border outline-none transition-colors focus:border-[#10B981] ${
                        phoneError ? "border-[#FF453A]" : "border-white/10"
                      }`}
                    />
                  </div>
                  {phoneError ? (
                    <p className="text-[#FF6B60] text-xs mb-3">{phoneError}</p>
                  ) : (
                    <p className="text-white/35 text-xs mb-3">{t("paymentPhoneHint")}</p>
                  )}

                  <button
                    onClick={goToConfirm}
                    className="w-full py-3.5 rounded-xl gradient-primary text-white font-semibold text-sm glow-green active:scale-[0.98] transition-transform"
                  >
                    {t("paymentContinue")}
                  </button>
                </motion.div>
              )}

              {/* ===== STEP 3: Confirm ===== */}
              {step === "confirm" && operatorInfo && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-4 space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">{t("paymentSummaryPlan")}</span>
                      <span className="text-white font-medium">{planName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">{t("paymentSummaryCycle")}</span>
                      <span className="text-white font-medium">{cycleLabel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">{t("paymentSummaryOperator")}</span>
                      <span className="text-white font-medium">{operatorInfo.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">{t("paymentSummaryPhone")}</span>
                      <span className="text-white font-medium tracking-wide">{phone}</span>
                    </div>
                    <div className="h-px bg-white/10 my-1" />
                    <div className="flex justify-between items-baseline">
                      <span className="text-white/60 text-sm">{t("paymentTotal")}</span>
                      <span className="text-xl font-extrabold text-[#4ADE80] font-[family-name:var(--font-poppins)]">
                        {totalLabel}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handlePay}
                    className="w-full py-4 rounded-xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-green flex items-center justify-center gap-2 active:scale-[0.98] transition-transform mb-3"
                  >
                    <Smartphone size={18} />
                    {t("paymentPayNow")}
                  </button>
                  <p className="text-white/35 text-[11px] text-center">{t("paymentCancelAnytime")}</p>
                </motion.div>
              )}

              {/* ===== STEP 4: Processing (USSD push simulation) ===== */}
              {step === "processing" && operatorInfo && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-4 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-5"
                    style={{ background: `${operatorInfo.color}26` }}
                  >
                    <Loader2 size={34} className="animate-spin" style={{ color: operatorInfo.color }} />
                  </motion.div>

                  <p className="text-white font-semibold text-sm mb-1.5">{t("paymentProcessingCheckPhone")}</p>
                  <p className="text-white/50 text-xs leading-relaxed mb-5 px-2">
                    {t("paymentProcessingEnterCode", { operator: operatorInfo.name })}
                  </p>

                  {/* Fake status timeline */}
                  <div className="max-w-[240px] mx-auto space-y-2.5 text-left">
                    <StatusLine label={t("paymentStepRequest")} done />
                    <StatusLine label={t("paymentStepUssd")} pending />
                    <StatusLine label={t("paymentStepDebit")} idle />
                  </div>
                </motion.div>
              )}

              {/* ===== STEP 5: Success ===== */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-5 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center mb-5 glow-green"
                  >
                    <CheckCircle2 size={38} className="text-white" />
                  </motion.div>
                  <p className="text-white font-bold text-lg font-[family-name:var(--font-poppins)] mb-1.5">
                    {t("paymentSuccessDesc", { plan: planName })}
                  </p>
                  <p className="text-white/50 text-xs mb-6">
                    {t("paymentSuccessReceipt", { amount: totalLabel })}
                  </p>
                  <button
                    onClick={onSuccess}
                    className="w-full py-4 rounded-xl gradient-primary text-white font-semibold text-sm glow-green active:scale-[0.98] transition-transform"
                  >
                    {t("paymentSuccessCta")}
                  </button>
                </motion.div>
              )}

              {/* ===== STEP 6: Failed ===== */}
              {step === "failed" && operatorInfo && (
                <motion.div
                  key="failed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-4 text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#FF453A]/15 flex items-center justify-center mb-4">
                    <XCircle size={30} className="text-[#FF6B60]" />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1.5">{t("paymentFailedDesc")}</p>
                  <p className="text-white/45 text-xs mb-5">
                    {failReason === "insufficient_funds"
                      ? t("paymentFailedFunds")
                      : t("paymentFailedGeneric")}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={onClose}
                      className="flex-1 py-3.5 rounded-xl glass-card text-white/70 font-medium text-sm"
                    >
                      {t("close")}
                    </button>
                    <button
                      onClick={() => {
                        setStep("phone");
                        setFailReason(null);
                      }}
                      className="flex-1 py-3.5 rounded-xl gradient-primary text-white font-semibold text-sm flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
                    >
                      <Repeat size={15} />
                      {t("paymentRetry")}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function StatusLine({
  label,
  done,
  pending,
  idle,
}: {
  label: string;
  done?: boolean;
  pending?: boolean;
  idle?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`w-4 h-4 rounded-full flex-shrink-0 ${
          done ? "bg-[#4ADE80]" : pending ? "bg-[#FBBF24]/80" : "bg-white/15"
        }`}
      >
        {pending && !idle && (
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="w-full h-full rounded-full bg-[#FBBF24]"
          />
        )}
      </div>
      <span className={`text-xs ${done || pending || idle ? "text-white/80" : "text-white/35"}`}>{label}</span>
    </div>
  );
}
