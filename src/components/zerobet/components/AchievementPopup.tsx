"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { PARCOURS_RANKS } from "@/lib/data/parcours-data";
import type { ParcoursRank } from "@/lib/data/parcours-data";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { useT } from "@/lib/i18n/useT";
import { ArtifactIcon } from "@/components/zerobet/components/ArtifactIcon";

const CONFETTI_COLORS = ["#FF6B00", "#FF8A00", "#F59E0B", "#FFC94D", "#FFB020", "#FBBF24", "#FFD166", "#FFD700"];

function generateConfettiParticles(count: number) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: `${(Math.random() * 90 + 5).toFixed(1)}%`,
    delay: `${(Math.random() * 0.4).toFixed(2)}s`,
    duration: `${(1.2 + Math.random() * 0.8).toFixed(2)}s`,
    size: 6 + Math.floor(Math.random() * 6),
    rotation: Math.floor(Math.random() * 360),
    shape: (i % 3) as 0 | 1 | 2, // 0=circle, 1=rect, 2=diamond
    drift: `${(Math.random() * 100 - 50).toFixed(0)}px`,
  }));
}

export function AchievementPopup() {
  const t = useT();
  const unlockedRanks = useStore((s) => s.unlockedRanks);
  const [newRank, setNewRank] = useState<ParcoursRank | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [confettiParticles] = useState(() => generateConfettiParticles(26));
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Use a tick counter incremented only inside setInterval callback
  // to avoid calling setState synchronously in an effect body
  const prevLengthRef = useRef(unlockedRanks.length);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentLength = useStore.getState().unlockedRanks.length;
      if (currentLength > prevLengthRef.current && currentLength > 0) {
        prevLengthRef.current = currentLength;
        setTick((t) => t + 1);
      } else if (currentLength < prevLengthRef.current) {
        prevLengthRef.current = currentLength;
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Derive the rank to display from the tick + unlockedRanks
  // Use a ref to track which rank key we've already shown
  const lastShownKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (tick === 0) return;
    const latestKey = unlockedRanks[unlockedRanks.length - 1];
    if (!latestKey || latestKey === lastShownKeyRef.current) return;

    const rank = PARCOURS_RANKS.find((r) => r.key === latestKey);
    if (!rank) return;

    lastShownKeyRef.current = latestKey;

    // Use requestAnimationFrame to make setState asynchronous
    // (not called synchronously in the effect body)
    const frameId = requestAnimationFrame(() => {
      setNewRank(rank);
      setIsVisible(true);

      // Achievement fanfare + haptic burst
      try {
        sound.playAchievement();
        haptics.achievement();
      } catch {
        /* noop — audio not ready */
      }

      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    });

    return () => cancelAnimationFrame(frameId);
  }, [tick, unlockedRanks]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && newRank && (
        <>
          {/* Full-screen dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md"
            onClick={handleDismiss}
          />

          {/* Popup content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-5"
            onClick={handleDismiss}
          >
            <div
              className="relative max-w-[390px] w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full glass-pill flex items-center justify-center"
                aria-label={t("close")}
              >
                <X size={16} className="text-white/50" />
              </button>

              {/* Badge with pulsing aura */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Rotating honor rays (fairy light show) */}
                  <div
                    aria-hidden
                    className="medal-rays"
                    style={{
                      inset: "-34px",
                      ["--medal-glow" as string]: newRank.glow,
                    } as React.CSSProperties}
                  />
                  {/* Outer aura pulse rings */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: newRank.glow }}
                  />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: newRank.glow }}
                  />

                  {/* Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: 0.2,
                    }}
                    className="relative w-28 h-28 rounded-full flex items-center justify-center badge-aura overflow-hidden"
                    style={{
                      background: newRank.gradient,
                      "--aura-color": newRank.glow,
                    } as React.CSSProperties}
                  >
                    <ArtifactIcon artifactKey={newRank.key} size={80} glow={true} />
                    {/* Diagonal shine sweep across the medal */}
                    <div
                      aria-hidden
                      className="medal-shine rounded-full"
                      style={{ ["--shine-delay" as string]: "0.6s" } as React.CSSProperties}
                    />
                  </motion.div>

                  {/* Fairy sparkles orbiting the unlocked rank */}
                  <svg viewBox="0 0 24 24" className="sparkle w-3 h-3" style={{ top: "-14px", left: "-16px", ["--sparkle-color" as string]: "#FFD166" } as React.CSSProperties} aria-hidden>
                    <path d="M12 1 L14.2 9.8 L23 12 L14.2 14.2 L12 23 L9.8 14.2 L1 12 L9.8 9.8 Z" fill="currentColor" />
                  </svg>
                  <svg viewBox="0 0 24 24" className="sparkle w-2.5 h-2.5" style={{ top: "6px", right: "-20px", ["--sparkle-color" as string]: "#FFB020", ["--sparkle-delay" as string]: "0.8s" } as React.CSSProperties} aria-hidden>
                    <path d="M12 1 L14.2 9.8 L23 12 L14.2 14.2 L12 23 L9.8 14.2 L1 12 L9.8 9.8 Z" fill="currentColor" />
                  </svg>
                  <svg viewBox="0 0 24 24" className="sparkle w-2 h-2" style={{ bottom: "-10px", left: "4px", ["--sparkle-color" as string]: "#FFC94D", ["--sparkle-delay" as string]: "1.5s" } as React.CSSProperties} aria-hidden>
                    <path d="M12 1 L14.2 9.8 L23 12 L14.2 14.2 L12 23 L9.8 14.2 L1 12 L9.8 9.8 Z" fill="currentColor" />
                  </svg>
                  <svg viewBox="0 0 24 24" className="sparkle w-2.5 h-2.5" style={{ bottom: "2px", right: "-6px", ["--sparkle-color" as string]: "#FF6B00", ["--sparkle-delay" as string]: "2s" } as React.CSSProperties} aria-hidden>
                    <path d="M12 1 L14.2 9.8 L23 12 L14.2 14.2 L12 23 L9.8 14.2 L1 12 L9.8 9.8 Z" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-extrabold mb-2 font-[family-name:var(--font-poppins)]"
                style={{
                  background: "linear-gradient(135deg, #FF3B30 0%, #F59E0B 50%, #FFD700 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("achievementNewRank")}
              </motion.h2>

              {/* Rank name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3
                  className="text-xl font-bold mb-1 font-[family-name:var(--font-poppins)]"
                  style={{ color: newRank.color }}
                >
                  {t(newRank.nameKey)}
                </h3>
                <p className="text-white/50 text-sm mb-3">
                  {t(newRank.subtitleKey)}
                </p>
                <p className="text-white/70 text-sm leading-relaxed max-w-[300px] mx-auto">
                  {t(newRank.descKey)}
                </p>
              </motion.div>

              {/* Tap to dismiss */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-white/30 text-xs mt-6"
              >
                {t("tapToClose")}
              </motion.p>

              {/* CSS Confetti particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {confettiParticles.map((p) => (
                  <div
                    key={p.id}
                    className="absolute"
                    style={{
                      left: p.left,
                      top: "-12px",
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      backgroundColor: p.color,
                      borderRadius: p.shape === 0 ? "50%" : p.shape === 1 ? "2px" : "0",
                      transform: `rotate(${p.rotation}deg)`,
                      animation: `achievement-confetti-fall ${p.duration} ease-out ${p.delay} forwards`,
                      "--drift": p.drift,
                    } as React.CSSProperties}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Confetti keyframes */}
          <style>{`
            @keyframes achievement-confetti-fall {
              0% {
                transform: translateY(0) translateX(0) rotate(0deg) scale(1);
                opacity: 1;
              }
              100% {
                transform: translateY(600px) translateX(var(--drift, 0px)) rotate(720deg) scale(0.2);
                opacity: 0;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
