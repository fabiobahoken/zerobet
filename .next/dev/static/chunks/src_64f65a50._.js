(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RelapseRecoveryScreen",
    ()=>RelapseRecoveryScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/quote.js [app-client] (ecmascript) <export default as Quote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wind.js [app-client] (ecmascript) <export default as Wind>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/zerobet-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/haptics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/relapse-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/animations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
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
// Emotion chips for the acknowledgment form
const EMOTION_OPTIONS = [
    {
        key: "frustrated",
        emoji: "😤",
        label: "Frustré",
        color: "#FF3B30"
    },
    {
        key: "anxious",
        emoji: "😰",
        label: "Anxieux",
        color: "#FBBF24"
    },
    {
        key: "tempted",
        emoji: "😈",
        label: "Tenté",
        color: "#F59E0B"
    },
    {
        key: "calm",
        emoji: "😌",
        label: "Calme",
        color: "#FFB020"
    },
    {
        key: "proud",
        emoji: "🦸",
        label: "Fier",
        color: "#FFD166"
    }
];
const EMOTION_META = {
    frustrated: {
        emoji: "😤",
        label: "Frustré",
        color: "#FF3B30"
    },
    anxious: {
        emoji: "😰",
        label: "Anxieux",
        color: "#FBBF24"
    },
    tempted: {
        emoji: "😈",
        label: "Tenté",
        color: "#F59E0B"
    },
    calm: {
        emoji: "😌",
        label: "Calme",
        color: "#FFB020"
    },
    proud: {
        emoji: "🦸",
        label: "Fier",
        color: "#FFD166"
    },
    strong: {
        emoji: "💪",
        label: "Fort",
        color: "#FFC94D"
    }
};
// ─── Helper functions ──────────────────────────────────────────────────────
function getProgressPercent(protocol) {
    if (!protocol || protocol.length === 0) return 0;
    const done = protocol.filter((s)=>s.completed).length;
    return Math.round(done / protocol.length * 100);
}
function getCurrentStep(protocol) {
    if (!protocol) return null;
    return protocol.find((s)=>!s.completed) ?? null;
}
function getCurrentPhase(protocol) {
    const step = getCurrentStep(protocol);
    return step ? step.phase : null;
}
function formatDateTime(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    } catch  {
        return iso;
    }
}
function formatRelativeDays(iso) {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const diff = Math.floor((now - then) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return "Aujourd'hui";
    if (diff === 1) return "Hier";
    if (diff < 30) return `il y a ${diff} jours`;
    const months = Math.floor(diff / 30);
    if (months < 12) return `il y a ${months} mois`;
    return `il y a ${Math.floor(months / 12)} an${months < 24 ? "" : "s"}`;
}
function RelapseRecoveryScreen() {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const { navigate, relapseHistory, currentRelapseProtocol, addRelapseEvent, startRelapseProtocol, completeRelapseStep, resetRelapseProtocol } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const isActive = currentRelapseProtocol !== null;
    const allDone = isActive && currentRelapseProtocol.length > 0 && currentRelapseProtocol.every((s)=>s.completed);
    if (isActive) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProtocolMode, {
            protocol: currentRelapseProtocol,
            allDone: allDone,
            onCompleteStep: (id)=>{
                completeRelapseStep(id);
                const nextStep = currentRelapseProtocol.find((s)=>!s.completed && s.id !== id);
                // Determine if completing this step finishes everything
                const willFinish = currentRelapseProtocol.filter((s)=>s.completed).length + 1 >= currentRelapseProtocol.length;
                if (willFinish) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playAchievement();
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].success();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Protocole 24h complété !", {
                        description: "Tu t'es relevé. On est fier de toi."
                    });
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playSuccess();
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].success();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Étape complétée !", {
                        description: nextStep ? `Prochaine : ${t(nextStep.titleKey)}` : "Continue, tu y es presque."
                    });
                }
            },
            onAbandon: ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playError();
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].warning();
                resetRelapseProtocol();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Protocole interrompu", {
                    description: "Tu peux le reprendre quand tu veux."
                });
            },
            navigate: navigate
        }, void 0, false, {
            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
            lineNumber: 128,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LandingMode, {
        relapseHistory: relapseHistory,
        onStart: (payload)=>{
            addRelapseEvent({
                trigger: payload.trigger || undefined,
                amountLost: payload.amountLost,
                emotion: payload.emotion
            });
            startRelapseProtocol();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playWhoosh();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].medium();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Protocole démarré. On y va ensemble.", {
                description: "Respire. Tu n'es pas seul."
            });
        },
        navigate: navigate,
        t: t
    }, void 0, false, {
        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, this);
}
_s(RelapseRecoveryScreen, "3GnF8dj3mJhqETuEsimD4tWhk7k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = RelapseRecoveryScreen;
function LandingMode({ relapseHistory, onStart, navigate, t }) {
    _s1();
    const [trigger, setTrigger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [amountLost, setAmountLost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [emotion, setEmotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleStart = ()=>{
        if (!emotion) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playError();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].error();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Choisis une émotion pour continuer.", {
                description: "Cela nous aide à personnaliser ton accompagnement."
            });
            return;
        }
        const amount = amountLost.trim() === "" ? undefined : Number(amountLost);
        onStart({
            trigger: trigger.trim(),
            amountLost: typeof amount === "number" && !Number.isNaN(amount) ? amount : undefined,
            emotion
        });
    };
    const totalRelapses = relapseHistory.length;
    const daysSinceLast = relapseHistory.length > 0 ? Math.floor((Date.now() - new Date(relapseHistory[0].timestamp).getTime()) / (1000 * 60 * 60 * 24)) : 0;
    const avgDaysBetween = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LandingMode.useMemo[avgDaysBetween]": ()=>{
            if (relapseHistory.length < 2) return null;
            const first = new Date(relapseHistory[relapseHistory.length - 1].timestamp).getTime();
            const last = new Date(relapseHistory[0].timestamp).getTime();
            const span = Math.max(1, (last - first) / (1000 * 60 * 60 * 24));
            return Math.round(span / relapseHistory.length);
        }
    }["LandingMode.useMemo[avgDaysBetween]"], [
        relapseHistory
    ]);
    const resilienceMessage = totalRelapses === 0 ? "Tu n'as jamais rechuté. Continue, c'est magnifique." : totalRelapses === 1 ? "Une rechute. C'est derrière toi. Apprends et avance." : avgDaysBetween && avgDaysBetween >= 14 ? `Tu espaces tes rechutes : ~${avgDaysBetween} jours en moyenne. Tu progresses.` : avgDaysBetween ? `Tu espaces tes rechutes (~${avgDaysBetween} jours). Chaque jour compte.` : "Tu te relèves à chaque fois. C'est ce qui compte.";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["containerVariants"],
        initial: "hidden",
        animate: "visible",
        className: "min-h-screen px-5 pt-12 pb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                className: "sticky top-0 z-20 -mx-5 px-5 pt-3 pb-3 bg-gradient-to-b from-[#0B0704]/95 via-[#0B0704]/80 to-transparent backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-card-strong p-4 rounded-2xl flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
                                navigate("dashboard");
                            },
                            className: "btn-press w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white",
                            "aria-label": t("back"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                            lineNumber: 268,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                            size: 16,
                                            className: "text-[#FF3B30]",
                                            fill: "#FF3B30"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                            lineNumber: 281,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-lg font-bold text-white font-[family-name:var(--font-poppins)] truncate",
                                            children: t("relapseTitle")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                            lineNumber: 282,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 280,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-white/50 mt-0.5",
                                    children: t("relapseSubtitle")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 286,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                            lineNumber: 279,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                    lineNumber: 267,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                className: "glass-card-strong animate-glow-pulse p-6 rounded-3xl mt-4 relative overflow-hidden",
                style: {
                    background: "linear-gradient(135deg, rgba(255,59,48,0.18) 0%, rgba(245, 158, 11,0.12) 100%)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#FF3B30]/20 blur-3xl pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#F59E0B]/20 blur-3xl pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex flex-col items-center text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    scale: 0.8
                                },
                                animate: {
                                    scale: [
                                        0.9,
                                        1.05,
                                        0.9
                                    ]
                                },
                                transition: {
                                    duration: 2.4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                },
                                className: "text-5xl mb-3",
                                "aria-hidden": true,
                                children: "💔"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2",
                                children: "Tu as craqué ? Ce n'est pas fini."
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-white/70 leading-relaxed mb-4",
                                children: "La rechute fait partie du chemin. 80% des personnes en récupération rechutent au moins une fois. Ce qui compte, c'est ce que tu fais maintenant."
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 315,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-[#F59E0B]/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        size: 14,
                                        className: "text-[#F59E0B]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 321,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-white/80 font-medium",
                                        children: "80% rechutent — et 60% finissent par réussir"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 322,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                className: "glass-card p-5 rounded-3xl mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                size: 16,
                                className: "text-[#FF3B30]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base font-semibold text-white font-[family-name:var(--font-poppins)]",
                                children: "Reconnaître la rechute"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 333,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-white/60 mb-4 leading-relaxed",
                        children: "Le premier pas est de reconnaître ce qui s'est passé. Pas de jugement, juste des faits."
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 337,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-xs text-white/70 font-medium mb-1.5 block",
                        children: [
                            "Qu'est-ce qui t'a amené à parier ?",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/30 ml-1 font-normal",
                                children: "(optionnel)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 343,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: trigger,
                        onChange: (e)=>setTrigger(e.target.value),
                        placeholder: "Ex : solitude, stress, publicité vue sur Instagram…",
                        rows: 3,
                        maxLength: 500,
                        className: "w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B]/50 focus:bg-white/8 resize-none custom-scroll mb-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 347,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right text-white/30 text-[10px] mb-4",
                        children: [
                            trigger.length,
                            "/500"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-xs text-white/70 font-medium mb-1.5 block",
                        children: [
                            "Combien as-tu perdu ?",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/30 ml-1 font-normal",
                                children: "(optionnel)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 362,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 360,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                inputMode: "numeric",
                                min: 0,
                                value: amountLost,
                                onChange: (e)=>setAmountLost(e.target.value),
                                placeholder: "0",
                                className: "w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-16 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B]/50 focus:bg-white/8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 365,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40 font-medium",
                                children: "FCFA"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 364,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-xs text-white/70 font-medium mb-2 block",
                        children: "Comment te sens-tu maintenant ?"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-5 gap-2 mb-5",
                        children: EMOTION_OPTIONS.map((opt)=>{
                            const selected = emotion === opt.key;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileTap: {
                                    scale: 0.9
                                },
                                onClick: ()=>{
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playPop();
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].selection();
                                    setEmotion(opt.key);
                                },
                                className: "flex flex-col items-center gap-1 py-2 px-1 rounded-2xl transition-all",
                                style: {
                                    background: selected ? `linear-gradient(135deg, ${opt.color}33, ${opt.color}11)` : "rgba(255,255,255,0.04)",
                                    border: selected ? `1px solid ${opt.color}80` : "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: selected ? `0 0 12px -2px ${opt.color}80` : "none"
                                },
                                "aria-pressed": selected,
                                "aria-label": opt.label,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl",
                                        "aria-hidden": true,
                                        children: opt.emoji
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 408,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-[10px] font-medium ${selected ? "text-white" : "text-white/60"}`,
                                        children: opt.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 411,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, opt.key, true, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 387,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileTap: {
                            scale: 0.98
                        },
                        onClick: handleStart,
                        className: "btn-press w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base flex items-center justify-center gap-2 glow-green",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                size: 18,
                                fill: "#fff"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this),
                            "Commencer le protocole de 24h"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 423,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            relapseHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                className: "glass-card p-5 rounded-3xl mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                size: 16,
                                className: "text-[#F59E0B]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 440,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base font-semibold text-white font-[family-name:var(--font-poppins)]",
                                children: "Ton historique de rechutes"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 441,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 439,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-96 overflow-y-auto custom-scroll space-y-3",
                        children: relapseHistory.map((r)=>{
                            const meta = EMOTION_META[r.emotion];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card p-3 rounded-2xl border-l-2",
                                style: {
                                    borderLeftColor: meta.color
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-2 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-white/70 font-medium",
                                                children: formatDateTime(r.timestamp)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                lineNumber: 455,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-white/40",
                                                children: formatRelativeDays(r.timestamp)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                lineNumber: 458,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 454,
                                        columnNumber: 19
                                    }, this),
                                    r.trigger && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-white/70 italic mb-1.5 line-clamp-2",
                                        children: [
                                            "« ",
                                            r.trigger,
                                            " »"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 463,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1",
                                                style: {
                                                    background: `${meta.color}22`,
                                                    color: meta.color
                                                },
                                                children: [
                                                    meta.emoji,
                                                    " ",
                                                    meta.label
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                lineNumber: 468,
                                                columnNumber: 21
                                            }, this),
                                            typeof r.amountLost === "number" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FF3B30]/15 text-[#FF6B6B]",
                                                children: [
                                                    r.amountLost.toLocaleString("fr-FR"),
                                                    " FCFA"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                lineNumber: 478,
                                                columnNumber: 23
                                            }, this),
                                            r.protocolCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FFC94D]/15 text-[#FFC94D] flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        size: 10
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 25
                                                    }, this),
                                                    " Protocole complété"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                lineNumber: 483,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/40 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        size: 10
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                        lineNumber: 488,
                                                        columnNumber: 25
                                                    }, this),
                                                    " Protocole interrompu"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                lineNumber: 487,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 467,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, r.id, true, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 449,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 445,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 435,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                className: "glass-card-strong p-5 rounded-3xl mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                size: 16,
                                className: "text-[#F59E0B]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 505,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base font-semibold text-white font-[family-name:var(--font-poppins)]",
                                children: "Ta résilience"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 506,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 504,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-2 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBlock, {
                                label: "Rechutes",
                                value: String(totalRelapses),
                                color: "#FF3B30",
                                emoji: "📊"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 511,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBlock, {
                                label: "Dernière",
                                value: totalRelapses === 0 ? "—" : daysSinceLast === 0 ? "Aujourd'hui" : `J-${daysSinceLast}`,
                                color: "#F59E0B",
                                emoji: "📅"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 517,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBlock, {
                                label: "Moy. jours",
                                value: avgDaysBetween ? `${avgDaysBetween}j` : "—",
                                color: "#FFC94D",
                                emoji: "⏱️"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 529,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 510,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-white/70 leading-relaxed text-center italic",
                        children: resilienceMessage
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 536,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 500,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-2 px-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__["Quote"], {
                                size: 14,
                                className: "text-[#FFD166]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 544,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-white/60 font-medium",
                                children: "Pour t'inspirer"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 545,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 543,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 overflow-x-auto no-scrollbar pb-2",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RELAPSE_QUOTES"].map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                whileHover: {
                                    scale: 1.02
                                },
                                className: "card-hover glass-card p-4 rounded-2xl flex-shrink-0 w-64",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__["Quote"], {
                                        size: 16,
                                        className: "text-[#FFD166] mb-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 554,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-white/80 italic leading-relaxed mb-2",
                                        children: t(q.textKey)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 555,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-white/40 font-medium",
                                        children: [
                                            "— ",
                                            t(q.authorKey)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 558,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 549,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 547,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 542,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                className: "glass-card p-5 rounded-3xl mt-4 relative overflow-hidden gradient-border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-full bg-[#FF3B30]/15 flex items-center justify-center flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                size: 18,
                                className: "text-[#FF3B30]",
                                fill: "#FF3B30"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 573,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                            lineNumber: 572,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-semibold text-white font-[family-name:var(--font-poppins)] mb-1",
                                    children: "Rappelle-toi"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 576,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-white/70 leading-relaxed italic",
                                    children: "Tu n'es pas ta rechute. Tu es la personne qui se relève."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 579,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                            lineNumber: 575,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                    lineNumber: 571,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 567,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
        lineNumber: 256,
        columnNumber: 5
    }, this);
}
_s1(LandingMode, "1W/3JZ2TIt8M/9KEoHTvD6rk8z0=");
_c1 = LandingMode;
function StatBlock({ label, value, color, emoji }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl p-3 text-center",
        style: {
            background: `${color}14`,
            border: `1px solid ${color}30`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-lg mb-0.5",
                "aria-hidden": true,
                children: emoji
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 605,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-base font-bold font-[family-name:var(--font-poppins)]",
                style: {
                    color
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 608,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[10px] text-white/50 mt-0.5",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 614,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
        lineNumber: 601,
        columnNumber: 5
    }, this);
}
_c2 = StatBlock;
function ProtocolMode({ protocol, allDone, onCompleteStep, onAbandon, navigate }) {
    _s2();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const [confirmAbandon, setConfirmAbandon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const percent = getProgressPercent(protocol);
    const currentStep = getCurrentStep(protocol);
    const currentPhase = getCurrentPhase(protocol);
    const completedCount = protocol.filter((s)=>s.completed).length;
    const isLastStep = currentStep !== null && protocol.filter((s)=>!s.completed).length === 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["containerVariants"],
        initial: "hidden",
        animate: "visible",
        className: "min-h-screen px-5 pt-12 pb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                className: "sticky top-0 z-20 -mx-5 px-5 pt-3 pb-3 bg-gradient-to-b from-[#0B0704]/95 via-[#0B0704]/80 to-transparent backdrop-blur-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-card-strong p-4 rounded-2xl flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
                                navigate("dashboard");
                            },
                            className: "btn-press w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white",
                            "aria-label": "Retour",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 668,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                            lineNumber: 659,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                            size: 16,
                                            className: "text-[#FF3B30]",
                                            fill: "#FF3B30"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                            lineNumber: 672,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-lg font-bold text-white font-[family-name:var(--font-poppins)] truncate",
                                            children: "Protocole en cours"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                            lineNumber: 673,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 671,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-white/50 mt-0.5",
                                    children: "Tu te relèves, étape par étape"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 677,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                            lineNumber: 670,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                    lineNumber: 658,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 654,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                className: "glass-card-strong animate-glow-pulse p-6 rounded-3xl mt-4 relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#F59E0B]/15 blur-3xl pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 689,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex flex-col items-center text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] tracking-widest font-bold text-[#F59E0B] mb-3",
                                children: "PROTOCOLE 24H"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 691,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProgressRing, {
                                percent: percent,
                                size: 120
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 694,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-white/70 mt-3",
                                children: [
                                    "Étape ",
                                    Math.min(completedCount + 1, protocol.length),
                                    " sur",
                                    " ",
                                    protocol.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 695,
                                columnNumber: 11
                            }, this),
                            currentPhase && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
                                style: {
                                    background: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_META"][currentPhase].color}22`,
                                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_META"][currentPhase].color}50`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base",
                                        "aria-hidden": true,
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_META"][currentPhase].emoji
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 707,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold",
                                        style: {
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_META"][currentPhase].color
                                        },
                                        children: t(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_META"][currentPhase].labelKey)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 710,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-white/40",
                                        children: [
                                            "· ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_META"][currentPhase].timeframe
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 716,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 700,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    if (confirmAbandon) {
                                        onAbandon();
                                        setConfirmAbandon(false);
                                    } else {
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].warning();
                                        setConfirmAbandon(true);
                                        setTimeout(()=>setConfirmAbandon(false), 3000);
                                    }
                                },
                                className: "mt-4 text-xs text-white/40 hover:text-[#FF6B6B] transition-colors flex items-center gap-1",
                                children: confirmAbandon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                            lineNumber: 737,
                                            columnNumber: 17
                                        }, this),
                                        "Confirmer l'abandon ?"
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                            lineNumber: 742,
                                            columnNumber: 17
                                        }, this),
                                        "Abandonner le protocole"
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 721,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 690,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 685,
                columnNumber: 7
            }, this),
            currentStep && !allDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CurrentStepCard, {
                step: currentStep,
                stepIndex: protocol.findIndex((s)=>s.id === currentStep.id),
                total: protocol.length,
                isLastStep: isLastStep,
                onComplete: ()=>onCompleteStep(currentStep.id)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 752,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                className: "glass-card p-5 rounded-3xl mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-semibold text-white font-[family-name:var(--font-poppins)] mb-4",
                        children: "Ton parcours de récupération"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 766,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-[19px] top-2 bottom-2 w-0.5 bg-white/10",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 771,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: protocol.map((step, idx)=>{
                                    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_META"][step.phase];
                                    const isCurrent = currentStep?.id === step.id;
                                    const isFuture = !step.completed && !isCurrent;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: -8
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        transition: {
                                            delay: Math.min(idx * 0.05, 0.4)
                                        },
                                        className: "relative flex items-start gap-3 pl-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isCurrent ? "animate-glow-pulse" : ""}`,
                                                style: {
                                                    background: step.completed ? "rgba(255,201,77,0.18)" : isCurrent ? `${meta.color}26` : "rgba(255,255,255,0.04)",
                                                    border: step.completed ? "1px solid #FFC94D80" : isCurrent ? `1px solid ${meta.color}80` : "1px solid rgba(255,255,255,0.08)",
                                                    boxShadow: isCurrent ? `0 0 12px -2px ${meta.color}` : "none"
                                                },
                                                children: step.completed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    size: 16,
                                                    className: "text-[#FFC94D]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                    lineNumber: 809,
                                                    columnNumber: 23
                                                }, this) : isFuture ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                    size: 13,
                                                    className: "text-white/30"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                    lineNumber: 811,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm",
                                                    "aria-hidden": true,
                                                    children: meta.emoji
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                    lineNumber: 813,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                lineNumber: 788,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0 pb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 mb-0.5",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-sm font-medium font-[family-name:var(--font-poppins)] ${step.completed ? "text-white/40 line-through" : isFuture ? "text-white/40" : "text-white"}`,
                                                            children: t(step.titleKey)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                            lineNumber: 820,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                        lineNumber: 819,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 flex-wrap",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] px-1.5 py-0.5 rounded-full",
                                                                style: {
                                                                    background: `${meta.color}18`,
                                                                    color: meta.color
                                                                },
                                                                children: t(meta.labelKey)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                                lineNumber: 833,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-white/40 flex items-center gap-0.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                        size: 9
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                                        lineNumber: 843,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    step.duration
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                                lineNumber: 842,
                                                                columnNumber: 23
                                                            }, this),
                                                            step.completedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-[#FFC94D]",
                                                                children: [
                                                                    "✓ ",
                                                                    formatDateTime(step.completedAt)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                                lineNumber: 847,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                        lineNumber: 832,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                                lineNumber: 818,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, step.id, true, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 781,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 775,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 769,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 762,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
                className: "glass-card-strong p-5 rounded-3xl mt-4 relative overflow-hidden",
                style: {
                    background: "linear-gradient(135deg, rgba(255,59,48,0.18) 0%, rgba(245, 158, 11,0.10) 100%)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                    size: 16,
                                    className: "text-[#FF3B30]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 871,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-semibold text-white font-[family-name:var(--font-poppins)]",
                                    children: "Besoin d'aide maintenant ?"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 872,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                            lineNumber: 870,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmergencyButton, {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 878,
                                        columnNumber: 21
                                    }, void 0),
                                    label: "SOS",
                                    onClick: ()=>{
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].medium();
                                        navigate("sos");
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 877,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmergencyButton, {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__["Wind"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 887,
                                        columnNumber: 21
                                    }, void 0),
                                    label: "Respirer",
                                    onClick: ()=>{
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].medium();
                                        navigate("panic");
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 886,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmergencyButton, {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                        lineNumber: 896,
                                        columnNumber: 21
                                    }, void 0),
                                    label: "Atlas",
                                    onClick: ()=>{
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].medium();
                                        navigate("atlas");
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 895,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                            lineNumber: 876,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                    lineNumber: 869,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 861,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: allDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CompletionModal, {
                    onReturn: ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
                        navigate("dashboard");
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                    lineNumber: 911,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 909,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
        lineNumber: 647,
        columnNumber: 5
    }, this);
}
_s2(ProtocolMode, "KA5XIcsGjceJf0jYVDFf3AzAeps=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c3 = ProtocolMode;
function CurrentStepCard({ step, stepIndex, total, isLastStep, onComplete }) {
    _s3();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_META"][step.phase];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["itemVariants"],
        className: "glass-card-strong p-5 rounded-3xl mt-4 relative overflow-hidden",
        style: {
            boxShadow: `0 0 24px -8px ${meta.color}`,
            border: `1px solid ${meta.color}40`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none",
                style: {
                    background: `${meta.color}30`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 948,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3",
                        style: {
                            background: `${meta.color}22`,
                            border: `1px solid ${meta.color}50`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": true,
                                children: meta.emoji
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 961,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold",
                                style: {
                                    color: meta.color
                                },
                                children: t(meta.labelKey)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 962,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-white/40",
                                children: [
                                    "· ",
                                    meta.timeframe
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 968,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 954,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] tracking-widest font-bold text-white/40 mb-1",
                        children: [
                            "ÉTAPE ",
                            stepIndex + 1,
                            "/",
                            total
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 972,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2",
                        children: t(step.titleKey)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 975,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-white/70 italic leading-relaxed mb-3",
                        children: t(step.descKey)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 978,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl p-3.5 mb-4",
                        style: {
                            background: `${meta.color}11`,
                            border: `1px solid ${meta.color}40`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-white font-medium leading-relaxed",
                            children: [
                                "👉 ",
                                t(step.actionKey)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                            lineNumber: 990,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 983,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                size: 13,
                                className: "text-white/40"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 997,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-white/50",
                                children: step.duration
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 998,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 996,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileTap: {
                            scale: 0.98
                        },
                        onClick: onComplete,
                        className: "btn-press w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base flex items-center justify-center gap-2 glow-green",
                        children: isLastStep ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 1009,
                                    columnNumber: 15
                                }, this),
                                "Terminer le protocole"
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 1014,
                                    columnNumber: 15
                                }, this),
                                "J'ai fait cette étape"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1002,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 952,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
        lineNumber: 940,
        columnNumber: 5
    }, this);
}
_s3(CurrentStepCard, "uZyfTDL5l50aWwhHvO0Py2n2h8Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c4 = CurrentStepCard;
function EmergencyButton({ icon, label, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        whileTap: {
            scale: 0.95
        },
        onClick: onClick,
        className: "btn-press glass-card p-3 rounded-2xl flex flex-col items-center gap-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[#FF3B30]",
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 1039,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-white font-medium",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 1040,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
        lineNumber: 1034,
        columnNumber: 5
    }, this);
}
_c5 = EmergencyButton;
// ─── Progress Ring ─────────────────────────────────────────────────────────
function ProgressRing({ percent, size = 120 }) {
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - percent / 100 * circumference;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        style: {
            width: size,
            height: size
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                className: "-rotate-90",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                            id: "progress-gradient",
                            x1: "0%",
                            y1: "0%",
                            x2: "100%",
                            y2: "100%",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "0%",
                                    stopColor: "#FF3B30"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 1058,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "100%",
                                    stopColor: "#F59E0B"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                    lineNumber: 1059,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                            lineNumber: 1057,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1056,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: size / 2,
                        cy: size / 2,
                        r: radius,
                        fill: "none",
                        stroke: "rgba(255,255,255,0.08)",
                        strokeWidth: strokeWidth
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1062,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                        cx: size / 2,
                        cy: size / 2,
                        r: radius,
                        fill: "none",
                        stroke: "url(#progress-gradient)",
                        strokeWidth: strokeWidth,
                        strokeLinecap: "round",
                        strokeDasharray: circumference,
                        initial: {
                            strokeDashoffset: circumference
                        },
                        animate: {
                            strokeDashoffset: offset
                        },
                        transition: {
                            duration: 0.8,
                            ease: "easeOut"
                        },
                        style: {
                            filter: "drop-shadow(0 0 6px rgba(245, 158, 11,0.6))"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1070,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 1055,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl font-bold text-white font-[family-name:var(--font-poppins)]",
                        children: [
                            percent,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1088,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-white/50",
                        children: "complété"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1091,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 1087,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
        lineNumber: 1054,
        columnNumber: 5
    }, this);
}
_c6 = ProgressRing;
// ─── Completion Celebration Modal ──────────────────────────────────────────
function CompletionModal({ onReturn }) {
    _s4();
    // 12 confetti particles
    const confetti = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CompletionModal.useMemo[confetti]": ()=>Array.from({
                length: 12
            }).map({
                "CompletionModal.useMemo[confetti]": (_, i)=>({
                        id: i,
                        x: (Math.random() - 0.5) * 240,
                        delay: Math.random() * 0.4,
                        duration: 1.8 + Math.random() * 0.8,
                        color: [
                            "#FF3B30",
                            "#F59E0B",
                            "#FBBF24",
                            "#FFC94D",
                            "#FFD166"
                        ][i % 5],
                        shape: i % 3 === 0 ? "circle" : i % 3 === 1 ? "square" : "diamond"
                    })
            }["CompletionModal.useMemo[confetti]"])
    }["CompletionModal.useMemo[confetti]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        className: "fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-md p-5",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "completion-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden pointer-events-none",
                children: confetti.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            y: -40,
                            x: 0,
                            opacity: 1,
                            rotate: 0
                        },
                        animate: {
                            y: "110vh",
                            x: c.x,
                            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                            opacity: [
                                1,
                                1,
                                0.6,
                                0
                            ]
                        },
                        transition: {
                            duration: c.duration,
                            delay: c.delay,
                            ease: "easeIn",
                            repeat: Infinity,
                            repeatDelay: 0.4
                        },
                        className: "absolute top-0 left-1/2",
                        style: {
                            width: 10,
                            height: 10,
                            background: c.color,
                            borderRadius: c.shape === "circle" ? "50%" : c.shape === "diamond" ? "2px" : "0",
                            transform: c.shape === "diamond" ? "rotate(45deg)" : "none"
                        }
                    }, c.id, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1127,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 1125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 0.7,
                    y: 30,
                    opacity: 0
                },
                animate: {
                    scale: 1,
                    y: 0,
                    opacity: 1
                },
                exit: {
                    scale: 0.8,
                    opacity: 0
                },
                transition: {
                    type: "spring",
                    stiffness: 280,
                    damping: 22
                },
                className: "glass-card-strong p-7 rounded-3xl max-w-[340px] w-full text-center relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            scale: 0
                        },
                        animate: {
                            scale: 1,
                            rotate: [
                                0,
                                -10,
                                10,
                                0
                            ]
                        },
                        transition: {
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                            damping: 12
                        },
                        className: "w-20 h-20 rounded-full bg-gradient-to-br from-[#FBBF24]/30 to-[#F59E0B]/20 flex items-center justify-center mx-auto mb-4 glow-orange border border-[#FBBF24]/40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                            size: 36,
                            className: "text-[#FBBF24]",
                            fill: "#FBBF24"
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                            lineNumber: 1168,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "completion-title",
                        className: "text-2xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2",
                        children: "Tu l'as fait ! 🎉"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-white/70 leading-relaxed mb-5",
                        children: "Tu as complété le protocole 24h. Ta série reprend. Tu es plus fort maintenant."
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center gap-2 mb-5 text-xs text-white/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                size: 12,
                                className: "text-[#FFC94D]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 1181,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Jour 1 — pas Jour 0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 1182,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileTap: {
                            scale: 0.98
                        },
                        onClick: onReturn,
                        className: "btn-press w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base flex items-center justify-center gap-2 glow-green",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                size: 18,
                                fill: "#fff"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                                lineNumber: 1189,
                                columnNumber: 11
                            }, this),
                            "Retour à l'accueil"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                        lineNumber: 1184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
                lineNumber: 1155,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx",
        lineNumber: 1115,
        columnNumber: 5
    }, this);
}
_s4(CompletionModal, "I5IlaWuls8Gb/S2xICZB5daNLxY=");
_c7 = CompletionModal;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "RelapseRecoveryScreen");
__turbopack_context__.k.register(_c1, "LandingMode");
__turbopack_context__.k.register(_c2, "StatBlock");
__turbopack_context__.k.register(_c3, "ProtocolMode");
__turbopack_context__.k.register(_c4, "CurrentStepCard");
__turbopack_context__.k.register(_c5, "EmergencyButton");
__turbopack_context__.k.register(_c6, "ProgressRing");
__turbopack_context__.k.register(_c7, "CompletionModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/zerobet/screens/RelapseRecoveryScreen.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_64f65a50._.js.map