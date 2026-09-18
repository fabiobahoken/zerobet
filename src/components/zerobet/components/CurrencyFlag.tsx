"use client";

import type { CurrencyCode } from "@/lib/data/currency-data";

/**
 * CurrencyFlag — renders a beautiful SVG country flag for a given currency.
 *
 * Each of the 13 supported currencies is mapped to its representative
 * country's flag (XOF → Côte d'Ivoire, USD → USA, EUR → France, etc.).
 * The SVGs are simplified, stylized renditions of the official flags —
 * they keep the canonical colors, geometry and key visual symbols while
 * staying lightweight (no external image assets, no network requests).
 *
 * Standalone component (does not depend on Flag.tsx) — Task 17-a.
 */

export interface CurrencyFlagProps {
  currencyCode: CurrencyCode;
  /** Pixel width of the rendered flag (height is 70% of width). Default 32. */
  size?: number;
  className?: string;
}

/** Map each currency to the ISO 3166-1 alpha-2 country code used for its flag. */
const CURRENCY_TO_COUNTRY: Record<CurrencyCode, string> = {
  XOF: "ci",
  USD: "us",
  EUR: "fr",
  GBP: "gb",
  NGN: "ng",
  GHS: "gh",
  ZAR: "za",
  MAD: "ma",
  TND: "tn",
  BRL: "br",
  INR: "in",
  CNY: "cn",
  JPY: "jp",
};

