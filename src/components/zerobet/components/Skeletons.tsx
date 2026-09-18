"use client";

import { motion } from "framer-motion";

/**
 * Reusable skeleton components that match the shape of real content.
 * Use the existing `.shimmer` utility from globals.css for the gliding highlight.
 * All skeletons use a dark glass base so they blend with the premium theme.
 */

interface SkeletonProps {
  className?: string;
}

function ShimmerBlock({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white/5 ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 shimmer" />
    </div>
  );
}

/**
 * CardSkeleton — generic glass card with shimmer lines.
 * Useful for testimonials, articles, plan cards, etc.
 */
export function CardSkeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="flex items-start gap-3 mb-3">
        <ShimmerBlock className="w-11 h-11 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <ShimmerBlock className="h-3.5 w-2/3" />
          <ShimmerBlock className="h-2.5 w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <ShimmerBlock className="h-2.5 w-full" />
        <ShimmerBlock className="h-2.5 w-11/12" />
        <ShimmerBlock className="h-2.5 w-3/4" />
      </div>
      <div className="flex gap-2">
        <ShimmerBlock className="h-6 w-16 rounded-full" />
        <ShimmerBlock className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

/**
 * ChartSkeleton — placeholder for charts (area, bar, pie).
 * Includes axis hints and a fake line shape.
 */
export function ChartSkeleton({ height = 200, className = "" }: SkeletonProps & { height?: number }) {
  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShimmerBlock className="w-7 h-7 rounded-lg" />
          <ShimmerBlock className="h-3 w-24" />
        </div>
        <ShimmerBlock className="h-2 w-12 rounded-full" />
      </div>
      <div className="relative w-full" style={{ height }}>
        {/* Y axis hints */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between pr-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <ShimmerBlock key={i} className="w-4 h-1.5" />
          ))}
        </div>
        {/* Chart shape — wave bars */}
        <div className="absolute left-7 right-0 top-2 bottom-2 flex items-end gap-1.5">
          {[40, 65, 30, 80, 55, 95, 45, 70, 35, 85, 50, 75, 60, 90].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{
                duration: 0.6,
                delay: i * 0.04,
                ease: "easeOut",
              }}
              className="flex-1 relative overflow-hidden rounded-t-md bg-white/5"
              style={{ minHeight: 6 }}
            >
              <div className="absolute inset-0 shimmer" />
            </motion.div>
          ))}
        </div>
      </div>
      {/* X axis hints */}
      <div className="flex justify-between mt-2 pl-7">
        {Array.from({ length: 6 }).map((_, i) => (
          <ShimmerBlock key={i} className="w-6 h-1.5" />
        ))}
      </div>
    </div>
  );
}

/**
 * ListSkeleton — list of skeleton rows for community lists, etc.
 */
export function ListSkeleton({
  count = 4,
  className = "",
}: SkeletonProps & { count?: number }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <CardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * MessageSkeleton — chat message bubble skeleton (assistant side).
 * Useful for AI Coach (Atlas) while waiting for a response.
 */
export function MessageSkeleton({ className = "" }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2 justify-start items-end ${className}`}
    >
      <ShimmerBlock className="w-7 h-7 rounded-full flex-shrink-0" />
      <div className="glass-card px-3.5 py-2.5 rounded-2xl rounded-bl-md max-w-[80%]">
        <div className="flex items-center gap-2 mb-2">
          <ShimmerBlock className="h-2.5 w-20" />
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                className="w-1 h-1 rounded-full bg-[#FF9500]"
              />
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <ShimmerBlock className="h-2.5 w-44" />
          <ShimmerBlock className="h-2.5 w-36" />
          <ShimmerBlock className="h-2.5 w-28" />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * StatsCardSkeleton — stat card skeleton (icon + value + label).
 * Matches the 2x2 overview grid layout on StatsScreen.
 */
export function StatsCardSkeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`glass-card-strong p-4 relative overflow-hidden ${className}`}>
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 blur-2xl bg-white"
        aria-hidden
      />
      <div className="relative">
        <ShimmerBlock className="w-9 h-9 rounded-xl mb-2" />
        <ShimmerBlock className="h-7 w-16 mb-1.5" />
        <ShimmerBlock className="h-2 w-12 mb-2" />
        <ShimmerBlock className="h-2.5 w-20" />
      </div>
    </div>
  );
}

/**
 * Convenience grid of StatsCardSkeletons for the StatsScreen overview.
 */
export function StatsCardGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </div>
  );
}
