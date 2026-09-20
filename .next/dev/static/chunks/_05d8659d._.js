(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/data/app-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Symptoms checker data + Engagement goals + Paywall plans
 *
 * All user-facing copy is exposed via i18n keys resolved against
 * `src/lib/i18n/dictionary.ts` (Task 19-a).
 */ __turbopack_context__.s([
    "ENGAGEMENT_GOALS",
    ()=>ENGAGEMENT_GOALS,
    "PLAN_OPTIONS",
    ()=>PLAN_OPTIONS,
    "SAVINGS_GOALS",
    ()=>SAVINGS_GOALS,
    "SYMPTOM_CATEGORIES",
    ()=>SYMPTOM_CATEGORIES
]);
const SYMPTOM_CATEGORIES = [
    {
        key: "financial",
        labelKey: "symptomCatFinancialLabel",
        icon: "💸",
        color: "#FF3B30",
        symptomKeys: [
            "symptomFinancial1",
            "symptomFinancial2",
            "symptomFinancial3",
            "symptomFinancial4",
            "symptomFinancial5",
            "symptomFinancial6"
        ]
    },
    {
        key: "mental",
        labelKey: "symptomCatMentalLabel",
        icon: "🧠",
        color: "#FFD166",
        symptomKeys: [
            "symptomMental1",
            "symptomMental2",
            "symptomMental3",
            "symptomMental4",
            "symptomMental5",
            "symptomMental6"
        ]
    },
    {
        key: "social",
        labelKey: "symptomCatSocialLabel",
        icon: "👥",
        color: "#FFB020",
        symptomKeys: [
            "symptomSocial1",
            "symptomSocial2",
            "symptomSocial3",
            "symptomSocial4",
            "symptomSocial5",
            "symptomSocial6"
        ]
    },
    {
        key: "physical",
        labelKey: "symptomCatPhysicalLabel",
        icon: "💪",
        color: "#FBBF24",
        symptomKeys: [
            "symptomPhysical1",
            "symptomPhysical2",
            "symptomPhysical3",
            "symptomPhysical4",
            "symptomPhysical5",
            "symptomPhysical6"
        ]
    },
    {
        key: "family",
        labelKey: "symptomCatFamilyLabel",
        icon: "👨‍👩‍👧",
        color: "#FFC94D",
        symptomKeys: [
            "symptomFamily1",
            "symptomFamily2",
            "symptomFamily3",
            "symptomFamily4",
            "symptomFamily5",
            "symptomFamily6"
        ]
    }
];
const ENGAGEMENT_GOALS = [
    {
        key: "family",
        labelKey: "goalFamilyLabel",
        descKey: "goalFamilyDesc",
        icon: "👨‍👩‍👧"
    },
    {
        key: "money",
        labelKey: "goalMoneyLabel",
        descKey: "goalMoneyDesc",
        icon: "💰"
    },
    {
        key: "health",
        labelKey: "goalHealthLabel",
        descKey: "goalHealthDesc",
        icon: "🧠"
    },
    {
        key: "dignity",
        labelKey: "goalDignityLabel",
        descKey: "goalDignityDesc",
        icon: "🛡️"
    },
    {
        key: "future",
        labelKey: "goalFutureLabel",
        descKey: "goalFutureDesc",
        icon: "🚀"
    },
    {
        key: "freedom",
        labelKey: "goalFreedomLabel",
        descKey: "goalFreedomDesc",
        icon: "🕊️"
    }
];
const PLAN_OPTIONS = [
    {
        id: "free",
        name: "Gratuit",
        nameKey: "planFree",
        tagline: "Pour commencer ton parcours",
        taglineKey: "planFreeTagline",
        monthlyPrice: 0,
        annualPrice: 0,
        color: "#9CA3AF",
        gradient: "linear-gradient(135deg, #6B7280 0%, #374151 100%)",
        icon: "🌱",
        features: [
            "Quiz complet (15 questions)",
            "Score et niveau d'addiction",
            "Carousel éducatif (8 slides)",
            "Vérificateur de symptômes",
            "3 témoignages par jour",
            "Compteur de série basique",
            "Coffre de récupération (visualisation)",
            "Notifications de rappel"
        ],
        featureKeys: [
            "planFreeFeature1",
            "planFreeFeature2",
            "planFreeFeature3",
            "planFreeFeature4",
            "planFreeFeature5",
            "planFreeFeature6",
            "planFreeFeature7",
            "planFreeFeature8"
        ],
        lockedFeatures: [
            "Bouton Panique complet",
            "Atlas AI Coach",
            "Journal illimité + analyse IA",
            "Bloqueur de paris",
            "Communauté complète",
            "Accès mentors & psychologues"
        ]
    },
    {
        id: "premium",
        name: "Premium",
        nameKey: "planPremium",
        tagline: "Le plus populaire — récupération complète",
        taglineKey: "planPremiumTagline",
        // Quittr-inspired premium pricing: ~$20/month, ~$200/year at 600 FCFA/USD.
        // Higher than Quittr ($19.99/mo, $119.99/yr) because Zerobet is a more
        // comprehensive app (13 artifacts, AI coach, community chat, betting
        // blocker, etc.) targeting the African francophone market.
        monthlyPrice: 12000,
        annualPrice: 120000,
        color: "#FF3B30",
        gradient: "linear-gradient(135deg, #FF3B30 0%, #F59E0B 100%)",
        icon: "⭐",
        popular: true,
        features: [
            "Tout le plan Gratuit",
            "Bouton Panique complet (4-7-8)",
            "Atlas AI Coach illimité",
            "Journal illimité + analyse IA",
            "Bloqueur de paris (50+ sites)",
            "Mode Fort 72h",
            "Statistiques détaillées (30/60/90j)",
            "Communauté complète (forum, témoignages)",
            "Contenu exclusif Premium",
            "Suppression des publicités",
            "Support prioritaire"
        ],
        featureKeys: [
            "planPremiumFeature1",
            "planPremiumFeature2",
            "planPremiumFeature3",
            "planPremiumFeature4",
            "planPremiumFeature5",
            "planPremiumFeature6",
            "planPremiumFeature7",
            "planPremiumFeature8",
            "planPremiumFeature9",
            "planPremiumFeature10",
            "planPremiumFeature11"
        ]
    },
    {
        id: "mentor",
        name: "Mentor",
        nameKey: "planMentor",
        tagline: "Deviens un guide pour les autres",
        taglineKey: "planMentorTagline",
        // Mentor tier: ~$33/month, ~$333/year. Includes everything in Premium
        // plus mentor access (verified badge, mentor directory, coaching tools).
        monthlyPrice: 20000,
        annualPrice: 200000,
        color: "#FFC94D",
        gradient: "linear-gradient(135deg, #FFC94D 0%, #FFB020 100%)",
        icon: "🛡️",
        features: [
            "Tout le plan Premium",
            "Badge Mentor vérifié",
            "Répondre en tant que mentor",
            "Annuaire des mentors",
            "Statistiques de mentorat",
            "Outils de coaching",
            "Conditions : 90 jours sans pari minimum"
        ],
        featureKeys: [
            "planMentorFeature1",
            "planMentorFeature2",
            "planMentorFeature3",
            "planMentorFeature4",
            "planMentorFeature5",
            "planMentorFeature6",
            "planMentorFeature7"
        ]
    },
    {
        id: "psychologist",
        name: "Psychologue",
        nameKey: "planPsychologist",
        tagline: "Pour les professionnels certifiés",
        taglineKey: "planPsychologistTagline",
        // Psychologist tier: ~$67/month, ~$667/year. Includes everything in
        // Premium plus a professional profile, member chat, session management,
        // and customization — designed for certified therapists.
        monthlyPrice: 40000,
        annualPrice: 400000,
        color: "#FFD166",
        gradient: "linear-gradient(135deg, #FFD166 0%, #FFB020 100%)",
        icon: "🎓",
        features: [
            "Tout le plan Premium",
            "Profil professionnel certifié",
            "Chat avec les membres",
            "Badge professionnel certifié",
            "Gestion des sessions",
            "Tarif de session personnalisable",
            "Vérification sous 48h"
        ],
        featureKeys: [
            "planPsychologistFeature1",
            "planPsychologistFeature2",
            "planPsychologistFeature3",
            "planPsychologistFeature4",
            "planPsychologistFeature5",
            "planPsychologistFeature6",
            "planPsychologistFeature7"
        ]
    }
];
const SAVINGS_GOALS = [
    {
        label: "Un téléphone",
        amount: 75000,
        icon: "📱"
    },
    {
        label: "Une moto",
        amount: 450000,
        icon: "🏍️"
    },
    {
        label: "Un terrain",
        amount: 1500000,
        icon: "🏠"
    },
    {
        label: "Un business",
        amount: 500000,
        icon: "🏪"
    },
    {
        label: "Un voyage",
        amount: 300000,
        icon: "✈️"
    },
    {
        label: "Les études des enfants",
        amount: 800000,
        icon: "🎓"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
                className: "sticky top-0 z-30 -mx-6 px-6 pt-3 pb-2.5 mb-2 backdrop-blur-xl bg-[#0B0704]/80 border-b border-white/5",
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
"[project]/src/components/zerobet/screens/SymptomsScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SymptomsScreen",
    ()=>SymptomsScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/zerobet-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$app$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/app-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$OnboardingProgress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/OnboardingProgress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-client] (ecmascript)");
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
function SymptomsScreen() {
    _s();
    const { selectedSymptoms, toggleSymptom, navigate, goBack } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$app$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SYMPTOM_CATEGORIES"][0].key);
    const totalSelected = Object.values(selectedSymptoms).reduce((sum, arr)=>sum + arr.length, 0);
    const category = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$app$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SYMPTOM_CATEGORIES"].find((c)=>c.key === activeCategory);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col px-6 pt-12 pb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$OnboardingProgress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnboardingProgress"], {
                currentStep: 6
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: goBack,
                        className: "w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95",
                        "aria-label": t("back"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            size: 20,
                            className: "text-white"
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/50 text-xs",
                                children: t("symptomsStep", {
                                    n: 6,
                                    total: 8
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-bold text-white font-[family-name:var(--font-poppins)]",
                                children: t("symptomsTitle")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/60 text-sm mb-5",
                children: [
                    t("symptomsSubtitle"),
                    " ",
                    t("symptomsHelpPersonalize")
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-4 -mx-6 px-6",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$app$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SYMPTOM_CATEGORIES"].map((cat)=>{
                    const count = (selectedSymptoms[cat.key] || []).length;
                    const isActive = activeCategory === cat.key;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveCategory(cat.key),
                        className: `flex-shrink-0 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all flex items-center gap-2 ${isActive ? "text-white" : "glass-card text-white/60"}`,
                        style: isActive ? {
                            background: cat.color,
                            boxShadow: `0 0 20px ${cat.color}50`
                        } : {},
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: cat.icon
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this),
                            t(cat.labelKey),
                            count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-white/10"}`,
                                children: count
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                                lineNumber: 62,
                                columnNumber: 17
                            }, this)
                        ]
                    }, cat.key, true, {
                        fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto custom-scroll -mx-6 px-6 pb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 10
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: -10
                        },
                        transition: {
                            duration: 0.2
                        },
                        className: "space-y-2",
                        children: category.symptomKeys.map((symptomKey, idx)=>{
                            const isSelected = (selectedSymptoms[category.key] || []).includes(symptomKey);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                initial: {
                                    opacity: 0,
                                    x: -10
                                },
                                animate: {
                                    opacity: 1,
                                    x: 0
                                },
                                transition: {
                                    delay: idx * 0.03
                                },
                                whileTap: {
                                    scale: 0.98
                                },
                                onClick: ()=>toggleSymptom(category.key, symptomKey),
                                className: `w-full p-4 rounded-2xl text-left flex items-center justify-between transition-all border ${isSelected ? "border-transparent text-white" : "glass-card text-white/80 border-white/5"}`,
                                style: isSelected ? {
                                    background: `${category.color}25`,
                                    border: `1px solid ${category.color}`
                                } : {},
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-sm",
                                        children: t(symptomKey)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                                        lineNumber: 101,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-6 h-6 rounded-full flex items-center justify-center transition-all ${isSelected ? "" : "bg-white/10"}`,
                                        style: isSelected ? {
                                            background: category.color
                                        } : {},
                                        children: isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            size: 14,
                                            className: "text-white",
                                            strokeWidth: 3
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                                            lineNumber: 108,
                                            columnNumber: 36
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                                        lineNumber: 102,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, symptomKey, true, {
                                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                                lineNumber: 87,
                                columnNumber: 17
                            }, this);
                        })
                    }, activeCategory, false, {
                        fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-white/40 text-xs mb-3",
                        children: t("symptomsCount", {
                            n: totalSelected
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>navigate("carousel"),
                        className: "w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base glow-green flex items-center justify-center gap-2 active:scale-[0.98] transition-transform",
                        children: [
                            t("continue"),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/SymptomsScreen.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(SymptomsScreen, "tioINraTAWkSwGys9dWYyIPslqE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c = SymptomsScreen;
var _c;
__turbopack_context__.k.register(_c, "SymptomsScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/zerobet/screens/SymptomsScreen.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/zerobet/screens/SymptomsScreen.tsx [app-client] (ecmascript)"));
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronLeft
]);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }
    ]
];
const ChevronLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-left", __iconNode);
;
 //# sourceMappingURL=chevron-left.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronRight
]);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-right", __iconNode);
;
 //# sourceMappingURL=chevron-right.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Check
]);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }
    ]
];
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("check", __iconNode);
;
 //# sourceMappingURL=check.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>X
]);
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
];
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("x", __iconNode);
;
 //# sourceMappingURL=x.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "X",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_05d8659d._.js.map