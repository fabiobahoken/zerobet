"use client";

/**
 * SoundManager — programmatic sound effects via Web Audio API.
 *
 * No external audio files needed: every effect is synthesized with
 * oscillators + a gain envelope so the bundle stays tiny and effects
 * fire instantly with zero network latency.
 *
 * Usage:
 *   import { sound } from "@/lib/sound";
 *   sound.init();           // call after the first user gesture
 *   sound.playSuccess();    // play a sound
 *
 * The class reads `soundEnabled` + `volume` from the Zustand store on
 * each call so toggling settings updates behavior instantly. We avoid
 * a hard dependency on the store here (so the lib stays importable
 * from anywhere) by reading via a `getState` function injected lazily.
 */

type StoreSnapshot = {
  soundEnabled: boolean;
  volume: number;
};

// Lazily-injected store accessor. Set by `configureSoundFromStore`.
let storeGetter: (() => StoreSnapshot | null) | null = null;

export function configureSoundFromStore(getter: () => StoreSnapshot | null) {
  storeGetter = getter;
}

function readStore(): StoreSnapshot | null {
  try {
    return storeGetter ? storeGetter() : null;
  } catch {
    return null;
  }
}

interface ToneOptions {
  frequency: number;
  duration: number;
  type?: OscillatorType;
  volumeMultiplier?: number;
  delay?: number;
  sweepTo?: number;
}

export class SoundManager {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private enabled: boolean = true;
  private volume: number = 0.5;
  private initialized: boolean = false;

  /**
   * Initialize the AudioContext. Must be called from a user gesture
   * (click/touch) at least once due to browser autoplay policies.
   */
  init() {
    if (this.initialized && this.context) {
      // Resume in case the context was suspended (e.g. after tab switch)
      if (this.context.state === "suspended") {
        void this.context.resume();
      }
      return;
    }
    if (typeof window === "undefined") return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    try {
      this.context = new AudioCtx();
      this.masterGain = this.context.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.context.destination);
      this.initialized = true;
    } catch {
      this.context = null;
      this.masterGain = null;
    }
  }

  /**
   * Sync enabled flag + volume from the store (called by configureSoundFromStore
   * automatically on each play via readStore).
   */
  setEnabled(v: boolean) {
    this.enabled = v;
  }

  setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.masterGain && this.context) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.context.currentTime, 0.01);
    }
  }

  private get effectiveEnabled(): boolean {
    const store = readStore();
    if (store) {
      this.enabled = store.soundEnabled;
      this.volume = store.volume;
      if (this.masterGain && this.context) {
        this.masterGain.gain.setTargetAtTime(
          this.volume,
          this.context.currentTime,
          0.01
        );
      }
    }
    return this.enabled;
  }

  private get effectiveVolume(): number {
    const store = readStore();
    if (store) {
      this.volume = store.volume;
    }
    return this.volume;
  }

  /** Play a single tone with an ADSR-like envelope. */
  private playTone({
    frequency,
    duration,
    type = "sine",
    volumeMultiplier = 1,
    delay = 0,
    sweepTo,
  }: ToneOptions) {
    if (!this.context || !this.masterGain) return;
    if (!this.effectiveEnabled) return;

    const now = this.context.currentTime + delay;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    if (sweepTo) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(1, sweepTo),
        now + duration
      );
    }

    const vol = this.effectiveVolume * volumeMultiplier;
    // Envelope: quick attack, exponential release
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  /** Short click — 800Hz, 50ms, triangle wave. */
  playClick() {
    this.init();
    this.playTone({
      frequency: 800,
      duration: 0.05,
      type: "triangle",
      volumeMultiplier: 0.6,
    });
  }

  /** Success chime — ascending C-E-G major triad. */
  playSuccess() {
    this.init();
    this.playTone({ frequency: 523.25, duration: 0.15, type: "sine", volumeMultiplier: 0.5, delay: 0 });     // C5
    this.playTone({ frequency: 659.25, duration: 0.15, type: "sine", volumeMultiplier: 0.5, delay: 0.08 });  // E5
    this.playTone({ frequency: 783.99, duration: 0.25, type: "sine", volumeMultiplier: 0.55, delay: 0.16 }); // G5
  }

  /** Achievement fanfare — C-E-G-C ascending with a slight delay between notes. */
  playAchievement() {
    this.init();
    this.playTone({ frequency: 523.25, duration: 0.18, type: "triangle", volumeMultiplier: 0.55, delay: 0 });     // C5
    this.playTone({ frequency: 659.25, duration: 0.18, type: "triangle", volumeMultiplier: 0.55, delay: 0.12 });  // E5
    this.playTone({ frequency: 783.99, duration: 0.18, type: "triangle", volumeMultiplier: 0.55, delay: 0.24 });  // G5
    this.playTone({ frequency: 1046.5, duration: 0.4, type: "triangle", volumeMultiplier: 0.6, delay: 0.36 });    // C6
    // Sparkle layer
    this.playTone({ frequency: 1568, duration: 0.15, type: "sine", volumeMultiplier: 0.3, delay: 0.42 });
  }

  /** Error buzz — 200Hz, 200ms, sawtooth. */
  playError() {
    this.init();
    this.playTone({
      frequency: 200,
      duration: 0.2,
      type: "sawtooth",
      volumeMultiplier: 0.4,
    });
  }

  /** Pop sound for notifications — 600Hz, 80ms, sine. */
  playPop() {
    this.init();
    this.playTone({
      frequency: 600,
      duration: 0.08,
      type: "sine",
      volumeMultiplier: 0.5,
      sweepTo: 900,
    });
  }

  /** Whoosh for transitions — frequency sweep 1200Hz → 200Hz. */
  playWhoosh() {
    this.init();
    this.playTone({
      frequency: 1200,
      duration: 0.35,
      type: "sine",
      volumeMultiplier: 0.35,
      sweepTo: 200,
    });
  }

  /** Level up — ascending notes with a small reverb tail. */
  playLevelUp() {
    this.init();
    // Ascending arpeggio
    this.playTone({ frequency: 392, duration: 0.12, type: "triangle", volumeMultiplier: 0.5, delay: 0 });     // G4
    this.playTone({ frequency: 523.25, duration: 0.12, type: "triangle", volumeMultiplier: 0.5, delay: 0.1 }); // C5
    this.playTone({ frequency: 659.25, duration: 0.12, type: "triangle", volumeMultiplier: 0.5, delay: 0.2 }); // E5
    this.playTone({ frequency: 783.99, duration: 0.12, type: "triangle", volumeMultiplier: 0.55, delay: 0.3 }); // G5
    this.playTone({ frequency: 1046.5, duration: 0.45, type: "triangle", volumeMultiplier: 0.6, delay: 0.4 }); // C6
    // Reverb-ish sparkle
    this.playTone({ frequency: 1318.5, duration: 0.3, type: "sine", volumeMultiplier: 0.25, delay: 0.5 });
    this.playTone({ frequency: 1568, duration: 0.25, type: "sine", volumeMultiplier: 0.2, delay: 0.6 });
  }

  /** XP coin — high pitch ding. */
  playCoin() {
    this.init();
    this.playTone({ frequency: 988, duration: 0.07, type: "sine", volumeMultiplier: 0.4, delay: 0 });     // B5
    this.playTone({ frequency: 1318.5, duration: 0.12, type: "sine", volumeMultiplier: 0.45, delay: 0.05 }); // E6
  }
}

export const sound = new SoundManager();
