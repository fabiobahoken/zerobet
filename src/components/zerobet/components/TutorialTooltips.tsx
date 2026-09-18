"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { useT } from "@/lib/i18n/useT";

interface StepDef {
  target: string;
  titleKey: string;
  descKey: string;
  emoji: string;
  accent: string;
}

const STEPS: StepDef[] = [
  {
    target: "streak",
    titleKey: "tutorialStep1Title",
    descKey: "tutorialStep1Desc",
    emoji: "🔥",
    accent: "#FF3B30",
  },
  {
    target: "panic",
    titleKey: "tutorialStep2Title",
    descKey: "tutorialStep2Desc",
    emoji: "⚡",
    accent: "#FF3B30",
  },
  {
    target: "quickActions",
    titleKey: "tutorialStep3Title",
    descKey: "tutorialStep3Desc",
    emoji: "✨",
    accent: "#FF9500",
  },
  {
    target: "atlas",
    titleKey: "tutorialStep4Title",
    descKey: "tutorialStep4Desc",
    emoji: "🤖",
    accent: "#BF5AF2",
  },
  {
    target: "community",
    titleKey: "tutorialStep5Title",
    descKey: "tutorialStep5Desc",
    emoji: "👥",
    accent: "#FF9500",
  },
  {
    target: "welcome",
    titleKey: "tutorialStep6Title",
    descKey: "tutorialStep6Desc",
    emoji: "🌟",
    accent: "#FBBF24",
  },
];

interface TutorialTooltipsProps {
  /**
   * When true, the tutorial is allowed to start (e.g. after the daily
   * check-in modal has been dismissed). When false, nothing renders.
   */
  startWhen?: boolean;
}

