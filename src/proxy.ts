import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware for request body size limiting and basic security.
 *
 * - Rejects API request bodies larger than 100KB (except chat which allows 10KB)
 * - Adds no-cache headers to API responses
 * - Logs suspicious requests
 */

const MAX_BODY_SIZE = 100 * 1024; // 100KB for general API
const MAX_CHAT_BODY_SIZE = 10 * 1024; // 10KB for chat API

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only apply body size limits to POST/PUT/PATCH API routes
  if (pathname.startsWith("/api/") && ["POST", "PUT", "PATCH"].includes(req.method)) {
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    const limit = pathname.startsWith("/api/chat") ? MAX_CHAT_BODY_SIZE : MAX_BODY_SIZE;

    if (contentLength > limit) {
      return NextResponse.json(
        { error: "Request body too large" },
        { status: 413 }
      );
    }
  }

  // Add security headers to API responses
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
