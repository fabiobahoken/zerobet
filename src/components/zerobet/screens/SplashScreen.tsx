"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PremiumLoader } from "@/components/zerobet/components/PremiumLoader";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";

export function SplashScreen() {
  const {
    navigate,
    hasStartedOnboarding,
    hasCompletedOnboarding,
    setStartedOnboarding,
  } = useStore();
  const t = useT();
  const [loaderVisible, setLoaderVisible] = useState(true);

  const handleComplete = () => {
    setLoaderVisible(false);
    if (hasCompletedOnboarding) {
      navigate("dashboard");
    } else if (hasStartedOnboarding) {
      navigate("welcome");
    } else {
      setStartedOnboarding(true);
      navigate("language");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden splash-cinematic-root">
      {/* Cinematic gradient mesh background — 3 layered radial gradients
          that drift slowly to feel alive but never distracting */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 -z-20 splash-mesh-bg"
      />

      {/* Secondary slow-moving aurora band */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 80%, rgba(192, 132, 252,0.18) 0%, transparent 55%), radial-gradient(ellipse at 70% 20%, rgba(74,222,128,0.10) 0%, transparent 50%)",
        }}
      />

      {/* Vignette so the logo pops */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 splash-vignette"
      />

      {/* Cinematic letterbox bars (subtle) */}
      <motion.div
        aria-hidden
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[6vh] bg-[#070B0E] z-30 pointer-events-none splash-letterbox-top"
      />
      <motion.div
        aria-hidden
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-[6vh] bg-[#070B0E] z-30 pointer-events-none splash-letterbox-bottom"
      />

      <PremiumLoader
        show={loaderVisible}
        fullscreen={false}
        duration={1800}
        subtitle={t("splashSubtitle")}
        onComplete={handleComplete}
      />

      <style>{`
        .splash-cinematic-root {
          background: #070B0E;
        }
        .splash-mesh-bg {
          background:
            radial-gradient(ellipse at 22% 18%, rgba(255,59,48,0.22) 0%, transparent 45%),
            radial-gradient(ellipse at 78% 28%, rgba(192, 132, 252,0.22) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 85%, rgba(245, 158, 11,0.22) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 75%, rgba(45, 212, 191,0.16) 0%, transparent 50%);
          background-size: 220% 220%, 220% 220%, 220% 220%, 220% 220%;
          animation: splash-mesh-shift 16s ease-in-out infinite;
        }
        @keyframes splash-mesh-shift {
          0%, 100% { background-position: 0% 0%, 100% 0%, 50% 100%, 100% 100%; }
          50% { background-position: 35% 35%, 65% 35%, 35% 65%, 65% 65%; }
        }
        .splash-vignette {
          background: radial-gradient(ellipse at center, transparent 30%, rgba(10,10,15,0.55) 75%, rgba(10,10,15,0.85) 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .splash-mesh-bg {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