export function TutorialTooltips({ startWhen = true }: TutorialTooltipsProps) {
  const t = useT();
  const { hasSeenTutorial, setHasSeenTutorial } = useStore();
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  // Refs for direct DOM manipulation (bypass React re-renders during rAF loop).
  // We deliberately avoid keeping `targetRect` in React state because writing
  // to state every frame would cause a re-render storm and re-introduce the
  // exact lag this definitive fix is meant to eliminate.
  const spotlightRef = useRef<HTMLDivElement>(null);
  const tooltipCardRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mountedRef = useRef(false);

  const currentStep = STEPS[step];
  const isWelcome = currentStep.target === "welcome";

  // -------------------------------------------------------------------------
  // Part 1a — Wait for the first target element to be *visible* before
  // starting. We retry up to 20 × 250 ms (5 seconds max). If the dashboard
  // still hasn't painted the `[data-tutorial="streak"]` element by then, we
  // fall back to the welcome step so the user still sees *something*.
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!startWhen || started || hasSeenTutorial) return;

    let retries = 0;
    const maxRetries = 20; // 20 × 250ms = 5s max
    let timer: number;

    const tryStart = () => {
      const target = document.querySelector<HTMLElement>(
        '[data-tutorial="streak"]'
      );
      if (target && target.getBoundingClientRect().width > 0) {
        // Scroll the very first target into view so the spotlight aligns
        // with it even if the dashboard has been scrolled down by the
        // user (or by the daily check-in modal dismissal).
        target.scrollIntoView({ block: "center", behavior: "smooth" });
        setStarted(true);
        return;
      }
      if (retries < maxRetries) {
        retries += 1;
        timer = window.setTimeout(tryStart, 250);
      } else {
        // Fallback: skip directly to the welcome step so the user still
        // sees a confirmation rather than a stuck overlay.
        setStep(STEPS.length - 1);
        setStarted(true);
      }
    };

    // Small initial delay lets the dashboard finish its first paint.
    timer = window.setTimeout(tryStart, 600);
    return () => window.clearTimeout(timer);
  }, [startWhen, started, hasSeenTutorial]);

  // -------------------------------------------------------------------------
  // Part 1b — Single rAF loop that updates the spotlight + tooltip position
  // every frame by writing directly to the DOM via refs. This avoids the
  // React re-render storm that the previous setState-every-frame approach
  // caused (which was the real root cause of the perceived "lag").
  //
  // The loop runs continuously while the tutorial is active and the current
  // step has a real target (not the welcome step). It reads
  // `getBoundingClientRect()` once per frame and writes the four CSS
  // properties (top/left/width/height) to the spotlight div, and the
  // corresponding tooltip position to the tooltip card. The browser is very
  // good at this — it's the same pattern Google Maps uses for its overlays.
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!started || isWelcome) return;
    mountedRef.current = true;

    const spotlight = spotlightRef.current;
    const tooltipCard = tooltipCardRef.current;
    const arrow = arrowRef.current;
    if (!spotlight) return;

    const tooltipWidth = 320;
    const tooltipEstHeight = 200;
    const margin = 14;
    // Spotlight padding around the target element. 8px gives a comfortable
    // visual breathing room so the colored ring clearly surrounds the
    // target without clipping its drop-shadow / glow.
    const spotlightPad = 8;

    const update = () => {
      if (!mountedRef.current) return;

      const target = document.querySelector<HTMLElement>(
        `[data-tutorial="${currentStep.target}"]`
      );

      if (target) {
        const rect = target.getBoundingClientRect();

        // ---- Spotlight: position fixed, follow the target ----
        spotlight.style.top = `${rect.top - spotlightPad}px`;
        spotlight.style.left = `${rect.left - spotlightPad}px`;
        spotlight.style.width = `${rect.width + spotlightPad * 2}px`;
        spotlight.style.height = `${rect.height + spotlightPad * 2}px`;
        spotlight.style.opacity = "1";

        // ---- Tooltip card: position fixed, near the target ----
        if (tooltipCard) {
          const viewportH = window.innerHeight;
          const viewportW = window.innerWidth;
          const spaceBelow = viewportH - rect.bottom;
          const placeBelow = spaceBelow > tooltipEstHeight + margin + 24;
          const w = Math.min(tooltipWidth, viewportW - 32);

          let left = rect.left + rect.width / 2 - w / 2;
          left = Math.max(16, Math.min(viewportW - w - 16, left));

          const top = placeBelow
            ? rect.bottom + margin
            : Math.max(16, rect.top - margin - tooltipEstHeight);

          tooltipCard.style.left = `${left}px`;
          tooltipCard.style.top = `${top}px`;
          tooltipCard.style.width = `${w}px`;
          tooltipCard.style.transform = "none";
          tooltipCard.style.opacity = "1";

          // ---- Arrow: point from the tooltip toward the target ----
          if (arrow) {
            const arrowLeft = Math.max(
              20,
              Math.min(w - 20, rect.left + rect.width / 2 - left)
            );
            arrow.style.left = `${arrowLeft}px`;
            arrow.style.top = placeBelow ? "-7px" : "";
            arrow.style.bottom = placeBelow ? "" : "-7px";
            arrow.style.borderTop = placeBelow
              ? `2px solid ${currentStep.accent}`
              : "none";
            arrow.style.borderLeft = placeBelow
              ? `2px solid ${currentStep.accent}`
              : "none";
            arrow.style.borderBottom = placeBelow
              ? "none"
              : `2px solid ${currentStep.accent}`;
            arrow.style.borderRight = placeBelow
              ? "none"
              : `2px solid ${currentStep.accent}`;
            arrow.style.opacity = "1";
          }
        }
      } else {
        // Target not found this frame — hide spotlight + tooltip gracefully
        // while the next retry in the start-up loop tries to recover.
        spotlight.style.opacity = "0";
        if (tooltipCard) tooltipCard.style.opacity = "0";
        if (arrow) arrow.style.opacity = "0";
      }

      rafRef.current = requestAnimationFrame(update);
    };

    // Kick off the loop after a paint so the spotlight transitions in
    // smoothly from its initial state.
    rafRef.current = requestAnimationFrame(update);

    return () => {
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // We intentionally don't depend on `targetRect` — the rAF loop owns it.
  }, [started, isWelcome, currentStep.target, currentStep.accent]);

  // -------------------------------------------------------------------------
  // Recompute on resize/scroll as well — the rAF loop already handles this
  // implicitly (it reads layout every frame), but we also clear any stale
  // state on step change.
  // -------------------------------------------------------------------------
  const finish = useCallback(() => {
    sound.playSuccess();
    haptics.success();
    setHasSeenTutorial(true);
    setStarted(false);
  }, [setHasSeenTutorial]);

  const next = useCallback(() => {
    sound.playClick();
    haptics.light();
    if (step < STEPS.length - 1) {
      // Hide spotlight immediately so it doesn't briefly straddle two
      // distant targets while the next rAF tick fires.
      if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
      if (tooltipCardRef.current) tooltipCardRef.current.style.opacity = "0";
      if (arrowRef.current) arrowRef.current.style.opacity = "0";

      // Scroll the next step's target into view *before* stepping. This is
      // critical for alignment: if the next target is below the fold, the
      // spotlight would otherwise position itself off-screen and the user
      // would see "the guide doesn't frame the option it's explaining".
      // The rAF loop reads `getBoundingClientRect()` every frame, so as the
      // smooth-scroll animates, the spotlight glides along with the target.
      const nextStep = STEPS[step + 1];
      if (nextStep && nextStep.target !== "welcome") {
        const nextTarget = document.querySelector<HTMLElement>(
          `[data-tutorial="${nextStep.target}"]`
        );
        if (nextTarget) {
          nextTarget.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }
      }

      setStep((s) => s + 1);
    } else {
      finish();
    }
  }, [step, finish]);

  const skip = useCallback(() => {
    sound.playClick();
    haptics.light();
    setHasSeenTutorial(true);
    setStarted(false);
  }, [setHasSeenTutorial]);

  if (!started || hasSeenTutorial) return null;

  // Compute tooltip position fallback (used on the very first paint before
  // the rAF loop has run). The rAF loop will overwrite these inline styles
  // on the next frame.
  const tooltipWidth = 320;
  const viewportW =
    typeof window !== "undefined" ? window.innerWidth : 430;
  const w = Math.min(tooltipWidth, viewportW - 32);

  return (
    <AnimatePresence>
      {!hasSeenTutorial && started && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80]"
          role="dialog"
          aria-modal="true"
          aria-label={t("tutorialAriaLabel")}
        >
          {/* Spotlight or backdrop */}
          {!isWelcome ? (
            <div
              ref={spotlightRef}
              className="fixed pointer-events-none"
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: 0,
                height: 0,
                opacity: 0,
                borderRadius: "20px",
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.78)",
                border: `2px solid ${currentStep.accent}`,
                transition:
                  "top 0.2s ease, left 0.2s ease, width 0.2s ease, height 0.2s ease, opacity 0.18s ease",
                willChange: "top, left, width, height",
              }}
            />
          ) : (
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={skip}
            />
          )}

          {/* Tooltip card — position fixed so parent transforms can't
              push it out of place. The rAF loop writes top/left/width
              directly to this element. */}
          {!isWelcome && (
            <motion.div
              key={step}
              ref={tooltipCardRef}
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="z-10"
              style={{
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: `${w}px`,
                opacity: 0,
                transition:
                  "top 0.2s ease, left 0.2s ease, width 0.2s ease, opacity 0.18s ease",
                willChange: "top, left",
              }}
            >
              {/* Arrow — also updated directly via ref each frame */}
              <div
                ref={arrowRef}
                className="absolute"
                style={{
                  left: `${w / 2}px`,
                  top: "-7px",
                  transform: "translateX(-50%) rotate(45deg)",
                  width: "14px",
                  height: "14px",
                  background: "rgba(11, 19, 43, 0.95)",
                  borderTop: `2px solid ${currentStep.accent}`,
                  borderLeft: `2px solid ${currentStep.accent}`,
                  opacity: 0,
                  transition: "top 0.2s ease, left 0.2s ease",
                  // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
                } as any}
              />

              <TutorialCard
                step={currentStep}
                stepIndex={step}
                totalSteps={STEPS.length}
                onSkip={skip}
                onNext={next}
                isLast={step === STEPS.length - 1}
                t={t}
              />
            </motion.div>
          )}

          {/* Welcome step (no target — full-screen overlay) */}
          {isWelcome && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="absolute left-1/2 top-1/2 z-10"
              style={{
                transform: "translate(-50%, -50%)",
                width: `${w}px`,
              }}
            >
              <TutorialCard
                step={currentStep}
                stepIndex={step}
                totalSteps={STEPS.length}
                onSkip={skip}
                onNext={next}
                isLast={step === STEPS.length - 1}
                t={t}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// -------------------------------------------------------------------------
// TutorialCard — presentational, stateless. Extracted so the rAF-managed
// parent doesn't re-render the inner JSX on every frame.
// -------------------------------------------------------------------------
function TutorialCard({
  step,
  stepIndex,
  totalSteps,
  onSkip,
  onNext,
  isLast,
  t,
}: {
  step: StepDef;
  stepIndex: number;
  totalSteps: number;
  onSkip: () => void;
  onNext: () => void;
  isLast: boolean;
  t: (k: string) => string;
}) {
  // Re-render the progress dots in the right order. We need to know the
  // total step count — passed from the parent.
  const dots = Array.from({ length: totalSteps });

  return (
    <div
      className="glass-card-strong p-5 relative overflow-hidden"
      style={{
        borderColor: `${step.accent}40`,
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-40"
        style={{ background: step.accent }}
      />

      {/* Close button */}
      <button
        onClick={onSkip}
        className="absolute top-3 right-3 w-7 h-7 rounded-full glass-pill flex items-center justify-center"
        aria-label={t("tutorialSkip")}
      >
        <X size={14} className="text-white/60" />
      </button>

      <div className="relative">
        {/* Emoji */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3"
          style={{
            background: `${step.accent}25`,
            border: `1px solid ${step.accent}40`,
          }}
        >
          {step.emoji}
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-base font-[family-name:var(--font-poppins)] mb-1.5">
          {t(step.titleKey)}
        </h3>

        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          {t(step.descKey)}
        </p>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 mb-4">
          {dots.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === stepIndex ? 24 : 8,
                background:
                  i === stepIndex
                    ? step.accent
                    : i < stepIndex
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={onSkip}
            className="text-white/50 text-xs hover:text-white/70 transition-colors py-2"
          >
            {t("tutorialSkip")}
          </button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold"
            style={{
              background: step.accent,
              boxShadow: `0 4px 20px ${step.accent}40`,
            }}
          >
            {isLast ? t("tutorialStart") : t("tutorialNext")}
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
