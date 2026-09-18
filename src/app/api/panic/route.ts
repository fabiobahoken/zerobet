import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { trigger, intensity, resolved, method, userId } = body;

    // Sanitize inputs
    const safeTrigger = trigger ? String(trigger).slice(0, 200) : null;
    const safeIntensity = Math.max(1, Math.min(5, Number(intensity) || 3));
    const safeResolved = typeof resolved === "boolean" ? resolved : true;
    const safeMethod = method ? String(method).slice(0, 100) : null;
    const safeUserId = userId ? String(userId).slice(0, 100) : "anonymous";

    const event = await db.panicEvent.create({
      data: {
        trigger: safeTrigger,
        intensity: safeIntensity,
        resolved: safeResolved,
        method: safeMethod,
        userId: safeUserId,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Panic API error:", error);
    return NextResponse.json({ error: "Failed to log panic event" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = (searchParams.get("userId") || "anonymous").slice(0, 100);

    const events = await db.panicEvent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 30,
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Panic API error:", error);
    return NextResponse.json({ events: [] });
  }
}
