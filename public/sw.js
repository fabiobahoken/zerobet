// Zerobet Service Worker — PWA offline support + push notifications
// Plain JavaScript (runs in the browser, not TypeScript).

// Bump version on every deploy to force cache invalidation.
// v3: purges stale HTML + dev chunks cached under v2 (fixed stale-chunk
// "useCloudSync is not defined" crashes for returning users).
const CACHE_NAME = "zerobet-v3";
const APP_SHELL = [
  "/",
  "/manifest.json",
  "/logo.svg",
  "/logo-zb.png",
];

// Install: cache app shell only (not Next.js chunks)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(APP_SHELL).catch(() => {
        // If any URL fails, continue — don't block installation
      })
    )
  );
  self.skipWaiting();
});

// Activate: clean ALL old caches (including previous versions)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch strategy:
// - Next.js dev/prod assets (/_next/*): network-only, NEVER cache
//   (prevents HMR "module factory not available" errors)
// - API routes: network-first, fallback to cache
// - Navigation requests (HTML pages): network-first, fallback to cached app shell
// - Static assets (images, etc.): cache-first, fallback to network
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) return;

  // Skip Next.js HMR/dev websocket
  if (url.pathname.startsWith("/_next/webpack-hmr")) return;

  // CRITICAL: Never cache Next.js chunks or static assets.
  // In dev mode, Turbopack generates new chunk hashes on every recompile.
  // Caching them causes "module factory not available" HMR errors.
  if (url.pathname.startsWith("/_next/")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // API routes: network-first
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Navigation requests (HTML pages): network-first, fallback to cached root.
  // NOTE: only cache same-origin GET navigations with an OK response, and never
  // cache a 5xx/opaque fallback — a poisoned HTML cache would reference dead
  // chunks and crash the app until the next SW version bump.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.ok && response.type === "basic") {
            // Cache the latest navigation response
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(event.request).then(
            (cached) => cached || caches.match("/")
          )
        )
    );
    return;
  }

  // Static assets (images, fonts, etc.): cache-first
  event.respondWith(
    caches.match(event.request).then(
      (cached) =>
        cached ||
        fetch(event.request).then((response) => {
          // Only cache successful responses
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
    )
  );
});

// Push notifications
self.addEventListener("push", (event) => {
  let data = { title: "Zerobet", body: "Tu as un nouveau message" };
  try {
    if (event.data) data = event.data.json();
  } catch (e) {
    if (event.data) data.body = event.data.text();
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/logo-zb.png",
      badge: "/logo-zb.png",
      vibrate: [100, 50, 100],
      tag: data.tag || "zerobet-notification",
    })
  );
});

// Notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow("/"));
});

// Message handler — allow the app to force-update the SW cache
self.addEventListener("message", (event) => {
  if (event.data === "clear-cache") {
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => caches.delete(k)))
    ).then(() => {
      self.clients.matchAll().then((clients) =>
        clients.forEach((c) => c.postMessage("cache-cleared"))
      );
    });
  }
});
