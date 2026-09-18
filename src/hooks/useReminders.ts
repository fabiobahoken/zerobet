"use client";

import { useEffect } from "react";
import { useStore } from "@/store/zerobet-store";
import { t, type Language } from "@/lib/i18n/dictionary";
import { runReminderCheck } from "@/lib/reminders";

/**
 * Zerobet 2.0.6 — useReminders
 *
 * Mounts the smart reminders engine at app level (next to useCloudSync):
 *   - first check 8 s after mount (let the splash/first paint settle)
 *   - then every 60 s while the app is open
 *   - immediately when the app returns to the foreground (visibilitychange)
 *
 * Reads the store imperatively (getState) inside the tick so the interval
 * callback never goes stale and the hook causes zero re-renders.
 */
export function useReminders() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tick = () => {
      const state = useStore.getState();
      if (!state.hasCompletedOnboarding) return;
      if (!state.notificationPreferences.dailyReminder &&
          !state.notificationPreferences.cravingCheckin &&
          !state.notificationPreferences.motivationalQuotes &&
          !state.notificationPreferences.weeklyReport) {
        return; // every channel disabled — nothing to do
      }
      runReminderCheck({
        prefs: state.notificationPreferences,
        streakDays: state.streakDays,
        lastCheckInDate: state.lastCheckInDate,
        t: (key, params) => t(state.language as Language, key, params),
      });
    };

    const initialDelay = setTimeout(tick, 8000);
    const interval = setInterval(tick, 60000);
    const onVisible = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
}
