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
"[project]/src/app/api/csp-report/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/monitoring/logger.ts [app-route] (ecmascript)");
;
;
async function POST(req) {
    try {
        const body = await req.json();
        // CSP reports can be large — only log the essential fields
        const report = body?.["csp-report"] || body;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn("CSP violation", {
            documentUri: report?.["document-uri"]?.slice(0, 200),
            violatedDirective: report?.["violated-directive"]?.slice(0, 100),
            blockedUri: report?.["blocked-uri"]?.slice(0, 200),
            sourceFile: report?.["source-file"]?.slice(0, 200),
            lineNumber: report?.["line-number"]
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    } catch  {
        // Don't error on malformed reports
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__feddef5f._.js.map