module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/sound.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SoundManager",
    ()=>SoundManager,
    "configureSoundFromStore",
    ()=>configureSoundFromStore,
    "sound",
    ()=>sound
]);
"use client";
// Lazily-injected store accessor. Set by `configureSoundFromStore`.
let storeGetter = null;
function configureSoundFromStore(getter) {
    storeGetter = getter;
}
function readStore() {
    try {
        return storeGetter ? storeGetter() : null;
    } catch  {
        return null;
    }
}
class SoundManager {
    context = null;
    masterGain = null;
    enabled = true;
    volume = 0.5;
    initialized = false;
    /**
   * Initialize the AudioContext. Must be called from a user gesture
   * (click/touch) at least once due to browser autoplay policies.
   */ init() {
        if (this.initialized && this.context) {
            // Resume in case the context was suspended (e.g. after tab switch)
            if (this.context.state === "suspended") {
                void this.context.resume();
            }
            return;
        }
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const AudioCtx = undefined;
    }
    /**
   * Sync enabled flag + volume from the store (called by configureSoundFromStore
   * automatically on each play via readStore).
   */ setEnabled(v) {
        this.enabled = v;
    }
    setVolume(v) {
        this.volume = Math.max(0, Math.min(1, v));
        if (this.masterGain && this.context) {
            this.masterGain.gain.setTargetAtTime(this.volume, this.context.currentTime, 0.01);
        }
    }
    get effectiveEnabled() {
        const store = readStore();
        if (store) {
            this.enabled = store.soundEnabled;
            this.volume = store.volume;
            if (this.masterGain && this.context) {
                this.masterGain.gain.setTargetAtTime(this.volume, this.context.currentTime, 0.01);
            }
        }
        return this.enabled;
    }
    get effectiveVolume() {
        const store = readStore();
        if (store) {
            this.volume = store.volume;
        }
        return this.volume;
    }
    /** Play a single tone with an ADSR-like envelope. */ playTone({ frequency, duration, type = "sine", volumeMultiplier = 1, delay = 0, sweepTo }) {
        if (!this.context || !this.masterGain) return;
        if (!this.effectiveEnabled) return;
        const now = this.context.currentTime + delay;
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, now);
        if (sweepTo) {
            osc.frequency.exponentialRampToValueAtTime(Math.max(1, sweepTo), now + duration);
        }
        const vol = this.effectiveVolume * volumeMultiplier;
        // Envelope: quick attack, exponential release
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + duration + 0.05);
    }
    /** Short click — 800Hz, 50ms, triangle wave. */ playClick() {
        this.init();
        this.playTone({
            frequency: 800,
            duration: 0.05,
            type: "triangle",
            volumeMultiplier: 0.6
        });
    }
    /** Success chime — ascending C-E-G major triad. */ playSuccess() {
        this.init();
        this.playTone({
            frequency: 523.25,
            duration: 0.15,
            type: "sine",
            volumeMultiplier: 0.5,
            delay: 0
        }); // C5
        this.playTone({
            frequency: 659.25,
            duration: 0.15,
            type: "sine",
            volumeMultiplier: 0.5,
            delay: 0.08
        }); // E5
        this.playTone({
            frequency: 783.99,
            duration: 0.25,
            type: "sine",
            volumeMultiplier: 0.55,
            delay: 0.16
        }); // G5
    }
    /** Achievement fanfare — C-E-G-C ascending with a slight delay between notes. */ playAchievement() {
        this.init();
        this.playTone({
            frequency: 523.25,
            duration: 0.18,
            type: "triangle",
            volumeMultiplier: 0.55,
            delay: 0
        }); // C5
        this.playTone({
            frequency: 659.25,
            duration: 0.18,
            type: "triangle",
            volumeMultiplier: 0.55,
            delay: 0.12
        }); // E5
        this.playTone({
            frequency: 783.99,
            duration: 0.18,
            type: "triangle",
            volumeMultiplier: 0.55,
            delay: 0.24
        }); // G5
        this.playTone({
            frequency: 1046.5,
            duration: 0.4,
            type: "triangle",
            volumeMultiplier: 0.6,
            delay: 0.36
        }); // C6
        // Sparkle layer
        this.playTone({
            frequency: 1568,
            duration: 0.15,
            type: "sine",
            volumeMultiplier: 0.3,
            delay: 0.42
        });
    }
    /** Error buzz — 200Hz, 200ms, sawtooth. */ playError() {
        this.init();
        this.playTone({
            frequency: 200,
            duration: 0.2,
            type: "sawtooth",
            volumeMultiplier: 0.4
        });
    }
    /** Pop sound for notifications — 600Hz, 80ms, sine. */ playPop() {
        this.init();
        this.playTone({
            frequency: 600,
            duration: 0.08,
            type: "sine",
            volumeMultiplier: 0.5,
            sweepTo: 900
        });
    }
    /** Whoosh for transitions — frequency sweep 1200Hz → 200Hz. */ playWhoosh() {
        this.init();
        this.playTone({
            frequency: 1200,
            duration: 0.35,
            type: "sine",
            volumeMultiplier: 0.35,
            sweepTo: 200
        });
    }
    /** Level up — ascending notes with a small reverb tail. */ playLevelUp() {
        this.init();
        // Ascending arpeggio
        this.playTone({
            frequency: 392,
            duration: 0.12,
            type: "triangle",
            volumeMultiplier: 0.5,
            delay: 0
        }); // G4
        this.playTone({
            frequency: 523.25,
            duration: 0.12,
            type: "triangle",
            volumeMultiplier: 0.5,
            delay: 0.1
        }); // C5
        this.playTone({
            frequency: 659.25,
            duration: 0.12,
            type: "triangle",
            volumeMultiplier: 0.5,
            delay: 0.2
        }); // E5
        this.playTone({
            frequency: 783.99,
            duration: 0.12,
            type: "triangle",
            volumeMultiplier: 0.55,
            delay: 0.3
        }); // G5
        this.playTone({
            frequency: 1046.5,
            duration: 0.45,
            type: "triangle",
            volumeMultiplier: 0.6,
            delay: 0.4
        }); // C6
        // Reverb-ish sparkle
        this.playTone({
            frequency: 1318.5,
            duration: 0.3,
            type: "sine",
            volumeMultiplier: 0.25,
            delay: 0.5
        });
        this.playTone({
            frequency: 1568,
            duration: 0.25,
            type: "sine",
            volumeMultiplier: 0.2,
            delay: 0.6
        });
    }
    /** XP coin — high pitch ding. */ playCoin() {
        this.init();
        this.playTone({
            frequency: 988,
            duration: 0.07,
            type: "sine",
            volumeMultiplier: 0.4,
            delay: 0
        }); // B5
        this.playTone({
            frequency: 1318.5,
            duration: 0.12,
            type: "sine",
            volumeMultiplier: 0.45,
            delay: 0.05
        }); // E6
    }
}
const sound = new SoundManager();
}),
"[project]/src/lib/haptics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HapticsManager",
    ()=>HapticsManager,
    "configureHapticsFromStore",
    ()=>configureHapticsFromStore,
    "haptics",
    ()=>haptics
]);
"use client";
let storeGetter = null;
function configureHapticsFromStore(getter) {
    storeGetter = getter;
}
function readStore() {
    try {
        return storeGetter ? storeGetter() : null;
    } catch  {
        return null;
    }
}
function isVibrationSupported() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
class HapticsManager {
    enabled = true;
    get effectiveEnabled() {
        const store = readStore();
        if (store) this.enabled = store.hapticsEnabled;
        return this.enabled;
    }
    setEnabled(v) {
        this.enabled = v;
    }
    vibrate(pattern) {
        if (!this.effectiveEnabled) return;
        if (!isVibrationSupported()) return;
        try {
            window.navigator.vibrate(pattern);
        } catch  {
        /* noop */ }
    }
    /** Light tap — 10ms. */ light() {
        this.vibrate(10);
    }
    /** Medium tap — 20ms. */ medium() {
        this.vibrate(20);
    }
    /** Heavy thump — 50ms. */ heavy() {
        this.vibrate(50);
    }
    /** Success pattern — short, pause, slightly longer. */ success() {
        this.vibrate([
            10,
            50,
            20
        ]);
    }
    /** Error pattern — three equal thumps. */ error() {
        this.vibrate([
            50,
            50,
            50
        ]);
    }
    /** Warning pattern — four short bursts. */ warning() {
        this.vibrate([
            30,
            30,
            30,
            30
        ]);
    }
    /** Selection tick — 5ms. */ selection() {
        this.vibrate(5);
    }
    /** Achievement fanfare pattern. */ achievement() {
        this.vibrate([
            20,
            50,
            20,
            50,
            50
        ]);
    }
}
const haptics = new HapticsManager();
}),
"[project]/src/lib/data/relapse-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PHASE_META",
    ()=>PHASE_META,
    "PROTOCOL_STEPS",
    ()=>PROTOCOL_STEPS,
    "RELAPSE_QUOTES",
    ()=>RELAPSE_QUOTES
]);
const PROTOCOL_STEPS = [
    // Phase 1: Immediate (first 5 minutes)
    {
        id: "step-1",
        phase: "immediate",
        titleKey: "relapseStep1Title",
        descKey: "relapseStep1Desc",
        actionKey: "relapseStep1Action",
        duration: "3 min"
    },
    {
        id: "step-2",
        phase: "immediate",
        titleKey: "relapseStep2Title",
        descKey: "relapseStep2Desc",
        actionKey: "relapseStep2Action",
        duration: "2 min"
    },
    // Phase 2: First hour
    {
        id: "step-3",
        phase: "hour1",
        titleKey: "relapseStep3Title",
        descKey: "relapseStep3Desc",
        actionKey: "relapseStep3Action",
        duration: "5 min"
    },
    {
        id: "step-4",
        phase: "hour1",
        titleKey: "relapseStep4Title",
        descKey: "relapseStep4Desc",
        actionKey: "relapseStep4Action",
        duration: "10 min"
    },
    // Phase 3: 6 hours later
    {
        id: "step-5",
        phase: "hour6",
        titleKey: "relapseStep5Title",
        descKey: "relapseStep5Desc",
        actionKey: "relapseStep5Action",
        duration: "30 min"
    },
    {
        id: "step-6",
        phase: "hour6",
        titleKey: "relapseStep6Title",
        descKey: "relapseStep6Desc",
        actionKey: "relapseStep6Action",
        duration: "5 min"
    },
    // Phase 4: 24 hours later
    {
        id: "step-7",
        phase: "hour24",
        titleKey: "relapseStep7Title",
        descKey: "relapseStep7Desc",
        actionKey: "relapseStep7Action",
        duration: "10 min"
    },
    {
        id: "step-8",
        phase: "hour24",
        titleKey: "relapseStep8Title",
        descKey: "relapseStep8Desc",
        actionKey: "relapseStep8Action",
        duration: "2 min"
    }
];
const RELAPSE_QUOTES = [
    {
        textKey: "relapseQuote1Text",
        authorKey: "relapseQuote1Author"
    },
    {
        textKey: "relapseQuote2Text",
        authorKey: "relapseQuote2Author"
    },
    {
        textKey: "relapseQuote3Text",
        authorKey: "relapseQuote3Author"
    },
    {
        textKey: "relapseQuote4Text",
        authorKey: "relapseQuote4Author"
    }
];
const PHASE_META = {
    immediate: {
        labelKey: "relapsePhaseImmediate",
        timeframe: "0-5 min",
        color: "#FF3B30",
        emoji: "🚨"
    },
    hour1: {
        labelKey: "relapsePhaseHour1",
        timeframe: "5-60 min",
        color: "#F59E0B",
        emoji: "⚡"
    },
    hour6: {
        labelKey: "relapsePhaseHour6",
        timeframe: "1-6h",
        color: "#FBBF24",
        emoji: "🌱"
    },
    hour24: {
        labelKey: "relapsePhaseHour24",
        timeframe: "6-24h",
        color: "#4ADE80",
        emoji: "💪"
    }
};
}),
"[project]/src/store/zerobet-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DAILY_CHALLENGE_XP",
    ()=>DAILY_CHALLENGE_XP,
    "QUEST_LABELS",
    ()=>QUEST_LABELS,
    "QUEST_REWARDS",
    ()=>QUEST_REWARDS,
    "computeLevel",
    ()=>computeLevel,
    "getMultiplierTier",
    ()=>getMultiplierTier,
    "getStreakMultiplier",
    ()=>getStreakMultiplier,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/haptics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/relapse-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const QUEST_REWARDS = {
    checkin: 50,
    journal: 30,
    meditation: 40,
    streak: 100,
    article: 20
};
const QUEST_LABELS = {
    checkin: "Check-in",
    journal: "Journal",
    meditation: "Méditation",
    streak: "Sans pari",
    article: "Article"
};
const DAILY_CHALLENGE_XP = 15;
function getStreakMultiplier(streakDays) {
    if (streakDays >= 90) return 3.0;
    if (streakDays >= 30) return 2.0;
    if (streakDays >= 14) return 1.5;
    if (streakDays >= 7) return 1.2;
    return 1.0;
}
function getMultiplierTier(streakDays) {
    if (streakDays >= 90) return {
        multiplier: 3.0,
        label: "Triple XP",
        min: 90,
        max: Infinity,
        color: "#C084FC"
    };
    if (streakDays >= 30) return {
        multiplier: 2.0,
        label: "Double XP",
        min: 30,
        max: 90,
        color: "#F59E0B"
    };
    if (streakDays >= 14) return {
        multiplier: 1.5,
        label: "+50% XP",
        min: 14,
        max: 30,
        color: "#FBBF24"
    };
    if (streakDays >= 7) return {
        multiplier: 1.2,
        label: "+20% XP",
        min: 7,
        max: 14,
        color: "#4ADE80"
    };
    return {
        multiplier: 1.0,
        label: "XP normal",
        min: 0,
        max: 7,
        color: "#9CA3AF"
    };
}
function computeLevel(xp) {
    if (xp >= 8000) {
        const extraLevels = Math.floor((xp - 8000) / 1000);
        const level = 31 + extraLevels;
        const minXP = 8000 + extraLevels * 1000;
        const maxXP = minXP + 1000;
        return {
            level,
            tier: "Légende",
            minXP,
            maxXP,
            progress: (xp - minXP) / (maxXP - minXP) * 100
        };
    }
    if (xp >= 4000) {
        const level = 21 + Math.floor((xp - 4000) / 400);
        const minXP = 4000 + (level - 21) * 400;
        const maxXP = minXP + 400;
        return {
            level,
            tier: "Champion",
            minXP,
            maxXP,
            progress: (xp - minXP) / (maxXP - minXP) * 100
        };
    }
    if (xp >= 1500) {
        const level = 11 + Math.floor((xp - 1500) / 250);
        const minXP = 1500 + (level - 11) * 250;
        const maxXP = minXP + 250;
        return {
            level,
            tier: "Guerrier",
            minXP,
            maxXP,
            progress: (xp - minXP) / (maxXP - minXP) * 100
        };
    }
    if (xp >= 500) {
        const level = 6 + Math.floor((xp - 500) / 200);
        const minXP = 500 + (level - 6) * 200;
        const maxXP = minXP + 200;
        return {
            level,
            tier: "Apprenti",
            minXP,
            maxXP,
            progress: (xp - minXP) / (maxXP - minXP) * 100
        };
    }
    const level = 1 + Math.floor(xp / 100);
    const minXP = (level - 1) * 100;
    const maxXP = level * 100;
    return {
        level,
        tier: "Novice",
        minXP,
        maxXP,
        progress: (xp - minXP) / (maxXP - minXP) * 100
    };
}
const DEFAULT_BLOCKED_SITES = [
    // International
    {
        id: "s1",
        url: "1xbet.com",
        name: "1xBet",
        category: "international",
        blocked: true
    },
    {
        id: "s2",
        url: "bet365.com",
        name: "Bet365",
        category: "international",
        blocked: true
    },
    {
        id: "s3",
        url: "betway.com",
        name: "Betway",
        category: "international",
        blocked: true
    },
    {
        id: "s4",
        url: "williamhill.com",
        name: "William Hill",
        category: "international",
        blocked: true
    },
    {
        id: "s5",
        url: "unibet.com",
        name: "Unibet",
        category: "international",
        blocked: true
    },
    {
        id: "s6",
        url: "bwin.com",
        name: "Bwin",
        category: "international",
        blocked: true
    },
    {
        id: "s7",
        url: "stake.com",
        name: "Stake",
        category: "international",
        blocked: true
    },
    {
        id: "s8",
        url: "pinnacle.com",
        name: "Pinnacle",
        category: "international",
        blocked: true
    },
    {
        id: "s9",
        url: "10bet.com",
        name: "10Bet",
        category: "international",
        blocked: true
    },
    {
        id: "s10",
        url: "22bet.com",
        name: "22Bet",
        category: "international",
        blocked: true
    },
    // Africa
    {
        id: "s11",
        url: "betika.com",
        name: "Betika",
        category: "africa",
        blocked: true
    },
    {
        id: "s12",
        url: "sportybet.com",
        name: "SportyBet",
        category: "africa",
        blocked: true
    },
    {
        id: "s13",
        url: "melbet.com",
        name: "Melbet",
        category: "africa",
        blocked: true
    },
    {
        id: "s14",
        url: "bet9ja.com",
        name: "Bet9ja",
        category: "africa",
        blocked: true
    },
    {
        id: "s15",
        url: "msport.com",
        name: "MSport",
        category: "africa",
        blocked: true
    },
    {
        id: "s16",
        url: "bangbet.com",
        name: "BangBet",
        category: "africa",
        blocked: true
    },
    {
        id: "s17",
        url: "betking.com",
        name: "BetKing",
        category: "africa",
        blocked: true
    },
    {
        id: "s18",
        url: "nairabet.com",
        name: "NairaBet",
        category: "africa",
        blocked: true
    },
    {
        id: "s19",
        url: "betwinner.com",
        name: "BetWinner",
        category: "africa",
        blocked: true
    },
    {
        id: "s20",
        url: "helabet.com",
        name: "Helabet",
        category: "africa",
        blocked: true
    },
    // Crypto
    {
        id: "s21",
        url: "stake.crypto",
        name: "Stake Crypto",
        category: "crypto",
        blocked: true
    },
    {
        id: "s22",
        url: "cloudbet.com",
        name: "Cloudbet",
        category: "crypto",
        blocked: true
    },
    {
        id: "s23",
        url: "nitrobetting.com",
        name: "Nitrobetting",
        category: "crypto",
        blocked: true
    },
    {
        id: "s24",
        url: "trustdice.com",
        name: "TrustDice",
        category: "crypto",
        blocked: true
    },
    {
        id: "s25",
        url: "fortunejack.com",
        name: "FortuneJack",
        category: "crypto",
        blocked: true
    },
    {
        id: "s26",
        url: "mbitcasino.com",
        name: "mBit Casino",
        category: "crypto",
        blocked: true
    },
    // France
    {
        id: "s27",
        url: "pmu.fr",
        name: "PMU",
        category: "france",
        blocked: true
    },
    {
        id: "s28",
        url: "parionssport.fdj.fr",
        name: "Parions Sport",
        category: "france",
        blocked: true
    },
    {
        id: "s29",
        url: "betclic.fr",
        name: "Betclic",
        category: "france",
        blocked: true
    },
    {
        id: "s30",
        url: "winamax.fr",
        name: "Winamax",
        category: "france",
        blocked: true
    },
    {
        id: "s31",
        url: "pariweb.fr",
        name: "Pariweb",
        category: "france",
        blocked: true
    },
    {
        id: "s32",
        url: "zebet.fr",
        name: "Zebet",
        category: "france",
        blocked: true
    },
    {
        id: "s33",
        url: "parisfoot.fr",
        name: "Paris Foot",
        category: "france",
        blocked: true
    },
    {
        id: "s34",
        url: "netbet.fr",
        name: "NetBet",
        category: "france",
        blocked: true
    },
    // Other
    {
        id: "s35",
        url: "draftkings.com",
        name: "DraftKings",
        category: "international",
        blocked: true
    },
    {
        id: "s36",
        url: "fanduel.com",
        name: "FanDuel",
        category: "international",
        blocked: true
    },
    {
        id: "s37",
        url: "pointsbet.com",
        name: "PointsBet",
        category: "international",
        blocked: true
    },
    {
        id: "s38",
        url: "betfair.com",
        name: "Betfair",
        category: "international",
        blocked: true
    },
    {
        id: "s39",
        url: "ladbrokes.com",
        name: "Ladbrokes",
        category: "international",
        blocked: true
    },
    {
        id: "s40",
        url: "coral.co.uk",
        name: "Coral",
        category: "international",
        blocked: true
    },
    {
        id: "s41",
        url: "sbobet.com",
        name: "SBOBet",
        category: "international",
        blocked: true
    },
    {
        id: "s42",
        url: "dafabet.com",
        name: "Dafabet",
        category: "international",
        blocked: true
    },
    {
        id: "s43",
        url: "fun88.com",
        name: "Fun88",
        category: "international",
        blocked: true
    },
    {
        id: "s44",
        url: "1xstavka.ru",
        name: "1xStavka",
        category: "international",
        blocked: true
    },
    {
        id: "s45",
        url: "leonbets.com",
        name: "Leonbets",
        category: "international",
        blocked: true
    },
    {
        id: "s46",
        url: "parimatch.com",
        name: "Parimatch",
        category: "international",
        blocked: true
    },
    {
        id: "s47",
        url: "melbet.ng",
        name: "Melbet NG",
        category: "africa",
        blocked: true
    },
    {
        id: "s48",
        url: "betbonanza.com",
        name: "BetBonanza",
        category: "africa",
        blocked: true
    },
    {
        id: "s49",
        url: "ebet.co.za",
        name: "eBET",
        category: "africa",
        blocked: true
    },
    {
        id: "s50",
        url: "hollywoodbets.net",
        name: "Hollywoodbets",
        category: "africa",
        blocked: true
    },
    {
        id: "s51",
        url: "supabets.co.za",
        name: "Supabets",
        category: "africa",
        blocked: true
    },
    {
        id: "s52",
        url: "worldstarbet.com",
        name: "Worldstar Bet",
        category: "africa",
        blocked: true
    }
];
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        // Navigation
        currentScreen: "splash",
        previousScreens: [],
        navigate: (screen)=>set((s)=>({
                    previousScreens: [
                        ...s.previousScreens,
                        s.currentScreen
                    ].slice(-10),
                    currentScreen: screen
                })),
        goBack: ()=>set((s)=>{
                if (s.previousScreens.length === 0) return s;
                const prev = s.previousScreens[s.previousScreens.length - 1];
                return {
                    currentScreen: prev,
                    previousScreens: s.previousScreens.slice(0, -1)
                };
            }),
        resetToOnboarding: ()=>set({
                currentScreen: "splash",
                previousScreens: []
            }),
        // Onboarding
        hasStartedOnboarding: false,
        hasCompletedOnboarding: false,
        setStartedOnboarding: (v)=>set({
                hasStartedOnboarding: v
            }),
        setCompletedOnboarding: (v)=>set({
                hasCompletedOnboarding: v
            }),
        // Profile
        gender: null,
        setGender: (g)=>set({
                gender: g
            }),
        language: "fr",
        setLanguage: (l)=>set({
                language: l
            }),
        name: "",
        setName: (n)=>set({
                name: n
            }),
        // Avatar color
        avatarColor: "#10B981",
        setAvatarColor: (color)=>set({
                avatarColor: color
            }),
        // Profile photo (base64 data URL or null)
        profilePhoto: null,
        setProfilePhoto: (photo)=>set({
                profilePhoto: photo
            }),
        // Articles read
        articlesRead: 0,
        incrementArticlesRead: ()=>set((s)=>({
                    articlesRead: s.articlesRead + 1
                })),
        // Quiz
        quizAnswers: [],
        quizCurrentIndex: 0,
        setQuizAnswer: (qIndex, aIndex)=>set((s)=>{
                const answers = [
                    ...s.quizAnswers
                ];
                answers[qIndex] = aIndex;
                return {
                    quizAnswers: answers
                };
            }),
        setQuizCurrentIndex: (i)=>set({
                quizCurrentIndex: i
            }),
        addictionScore: 0,
        addictionLevel: "faible",
        setAddictionResult: (score, level)=>set({
                addictionScore: score,
                addictionLevel: level
            }),
        // Symptoms
        selectedSymptoms: {},
        toggleSymptom: (category, symptom)=>set((s)=>{
                const current = s.selectedSymptoms[category] || [];
                const updated = current.includes(symptom) ? current.filter((x)=>x !== symptom) : [
                    ...current,
                    symptom
                ];
                return {
                    selectedSymptoms: {
                        ...s.selectedSymptoms,
                        [category]: updated
                    }
                };
            }),
        // Engagement
        selectedGoals: [],
        toggleGoal: (goal)=>set((s)=>({
                    selectedGoals: s.selectedGoals.includes(goal) ? s.selectedGoals.filter((g)=>g !== goal) : [
                        ...s.selectedGoals,
                        goal
                    ]
                })),
        signatureData: null,
        setSignature: (data)=>set({
                signatureData: data
            }),
        // Plan
        plan: "free",
        setPlan: (p)=>set({
                plan: p
            }),
        planBillingCycle: "monthly",
        planStartedAt: null,
        planRenewsAt: null,
        activatePaidPlan: (p, cycle)=>set({
                plan: p,
                planBillingCycle: cycle,
                planStartedAt: new Date().toISOString(),
                // The webhook/gateway will confirm the exact date server-side; the
                // optimistic estimate keeps the UI honest until the pull lands.
                planRenewsAt: null
            }),
        cancelPaidPlan: ()=>set({
                plan: "free",
                planBillingCycle: "monthly",
                planStartedAt: null,
                planRenewsAt: null
            }),
        applyServerPlan: ({ plan, planBillingCycle, planStartedAt, planRenewsAt })=>set({
                plan,
                planBillingCycle,
                planStartedAt,
                planRenewsAt
            }),
        downgradeSurvey: null,
        setDowngradeSurvey: (s)=>set({
                downgradeSurvey: s
            }),
        dataConsent: false,
        setDataConsent: (v)=>set({
                dataConsent: v
            }),
        // Streak
        streakDays: 0,
        lastStreakDate: null,
        incrementStreak: ()=>set((s)=>{
                const today = new Date().toDateString();
                if (s.lastStreakDate === today) return s;
                const yesterday = new Date(Date.now() - 86400000).toDateString();
                const newStreak = s.lastStreakDate === yesterday ? s.streakDays + 1 : 1;
                return {
                    streakDays: newStreak,
                    lastStreakDate: today
                };
            }),
        resetStreak: ()=>set({
                streakDays: 0,
                lastStreakDate: null
            }),
        setStreak: (days)=>set({
                streakDays: days,
                lastStreakDate: new Date().toDateString()
            }),
        // Meditation streak
        meditationStreak: 0,
        lastMeditationDate: null,
        incrementMeditationStreak: ()=>set((s)=>{
                const today = new Date().toDateString();
                if (s.lastMeditationDate === today) return s;
                const yesterday = new Date(Date.now() - 86400000).toDateString();
                const newStreak = s.lastMeditationDate === yesterday ? s.meditationStreak + 1 : 1;
                return {
                    meditationStreak: newStreak,
                    lastMeditationDate: today
                };
            }),
        // Finance
        weeklyBetAmount: 10000,
        setWeeklyBetAmount: (n)=>set({
                weeklyBetAmount: n
            }),
        savingsGoal: 100000,
        setSavingsGoal: (n)=>set({
                savingsGoal: n
            }),
        weeklyIncome: 50000,
        setWeeklyIncome: (n)=>set({
                weeklyIncome: n
            }),
        weeklyExpenses: {
            rent: 15000,
            food: 10000,
            transport: 4000,
            other: 6000
        },
        setWeeklyExpenses: (expenses)=>set({
                weeklyExpenses: expenses
            }),
        savingsGoals: [
            {
                id: "sg-default-emergency",
                name: "Fonds d'urgence",
                targetAmount: 150000,
                currentAmount: 0,
                icon: "🛟"
            },
            {
                id: "sg-default-phone",
                name: "Nouveau téléphone",
                targetAmount: 75000,
                currentAmount: 0,
                icon: "📱"
            }
        ],
        addSavingsGoal: (goal)=>set((s)=>({
                    savingsGoals: [
                        ...s.savingsGoals,
                        {
                            ...goal,
                            id: `sg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
                        }
                    ]
                })),
        updateSavingsGoal: (id, updates)=>set((s)=>({
                    savingsGoals: s.savingsGoals.map((g)=>g.id === id ? {
                            ...g,
                            ...updates
                        } : g)
                })),
        deleteSavingsGoal: (id)=>set((s)=>({
                    savingsGoals: s.savingsGoals.filter((g)=>g.id !== id)
                })),
        // Journal
        journalEntries: [],
        addJournalEntry: (e)=>set((s)=>({
                    journalEntries: [
                        {
                            ...e,
                            id: `j${Date.now()}`,
                            createdAt: new Date().toISOString()
                        },
                        ...s.journalEntries
                    ]
                })),
        deleteJournalEntry: (id)=>set((s)=>({
                    journalEntries: s.journalEntries.filter((j)=>j.id !== id)
                })),
        // Panic
        panicEvents: [],
        addPanicEvent: (e)=>set((s)=>({
                    panicEvents: [
                        {
                            ...e,
                            id: `p${Date.now()}`,
                            createdAt: new Date().toISOString()
                        },
                        ...s.panicEvents
                    ]
                })),
        // Chat
        chatMessages: [],
        addChatMessage: (m)=>set((s)=>({
                    chatMessages: [
                        ...s.chatMessages,
                        {
                            ...m,
                            id: `c${Date.now()}`,
                            createdAt: new Date().toISOString()
                        }
                    ]
                })),
        clearChat: ()=>set({
                chatMessages: []
            }),
        // Free-tier quotas (Zerobet 2.0)
        atlasUsage: {
            date: "",
            count: 0
        },
        consumeAtlasMessage: ()=>set((s)=>{
                const today = new Date().toISOString().slice(0, 10);
                const usage = s.atlasUsage.date === today ? {
                    date: today,
                    count: s.atlasUsage.count + 1
                } : {
                    date: today,
                    count: 1
                };
                return {
                    atlasUsage: usage
                };
            }),
        journalUsage: {
            weekStart: "",
            count: 0
        },
        consumeJournalEntry: ()=>set((s)=>{
                const now = new Date();
                const day = now.getUTCDay();
                const monday = new Date(now);
                monday.setUTCDate(now.getUTCDate() - (day + 6) % 7);
                const weekStart = monday.toISOString().slice(0, 10);
                const usage = s.journalUsage.weekStart === weekStart ? {
                    weekStart,
                    count: s.journalUsage.count + 1
                } : {
                    weekStart,
                    count: 1
                };
                return {
                    journalUsage: usage
                };
            }),
        chatUsage: {
            date: "",
            count: 0
        },
        consumeChatMessage: ()=>set((s)=>{
                const today = new Date().toISOString().slice(0, 10);
                const usage = s.chatUsage.date === today ? {
                    date: today,
                    count: s.chatUsage.count + 1
                } : {
                    date: today,
                    count: 1
                };
                return {
                    chatUsage: usage
                };
            }),
        // Backend sync (Zerobet 2.0)
        lastSyncAt: null,
        setLastSyncAt: (iso)=>set({
                lastSyncAt: iso
            }),
        cloudSyncStatus: "idle",
        setCloudSyncStatus: (s)=>set({
                cloudSyncStatus: s
            }),
        syncRequestId: 0,
        requestSync: ()=>set((s)=>({
                    syncRequestId: s.syncRequestId + 1
                })),
        // Zerobet 2.0 — cloud restore: merge a server snapshot back into the
        // store. Only whitelisted backup keys are applied, so unknown/extra
        // fields from newer or older payloads can never corrupt state.
        restoreFromSnapshot: (payload)=>{
            if (!payload || typeof payload !== "object") return false;
            const BACKUP_KEYS = [
                "gender",
                "language",
                "name",
                "hasCompletedOnboarding",
                "quizAnswers",
                "addictionScore",
                "addictionLevel",
                "selectedGoals",
                "selectedSymptoms",
                "plan",
                "planBillingCycle",
                "planStartedAt",
                "planRenewsAt",
                "downgradeSurvey",
                "streakDays",
                "lastStreakDate",
                "streakHistory",
                "lastCheckInDate",
                "todayMood",
                "todayCraving",
                "xp",
                "level",
                "dailyQuests",
                "challengeStreak",
                "savingsGoals",
                "weeklyIncome",
                "weeklyExpenses",
                "savingsGoal",
                "weeklyBetAmount",
                "currency",
                "unlockedRanks",
                "celebratedMilestones",
                "meditationStreak",
                "articlesRead",
                "relapseHistory",
                "avatarColor"
            ];
            const partial = {};
            let applied = 0;
            for (const k of BACKUP_KEYS){
                if (k in payload && payload[k] !== undefined && payload[k] !== null) {
                    partial[k] = payload[k];
                    applied += 1;
                }
            }
            if (applied === 0) return false;
            set(partial);
            return true;
        },
        // Community
        testimonials: [],
        addTestimonial: (t)=>set((s)=>({
                    testimonials: [
                        {
                            ...t,
                            id: `t${Date.now()}`,
                            createdAt: new Date().toISOString(),
                            likes: 0,
                            replies: []
                        },
                        ...s.testimonials
                    ]
                })),
        toggleTestimonialLike: (id)=>set((s)=>({
                    testimonials: s.testimonials.map((t)=>t.id === id ? {
                            ...t,
                            liked: !t.liked,
                            likes: t.liked ? t.likes - 1 : t.likes + 1
                        } : t)
                })),
        addTestimonialReply: (id, reply)=>set((s)=>({
                    testimonials: s.testimonials.map((t)=>t.id === id ? {
                            ...t,
                            replies: [
                                ...t.replies,
                                {
                                    ...reply,
                                    id: `r${Date.now()}`,
                                    createdAt: new Date().toISOString(),
                                    likes: 0
                                }
                            ]
                        } : t)
                })),
        forumPosts: [],
        addForumPost: (p)=>set((s)=>({
                    forumPosts: [
                        {
                            ...p,
                            id: `f${Date.now()}`,
                            createdAt: new Date().toISOString(),
                            likes: 0,
                            replies: [],
                            liked: false
                        },
                        ...s.forumPosts
                    ]
                })),
        toggleForumLike: (id)=>set((s)=>({
                    forumPosts: s.forumPosts.map((p)=>p.id === id ? {
                            ...p,
                            liked: !p.liked,
                            likes: p.liked ? p.likes - 1 : p.likes + 1
                        } : p)
                })),
        addForumReply: (postId, reply)=>set((s)=>({
                    forumPosts: s.forumPosts.map((p)=>p.id === postId ? {
                            ...p,
                            replies: [
                                ...p.replies,
                                {
                                    ...reply,
                                    id: `fr${Date.now()}`,
                                    createdAt: new Date().toISOString(),
                                    likes: 0
                                }
                            ]
                        } : p)
                })),
        // Notifications
        notifications: [],
        addNotification: (n)=>set((s)=>({
                    notifications: [
                        {
                            ...n,
                            id: `n${Date.now()}`,
                            createdAt: new Date().toISOString(),
                            read: false
                        },
                        ...s.notifications
                    ]
                })),
        markAllRead: ()=>set((s)=>({
                    notifications: s.notifications.map((n)=>({
                            ...n,
                            read: true
                        }))
                })),
        // Blocker
        blockedSites: DEFAULT_BLOCKED_SITES,
        toggleSiteBlock: (id)=>set((s)=>({
                    blockedSites: s.blockedSites.map((site)=>site.id === id ? {
                            ...site,
                            blocked: !site.blocked
                        } : site)
                })),
        toggleAllSites: (blocked)=>set((s)=>({
                    blockedSites: s.blockedSites.map((site)=>({
                            ...site,
                            blocked
                        }))
                })),
        addCustomSite: (url, name)=>set((s)=>({
                    blockedSites: [
                        ...s.blockedSites,
                        {
                            id: `custom-${Date.now()}`,
                            url,
                            name,
                            category: "other",
                            blocked: true
                        }
                    ]
                })),
        blockerEnabled: false,
        setBlockerEnabled: (v)=>set({
                blockerEnabled: v
            }),
        strictMode: false,
        setStrictMode: (v)=>set({
                strictMode: v
            }),
        strictUntil: null,
        activateStrictMode: ()=>set({
                strictMode: true,
                strictUntil: new Date(Date.now() + 72 * 3600 * 1000).toISOString()
            }),
        // Ranks
        unlockedRanks: [],
        unlockRank: (key)=>set((s)=>s.unlockedRanks.includes(key) ? s : {
                    unlockedRanks: [
                        ...s.unlockedRanks,
                        key
                    ]
                }),
        // Settings
        anonymousMode: false,
        setAnonymousMode: (v)=>set({
                anonymousMode: v
            }),
        // Appearance & preferences (Task 9-a)
        themeMode: "dark",
        setThemeMode: (v)=>set({
                themeMode: v
            }),
        starfieldIntensity: 60,
        setStarfieldIntensity: (v)=>set({
                starfieldIntensity: v
            }),
        glassEffect: true,
        setGlassEffect: (v)=>set({
                glassEffect: v
            }),
        // Notification preferences
        notificationPrefs: {
            streak: true,
            motivation: true,
            milestones: true,
            checkin: true,
            weekly: true
        },
        setNotificationPref: (key, value)=>set((s)=>({
                    notificationPrefs: {
                        ...s.notificationPrefs,
                        [key]: value
                    }
                })),
        notificationTime: "20:00",
        setNotificationTime: (v)=>set({
                notificationTime: v
            }),
        // Privacy & security
        appLock: false,
        setAppLock: (v)=>set({
                appLock: v
            }),
        discreteMode: false,
        setDiscreteMode: (v)=>set({
                discreteMode: v
            }),
        autoLockMinutes: 5,
        setAutoLockMinutes: (v)=>set({
                autoLockMinutes: v
            }),
        // Sound & haptics
        soundEnabled: true,
        setSoundEnabled: (v)=>set({
                soundEnabled: v
            }),
        hapticsEnabled: true,
        setHapticsEnabled: (v)=>set({
                hapticsEnabled: v
            }),
        volume: 70,
        setVolume: (v)=>set({
                volume: v
            }),
        // Daily check-in
        lastCheckInDate: null,
        setLastCheckInDate: (date)=>set({
                lastCheckInDate: date
            }),
        todayMood: null,
        setTodayMood: (mood)=>set({
                todayMood: mood
            }),
        todayCraving: false,
        setTodayCraving: (v)=>set({
                todayCraving: v
            }),
        // Trusted contacts (SOS)
        trustedContacts: [],
        addTrustedContact: (c)=>set((s)=>({
                    trustedContacts: [
                        ...s.trustedContacts,
                        {
                            ...c,
                            id: `tc${Date.now()}`
                        }
                    ]
                })),
        deleteTrustedContact: (id)=>set((s)=>({
                    trustedContacts: s.trustedContacts.filter((c)=>c.id !== id)
                })),
        // Admin
        isAdmin: false,
        setIsAdmin: (v)=>set({
                isAdmin: v
            }),
        adminStreakOverride: null,
        setAdminStreakOverride: (n)=>set({
                adminStreakOverride: n
            }),
        // Gamification — XP & Levels
        xp: 0,
        level: 1,
        addXP: (amount, source)=>set((s)=>{
                const multiplier = getStreakMultiplier(s.streakDays);
                const adjustedAmount = Math.round(amount * multiplier);
                const newXP = s.xp + adjustedAmount;
                const { level: newLevel } = computeLevel(newXP);
                const newEntry = {
                    id: `xp${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                    amount: adjustedAmount,
                    source,
                    timestamp: new Date().toISOString()
                };
                // Subtle XP feedback (coin ding + selection tick).
                // Level-up fanfare is handled by the GamificationScreen when
                // the computed level actually increases.
                try {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].playCoin();
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["haptics"].selection();
                } catch  {
                /* noop — audio not ready */ }
                return {
                    xp: newXP,
                    level: newLevel,
                    xpHistory: [
                        newEntry,
                        ...s.xpHistory
                    ].slice(0, 50)
                };
            }),
        // Gamification — Daily Quests
        dailyQuests: {
            checkin: false,
            journal: false,
            meditation: false,
            streak: false,
            article: false
        },
        completeQuest: (questId)=>{
            const state = get();
            if (state.dailyQuests[questId]) return;
            const reward = QUEST_REWARDS[questId] ?? 0;
            const label = QUEST_LABELS[questId] ?? questId;
            set((s)=>({
                    dailyQuests: {
                        ...s.dailyQuests,
                        [questId]: true
                    }
                }));
            get().addXP(reward, label);
        },
        resetDailyQuests: ()=>set({
                dailyQuests: {
                    checkin: false,
                    journal: false,
                    meditation: false,
                    streak: false,
                    article: false
                },
                lastQuestReset: new Date().toDateString()
            }),
        lastQuestReset: null,
        // Gamification — Daily Challenge (dashboard card)
        challengeCompletedDate: null,
        challengeStreak: 0,
        completeDailyChallenge: ()=>{
            const today = new Date().toDateString();
            if (get().challengeCompletedDate === today) return;
            const yesterday = new Date(Date.now() - 86_400_000).toDateString();
            const streak = get().challengeCompletedDate === yesterday ? get().challengeStreak + 1 : 1;
            set({
                challengeCompletedDate: today,
                challengeStreak: streak
            });
            get().addXP(DAILY_CHALLENGE_XP, "dailyChallenge");
        },
        // Gamification — XP History
        xpHistory: [],
        // Onboarding tutorial
        hasSeenTutorial: false,
        setHasSeenTutorial: (v)=>set({
                hasSeenTutorial: v
            }),
        // 90-day Program tasks (Task 10-a)
        programTasksCompleted: [],
        programLastReset: null,
        markProgramTask: (taskId)=>set((s)=>({
                    programTasksCompleted: s.programTasksCompleted.includes(taskId) ? s.programTasksCompleted : [
                        ...s.programTasksCompleted,
                        taskId
                    ]
                })),
        resetProgramTasks: ()=>set({
                programTasksCompleted: [],
                programLastReset: new Date().toDateString()
            }),
        // Withdrawal symptoms tracker (Task 10-b)
        withdrawalSymptoms: {},
        setWithdrawalSymptoms: (s)=>set({
                withdrawalSymptoms: s
            }),
        // Triggers tracker (Task 11-a)
        triggers: [],
        addTrigger: (trigger)=>set((s)=>({
                    triggers: [
                        {
                            ...trigger,
                            id: `trigger-${Date.now()}`,
                            createdAt: new Date().toISOString()
                        },
                        ...s.triggers
                    ]
                })),
        deleteTrigger: (id)=>set((s)=>({
                    triggers: s.triggers.filter((t)=>t.id !== id)
                })),
        // Life goals (Task 11-b)
        lifeGoals: [],
        addLifeGoal: (goal)=>set((s)=>{
                const now = Date.now();
                const milestones = goal.milestones.map((title, i)=>({
                        id: `ms-${now}-${i}`,
                        title,
                        completed: false
                    }));
                const newGoal = {
                    id: `goal-${now}`,
                    title: goal.title,
                    description: goal.description,
                    category: goal.category,
                    targetDate: goal.targetDate,
                    progress: 0,
                    milestones,
                    createdAt: new Date().toISOString()
                };
                return {
                    lifeGoals: [
                        newGoal,
                        ...s.lifeGoals
                    ]
                };
            }),
        updateLifeGoal: (id, updates)=>set((s)=>({
                    lifeGoals: s.lifeGoals.map((g)=>{
                        if (g.id !== id) return g;
                        const merged = {
                            ...g,
                            ...updates
                        };
                        if (updates.milestones) {
                            const total = merged.milestones.length;
                            const completed = merged.milestones.filter((m)=>m.completed).length;
                            merged.progress = total > 0 ? Math.round(completed / total * 100) : 0;
                        }
                        return merged;
                    })
                })),
        deleteLifeGoal: (id)=>set((s)=>({
                    lifeGoals: s.lifeGoals.filter((g)=>g.id !== id)
                })),
        toggleMilestone: (goalId, milestoneId)=>set((s)=>({
                    lifeGoals: s.lifeGoals.map((g)=>{
                        if (g.id !== goalId) return g;
                        const milestones = g.milestones.map((m)=>m.id === milestoneId ? {
                                ...m,
                                completed: !m.completed
                            } : m);
                        const total = milestones.length;
                        const completed = milestones.filter((m)=>m.completed).length;
                        const progress = total > 0 ? Math.round(completed / total * 100) : 0;
                        return {
                            ...g,
                            milestones,
                            progress
                        };
                    })
                })),
        // Milestone celebrations (Task 11-d)
        celebratedMilestones: [],
        markMilestoneCelebrated: (day)=>set((s)=>s.celebratedMilestones.includes(day) ? s : {
                    celebratedMilestones: [
                        ...s.celebratedMilestones,
                        day
                    ]
                }),
        // Relapse recovery (Task 12-c)
        relapseHistory: [],
        currentRelapseProtocol: null,
        addRelapseEvent: (event)=>{
            const id = `relapse-${Date.now()}`;
            const newEvent = {
                ...event,
                id,
                timestamp: new Date().toISOString(),
                protocolCompleted: false
            };
            set((s)=>({
                    relapseHistory: [
                        newEvent,
                        ...s.relapseHistory
                    ]
                }));
            return id;
        },
        updateRelapseEvent: (id, updates)=>set((s)=>({
                    relapseHistory: s.relapseHistory.map((r)=>r.id === id ? {
                            ...r,
                            ...updates
                        } : r)
                })),
        startRelapseProtocol: ()=>set({
                currentRelapseProtocol: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PROTOCOL_STEPS"].map((step)=>({
                        ...step,
                        completed: false
                    }))
            }),
        completeRelapseStep: (stepId)=>set((s)=>{
                if (!s.currentRelapseProtocol) return s;
                const now = new Date().toISOString();
                const updated = s.currentRelapseProtocol.map((step)=>step.id === stepId ? {
                        ...step,
                        completed: true,
                        completedAt: now
                    } : step);
                const allDone = updated.every((step)=>step.completed);
                if (allDone && s.relapseHistory.length > 0) {
                    const [first, ...rest] = s.relapseHistory;
                    return {
                        currentRelapseProtocol: updated,
                        relapseHistory: [
                            {
                                ...first,
                                protocolCompleted: true
                            },
                            ...rest
                        ]
                    };
                }
                return {
                    currentRelapseProtocol: updated
                };
            }),
        resetRelapseProtocol: ()=>set({
                currentRelapseProtocol: null
            }),
        // Affirmations (Task 12-b)
        favoriteAffirmations: [],
        customAffirmations: [],
        toggleFavoriteAffirmation: (id)=>set((s)=>({
                    favoriteAffirmations: s.favoriteAffirmations.includes(id) ? s.favoriteAffirmations.filter((x)=>x !== id) : [
                        ...s.favoriteAffirmations,
                        id
                    ]
                })),
        addCustomAffirmation: (text, category)=>set((s)=>({
                    customAffirmations: [
                        {
                            id: `custom-aff-${Date.now()}`,
                            textKey: text.trim(),
                            category,
                            isCustom: true
                        },
                        ...s.customAffirmations
                    ]
                })),
        deleteCustomAffirmation: (id)=>set((s)=>({
                    customAffirmations: s.customAffirmations.filter((a)=>a.id !== id),
                    favoriteAffirmations: s.favoriteAffirmations.filter((x)=>x !== id)
                })),
        // Streak history / heatmap (Task 13-b)
        streakHistory: [],
        markDayClean: (date, intensity = 2)=>set((s)=>{
                const clamped = Math.max(1, Math.min(3, intensity));
                const existing = s.streakHistory.find((d)=>d.date === date);
                if (existing) {
                    return {
                        streakHistory: s.streakHistory.map((d)=>d.date === date ? {
                                ...d,
                                clean: true,
                                intensity: clamped
                            } : d)
                    };
                }
                const next = [
                    ...s.streakHistory,
                    {
                        date,
                        clean: true,
                        intensity: clamped
                    }
                ];
                // Cap at 366 entries (1 year), remove oldest by date.
                next.sort((a, b)=>a.date.localeCompare(b.date));
                const capped = next.length > 366 ? next.slice(next.length - 366) : next;
                return {
                    streakHistory: capped
                };
            }),
        markDayRelapse: (date)=>set((s)=>{
                const existing = s.streakHistory.find((d)=>d.date === date);
                if (existing) {
                    return {
                        streakHistory: s.streakHistory.map((d)=>d.date === date ? {
                                ...d,
                                clean: false,
                                intensity: 0
                            } : d)
                    };
                }
                const next = [
                    ...s.streakHistory,
                    {
                        date,
                        clean: false,
                        intensity: 0
                    }
                ];
                next.sort((a, b)=>a.date.localeCompare(b.date));
                const capped = next.length > 366 ? next.slice(next.length - 366) : next;
                return {
                    streakHistory: capped
                };
            }),
        // Notification settings (Task 13-c) — PWA push + per-channel preferences
        notificationPreferences: {
            dailyReminder: true,
            dailyReminderTime: "07:00",
            cravingCheckin: true,
            milestoneAlerts: true,
            communityActivity: true,
            weeklyReport: true,
            motivationalQuotes: true,
            silentHours: true,
            silentHoursStart: "22:00",
            silentHoursEnd: "07:00"
        },
        setNotificationPreferences: (prefs)=>set((s)=>({
                    notificationPreferences: {
                        ...s.notificationPreferences,
                        ...prefs
                    }
                })),
        notificationPermission: "default",
        setNotificationPermission: (perm)=>set({
                notificationPermission: perm
            }),
        pwaInstalled: false,
        setPwaInstalled: (installed)=>set({
                pwaInstalled: installed
            }),
        // Community chat (Task 13-a) — local echo + persisted nickname.
        // Real messages come from the socket.io service on port 3003.
        chatNickname: "",
        setChatNickname: (name)=>set({
                chatNickname: name
            }),
        chatRoomMessages: [],
        addChatRoomMessage: (msg)=>set((s)=>{
                const next = [
                    ...s.chatRoomMessages,
                    msg
                ];
                // Cap at 100 — drop the oldest.
                const capped = next.length > 100 ? next.slice(next.length - 100) : next;
                return {
                    chatRoomMessages: capped
                };
            }),
        prependChatRoomMessages: (msgs)=>set((s)=>{
                if (!msgs.length) return {};
                const existing = new Set(s.chatRoomMessages.map((m)=>m.id));
                const fresh = msgs.filter((m)=>m && m.id && !existing.has(m.id));
                if (!fresh.length) return {};
                const next = [
                    ...fresh,
                    ...s.chatRoomMessages
                ];
                // Hard safety cap — generous enough for deep history paging.
                const capped = next.length > 400 ? next.slice(0, 400) : next;
                return {
                    chatRoomMessages: capped
                };
            }),
        clearChatRoomMessages: ()=>set({
                chatRoomMessages: []
            }),
        // Currency selection (Task 15-a)
        // Default to XOF (FCFA) since the target market is African francophone.
        currency: "XOF",
        setCurrency: (c)=>set({
                currency: c
            }),
        customWeeklyBet: 0,
        // Reset
        resetAll: ()=>set({
                currentScreen: "splash",
                previousScreens: [],
                hasStartedOnboarding: false,
                hasCompletedOnboarding: false,
                gender: null,
                language: "fr",
                name: "",
                quizAnswers: [],
                quizCurrentIndex: 0,
                addictionScore: 0,
                addictionLevel: "faible",
                selectedSymptoms: {},
                selectedGoals: [],
                signatureData: null,
                plan: "free",
                dataConsent: false,
                streakDays: 0,
                lastStreakDate: null,
                weeklyBetAmount: 10000,
                savingsGoal: 100000,
                weeklyIncome: 50000,
                weeklyExpenses: {
                    rent: 15000,
                    food: 10000,
                    transport: 4000,
                    other: 6000
                },
                savingsGoals: [
                    {
                        id: "sg-default-emergency",
                        name: "Fonds d'urgence",
                        targetAmount: 150000,
                        currentAmount: 0,
                        icon: "🛟"
                    },
                    {
                        id: "sg-default-phone",
                        name: "Nouveau téléphone",
                        targetAmount: 75000,
                        currentAmount: 0,
                        icon: "📱"
                    }
                ],
                journalEntries: [],
                panicEvents: [],
                chatMessages: [],
                testimonials: [],
                forumPosts: [],
                notifications: [],
                blockerEnabled: false,
                strictMode: false,
                strictUntil: null,
                unlockedRanks: [],
                anonymousMode: false,
                themeMode: "dark",
                starfieldIntensity: 60,
                glassEffect: true,
                notificationPrefs: {
                    streak: true,
                    motivation: true,
                    milestones: true,
                    checkin: true,
                    weekly: true
                },
                notificationTime: "20:00",
                appLock: false,
                discreteMode: false,
                autoLockMinutes: 5,
                soundEnabled: true,
                hapticsEnabled: true,
                volume: 70,
                lastCheckInDate: null,
                todayMood: null,
                todayCraving: false,
                trustedContacts: [],
                isAdmin: false,
                adminStreakOverride: null,
                meditationStreak: 0,
                lastMeditationDate: null,
                avatarColor: "#10B981",
                profilePhoto: null,
                articlesRead: 0,
                xp: 0,
                level: 1,
                dailyQuests: {
                    checkin: false,
                    journal: false,
                    meditation: false,
                    streak: false,
                    article: false
                },
                lastQuestReset: null,
                challengeCompletedDate: null,
                challengeStreak: 0,
                xpHistory: [],
                hasSeenTutorial: false,
                programTasksCompleted: [],
                programLastReset: null,
                withdrawalSymptoms: {},
                triggers: [],
                lifeGoals: [],
                celebratedMilestones: [],
                relapseHistory: [],
                currentRelapseProtocol: null,
                favoriteAffirmations: [],
                customAffirmations: [],
                streakHistory: [],
                notificationPreferences: {
                    dailyReminder: true,
                    dailyReminderTime: "07:00",
                    cravingCheckin: true,
                    milestoneAlerts: true,
                    communityActivity: true,
                    weeklyReport: true,
                    motivationalQuotes: true,
                    silentHours: true,
                    silentHoursStart: "22:00",
                    silentHoursEnd: "07:00"
                },
                notificationPermission: "default",
                pwaInstalled: false,
                chatNickname: "",
                chatRoomMessages: [],
                currency: "XOF",
                customWeeklyBet: 0
            })
    }), {
    name: "zerobet-store-v1",
    version: 3,
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    migrate: (persistedState, version)=>{
        // Migration v0/v1 -> v2 (Task 19-a): convert Affirmation.text and
        // RelapseProtocolStep.title/description/action to the new key-based
        // fields. Older persisted entries may still hold raw French text;
        // we coerce them into the new shape so the UI doesn't crash.
        const s = persistedState ?? {};
        if (version < 2) {
            // Migrate customAffirmations: text -> textKey
            if (Array.isArray(s.customAffirmations)) {
                s.customAffirmations = s.customAffirmations.map((aff)=>{
                    if (aff && typeof aff === "object") {
                        if ("text" in aff && !("textKey" in aff)) {
                            aff.textKey = aff.text;
                            delete aff.text;
                        } else if (!("textKey" in aff)) {
                            aff.textKey = "affirmation1Text";
                        }
                    }
                    return aff;
                });
            }
            // Migrate currentRelapseProtocol: title/description/action -> *Key
            if (Array.isArray(s.currentRelapseProtocol)) {
                s.currentRelapseProtocol = s.currentRelapseProtocol.map((step)=>{
                    if (step && typeof step === "object") {
                        if ("title" in step && !("titleKey" in step)) {
                            step.titleKey = step.title;
                            delete step.title;
                        } else if (!("titleKey" in step)) {
                            step.titleKey = "relapseStep1Title";
                        }
                        if ("description" in step && !("descKey" in step)) {
                            step.descKey = step.description;
                            delete step.description;
                        } else if (!("descKey" in step)) {
                            step.descKey = "relapseStep1Desc";
                        }
                        if ("action" in step && !("actionKey" in step)) {
                            step.actionKey = step.action;
                            delete step.action;
                        } else if (!("actionKey" in step)) {
                            step.actionKey = "relapseStep1Action";
                        }
                    }
                    return step;
                });
            }
        }
        return s;
    },
    // Zerobet 2.0 — persist v2 -> v3: seed the new free-tier quota and
    // backend-sync fields so hydrated state never carries undefined.
    merge: (persisted, current)=>{
        const p = persisted ?? {};
        const merged = {
            ...current,
            ...p
        };
        if (!merged.atlasUsage || typeof merged.atlasUsage !== "object") {
            merged.atlasUsage = {
                date: "",
                count: 0
            };
        }
        if (!merged.journalUsage || typeof merged.journalUsage !== "object") {
            merged.journalUsage = {
                weekStart: "",
                count: 0
            };
        }
        if (!merged.chatUsage || typeof merged.chatUsage !== "object") {
            merged.chatUsage = {
                date: "",
                count: 0
            };
        }
        if (!("lastSyncAt" in p)) merged.lastSyncAt = null;
        // Plan cycle/date sanitization (Zerobet 2.0.5 / 2.1.0)
        if (merged.planBillingCycle !== "annual") merged.planBillingCycle = "monthly";
        if (typeof merged.planStartedAt !== "string" && merged.planStartedAt !== null) {
            merged.planStartedAt = null;
        }
        if (typeof merged.planRenewsAt !== "string" && merged.planRenewsAt !== null) {
            merged.planRenewsAt = null;
        }
        // Exit survey sanitization (Zerobet 2.1.0)
        if (merged.downgradeSurvey !== null && (typeof merged.downgradeSurvey !== "object" || typeof merged.downgradeSurvey.reason !== "string")) {
            merged.downgradeSurvey = null;
        }
        return merged;
    },
    partialize: (state)=>({
            gender: state.gender,
            language: state.language,
            name: state.name,
            hasStartedOnboarding: state.hasStartedOnboarding,
            hasCompletedOnboarding: state.hasCompletedOnboarding,
            quizAnswers: state.quizAnswers,
            addictionScore: state.addictionScore,
            addictionLevel: state.addictionLevel,
            selectedSymptoms: state.selectedSymptoms,
            selectedGoals: state.selectedGoals,
            signatureData: state.signatureData,
            plan: state.plan,
            planBillingCycle: state.planBillingCycle,
            planStartedAt: state.planStartedAt,
            planRenewsAt: state.planRenewsAt,
            downgradeSurvey: state.downgradeSurvey,
            dataConsent: state.dataConsent,
            streakDays: state.streakDays,
            lastStreakDate: state.lastStreakDate,
            weeklyBetAmount: state.weeklyBetAmount,
            savingsGoal: state.savingsGoal,
            weeklyIncome: state.weeklyIncome,
            weeklyExpenses: state.weeklyExpenses,
            savingsGoals: state.savingsGoals,
            journalEntries: state.journalEntries,
            panicEvents: state.panicEvents,
            chatMessages: state.chatMessages,
            testimonials: state.testimonials,
            forumPosts: state.forumPosts,
            blockedSites: state.blockedSites,
            blockerEnabled: state.blockerEnabled,
            strictMode: state.strictMode,
            strictUntil: state.strictUntil,
            unlockedRanks: state.unlockedRanks,
            anonymousMode: state.anonymousMode,
            themeMode: state.themeMode,
            starfieldIntensity: state.starfieldIntensity,
            glassEffect: state.glassEffect,
            notificationPrefs: state.notificationPrefs,
            notificationTime: state.notificationTime,
            appLock: state.appLock,
            discreteMode: state.discreteMode,
            autoLockMinutes: state.autoLockMinutes,
            soundEnabled: state.soundEnabled,
            hapticsEnabled: state.hapticsEnabled,
            volume: state.volume,
            lastCheckInDate: state.lastCheckInDate,
            todayMood: state.todayMood,
            todayCraving: state.todayCraving,
            trustedContacts: state.trustedContacts,
            notifications: state.notifications,
            meditationStreak: state.meditationStreak,
            lastMeditationDate: state.lastMeditationDate,
            avatarColor: state.avatarColor,
            profilePhoto: state.profilePhoto,
            articlesRead: state.articlesRead,
            xp: state.xp,
            level: state.level,
            dailyQuests: state.dailyQuests,
            lastQuestReset: state.lastQuestReset,
            challengeCompletedDate: state.challengeCompletedDate,
            challengeStreak: state.challengeStreak,
            xpHistory: state.xpHistory,
            hasSeenTutorial: state.hasSeenTutorial,
            programTasksCompleted: state.programTasksCompleted,
            programLastReset: state.programLastReset,
            withdrawalSymptoms: state.withdrawalSymptoms,
            triggers: state.triggers,
            lifeGoals: state.lifeGoals,
            celebratedMilestones: state.celebratedMilestones,
            relapseHistory: state.relapseHistory,
            currentRelapseProtocol: state.currentRelapseProtocol,
            favoriteAffirmations: state.favoriteAffirmations,
            customAffirmations: state.customAffirmations,
            streakHistory: state.streakHistory,
            notificationPreferences: state.notificationPreferences,
            notificationPermission: state.notificationPermission,
            pwaInstalled: state.pwaInstalled,
            chatNickname: state.chatNickname,
            chatRoomMessages: state.chatRoomMessages,
            currency: state.currency,
            customWeeklyBet: state.customWeeklyBet,
            atlasUsage: state.atlasUsage,
            journalUsage: state.journalUsage,
            chatUsage: state.chatUsage,
            lastSyncAt: state.lastSyncAt
        })
}));
}),
"[project]/src/components/zerobet/components/SoundInit.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SoundInit",
    ()=>SoundInit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/zerobet-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/haptics.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function SoundInit() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Inject store getters so lib managers stay decoupled from the store.
        // The store keeps volume on a 0-100 scale; the SoundManager expects
        // 0-1, so we normalize here.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["configureSoundFromStore"])(()=>{
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].getState();
            return {
                soundEnabled: s.soundEnabled,
                volume: s.volume / 100
            };
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["configureHapticsFromStore"])(()=>{
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"].getState();
            return {
                hapticsEnabled: s.hapticsEnabled
            };
        });
        // Initialize audio context on first user gesture.
        const onFirstGesture = ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].init();
            window.removeEventListener("click", onFirstGesture, true);
            window.removeEventListener("touchstart", onFirstGesture, true);
            window.removeEventListener("keydown", onFirstGesture, true);
        };
        window.addEventListener("click", onFirstGesture, true);
        window.addEventListener("touchstart", onFirstGesture, true);
        window.addEventListener("keydown", onFirstGesture, true);
        return ()=>{
            window.removeEventListener("click", onFirstGesture, true);
            window.removeEventListener("touchstart", onFirstGesture, true);
            window.removeEventListener("keydown", onFirstGesture, true);
        };
    }, []);
    return null;
}
}),
"[project]/src/lib/pwa.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * PWA utilities — service worker registration, notification permission,
 * push subscription, and local notification display.
 *
 * All functions gracefully degrade when the relevant Web API is unavailable
 * (SSR, older browsers, iOS Safari without notification support, etc.).
 */ __turbopack_context__.s([
    "clearServiceWorkerAndCaches",
    ()=>clearServiceWorkerAndCaches,
    "isStandaloneMode",
    ()=>isStandaloneMode,
    "registerServiceWorker",
    ()=>registerServiceWorker,
    "requestNotificationPermission",
    ()=>requestNotificationPermission,
    "showLocalNotification",
    ()=>showLocalNotification,
    "subscribeToPush",
    ()=>subscribeToPush
]);
async function registerServiceWorker() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
async function clearServiceWorkerAndCaches() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    // Clear all caches
    const keys = undefined;
    // Unregister all service workers
    const registrations = undefined;
}
async function requestNotificationPermission() {
    if (("TURBOPACK compile-time value", "undefined") === "undefined" || !("Notification" in window)) {
        return "denied";
    }
    //TURBOPACK unreachable
    ;
}
async function subscribeToPush() {
    if (("TURBOPACK compile-time value", "undefined") === "undefined" || !("serviceWorker" in navigator)) return null;
    //TURBOPACK unreachable
    ;
}
async function showLocalNotification(title, body, /** In-app screen name — forwarded back to the app on click (2.0.7 deep-link). */ deepLinkScreen) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function isStandaloneMode() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/src/components/zerobet/components/PWARegister.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PWARegister",
    ()=>PWARegister
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pwa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pwa.ts [app-ssr] (ecmascript)");
"use client";
;
;
function PWARegister() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let reloading = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pwa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerServiceWorker"])().then((registered)=>{
            if (!registered) return;
            // Listen for SW updates
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker.addEventListener("controllerchange", ()=>{
                    // The new SW has taken control — reload once to pick up new chunks
                    if (!reloading) {
                        reloading = true;
                        window.location.reload();
                    }
                });
                // Listen for messages from the SW
                navigator.serviceWorker.addEventListener("message", (event)=>{
                    if (event.data === "cache-cleared" && !reloading) {
                        reloading = true;
                        window.location.reload();
                    }
                });
                // Force-clear any stale caches on mount (defensive — prevents
                // "module factory not available" after HMR recompiles).
                // Only do this in dev mode to avoid clearing prod cache on every visit.
                if ("TURBOPACK compile-time truthy", 1) {
                    caches.keys().then((keys)=>{
                        const staleCaches = keys.filter((k)=>k !== "zerobet-v4");
                        if (staleCaches.length > 0) {
                            Promise.all(staleCaches.map((k)=>caches.delete(k))).then(()=>{
                                // Also tell the active SW to clear its cache
                                navigator.serviceWorker.controller?.postMessage("clear-cache");
                            });
                        }
                    });
                }
            }
        });
    }, []);
    return null;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
