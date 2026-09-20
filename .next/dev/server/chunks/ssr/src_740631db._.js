module.exports = [
"[project]/src/lib/data/community-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Témoignages vérifiés + Mentors + Psychologues
 *
 * NOTE (Task 18-b): testimonials now use translation keys (titleKey/bodyKey)
 * instead of hardcoded French. Bodies that mention money use an `{amount}`
 * placeholder which the CommunityScreen fills with `formatCurrency(amountFCFA, currency)`
 * so the testimonial adapts to the user's selected currency.
 * `authorCountry` is now an ISO 3166-1 alpha-2 country code (ci, sn, ml, etc.)
 * rendered through the `country{XX}` dictionary key so the country name
 * follows the user's UI language.
 */ __turbopack_context__.s([
    "SEED_MENTORS",
    ()=>SEED_MENTORS,
    "SEED_PSYCHOLOGISTS",
    ()=>SEED_PSYCHOLOGISTS,
    "SEED_TESTIMONIALS",
    ()=>SEED_TESTIMONIALS,
    "getDailyQuote",
    ()=>getDailyQuote
]);
// `createdAt` is computed once at module load so the relative-time labels
// ("à l'instant", "il y a 1 j", …) stay stable across re-renders.
const now = Date.now();
const day = 86_400_000;
const SEED_TESTIMONIALS = [
    {
        id: "seed-t-0",
        authorName: "Koffi A.",
        authorAge: 26,
        authorCountry: "ci",
        streakDays: 234,
        titleKey: "testimonialKoffiTitle",
        bodyKey: "testimonialKoffiBody",
        amountFCFA: 4_000_000,
        isVerified: true,
        likes: 142,
        replies: [],
        createdAt: new Date(now - 0 * day).toISOString()
    },
    {
        id: "seed-t-1",
        authorName: "Moussa D.",
        authorAge: 28,
        authorCountry: "sn",
        streakDays: 187,
        titleKey: "testimonialMoussaTitle",
        bodyKey: "testimonialMoussaBody",
        isVerified: true,
        likes: 98,
        replies: [],
        createdAt: new Date(now - 1 * day).toISOString()
    },
    {
        id: "seed-t-2",
        authorName: "Omar T.",
        authorAge: 24,
        authorCountry: "ml",
        streakDays: 92,
        titleKey: "testimonialOmarTitle",
        bodyKey: "testimonialOmarBody",
        isVerified: true,
        likes: 76,
        replies: [],
        createdAt: new Date(now - 2 * day).toISOString()
    },
    {
        id: "seed-t-3",
        authorName: "Ibrahim S.",
        authorAge: 31,
        authorCountry: "cm",
        streakDays: 365,
        titleKey: "testimonialIbrahimTitle",
        bodyKey: "testimonialIbrahimBody",
        amountFCFA: 1_200_000,
        isVerified: true,
        likes: 211,
        replies: [],
        createdAt: new Date(now - 3 * day).toISOString()
    },
    {
        id: "seed-t-4",
        authorName: "Boubacar K.",
        authorAge: 22,
        authorCountry: "gn",
        streakDays: 45,
        titleKey: "testimonialBoubacarTitle",
        bodyKey: "testimonialBoubacarBody",
        isVerified: true,
        likes: 54,
        replies: [],
        createdAt: new Date(now - 4 * day).toISOString()
    },
    {
        id: "seed-t-5",
        authorName: "Awa N.",
        authorAge: 29,
        authorCountry: "fr",
        streakDays: 156,
        titleKey: "testimonialAwaTitle",
        bodyKey: "testimonialAwaBody",
        // Original: "8 000 €" → convert to FCFA (1 EUR ≈ 655.957 FCFA)
        amountFCFA: 8_000 * 655,
        isVerified: true,
        likes: 87,
        replies: [],
        createdAt: new Date(now - 5 * day).toISOString()
    },
    {
        id: "seed-t-6",
        authorName: "Djimie K.",
        authorAge: 24,
        authorCountry: "bj",
        streakDays: 12,
        titleKey: "testimonialDjimieTitle",
        bodyKey: "testimonialDjimieBody",
        isVerified: true,
        likes: 31,
        replies: [],
        createdAt: new Date(now - 6 * day).toISOString()
    },
    {
        id: "seed-t-7",
        authorName: "Patrice M.",
        authorAge: 35,
        authorCountry: "cd",
        streakDays: 78,
        titleKey: "testimonialPatriceTitle",
        bodyKey: "testimonialPatriceBody",
        amountFCFA: 350_000,
        isVerified: true,
        likes: 64,
        replies: [],
        createdAt: new Date(now - 7 * day).toISOString()
    },
    {
        id: "seed-t-8",
        authorName: "Essohana A.",
        authorAge: 27,
        authorCountry: "tg",
        streakDays: 210,
        titleKey: "testimonialEssohanaTitle",
        bodyKey: "testimonialEssohanaBody",
        isVerified: true,
        likes: 103,
        replies: [],
        createdAt: new Date(now - 8 * day).toISOString()
    },
    {
        id: "seed-t-9",
        authorName: "Cheikh N.",
        authorAge: 19,
        authorCountry: "sn",
        streakDays: 30,
        titleKey: "testimonialCheikhNTitle",
        bodyKey: "testimonialCheikhNBody",
        isVerified: true,
        likes: 47,
        replies: [],
        createdAt: new Date(now - 9 * day).toISOString()
    },
    {
        id: "seed-t-10",
        authorName: "Yao B.",
        authorAge: 41,
        authorCountry: "ci",
        streakDays: 500,
        titleKey: "testimonialYaoTitle",
        bodyKey: "testimonialYaoBody",
        amountFCFA: 2_800_000,
        isVerified: true,
        likes: 268,
        replies: [],
        createdAt: new Date(now - 10 * day).toISOString()
    },
    {
        id: "seed-t-11",
        authorName: "Marc-Aimé O.",
        authorAge: 33,
        authorCountry: "ga",
        streakDays: 7,
        titleKey: "testimonialMarcAimeTitle",
        bodyKey: "testimonialMarcAimeBody",
        isVerified: true,
        likes: 22,
        replies: [],
        createdAt: new Date(now - 11 * day).toISOString()
    }
];
const SEED_MENTORS = [
    {
        displayName: "Karim L.",
        bio: "Ancien parieur pendant 6 ans. Clean depuis 2 ans. Je connais chaque recoin de l'addiction. Je peux t'aider.",
        country: "Côte d'Ivoire",
        specialty: "Jeunes 18-25",
        daysClean: 730,
        verified: true,
        rating: 4.9,
        sessionsCount: 127
    },
    {
        displayName: "Yacouba M.",
        bio: "Père de famille, j'ai failli tout perdre. Aujourd'hui je guide les pères qui veulent se reprendre en main.",
        country: "Mali",
        specialty: "Pères de famille",
        daysClean: 540,
        verified: true,
        rating: 5.0,
        sessionsCount: 89
    },
    {
        displayName: "Cheikh D.",
        bio: "Étudiant en finance, j'ai compris les maths des paris. Je t'explique pourquoi tu perds TOUJOURS.",
        country: "Sénégal",
        specialty: "Étudiants",
        daysClean: 410,
        verified: true,
        rating: 4.8,
        sessionsCount: 156
    },
    {
        displayName: "Patrick O.",
        bio: "Sportif, je pensais connaître le foot. Les paris m'ont ruiné. Maintenant je parle aux autres sportifs.",
        country: "Cameroun",
        specialty: "Sportifs",
        daysClean: 380,
        verified: true,
        rating: 4.9,
        sessionsCount: 73
    }
];
const SEED_PSYCHOLOGISTS = [
    {
        displayName: "Dr. Aminata K.",
        fullName: "Dr. Aminata Konaté",
        license: "PSY-CI-2018-0421",
        specialty: "Addictologie comportementale",
        country: "Côte d'Ivoire",
        sessionPrice: 15000,
        verified: true,
        rating: 4.9,
        sessionsCount: 234,
        bio: "Docteure en psychologie clinique, spécialisée dans les addictions comportementales depuis 8 ans. J'accompagne les patients avec bienveillance et méthode scientifique."
    },
    {
        displayName: "Dr. Mamadou B.",
        fullName: "Dr. Mamadou Bah",
        license: "PSY-SN-2015-0188",
        specialty: "Thérapie cognitivo-comportementale",
        country: "Sénégal",
        sessionPrice: 12000,
        verified: true,
        rating: 5.0,
        sessionsCount: 312,
        bio: "Psychologue clinicien, formé aux TCC. 10 ans d'expérience avec les addictions. Approche directe et structurée."
    },
    {
        displayName: "Dr. Fatou D.",
        fullName: "Dr. Fatou Diallo",
        license: "PSY-ML-2020-0094",
        specialty: "Soutien familial et conjugal",
        country: "Mali",
        sessionPrice: 10000,
        verified: true,
        rating: 4.8,
        sessionsCount: 187,
        bio: "Spécialiste des dynamiques familiales liées à l'addiction. J'aide les patients ET leurs proches à se reconstruire."
    }
];
/**
 * Daily quotes are now driven entirely by i18n keys. The actual translations
 * live in `src/lib/i18n/dictionary.ts` (quote1Text/quote1Author … quote12*).
 * This array keeps the historical 12-entry rotation so the day-of-year →
 * quote-index mapping is unchanged from before Task 18-a.
 */ const DAILY_QUOTE_KEYS = [
    {
        textKey: "quote1Text",
        authorKey: "quote1Author"
    },
    {
        textKey: "quote2Text",
        authorKey: "quote2Author"
    },
    {
        textKey: "quote3Text",
        authorKey: "quote3Author"
    },
    {
        textKey: "quote4Text",
        authorKey: "quote4Author"
    },
    {
        textKey: "quote5Text",
        authorKey: "quote5Author"
    },
    {
        textKey: "quote6Text",
        authorKey: "quote6Author"
    },
    {
        textKey: "quote7Text",
        authorKey: "quote7Author"
    },
    {
        textKey: "quote8Text",
        authorKey: "quote8Author"
    },
    {
        textKey: "quote9Text",
        authorKey: "quote9Author"
    },
    {
        textKey: "quote10Text",
        authorKey: "quote10Author"
    },
    {
        textKey: "quote11Text",
        authorKey: "quote11Author"
    },
    {
        textKey: "quote12Text",
        authorKey: "quote12Author"
    }
];
function getDailyQuote() {
    const day = Math.floor(Date.now() / 86400000);
    return DAILY_QUOTE_KEYS[day % DAILY_QUOTE_KEYS.length];
}
}),
"[project]/src/lib/data/search-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Searchable article index used by the global SearchModal.
 * Curated content for the African francophone audience.
 */ __turbopack_context__.s([
    "QUICK_REPLIES",
    ()=>QUICK_REPLIES,
    "SEARCH_ARTICLES",
    ()=>SEARCH_ARTICLES,
    "SEARCH_ARTICLE_CATEGORIES",
    ()=>SEARCH_ARTICLE_CATEGORIES,
    "getResponseTime",
    ()=>getResponseTime,
    "isOnlineFromSeed",
    ()=>isOnlineFromSeed
]);
const SEARCH_ARTICLE_CATEGORIES = {
    addiction: {
        label: "Addiction",
        color: "#FFD166",
        emoji: "🧠"
    },
    techniques: {
        label: "Techniques",
        color: "#FFC94D",
        emoji: "💪"
    },
    finance: {
        label: "Finances",
        color: "#F59E0B",
        emoji: "💰"
    },
    testimonials: {
        label: "Témoignages",
        color: "#FF3B30",
        emoji: "👥"
    },
    meditation: {
        label: "Méditation",
        color: "#FFB020",
        emoji: "🧘"
    },
    stories: {
        label: "Histoires",
        color: "#FBBF24",
        emoji: "📚"
    }
};
const SEARCH_ARTICLES = [
    {
        id: "art-1",
        category: "addiction",
        title: "Pourquoi ton cerveau te trahit quand tu paris",
        excerpt: "Comprends le mécanisme de la dopamine et pourquoi chaque pari renforce le cycle addictif — même quand tu perds.",
        readingTime: 7,
        author: "Dr. Aïssata Koné"
    },
    {
        id: "art-2",
        category: "techniques",
        title: "Surmonter une envie soudaine en 90 secondes",
        excerpt: "La méthode U.R.G.E. pour désamorcer une envie de parier sans céder. Simple, prouvée, accessible.",
        readingTime: 5,
        author: "Marc Allard, thérapeute"
    },
    {
        id: "art-3",
        category: "testimonials",
        title: "Moussa, 32 ans : « J'ai tout perdu, puis tout reconstruit »",
        excerpt: "Récit authentique d'un ancien parieur de Dakar qui a surmonté 8 ans d'addiction et retrouvé sa famille.",
        readingTime: 9,
        author: "Moussa Ndiaye"
    },
    {
        id: "art-4",
        category: "finance",
        title: "Reconstruire ses finances après les paris",
        excerpt: "Un plan concret en 4 étapes pour rembourser tes dettes, reprendre le contrôle et économiser à nouveau.",
        readingTime: 8,
        author: "Awa Diallo, conseillère"
    },
    {
        id: "art-5",
        category: "meditation",
        title: "La respiration 4-7-8 : ton arme secrète anti-envie",
        excerpt: "Cette technique de respiration calme le système nerveux en moins de 2 minutes. À utiliser à vie.",
        readingTime: 4,
        author: "Dr. Aïssata Koné"
    },
    {
        id: "art-6",
        category: "addiction",
        title: "La dopamine et les paris",
        excerpt: "Comment les jeux d'argent détournent le système de récompense naturel de ton cerveau.",
        readingTime: 6,
        author: "Dr. Aïssata Koné"
    },
    {
        id: "art-7",
        category: "techniques",
        title: "Reconnaître les déclencheurs",
        excerpt: "Apprends à identifier les situations, émotions et personnes qui déclenchent ton envie de parier.",
        readingTime: 6,
        author: "Marc Allard"
    },
    {
        id: "art-8",
        category: "addiction",
        title: "Pourquoi tu perds toujours",
        excerpt: "La vérité mathématique derrière les paris sportifs : pourquoi la maison gagne toujours.",
        readingTime: 8,
        author: "Dr. Aïssata Koné"
    },
    {
        id: "art-9",
        category: "stories",
        title: "Reprendre sa virilité",
        excerpt: "L'addiction aux paris touche la confiance en soi et la masculinité. Voici comment se reconstruire.",
        readingTime: 7,
        author: "Marc Allard"
    },
    {
        id: "art-10",
        category: "finance",
        title: "L'économie que tu sauves",
        excerpt: "Calcule combien tu économises réellement chaque jour sans pari. Les chiffres vont te surprendre.",
        readingTime: 4,
        author: "Équipe Zerobet"
    },
    {
        id: "art-11",
        category: "meditation",
        title: "Méditation guidée anti-envie",
        excerpt: "10 minutes par jour pour réduire durablement tes envies de parier et retrouver le calme intérieur.",
        readingTime: 5,
        author: "Yoga & Mindfulness"
    },
    {
        id: "art-12",
        category: "techniques",
        title: "Le rôle du sommeil dans la récupération",
        excerpt: "Le manque de sommeil augmente les envies de parier de 40%. Mieux dormir pour mieux résister.",
        readingTime: 5,
        author: "Dr. Aïssata Koné"
    },
    {
        id: "art-13",
        category: "testimonials",
        title: "Koffi, 26 ans : 234 jours sans pari",
        excerpt: "« J'ai perdu 4 millions de FCFA en 3 ans sur 1xBet. Aujourd'hui, ma copine est revenue. »",
        readingTime: 6,
        author: "Koffi A."
    },
    {
        id: "art-14",
        category: "stories",
        title: "Ibrahim, un an sans pari",
        excerpt: "365 jours. 1 200 000 FCFA économisés. Un terrain acheté. Si je l'ai fait, tu peux le faire.",
        readingTime: 7,
        author: "Ibrahim S."
    },
    {
        id: "art-15",
        category: "finance",
        title: "Rembourser ses dettes sans culpabilité",
        excerpt: "Méthode pas à pas pour affronter tes dettes de paris, négocier avec tes créanciers et repartir.",
        readingTime: 6,
        author: "Awa Diallo"
    }
];
const QUICK_REPLIES = [
    "💪 Bravo, continue !",
    "🙏 Merci pour ce témoignage",
    "🔥 Tu es une inspiration"
];
function isOnlineFromSeed(seed) {
    // Simple deterministic hash → 0..99 ; online if < 70
    let hash = 0;
    for(let i = 0; i < seed.length; i++){
        hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
    }
    return hash % 100 < 70;
}
function getResponseTime(sessionsCount) {
    if (sessionsCount >= 200) return {
        label: "Répond en ~5min",
        minutes: 5
    };
    if (sessionsCount >= 100) return {
        label: "Répond en ~30min",
        minutes: 30
    };
    return {
        label: "Répond en ~2h",
        minutes: 120
    };
}
}),
"[project]/src/lib/data/currency-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/share-card.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Zerobet 2.0.7/2.0.8 — Share card generators (canvas → PNG Blob).
 *
 * Two branded cards in the "Aube Émeraude" palette:
 *   - MilestoneCard: celebrates a recovery milestone (big streak number)
 *   - JourneyCard: full journey recap (days, savings, check-ins, rank stats)
 *
 * Sharing strategy (shareMilestoneCard / shareJourneyCard → shareImageBlob):
 *   1. navigator.share with a real file (Android/desktop Chrome) — native sheet
 *   2. fallback: clipboard write (PNG) when supported
 *   3. last resort: download the PNG locally
 * Returns what happened so the UI can toast accurately.
 */ __turbopack_context__.s([
    "downloadImageBlob",
    ()=>downloadImageBlob,
    "generateJourneyCard",
    ()=>generateJourneyCard,
    "generateMilestoneCard",
    ()=>generateMilestoneCard,
    "shareImageBlob",
    ()=>shareImageBlob,
    "shareJourneyCard",
    ()=>shareJourneyCard,
    "shareMilestoneCard",
    ()=>shareMilestoneCard
]);
const W = 1080;
const H = 1350;
/** #RRGGBB → rgba(...) with the given alpha. */ function hexToRgba(hex, alpha) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
    if (!m) return `rgba(255,107,0,${alpha})`;
    const n = parseInt(m[1], 16);
    return `rgba(${n >> 16 & 255}, ${n >> 8 & 255}, ${n & 255}, ${alpha})`;
}
function drawAurora(ctx) {
    const blobs = [
        [
            W * 0.2,
            H * 0.18,
            W * 0.55,
            "rgba(255,107,0, 0.28)"
        ],
        [
            W * 0.85,
            H * 0.42,
            W * 0.5,
            "rgba(255,176,32, 0.20)"
        ],
        [
            W * 0.35,
            H * 0.85,
            W * 0.6,
            "rgba(245, 158, 11, 0.12)"
        ]
    ];
    for (const [x, y, r, color] of blobs){
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color);
        g.addColorStop(1, "rgba(7, 11, 14, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
    }
}
function drawStars(ctx) {
    // Deterministic starfield (no Math.random → same card every render)
    let seed = 42;
    const rand = ()=>{
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    for(let i = 0; i < 90; i++){
        const x = rand() * W;
        const y = rand() * H;
        const r = rand() * 1.6 + 0.4;
        ctx.globalAlpha = 0.15 + rand() * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}
function generateMilestoneCard(data) {
    return new Promise((resolve, reject)=>{
        try {
            const canvas = document.createElement("canvas");
            canvas.width = W;
            canvas.height = H;
            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("no canvas context");
            // Background
            ctx.fillStyle = "#0B0704";
            ctx.fillRect(0, 0, W, H);
            drawAurora(ctx);
            drawStars(ctx);
            // Milestone-tinted aurora behind the ring (brand coherence per milestone)
            const accent = hexToRgba(data.color, 0.16);
            const ag = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, W * 0.45);
            ag.addColorStop(0, accent);
            ag.addColorStop(1, "rgba(7, 11, 14, 0)");
            ctx.fillStyle = ag;
            ctx.fillRect(0, 0, W, H);
            // Accent ring (milestone color) framing the number
            ctx.save();
            ctx.strokeStyle = data.color;
            ctx.lineWidth = 10;
            ctx.globalAlpha = 0.55;
            ctx.beginPath();
            ctx.arc(W / 2, H * 0.40, W * 0.30, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 0.14;
            ctx.lineWidth = 34;
            ctx.beginPath();
            ctx.arc(W / 2, H * 0.40, W * 0.30 + 30, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            // Emoji
            ctx.font = "150px system-ui, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(data.emoji, W / 2, H * 0.185);
            // Headline
            ctx.fillStyle = data.color;
            ctx.font = "italic 600 52px 'Poppins', system-ui, sans-serif";
            ctx.fillText(data.title, W / 2, H * 0.262);
            // Big number
            ctx.save();
            ctx.shadowColor = data.color;
            ctx.shadowBlur = 60;
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "800 330px 'Poppins', system-ui, sans-serif";
            ctx.fillText(String(data.days), W / 2, H * 0.41);
            ctx.restore();
            // "jours" label
            ctx.fillStyle = "rgba(255,255,255,0.65)";
            ctx.font = "600 54px 'Poppins', system-ui, sans-serif";
            ctx.fillText(data.daysLabel.toUpperCase(), W / 2, H * 0.555);
            // Savings line
            ctx.fillStyle = "#FFC94D";
            ctx.font = "700 58px 'Poppins', system-ui, sans-serif";
            ctx.fillText(data.savedLine, W / 2, H * 0.68);
            // Divider
            const divider = ctx.createLinearGradient(W * 0.2, 0, W * 0.8, 0);
            divider.addColorStop(0, "rgba(255,107,0,0)");
            divider.addColorStop(0.5, "rgba(255,107,0,0.7)");
            divider.addColorStop(1, "rgba(255,107,0,0)");
            ctx.fillStyle = divider;
            ctx.fillRect(W * 0.2, H * 0.75, W * 0.6, 3);
            // Tagline
            ctx.fillStyle = "rgba(255,255,255,0.75)";
            ctx.font = "italic 400 44px 'Poppins', system-ui, sans-serif";
            const words = data.tagline.split(" ");
            const lines = [];
            let line = "";
            for (const w of words){
                const test = line ? `${line} ${w}` : w;
                if (ctx.measureText(test).width > W * 0.72) {
                    lines.push(line);
                    line = w;
                } else {
                    line = test;
                }
            }
            if (line) lines.push(line);
            lines.forEach((l, i)=>ctx.fillText(l, W / 2, H * 0.815 + i * 62));
            drawWordmark(ctx, H * 0.94);
            canvas.toBlob((blob)=>{
                if (blob) resolve(blob);
                else reject(new Error("toBlob failed"));
            }, "image/png");
        } catch (e) {
            reject(e);
        }
    });
}
/** Zerobet wordmark — shared by both cards. */ function drawWordmark(ctx, y) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#FFB020";
    ctx.font = "800 60px 'Poppins', system-ui, sans-serif";
    ctx.fillText("ZERO", W / 2 - 78, y);
    ctx.fillStyle = "#FBBF24";
    ctx.fillText("BET", W / 2 + 62, y);
    // Emerald dot over the O of ZERO — brand nod
    ctx.fillStyle = "#FF6B00";
    ctx.beginPath();
    ctx.arc(W / 2 - 148, y - 42, 12, 0, Math.PI * 2);
    ctx.fill();
}
/** Round a single rounded-rect path (helper for stat pills). */ function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}
/** Wrap text into lines that fit maxWidth — returns the lines. */ function wrapText(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (const w of words){
        const test = line ? `${line} ${w}` : w;
        if (ctx.measureText(test).width > maxWidth) {
            lines.push(line);
            line = w;
        } else {
            line = test;
        }
    }
    if (line) lines.push(line);
    return lines;
}
function generateJourneyCard(data) {
    return new Promise((resolve, reject)=>{
        try {
            const canvas = document.createElement("canvas");
            canvas.width = W;
            canvas.height = H;
            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("no canvas context");
            // Background
            ctx.fillStyle = "#0B0704";
            ctx.fillRect(0, 0, W, H);
            drawAurora(ctx);
            drawStars(ctx);
            // Rank-tinted aurora behind the number
            const accent = hexToRgba(data.accent, 0.16);
            const ag = ctx.createRadialGradient(W / 2, H * 0.3, 0, W / 2, H * 0.3, W * 0.45);
            ag.addColorStop(0, accent);
            ag.addColorStop(1, "rgba(7, 11, 14, 0)");
            ctx.fillStyle = ag;
            ctx.fillRect(0, 0, W, H);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            // Header label (letterspaced teal)
            ctx.fillStyle = "#FFB020";
            ctx.font = "700 38px 'Poppins', system-ui, sans-serif";
            const header = data.headerLabel.toUpperCase();
            // Manual letterspacing: draw char by char
            const hs = 8;
            const hw = ctx.measureText(header).width + hs * (header.length - 1);
            let hx = W / 2 - hw / 2;
            for (const ch of header){
                ctx.fillText(ch, hx + ctx.measureText(ch).width / 2, H * 0.075);
                hx += ctx.measureText(ch).width + hs;
            }
            // Accent ring framing the number
            ctx.save();
            ctx.strokeStyle = data.accent;
            ctx.lineWidth = 10;
            ctx.globalAlpha = 0.55;
            ctx.beginPath();
            ctx.arc(W / 2, H * 0.27, W * 0.21, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 0.14;
            ctx.lineWidth = 30;
            ctx.beginPath();
            ctx.arc(W / 2, H * 0.27, W * 0.21 + 26, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            // Big number
            ctx.save();
            ctx.shadowColor = data.accent;
            ctx.shadowBlur = 60;
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "800 280px 'Poppins', system-ui, sans-serif";
            ctx.fillText(String(data.days), W / 2, H * 0.27);
            ctx.restore();
            // Days caption
            ctx.fillStyle = "rgba(255,255,255,0.65)";
            ctx.font = "600 46px 'Poppins', system-ui, sans-serif";
            ctx.fillText(data.daysLabel.toUpperCase(), W / 2, H * 0.425);
            // Savings line (gold)
            ctx.fillStyle = "#FBBF24";
            ctx.font = "700 52px 'Poppins', system-ui, sans-serif";
            ctx.fillText(data.savedLine, W / 2, H * 0.492);
            // Divider
            const divider = ctx.createLinearGradient(W * 0.2, 0, W * 0.8, 0);
            divider.addColorStop(0, "rgba(255,107,0,0)");
            divider.addColorStop(0.5, "rgba(255,107,0,0.7)");
            divider.addColorStop(1, "rgba(255,107,0,0)");
            ctx.fillStyle = divider;
            ctx.fillRect(W * 0.2, H * 0.535, W * 0.6, 3);
            // Stat pills (glass rows) — stacked below the divider, never overlapping
            const pillW = W * 0.76;
            const pillH = 100;
            const gap = 22;
            const stats = data.stats.slice(0, 3); // layout guaranteed for 3 max
            const step = pillH + gap;
            const firstCenter = H * 0.555 + pillH / 2;
            stats.forEach((s, i)=>{
                const py = firstCenter + i * step;
                const px = W / 2 - pillW / 2;
                ctx.save();
                roundRectPath(ctx, px, py - pillH / 2, pillW, pillH, 26);
                ctx.fillStyle = "rgba(255,255,255,0.06)";
                ctx.fill();
                ctx.strokeStyle = "rgba(255,255,255,0.12)";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
                // Emoji + label (left)
                ctx.textAlign = "left";
                ctx.font = "42px system-ui, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif";
                ctx.fillText(s.emoji, px + 38, py);
                ctx.fillStyle = "rgba(255,255,255,0.6)";
                ctx.font = "500 34px 'Poppins', system-ui, sans-serif";
                ctx.fillText(s.label, px + 102, py);
                // Value (right)
                ctx.textAlign = "right";
                ctx.fillStyle = "#FFFFFF";
                ctx.font = "700 40px 'Poppins', system-ui, sans-serif";
                ctx.fillText(s.value, px + pillW - 38, py);
                ctx.textAlign = "center";
            });
            // Tagline (below the last pill — pushed down by pill count)
            ctx.fillStyle = "rgba(255,255,255,0.75)";
            ctx.font = "italic 400 40px 'Poppins', system-ui, sans-serif";
            const tagTop = Math.min(firstCenter + stats.length * step + 10, H * 0.855);
            const tagLines = wrapText(ctx, data.tagline, W * 0.72);
            tagLines.forEach((l, i)=>ctx.fillText(l, W / 2, tagTop + i * 52));
            // Wordmark
            drawWordmark(ctx, H * 0.945);
            canvas.toBlob((blob)=>{
                if (blob) resolve(blob);
                else reject(new Error("toBlob failed"));
            }, "image/png");
        } catch (e) {
            reject(e);
        }
    });
}
async function downloadImageBlob(blob, filename) {
    try {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(()=>URL.revokeObjectURL(url), 4000);
        return true;
    } catch  {
        return false;
    }
}
async function shareImageBlob(blob, filename, title, text) {
    const file = new File([
        blob
    ], filename, {
        type: "image/png"
    });
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    // 1. Native share sheet with the image
    try {
        if (nav && "canShare" in nav && nav.canShare({
            files: [
                file
            ]
        })) {
            await nav.share({
                files: [
                    file
                ],
                title,
                text
            });
            return "shared";
        }
        if (nav && "share" in nav) {
            // Some browsers accept files directly in share()
            await nav.share({
                files: [
                    file
                ],
                title
            });
            return "shared";
        }
    } catch (e) {
        // User cancelled the sheet — treat as done, not an error
        if (e?.name === "AbortError") return "shared";
    // fall through to clipboard/download
    }
    // 2. Clipboard image (Chrome/Edge)
    try {
        if (nav?.clipboard && "write" in nav.clipboard && typeof ClipboardItem !== "undefined") {
            await nav.clipboard.write([
                new ClipboardItem({
                    "image/png": blob
                })
            ]);
            return "copied";
        }
    } catch  {
    /* fall through */ }
    // 3. Download
    const ok = await downloadImageBlob(blob, filename);
    return ok ? "downloaded" : "failed";
}
async function shareMilestoneCard(data) {
    let blob;
    try {
        blob = await generateMilestoneCard(data);
    } catch  {
        return "failed";
    }
    return shareImageBlob(blob, `zerobet-${data.days}-jours.png`, data.title, data.tagline);
}
async function shareJourneyCard(data) {
    let blob;
    try {
        blob = await generateJourneyCard(data);
    } catch  {
        return "failed";
    }
    return shareImageBlob(blob, `zerobet-parcours-${data.days}-jours.png`, data.headerLabel, data.tagline);
}
}),
"[project]/src/components/zerobet/components/JourneyShareModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>JourneyShareModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * Zerobet 2.0.8 — Journey card share modal.
 *
 * Receives ready-to-draw JourneyCardData from the parent (Dashboard,
 * Community…), generates the PNG in a canvas, shows a live preview and
 * offers share / download actions. Generation runs through a useCallback
 * loader + mountedRef (lint-safe async-on-open pattern, same as
 * SubscriptionScreen).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-ssr] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/haptics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$share$2d$card$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/share-card.ts [app-ssr] (ecmascript)");
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
function JourneyShareModal({ open, onClose, data }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const [previewUrl, setPreviewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("generating");
    const [sharing, setSharing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const blobRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mountedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    const urlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const revoke = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (urlRef.current) {
            URL.revokeObjectURL(urlRef.current);
            urlRef.current = null;
        }
    }, []);
    const generate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!data) return;
        setStatus("generating");
        setPreviewUrl(null);
        revoke();
        try {
            const blob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$share$2d$card$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateJourneyCard"])(data);
            if (!mountedRef.current) return;
            blobRef.current = blob;
            const url = URL.createObjectURL(blob);
            urlRef.current = url;
            setPreviewUrl(url);
            setStatus("ready");
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["haptics"].light();
        } catch  {
            if (!mountedRef.current) return;
            setStatus("error");
        }
    }, [
        data,
        revoke
    ]);
    // Start generation after the modal mounts (deferred — never synchronous
    // setState inside the effect body). The close handler resets the state so
    // every open starts from a clean spinner.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        mountedRef.current = true;
        const timer = setTimeout(()=>{
            generate();
        }, 30);
        return ()=>{
            mountedRef.current = false;
            clearTimeout(timer);
            revoke();
        };
    }, [
        open,
        generate,
        revoke
    ]);
    const handleClose = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["haptics"].light();
        setStatus("generating");
        setPreviewUrl(null);
        revoke();
        onClose();
    };
    const handleShare = async ()=>{
        if (!blobRef.current || sharing) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["haptics"].medium();
        setSharing(true);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$share$2d$card$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shareImageBlob"])(blobRef.current, `zerobet-parcours-${data?.days ?? 0}-jours.png`, t("journeyCardHeader"), t("journeyCardTagline"));
        setSharing(false);
        if (result === "shared") __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(t("journeyShareSharedToast"));
        else if (result === "copied") __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(t("journeyShareCopiedToast"));
        else if (result === "downloaded") __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(t("journeyShareSavedToast"));
        else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(t("journeyShareError"));
    };
    const handleDownload = async ()=>{
        if (!blobRef.current) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["haptics"].medium();
        const ok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$share$2d$card$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["downloadImageBlob"])(blobRef.current, `zerobet-parcours-${data?.days ?? 0}-jours.png`);
        if (ok) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(t("journeyShareSavedToast"));
        else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(t("journeyShareError"));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: 0.25
            },
            className: "fixed inset-0 z-[100] flex items-center justify-center p-5",
            style: {
                background: "radial-gradient(circle at center, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.94) 100%)",
                backdropFilter: "blur(8px)"
            },
            onClick: handleClose,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": t("journeyShareTitle"),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 0.9,
                    opacity: 0,
                    y: 24
                },
                animate: {
                    scale: 1,
                    opacity: 1,
                    y: 0
                },
                exit: {
                    scale: 0.92,
                    opacity: 0,
                    y: 16
                },
                transition: {
                    type: "spring",
                    stiffness: 320,
                    damping: 26
                },
                className: "glass-card-strong w-full max-w-sm rounded-3xl p-5 relative overflow-hidden max-h-[92dvh] overflow-y-auto custom-scroll",
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#FF6B00]/15 blur-3xl pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                        lineNumber: 152,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#F59E0B]/10 blur-3xl pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                        lineNumber: 153,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-start justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-white font-bold text-lg font-[family-name:var(--font-poppins)]",
                                        children: t("journeyShareTitle")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/50 text-xs mt-0.5",
                                        children: t("journeyShareSubtitle")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClose,
                                className: "w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors active:scale-90",
                                "aria-label": t("journeyShareClose"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                    lineNumber: 168,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                lineNumber: 163,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                        lineNumber: 156,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative rounded-2xl overflow-hidden border border-white/10 bg-black/30 mb-4",
                        children: [
                            status === "generating" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "aspect-[4/5] max-h-[46dvh] flex flex-col items-center justify-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full border-2 border-[#FF6B00]/30 border-t-[#FF6B00] animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                        lineNumber: 176,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/50 text-sm",
                                        children: t("journeyShareGenerating")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                        lineNumber: 177,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                lineNumber: 175,
                                columnNumber: 17
                            }, this),
                            status === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "aspect-[4/5] max-h-[46dvh] flex flex-col items-center justify-center gap-3 px-6 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full bg-[#FF453A]/15 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            size: 22,
                                            className: "text-[#FF453A]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                            lineNumber: 183,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                        lineNumber: 182,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/60 text-sm",
                                        children: t("journeyShareError")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                        lineNumber: 185,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: generate,
                                        className: "flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold hover:bg-white/15 transition-colors active:scale-95",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                                lineNumber: 190,
                                                columnNumber: 21
                                            }, this),
                                            t("journeyShareRetry")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                        lineNumber: 186,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                lineNumber: 181,
                                columnNumber: 17
                            }, this),
                            status === "ready" && previewUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].img, {
                                initial: {
                                    opacity: 0,
                                    scale: 0.97
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                transition: {
                                    duration: 0.35
                                },
                                src: previewUrl,
                                alt: t("journeyShareTitle"),
                                className: "w-full aspect-[4/5] max-h-[46dvh] object-contain"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                lineNumber: 196,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                        lineNumber: 173,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleShare,
                                disabled: status !== "ready" || sharing,
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl gradient-primary glow-green text-white font-bold text-sm transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                                children: [
                                    sharing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        size: 16,
                                        className: "animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                        lineNumber: 215,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                        lineNumber: 217,
                                        columnNumber: 19
                                    }, this),
                                    t("journeyShareShare")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                lineNumber: 209,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleDownload,
                                disabled: status !== "ready",
                                className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/8 border border-white/10 text-white font-semibold text-sm hover:bg-white/12 transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 16,
                                        className: "text-[#FFB020]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                        lineNumber: 226,
                                        columnNumber: 17
                                    }, this),
                                    t("journeyShareDownload")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                                lineNumber: 221,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                        lineNumber: 208,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
                lineNumber: 143,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
            lineNumber: 127,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/zerobet/components/JourneyShareModal.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
}),
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
"[project]/src/lib/animations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/components/zerobet/screens/CommunityScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommunityScreen",
    ()=>CommunityScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-ssr] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/badge-check.js [app-ssr] (ecmascript) <export default as BadgeCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-ssr] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-ssr] (ecmascript) <export default as Stethoscope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-ssr] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-ssr] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/zerobet-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$community$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/community-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$search$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/search-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$currency$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/currency-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/haptics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$Skeletons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/Skeletons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$JourneyShareModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/JourneyShareModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/parcours-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$PullToRefresh$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/PullToRefresh.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/zerobet/components/EmptyState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/animations.ts [app-ssr] (ecmascript)");
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
;
// Map our internal `Language` union to BCP-47 locale codes accepted by Intl.
const INTL_LOCALES = {
    fr: "fr-FR",
    en: "en-US",
    es: "es-ES"
};
/**
 * Locale-aware relative time formatter.
 * Replaces the previous hardcoded French strings ("à l'instant", "il y a 1 j", ...).
 * Uses existing `justNow` / `minutesAgo` / `hoursAgo` / `daysAgo` keys for the
 * generic cases, plus a separate `communityDayAgo` key for the day === 1
 * singular form ("1 day ago" vs "{n} days ago").
 */ function formatRelative(iso, t, language) {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return t("communityJustNow");
    if (min < 60) return t("minutesAgo", {
        n: min
    });
    const hr = Math.floor(min / 60);
    if (hr < 24) return t("hoursAgo", {
        n: hr
    });
    const day = Math.floor(hr / 24);
    if (day === 1) return t("communityDayAgo");
    if (day < 7) return t("daysAgo", {
        n: day
    });
    const locale = INTL_LOCALES[language] ?? "fr-FR";
    try {
        return new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "short"
        }).format(d);
    } catch  {
        return new Intl.DateTimeFormat("fr-FR", {
            day: "numeric",
            month: "short"
        }).format(d);
    }
}
/**
 * Render a FCFA amount in the user's selected currency.
 * Replaces the previous `formatPrice` helper which always rendered in FCFA.
 */ function formatPrice(fcfa, currency) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$currency$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(fcfa, currency);
}
/**
 * Returns the translated country name from a 2-letter ISO code (ci, sn, ml, ...).
 * Falls back to the raw code if the dictionary key is missing.
 */ function getCountryName(code, t) {
    if (!code) return undefined;
    const key = `country${code.toUpperCase()}`;
    const translated = t(key);
    // `t()` returns the raw key when the lookup fails — fall back to the code.
    return translated === key ? code : translated;
}
const TABS = [
    {
        key: "testimonials",
        labelKey: "communityTestimonials",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"]
    },
    {
        key: "forum",
        labelKey: "communityForum",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
    },
    {
        key: "mentors",
        labelKey: "communityMentors",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"]
    },
    {
        key: "psychologists",
        labelKey: "communityPsychologists",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"]
    }
];
// Zerobet 2.0 — live-chat entry pill (navigates to its own screen).
const CHAT_TAB = {
    labelKey: "communityTabChat",
    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"]
};
const FORUM_CATEGORIES = [
    {
        key: "success",
        labelKey: "communityCategorySuccess",
        color: "#FFC94D",
        emoji: "🎉"
    },
    {
        key: "struggle",
        labelKey: "communityCategoryStruggle",
        color: "#FF3B30",
        emoji: "💪"
    },
    {
        key: "motivation",
        labelKey: "communityCategoryMotivation",
        color: "#F59E0B",
        emoji: "🔥"
    },
    {
        key: "question",
        labelKey: "communityCategoryQuestion",
        color: "#FFB020",
        emoji: "❓"
    }
];
const CATEGORY_BY_KEY = Object.fromEntries(FORUM_CATEGORIES.map((c)=>[
        c.key,
        c
    ]));
