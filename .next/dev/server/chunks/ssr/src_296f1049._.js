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
"[project]/src/components/zerobet/components/TiltCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TiltCard",
    ()=>TiltCard,
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
function TiltCard({ children, className, maxTilt = 12, glare = true, scale = 1.02, onClick }) {
    const prefersReducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Tilt state — `x` is rotateX (positive tilts top toward viewer),
    // `y` is rotateY (positive tilts right side toward viewer).
    const [tilt, setTilt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    // Glare position in % of card dimensions (0-100).
    const [glarePos, setGlarePos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 50,
        y: 50
    });
    // Whether the cursor is currently inside the card (drives glare visibility
    // and the scale-on-hover lift).
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handlePointerMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (prefersReducedMotion) return;
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        // Normalized cursor position in [0, 1] relative to the card.
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const clampedX = Math.max(0, Math.min(1, px));
        const clampedY = Math.max(0, Math.min(1, py));
        // Cursor at top => tilt top toward viewer (positive rotateX).
        // Cursor at right => tilt right side away from viewer (positive rotateY).
        const rotateX = (0.5 - clampedY) * 2 * maxTilt;
        const rotateY = (clampedX - 0.5) * 2 * maxTilt;
        setTilt({
            x: rotateX,
            y: rotateY
        });
        setGlarePos({
            x: clampedX * 100,
            y: clampedY * 100
        });
        setActive(true);
    }, [
        maxTilt,
        prefersReducedMotion
    ]);
    const handlePointerLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (prefersReducedMotion) return;
        setTilt({
            x: 0,
            y: 0
        });
        setActive(false);
    }, [
        prefersReducedMotion
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        onClick?.();
    }, [
        onClick
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (!onClick) return;
        if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
            event.preventDefault();
            onClick();
        }
    }, [
        onClick
    ]);
    const isInteractive = typeof onClick === "function";
    // Inline style overrides anything from the .tilt-card class. The transform
    // string is rebuilt every render — React 18 batches mousemove state updates
    // so this is fine performance-wise (one re-render per pointer event).
    const style = prefersReducedMotion ? {
        position: "relative"
    } : {
        position: "relative",
        transform: `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) ` + `rotateY(${tilt.y.toFixed(2)}deg) scale(${active ? scale : 1})`,
        // Fast transition while active (effectively following the cursor),
        // smooth easing curve on reset for a graceful return.
        transition: active ? "transform 0.05s linear" : "transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)"
    };
    const combinedClassName = [
        "tilt-card",
        isInteractive ? "cursor-pointer" : "",
        className ?? ""
    ].filter(Boolean).join(" ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: combinedClassName,
        style: style,
        onMouseMove: handlePointerMove,
        onMouseLeave: handlePointerLeave,
        onClick: isInteractive ? handleClick : undefined,
        onKeyDown: isInteractive ? handleKeyDown : undefined,
        role: isInteractive ? "button" : undefined,
        tabIndex: isInteractive ? 0 : undefined,
        children: [
            glare && !prefersReducedMotion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden",
                style: {
                    opacity: active ? 1 : 0,
                    transition: "opacity 0.25s ease"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0",
                    style: {
                        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0) 60%)`,
                        mixBlendMode: "screen"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/components/TiltCard.tsx",
                    lineNumber: 172,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/TiltCard.tsx",
                lineNumber: 164,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tilt-card-inner relative",
                style: {
                    transformStyle: "preserve-3d"
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/TiltCard.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/TiltCard.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = TiltCard;
}),
"[project]/src/components/zerobet/components/ArtifactIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArtifactIcon",
    ()=>ArtifactIcon,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ArtifactIcon({ artifactKey, size = 48, className, glow = true }) {
    // useId gives us a stable, SSR-safe unique id per render so multiple
    // instances of the same artifact never collide on gradient/filter ids.
    const uid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])().replace(/[:]/g, "");
    const gradientId = `artifact-grad-${uid}`;
    const glowId = `artifact-glow-${uid}`;
    const gradient2Id = `artifact-grad2-${uid}`;
    const radialId = `artifact-radial-${uid}`;
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 48 48",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className,
        role: "img",
        "aria-hidden": true
    };
    switch(artifactKey){
        case "jour-1":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DawnCrystalIcon, {
                ...common,
                gradientId: gradientId,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this);
        case "jour-3":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MistAmuletIcon, {
                ...common,
                gradientId: gradientId,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this);
        case "jour-7":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BronzeShieldIcon, {
                ...common,
                gradientId: gradientId,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this);
        case "jour-14":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SilverRunesIcon, {
                ...common,
                gradientId: gradientId,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this);
        case "jour-30":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GoldScepterIcon, {
                ...common,
                gradientId: gradientId,
                gradient2Id: gradient2Id,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this);
        case "jour-45":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlatinumOrbIcon, {
                ...common,
                gradientId: gradientId,
                gradient2Id: gradient2Id,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this);
        case "jour-60":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DiamondHeartIcon, {
                ...common,
                gradientId: gradientId,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 116,
                columnNumber: 9
            }, this);
        case "jour-90":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EmeraldIcon, {
                ...common,
                gradientId: gradientId,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this);
        case "jour-120":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SapphireIcon, {
                ...common,
                gradientId: gradientId,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this);
        case "jour-180":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RubyIcon, {
                ...common,
                gradientId: gradientId,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 143,
                columnNumber: 9
            }, this);
        case "jour-270":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AmethystIcon, {
                ...common,
                gradientId: gradientId,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 152,
                columnNumber: 9
            }, this);
        case "jour-365":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CrownIcon, {
                ...common,
                gradientId: gradientId,
                gradient2Id: gradient2Id,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 161,
                columnNumber: 9
            }, this);
        case "jour-730":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StarMasteryIcon, {
                ...common,
                gradientId: gradientId,
                gradient2Id: gradient2Id,
                radialId: radialId,
                glowId: glowId,
                glow: glow
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 171,
                columnNumber: 9
            }, this);
        default:
            // Fallback — a small geometric diamond so unknown keys still render.
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ...common,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                            id: gradientId,
                            x1: "0%",
                            y1: "0%",
                            x2: "100%",
                            y2: "100%",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "0%",
                                    stopColor: "#FFFFFF"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "100%",
                                    stopColor: "#9CA3AF"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                            lineNumber: 185,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 8 L36 24 L24 40 L12 24 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 183,
                columnNumber: 9
            }, this);
    }
}
/* --------------------------------------------------------------------------
 * Glow filter — reused by every icon. Soft gaussian blur merged back over
 * the source graphic for a luminous halo.
 * ------------------------------------------------------------------------ */ function GlowFilter({ glowId, glow }) {
    if (!glow) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
        id: glowId,
        x: "-50%",
        y: "-50%",
        width: "200%",
        height: "200%",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                stdDeviation: "1.6",
                result: "blur"
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                        in: "blur"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                        in: "SourceGraphic"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 232,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 1. jour-1 — Le Cristal d'Aube (Dawn Crystal)
 *    A faceted diamond with rays of light above it. Silver-white gradient.
 * ========================================================================== */ function DawnCrystalIcon(props) {
    const { gradientId, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FFFFFF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "50%",
                                stopColor: "#E8E8E8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#9CA3AF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        stroke: "rgba(255,255,255,0.55)",
                        strokeWidth: "1",
                        strokeLinecap: "round",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M24 3 L24 8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M16 5 L19 9"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M32 5 L29 9"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M9 9 L13 12"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M39 9 L35 12"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 11 L36 20 L24 41 L12 20 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M12 20 L36 20 M24 11 L24 41 M24 11 L12 20 M24 11 L36 20",
                        stroke: "rgba(255,255,255,0.45)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 282,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 11 L30 16 L24 20 L18 16 Z",
                        fill: "rgba(255,255,255,0.65)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M18 20 L30 20 L24 41 Z",
                        fill: "rgba(0,0,0,0.10)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 252,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 2. jour-3 — L'Amulette de Brume (Mist Amulet)
 *    A circular medallion with a swirling mist pattern inside. Cyan-teal.
 * ========================================================================== */ function MistAmuletIcon(props) {
    const { gradientId, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FFD166"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 315,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "50%",
                                stopColor: "#FFB020"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#FF9A3D"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "17",
                        fill: "none",
                        stroke: `url(#${gradientId})`,
                        strokeWidth: "3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "13",
                        fill: `url(#${gradientId})`,
                        opacity: "0.18"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "13",
                        fill: "none",
                        stroke: "rgba(255,255,255,0.25)",
                        strokeWidth: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 339,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M16 24 C16 19, 21 16, 25 18 C28 19, 30 22, 28 25 C27 27, 24 27, 23 25",
                        fill: "none",
                        stroke: "rgba(255,255,255,0.85)",
                        strokeWidth: "1.5",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 348,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M32 24 C32 29, 27 32, 23 30 C20 29, 18 26, 20 23 C21 21, 24 21, 25 23",
                        fill: "none",
                        stroke: "rgba(255,255,255,0.55)",
                        strokeWidth: "1.5",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 7 L24 4",
                        stroke: `url(#${gradientId})`,
                        strokeWidth: "1.5",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "4",
                        r: "1.8",
                        fill: "none",
                        stroke: `url(#${gradientId})`,
                        strokeWidth: "1.2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 369,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 312,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 3. jour-7 — Le Bouclier de Bronze (Bronze Shield)
 *    A heraldic shield with a central boss and decorative border. Bronze.
 * ========================================================================== */ function BronzeShieldIcon(props) {
    const { gradientId, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FCD9B6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 395,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "40%",
                                stopColor: "#CD7F32"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#6B3410"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 397,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 394,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 399,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 6 L40 11 V24 C40 33, 33 40, 24 43 C15 40, 8 33, 8 24 V11 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.35)",
                        strokeWidth: "0.8"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 403,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 9 L37 13 V24 C37 31, 31 37, 24 39.5 C17 37, 11 31, 11 24 V13 Z",
                        fill: "none",
                        stroke: "rgba(0,0,0,0.25)",
                        strokeWidth: "0.7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M14 14 L34 14",
                        stroke: "rgba(255,255,255,0.55)",
                        strokeWidth: "0.8",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 417,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M14 14.5 L34 14.5",
                        stroke: "rgba(0,0,0,0.18)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 423,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "5",
                        fill: "rgba(0,0,0,0.22)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 429,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "4",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "22.6",
                        cy: "22.6",
                        r: "1.4",
                        fill: "rgba(255,255,255,0.7)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 438,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M13 14 L24 24 M35 14 L24 24 M13 34 L24 24 M35 34 L24 24",
                        stroke: "rgba(255,255,255,0.18)",
                        strokeWidth: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 39.5 C24 41, 24 42.5, 24 43",
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 446,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 392,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 4. jour-14 — Les Runes d'Argent (Silver Runes)
 *    Three vertical rune stones with carved symbols. Silver gradient.
 * ========================================================================== */ function SilverRunesIcon(props) {
    const { gradientId, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FFFFFF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 469,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "50%",
                                stopColor: "#D4D4D8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 470,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#71717A"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 471,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 468,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 473,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 467,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "8",
                        y: "14",
                        width: "9",
                        height: "22",
                        rx: "2",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.35)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 477,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M10.5 18 L14.5 22 M14.5 22 L10.5 26 M14.5 22 L14.5 30",
                        stroke: "rgba(0,0,0,0.45)",
                        strokeWidth: "0.9",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 488,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "19.5",
                        y: "10",
                        width: "9",
                        height: "26",
                        rx: "2",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 495,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 14 L24 32 M24 20 L28 17 M24 20 L20 17",
                        stroke: "rgba(0,0,0,0.45)",
                        strokeWidth: "0.9",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 506,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 25 L26 27 L24 29 L22 27 Z",
                        fill: "rgba(0,0,0,0.3)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 512,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "31",
                        y: "14",
                        width: "9",
                        height: "22",
                        rx: "2",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.35)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 517,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M33.5 18 L37.5 30 M37.5 18 L33.5 30 M35.5 16 L35.5 32",
                        stroke: "rgba(0,0,0,0.45)",
                        strokeWidth: "0.9",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 528,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "12.5",
                        cy: "11",
                        r: "1",
                        fill: `url(#${gradientId})`
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 535,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "7",
                        r: "1.2",
                        fill: `url(#${gradientId})`
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 536,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "35.5",
                        cy: "11",
                        r: "1",
                        fill: `url(#${gradientId})`
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 537,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 475,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 466,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 5. jour-30 — Le Sceptre d'Or (Gold Scepter)
 *    A royal scepter with an orb on top and decorative bands. Gold.
 * ========================================================================== */ function GoldScepterIcon(props) {
    const { gradientId, gradient2Id, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FFF7CC"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 556,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "50%",
                                stopColor: "#FFD700"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 557,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#B8860B"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 558,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 555,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: gradient2Id,
                        cx: "35%",
                        cy: "30%",
                        r: "70%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FFFAE6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "60%",
                                stopColor: "#FFD700"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 562,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#B8860B"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 563,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 560,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 554,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "11",
                        r: "6.5",
                        fill: `url(#${gradient2Id})`,
                        stroke: "rgba(255,255,255,0.5)",
                        strokeWidth: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 569,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "22",
                        cy: "9",
                        rx: "1.6",
                        ry: "1.1",
                        fill: "rgba(255,255,255,0.75)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 578,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M18 17.5 L30 17.5 L28 20 L20 20 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(0,0,0,0.18)",
                        strokeWidth: "0.4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 586,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "21.5",
                        y: "20",
                        width: "5",
                        height: "20",
                        rx: "1.5",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 593,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "20.5",
                        y: "25",
                        width: "7",
                        height: "1.6",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(0,0,0,0.25)",
                        strokeWidth: "0.3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 604,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "20.5",
                        y: "33",
                        width: "7",
                        height: "1.6",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(0,0,0,0.25)",
                        strokeWidth: "0.3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 605,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "42",
                        r: "3.2",
                        fill: `url(#${gradient2Id})`,
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 607,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 5.5 L24 8 M21.5 7 L26.5 7",
                        stroke: "rgba(255,255,255,0.8)",
                        strokeWidth: "0.9",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 616,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 567,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 553,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 6. jour-45 — L'Orbe de Platine (Platinum Orb)
 *    A glowing orb/sphere with orbiting rings. Platinum white-blue.
 * ========================================================================== */ function PlatinumOrbIcon(props) {
    const { gradientId, gradient2Id, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: gradientId,
                        cx: "35%",
                        cy: "30%",
                        r: "70%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FFFFFF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 640,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "55%",
                                stopColor: "#E5E4E2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 641,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#94A3B8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 642,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 639,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradient2Id,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FFFFFF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 645,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#B9F2FF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 646,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 644,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 648,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 638,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "24",
                        cy: "24",
                        rx: "20",
                        ry: "7",
                        fill: "none",
                        stroke: `url(#${gradient2Id})`,
                        strokeWidth: "1.4",
                        opacity: "0.85",
                        transform: "rotate(-25 24 24)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 652,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "24",
                        cy: "24",
                        rx: "20",
                        ry: "7",
                        fill: "none",
                        stroke: `url(#${gradient2Id})`,
                        strokeWidth: "1.4",
                        opacity: "0.6",
                        transform: "rotate(25 24 24)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 663,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "11",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.55)",
                        strokeWidth: "0.7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 675,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "20.5",
                        cy: "20.5",
                        rx: "3",
                        ry: "2",
                        fill: "rgba(255,255,255,0.85)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 684,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "6",
                        fill: "none",
                        stroke: "rgba(185,242,255,0.7)",
                        strokeWidth: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 692,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "6",
                        cy: "14",
                        r: "1.4",
                        fill: `url(#${gradient2Id})`
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 701,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "42",
                        cy: "34",
                        r: "1.4",
                        fill: `url(#${gradient2Id})`
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 702,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "40",
                        cy: "9",
                        r: "1",
                        fill: `url(#${gradient2Id})`
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 703,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 650,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 637,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 7. jour-60 — Le Cœur de Diamant (Diamond Heart)
 *    A heart shape made of diamond facets. Blue gradient.
 * ========================================================================== */ function DiamondHeartIcon(props) {
    const { gradientId, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#BFEEFF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 722,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "50%",
                                stopColor: "#FFB020"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 723,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#FF9A3D"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 724,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 721,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 726,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 720,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 42 L9 27 C5 23, 5 16, 10 13 C14 10, 20 11, 24 16 C28 11, 34 10, 38 13 C43 16, 43 23, 39 27 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.45)",
                        strokeWidth: "0.7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 730,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 16 L24 42 M24 16 L13 22 M24 16 L35 22 M13 22 L35 22 M13 22 L20 30 M35 22 L28 30 M20 30 L24 42 M28 30 L24 42",
                        stroke: "rgba(255,255,255,0.55)",
                        strokeWidth: "0.5",
                        fill: "none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 743,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 16 L13 22 L20 14 Z",
                        fill: "rgba(255,255,255,0.5)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 750,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 16 L35 22 L28 14 Z",
                        fill: "rgba(255,255,255,0.3)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 755,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M14 14 L15 17 L18 18 L15 19 L14 22 L13 19 L10 18 L13 17 Z",
                        fill: "rgba(255,255,255,0.85)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 760,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 728,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 719,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 8. jour-90 — L'Émeraude de Renaissance (Emerald of Rebirth)
 *    A cut emerald gemstone with leaf-like facets. Green gradient.
 * ========================================================================== */ function EmeraldIcon(props) {
    const { gradientId, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#BBF7D0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 782,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "50%",
                                stopColor: "#FFC94D"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 783,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#166534"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 784,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 781,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 786,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 780,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M16 9 L32 9 L39 16 L39 32 L32 39 L16 39 L9 32 L9 16 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 790,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M18 13 L30 13 L35 18 L35 30 L30 35 L18 35 L13 30 L13 18 Z",
                        fill: "none",
                        stroke: "rgba(255,255,255,0.35)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 797,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M20 16 L28 16 L31 19 L31 29 L28 32 L20 32 L17 29 L17 19 Z",
                        fill: "rgba(255,255,255,0.18)",
                        stroke: "rgba(255,255,255,0.5)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 804,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M16 9 L18 13 M32 9 L30 13 M39 16 L35 18 M39 32 L35 30 M32 39 L30 35 M16 39 L18 35 M9 32 L13 30 M9 16 L13 18",
                        stroke: "rgba(255,255,255,0.5)",
                        strokeWidth: "0.5",
                        fill: "none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 811,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M17 19 L20 16 L23 19 L20 22 Z",
                        fill: "rgba(255,255,255,0.55)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 818,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 17 L24 31 M24 24 L28 22 M24 24 L20 22 M24 27 L28 29 M24 27 L20 29",
                        stroke: "rgba(255,255,255,0.45)",
                        strokeWidth: "0.5",
                        fill: "none",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 823,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 788,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 779,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 9. jour-120 — Le Saphir de Sagesse (Sapphire of Wisdom)
 *    A deep blue sapphire with a six-ray star. Deep blue gradient.
 * ========================================================================== */ function SapphireIcon(props) {
    const { gradientId, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#A5B4FC"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 848,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "50%",
                                stopColor: "#FFB020"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 849,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#1E3A8A"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 850,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 847,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 852,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 846,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M16 8 C12 8, 8 12, 8 16 L8 32 C8 36, 12 40, 16 40 L32 40 C36 40, 40 36, 40 32 L40 16 C40 12, 36 8, 32 8 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.45)",
                        strokeWidth: "0.7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 856,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M18 12 C15 12, 12 15, 12 18 L12 30 C12 33, 15 36, 18 36 L30 36 C33 36, 36 33, 36 30 L36 18 C36 15, 33 12, 30 12 Z",
                        fill: "none",
                        stroke: "rgba(255,255,255,0.35)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 863,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        stroke: "rgba(255,255,255,0.85)",
                        strokeWidth: "0.9",
                        strokeLinecap: "round",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M24 9 L24 39"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 876,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M9 24 L39 24"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 878,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12 12 L36 36"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 880,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M36 12 L12 36"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 881,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 870,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "3.2",
                        fill: "rgba(255,255,255,0.55)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 884,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "1.4",
                        fill: "rgba(255,255,255,0.95)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 885,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M14 14 C13 15, 12 17, 12 18 L16 14 Z",
                        fill: "rgba(255,255,255,0.5)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 887,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 854,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 845,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 10. jour-180 — Le Rubis de Passion (Ruby of Passion)
 *    A faceted ruby with inner fire. Red gradient.
 * ========================================================================== */ function RubyIcon(props) {
    const { gradientId, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FECACA"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 909,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "45%",
                                stopColor: "#FF3B30"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 910,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#7F1D1D"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 911,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 908,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 913,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 907,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 6 C16 6, 9 14, 9 24 C9 32, 16 41, 24 41 C32 41, 39 32, 39 24 C39 14, 32 6, 24 6 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 917,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 6 L13 16 L24 22 L35 16 Z",
                        fill: "none",
                        stroke: "rgba(255,255,255,0.5)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 928,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 22 L13 16 L9 24 L24 41 Z M24 22 L35 16 L39 24 L24 41 Z",
                        fill: "rgba(0,0,0,0.10)",
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 935,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 6 L24 41",
                        stroke: "rgba(255,255,255,0.5)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 942,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "24",
                        cy: "26",
                        rx: "6",
                        ry: "9",
                        fill: "rgba(254,202,202,0.4)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 948,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 6 L18 12 L24 18 L21 14 Z",
                        fill: "rgba(255,255,255,0.75)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 956,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M16 14 L17 16 L19 17 L17 18 L16 20 L15 18 L13 17 L15 16 Z",
                        fill: "rgba(255,255,255,0.9)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 961,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 915,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 906,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 11. jour-270 — L'Améthyste de Maîtrise (Amethyst of Mastery)
 *    A purple amethyst geode / crystal cluster. Purple gradient.
 * ========================================================================== */ function AmethystIcon(props) {
    const { gradientId, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#E9D5FF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 983,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "50%",
                                stopColor: "#FFD166"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 984,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#6B21A8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 985,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 982,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 987,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 981,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 6 C14 6, 7 14, 7 24 C7 33, 14 41, 24 41 C34 41, 41 33, 41 24 C41 14, 34 6, 24 6 Z",
                        fill: "rgba(0,0,0,0.45)",
                        stroke: "rgba(255, 209, 102,0.5)",
                        strokeWidth: "0.8"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 991,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 10 C16 10, 11 16, 11 24 C11 31, 16 37, 24 37 C32 37, 37 31, 37 24 C37 16, 32 10, 24 10 Z",
                        fill: "rgba(0,0,0,0.55)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1002,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 14 L29 22 L24 32 L19 22 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.55)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1012,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 14 L24 32 M19 22 L29 22",
                        stroke: "rgba(255,255,255,0.5)",
                        strokeWidth: "0.4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1018,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M16 18 L20 23 L17 31 L13 24 Z",
                        fill: `url(#${gradientId})`,
                        opacity: "0.85",
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1024,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M32 18 L35 24 L31 31 L28 23 Z",
                        fill: `url(#${gradientId})`,
                        opacity: "0.85",
                        stroke: "rgba(255,255,255,0.4)",
                        strokeWidth: "0.4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1032,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M21 13 L24 16 L27 13 L24 11 Z",
                        fill: `url(#${gradientId})`
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1040,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 14 L26 18 L24 22 L22 18 Z",
                        fill: "rgba(255,255,255,0.55)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1045,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "22",
                        r: "1",
                        fill: "rgba(255,255,255,0.9)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1050,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 989,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 980,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 12. jour-365 — La Couronne de Légende (Crown of Legend)
 *    A royal crown with 5 points and a central gem. Gold-red gradient.
 * ========================================================================== */ function CrownIcon(props) {
    const { gradientId, gradient2Id, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradientId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FFF7CC"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1069,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "45%",
                                stopColor: "#FFD700"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1070,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#B8860B"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1071,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1068,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: gradient2Id,
                        cx: "50%",
                        cy: "40%",
                        r: "60%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FECACA"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1074,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "60%",
                                stopColor: "#FF3B30"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1075,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#7F1D1D"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1076,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1073,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1078,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 1067,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8 30 L40 30 L40 36 C40 38, 38 40, 36 40 L12 40 C10 40, 8 38, 8 36 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.5)",
                        strokeWidth: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1082,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8 33 L40 33",
                        stroke: "rgba(0,0,0,0.25)",
                        strokeWidth: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1089,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8 30 L12 12 L18 26 L24 8 L30 26 L36 12 L40 30 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.5)",
                        strokeWidth: "0.7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1095,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M12 12 L15 22 L18 26 Z M36 12 L33 22 L30 26 Z",
                        fill: "rgba(0,0,0,0.18)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "12",
                        cy: "12",
                        r: "1.6",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(0,0,0,0.2)",
                        strokeWidth: "0.3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "8",
                        r: "2.2",
                        fill: `url(#${gradient2Id})`,
                        stroke: "rgba(255,255,255,0.6)",
                        strokeWidth: "0.4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "36",
                        cy: "12",
                        r: "1.6",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(0,0,0,0.2)",
                        strokeWidth: "0.3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "18",
                        cy: "26",
                        r: "1.2",
                        fill: `url(#${gradient2Id})`
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "30",
                        cy: "26",
                        r: "1.2",
                        fill: `url(#${gradient2Id})`
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 32 L28 35 L24 38 L20 35 Z",
                        fill: `url(#${gradient2Id})`,
                        stroke: "rgba(255,255,255,0.5)",
                        strokeWidth: "0.4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 32 L24 38 M20 35 L28 35",
                        stroke: "rgba(255,255,255,0.5)",
                        strokeWidth: "0.3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "14",
                        cy: "35",
                        r: "1.2",
                        fill: `url(#${gradient2Id})`,
                        opacity: "0.85"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "34",
                        cy: "35",
                        r: "1.2",
                        fill: `url(#${gradient2Id})`,
                        opacity: "0.85"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "23.3",
                        cy: "7.3",
                        r: "0.7",
                        fill: "rgba(255,255,255,0.85)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 1080,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 1066,
        columnNumber: 5
    }, this);
}
/* ============================================================================
 * 13. jour-730 — L'Étoile de Maîtrise (Star of Mastery)
 *    An 8-pointed star with rays. White-prismatic gradient.
 * ========================================================================== */ function StarMasteryIcon(props) {
    const { gradientId, gradient2Id, radialId, glowId, glow, ...svg } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...svg,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: gradientId,
                        cx: "50%",
                        cy: "50%",
                        r: "50%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FFFFFF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "60%",
                                stopColor: "#E0F2FE"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#FFB020"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1149,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: gradient2Id,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#FFFFFF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "50%",
                                stopColor: "#FFD166"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#FFB020"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1154,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: radialId,
                        cx: "50%",
                        cy: "50%",
                        r: "50%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "rgba(255,255,255,0.6)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "rgba(255,255,255,0)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                                lineNumber: 1158,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlowFilter, {
                        glowId: glowId,
                        glow: glow
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 1145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: glow ? `url(#${glowId})` : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "20",
                        fill: `url(#${radialId})`
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 4 L27 21 L44 24 L27 27 L24 44 L21 27 L4 24 L21 21 Z",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.55)",
                        strokeWidth: "0.6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 10 L26 22 L38 24 L26 26 L24 38 L22 26 L10 24 L22 22 Z",
                        fill: `url(#${gradient2Id})`,
                        opacity: "0.55"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "4.5",
                        fill: `url(#${gradientId})`,
                        stroke: "rgba(255,255,255,0.7)",
                        strokeWidth: "0.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "2",
                        fill: "rgba(255,255,255,0.95)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "4",
                        r: "0.9",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "44",
                        cy: "24",
                        r: "0.9",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "44",
                        r: "0.9",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "4",
                        cy: "24",
                        r: "0.9",
                        fill: "#FFFFFF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 4 L24 24 M44 24 L24 24 M24 44 L24 24 M4 24 L24 24",
                        stroke: "rgba(255,255,255,0.6)",
                        strokeWidth: "0.3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                        lineNumber: 1208,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
                lineNumber: 1162,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/ArtifactIcon.tsx",
        lineNumber: 1144,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = ArtifactIcon;
}),
"[project]/src/components/zerobet/components/BadgeMedal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BadgeMedal",
    ()=>BadgeMedal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
"use client";
;
;
;
const TIER_VISUALS = {
    bronze: {
        metalStops: [
            "#E89B5A",
            "#CD7F32",
            "#8C5420",
            "#D98E4A"
        ],
        rim: "#F2B77E",
        sparkle: "#F2B77E",
        glow: "rgba(205, 127, 50, 0.55)",
        auraClass: "tier-glow-bronze",
        iconColor: "#F2C49B"
    },
    silver: {
        metalStops: [
            "#F4F7FA",
            "#B8C4CE",
            "#7E8C98",
            "#DDE5EC"
        ],
        rim: "#FFFFFF",
        sparkle: "#E6EBF0",
        glow: "rgba(200, 210, 220, 0.55)",
        auraClass: "tier-glow-silver",
        iconColor: "#EDF2F7"
    },
    gold: {
        metalStops: [
            "#FFE9A8",
            "#FFD700",
            "#C69A10",
            "#FFE173"
        ],
        rim: "#FFF6D0",
        sparkle: "#FFE173",
        glow: "rgba(255, 200, 40, 0.6)",
        auraClass: "tier-glow-gold",
        iconColor: "#FFE9A8"
    },
    diamond: {
        metalStops: [
            "#FFFFFF",
            "#D9F3FF",
            "#FBD5FF",
            "#D2FBEF"
        ],
        rim: "#FFFFFF",
        sparkle: "#CFF2FF",
        glow: "rgba(200, 240, 255, 0.6)",
        auraClass: "tier-glow-diamond",
        iconColor: "#EAF9FF"
    },
    legendary: {
        metalStops: [
            "#FFC94D",
            "#FF6B00",
            "#C23A00",
            "#FF9A3D"
        ],
        rim: "#FFD166",
        sparkle: "#FFB020",
        glow: "rgba(255, 107, 0, 0.65)",
        auraClass: "tier-glow-legendary",
        iconColor: "#FFD166"
    }
};
/** Tiny 4-point fairy star used as orbiting sparkle. */ function SparkleStar({ style, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: "sparkle",
        style: {
            ...style,
            ["--sparkle-color"]: color
        },
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 1 L14.2 9.8 L23 12 L14.2 14.2 L12 23 L9.8 14.2 L1 12 L9.8 9.8 Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
            lineNumber: 121,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
function BadgeMedalBase({ tier, icon: Icon, color, unlocked = false, size = 64, calm = false, shineDelay = 0, className = "", style }) {
    const v = TIER_VISUALS[tier];
    const accent = color ?? v.iconColor;
    // Unique gradient ids per tier — shared across instances via <defs> duplication
    const ids = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            metal: `medal-metal-${tier}`,
            disc: `medal-disc-${tier}`,
            sheen: `medal-sheen-${tier}`
        }), [
        tier
    ]);
    const auraStyle = {
        ["--medal-glow"]: v.glow,
        ["--shine-delay"]: `${shineDelay}s`
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative flex-shrink-0 ${className}`,
        style: {
            width: size,
            height: size,
            ...style
        },
        "aria-hidden": false,
        children: [
            unlocked && !calm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "medal-rays",
                style: {
                    ["--medal-glow"]: accent + "66"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                lineNumber: 166,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative h-full w-full ${unlocked && !calm ? "medal-float" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `relative h-full w-full rounded-full ${unlocked ? v.auraClass : ""}`,
                        style: auraStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 100 100",
                                width: "100%",
                                height: "100%",
                                className: unlocked && !calm ? "" : "opacity-90",
                                role: "img",
                                "aria-label": unlocked ? "médaille débloquée" : "médaille verrouillée",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                id: ids.metal,
                                                x1: "12%",
                                                y1: "0%",
                                                x2: "88%",
                                                y2: "100%",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "0%",
                                                        stopColor: v.metalStops[0]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "38%",
                                                        stopColor: v.metalStops[1]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "72%",
                                                        stopColor: v.metalStops[2]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "100%",
                                                        stopColor: v.metalStops[3]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                lineNumber: 191,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                                id: ids.disc,
                                                cx: "38%",
                                                cy: "30%",
                                                r: "80%",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "0%",
                                                        stopColor: "#2A1A0C"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "55%",
                                                        stopColor: "#150C05"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "100%",
                                                        stopColor: "#0B0603"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                lineNumber: 203,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                id: ids.sheen,
                                                x1: "0%",
                                                y1: "0%",
                                                x2: "100%",
                                                y2: "100%",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "0%",
                                                        stopColor: "#FFFFFF",
                                                        stopOpacity: "0.55"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "45%",
                                                        stopColor: "#FFFFFF",
                                                        stopOpacity: "0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "100%",
                                                        stopColor: "#FFFFFF",
                                                        stopOpacity: "0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                                lineNumber: 208,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        className: unlocked && !calm ? "medal-honor-ring" : undefined,
                                        style: {
                                            transformOrigin: "50px 50px"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "50",
                                            cy: "50",
                                            r: "47",
                                            fill: "none",
                                            stroke: v.rim,
                                            strokeOpacity: unlocked ? 0.55 : 0.18,
                                            strokeWidth: "1.6",
                                            strokeDasharray: "2.5 6.5",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                            lineNumber: 220,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                        lineNumber: 216,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "50",
                                        cy: "50",
                                        r: "41.5",
                                        fill: "none",
                                        stroke: `url(#${ids.metal})`,
                                        strokeWidth: unlocked ? 7 : 5,
                                        strokeOpacity: unlocked ? 1 : 0.55
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                        lineNumber: 234,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "50",
                                        cy: "50",
                                        r: "37.5",
                                        fill: "none",
                                        stroke: v.rim,
                                        strokeOpacity: unlocked ? 0.5 : 0.12,
                                        strokeWidth: "1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "50",
                                        cy: "50",
                                        r: "34.5",
                                        fill: `url(#${ids.disc})`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                        lineNumber: 255,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "50",
                                        cy: "50",
                                        r: "34.5",
                                        fill: `url(#${ids.sheen})`,
                                        opacity: unlocked ? 0.8 : 0.35
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                        lineNumber: 257,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center",
                                style: {
                                    padding: size * 0.28
                                },
                                children: unlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    size: Math.round(size * 0.42),
                                    strokeWidth: 2.1,
                                    className: "drop-shadow-[0_0_6px_rgba(255,176,32,0.45)]",
                                    style: {
                                        color: accent
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                    lineNumber: 274,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                    size: Math.round(size * 0.34),
                                    strokeWidth: 2,
                                    className: "text-white/35"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                    lineNumber: 281,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            unlocked && !calm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "medal-shine"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                lineNumber: 290,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    unlocked && !calm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SparkleStar, {
                                color: v.sparkle,
                                style: {
                                    top: "-4%",
                                    left: "-6%",
                                    ["--sparkle-delay"]: "0s"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                lineNumber: 296,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SparkleStar, {
                                color: accent,
                                style: {
                                    top: "10%",
                                    right: "-10%",
                                    width: 5,
                                    height: 5,
                                    ["--sparkle-delay"]: "0.9s"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SparkleStar, {
                                color: v.sparkle,
                                style: {
                                    bottom: "-6%",
                                    left: "16%",
                                    width: 4.5,
                                    height: 4.5,
                                    ["--sparkle-delay"]: "1.7s"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/components/BadgeMedal.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
const BadgeMedal = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(BadgeMedalBase);
}),
"[project]/src/components/zerobet/screens/AchievementsScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AchievementsScreen",
    ()=>AchievementsScreen,
    "SPECIAL_ACHIEVEMENTS",
    ()=>SPECIAL_ACHIEVEMENTS,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-ssr] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wind.js [app-ssr] (ecmascript) <export default as Wind>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$footprints$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Footprints$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/footprints.js [app-ssr] (ecmascript) <export default as Footprints>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen-line.js [app-ssr] (ecmascript) <export default as PenLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coins.js [app-ssr] (ecmascript) <export default as Coins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flower$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flower2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flower-2.js [app-ssr] (ecmascript) <export default as Flower2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/messages-square.js [app-ssr] (ecmascript) <export default as MessagesSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2d$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HandHeart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hand-heart.js [app-ssr] (ecmascript) <export default as HandHeart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-ssr] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Waves$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/waves.js [app-ssr] (ecmascript) <export default as Waves>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$party$2d$popper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PartyPopper$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/party-popper.js [app-ssr] (ecmascript) <export default as PartyPopper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/zerobet-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/parcours-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$TiltCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/TiltCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$ArtifactIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/ArtifactIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$BadgeMedal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/BadgeMedal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-ssr] (ecmascript)");
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
const SPECIAL_ACHIEVEMENTS = [
    {
        key: "premier-pas",
        name: "Premier Pas",
        description: "Complète ton premier jour sans pari",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$footprints$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Footprints$3e$__["Footprints"],
        color: "#FFC94D",
        target: 1,
        getCurrent: (c)=>c.streakDays
    },
    {
        key: "respirateur",
        name: "Respirateur",
        description: "Utilise le bouton d'urgence 5 fois",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__["Wind"],
        color: "#FF9A3D",
        target: 5,
        getCurrent: (c)=>c.panicEventsCount
    },
    {
        key: "ecrivain",
        name: "Écrivain",
        description: "Écris 10 entrées dans ton journal",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLine$3e$__["PenLine"],
        color: "#FFD166",
        target: 10,
        getCurrent: (c)=>c.journalCount
    },
    {
        key: "econome",
        name: "Économe",
        description: "Économise 100 000 FCFA",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"],
        color: "#FFB020",
        target: 100000,
        getCurrent: (c)=>c.totalSaved
    },
    {
        key: "mediant",
        name: "Méditant",
        description: "7 jours de méditation d'affilée",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flower$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flower2$3e$__["Flower2"],
        color: "#FF8A00",
        target: 7,
        getCurrent: (c)=>c.meditationStreak
    },
    {
        key: "survivant",
        name: "Survivant",
        description: "Résiste à 10 envies fortes",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"],
        color: "#FF6B00",
        target: 10,
        getCurrent: (c)=>c.resolvedPanicCount
    },
    {
        key: "sociable",
        name: "Sociable",
        description: "Partage 5 témoignages",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__["MessagesSquare"],
        color: "#FFD166",
        target: 5,
        getCurrent: (c)=>c.testimonialsCount
    },
    {
        key: "mentor",
        name: "Mentor",
        description: "Aide 10 personnes dans le forum",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2d$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HandHeart$3e$__["HandHeart"],
        color: "#FFC94D",
        target: 10,
        getCurrent: (c)=>c.forumPostsCount * 2
    },
    {
        key: "legende",
        name: "Légende",
        description: "365 jours sans pari",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"],
        color: "#FFD700",
        target: 365,
        getCurrent: (c)=>c.streakDays
    },
    {
        key: "perseverant",
        name: "Persévérant",
        description: "30 jours sans rechute",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"],
        color: "#FF6B00",
        target: 30,
        getCurrent: (c)=>c.streakDays
    },
    {
        key: "erudit",
        name: "Érudit",
        description: "Lis 20 articles",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
        color: "#FF9A3D",
        target: 20,
        getCurrent: (c)=>c.articlesRead
    },
    {
        key: "zen-master",
        name: "Zen Master",
        description: "30 jours de méditation d'affilée",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Waves$3e$__["Waves"],
        color: "#FFB020",
        target: 30,
        getCurrent: (c)=>c.meditationStreak
    }
];
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const containerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.05
        }
    }
};
const itemVariants = {
    hidden: {
        opacity: 0,
        y: 16
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 24
        }
    }
};
function relativeTimeLabel(daysAgo) {
    if (daysAgo <= 0) return "Aujourd'hui";
    if (daysAgo === 1) return "Hier";
    if (daysAgo < 7) return `Il y a ${daysAgo} jours`;
    if (daysAgo < 30) {
        const weeks = Math.floor(daysAgo / 7);
        return weeks === 1 ? "Il y a 1 semaine" : `Il y a ${weeks} semaines`;
    }
    const months = Math.floor(daysAgo / 30);
    return months === 1 ? "Il y a 1 mois" : `Il y a ${months} mois`;
}
// TIER_META — the tier emoji icons were removed because they collided with
// the parcours medal imagery. The colored pill background already conveys
// the tier visually, so the emoji is purely decorative. We now use a small
// colored dot instead.
const TIER_META = {
    bronze: {
        label: "Bronze",
        color: "#CD7F32",
        metal: "metal-bronze"
    },
    silver: {
        label: "Argent",
        color: "#C0C0C0",
        metal: "metal-silver"
    },
    gold: {
        label: "Or",
        color: "#FFD700",
        metal: "metal-gold"
    },
    diamond: {
        label: "Diamant",
        color: "#CFF2FF",
        metal: "metal-diamond"
    },
    legendary: {
        label: "Légende",
        color: "#FF6B00",
        metal: "metal-legendary"
    }
};
function getTierForTarget(target) {
    if (target >= 365) return "legendary";
    if (target >= 30) return "gold";
    if (target >= 10) return "diamond";
    if (target >= 5) return "silver";
    return "bronze";
}
/**
 * ProgressRing — premium SVG circle that animates its stroke-dashoffset over
 * 1.2s using the `.progress-ring-circle` utility class (globals.css).
 */ function ProgressRing({ percent, color, size = 72, stroke = 6 }) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, percent));
    const offset = circumference - clamped / 100 * circumference;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        className: "flex-shrink-0",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: size / 2,
                cy: size / 2,
                r: radius,
                fill: "none",
                stroke: "rgba(255,255,255,0.08)",
                strokeWidth: stroke
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].circle, {
                className: "progress-ring-circle",
                cx: size / 2,
                cy: size / 2,
                r: radius,
                fill: "none",
                stroke: color,
                strokeWidth: stroke,
                strokeLinecap: "round",
                strokeDasharray: circumference,
                initial: {
                    strokeDashoffset: circumference
                },
                animate: {
                    strokeDashoffset: offset
                },
                transition: {
                    duration: 1.2,
                    ease: "easeOut",
                    delay: 0.15
                },
                style: {
                    filter: `drop-shadow(0 0 8px ${color}80)`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: "50%",
                y: "50%",
                textAnchor: "middle",
                dominantBaseline: "central",
                className: "font-[family-name:var(--font-poppins)] font-extrabold fill-white",
                style: {
                    fontSize: size * 0.22
                },
                children: [
                    Math.round(clamped),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
        lineNumber: 283,
        columnNumber: 5
    }, this);
}
/**
 * TierTab — a filter pill. Active state shows the tier's real metal gradient
 * (forged ring classes) + aura glow; inactive state shows a plain glass pill.
 */ function TierTab({ active, label, color, metal, count, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        "aria-pressed": active,
        className: `relative px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-semibold transition-all btn-press overflow-hidden ${active ? "text-[#1A0D02]" : "text-white/65 glass-card"}`,
        style: active ? {
            boxShadow: `0 0 18px ${color}80, 0 0 6px ${color}90, 0 4px 16px rgba(0,0,0,0.4)`
        } : {},
        children: [
            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                className: `absolute inset-0 ${metal} opacity-95`
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 357,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative inline-block w-2 h-2 rounded-full flex-shrink-0",
                style: {
                    background: color,
                    boxShadow: active ? "0 0 6px rgba(255,255,255,0.85), 0 0 12px " + color : `0 0 6px ${color}80`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 359,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative leading-none",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `relative text-[9px] px-1.5 py-0.5 rounded-full ml-0.5 ${active ? "bg-black/25 text-white" : "bg-white/10 text-white/70"}`,
                children: count
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 369,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
        lineNumber: 341,
        columnNumber: 5
    }, this);
}
/**
 * FlipBadge — a 3D flip card for a single achievement. Front shows a forged
 * metallic BadgeMedal + name; back shows the description + unlock state.
 * Tap (or hover on desktop) to flip. Unlocked medals carry light rays,
 * shine sweep, sparkles and a tier heat-aura; locked ones get a
 * desaturated treatment via .achievement-locked.
 */ function FlipBadge({ achievement, index }) {
    const [flipped, setFlipped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const tier = getTierForTarget(achievement.target);
    const colorVar = {
        ["--achievement-color"]: achievement.color
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.85
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        transition: {
            delay: 0.05 + index * 0.03,
            type: "spring",
            stiffness: 280,
            damping: 22
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `badge-3d w-full h-36 select-none cursor-pointer ${achievement.unlocked ? "" : "achievement-locked"}`,
            onClick: ()=>setFlipped((f)=>!f),
            style: colorVar,
            role: "button",
            tabIndex: 0,
            "aria-label": `${achievement.name} — ${achievement.unlocked ? "débloqué" : "verrouillé"}`,
            onKeyDown: (e)=>{
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setFlipped((f)=>!f);
                }
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "badge-3d-inner w-full h-full",
                style: flipped ? {
                    transform: "rotateY(180deg)"
                } : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "badge-3d-front glass-card p-2 flex flex-col items-center justify-center text-center rounded-2xl overflow-hidden",
                        style: achievement.unlocked ? {
                            boxShadow: `0 0 22px ${achievement.color}30, inset 0 0 18px rgba(255,176,32,0.06)`
                        } : {},
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$BadgeMedal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BadgeMedal"], {
                                tier: tier,
                                icon: achievement.icon,
                                color: achievement.color,
                                unlocked: achievement.unlocked,
                                size: 58,
                                shineDelay: index % 4 * 0.55
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 440,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-[10px] font-bold leading-tight mt-1.5 mb-0.5 ${achievement.unlocked ? "text-white" : "text-white/60"}`,
                                children: achievement.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 448,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/30 text-[8px] uppercase tracking-wider",
                                children: achievement.unlocked ? "Tap pour retourner" : "Verrouillé"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 455,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 432,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "badge-3d-back glass-card-strong p-2.5 flex flex-col items-center justify-center text-center rounded-2xl overflow-hidden",
                        style: {
                            background: `linear-gradient(135deg, ${achievement.color}26 0%, rgba(18,9,4,0.85) 100%)`,
                            boxShadow: `0 0 20px ${achievement.color}30`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white text-[10px] font-bold leading-tight mb-1",
                                children: achievement.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 468,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/75 text-[8.5px] leading-tight line-clamp-3 mb-1.5",
                                children: achievement.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 471,
                                columnNumber: 13
                            }, this),
                            achievement.unlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] font-semibold uppercase tracking-wider flex items-center gap-1",
                                style: {
                                    color: achievement.color
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        size: 9,
                                        strokeWidth: 3
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 479,
                                        columnNumber: 17
                                    }, this),
                                    " Débloqué"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 475,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/55 text-[8px] font-mono mb-0.5",
                                        children: achievement.target > 1000 ? `${Math.min(achievement.current, achievement.target).toLocaleString("fr-FR")}/${achievement.target.toLocaleString("fr-FR")}` : `${Math.min(achievement.current, achievement.target)}/${achievement.target}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 483,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/45 text-[8px] uppercase tracking-wider",
                                        children: "Verrouillé"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 488,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 482,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 461,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 427,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
            lineNumber: 411,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
        lineNumber: 401,
        columnNumber: 5
    }, this);
}
function AchievementsScreen() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const { navigate, streakDays, adminStreakOverride, unlockedRanks, meditationStreak, weeklyBetAmount, panicEvents, journalEntries, testimonials, forumPosts, articlesRead } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const effectiveStreak = adminStreakOverride !== null ? adminStreakOverride : streakDays;
    const currentRank = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentRank"])(effectiveStreak);
    const totalSaved = effectiveStreak * Math.round(weeklyBetAmount / 7);
    const achievementContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            streakDays: effectiveStreak,
            panicEventsCount: panicEvents.length,
            resolvedPanicCount: panicEvents.filter((p)=>p.resolved).length,
            journalCount: journalEntries.length,
            totalSaved,
            meditationStreak,
            testimonialsCount: testimonials.filter((t)=>t.isMine).length,
            forumPostsCount: forumPosts.length,
            articlesRead
        }), [
        effectiveStreak,
        panicEvents,
        journalEntries.length,
        totalSaved,
        meditationStreak,
        testimonials,
        forumPosts.length,
        articlesRead
    ]);
    // Compute progress for each special achievement
    const computedAchievements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>SPECIAL_ACHIEVEMENTS.map((a)=>{
            const current = a.getCurrent(achievementContext);
            const unlocked = current >= a.target;
            const progress = Math.min(100, current / a.target * 100);
            return {
                ...a,
                current,
                unlocked,
                progress
            };
        }), [
        achievementContext
    ]);
    const unlockedAchievements = computedAchievements.filter((a)=>a.unlocked);
    const unlockedRanksCount = unlockedRanks.length;
    // ----- Task 13-d: tier filter + totals -----
    const [activeTier, setActiveTier] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const filteredAchievements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>activeTier === "all" ? computedAchievements : computedAchievements.filter((a)=>getTierForTarget(a.target) === activeTier), [
        activeTier,
        computedAchievements
    ]);
    const totalUnlocked = unlockedAchievements.length + unlockedRanksCount;
    const totalAchievements = SPECIAL_ACHIEVEMENTS.length + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PARCOURS_RANKS"].length;
    const unlockedPercent = totalAchievements > 0 ? totalUnlocked / totalAchievements * 100 : 0;
    const tierCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const counts = {
            bronze: 0,
            silver: 0,
            gold: 0,
            diamond: 0,
            legendary: 0
        };
        for (const a of computedAchievements){
            counts[getTierForTarget(a.target)] += 1;
        }
        return counts;
    }, [
        computedAchievements
    ]);
    // Build a "recent unlocks" list
    const recentUnlocks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const items = [];
        // Ranks — derive "days ago" from streak (when streakDays first crossed requiredDays)
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PARCOURS_RANKS"].forEach((rank)=>{
            const isUnlocked = effectiveStreak >= rank.requiredDays || unlockedRanks.includes(rank.key);
            if (!isUnlocked) return;
            const daysAgo = Math.max(0, effectiveStreak - rank.requiredDays);
            items.push({
                key: `rank-${rank.key}`,
                name: t(rank.nameKey),
                artifactKey: rank.key,
                color: rank.color,
                type: "rank",
                daysAgo
            });
        });
        // Special achievements — derive a rough "days ago" from each metric
        computedAchievements.forEach((a)=>{
            if (!a.unlocked) return;
            let daysAgo = 0;
            if (a.key === "premier-pas" || a.key === "perseverant" || a.key === "legende") {
                daysAgo = Math.max(0, effectiveStreak - a.target);
            } else if (a.key === "respirateur" || a.key === "survivant") {
                // Use latest panic event as a proxy
                const latest = panicEvents[0];
                if (latest) {
                    const diff = Math.floor((Date.now() - new Date(latest.createdAt).getTime()) / 86400000);
                    daysAgo = Math.max(0, diff);
                }
            } else if (a.key === "ecrivain") {
                const tenth = journalEntries[9]; // 10th entry (0-indexed)
                if (tenth) {
                    const diff = Math.floor((Date.now() - new Date(tenth.createdAt).getTime()) / 86400000);
                    daysAgo = Math.max(0, diff);
                }
            } else if (a.key === "mediant" || a.key === "zen-master") {
                daysAgo = 0; // meditation streak resets if broken — assume today
            } else if (a.key === "econome") {
                daysAgo = Math.max(0, effectiveStreak - 30);
            } else {
                daysAgo = 0;
            }
            items.push({
                key: `special-${a.key}`,
                name: a.name,
                Icon: a.icon,
                color: a.color,
                type: "special",
                daysAgo
            });
        });
        // Sort by most recent (smallest daysAgo first)
        return items.sort((a, b)=>a.daysAgo - b.daysAgo).slice(0, 5);
    }, [
        effectiveStreak,
        unlockedRanks,
        computedAchievements,
        panicEvents,
        journalEntries
    ]);
    // Next goals: locked achievements closest to completion (by progress %)
    const nextGoals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>computedAchievements.filter((a)=>!a.unlocked).sort((a, b)=>b.progress - a.progress).slice(0, 3), [
        computedAchievements
    ]);
    // ----- Stats summary cards -----
    const statsCards = [
        {
            label: "Badges débloqués",
            value: `${unlockedRanksCount}`,
            suffix: "/13",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"],
            gradient: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
            glow: "rgba(251, 191, 36, 0.5)"
        },
        {
            label: "Jours cumulés",
            value: `${effectiveStreak}`,
            suffix: "",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"],
            gradient: "linear-gradient(135deg, #FF3B30 0%, #F59E0B 100%)",
            glow: "rgba(255, 59, 48, 0.5)"
        },
        {
            label: "Série méditation",
            value: `${meditationStreak}`,
            suffix: "j",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__["Wind"],
            gradient: "linear-gradient(135deg, #FFD166 0%, #FF9A3D 100%)",
            glow: "rgba(255,176,32, 0.5)"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen px-5 pt-12 pb-10 safe-bottom",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -10
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "flex items-center justify-between mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>navigate("dashboard"),
                        className: "w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform focus-ring",
                        "aria-label": t("back"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            size: 20,
                            className: "text-white"
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                            lineNumber: 709,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 704,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-lg font-extrabold font-[family-name:var(--font-poppins)] tracking-tight shimmer-text",
                                children: t("achievementsHeaderTitle")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 712,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/40 text-[11px]",
                                children: t("achievementsYourExploits")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 715,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 711,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 rounded-full glass-card flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                            size: 18,
                            className: "text-[#FBBF24]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                            lineNumber: 718,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 717,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 699,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: containerVariants,
                initial: "hidden",
                animate: "visible",
                className: "space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: itemVariants,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$TiltCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TiltCard"], {
                            className: "rounded-2xl gradient-border-card p-5 overflow-hidden",
                            maxTilt: 8,
                            scale: 1.01,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "aria-hidden": true,
                                    className: "absolute inset-0 mesh-bg-aurora opacity-70 pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                    lineNumber: 736,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                    className: "absolute top-3 right-4 text-[#FBBF24] float pointer-events-none",
                                    size: 28,
                                    strokeWidth: 1.5,
                                    "aria-hidden": true,
                                    style: {
                                        opacity: 0.15
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                    lineNumber: 741,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                    className: "absolute bottom-8 left-3 text-[#F59E0B] float-slow pointer-events-none",
                                    size: 20,
                                    strokeWidth: 1.5,
                                    "aria-hidden": true,
                                    style: {
                                        opacity: 0.15
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                    lineNumber: 748,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                    className: "absolute top-1/2 right-10 text-[#FFD166] float pointer-events-none",
                                    size: 22,
                                    strokeWidth: 1.5,
                                    "aria-hidden": true,
                                    style: {
                                        opacity: 0.15
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                    lineNumber: 755,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProgressRing, {
                                                    percent: unlockedPercent,
                                                    color: currentRank.color
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                    lineNumber: 766,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/55 text-[9px] uppercase tracking-[0.16em] mb-1",
                                                            children: "Achievements débloqués"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                            lineNumber: 768,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-[family-name:var(--font-poppins)] text-2xl font-extrabold leading-none mb-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "shimmer-text",
                                                                    children: totalUnlocked
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                                    lineNumber: 772,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white/40 text-base font-bold ml-1",
                                                                    children: [
                                                                        "/ ",
                                                                        totalAchievements
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                                    lineNumber: 773,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                            lineNumber: 771,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/55 text-[11px] leading-tight",
                                                            children: [
                                                                "Rang actuel :",
                                                                " ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: currentRank.color
                                                                    },
                                                                    className: "font-semibold inline-flex items-center gap-1 align-middle",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$ArtifactIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArtifactIcon"], {
                                                                            artifactKey: currentRank.key,
                                                                            size: 14,
                                                                            glow: true
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                                            lineNumber: 783,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        t(currentRank.nameKey)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                                    lineNumber: 779,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                            lineNumber: 777,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                    lineNumber: 767,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                            lineNumber: 765,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-2.5",
                                            children: statsCards.map((stat, idx)=>{
                                                const Icon = stat.icon;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        scale: 0.85
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        scale: 1
                                                    },
                                                    transition: {
                                                        delay: 0.1 + idx * 0.08,
                                                        type: "spring",
                                                        stiffness: 260,
                                                        damping: 18
                                                    },
                                                    className: "glass-card p-2.5 flex flex-col items-center text-center relative overflow-hidden",
                                                    style: {
                                                        boxShadow: `0 0 18px ${stat.glow}`
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-8 h-8 rounded-xl flex items-center justify-center mb-1.5",
                                                            style: {
                                                                background: stat.gradient
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                size: 14,
                                                                className: "text-white"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                                lineNumber: 812,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                            lineNumber: 808,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-base font-extrabold text-white font-[family-name:var(--font-poppins)] leading-none",
                                                            children: [
                                                                stat.value,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white/50 text-[10px] font-medium ml-0.5",
                                                                    children: stat.suffix
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                                    lineNumber: 816,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                            lineNumber: 814,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white/55 text-[8.5px] mt-1 leading-tight",
                                                            children: stat.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                            lineNumber: 820,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, stat.label, true, {
                                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                    lineNumber: 795,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                            lineNumber: 791,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                    lineNumber: 763,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                            lineNumber: 730,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 729,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: itemVariants,
                        className: "glass-card p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                        size: 14,
                                        className: "text-[#FBBF24]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 834,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xs font-bold text-white/80 uppercase tracking-[0.12em]",
                                        children: "Parcours des rangs"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 835,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 833,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto no-scrollbar -mx-1 px-1 pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-0 min-w-max",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PARCOURS_RANKS"].map((rank, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RankTimelineNode, {
                                            rank: rank,
                                            isUnlocked: effectiveStreak >= rank.requiredDays || unlockedRanks.includes(rank.key),
                                            isCurrent: rank.key === currentRank.key,
                                            isLast: idx === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PARCOURS_RANKS"].length - 1,
                                            nextUnlocked: idx < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PARCOURS_RANKS"].length - 1 ? effectiveStreak >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PARCOURS_RANKS"][idx + 1].requiredDays || unlockedRanks.includes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PARCOURS_RANKS"][idx + 1].key) : false
                                        }, rank.key, false, {
                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                            lineNumber: 843,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                    lineNumber: 841,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 840,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/40 text-[10px] mt-2 text-center",
                                children: [
                                    "Glisse pour explorer les 13 rangs • Tu es à",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-semibold",
                                        children: t(currentRank.nameKey)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 865,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 863,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 832,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: itemVariants,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3 px-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                size: 14,
                                                className: "text-[#FFD166]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                lineNumber: 873,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xs font-bold text-white/80 uppercase tracking-[0.12em]",
                                                children: "Exploits spéciaux"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                lineNumber: 874,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 872,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-white/50",
                                        children: [
                                            unlockedAchievements.length,
                                            "/",
                                            SPECIAL_ACHIEVEMENTS.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 878,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 871,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto no-scrollbar -mx-1 px-1 pb-3 mb-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 min-w-max",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TierTab, {
                                            active: activeTier === "all",
                                            label: "Tous",
                                            color: "#F59E0B",
                                            metal: "metal-gold",
                                            count: computedAchievements.length,
                                            onClick: ()=>setActiveTier("all")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                            lineNumber: 886,
                                            columnNumber: 15
                                        }, this),
                                        [
                                            "bronze",
                                            "silver",
                                            "gold",
                                            "diamond",
                                            "legendary"
                                        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TierTab, {
                                                active: activeTier === t,
                                                label: TIER_META[t].label,
                                                color: TIER_META[t].color,
                                                metal: TIER_META[t].metal,
                                                count: tierCounts[t],
                                                onClick: ()=>setActiveTier(t)
                                            }, t, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                lineNumber: 895,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                    lineNumber: 885,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 884,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-3",
                                children: filteredAchievements.map((achv, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FlipBadge, {
                                        achievement: achv,
                                        index: idx
                                    }, achv.key, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 911,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 909,
                                columnNumber: 11
                            }, this),
                            filteredAchievements.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center text-white/40 text-[11px] py-6",
                                children: t("achievementsNoItems")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 916,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 870,
                        columnNumber: 9
                    }, this),
                    recentUnlocks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: itemVariants,
                        className: "glass-card p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        size: 14,
                                        className: "text-[#FFC94D]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 926,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xs font-bold text-white/80 uppercase tracking-[0.12em]",
                                        children: t("achievementsRecentUnlocks")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 927,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 925,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-4 p-3 rounded-2xl bg-[#FFC94D]/10 border border-[#FFC94D]/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        animate: {
                                            rotate: [
                                                0,
                                                12,
                                                -12,
                                                0
                                            ],
                                            scale: [
                                                1,
                                                1.12,
                                                1
                                            ]
                                        },
                                        transition: {
                                            duration: 2.4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        },
                                        className: "flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$party$2d$popper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PartyPopper$3e$__["PartyPopper"], {
                                            size: 26,
                                            className: "text-[#FFC94D]",
                                            style: {
                                                filter: "drop-shadow(0 0 8px rgba(255,201,77,0.5))"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                            lineNumber: 938,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 933,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/80 text-xs leading-relaxed",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-semibold",
                                                children: "Félicitations !"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                lineNumber: 945,
                                                columnNumber: 17
                                            }, this),
                                            " Tu as débloqué",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#FFC94D] font-bold",
                                                children: recentUnlocks.length
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                lineNumber: 946,
                                                columnNumber: 17
                                            }, this),
                                            " réalisation",
                                            recentUnlocks.length !== 1 ? "s" : "",
                                            " récemment."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 944,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 932,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 max-h-72 overflow-y-auto pr-1",
                                children: recentUnlocks.map((unlock, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        transition: {
                                            delay: 0.05 + idx * 0.05
                                        },
                                        className: "flex items-center gap-3 p-2.5 rounded-xl bg-white/5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                                                style: {
                                                    background: `linear-gradient(135deg, ${unlock.color} 0%, ${unlock.color}99 100%)`,
                                                    boxShadow: `0 0 12px ${unlock.color}60`
                                                },
                                                children: unlock.type === "rank" && unlock.artifactKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$ArtifactIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArtifactIcon"], {
                                                    artifactKey: unlock.artifactKey,
                                                    size: 22,
                                                    glow: false
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                    lineNumber: 968,
                                                    columnNumber: 23
                                                }, this) : unlock.Icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(unlock.Icon, {
                                                    size: 17,
                                                    strokeWidth: 2.2,
                                                    className: "text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                    lineNumber: 970,
                                                    columnNumber: 38
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                lineNumber: 960,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white text-xs font-semibold leading-tight",
                                                        children: unlock.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                        lineNumber: 974,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/40 text-[10px] mt-0.5",
                                                        children: unlock.type === "rank" ? "Rang débloqué" : "Exploit spécial"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                        lineNumber: 975,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                lineNumber: 973,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/50 text-[10px] flex-shrink-0",
                                                children: relativeTimeLabel(unlock.daysAgo)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                lineNumber: 979,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, unlock.key, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 953,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 951,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 924,
                        columnNumber: 11
                    }, this),
                    nextGoals.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: itemVariants,
                        className: "glass-card p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        size: 14,
                                        className: "text-[#F59E0B]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 992,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xs font-bold text-white/80 uppercase tracking-[0.12em]",
                                        children: "Tes prochains défis"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 993,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 991,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: nextGoals.map((goal, idx)=>{
                                    const remaining = Math.max(0, goal.target - goal.current);
                                    const remainingLabel = goal.target > 1000 ? remaining.toLocaleString("fr-FR") : `${remaining}`;
                                    const GoalIcon = goal.icon;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 8
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: 0.1 + idx * 0.07
                                        },
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                                                style: {
                                                    background: `${goal.color}25`,
                                                    border: `1px solid ${goal.color}40`,
                                                    boxShadow: `0 0 10px ${goal.color}30`
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GoalIcon, {
                                                    size: 18,
                                                    strokeWidth: 2.2,
                                                    style: {
                                                        color: goal.color
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                    lineNumber: 1022,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                lineNumber: 1014,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white text-xs font-semibold truncate",
                                                                children: goal.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                                lineNumber: 1026,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-mono text-white/50 ml-2",
                                                                children: goal.target > 1000 ? `${Math.min(goal.current, goal.target).toLocaleString("fr-FR")}/${goal.target.toLocaleString("fr-FR")}` : `${Math.min(goal.current, goal.target)}/${goal.target}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                                lineNumber: 1027,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                        lineNumber: 1025,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-1.5 bg-white/10 rounded-full overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            className: "h-full rounded-full",
                                                            style: {
                                                                background: goal.color
                                                            },
                                                            initial: {
                                                                width: 0
                                                            },
                                                            animate: {
                                                                width: `${goal.progress}%`
                                                            },
                                                            transition: {
                                                                duration: 0.9,
                                                                ease: "easeOut",
                                                                delay: 0.15 + idx * 0.07
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                            lineNumber: 1034,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                        lineNumber: 1033,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-white/40 mt-1",
                                                        children: [
                                                            "Plus que",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold",
                                                                style: {
                                                                    color: goal.color
                                                                },
                                                                children: remainingLabel
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                                lineNumber: 1044,
                                                                columnNumber: 25
                                                            }, this),
                                                            "..."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                        lineNumber: 1042,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                                lineNumber: 1024,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, goal.key, true, {
                                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                        lineNumber: 1007,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 998,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 990,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: itemVariants,
                        className: "glass-card p-4 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/60 text-xs leading-relaxed",
                            children: [
                                "Chaque exploit est une preuve de ta force.",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                    lineNumber: 1061,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white font-semibold",
                                    children: "Continue, ta collection grandit chaque jour."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                    lineNumber: 1062,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                            lineNumber: 1059,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 1058,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 722,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
        lineNumber: 697,
        columnNumber: 5
    }, this);
}
function RankTimelineNode({ rank, isUnlocked, isCurrent, isLast, nextUnlocked }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center flex-shrink-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center w-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            isCurrent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute inset-0 rounded-full",
                                style: {
                                    border: `2px solid ${rank.color}`
                                },
                                animate: {
                                    scale: [
                                        1,
                                        1.4
                                    ],
                                    opacity: [
                                        0.7,
                                        0
                                    ]
                                },
                                transition: {
                                    duration: 2.2,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 1098,
                                columnNumber: 13
                            }, this),
                            isUnlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "relative w-11 h-11 rounded-full flex items-center justify-center badge-aura",
                                style: {
                                    background: rank.gradient,
                                    ["--aura-color"]: rank.glow
                                },
                                animate: isCurrent ? {
                                    scale: [
                                        1,
                                        1.06,
                                        1
                                    ]
                                } : {},
                                transition: {
                                    duration: 2.5,
                                    repeat: isCurrent ? Infinity : 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$ArtifactIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArtifactIcon"], {
                                    artifactKey: rank.key,
                                    size: 28,
                                    glow: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                    lineNumber: 1115,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 1106,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-11 h-11 rounded-full bg-white/5 flex items-center justify-center opacity-40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                    size: 14,
                                    className: "text-white/40"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                    lineNumber: 1119,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                                lineNumber: 1118,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 1095,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-[9px] font-semibold mt-1.5 text-center leading-tight truncate w-full ${isUnlocked ? "text-white" : "text-white/40"}`,
                        children: t(rank.nameKey)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 1123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-[8px] mt-0.5 ${isUnlocked ? "text-white/50" : "text-white/30"}`,
                        children: [
                            rank.requiredDays,
                            "j"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                        lineNumber: 1130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 1094,
                columnNumber: 7
            }, this),
            !isLast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-0.5 w-5 -mt-7 rounded-full overflow-hidden bg-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "h-full",
                    style: {
                        background: isUnlocked && nextUnlocked ? "linear-gradient(90deg, #FF3B30, #F59E0B, #FBBF24)" : "rgba(255,255,255,0.1)"
                    },
                    initial: {
                        width: isUnlocked && nextUnlocked ? "0%" : "100%"
                    },
                    animate: {
                        width: "100%"
                    },
                    transition: {
                        duration: 0.6,
                        ease: "easeOut"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                    lineNumber: 1138,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
                lineNumber: 1137,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/AchievementsScreen.tsx",
        lineNumber: 1093,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = AchievementsScreen;
}),
"[project]/src/components/zerobet/screens/AchievementsScreen.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/zerobet/screens/AchievementsScreen.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=src_296f1049._.js.map