"use client";

import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

export interface TiltCardProps {
  /** Card content. */
  children: ReactNode;
  /** Extra className applied to the card root. */
  className?: string;
  /** Maximum tilt angle in degrees. @default 12 */
  maxTilt?: number;
  /** Whether to render a moving glare highlight that follows the cursor. @default true */
  glare?: boolean;
  /** Slight scale applied on hover for a "lift" feeling. @default 1.02 */
  scale?: number;
  /** Optional click handler. When provided, the card becomes keyboard-focusable
   *  and exposes role="button" + Enter/Space activation. */
  onClick?: () => void;
}

/**
 * TiltCard — a 3D tilt card that responds to mouse/touch movement with a
 * subtle parallax effect and optional glare highlight.
 *
 * The wrapper element receives the rotation transform inline. Pair with the
 * `.tilt-card` and `.tilt-card-inner` utility classes (globals.css) to get
 * `transform-style: preserve-3d` on the wrapper, a smooth `transition` on
 * reset, and a `translateZ(40px)` parallax lift on `.tilt-card-inner`.
 *
 * Honors the user's reduced-motion preference:
 *  - tilt is disabled (rendered as a plain container)
 *  - glare is disabled
 *  - scale-on-hover is disabled
 *
 * Accessibility:
 *  - When `onClick` is provided, the card gets `role="button"`, `tabIndex={0}`,
 *    keyboard activation on Enter / Space, and `cursor-pointer`.
 *  - When no `onClick` is provided, the card is a plain container.
 *
 * Example:
 * ```tsx
 * <TiltCard className="glass-card p-6" maxTilt={15}>
 *   <h3>I tilt on hover!</h3>
 * </TiltCard>
 * ```
 */
export function TiltCard({
  children,
  className,
  maxTilt = 12,
  glare = true,
  scale = 1.02,
  onClick,
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Tilt state — `x` is rotateX (positive tilts top toward viewer),
  // `y` is rotateY (positive tilts right side toward viewer).
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // Glare position in % of card dimensions (0-100).
  const [glarePos, setGlarePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  // Whether the cursor is currently inside the card (drives glare visibility
  // and the scale-on-hover lift).
  const [active, setActive] = useState(false);

  const handlePointerMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Normalized cursor position in [0, 1] relative to the card.
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const clampedX = Math.max(0, Math.min(1, px));
      const clampedY = Math.max(0, Math.min(1, py));

      // Cursor at top => tilt top toward viewer (positive rotateX).
      // Cursor at right => tilt right side away from viewer (positive rotateY).
      const rotateX = (0.5 - clampedY) * 2 * maxTilt;
      const rotateY = (clampedX - 0.5) * 2 * maxTilt;

      setTilt({ x: rotateX, y: rotateY });
      setGlarePos({ x: clampedX * 100, y: clampedY * 100 });
      setActive(true);
    },
    [maxTilt, prefersReducedMotion],
  );

  const handlePointerLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    setTilt({ x: 0, y: 0 });
    setActive(false);
  }, [prefersReducedMotion]);

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

  // Inline style overrides anything from the .tilt-card class. The transform
  // string is rebuilt every render — React 18 batches mousemove state updates
  // so this is fine performance-wise (one re-render per pointer event).
  const style: CSSProperties = prefersReducedMotion
    ? { position: "relative" }
    : {
        position: "relative",
        transform:
          `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) ` +
          `rotateY(${tilt.y.toFixed(2)}deg) scale(${active ? scale : 1})`,
        // Fast transition while active (effectively following the cursor),
        // smooth easing curve on reset for a graceful return.
        transition: active
          ? "transform 0.05s linear"
          : "transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
      };

  const combinedClassName = [
    "tilt-card",
    isInteractive ? "cursor-pointer" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={cardRef}
      className={combinedClassName}
      style={style}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {/* Glare overlay — radial gradient that follows the cursor.
          Rendered behind children so it never blocks interaction. */}
      {glare && !prefersReducedMotion && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          style={{
            opacity: active ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0) 60%)`,
              mixBlendMode: "screen",
            }}
          />
        </div>
      )}
      <div className="tilt-card-inner relative" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}

export default TiltCard;
