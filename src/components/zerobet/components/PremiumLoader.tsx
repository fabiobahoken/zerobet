"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZerobetLogo } from "@/components/zerobet/components/ZerobetLogo";

export interface PremiumLoaderProps {
  /** Show the loader (only relevant for inline/controlled usage). */
  show?: boolean;
  /** Fullscreen overlay instead of inline. Defaults to false. */
  fullscreen?: boolean;
  /** Optional subheading shown beneath the typewriter "Zerobet". */
  subtitle?: string;
  /** Auto-dismiss after progress completes. Defaults to true for inline. */
  autoProgress?: boolean;
  /** Total duration in ms for the progress bar to fill. */
  duration?: number;
  /** Called once progress reaches 100% (and after the brief exit fade). */
  onComplete?: () => void;
  className?: string;
}

/**
 * PremiumLoader
 * --------------
 * A premium, cinematic loading component used during app transitions.
 *
 * Design:
 * - Magnetic halo rings breathing around the logo
 * - "Zerobet" wordmark with multi-stop gradient + animated shine sweep
 * - Tagline below in elegant letter-spaced text
 * - Thin progress line with shimmer + percentage counter
 * - CSS-driven particle field (3 layers — no per-frame JS)
 * - Respects prefers-reduced-motion
 *
 * Can be used as a full-screen loader (`fullscreen`) or inline (`show`).
 */