"[project]/node_modules/zustand/esm/vanilla.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>createStore
]);
const createStoreImpl = (createState)=>{
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace)=>{
        const nextState = typeof partial === "function" ? partial(state) : partial;
        if (!Object.is(nextState, state)) {
            const previousState = state;
            state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
            listeners.forEach((listener)=>listener(state, previousState));
        }
    };
    const getState = ()=>state;
    const getInitialState = ()=>initialState;
    const subscribe = (listener)=>{
        listeners.add(listener);
        return ()=>listeners.delete(listener);
    };
    const api = {
        setState,
        getState,
        getInitialState,
        subscribe
    };
    const initialState = state = createState(setState, getState, api);
    return api;
};
const createStore = (createState)=>createState ? createStoreImpl(createState) : createStoreImpl;
;
}),
"[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "create",
    ()=>create,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/vanilla.mjs [app-ssr] (ecmascript)");
;
;
const identity = (arg)=>arg;
function useStore(api, selector = identity) {
    const slice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useSyncExternalStore(api.subscribe, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>selector(api.getState()), [
        api,
        selector
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>selector(api.getInitialState()), [
        api,
        selector
    ]));
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useDebugValue(slice);
    return slice;
}
const createImpl = (createState)=>{
    const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStore"])(createState);
    const useBoundStore = (selector)=>useStore(api, selector);
    Object.assign(useBoundStore, api);
    return useBoundStore;
};
const create = (createState)=>createState ? createImpl(createState) : createImpl;
;
}),
"[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "combine",
    ()=>combine,
    "createJSONStorage",
    ()=>createJSONStorage,
    "devtools",
    ()=>devtools,
    "persist",
    ()=>persist,
    "redux",
    ()=>redux,
    "subscribeWithSelector",
    ()=>subscribeWithSelector,
    "unstable_ssrSafe",
    ()=>ssrSafe
]);
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("node_modules/zustand/esm/middleware.mjs")}`;
    }
};
const reduxImpl = (reducer, initial)=>(set, _get, api)=>{
        api.dispatch = (action)=>{
            set((state)=>reducer(state, action), false, action);
            return action;
        };
        api.dispatchFromDevtools = true;
        return {
            dispatch: (...args)=>api.dispatch(...args),
            ...initial
        };
    };
const redux = reduxImpl;
const trackedConnections = /* @__PURE__ */ new Map();
const getTrackedConnectionState = (name)=>{
    const api = trackedConnections.get(name);
    if (!api) return {};
    return Object.fromEntries(Object.entries(api.stores).map(([key, api2])=>[
            key,
            api2.getState()
        ]));
};
const extractConnectionInformation = (store, extensionConnector, options)=>{
    if (store === void 0) {
        return {
            type: "untracked",
            connection: extensionConnector.connect(options)
        };
    }
    const existingConnection = trackedConnections.get(options.name);
    if (existingConnection) {
        return {
            type: "tracked",
            store,
            ...existingConnection
        };
    }
    const newConnection = {
        connection: extensionConnector.connect(options),
        stores: {}
    };
    trackedConnections.set(options.name, newConnection);
    return {
        type: "tracked",
        store,
        ...newConnection
    };
};
const removeStoreFromTrackedConnections = (name, store)=>{
    if (store === void 0) return;
    const connectionInfo = trackedConnections.get(name);
    if (!connectionInfo) return;
    delete connectionInfo.stores[store];
    if (Object.keys(connectionInfo.stores).length === 0) {
        trackedConnections.delete(name);
    }
};
const findCallerName = (stack)=>{
    var _a, _b;
    if (!stack) return void 0;
    const traceLines = stack.split("\n");
    const apiSetStateLineIndex = traceLines.findIndex((traceLine)=>traceLine.includes("api.setState"));
    if (apiSetStateLineIndex < 0) return void 0;
    const callerLine = ((_a = traceLines[apiSetStateLineIndex + 1]) == null ? void 0 : _a.trim()) || "";
    return (_b = /.+ (.+) .+/.exec(callerLine)) == null ? void 0 : _b[1];
};
const devtoolsImpl = (fn, devtoolsOptions = {})=>(set, get, api)=>{
        const { enabled, anonymousActionType, store, ...options } = devtoolsOptions;
        let extensionConnector;
        try {
            extensionConnector = (enabled != null ? enabled : (__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
        } catch (e) {}
        if (!extensionConnector) {
            return fn(set, get, api);
        }
        const { connection, ...connectionInformation } = extractConnectionInformation(store, extensionConnector, options);
        let isRecording = true;
        api.setState = (state, replace, nameOrAction)=>{
            const r = set(state, replace);
            if (!isRecording) return r;
            const action = nameOrAction === void 0 ? {
                type: anonymousActionType || findCallerName(new Error().stack) || "anonymous"
            } : typeof nameOrAction === "string" ? {
                type: nameOrAction
            } : nameOrAction;
            if (store === void 0) {
                connection == null ? void 0 : connection.send(action, get());
                return r;
            }
            connection == null ? void 0 : connection.send({
                ...action,
                type: `${store}/${action.type}`
            }, {
                ...getTrackedConnectionState(options.name),
                [store]: api.getState()
            });
            return r;
        };
        api.devtools = {
            cleanup: ()=>{
                if (connection && typeof connection.unsubscribe === "function") {
                    connection.unsubscribe();
                }
                removeStoreFromTrackedConnections(options.name, store);
            }
        };
        const setStateFromDevtools = (...a)=>{
            const originalIsRecording = isRecording;
            isRecording = false;
            set(...a);
            isRecording = originalIsRecording;
        };
        const initialState = fn(api.setState, get, api);
        if (connectionInformation.type === "untracked") {
            connection == null ? void 0 : connection.init(initialState);
        } else {
            connectionInformation.stores[connectionInformation.store] = api;
            connection == null ? void 0 : connection.init(Object.fromEntries(Object.entries(connectionInformation.stores).map(([key, store2])=>[
                    key,
                    key === connectionInformation.store ? initialState : store2.getState()
                ])));
        }
        if (api.dispatchFromDevtools && typeof api.dispatch === "function") {
            let didWarnAboutReservedActionType = false;
            const originalDispatch = api.dispatch;
            api.dispatch = (...args)=>{
                if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && args[0].type === "__setState" && !didWarnAboutReservedActionType) {
                    console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.');
                    didWarnAboutReservedActionType = true;
                }
                originalDispatch(...args);
            };
        }
        connection.subscribe((message)=>{
            var _a;
            switch(message.type){
                case "ACTION":
                    if (typeof message.payload !== "string") {
                        console.error("[zustand devtools middleware] Unsupported action format");
                        return;
                    }
                    return parseJsonThen(message.payload, (action)=>{
                        if (action.type === "__setState") {
                            if (store === void 0) {
                                setStateFromDevtools(action.state);
                                return;
                            }
                            if (Object.keys(action.state).length !== 1) {
                                console.error(`
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);
                            }
                            const stateFromDevtools = action.state[store];
                            if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                                return;
                            }
                            if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                                setStateFromDevtools(stateFromDevtools);
                            }
                            return;
                        }
                        if (!api.dispatchFromDevtools) return;
                        if (typeof api.dispatch !== "function") return;
                        api.dispatch(action);
                    });
                case "DISPATCH":
                    switch(message.payload.type){
                        case "RESET":
                            setStateFromDevtools(initialState);
                            if (store === void 0) {
                                return connection == null ? void 0 : connection.init(api.getState());
                            }
                            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                        case "COMMIT":
                            if (store === void 0) {
                                connection == null ? void 0 : connection.init(api.getState());
                                return;
                            }
                            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                        case "ROLLBACK":
                            return parseJsonThen(message.state, (state)=>{
                                if (store === void 0) {
                                    setStateFromDevtools(state);
                                    connection == null ? void 0 : connection.init(api.getState());
                                    return;
                                }
                                setStateFromDevtools(state[store]);
                                connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                            });
                        case "JUMP_TO_STATE":
                        case "JUMP_TO_ACTION":
                            return parseJsonThen(message.state, (state)=>{
                                if (store === void 0) {
                                    setStateFromDevtools(state);
                                    return;
                                }
                                if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                                    setStateFromDevtools(state[store]);
                                }
                            });
                        case "IMPORT_STATE":
                            {
                                const { nextLiftedState } = message.payload;
                                const lastComputedState = (_a = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a.state;
                                if (!lastComputedState) return;
                                if (store === void 0) {
                                    setStateFromDevtools(lastComputedState);
                                } else {
                                    setStateFromDevtools(lastComputedState[store]);
                                }
                                connection == null ? void 0 : connection.send(null, // FIXME no-any
                                nextLiftedState);
                                return;
                            }
                        case "PAUSE_RECORDING":
                            return isRecording = !isRecording;
                    }
                    return;
            }
        });
        return initialState;
    };
