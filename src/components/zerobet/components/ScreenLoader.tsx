"use client";

import { motion } from "framer-motion";
import { ZerobetLogo } from "@/components/zerobet/components/ZerobetLogo";

/**
 * ScreenLoader
 * ------------
 * Lightweight inline loader shown by `next/dynamic` while a screen chunk is
 * being fetched. Designed to feel premium and on-brand:
 *
 *  - Centered Zerobet logo with a soft red-orange glow halo
 *  - Three breathing rings radiating outward (radial gradients)
 *  - A thin shimmer line beneath the logo
 *
 * Intentionally minimal (no progress bar / no particles) so it stays cheap
 * to mount on every chunk load.
 */
export function ScreenLoader() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-[60vh] py-16"
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative mb-5"
      >
        {/* Breathing halo rings */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,59,48,0.55) 0%, rgba(255,149,0,0.30) 38%, transparent 70%)",
          }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.85, 1.5, 0.85] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,149,0,0.40) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0, 0.4, 0], scale: [1, 1.9, 1] }}
          transition={{
            duration: 3.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
        <div
          className="animate-glow-pulse"
          style={{
            filter:
              "drop-shadow(0 0 18px rgba(255,59,48,0.45)) drop-shadow(0 0 36px rgba(255,149,0,0.25))",
          }}
        >
          <ZerobetLogo size={96} animated />
        </div>
      </motion.div>

      {/* Shimmer line */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="relative h-[3px] w-32 overflow-hidden rounded-full bg-white/10"
        aria-hidden
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #FF3B30 0%, #FF6B35 45%, #FF9500 75%, #FFD700 100%)",
            boxShadow: "0 0 12px rgba(255,107,53,0.6)",
          }}
          animate={{ width: ["0%", "100%"] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <span className="sr-only">Chargement…</span>
    </div>
  );
}

export default ScreenLoader;
