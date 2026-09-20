import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { SoundInit } from "@/components/zerobet/components/SoundInit";
import { PWARegister } from "@/components/zerobet/components/PWARegister";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zerobet — Reprends le contrôle de ta vie",
  description: "L'application premium pour se libérer de l'addiction aux paris sportifs. Conçue pour l'Afrique francophone.",
  keywords: ["Zerobet", "addiction paris", "récupération", "jeu responsable", "Afrique", "sevrage"],
  authors: [{ name: "Zerobet Team" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo-zb.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-zb.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/logo-zb.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-zb.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Zerobet — Reprends le contrôle de ta vie",
    description: "Arrête les paris. Reconstruis-toi. Application premium de récupération contre l'addiction aux paris sportifs.",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Zerobet",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0704",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <head>
        {/* PWA / mobile meta tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo-zb.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Zerobet" />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {/* Premium animated starfield background */}
        <div className="starfield" />
        <div className="stars" />
        <div className="relative z-10">
          {/* Sound + Haptics bootstrap (no UI) */}
          <SoundInit />
          {children}
          {/* PWA service worker registration (no UI) */}
          <PWARegister />
        </div>
      </body>
    </html>
  );
}
