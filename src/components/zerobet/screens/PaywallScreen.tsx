"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Check, Crown, Shield, Sparkles, Heart, Smartphone } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { PLAN_OPTIONS, type PlanOption } from "@/lib/data/app-data";
import { formatCurrency } from "@/lib/data/currency-data";
import { OnboardingProgress } from "@/components/zerobet/components/OnboardingProgress";
import { MobileMoneyModal } from "@/components/zerobet/components/MobileMoneyModal";
import { useT } from "@/lib/i18n/useT";

export function PaywallScreen() {
  const { plan, setPlan, activatePaidPlan, navigate, goBack, dataConsent, setDataConsent, setCompletedOnboarding, streakDays, currency } = useStore();
  const t = useT();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plan);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [showConsent, setShowConsent] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [pendingPlanId, setPendingPlanId] = useState<string | null>(null);

  const handleSelectPlan = (planId: PlanOption["id"]) => {
    setSelectedPlanId(planId);
  };

  const activatePlan = (planId: string) => {
    setPlan(planId as PlanOption["id"]);
    setCompletedOnboarding(true);
    // Unlock first rank
    navigate("dashboard");
  };

  const handleConfirm = () => {
    const planOption = PLAN_OPTIONS.find((p) => p.id === selectedPlanId);
    if (!planOption) return;

    if (planOption.id !== "free") {
      if (!dataConsent) {
        setShowConsent(true);
        return;
      }
      // Paid plan → open the Mobile Money checkout (Zerobet 2.0.4)
      setPendingPlanId(planOption.id);
      setShowPayment(true);
      return;
    }

    activatePlan(planOption.id);
  };

  const handleAcceptConsent = () => {
    setDataConsent(true);
    setShowConsent(false);
    if (selectedPlanId !== "free") {
      // Continue to payment after consent
      setPendingPlanId(selectedPlanId);
      setShowPayment(true);
      return;
    }
    activatePlan(selectedPlanId);
  };

  // CTA label adapts to the payment flow
  const ctaLabel =
    selectedPlanId === "free"
      ? t("paywallStartFree")
      : billingCycle === "annual"
        ? t("paywallSubscribeAnnual", {
            amount: formatCurrency(
              PLAN_OPTIONS.find((p) => p.id === selectedPlanId)?.annualPrice ?? 0,
              currency
            ),
          })
        : t("paywallSubscribeMonthly", {
            amount: formatCurrency(
              PLAN_OPTIONS.find((p) => p.id === selectedPlanId)?.monthlyPrice ?? 0,
              currency
            ),
          });

  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-8">
      <OnboardingProgress currentStep={8} />
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div>
          <p className="text-white/50 text-xs">{t("paywallLastStep")}</p>
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
            {t("paywallTitle")}
          </h1>
        </div>
      </div>

      {/* Hero message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs text-[#FF9500] mb-3">
          <Sparkles size={12} />
          {t("paywallSubtitle")}
        </div>
        <p className="text-white/70 text-sm leading-relaxed">
          {t("paywallHero1")}
        </p>
      </motion.div>

      {/* Billing toggle */}
      <div className="flex p-1 glass-card rounded-2xl mb-4">
        <button
          onClick={() => setBillingCycle("monthly")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            billingCycle === "monthly" ? "gradient-primary text-white" : "text-white/60"
          }`}
        >
          {t("paywallMonthly")}
        </button>
        <button
          onClick={() => setBillingCycle("annual")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1 ${
            billingCycle === "annual" ? "gradient-primary text-white" : "text-white/60"
          }`}
        >
          {t("paywallAnnual")}
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#4ADE80] text-[#070B0E] font-bold">
            -40%
          </span>
        </button>
      </div>

      {/* Plans list */}
      <div className="flex-1 overflow-y-auto custom-scroll -mx-6 px-6 space-y-3 pb-4">
        {PLAN_OPTIONS.map((planOption, idx) => {
          const isSelected = selectedPlanId === planOption.id;
          const price = billingCycle === "monthly" ? planOption.monthlyPrice : Math.round(planOption.annualPrice / 12);

          return (
            <motion.div
              key={planOption.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              role="button"
              tabIndex={0}
              onClick={() => handleSelectPlan(planOption.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelectPlan(planOption.id); }}
              className={`relative glass-card-strong p-5 cursor-pointer transition-all ${
                isSelected ? "ring-2 ring-[#10B981] glow-green" : ""
              }`}
            >
              {/* Badges */}
              <div className="absolute -top-2.5 right-4 flex gap-1.5">
                {planOption.popular && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white gradient-primary flex items-center gap-1">
                    <Crown size={10} /> {t("paywallPopularBadge")}
                  </span>
                )}
                {planOption.bestValue && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-[#070B0E] bg-[#FBBF24]">
                    {t("paywallBestValueBadge")}
                  </span>
                )}
              </div>

              {/* Plan header */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: planOption.gradient }}
                >
                  {planOption.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)]">
                      {t(planOption.nameKey)}
                    </h3>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <p className="text-white/50 text-xs">{t(planOption.taglineKey)}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-3">
                {planOption.monthlyPrice === 0 ? (
                  <span className="text-2xl font-extrabold text-white">{t("free")}</span>
                ) : (
                  <>
                    <span className="text-3xl font-extrabold text-white font-[family-name:var(--font-poppins)]">
                      {formatCurrency(price, currency)}
                    </span>
                    <span className="text-white/50 text-sm">{t("planPerMonth")}</span>
                  </>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-1.5">
                {planOption.featureKeys.slice(0, 5).map((featureKey, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/70 text-xs">
                    <Check size={14} className="text-[#4ADE80] mt-0.5 flex-shrink-0" />
                    {t(featureKey)}
                  </li>
                ))}
                {planOption.featureKeys.length > 5 && (
                  <li className="text-white/40 text-xs pl-5">
                    {t("paywallMoreFeatures", { n: planOption.featureKeys.length - 5 })}
                  </li>
                )}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Data protection note */}
      <div className="flex items-center justify-center gap-2 mb-3 text-xs text-white/40">
        <Shield size={12} />
        <span>{t("paywallDataProtection")}</span>
      </div>

      {/* Mobile Money operator trust row */}
      {selectedPlanId !== "free" && (
        <div className="flex items-center justify-center gap-2 mb-3">
          {[
            { name: "Orange", color: "#FF7900", dark: false },
            { name: "MTN", color: "#FFCB05", dark: true },
            { name: "Wave", color: "#1DC8FF", dark: false },
            { name: "Moov", color: "#F43F5E", dark: false },
          ].map((op) => (
            <span
              key={op.name}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60"
            >
              <span
                className="w-3.5 h-3.5 rounded-full inline-block"
                style={{ background: op.color }}
                aria-hidden
              />
              {op.name}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleConfirm}
        className="w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-green flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
      >
        {selectedPlanId === "free" ? <Heart size={18} /> : <Smartphone size={18} />}
        {ctaLabel}
      </button>

      {/* Mobile Money checkout (Zerobet 2.0.4) */}
      {pendingPlanId && pendingPlanId !== "free" && (
        <MobileMoneyModal
          key={`mm-${showPayment}`}
          open={showPayment}
          planId={pendingPlanId}
          planName={t(PLAN_OPTIONS.find((p) => p.id === pendingPlanId)?.nameKey ?? "")}
          billingCycle={billingCycle}
          amountFCFA={
            billingCycle === "annual"
              ? PLAN_OPTIONS.find((p) => p.id === pendingPlanId)?.annualPrice ?? 0
              : PLAN_OPTIONS.find((p) => p.id === pendingPlanId)?.monthlyPrice ?? 0
          }
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false);
            // Zerobet 2.0.5 — record cycle + activation date for the
            // subscription management screen (renewal estimate, history).
            activatePaidPlan(pendingPlanId as PlanOption["id"], billingCycle);
            setCompletedOnboarding(true);
            navigate("dashboard");
          }}
        />
      )}

      {/* Consent modal */}
      {showConsent && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card-strong p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#4ADE80]/20 flex items-center justify-center">
                <Shield size={20} className="text-[#4ADE80]" />
              </div>
              <h3 className="text-lg font-bold text-white">{t("paywallConsentTitle")}</h3>
            </div>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              {t("paywallConsentDesc")}
            </p>
            <label className="flex items-start gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={dataConsent}
                onChange={(e) => setDataConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded accent-[#10B981]"
              />
              <span className="text-white/80 text-sm">
                {t("paywallConsentLabel")}
              </span>
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConsent(false)}
                className="flex-1 py-3 rounded-xl glass-card text-white/70 font-medium text-sm"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleAcceptConsent}
                disabled={!dataConsent}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm ${
                  dataConsent ? "gradient-primary text-white" : "bg-white/5 text-white/30"
                }`}
              >
                {t("confirm")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
