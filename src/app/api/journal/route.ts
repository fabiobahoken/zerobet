import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const MAX_CONTENT_LENGTH = 5000;
const VALID_EMOTIONS = ["frustrated", "strong", "tempted", "calm", "proud", "anxious"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, emotion, trigger, intensity, userId } = body;

    // ---- Input validation ----
    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content required" }, { status: 400 });
    }
    if (!emotion || !VALID_EMOTIONS.includes(emotion)) {
      return NextResponse.json({ error: "Valid emotion required" }, { status: 400 });
    }

    // Sanitize inputs
    const safeContent = content.trim().slice(0, MAX_CONTENT_LENGTH);
    const safeEmotion = String(emotion);
    const safeTrigger = trigger ? String(trigger).slice(0, 200) : null;
    const safeIntensity = Math.max(1, Math.min(5, Number(intensity) || 1));
    const safeUserId = userId ? String(userId).slice(0, 100) : "anonymous";

    const entry = await db.journalEntry.create({
      data: {
        content: safeContent,
        emotion: safeEmotion,
        trigger: safeTrigger,
        intensity: safeIntensity,
        userId: safeUserId,
      },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error("Journal API error:", error);
    return NextResponse.json({ error: "Failed to save entry" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = (searchParams.get("userId") || "anonymous").slice(0, 100);

    const entries = await db.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Journal API error:", error);
    return NextResponse.json({ entries: [] });
  }
}
