"use client";

import { useEffect, useState } from "react";
import { Signal, Wifi, BatteryFull } from "lucide-react";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

/**
 * PhoneShell — Zerobet 3.0 "Native App" shell (QUITTR-style).
 *
 * MOBILE (<500px): renders as a full-bleed app — the browser/PWA chrome
 * provides the real status bar, so nothing fake is drawn.
 *
 * DESKTOP (>=500px): the app is staged inside a photorealistic phone frame
 * (bezel, Dynamic Island, live status bar, home indicator) floating on an
 * ambient ember aurora. `transform` on `.zb-phone` turns it into the
 * containing block for every `position: fixed` descendant, so modals,
 * sheets and toasts stay confined inside the device screen — exactly like
 * a native app screenshot.
 */

/** Live clock for the fake status bar (starts at Apple's classic 9:41). */
function useClock() {
  const [time, setTime] = useState("9:41");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    update();
    const id = setInterval(update, 10_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function StatusBar() {
  const time = useClock();
  return (
    <div className="zb-statusbar" aria-hidden>
      <span className="zb-statusbar-time tabular-nums">{time}</span>
      <div className="zb-statusbar-icons">
        <Signal size={17} strokeWidth={2.6} />
        <Wifi size={16} strokeWidth={2.6} />
        <BatteryFull size={28} strokeWidth={1.8} />
      </div>
    </div>
  );
}

export function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="zb-stage">
      {/* Ambient desktop scenery — hidden on mobile */}
      <div className="zb-ambient" aria-hidden>
        <div className="zb-orb zb-orb-1" />
        <div className="zb-orb zb-orb-2" />
        <div className="zb-wordmark">Zerobet</div>
      </div>

      {/* The device */}
      <div className="zb-phone">
        <StatusBar />
        <div className="zb-island" aria-hidden />
        {children}
        <div className="zb-home-indicator" aria-hidden />

        {/* Toasts live inside the device screen on desktop too */}
        <SonnerToaster
          position="top-center"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(22, 11, 4, 0.95)",
              border: "1px solid rgba(255, 176, 32, 0.18)",
              color: "#fff",
              backdropFilter: "blur(20px)",
            },
          }}
        />
      </div>
    </div>
  );
}
