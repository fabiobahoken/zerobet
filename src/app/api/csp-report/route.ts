import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/monitoring/logger";

/**
 * CSP violation report endpoint.
 *
 * Browsers POST violation reports here when the Content-Security-Policy
 * blocks something. We log them so we can tune the CSP before switching
 * from report-only to enforcement.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // CSP reports can be large — only log the essential fields
    const report = body?.["csp-report"] || body;
    logger.warn("CSP violation", {
      documentUri: report?.["document-uri"]?.slice(0, 200),
      violatedDirective: report?.["violated-directive"]?.slice(0, 100),
      blockedUri: report?.["blocked-uri"]?.slice(0, 200),
      sourceFile: report?.["source-file"]?.slice(0, 200),
      lineNumber: report?.["line-number"],
    });
    return NextResponse.json({ ok: true });
  } catch {
    // Don't error on malformed reports
    return NextResponse.json({ ok: true });
  }
}