const FORUM_SORTS = [
    {
        key: "recent",
        labelKey: "communitySortRecent",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"]
    },
    {
        key: "popular",
        labelKey: "communitySortPopular",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
    },
    {
        key: "unanswered",
        labelKey: "communitySortUnanswered",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"]
    }
];
const TESTIMONIAL_FILTERS = [
    {
        key: "all",
        labelKey: "communityFilterAll"
    },
    {
        key: "verified",
        labelKey: "communityFilterVerified"
    },
    {
        key: "100plus",
        labelKey: "communityFilter100Days"
    },
    {
        key: "365",
        labelKey: "communityFilter365Days"
    }
];
// Pre-computed deterministic online status for seed mentors & psychologists (70% online)
const MENTOR_ONLINE = Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$community$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SEED_MENTORS"].map((m)=>[
        m.displayName,
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$search$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isOnlineFromSeed"])(`mentor-${m.displayName}`)
    ]));
const PSY_ONLINE = Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$community$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SEED_PSYCHOLOGISTS"].map((p)=>[
        p.license,
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$search$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isOnlineFromSeed"])(`psy-${p.license}`)
    ]));
// Seed forum posts (displayed when store is empty / merged with user posts).
//
// Note (Task 18-b): seed posts store i18n KEYS in `title` / `content`
// (resolved at render time via `t(post.title)` / `t(post.content)`).
// User-submitted posts store the raw text directly. We detect seed posts
// by their `seed-f-` ID prefix and branch in the ForumTab render.
// Seed replies do the same: a `seed-f-*-r*` reply stores a translation key
// in its `content` field (e.g. `forumSeed0Reply0`).
const SEED_FORUM_POSTS = [
    {
        id: "seed-f-0",
        authorName: "Moussa D.",
        authorStreak: 187,
        category: "success",
        title: "forumSeed0Title",
        content: "forumSeed0Content",
        likes: 24,
        replies: [
            {
                id: "seed-f-0-r1",
                authorName: "Karim L.",
                isMentor: true,
                content: "forumSeed0Reply0",
                likes: 5,
                createdAt: new Date(Date.now() - 3600_000).toISOString()
            }
        ],
        liked: false,
        createdAt: new Date(Date.now() - 7200_000).toISOString()
    },
    {
        id: "seed-f-1",
        authorName: "Awa N.",
        authorStreak: 156,
        category: "struggle",
        title: "forumSeed1Title",
        content: "forumSeed1Content",
        likes: 12,
        replies: [],
        liked: false,
        createdAt: new Date(Date.now() - 14400_000).toISOString()
    },
    {
        id: "seed-f-2",
        authorName: "Cheikh D.",
        authorStreak: 410,
        category: "motivation",
        title: "forumSeed2Title",
        content: "forumSeed2Content",
        likes: 58,
        replies: [],
        liked: false,
        createdAt: new Date(Date.now() - 86400_000).toISOString()
    }
];
// Convert seed testimonials to the store Testimonial shape.
// Note (Task 18-b): we store the translation KEYS in `title` / `content`
// and resolve them at render time via `t(testimonial.title)`. The amount
// (if any) is stashed in a side-table keyed by the seed ID so testimonials
// that mention money can be re-rendered in the user's selected currency.
const SEED_AS_TESTIMONIALS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$community$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SEED_TESTIMONIALS"].map((s)=>({
        id: s.id,
        authorName: s.authorName,
        authorAge: s.authorAge,
        authorCountry: s.authorCountry,
        streakDays: s.streakDays,
        title: s.titleKey,
        content: s.bodyKey,
        isVerified: s.isVerified,
        isAnonymous: false,
        isMine: false,
        likes: s.likes,
        liked: false,
        replies: [],
        createdAt: s.createdAt
    }));
