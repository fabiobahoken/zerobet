"use client";

import { memo, useMemo, type CSSProperties, type ComponentType } from "react";
import { Lock } from "lucide-react";

/**
 * BadgeMedal — Zerobet 4.0 "Braise d'Or"
 *
 * A crafted SVG medallion used for every achievement badge. Replaces the
 * old flat emoji circles with a multi-layer premium medal:
 *
 *   1. Rotating honor ring (dashed, slowly spins on unlocked medals)
 *   2. Metallic outer ring — real metal gradients per tier
 *      (bronze / silver / gold / diamond / legendary)
 *   3. Inner obsidian disc with a warm radial vignette
 *   4. The achievement icon (Lucide, stroked) centered on the disc
 *   5. Unlock FX: rotating conic light rays, diagonal shine sweep,
 *      orbiting fairy sparkles and a tier-colored heat aura
 *
 * The component is presentation-only: no store access, fully controlled.
 */

export type MedalTier = "bronze" | "silver" | "gold" | "diamond" | "legendary";

type IconType = ComponentType<{
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

export interface BadgeMedalProps {
  tier: MedalTier;
  icon: IconType;
  /** Achievement accent color (glow + icon tint). Warm palette expected. */
  color?: string;
  unlocked?: boolean;
  /** Outer diameter in px (default 64) */
  size?: number;
  /** Disable the floating/rays FX (e.g. inside dense lists) */
  calm?: boolean;
  /** Stagger the shine sweep so a grid doesn't blink in unison */
  shineDelay?: number;
  className?: string;
  style?: CSSProperties;
}

interface TierVisual {
  /** SVG gradient id prefix (must be unique per tier, shared by all instances) */
  metalStops: [string, string, string, string];
  /** Ring edge highlight */
  rim: string;
  /** Sparkle color */
  sparkle: string;
  /** Default aura glow rgba */
  glow: string;
  /** Tailwind classes applied to the wrapper when unlocked */
  auraClass: string;
  /** Icon stroke color on the obsidian disc */
  iconColor: string;
}

const TIER_VISUALS: Record<MedalTier, TierVisual> = {
  bronze: {
    metalStops: ["#E89B5A", "#CD7F32", "#8C5420", "#D98E4A"],
    rim: "#F2B77E",
    sparkle: "#F2B77E",
    glow: "rgba(205, 127, 50, 0.55)",
    auraClass: "tier-glow-bronze",
    iconColor: "#F2C49B",
  },
  silver: {
    metalStops: ["#F4F7FA", "#B8C4CE", "#7E8C98", "#DDE5EC"],
    rim: "#FFFFFF",
    sparkle: "#E6EBF0",
    glow: "rgba(200, 210, 220, 0.55)",
    auraClass: "tier-glow-silver",
    iconColor: "#EDF2F7",
  },
  gold: {
    metalStops: ["#FFE9A8", "#FFD700", "#C69A10", "#FFE173"],
    rim: "#FFF6D0",
    sparkle: "#FFE173",
    glow: "rgba(255, 200, 40, 0.6)",
    auraClass: "tier-glow-gold",
    iconColor: "#FFE9A8",
  },
  diamond: {
    metalStops: ["#FFFFFF", "#D9F3FF", "#FBD5FF", "#D2FBEF"],
    rim: "#FFFFFF",
    sparkle: "#CFF2FF",
    glow: "rgba(200, 240, 255, 0.6)",
    auraClass: "tier-glow-diamond",
    iconColor: "#EAF9FF",
  },
  legendary: {
    metalStops: ["#FFC94D", "#FF6B00", "#C23A00", "#FF9A3D"],
    rim: "#FFD166",
    sparkle: "#FFB020",
    glow: "rgba(255, 107, 0, 0.65)",
    auraClass: "tier-glow-legendary",
    iconColor: "#FFD166",
  },
};

/** Tiny 4-point fairy star used as orbiting sparkle. */
function SparkleStar({
  style,
  color,
}: {
  style: CSSProperties;
  color: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="sparkle"
      style={{ ...style, ["--sparkle-color" as string]: color } as CSSProperties}
      aria-hidden
    >
      <path
        d="M12 1 L14.2 9.8 L23 12 L14.2 14.2 L12 23 L9.8 14.2 L1 12 L9.8 9.8 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BadgeMedalBase({
  tier,
  icon: Icon,
  color,
  unlocked = false,
  size = 64,
  calm = false,
  shineDelay = 0,
  className = "",
  style,
}: BadgeMedalProps) {
  const v = TIER_VISUALS[tier];
  const accent = color ?? v.iconColor;

  // Unique gradient ids per tier — shared across instances via <defs> duplication
  const ids = useMemo(
    () => ({
      metal: `medal-metal-${tier}`,
      disc: `medal-disc-${tier}`,
      sheen: `medal-sheen-${tier}`,
    }),
    [tier]
  );

  const auraStyle = {
    ["--medal-glow" as string]: v.glow,
    ["--shine-delay" as string]: `${shineDelay}s`,
  } as CSSProperties;

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden={false}
    >
      {/* Unlock FX — rotating light rays */}
      {unlocked && !calm && (
        <div
          className="medal-rays"
          style={{ ["--medal-glow" as string]: accent + "66" } as CSSProperties}
        />
      )}

      {/* The medal itself (gently floats when unlocked) */}
      <div
        className={`relative h-full w-full ${unlocked && !calm ? "medal-float" : ""}`}
      >
        <div
          className={`relative h-full w-full rounded-full ${
            unlocked ? v.auraClass : ""
          }`}
          style={auraStyle}
        >
          <svg
            viewBox="0 0 100 100"
            width="100%"
            height="100%"
            className={unlocked && !calm ? "" : "opacity-90"}
            role="img"
            aria-label={unlocked ? "médaille débloquée" : "médaille verrouillée"}
          >
            <defs>
              <linearGradient
                id={ids.metal}
                x1="12%"
                y1="0%"
                x2="88%"
                y2="100%"
              >
                <stop offset="0%" stopColor={v.metalStops[0]} />
                <stop offset="38%" stopColor={v.metalStops[1]} />
                <stop offset="72%" stopColor={v.metalStops[2]} />
                <stop offset="100%" stopColor={v.metalStops[3]} />
              </linearGradient>
              <radialGradient id={ids.disc} cx="38%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#2A1A0C" />
                <stop offset="55%" stopColor="#150C05" />
                <stop offset="100%" stopColor="#0B0603" />
              </radialGradient>
              <linearGradient id={ids.sheen} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
                <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Honor ring — rotating dashed circle */}
            <g
              className={unlocked && !calm ? "medal-honor-ring" : undefined}
              style={{ transformOrigin: "50px 50px" }}
            >
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke={v.rim}
                strokeOpacity={unlocked ? 0.55 : 0.18}
                strokeWidth="1.6"
                strokeDasharray="2.5 6.5"
                strokeLinecap="round"
              />
            </g>

            {/* Metallic ring */}
            <circle
              cx="50"
              cy="50"
              r="41.5"
              fill="none"
              stroke={`url(#${ids.metal})`}
              strokeWidth={unlocked ? 7 : 5}
              strokeOpacity={unlocked ? 1 : 0.55}
            />
            {/* Inner rim bevel */}
            <circle
              cx="50"
              cy="50"
              r="37.5"
              fill="none"
              stroke={v.rim}
              strokeOpacity={unlocked ? 0.5 : 0.12}
              strokeWidth="1"
            />

            {/* Obsidian disc */}
            <circle cx="50" cy="50" r="34.5" fill={`url(#${ids.disc})`} />
            {/* Sheen on the top-left bevel */}
            <circle
              cx="50"
              cy="50"
              r="34.5"
              fill={`url(#${ids.sheen})`}
              opacity={unlocked ? 0.8 : 0.35}
            />

            {/* Locked padlock sits under the HTML icon layer */}
          </svg>

          {/* Icon layer (HTML for crisp Lucide strokes) */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ padding: size * 0.28 }}
          >
            {unlocked ? (
              <Icon
                size={Math.round(size * 0.42)}
                strokeWidth={2.1}
                className="drop-shadow-[0_0_6px_rgba(255,176,32,0.45)]"
                style={{ color: accent }}
              />
            ) : (
              <Lock
                size={Math.round(size * 0.34)}
                strokeWidth={2}
                className="text-white/35"
              />
            )}
          </div>

          {/* Diagonal shine sweep on unlocked medals */}
          {unlocked && !calm && <div className="medal-shine" />}
        </div>

        {/* Fairy sparkles orbiting the medal */}
        {unlocked && !calm && (
          <>
            <SparkleStar
              color={v.sparkle}
              style={{
                top: "-4%",
                left: "-6%",
                ["--sparkle-delay" as string]: "0s",
              } as CSSProperties}
            />
            <SparkleStar
              color={accent}
              style={{
                top: "10%",
                right: "-10%",
                width: 5,
                height: 5,
                ["--sparkle-delay" as string]: "0.9s",
              } as CSSProperties}
            />
            <SparkleStar
              color={v.sparkle}
              style={{
                bottom: "-6%",
                left: "16%",
                width: 4.5,
                height: 4.5,
                ["--sparkle-delay" as string]: "1.7s",
              } as CSSProperties}
            />
          </>
        )}
      </div>
    </div>
  );
}

export const BadgeMedal = memo(BadgeMedalBase);
