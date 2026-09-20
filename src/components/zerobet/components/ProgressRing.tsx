"use client";

/**
 * ProgressRing — QUITTR-style circular gauge, "Braise d'Or" edition.
 *
 * A reusable animated SVG ring used across Dashboard (DAYS CLEAN),
 * Finance (savings goal) and Stats (hero counters).
 *
 * Layers (outside → inside):
 *   1. Outer aura glow (breathing radial haze)
 *   2. Milestone ticks — small dots around the ring that ignite (gold)
 *      when the progress passes them, with a spring pop
 *   3. Track ring (subtle white/8)
 *   4. Progress arc — gradient braise (#FF6B00 → #FFC94D → #FFD166),
 *      rounded caps, animated with framer-motion pathLength spring,
 *      plus a rotating specular shine arc on top
 *   5. Center content (children) — numbers, icons, labels
 *
 * Respects prefers-reduced-motion via framer-motion's reduced-motion
 * handling on transforms (arc still renders, without the spin).
 */

import { motion, useReducedMotion } from "framer-motion";
import { useId, type ReactNode } from "react";

export interface ProgressRingTick {
  /** Position on the ring, 0..1 (fraction of a full turn). */
  at: number;
}

export interface ProgressRingProps {
  /** Progress 0..1 (values outside are clamped). */
  progress: number;
  /** Outer diameter in px. */
  size?: number;
  /** Stroke thickness in px. */
  strokeWidth?: number;
  /** Center content (numbers, icon, label…). */
  children?: ReactNode;
  /** Milestone positions 0..1 to render as igniting dots. */
  ticks?: number[];
  /** Disable the outer aura (for dense layouts). */
  aura?: boolean;
  /** Disable the rotating shine arc. */
  shine?: boolean;
  /** Animation delay in seconds. */
  delay?: number;
  /** Accessible label for the gauge. */
  ariaLabel?: string;
  /** Show percentage text at the ring bottom (badge). */
  badge?: ReactNode;
}

const EMBER = "#FF6B00";
const HONEY = "#FFC94D";
const GOLD = "#FFD166";

export function ProgressRing({
  progress,
  size = 220,
  strokeWidth = 7,
  children,
  ticks = [],
  aura = true,
  shine = true,
  delay = 0,
  ariaLabel,
  badge,
}: ProgressRingProps) {
  const uid = useId().replace(/[:]/g, "");
  const gradId = `pr-grad-${uid}`;
  const glowId = `pr-glow-${uid}`;
  const reduce = useReducedMotion();

  const clamped = Math.min(1, Math.max(0, progress));
  const r = (size - strokeWidth * 2 - 6) / 2;
  const c = size / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-valuenow={ariaLabel ? Math.round(clamped * 100) : undefined}
    >
      {/* ── 1. Breathing outer aura ─────────────────────────────── */}
      {aura && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[-14%] rounded-full"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,107,0,0.16) 0%, rgba(255,176,32,0.07) 45%, transparent 72%)",
            animation: reduce ? "none" : "pr-breathe 4.5s ease-in-out infinite",
          }}
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={EMBER} />
            <stop offset="55%" stopColor={HONEY} />
            <stop offset="100%" stopColor={GOLD} />
          </linearGradient>
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── 2. Milestone ticks ──────────────────────────────────── */}
        {ticks.map((at, i) => {
          const lit = clamped >= at - 0.004;
          const angle = at * 2 * Math.PI - Math.PI / 2;
          const dotR = r + strokeWidth + 5.5;
          const dx = c + dotR * Math.cos(angle);
          const dy = c + dotR * Math.sin(angle);
          return (
            <motion.circle
              key={`tick-${i}-${at}`}
              cx={dx}
              cy={dy}
              r={lit ? 3.4 : 2.1}
              fill={lit ? GOLD : "rgba(255,255,255,0.22)"}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{
                scale: lit ? 1 : 0.7,
                opacity: lit ? 1 : 0.55,
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 16,
                delay: delay + 0.5 + i * 0.06,
              }}
              style={
                lit
                  ? { filter: `drop-shadow(0 0 5px ${GOLD})` }
                  : undefined
              }
            />
          );
        })}

        {/* ── 3. Track ────────────────────────────────────────────── */}
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />

        {/* ── 4. Progress arc ─────────────────────────────────────── */}
        <motion.circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          filter={clamped > 0.01 ? `url(#${glowId})` : undefined}
          transform={`rotate(-90 ${c} ${c})`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - clamped) }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay }}
        />

        {/* Rotating specular shine arc */}
        {shine && !reduce && (
          <motion.circle
            cx={c}
            cy={c}
            r={r - strokeWidth - 4}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.12} ${circumference * 0.88}`}
            transform={`rotate(-90 ${c} ${c})`}
            style={{ originX: "50%", originY: "50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 7, ease: "linear", repeat: Infinity }}
          />
        )}
      </svg>

      {/* ── 5. Center content ─────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </div>

      {/* Optional badge under the ring */}
      {badge != null && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full">
          {badge}
        </div>
      )}
    </div>
  );
}

/** Compute the next milestone and previous milestone for a streak. */
export function milestoneProgress(
  value: number,
  milestones: number[]
): { prev: number; next: number; fraction: number; daysLeft: number } {
  const ms = [...milestones].sort((a, b) => a - b);
  const next = ms.find((m) => m > value) ?? ms[ms.length - 1];
  const prevIdx = ms.indexOf(next) - 1;
  const prev = prevIdx >= 0 ? ms[prevIdx] : 0;
  const fraction =
    next > prev ? Math.min(1, Math.max(0, (value - prev) / (next - prev))) : 1;
  return { prev, next, fraction, daysLeft: Math.max(0, next - value) };
}
