"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, PenLine, RotateCcw } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { ENGAGEMENT_GOALS } from "@/lib/data/app-data";
import { OnboardingProgress } from "@/components/zerobet/components/OnboardingProgress";
import { useT } from "@/lib/i18n/useT";

export function EngagementScreen() {
  const { selectedGoals, toggleGoal, signatureData, setSignature, navigate, goBack } = useStore();
  const t = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(!!signatureData);
  const [step, setStep] = useState<"goals" | "signature" | "plan">("goals");

  // Goals step
  const goalsValid = selectedGoals.length > 0;

  // Signature step
  useEffect(() => {
    if (step !== "signature") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Set up canvas
    ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#F59E0B";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (signatureData) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = signatureData;
    }
  }, [step, signatureData]);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const endDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignature(canvas.toDataURL());
      setHasSigned(true);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
    setHasSigned(false);
  };

  if (step === "goals") {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-12 pb-8">
        <OnboardingProgress currentStep={8} />
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={goBack}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
            aria-label={t("back")}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <p className="text-white/50 text-xs">{t("engagementStep", { n: 8, total: 8 })}</p>
            <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
              {t("engagementTitle")}
            </h1>
          </div>
        </div>

        <p className="text-white/60 text-sm mb-6">
          {t("engagementChooseGoals")}
        </p>

        <div className="flex-1 grid grid-cols-2 gap-3">
          {ENGAGEMENT_GOALS.map((goal, idx) => {
            const isSelected = selectedGoals.includes(goal.key);
            return (
              <motion.button
                key={goal.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleGoal(goal.key)}
                className={`relative glass-card p-4 flex flex-col items-center text-center transition-all ${
                  isSelected ? "ring-2 ring-[#FF6B00] glow-green" : ""
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                )}
                <div className="text-4xl mb-2">{goal.icon}</div>
                <div className="text-white font-semibold text-sm leading-tight mb-1">{t(goal.labelKey)}</div>
                <div className="text-white/50 text-xs leading-tight">{t(goal.descKey)}</div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="text-center text-white/40 text-xs mb-3">
            {t("engagementGoalsCount", { n: selectedGoals.length })}
          </div>
          <button
            onClick={() => setStep("signature")}
            disabled={!goalsValid}
            className={`w-full py-4 rounded-2xl font-[family-name:var(--font-poppins)] font-semibold text-base flex items-center justify-center gap-2 transition-all ${
              goalsValid
                ? "gradient-primary text-white glow-green active:scale-[0.98]"
                : "bg-white/5 text-white/30"
            }`}
          >
            {t("continue")}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (step === "signature") {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-12 pb-8">
        <OnboardingProgress currentStep={8} />
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setStep("goals")}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
            aria-label={t("back")}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <p className="text-white/50 text-xs">{t("engagementStepSignature")}</p>
            <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
              {t("engagementSignHereTitle")}
            </h1>
          </div>
        </div>

        <div className="glass-card p-5 mb-4">
          <p className="text-white/80 text-sm leading-relaxed text-center">
            {t("engagementPledge")}
          </p>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="relative glass-card-strong p-3 mb-3">
            <canvas
              ref={canvasRef}
              width={350}
              height={200}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={endDraw}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              className="w-full h-48 rounded-xl cursor-crosshair touch-none"
              style={{ background: "rgba(255,255,255,0.02)" }}
            />
            {!hasSigned && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center gap-2 text-white/30">
                  <PenLine size={32} />
                  <span className="text-xs">{t("engagementSignHereHint")}</span>
                </div>
              </div>
            )}
          </div>

          {hasSigned && (
            <button
              onClick={clearSignature}
              className="flex items-center justify-center gap-2 text-white/50 text-sm py-2 active:scale-95"
            >
              <RotateCcw size={14} />
              {t("engagementClearResign")}
            </button>
          )}
        </div>

        <button
          onClick={() => setStep("plan")}
          disabled={!hasSigned}
          className={`mt-6 w-full py-4 rounded-2xl font-[family-name:var(--font-poppins)] font-semibold text-base flex items-center justify-center gap-2 transition-all ${
            hasSigned
              ? "gradient-primary text-white glow-green active:scale-[0.98]"
              : "bg-white/5 text-white/30"
          }`}
        >
          {t("engagementCta")}
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  // Plan summary step
  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-8">
      <OnboardingProgress currentStep={8} />
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setStep("signature")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
            {t("engagementPlanTitle")}
          </h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1"
      >
        <div className="glass-card-strong p-5 mb-4 gradient-border">
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">🎯</div>
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
              {t("engagementYourGoals")}
            </h2>
          </div>
          <div className="space-y-2">
            {selectedGoals.map((key) => {
              const goal = ENGAGEMENT_GOALS.find((g) => g.key === key);
              if (!goal) return null;
              return (
                <div key={key} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <div className="text-white font-semibold text-sm">{t(goal.labelKey)}</div>
                    <div className="text-white/50 text-xs">{t(goal.descKey)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-5 mb-4">
          <h3 className="text-white font-semibold text-sm mb-3">{t("engagementWhatZerobetDoes")}</h3>
          <ul className="space-y-2">
            {[
              t("engagementPlan1"),
              t("engagementPlan2"),
              t("engagementPlan3"),
              t("engagementPlan4"),
              t("engagementPlan5"),
              t("engagementPlan6"),
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                <Check size={16} className="text-[#FFC94D] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <button
        onClick={() => navigate("paywall")}
        className="w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-green flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
      >
        {t("continue")}
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
