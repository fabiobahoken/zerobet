(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/data/affirmations-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORY_META",
    ()=>CATEGORY_META,
    "CATEGORY_ORDER",
    ()=>CATEGORY_ORDER,
    "SEED_AFFIRMATIONS",
    ()=>SEED_AFFIRMATIONS,
    "getDailyAffirmation",
    ()=>getDailyAffirmation,
    "getRandomAffirmation",
    ()=>getRandomAffirmation
]);
const CATEGORY_META = {
    morning: {
        label: "Matin",
        emoji: "🌅",
        color: "#F59E0B",
        description: "Pour démarrer la journée du bon pied",
        gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
    },
    crisis: {
        label: "Crise",
        emoji: "🆘",
        color: "#FF3B30",
        description: "Quand l'envie devient forte",
        gradient: "linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)"
    },
    "self-worth": {
        label: "Valeur personnelle",
        emoji: "💎",
        color: "#FFD166",
        description: "Te rappeler qui tu es",
        gradient: "linear-gradient(135deg, #FFD166 0%, #FF2D55 100%)"
    },
    future: {
        label: "Avenir",
        emoji: "🚀",
        color: "#FFB020",
        description: "Visualiser la vie que tu construis",
        gradient: "linear-gradient(135deg, #FFB020 0%, #FFB020 100%)"
    },
    gratitude: {
        label: "Gratitude",
        emoji: "🙏",
        color: "#FFC94D",
        description: "Reconnaître le positif",
        gradient: "linear-gradient(135deg, #FFC94D 0%, #FFB020 100%)"
    },
    strength: {
        label: "Force",
        emoji: "💪",
        color: "#FBBF24",
        description: "Puiser dans ta puissance",
        gradient: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)"
    }
};
const CATEGORY_ORDER = [
    "morning",
    "crisis",
    "self-worth",
    "future",
    "gratitude",
    "strength"
];
const SEED_AFFIRMATIONS = [
    // ---------- Morning (10) ----------
    {
        id: "aff-m-1",
        textKey: "affirmation1Text",
        category: "morning",
        isCustom: false
    },
    {
        id: "aff-m-2",
        textKey: "affirmation2Text",
        category: "morning",
        isCustom: false
    },
    {
        id: "aff-m-3",
        textKey: "affirmation3Text",
        category: "morning",
        isCustom: false
    },
    {
        id: "aff-m-4",
        textKey: "affirmation4Text",
        category: "morning",
        isCustom: false
    },
    {
        id: "aff-m-5",
        textKey: "affirmation5Text",
        category: "morning",
        isCustom: false
    },
    {
        id: "aff-m-6",
        textKey: "affirmation6Text",
        category: "morning",
        isCustom: false
    },
    {
        id: "aff-m-7",
        textKey: "affirmation7Text",
        category: "morning",
        isCustom: false
    },
    {
        id: "aff-m-8",
        textKey: "affirmation8Text",
        category: "morning",
        isCustom: false
    },
    {
        id: "aff-m-9",
        textKey: "affirmation9Text",
        category: "morning",
        isCustom: false
    },
    {
        id: "aff-m-10",
        textKey: "affirmation10Text",
        category: "morning",
        isCustom: false
    },
    // ---------- Crisis (10) ----------
    {
        id: "aff-c-1",
        textKey: "affirmation11Text",
        category: "crisis",
        isCustom: false
    },
    {
        id: "aff-c-2",
        textKey: "affirmation12Text",
        category: "crisis",
        isCustom: false
    },
    {
        id: "aff-c-3",
        textKey: "affirmation13Text",
        category: "crisis",
        isCustom: false
    },
    {
        id: "aff-c-4",
        textKey: "affirmation14Text",
        category: "crisis",
        isCustom: false
    },
    {
        id: "aff-c-5",
        textKey: "affirmation15Text",
        category: "crisis",
        isCustom: false
    },
    {
        id: "aff-c-6",
        textKey: "affirmation16Text",
        category: "crisis",
        isCustom: false
    },
    {
        id: "aff-c-7",
        textKey: "affirmation17Text",
        category: "crisis",
        isCustom: false
    },
    {
        id: "aff-c-8",
        textKey: "affirmation18Text",
        category: "crisis",
        isCustom: false
    },
    {
        id: "aff-c-9",
        textKey: "affirmation19Text",
        category: "crisis",
        isCustom: false
    },
    {
        id: "aff-c-10",
        textKey: "affirmation20Text",
        category: "crisis",
        isCustom: false
    },
    // ---------- Self-worth (10) ----------
    {
        id: "aff-sw-1",
        textKey: "affirmation21Text",
        category: "self-worth",
        isCustom: false
    },
    {
        id: "aff-sw-2",
        textKey: "affirmation22Text",
        category: "self-worth",
        isCustom: false
    },
    {
        id: "aff-sw-3",
        textKey: "affirmation23Text",
        category: "self-worth",
        isCustom: false
    },
    {
        id: "aff-sw-4",
        textKey: "affirmation24Text",
        category: "self-worth",
        isCustom: false
    },
    {
        id: "aff-sw-5",
        textKey: "affirmation25Text",
        category: "self-worth",
        isCustom: false
    },
    {
        id: "aff-sw-6",
        textKey: "affirmation26Text",
        category: "self-worth",
        isCustom: false
    },
    {
        id: "aff-sw-7",
        textKey: "affirmation27Text",
        category: "self-worth",
        isCustom: false
    },
    {
        id: "aff-sw-8",
        textKey: "affirmation28Text",
        category: "self-worth",
        isCustom: false
    },
    {
        id: "aff-sw-9",
        textKey: "affirmation29Text",
        category: "self-worth",
        isCustom: false
    },
    {
        id: "aff-sw-10",
        textKey: "affirmation30Text",
        category: "self-worth",
        isCustom: false
    },
    // ---------- Future (10) ----------
    {
        id: "aff-f-1",
        textKey: "affirmation31Text",
        category: "future",
        isCustom: false
    },
    {
        id: "aff-f-2",
        textKey: "affirmation32Text",
        category: "future",
        isCustom: false
    },
    {
        id: "aff-f-3",
        textKey: "affirmation33Text",
        category: "future",
        isCustom: false
    },
    {
        id: "aff-f-4",
        textKey: "affirmation34Text",
        category: "future",
        isCustom: false
    },
    {
        id: "aff-f-5",
        textKey: "affirmation35Text",
        category: "future",
        isCustom: false
    },
    {
        id: "aff-f-6",
        textKey: "affirmation36Text",
        category: "future",
        isCustom: false
    },
    {
        id: "aff-f-7",
        textKey: "affirmation37Text",
        category: "future",
        isCustom: false
    },
    {
        id: "aff-f-8",
        textKey: "affirmation38Text",
        category: "future",
        isCustom: false
    },
    {
        id: "aff-f-9",
        textKey: "affirmation39Text",
        category: "future",
        isCustom: false
    },
    {
        id: "aff-f-10",
        textKey: "affirmation40Text",
        category: "future",
        isCustom: false
    },
    // ---------- Gratitude (10) ----------
    {
        id: "aff-g-1",
        textKey: "affirmation41Text",
        category: "gratitude",
        isCustom: false
    },
    {
        id: "aff-g-2",
        textKey: "affirmation42Text",
        category: "gratitude",
        isCustom: false
    },
    {
        id: "aff-g-3",
        textKey: "affirmation43Text",
        category: "gratitude",
        isCustom: false
    },
    {
        id: "aff-g-4",
        textKey: "affirmation44Text",
        category: "gratitude",
        isCustom: false
    },
    {
        id: "aff-g-5",
        textKey: "affirmation45Text",
        category: "gratitude",
        isCustom: false
    },
    {
        id: "aff-g-6",
        textKey: "affirmation46Text",
        category: "gratitude",
        isCustom: false
    },
    {
        id: "aff-g-7",
        textKey: "affirmation47Text",
        category: "gratitude",
        isCustom: false
    },
    {
        id: "aff-g-8",
        textKey: "affirmation48Text",
        category: "gratitude",
        isCustom: false
    },
    {
        id: "aff-g-9",
        textKey: "affirmation49Text",
        category: "gratitude",
        isCustom: false
    },
    {
        id: "aff-g-10",
        textKey: "affirmation50Text",
        category: "gratitude",
        isCustom: false
    },
    // ---------- Strength (10) ----------
    {
        id: "aff-s-1",
        textKey: "affirmation51Text",
        category: "strength",
        isCustom: false
    },
    {
        id: "aff-s-2",
        textKey: "affirmation52Text",
        category: "strength",
        isCustom: false
    },
    {
        id: "aff-s-3",
        textKey: "affirmation53Text",
        category: "strength",
        isCustom: false
    },
    {
        id: "aff-s-4",
        textKey: "affirmation54Text",
        category: "strength",
        isCustom: false
    },
    {
        id: "aff-s-5",
        textKey: "affirmation55Text",
        category: "strength",
        isCustom: false
    },
    {
        id: "aff-s-6",
        textKey: "affirmation56Text",
        category: "strength",
        isCustom: false
    },
    {
        id: "aff-s-7",
        textKey: "affirmation57Text",
        category: "strength",
        isCustom: false
    },
    {
        id: "aff-s-8",
        textKey: "affirmation58Text",
        category: "strength",
        isCustom: false
    },
    {
        id: "aff-s-9",
        textKey: "affirmation59Text",
        category: "strength",
        isCustom: false
    },
    {
        id: "aff-s-10",
        textKey: "affirmation60Text",
        category: "strength",
        isCustom: false
    }
];
function getDailyAffirmation(seed = SEED_AFFIRMATIONS, now = new Date()) {
    if (seed.length === 0) {
        return {
            id: "fallback",
            textKey: "affirmation1Text",
            category: "morning",
            isCustom: false
        };
    }
    const dayIndex = Math.floor(now.getTime() / 86_400_000);
    const idx = (dayIndex % seed.length + seed.length) % seed.length;
    return seed[idx];
}
function getRandomAffirmation(seed = SEED_AFFIRMATIONS, excludeId) {
    if (seed.length === 0) {
        return {
            id: "fallback",
            textKey: "affirmation1Text",
            category: "morning",
            isCustom: false
        };
    }
    const pool = excludeId ? seed.filter((a)=>a.id !== excludeId) : seed;
    const list = pool.length > 0 ? pool : seed;
    const idx = Math.floor(Math.random() * list.length);
    return list[idx];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/zerobet/components/EmptyState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyState",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const VARIANT_CONFIG = {
    journal: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
        emoji: "📝",
        gradient: "linear-gradient(135deg, #FF6B00 0%, #FFB020 100%)",
        glow: "glow-green",
        titleKey: "emptyStateJournalTitle",
        descKey: "emptyStateJournalDesc",
        ctaKey: "emptyStateJournalCta"
    },
    community: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        emoji: "💬",
        gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
        glow: "glow-yellow",
        titleKey: "emptyStateCommunityTitle",
        descKey: "emptyStateCommunityDesc",
        ctaKey: "emptyStateCommunityCta"
    },
    stats: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
        emoji: "📊",
        gradient: "linear-gradient(135deg, #FF6B00 0%, #FFB020 100%)",
        glow: "glow-green",
        titleKey: "emptyStateStatsTitle",
        descKey: "emptyStateStatsDesc",
        ctaKey: "emptyStateStatsCta"
    },
    default: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
        emoji: "✨",
        gradient: "linear-gradient(135deg, #FFB020 0%, #FF6B00 100%)",
        glow: "glow-green",
        titleKey: "emptyStateDefaultTitle",
        descKey: "emptyStateDefaultDesc",
        ctaKey: "emptyStateDefaultCta"
    }
};
function EmptyState({ variant = "default", title, description, ctaLabel, onCta, hideCta = false, className = "", compact = false }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const cfg = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.default;
    const Icon = cfg.icon;
    const finalTitle = title ?? t(cfg.titleKey);
    const finalDescription = description ?? t(cfg.descKey);
    const finalCta = ctaLabel ?? (cfg.ctaKey ? t(cfg.ctaKey) : undefined);
    const showCta = !hideCta && (finalCta || onCta);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 12
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 24
        },
        className: `flex flex-col items-center justify-center text-center ${compact ? "py-8" : "py-16"} ${className}`,
        role: "status",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: compact ? undefined : {
                    y: [
                        0,
                        -8,
                        0
                    ]
                },
                transition: compact ? undefined : {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                className: `relative mb-5 ${compact ? "" : cfg.glow}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        className: "absolute inset-0 rounded-full blur-2xl opacity-30",
                        style: {
                            background: cfg.gradient
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-20 h-20 rounded-3xl flex items-center justify-center",
                        style: {
                            background: cfg.gradient,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 36,
                            className: "text-white",
                            strokeWidth: 1.8
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            scale: 0
                        },
                        animate: {
                            scale: 1
                        },
                        transition: {
                            type: "spring",
                            stiffness: 200,
                            damping: 14,
                            delay: 0.2
                        },
                        className: "absolute -bottom-1.5 -right-1.5 w-9 h-9 rounded-full glass-card-strong flex items-center justify-center text-lg border border-white/10",
                        children: cfg.emoji
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-white font-semibold text-base font-[family-name:var(--font-poppins)] mb-1.5",
                children: finalTitle
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/55 text-sm leading-relaxed mb-6 max-w-xs",
                children: finalDescription
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            showCta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                whileTap: {
                    scale: 0.96
                },
                onClick: onCta,
                className: "px-6 py-3 rounded-2xl gradient-primary text-white font-medium text-sm glow-green flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this),
                    finalCta ?? t("emptyStateDefaultCta")
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
                lineNumber: 161,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(EmptyState, "uZyfTDL5l50aWwhHvO0Py2n2h8Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c = EmptyState;
var _c;
__turbopack_context__.k.register(_c, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/animations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "containerVariants",
    ()=>containerVariants,
    "fadeIn",
    ()=>fadeIn,
    "itemVariants",
    ()=>itemVariants,
    "scaleIn",
    ()=>scaleIn,
    "slideInLeft",
    ()=>slideInLeft,
    "slideInRight",
    ()=>slideInRight
]);
const containerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};
const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    }
};
const slideInLeft = {
    hidden: {
        opacity: 0,
        x: -30
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 200
        }
    }
};
const slideInRight = {
    hidden: {
        opacity: 0,
        x: 30
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 200
        }
    }
};
const scaleIn = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15
        }
    }
};
const fadeIn = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/zerobet/screens/AffirmationsScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AffirmationsScreen",
    ()=>AffirmationsScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lightbulb.js [app-client] (ecmascript) <export default as Lightbulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/quote.js [app-client] (ecmascript) <export default as Quote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wind.js [app-client] (ecmascript) <export default as Wind>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/zerobet-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/affirmations-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/EmptyState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/haptics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/animations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
/** Returns a localized long-form date like "Jeudi 18 juin". */ function formatDate(date, lang) {
    const locale = lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "fr-FR";
    try {
        return new Intl.DateTimeFormat(locale, {
            weekday: "long",
            day: "numeric",
            month: "long"
        }).format(date).replace(/^\w/, (c)=>c.toUpperCase());
    } catch  {
        return date.toLocaleDateString();
    }
}
/** Merge seed + custom affirmations. Custom first so users see their own on top. */ function mergeAffirmations(seed, custom) {
    return [
        ...custom,
        ...seed
    ];
}
/** Filter by active category. */ function filterAffirmations(list, cat) {
    if (cat === "all") return list;
    return list.filter((a)=>a.category === cat);
}
/** Share text + clipboard fallback. */ async function shareAffirmation(aff, t) {
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_META"][aff.category];
    const text = `"${t(aff.textKey)}"\n\n${meta.emoji} · Zerobet`;
    try {
        if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
            await navigator.share({
                title: "Zerobet — Affirmation",
                text
            });
            return;
        }
    } catch  {
    /* fall through to clipboard */ }
    try {
        if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
            await navigator.clipboard.writeText(text);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t("affirmationsToastCopied"));
            return;
        }
    } catch  {
    /* noop */ }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t("affirmationsToastShareErr"));
}
/* ========================================================================
   Sub-components
   ======================================================================== */ function CategoryBadge({ category, size = "md" }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_META"][category];
    const labelKey = category === "morning" ? "affirmationsCatMorning" : category === "crisis" ? "affirmationsCatCrisis" : category === "self-worth" ? "affirmationsCatSelfWorth" : category === "future" ? "affirmationsCatFuture" : category === "gratitude" ? "affirmationsCatGratitude" : "affirmationsCatStrength";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-1 rounded-full font-medium ${size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"}`,
        style: {
            background: `${meta.color}22`,
            color: meta.color,
            border: `1px solid ${meta.color}55`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                children: meta.emoji
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            t(labelKey)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
_s(CategoryBadge, "uZyfTDL5l50aWwhHvO0Py2n2h8Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c = CategoryBadge;
function FilterPill({ label, emoji, count, active, color, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        whileTap: {
            scale: 0.96
        },
        onClick: onClick,
        className: `relative shrink-0 px-3.5 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${active ? "text-white" : "glass-pill text-white/60 hover:text-white/80"}`,
        style: active && color ? {
            background: color,
            boxShadow: `0 0 24px ${color}66, 0 0 48px ${color}33`
        } : active ? {
            background: "linear-gradient(135deg, #FF3B30 0%, #F59E0B 100%)"
        } : undefined,
        "aria-pressed": active,
        children: [
            emoji && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                children: emoji
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 192,
                columnNumber: 17
            }, this),
            label,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `ml-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${active ? "bg-white/25" : "bg-white/10 text-white/60"}`,
                children: count
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
_c1 = FilterPill;
function AffirmationCard({ affirmation, isFavorite, onToggleFavorite, onDelete, index }) {
    _s1();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_META"][affirmation.category];
    const [confirmingDelete, setConfirmingDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleDeleteClick = ()=>{
        if (!onDelete) return;
        if (!confirmingDelete) {
            setConfirmingDelete(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
            // Auto-clear after 3s
            window.setTimeout(()=>setConfirmingDelete(false), 3000);
            return;
        }
        onDelete();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
        custom: index,
        initial: "hidden",
        animate: "visible",
        transition: {
            delay: Math.min(index * 0.04, 0.4)
        },
        className: "glass-card card-hover p-4 relative break-inside-avoid mb-3",
        style: {
            borderLeft: `4px solid ${meta.color}`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                className: "absolute top-3 right-3 text-lg opacity-70",
                children: meta.emoji
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onToggleFavorite,
                className: "absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors",
                "aria-label": isFavorite ? t("affirmationsAriaRemoveFav") : t("affirmationsAriaAddFav"),
                "aria-pressed": isFavorite,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                    initial: {
                        scale: 0.6
                    },
                    animate: {
                        scale: 1
                    },
                    transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                        size: 14,
                        className: isFavorite ? "text-[#FF3B30]" : "text-white/40",
                        fill: isFavorite ? "#FF3B30" : "none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 268,
                        columnNumber: 11
                    }, this)
                }, isFavorite ? "filled" : "outline", false, {
                    fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                    lineNumber: 262,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                className: "text-2xl leading-none mr-1 align-top",
                style: {
                    color: `${meta.color}88`,
                    fontFamily: "Georgia, serif"
                },
                children: "“"
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "italic text-white/90 text-sm leading-relaxed font-[family-name:var(--font-poppins)]",
                children: t(affirmation.textKey)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center gap-2",
                children: affirmation.isCustom ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "px-2 py-0.5 rounded-full bg-[#FFD166]/15 text-[#FFD166] text-[10px] font-semibold border border-[#FFD166]/30",
                    children: t("affirmationsCustom")
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                    lineNumber: 291,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryBadge, {
                    category: affirmation.category,
                    size: "sm"
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                    lineNumber: 295,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this),
            onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleDeleteClick,
                className: `mt-2 flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg transition-colors ${confirmingDelete ? "bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/40" : "text-white/40 hover:text-[#FF3B30] hover:bg-[#FF3B30]/10"}`,
                "aria-label": t("affirmationsAriaDelete"),
                children: confirmingDelete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            size: 11
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                            lineNumber: 312,
                            columnNumber: 15
                        }, this),
                        " ",
                        t("affirmationsConfirm")
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                            size: 11
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                            lineNumber: 316,
                            columnNumber: 15
                        }, this),
                        " ",
                        t("affirmationsDeleteBtn")
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 301,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
_s1(AffirmationCard, "ARmToqQKmDgGnQAEzFDF6JTkVBo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c2 = AffirmationCard;
function FavoriteMiniCard({ affirmation, onClick }) {
    _s2();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_META"][affirmation.category];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        whileTap: {
            scale: 0.96
        },
        onClick: onClick,
        className: "shrink-0 w-44 text-left glass-card card-hover p-3 relative",
        style: {
            borderLeft: `4px solid ${meta.color}`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                className: "absolute top-2 right-2 text-base",
                children: meta.emoji
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/80 text-xs italic line-clamp-2 leading-snug pr-4 font-[family-name:var(--font-poppins)]",
                children: t(affirmation.textKey)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 347,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                        size: 10,
                        className: "text-[#FF3B30]",
                        fill: "#FF3B30"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white/40 text-[10px]",
                        children: t("affirmationsFavoriteLabel")
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
        lineNumber: 335,
        columnNumber: 5
    }, this);
}
_s2(FavoriteMiniCard, "uZyfTDL5l50aWwhHvO0Py2n2h8Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c3 = FavoriteMiniCard;
function AffirmationsScreen() {
    _s3();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "AffirmationsScreen.useStore[navigate]": (s)=>s.navigate
    }["AffirmationsScreen.useStore[navigate]"]);
    const plan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "AffirmationsScreen.useStore[plan]": (s)=>s.plan
    }["AffirmationsScreen.useStore[plan]"]);
    const favoriteAffirmations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "AffirmationsScreen.useStore[favoriteAffirmations]": (s)=>s.favoriteAffirmations
    }["AffirmationsScreen.useStore[favoriteAffirmations]"]);
    const customAffirmations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "AffirmationsScreen.useStore[customAffirmations]": (s)=>s.customAffirmations
    }["AffirmationsScreen.useStore[customAffirmations]"]);
    const toggleFavoriteAffirmation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "AffirmationsScreen.useStore[toggleFavoriteAffirmation]": (s)=>s.toggleFavoriteAffirmation
    }["AffirmationsScreen.useStore[toggleFavoriteAffirmation]"]);
    const addCustomAffirmation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "AffirmationsScreen.useStore[addCustomAffirmation]": (s)=>s.addCustomAffirmation
    }["AffirmationsScreen.useStore[addCustomAffirmation]"]);
    const deleteCustomAffirmation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "AffirmationsScreen.useStore[deleteCustomAffirmation]": (s)=>s.deleteCustomAffirmation
    }["AffirmationsScreen.useStore[deleteCustomAffirmation]"]);
    const isPremium = plan !== "free";
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [showAddModal, setShowAddModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dailyAffirmation, setDailyAffirmation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AffirmationsScreen.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDailyAffirmation"])()
    }["AffirmationsScreen.useState"]);
    // Add-form state
    const [newText, setNewText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newCategory, setNewCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const allAffirmations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AffirmationsScreen.useMemo[allAffirmations]": ()=>mergeAffirmations(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEED_AFFIRMATIONS"], customAffirmations)
    }["AffirmationsScreen.useMemo[allAffirmations]"], [
        customAffirmations
    ]);
    const filteredAffirmations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AffirmationsScreen.useMemo[filteredAffirmations]": ()=>filterAffirmations(allAffirmations, activeCategory)
    }["AffirmationsScreen.useMemo[filteredAffirmations]"], [
        allAffirmations,
        activeCategory
    ]);
    const favoriteAffirmationObjects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AffirmationsScreen.useMemo[favoriteAffirmationObjects]": ()=>favoriteAffirmations.map({
                "AffirmationsScreen.useMemo[favoriteAffirmationObjects]": (id)=>allAffirmations.find({
                        "AffirmationsScreen.useMemo[favoriteAffirmationObjects]": (a)=>a.id === id
                    }["AffirmationsScreen.useMemo[favoriteAffirmationObjects]"])
            }["AffirmationsScreen.useMemo[favoriteAffirmationObjects]"]).filter({
                "AffirmationsScreen.useMemo[favoriteAffirmationObjects]": (a)=>a !== undefined
            }["AffirmationsScreen.useMemo[favoriteAffirmationObjects]"])
    }["AffirmationsScreen.useMemo[favoriteAffirmationObjects]"], [
        favoriteAffirmations,
        allAffirmations
    ]);
    const counts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AffirmationsScreen.useMemo[counts]": ()=>{
            const c = {
                all: allAffirmations.length,
                morning: 0,
                crisis: 0,
                "self-worth": 0,
                future: 0,
                gratitude: 0,
                strength: 0
            };
            for (const a of allAffirmations){
                c[a.category] += 1;
            }
            return c;
        }
    }["AffirmationsScreen.useMemo[counts]"], [
        allAffirmations
    ]);
    const dailyMeta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_META"][dailyAffirmation.category];
    const dailyIsFavorite = favoriteAffirmations.includes(dailyAffirmation.id);
    const todayLabel = formatDate(new Date(), lang);
    /* ---- Handlers ---- */ const handleBack = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
        navigate("dashboard");
    };
    const handleToggleDailyFavorite = ()=>{
        toggleFavoriteAffirmation(dailyAffirmation.id);
        if (dailyIsFavorite) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(t("affirmationsToastRemoved"));
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playPop();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].selection();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t("affirmationsToastAdded"));
        }
    };
    const handleToggleFavorite = (id)=>{
        const wasFav = favoriteAffirmations.includes(id);
        toggleFavoriteAffirmation(id);
        if (wasFav) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playPop();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].selection();
        }
    };
    const handleShare = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
        void shareAffirmation(dailyAffirmation, t);
    };
    const handleNewDaily = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playWhoosh();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].medium();
        setDailyAffirmation((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRandomAffirmation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEED_AFFIRMATIONS"], dailyAffirmation.id));
    };
    const handleFilterChange = (cat)=>{
        setActiveCategory(cat);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].selection();
    };
    const handleOpenAddModal = ()=>{
        setShowAddModal(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
    };
    const handleCloseAddModal = ()=>{
        setShowAddModal(false);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
    };
    const handleSubmitCustom = ()=>{
        const trimmed = newText.trim();
        if (trimmed.length < 10 || trimmed.length > 200) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playError();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].warning();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t("affirmationsToastErrLen"));
            return;
        }
        if (!newCategory) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playError();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].warning();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t("affirmationsToastErrCat"));
            return;
        }
        addCustomAffirmation(trimmed, newCategory);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playSuccess();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].success();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t("affirmationsToastCreated"));
        setNewText("");
        setNewCategory(null);
        setShowAddModal(false);
    };
    const handleDeleteCustom = (id)=>{
        deleteCustomAffirmation(id);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playWhoosh();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].medium();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t("affirmationsToastDeleted"));
    };
    const handleCategoryChip = (cat)=>{
        setNewCategory((prev)=>prev === cat ? null : cat);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playPop();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].selection();
    };
    const handlePremiumCta = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
        navigate("paywall");
    };
    const handleFavoriteTap = (aff)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
        const catLabelKey = aff.category === "morning" ? "affirmationsCatMorning" : aff.category === "crisis" ? "affirmationsCatCrisis" : aff.category === "self-worth" ? "affirmationsCatSelfWorth" : aff.category === "future" ? "affirmationsCatFuture" : aff.category === "gratitude" ? "affirmationsCatGratitude" : "affirmationsCatStrength";
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "italic font-[family-name:var(--font-poppins)]",
            children: [
                "“",
                t(aff.textKey),
                "”"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
            lineNumber: 552,
            columnNumber: 7
        }, this), {
            description: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_META"][aff.category].emoji} ${t(catLabelKey)}`
        });
    };
    /* ---- Derived ---- */ const isFormValid = newText.trim().length >= 10 && newText.trim().length <= 200 && newCategory !== null;
    const TIPS = [
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"],
            key: "affirmationsTipA"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__["Wind"],
            key: "affirmationsTipB"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"],
            key: "affirmationsTipC"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen px-4 pt-10 pb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["containerVariants"],
                initial: "hidden",
                animate: "visible",
                className: "space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                        className: "sticky top-0 z-30 -mx-4 px-4 py-3 mb-1 glass-card-strong backdrop-blur-xl",
                        style: {
                            borderRadius: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleBack,
                                    className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center btn-press",
                                    "aria-label": t("backToDashboard"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                        size: 20,
                                        className: "text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 594,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                    lineNumber: 589,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-white font-bold text-xl font-[family-name:var(--font-poppins)] leading-tight flex items-center gap-2",
                                            children: [
                                                t("affirmationsTitle"),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    size: 18,
                                                    className: "text-[#FFD166]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                    lineNumber: 599,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                            lineNumber: 597,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/50 text-xs",
                                            children: t("affirmationsSubtitle")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                            lineNumber: 601,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                    lineNumber: 596,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                            lineNumber: 588,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 583,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                        className: "relative glass-card-strong p-6 overflow-hidden animate-glow-pulse premium-shimmer",
                        style: {
                            background: `linear-gradient(135deg, ${dailyMeta.color}22 0%, rgba(11,19,43,0.75) 60%)`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": true,
                                className: "absolute -top-4 -left-2 text-7xl leading-none opacity-10",
                                style: {
                                    color: dailyMeta.color,
                                    fontFamily: "Georgia, serif"
                                },
                                children: "“"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 617,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": true,
                                className: "absolute -bottom-12 -right-2 text-7xl leading-none opacity-10",
                                style: {
                                    color: dailyMeta.color,
                                    fontFamily: "Georgia, serif"
                                },
                                children: "”"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 624,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "aria-hidden": true,
                                className: "absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-30",
                                style: {
                                    background: dailyMeta.color
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 633,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                size: 12,
                                                style: {
                                                    color: dailyMeta.color
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 642,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold tracking-widest uppercase",
                                                style: {
                                                    color: dailyMeta.color
                                                },
                                                children: t("affirmationsHeroLabel")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 643,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 641,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/50 text-xs mb-4",
                                        children: todayLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 650,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white text-lg italic leading-relaxed font-[family-name:var(--font-poppins)] mb-5",
                                        children: t(dailyAffirmation.textKey)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 653,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryBadge, {
                                            category: dailyAffirmation.category
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                            lineNumber: 659,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 658,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleToggleDailyFavorite,
                                                className: `flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all btn-press ${dailyIsFavorite ? "bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/40" : "bg-white/10 text-white/80 border border-white/10"}`,
                                                "aria-pressed": dailyIsFavorite,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                        initial: {
                                                            scale: 0.6
                                                        },
                                                        animate: {
                                                            scale: 1
                                                        },
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 400,
                                                            damping: 14
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                            size: 14,
                                                            fill: dailyIsFavorite ? "#FF3B30" : "none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                            lineNumber: 679,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, dailyIsFavorite ? "fav" : "nofav", false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 673,
                                                        columnNumber: 17
                                                    }, this),
                                                    t("affirmationsFavorite")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 664,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleShare,
                                                className: "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white/80 border border-white/10 btn-press",
                                                "aria-label": t("affirmationsShare"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 17
                                                    }, this),
                                                    t("affirmationsShare")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 687,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleNewDaily,
                                                className: "ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border btn-press",
                                                style: {
                                                    background: `${dailyMeta.color}22`,
                                                    color: dailyMeta.color,
                                                    borderColor: `${dailyMeta.color}55`
                                                },
                                                "aria-label": t("affirmationsNewBtn"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 706,
                                                        columnNumber: 17
                                                    }, this),
                                                    t("affirmationsNewBtn")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 696,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 663,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 639,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 609,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                        className: "flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterPill, {
                                label: t("affirmationsAll"),
                                count: counts.all,
                                active: activeCategory === "all",
                                onClick: ()=>handleFilterChange("all")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 720,
                                columnNumber: 11
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_ORDER"].map((cat)=>{
                                const meta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_META"][cat];
                                const labelKey = cat === "morning" ? "affirmationsCatMorning" : cat === "crisis" ? "affirmationsCatCrisis" : cat === "self-worth" ? "affirmationsCatSelfWorth" : cat === "future" ? "affirmationsCatFuture" : cat === "gratitude" ? "affirmationsCatGratitude" : "affirmationsCatStrength";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterPill, {
                                    label: t(labelKey),
                                    emoji: meta.emoji,
                                    count: counts[cat],
                                    active: activeCategory === cat,
                                    color: meta.color,
                                    onClick: ()=>handleFilterChange(cat)
                                }, cat, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                    lineNumber: 741,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 716,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                        whileTap: {
                            scale: 0.98
                        },
                        onClick: handleOpenAddModal,
                        className: "w-full py-3.5 rounded-2xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-2 glow-green btn-press",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 763,
                                columnNumber: 11
                            }, this),
                            " ",
                            t("affirmationsCreateMine")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 757,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                        children: filteredAffirmations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                            variant: "default",
                            title: t("affirmationsEmptyTitle"),
                            description: t("affirmationsEmptyDesc"),
                            ctaLabel: t("affirmationsCreateMine"),
                            onCta: handleOpenAddModal,
                            compact: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                            lineNumber: 771,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "columns-2 gap-3 max-h-[60vh] overflow-y-auto custom-scroll pr-1",
                            style: {
                                columnFill: "balance"
                            },
                            children: filteredAffirmations.map((aff, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AffirmationCard, {
                                    affirmation: aff,
                                    index: idx,
                                    isFavorite: favoriteAffirmations.includes(aff.id),
                                    onToggleFavorite: ()=>handleToggleFavorite(aff.id),
                                    onDelete: aff.isCustom ? ()=>handleDeleteCustom(aff.id) : undefined
                                }, aff.id, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                    lineNumber: 785,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                            lineNumber: 780,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 769,
                        columnNumber: 9
                    }, this),
                    favoriteAffirmationObjects.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        size: 16,
                                        className: "text-[#FF3B30]",
                                        fill: "#FF3B30"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 808,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-white font-bold text-base font-[family-name:var(--font-poppins)]",
                                        children: t("affirmationsMyFavorites")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 809,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-1 px-2 py-0.5 rounded-full bg-[#FF3B30]/15 text-[#FF3B30] text-[10px] font-bold",
                                        children: favoriteAffirmationObjects.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 812,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 807,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2",
                                children: favoriteAffirmationObjects.map((aff)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FavoriteMiniCard, {
                                        affirmation: aff,
                                        onClick: ()=>handleFavoriteTap(aff)
                                    }, aff.id, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 818,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 816,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 806,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                        className: "relative glass-card-strong p-5 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "aria-hidden": true,
                                className: "absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-25",
                                style: {
                                    background: "#F59E0B"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 835,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                size: 16,
                                                className: "text-[#F59E0B]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 842,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-white font-bold font-[family-name:var(--font-poppins)] text-sm",
                                                children: t("affirmationsDailyReminder")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 843,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 841,
                                        columnNumber: 13
                                    }, this),
                                    !isPremium ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 backdrop-blur-md bg-[#0B0704]/70 flex flex-col items-center justify-center gap-3 z-10 rounded-2xl py-6",
                                                "aria-hidden": false,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-12 h-12 rounded-full bg-[#F59E0B]/15 flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                            size: 20,
                                                            className: "text-[#F59E0B]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                            lineNumber: 855,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 854,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/70 text-xs text-center max-w-[240px] px-4",
                                                        children: t("affirmationsPremiumLock")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 857,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handlePremiumCta,
                                                        className: "px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold glow-green btn-press",
                                                        children: t("goalsPremiumCta")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 860,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 850,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-3 opacity-50 select-none",
                                                "aria-hidden": true,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-xs",
                                                                children: t("affirmationsReminderToggle")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                                lineNumber: 871,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-9 h-5 rounded-full bg-[#F59E0B]/40 relative",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                                    lineNumber: 875,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                                lineNumber: 874,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 870,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/60 text-xs",
                                                                children: t("affirmationsReminderTime")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                                lineNumber: 879,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-mono",
                                                                children: "07:00"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                                lineNumber: 880,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 878,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/50 text-[11px] leading-relaxed",
                                                        children: t("affirmationsReminderDesc")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 884,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 869,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 849,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white text-sm block",
                                                                children: t("affirmationsReminderToggle")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                                lineNumber: 893,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/40 text-[11px]",
                                                                children: t("affirmationsReminderSoon")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                                lineNumber: 896,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 892,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(t("affirmationsReminderSoon"), {
                                                                description: t("affirmationsReminderSoon")
                                                            });
                                                        },
                                                        className: "w-11 h-6 rounded-full bg-[#F59E0B] relative shrink-0",
                                                        "aria-label": t("affirmationsDailyReminder"),
                                                        "aria-pressed": true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                            lineNumber: 912,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 900,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 891,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/60 text-xs",
                                                        children: t("affirmationsReminderTime")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 917,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-mono",
                                                        children: "07:00"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 918,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 916,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/50 text-[11px] leading-relaxed",
                                                children: t("affirmationsReminderDesc")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 923,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 890,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 840,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 831,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                        className: "glass-card p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
                                        size: 16,
                                        className: "text-[#FBBF24]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 936,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-bold font-[family-name:var(--font-poppins)] text-sm",
                                        children: t("affirmationsTipsTitle")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 937,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 935,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2.5",
                                children: TIPS.map((tip, i)=>{
                                    const Icon = tip.icon;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-start gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 h-7 rounded-lg bg-[#FBBF24]/15 flex items-center justify-center shrink-0 mt-0.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 14,
                                                    className: "text-[#FBBF24]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                    lineNumber: 947,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 946,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/75 text-xs leading-relaxed pt-1",
                                                children: t(tip.key)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 949,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 945,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 941,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 934,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                        className: "glass-card p-5 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__["Quote"], {
                                size: 20,
                                className: "text-[#FFD166] mx-auto mb-2",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 965,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/70 text-xs italic font-[family-name:var(--font-poppins)] leading-relaxed",
                                children: t("affirmationsFooterQuote")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 970,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 961,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 574,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showAddModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: handleCloseAddModal,
                    className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 safe-bottom",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            y: 60,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        exit: {
                            y: 60,
                            opacity: 0
                        },
                        transition: {
                            type: "spring",
                            stiffness: 280,
                            damping: 26
                        },
                        onClick: (e)=>e.stopPropagation(),
                        className: "glass-card-strong p-5 w-full max-w-md max-h-[88vh] overflow-y-auto custom-scroll",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-bold font-[family-name:var(--font-poppins)] text-lg",
                                        children: t("affirmationsModalTitle")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 997,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCloseAddModal,
                                        className: "w-8 h-8 rounded-full bg-white/10 flex items-center justify-center",
                                        "aria-label": t("close"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 16,
                                            className: "text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                            lineNumber: 1005,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 1000,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 996,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-white/60 text-xs",
                                                        children: t("affirmationsFieldText")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 1013,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-[10px] ${newText.trim().length < 10 ? "text-white/40" : newText.trim().length > 200 ? "text-[#FF3B30]" : "text-[#FFC94D]"}`,
                                                        children: [
                                                            newText.trim().length,
                                                            "/200"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 1016,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 1012,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: newText,
                                                onChange: (e)=>setNewText(e.target.value.slice(0, 220)),
                                                placeholder: t("affirmationsPlaceholder"),
                                                rows: 4,
                                                className: "w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F59E0B] resize-none italic font-[family-name:var(--font-poppins)]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 1028,
                                                columnNumber: 19
                                            }, this),
                                            newText.trim().length > 0 && newText.trim().length < 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[#F59E0B] text-[10px] mt-1",
                                                children: t("affirmationsCharMin", {
                                                    n: newText.trim().length
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 1038,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 1011,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-white/60 text-xs mb-2 block",
                                                children: t("affirmationsFieldCategory")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 1046,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-2",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_ORDER"].map((cat)=>{
                                                    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$affirmations$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_META"][cat];
                                                    const labelKey = cat === "morning" ? "affirmationsCatMorning" : cat === "crisis" ? "affirmationsCatCrisis" : cat === "self-worth" ? "affirmationsCatSelfWorth" : cat === "future" ? "affirmationsCatFuture" : cat === "gratitude" ? "affirmationsCatGratitude" : "affirmationsCatStrength";
                                                    const selected = newCategory === cat;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                        whileTap: {
                                                            scale: 0.95
                                                        },
                                                        onClick: ()=>handleCategoryChip(cat),
                                                        className: `p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${selected ? "border-white/40 bg-white/10" : "border-white/10 bg-white/5"}`,
                                                        style: selected ? {
                                                            borderColor: meta.color,
                                                            background: `${meta.color}22`
                                                        } : undefined,
                                                        "aria-pressed": selected,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg",
                                                                "aria-hidden": true,
                                                                children: meta.emoji
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                                lineNumber: 1085,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/80 text-[10px] font-medium text-center leading-tight",
                                                                children: t(labelKey)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                                lineNumber: 1088,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, cat, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                        lineNumber: 1066,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 1049,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 1045,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSubmitCustom,
                                        disabled: !isFormValid,
                                        className: "w-full py-3 rounded-xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed btn-press",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                                lineNumber: 1103,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            t("affirmationsSaveBtn")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                                lineNumber: 1009,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                        lineNumber: 988,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                    lineNumber: 981,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
                lineNumber: 979,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/AffirmationsScreen.tsx",
        lineNumber: 573,
        columnNumber: 5
    }, this);
}
_s3(AffirmationsScreen, "tvJ4vrq/aCvXdK4fva2B2q9OT5I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c4 = AffirmationsScreen;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "CategoryBadge");
__turbopack_context__.k.register(_c1, "FilterPill");
__turbopack_context__.k.register(_c2, "AffirmationCard");
__turbopack_context__.k.register(_c3, "FavoriteMiniCard");
__turbopack_context__.k.register(_c4, "AffirmationsScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/zerobet/screens/AffirmationsScreen.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/zerobet/screens/AffirmationsScreen.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_efe72add._.js.map