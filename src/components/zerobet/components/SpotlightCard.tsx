"use client";

import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

export interface SpotlightCardProps {
  /** Card content. */
  children: ReactNode;
  /** Extra className applied to the card root. */
  className?: string;
  /** Spotlight color (hex / rgb / rgba). @default "#F59E0B" */
  spotlightColor?: string;
  /** Spotlight radius in pixels. @default 400 */
  spotlightSize?: number;
  /** Optional click handler. When provided, the card becomes keyboard-focusable
   *  and exposes role="button" + Enter/Space activation. */
  onClick?: () => void;
  /** Whether to add a subtle box-shadow that intensifies on hover using the
   *  spotlight color. @default true */
  glowOnHover?: boolean;
}

const ENTER_SPRING: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 26,
  mass: 0.9,
};

/**
 * SpotlightCard — a premium glass card with a radial light that follows the
 * cursor on hover.
 *
 * The card sets four CSS custom properties on its root element:
 *  - `--spotlight-x`      (0-100, percent) cursor X
 *  - `--spotlight-y`      (0-100, percent) cursor Y
 *  - `--spotlight-size`   (length)         radial-gradient radius
 *  - `--spotlight-color`  (rgba color)     radial-gradient tint
 *
 * The `.spotlight::before` pseudo-element (defined in globals.css) renders the
 * radial gradient at that position. Because the gradient is keyed off CSS
 * variables, the spotlight follows the mouse with no React re-render — only
 * a cheap style mutation on the DOM node.
 *
 * Honors the user's reduced-motion preference:
 *  - entrance animation is skipped (initial=false, animate=undefined)
 *  - glow-on-hover is disabled (no box-shadow transitions)
 *  - spotlight opacity transition still works (it's a passive hover affordance,
 *    not motion per se, and respects the user's hover intent)
 *
 * Accessibility:
 *  - When `onClick` is provided, the card gets `role="button"`, `tabIndex={0}`,
 *    keyboard activation on Enter / Space, and `cursor-pointer`.
 *  - When no `onClick` is provided, the card is a plain container.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "#F59E0B",
  spotlightSize = 400,
  onClick,
  glowOnHover = true,
}: SpotlightCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  // Tracks whether the cursor is currently inside the card so we can keep the
  // --spotlight-x/y values fresh without re-rendering React on every mousemove.
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const xPct = ((event.clientX - rect.left) / rect.width) * 100;
      const yPct = ((event.clientY - rect.top) / rect.height) * 100;
      // Clamp to [0, 100] so the gradient origin never escapes the card.
      const clampedX = Math.max(0, Math.min(100, xPct));
      const clampedY = Math.max(0, Math.min(100, yPct));
      el.style.setProperty("--spotlight-x", `${clampedX}%`);
      el.style.setProperty("--spotlight-y", `${clampedY}%`);
    },
    [],
  );

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!onClick) return;
      if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        onClick();
      }
    },
    [onClick],
  );

  const isInteractive = typeof onClick === "function";

  // Style overrides for spotlight size + color + optional hover glow.
  // The `.spotlight::before` rule (globals.css) reads three CSS custom
  // properties from the element:
  //   --spotlight-x     (0-100%)  cursor X position
  //   --spotlight-y     (0-100%)  cursor Y position
  //   --spotlight-size  (length)  radial-gradient radius
  //   --spotlight-color (color)   radial-gradient tint (use low alpha!)
  //
  // We default x/y to 50% (centered) and immediately update them on
  // mousemove via direct DOM style mutation (no React re-render).
  const style: CSSProperties = {
    ["--spotlight-color" as string]: hexToRgba(spotlightColor, 0.15),
    ["--spotlight-size" as string]: `${spotlightSize}px`,
    ["--spotlight-x" as string]: "50%",
    ["--spotlight-y" as string]: "50%",
  };

  // Hover-glow box-shadow that intensifies on hover. Disabled for reduced motion.
  const glowStyle: CSSProperties =
    glowOnHover && !prefersReducedMotion
      ? {
          boxShadow: hovered
            ? `0 12px 40px rgba(0,0,0,0.4), 0 0 32px -6px ${hexToRgba(spotlightColor, 0.55)}`
            : `0 8px 24px rgba(0,0,0,0.3), 0 0 16px -8px ${hexToRgba(spotlightColor, 0.3)}`,
          transition: "box-shadow 0.3s ease",
        }
      : {};

  const combinedClassName = [
    "spotlight",
    "glass-card",
    isInteractive ? "cursor-pointer" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      ref={cardRef}
      className={combinedClassName}
      style={{ ...style, ...glowStyle }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? undefined : ENTER_SPRING}
    >
      {children}
    </motion.div>
  );
}

/**
 * Convert a hex color (#RGB / #RRGGBB) to an `rgba()` string with the given
 * alpha. Returns the original color unchanged if it can't be parsed (so users
 * passing `rgba(...)` or named colors still get a sensible result).
 */
function hexToRgba(color: string, alpha: number): string {
  const trimmed = color.trim();
  const hexMatch = trimmed.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (!hexMatch) return trimmed; // Pass through rgb()/rgba()/named colors.
  const hex = hexMatch[1];
  const fullHex =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default SpotlightCard;
