"use client";

/**
 * HapticsManager — haptic feedback via the Vibration API.
 *
 * Falls back silently on devices without vibration support (desktop,
 * iOS Safari — which doesn't expose window.navigator.vibrate).
 *
 * The class reads `hapticsEnabled` from the Zustand store on each call.
 */

type StoreSnapshot = { hapticsEnabled: boolean };

let storeGetter: (() => StoreSnapshot | null) | null = null;

export function configureHapticsFromStore(getter: () => StoreSnapshot | null) {
  storeGetter = getter;
}

function readStore(): StoreSnapshot | null {
  try {
    return storeGetter ? storeGetter() : null;
  } catch {
    return null;
  }
}

function isVibrationSupported(): boolean {
  if (typeof window === "undefined") return false;
  return typeof window.navigator !== "undefined" &&
    typeof window.navigator.vibrate === "function";
}

export class HapticsManager {
  private enabled: boolean = true;

  private get effectiveEnabled(): boolean {
    const store = readStore();
    if (store) this.enabled = store.hapticsEnabled;
    return this.enabled;
  }

  setEnabled(v: boolean) {
    this.enabled = v;
  }

  private vibrate(pattern: number | number[]) {
    if (!this.effectiveEnabled) return;
    if (!isVibrationSupported()) return;
    try {
      window.navigator.vibrate(pattern);
    } catch {
      /* noop */
    }
  }

  /** Light tap — 10ms. */
  light() {
    this.vibrate(10);
  }

  /** Medium tap — 20ms. */
  medium() {
    this.vibrate(20);
  }

  /** Heavy thump — 50ms. */
  heavy() {
    this.vibrate(50);
  }

  /** Success pattern — short, pause, slightly longer. */
  success() {
    this.vibrate([10, 50, 20]);
  }

  /** Error pattern — three equal thumps. */
  error() {
    this.vibrate([50, 50, 50]);
  }

  /** Warning pattern — four short bursts. */
  warning() {
    this.vibrate([30, 30, 30, 30]);
  }

  /** Selection tick — 5ms. */
  selection() {
    this.vibrate(5);
  }

  /** Achievement fanfare pattern. */
  achievement() {
    this.vibrate([20, 50, 20, 50, 50]);
  }
}

export const haptics = new HapticsManager();
