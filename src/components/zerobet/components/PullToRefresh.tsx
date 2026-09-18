"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, ArrowDown } from "lucide-react";
import { useT } from "@/lib/i18n/useT";

/**
 * PullToRefresh — wraps scrollable content and detects pull-down gestures.
 *
 * On touch devices: when the user pulls down past the threshold while at
 * the top of the scrollable area, we trigger `onRefresh`.
 *
 * On desktop (no touch events), we show a small refresh button at the top
 * of the content instead.
 *
 * Behavior:
 *   - Threshold default: 70px
 *   - Resistance applied so the indicator lags behind the finger (feels premium).
 *   - While refreshing, shows a spinner; caller controls duration via the
 *     `isRefreshing` prop (or auto-releases after `onRefresh` resolves).
 */

export interface PullToRefreshProps {
  onRefresh: () => void | Promise<void>;
  /** Whether refresh is currently in progress (controlled mode). */
  isRefreshing?: boolean;
  /** Pull distance (px) needed to trigger a refresh. */
  threshold?: number;
  /** Hide the desktop refresh button (touch-only mode). */
  hideDesktopButton?: boolean;
  /** Optional className for the outer wrapper. */
  className?: string;
  /** Optional accessible label for the refresh button. */
  refreshLabel?: string;
  children: React.ReactNode;
}

const TOUCH_SUPPORTED =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export function PullToRefresh({
  onRefresh,
  isRefreshing = false,
  threshold = 70,
  hideDesktopButton = false,
  className = "",
  refreshLabel,
  children,
}: PullToRefreshProps) {
  const t = useT();
  const label = refreshLabel || t("refresh");
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [internalRefreshing, setInternalRefreshing] = useState(false);

  const refreshing = isRefreshing || internalRefreshing;

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (refreshing) return;
      const el = containerRef.current;
      if (!el) return;
      // Only start pull if content is scrolled to top
      if (el.scrollTop > 0) {
        startYRef.current = null;
        return;
      }
      startYRef.current = e.touches[0].clientY;
    },
    [refreshing]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (startYRef.current === null) return;
      const el = containerRef.current;
      if (!el) return;
      // If user has scrolled down, abandon pull
      if (el.scrollTop > 0) {
        startYRef.current = null;
        setPullDistance(0);
        return;
      }
      const dy = e.touches[0].clientY - startYRef.current;
      if (dy <= 0) {
        setPullDistance(0);
        return;
      }
      // Apply resistance (1/2) for a premium feel
      const resisted = dy * 0.5;
      // Cap at threshold * 1.6
      const capped = Math.min(resisted, threshold * 1.6);
      setPullDistance(capped);
      // Prevent default scroll only when actually pulling (avoids blocking horizontal scroll)
      if (capped > 4 && e.cancelable) {
        e.preventDefault();
      }
    },
    [threshold]
  );

  const handleTouchEnd = useCallback(async () => {
    if (startYRef.current === null) {
      setPullDistance(0);
      return;
    }
    startYRef.current = null;
    if (pullDistance >= threshold) {
      setPullDistance(threshold);
      setInternalRefreshing(true);
      try {
        await Promise.resolve(onRefresh());
      } finally {
        // Brief delay so the spinner is visible even for instant resolves
        setTimeout(() => {
          setInternalRefreshing(false);
          setPullDistance(0);
        }, 600);
      }
    } else {
      setPullDistance(0);
    }
  }, [pullDistance, threshold, onRefresh]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      startYRef.current = null;
    };
  }, []);

  const progress = Math.min(1, pullDistance / threshold);
  const shouldRelease = pullDistance >= threshold;

  const handleManualRefresh = useCallback(async () => {
    setInternalRefreshing(true);
    try {
      await Promise.resolve(onRefresh());
    } finally {
      setTimeout(() => setInternalRefreshing(false), 600);
    }
  }, [onRefresh]);

  // Render
  return (
    <div className={`relative ${className}`}>
      {/* Pull indicator (touch only) */}
      {TOUCH_SUPPORTED && (
        <div
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center pointer-events-none"
          style={{
            height: Math.max(pullDistance, refreshing ? threshold : 0),
            transition: pullDistance === 0 ? "height 0.3s ease" : "none",
            overflow: "hidden",
          }}
          aria-hidden
        >
          <motion.div
            animate={{
              rotate: refreshing ? 360 : progress * 360,
              scale: refreshing ? 1 : 0.6 + progress * 0.4,
            }}
            transition={{
              rotate: refreshing
                ? { duration: 1, repeat: Infinity, ease: "linear" }
                : { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: shouldRelease || refreshing
                ? "linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)"
                : "rgba(255,255,255,0.08)",
              boxShadow:
                shouldRelease || refreshing
                  ? "0 0 24px rgba(255,149,0,0.5)"
                  : "none",
            }}
          >
            {refreshing ? (
              <RefreshCw size={16} className="text-white" />
            ) : (
              <ArrowDown
                size={16}
                className={shouldRelease ? "text-white" : "text-white/50"}
              />
            )}
          </motion.div>
        </div>
      )}

      {/* Desktop refresh button */}
      {!TOUCH_SUPPORTED && !hideDesktopButton && (
        <div className="flex justify-end mb-2">
          <button
            onClick={handleManualRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-white/70 text-xs font-medium active:scale-95 transition-transform disabled:opacity-50"
            aria-label={label}
          >
            <motion.span
              animate={{ rotate: refreshing ? 360 : 0 }}
              transition={refreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
            >
              <RefreshCw size={12} />
            </motion.span>
            {refreshing ? t("refreshing") : label}
          </button>
        </div>
      )}

      {/* Refreshing overlay for desktop */}
      {!TOUCH_SUPPORTED && (
        <AnimatePresence>
          {refreshing && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center justify-center gap-2 py-2 mb-2 glass-card rounded-2xl"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw size={14} className="text-[#FF9500]" />
              </motion.span>
              <span className="text-white/60 text-xs font-medium">
                {t("refreshingData")}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Scrollable content */}
      <div
        ref={containerRef}
        onTouchStart={TOUCH_SUPPORTED ? handleTouchStart : undefined}
        onTouchMove={TOUCH_SUPPORTED ? handleTouchMove : undefined}
        onTouchEnd={TOUCH_SUPPORTED ? handleTouchEnd : undefined}
        className="relative"
        style={{
          transform:
            pullDistance > 0 && !refreshing
              ? `translateY(${pullDistance}px)`
              : undefined,
          transition: pullDistance === 0 ? "transform 0.3s ease" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
