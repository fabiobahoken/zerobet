"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { Flame } from "lucide-react";

export type StreakFlameSize = "sm" | "md" | "lg";

export interface StreakFlameProps {
  /** Streak day count. */
  days: number;
  /** Visual size preset. @default "md" */
  size?: StreakFlameSize;
  /** Whether to render the numeric count next to the flame. @default true */
  showNumber?: boolean;
  /** Extra className on the root wrapper. */
  className?: string;
}

const SIZE_MAP: Record<
  StreakFlameSize,
  { icon: number; glow: number; text: string; gap: string }
> = {
  sm: { icon: 24, glow: 36, text: "text-sm", gap: "gap-1" },
  md: { icon: 36, glow: 56, text: "text-xl", gap: "gap-1.5" },
  lg: { icon: 56, glow: 88, text: "text-3xl", gap: "gap-2" },
};

function getFlameColor(days: number): {
  flame: string;
  glow: string;
  strong: boolean;
} {
  if (days <= 0) return { flame: "#6B7280", glow: "rgba(107,114,128,0)", strong: false };
  if (days < 7) return { flame: "#F59E0B", glow: "rgba(245, 158, 11,0.55)", strong: false };
  if (days < 30) return { flame: "#FF3B30", glow: "rgba(255,59,48,0.65)", strong: true };
  // 30+ days — gold with extra-strong glow
  return { flame: "#FFD700", glow: "rgba(255,215,0,0.8)", strong: true };
}

/**
 * StreakFlame — premium animated flame icon for streak displays.
 *
 * The flame softly flickers (scale + opacity), wrapped in a pulsing
 * radial-gradient halo that matches the streak tier:
 *  - 0 days: muted grey, no animation
 *  - 1-6 days: orange
 *  - 7-29 days: red-orange with stronger glow
 *  - 30+ days: gold (#FFD700) with extra-strong glow + scale pulse
 *
 * Honors the user's reduced-motion preference (renders a static flame).
 */
export function StreakFlame({
  days,
  size = "md",
  showNumber = true,
  className,
}: StreakFlameProps) {
  const prefersReducedMotion = useReducedMotion();
  const dims = SIZE_MAP[size];
  const { flame, glow, strong } = getFlameColor(days);
  const animate = days > 0 && !prefersReducedMotion;

  const flickerTransition: Transition = {
    duration: 1.4,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  };

  return (
    <div
      className={`relative inline-flex items-center ${dims.gap} ${className ?? ""}`}
      role="img"
      aria-label={`${days} jour${days !== 1 ? "s" : ""} de série`}
    >
      {/* Flame with glow halo */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: dims.glow, height: dims.glow }}
      >
        {/* Radial-gradient halo */}
        {animate && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${glow} 0%, transparent 65%)`,
            }}
            animate={{
              opacity: strong ? [0.55, 0.95, 0.55] : [0.35, 0.7, 0.35],
              scale: strong ? [1, 1.18, 1] : [1, 1.1, 1],
            }}
            transition={flickerTransition}
          />
        )}

        {/* The flame icon — drop-shadow for crisp glow */}
        <motion.div
          className="relative"
          animate={
            animate
              ? strong && days >= 30
                ? {
                    scale: [1, 1.12, 1],
                    opacity: [0.9, 1, 0.9],
                  }
                : {
                    scale: [1, 1.05, 1],
                    opacity: [0.85, 1, 0.85],
                  }
              : undefined
          }
          transition={flickerTransition}
          style={{
            filter: animate
              ? `drop-shadow(0 0 8px ${glow}) drop-shadow(0 0 16px ${glow})`
              : "none",
          }}
        >
          <Flame
            size={dims.icon}
            strokeWidth={2.2}
            style={{ color: flame }}
            fill={animate ? `${flame}33` : "transparent"}
          />
        </motion.div>
      </div>

      {/* Numeric day count */}
      {showNumber && (
        <span
          className={`font-[family-name:var(--font-poppins)] font-bold leading-none ${dims.text}`}
          style={{ color: flame }}
        >
          {days}
          <span className="text-white/60 text-[0.6em] ml-0.5 font-semibold">
            J
          </span>
        </span>
      )}
    </div>
  );
}

export default StreakFlame;
