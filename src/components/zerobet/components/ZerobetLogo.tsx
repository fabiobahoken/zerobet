"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function ZerobetLogo({ size = 80, animated = true, className = "" }: LogoProps) {
  const MotionGroup = motion.g;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="zb-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#14C9A8" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
        <linearGradient id="zb-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#065F46" />
        </linearGradient>
        <linearGradient id="zb-shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="zb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <filter id="zb-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feOffset dx="0" dy="2" result="offset" />
          <feFlood floodColor="#10B981" floodOpacity="0.5" />
          <feComposite in2="offset" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="zb-shield-clip">
          <path d="M60 18 L92 28 V58 C92 78 78 92 60 100 C42 92 28 78 28 58 V28 Z" />
        </clipPath>
      </defs>

      {/* Outer glow — subtle breathing pulse for premium feel */}
      <motion.circle
        cx="60"
        cy="60"
        r="55"
        fill="url(#zb-glow)"
        animate={animated ? { opacity: [0.55, 0.85, 0.55], scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "60px 60px" }}
      />

      {/* Shield */}
      <MotionGroup
        initial={animated ? { scale: 0, rotate: -30 } : false}
        animate={animated ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.1 }}
        filter="url(#zb-shadow)"
      >
        <path
          d="M60 18 L92 28 V58 C92 78 78 92 60 100 C42 92 28 78 28 58 V28 Z"
          fill="url(#zb-shield-grad)"
          stroke="#FBBF24"
          strokeWidth="2"
        />
        <path
          d="M60 24 L86 32 V58 C86 74 74 86 60 93 C46 86 34 74 34 58 V32 Z"
          fill="rgba(11, 19, 43, 0.4)"
        />
        {/* Shine sweep — luxury light sweep across the shield */}
        <motion.g
          clipPath="url(#zb-shield-clip)"
          initial={animated ? { x: -100 } : false}
          animate={animated ? { x: 220 } : {}}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: "easeInOut",
            delay: 1.4,
          }}
        >
          <rect x="0" y="10" width="40" height="100" fill="url(#zb-shine)" />
        </motion.g>
      </MotionGroup>

      {/* Broken chains (left and right of shield) */}
      <MotionGroup
        initial={animated ? { opacity: 0, x: -10 } : false}
        animate={animated ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {/* Left chain link - broken */}
        <path
          d="M18 50 C16 46 18 42 22 42 L26 42 L26 48 L24 48 L24 50 L18 50 Z"
          fill="#FBBF24"
          opacity="0.8"
        />
        <rect x="14" y="54" width="6" height="3" rx="1" fill="#FBBF24" opacity="0.6" />
        {/* Right chain link - broken */}
        <path
          d="M102 50 C104 46 102 42 98 42 L94 42 L94 48 L96 48 L96 50 L102 50 Z"
          fill="#FBBF24"
          opacity="0.8"
        />
        <rect x="100" y="54" width="6" height="3" rx="1" fill="#FBBF24" opacity="0.6" />
      </MotionGroup>

      {/* Z letter */}
      <MotionGroup
        initial={animated ? { opacity: 0, scale: 0.5 } : false}
        animate={animated ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 10 }}
      >
        <path
          d="M48 42 H72 V48 L56 72 H72 V78 H48 V72 L64 48 H48 Z"
          fill="white"
          stroke="white"
          strokeWidth="1"
        />
      </MotionGroup>

      {/* Sparkle stars — gentle twinkle for premium feel */}
      <MotionGroup
        initial={animated ? { opacity: 0, scale: 0 } : false}
        animate={animated ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <motion.path
          d="M88 30 L90 34 L94 36 L90 38 L88 42 L86 38 L82 36 L86 34 Z"
          fill="#FBBF24"
          animate={animated ? { opacity: [1, 0.3, 1], scale: [1, 0.85, 1] } : {}}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          style={{ transformOrigin: "88px 36px" }}
        />
        <motion.path
          d="M30 78 L31 80 L33 81 L31 82 L30 84 L29 82 L27 81 L29 80 Z"
          fill="#FBBF24"
          animate={animated ? { opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] } : {}}
          transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          style={{ transformOrigin: "30px 81px" }}
        />
      </MotionGroup>
    </svg>
  );
}
