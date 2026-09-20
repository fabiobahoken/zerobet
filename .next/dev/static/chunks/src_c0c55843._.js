(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/zerobet/components/OnboardingProgress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnboardingProgress",
    ()=>OnboardingProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/zerobet-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// The 8 visible onboarding steps (Splash & Welcome excluded from count).
// 1. Langue       -> LanguageScreen
// 2. Genre        -> GenderScreen
// 3. Devise       -> CurrencyScreen
// 4. Quiz         -> QuizScreen
// 5. Résultats    -> ResultsScreen
// 6. Symptômes    -> SymptomsScreen
// 7. Éducation    -> CarouselScreen
// 8. Engagement   -> EngagementScreen / PaywallScreen
const TOTAL_STEPS = 8;
function OnboardingProgress({ currentStep }) {
    _s();
    const { setCompletedOnboarding, setPlan, navigate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const [showConfirm, setShowConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const clamped = Math.max(1, Math.min(TOTAL_STEPS, currentStep));
    const progress = clamped / TOTAL_STEPS * 100;
    // Skip button appears from step 3 onwards (Quiz and beyond)
    const showSkip = clamped >= 3;
    const handleSkipConfirm = ()=>{
        // Force free plan, mark onboarding complete, go to dashboard
        setPlan("free");
        setCompletedOnboarding(true);
        setShowConfirm(false);
        navigate("dashboard");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-30 -mx-6 px-6 pt-3 pb-2.5 mb-2 backdrop-blur-xl bg-[#070B0E]/80 border-b border-white/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-medium text-white/60 font-[family-name:var(--font-poppins)]",
                                children: [
                                    t("onboardingStep"),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-bold",
                                        children: clamped
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                        lineNumber: 50,
                                        columnNumber: 35
                                    }, this),
                                    " ",
                                    t("onboardingOf"),
                                    " ",
                                    TOTAL_STEPS
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: showSkip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    initial: {
                                        opacity: 0,
                                        x: 10
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        x: 10
                                    },
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25
                                    },
                                    onClick: ()=>setShowConfirm(true),
                                    className: "flex items-center gap-1 px-2.5 py-1 rounded-full glass-pill text-[11px] text-white/70 font-medium active:scale-95 transition-transform",
                                    "aria-label": "Passer l'onboarding",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                            lineNumber: 64,
                                            columnNumber: 17
                                        }, this),
                                        t("skip")
                                    ]
                                }, "skip-btn", true, {
                                    fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1.5 rounded-full bg-white/8 overflow-hidden relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "h-full rounded-full gradient-primary relative",
                            initial: false,
                            animate: {
                                width: `${progress}%`
                            },
                            transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 30
                            },
                            style: {
                                boxShadow: "0 0 12px rgba(255,59,48,0.4)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 shimmer rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between mt-2 px-0.5",
                        children: Array.from({
                            length: TOTAL_STEPS
                        }).map((_, i)=>{
                            const stepNum = i + 1;
                            const isDone = stepNum < clamped;
                            const isCurrent = stepNum === clamped;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: false,
                                animate: {
                                    scale: isCurrent ? 1.15 : 1,
                                    opacity: isDone || isCurrent ? 1 : 0.35
                                },
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 22
                                },
                                className: "w-1 h-1 rounded-full",
                                style: {
                                    background: isDone ? "linear-gradient(135deg, #FF3B30 0%, #F59E0B 100%)" : isCurrent ? "#F59E0B" : "rgba(255,255,255,0.4)",
                                    boxShadow: isCurrent ? "0 0 8px rgba(245, 158, 11,0.6)" : isDone ? "0 0 6px rgba(255,59,48,0.4)" : "none"
                                }
                            }, stepNum, false, {
                                fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showConfirm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: ()=>setShowConfirm(false),
                    className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 30,
                            scale: 0.96
                        },
                        animate: {
                            opacity: 1,
                            y: 0,
                            scale: 1
                        },
                        exit: {
                            opacity: 0,
                            y: 20,
                            scale: 0.96
                        },
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 28
                        },
                        onClick: (e)=>e.stopPropagation(),
                        className: "glass-card-strong p-6 max-w-md w-full text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    scale: 0,
                                    rotate: -15
                                },
                                animate: {
                                    scale: 1,
                                    rotate: 0
                                },
                                transition: {
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 14,
                                    delay: 0.05
                                },
                                className: "w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center",
                                style: {
                                    background: "linear-gradient(135deg, rgba(255,59,48,0.2) 0%, rgba(245, 158, 11,0.15) 100%)",
                                    border: "1px solid rgba(245, 158, 11,0.3)"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    size: 28,
                                    className: "text-[#F59E0B]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                    lineNumber: 146,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-white font-[family-name:var(--font-poppins)] mb-2",
                                children: t("onboardingSkipTitle")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/60 text-sm leading-relaxed mb-6",
                                children: t("onboardingSkipDesc")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                lineNumber: 152,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowConfirm(false),
                                        className: "flex-1 py-3 rounded-2xl glass-card text-white/80 font-medium text-sm active:scale-[0.98] transition-transform",
                                        children: t("onboardingContinue")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSkipConfirm,
                                        className: "flex-1 py-3 rounded-2xl gradient-primary text-white font-semibold text-sm flex items-center justify-center gap-1.5 glow-green active:scale-[0.98] transition-transform",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                                lineNumber: 167,
                                                columnNumber: 19
                                            }, this),
                                            t("onboardingGoDashboard")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                        lineNumber: 128,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                    lineNumber: 121,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/OnboardingProgress.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(OnboardingProgress, "BuxMDsl6ZOFKmujgwGyUt/CABt4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c = OnboardingProgress;
var _c;
__turbopack_context__.k.register(_c, "OnboardingProgress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/data/currency-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Currency system for Zerobet.
 *
 * All amounts are stored internally in FCFA (the app's original currency,
 * XOF = 1 FCFA). The user picks their preferred display currency on the
 * CurrencyScreen during onboarding; every displayed amount is then converted
 * via `formatCurrency` / `formatCurrencyShort` using approximate rates.
 *
 * Rates are indicative, for display purposes only — they are NOT live FX
 * rates and must not be used for real financial calculations.
 */ __turbopack_context__.s([
    "CURRENCIES",
    ()=>CURRENCIES,
    "formatCurrency",
    ()=>formatCurrency,
    "formatCurrencyShort",
    ()=>formatCurrencyShort,
    "getCurrency",
    ()=>getCurrency
]);
const CURRENCIES = [
    {
        code: "XOF",
        symbol: "FCFA",
        name: "West African CFA Franc",
        nativeName: "Franc CFA",
        flag: "🇨🇮",
        rateFromFCFA: 1,
        decimals: 0,
        position: "after",
        thousandsSeparator: " ",
        decimalSeparator: ","
    },
    {
        code: "USD",
        symbol: "$",
        name: "US Dollar",
        nativeName: "Dollar",
        flag: "🇺🇸",
        rateFromFCFA: 0.00165,
        decimals: 2,
        position: "before",
        thousandsSeparator: ",",
        decimalSeparator: "."
    },
    {
        code: "EUR",
        symbol: "€",
        name: "Euro",
        nativeName: "Euro",
        flag: "🇫🇷",
        rateFromFCFA: 0.00152,
        decimals: 2,
        position: "after",
        thousandsSeparator: " ",
        decimalSeparator: ","
    },
    {
        code: "GBP",
        symbol: "£",
        name: "British Pound",
        nativeName: "Livre sterling",
        flag: "🇬🇧",
        rateFromFCFA: 0.0013,
        decimals: 2,
        position: "before",
        thousandsSeparator: ",",
        decimalSeparator: "."
    },
    {
        code: "NGN",
        symbol: "₦",
        name: "Nigerian Naira",
        nativeName: "Naira",
        flag: "🇳🇬",
        rateFromFCFA: 2.45,
        decimals: 0,
        position: "before",
        thousandsSeparator: ",",
        decimalSeparator: "."
    },
    {
        code: "GHS",
        symbol: "₵",
        name: "Ghanaian Cedi",
        nativeName: "Cedi",
        flag: "🇬🇭",
        rateFromFCFA: 0.024,
        decimals: 2,
        position: "before",
        thousandsSeparator: ",",
        decimalSeparator: "."
    },
    {
        code: "ZAR",
        symbol: "R",
        name: "South African Rand",
        nativeName: "Rand",
        flag: "🇿🇦",
        rateFromFCFA: 0.03,
        decimals: 2,
        position: "before",
        thousandsSeparator: " ",
        decimalSeparator: "."
    },
    {
        code: "MAD",
        symbol: "DH",
        name: "Moroccan Dirham",
        nativeName: "Dirham",
        flag: "🇲🇦",
        rateFromFCFA: 0.016,
        decimals: 2,
        position: "after",
        thousandsSeparator: " ",
        decimalSeparator: ","
    },
    {
        code: "TND",
        symbol: "DT",
        name: "Tunisian Dinar",
        nativeName: "Dinar",
        flag: "🇹🇳",
        rateFromFCFA: 0.0052,
        decimals: 3,
        position: "after",
        thousandsSeparator: " ",
        decimalSeparator: ","
    },
    {
        code: "BRL",
        symbol: "R$",
        name: "Brazilian Real",
        nativeName: "Real",
        flag: "🇧🇷",
        rateFromFCFA: 0.0082,
        decimals: 2,
        position: "before",
        thousandsSeparator: ".",
        decimalSeparator: ","
    },
    {
        code: "INR",
        symbol: "₹",
        name: "Indian Rupee",
        nativeName: "Roupie",
        flag: "🇮🇳",
        rateFromFCFA: 0.138,
        decimals: 0,
        position: "before",
        thousandsSeparator: ",",
        decimalSeparator: "."
    },
    {
        code: "CNY",
        symbol: "¥",
        name: "Chinese Yuan",
        nativeName: "Yuan",
        flag: "🇨🇳",
        rateFromFCFA: 0.012,
        decimals: 2,
        position: "before",
        thousandsSeparator: ",",
        decimalSeparator: "."
    },
    {
        code: "JPY",
        symbol: "¥",
        name: "Japanese Yen",
        nativeName: "Yen",
        flag: "🇯🇵",
        rateFromFCFA: 0.24,
        decimals: 0,
        position: "before",
        thousandsSeparator: ",",
        decimalSeparator: "."
    }
];
function getCurrency(code) {
    return CURRENCIES.find((c)=>c.code === code) ?? CURRENCIES[0];
}
function formatCurrency(amountInFCFA, currency) {
    const info = getCurrency(currency);
    const converted = amountInFCFA * info.rateFromFCFA;
    const formatted = converted.toLocaleString("fr-FR", {
        minimumFractionDigits: info.decimals,
        maximumFractionDigits: info.decimals
    });
    if (info.position === "before") {
        return `${info.symbol}${formatted}`;
    }
    return `${formatted} ${info.symbol}`;
}
function formatCurrencyShort(amountInFCFA, currency) {
    const info = getCurrency(currency);
    const converted = amountInFCFA * info.rateFromFCFA;
    // For large amounts, use compact notation
    if (converted >= 1000000) {
        const millions = converted / 1000000;
        return `${millions.toFixed(1)}M ${info.symbol}`;
    }
    if (converted >= 1000) {
        const thousands = converted / 1000;
        return `${thousands.toFixed(1)}k ${info.symbol}`;
    }
    return formatCurrency(amountInFCFA, currency);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/zerobet/components/CurrencyFlag.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CurrencyFlag",
    ()=>CurrencyFlag,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
/** Map each currency to the ISO 3166-1 alpha-2 country code used for its flag. */ const CURRENCY_TO_COUNTRY = {
    XOF: "ci",
    USD: "us",
    EUR: "fr",
    GBP: "gb",
    NGN: "ng",
    GHS: "gh",
    ZAR: "za",
    MAD: "ma",
    TND: "tn",
    BRL: "br",
    INR: "in",
    CNY: "cn",
    JPY: "jp"
};
function FlagSVG({ code, width, height, className }) {
    const common = {
        width,
        height,
        viewBox: "0 0 60 42",
        className: `block overflow-hidden rounded-md border border-white/15 shadow-sm ${className ?? ""}`,
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": true
    };
    switch(code){
        case "ci":
            // Côte d'Ivoire — orange / white / green vertical stripes
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "20",
                        height: "42",
                        fill: "#FF8200"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "20",
                        width: "20",
                        height: "42",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "40",
                        width: "20",
                        height: "42",
                        fill: "#009E60"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this);
        case "us":
            // USA — 13 stripes + blue canton with stylized star grid
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "60",
                        height: "42",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "0",
                        width: "60",
                        height: "3",
                        fill: "#B22234"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "6",
                        width: "60",
                        height: "3",
                        fill: "#B22234"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "12",
                        width: "60",
                        height: "3",
                        fill: "#B22234"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "18",
                        width: "60",
                        height: "3",
                        fill: "#B22234"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "24",
                        width: "60",
                        height: "3",
                        fill: "#B22234"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "30",
                        width: "60",
                        height: "3",
                        fill: "#B22234"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "36",
                        width: "60",
                        height: "3",
                        fill: "#B22234"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "24",
                        height: "21",
                        fill: "#3C3B6E"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: 5
                    }).map((_, row)=>Array.from({
                            length: 6
                        }).map((_, col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: 2 + col * 3.6 + (row % 2 === 1 ? 1.8 : 0),
                                cy: 2.5 + row * 4,
                                r: 0.6,
                                fill: "#FFFFFF"
                            }, `${row}-${col}`, false, {
                                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this)))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this);
        case "fr":
            // France — blue / white / red vertical stripes
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "20",
                        height: "42",
                        fill: "#0055A4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "20",
                        width: "20",
                        height: "42",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "40",
                        width: "20",
                        height: "42",
                        fill: "#EF4135"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this);
        case "gb":
            // United Kingdom — Union Jack
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "60",
                        height: "42",
                        fill: "#012169"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 0 L60 42 M60 0 L0 42",
                        stroke: "#FFFFFF",
                        strokeWidth: "6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 0 L60 42 M60 0 L0 42",
                        stroke: "#C8102E",
                        strokeWidth: "3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M30 0 V42 M0 21 H60",
                        stroke: "#FFFFFF",
                        strokeWidth: "10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M30 0 V42 M0 21 H60",
                        stroke: "#C8102E",
                        strokeWidth: "6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, this);
        case "ng":
            // Nigeria — green / white / green vertical stripes
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "20",
                        height: "42",
                        fill: "#008751"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "20",
                        width: "20",
                        height: "42",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "40",
                        width: "20",
                        height: "42",
                        fill: "#008751"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 123,
                columnNumber: 9
            }, this);
        case "gh":
            // Ghana — red / yellow / green horizontal bands + black star
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "60",
                        height: "14",
                        fill: "#CE1126"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "14",
                        width: "60",
                        height: "14",
                        fill: "#FCD116"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "28",
                        width: "60",
                        height: "14",
                        fill: "#006B3F"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M30 16.5 L31.3 20.3 L35.3 20.3 L32.1 22.6 L33.3 26.4 L30 24.1 L26.7 26.4 L27.9 22.6 L24.7 20.3 L28.7 20.3 Z",
                        fill: "#000000"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this);
        case "za":
            // South Africa — red top / blue bottom / black hoist triangle / green Y with white & yellow bands
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "60",
                        height: "21",
                        fill: "#DE3831"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "21",
                        width: "60",
                        height: "21",
                        fill: "#002395"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "0,0 0,42 22,21",
                        fill: "#000000"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "22,21 60,3 60,8",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "22,21 60,34 60,39",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "22,21 60,8 60,10.5",
                        fill: "#FFB612"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "22,21 60,31.5 60,34",
                        fill: "#FFB612"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "22,21 60,10.5 60,31.5",
                        fill: "#00A651"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 145,
                columnNumber: 9
            }, this);
        case "ma":
            // Morocco — red field with green pentagram star
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "60",
                        height: "42",
                        fill: "#C1272D"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M30 12 L32.6 19.4 L40.4 19.4 L34.1 24 L36.5 31.5 L30 26.9 L23.5 31.5 L25.9 24 L19.6 19.4 L27.4 19.4 Z",
                        fill: "none",
                        stroke: "#006233",
                        strokeWidth: "1.4",
                        strokeLinejoin: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 165,
                columnNumber: 9
            }, this);
        case "tn":
            // Tunisia — red field with white disc + red crescent & 5-point star
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "60",
                        height: "42",
                        fill: "#E70013"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 181,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "30",
                        cy: "21",
                        r: "8",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "31.5",
                        cy: "21",
                        r: "6.2",
                        fill: "#E70013"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M27.5 21 L28.1 22.6 L29.8 22.6 L28.4 23.6 L29 25.2 L27.5 24.2 L26 25.2 L26.6 23.6 L25.2 22.6 L26.9 22.6 Z",
                        fill: "#E70013"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 180,
                columnNumber: 9
            }, this);
        case "br":
            // Brazil — green field, yellow diamond, blue circle with white band + stars
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "60",
                        height: "42",
                        fill: "#009C3B"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "30,5 55,21 30,37 5,21",
                        fill: "#FFDF00"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "30",
                        cy: "21",
                        r: "8",
                        fill: "#002776"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 198,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M22 22 Q30 16 38 22",
                        stroke: "#FFFFFF",
                        strokeWidth: "1.4",
                        fill: "none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "26",
                        cy: "19",
                        r: "0.5",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "30",
                        cy: "18",
                        r: "0.5",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "34",
                        cy: "20",
                        r: "0.5",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "28",
                        cy: "23",
                        r: "0.5",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "32",
                        cy: "24",
                        r: "0.5",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 195,
                columnNumber: 9
            }, this);
        case "in":
            // India — saffron / white / green horizontal bands + blue Ashoka chakra
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "60",
                        height: "14",
                        fill: "#FF9933"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "14",
                        width: "60",
                        height: "14",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        y: "28",
                        width: "60",
                        height: "14",
                        fill: "#138808"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: "translate(30 21)",
                        stroke: "#000080",
                        strokeWidth: "0.6",
                        fill: "none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                r: "5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, this),
                            Array.from({
                                length: 12
                            }).map((_, i)=>{
                                const angle = i * 30 * Math.PI / 180;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: 0,
                                    y1: 0,
                                    x2: Math.cos(angle) * 5,
                                    y2: Math.sin(angle) * 5
                                }, i, false, {
                                    fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                    lineNumber: 227,
                                    columnNumber: 17
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                r: "0.6",
                                fill: "#000080",
                                stroke: "none"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, this);
        case "cn":
            // China — red field with one large star + 4 small stars (gold)
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "60",
                        height: "42",
                        fill: "#DE2910"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: "translate(12 12)",
                        fill: "#FFDE00",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M0 -6 L1.76 -1.85 L6 -1.85 L2.6 0.7 L3.9 4.85 L0 2.4 L-3.9 4.85 L-2.6 0.7 L-6 -1.85 L-1.76 -1.85 Z"
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                            lineNumber: 247,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        fill: "#FFDE00",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                transform: "translate(24 6) rotate(-25)",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M0 -2 L0.59 -0.62 L2 -0.62 L0.87 0.24 L1.3 1.62 L0 0.8 L-1.3 1.62 L-0.87 0.24 L-2 -0.62 L-0.59 -0.62 Z"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                transform: "translate(28 11) rotate(-10)",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M0 -2 L0.59 -0.62 L2 -0.62 L0.87 0.24 L1.3 1.62 L0 0.8 L-1.3 1.62 L-0.87 0.24 L-2 -0.62 L-0.59 -0.62 Z"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                lineNumber: 254,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                transform: "translate(28 17) rotate(15)",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M0 -2 L0.59 -0.62 L2 -0.62 L0.87 0.24 L1.3 1.62 L0 0.8 L-1.3 1.62 L-0.87 0.24 L-2 -0.62 L-0.59 -0.62 Z"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                    lineNumber: 258,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                transform: "translate(24 22) rotate(35)",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M0 -2 L0.59 -0.62 L2 -0.62 L0.87 0.24 L1.3 1.62 L0 0.8 L-1.3 1.62 L-0.87 0.24 L-2 -0.62 L-0.59 -0.62 Z"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                    lineNumber: 261,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                                lineNumber: 260,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 243,
                columnNumber: 9
            }, this);
        case "jp":
            // Japan — white field with red disc
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "60",
                        height: "42",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 270,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "30",
                        cy: "21",
                        r: "8",
                        fill: "#BC002D"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                        lineNumber: 271,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 269,
                columnNumber: 9
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    width: "60",
                    height: "42",
                    fill: "#9CA3AF"
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                    lineNumber: 277,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
                lineNumber: 276,
                columnNumber: 9
            }, this);
    }
}
_c = FlagSVG;
function CurrencyFlag({ currencyCode, size = 32, className }) {
    const countryCode = CURRENCY_TO_COUNTRY[currencyCode] ?? "ci";
    const height = Math.round(size * 0.7);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlagSVG, {
        code: countryCode,
        width: size,
        height: height,
        className: className
    }, void 0, false, {
        fileName: "[project]/src/components/zerobet/components/CurrencyFlag.tsx",
        lineNumber: 287,
        columnNumber: 5
    }, this);
}
_c1 = CurrencyFlag;
const __TURBOPACK__default__export__ = CurrencyFlag;
var _c, _c1;
__turbopack_context__.k.register(_c, "FlagSVG");
__turbopack_context__.k.register(_c1, "CurrencyFlag");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/zerobet/screens/CurrencyScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CurrencyScreen",
    ()=>CurrencyScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coins.js [app-client] (ecmascript) <export default as Coins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/zerobet-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/haptics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$OnboardingProgress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/OnboardingProgress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$currency$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/currency-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$CurrencyFlag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/CurrencyFlag.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function CurrencyScreen() {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const { currency, setCurrency, navigate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const handleSelect = (code)=>{
        setCurrency(code);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].selection();
    };
    const handleContinue = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
        navigate("welcome");
    };
    // Preview amount: 10 000 FCFA — the canonical "weekly bet" example.
    const PREVIEW_AMOUNT_FCFA = 10000;
    const previewFormatted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$currency$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(PREVIEW_AMOUNT_FCFA, currency);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col px-6 pt-14 pb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$OnboardingProgress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnboardingProgress"], {
                currentStep: 3
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "text-center mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            scale: 0,
                            rotate: -20
                        },
                        animate: {
                            scale: 1,
                            rotate: 0
                        },
                        transition: {
                            type: "spring",
                            stiffness: 220,
                            damping: 16,
                            delay: 0.1
                        },
                        className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3",
                        style: {
                            background: "linear-gradient(135deg, rgba(245, 158, 11,0.18) 0%, rgba(255,59,48,0.14) 100%)",
                            border: "1px solid rgba(245, 158, 11,0.3)"
                        },
                        "aria-hidden": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                            size: 26,
                            className: "text-[#F59E0B]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2",
                        children: t("currencyTitle")
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/60 text-sm max-w-xs mx-auto",
                        children: t("currencySubtitle")
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 16
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: 0.2
                },
                className: "glass-card-strong p-4 mb-5 rounded-2xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] uppercase tracking-wider text-white/50 font-[family-name:var(--font-poppins)] mb-1",
                                    children: t("currencyPreview")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-white/60 leading-relaxed",
                                    children: [
                                        "10 000 FCFA",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mx-1.5 text-white/30",
                                            children: "→"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white font-semibold",
                                            children: previewFormatted
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                            style: {
                                background: "linear-gradient(135deg, rgba(245, 158, 11,0.16) 0%, rgba(255,59,48,0.10) 100%)"
                            },
                            "aria-hidden": true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$CurrencyFlag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CurrencyFlag"], {
                                currencyCode: currency,
                                size: 28
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 max-w-sm mx-auto w-full",
                role: "radiogroup",
                "aria-label": t("currencyTitle"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1 pb-2 custom-scroll",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$currency$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURRENCIES"].map((c, idx)=>{
                        const selected = currency === c.code;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            type: "button",
                            role: "radio",
                            "aria-checked": selected,
                            "aria-label": `${c.nativeName} — ${c.code} (${c.symbol})`,
                            initial: {
                                opacity: 0,
                                y: 16,
                                scale: 0.96
                            },
                            animate: {
                                opacity: 1,
                                y: 0,
                                scale: 1
                            },
                            transition: {
                                delay: 0.03 * idx,
                                type: "spring",
                                stiffness: 260,
                                damping: 22
                            },
                            whileTap: {
                                scale: 0.97
                            },
                            whileHover: {
                                scale: 1.02
                            },
                            onClick: ()=>handleSelect(c.code),
                            className: `relative glass-card card-hover btn-press p-4 rounded-2xl flex flex-col items-start text-left overflow-hidden transition-all ${selected ? "ring-2 ring-[#F59E0B] glow-orange" : ""}`,
                            children: [
                                selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        scale: 0
                                    },
                                    animate: {
                                        scale: 1
                                    },
                                    transition: {
                                        type: "spring",
                                        stiffness: 320,
                                        damping: 18
                                    },
                                    className: "absolute top-2 right-2 w-5 h-5 rounded-full gradient-primary flex items-center justify-center z-10",
                                    "aria-hidden": true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        size: 12,
                                        className: "text-white",
                                        strokeWidth: 3
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                        lineNumber: 146,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                    lineNumber: 139,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "leading-none mb-2 block",
                                    "aria-hidden": true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$CurrencyFlag$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CurrencyFlag"], {
                                        currencyCode: c.code,
                                        size: 36
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                        lineNumber: 151,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                    lineNumber: 150,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white font-bold text-sm font-[family-name:var(--font-poppins)] tracking-wide",
                                    children: c.code
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                    lineNumber: 153,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/55 text-[11px] leading-tight mt-0.5 line-clamp-1",
                                    children: c.nativeName
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                    lineNumber: 156,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium",
                                    style: {
                                        background: "rgba(245, 158, 11,0.10)",
                                        color: "#FFB84D"
                                    },
                                    children: c.symbol
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                                    lineNumber: 159,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, c.code, true, {
                            fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                            lineNumber: 122,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: 0.4
                },
                whileTap: {
                    scale: 0.98
                },
                onClick: handleContinue,
                className: "mt-6 mx-auto max-w-sm w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-green btn-press flex items-center justify-center gap-2",
                children: [
                    t("continue"),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CurrencyScreen.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(CurrencyScreen, "m1Pe+HoFbEGbK8qeqWwjTjE1mIw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = CurrencyScreen;
var _c;
__turbopack_context__.k.register(_c, "CurrencyScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/zerobet/screens/CurrencyScreen.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/zerobet/screens/CurrencyScreen.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_c0c55843._.js.map