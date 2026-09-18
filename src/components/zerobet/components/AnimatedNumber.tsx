"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type AnimatedNumberFormat = "default" | "compact" | "currency";

export interface AnimatedNumberProps {
  /** Target value to count up to. */
  value: number;
  /** Total animation duration in ms. @default 1000 */
  duration?: number;
  /** Delay before the animation starts (ms). @default 0 */
  delay?: number;
  /** Optional className applied to the rendered span. */
  className?: string;
  /** Prefix prepended before the number (e.g. "≈"). */
  prefix?: string;
  /** Suffix appended after the number (e.g. " FCFA"). */
  suffix?: string;
  /** Number of decimals to display. @default 0 */
  decimals?: number;
  /** Output format: default (grouped), compact (1.2k), currency (fr-FR grouped). @default "default" */
  format?: AnimatedNumberFormat;
}

/** easeOutExpo — snappy premium ease for the count-up. */
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatValue(
  value: number,
  format: AnimatedNumberFormat,
  decimals: number
): string {
  switch (format) {
    case "compact":
      return new Intl.NumberFormat("fr-FR", {
        notation: "compact",
        maximumFractionDigits: Math.min(decimals, 1),
      }).format(value);
    case "currency":
      return new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: true,
      }).format(value);
    case "default":
    default:
      return new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
  }
}

/**
 * AnimatedNumber — smoothly counts up from 0 to `value` using an
 * easeOutExpo curve driven by requestAnimationFrame. Honors the
 * user's reduced-motion preference (renders the final value
 * immediately when reduced motion is requested).
 */
export function AnimatedNumber({
  value,
  duration = 1000,
  delay = 0,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
  format = "default",
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Cancel any in-flight animation
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startRef.current = null;

    const target = Number.isFinite(value) ? value : 0;

    const animate = (now: number) => {
      if (startRef.current === null) startRef.current = now;

      // Reduced motion: jump straight to the target on the first frame.
      // We still go through rAF so the setState is not synchronous
      // within the effect body (avoids cascading renders).
      if (prefersReducedMotion) {
        setDisplay(target);
        rafRef.current = null;
        return;
      }

      const elapsed = now - startRef.current;
      const effectiveElapsed = Math.max(0, elapsed - delay);
      const progress =
        duration <= 0 ? 1 : Math.min(1, effectiveElapsed / duration);

      if (effectiveElapsed < 0) {
        // Still in the delay window — keep showing 0
        setDisplay(0);
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const eased = easeOutExpo(progress);
      setDisplay(target * eased);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Snap to the exact target to avoid floating point drift.
        setDisplay(target);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [value, duration, delay, prefersReducedMotion]);

  const formatted = formatValue(display, format, decimals);

  return (
    <span
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default AnimatedNumber;
