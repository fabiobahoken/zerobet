"use client";

import { useId } from "react";

/* ============================================================================
 * ArtifactIcon
 *
 * Renders a unique, elegant, geometric SVG icon for each of the 13 "Quête
 * des Artéfacts" artifacts. Each icon is 100% vector, uses an SVG linear
 * gradient matched to the artifact's aura color, and supports an optional
 * drop-shadow glow filter (premium-game-item style — Diablo / WoW / mobile
 * RPG artifact vibe).
 *
 * Usage:
 *   <ArtifactIcon artifactKey={rank.key} size={48} glow />
 *
 * The component is intentionally framework-light (no framer-motion) so it can
 * be embedded inside any motion.div or button without conflicting animations.
 * ========================================================================== */

export interface ArtifactIconProps {
  /** Artifact key, e.g. "jour-1", "jour-3", "jour-7", ... "jour-730" */
  artifactKey: string;
  /** Pixel size for both width and height (icon viewBox is 48×48). */
  size?: number;
  /** Optional className passthrough. */
  className?: string;
  /** When true (default), adds a soft drop-shadow glow via SVG filter. */
  glow?: boolean;
}

export function ArtifactIcon({
  artifactKey,
  size = 48,
  className,
  glow = true,
}: ArtifactIconProps) {
  // useId gives us a stable, SSR-safe unique id per render so multiple
  // instances of the same artifact never collide on gradient/filter ids.
  const uid = useId().replace(/[:]/g, "");
  const gradientId = `artifact-grad-${uid}`;
  const glowId = `artifact-glow-${uid}`;
  const gradient2Id = `artifact-grad2-${uid}`;
  const radialId = `artifact-radial-${uid}`;

  const common = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    role: "img" as const,
    "aria-hidden": true,
  };

  switch (artifactKey) {
    case "jour-1":
      return (
        <DawnCrystalIcon
          {...common}
          gradientId={gradientId}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-3":
      return (
        <MistAmuletIcon
          {...common}
          gradientId={gradientId}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-7":
      return (
        <BronzeShieldIcon
          {...common}
          gradientId={gradientId}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-14":
      return (
        <SilverRunesIcon
          {...common}
          gradientId={gradientId}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-30":
      return (
        <GoldScepterIcon
          {...common}
          gradientId={gradientId}
          gradient2Id={gradient2Id}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-45":
      return (
        <PlatinumOrbIcon
          {...common}
          gradientId={gradientId}
          gradient2Id={gradient2Id}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-60":
      return (
        <DiamondHeartIcon
          {...common}
          gradientId={gradientId}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-90":
      return (
        <EmeraldIcon
          {...common}
          gradientId={gradientId}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-120":
      return (
        <SapphireIcon
          {...common}
          gradientId={gradientId}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-180":
      return (
        <RubyIcon
          {...common}
          gradientId={gradientId}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-270":
      return (
        <AmethystIcon
          {...common}
          gradientId={gradientId}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-365":
      return (
        <CrownIcon
          {...common}
          gradientId={gradientId}
          gradient2Id={gradient2Id}
          glowId={glowId}
          glow={glow}
        />
      );
    case "jour-730":
      return (
        <StarMasteryIcon
          {...common}
          gradientId={gradientId}
          gradient2Id={gradient2Id}
          radialId={radialId}
          glowId={glowId}
          glow={glow}
        />
      );
    default:
      // Fallback — a small geometric diamond so unknown keys still render.
      return (
        <svg {...common}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#9CA3AF" />
            </linearGradient>
          </defs>
          <path
            d="M24 8 L36 24 L24 40 L12 24 Z"
            fill={`url(#${gradientId})`}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.6"
          />
        </svg>
      );
  }
}

/* --------------------------------------------------------------------------
 * Shared types for icon sub-components
 * ------------------------------------------------------------------------ */

interface SvgDefProps {
  gradientId: string;
  glowId: string;
  glow: boolean;
}

interface SvgDef2Props extends SvgDefProps {
  gradient2Id: string;
}

interface SvgDefRadialProps extends SvgDef2Props {
  radialId: string;
}

type SvgProps = Omit<
  React.SVGProps<SVGSVGElement>,
  "ref" | "key" | "defaultValue"
>;

/* --------------------------------------------------------------------------
 * Glow filter — reused by every icon. Soft gaussian blur merged back over
 * the source graphic for a luminous halo.
 * ------------------------------------------------------------------------ */

function GlowFilter({ glowId, glow }: { glowId: string; glow: boolean }) {
  if (!glow) return null;
  return (
    <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1.6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

/* ============================================================================
 * 1. jour-1 — Le Cristal d'Aube (Dawn Crystal)
 *    A faceted diamond with rays of light above it. Silver-white gradient.
 * ========================================================================== */

function DawnCrystalIcon(
  props: SvgProps & SvgDefProps
) {
  const { gradientId, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Light rays above the crystal */}
        <g
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
          strokeLinecap="round"
        >
          <path d="M24 3 L24 8" />
          <path d="M16 5 L19 9" />
          <path d="M32 5 L29 9" />
          <path d="M9 9 L13 12" />
          <path d="M39 9 L35 12" />
        </g>
        {/* Faceted crystal body */}
        <path
          d="M24 11 L36 20 L24 41 L12 20 Z"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.6"
        />
        {/* Inner facet lines */}
        <path
          d="M12 20 L36 20 M24 11 L24 41 M24 11 L12 20 M24 11 L36 20"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.5"
        />
        {/* Top highlight */}
        <path
          d="M24 11 L30 16 L24 20 L18 16 Z"
          fill="rgba(255,255,255,0.65)"
        />
        {/* Bottom inner shadow */}
        <path
          d="M18 20 L30 20 L24 41 Z"
          fill="rgba(0,0,0,0.10)"
        />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 2. jour-3 — L'Amulette de Brume (Mist Amulet)
 *    A circular medallion with a swirling mist pattern inside. Cyan-teal.
 * ========================================================================== */

function MistAmuletIcon(
  props: SvgProps & SvgDefProps
) {
  const { gradientId, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="50%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Outer ring */}
        <circle
          cx="24"
          cy="24"
          r="17"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
        />
        {/* Inner ring */}
        <circle
          cx="24"
          cy="24"
          r="13"
          fill={`url(#${gradientId})`}
          opacity="0.18"
        />
        <circle
          cx="24"
          cy="24"
          r="13"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.6"
        />
        {/* Swirling mist — three nested curved arcs */}
        <path
          d="M16 24 C16 19, 21 16, 25 18 C28 19, 30 22, 28 25 C27 27, 24 27, 23 25"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M32 24 C32 29, 27 32, 23 30 C20 29, 18 26, 20 23 C21 21, 24 21, 25 23"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Hanging loop at top */}
        <path
          d="M24 7 L24 4"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="24"
          cy="4"
          r="1.8"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 3. jour-7 — Le Bouclier de Bronze (Bronze Shield)
 *    A heraldic shield with a central boss and decorative border. Bronze.
 * ========================================================================== */

function BronzeShieldIcon(
  props: SvgProps & SvgDefProps
) {
  const { gradientId, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD9B6" />
          <stop offset="40%" stopColor="#CD7F32" />
          <stop offset="100%" stopColor="#6B3410" />
        </linearGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Shield outline */}
        <path
          d="M24 6 L40 11 V24 C40 33, 33 40, 24 43 C15 40, 8 33, 8 24 V11 Z"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.8"
        />
        {/* Inner border */}
        <path
          d="M24 9 L37 13 V24 C37 31, 31 37, 24 39.5 C17 37, 11 31, 11 24 V13 Z"
          fill="none"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="0.7"
        />
        {/* Decorative top band */}
        <path
          d="M14 14 L34 14"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M14 14.5 L34 14.5"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="0.5"
        />
        {/* Central boss (raised rivet) */}
        <circle cx="24" cy="24" r="5" fill="rgba(0,0,0,0.22)" />
        <circle
          cx="24"
          cy="24"
          r="4"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.5"
        />
        <circle cx="22.6" cy="22.6" r="1.4" fill="rgba(255,255,255,0.7)" />
        {/* Diagonal cross stripes — heraldic feel */}
        <path
          d="M13 14 L24 24 M35 14 L24 24 M13 34 L24 24 M35 34 L24 24"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.6"
        />
        {/* Bottom point highlight */}
        <path
          d="M24 39.5 C24 41, 24 42.5, 24 43"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.6"
        />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 4. jour-14 — Les Runes d'Argent (Silver Runes)
 *    Three vertical rune stones with carved symbols. Silver gradient.
 * ========================================================================== */

function SilverRunesIcon(
  props: SvgProps & SvgDefProps
) {
  const { gradientId, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#D4D4D8" />
          <stop offset="100%" stopColor="#71717A" />
        </linearGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Rune stone 1 (left) */}
        <rect
          x="8"
          y="14"
          width="9"
          height="22"
          rx="2"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.5"
        />
        {/* Carved rune 1: Y shape */}
        <path
          d="M10.5 18 L14.5 22 M14.5 22 L10.5 26 M14.5 22 L14.5 30"
          stroke="rgba(0,0,0,0.45)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        {/* Rune stone 2 (center) */}
        <rect
          x="19.5"
          y="10"
          width="9"
          height="26"
          rx="2"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.5"
        />
        {/* Carved rune 2: vertical line with branch + diamond */}
        <path
          d="M24 14 L24 32 M24 20 L28 17 M24 20 L20 17"
          stroke="rgba(0,0,0,0.45)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M24 25 L26 27 L24 29 L22 27 Z"
          fill="rgba(0,0,0,0.3)"
        />
        {/* Rune stone 3 (right) */}
        <rect
          x="31"
          y="14"
          width="9"
          height="22"
          rx="2"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.5"
        />
        {/* Carved rune 3: X with vertical */}
        <path
          d="M33.5 18 L37.5 30 M37.5 18 L33.5 30 M35.5 16 L35.5 32"
          stroke="rgba(0,0,0,0.45)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        {/* Top accent dots */}
        <circle cx="12.5" cy="11" r="1" fill={`url(#${gradientId})`} />
        <circle cx="24" cy="7" r="1.2" fill={`url(#${gradientId})`} />
        <circle cx="35.5" cy="11" r="1" fill={`url(#${gradientId})`} />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 5. jour-30 — Le Sceptre d'Or (Gold Scepter)
 *    A royal scepter with an orb on top and decorative bands. Gold.
 * ========================================================================== */

function GoldScepterIcon(
  props: SvgProps & SvgDef2Props
) {
  const { gradientId, gradient2Id, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7CC" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <radialGradient id={gradient2Id} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFAE6" />
          <stop offset="60%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Top orb */}
        <circle
          cx="24"
          cy="11"
          r="6.5"
          fill={`url(#${gradient2Id})`}
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.6"
        />
        {/* Orb highlight */}
        <ellipse
          cx="22"
          cy="9"
          rx="1.6"
          ry="1.1"
          fill="rgba(255,255,255,0.75)"
        />
        {/* Decorative collar under orb */}
        <path
          d="M18 17.5 L30 17.5 L28 20 L20 20 Z"
          fill={`url(#${gradientId})`}
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="0.4"
        />
        {/* Scepter shaft */}
        <rect
          x="21.5"
          y="20"
          width="5"
          height="20"
          rx="1.5"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.4"
        />
        {/* Decorative bands on shaft */}
        <rect x="20.5" y="25" width="7" height="1.6" fill={`url(#${gradientId})`} stroke="rgba(0,0,0,0.25)" strokeWidth="0.3" />
        <rect x="20.5" y="33" width="7" height="1.6" fill={`url(#${gradientId})`} stroke="rgba(0,0,0,0.25)" strokeWidth="0.3" />
        {/* Pommel at bottom */}
        <circle
          cx="24"
          cy="42"
          r="3.2"
          fill={`url(#${gradient2Id})`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.5"
        />
        {/* Cross accent on orb */}
        <path
          d="M24 5.5 L24 8 M21.5 7 L26.5 7"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 6. jour-45 — L'Orbe de Platine (Platinum Orb)
 *    A glowing orb/sphere with orbiting rings. Platinum white-blue.
 * ========================================================================== */

function PlatinumOrbIcon(
  props: SvgProps & SvgDef2Props
) {
  const { gradientId, gradient2Id, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <radialGradient id={gradientId} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#E5E4E2" />
          <stop offset="100%" stopColor="#94A3B8" />
        </radialGradient>
        <linearGradient id={gradient2Id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#B9F2FF" />
        </linearGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Outer orbit ring (elliptical) */}
        <ellipse
          cx="24"
          cy="24"
          rx="20"
          ry="7"
          fill="none"
          stroke={`url(#${gradient2Id})`}
          strokeWidth="1.4"
          opacity="0.85"
          transform="rotate(-25 24 24)"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="20"
          ry="7"
          fill="none"
          stroke={`url(#${gradient2Id})`}
          strokeWidth="1.4"
          opacity="0.6"
          transform="rotate(25 24 24)"
        />
        {/* Central sphere */}
        <circle
          cx="24"
          cy="24"
          r="11"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.7"
        />
        {/* Inner highlight */}
        <ellipse
          cx="20.5"
          cy="20.5"
          rx="3"
          ry="2"
          fill="rgba(255,255,255,0.85)"
        />
        {/* Inner ring inside sphere */}
        <circle
          cx="24"
          cy="24"
          r="6"
          fill="none"
          stroke="rgba(185,242,255,0.7)"
          strokeWidth="0.6"
        />
        {/* Orbiting micro-dots */}
        <circle cx="6" cy="14" r="1.4" fill={`url(#${gradient2Id})`} />
        <circle cx="42" cy="34" r="1.4" fill={`url(#${gradient2Id})`} />
        <circle cx="40" cy="9" r="1" fill={`url(#${gradient2Id})`} />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 7. jour-60 — Le Cœur de Diamant (Diamond Heart)
 *    A heart shape made of diamond facets. Blue gradient.
 * ========================================================================== */

function DiamondHeartIcon(
  props: SvgProps & SvgDefProps
) {
  const { gradientId, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BFEEFF" />
          <stop offset="50%" stopColor="#64D2FF" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Heart body (faceted) */}
        <path
          d="M24 42
             L9 27
             C5 23, 5 16, 10 13
             C14 10, 20 11, 24 16
             C28 11, 34 10, 38 13
             C43 16, 43 23, 39 27
             Z"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.7"
        />
        {/* Facet lines (diamond cut) */}
        <path
          d="M24 16 L24 42 M24 16 L13 22 M24 16 L35 22 M13 22 L35 22 M13 22 L20 30 M35 22 L28 30 M20 30 L24 42 M28 30 L24 42"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Top-left highlight facet */}
        <path
          d="M24 16 L13 22 L20 14 Z"
          fill="rgba(255,255,255,0.5)"
        />
        {/* Top-right highlight facet */}
        <path
          d="M24 16 L35 22 L28 14 Z"
          fill="rgba(255,255,255,0.3)"
        />
        {/* Sparkle accent */}
        <path
          d="M14 14 L15 17 L18 18 L15 19 L14 22 L13 19 L10 18 L13 17 Z"
          fill="rgba(255,255,255,0.85)"
        />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 8. jour-90 — L'Émeraude de Renaissance (Emerald of Rebirth)
 *    A cut emerald gemstone with leaf-like facets. Green gradient.
 * ========================================================================== */

function EmeraldIcon(
  props: SvgProps & SvgDefProps
) {
  const { gradientId, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BBF7D0" />
          <stop offset="50%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Emerald cut (octagon) */}
        <path
          d="M16 9 L32 9 L39 16 L39 32 L32 39 L16 39 L9 32 L9 16 Z"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.7"
        />
        {/* Inner step cut */}
        <path
          d="M18 13 L30 13 L35 18 L35 30 L30 35 L18 35 L13 30 L13 18 Z"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.5"
        />
        {/* Table facet (top) */}
        <path
          d="M20 16 L28 16 L31 19 L31 29 L28 32 L20 32 L17 29 L17 19 Z"
          fill="rgba(255,255,255,0.18)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
        {/* Corner facets */}
        <path
          d="M16 9 L18 13 M32 9 L30 13 M39 16 L35 18 M39 32 L35 30 M32 39 L30 35 M16 39 L18 35 M9 32 L13 30 M9 16 L13 18"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Top-left highlight */}
        <path
          d="M17 19 L20 16 L23 19 L20 22 Z"
          fill="rgba(255,255,255,0.55)"
        />
        {/* Leaf-vein accent inside table */}
        <path
          d="M24 17 L24 31 M24 24 L28 22 M24 24 L20 22 M24 27 L28 29 M24 27 L20 29"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 9. jour-120 — Le Saphir de Sagesse (Sapphire of Wisdom)
 *    A deep blue sapphire with a six-ray star. Deep blue gradient.
 * ========================================================================== */

function SapphireIcon(
  props: SvgProps & SvgDefProps
) {
  const { gradientId, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="50%" stopColor="#5E5CE6" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Cushion-cut sapphire body */}
        <path
          d="M16 8 C12 8, 8 12, 8 16 L8 32 C8 36, 12 40, 16 40 L32 40 C36 40, 40 36, 40 32 L40 16 C40 12, 36 8, 32 8 Z"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.7"
        />
        {/* Inner cushion facet */}
        <path
          d="M18 12 C15 12, 12 15, 12 18 L12 30 C12 33, 15 36, 18 36 L30 36 C33 36, 36 33, 36 30 L36 18 C36 15, 33 12, 30 12 Z"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.5"
        />
        {/* Six-ray star (asterism) */}
        <g
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="0.9"
          strokeLinecap="round"
        >
          {/* Vertical ray */}
          <path d="M24 9 L24 39" />
          {/* Horizontal ray */}
          <path d="M9 24 L39 24" />
          {/* Diagonal rays (60°) */}
          <path d="M12 12 L36 36" />
          <path d="M36 12 L12 36" />
        </g>
        {/* Central glow */}
        <circle cx="24" cy="24" r="3.2" fill="rgba(255,255,255,0.55)" />
        <circle cx="24" cy="24" r="1.4" fill="rgba(255,255,255,0.95)" />
        {/* Top-left highlight */}
        <path
          d="M14 14 C13 15, 12 17, 12 18 L16 14 Z"
          fill="rgba(255,255,255,0.5)"
        />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 10. jour-180 — Le Rubis de Passion (Ruby of Passion)
 *    A faceted ruby with inner fire. Red gradient.
 * ========================================================================== */

function RubyIcon(
  props: SvgProps & SvgDefProps
) {
  const { gradientId, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FECACA" />
          <stop offset="45%" stopColor="#FF3B30" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Pear/teardrop cut ruby */}
        <path
          d="M24 6
             C16 6, 9 14, 9 24
             C9 32, 16 41, 24 41
             C32 41, 39 32, 39 24
             C39 14, 32 6, 24 6 Z"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.7"
        />
        {/* Crown facets (top) */}
        <path
          d="M24 6 L13 16 L24 22 L35 16 Z"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
        {/* Pavilion facets (bottom) */}
        <path
          d="M24 22 L13 16 L9 24 L24 41 Z M24 22 L35 16 L39 24 L24 41 Z"
          fill="rgba(0,0,0,0.10)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.5"
        />
        {/* Main vertical facet */}
        <path
          d="M24 6 L24 41"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
        {/* Inner fire glow */}
        <ellipse
          cx="24"
          cy="26"
          rx="6"
          ry="9"
          fill="rgba(254,202,202,0.4)"
        />
        {/* Top highlight */}
        <path
          d="M24 6 L18 12 L24 18 L21 14 Z"
          fill="rgba(255,255,255,0.75)"
        />
        {/* Spark */}
        <path
          d="M16 14 L17 16 L19 17 L17 18 L16 20 L15 18 L13 17 L15 16 Z"
          fill="rgba(255,255,255,0.9)"
        />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 11. jour-270 — L'Améthyste de Maîtrise (Amethyst of Mastery)
 *    A purple amethyst geode / crystal cluster. Purple gradient.
 * ========================================================================== */

function AmethystIcon(
  props: SvgProps & SvgDefProps
) {
  const { gradientId, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="50%" stopColor="#BF5AF2" />
          <stop offset="100%" stopColor="#6B21A8" />
        </linearGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Geode shell (outer irregular oval) */}
        <path
          d="M24 6
             C14 6, 7 14, 7 24
             C7 33, 14 41, 24 41
             C34 41, 41 33, 41 24
             C41 14, 34 6, 24 6 Z"
          fill="rgba(0,0,0,0.45)"
          stroke="rgba(191,90,242,0.5)"
          strokeWidth="0.8"
        />
        {/* Inner geode cavity (darker) */}
        <path
          d="M24 10
             C16 10, 11 16, 11 24
             C11 31, 16 37, 24 37
             C32 37, 37 31, 37 24
             C37 16, 32 10, 24 10 Z"
          fill="rgba(0,0,0,0.55)"
        />
        {/* Crystal cluster — several faceted amethyst points radiating from center */}
        {/* Center crystal (largest) */}
        <path
          d="M24 14 L29 22 L24 32 L19 22 Z"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.5"
        />
        <path
          d="M24 14 L24 32 M19 22 L29 22"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.4"
        />
        {/* Left crystal */}
        <path
          d="M16 18 L20 23 L17 31 L13 24 Z"
          fill={`url(#${gradientId})`}
          opacity="0.85"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.4"
        />
        {/* Right crystal */}
        <path
          d="M32 18 L35 24 L31 31 L28 23 Z"
          fill={`url(#${gradientId})`}
          opacity="0.85"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.4"
        />
        {/* Small top crystal */}
        <path
          d="M21 13 L24 16 L27 13 L24 11 Z"
          fill={`url(#${gradientId})`}
        />
        {/* Top highlight on center crystal */}
        <path
          d="M24 14 L26 18 L24 22 L22 18 Z"
          fill="rgba(255,255,255,0.55)"
        />
        {/* Sparkle */}
        <circle cx="24" cy="22" r="1" fill="rgba(255,255,255,0.9)" />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 12. jour-365 — La Couronne de Légende (Crown of Legend)
 *    A royal crown with 5 points and a central gem. Gold-red gradient.
 * ========================================================================== */

function CrownIcon(
  props: SvgProps & SvgDef2Props
) {
  const { gradientId, gradient2Id, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7CC" />
          <stop offset="45%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <radialGradient id={gradient2Id} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FECACA" />
          <stop offset="60%" stopColor="#FF3B30" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </radialGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Crown body (base band) */}
        <path
          d="M8 30 L40 30 L40 36 C40 38, 38 40, 36 40 L12 40 C10 40, 8 38, 8 36 Z"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.6"
        />
        {/* Band decoration */}
        <path
          d="M8 33 L40 33"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="0.6"
        />
        {/* Five crown points (peaks) */}
        <path
          d="M8 30 L12 12 L18 26 L24 8 L30 26 L36 12 L40 30 Z"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.7"
        />
        {/* Inner shadow facets on peaks */}
        <path
          d="M12 12 L15 22 L18 26 Z M36 12 L33 22 L30 26 Z"
          fill="rgba(0,0,0,0.18)"
        />
        {/* Tip jewels on the 5 points */}
        <circle cx="12" cy="12" r="1.6" fill={`url(#${gradientId})`} stroke="rgba(0,0,0,0.2)" strokeWidth="0.3" />
        <circle cx="24" cy="8" r="2.2" fill={`url(#${gradient2Id})`} stroke="rgba(255,255,255,0.6)" strokeWidth="0.4" />
        <circle cx="36" cy="12" r="1.6" fill={`url(#${gradientId})`} stroke="rgba(0,0,0,0.2)" strokeWidth="0.3" />
        <circle cx="18" cy="26" r="1.2" fill={`url(#${gradient2Id})`} />
        <circle cx="30" cy="26" r="1.2" fill={`url(#${gradient2Id})`} />
        {/* Central large gem on band */}
        <path
          d="M24 32 L28 35 L24 38 L20 35 Z"
          fill={`url(#${gradient2Id})`}
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.4"
        />
        <path
          d="M24 32 L24 38 M20 35 L28 35"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.3"
        />
        {/* Side smaller gems */}
        <circle cx="14" cy="35" r="1.2" fill={`url(#${gradient2Id})`} opacity="0.85" />
        <circle cx="34" cy="35" r="1.2" fill={`url(#${gradient2Id})`} opacity="0.85" />
        {/* Top gem highlight */}
        <circle cx="23.3" cy="7.3" r="0.7" fill="rgba(255,255,255,0.85)" />
      </g>
    </svg>
  );
}

/* ============================================================================
 * 13. jour-730 — L'Étoile de Maîtrise (Star of Mastery)
 *    An 8-pointed star with rays. White-prismatic gradient.
 * ========================================================================== */

function StarMasteryIcon(
  props: SvgProps & SvgDefRadialProps
) {
  const { gradientId, gradient2Id, radialId, glowId, glow, ...svg } = props;
  return (
    <svg {...svg}>
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#64D2FF" />
        </radialGradient>
        <linearGradient id={gradient2Id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#BF5AF2" />
          <stop offset="100%" stopColor="#5E5CE6" />
        </linearGradient>
        <radialGradient id={radialId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <GlowFilter glowId={glowId} glow={glow} />
      </defs>
      <g filter={glow ? `url(#${glowId})` : undefined}>
        {/* Soft halo behind star */}
        <circle cx="24" cy="24" r="20" fill={`url(#${radialId})`} />
        {/* 8-pointed star — 4 long + 4 short points */}
        <path
          d="M24 4
             L27 21
             L44 24
             L27 27
             L24 44
             L21 27
             L4 24
             L21 21 Z"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.6"
        />
        {/* Diagonal shorter points (45° offset) */}
        <path
          d="M24 10
             L26 22
             L38 24
             L26 26
             L24 38
             L22 26
             L10 24
             L22 22 Z"
          fill={`url(#${gradient2Id})`}
          opacity="0.55"
        />
        {/* Central core */}
        <circle
          cx="24"
          cy="24"
          r="4.5"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="0.5"
        />
        <circle cx="24" cy="24" r="2" fill="rgba(255,255,255,0.95)" />
        {/* Sparkles on each long ray tip */}
        <circle cx="24" cy="4" r="0.9" fill="#FFFFFF" />
        <circle cx="44" cy="24" r="0.9" fill="#FFFFFF" />
        <circle cx="24" cy="44" r="0.9" fill="#FFFFFF" />
        <circle cx="4" cy="24" r="0.9" fill="#FFFFFF" />
        {/* Inner facet lines */}
        <path
          d="M24 4 L24 24 M44 24 L24 24 M24 44 L24 24 M4 24 L24 24"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="0.3"
        />
      </g>
    </svg>
  );
}

export default ArtifactIcon;
