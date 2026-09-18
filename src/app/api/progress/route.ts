import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logger } from "@/lib/monitoring/logger";

/**
 * Zerobet 2.0 — Cloud progress sync.
 *
 * The app is local-first (Zustand + localStorage). This endpoint lets any
 * anonymous device back up its core recovery progress so it survives a
 * phone loss / app reinstall. No account required — a random deviceId is
 * generated client-side and kept in localStorage.
 *
 * POST /api/progress  { deviceId, payload, streakDays, xp, plan }
 * GET  /api/progress?deviceId=...
 */

const MAX_PAYLOAD_SIZE = 80 * 1024; // 80KB JSON snapshot cap

function isValidDeviceId(id: unknown): id is string {
  return typeof id === "string" && /^[a-zA-Z0-9_-]{8,64}$/.test(id);
}

export async function GET(req: NextRequest) {
  try {
    const deviceId = req.nextUrl.searchParams.get("deviceId");

    if (!isValidDeviceId(deviceId)) {
      return NextResponse.json({ error: "Invalid deviceId" }, { status: 400 });
    }

    const snapshot = await db.progressSnapshot.findUnique({
      where: { deviceId },
      select: {
        payload: true,
        streakDays: true,
        xp: true,
        plan: true,
        updatedAt: true,
      },
    });

    if (!snapshot) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      deviceId,
      snapshot: JSON.parse(snapshot.payload),
      streakDays: snapshot.streakDays,
      xp: snapshot.xp,
      plan: snapshot.plan,
      updatedAt: snapshot.updatedAt,
    });
  } catch (error) {
    logger.error("Progress GET error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const { deviceId, payload, streakDays, xp, plan } = body as {
      deviceId?: unknown;
      payload?: unknown;
      streakDays?: unknown;
      xp?: unknown;
      plan?: unknown;
    };

    if (!isValidDeviceId(deviceId)) {
      return NextResponse.json({ error: "Invalid deviceId" }, { status: 400 });
    }

    const payloadStr =
      typeof payload === "string" ? payload : JSON.stringify(payload ?? {});
    if (payloadStr.length > MAX_PAYLOAD_SIZE) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    const safeStreak = Math.max(0, Math.min(36500, Number(streakDays) || 0));
    const safeXp = Math.max(0, Math.min(10_000_000, Number(xp) || 0));
    const safePlan =
      plan === "premium" || plan === "mentor" || plan === "psychologist"
        ? plan
        : "free";

    const snapshot = await db.progressSnapshot.upsert({
      where: { deviceId },
      create: {
        deviceId,
        payload: payloadStr,
        streakDays: safeStreak,
        xp: safeXp,
        plan: safePlan,
      },
      update: {
        payload: payloadStr,
        streakDays: safeStreak,
        xp: safeXp,
        plan: safePlan,
      },
    });

    return NextResponse.json({
      ok: true,
      updatedAt: snapshot.updatedAt,
    });
  } catch (error) {
    logger.error("Progress POST error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
