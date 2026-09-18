/**
 * Lightweight logging utility for Zerobet.
 *
 * In development: logs to console with colors.
 * In production: logs to console (can be extended to send to
 * a monitoring service like Sentry, Datadog, or LogRocket).
 *
 * Usage:
 *   import { logger } from "@/lib/monitoring/logger";
 *   logger.info("User signed in", { userId });
 *   logger.warn("Rate limit hit", { ip, endpoint });
 *   logger.error("API error", error, { endpoint, userId });
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  [key: string]: unknown;
}

const isDev = process.env.NODE_ENV !== "production";

// In-memory log buffer for recent errors (last 100)
const errorBuffer: LogEntry[] = [];
const MAX_BUFFER = 100;

function formatLog(level: LogLevel, message: string, meta?: Record<string, unknown>): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };
}

function emit(entry: LogEntry) {
  if (entry.level === "error") {
    errorBuffer.push(entry);
    if (errorBuffer.length > MAX_BUFFER) errorBuffer.shift();
  }

  if (isDev) {
    const color = {
      debug: "\x1b[36m", // cyan
      info: "\x1b[32m",  // green
      warn: "\x1b[33m",  // yellow
      error: "\x1b[31m", // red
    }[entry.level];
    const reset = "\x1b[0m";
    const metaStr = Object.keys(entry)
      .filter((k) => !["level", "message", "timestamp"].includes(k))
      .map((k) => `${k}=${JSON.stringify(entry[k])}`)
      .join(" ");
    console.log(`${color}[${entry.level.toUpperCase()}]${reset} ${entry.message} ${metaStr ? `· ${metaStr}` : ""}`);
  } else {
    // In production, output JSON for log aggregators
    console.log(JSON.stringify(entry));
  }
}

export const logger = {
  debug(message: string, meta?: Record<string, unknown>) {
    if (!isDev) return;
    emit(formatLog("debug", message, meta));
  },

  info(message: string, meta?: Record<string, unknown>) {
    emit(formatLog("info", message, meta));
  },

  warn(message: string, meta?: Record<string, unknown>) {
    emit(formatLog("warn", message, meta));
  },

  error(message: string, error?: unknown, meta?: Record<string, unknown>) {
    const errorMeta = error instanceof Error
      ? { errorName: error.name, errorMessage: error.message, errorStack: error.stack }
      : error ? { error: String(error) } : {};
    emit(formatLog("error", message, { ...errorMeta, ...meta }));
  },

  /** Get recent errors (for debugging / admin panel) */
  getRecentErrors(): LogEntry[] {
    return [...errorBuffer];
  },

  /** Clear error buffer */
  clearErrors() {
    errorBuffer.length = 0;
  },
};
