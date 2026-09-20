/**
 * Zerobet 2.0.5 — Anonymous device identity (shared).
 *
 * A random, unguessable ID kept in localStorage. No account needed.
 * Used by useCloudSync (backup) and the payment APIs (history / checkout)
 * so a user can find their payments and restore progress after a reinstall.
 */
export const DEVICE_ID_KEY = "zerobet-device-id";

export function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id: string | null = null;
  try {
    id = localStorage.getItem(DEVICE_ID_KEY);
  } catch {
    return "";
  }
  if (!id || !/^[a-zA-Z0-9_-]{8,64}$/.test(id)) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 32)
        : `dev${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
    try {
      localStorage.setItem(DEVICE_ID_KEY, id);
    } catch {
      /* private mode — identity is per-session, acceptable */
    }
  }
  return id;
}
