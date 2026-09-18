"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp, Bug } from "lucide-react";
import { useT } from "@/lib/i18n/useT";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Optional fallback render function. */
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
  /** Called when the user taps "Retour à l'accueil". */
  onGoHome?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
}

/**
 * Inner functional component that renders the error UI. It can use the `useT()`
 * hook (class components can't use hooks), so all visible strings are localized.
 */
function ErrorFallbackUI({
  error,
  showDetails,
  onToggleDetails,
  onRetry,
  onGoHome,
}: {
  error: Error;
  showDetails: boolean;
  onToggleDetails: () => void;
  onRetry: () => void;
  onGoHome: () => void;
}) {
  const t = useT();
  return (
    <div className="app-container relative min-h-screen flex items-center justify-center px-6 py-10">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(255,59,48,0.15) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(255,149,0,0.1) 0%, transparent 50%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative glass-card-strong p-7 max-w-md w-full text-center"
      >
        {/* Glitch error icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.05 }}
          className="w-20 h-20 mx-auto mb-5 rounded-3xl flex items-center justify-center relative"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,59,48,0.22) 0%, rgba(255,149,0,0.18) 100%)",
            border: "1px solid rgba(255,59,48,0.35)",
            boxShadow:
              "0 0 40px rgba(255,59,48,0.35), 0 0 80px rgba(255,59,48,0.15)",
          }}
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <AlertTriangle size={36} className="text-[#FF3B30]" strokeWidth={2.2} />
          </motion.div>
        </motion.div>

        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2">
          {t("errorBoundaryTitle")}
        </h1>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          {t("errorBoundarySubtitle")}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-2.5 mb-5">
          <button
            onClick={onRetry}
            className="w-full py-3.5 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-sm flex items-center justify-center gap-2 glow-green active:scale-[0.98] transition-transform"
          >
            <RefreshCw size={16} />
            {t("errorBoundaryRetry")}
          </button>
          <button
            onClick={onGoHome}
            className="w-full py-3.5 rounded-2xl glass-card text-white/85 font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Home size={16} />
            {t("errorBoundaryHome")}
          </button>
        </div>

        {/* Collapsible error details (for debugging) */}
        <button
          onClick={onToggleDetails}
          className="w-full flex items-center justify-center gap-1.5 text-white/40 text-xs hover:text-white/60 transition-colors py-1"
          aria-expanded={showDetails}
        >
          <Bug size={12} />
          {showDetails
            ? t("errorBoundaryHide")
            : t("errorBoundaryShow")}
          {showDetails ? (
            <ChevronUp size={12} />
          ) : (
            <ChevronDown size={12} />
          )}
        </button>

        <AnimatePresence initial={false}>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-3 rounded-xl bg-black/40 border border-white/5 text-left">
                <div className="text-[10px] uppercase tracking-wider text-[#FF9500] font-bold mb-1">
                  {error.name || t("errorBoundaryErrorLabel")}
                </div>
                <p className="text-white/70 text-[11px] font-mono break-words leading-relaxed mb-2">
                  {error.message || "Unknown error"}
                </p>
                {error.stack && (
                  <pre className="text-white/40 text-[9px] font-mono whitespace-pre-wrap break-words max-h-40 overflow-y-auto custom-scroll leading-relaxed">
                    {error.stack}
                  </pre>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-white/30 text-[10px] mt-4 italic">
          {t("errorBoundaryQuote")}
        </p>
      </motion.div>
    </div>
  );
}

/**
 * Premium error boundary that catches JS errors in any child component
 * and renders a beautiful glassmorphism fallback UI.
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console for debugging (no external telemetry in this sandbox).
    console.error("[ErrorBoundary] Caught error:", error, info.componentStack);
  }

  reset = () => {
    this.setState({ hasError: false, error: null, showDetails: false });
  };

  goHome = () => {
    this.reset();
    // Use store-independent navigation: direct window history / hash reset.
    if (typeof window !== "undefined") {
      // Reset persisted store + reload to dashboard.
      try {
        localStorage.removeItem("zerobet-store");
      } catch {
        /* no-op */
      }
      window.location.href = window.location.pathname;
    }
    this.props.onGoHome?.();
  };

  toggleDetails = () => {
    this.setState((s) => ({ showDetails: !s.showDetails }));
  };

  render() {
    const { hasError, error, showDetails } = this.state;
    const { fallback, children } = this.props;

    if (!hasError) return <>{children}</>;

    if (fallback && error) {
      return <>{fallback(error, this.reset)}</>;
    }

    if (!error) {
      // Defensive: hasError is true but no error captured — render nothing.
      return <>{children}</>;
    }

    return (
      <ErrorFallbackUI
        error={error}
        showDetails={showDetails}
        onToggleDetails={this.toggleDetails}
        onRetry={this.reset}
        onGoHome={this.goHome}
      />
    );
  }
}