const devtools = devtoolsImpl;
const parseJsonThen = (stringified, fn)=>{
    let parsed;
    try {
        parsed = JSON.parse(stringified);
    } catch (e) {
        console.error("[zustand devtools middleware] Could not parse the received json", e);
    }
    if (parsed !== void 0) fn(parsed);
};
const subscribeWithSelectorImpl = (fn)=>(set, get, api)=>{
        const origSubscribe = api.subscribe;
        api.subscribe = (selector, optListener, options)=>{
            let listener = selector;
            if (optListener) {
                const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
                let currentSlice = selector(api.getState());
                listener = (state)=>{
                    const nextSlice = selector(state);
                    if (!equalityFn(currentSlice, nextSlice)) {
                        const previousSlice = currentSlice;
                        optListener(currentSlice = nextSlice, previousSlice);
                    }
                };
                if (options == null ? void 0 : options.fireImmediately) {
                    optListener(currentSlice, currentSlice);
                }
            }
            return origSubscribe(listener);
        };
        const initialState = fn(set, get, api);
        return initialState;
    };
const subscribeWithSelector = subscribeWithSelectorImpl;
function combine(initialState, create) {
    return (...args)=>Object.assign({}, initialState, create(...args));
}
function createJSONStorage(getStorage, options) {
    let storage;
    try {
        storage = getStorage();
    } catch (e) {
        return;
    }
    const persistStorage = {
        getItem: (name)=>{
            var _a;
            const parse = (str2)=>{
                if (str2 === null) {
                    return null;
                }
                return JSON.parse(str2, options == null ? void 0 : options.reviver);
            };
            const str = (_a = storage.getItem(name)) != null ? _a : null;
            if (str instanceof Promise) {
                return str.then(parse);
            }
            return parse(str);
        },
        setItem: (name, newValue)=>storage.setItem(name, JSON.stringify(newValue, options == null ? void 0 : options.replacer)),
        removeItem: (name)=>storage.removeItem(name)
    };
    return persistStorage;
}
const toThenable = (fn)=>(input)=>{
        try {
            const result = fn(input);
            if (result instanceof Promise) {
                return result;
            }
            return {
                then (onFulfilled) {
                    return toThenable(onFulfilled)(result);
                },
                catch (_onRejected) {
                    return this;
                }
            };
        } catch (e) {
            return {
                then (_onFulfilled) {
                    return this;
                },
                catch (onRejected) {
                    return toThenable(onRejected)(e);
                }
            };
        }
    };
