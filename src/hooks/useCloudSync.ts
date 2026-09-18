"use client";

import { useCallback, useEffect, useRef } from "react";
import { useStore } from "@/store/zerobet-store";
import { getDeviceId } from "@/lib/device";

/**
 * Zerobet 2.0 — useCloudSync
 *
 * Anonymous, opt-out cloud backup of the user's core recovery progress.
 * The app stays local-first: this hook pushes a JSON snapshot of the
 * persisted store to /api/progress whenever meaningful progress changes
 * (streak, check-in, journal, XP), debounced to avoid hammering the API.
 *
 * - deviceId: random ID kept in localStorage (no account needed)
 * - store.requestSync(): manual "Sync now" trigger (Settings screen)
 * - Sync status lives in the store (cloudSyncStatus) so any screen can read it.
 */

/** Fields backed up to the cloud (privacy-conscious subset, no chat content). */
function buildPayload(state: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  const keys = [
    "gender",
    "language",
    "name",
    "hasCompletedOnboarding",
    "quizAnswers",
    "addictionScore",
    "addictionLevel",
    "selectedGoals",
    "selectedSymptoms",
    "plan",
    "planBillingCycle",
    "planStartedAt",
    "planRenewsAt",
    "downgradeSurvey",
    "streakDays",
    "lastStreakDate",
    "streakHistory",
    "lastCheckInDate",
    "todayMood",
    "todayCraving",
    "xp",
    "level",
    "dailyQuests",
    "savingsGoals",
    "weeklyIncome",
    "weeklyExpenses",
    "savingsGoal",
    "weeklyBetAmount",
    "currency",
    "unlockedRanks",
    "celebratedMilestones",
    "meditationStreak",
    "articlesRead",
    "relapseHistory",
    "avatarColor",
  ];
  for (const k of keys) if (k in state) out[k] = state[k];
  return out;
}

export function useCloudSync() {
  const {
    hasCompletedOnboarding,
    streakDays,
    xp,
    plan,
    lastCheckInDate,
    journalEntries,
    setLastSyncAt,
    setCloudSyncStatus,
    syncRequestId,
  } = useStore();

  const syncingRef = useRef(false);

  const syncNow = useCallback(async (): Promise<boolean> => {
    if (syncingRef.current) return false;
    if (typeof window === "undefined") return false;
    syncingRef.current = true;
    setCloudSyncStatus("syncing");
    try {
      const deviceId = getDeviceId();
      const snapshot = buildPayload(
        useStore.getState() as unknown as Record<string, unknown>
      );
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId,
          payload: snapshot,
          streakDays: snapshot.streakDays,
          xp: snapshot.xp,
          plan: snapshot.plan,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data?.updatedAt) setLastSyncAt(data.updatedAt);
      setCloudSyncStatus("ok");
      return true;
    } catch {
      setCloudSyncStatus("error");
      return false;
    } finally {
      syncingRef.current = false;
    }
  }, [setCloudSyncStatus, setLastSyncAt]);

  // Zerobet 2.1.0 — Initial pull-before-push gate.
  // The first auto-sync used to run 4s after mount and OVERWRITE the server
  // snapshot with the (still free) local plan before the pull could restore a
  // webhook-activated plan — a race found in QA. Every push now awaits this
  // one-time pull first, so a server-activated plan lands BEFORE any push.
  const initialPullDoneRef = useRef(false);
  const initialPullPromiseRef = useRef<Promise<void> | null>(null);
  const ensureInitialPull = useCallback((): Promise<void> => {
    if (initialPullDoneRef.current) return Promise.resolve();
    if (!initialPullPromiseRef.current) {
      initialPullPromiseRef.current = (async () => {
        // Zerobet 2.1.0 — up to 4 attempts (dev servers compile routes lazily
        // and transient failures must not silently drop a paid-plan restore).
        for (let attempt = 0; attempt < 4; attempt++) {
          try {
            const deviceId = getDeviceId();
            if (!deviceId) return;
            const res = await fetch(
              `/api/progress?deviceId=${encodeURIComponent(deviceId)}`
            );
            if (res.status === 404) return; // no snapshot yet — nothing to pull
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = (await res.json()) as {
              plan?: unknown;
              snapshot?: Record<string, unknown>;
            };
            const serverPlan = data.plan;
            const state = useStore.getState() as unknown as { plan: string };
            if (
              typeof serverPlan === "string" &&
              serverPlan !== "free" &&
              state.plan === "free" // never downgrade a local paid plan
            ) {
              const snap =
                data.snapshot && typeof data.snapshot === "object"
                  ? data.snapshot
                  : {};
              const cycle =
                snap.planBillingCycle === "annual" ? "annual" : "monthly";
              const startedAt =
                typeof snap.planStartedAt === "string" ? snap.planStartedAt : null;
              const renewsAt =
                typeof snap.planRenewsAt === "string" ? snap.planRenewsAt : null;
              if (startedAt && renewsAt) {
                useStore.getState().applyServerPlan({
                  plan: serverPlan as "premium" | "mentor" | "psychologist",
                  planBillingCycle: cycle,
                  planStartedAt: startedAt,
                  planRenewsAt: renewsAt,
                });
              }
            }
            return; // one successful response ends the pull lifecycle
          } catch {
            // Transient failure — brief backoff, then retry.
            await new Promise((r) => setTimeout(r, 2500));
          }
        }
      })().finally(() => {
        initialPullDoneRef.current = true;
      });
    }
    return initialPullPromiseRef.current;
  }, []);

  // Auto-sync (debounced 4s) whenever meaningful progress changes.
  // The initial run awaits the server pull BEFORE the first push.
  useEffect(() => {
    if (!hasCompletedOnboarding) return;
    const timer = setTimeout(() => {
      void ensureInitialPull().then(() => syncNow());
    }, 4000);
    return () => clearTimeout(timer);
     
  }, [
    hasCompletedOnboarding,
    ensureInitialPull,
    streakDays,
    xp,
    plan,
    lastCheckInDate,
    journalEntries.length,
  ]);

  // Manual sync requested from the Settings screen.
  useEffect(() => {
    if (!hasCompletedOnboarding || syncRequestId === 0) return;
    void ensureInitialPull().then(() => syncNow());
     
  }, [syncRequestId, ensureInitialPull]);

  return { syncNow };
}
