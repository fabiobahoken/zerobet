"use client";

import { useEffect } from "react";
import { useStore } from "@/store/zerobet-store";
import { sound, configureSoundFromStore } from "@/lib/sound";
import { haptics, configureHapticsFromStore } from "@/lib/haptics";

/**
 * Mounts once at the app root to:
 *  - wire SoundManager / HapticsManager to the Zustand store so toggling
 *    `soundEnabled` / `hapticsEnabled` / `volume` instantly affects all
 *    subsequent calls.
 *  - initialize the Web Audio context on the first user gesture (required
 *    by browsers' autoplay policies).
 *
 * Renders nothing — pure side-effect component.
 */
export function SoundInit() {
  useEffect(() => {
    // Inject store getters so lib managers stay decoupled from the store.
    // The store keeps volume on a 0-100 scale; the SoundManager expects
    // 0-1, so we normalize here.
    configureSoundFromStore(() => {
      const s = useStore.getState();
      return { soundEnabled: s.soundEnabled, volume: s.volume / 100 };
    });
    configureHapticsFromStore(() => {
      const s = useStore.getState();
      return { hapticsEnabled: s.hapticsEnabled };
    });

    // Initialize audio context on first user gesture.
    const onFirstGesture = () => {
      sound.init();
      window.removeEventListener("click", onFirstGesture, true);
      window.removeEventListener("touchstart", onFirstGesture, true);
      window.removeEventListener("keydown", onFirstGesture, true);
    };
    window.addEventListener("click", onFirstGesture, true);
    window.addEventListener("touchstart", onFirstGesture, true);
    window.addEventListener("keydown", onFirstGesture, true);

    return () => {
      window.removeEventListener("click", onFirstGesture, true);
      window.removeEventListener("touchstart", onFirstGesture, true);
      window.removeEventListener("keydown", onFirstGesture, true);
    };
  }, []);

  return null;
}