function FlagSVG({
  code,
  width,
  height,
  className,
}: {
  code: string;
  width: number;
  height: number;
  className?: string;
}) {
  const common = {
    width,
    height,
    viewBox: "0 0 60 42",
    className: `block overflow-hidden rounded-md border border-white/15 shadow-sm ${className ?? ""}`,
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  } as const;

  switch (code) {
    case "ci":
      // Côte d'Ivoire — orange / white / green vertical stripes
      return (
        <svg {...common}>
          <rect width="20" height="42" fill="#FF8200" />
          <rect x="20" width="20" height="42" fill="#FFFFFF" />
          <rect x="40" width="20" height="42" fill="#009E60" />
        </svg>
      );
    case "us":
      // USA — 13 stripes + blue canton with stylized star grid
      return (
        <svg {...common}>
          <rect width="60" height="42" fill="#FFFFFF" />
          {/* 7 red stripes at y = 0,6,12,18,24,30,36 */}
          <rect y="0" width="60" height="3" fill="#B22234" />
          <rect y="6" width="60" height="3" fill="#B22234" />
          <rect y="12" width="60" height="3" fill="#B22234" />
          <rect y="18" width="60" height="3" fill="#B22234" />
          <rect y="24" width="60" height="3" fill="#B22234" />
          <rect y="30" width="60" height="3" fill="#B22234" />
          <rect y="36" width="60" height="3" fill="#B22234" />
          {/* Canton */}
          <rect width="24" height="21" fill="#3C3B6E" />
          {/* Simplified star grid (5 rows × 6 cols of small white dots) */}
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={2 + col * 3.6 + (row % 2 === 1 ? 1.8 : 0)}
                cy={2.5 + row * 4}
                r={0.6}
                fill="#FFFFFF"
              />
            ))
          )}
        </svg>
      );
    case "fr":
      // France — blue / white / red vertical stripes
      return (
        <svg {...common}>
          <rect width="20" height="42" fill="#0055A4" />
          <rect x="20" width="20" height="42" fill="#FFFFFF" />
          <rect x="40" width="20" height="42" fill="#EF4135" />
        </svg>
      );
    case "gb":
      // United Kingdom — Union Jack
      return (
        <svg {...common}>
          <rect width="60" height="42" fill="#012169" />
          <path d="M0 0 L60 42 M60 0 L0 42" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M0 0 L60 42 M60 0 L0 42" stroke="#C8102E" strokeWidth="3" />
          <path d="M30 0 V42 M0 21 H60" stroke="#FFFFFF" strokeWidth="10" />
          <path d="M30 0 V42 M0 21 H60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      );
    case "ng":
      // Nigeria — green / white / green vertical stripes
      return (
        <svg {...common}>
          <rect width="20" height="42" fill="#008751" />
          <rect x="20" width="20" height="42" fill="#FFFFFF" />
          <rect x="40" width="20" height="42" fill="#008751" />
        </svg>
      );
    case "gh":
      // Ghana — red / yellow / green horizontal bands + black star
      return (
        <svg {...common}>
          <rect width="60" height="14" fill="#CE1126" />
          <rect y="14" width="60" height="14" fill="#FCD116" />
          <rect y="28" width="60" height="14" fill="#006B3F" />
          <path
            d="M30 16.5 L31.3 20.3 L35.3 20.3 L32.1 22.6 L33.3 26.4 L30 24.1 L26.7 26.4 L27.9 22.6 L24.7 20.3 L28.7 20.3 Z"
            fill="#000000"
          />
        </svg>
      );
    case "za":
      // South Africa — red top / blue bottom / black hoist triangle / green Y with white & yellow bands
      return (
        <svg {...common}>
          {/* Top red half */}
          <rect width="60" height="21" fill="#DE3831" />
          {/* Bottom blue half */}
          <rect y="21" width="60" height="21" fill="#002395" />
          {/* Black triangle from hoist */}
          <polygon points="0,0 0,42 22,21" fill="#000000" />
          {/* White outer Y bands (top & bottom) */}
          <polygon points="22,21 60,3 60,8" fill="#FFFFFF" />
          <polygon points="22,21 60,34 60,39" fill="#FFFFFF" />
          {/* Yellow inner Y bands */}
          <polygon points="22,21 60,8 60,10.5" fill="#FFB612" />
          <polygon points="22,21 60,31.5 60,34" fill="#FFB612" />
          {/* Green center Y band */}
          <polygon points="22,21 60,10.5 60,31.5" fill="#00A651" />
        </svg>
      );
    case "ma":
      // Morocco — red field with green pentagram star
      return (
        <svg {...common}>
          <rect width="60" height="42" fill="#C1272D" />
          {/* Stylized 5-pointed star (pentagram outline drawn as filled star) */}
          <path
            d="M30 12 L32.6 19.4 L40.4 19.4 L34.1 24 L36.5 31.5 L30 26.9 L23.5 31.5 L25.9 24 L19.6 19.4 L27.4 19.4 Z"
            fill="none"
            stroke="#006233"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tn":
      // Tunisia — red field with white disc + red crescent & 5-point star
      return (
        <svg {...common}>
          <rect width="60" height="42" fill="#E70013" />
          <circle cx="30" cy="21" r="8" fill="#FFFFFF" />
          {/* Red crescent: draw a red circle slightly offset right, clipped to white disc */}
          <circle cx="31.5" cy="21" r="6.2" fill="#E70013" />
          {/* Red 5-point star inside the crescent opening */}
          <path
            d="M27.5 21 L28.1 22.6 L29.8 22.6 L28.4 23.6 L29 25.2 L27.5 24.2 L26 25.2 L26.6 23.6 L25.2 22.6 L26.9 22.6 Z"
            fill="#E70013"
          />
        </svg>
      );
    case "br":
      // Brazil — green field, yellow diamond, blue circle with white band + stars
      return (
        <svg {...common}>
          <rect width="60" height="42" fill="#009C3B" />
          <polygon points="30,5 55,21 30,37 5,21" fill="#FFDF00" />
          <circle cx="30" cy="21" r="8" fill="#002776" />
          {/* Stylized white band across circle */}
          <path
            d="M22 22 Q30 16 38 22"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            fill="none"
          />
          {/* Star dots inside the blue circle */}
          <circle cx="26" cy="19" r="0.5" fill="#FFFFFF" />
          <circle cx="30" cy="18" r="0.5" fill="#FFFFFF" />
          <circle cx="34" cy="20" r="0.5" fill="#FFFFFF" />
          <circle cx="28" cy="23" r="0.5" fill="#FFFFFF" />
          <circle cx="32" cy="24" r="0.5" fill="#FFFFFF" />
        </svg>
      );
    case "in":
      // India — saffron / white / green horizontal bands + blue Ashoka chakra
      return (
        <svg {...common}>
          <rect width="60" height="14" fill="#FF9933" />
          <rect y="14" width="60" height="14" fill="#FFFFFF" />
          <rect y="28" width="60" height="14" fill="#138808" />
          {/* Ashoka chakra (simplified as navy ring + 12 spokes) */}
          <g transform="translate(30 21)" stroke="#000080" strokeWidth="0.6" fill="none">
            <circle r="5" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={0}
                  y1={0}
                  x2={Math.cos(angle) * 5}
                  y2={Math.sin(angle) * 5}
                />
              );
            })}
            <circle r="0.6" fill="#000080" stroke="none" />
          </g>
        </svg>
      );
    case "cn":
      // China — red field with one large star + 4 small stars (gold)
      return (
        <svg {...common}>
          <rect width="60" height="42" fill="#DE2910" />
          {/* Big star (top-left of canton) */}
          <g transform="translate(12 12)" fill="#FFDE00">
            <path d="M0 -6 L1.76 -1.85 L6 -1.85 L2.6 0.7 L3.9 4.85 L0 2.4 L-3.9 4.85 L-2.6 0.7 L-6 -1.85 L-1.76 -1.85 Z" />
          </g>
          {/* Four smaller stars rotated toward the big star */}
          <g fill="#FFDE00">
            <g transform="translate(24 6) rotate(-25)">
              <path d="M0 -2 L0.59 -0.62 L2 -0.62 L0.87 0.24 L1.3 1.62 L0 0.8 L-1.3 1.62 L-0.87 0.24 L-2 -0.62 L-0.59 -0.62 Z" />
            </g>
            <g transform="translate(28 11) rotate(-10)">
              <path d="M0 -2 L0.59 -0.62 L2 -0.62 L0.87 0.24 L1.3 1.62 L0 0.8 L-1.3 1.62 L-0.87 0.24 L-2 -0.62 L-0.59 -0.62 Z" />
            </g>
            <g transform="translate(28 17) rotate(15)">
              <path d="M0 -2 L0.59 -0.62 L2 -0.62 L0.87 0.24 L1.3 1.62 L0 0.8 L-1.3 1.62 L-0.87 0.24 L-2 -0.62 L-0.59 -0.62 Z" />
            </g>
            <g transform="translate(24 22) rotate(35)">
              <path d="M0 -2 L0.59 -0.62 L2 -0.62 L0.87 0.24 L1.3 1.62 L0 0.8 L-1.3 1.62 L-0.87 0.24 L-2 -0.62 L-0.59 -0.62 Z" />
            </g>
          </g>
        </svg>
      );
    case "jp":
      // Japan — white field with red disc
      return (
        <svg {...common}>
          <rect width="60" height="42" fill="#FFFFFF" />
          <circle cx="30" cy="21" r="8" fill="#BC002D" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect width="60" height="42" fill="#9CA3AF" />
        </svg>
      );
  }
}

export function CurrencyFlag({ currencyCode, size = 32, className }: CurrencyFlagProps) {
  const countryCode = CURRENCY_TO_COUNTRY[currencyCode] ?? "ci";
  const height = Math.round(size * 0.7);
  return (
    <FlagSVG code={countryCode} width={size} height={height} className={className} />
  );
}

export default CurrencyFlag;
