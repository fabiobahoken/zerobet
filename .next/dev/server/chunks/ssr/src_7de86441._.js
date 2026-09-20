module.exports = [
"[project]/src/lib/data/parcours-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * La Quête des Artéfacts — 13 niveaux/rangs
 *
 * Le Chercheur (l'utilisateur) traverse une épopée pour reconquérir
 * sa liberté face à l'Ombre de la Dépendance. Chaque artéfact débloqué
 * lui confère un Pouvoir qui le rapproche de la libération finale.
 *
 * Chaque artéfact possède une aura magnétique apaisante unique.
 */ __turbopack_context__.s([
    "PARCOURS_RANKS",
    ()=>PARCOURS_RANKS,
    "getCurrentRank",
    ()=>getCurrentRank,
    "getNextRank",
    ()=>getNextRank,
    "getUnlockedRanks",
    ()=>getUnlockedRanks
]);
const PARCOURS_RANKS = [
    {
        key: "jour-1",
        tier: 1,
        name: "Le Cristal d'Aube",
        subtitle: "Jour 1",
        nameKey: "artifact1Name",
        subtitleKey: "artifact1Subtitle",
        requiredDays: 1,
        color: "#E8E8E8",
        glow: "rgba(232, 232, 232, 0.6)",
        gradient: "linear-gradient(135deg, #F5F5F5 0%, #9CA3AF 100%)",
        icon: "jour-1",
        description: "Posé sur ton chemin au premier lever du soleil, ce cristal brille de l'espoir des recommencements. Il éclaire la sortie de l'ombre.",
        unlockedByDefault: false,
        artifactType: "Cristal",
        powerName: "Première Lumière",
        powerDescription: "Illumine le chemin à parcourir et dissipe l'obscurité des premiers doutes.",
        auraColor: "#E8E8E8",
        auraGradient: "radial-gradient(circle at center, rgba(232,232,232,0.35) 0%, rgba(232,232,232,0.10) 40%, transparent 70%)",
        story: "Posé sur ton chemin au premier lever du soleil, ce cristal brille de l'espoir des recommencements.",
        descKey: "artifact1Desc",
        storyKey: "artifact1Story"
    },
    {
        key: "jour-3",
        tier: 2,
        name: "L'Amulette de Brume",
        subtitle: "Jour 3",
        nameKey: "artifact2Name",
        subtitleKey: "artifact2Subtitle",
        requiredDays: 3,
        color: "#FFB020",
        glow: "rgba(255,176,32, 0.6)",
        gradient: "linear-gradient(135deg, #FFB020 0%, #FF9A3D 100%)",
        icon: "jour-3",
        description: "Forgée dans les brumes du réveil, elle protège ton esprit des illusions du jeu et dissipe le brouillard mental du sevrage précoce.",
        artifactType: "Amulette",
        powerName: "Vision Claire",
        powerDescription: "Dissipe le brouillard mental des premiers jours de sevrage et clarifie la pensée.",
        auraColor: "#FFB020",
        auraGradient: "radial-gradient(circle at center, rgba(255,176,32,0.35) 0%, rgba(255,176,32,0.10) 40%, transparent 70%)",
        story: "Forgée dans les brumes du réveil, elle protège ton esprit des illusions du jeu.",
        descKey: "artifact2Desc",
        storyKey: "artifact2Story"
    },
    {
        key: "jour-7",
        tier: 3,
        name: "Le Bouclier de Bronze",
        subtitle: "Jour 7 — Une semaine !",
        nameKey: "artifact3Name",
        subtitleKey: "artifact3Subtitle",
        requiredDays: 7,
        color: "#CD7F32",
        glow: "rgba(205, 127, 50, 0.7)",
        gradient: "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)",
        icon: "jour-7",
        description: "Ta première vraie défense. Sept jours de forge l'ont rendu incassable. Les envies rebondissent désormais sur sa surface.",
        artifactType: "Bouclier",
        powerName: "Garde-Renvoi",
        powerDescription: "Renvoie les envies de pari dans le vide, réduisant leur intensité de moitié.",
        auraColor: "#CD7F32",
        auraGradient: "radial-gradient(circle at center, rgba(205,127,50,0.40) 0%, rgba(205,127,50,0.12) 40%, transparent 70%)",
        story: "Ta première vraie défense. Sept jours de forge l'ont rendu incassable.",
        descKey: "artifact3Desc",
        storyKey: "artifact3Story"
    },
    {
        key: "jour-14",
        tier: 4,
        name: "Les Runes d'Argent",
        subtitle: "Jour 14 — Deux semaines",
        nameKey: "artifact4Name",
        subtitleKey: "artifact4Subtitle",
        requiredDays: 14,
        color: "#C0C0C0",
        glow: "rgba(192, 192, 192, 0.7)",
        gradient: "linear-gradient(135deg, #E8E8E8 0%, #A0A0A0 100%)",
        icon: "jour-14",
        description: "Gravées par les anciens récupérateurs, ces runes portent leur sagesse et fortifient les voies neuronales endommagées par le jeu.",
        artifactType: "Runes",
        powerName: "Mémoire Ancienne",
        powerDescription: "Renforce les voies neuronales et accélère la réparation du cerveau.",
        auraColor: "#C0C0C0",
        auraGradient: "radial-gradient(circle at center, rgba(192,192,192,0.40) 0%, rgba(192,192,192,0.12) 40%, transparent 70%)",
        story: "Gravées par les anciens récupérateurs, ces runes portent leur sagesse.",
        descKey: "artifact4Desc",
        storyKey: "artifact4Story"
    },
    {
        key: "jour-30",
        tier: 5,
        name: "Le Sceptre d'Or",
        subtitle: "Jour 30 — Un mois !",
        nameKey: "artifact5Name",
        subtitleKey: "artifact5Subtitle",
        requiredDays: 30,
        color: "#FFD700",
        glow: "rgba(255, 215, 0, 0.8)",
        gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
        icon: "jour-30",
        description: "Un mois de conquête. Ce sceptre couronne ta détermination et bannit le doute de ton esprit. Tu règnes sur ton propre royaume.",
        artifactType: "Sceptre",
        powerName: "Volonté Royale",
        powerDescription: "Commande ton esprit et bannit le doute de soi. Tu deviens souverain de tes décisions.",
        auraColor: "#FFD700",
        auraGradient: "radial-gradient(circle at center, rgba(255,215,0,0.45) 0%, rgba(255,165,0,0.15) 40%, transparent 70%)",
        story: "Un mois de conquête. Ce sceptre couronne ta détermination.",
        descKey: "artifact5Desc",
        storyKey: "artifact5Story"
    },
    {
        key: "jour-45",
        tier: 6,
        name: "L'Orbe de Platine",
        subtitle: "Jour 45",
        nameKey: "artifact6Name",
        subtitleKey: "artifact6Subtitle",
        requiredDays: 45,
        color: "#E5E4E2",
        glow: "rgba(229, 228, 226, 0.8)",
        gradient: "linear-gradient(135deg, #E5E4E2 0%, #B9F2FF 100%)",
        icon: "jour-45",
        description: "Sphère de lumière pure, elle absorbe les tensions et renvoie la paix. Les tempêtes émotionnelles s'apaisent dans son halo.",
        artifactType: "Orbe",
        powerName: "Sérénité Pure",
        powerDescription: "Apaise la tempête émotionnelle et absorbe les tensions pour renvoyer la paix.",
        auraColor: "#E5E4E2",
        auraGradient: "radial-gradient(circle at center, rgba(229,228,226,0.45) 0%, rgba(185,242,255,0.15) 40%, transparent 70%)",
        story: "Sphère de lumière pure, elle absorbe les tensions et renvoie la paix.",
        descKey: "artifact6Desc",
        storyKey: "artifact6Story"
    },
    {
        key: "jour-60",
        tier: 7,
        name: "Le Cœur de Diamant",
        subtitle: "Jour 60",
        nameKey: "artifact7Name",
        subtitleKey: "artifact7Subtitle",
        requiredDays: 60,
        color: "#FFB020",
        glow: "rgba(255,176,32, 0.8)",
        gradient: "linear-gradient(135deg, #FFB020 0%, #FFD166 100%)",
        icon: "jour-60",
        description: "Deux mois de pression l'ont cristallisé. Rien ne peut le briser. Ta volonté est devenue un cristal indestructible au cœur de ta poitrine.",
        artifactType: "Cœur Cristal",
        powerName: "Incassable",
        powerDescription: "Rend ta volonté incassable. Aucune tentation ne peut fissurer ta détermination.",
        auraColor: "#FFB020",
        auraGradient: "radial-gradient(circle at center, rgba(255,176,32,0.45) 0%, rgba(90,200,250,0.15) 40%, transparent 70%)",
        story: "Deux mois de pression l'ont cristallisé. Rien ne peut le briser.",
        descKey: "artifact7Desc",
        storyKey: "artifact7Story"
    },
    {
        key: "jour-90",
        tier: 8,
        name: "L'Émeraude de Renaissance",
        subtitle: "Jour 90 — Le cap critique",
        nameKey: "artifact8Name",
        subtitleKey: "artifact8Subtitle",
        requiredDays: 90,
        color: "#FFC94D",
        glow: "rgba(255,201,77, 0.8)",
        gradient: "linear-gradient(135deg, #FFC94D 0%, #FF8A00 100%)",
        icon: "jour-90",
        description: "Le cap des 90 jours. Ton cerveau est né de nouveau. Tu es devenu quelqu'un d'autre, façonné par trois mois de guérison neuronale.",
        artifactType: "Pierre Précieuse",
        powerName: "Neuroplasticité",
        powerDescription: "Ton cerveau s'est reconfiguré. Tu es renouvelé, littéralement transformé.",
        auraColor: "#FFC94D",
        auraGradient: "radial-gradient(circle at center, rgba(255,201,77,0.50) 0%, rgba(34,197,94,0.15) 40%, transparent 70%)",
        story: "Le cap des 90 jours. Ton cerveau est né de nouveau. Tu es devenu quelqu'un d'autre.",
        descKey: "artifact8Desc",
        storyKey: "artifact8Story"
    },
    {
        key: "jour-120",
        tier: 9,
        name: "Le Saphir de Sagesse",
        subtitle: "Jour 120",
        nameKey: "artifact9Name",
        subtitleKey: "artifact9Subtitle",
        requiredDays: 120,
        color: "#FFB020",
        glow: "rgba(255,176,32, 0.8)",
        gradient: "linear-gradient(135deg, #FFB020 0%, #FFB020 100%)",
        icon: "jour-120",
        description: "Quatre mois de méditation ont poli cette pierre. Elle révèle les vérités cachées et te fait voir les déclencheurs avant qu'ils n'apparaissent.",
        artifactType: "Pierre Précieuse",
        powerName: "Vision Profonde",
        powerDescription: "Voit les déclencheurs avant qu'ils n'apparaissent et comprend les motifs profonds de tes envies.",
        auraColor: "#FFB020",
        auraGradient: "radial-gradient(circle at center, rgba(255,176,32,0.50) 0%, rgba(88,86,214,0.15) 40%, transparent 70%)",
        story: "Quatre mois de méditation ont poli cette pierre. Elle révèle les vérités cachées.",
        descKey: "artifact9Desc",
        storyKey: "artifact9Story"
    },
    {
        key: "jour-180",
        tier: 10,
        name: "Le Rubis de Passion",
        subtitle: "Jour 180 — Six mois",
        nameKey: "artifact10Name",
        subtitleKey: "artifact10Subtitle",
        requiredDays: 180,
        color: "#FF3B30",
        glow: "rgba(255, 59, 48, 0.9)",
        gradient: "linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)",
        icon: "jour-180",
        description: "Six mois. Le feu qui te détruisait devient celui qui te motive. Le faux frisson du jeu est remplacé par la passion vraie pour la vie.",
        artifactType: "Pierre Précieuse",
        powerName: "Feu Intérieur",
        powerDescription: "Remplace l'excitation illusoire du jeu par une passion vraie pour la vie.",
        auraColor: "#FF3B30",
        auraGradient: "radial-gradient(circle at center, rgba(255,59,48,0.55) 0%, rgba(255,107,107,0.15) 40%, transparent 70%)",
        story: "Six mois. Le feu qui te détruisait devient celui qui te motive.",
        descKey: "artifact10Desc",
        storyKey: "artifact10Story"
    },
    {
        key: "jour-270",
        tier: 11,
        name: "L'Améthyste de Maîtrise",
        subtitle: "Jour 270",
        nameKey: "artifact11Name",
        subtitleKey: "artifact11Subtitle",
        requiredDays: 270,
        color: "#FFD166",
        glow: "rgba(255, 209, 102, 0.9)",
        gradient: "linear-gradient(135deg, #FFD166 0%, #9B30FF 100%)",
        icon: "jour-270",
        description: "Neuf mois. Tu danses avec tes envies sans plus jamais trembler. La maîtrise totale de tes impulsions est enfin tienne.",
        artifactType: "Pierre Précieuse",
        powerName: "Contrôle Total",
        powerDescription: "Maîtrise complète des impulsions. Tu danses avec tes envies sans plus jamais trembler.",
        auraColor: "#FFD166",
        auraGradient: "radial-gradient(circle at center, rgba(255, 209, 102,0.55) 0%, rgba(155,48,255,0.15) 40%, transparent 70%)",
        story: "Neuf mois. Tu danses avec tes envies sans plus jamais trembler.",
        descKey: "artifact11Desc",
        storyKey: "artifact11Story"
    },
    {
        key: "jour-365",
        tier: 12,
        name: "La Couronne de Légende",
        subtitle: "Jour 365 — UN AN !",
        nameKey: "artifact12Name",
        subtitleKey: "artifact12Subtitle",
        requiredDays: 365,
        color: "#FFD700",
        glow: "rgba(255, 215, 0, 1)",
        gradient: "linear-gradient(135deg, #FFD700 0%, #FF3B30 50%, #F59E0B 100%)",
        icon: "jour-365",
        description: "UN AN. Tu as conquis ta liberté. Les générations futures chanteront ton nom. Tu es désormais une légende vivante de la guérison.",
        artifactType: "Couronne",
        powerName: "Immortalité Spirituelle",
        powerDescription: "Tu es libre pour toujours. Ton histoire inspire les autres et traverse les générations.",
        auraColor: "#FFD700",
        auraGradient: "radial-gradient(circle at center, rgba(255,215,0,0.55) 0%, rgba(255,59,48,0.18) 35%, rgba(245, 158, 11,0.10) 55%, transparent 75%)",
        story: "UN AN. Tu as conquis ta liberté. Les générations futures chanteront ton nom.",
        descKey: "artifact12Desc",
        storyKey: "artifact12Story"
    },
    {
        key: "jour-730",
        tier: 13,
        name: "L'Étoile de Maîtrise",
        subtitle: "Jour 730 — Deux ans",
        nameKey: "artifact13Name",
        subtitleKey: "artifact13Subtitle",
        requiredDays: 730,
        color: "#FFFFFF",
        glow: "rgba(255, 255, 255, 1)",
        gradient: "linear-gradient(135deg, #FFFFFF 0%, #FFB020 50%, #FFD166 100%)",
        icon: "jour-730",
        description: "Deux ans. Tu ne te rétablis plus. Tu ES la lumière qui guide les autres. Au-delà de la guérison, tu deviens le phare des chercheurs à venir.",
        artifactType: "Étoile",
        powerName: "Transcendance",
        powerDescription: "Au-delà de la guérison. Tu deviens le phare qui guide tous les autres chercheurs.",
        auraColor: "#FFFFFF",
        auraGradient: "radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, rgba(255,176,32,0.18) 35%, rgba(255, 209, 102,0.10) 55%, transparent 75%)",
        story: "Deux ans. Tu ne te rétablis plus. Tu ES la lumière qui guide les autres.",
        descKey: "artifact13Desc",
        storyKey: "artifact13Story"
    }
];
function getCurrentRank(streakDays) {
    let current = PARCOURS_RANKS[0];
    for (const rank of PARCOURS_RANKS){
        if (streakDays >= rank.requiredDays) current = rank;
    }
    return current;
}
function getNextRank(streakDays) {
    for (const rank of PARCOURS_RANKS){
        if (streakDays < rank.requiredDays) return rank;
    }
    return null;
}
function getUnlockedRanks(streakDays) {
    return PARCOURS_RANKS.filter((r)=>streakDays >= r.requiredDays);
}
}),
"[project]/src/lib/data/mood-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOOD_INSIGHTS",
    ()=>MOOD_INSIGHTS,
    "MOOD_OPTIONS",
    ()=>MOOD_OPTIONS,
    "getMoodMeta",
    ()=>getMoodMeta
]);
const MOOD_OPTIONS = [
    {
        key: "frustrated",
        emoji: "😤",
        label: "Frustré",
        color: "#FF3B30",
        description: "Stress, irritation, envie de craquer"
    },
    {
        key: "anxious",
        emoji: "😰",
        label: "Anxieux",
        color: "#FBBF24",
        description: "Inquiétude, tension, nervosité"
    },
    {
        key: "calm",
        emoji: "😌",
        label: "Calme",
        color: "#FFB020",
        description: "Sérénité, équilibre, paix"
    },
    {
        key: "proud",
        emoji: "🦸",
        label: "Fier",
        color: "#FFD166",
        description: "Fierté, accomplissement, confiance"
    },
    {
        key: "strong",
        emoji: "💪",
        label: "Fort",
        color: "#FFC94D",
        description: "Détermination, volonté, énergie"
    }
];
function getMoodMeta(key) {
    return MOOD_OPTIONS.find((m)=>m.key === key) ?? MOOD_OPTIONS[0];
}
const MOOD_INSIGHTS = {
    frustrated: "Le stress accompagne souvent les premiers jours. Sois patient avec toi-même.",
    anxious: "L'anxiété diminue avec le temps. Tes pratiques de respiration aident.",
    tempted: "Les envies sont normales. Chaque envie surmontée te renforce.",
    calm: "Tu trouves ton équilibre. Continue tes pratiques quotidiennes.",
    proud: "Tu prends confiance. Célèbre chaque victoire, petite ou grande.",
    strong: "Ta force grandit. Tu es en train de devenir une inspiration."
};
}),
"[project]/src/components/zerobet/components/Skeletons.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CardSkeleton",
    ()=>CardSkeleton,
    "ChartSkeleton",
    ()=>ChartSkeleton,
    "ListSkeleton",
    ()=>ListSkeleton,
    "MessageSkeleton",
    ()=>MessageSkeleton,
    "StatsCardGridSkeleton",
    ()=>StatsCardGridSkeleton,
    "StatsCardSkeleton",
    ()=>StatsCardSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ShimmerBlock({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden rounded-xl bg-white/5 ${className}`,
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 shimmer"
        }, void 0, false, {
            fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
function CardSkeleton({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `glass-card p-4 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "w-11 h-11 rounded-full flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                                className: "h-3.5 w-2/3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                                className: "h-2.5 w-1/2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "h-2.5 w-full"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "h-2.5 w-11/12"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "h-2.5 w-3/4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "h-6 w-16 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "h-6 w-16 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
function ChartSkeleton({ height = 200, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `glass-card p-4 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                                className: "w-7 h-7 rounded-lg"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                                className: "h-3 w-24"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "h-2 w-12 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full",
                style: {
                    height
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-0 top-0 bottom-0 flex flex-col justify-between pr-2",
                        children: [
                            0,
                            1,
                            2,
                            3,
                            4
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                                className: "w-4 h-1.5"
                            }, i, false, {
                                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-7 right-0 top-2 bottom-2 flex items-end gap-1.5",
                        children: [
                            40,
                            65,
                            30,
                            80,
                            55,
                            95,
                            45,
                            70,
                            35,
                            85,
                            50,
                            75,
                            60,
                            90
                        ].map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    height: 0
                                },
                                animate: {
                                    height: `${h}%`
                                },
                                transition: {
                                    duration: 0.6,
                                    delay: i * 0.04,
                                    ease: "easeOut"
                                },
                                className: "flex-1 relative overflow-hidden rounded-t-md bg-white/5",
                                style: {
                                    minHeight: 6
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 shimmer"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                    lineNumber: 89,
                                    columnNumber: 15
                                }, this)
                            }, i, false, {
                                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between mt-2 pl-7",
                children: Array.from({
                    length: 6
                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "w-6 h-1.5"
                    }, i, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
function ListSkeleton({ count = 4, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `space-y-3 ${className}`,
        children: Array.from({
            length: count
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 8
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: i * 0.05
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardSkeleton, {}, void 0, false, {
                    fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, this)
            }, i, false, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
function MessageSkeleton({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 10
        },
        animate: {
            opacity: 1,
            y: 0
        },
        className: `flex gap-2 justify-start items-end ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                className: "w-7 h-7 rounded-full flex-shrink-0"
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-card px-3.5 py-2.5 rounded-2xl rounded-bl-md max-w-[80%]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                                className: "h-2.5 w-20"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-0.5",
                                children: [
                                    0,
                                    1,
                                    2
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                        animate: {
                                            y: [
                                                0,
                                                -3,
                                                0
                                            ],
                                            opacity: [
                                                0.4,
                                                1,
                                                0.4
                                            ]
                                        },
                                        transition: {
                                            duration: 0.9,
                                            repeat: Infinity,
                                            delay: i * 0.15,
                                            ease: "easeInOut"
                                        },
                                        className: "w-1 h-1 rounded-full bg-[#F59E0B]"
                                    }, i, false, {
                                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                                className: "h-2.5 w-44"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                                className: "h-2.5 w-36"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                                className: "h-2.5 w-28"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
function StatsCardSkeleton({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `glass-card-strong p-4 relative overflow-hidden ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 blur-2xl bg-white",
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "w-9 h-9 rounded-xl mb-2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "h-7 w-16 mb-1.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "h-2 w-12 mb-2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShimmerBlock, {
                        className: "h-2.5 w-20"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
        lineNumber: 174,
        columnNumber: 5
    }, this);
}
function StatsCardGridSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-2 gap-3",
        children: Array.from({
            length: 4
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatsCardSkeleton, {}, i, false, {
                fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
                lineNumber: 196,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/zerobet/components/Skeletons.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/zerobet/components/PullToRefresh.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PullToRefresh",
    ()=>PullToRefresh
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-ssr] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const TOUCH_SUPPORTED = ("TURBOPACK compile-time value", "undefined") !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
function PullToRefresh({ onRefresh, isRefreshing = false, threshold = 70, hideDesktopButton = false, className = "", refreshLabel, children }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const label = refreshLabel || t("refresh");
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startYRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [pullDistance, setPullDistance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [internalRefreshing, setInternalRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const refreshing = isRefreshing || internalRefreshing;
    const handleTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (refreshing) return;
        const el = containerRef.current;
        if (!el) return;
        // Only start pull if content is scrolled to top
        if (el.scrollTop > 0) {
            startYRef.current = null;
            return;
        }
        startYRef.current = e.touches[0].clientY;
    }, [
        refreshing
    ]);
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (startYRef.current === null) return;
        const el = containerRef.current;
        if (!el) return;
        // If user has scrolled down, abandon pull
        if (el.scrollTop > 0) {
            startYRef.current = null;
            setPullDistance(0);
            return;
        }
        const dy = e.touches[0].clientY - startYRef.current;
        if (dy <= 0) {
            setPullDistance(0);
            return;
        }
        // Apply resistance (1/2) for a premium feel
        const resisted = dy * 0.5;
        // Cap at threshold * 1.6
        const capped = Math.min(resisted, threshold * 1.6);
        setPullDistance(capped);
        // Prevent default scroll only when actually pulling (avoids blocking horizontal scroll)
        if (capped > 4 && e.cancelable) {
            e.preventDefault();
        }
    }, [
        threshold
    ]);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (startYRef.current === null) {
            setPullDistance(0);
            return;
        }
        startYRef.current = null;
        if (pullDistance >= threshold) {
            setPullDistance(threshold);
            setInternalRefreshing(true);
            try {
                await Promise.resolve(onRefresh());
            } finally{
                // Brief delay so the spinner is visible even for instant resolves
                setTimeout(()=>{
                    setInternalRefreshing(false);
                    setPullDistance(0);
                }, 600);
            }
        } else {
            setPullDistance(0);
        }
    }, [
        pullDistance,
        threshold,
        onRefresh
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            startYRef.current = null;
        };
    }, []);
    const progress = Math.min(1, pullDistance / threshold);
    const shouldRelease = pullDistance >= threshold;
    const handleManualRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setInternalRefreshing(true);
        try {
            await Promise.resolve(onRefresh());
        } finally{
            setTimeout(()=>setInternalRefreshing(false), 600);
        }
    }, [
        onRefresh
    ]);
    // Render
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className}`,
        children: [
            TOUCH_SUPPORTED && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 right-0 z-10 flex items-center justify-center pointer-events-none",
                style: {
                    height: Math.max(pullDistance, refreshing ? threshold : 0),
                    transition: pullDistance === 0 ? "height 0.3s ease" : "none",
                    overflow: "hidden"
                },
                "aria-hidden": true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        rotate: refreshing ? 360 : progress * 360,
                        scale: refreshing ? 1 : 0.6 + progress * 0.4
                    },
                    transition: {
                        rotate: refreshing ? {
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        } : {
                            duration: 0.2
                        },
                        scale: {
                            duration: 0.2
                        }
                    },
                    className: "w-8 h-8 rounded-full flex items-center justify-center",
                    style: {
                        background: shouldRelease || refreshing ? "linear-gradient(135deg, #FF3B30 0%, #F59E0B 100%)" : "rgba(255,255,255,0.08)",
                        boxShadow: shouldRelease || refreshing ? "0 0 24px rgba(245, 158, 11,0.5)" : "none"
                    },
                    children: refreshing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                        size: 16,
                        className: "text-white"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                        lineNumber: 184,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                        size: 16,
                        className: shouldRelease ? "text-white" : "text-white/50"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                        lineNumber: 186,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                    lineNumber: 161,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                lineNumber: 152,
                columnNumber: 9
            }, this),
            !TOUCH_SUPPORTED && !hideDesktopButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end mb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleManualRefresh,
                    disabled: refreshing,
                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-white/70 text-xs font-medium active:scale-95 transition-transform disabled:opacity-50",
                    "aria-label": label,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                            animate: {
                                rotate: refreshing ? 360 : 0
                            },
                            transition: refreshing ? {
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear"
                            } : {
                                duration: 0.2
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                                lineNumber: 208,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                            lineNumber: 204,
                            columnNumber: 13
                        }, this),
                        refreshing ? t("refreshing") : label
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                    lineNumber: 198,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                lineNumber: 197,
                columnNumber: 9
            }, this),
            !TOUCH_SUPPORTED && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: refreshing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -8
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -8
                    },
                    className: "flex items-center justify-center gap-2 py-2 mb-2 glass-card rounded-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                            animate: {
                                rotate: 360
                            },
                            transition: {
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                size: 14,
                                className: "text-[#F59E0B]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                                lineNumber: 229,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                            lineNumber: 225,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white/60 text-xs font-medium",
                            children: t("refreshingData")
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                            lineNumber: 231,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                    lineNumber: 219,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined,
                onTouchMove: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined,
                onTouchEnd: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined,
                className: "relative",
                style: {
                    transform: pullDistance > 0 && !refreshing ? `translateY(${pullDistance}px)` : undefined,
                    transition: pullDistance === 0 ? "transform 0.3s ease" : "none"
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/PullToRefresh.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/zerobet/components/WeeklyReport.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WeeklyReport",
    ()=>WeeklyReport,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.js [app-ssr] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/life-buoy.js [app-ssr] (ecmascript) <export default as LifeBuoy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function WeeklyReport({ streakHistory, journalEntries, panicEvents, xpHistory }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const report = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const now = new Date();
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 6);
        weekAgo.setHours(0, 0, 0, 0);
        const inWindow = (iso)=>{
            const d = new Date(iso);
            return d >= weekAgo && d <= now;
        };
        const windowKeys = new Set();
        for(let i = 0; i < 7; i++){
            const d = new Date(weekAgo);
            d.setDate(weekAgo.getDate() + i);
            windowKeys.add(d.toISOString().slice(0, 10));
        }
        const tracked = streakHistory.filter((d)=>windowKeys.has(d.date));
        const cleanDays = tracked.filter((d)=>d.clean).length;
        const journalCount = journalEntries.filter((e)=>inWindow(e.createdAt)).length;
        const panicCount = panicEvents.filter((e)=>inWindow(e.createdAt)).length;
        const xpGained = xpHistory.filter((e)=>inWindow(e.timestamp)).reduce((sum, e)=>sum + Math.max(0, e.amount), 0);
        const hasData = tracked.length > 0 || journalCount > 0 || panicCount > 0 || xpGained > 0;
        let verdict = "start";
        if (!hasData) verdict = "empty";
        else if (tracked.length > 0 && cleanDays >= 6 && panicCount <= 1) verdict = "great";
        else if (panicCount >= 3 || tracked.length > 0 && cleanDays <= 2) verdict = "tough";
        else verdict = "good";
        return {
            cleanDays,
            journalCount,
            panicCount,
            xpGained,
            verdict,
            from: weekAgo,
            to: now
        };
    }, [
        streakHistory,
        journalEntries,
        panicEvents,
        xpHistory
    ]);
    const dateFmt = (d)=>d.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short"
        });
    const verdictStyle = {
        empty: {
            pill: "bg-white/10 text-white/60",
            icon: "🌱"
        },
        start: {
            pill: "bg-[#FFB020]/15 text-[#FFB020]",
            icon: "🌱"
        },
        great: {
            pill: "bg-[#FFC94D]/15 text-[#FFC94D]",
            icon: "🏆"
        },
        good: {
            pill: "bg-[#FF6B00]/15 text-[#FF6B00]",
            icon: "💪"
        },
        tough: {
            pill: "bg-[#FBBF24]/15 text-[#FBBF24]",
            icon: "🌤️"
        }
    };
    const metrics = [
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"],
            color: "#FF6B00",
            value: `${report.cleanDays}/7`,
            labelKey: "weeklyReportClean"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
            color: "#FFB020",
            value: String(report.journalCount),
            labelKey: "weeklyReportJournal"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__["LifeBuoy"],
            color: "#F59E0B",
            value: String(report.panicCount),
            labelKey: "weeklyReportPanic"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
            color: "#FBBF24",
            value: String(report.xpGained),
            labelKey: "weeklyReportXP"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].section, {
        initial: {
            opacity: 0,
            y: 16
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            delay: 0.05
        },
        className: "glass-card p-5 mb-5 relative overflow-hidden",
        "aria-label": t("weeklyReportTitle"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none",
                style: {
                    background: "radial-gradient(circle, rgba(255,107,0,0.16) 0%, transparent 70%)"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        size: 14,
                                        className: "text-[#FFB020]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xs font-bold text-white/80 uppercase tracking-[0.12em]",
                                        children: t("weeklyReportTitle")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/45 text-[11px]",
                                children: t("weeklyReportPeriod", {
                                    from: dateFmt(report.from),
                                    to: dateFmt(report.to)
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold ${verdictStyle[report.verdict].pill}`,
                        children: [
                            verdictStyle[report.verdict].icon,
                            " ",
                            t(`weeklyReportVerdict${report.verdict.charAt(0).toUpperCase()}${report.verdict.slice(1)}`)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            report.verdict === "empty" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/50 text-sm",
                children: t("weeklyReportEmpty")
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                lineNumber: 155,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-4 gap-2.5 mb-4",
                        children: metrics.map((m)=>{
                            const Icon = m.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl bg-white/5 border border-white/5 p-2.5 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        size: 15,
                                        style: {
                                            color: m.color
                                        },
                                        className: "mx-auto mb-1.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                                        lineNumber: 167,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white font-bold text-base leading-none mb-1 font-[family-name:var(--font-poppins)]",
                                        children: m.value
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                                        lineNumber: 168,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/45 text-[9.5px] leading-tight",
                                        children: t(m.labelKey)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                                        lineNumber: 171,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, m.labelKey, true, {
                                fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                                lineNumber: 163,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/65 text-xs leading-relaxed",
                        children: t(`weeklyReportVerdict${report.verdict.charAt(0).toUpperCase()}${report.verdict.slice(1)}Desc`)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/WeeklyReport.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = WeeklyReport;
}),
"[project]/src/components/zerobet/components/EmptyState.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyState",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const VARIANT_CONFIG = {
    journal: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
        emoji: "📝",
        gradient: "linear-gradient(135deg, #FF6B00 0%, #FFB020 100%)",
        glow: "glow-green",
        titleKey: "emptyStateJournalTitle",
        descKey: "emptyStateJournalDesc",
        ctaKey: "emptyStateJournalCta"
    },
    community: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        emoji: "💬",
        gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
        glow: "glow-yellow",
        titleKey: "emptyStateCommunityTitle",
        descKey: "emptyStateCommunityDesc",
        ctaKey: "emptyStateCommunityCta"
    },
    stats: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
        emoji: "📊",
        gradient: "linear-gradient(135deg, #FF6B00 0%, #FFB020 100%)",
        glow: "glow-green",
        titleKey: "emptyStateStatsTitle",
        descKey: "emptyStateStatsDesc",
        ctaKey: "emptyStateStatsCta"
    },
    default: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
        emoji: "✨",
        gradient: "linear-gradient(135deg, #FFB020 0%, #FF6B00 100%)",
        glow: "glow-green",
        titleKey: "emptyStateDefaultTitle",
        descKey: "emptyStateDefaultDesc",
        ctaKey: "emptyStateDefaultCta"
    }
};
function EmptyState({ variant = "default", title, description, ctaLabel, onCta, hideCta = false, className = "", compact = false }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const cfg = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.default;
    const Icon = cfg.icon;
    const finalTitle = title ?? t(cfg.titleKey);
    const finalDescription = description ?? t(cfg.descKey);
    const finalCta = ctaLabel ?? (cfg.ctaKey ? t(cfg.ctaKey) : undefined);
    const showCta = !hideCta && (finalCta || onCta);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-20 h-20 rounded-3xl flex items-center justify-center",
                        style: {
                            background: cfg.gradient,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-white font-semibold text-base font-[family-name:var(--font-poppins)] mb-1.5",
                children: finalTitle
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/55 text-sm leading-relaxed mb-6 max-w-xs",
                children: finalDescription
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/EmptyState.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            showCta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                whileTap: {
                    scale: 0.96
                },
                onClick: onCta,
                className: "px-6 py-3 rounded-2xl gradient-primary text-white font-medium text-sm glow-green flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
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
}),
"[project]/src/components/zerobet/components/AnimatedNumber.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedNumber",
    ()=>AnimatedNumber,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
/** easeOutExpo — snappy premium ease for the count-up. */ function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
function formatValue(value, format, decimals) {
    switch(format){
        case "compact":
            return new Intl.NumberFormat("fr-FR", {
                notation: "compact",
                maximumFractionDigits: Math.min(decimals, 1)
            }).format(value);
        case "currency":
            return new Intl.NumberFormat("fr-FR", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
                useGrouping: true
            }).format(value);
        case "default":
        default:
            return new Intl.NumberFormat("fr-FR", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(value);
    }
}
function AnimatedNumber({ value, duration = 1000, delay = 0, className, prefix = "", suffix = "", decimals = 0, format = "default" }) {
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const prefersReducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Cancel any in-flight animation
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        startRef.current = null;
        const target = Number.isFinite(value) ? value : 0;
        const animate = (now)=>{
            if (startRef.current === null) startRef.current = now;
            // Reduced motion: jump straight to the target on the first frame.
            // We still go through rAF so the setState is not synchronous
            // within the effect body (avoids cascading renders).
            if (prefersReducedMotion) {
                setDisplay(target);
                rafRef.current = null;
                return;
            }
            const elapsed = now - startRef.current;
            const effectiveElapsed = Math.max(0, elapsed - delay);
            const progress = duration <= 0 ? 1 : Math.min(1, effectiveElapsed / duration);
            if (effectiveElapsed < 0) {
                // Still in the delay window — keep showing 0
                setDisplay(0);
                rafRef.current = requestAnimationFrame(animate);
                return;
            }
            const eased = easeOutExpo(progress);
            setDisplay(target * eased);
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                // Snap to the exact target to avoid floating point drift.
                setDisplay(target);
                rafRef.current = null;
            }
        };
        rafRef.current = requestAnimationFrame(animate);
        return ()=>{
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [
        value,
        duration,
        delay,
        prefersReducedMotion
    ]);
    const formatted = formatValue(display, format, decimals);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        style: {
            fontVariantNumeric: "tabular-nums"
        },
        "aria-label": `${prefix}${value}${suffix}`,
        children: [
            prefix,
            formatted,
            suffix
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/AnimatedNumber.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = AnimatedNumber;
}),
"[project]/src/components/zerobet/screens/StatsScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatsScreen",
    ()=>StatsScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-ssr] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-ssr] (ecmascript) <export default as Grid3x3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-ssr] (ecmascript) <export default as PieChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-ssr] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/zerobet-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/parcours-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$mood$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/mood-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$Skeletons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/Skeletons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$PullToRefresh$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/PullToRefresh.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$WeeklyReport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/WeeklyReport.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/EmptyState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$AnimatedNumber$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/AnimatedNumber.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/haptics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
// ---------- Constants & helpers ----------
const MOOD_VALUE = {
    frustrated: 1,
    anxious: 2,
    tempted: 3,
    calm: 4,
    proud: 5,
    strong: 5
};
const EMOTION_LABELS = {
    frustrated: "Frustré",
    anxious: "Anxieux",
    tempted: "Tenté",
    calm: "Calme",
    proud: "Fier",
    strong: "Fort"
};
const EMOTION_COLORS = {
    frustrated: "#FF3B30",
    anxious: "#F59E0B",
    tempted: "#FBBF24",
    calm: "#FFB020",
    proud: "#FFD166",
    strong: "#FFC94D"
};
const EMOTION_EMOJI = {
    frustrated: "😤",
    anxious: "😰",
    tempted: "🎭",
    calm: "😌",
    proud: "🦸",
    strong: "💪"
};
const WEEKDAY_LABELS = [
    "L",
    "M",
    "M",
    "J",
    "V",
    "S",
    "D"
];
function formatFCFA(n) {
    return Math.round(n).toLocaleString("fr-FR");
}
function startOfDay(d) {
    const c = new Date(d);
    c.setHours(0, 0, 0, 0);
    return c;
}
function dateKey(d) {
    return startOfDay(d).toISOString();
}
function isSameDay(a, b) {
    return startOfDay(a).getTime() === startOfDay(b).getTime();
}
function shortDay(d) {
    return d.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short"
    });
}
// ---------- Motion variants ----------
const containerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.05
        }
    }
};
const itemVariants = {
    hidden: {
        opacity: 0,
        y: 18
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 280,
            damping: 26
        }
    }
};
// ---------- Section title ----------
function SectionTitle({ icon: Icon, iconColor, title, right }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between mb-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-white font-semibold text-sm flex items-center gap-2 font-[family-name:var(--font-poppins)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-7 h-7 rounded-lg flex items-center justify-center",
                        style: {
                            background: `${iconColor}22`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 15,
                            style: {
                                color: iconColor
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    title
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            right
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
function MoodTooltip({ active, payload }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    if (!active || !payload || payload.length === 0) return null;
    const p = payload[0].payload;
    if (p.mood === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "glass-card-strong px-3 py-2 rounded-xl text-xs",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-white/80 font-medium",
                    children: p.date
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-white/50",
                    children: t("statsNoEntry")
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
            lineNumber: 191,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card-strong px-3 py-2 rounded-xl text-xs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white/80 font-medium",
                children: p.date
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5 mt-0.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: EMOTION_EMOJI[p.emotion]
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold",
                        style: {
                            color: EMOTION_COLORS[p.emotion]
                        },
                        children: EMOTION_LABELS[p.emotion]
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            p.count > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white/40 mt-0.5",
                children: [
                    p.count,
                    " entrées"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                lineNumber: 210,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
function SavingsTooltip({ active, payload }) {
    if (!active || !payload || payload.length === 0) return null;
    const p = payload[0].payload;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card-strong px-3 py-2 rounded-xl text-xs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white/80 font-medium",
                children: p.date
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[#FFC94D] font-semibold mt-0.5",
                children: [
                    formatFCFA(p.cumul),
                    " FCFA"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white/40",
                children: [
                    "+",
                    formatFCFA(p.daily),
                    " aujourd'hui"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
function StatsScreen() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const { streakDays, weeklyBetAmount, journalEntries, panicEvents, addictionScore, unlockedRanks, navigate, adminStreakOverride, plan, streakHistory, xpHistory } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const isPremium = plan !== "free";
    // Brief loading state so the ChartSkeleton is visible on first mount
    const [chartsLoading, setChartsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const t = setTimeout(()=>setChartsLoading(false), 650);
        return ()=>clearTimeout(t);
    }, []);
    // Pull-to-refresh handler — re-trigger the chart loading skeleton briefly.
    const [refreshing, setRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleRefresh = async ()=>{
        setRefreshing(true);
        setChartsLoading(true);
        await new Promise((resolve)=>setTimeout(resolve, 800));
        setChartsLoading(false);
        setRefreshing(false);
    };
    const effectiveStreak = adminStreakOverride !== null ? adminStreakOverride : streakDays;
    const dailySaved = Math.round(weeklyBetAmount / 7);
    const totalSaved = effectiveStreak * dailySaved;
    const journalCount = journalEntries.length;
    const panicCount = panicEvents.length;
    // ---------- Section 2: Mood trends (last 14 days) ----------
    const moodData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const today = startOfDay(new Date());
        const days = [];
        for(let i = 13; i >= 0; i--){
            const day = new Date(today);
            day.setDate(day.getDate() - i);
            const dayEntries = journalEntries.filter((e)=>isSameDay(new Date(e.createdAt), day));
            if (dayEntries.length === 0) {
                days.push({
                    date: shortDay(day),
                    mood: null,
                    emotion: null,
                    count: 0
                });
            } else {
                const avg = dayEntries.reduce((s, e)=>s + MOOD_VALUE[e.emotion], 0) / dayEntries.length;
                // Pick dominant emotion (highest value, tie -> most recent)
                const counts = {
                    frustrated: 0,
                    anxious: 0,
                    tempted: 0,
                    calm: 0,
                    proud: 0,
                    strong: 0
                };
                dayEntries.forEach((e)=>{
                    counts[e.emotion] += 1;
                });
                const dominant = Object.keys(counts).sort((a, b)=>counts[b] - counts[a])[0];
                days.push({
                    date: shortDay(day),
                    mood: Math.round(avg),
                    emotion: dominant,
                    count: dayEntries.length
                });
            }
        }
        return days;
    }, [
        journalEntries
    ]);
    const hasMoodData = moodData.some((d)=>d.mood !== null);
    // ---------- Section 3: Savings growth (last 30 days, cumulative) ----------
    const savingsData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const today = startOfDay(new Date());
        const days = [];
        for(let i = 29; i >= 0; i--){
            const day = new Date(today);
            day.setDate(day.getDate() - i);
            // Did the user have a streak active on this day?
            // Streak started `effectiveStreak` days ago. Days within streak are the
            // last `effectiveStreak` days (including today).
            const withinStreak = i < effectiveStreak;
            const daily = withinStreak ? dailySaved : 0;
            days.push({
                date: shortDay(day),
                cumul: 0,
                daily,
                isToday: i === 0
            });
        }
        // Compute cumulative
        let running = 0;
        for (const d of days){
            running += d.daily;
            d.cumul = running;
        }
        return days;
    }, [
        effectiveStreak,
        dailySaved
    ]);
    const savingsTotal30 = savingsData[savingsData.length - 1]?.cumul ?? 0;
    // ---------- Section 4: Heatmap (last 35 days, 7x5 grid) ----------
    const heatmapCells = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const today = startOfDay(new Date());
        // Find the Monday of the current week, then go back 4 weeks (5 weeks total)
        const dow = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        const daysSinceMonday = dow === 0 ? 6 : dow - 1;
        const start = new Date(today);
        start.setDate(start.getDate() - daysSinceMonday - 28);
        // Map panic event day keys
        const panicDayKeys = new Set(panicEvents.map((p)=>dateKey(new Date(p.createdAt))));
        // Streak window: [today - effectiveStreak + 1, today]
        const streakStart = new Date(today);
        streakStart.setDate(streakStart.getDate() - Math.max(0, effectiveStreak - 1));
        const cells = [];
        for(let i = 0; i < 35; i++){
            const d = new Date(start);
            d.setDate(d.getDate() + i);
            const key = dateKey(d);
            const isToday = isSameDay(d, today);
            const isFuture = d.getTime() > today.getTime();
            let status = "gray";
            if (isFuture) {
                status = "future";
            } else if (panicDayKeys.has(key)) {
                status = "red";
            } else if (d.getTime() >= streakStart.getTime() && d.getTime() <= today.getTime()) {
                status = "green";
            } else {
                status = "gray";
            }
            cells.push({
                date: d,
                status,
                isToday
            });
        }
        return cells;
    }, [
        panicEvents,
        effectiveStreak
    ]);
    // Counts for legend summary
    const heatCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let green = 0;
        let red = 0;
        let gray = 0;
        for (const c of heatmapCells){
            if (c.status === "green") green++;
            else if (c.status === "red") red++;
            else if (c.status === "gray") gray++;
        }
        return {
            green,
            red,
            gray
        };
    }, [
        heatmapCells
    ]);
    // ---------- Section 5: Emotion distribution ----------
    const emotionData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const counts = {
            frustrated: 0,
            anxious: 0,
            tempted: 0,
            calm: 0,
            proud: 0,
            strong: 0
        };
        journalEntries.forEach((e)=>{
            counts[e.emotion] += 1;
        });
        return Object.keys(counts).map((k)=>({
                name: EMOTION_LABELS[k],
                key: k,
                value: counts[k],
                color: EMOTION_COLORS[k]
            })).filter((d)=>d.value > 0);
    }, [
        journalEntries
    ]);
    const totalEmotions = emotionData.reduce((s, d)=>s + d.value, 0);
    const hasEmotionData = emotionData.length > 0;
    // ---------- Mood visualizations (distribution / timeline / streak / insight) ----------
    /**
   * Relative time formatter for the timeline card.
   * Mirrors the format used elsewhere in the app (Journal/Triggers screens).
   */ const formatRelativeTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((iso)=>{
        const now = Date.now();
        const then = new Date(iso).getTime();
        const diffMs = Math.max(0, now - then);
        const diffMin = Math.floor(diffMs / 60_000);
        const diffHours = Math.floor(diffMs / 3_600_000);
        const diffDays = Math.floor(diffMs / 86_400_000);
        if (diffMin < 1) return t("statsJustNow");
        if (diffMin < 60) return t("statsMinutesAgo", {
            n: diffMin
        });
        if (diffHours < 24) return t("statsHoursAgo", {
            n: diffHours
        });
        if (diffDays === 1) return t("yesterday");
        if (diffDays < 7) return t("statsDaysAgo", {
            n: diffDays
        });
        return new Date(iso).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short"
        });
    }, [
        t
    ]);
    // (a) Distribution over the last 14 days — one row per quick-capture mood.
    const moodDistribution = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const cutoff = Date.now() - 14 * 86_400_000;
        const recent = journalEntries.filter((e)=>new Date(e.createdAt).getTime() >= cutoff);
        const total = recent.length;
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$mood$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOOD_OPTIONS"].map((m)=>{
            const count = recent.filter((e)=>e.emotion === m.key).length;
            const percent = total > 0 ? Math.round(count / total * 100) : 0;
            return {
                ...m,
                count,
                percent,
                total
            };
        });
    }, [
        journalEntries
    ]);
    const hasMoodDistribution = moodDistribution.some((m)=>m.count > 0);
    // (b) Timeline — last 10 mood entries (most recent first).
    const moodTimeline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return [
            ...journalEntries
        ].sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10).map((e)=>{
            const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$mood$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMoodMeta"])(e.emotion);
            // Treat the auto-generated "Humeur du jour : ..." content as having no
            // user-written preview — only show a preview for real journal entries.
            const isQuickMood = e.trigger === "mood-tracker" || (e.content ?? "").startsWith("Humeur du jour :");
            const preview = isQuickMood ? "" : (e.content ?? "").slice(0, 40).trim() + ((e.content ?? "").length > 40 ? "…" : "");
            return {
                id: e.id,
                emoji: meta.emoji,
                label: meta.label,
                color: meta.color,
                relative: formatRelativeTime(e.createdAt),
                isQuickMood: e.trigger === "mood-tracker",
                preview,
                createdAt: e.createdAt
            };
        });
    }, [
        journalEntries,
        formatRelativeTime
    ]);
    // (c) Streak — for each of the last 7 days, did the user log ≥1 mood?
    const moodStreak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const today = startOfDay(new Date());
        const days = [];
        const weekdayLetters = [
            "L",
            "M",
            "M",
            "J",
            "V",
            "S",
            "D"
        ];
        for(let i = 6; i >= 0; i--){
            const day = new Date(today);
            day.setDate(day.getDate() - i);
            const dayEntries = journalEntries.filter((e)=>isSameDay(new Date(e.createdAt), day));
            // Dominant mood = most frequent emotion that day (tie → most recent)
            let dominantColor = "rgba(255,255,255,0.08)";
            let dominantEmoji = "";
            if (dayEntries.length > 0) {
                const counts = {
                    frustrated: 0,
                    anxious: 0,
                    tempted: 0,
                    calm: 0,
                    proud: 0,
                    strong: 0
                };
                dayEntries.forEach((e)=>{
                    counts[e.emotion] += 1;
                });
                const sorted = Object.keys(counts).sort((a, b)=>{
                    if (counts[b] !== counts[a]) return counts[b] - counts[a];
                    // Tie-break: most recent entry among the two
                    const lastA = dayEntries.filter((e)=>e.emotion === a).map((e)=>new Date(e.createdAt).getTime()).sort((x, y)=>y - x)[0] ?? 0;
                    const lastB = dayEntries.filter((e)=>e.emotion === b).map((e)=>new Date(e.createdAt).getTime()).sort((x, y)=>y - x)[0] ?? 0;
                    return lastB - lastA;
                });
                const dom = sorted[0];
                const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$mood$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMoodMeta"])(dom);
                dominantColor = meta.color;
                dominantEmoji = meta.emoji;
            }
            // ISO weekday: Mon=1..Sun=7 → index 0..6 for our letters
            const isoDow = (day.getDay() + 6) % 7; // 0=Mon..6=Sun
            days.push({
                date: day,
                label: weekdayLetters[isoDow],
                hasEntry: dayEntries.length > 0,
                dominantColor,
                dominantEmoji
            });
        }
        const activeDays = days.filter((d)=>d.hasEntry).length;
        return {
            days,
            activeDays,
            total: 7
        };
    }, [
        journalEntries
    ]);
    // (d) Dominant mood across all journal entries — used for the insight card.
    const dominantMood = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (journalEntries.length === 0) return null;
        const counts = {
            frustrated: 0,
            anxious: 0,
            tempted: 0,
            calm: 0,
            proud: 0,
            strong: 0
        };
        journalEntries.forEach((e)=>{
            counts[e.emotion] += 1;
        });
        const sorted = Object.keys(counts).sort((a, b)=>counts[b] - counts[a]);
        const key = sorted[0];
        const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$mood$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMoodMeta"])(key);
        const count = counts[key];
        return {
            key,
            emoji: meta.emoji,
            label: meta.label,
            color: meta.color,
            count,
            percent: Math.round(count / journalEntries.length * 100)
        };
    }, [
        journalEntries
    ]);
    const handlePremiumInsightTap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["haptics"].medium();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info(t("statsPremiumInsightToast"), {
            description: t("statsPremiumInsightToastDesc"),
            duration: 2500
        });
        navigate("paywall");
    }, [
        navigate,
        t
    ]);
    // ---------- Section 6: Achievement progress ----------
    const totalRanks = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PARCOURS_RANKS"].length; // 13
    const unlockedCount = unlockedRanks.length;
    const achievementPercent = Math.min(100, Math.round(unlockedCount / totalRanks * 100));
    const currentRank = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentRank"])(effectiveStreak);
    const nextRank = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNextRank"])(effectiveStreak);
    // ---------- Section 7: Weekly summary ----------
    const weekDaysClean = Math.min(7, effectiveStreak);
    const weekSavings = weeklyBetAmount; // 7 * (weeklyBetAmount/7)
    const weekCrisesAvoided = panicEvents.filter((p)=>{
        const d = new Date(p.createdAt);
        const weekAgo = Date.now() - 7 * 86400000;
        return d.getTime() >= weekAgo;
    }).length;
    // ---------- Overview cards config ----------
    const overviewCards = [
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"],
            label: t("statsDaysWithoutBet"),
            value: effectiveStreak.toString(),
            suffix: effectiveStreak > 1 ? t("days") : t("statsDay"),
            gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
            iconBg: "rgba(251,191,36,0.18)",
            iconColor: "#FBBF24",
            glow: "glow-yellow"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
            label: t("financeTotalSaved"),
            value: formatFCFA(totalSaved),
            suffix: "FCFA",
            gradient: "linear-gradient(135deg, #FFC94D 0%, #FFB020 100%)",
            iconBg: "rgba(255,201,77,0.18)",
            iconColor: "#FFC94D",
            glow: "glow-green"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
            label: t("statsJournalEntries"),
            value: journalCount.toString(),
            suffix: journalCount > 1 ? t("statsEntries") : t("statsEntry"),
            gradient: "linear-gradient(135deg, #FFB020 0%, #FFB020 100%)",
            iconBg: "rgba(255,176,32,0.18)",
            iconColor: "#FFB020",
            glow: "glow-blue"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
            label: t("statsCrisesAvoided"),
            value: panicCount.toString(),
            suffix: panicCount > 1 ? t("statsCrises") : t("statsCrisis"),
            gradient: "linear-gradient(135deg, #FFD166 0%, #D9480F 100%)",
            iconBg: "rgba(255, 209, 102,0.18)",
            iconColor: "#FFD166",
            glow: "glow-purple"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen px-5 pt-12 pb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -16
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    type: "spring",
                    stiffness: 280,
                    damping: 26
                },
                className: "flex items-center gap-3 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>navigate("dashboard"),
                        className: "w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform",
                        "aria-label": t("backToDashboard"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            size: 20,
                            className: "text-white"
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                            lineNumber: 727,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                        lineNumber: 722,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-bold text-white font-[family-name:var(--font-poppins)] tracking-tight",
                                children: t("statsTitleMain")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 730,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/50 text-xs",
                                children: t("statsSubtitle")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 733,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                        lineNumber: 729,
                        columnNumber: 9
                    }, this),
                    addictionScore > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                size: 12,
                                className: "text-[#F59E0B]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 737,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/80 text-xs font-semibold",
                                children: [
                                    t("statsScoreLabel"),
                                    " ",
                                    addictionScore
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 738,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                        lineNumber: 736,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                lineNumber: 716,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$PullToRefresh$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PullToRefresh"], {
                onRefresh: handleRefresh,
                isRefreshing: refreshing,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$WeeklyReport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WeeklyReport"], {
                        streakHistory: streakHistory,
                        journalEntries: journalEntries,
                        panicEvents: panicEvents,
                        xpHistory: xpHistory
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                        lineNumber: 747,
                        columnNumber: 7
                    }, this),
                    chartsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$Skeletons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatsCardGridSkeleton"], {}, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 760,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$Skeletons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChartSkeleton"], {
                                height: 200
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 761,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$Skeletons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChartSkeleton"], {
                                height: 180
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 762,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$Skeletons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChartSkeleton"], {
                                height: 220
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 763,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                        lineNumber: 754,
                        columnNumber: 9
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: containerVariants,
                        initial: "hidden",
                        animate: "visible",
                        className: "space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "grid grid-cols-2 gap-3",
                                children: overviewCards.map((card)=>{
                                    const Icon = card.icon;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        whileTap: {
                                            scale: 0.97
                                        },
                                        className: `glass-card-strong p-4 relative overflow-hidden ${card.glow}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 blur-2xl",
                                                style: {
                                                    background: card.iconColor
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 782,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-9 h-9 rounded-xl flex items-center justify-center mb-2",
                                                        style: {
                                                            background: card.iconBg
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            size: 18,
                                                            style: {
                                                                color: card.iconColor
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                            lineNumber: 791,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 787,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0,
                                                            scale: 0.8
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            scale: 1
                                                        },
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 20
                                                        },
                                                        className: "text-2xl font-extrabold text-white font-[family-name:var(--font-poppins)] leading-tight",
                                                        children: card.value
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 793,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white/40 text-[10px] mt-0.5",
                                                        children: card.suffix
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 801,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white/60 text-xs mt-1 font-medium",
                                                        children: card.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 804,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 786,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, card.label, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 777,
                                        columnNumber: 15
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 773,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "glass-card p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
                                        iconColor: "#FFB020",
                                        title: t("statsMoodTrend"),
                                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-white/40",
                                            children: t("statsLast14Days")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 820,
                                            columnNumber: 15
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 815,
                                        columnNumber: 11
                                    }, this),
                                    hasMoodData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full",
                                        style: {
                                            height: 200
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: "100%",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AreaChart"], {
                                                data: moodData,
                                                margin: {
                                                    top: 8,
                                                    right: 8,
                                                    left: -22,
                                                    bottom: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                            id: "moodGradient",
                                                            x1: "0",
                                                            y1: "0",
                                                            x2: "0",
                                                            y2: "1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                    offset: "0%",
                                                                    stopColor: "#FFC94D",
                                                                    stopOpacity: 0.5
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                    lineNumber: 832,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                    offset: "50%",
                                                                    stopColor: "#FBBF24",
                                                                    stopOpacity: 0.35
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                    lineNumber: 833,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                    offset: "100%",
                                                                    stopColor: "#FF3B30",
                                                                    stopOpacity: 0.05
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                    lineNumber: 834,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                            lineNumber: 831,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 830,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                        strokeDasharray: "3 3",
                                                        stroke: "rgba(255,255,255,0.06)",
                                                        vertical: false
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 837,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                                        dataKey: "date",
                                                        tick: {
                                                            fill: "rgba(255,255,255,0.4)",
                                                            fontSize: 9
                                                        },
                                                        axisLine: {
                                                            stroke: "rgba(255,255,255,0.08)"
                                                        },
                                                        tickLine: false,
                                                        interval: 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 842,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                                        domain: [
                                                            1,
                                                            5
                                                        ],
                                                        ticks: [
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5
                                                        ],
                                                        tick: {
                                                            fill: "rgba(255,255,255,0.4)",
                                                            fontSize: 9
                                                        },
                                                        axisLine: false,
                                                        tickLine: false,
                                                        width: 32
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 849,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MoodTooltip, {}, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                            lineNumber: 858,
                                                            columnNumber: 30
                                                        }, void 0),
                                                        cursor: {
                                                            stroke: "rgba(255,255,255,0.2)",
                                                            strokeWidth: 1
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 857,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                                                        type: "monotone",
                                                        dataKey: "mood",
                                                        stroke: "#FBBF24",
                                                        strokeWidth: 2.5,
                                                        fill: "url(#moodGradient)",
                                                        connectNulls: true,
                                                        dot: (props)=>{
                                                            const { cx, cy, payload } = props;
                                                            if (!payload || payload.mood === null) // Unique key per index — two "empty" dots must not share a key
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {}, `empty-${props.index}`, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 877,
                                                                columnNumber: 32
                                                            }, void 0);
                                                            const color = payload.emotion ? EMOTION_COLORS[payload.emotion] : "#FBBF24";
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: cx,
                                                                cy: cy,
                                                                r: 3,
                                                                fill: color,
                                                                stroke: "#0B0704",
                                                                strokeWidth: 1.5
                                                            }, `dot-${payload.date}`, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 882,
                                                                columnNumber: 25
                                                            }, void 0);
                                                        },
                                                        activeDot: {
                                                            r: 5,
                                                            fill: "#F59E0B",
                                                            stroke: "#0B0704",
                                                            strokeWidth: 2
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 861,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 826,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 825,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 824,
                                        columnNumber: 13
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                                        variant: "stats",
                                        title: t("statsNoMoodTitle"),
                                        description: t("statsNoMoodDesc"),
                                        ctaLabel: t("statsWriteNow"),
                                        onCta: ()=>navigate("journal"),
                                        compact: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 899,
                                        columnNumber: 13
                                    }, this),
                                    hasMoodData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-2 justify-center",
                                        children: Object.keys(EMOTION_LABELS).map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 text-[10px] text-white/50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 rounded-full",
                                                        style: {
                                                            background: EMOTION_COLORS[e]
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 916,
                                                        columnNumber: 19
                                                    }, this),
                                                    EMOTION_LABELS[e]
                                                ]
                                            }, e, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 912,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 910,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 814,
                                columnNumber: 9
                            }, this),
                            hasMoodDistribution && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "glass-card p-4 premium-shimmer relative overflow-hidden card-hover",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
                                        iconColor: "#F59E0B",
                                        title: t("statsMoodDistribution"),
                                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-white/40",
                                            children: t("statsLast14Days")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 938,
                                            columnNumber: 17
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 933,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/40 text-[11px] -mt-1 mb-3",
                                        children: t("statsOverEntries", {
                                            n: moodDistribution[0]?.total ?? 0
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 943,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2.5",
                                        children: moodDistribution.slice().sort((a, b)=>b.count - a.count).map((m)=>{
                                            const widthPct = Math.max(2, m.percent);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1.5 w-[88px] flex-shrink-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm leading-none",
                                                                children: m.emoji
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 958,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] font-medium truncate",
                                                                style: {
                                                                    color: m.color
                                                                },
                                                                children: m.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 959,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 957,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 h-2.5 rounded-full bg-white/5 overflow-hidden relative",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                width: 0
                                                            },
                                                            animate: {
                                                                width: `${widthPct}%`
                                                            },
                                                            transition: {
                                                                duration: 0.8,
                                                                ease: "easeOut"
                                                            },
                                                            className: "h-full rounded-full relative",
                                                            style: {
                                                                background: `linear-gradient(90deg, ${m.color}aa 0%, ${m.color} 100%)`,
                                                                boxShadow: `0 0 10px ${m.color}55`
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 opacity-50",
                                                                style: {
                                                                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 980,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                            lineNumber: 967,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 966,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 w-[58px] justify-end flex-shrink-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white text-[11px] font-bold tabular-nums",
                                                                children: m.count
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 990,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/40 text-[10px]",
                                                                children: [
                                                                    "· ",
                                                                    m.percent,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 993,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 989,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, m.key, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 956,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 946,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 929,
                                columnNumber: 11
                            }, this),
                            moodTimeline.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "glass-card p-4 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
                                        iconColor: "#FFB020",
                                        title: t("statsRecentMoods"),
                                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-white/40",
                                            children: t("statsRecentCount", {
                                                n: moodTimeline.length
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 1015,
                                            columnNumber: 17
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1010,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1",
                                        children: moodTimeline.map((entry, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    x: 12
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                transition: {
                                                    delay: idx * 0.03
                                                },
                                                whileTap: {
                                                    scale: 0.95
                                                },
                                                className: "flex-shrink-0 w-[112px] glass-card-strong p-2.5 rounded-2xl relative flex flex-col gap-1.5",
                                                style: {
                                                    borderColor: `${entry.color}33`
                                                },
                                                children: [
                                                    entry.isQuickMood && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute top-1.5 right-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded-full",
                                                        style: {
                                                            background: `${entry.color}22`,
                                                            color: entry.color
                                                        },
                                                        children: "Quick"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1034,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0",
                                                                style: {
                                                                    background: `${entry.color}1f`,
                                                                    boxShadow: `0 0 12px ${entry.color}33`
                                                                },
                                                                children: entry.emoji
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1045,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-semibold leading-tight",
                                                                        style: {
                                                                            color: entry.color
                                                                        },
                                                                        children: entry.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1055,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white/40 text-[9px] leading-tight",
                                                                        children: entry.relative
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1061,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1054,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1044,
                                                        columnNumber: 19
                                                    }, this),
                                                    entry.preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/60 text-[10px] leading-snug line-clamp-2",
                                                        children: entry.preview
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1067,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, entry.id, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1022,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1020,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 1006,
                                columnNumber: 11
                            }, this),
                            journalEntries.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "glass-card-strong p-4 relative overflow-hidden glow-orange card-hover",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#F59E0B]/20 blur-2xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1083,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"],
                                        iconColor: "#F59E0B",
                                        title: t("statsConsistency"),
                                        right: moodStreak.activeDays === 7 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
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
                                                stiffness: 280,
                                                damping: 18
                                            },
                                            className: "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                            style: {
                                                background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
                                                color: "#0B0704",
                                                boxShadow: "0 0 14px rgba(251,191,36,0.65)"
                                            },
                                            children: t("statsPerfect")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 1090,
                                            columnNumber: 19
                                        }, void 0) : undefined
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1084,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-1.5 mb-3",
                                        children: moodStreak.days.map((d, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    scale: 0,
                                                    opacity: 0
                                                },
                                                animate: {
                                                    scale: 1,
                                                    opacity: 1
                                                },
                                                transition: {
                                                    delay: idx * 0.05,
                                                    type: "spring",
                                                    stiffness: 280,
                                                    damping: 20
                                                },
                                                className: "flex flex-col items-center gap-1 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-9 h-9 rounded-xl flex items-center justify-center text-sm",
                                                        style: {
                                                            background: d.hasEntry ? d.dominantColor : "rgba(255,255,255,0.04)",
                                                            border: d.hasEntry ? `1px solid ${d.dominantColor}66` : "1px solid rgba(255,255,255,0.06)",
                                                            boxShadow: d.hasEntry ? `0 0 14px ${d.dominantColor}55` : "none"
                                                        },
                                                        title: d.date.toLocaleDateString("fr-FR", {
                                                            weekday: "long",
                                                            day: "numeric",
                                                            month: "short"
                                                        }),
                                                        children: d.hasEntry ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-base leading-none",
                                                            children: d.dominantEmoji
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                            lineNumber: 1140,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1.5 h-1.5 rounded-full bg-white/15"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                            lineNumber: 1144,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1122,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/40 text-[10px] font-medium",
                                                        children: d.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1147,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, `streak-${idx}`, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/60 text-[11px]",
                                                children: t("statsDaysWithMood")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1155,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white text-xs font-bold tabular-nums",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$AnimatedNumber$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatedNumber"], {
                                                    value: moodStreak.activeDays,
                                                    duration: 700,
                                                    suffix: ` / ${moodStreak.total}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                    lineNumber: 1159,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1158,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2 rounded-full bg-white/5 overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                width: 0
                                            },
                                            animate: {
                                                width: `${moodStreak.activeDays / moodStreak.total * 100}%`
                                            },
                                            transition: {
                                                type: "spring",
                                                stiffness: 140,
                                                damping: 20,
                                                delay: 0.2
                                            },
                                            className: "h-full rounded-full relative",
                                            style: {
                                                background: moodStreak.activeDays === 7 ? "linear-gradient(90deg, #FBBF24 0%, #F59E0B 100%)" : "linear-gradient(90deg, #F59E0B 0%, #FF3B30 100%)",
                                                boxShadow: moodStreak.activeDays === 7 ? "0 0 12px rgba(251,191,36,0.55)" : "0 0 8px rgba(245, 158, 11,0.4)"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 shimmer rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1190,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 1167,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/40 text-[10px] mt-2 leading-snug",
                                        children: moodStreak.activeDays === 7 ? t("statsStreakPerfect") : moodStreak.activeDays >= 4 ? t("statsStreakGood") : t("statsStreakLow")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1193,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 1079,
                                columnNumber: 11
                            }, this),
                            dominantMood && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "relative rounded-3xl p-4 overflow-hidden card-hover",
                                style: {
                                    background: "linear-gradient(135deg, rgba(255, 209, 102,0.18) 0%, rgba(255,59,130,0.18) 100%)",
                                    border: "1px solid rgba(255, 209, 102,0.35)",
                                    boxShadow: "0 0 24px rgba(255, 209, 102,0.2)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FFD166]/25 blur-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1215,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-[#FF3B83]/15 blur-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1216,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                        size: 14,
                                                        className: "text-[#FFD166]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1220,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-white text-sm font-semibold font-[family-name:var(--font-poppins)]",
                                                        children: t("statsDominantMood")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1221,
                                                        columnNumber: 17
                                                    }, this),
                                                    !isPremium && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FBBF24]/15 text-[#FBBF24]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                                                size: 10
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1226,
                                                                columnNumber: 21
                                                            }, this),
                                                            t("premium")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1225,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1219,
                                                columnNumber: 15
                                            }, this),
                                            isPremium ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: 8
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                className: "space-y-2.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0",
                                                            style: {
                                                                background: `${dominantMood.color}33`,
                                                                boxShadow: `0 0 16px ${dominantMood.color}55`
                                                            },
                                                            children: dominantMood.emoji
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                            lineNumber: 1239,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-baseline gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-lg font-bold font-[family-name:var(--font-poppins)]",
                                                                            style: {
                                                                                color: dominantMood.color
                                                                            },
                                                                            children: dominantMood.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                            lineNumber: 1250,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-white/50 text-xs",
                                                                            children: [
                                                                                dominantMood.percent,
                                                                                "% · ",
                                                                                dominantMood.count,
                                                                                " entrée",
                                                                                dominantMood.count > 1 ? "s" : ""
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                            lineNumber: 1256,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                    lineNumber: 1249,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-white/70 text-[11px] leading-snug mt-0.5",
                                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$mood$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOOD_INSIGHTS"][dominantMood.key]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                    lineNumber: 1261,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                            lineNumber: 1248,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                    lineNumber: 1238,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1233,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                onClick: handlePremiumInsightTap,
                                                whileTap: {
                                                    scale: 0.98
                                                },
                                                className: "w-full text-left relative",
                                                "aria-label": t("statsUnlockWithPremium"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        "aria-hidden": true,
                                                        className: "absolute inset-0 flex items-center gap-3 blur-[6px] opacity-60 pointer-events-none select-none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0",
                                                                style: {
                                                                    background: `${dominantMood.color}33`
                                                                },
                                                                children: dominantMood.emoji
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1279,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 space-y-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-3 w-24 rounded-full bg-white/30"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1286,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-2.5 w-full rounded-full bg-white/15"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1287,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-2.5 w-4/5 rounded-full bg-white/15"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1288,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1285,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1275,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative flex items-center gap-3 py-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                                    size: 16,
                                                                    className: "text-[#FBBF24]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                    lineNumber: 1294,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1293,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-white text-sm font-semibold",
                                                                        children: t("statsUnlockWithPremium")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1297,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-white/60 text-[11px]",
                                                                        children: t("statsUnlockWithPremiumDesc")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1300,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1296,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                                                size: 18,
                                                                className: "text-[#FBBF24] flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1304,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1292,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1268,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1218,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 1205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "glass-card p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                                        iconColor: "#FFC94D",
                                        title: t("statsCumulativeSavings"),
                                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-white/40",
                                            children: t("statsLast30Days")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 1319,
                                            columnNumber: 15
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1314,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline gap-2 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-3xl font-extrabold text-white font-[family-name:var(--font-poppins)]",
                                                children: formatFCFA(savingsTotal30)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1323,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/50 text-sm",
                                                children: "FCFA"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1326,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto text-[10px] text-white/40",
                                                children: [
                                                    "+",
                                                    formatFCFA(dailySaved),
                                                    " / jour"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1327,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1322,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full",
                                        style: {
                                            height: 180
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: "100%",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BarChart"], {
                                                data: savingsData,
                                                margin: {
                                                    top: 8,
                                                    right: 8,
                                                    left: -22,
                                                    bottom: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                id: "barGreen",
                                                                x1: "0",
                                                                y1: "0",
                                                                x2: "0",
                                                                y2: "1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                        offset: "0%",
                                                                        stopColor: "#FFC94D",
                                                                        stopOpacity: 1
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1339,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                        offset: "100%",
                                                                        stopColor: "#FFB020",
                                                                        stopOpacity: 0.6
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1340,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1338,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                id: "barOrange",
                                                                x1: "0",
                                                                y1: "0",
                                                                x2: "0",
                                                                y2: "1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                        offset: "0%",
                                                                        stopColor: "#F59E0B",
                                                                        stopOpacity: 1
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1343,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                        offset: "100%",
                                                                        stopColor: "#FF3B30",
                                                                        stopOpacity: 0.7
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1344,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1342,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1337,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                        strokeDasharray: "3 3",
                                                        stroke: "rgba(255,255,255,0.06)",
                                                        vertical: false
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1347,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                                                        dataKey: "date",
                                                        tick: {
                                                            fill: "rgba(255,255,255,0.4)",
                                                            fontSize: 9
                                                        },
                                                        axisLine: {
                                                            stroke: "rgba(255,255,255,0.08)"
                                                        },
                                                        tickLine: false,
                                                        interval: 4
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1352,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                                                        tick: {
                                                            fill: "rgba(255,255,255,0.4)",
                                                            fontSize: 9
                                                        },
                                                        axisLine: false,
                                                        tickLine: false,
                                                        width: 32,
                                                        tickFormatter: (v)=>v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1359,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SavingsTooltip, {}, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                            lineNumber: 1369,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        cursor: {
                                                            fill: "rgba(255,255,255,0.04)"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1368,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bar"], {
                                                        dataKey: "cumul",
                                                        radius: [
                                                            4,
                                                            4,
                                                            0,
                                                            0
                                                        ],
                                                        maxBarSize: 14,
                                                        children: savingsData.map((entry, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                                                                fill: entry.isToday ? "url(#barOrange)" : "url(#barGreen)"
                                                            }, `bar-${idx}`, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1374,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1372,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1333,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 1332,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1331,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 text-white/50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2.5 h-2.5 rounded-sm bg-gradient-to-b from-[#FFC94D] to-[#FFB020]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1385,
                                                        columnNumber: 15
                                                    }, this),
                                                    t("financeSaved")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1384,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 text-white/50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2.5 h-2.5 rounded-sm bg-gradient-to-b from-[#F59E0B] to-[#FF3B30]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1389,
                                                        columnNumber: 15
                                                    }, this),
                                                    t("today")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1388,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1383,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 1313,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "glass-card p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__["Grid3x3"],
                                        iconColor: "#F59E0B",
                                        title: t("statsHeatmap"),
                                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-white/40",
                                            children: t("statsWeeks5")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 1402,
                                            columnNumber: 15
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1397,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-7 gap-1.5 mb-2",
                                        children: WEEKDAY_LABELS.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center text-[10px] text-white/40 font-medium",
                                                children: d
                                            }, `wd-${i}`, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1408,
                                                columnNumber: 15
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1406,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-7 gap-1.5",
                                        children: heatmapCells.map((cell, idx)=>{
                                            const bg = cell.status === "green" ? "linear-gradient(135deg, #FFC94D 0%, #FFB020 100%)" : cell.status === "red" ? "linear-gradient(135deg, #FF3B30 0%, #F59E0B 100%)" : cell.status === "future" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.06)";
                                            const border = cell.isToday ? "2px solid #F59E0B" : "1px solid rgba(255,255,255,0.04)";
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    scale: 0.6
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    scale: 1
                                                },
                                                transition: {
                                                    delay: idx * 0.012,
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 22
                                                },
                                                whileTap: {
                                                    scale: 0.92
                                                },
                                                className: "aspect-square rounded-md relative",
                                                style: {
                                                    background: bg,
                                                    border,
                                                    boxShadow: cell.isToday ? "0 0 12px rgba(245, 158, 11,0.5)" : cell.status === "green" ? "0 0 8px rgba(255,201,77,0.25)" : cell.status === "red" ? "0 0 8px rgba(255,59,48,0.3)" : "none"
                                                },
                                                title: cell.date.toLocaleDateString("fr-FR", {
                                                    weekday: "long",
                                                    day: "numeric",
                                                    month: "long"
                                                }),
                                                children: cell.isToday && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                    lineNumber: 1461,
                                                    columnNumber: 21
                                                }, this)
                                            }, `cell-${idx}`, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1431,
                                                columnNumber: 17
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1417,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 text-white/60",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2.5 h-2.5 rounded-sm",
                                                        style: {
                                                            background: "linear-gradient(135deg, #FFC94D, #FFB020)"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1472,
                                                        columnNumber: 15
                                                    }, this),
                                                    t("statsNoBet"),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/40",
                                                        children: [
                                                            "(",
                                                            heatCounts.green,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1479,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1471,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 text-white/60",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2.5 h-2.5 rounded-sm",
                                                        style: {
                                                            background: "linear-gradient(135deg, #FF3B30, #F59E0B)"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1482,
                                                        columnNumber: 15
                                                    }, this),
                                                    t("panicTitle"),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/40",
                                                        children: [
                                                            "(",
                                                            heatCounts.red,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1489,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1481,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 text-white/60",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2.5 h-2.5 rounded-sm",
                                                        style: {
                                                            background: "rgba(255,255,255,0.08)"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1492,
                                                        columnNumber: 15
                                                    }, this),
                                                    t("statsNoData"),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/40",
                                                        children: [
                                                            "(",
                                                            heatCounts.gray,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1497,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1491,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1470,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 1396,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "glass-card p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__["PieChart"],
                                        iconColor: "#FFD166",
                                        title: t("statsEmotionDistribution"),
                                        right: hasEmotionData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-white/40",
                                            children: t("statsEmotionCount", {
                                                n: totalEmotions
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 1510,
                                            columnNumber: 17
                                        }, void 0) : undefined
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1504,
                                        columnNumber: 11
                                    }, this),
                                    hasEmotionData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full",
                                                style: {
                                                    height: 200
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                    width: "100%",
                                                    height: "100%",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PieChart"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Pie"], {
                                                                data: emotionData,
                                                                dataKey: "value",
                                                                nameKey: "name",
                                                                cx: "50%",
                                                                cy: "50%",
                                                                innerRadius: 50,
                                                                outerRadius: 80,
                                                                paddingAngle: 2,
                                                                stroke: "rgba(10,10,15,0.6)",
                                                                strokeWidth: 2,
                                                                children: emotionData.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cell"], {
                                                                        fill: entry.color
                                                                    }, `cell-${entry.key}`, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                        lineNumber: 1534,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1521,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                                contentStyle: {
                                                                    background: "rgba(11,19,43,0.95)",
                                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                                    borderRadius: 12,
                                                                    fontSize: 12,
                                                                    backdropFilter: "blur(20px)"
                                                                },
                                                                labelStyle: {
                                                                    color: "rgba(255,255,255,0.8)"
                                                                },
                                                                itemStyle: {
                                                                    color: "rgba(255,255,255,0.9)"
                                                                },
                                                                formatter: (value, _name, entry)=>{
                                                                    const pct = totalEmotions > 0 ? Math.round(value / totalEmotions * 100) : 0;
                                                                    const color = entry?.payload?.color ?? "#fff";
                                                                    return [
                                                                        `${value} (${pct}%)`,
                                                                        ""
                                                                    ];
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1537,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1520,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                    lineNumber: 1519,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1518,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-x-3 gap-y-2",
                                                children: emotionData.slice().sort((a, b)=>b.value - a.value).map((e)=>{
                                                    const pct = totalEmotions > 0 ? Math.round(e.value / totalEmotions * 100) : 0;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-xs",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
                                                                style: {
                                                                    background: e.color
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1577,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/70 flex-1 truncate",
                                                                children: [
                                                                    EMOTION_EMOJI[e.key],
                                                                    " ",
                                                                    e.name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1581,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/40 text-[10px]",
                                                                children: [
                                                                    pct,
                                                                    "% · ",
                                                                    e.value
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1584,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, e.key, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1573,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1563,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1517,
                                        columnNumber: 13
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                                        variant: "stats",
                                        title: t("statsNoEmotionTitle"),
                                        description: t("statsNoEmotionDesc"),
                                        hideCta: true,
                                        compact: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1593,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 1503,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "glass-card-strong p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"],
                                        iconColor: "#FBBF24",
                                        title: t("statsRanksProgress"),
                                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-white/40",
                                            children: [
                                                unlockedCount,
                                                " / ",
                                                totalRanks
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 1610,
                                            columnNumber: 15
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1605,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0",
                                                style: {
                                                    background: currentRank.gradient,
                                                    boxShadow: `0 0 24px ${currentRank.glow}`
                                                },
                                                children: currentRank.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1616,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white font-semibold text-sm font-[family-name:var(--font-poppins)] truncate",
                                                        children: currentRank.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1626,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white/40 text-[11px] truncate",
                                                        children: currentRank.subtitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1629,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1625,
                                                columnNumber: 13
                                            }, this),
                                            nextRank ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right flex-shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white/40 text-[10px]",
                                                        children: t("statsNextRank")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1635,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white/70 text-xs font-medium truncate max-w-[110px]",
                                                        children: [
                                                            nextRank.icon,
                                                            " ",
                                                            nextRank.name
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1636,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1634,
                                                columnNumber: 15
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right flex-shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[#FBBF24] text-[10px] font-bold",
                                                        children: "MAX"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1642,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white/70 text-xs font-medium",
                                                        children: t("statsUltimateRank")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1643,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1641,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1615,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-3 rounded-full bg-white/5 overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        width: 0
                                                    },
                                                    animate: {
                                                        width: `${achievementPercent}%`
                                                    },
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 120,
                                                        damping: 20,
                                                        delay: 0.2
                                                    },
                                                    className: "h-full rounded-full relative",
                                                    style: {
                                                        background: "linear-gradient(90deg, #FF3B30 0%, #F59E0B 35%, #FBBF24 70%, #FFC94D 100%)",
                                                        boxShadow: "0 0 12px rgba(245, 158, 11,0.5)"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 shimmer rounded-full"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1666,
                                                        columnNumber: 17
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                    lineNumber: 1650,
                                                    columnNumber: 15
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1649,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/40 text-[10px]",
                                                        children: t("statsPercentCompleted", {
                                                            pct: achievementPercent
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1670,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/40 text-[10px]",
                                                        children: t("statsRanksRemaining", {
                                                            n: totalRanks - unlockedCount
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1673,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1669,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1648,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>navigate("parcours"),
                                        className: "mt-3 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/80 text-xs font-medium flex items-center justify-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1682,
                                                columnNumber: 13
                                            }, this),
                                            t("statsSeeAllRanks")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1678,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 1604,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "glass-card p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
                                        iconColor: "#FFB020",
                                        title: t("statsWeeklySummary"),
                                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-white/40",
                                            children: t("statsLast7Days")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                            lineNumber: 1694,
                                            columnNumber: 15
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1689,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                whileTap: {
                                                    scale: 0.96
                                                },
                                                className: "glass-card-strong p-3 text-center relative overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -top-6 -right-6 w-16 h-16 rounded-full bg-[#F59E0B]/15 blur-2xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1702,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-lg bg-[#F59E0B]/15 flex items-center justify-center mx-auto mb-1.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                    size: 15,
                                                                    className: "text-[#F59E0B]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                    lineNumber: 1705,
                                                                    columnNumber: 19
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1704,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xl font-extrabold text-white font-[family-name:var(--font-poppins)]",
                                                                children: weekDaysClean
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1707,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/40 text-[9px] mt-0.5",
                                                                children: [
                                                                    "/ 7 ",
                                                                    t("days")
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1710,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/60 text-[10px] mt-1 font-medium leading-tight",
                                                                children: t("statsDaysWithoutBet")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1711,
                                                                columnNumber: 17
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1703,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1698,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                whileTap: {
                                                    scale: 0.96
                                                },
                                                className: "glass-card-strong p-3 text-center relative overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -top-6 -right-6 w-16 h-16 rounded-full bg-[#FFC94D]/15 blur-2xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1721,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-lg bg-[#FFC94D]/15 flex items-center justify-center mx-auto mb-1.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                                    size: 15,
                                                                    className: "text-[#FFC94D]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                    lineNumber: 1724,
                                                                    columnNumber: 19
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1723,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] leading-tight",
                                                                children: formatFCFA(weekSavings)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1726,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/40 text-[9px] mt-0.5",
                                                                children: "FCFA"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1729,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/60 text-[10px] mt-1 font-medium leading-tight",
                                                                children: t("financeSaved")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1730,
                                                                columnNumber: 17
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1722,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1717,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                whileTap: {
                                                    scale: 0.96
                                                },
                                                className: "glass-card-strong p-3 text-center relative overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -top-6 -right-6 w-16 h-16 rounded-full bg-[#FFD166]/15 blur-2xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1740,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-lg bg-[#FFD166]/15 flex items-center justify-center mx-auto mb-1.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                                    size: 15,
                                                                    className: "text-[#FFD166]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                    lineNumber: 1743,
                                                                    columnNumber: 19
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1742,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xl font-extrabold text-white font-[family-name:var(--font-poppins)]",
                                                                children: weekCrisesAvoided
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1745,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/40 text-[9px] mt-0.5",
                                                                children: weekCrisesAvoided > 1 ? t("statsCrises") : t("statsCrisis")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1748,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-white/60 text-[10px] mt-1 font-medium leading-tight",
                                                                children: t("statsCrisesAvoided")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                                lineNumber: 1751,
                                                                columnNumber: 17
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                        lineNumber: 1741,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1736,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1697,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 pt-3 border-t border-white/5 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 14,
                                                className: "text-[#FFC94D] flex-shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1760,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/60 text-[11px] leading-snug",
                                                children: weekDaysClean >= 7 ? t("statsWeekPerfect") : weekCrisesAvoided > 0 ? t("statsWeekOvercame") : t("statsWeekVictory")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                                lineNumber: 1761,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                        lineNumber: 1759,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 1688,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: itemVariants,
                                className: "text-center pt-2 pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/30 text-[10px] italic",
                                    children: t("statsQuote")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                    lineNumber: 1776,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                                lineNumber: 1772,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                        lineNumber: 766,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
                lineNumber: 745,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/StatsScreen.tsx",
        lineNumber: 714,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/zerobet/screens/StatsScreen.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/zerobet/screens/StatsScreen.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=src_7de86441._.js.map