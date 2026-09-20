"use client";

import { useEffect } from "react";
import { useStore } from "@/store/zerobet-store";
import { t, type Language } from "@/lib/i18n/dictionary";
import { runReminderCheck } from "@/lib/reminders";

/**
 * Zerobet 2.0.6/2.0.7 — useReminders
 *
 * Mounts the smart reminders engine at app level (next to useCloudSync):
 *   - first check 8 s after mount (let the splash/first paint settle)
 *   - then every 60 s while the app is open
 *   - immediately when the app returns to the foreground (visibilitychange)
 *   - deep-links: notificationclick messages from the service worker
 *     navigate the app to the notification's target screen (2.0.7), and a
 *     `?deeplink=<screen>` query param (cold start) is honoured once.
 *
 * Reads the store imperatively (getState) inside the tick so the interval
 * callback never goes stale and the hook causes zero re-renders.
 */
export function useReminders() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const navigateToScreen = (screen: string) => {
      const state = useStore.getState();
      if (!state.hasCompletedOnboarding) return;
      // Only navigate to known screens — the value crosses the SW boundary.
      const known = [
        "dashboard", "panic", "journal", "finance", "atlas", "blocker",
        "community", "community-chat", "parcours", "settings", "subscription",
        "stats", "resources", "sos", "meditation", "achievements", "profile",
        "calendar", "support", "program", "mentorship", "withdrawal",
        "triggers", "goals", "relapse-recovery", "affirmations", "notifications",
      ];
      if (!known.includes(screen)) return;
      state.navigate(screen as Parameters<typeof state.navigate>[0]);
    };

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

    // Deep-link from a notification click while the app is already open
    const onSWMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; url?: string } | null;
      if (data?.type === "NOTIFICATION_CLICK" && data.url) {
        navigateToScreen(data.url);
      }
    };
    navigator.serviceWorker?.addEventListener("message", onSWMessage);

    // Deep-link from a cold start via ?deeplink=<screen>
    try {
      const params = new URLSearchParams(window.location.search);
      const link = params.get("deeplink");
      if (link) {
        params.delete("deeplink");
        const rest = params.toString();
        window.history.replaceState(
          null,
          "",
          window.location.pathname + (rest ? `?${rest}` : "")
        );
        setTimeout(() => navigateToScreen(link), 2500);
      }
    } catch {
      /* ignore */
    }

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
      navigator.serviceWorker?.removeEventListener("message", onSWMessage);
    };
  }, []);
}
