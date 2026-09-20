"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { t } from "@/lib/i18n/dictionary";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { OnboardingProgress } from "@/components/zerobet/components/OnboardingProgress";

/**
 * Elegant Shield + Arrow icon — represents protection, strength, and rising up.
 * Outer ring + radial glow + shield with upward arrow (luxury brand aesthetic).
 */
function MaleIcon({ size = 96 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="gender-icon-float"
    >
      <defs>
        <linearGradient id="male-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFC94D" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>
        <radialGradient id="male-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB020" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFB020" stopOpacity="0" />
        </radialGradient>
        <filter id="male-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FF6B00" floodOpacity="0.5" />
        </filter>
      </defs>
      {/* Glow */}
      <circle cx="60" cy="60" r="55" fill="url(#male-glow)" />
      {/* Outer ring */}
      <circle
        cx="60"
        cy="60"
        r="48"
        stroke="url(#male-grad)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.25"
      />
      {/* Shield shape with upward arrow */}
      <g filter="url(#male-shadow)">
        <path
          d="M60 28 L82 36 L82 60 C82 74 72 84 60 90 C48 84 38 74 38 60 L38 36 Z"
          fill="url(#male-grad)"
          fillOpacity="0.15"
          stroke="url(#male-grad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Upward arrow inside shield */}
        <path
          d="M60 42 L60 72 M50 52 L60 42 L70 52"
          stroke="url(#male-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

/**
 * Elegant Lotus/Flower icon — represents rebirth, beauty, and growth.
 * Outer ring + radial glow + layered lotus petals (luxury brand aesthetic).
 */
function FemaleIcon({ size = 96 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="gender-icon-float"
    >
      <defs>
        <linearGradient id="female-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF375F" />
          <stop offset="100%" stopColor="#FF2D55" />
        </linearGradient>
        <radialGradient id="female-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF375F" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF375F" stopOpacity="0" />
        </radialGradient>
        <filter id="female-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FF2D55" floodOpacity="0.5" />
        </filter>
      </defs>
      {/* Glow */}
      <circle cx="60" cy="60" r="55" fill="url(#female-glow)" />
      {/* Outer ring */}
      <circle
        cx="60"
        cy="60"
        r="48"
        stroke="url(#female-grad)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.25"
      />
      {/* Lotus petals */}
      <g filter="url(#female-shadow)">
        {/* Center petal */}
        <path
          d="M60 30 C55 40 55 55 60 65 C65 55 65 40 60 30 Z"
          fill="url(#female-grad)"
          fillOpacity="0.3"
          stroke="url(#female-grad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Left petal */}
        <path
          d="M42 38 C40 50 44 62 56 68 C50 58 48 46 42 38 Z"
          fill="url(#female-grad)"
          fillOpacity="0.25"
          stroke="url(#female-grad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Right petal */}
        <path
          d="M78 38 C80 50 76 62 64 68 C70 58 72 46 78 38 Z"
          fill="url(#female-grad)"
          fillOpacity="0.25"
          stroke="url(#female-grad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Outer left petal */}
        <path
          d="M30 52 C30 64 38 74 52 76 C42 66 36 58 30 52 Z"
          fill="url(#female-grad)"
          fillOpacity="0.2"
          stroke="url(#female-grad)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Outer right petal */}
        <path
          d="M90 52 C90 64 82 74 68 76 C78 66 84 58 90 52 Z"
          fill="url(#female-grad)"
          fillOpacity="0.2"
          stroke="url(#female-grad)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Center dot */}
        <circle cx="60" cy="62" r="4" fill="url(#female-grad)" />
      </g>
    </svg>
  );
}

export function GenderScreen() {
  const { gender, setGender, navigate, language } = useStore();

  const handleSelect = (g: "male" | "female") => {
    setGender(g);
    sound.playClick();
    haptics.light();
  };

  const handleContinue = () => {
    if (gender) navigate("currency");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-14 pb-8">
      <OnboardingProgress currentStep={2} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2">
          {t(language, "genderTitle")}
        </h1>
        <p className="text-white/60 text-sm">
          {t(language, "genderSubtitle")}
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col justify-center gap-6 max-w-sm mx-auto w-full">
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSelect("male")}
          aria-pressed={gender === "male"}
          aria-label={t(language, "male")}
          className={`relative glass-card p-8 flex flex-col items-center transition-all ${
            gender === "male" ? "ring-2 ring-[#FFB020] glow-blue" : ""
          }`}
        >
          {gender === "male" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#FFB020] flex items-center justify-center"
            >
              <Check size={16} className="text-white" strokeWidth={3} />
            </motion.div>
          )}
          <div
            className="gender-icon-container"
            style={{ ["--icon-color" as string]: "#FFB020" }}
          >
            <MaleIcon size={120} />
          </div>
          <span className="mt-4 text-xl font-semibold text-white">
            {t(language, "male")}
          </span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSelect("female")}
          aria-pressed={gender === "female"}
          aria-label={t(language, "female")}
          className={`relative glass-card p-8 flex flex-col items-center transition-all ${
            gender === "female" ? "ring-2 ring-[#FF375F] glow-red" : ""
          }`}
        >
          {gender === "female" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#FF375F] flex items-center justify-center"
            >
              <Check size={16} className="text-white" strokeWidth={3} />
            </motion.div>
          )}
          <div
            className="gender-icon-container"
            style={{ ["--icon-color" as string]: "#FF375F" }}
          >
            <FemaleIcon size={120} />
          </div>
          <span className="mt-4 text-xl font-semibold text-white">
            {t(language, "female")}
          </span>
        </motion.button>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        disabled={!gender}
        className={`mt-8 mx-auto max-w-sm w-full py-4 rounded-2xl font-[family-name:var(--font-poppins)] font-semibold text-base transition-all ${
          gender
            ? "gradient-primary text-white glow-green"
            : "bg-white/5 text-white/30 cursor-not-allowed"
        }`}
      >
        {t(language, "continue")}
      </motion.button>
    </div>
  );
}