export function PremiumLoader({
  show = true,
  fullscreen = false,
  subtitle = "Arrête les paris. Reconstruis-toi.",
  autoProgress = true,
  duration = 2200,
  onComplete,
  className = "",
}: PremiumLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  // Drive the progress bar smoothly to 100%.
  useEffect(() => {
    if (!show || !autoProgress) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      // easeOutCubic for a more premium deceleration curve
      const raw = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - raw, 3);
      const pct = eased * 100;
      setProgress(pct);
      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        const t = setTimeout(() => {
          onComplete?.();
        }, 420);
        return () => clearTimeout(t);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show, autoProgress, duration, onComplete]);

  // Deterministic particle field — three depth layers for a parallax feel.
  const particles = useMemo(() => {
    const layers = [
      // Far layer — tiny, slow, dim
      Array.from({ length: 14 }).map((_, i) => ({
        id: `f-${i}`,
        left: (i * 67) % 100,
        top: (i * 41 + 11) % 100,
        size: 1 + ((i * 3) % 2),
        delay: (i % 7) * 0.5,
        duration: 6 + ((i * 13) % 5),
        opacity: 0.35,
        blur: 1.5,
        color:
          i % 3 === 0
            ? "rgba(245, 158, 11,0.85)"
            : i % 3 === 1
              ? "rgba(45, 212, 191,0.85)"
              : "rgba(255,255,255,0.85)",
        drift: 28,
      })),
      // Mid layer — slightly larger, medium speed
      Array.from({ length: 9 }).map((_, i) => ({
        id: `m-${i}`,
        left: (i * 79 + 7) % 100,
        top: (i * 53 + 23) % 100,
        size: 2 + ((i * 5) % 3),
        delay: (i % 5) * 0.7,
        duration: 5 + ((i * 11) % 4),
        opacity: 0.6,
        blur: 0.8,
        color:
          i % 2 === 0
            ? "rgba(255,107,53,0.9)"
            : "rgba(192, 132, 252,0.9)",
        drift: 40,
      })),
      // Near layer — biggest, fastest, brightest
      Array.from({ length: 5 }).map((_, i) => ({
        id: `n-${i}`,
        left: (i * 83 + 17) % 100,
        top: (i * 37 + 5) % 100,
        size: 3 + ((i * 7) % 3),
        delay: i * 0.9,
        duration: 4 + (i % 3),
        opacity: 0.9,
        blur: 0.4,
        color: i % 2 === 0 ? "rgba(255,215,0,0.95)" : "rgba(255,255,255,0.95)",
        drift: 56,
      })),
    ];
    return layers.flat();
  }, []);

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative w-full h-full flex flex-col items-center justify-center px-8 ${className}`}
    >
      {/* Ambient gradient mesh backdrop (CSS-only) */}
      <div className="absolute inset-0 -z-20 premium-mesh-bg" aria-hidden />
      {/* Slow aurora band */}
      <div
        className="absolute inset-0 -z-10 premium-aurora-band"
        aria-hidden
      />

      {/* Floating particle field (CSS animations, no per-frame JS) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="premium-particle"
            style={
              {
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                filter: p.blur ? `blur(${p.blur}px)` : undefined,
                background: p.color,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--particle-drift": `${p.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Logo with magnetic breathing halo */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
        className="relative mb-7"
      >
        {/* Magnetic halo — three concentric breathing rings */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: [0, 0.55, 0], scale: [0.85, 1.45, 0.85] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,59,48,0.55) 0%, rgba(245, 158, 11,0.30) 38%, transparent 70%)",
          }}
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 0.4, 0], scale: [1, 1.85, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(45, 212, 191,0.40) 0%, transparent 70%)",
          }}
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: [0, 0.3, 0], scale: [1.1, 2.1, 1.1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(192, 132, 252,0.32) 0%, transparent 70%)",
          }}
        />
        <div className="animate-glow-pulse premium-logo-shake">
          <ZerobetLogo size={136} animated />
        </div>
      </motion.div>

      {/* Wordmark — gradient text with shimmer sweep */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <h1 className="font-[family-name:var(--font-poppins)] text-5xl font-extrabold tracking-tight mb-2 premium-wordmark">
          <span className="premium-wordmark-text">Zerobet</span>
        </h1>
      </motion.div>

      {/* Tagline — letter-spaced, premium feel */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        className="text-white/65 text-[11px] font-medium tracking-[0.28em] uppercase text-center"
      >
        {subtitle}
      </motion.p>

      {/* Progress: thin shimmer line + percentage */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="mt-10 w-60"
      >
        <div className="relative h-[3px] rounded-full bg-white/8 overflow-hidden">
          {/* Active fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full premium-progress-fill"
            style={{ width: `${progress}%` }}
          />
          {/* Shimmer sweep on top of fill */}
          <div
            className="absolute inset-y-0 premium-progress-shimmer"
            style={{ width: `${progress}%` }}
          />
          {/* Glow at the leading edge */}
          <div
            className="absolute top-1/2 -translate-y-1/2 premium-progress-glow"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-white/35 text-[10px] font-mono tracking-[0.25em] uppercase">
            Loading
          </span>
          <span className="text-white/65 text-[11px] font-mono tracking-widest font-semibold">
            {Math.round(progress)
              .toString()
              .padStart(2, "0")}
            %
          </span>
        </div>
      </motion.div>

      {/* Premium loader styles */}
      <style>{`
        .premium-mesh-bg {
          background:
            radial-gradient(ellipse at 25% 20%, rgba(255,59,48,0.18) 0%, transparent 45%),
            radial-gradient(ellipse at 75% 30%, rgba(192, 132, 252,0.18) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 85%, rgba(245, 158, 11,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 75%, rgba(45, 212, 191,0.14) 0%, transparent 50%);
          background-size: 200% 200%, 200% 200%, 200% 200%, 200% 200%;
          animation: premium-mesh-shift 14s ease-in-out infinite;
        }
        @keyframes premium-mesh-shift {
          0%, 100% { background-position: 0% 0%, 100% 0%, 50% 100%, 100% 100%; }
          50% { background-position: 30% 30%, 70% 30%, 30% 70%, 70% 70%; }
        }
        .premium-aurora-band {
          background: linear-gradient(
            115deg,
            transparent 0%,
            transparent 35%,
            rgba(255,107,53,0.10) 50%,
            transparent 65%,
            transparent 100%
          );
          background-size: 250% 250%;
          animation: premium-aurora-sweep 9s ease-in-out infinite;
          mix-blend-mode: screen;
        }
        @keyframes premium-aurora-sweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .premium-particle {
          position: absolute;
          border-radius: 9999px;
          display: block;
          animation-name: premium-particle-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
        @keyframes premium-particle-float {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(var(--particle-drift, 30px), -48px) scale(1); opacity: 0; }
        }
        .premium-wordmark {
          position: relative;
          isolation: isolate;
        }
        .premium-wordmark-text {
          background: linear-gradient(
            100deg,
            #FF3B30 0%,
            #FF6B35 22%,
            #F59E0B 42%,
            #FFD700 60%,
            #FF6B35 78%,
            #FF3B30 100%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: premium-text-flow 6s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes premium-text-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .premium-progress-fill {
          background: linear-gradient(
            90deg,
            #FF3B30 0%,
            #FF6B35 45%,
            #F59E0B 75%,
            #FFD700 100%
          );
          transition: width 0.08s linear;
          box-shadow: 0 0 12px rgba(255,107,53,0.6);
        }
        .premium-progress-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.0) 60%,
            rgba(255,255,255,0.55) 75%,
            rgba(255,255,255,0.0) 90%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: premium-progress-shimmer-anim 1.6s linear infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        @keyframes premium-progress-shimmer-anim {
          0% { background-position: -50% 0; }
          100% { background-position: 150% 0; }
        }
        .premium-progress-glow {
          width: 14px;
          height: 14px;
          margin-left: -7px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255,215,0,0.95) 0%, rgba(255,107,53,0.5) 40%, transparent 70%);
          filter: blur(1px);
          pointer-events: none;
          transition: left 0.08s linear;
        }
        .premium-logo-shake {
          filter: drop-shadow(0 0 24px rgba(255,59,48,0.45))
                  drop-shadow(0 0 48px rgba(245, 158, 11,0.25));
        }
        @media (prefers-reduced-motion: reduce) {
          .premium-mesh-bg,
          .premium-aurora-band,
          .premium-particle,
          .premium-wordmark-text,
          .premium-progress-shimmer {
            animation: none !important;
          }
        }
      `}</style>
    </motion.div>
  );

  if (fullscreen) {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-[#070B0E] flex items-center justify-center"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={className}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PremiumLoader;