const persistImpl = (config, baseOptions)=>(set, get, api)=>{
        let options = {
            storage: createJSONStorage(()=>localStorage),
            partialize: (state)=>state,
            version: 0,
            merge: (persistedState, currentState)=>({
                    ...currentState,
                    ...persistedState
                }),
            ...baseOptions
        };
        let hasHydrated = false;
        let hydrationVersion = 0;
        const hydrationListeners = /* @__PURE__ */ new Set();
        const finishHydrationListeners = /* @__PURE__ */ new Set();
        let storage = options.storage;
        if (!storage) {
            return config((...args)=>{
                console.warn(`[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`);
                set(...args);
            }, get, api);
        }
        const setItem = ()=>{
            const state = options.partialize({
                ...get()
            });
            return storage.setItem(options.name, {
                state,
                version: options.version
            });
        };
        const savedSetState = api.setState;
        api.setState = (state, replace)=>{
            savedSetState(state, replace);
            return setItem();
        };
        const configResult = config((...args)=>{
            set(...args);
            return setItem();
        }, get, api);
        api.getInitialState = ()=>configResult;
        let stateFromStorage;
        const hydrate = ()=>{
            var _a, _b;
            if (!storage) return;
            const currentVersion = ++hydrationVersion;
            hasHydrated = false;
            hydrationListeners.forEach((cb)=>{
                var _a2;
                return cb((_a2 = get()) != null ? _a2 : configResult);
            });
            const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
            return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue)=>{
                if (deserializedStorageValue) {
                    if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
                        if (options.migrate) {
                            const migration = options.migrate(deserializedStorageValue.state, deserializedStorageValue.version);
                            if (migration instanceof Promise) {
                                return migration.then((result)=>[
                                        true,
                                        result
                                    ]);
                            }
                            return [
                                true,
                                migration
                            ];
                        }
                        console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`);
                    } else {
                        return [
                            false,
                            deserializedStorageValue.state
                        ];
                    }
                }
                return [
                    false,
                    void 0
                ];
            }).then((migrationResult)=>{
                var _a2;
                if (currentVersion !== hydrationVersion) {
                    return;
                }
                const [migrated, migratedState] = migrationResult;
                stateFromStorage = options.merge(migratedState, (_a2 = get()) != null ? _a2 : configResult);
                set(stateFromStorage, true);
                if (migrated) {
                    return setItem();
                }
            }).then(()=>{
                if (currentVersion !== hydrationVersion) {
                    return;
                }
                postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
                stateFromStorage = get();
                hasHydrated = true;
                finishHydrationListeners.forEach((cb)=>cb(stateFromStorage));
            }).catch((e)=>{
                if (currentVersion !== hydrationVersion) {
                    return;
                }
                postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
            });
        };
        api.persist = {
            setOptions: (newOptions)=>{
                options = {
                    ...options,
                    ...newOptions
                };
                if (newOptions.storage) {
                    storage = newOptions.storage;
                }
            },
            clearStorage: ()=>{
                storage == null ? void 0 : storage.removeItem(options.name);
            },
            getOptions: ()=>options,
            rehydrate: ()=>hydrate(),
            hasHydrated: ()=>hasHydrated,
            onHydrate: (cb)=>{
                hydrationListeners.add(cb);
                return ()=>{
                    hydrationListeners.delete(cb);
                };
            },
            onFinishHydration: (cb)=>{
                finishHydrationListeners.add(cb);
                return ()=>{
                    finishHydrationListeners.delete(cb);
                };
            }
        };
        if (!options.skipHydration) {
            hydrate();
        }
        return stateFromStorage || configResult;
    };
const persist = persistImpl;
function ssrSafe(config, isSSR = ("TURBOPACK compile-time value", "undefined") === "undefined") {
    return (set, get, api)=>{
        if (!isSSR) {
            return config(set, get, api);
        }
        const ssrSet = ()=>{
            throw new Error("Cannot set state of Zustand store in SSR");
        };
        api.setState = ssrSet;
        return config(ssrSet, get, api);
    };
}
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a10b83a5._.js.map