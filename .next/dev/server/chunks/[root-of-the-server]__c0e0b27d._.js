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
"[project]/src/lib/subscription.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activateServerPlan",
    ()=>activateServerPlan,
    "computeRenewal",
    ()=>computeRenewal,
    "getServerSubscription",
    ()=>getServerSubscription,
    "isValidCycle",
    ()=>isValidCycle,
    "isValidPlan",
    ()=>isValidPlan,
    "maskPhone",
    ()=>maskPhone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
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
 */ const VALID_PLANS = new Set([
    "premium",
    "mentor",
    "psychologist"
]);
const VALID_CYCLES = new Set([
    "monthly",
    "annual"
]);
function isValidPlan(p) {
    return typeof p === "string" && VALID_PLANS.has(p);
}
function isValidCycle(c) {
    return typeof c === "string" && VALID_CYCLES.has(c);
}
function computeRenewal(from, billingCycle) {
    const next = new Date(from);
    if (billingCycle === "annual") next.setFullYear(next.getFullYear() + 1);
    else next.setDate(next.getDate() + 30);
    return next;
}
async function activateServerPlan(deviceId, plan, billingCycle) {
    if (!isValidPlan(plan) || !isValidCycle(billingCycle)) {
        throw new Error("Invalid plan or billing cycle");
    }
    const startedAt = new Date();
    const renewsAt = computeRenewal(startedAt, billingCycle);
    const planFields = {
        plan,
        planBillingCycle: billingCycle,
        planStartedAt: startedAt.toISOString(),
        planRenewsAt: renewsAt.toISOString()
    };
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].progressSnapshot.findUnique({
        where: {
            deviceId
        }
    });
    if (existing) {
        let payload = {};
        try {
            const parsed = JSON.parse(existing.payload);
            if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                payload = parsed;
            }
        } catch  {
        // Corrupt payload — start a fresh object, plan fields still written.
        }
        payload = {
            ...payload,
            ...planFields
        };
        // NOTE: only `plan` is a real column — the cycle/date fields live inside
        // the payload JSON (that's where the client pulls them from).
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].progressSnapshot.update({
            where: {
                deviceId
            },
            data: {
                plan,
                payload: JSON.stringify(payload)
            }
        });
    } else {
        // No snapshot yet (webhook before any cloud sync) — create a minimal one.
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].progressSnapshot.create({
            data: {
                deviceId,
                payload: JSON.stringify(planFields),
                streakDays: 0,
                xp: 0,
                plan
            }
        });
    }
    return {
        plan,
        billingCycle,
        startedAt: startedAt.toISOString(),
        renewsAt: renewsAt.toISOString()
    };
}
async function getServerSubscription(deviceId) {
    const snapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].progressSnapshot.findUnique({
        where: {
            deviceId
        },
        select: {
            plan: true,
            payload: true
        }
    });
    if (!snapshot) return null;
    let payload = {};
    try {
        const parsed = JSON.parse(snapshot.payload);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            payload = parsed;
        }
    } catch  {
        return null;
    }
    if (snapshot.plan === "free" || !isValidPlan(snapshot.plan)) return null;
    const billingCycle = isValidCycle(payload.planBillingCycle) ? payload.planBillingCycle : "monthly";
    const startedAt = typeof payload.planStartedAt === "string" ? payload.planStartedAt : null;
    const renewsAt = typeof payload.planRenewsAt === "string" ? payload.planRenewsAt : null;
    if (!startedAt || !renewsAt) return null;
    return {
        plan: snapshot.plan,
        billingCycle,
        startedAt,
        renewsAt
    };
}
function maskPhone(phone) {
    if (phone.length <= 4) return "****";
    return `${phone.slice(0, phone.length - 4).replace(/\d/g, "*")}${phone.slice(-4)}`;
}
}),
"[project]/src/app/api/payment/history/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$subscription$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/subscription.ts [app-route] (ecmascript)");
;
;
;
async function GET(req) {
    try {
        const deviceId = req.nextUrl.searchParams.get("deviceId") || "";
        if (!/^[a-zA-Z0-9_-]{8,64}$/.test(deviceId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid deviceId"
            }, {
                status: 400
            });
        }
        const [payments, subscription] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].payment.findMany({
                where: {
                    deviceId
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 50,
                select: {
                    id: true,
                    plan: true,
                    billingCycle: true,
                    operator: true,
                    phone: true,
                    amount: true,
                    currency: true,
                    status: true,
                    failReason: true,
                    createdAt: true,
                    updatedAt: true
                }
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$subscription$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSubscription"])(deviceId)
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            payments,
            subscription
        });
    } catch (err) {
        console.error("[payment/history] GET error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c0e0b27d._.js.map