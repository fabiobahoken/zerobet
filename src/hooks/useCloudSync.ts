"use client";

import { useCallback, useEffect, useRef } from "react";
import { useStore } from "@/store/zerobet-store";

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

const DEVICE_ID_KEY = "zerobet-device-id";

function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id || !/^[a-zA-Z0-9_-]{8,64}$/.test(id)) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 32)
        : `dev${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

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

  // Auto-sync (debounced 4s) whenever meaningful progress changes.
  useEffect(() => {
    if (!hasCompletedOnboarding) return;
    const timer = setTimeout(() => {
      void syncNow();
    }, 4000);
    return () => clearTimeout(timer);
     
  }, [
    hasCompletedOnboarding,
    streakDays,
    xp,
    plan,
    lastCheckInDate,
    journalEntries.length,
  ]);

  // Manual sync requested from the Settings screen.
  useEffect(() => {
    if (!hasCompletedOnboarding || syncRequestId === 0) return;
    void syncNow();
     
  }, [syncRequestId]);

  return { syncNow };
}
