import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Zerobet 2.0.5 — Payment history per anonymous device.
 *
 * GET /api/payment/history?deviceId=<id>
 *   → last 50 payments for that device (phones are ALREADY masked in the DB,
 *     so the response is safe to display as-is in the subscription screen).
 *
 * No PII beyond the masked phone + plan metadata. No auth by design:
 * deviceId is an unguessable 32-char random ID (same trust model as
 * /api/progress — local-first anonymous app).
 */
export async function GET(req: NextRequest) {
  try {
    const deviceId = req.nextUrl.searchParams.get("deviceId") || "";
    if (!/^[a-zA-Z0-9_-]{8,64}$/.test(deviceId)) {
      return NextResponse.json({ error: "Invalid deviceId" }, { status: 400 });
    }

    const payments = await db.payment.findMany({
      where: { deviceId },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        plan: true,
        billingCycle: true,
        operator: true,
        phone: true,
        amount: true,
        currency: true,
        status: true,
        failReason: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ payments });
  } catch (err) {
    console.error("[payment/history] GET error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
