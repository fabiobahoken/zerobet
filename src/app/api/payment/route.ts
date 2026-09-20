import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { activateServerPlan } from "@/lib/subscription";

/**
 * Zerobet 2.0.4 — Mobile Money payment gateway (simulated).
 *
 * Realistic African Mobile Money flow:
 *   1. POST   → create a payment attempt (Orange Money, MTN MoMo, Wave, Moov)
 *   2. GET    → poll status; the simulated gateway progresses over time:
 *               pending (user must confirm on phone) → processing → success
 *
 * QA escape hatch: a phone number ending in "0000" simulates an operator
 * rejection (insufficient funds) so the failure UX can be tested end-to-end.
 *
 * When a real gateway (CinetPay, Flutterwave, PayDunya…) is wired in, the
 * statuses and the Payment table stay identical — only the transition logic
 * below gets replaced by operator webhooks.
 */

const VALID_PLANS = new Set(["premium", "mentor", "psychologist"]);
const VALID_CYCLES = new Set(["monthly", "annual"]);
const VALID_OPERATORS = new Set(["orange", "mtn", "wave", "moov"]);
const VALID_CURRENCIES = new Set(["FCFA", "NGN", "GHS", "CDF", "XOF", "XAF"]);

// Simulated gateway timing (ms) — matches realistic USSD push delays
const PENDING_MS = 2500; // "Confirm on your phone"
const PROCESSING_MS = 6000; // operator debits the wallet

// Price list (FCFA) — mirrors PLAN_OPTIONS in app-data (server-side source of truth)
const PRICES: Record<string, { monthly: number; annual: number }> = {
  premium: { monthly: 12000, annual: 120000 },
  mentor: { monthly: 20000, annual: 200000 },
  psychologist: { monthly: 40000, annual: 400000 },
};

const MAX_AMOUNT = 1_000_000;

function maskPhone(phone: string): string {
  if (phone.length <= 4) return "****";
  return `${phone.slice(0, phone.length - 4).replace(/\d/g, "*")}${phone.slice(-4)}`;
}

/** Normalise a phone number: keep digits only (8-15 chars). */
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-().]/g, "").replace(/^\+?00?(\d+)$/, "$1");
  if (!/^\d{8,15}$/.test(digits)) return null;
  return digits;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const plan = String(body.plan || "");
    const billingCycle = String(body.billingCycle || "monthly");
    const operator = String(body.operator || "");
    const deviceId = String(body.deviceId || "").slice(0, 64);
    const currency = VALID_CURRENCIES.has(String(body.currency)) ? String(body.currency) : "FCFA";

    if (!VALID_PLANS.has(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    if (!VALID_CYCLES.has(billingCycle)) {
      return NextResponse.json({ error: "Invalid billing cycle" }, { status: 400 });
    }
    if (!VALID_OPERATORS.has(operator)) {
      return NextResponse.json({ error: "Invalid operator" }, { status: 400 });
    }

    const phone = normalizePhone(String(body.phone || ""));
    if (!phone) {
      return NextResponse.json({ error: "Invalid phone number (8-15 digits)" }, { status: 400 });
    }

    // Server-side price lookup — never trust a client-sent amount
    const amount = billingCycle === "annual" ? PRICES[plan].annual : PRICES[plan].monthly;
    if (!amount || amount <= 0 || amount > MAX_AMOUNT) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Simulated rejection path for QA: phone ending in 0000 → operator refuses
    const willFail = phone.endsWith("0000");

    const payment = await db.payment.create({
      data: {
        deviceId,
        plan,
        billingCycle,
        operator,
        phone: maskPhone(phone),
        amount,
        currency,
        status: "pending",
      },
    });

    // Persist the raw phone briefly for the simulation only (masked in DB).
    // In production this secret lives with the operator, never with us.
    simulatedGateways.set(payment.id, { phone, willFail, createdAt: Date.now() });

    return NextResponse.json({
      paymentId: payment.id,
      status: "pending",
      amount,
      currency,
      operator,
      instructions: { operator: "ussd_push" },
    });
  } catch (error) {
    console.error("Payment initiate error:", error);
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") || "";
    if (!id || id.length > 64) {
      return NextResponse.json({ error: "Invalid payment id" }, { status: 400 });
    }

    const sim = simulatedGateways.get(id);
    const payment = await db.payment.findUnique({ where: { id } });
    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Unknown simulation (e.g. server restarted) → resolve as success if it was
    // pending/processing (idempotent, avoids stuck user flows after a redeploy).
    if (!sim) {
      if (payment.status === "pending" || payment.status === "processing") {
        await db.payment.update({ where: { id }, data: { status: "success" } });
        // Server-authoritative plan activation (Zerobet 2.1.0): the snapshot
        // gets the plan + a server-computed renewal date even if the client
        // never pushes its own snapshot.
        await activateServerPlan(payment.deviceId, payment.plan, payment.billingCycle);
        return NextResponse.json({ status: "success" });
      }
      return NextResponse.json({ status: payment.status });
    }

    const elapsed = Date.now() - sim.createdAt;

    if (sim.willFail && elapsed >= PROCESSING_MS) {
      if (payment.status !== "failed") {
        await db.payment.update({
          where: { id },
          data: { status: "failed", failReason: "insufficient_funds" },
        });
      }
      return NextResponse.json({ status: "failed", reason: "insufficient_funds" });
    }

    if (elapsed >= PROCESSING_MS) {
      if (payment.status !== "success") {
        await db.payment.update({ where: { id }, data: { status: "success" } });
        // Server-authoritative plan activation (Zerobet 2.1.0).
        await activateServerPlan(payment.deviceId, payment.plan, payment.billingCycle);
      }
      return NextResponse.json({ status: "success" });
    }

    if (elapsed >= PENDING_MS) {
      if (payment.status === "pending") {
        await db.payment.update({ where: { id }, data: { status: "processing" } });
      }
      return NextResponse.json({ status: "processing" });
    }

    return NextResponse.json({ status: "pending" });
  } catch (error) {
    console.error("Payment status error:", error);
    return NextResponse.json({ error: "Status check failed" }, { status: 500 });
  }
}

// ---- In-memory simulation state (survives between polls in one server run) ----
const simulatedGateways = new Map<string, { phone: string; willFail: boolean; createdAt: number }>();

// Cleanup old simulation entries every 10 minutes (keep last hour only)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const cutoff = Date.now() - 3600_000;
    for (const [id, entry] of simulatedGateways) {
      if (entry.createdAt < cutoff) simulatedGateways.delete(id);
    }
  }, 600_000).unref?.();
}
