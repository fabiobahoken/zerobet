"use client";

interface FlagProps {
  code: string; // fr, gb, es, pt, sa, sn, cg
  className?: string;
  size?: number;
}

export function Flag({ code, className = "", size = 32 }: FlagProps) {
  const props = {
    width: size,
    height: Math.round(size * 0.7),
    viewBox: "0 0 60 42",
    className: `rounded-md overflow-hidden border border-white/10 shadow-sm ${className}`,
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (code) {
    case "fr":
      return (
        <svg {...props}>
          <rect width="20" height="42" fill="#0055A4" />
          <rect x="20" width="20" height="42" fill="#fff" />
          <rect x="40" width="20" height="42" fill="#EF4135" />
        </svg>
      );
    case "gb":
      return (
        <svg {...props}>
          <rect width="60" height="42" fill="#012169" />
          <path d="M0 0 L60 42 M60 0 L0 42" stroke="#fff" strokeWidth="6" />
          <path d="M0 0 L60 42 M60 0 L0 42" stroke="#C8102E" strokeWidth="3" />
          <path d="M30 0 V42 M0 21 H60" stroke="#fff" strokeWidth="10" />
          <path d="M30 0 V42 M0 21 H60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      );
    case "es":
      return (
        <svg {...props}>
          <rect width="60" height="42" fill="#AA151B" />
          <rect y="10" width="60" height="22" fill="#F1BF00" />
        </svg>
      );
    case "pt":
      return (
        <svg {...props}>
          <rect width="24" height="42" fill="#046A38" />
          <rect x="24" width="36" height="42" fill="#DA291C" />
          <circle cx="24" cy="21" r="6" fill="#F1BF00" stroke="#046A38" strokeWidth="1" />
          <path d="M22 19 H26 V23 H22 Z" fill="#fff" transform="rotate(45 24 21)" />
        </svg>
      );
    case "sa":
      return (
        <svg {...props}>
          <rect width="60" height="42" fill="#006C35" />
          <text x="30" y="22" fill="#fff" fontSize="6" textAnchor="middle" fontFamily="serif" fontWeight="bold">
            لا إله
          </text>
          <text x="30" y="30" fill="#fff" fontSize="6" textAnchor="middle" fontFamily="serif" fontWeight="bold">
            إلا الله
          </text>
          <path d="M12 36 H48" stroke="#fff" strokeWidth="1.5" />
        </svg>
      );
    case "sn":
      return (
        <svg {...props}>
          <rect width="20" height="42" fill="#00853F" />
          <rect x="20" width="20" height="42" fill="#FDEF42" />
          <rect x="40" width="20" height="42" fill="#E31B23" />
          <path d="M30 14 L31.5 18.5 L36 18.5 L32.5 21.5 L34 26 L30 23 L26 26 L27.5 21.5 L24 18.5 L28.5 18.5 Z" fill="#00853F" />
        </svg>
      );
    case "cg":
      return (
        <svg {...props}>
          <polygon points="0,0 60,0 60,42 0,42" fill="#009543" />
          <polygon points="0,0 60,42 0,42" fill="#FBDE4A" />
          <polygon points="0,0 60,0 60,42" fill="#009543" />
          <polygon points="0,0 60,42 0,42" fill="#FBDE4A" transform="skewX(-30)" />
          <rect width="60" height="42" fill="none" stroke="#DC241F" strokeWidth="6" transform="skewX(-30)" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <rect width="60" height="42" fill="#9CA3AF" />
        </svg>
      );
  }
}