// Side-table of FCFA amounts for seed testimonials that mention money.
// Used at render time to interpolate `{amount}` in the bodyKey with the
// user's selected currency via `formatCurrency`.
const SEED_AMOUNT_FCFA = Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$community$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SEED_TESTIMONIALS"].filter((s)=>s.amountFCFA !== undefined).map((s)=>[
        s.id,
        s.amountFCFA
    ]));
function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0 || !parts[0]) return "?";
    const first = parts[0][0] ?? "";
    const second = parts[1]?.[0] ?? "";
    return (first + second).toUpperCase();
}
// ========================================
// AVATAR
// ========================================
function Avatar({ name, size = 40 }) {
    const initials = getInitials(name);
    // deterministic gradient from name
    const hash = name.split("").reduce((a, c)=>a + c.charCodeAt(0), 0);
    const grads = [
        "linear-gradient(135deg, #FF3B30, #F59E0B)",
        "linear-gradient(135deg, #FFC94D, #FFB020)",
        "linear-gradient(135deg, #FFD166, #FF3B30)",
        "linear-gradient(135deg, #FFB020, #FFB020)",
        "linear-gradient(135deg, #F59E0B, #FBBF24)",
        "linear-gradient(135deg, #FFC94D, #FBBF24)"
    ];
    const grad = grads[hash % grads.length];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-full flex items-center justify-center font-bold text-white shrink-0",
        style: {
            width: size,
            height: size,
            background: grad,
            fontSize: size * 0.36
        },
        children: initials
    }, void 0, false, {
        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
        lineNumber: 252,
        columnNumber: 5
    }, this);
}
// ========================================
// STAR RATING
// ========================================
function StarRating({ rating, size = 12 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-0.5",
        children: [
            [
                1,
                2,
                3,
                4,
                5
            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                    size: size,
                    className: s <= Math.round(rating) ? "text-[#FBBF24] fill-[#FBBF24]" : "text-white/20"
                }, s, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-white/70 text-xs ml-1 font-semibold",
                children: rating.toFixed(1)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
        lineNumber: 266,
        columnNumber: 5
    }, this);
}
// ========================================
// COUNT-UP HOOK
// ========================================
function useCountUp(target, duration = 1200) {
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const startedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (startedRef.current) return;
        startedRef.current = true;
        const start = performance.now();
        let raf = 0;
        const tick = (now)=>{
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setValue(Math.round(target * eased));
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return ()=>cancelAnimationFrame(raf);
    }, [
        target,
        duration
    ]);
    return value;
}
// ========================================
// COMMUNITY STATS BANNER
// ========================================
function CommunityStatsBanner() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const language = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const members = useCountUp(12847);
    const cumulativeDays = useCountUp(2341);
    const verifiedTestimonials = useCountUp(847);
    const locale = INTL_LOCALES[language] ?? "fr-FR";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: -10
        },
        animate: {
            opacity: 1,
            y: 0
        },
        className: "glass-card-strong p-4 mb-4 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#F59E0B]/15 blur-3xl"
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#FFC94D]/10 blur-3xl"
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 320,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative grid grid-cols-3 gap-2 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatItem, {
                        value: members.toLocaleString(locale),
                        label: t("communityMembers"),
                        emoji: "👥"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatItem, {
                        value: cumulativeDays.toLocaleString(locale),
                        label: t("communityCumulativeDays"),
                        emoji: "🔥"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatItem, {
                        value: verifiedTestimonials.toLocaleString(locale),
                        label: t("communityVerifiedTestimonials"),
                        emoji: "✅"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
        lineNumber: 314,
        columnNumber: 5
    }, this);
}
function StatItem({ value, label, emoji }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-lg mb-0.5",
                children: emoji
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-base font-extrabold gradient-primary-text font-[family-name:var(--font-poppins)] leading-tight",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 346,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white/50 text-[10px] leading-tight",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 349,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
        lineNumber: 344,
        columnNumber: 5
    }, this);
}
// ========================================
// PREMIUM LOCK SCREEN
// ========================================
function PremiumLock({ featureName, description, onCta }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        className: "px-6 pt-16 pb-12 flex flex-col items-center justify-center text-center min-h-[60vh]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 0.8,
                    opacity: 0
                },
                animate: {
                    scale: 1,
                    opacity: 1
                },
                transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                },
                className: "w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-4 glow-green",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                    className: "text-white",
                    size: 32
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                    lineNumber: 373,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 367,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-bold text-white mb-2 font-[family-name:var(--font-poppins)]",
                children: [
                    featureName,
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "gradient-primary-text",
                        children: "Premium"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 376,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 375,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/60 text-sm mb-6 max-w-xs leading-relaxed",
                children: description
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 378,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onCta,
                className: "w-full max-w-xs py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold glow-green active:scale-[0.98] transition-transform",
                children: t("upgrade")
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 379,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
        lineNumber: 362,
        columnNumber: 5
    }, this);
}
function CommunityScreen() {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const language = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const { testimonials, addTestimonial, toggleTestimonialLike, addTestimonialReply, forumPosts, addForumPost, toggleForumLike, addForumReply, plan, navigate, anonymousMode, streakDays, adminStreakOverride, currency, weeklyBetAmount, xp, level, journalEntries } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const isPremium = plan !== "free";
    const effectiveStreak = adminStreakOverride !== null ? adminStreakOverride : streakDays;
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("testimonials");
    const [refreshing, setRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleRefresh = async ()=>{
        setRefreshing(true);
        await new Promise((resolve)=>setTimeout(resolve, 800));
        setRefreshing(false);
    };
    // Testimonial modal state
    const [showTestimonialModal, setShowTestimonialModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tTitle, setTTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [tContent, setTContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [tAnonymous, setTAnonymous] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Reply state (per testimonial)
    const [replyingTo, setReplyingTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [replyText, setReplyText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Forum modal state
    const [showForumModal, setShowForumModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fCategory, setFCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("motivation");
    const [fTitle, setFTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [fContent, setFContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Psychologist reservation modal
    const [reservingPsy, setReservingPsy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Merged data
    const allTestimonials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            ...testimonials,
            ...SEED_AS_TESTIMONIALS
        ], [
        testimonials
    ]);
    const allForumPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            ...forumPosts,
            ...SEED_FORUM_POSTS
        ], [
        forumPosts
    ]);
    // Mentor progress to 90 days
    const mentorProgress = Math.min(100, effectiveStreak / 90 * 100);
    // Zerobet 2.0.8 — journey card share (banner + modal)
    const [journeyOpen, setJourneyOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const journeyData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const fmt = new Intl.NumberFormat(language === "en" ? "en-US" : language === "es" ? "es-ES" : "fr-FR");
        const rank = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$parcours$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentRank"])(effectiveStreak);
        const saved = Math.round(effectiveStreak * Math.round(weeklyBetAmount / 7));
        const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$currency$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrency"])(currency);
        const savedValue = info.position === "before" ? `${info.symbol} ${fmt.format(saved)}` : `${fmt.format(saved)} ${info.symbol}`;
        return {
            days: effectiveStreak,
            headerLabel: t("journeyCardHeader"),
            daysLabel: t("journeyCardDaysLabel"),
            savedLine: t("journeyCardSavedLine", {
                n: savedValue
            }),
            accent: rank.color,
            stats: [
                {
                    emoji: "🏅",
                    label: t("journeyStatRank"),
                    value: t(rank.nameKey)
                },
                {
                    emoji: "⚡",
                    label: t("journeyStatLevel"),
                    value: t("journeyStatLevelValue", {
                        level: String(level),
                        xp: fmt.format(xp)
                    })
                },
                {
                    emoji: "📖",
                    label: t("journeyStatJournal"),
                    value: t("journeyStatJournalValue", {
                        n: journalEntries.length
                    })
                }
            ],
            tagline: t("journeyCardTagline")
        };
    }, [
        effectiveStreak,
        weeklyBetAmount,
        currency,
        level,
        xp,
        journalEntries.length,
        t,
        language
    ]);
    // Handlers
    const handleTestimonialSubmit = ()=>{
        if (!tTitle.trim() || !tContent.trim()) return;
        const useAnon = anonymousMode || tAnonymous;
        addTestimonial({
            authorName: useAnon ? t("communityAnonymous") : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].getState().name || t("me"),
            authorAge: undefined,
            authorCountry: undefined,
            streakDays: effectiveStreak,
            title: tTitle.trim(),
            content: tContent.trim(),
            isVerified: false,
            isAnonymous: useAnon,
            isMine: true
        });
        setTTitle("");
        setTContent("");
        setTAnonymous(false);
        setShowTestimonialModal(false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(t("communityTestimonialPublishedToast"), {
            description: t("communityTestimonialPublishedToastDesc")
        });
    };
    const handleReplySubmit = (testimonialId)=>{
        if (!replyText.trim()) return;
        const useAnon = anonymousMode;
        const reply = {
            authorName: useAnon ? t("communityAnonymous") : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].getState().name || t("me"),
            content: replyText.trim()
        };
        addTestimonialReply(testimonialId, reply);
        setReplyText("");
        setReplyingTo(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(t("communityReplyPublishedToast"));
    };
    // Forum reply state (per post)
    const [forumReplyingTo, setForumReplyingTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [forumReplyText, setForumReplyText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const handleForumReplySubmit = (postId)=>{
        if (!forumReplyText.trim()) return;
        const useAnon = anonymousMode;
        const reply = {
            authorName: useAnon ? t("communityAnonymous") : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].getState().name || t("me"),
            content: forumReplyText.trim()
        };
        addForumReply(postId, reply);
        setForumReplyText("");
        setForumReplyingTo(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(t("communityReplyPublishedToast"));
    };
    const handleForumSubmit = ()=>{
        if (!fTitle.trim() || !fContent.trim()) return;
        const useAnon = anonymousMode;
        addForumPost({
            authorName: useAnon ? t("communityAnonymous") : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].getState().name || t("me"),
            authorStreak: effectiveStreak,
            category: fCategory,
            title: fTitle.trim(),
            content: fContent.trim()
        });
        setFTitle("");
        setFContent("");
        setFCategory("motivation");
        setShowForumModal(false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(t("communityForumPostedToast"), {
            description: t("communityForumPostedToastDesc")
        });
    };
    const handleContactMentor = (name)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(t("communityMentorRequestToast", {
            name
        }), {
            description: t("communityMentorRequestToastDesc")
        });
    };
    const handleReserveSession = (psy)=>{
        setReservingPsy(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(t("communitySessionReservedToast", {
            name: psy.displayName
        }), {
            description: t("communitySessionReservedToastDesc", {
                price: formatPrice(psy.sessionPrice, currency)
            })
        });
    };
    // ========================================
    // RENDER
    // ========================================
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen pb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pt-12 pb-3 sticky top-0 z-20 backdrop-blur-xl bg-[#0B0704]/70",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>navigate("dashboard"),
                                className: "w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform",
                                "aria-label": t("back"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    size: 20,
                                    className: "text-white"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                    lineNumber: 578,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 573,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-bold text-white font-[family-name:var(--font-poppins)] tracking-tight",
                                        children: t("communityTitle")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 581,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/50 text-xs flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                size: 11
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 585,
                                                columnNumber: 15
                                            }, this),
                                            t("communitySubtitle")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 584,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 580,
                                columnNumber: 11
                            }, this),
                            !isPremium && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>navigate("paywall"),
                                className: "px-3 py-1.5 rounded-full gradient-primary text-white text-[11px] font-semibold flex items-center gap-1 glow-green active:scale-95 transition-transform",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 594,
                                        columnNumber: 15
                                    }, this),
                                    t("settingsPlanPremium")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 590,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 572,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].playClick();
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["haptics"].light();
                                    navigate("community-chat");
                                },
                                className: "flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 gradient-gold text-[#1a1200]",
                                "aria-label": t(CHAT_TAB.labelKey),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CHAT_TAB.icon, {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 612,
                                        columnNumber: 13
                                    }, this),
                                    t(CHAT_TAB.labelKey)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 603,
                                columnNumber: 11
                            }, this),
                            TABS.map((tab)=>{
                                const active = activeTab === tab.key;
                                const Icon = tab.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(tab.key),
                                    className: `flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${active ? "gradient-primary text-white glow-green" : "glass-card text-white/60"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                            lineNumber: 628,
                                            columnNumber: 17
                                        }, this),
                                        t(tab.labelKey)
                                    ]
                                }, tab.key, true, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                    lineNumber: 619,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 601,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 571,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$PullToRefresh$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PullToRefresh"], {
                onRefresh: handleRefresh,
                isRefreshing: refreshing,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 mt-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CommunityStatsBanner, {}, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                            lineNumber: 639,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 638,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            children: [
                                activeTab === "testimonials" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        x: -20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        x: -20
                                    },
                                    transition: {
                                        duration: 0.2
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative overflow-hidden rounded-3xl mb-4 p-4 glass-card",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#F59E0B]/15 blur-2xl pointer-events-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                    lineNumber: 655,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#FF6B00]/15 blur-2xl pointer-events-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                    lineNumber: 656,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-11 h-11 rounded-2xl gradient-gold glow-green flex items-center justify-center flex-shrink-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                                                size: 20,
                                                                className: "text-white"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 659,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                            lineNumber: 658,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-white font-semibold text-sm font-[family-name:var(--font-poppins)]",
                                                                    children: t("journeyBannerTitle")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                    lineNumber: 662,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-white/50 text-xs mt-0.5 leading-relaxed",
                                                                    children: t("journeyBannerSubtitle")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                    lineNumber: 665,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                            lineNumber: 661,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].playClick();
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["haptics"].light();
                                                                setJourneyOpen(true);
                                                            },
                                                            className: "px-4 py-2 rounded-full gradient-primary glow-green text-white text-xs font-bold flex-shrink-0 transition-transform active:scale-95",
                                                            children: t("journeyBannerCta")
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                            lineNumber: 669,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                    lineNumber: 657,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                            lineNumber: 654,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TestimonialsTab, {
                                            testimonials: allTestimonials,
                                            isPremium: isPremium,
                                            anonymousMode: anonymousMode,
                                            onWrite: ()=>setShowTestimonialModal(true),
                                            onLike: toggleTestimonialLike,
                                            replyingTo: replyingTo,
                                            setReplyingTo: setReplyingTo,
                                            replyText: replyText,
                                            setReplyText: setReplyText,
                                            onSubmitReply: handleReplySubmit,
                                            onGoPremium: ()=>navigate("paywall")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                            lineNumber: 681,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, "testimonials", true, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                    lineNumber: 646,
                                    columnNumber: 13
                                }, this),
                                activeTab === "forum" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    transition: {
                                        duration: 0.2
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ForumTab, {
                                        posts: allForumPosts,
                                        onNew: ()=>isPremium ? setShowForumModal(true) : navigate("paywall"),
                                        onLike: toggleForumLike,
                                        forumReplyingTo: forumReplyingTo,
                                        setForumReplyingTo: setForumReplyingTo,
                                        forumReplyText: forumReplyText,
                                        setForumReplyText: setForumReplyText,
                                        onSubmitForumReply: (id)=>isPremium ? handleForumReplySubmit(id) : navigate("paywall")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 707,
                                        columnNumber: 15
                                    }, this)
                                }, "forum", false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                    lineNumber: 698,
                                    columnNumber: 13
                                }, this),
                                activeTab === "mentors" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    transition: {
                                        duration: 0.2
                                    },
                                    children: !isPremium ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PremiumLock, {
                                        featureName: t("communityMentors"),
                                        description: t("communityMentorsLockDesc"),
                                        onCta: ()=>navigate("paywall")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 735,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MentorsTab, {
                                        effectiveStreak: effectiveStreak,
                                        mentorProgress: mentorProgress,
                                        onContact: handleContactMentor
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 741,
                                        columnNumber: 17
                                    }, this)
                                }, "mentors", false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                    lineNumber: 727,
                                    columnNumber: 13
                                }, this),
                                activeTab === "psychologists" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    transition: {
                                        duration: 0.2
                                    },
                                    children: !isPremium ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PremiumLock, {
                                        featureName: t("communityPsychologists"),
                                        description: t("communityPsychologistsLockDesc"),
                                        onCta: ()=>navigate("paywall")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 759,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PsychologistsTab, {
                                        onReserve: setReservingPsy
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 765,
                                        columnNumber: 17
                                    }, this)
                                }, "psychologists", false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                    lineNumber: 751,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                            lineNumber: 644,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 643,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 637,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showTestimonialModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: ()=>setShowTestimonialModal(false),
                    className: "fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            y: "100%"
                        },
                        animate: {
                            y: 0
                        },
                        exit: {
                            y: "100%"
                        },
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        },
                        onClick: (e)=>e.stopPropagation(),
                        className: "glass-card-strong p-5 max-w-[430px] w-full rounded-t-3xl safe-bottom max-h-[90vh] overflow-y-auto custom-scroll",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-white font-[family-name:var(--font-poppins)]",
                                        children: t("communityMyTestimonial")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 794,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowTestimonialModal(false),
                                        className: "w-8 h-8 rounded-full glass-card flex items-center justify-center",
                                        "aria-label": t("close"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 16,
                                            className: "text-white/60"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                            lineNumber: 802,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 797,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 793,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-white/60 text-xs mb-2 block",
                                children: t("communityTitleLabel")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 806,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: tTitle,
                                onChange: (e)=>setTTitle(e.target.value),
                                placeholder: t("communityTestimonialTitlePlaceholder"),
                                maxLength: 80,
                                className: "w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00] mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 807,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-white/60 text-xs mb-2 block",
                                children: t("communityYourStory")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 815,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: tContent,
                                onChange: (e)=>setTContent(e.target.value),
                                placeholder: t("communityYourStoryPlaceholder"),
                                rows: 5,
                                maxLength: 1000,
                                className: "w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00] resize-none mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 816,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right text-white/30 text-xs mb-4",
                                children: [
                                    tContent.length,
                                    "/1000"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 824,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 cursor-pointer mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: tAnonymous,
                                        onChange: (e)=>setTAnonymous(e.target.checked),
                                        className: "w-4 h-4 accent-[#FF3B30]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 827,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-white text-sm font-medium",
                                                children: t("communityPublishAnonymous")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 834,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-white/40 text-xs",
                                                children: t("communityPublishAnonymousDesc")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 835,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 833,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 826,
                                columnNumber: 15
                            }, this),
                            anonymousMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl px-3 py-2 mb-4",
                                children: t("communityAnonymousModeActive")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 842,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleTestimonialSubmit,
                                disabled: !tTitle.trim() || !tContent.trim(),
                                className: `w-full py-4 rounded-2xl font-[family-name:var(--font-poppins)] font-semibold text-base transition-all ${tTitle.trim() && tContent.trim() ? "gradient-primary text-white glow-green active:scale-[0.98]" : "bg-white/5 text-white/30"}`,
                                children: t("communityPublishMyTestimonial")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 847,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 785,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                    lineNumber: 778,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 776,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showForumModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: ()=>setShowForumModal(false),
                    className: "fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            y: "100%"
                        },
                        animate: {
                            y: 0
                        },
                        exit: {
                            y: "100%"
                        },
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        },
                        onClick: (e)=>e.stopPropagation(),
                        className: "glass-card-strong p-5 max-w-[430px] w-full rounded-t-3xl safe-bottom max-h-[90vh] overflow-y-auto custom-scroll",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-white font-[family-name:var(--font-poppins)]",
                                        children: t("communityNewTopic")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 884,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowForumModal(false),
                                        className: "w-8 h-8 rounded-full glass-card flex items-center justify-center",
                                        "aria-label": t("close"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 16,
                                            className: "text-white/60"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                            lineNumber: 892,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 887,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 883,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-white/60 text-xs mb-2 block",
                                children: t("communityCategoryLabel")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 896,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2 mb-4",
                                children: FORUM_CATEGORIES.map((cat)=>{
                                    const active = fCategory === cat.key;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFCategory(cat.key),
                                        className: `p-3 rounded-2xl flex items-center gap-2 border transition-all ${active ? "border-transparent" : "glass-card border-transparent"}`,
                                        style: active ? {
                                            background: `${cat.color}25`,
                                            borderColor: cat.color
                                        } : {},
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl",
                                                children: cat.emoji
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 912,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold",
                                                style: {
                                                    color: active ? cat.color : "rgba(255,255,255,0.6)"
                                                },
                                                children: t(cat.labelKey)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 913,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, cat.key, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 901,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 897,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-white/60 text-xs mb-2 block",
                                children: t("communityTitleLabel")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 924,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: fTitle,
                                onChange: (e)=>setFTitle(e.target.value),
                                placeholder: t("communityForumTitlePlaceholder"),
                                maxLength: 80,
                                className: "w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00] mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 925,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-white/60 text-xs mb-2 block",
                                children: t("communityMessageLabel")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 933,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: fContent,
                                onChange: (e)=>setFContent(e.target.value),
                                placeholder: t("communityForumMessagePlaceholder"),
                                rows: 5,
                                maxLength: 1500,
                                className: "w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00] resize-none mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 934,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right text-white/30 text-xs mb-4",
                                children: [
                                    fContent.length,
                                    "/1500"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 942,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleForumSubmit,
                                disabled: !fTitle.trim() || !fContent.trim(),
                                className: `w-full py-4 rounded-2xl font-[family-name:var(--font-poppins)] font-semibold text-base transition-all ${fTitle.trim() && fContent.trim() ? "gradient-primary text-white glow-green active:scale-[0.98]" : "bg-white/5 text-white/30"}`,
                                children: t("communityPublishTopic")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 944,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 875,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                    lineNumber: 868,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 866,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$JourneyShareModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: journeyOpen,
                onClose: ()=>setJourneyOpen(false),
                data: journeyData
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 961,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: reservingPsy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: ()=>setReservingPsy(null),
                    className: "fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            y: "100%"
                        },
                        animate: {
                            y: 0
                        },
                        exit: {
                            y: "100%"
                        },
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        },
                        onClick: (e)=>e.stopPropagation(),
                        className: "glass-card-strong p-5 max-w-[430px] w-full rounded-t-3xl safe-bottom max-h-[90vh] overflow-y-auto custom-scroll",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-white font-[family-name:var(--font-poppins)]",
                                        children: t("communityReserveSession")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 984,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setReservingPsy(null),
                                        className: "w-8 h-8 rounded-full glass-card flex items-center justify-center",
                                        "aria-label": t("close"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 16,
                                            className: "text-white/60"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                            lineNumber: 992,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 987,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 983,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card p-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                                name: reservingPsy.displayName,
                                                size: 48
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 998,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white font-semibold text-sm truncate",
                                                                children: reservingPsy.displayName
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1001,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                                                size: 14,
                                                                className: "text-[#FFB020] shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1004,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1000,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/50 text-xs truncate",
                                                        children: reservingPsy.specialty
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1006,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 999,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 997,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5 text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/50",
                                                        children: t("communityLicense")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1011,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/80 font-mono",
                                                        children: reservingPsy.license
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1012,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1010,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/50",
                                                        children: t("communityCountry")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1015,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/80",
                                                        children: reservingPsy.country
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1016,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1014,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/50",
                                                        children: t("communityDuration")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1019,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/80",
                                                        children: t("communityDurationMinutes")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1020,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1018,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/50",
                                                        children: t("communityFormat")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1023,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white/80",
                                                        children: t("communitySecureVideo")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1024,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1022,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1009,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 996,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card p-4 mb-4 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/50 text-xs",
                                                children: t("communitySessionPrice")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1031,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold gradient-primary-text font-[family-name:var(--font-poppins)]",
                                                children: formatPrice(reservingPsy.sessionPrice, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1032,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1030,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/50 text-xs",
                                                children: t("communityRating")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1037,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                        size: 14,
                                                        className: "text-[#FBBF24] fill-[#FBBF24]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1039,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white font-bold text-sm",
                                                        children: reservingPsy.rating.toFixed(1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1040,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1038,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1036,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1029,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] text-white/40 bg-white/5 border border-white/10 rounded-xl px-3 py-2 mb-4",
                                children: t("communityPaymentInfo")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1047,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleReserveSession(reservingPsy),
                                className: "w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold glow-green active:scale-[0.98] transition-transform flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1055,
                                        columnNumber: 17
                                    }, this),
                                    t("communityConfirm"),
                                    " — ",
                                    formatPrice(reservingPsy.sessionPrice, currency)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1051,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 975,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                    lineNumber: 968,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 966,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
        lineNumber: 569,
        columnNumber: 5
    }, this);
}
// ========================================
// TAB 1: TÉMOIGNAGES
// ========================================
function TestimonialsTab({ testimonials, isPremium, anonymousMode, onWrite, onLike, replyingTo, setReplyingTo, replyText, setReplyText, onSubmitReply, onGoPremium }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const language = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const currency = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])((s)=>s.currency);
    const FREE_LIMIT = 5;
    const PAGE_SIZE = 6;
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [visibleCount, setVisibleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(PAGE_SIZE);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>setLoading(false), 550);
        return ()=>clearTimeout(timer);
    }, []);
    // Reset pagination whenever the filter changes (handler-based, no effect)
    const handleFilterChange = (f)=>{
        setFilter(f);
        setVisibleCount(PAGE_SIZE);
    };
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return testimonials.filter((tm)=>{
            if (filter === "verified") return tm.isVerified;
            if (filter === "100plus") return tm.streakDays >= 100;
            if (filter === "365") return tm.streakDays >= 365;
            return true;
        });
    }, [
        testimonials,
        filter
    ]);
    const visible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>filtered.slice(0, visibleCount), [
        filtered,
        visibleCount
    ]);
    const remaining = filtered.length - visible.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onWrite,
                className: "w-full mb-4 py-3.5 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold flex items-center justify-center gap-2 glow-green active:scale-[0.98] transition-transform",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1124,
                        columnNumber: 9
                    }, this),
                    t("communityWriteTestimonial")
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 overflow-x-auto no-scrollbar mb-4",
                children: TESTIMONIAL_FILTERS.map((f)=>{
                    const active = filter === f.key;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleFilterChange(f.key),
                        className: `px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${active ? "gradient-primary text-white" : "glass-card text-white/60"}`,
                        children: f.key === "365" ? t("communityFilter365Days") : t(f.labelKey)
                    }, f.key, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1132,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1128,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$Skeletons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ListSkeleton"], {
                count: 3
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1148,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containerVariants"],
                initial: "hidden",
                animate: "visible",
                className: "space-y-3",
                children: visible.map((testimonial, idx)=>{
                    const isLocked = !isPremium && idx >= FREE_LIMIT;
                    // Seed testimonials store translation keys in `title` / `content`.
                    // User-submitted testimonials store the raw text directly.
                    const isSeed = testimonial.id.startsWith("seed-t-");
                    const titleText = isSeed ? t(testimonial.title) : testimonial.title;
                    const bodyText = isSeed ? SEED_AMOUNT_FCFA[testimonial.id] !== undefined ? t(testimonial.content, {
                        amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$currency$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(SEED_AMOUNT_FCFA[testimonial.id], currency)
                    }) : t(testimonial.content) : testimonial.content;
                    const countryName = isSeed ? getCountryName(testimonial.authorCountry, t) : testimonial.authorCountry;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemVariants"],
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `glass-card card-hover p-4 ${isLocked ? "blur-md pointer-events-none select-none" : ""}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-3 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                                name: testimonial.isAnonymous ? t("communityAnonymous") : testimonial.authorName,
                                                size: 44
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1181,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1.5 flex-wrap",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white font-semibold text-sm",
                                                                children: testimonial.isAnonymous ? t("communityAnonymous") : testimonial.authorName
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1184,
                                                                columnNumber: 23
                                                            }, this),
                                                            testimonial.isVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                                                size: 14,
                                                                className: "text-[#FFB020]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1188,
                                                                columnNumber: 25
                                                            }, this),
                                                            testimonial.isMine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-2 py-0.5 rounded-full bg-[#FF3B30]/20 text-[#FF3B30] text-[10px] font-bold",
                                                                children: t("communityMyTestimonial")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1191,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1183,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-white/40 text-xs mt-0.5 flex-wrap",
                                                        children: [
                                                            !testimonial.isAnonymous && testimonial.authorAge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    testimonial.authorAge,
                                                                    " ",
                                                                    t("yearsOld")
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1198,
                                                                columnNumber: 25
                                                            }, this),
                                                            !testimonial.isAnonymous && countryName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-0.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                                        size: 10
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                        lineNumber: 1202,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    countryName
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1201,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-0.5 text-[#F59E0B]",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                        size: 11
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                        lineNumber: 1207,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    testimonial.streakDays,
                                                                    " ",
                                                                    t("dayShort")
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1206,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1196,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1182,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1180,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-bold text-base font-[family-name:var(--font-poppins)] mb-1.5",
                                        children: titleText
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1215,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/70 text-sm leading-relaxed mb-3",
                                        children: bodyText
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1218,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 pt-3 border-t border-white/5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onLike(testimonial.id),
                                                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${testimonial.liked ? "bg-[#FF3B30]/20 text-[#FF3B30]" : "glass-pill text-white/60"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                        size: 14,
                                                        className: testimonial.liked ? "fill-[#FF3B30]" : ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1230,
                                                        columnNumber: 21
                                                    }, this),
                                                    testimonial.likes
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1222,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setReplyingTo(replyingTo === testimonial.id ? null : testimonial.id),
                                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-white/60 text-xs font-medium active:scale-95 transition-transform",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1237,
                                                        columnNumber: 21
                                                    }, this),
                                                    testimonial.replies.length
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1233,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto text-white/30 text-xs",
                                                children: formatRelative(testimonial.createdAt, t, language)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1240,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1221,
                                        columnNumber: 17
                                    }, this),
                                    testimonial.replies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 space-y-2 pl-2 border-l-2 border-white/5",
                                        children: testimonial.replies.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                                        name: r.authorName,
                                                        size: 28
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1248,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-white text-xs font-semibold",
                                                                        children: r.authorName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                        lineNumber: 1251,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    r.isMentor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-1.5 py-0.5 rounded-full bg-[#FFC94D]/20 text-[#FFC94D] text-[9px] font-bold",
                                                                        children: t("mentorBadge")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                        lineNumber: 1253,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    r.isPsychologist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-1.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] text-[9px] font-bold",
                                                                        children: t("psyBadge")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                        lineNumber: 1258,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1250,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-white/70 text-xs leading-relaxed",
                                                                children: r.content
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1263,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1249,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, r.id, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1247,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1245,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: replyingTo === testimonial.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                height: 0
                                            },
                                            animate: {
                                                opacity: 1,
                                                height: "auto"
                                            },
                                            exit: {
                                                opacity: 0,
                                                height: 0
                                            },
                                            className: "overflow-hidden mt-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1.5 mb-2 flex-wrap",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white/40 text-[10px] mr-1",
                                                            children: t("communityQuickReplies")
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                            lineNumber: 1281,
                                                            columnNumber: 25
                                                        }, this),
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$search$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUICK_REPLIES"].map((qr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setReplyText(qr),
                                                                className: "px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] hover:text-white hover:border-white/20 active:scale-95 transition-all",
                                                                children: qr
                                                            }, qr, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1283,
                                                                columnNumber: 27
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                    lineNumber: 1280,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: replyText,
                                                            onChange: (e)=>setReplyText(e.target.value),
                                                            placeholder: t("communityReplyPlaceholder"),
                                                            className: "flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00]",
                                                            onKeyDown: (e)=>{
                                                                if (e.key === "Enter") onSubmitReply(testimonial.id);
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                            lineNumber: 1293,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>onSubmitReply(testimonial.id),
                                                            disabled: !replyText.trim(),
                                                            className: `w-9 h-9 rounded-xl flex items-center justify-center transition-all ${replyText.trim() ? "gradient-primary text-white active:scale-95" : "bg-white/5 text-white/30"}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1311,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                            lineNumber: 1302,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                    lineNumber: 1292,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                            lineNumber: 1273,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1271,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1178,
                                columnNumber: 15
                            }, this),
                            isLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex flex-col items-center justify-center text-center rounded-3xl bg-[#0B0704]/40",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-2 glow-green",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            size: 20,
                                            className: "text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                            lineNumber: 1323,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1322,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white font-semibold text-sm mb-1 font-[family-name:var(--font-poppins)]",
                                        children: t("communityUnlockWithPremium")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1325,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/50 text-xs mb-3 max-w-[200px]",
                                        children: t("communityUnlockTestimonialsDesc")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1328,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onGoPremium,
                                        className: "px-4 py-2 rounded-full gradient-primary text-white text-xs font-semibold active:scale-95 transition-transform",
                                        children: t("upgrade")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1331,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1321,
                                columnNumber: 17
                            }, this)
                        ]
                    }, testimonial.id, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1173,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1150,
                columnNumber: 7
            }, this),
            remaining > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mt-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                    whileTap: {
                        scale: 0.97
                    },
                    onClick: ()=>setVisibleCount((c)=>c + PAGE_SIZE),
                    className: "px-5 py-2.5 rounded-full glass-card text-white/80 hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 border border-white/10 hover:border-[#FF6B00]/40 transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            size: 14
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                            lineNumber: 1354,
                            columnNumber: 13
                        }, this),
                        t("communityLoadMore", {
                            n: remaining
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                    lineNumber: 1349,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1348,
                columnNumber: 9
            }, this),
            !isPremium && filtered.length > FREE_LIMIT && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-white/40 text-xs",
                    children: t("communityMoreTestimonialsPremium", {
                        count: filtered.length - FREE_LIMIT
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                    lineNumber: 1362,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1361,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
        lineNumber: 1119,
        columnNumber: 5
    }, this);
}
// ========================================
// TAB 2: FORUM
// ========================================
function ForumTab({ posts, onNew, onLike, forumReplyingTo, setForumReplyingTo, forumReplyText, setForumReplyText, onSubmitForumReply }) {
    const [sort, setSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("recent");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const language = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>setLoading(false), 550);
        return ()=>clearTimeout(timer);
    }, []);
    const sorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const arr = [
            ...posts
        ];
        if (sort === "recent") {
            arr.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sort === "popular") {
            arr.sort((a, b)=>b.likes - a.likes);
        } else {
            // unanswered first, then by likes
            arr.sort((a, b)=>{
                const aUn = a.replies.length === 0 ? 0 : 1;
                const bUn = b.replies.length === 0 ? 0 : 1;
                if (aUn !== bUn) return aUn - bUn;
                return b.likes - a.likes;
            });
        }
        return arr;
    }, [
        posts,
        sort
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onNew,
                className: "w-full mb-4 py-3.5 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold flex items-center justify-center gap-2 glow-green active:scale-[0.98] transition-transform",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1422,
                        columnNumber: 9
                    }, this),
                    t("communityNewTopic")
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1418,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 overflow-x-auto no-scrollbar mb-3",
                children: FORUM_SORTS.map((s)=>{
                    const Icon = s.icon;
                    const active = sort === s.key;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSort(s.key),
                        className: `flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${active ? "gradient-primary text-white" : "glass-card text-white/60"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                size: 11
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1438,
                                columnNumber: 15
                            }, this),
                            t(s.labelKey)
                        ]
                    }, s.key, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1431,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1426,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 overflow-x-auto no-scrollbar mb-4",
                children: FORUM_CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap",
                        style: {
                            background: `${cat.color}20`,
                            color: cat.color
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: cat.emoji
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1452,
                                columnNumber: 13
                            }, this),
                            t(cat.labelKey)
                        ]
                    }, cat.key, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1447,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1445,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$Skeletons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ListSkeleton"], {
                count: 3
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1459,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containerVariants"],
                initial: "hidden",
                animate: "visible",
                className: "space-y-3",
                children: sorted.map((post, idx)=>{
                    const cat = CATEGORY_BY_KEY[post.category];
                    // Seed forum posts (id starts with "seed-f-") store translation keys
                    // in `title` / `content` and `replies[].content`. User-submitted
                    // posts store raw text directly. We resolve seed posts through `t()`
                    // at render time so they follow the user's UI language.
                    const isSeedPost = post.id.startsWith("seed-f-");
                    const postTitle = isSeedPost ? t(post.title) : post.title;
                    const postContent = isSeedPost ? t(post.content) : post.content;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemVariants"],
                        custom: idx,
                        className: "glass-card card-hover p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                        name: post.authorName,
                                        size: 32
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1484,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white text-xs font-semibold truncate",
                                                        children: post.authorName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1487,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-0.5 text-[#F59E0B] text-[10px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                size: 10
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1489,
                                                                columnNumber: 23
                                                            }, this),
                                                            post.authorStreak,
                                                            t("dayShort")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1488,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1486,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/40 text-[10px]",
                                                children: formatRelative(post.createdAt, t, language)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1493,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1485,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-2 py-0.5 rounded-full text-[10px] font-bold",
                                        style: {
                                            background: `${cat.color}25`,
                                            color: cat.color
                                        },
                                        children: [
                                            cat.emoji,
                                            " ",
                                            t(cat.labelKey)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1495,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1483,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-white font-bold text-sm font-[family-name:var(--font-poppins)] mb-1",
                                children: postTitle
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1503,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/70 text-sm leading-relaxed mb-3 line-clamp-4",
                                children: postContent
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1506,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 pt-2 border-t border-white/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onLike(post.id),
                                        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${post.liked ? "bg-[#FF3B30]/20 text-[#FF3B30]" : "glass-pill text-white/60"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                size: 13,
                                                className: post.liked ? "fill-[#FF3B30]" : ""
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1517,
                                                columnNumber: 19
                                            }, this),
                                            post.likes
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1509,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setForumReplyingTo(forumReplyingTo === post.id ? null : post.id),
                                        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${forumReplyingTo === post.id ? "bg-[#F59E0B]/20 text-[#F59E0B]" : "glass-pill text-white/60"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1530,
                                                columnNumber: 19
                                            }, this),
                                            post.replies.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1520,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1508,
                                columnNumber: 15
                            }, this),
                            post.replies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 space-y-2 pl-2 border-l-2 border-white/5",
                                children: post.replies.map((r)=>{
                                    // Seed replies (id starts with "seed-f-") store their
                                    // body as a translation key in `content`.
                                    const isSeedReply = r.id.startsWith("seed-f-");
                                    const replyContent = isSeedReply ? t(r.content) : r.content;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                                name: r.authorName,
                                                size: 24
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1544,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white text-[11px] font-semibold",
                                                                children: r.authorName
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1547,
                                                                columnNumber: 27
                                                            }, this),
                                                            r.isMentor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-1.5 py-0.5 rounded-full bg-[#FFC94D]/20 text-[#FFC94D] text-[9px] font-bold",
                                                                children: t("mentorBadge")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1549,
                                                                columnNumber: 29
                                                            }, this),
                                                            r.isPsychologist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-1.5 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] text-[9px] font-bold",
                                                                children: t("psyBadge")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1554,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1546,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/60 text-xs leading-relaxed",
                                                        children: replyContent
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1559,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1545,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, r.id, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1543,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1536,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: forumReplyingTo === post.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    animate: {
                                        opacity: 1,
                                        height: "auto"
                                    },
                                    exit: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    className: "overflow-hidden mt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1.5 mb-2 flex-wrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white/40 text-[10px] mr-1",
                                                    children: t("communityQuickReplies")
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                    lineNumber: 1577,
                                                    columnNumber: 23
                                                }, this),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$search$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUICK_REPLIES"].map((qr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setForumReplyText(qr),
                                                        className: "px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] hover:text-white hover:border-white/20 active:scale-95 transition-all",
                                                        children: qr
                                                    }, qr, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1579,
                                                        columnNumber: 25
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                            lineNumber: 1576,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: forumReplyText,
                                                    onChange: (e)=>setForumReplyText(e.target.value),
                                                    placeholder: t("communityForumReplyPlaceholder"),
                                                    className: "flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00]",
                                                    onKeyDown: (e)=>{
                                                        if (e.key === "Enter") onSubmitForumReply(post.id);
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                    lineNumber: 1589,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onSubmitForumReply(post.id),
                                                    disabled: !forumReplyText.trim(),
                                                    className: `w-9 h-9 rounded-xl flex items-center justify-center transition-all ${forumReplyText.trim() ? "gradient-primary text-white active:scale-95" : "bg-white/5 text-white/30"}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1607,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                    lineNumber: 1598,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                            lineNumber: 1588,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                    lineNumber: 1570,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1568,
                                columnNumber: 15
                            }, this)
                        ]
                    }, post.id, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1477,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1461,
                columnNumber: 7
            }, this),
            posts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$zerobet$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                variant: "community",
                title: t("communityNoTopicsTitle"),
                description: t("communityNoTopicsDesc"),
                ctaLabel: t("communityStartDiscussion"),
                onCta: onNew
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1620,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
        lineNumber: 1417,
        columnNumber: 5
    }, this);
}
// ========================================
// TAB 3: MENTORS
// ========================================
function MentorsTab({ effectiveStreak, mentorProgress, onContact }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const eligible = effectiveStreak >= 90;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "glass-card-strong p-5 mb-5 relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FFC94D]/20 blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1653,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-2xl gradient-success flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                            size: 20,
                                            className: "text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                            lineNumber: 1657,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1656,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-white font-bold font-[family-name:var(--font-poppins)]",
                                                children: t("communityBecomeMentor")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1660,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/50 text-xs",
                                                children: t("communityBecomeMentorDesc")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1663,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1659,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1655,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                        size: 14,
                                        className: "text-[#FBBF24]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1668,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/80 text-xs",
                                        children: [
                                            t("communityMentorObjective"),
                                            ": ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-bold",
                                                children: t("communityMentorObjectiveDays")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1670,
                                                columnNumber: 48
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1669,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1667,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-xs mb-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/60",
                                        children: t("communityYourProgress")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1675,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-bold",
                                        children: [
                                            effectiveStreak,
                                            " / 90 ",
                                            t("days")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1676,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1674,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-2.5 rounded-full bg-white/5 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        width: 0
                                    },
                                    animate: {
                                        width: `${mentorProgress}%`
                                    },
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20
                                    },
                                    className: "h-full rounded-full gradient-success"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                    lineNumber: 1681,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1680,
                                columnNumber: 11
                            }, this),
                            eligible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 p-3 rounded-2xl bg-[#FFC94D]/10 border border-[#FFC94D]/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[#FFC94D] text-sm font-semibold flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1692,
                                                columnNumber: 17
                                            }, this),
                                            t("communityEligibleMentor")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1691,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onContact(t("communityZerobetTeam")),
                                        className: "mt-2 w-full py-2.5 rounded-xl gradient-success text-white text-sm font-semibold active:scale-95 transition-transform",
                                        children: t("communityApplyNow")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1695,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1690,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-white/40 text-xs",
                                children: t("communityDaysUntilMentor", {
                                    days: 90 - effectiveStreak
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1703,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1654,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1648,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 px-1",
                children: t("communityVerifiedMentors")
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1710,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containerVariants"],
                initial: "hidden",
                animate: "visible",
                className: "space-y-3",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$community$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SEED_MENTORS"].map((m, idx)=>{
                    const online = MENTOR_ONLINE[m.displayName] ?? false;
                    const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$search$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResponseTime"])(m.sessionsCount);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemVariants"],
                        custom: idx,
                        className: "glass-card card-hover p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                                name: m.displayName,
                                                size: 52
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1732,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0B0704] ${online ? "bg-[#FFC94D]" : "bg-white/30"}`,
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1733,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1731,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white font-bold text-sm",
                                                        children: m.displayName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1742,
                                                        columnNumber: 19
                                                    }, this),
                                                    m.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                                        size: 14,
                                                        className: "text-[#FFB020]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1743,
                                                        columnNumber: 34
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${online ? "bg-[#FFC94D]/15 text-[#FFC94D]" : "bg-white/5 text-white/40"}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `w-1.5 h-1.5 rounded-full ${online ? "bg-[#FFC94D]" : "bg-white/40"}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1751,
                                                                columnNumber: 21
                                                            }, this),
                                                            online ? t("communityOnline") : t("communityOffline")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1744,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1741,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[#F59E0B] text-xs font-medium",
                                                children: m.specialty
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1759,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-white/40 text-[11px] mt-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                                size: 10
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1762,
                                                                columnNumber: 21
                                                            }, this),
                                                            m.country
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1761,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-0.5 text-[#F59E0B]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                size: 10
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1766,
                                                                columnNumber: 21
                                                            }, this),
                                                            m.daysClean,
                                                            " ",
                                                            t("dayShort"),
                                                            " ",
                                                            t("cleanShort")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1765,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1760,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1740,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1730,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/70 text-xs leading-relaxed mb-3",
                                children: m.bio
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1773,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3 flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 px-2 py-1 rounded-full bg-[#FFB020]/10 text-[#FFB020] text-[10px] font-semibold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                size: 10
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1777,
                                                columnNumber: 17
                                            }, this),
                                            response.label
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1776,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-white/60 text-[10px] font-semibold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                size: 10
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1781,
                                                columnNumber: 17
                                            }, this),
                                            m.sessionsCount,
                                            " ",
                                            t("sessionsLabel")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1780,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1775,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StarRating, {
                                        rating: m.rating
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1787,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onContact(m.displayName),
                                        className: `px-4 py-2 rounded-xl text-white text-xs font-semibold active:scale-95 transition-transform ${online ? "gradient-primary glow-green" : "bg-white/10"}`,
                                        children: t("communityContact")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1788,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1786,
                                columnNumber: 13
                            }, this)
                        ]
                    }, m.displayName, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1724,
                        columnNumber: 11
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1714,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
        lineNumber: 1646,
        columnNumber: 5
    }, this);
}
// ========================================
// TAB 4: PSYCHOLOGUES
// ========================================
function PsychologistsTab({ onReserve }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useT"])();
    const currency = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])((s)=>s.currency);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "glass-card p-4 mb-4 flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-12 h-12 rounded-2xl bg-[#FFD166]/20 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                            size: 22,
                            className: "text-[#FFD166]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                            lineNumber: 1823,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1822,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-white font-bold text-sm font-[family-name:var(--font-poppins)]",
                                children: t("communityCertifiedSessions")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1826,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/50 text-xs leading-snug",
                                children: t("communityPsychologistsDesc")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1829,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1825,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1817,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containerVariants"],
                initial: "hidden",
                animate: "visible",
                className: "space-y-3",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$community$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SEED_PSYCHOLOGISTS"].map((p, idx)=>{
                    const online = PSY_ONLINE[p.license] ?? false;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemVariants"],
                        custom: idx,
                        className: "glass-card card-hover p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Avatar, {
                                                name: p.displayName,
                                                size: 52
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1852,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0B0704] ${online ? "bg-[#FFC94D]" : "bg-white/30"}`,
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1853,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1851,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white font-bold text-sm",
                                                        children: p.displayName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1862,
                                                        columnNumber: 19
                                                    }, this),
                                                    p.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                                        size: 14,
                                                        className: "text-[#FFB020]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1863,
                                                        columnNumber: 34
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-2 py-0.5 rounded-full bg-[#FFD166]/20 text-[#FFD166] text-[9px] font-bold flex items-center gap-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                                                size: 9
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1865,
                                                                columnNumber: 21
                                                            }, this),
                                                            t("certifiedBadge")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1864,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${online ? "bg-[#FFC94D]/15 text-[#FFC94D]" : "bg-white/5 text-white/40"}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `w-1.5 h-1.5 rounded-full ${online ? "bg-[#FFC94D]" : "bg-white/40"}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1875,
                                                                columnNumber: 21
                                                            }, this),
                                                            online ? t("communityOnline") : t("communityOffline")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1868,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1861,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white text-xs font-medium truncate",
                                                children: p.fullName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1883,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[#FFD166] text-xs",
                                                children: p.specialty
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1884,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-white/40 text-[11px] mt-0.5 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                                size: 10
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                                lineNumber: 1887,
                                                                columnNumber: 21
                                                            }, this),
                                                            p.country
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1886,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono",
                                                        children: p.license
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                        lineNumber: 1890,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1885,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1860,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1850,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/70 text-xs leading-relaxed mb-3",
                                children: p.bio
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1895,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StarRating, {
                                        rating: p.rating
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1898,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/40 text-xs flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                size: 11
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1900,
                                                columnNumber: 17
                                            }, this),
                                            p.sessionsCount,
                                            " ",
                                            t("sessionsLabel")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1899,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1897,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-white/40 text-[10px]",
                                                children: t("communitySessionTariff")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1907,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold gradient-primary-text font-[family-name:var(--font-poppins)]",
                                                children: formatPrice(p.sessionPrice, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1908,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1906,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onReserve(p),
                                        className: `flex-1 max-w-[180px] py-3 rounded-2xl text-white text-sm font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform ${online ? "gradient-primary glow-green" : "bg-white/10"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                                lineNumber: 1918,
                                                columnNumber: 17
                                            }, this),
                                            t("communityReserve")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                        lineNumber: 1912,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                                lineNumber: 1905,
                                columnNumber: 13
                            }, this)
                        ]
                    }, p.license, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                        lineNumber: 1844,
                        columnNumber: 11
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
                lineNumber: 1835,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityScreen.tsx",
        lineNumber: 1816,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/zerobet/screens/CommunityScreen.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/zerobet/screens/CommunityScreen.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=src_740631db._.js.map