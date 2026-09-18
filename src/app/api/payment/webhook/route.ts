import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";
import {
  activateServerPlan,
  computeRenewal,
  isValidPlan,
  isValidCycle,
  maskPhone,
} from "@/lib/subscription";

/**
 * Zerobet 2.1.0 — Operator payment webhook (real-gateway ready).
 *
 * POST /api/payment/webhook
 *   Headers:
 *     x-zerobet-signature: sha256=<HMAC-SHA256 hex digest of the RAW body>
 *   Body (JSON):
 *     {
 *       event: "payment.success" | "payment.failed" | "payment.expired",
 *       provider: "orange" | "mtn" | "wave" | "moov" | "cinetpay" | "flutterwave",
 *       transactionId: string (unique per charge — idempotency key),
 *       deviceId: string,
 *       plan: "premium" | "mentor" | "psychologist",
 *       billingCycle: "monthly" | "annual",
 *       amount: number (FCFA), currency?: string,
 *       phone?: string (masked server-side before storage),
 *       failReason?: string
 *     }
 *
 * Security:
 *   - HMAC-SHA256 signature over the raw body (WEBHOOK_SECRET env, constant-
 *     time compare). Missing secret → 503 (fail-closed, never process).
 *   - Idempotency: providerRef unique constraint on Payment. A replayed
 *     webhook is acknowledged (200, idempotent:true) WITHOUT side effects.
 *   - Amount is sanity-bounded but stored as sent: the provider is the
 *     source of truth for what was actually charged.
 *
 * On success the plan is activated SERVER-SIDE (ProgressSnapshot upsert with
 * a server-computed renewal date) — see src/lib/subscription.ts. The client
 * picks the change up via the cloud-sync pull path (useCloudSync).
 */

const VALID_EVENTS = new Set(["payment.success", "payment.failed", "payment.expired"]);
const VALID_PROVIDERS = new Set(["orange", "mtn", "wave", "moov", "cinetpay", "flutterwave"]);
const MAX_AMOUNT = 1_000_000;

interface WebhookBody {
  event?: unknown;
  provider?: unknown;
  transactionId?: unknown;
  deviceId?: unknown;
  plan?: unknown;
  billingCycle?: unknown;
  amount?: unknown;
  currency?: unknown;
  phone?: unknown;
  failReason?: unknown;
}

function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) return false; // fail-closed
  if (!signatureHeader) return false;

  const expected = `sha256=${createHmac("sha256", secret).update(rawBody, "utf8").digest("hex")}`;
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signatureHeader, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  // Fail-closed when the platform has no webhook secret configured.
  if (!process.env.WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook not configured (missing WEBHOOK_SECRET)" },
      { status: 503 }
    );
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-zerobet-signature");
  if (!verifySignature(rawBody, signature)) {
    console.error("[payment/webhook] signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: WebhookBody;
  try {
    body = JSON.parse(rawBody) as WebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = String(body.event ?? "");
  const provider = String(body.provider ?? "");
  const transactionId = String(body.transactionId ?? "").trim();
  const deviceId = String(body.deviceId ?? "").trim();
  const failReason =
    typeof body.failReason === "string" && body.failReason.length <= 100
      ? body.failReason
      : null;

  if (!VALID_EVENTS.has(event)) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }
  if (!VALID_PROVIDERS.has(provider)) {
    return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
  }
  if (!transactionId || transactionId.length > 64) {
    return NextResponse.json(
      { error: "Invalid transactionId (1-64 chars)" },
      { status: 400 }
    );
  }
  if (!/^[a-zA-Z0-9_-]{8,64}$/.test(deviceId)) {
    return NextResponse.json({ error: "Invalid deviceId" }, { status: 400 });
  }

  const plan = isValidPlan(body.plan) ? body.plan : null;
  const billingCycle = isValidCycle(body.billingCycle) ? body.billingCycle : "monthly";

  const rawAmount = Number(body.amount);
  if (!Number.isInteger(rawAmount) || rawAmount <= 0 || rawAmount > MAX_AMOUNT) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  // Optional phone — normalized then masked before storage (same rule as the
  // simulated gateway: only digits survive, storage keeps ****<last4>).
  let phone = "";
  if (typeof body.phone === "string" && body.phone) {
    const digits = body.phone.replace(/[\s\-().]/g, "").replace(/^\+?00?(\d+)$/, "$1");
    if (/^\d{8,15}$/.test(digits)) phone = maskPhone(digits);
  }

  const currency =
    typeof body.currency === "string" && body.currency.length <= 8 ? body.currency : "FCFA";

  // ---- Idempotency: provider transaction id is globally unique ----
  try {
    const existing = await db.payment.findUnique({ where: { providerRef: transactionId } });
    if (existing) {
      return NextResponse.json({
        ok: true,
        idempotent: true,
        paymentId: existing.id,
        status: existing.status,
      });
    }
  } catch (err) {
    console.error("[payment/webhook] idempotency check error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  try {
    if (event === "payment.success") {
      if (!plan) {
        return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
      }

      const subscription = await activateServerPlan(deviceId, plan, billingCycle);

      const payment = await db.payment.create({
        data: {
          deviceId,
          plan,
          billingCycle,
          operator: provider,
          phone,
          amount: rawAmount,
          currency,
          status: "success",
          providerRef: transactionId,
        },
      });

      return NextResponse.json({
        ok: true,
        idempotent: false,
        paymentId: payment.id,
        subscription,
      });
    }

    // payment.failed / payment.expired — record for the user's history.
    const status = event === "payment.expired" ? "expired" : "failed";
    const payment = await db.payment.create({
      data: {
        deviceId,
        plan: plan ?? "premium",
        billingCycle,
        operator: provider,
        phone,
        amount: rawAmount,
        currency,
        status,
        failReason,
        providerRef: transactionId,
      },
    });
    return NextResponse.json({ ok: true, idempotent: false, paymentId: payment.id, status });
  } catch (err) {
    // Unique-race: two concurrent identical webhooks — the loser is idempotent.
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json({ ok: true, idempotent: true });
    }
    console.error("[payment/webhook] processing error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/**
 * GET — small self-describing endpoint so operators/integrators can verify
 * the route exists and see which events are supported (no sensitive data).
 */
export async function GET() {
  return NextResponse.json({
    service: "zerobet-payment-webhook",
    methods: ["POST"],
    events: ["payment.success", "payment.failed", "payment.expired"],
    signature: "x-zerobet-signature: sha256=<HMAC-SHA256(rawBody, WEBHOOK_SECRET)>",
    renewalPolicy: {
      monthly: computeRenewal(new Date(), "monthly").toISOString(),
      annual: computeRenewal(new Date(), "annual").toISOString(),
    },
  });
}
