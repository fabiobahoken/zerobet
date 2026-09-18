import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { logger } from "@/lib/monitoring/logger";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const safeEmail = email.trim().toLowerCase().slice(0, 255);
    const safeName = name ? String(name).trim().slice(0, 100) : safeEmail.split("@")[0];

    // Check if user already exists
    const existing = await db.user.findUnique({ where: { email: safeEmail } });
    if (existing) {
      return NextResponse.json({ error: "Account already exists with this email" }, { status: 409 });
    }

    // Create user
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: {
        email: safeEmail,
        name: safeName,
        passwordHash,
      },
    });

    logger.info("User signed up", { userId: user.id });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    logger.error("Signup error", error);
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
