/**
 * Zerobet 2.0.6 — Smart reminders engine (local notifications).
 *
 * Local-first reminder scheduler: evaluates which well-being reminders are
 * DUE right now based on the user's notification preferences, the local
 * clock, and their recovery state, then fires them as real Web
 * notifications via the service worker (see lib/pwa.showLocalNotification).
 *
 * Honest scope (no push server / VAPID yet): reminders fire while the app
 * is open or foregrounded — the hook re-checks on mount, every minute, and
 * on visibilitychange. Everything is deduplicated per-day in localStorage
 * so a reminder never repeats in the same day even across reloads.
 *
 * Channels honoured (NotificationPreferences, Task 13-c):
 *   - dailyReminder      → check-in nudge after dailyReminderTime if not done
 *   - cravingCheckin     → evening craving-hours check (20:00-23:00)
 *   - motivationalQuotes → one daily quote (reuses the 90 translated quotes)
 *   - weeklyReport       → Sunday morning weekly report nudge
 *   - silentHours        → suppresses everything during sleep hours
 */

import { showLocalNotification } from "./pwa";
import type { NotificationPreferences } from "@/store/zerobet-store";

export interface ReminderContext {
  prefs: NotificationPreferences;
  streakDays: number;
  /** Date.toDateString() of the last completed check-in (null = never). */
  lastCheckInDate: string | null;
  /** Translator bound to the user's language. */
  t: (key: string, params?: Record<string, string | number>) => string;
}

export interface DueReminder {
  id: string;
  title: string;
  body: string;
}

const LOG_KEY = "zerobet-reminders-sent";

// ---------- localStorage dedup log ----------

function readLog(): Record<string, true> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LOG_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, true>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function markSent(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const log = readLog();
    log[id] = true;
    // Keep the log small: drop entries older than 8 days
    const cutoff = Date.now() - 8 * 86400000;
    const cleaned: Record<string, true> = {};
    for (const [k] of Object.entries(log)) {
      const m = k.match(/(\d{4}-\d{2}-\d{2})/);
      if (!m || new Date(`${m[1]}T12:00:00`).getTime() >= cutoff) cleaned[k] = true;
    }
    cleaned[id] = true;
    localStorage.setItem(LOG_KEY, JSON.stringify(cleaned));
  } catch {
    /* private mode — reminders will re-fire, acceptable */
  }
}

function wasSent(id: string): boolean {
  return Boolean(readLog()[id]);
}

// ---------- time helpers ----------

function parseHM(time: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(time?.trim() ?? "");
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

/** True if `now` falls inside the configured silent window (overnight-safe). */
export function isInSilentHours(prefs: NotificationPreferences, now: Date): boolean {
  if (!prefs.silentHours) return false;
  const start = parseHM(prefs.silentHoursStart);
  const end = parseHM(prefs.silentHoursEnd);
  if (start === null || end === null) return false;
  const cur = now.getHours() * 60 + now.getMinutes();
  if (start === end) return false; // zero-length window = disabled
  if (start < end) return cur >= start && cur < end;
  // Overnight window (e.g. 22:00 → 07:00)
  return cur >= start || cur < end;
}

function dayKey(now: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

function weekKey(now: Date): string {
  // ISO-ish week id — good enough for a once-per-Sunday dedup
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayNum = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - dayNum + 3); // nearest Thursday
  const firstThursday = new Date(d.getFullYear(), 0, 4);
  const week =
    1 +
    Math.round(
      ((d.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getDay() + 6) % 7)) / 7
    );
  return `${d.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

/** Stable pseudo-random quote of the day (1-90) — same quote all day. */
function quoteOfTheDay(now: Date): number {
  const seed = Number(dayKey(now).replace(/-/g, ""));
  return (seed % 90) + 1;
}

// ---------- core evaluation ----------

/**
 * Returns the list of reminders that should fire right now.
 * Pure (no side effects) so it is trivially testable.
 */
export function computeDueReminders(ctx: ReminderContext, now: Date = new Date()): DueReminder[] {
  const due: DueReminder[] = [];
  const { prefs, t } = ctx;

  if (isInSilentHours(prefs, now)) return due;

  const today = dayKey(now);
  const minutes = now.getHours() * 60 + now.getMinutes();
  const checkedInToday = ctx.lastCheckInDate === now.toDateString();

  // 1. Daily check-in reminder (after the configured time, if not done today)
  if (prefs.dailyReminder && !checkedInToday) {
    const at = parseHM(prefs.dailyReminderTime);
    if (at !== null && minutes >= at) {
      const id = `checkin-${today}`;
      if (!wasSent(id)) {
        due.push({
          id,
          title: t("reminderCheckinTitle"),
          body: t("reminderCheckinBody", { n: Math.max(ctx.streakDays, 0) }),
        });
      }
    }
  }

  // 2. Evening craving-hours check (20:00 - 23:00), if not checked in today
  if (prefs.cravingCheckin && !checkedInToday && minutes >= 20 * 60 && minutes <= 23 * 60) {
    const id = `craving-${today}`;
    if (!wasSent(id)) {
      due.push({
        id,
        title: t("reminderCravingTitle"),
        body: t("reminderCravingBody"),
      });
    }
  }

  // 3. Daily motivational quote (after 18:00, for users who checked in)
  if (prefs.motivationalQuotes && checkedInToday && minutes >= 18 * 60) {
    const id = `quote-${today}`;
    if (!wasSent(id)) {
      const n = quoteOfTheDay(now);
      due.push({
        id,
        title: t("reminderQuoteTitle"),
        body: `« ${t(`programQuote${n}Text`)} » — ${t(`programQuote${n}Author`)}`,
      });
    }
  }

  // 4. Weekly report nudge (Sunday from 09:00)
  if (prefs.weeklyReport && now.getDay() === 0 && minutes >= 9 * 60) {
    const id = `weekly-${weekKey(now)}`;
    if (!wasSent(id)) {
      due.push({
        id,
        title: t("reminderWeeklyTitle"),
        body: t("reminderWeeklyBody"),
      });
    }
  }

  return due;
}

/**
 * Evaluate + fire due reminders. Returns how many notifications were sent.
 * Never throws — a failing notification backend must not break the app.
 */
export async function runReminderCheck(ctx: ReminderContext, now: Date = new Date()): Promise<number> {
  let sent = 0;
  try {
    const due = computeDueReminders(ctx, now);
    for (const r of due) {
      await showLocalNotification(r.title, r.body);
      markSent(r.id);
      sent += 1;
    }
  } catch {
    return 0;
  }
  return sent;
}
