import { db } from "@/lib/db";

/**
 * Zerobet 2.1.0 — Server-side subscription state.
 *
 * Until now the plan lived ONLY in the client store (activated locally after
 * the simulated gateway returned success, then backed up via /api/progress).
 * That had a known flaw (see Task 6 worklog): the renewal date was a client
 * estimate and a device that never pushed its snapshot showed no plan.
 *
 * This module makes the SERVER authoritative for plan state:
 *   - activateServerPlan() upserts the ProgressSnapshot (plan column AND
 *     payload fields) with a server-computed renewal date.
 *   - Called from (a) the simulated gateway success transition and (b) the
 *     real-operator webhook route — both share the exact same code path.
 *
 * Trust model unchanged: deviceId is an unguessable random ID (local-first
 * anonymous app), identical to /api/progress and /api/payment/*.
 */

const VALID_PLANS = new Set(["premium", "mentor", "psychologist"]);
const VALID_CYCLES = new Set(["monthly", "annual"]);

export function isValidPlan(p: unknown): p is string {
  return typeof p === "string" && VALID_PLANS.has(p);
}

export function isValidCycle(c: unknown): c is string {
  return typeof c === "string" && VALID_CYCLES.has(c);
}

/** Compute the next renewal date (server-side source of truth). */
export function computeRenewal(from: Date, billingCycle: string): Date {
  const next = new Date(from);
  if (billingCycle === "annual") next.setFullYear(next.getFullYear() + 1);
  else next.setDate(next.getDate() + 30);
  return next;
}

export interface ServerSubscription {
  plan: string;
  billingCycle: string;
  startedAt: string;
  renewsAt: string;
}

/**
 * Activate (or extend) a paid plan for a device — server-authoritative.
 *
 * 1. Upserts ProgressSnapshot: plan column + payload merge
 *    { plan, planBillingCycle, planStartedAt, planRenewsAt }.
 *    The payload merge keeps every other backed-up field untouched.
 * 2. Returns the canonical subscription info (also stored in payload).
 *
 * Extending an existing paid plan: the new renewal is computed from NOW
 * (typical operator behaviour for a fresh charge) and planStartedAt is
 * moved forward accordingly — a renewal restarts the cycle.
 */
export async function activateServerPlan(
  deviceId: string,
  plan: string,
  billingCycle: string
): Promise<ServerSubscription> {
  if (!isValidPlan(plan) || !isValidCycle(billingCycle)) {
    throw new Error("Invalid plan or billing cycle");
  }

  const startedAt = new Date();
  const renewsAt = computeRenewal(startedAt, billingCycle);
  const planFields = {
    plan,
    planBillingCycle: billingCycle,
    planStartedAt: startedAt.toISOString(),
    planRenewsAt: renewsAt.toISOString(),
  };

  const existing = await db.progressSnapshot.findUnique({ where: { deviceId } });
  if (existing) {
    let payload: Record<string, unknown> = {};
    try {
      const parsed = JSON.parse(existing.payload);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        payload = parsed as Record<string, unknown>;
      }
    } catch {
      // Corrupt payload — start a fresh object, plan fields still written.
    }
    payload = { ...payload, ...planFields };
    // NOTE: only `plan` is a real column — the cycle/date fields live inside
    // the payload JSON (that's where the client pulls them from).
    await db.progressSnapshot.update({
      where: { deviceId },
      data: { plan, payload: JSON.stringify(payload) },
    });
  } else {
    // No snapshot yet (webhook before any cloud sync) — create a minimal one.
    await db.progressSnapshot.create({
      data: {
        deviceId,
        payload: JSON.stringify(planFields),
        streakDays: 0,
        xp: 0,
        plan,
      },
    });
  }

  return {
    plan,
    billingCycle,
    startedAt: startedAt.toISOString(),
    renewsAt: renewsAt.toISOString(),
  };
}

/**
 * Read the server-side subscription for a device (from its snapshot payload).
 * Returns null when the device is unknown or on the free plan.
 */
export async function getServerSubscription(
  deviceId: string
): Promise<ServerSubscription | null> {
  const snapshot = await db.progressSnapshot.findUnique({
    where: { deviceId },
    select: { plan: true, payload: true },
  });
  if (!snapshot) return null;

  let payload: Record<string, unknown> = {};
  try {
    const parsed = JSON.parse(snapshot.payload);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      payload = parsed as Record<string, unknown>;
    }
  } catch {
    return null;
  }

  if (snapshot.plan === "free" || !isValidPlan(snapshot.plan)) return null;
  const billingCycle = isValidCycle(payload.planBillingCycle)
    ? payload.planBillingCycle
    : "monthly";
  const startedAt =
    typeof payload.planStartedAt === "string" ? payload.planStartedAt : null;
  const renewsAt =
    typeof payload.planRenewsAt === "string" ? payload.planRenewsAt : null;
  if (!startedAt || !renewsAt) return null;

  return {
    plan: snapshot.plan,
    billingCycle,
    startedAt,
    renewsAt,
  };
}

/** Mask a phone number the same way the payment route does. */
export function maskPhone(phone: string): string {
  if (phone.length <= 4) return "****";
  return `${phone.slice(0, phone.length - 4).replace(/\d/g, "*")}${phone.slice(-4)}`;
}
