"use client";

import { motion } from "framer-motion";
import { LinkIcon, ChevronRight } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";

/**
 * WelcomeScreen
 *
 * Premium "rising sun" emblem — a glowing orb rising from broken chains
 * with rotating rays, concentric auras, upward sparkles, and floating
 * particles. Replaces the old "bonhomme" stick-figure silhouette.
 *
 * Symbolism: the user is rising out of addiction, leaving broken chains
 * behind, climbing toward the light.
 */
export function WelcomeScreen() {
  const { navigate } = useStore();
  const t = useT();

  // 12 light rays — pre-computed so JSX stays flat.
  const RAYS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  // Floating ember particles around the orb (CSS-only, slow drift).
  const EMBERS = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    x: 30 + (i * 17) % 140,
    y: 30 + (i * 23) % 90,
    size: 1.5 + (i % 3) * 0.6,
    delay: (i * 0.7) % 4,
    duration: 4 + (i % 4),
  }));

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16 pb-8 relative overflow-hidden">
      {/* Premium rising-sun emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex items-center justify-center"
      >
        <div className="relative w-72 h-72">
          {/* Outer ambient glow mesh */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(245, 158, 11,0.55) 0%, rgba(255,59,48,0.25) 35%, rgba(138,0,0,0.0) 70%)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Soft secondary halo */}
          <motion.div
            className="absolute inset-6 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,215,0,0.35) 0%, rgba(255,59,48,0.0) 65%)",
            }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* The main emblem SVG */}
          <svg viewBox="0 0 200 200" className="relative w-full h-full">
            <defs>
              <radialGradient id="zerobet-sun-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF7B0" />
                <stop offset="25%" stopColor="#FFD700" />
                <stop offset="55%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FBBF24" />
              </radialGradient>

              <linearGradient id="zerobet-ray-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
                <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="zerobet-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>

              <filter id="zerobet-sun-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="zerobet-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer rotating ring (slow, clockwise) */}
            <motion.g
              style={{ transformOrigin: "100px 100px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="url(#zerobet-ring-grad)"
                strokeWidth="0.8"
                strokeDasharray="3 8"
                opacity="0.55"
              />
            </motion.g>

            {/* Middle rotating ring (counter-clockwise) */}
            <motion.g
              style={{ transformOrigin: "100px 100px" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="100"
                cy="100"
                r="62"
                fill="none"
                stroke="url(#zerobet-ring-grad)"
                strokeWidth="1"
                strokeDasharray="1 4"
                opacity="0.7"
              />
            </motion.g>

            {/* Light rays — 12 spokes, breathing opacity + slow rotation */}
            <motion.g
              style={{ transformOrigin: "100px 100px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <motion.g
                animate={{ opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                filter="url(#zerobet-soft-glow)"
              >
                {RAYS.map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 100 + 38 * Math.cos(rad);
                  const y1 = 100 + 38 * Math.sin(rad);
                  const x2 = 100 + 74 * Math.cos(rad);
                  const y2 = 100 + 74 * Math.sin(rad);
                  return (
                    <line
                      key={angle}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#zerobet-ray-grad)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  );
                })}
              </motion.g>
            </motion.g>

            {/* Inner halo circle (static ring around the sun) */}
            <motion.circle
              cx="100"
              cy="100"
              r="42"
              fill="none"
              stroke="url(#zerobet-ring-grad)"
              strokeWidth="0.8"
              opacity="0.6"
              animate={{ opacity: [0.4, 0.75, 0.4], r: [42, 44, 42] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Central glowing sun/orb */}
            <motion.circle
              cx="100"
              cy="100"
              r="30"
              fill="url(#zerobet-sun-grad)"
              filter="url(#zerobet-sun-glow)"
              animate={{ scale: [1, 1.06, 1], opacity: [0.95, 1, 0.95] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "100px 100px" }}
            />

            {/* Inner core highlight */}
            <motion.circle
              cx="100"
              cy="100"
              r="14"
              fill="#FFFCE5"
              opacity="0.85"
              filter="url(#zerobet-soft-glow)"
              animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "100px 100px" }}
            />

            {/* Upward sparkles — rising stars */}
            <motion.g
              animate={{ y: [0, -22, 0], opacity: [0, 1, 0], scale: [0.6, 1.1, 0.6] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M100 38 L102 43 L107 45 L102 47 L100 52 L98 47 L93 45 L98 43 Z"
                fill="#FFD700"
                filter="url(#zerobet-soft-glow)"
              />
            </motion.g>
            <motion.g
              animate={{ y: [0, -16, 0], opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
            >
              <path
                d="M70 60 L71 63 L74 64 L71 65 L70 68 L69 65 L66 64 L69 63 Z"
                fill="#F59E0B"
                filter="url(#zerobet-soft-glow)"
              />
            </motion.g>
            <motion.g
              animate={{ y: [0, -18, 0], opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
            >
              <path
                d="M130 60 L131 63 L134 64 L131 65 L130 68 L129 65 L126 64 L129 63 Z"
                fill="#F59E0B"
                filter="url(#zerobet-soft-glow)"
              />
            </motion.g>

            {/* Broken chains — faded, drifting downward (the past falling away) */}
            <motion.g
              animate={{ y: [0, 4, 0], opacity: [0.32, 0.18, 0.32] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Left chain fragment */}
              <circle cx="62" cy="162" r="6" fill="none" stroke="#6B7280" strokeWidth="1.6" />
              <circle cx="72" cy="170" r="4" fill="none" stroke="#6B7280" strokeWidth="1.6" opacity="0.6" />
              <line x1="56" y1="158" x2="50" y2="153" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />

              {/* Right chain fragment */}
              <circle cx="138" cy="162" r="6" fill="none" stroke="#6B7280" strokeWidth="1.6" />
              <circle cx="128" cy="170" r="4" fill="none" stroke="#6B7280" strokeWidth="1.6" opacity="0.6" />
              <line x1="144" y1="158" x2="150" y2="153" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
            </motion.g>
          </svg>

          {/* Floating ember particles (CSS-only, slow drift) */}
          {EMBERS.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background:
                  p.id % 2 === 0
                    ? "rgba(255, 215, 0, 0.9)"
                    : "rgba(245, 158, 11, 0.85)",
                boxShadow: "0 0 6px rgba(245, 158, 11, 0.9)",
              }}
              animate={{
                y: [0, -28, 0],
                x: [0, (p.id % 2 === 0 ? 4 : -4), 0],
                opacity: [0, 1, 0],
                scale: [0.6, 1.2, 0.6],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs text-white/70 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#FFC94D] animate-pulse" />
          {t("welcomeTagline")}
        </div>
        <h1 className="text-4xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-3 leading-tight">
          {t("welcomeTitle").split(" ").slice(0, -1).join(" ")} <span className="gradient-primary-text">{t("welcomeTitle").split(" ").slice(-1)}</span>
        </h1>
        <p className="text-white/60 text-lg">
          {t("welcomeSubtitle")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <button
          onClick={() => navigate("quiz")}
          className="w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-green flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          {t("welcomeCta")}
          <ChevronRight size={20} />
        </button>
        <button
          onClick={() => navigate("dashboard")}
          className="w-full py-4 rounded-2xl glass-card text-white/80 font-[family-name:var(--font-poppins)] font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <LinkIcon size={16} />
          {t("welcomeHaveAccount")}
        </button>
      </motion.div>

      <p className="text-center text-white/40 text-xs mt-6 leading-relaxed">
        {t("welcomeTermsNotice")}
      </p>
    </div>
  );
}
