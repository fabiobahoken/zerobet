import { getServerSession } from "next-auth";
import { authOptions } from "./config";
import type { NextRequest } from "next/server";

/**
 * Get the authenticated user's ID from the NextAuth session.
 * Returns null if not authenticated.
 *
 * Usage in API routes:
 * ```ts
 * const userId = await getAuthUserId(req);
 * if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 * ```
 */
export async function getAuthUserId(_req?: NextRequest): Promise<string | null> {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.id) return session.user.id;
    return null;
  } catch {
    return null;
  }
}

/**
 * Optional auth — returns userId if authenticated, or "anonymous" fallback.
 * Use for routes that work both authenticated and anonymously.
 */
export async function getOptionalAuthUserId(req?: NextRequest): Promise<string> {
  const userId = await getAuthUserId(req);
  return userId || "anonymous";
}
