"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/pwa";

/**
 * Mounts once on app load and registers the Zerobet service worker for
 * PWA offline support + push notifications. Renders nothing.
 *
 * Also handles SW updates: when a new SW takes control, it clears all
 * old caches and forces a page reload to prevent stale-chunk errors.
 */
export function PWARegister() {
  useEffect(() => {
    let reloading = false;

    registerServiceWorker().then((registered) => {
      if (!registered) return;

      // Listen for SW updates
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          // The new SW has taken control — reload once to pick up new chunks
          if (!reloading) {
            reloading = true;
            window.location.reload();
          }
        });

        // Listen for messages from the SW
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data === "cache-cleared" && !reloading) {
            reloading = true;
            window.location.reload();
          }
        });

        // Force-clear any stale caches on mount (defensive — prevents
        // "module factory not available" after HMR recompiles).
        // Only do this in dev mode to avoid clearing prod cache on every visit.
        if (process.env.NODE_ENV === "development") {
          caches.keys().then((keys) => {
            const staleCaches = keys.filter(
              (k) => k !== "zerobet-v3"
            );
            if (staleCaches.length > 0) {
              Promise.all(staleCaches.map((k) => caches.delete(k))).then(() => {
                // Also tell the active SW to clear its cache
                navigator.serviceWorker.controller?.postMessage("clear-cache");
              });
            }
          });
        }
      }
    });
  }, []);
  return null;
}
