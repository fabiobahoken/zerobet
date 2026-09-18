"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  BarChart3,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/lib/i18n/useT";

/**
 * EmptyState — reusable premium empty state with glass morphism styling.
 * Variants: "journal" | "community" | "stats" | "default"
 */

export type EmptyStateVariant = "journal" | "community" | "stats" | "default";

interface VariantConfig {
  icon: LucideIcon;
  emoji: string;
  gradient: string;
  glow: string;
  titleKey: string;
  descKey: string;
  ctaKey?: string;
}

const VARIANT_CONFIG: Record<EmptyStateVariant, VariantConfig> = {
  journal: {
    icon: BookOpen,
    emoji: "📝",
    gradient: "linear-gradient(135deg, #10B981 0%, #2DD4BF 100%)",
    glow: "glow-green",
    titleKey: "emptyStateJournalTitle",
    descKey: "emptyStateJournalDesc",
    ctaKey: "emptyStateJournalCta",
  },
  community: {
    icon: Users,
    emoji: "💬",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    glow: "glow-yellow",
    titleKey: "emptyStateCommunityTitle",
    descKey: "emptyStateCommunityDesc",
    ctaKey: "emptyStateCommunityCta",
  },
  stats: {
    icon: BarChart3,
    emoji: "📊",
    gradient: "linear-gradient(135deg, #10B981 0%, #2DD4BF 100%)",
    glow: "glow-green",
    titleKey: "emptyStateStatsTitle",
    descKey: "emptyStateStatsDesc",
    ctaKey: "emptyStateStatsCta",
  },
  default: {
    icon: Sparkles,
    emoji: "✨",
    gradient: "linear-gradient(135deg, #2DD4BF 0%, #10B981 100%)",
    glow: "glow-green",
    titleKey: "emptyStateDefaultTitle",
    descKey: "emptyStateDefaultDesc",
    ctaKey: "emptyStateDefaultCta",
  },
};

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  /** Override the default title. */
  title?: string;
  /** Override the default description. */
  description?: string;
  /** Show a CTA button with this label (overrides variant default). */
  ctaLabel?: string;
  /** Called when the CTA button is pressed. */
  onCta?: () => void;
  /** Hide the CTA button entirely. */
  hideCta?: boolean;
  /** Extra className for the wrapper. */
  className?: string;
  /** Compact mode (smaller padding, no float animation). */
  compact?: boolean;
}

export function EmptyState({
  variant = "default",
  title,
  description,
  ctaLabel,
  onCta,
  hideCta = false,
  className = "",
  compact = false,
}: EmptyStateProps) {
  const t = useT();
  const cfg = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.default;
  const Icon = cfg.icon;
  const finalTitle = title ?? t(cfg.titleKey);
  const finalDescription = description ?? t(cfg.descKey);
  const finalCta = ctaLabel ?? (cfg.ctaKey ? t(cfg.ctaKey) : undefined);
  const showCta = !hideCta && (finalCta || onCta);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={`flex flex-col items-center justify-center text-center ${
        compact ? "py-8" : "py-16"
      } ${className}`}
      role="status"
      aria-live="polite"
    >
      {/* Gradient icon container */}
      <motion.div
        animate={compact ? undefined : { y: [0, -8, 0] }}
        transition={
          compact
            ? undefined
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
        className={`relative mb-5 ${compact ? "" : cfg.glow}`}
      >
        {/* Outer glow ring */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full blur-2xl opacity-30"
          style={{ background: cfg.gradient }}
        />
        <div
          className="relative w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{
            background: cfg.gradient,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <Icon size={36} className="text-white" strokeWidth={1.8} />
        </div>
        {/* Emoji badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
          className="absolute -bottom-1.5 -right-1.5 w-9 h-9 rounded-full glass-card-strong flex items-center justify-center text-lg border border-white/10"
        >
          {cfg.emoji}
        </motion.div>
      </motion.div>

      <h3 className="text-white font-semibold text-base font-[family-name:var(--font-poppins)] mb-1.5">
        {finalTitle}
      </h3>
      <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xs">
        {finalDescription}
      </p>

      {showCta && (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onCta}
          className="px-6 py-3 rounded-2xl gradient-primary text-white font-medium text-sm glow-green flex items-center gap-2"
        >
          <Icon size={16} />
          {finalCta ?? t("emptyStateDefaultCta")}
        </motion.button>
      )}
    </motion.div>
  );
}
