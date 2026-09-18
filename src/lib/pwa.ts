/**
 * PWA utilities — service worker registration, notification permission,
 * push subscription, and local notification display.
 *
 * All functions gracefully degrade when the relevant Web API is unavailable
 * (SSR, older browsers, iOS Safari without notification support, etc.).
 */

export async function registerServiceWorker(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!("serviceWorker" in navigator)) return false;
  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      // updateViaCache: "none" ensures the SW itself is always fetched fresh
      updateViaCache: "none",
    });

    // Check for updates on every page load (in case the SW file changed)
    registration.update().catch(() => {
      // Silent fail — update is non-critical
    });

    console.log("[PWA] Service worker registered:", registration.scope);
    return true;
  } catch (error) {
    console.error("[PWA] Service worker registration failed:", error);
    return false;
  }
}

/**
 * Force-unregister the service worker and clear ALL caches.
 * Use this when you need to guarantee a clean slate (e.g. after a major
 * deploy or when debugging HMR issues).
 */
export async function clearServiceWorkerAndCaches(): Promise<void> {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  // Clear all caches
  const keys = await caches.keys();
  await Promise.all(keys.map((k) => caches.delete(k)));

  // Unregister all service workers
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((r) => r.unregister()));

  console.log("[PWA] Cleared all caches and unregistered service workers");
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return await Notification.requestPermission();
}

export async function subscribeToPush(): Promise<PushSubscription | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return null;
  try {
    const registration = await navigator.serviceWorker.ready;
    // Note: in a real app, you'd get the VAPID public key from your server
    // For now, we just check if subscription exists
    const existing = await registration.pushManager.getSubscription();
    if (existing) return existing;
    return null;
  } catch (error) {
    console.error("[PWA] Push subscription failed:", error);
    return null;
  }
}

export async function showLocalNotification(
  title: string,
  body: string,
  /** In-app screen name — forwarded back to the app on click (2.0.7 deep-link). */
  deepLinkScreen?: string
): Promise<void> {
  if (typeof window === "undefined") return;
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, {
      body,
      icon: "/logo-zb.png",
      badge: "/logo-zb.png",
      vibrate: [100, 50, 100],
      tag: "zerobet-local",
      data: { url: deepLinkScreen ?? "dashboard" },
    } as NotificationOptions);
  } catch {
    // Fallback to basic Notification API
    new Notification(title, { body });
  }
}

/**
 * Detect if the app is running in "standalone" (installed PWA) mode.
 * Works on iOS Safari and Chrome Android.
 */
export function isStandaloneMode(): boolean {
  if (typeof window === "undefined") return false;
  // iOS Safari
  if ((window.navigator as unknown as { standalone?: boolean }).standalone === true) return true;
  // Chrome Android / Edge / Samsung
  if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
  return false;
}

/**
 * Type for the beforeinstallprompt event (not in standard TS lib yet).
 */
export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}
