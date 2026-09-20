module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: [
        'query'
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
"[project]/src/lib/monitoring/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
 */ __turbopack_context__.s([
    "logger",
    ()=>logger
]);
const isDev = ("TURBOPACK compile-time value", "development") !== "production";
// In-memory log buffer for recent errors (last 100)
const errorBuffer = [];
const MAX_BUFFER = 100;
function formatLog(level, message, meta) {
    return {
        level,
        message,
        timestamp: new Date().toISOString(),
        ...meta
    };
}
function emit(entry) {
    if (entry.level === "error") {
        errorBuffer.push(entry);
        if (errorBuffer.length > MAX_BUFFER) errorBuffer.shift();
    }
    if ("TURBOPACK compile-time truthy", 1) {
        const color = {
            debug: "\x1b[36m",
            info: "\x1b[32m",
            warn: "\x1b[33m",
            error: "\x1b[31m"
        }[entry.level];
        const reset = "\x1b[0m";
        const metaStr = Object.keys(entry).filter((k)=>![
                "level",
                "message",
                "timestamp"
            ].includes(k)).map((k)=>`${k}=${JSON.stringify(entry[k])}`).join(" ");
        console.log(`${color}[${entry.level.toUpperCase()}]${reset} ${entry.message} ${metaStr ? `· ${metaStr}` : ""}`);
    } else //TURBOPACK unreachable
    ;
}
const logger = {
    debug (message, meta) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        emit(formatLog("debug", message, meta));
    },
    info (message, meta) {
        emit(formatLog("info", message, meta));
    },
    warn (message, meta) {
        emit(formatLog("warn", message, meta));
    },
    error (message, error, meta) {
        const errorMeta = error instanceof Error ? {
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack
        } : error ? {
            error: String(error)
        } : {};
        emit(formatLog("error", message, {
            ...errorMeta,
            ...meta
        }));
    },
    /** Get recent errors (for debugging / admin panel) */ getRecentErrors () {
        return [
            ...errorBuffer
        ];
    },
    /** Clear error buffer */ clearErrors () {
        errorBuffer.length = 0;
    }
};
}),
"[project]/src/app/api/progress/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/monitoring/logger.ts [app-route] (ecmascript)");
;
;
;
/**
 * Zerobet 2.0 — Cloud progress sync.
 *
 * The app is local-first (Zustand + localStorage). This endpoint lets any
 * anonymous device back up its core recovery progress so it survives a
 * phone loss / app reinstall. No account required — a random deviceId is
 * generated client-side and kept in localStorage.
 *
 * POST /api/progress  { deviceId, payload, streakDays, xp, plan }
 * GET  /api/progress?deviceId=...
 */ const MAX_PAYLOAD_SIZE = 80 * 1024; // 80KB JSON snapshot cap
function isValidDeviceId(id) {
    return typeof id === "string" && /^[a-zA-Z0-9_-]{8,64}$/.test(id);
}
async function GET(req) {
    try {
        const deviceId = req.nextUrl.searchParams.get("deviceId");
        if (!isValidDeviceId(deviceId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid deviceId"
            }, {
                status: 400
            });
        }
        const snapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].progressSnapshot.findUnique({
            where: {
                deviceId
            },
            select: {
                payload: true,
                streakDays: true,
                xp: true,
                plan: true,
                updatedAt: true
            }
        });
        if (!snapshot) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Not found"
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            deviceId,
            snapshot: JSON.parse(snapshot.payload),
            streakDays: snapshot.streakDays,
            xp: snapshot.xp,
            plan: snapshot.plan,
            updatedAt: snapshot.updatedAt
        });
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Progress GET error", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal error"
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const body = await req.json().catch(()=>null);
        if (!body || typeof body !== "object") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid body"
            }, {
                status: 400
            });
        }
        const { deviceId, payload, streakDays, xp, plan } = body;
        if (!isValidDeviceId(deviceId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid deviceId"
            }, {
                status: 400
            });
        }
        const payloadStr = typeof payload === "string" ? payload : JSON.stringify(payload ?? {});
        if (payloadStr.length > MAX_PAYLOAD_SIZE) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Payload too large"
            }, {
                status: 413
            });
        }
        const safeStreak = Math.max(0, Math.min(36500, Number(streakDays) || 0));
        const safeXp = Math.max(0, Math.min(10_000_000, Number(xp) || 0));
        const safePlan = plan === "premium" || plan === "mentor" || plan === "psychologist" ? plan : "free";
        const snapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].progressSnapshot.upsert({
            where: {
                deviceId
            },
            create: {
                deviceId,
                payload: payloadStr,
                streakDays: safeStreak,
                xp: safeXp,
                plan: safePlan
            },
            update: {
                payload: payloadStr,
                streakDays: safeStreak,
                xp: safeXp,
                plan: safePlan
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            updatedAt: snapshot.updatedAt
        });
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("Progress POST error", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__70a6c860._.js.map