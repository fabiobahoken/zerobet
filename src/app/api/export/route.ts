import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Zerobet 2.0.9 — GDPR data rights per anonymous device.
 *
 * GET /api/export?deviceId=<id>
 *   → Right of access & portability: a complete structured export of
 *     everything Zerobet stores server-side for this device —
 *     meta, cloud progress snapshot (parsed payload), payment history.
 *
 * DELETE /api/export?deviceId=<id>
 *   → Right to erasure: permanently deletes the cloud snapshot and ALL
 *     payment rows for this device. Local data on the user's phone is
 *     never touched (local-first design).
 *
 * Same trust model as /api/progress and /api/payment/history: the
 * deviceId is an unguessable 32-char random ID, no account needed.
 * Phones are already masked in the DB, so exports are safe to share.
 */

const DEVICE_ID_RE = /^[a-zA-Z0-9_-]{8,64}$/;

export async function GET(req: NextRequest) {
  try {
    const deviceId = req.nextUrl.searchParams.get("deviceId") || "";
    if (!DEVICE_ID_RE.test(deviceId)) {
      return NextResponse.json({ error: "Invalid deviceId" }, { status: 400 });
    }

    const [snapshot, payments] = await Promise.all([
      db.progressSnapshot.findUnique({
        where: { deviceId },
        select: {
          streakDays: true,
          xp: true,
          plan: true,
          payload: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      db.payment.findMany({
        where: { deviceId },
        orderBy: { createdAt: "desc" },
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
      }),
    ]);

    // Parse the snapshot payload so the export is human-readable JSON
    // rather than an opaque string.
    let parsedPayload: unknown = null;
    if (snapshot?.payload) {
      try {
        parsedPayload = JSON.parse(snapshot.payload);
      } catch {
        parsedPayload = null;
      }
    }

    const successPayments = payments.filter((p) => p.status === "success");

    return NextResponse.json({
      meta: {
        app: "Zerobet",
        version: "2.0.9",
        exportedAt: new Date().toISOString(),
        format: "zerobet-gdpr-export/v1",
      },
      device: {
        deviceId,
        snapshotCreatedAt: snapshot?.createdAt ?? null,
        snapshotUpdatedAt: snapshot?.updatedAt ?? null,
      },
      cloudSnapshot: snapshot
        ? {
            streakDays: snapshot.streakDays,
            xp: snapshot.xp,
            plan: snapshot.plan,
            payload: parsedPayload,
          }
        : null,
      payments,
      stats: {
        paymentsCount: payments.length,
        paymentsSuccess: successPayments.length,
        totalSpent: successPayments.reduce((sum, p) => sum + p.amount, 0),
      },
    });
  } catch (err) {
    console.error("[export] GET error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deviceId = req.nextUrl.searchParams.get("deviceId") || "";
    if (!DEVICE_ID_RE.test(deviceId)) {
      return NextResponse.json({ error: "Invalid deviceId" }, { status: 400 });
    }

    const [snapshots, payments] = await Promise.all([
      db.progressSnapshot.deleteMany({ where: { deviceId } }),
      db.payment.deleteMany({ where: { deviceId } }),
    ]);

    return NextResponse.json({
      deleted: { snapshots: snapshots.count, payments: payments.count },
    });
  } catch (err) {
    console.error("[export] DELETE error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
