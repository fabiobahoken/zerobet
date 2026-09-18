"use client";

/**
 * LegalLayout — shared chrome for /privacy, /terms, /support pages.
 *
 * Renders a centered column (max-width ~3xl) with a sticky back-button header,
 * a hero title block, and prose content. Reuses the same dark premium theme
 * as the main app (glass cards, gradient accents, Poppins/Inter typography).
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Shield } from "lucide-react";
import { ZerobetLogo } from "@/components/zerobet/components/ZerobetLogo";
import { useT } from "@/lib/i18n/useT";

interface LegalLayoutProps {
  /** Hero icon color (hex). */
  accent: string;
  /** Translation key for the page title (e.g. "privacyTitle"). */
  titleKey: string;
  /** Translation key for the page subtitle / last-updated line. */
  subtitleKey: string;
  /** Translation key for the hero badge (e.g. "Privacy"). */
  badgeKey: string;
  children: React.ReactNode;
}

export function LegalLayout({
  accent,
  titleKey,
  subtitleKey,
  badgeKey,
  children,
}: LegalLayoutProps) {
  const t = useT();
  return (
    <main className="min-h-screen px-5 pt-10 pb-16 max-w-3xl mx-auto">
      {/* Top nav */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass-card text-white/80 text-sm hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>{t("legalBackToApp")}</span>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-[11px] font-bold uppercase tracking-wider" style={{ color: accent }}>
          <Shield size={12} />
          <span>{t(badgeKey)}</span>
        </div>
      </div>

      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl mb-6 p-6 border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${accent}22 0%, rgba(11, 19, 43, 0.4) 100%)`,
        }}
      >
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none"
          style={{ background: `${accent}33` }}
          aria-hidden
        />
        <div className="relative flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}25`, border: `1px solid ${accent}40` }}
          >
            <ZerobetLogo size={36} animated={false} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight leading-tight">
              {t(titleKey)}
            </h1>
            <p className="text-white/55 text-xs mt-1.5">{t(subtitleKey)}</p>
          </div>
        </div>
      </motion.header>

      {/* Body */}
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card-strong rounded-3xl p-6 sm:p-8 space-y-6 legal-prose"
      >
        {children}
      </motion.article>

      {/* Footer back-link */}
      <p className="text-center text-white/40 text-xs mt-8">
        {t("legalZerobetFooter")} ·{" "}
        <Link href="/" className="text-white/70 hover:text-white underline underline-offset-2">
          {t("legalBackToApp")}
        </Link>
      </p>
    </main>
  );
}

/**
 * Section — a titled block of legal content.
 */
export function LegalSection({
  titleKey,
  children,
}: {
  titleKey: string;
  children: React.ReactNode;
}) {
  const t = useT();
  return (
    <section>
      <h2 className="text-base sm:text-lg font-bold text-white font-[family-name:var(--font-poppins)] mb-2">
        {t(titleKey)}
      </h2>
      <div className="text-white/70 text-sm leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

export default LegalLayout;
