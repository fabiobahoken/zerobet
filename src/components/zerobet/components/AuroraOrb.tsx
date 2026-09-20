"use client";

/**
 * AuroraOrb — Zerobet 3.0 signature centerpiece (QUITTR-style).
 *
 * A pure-CSS iridescent sphere: a swirling conic gradient marble with
 * counter-rotating color pools, a glass rim and a specular highlight.
 * Fully HD at any size (vector-like CSS, no bitmap), animates slowly
 * like a living aurora. Purely decorative.
 */
export function AuroraOrb({
  size = 180,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Ambient outer glow */}
      <div className="orb-glow absolute -inset-7 rounded-full" />

      {/* The sphere body */}
      <div
        className="orb-sphere absolute inset-0 overflow-hidden rounded-full"
        style={{ width: size, height: size }}
      >
        {/* Swirling conic base */}
        <div className="orb-sphere-spin absolute inset-0" />
        {/* Counter-rotating color pools */}
        <div className="orb-sphere-pool1 absolute inset-0" />
        <div className="orb-sphere-pool2 absolute inset-0" />
        <div className="orb-sphere-pool3 absolute inset-0" />
      </div>

      {/* Glass rim + specular highlight */}
      <div className="orb-rim absolute inset-0 rounded-full" />
    </div>
  );
}
