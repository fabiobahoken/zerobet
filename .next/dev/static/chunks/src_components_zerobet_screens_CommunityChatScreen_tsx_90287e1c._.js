(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/zerobet/screens/CommunityChatScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommunityChatScreen",
    ()=>CommunityChatScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * CommunityChatScreen — real-time community chat for Zerobet.
 *
 * Connects to the socket.io mini-service on port 3003 via the gateway
 * pattern `io("/?XTransformPort=3003")`. Premium-only (free users see a
 * paywall overlay). Three rooms: general / crisis-support / veterans.
 *
 * NOTE on naming: the store already has `chatMessages`/`addChatMessage` for
 * the Atlas AI coach. To avoid a type clash we use `chatRoomMessages` +
 * `addChatRoomMessage` + `clearChatRoomMessages` for community chat.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shuffle.js [app-client] (ecmascript) <export default as Shuffle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wifi.js [app-client] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wifi-off.js [app-client] (ecmascript) <export default as WifiOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flag.js [app-client] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/zerobet-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/useT.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/haptics.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
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
/* ========================================================================
   Constants
   ======================================================================== */ const ROOMS = [
    {
        key: "general",
        labelKey: "chatRoomGeneralLabel",
        emoji: "💬",
        color: "#2DD4BF",
        descKey: "chatRoomGeneralDesc"
    },
    {
        key: "crisis-support",
        labelKey: "chatRoomCrisisLabel",
        emoji: "🆘",
        color: "#FF3B30",
        descKey: "chatRoomCrisisDesc"
    },
    {
        key: "veterans",
        labelKey: "chatRoomVeteransLabel",
        emoji: "👑",
        color: "#FBBF24",
        descKey: "chatRoomVeteransDesc",
        minStreak: 90
    }
];
const ROOM_BY_KEY = Object.fromEntries(_c1 = ROOMS.map(_c = (r)=>[
        r.key,
        r
    ]));
_c2 = ROOM_BY_KEY;
/** Nickname palette — deterministic per nickname hash. */ const NICKNAME_COLORS = [
    "#FF3B30",
    "#F59E0B",
    "#FBBF24",
    "#4ADE80",
    "#2DD4BF",
    "#C084FC",
    "#FF2D55",
    "#2DD4BF",
    "#30D158",
    "#FF6B6B"
];
const NICKNAME_ADJECTIVES = [
    "Fort",
    "Calme",
    "Brave",
    "Libre",
    "Serein",
    "Fier",
    "Patient",
    "Audacieux",
    "Determiné",
    "Lumineux"
];
const NICKNAME_ANIMALS = [
    "Lion",
    "Tigre",
    "Aigle",
    "Panthère",
    "Loup",
    "Faucon",
    "Ours",
    "Renard",
    "Phenix",
    "Dragon"
];
const COMMUNITY_RULES_KEYS = [
    "chatRule1",
    "chatRule2",
    "chatRule3",
    "chatRule4",
    "chatRule5"
];
const QUICK_REACTIONS = [
    "💪",
    "❤️",
    "🙏",
    "🔥",
    "👏"
];
const MAX_MESSAGE_LENGTH = 500;
const MIN_NICKNAME_LENGTH = 3;
const MAX_NICKNAME_LENGTH = 20;
const MAX_STORED_MESSAGES = 100;
const TYPING_DEBOUNCE_MS = 2000;
/* ========================================================================
   Helpers
   ======================================================================== */ function formatTime(timestamp, lang = "fr") {
    try {
        const d = new Date(timestamp);
        if (Number.isNaN(d.getTime())) return "";
        const locale = lang === "en" ? "en-GB" : lang === "es" ? "es-ES" : "fr-FR";
        return d.toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit"
        });
    } catch  {
        return "";
    }
}
function hashString(s) {
    let h = 0;
    for(let i = 0; i < s.length; i++){
        h = (h << 5) - h + s.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}
function getNicknameColor(nickname) {
    if (!nickname) return "#9CA3AF";
    return NICKNAME_COLORS[hashString(nickname) % NICKNAME_COLORS.length];
}
function generateRandomNickname() {
    const adj = NICKNAME_ADJECTIVES[Math.floor(Math.random() * NICKNAME_ADJECTIVES.length)];
    const animal = NICKNAME_ANIMALS[Math.floor(Math.random() * NICKNAME_ANIMALS.length)];
    // Random 2-digit suffix for uniqueness.
    const suffix = Math.floor(10 + Math.random() * 90);
    return `${adj}${animal}${suffix}`;
}
const LEGACY_ENTITIES = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&#x27;": "'"
};
/**
 * Decode HTML entities left over from the old server-side escaping era
 * (pre-2.0.2 messages stored `&#39;` / `&amp;#39;` literally). Runs twice
 * to also repair double-escaped text.
 */ function decodeLegacyEntities(s) {
    let out = s;
    for(let i = 0; i < 2; i++){
        out = out.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, (m)=>LEGACY_ENTITIES[m] ?? m);
    }
    return out;
}
function sanitizeForDisplay(s) {
    // Messages render through React text nodes, which never interpret HTML,
    // so no escaping is needed (escaping caused visible `&#39;` artifacts —
    // bug found in QA). We still normalize: strip control chars, cap length,
    // and repair legacy entity-escaped text.
    const cleaned = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").slice(0, 500);
    return decodeLegacyEntities(cleaned);
}
function isPremiumPlan(plan) {
    return plan !== "free";
}
function StatusDot({ status }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const color = status === "connected" ? "#4ADE80" : status === "connecting" ? "#FBBF24" : "#FF3B30";
    const label = status === "connected" ? t("chatConnected") : status === "connecting" ? t("chatConnecting") : t("chatDisconnected");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10",
        "aria-label": label,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative flex items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute w-2 h-2 rounded-full animate-ping opacity-60",
                        style: {
                            background: color
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative w-2 h-2 rounded-full",
                        style: {
                            background: color
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-white/70 font-medium",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
        lineNumber: 288,
        columnNumber: 5
    }, this);
}
_s(StatusDot, "uZyfTDL5l50aWwhHvO0Py2n2h8Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c3 = StatusDot;
function RoomTab({ room, isActive, activeUsers, isLocked, onSelect }) {
    _s1();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onSelect,
        disabled: isLocked,
        className: `relative shrink-0 px-3.5 py-2 rounded-2xl flex items-center gap-2 text-sm font-medium transition-all btn-press ${isActive ? "text-white" : isLocked ? "text-white/30" : "text-white/70 hover:text-white"}`,
        style: isActive ? {
            background: `linear-gradient(135deg, ${room.color}40, ${room.color}20)`,
            boxShadow: `0 0 12px ${room.color}40, inset 0 0 0 1px ${room.color}50`
        } : {
            background: "rgba(255,255,255,0.04)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)"
        },
        "aria-pressed": isActive,
        "aria-disabled": isLocked,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-base leading-none",
                children: room.emoji
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 342,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-[family-name:var(--font-poppins)]",
                children: t(room.labelKey)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 343,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5",
                style: {
                    background: isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.6)"
                },
                children: isLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                    size: 10
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                    lineNumber: 352,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                            size: 10
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                            lineNumber: 355,
                            columnNumber: 13
                        }, this),
                        activeUsers
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 344,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
        lineNumber: 318,
        columnNumber: 5
    }, this);
}
_s1(RoomTab, "uZyfTDL5l50aWwhHvO0Py2n2h8Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c4 = RoomTab;
function MessageBubble({ msg, isMine, isPremium, onReact }) {
    _s2();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const language = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [showReactions, setShowReactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const initial = (msg.nickname || "?").charAt(0).toUpperCase();
    const color = msg.color || getNicknameColor(msg.nickname);
    if (msg.type === "system") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center my-2",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] italic text-white/40 px-3 py-1 rounded-full bg-white/[0.03]",
                children: msg.content
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 381,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
            lineNumber: 380,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 8
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
        className: `flex gap-2 px-1 ${isMine ? "flex-row-reverse" : "flex-row"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5",
                style: {
                    background: `linear-gradient(135deg, ${color}, ${color}99)`,
                    boxShadow: `0 2px 8px ${color}40`
                },
                "aria-hidden": true,
                children: initial
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 395,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `max-w-[78%] ${isMine ? "items-end" : "items-start"} flex flex-col`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 mb-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold font-[family-name:var(--font-poppins)]",
                                style: {
                                    color
                                },
                                children: isMine ? t("chatYou") : msg.nickname
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 407,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-white/30",
                                children: formatTime(msg.timestamp, language)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 413,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 406,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onDoubleClick: ()=>setShowReactions((v)=>!v),
                        className: `relative rounded-2xl px-3.5 py-2 text-sm leading-relaxed break-words ${isMine ? "gradient-primary text-white rounded-tr-md" : "glass-card text-white/90 rounded-tl-md"}`,
                        style: isMine ? {
                            boxShadow: "0 4px 16px rgba(255,59,48,0.18)"
                        } : undefined,
                        children: [
                            sanitizeForDisplay(msg.content),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: showReactions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 6,
                                        scale: 0.95
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: 6,
                                        scale: 0.95
                                    },
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 28
                                    },
                                    className: `absolute z-10 ${isMine ? "right-0" : "left-0"} -top-12 glass-card-strong rounded-2xl px-2 py-1.5 flex items-center gap-1`,
                                    children: isPremium ? QUICK_REACTIONS.map((emoji)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                onReact(msg, emoji);
                                                setShowReactions(false);
                                            },
                                            className: "w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-base active:scale-90 transition-transform",
                                            "aria-label": t("chatReactWith", {
                                                emoji
                                            }),
                                            children: emoji
                                        }, emoji, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                            lineNumber: 446,
                                            columnNumber: 21
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 px-2 py-1 text-[11px] text-white/70",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                size: 12,
                                                className: "text-[#F59E0B]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                                lineNumber: 460,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t("chatPremiumReactions")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                                lineNumber: 461,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                        lineNumber: 459,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 435,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 417,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 405,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
        lineNumber: 389,
        columnNumber: 5
    }, this);
}
_s2(MessageBubble, "dn3Zj9PQMpu1c/8hzsBpR07Sp5M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c5 = MessageBubble;
function NicknameSetup({ onJoin }) {
    _s3();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const isValid = name.trim().length >= MIN_NICKNAME_LENGTH && name.trim().length <= MAX_NICKNAME_LENGTH;
    const handleShuffle = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].selection();
        setName(generateRandomNickname());
    };
    const handleSubmit = ()=>{
        if (!isValid) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playError();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].error();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t("chatNicknameError", {
                min: MIN_NICKNAME_LENGTH,
                max: MAX_NICKNAME_LENGTH
            }));
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playSuccess();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].success();
        onJoin(name.trim());
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 16
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            type: "spring",
            stiffness: 240,
            damping: 24
        },
        className: "glass-card-strong mesh-bg-aurora rounded-3xl p-6 mt-4 mx-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-3xl gradient-primary glow-green flex items-center justify-center mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                            size: 28,
                            className: "text-white",
                            strokeWidth: 2.2
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                            lineNumber: 512,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 511,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-1",
                        children: t("chatChooseNickname")
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 514,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-white/60 mb-5 leading-relaxed",
                        children: t("chatNicknameHelp")
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 517,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 510,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: name,
                        onChange: (e)=>setName(e.target.value.slice(0, MAX_NICKNAME_LENGTH)),
                        onKeyDown: (e)=>{
                            if (e.key === "Enter" && isValid) handleSubmit();
                        },
                        placeholder: t("chatNicknamePlaceholder"),
                        className: "w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-14 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 transition-all",
                        maxLength: MAX_NICKNAME_LENGTH,
                        "aria-label": t("chatNickname"),
                        autoComplete: "off",
                        autoCapitalize: "off",
                        spellCheck: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 523,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleShuffle,
                        type: "button",
                        className: "absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-white/10 btn-press",
                        "aria-label": t("chatRandomNickname"),
                        title: t("chatRandomNickname"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__["Shuffle"], {
                            size: 16,
                            className: "text-[#F59E0B]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                            lineNumber: 545,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 538,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 522,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4 text-[11px] text-white/40",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: t("chatNicknameRange", {
                            min: MIN_NICKNAME_LENGTH,
                            max: MAX_NICKNAME_LENGTH
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 550,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: isValid ? "text-[#4ADE80]" : "",
                        children: [
                            name.trim().length,
                            "/",
                            MAX_NICKNAME_LENGTH
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 551,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 549,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleSubmit,
                disabled: !isValid,
                className: `w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${isValid ? "gradient-primary glow-green btn-press" : "bg-white/5 text-white/30 cursor-not-allowed"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this),
                    t("chatJoinBtn")
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 556,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
        lineNumber: 504,
        columnNumber: 5
    }, this);
}
_s3(NicknameSetup, "P5O06sii03Trm2eF8ufUgBdO17Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c6 = NicknameSetup;
function CommunityChatScreen() {
    _s4();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    const { navigate, chatNickname, setChatNickname, chatRoomMessages, addChatRoomMessage, clearChatRoomMessages, streakDays, plan, chatUsage, consumeChatMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const isPremium = isPremiumPlan(plan);
    // Zerobet 2.0 — freemium: live chat is free to read; sending is limited
    // to FREE_CHAT_DAILY_LIMIT messages/day on the free plan.
    const FREE_CHAT_DAILY_LIMIT = 5;
    const chatTodayKey = new Date().toISOString().slice(0, 10);
    const chatUsedToday = chatUsage.date === chatTodayKey ? chatUsage.count : 0;
    const chatRemaining = isPremium ? Infinity : Math.max(0, FREE_CHAT_DAILY_LIMIT - chatUsedToday);
    const [activeRoom, setActiveRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("general");
    const [connectionStatus, setConnectionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("connecting");
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [typingUsers, setTypingUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeUsersByRoom, setActiveUsersByRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        general: 0,
        "crisis-support": 0,
        veterans: 0
    });
    const [showRules, setShowRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesListRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typingTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isTypingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    /* -------------------- History (Zerobet 2.1.0) -------------------- */ // The server replays the newest page of room history on join and pages
    // backwards through the rest via history:more. Scroll anchoring keeps the
    // viewport stable while older messages are prepended.
    const [historyHasMore, setHistoryHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingOlder, setLoadingOlder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reachedStart, setReachedStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const prependAnchorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollBottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    /* -------------------- Auto-scroll on new messages -------------------- */ const visibleMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CommunityChatScreen.useMemo[visibleMessages]": ()=>chatRoomMessages.filter({
                "CommunityChatScreen.useMemo[visibleMessages]": (m)=>m.room === activeRoom
            }["CommunityChatScreen.useMemo[visibleMessages]"])
    }["CommunityChatScreen.useMemo[visibleMessages]"], [
        chatRoomMessages,
        activeRoom
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommunityChatScreen.useEffect": ()=>{
            const el = messagesListRef.current;
            if (!el) return;
            // Only autoscroll if user is near the bottom (within 120px).
            const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
            if (nearBottom) {
                messagesEndRef.current?.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    }["CommunityChatScreen.useEffect"], [
        visibleMessages.length,
        activeRoom
    ]);
    // Adjust scroll position after prepend (keep the viewport anchored) or
    // jump to the bottom after the join-history replays. Runs BEFORE the
    // browser paints so the jump is invisible.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "CommunityChatScreen.useLayoutEffect": ()=>{
            const el = messagesListRef.current;
            if (!el) return;
            if (scrollBottomRef.current) {
                scrollBottomRef.current = false;
                el.scrollTop = el.scrollHeight;
                return;
            }
            if (prependAnchorRef.current !== null) {
                const delta = el.scrollHeight - prependAnchorRef.current;
                if (delta > 0) el.scrollTop += delta;
                prependAnchorRef.current = null;
            }
        }
    }["CommunityChatScreen.useLayoutEffect"], [
        visibleMessages.length,
        activeRoom
    ]);
    /* -------------------- Socket lifecycle -------------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommunityChatScreen.useEffect": ()=>{
            if (!chatNickname) return;
            // Zerobet 2.0 — reading the live chat is free; only SENDING is quota-limited.
            // Defer the status update out of the synchronous effect body to
            // satisfy the react-hooks/set-state-in-effect rule (the actual
            // status is also driven by socket connect/disconnect events below).
            queueMicrotask({
                "CommunityChatScreen.useEffect": ()=>setConnectionStatus("connecting")
            }["CommunityChatScreen.useEffect"]);
            // Reset history state for the new room.
            queueMicrotask({
                "CommunityChatScreen.useEffect": ()=>{
                    setHistoryHasMore(false);
                    setLoadingOlder(false);
                    setReachedStart(false);
                }
            }["CommunityChatScreen.useEffect"]);
            const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])("/?XTransformPort=3003", {
                transports: [
                    "websocket",
                    "polling"
                ],
                forceNew: true,
                reconnection: true,
                reconnectionAttempts: 8,
                reconnectionDelay: 1200,
                timeout: 10000
            });
            socketRef.current = socket;
            socket.on("connect", {
                "CommunityChatScreen.useEffect": ()=>{
                    setConnectionStatus("connected");
                    const payload = {
                        nickname: chatNickname,
                        room: activeRoom,
                        streakDays,
                        color: getNicknameColor(chatNickname)
                    };
                    socket.emit("join", payload);
                }
            }["CommunityChatScreen.useEffect"]);
            socket.on("disconnect", {
                "CommunityChatScreen.useEffect": ()=>{
                    setConnectionStatus("disconnected");
                }
            }["CommunityChatScreen.useEffect"]);
            socket.on("connect_error", {
                "CommunityChatScreen.useEffect": ()=>{
                    setConnectionStatus("disconnected");
                }
            }["CommunityChatScreen.useEffect"]);
            // Server-side flood control feedback (Zerobet 2.0.2). The limiter is
            // authoritative on the server — this just surfaces a friendly message.
            socket.on("rate-limited", {
                "CommunityChatScreen.useEffect": (data)=>{
                    const secs = Math.max(1, Math.ceil((data?.retryAfterMs ?? 0) / 1000));
                    if (data?.scope === "join") {
                        // Room-switch flood: silent reconnect shortly after; no toast spam.
                        return;
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning(t("chatRateLimited", {
                        n: secs
                    }));
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
                }
            }["CommunityChatScreen.useEffect"]);
            socket.on("message", {
                "CommunityChatScreen.useEffect": (msg)=>{
                    if (!msg || typeof msg.content !== "string") return;
                    const normalized = {
                        id: msg.id,
                        nickname: msg.nickname,
                        content: msg.content,
                        timestamp: msg.timestamp,
                        color: msg.color || getNicknameColor(msg.nickname),
                        type: msg.type === "system" ? "system" : "user",
                        room: msg.room || activeRoom
                    };
                    addChatRoomMessage(normalized);
                    // Don't play sound/haptic for system messages or our own echoed messages.
                    if (normalized.type === "user" && normalized.nickname !== chatNickname) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playPop();
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
                    }
                }
            }["CommunityChatScreen.useEffect"]);
            socket.on("user-joined", {
                "CommunityChatScreen.useEffect": (_data)=>{
                // System message is broadcast separately by the server — no need to
                // duplicate here. Just a tiny tick.
                }
            }["CommunityChatScreen.useEffect"]);
            // ---- Zerobet 2.1.0 — join replay of the newest history page ----
            socket.on("history", {
                "CommunityChatScreen.useEffect": (payload)=>{
                    try {
                        if (!payload || payload.room !== activeRoom || !Array.isArray(payload.messages) || payload.messages.length === 0) return;
                        const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState();
                        const existing = new Set(st.chatRoomMessages.map({
                            "CommunityChatScreen.useEffect": (m)=>m.id
                        }["CommunityChatScreen.useEffect"]));
                        const toAdd = payload.messages.filter({
                            "CommunityChatScreen.useEffect.toAdd": (m)=>m && typeof m.id === "string" && typeof m.content === "string" && !existing.has(m.id)
                        }["CommunityChatScreen.useEffect.toAdd"]).map({
                            "CommunityChatScreen.useEffect.toAdd": (m)=>({
                                    id: m.id,
                                    nickname: m.nickname ?? "",
                                    content: m.content,
                                    timestamp: m.timestamp ?? new Date().toISOString(),
                                    color: m.color || getNicknameColor(m.nickname),
                                    type: m.type === "system" ? "system" : "user",
                                    room: m.room || activeRoom
                                })
                        }["CommunityChatScreen.useEffect.toAdd"]);
                        if (toAdd.length > 0) st.prependChatRoomMessages(toAdd);
                        setHistoryHasMore(!!payload.hasMore);
                        // Start at the bottom (newest messages), like any chat app.
                        scrollBottomRef.current = true;
                    } catch (err) {
                        console.error("[chat] history error:", err);
                    }
                }
            }["CommunityChatScreen.useEffect"]);
            // ---- Zerobet 2.1.0 — older history page (pagination) ----
            socket.on("history:more:result", {
                "CommunityChatScreen.useEffect": (payload)=>{
                    try {
                        if (!payload || payload.room !== activeRoom) return;
                        setLoadingOlder(false);
                        const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState();
                        const existing = new Set(st.chatRoomMessages.map({
                            "CommunityChatScreen.useEffect": (m)=>m.id
                        }["CommunityChatScreen.useEffect"]));
                        const toAdd = (payload.messages ?? []).filter({
                            "CommunityChatScreen.useEffect.toAdd": (m)=>m && typeof m.id === "string" && typeof m.content === "string" && !existing.has(m.id)
                        }["CommunityChatScreen.useEffect.toAdd"]).map({
                            "CommunityChatScreen.useEffect.toAdd": (m)=>({
                                    id: m.id,
                                    nickname: m.nickname ?? "",
                                    content: m.content,
                                    timestamp: m.timestamp ?? new Date().toISOString(),
                                    color: m.color || getNicknameColor(m.nickname),
                                    type: m.type === "system" ? "system" : "user",
                                    room: m.room || activeRoom
                                })
                        }["CommunityChatScreen.useEffect.toAdd"]);
                        if (toAdd.length > 0) st.prependChatRoomMessages(toAdd);
                        setHistoryHasMore(!!payload.hasMore);
                        if (!payload.hasMore) setReachedStart(true);
                    } catch (err) {
                        console.error("[chat] history:more error:", err);
                        setLoadingOlder(false);
                    }
                }
            }["CommunityChatScreen.useEffect"]);
            socket.on("user-left", {
                "CommunityChatScreen.useEffect": (_data)=>{
                // Same — server already broadcasts a system message.
                }
            }["CommunityChatScreen.useEffect"]);
            socket.on("typing", {
                "CommunityChatScreen.useEffect": (data)=>{
                    if (!data || data.nickname === chatNickname) return;
                    setTypingUsers({
                        "CommunityChatScreen.useEffect": (prev)=>prev.includes(data.nickname) ? prev : [
                                ...prev,
                                data.nickname
                            ]
                    }["CommunityChatScreen.useEffect"]);
                }
            }["CommunityChatScreen.useEffect"]);
            socket.on("stop-typing", {
                "CommunityChatScreen.useEffect": (data)=>{
                    if (!data) return;
                    setTypingUsers({
                        "CommunityChatScreen.useEffect": (prev)=>prev.filter({
                                "CommunityChatScreen.useEffect": (n)=>n !== data.nickname
                            }["CommunityChatScreen.useEffect"])
                    }["CommunityChatScreen.useEffect"]);
                }
            }["CommunityChatScreen.useEffect"]);
            socket.on("active-users", {
                "CommunityChatScreen.useEffect": (count)=>{
                    const n = Math.max(0, Number(count) || 0);
                    setActiveUsersByRoom({
                        "CommunityChatScreen.useEffect": (prev)=>({
                                ...prev,
                                [activeRoom]: n
                            })
                    }["CommunityChatScreen.useEffect"]);
                }
            }["CommunityChatScreen.useEffect"]);
            return ({
                "CommunityChatScreen.useEffect": ()=>{
                    try {
                        socket.emit("leave", {
                            nickname: chatNickname,
                            room: activeRoom
                        });
                    } catch  {
                    /* noop */ }
                    socket.disconnect();
                    socketRef.current = null;
                    setTypingUsers([]);
                }
            })["CommunityChatScreen.useEffect"];
        }
    }["CommunityChatScreen.useEffect"], [
        chatNickname,
        activeRoom,
        isPremium
    ]);
    /* -------------------- Typing indicator -------------------- */ const notifyTyping = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommunityChatScreen.useCallback[notifyTyping]": ()=>{
            const socket = socketRef.current;
            if (!socket || !socket.connected || !chatNickname) return;
            if (!isTypingRef.current) {
                isTypingRef.current = true;
                socket.emit("typing", {
                    nickname: chatNickname,
                    room: activeRoom
                });
            }
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout({
                "CommunityChatScreen.useCallback[notifyTyping]": ()=>{
                    isTypingRef.current = false;
                    socket.emit("stop-typing", {
                        nickname: chatNickname,
                        room: activeRoom
                    });
                }
            }["CommunityChatScreen.useCallback[notifyTyping]"], TYPING_DEBOUNCE_MS);
        }
    }["CommunityChatScreen.useCallback[notifyTyping]"], [
        chatNickname,
        activeRoom
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommunityChatScreen.useEffect": ()=>{
            return ({
                "CommunityChatScreen.useEffect": ()=>{
                    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                }
            })["CommunityChatScreen.useEffect"];
        }
    }["CommunityChatScreen.useEffect"], []);
    /* -------------------- Handlers -------------------- */ const handleJoinChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommunityChatScreen.useCallback[handleJoinChat]": (nickname)=>{
            setChatNickname(nickname);
            clearChatRoomMessages();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(t("chatWelcome", {
                nickname
            }));
        }
    }["CommunityChatScreen.useCallback[handleJoinChat]"], [
        setChatNickname,
        clearChatRoomMessages,
        t
    ]);
    const handleSelectRoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommunityChatScreen.useCallback[handleSelectRoom]": (room)=>{
            if (room === activeRoom) return;
            const cfg = ROOM_BY_KEY[room];
            if (cfg.minStreak && streakDays < cfg.minStreak) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playError();
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].warning();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t("chatRoomLockedMsg", {
                    label: t(cfg.labelKey),
                    n: cfg.minStreak
                }));
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].selection();
            // Leave current room, switch, then re-join via the useEffect dependency.
            const socket = socketRef.current;
            if (socket && socket.connected) {
                socket.emit("leave", {
                    nickname: chatNickname,
                    room: activeRoom
                });
            }
            setTypingUsers([]);
            setActiveRoom(room);
        // The useEffect will re-run on activeRoom change and emit join.
        }
    }["CommunityChatScreen.useCallback[handleSelectRoom]"], [
        activeRoom,
        chatNickname,
        streakDays,
        t
    ]);
    // Zerobet 2.1.0 — request the next older page of room history.
    const loadOlder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommunityChatScreen.useCallback[loadOlder]": ()=>{
            const socket = socketRef.current;
            if (!socket || !socket.connected || loadingOlder) return;
            const roomMsgs = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState().chatRoomMessages.filter({
                "CommunityChatScreen.useCallback[loadOlder].roomMsgs": (m)=>m.room === activeRoom
            }["CommunityChatScreen.useCallback[loadOlder].roomMsgs"]);
            const oldest = roomMsgs[0];
            if (!oldest) return;
            // Capture the current list height BEFORE the prepend — the layout effect
            // uses it to keep the viewport anchored on the same messages.
            prependAnchorRef.current = messagesListRef.current?.scrollHeight ?? null;
            setLoadingOlder(true);
            socket.emit("history:more", {
                room: activeRoom,
                beforeId: oldest.id
            });
        }
    }["CommunityChatScreen.useCallback[loadOlder]"], [
        activeRoom,
        loadingOlder
    ]);
    const handleSend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommunityChatScreen.useCallback[handleSend]": ()=>{
            const content = input.trim();
            if (!content) return;
            // Zerobet 2.0 — free plan: 5 messages/day quota (reading stays free).
            if (!isPremium) {
                const todayKey = new Date().toISOString().slice(0, 10);
                const used = chatUsage.date === todayKey ? chatUsage.count : 0;
                if (used >= FREE_CHAT_DAILY_LIMIT) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playError();
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].error();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t("chatQuotaToast", {
                        n: FREE_CHAT_DAILY_LIMIT
                    }), {
                        action: {
                            label: t("chatQuotaUpgrade"),
                            onClick: {
                                "CommunityChatScreen.useCallback[handleSend]": ()=>navigate("paywall")
                            }["CommunityChatScreen.useCallback[handleSend]"]
                        }
                    });
                    return;
                }
                consumeChatMessage();
            }
            const socket = socketRef.current;
            if (!socket || !socket.connected) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playError();
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].error();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(t("chatOfflineRetry"));
                return;
            }
            const payload = {
                nickname: chatNickname,
                content,
                room: activeRoom,
                color: getNicknameColor(chatNickname)
            };
            socket.emit("message", payload);
            // Local echo — server broadcasts to everyone including us, but a local
            // echo makes the UI feel instant even on high-latency connections.
            const echo = {
                id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                nickname: chatNickname,
                content,
                timestamp: new Date().toISOString(),
                color: payload.color,
                type: "user",
                room: activeRoom
            };
            addChatRoomMessage(echo);
            // Stop typing indicator.
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            isTypingRef.current = false;
            socket.emit("stop-typing", {
                nickname: chatNickname,
                room: activeRoom
            });
            setTypingUsers({
                "CommunityChatScreen.useCallback[handleSend]": (prev)=>prev.filter({
                        "CommunityChatScreen.useCallback[handleSend]": (n)=>n !== chatNickname
                    }["CommunityChatScreen.useCallback[handleSend]"])
            }["CommunityChatScreen.useCallback[handleSend]"]);
            setInput("");
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playPop();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
        }
    }["CommunityChatScreen.useCallback[handleSend]"], [
        input,
        chatNickname,
        activeRoom,
        addChatRoomMessage,
        t,
        isPremium,
        chatUsage,
        consumeChatMessage,
        navigate
    ]);
    const handleInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommunityChatScreen.useCallback[handleInputChange]": (e)=>{
            const v = e.target.value.slice(0, MAX_MESSAGE_LENGTH);
            setInput(v);
            if (v.trim()) notifyTyping();
        }
    }["CommunityChatScreen.useCallback[handleInputChange]"], [
        notifyTyping
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommunityChatScreen.useCallback[handleKeyDown]": (e)=>{
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        }
    }["CommunityChatScreen.useCallback[handleKeyDown]"], [
        handleSend
    ]);
    const handleReact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommunityChatScreen.useCallback[handleReact]": (msg, emoji)=>{
            if (!isPremium) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playPop();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(t("chatReactionSent", {
                emoji,
                nickname: msg.nickname
            }), {
                duration: 1500
            });
        }
    }["CommunityChatScreen.useCallback[handleReact]"], [
        isPremium,
        t
    ]);
    const handleRetry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommunityChatScreen.useCallback[handleRetry]": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].medium();
            const socket = socketRef.current;
            if (socket) {
                socket.disconnect();
                socket.connect();
            } else {
                // Force effect to re-run by toggling connection status.
                setConnectionStatus("connecting");
            }
        }
    }["CommunityChatScreen.useCallback[handleRetry]"], []);
    const handleBack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommunityChatScreen.useCallback[handleBack]": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
            navigate("dashboard");
        }
    }["CommunityChatScreen.useCallback[handleBack]"], [
        navigate
    ]);
    /* -------------------- (Zerobet 2.0) hard paywall removed — free users
     read the chat freely and send up to 5 messages/day (quota chip below). */ /* -------------------- Nickname gate -------------------- */ if (!chatNickname) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Header, {
                    onBack: handleBack,
                    status: "connecting",
                    activeUsers: 0
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                    lineNumber: 1065,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NicknameSetup, {
                    onJoin: handleJoinChat
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                    lineNumber: 1070,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
            lineNumber: 1064,
            columnNumber: 7
        }, this);
    }
    const activeRoomCfg = ROOM_BY_KEY[activeRoom];
    const typingDisplay = typingUsers.slice(0, 2).join(", ");
    const extraTyping = typingUsers.length - 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Header, {
                onBack: handleBack,
                status: connectionStatus,
                activeUsers: activeUsersByRoom[activeRoom]
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 1081,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 pt-3 pb-2 sticky top-[68px] z-20 bg-[#070B0E]/80 backdrop-blur-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 overflow-x-auto no-scrollbar pb-1",
                        children: ROOMS.map((room)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoomTab, {
                                room: room,
                                isActive: activeRoom === room.key,
                                activeUsers: activeUsersByRoom[room.key],
                                isLocked: !!room.minStreak && streakDays < room.minStreak,
                                onSelect: ()=>handleSelectRoom(room.key)
                            }, room.key, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1091,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1089,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-white/40 mt-1 px-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mr-1",
                                children: activeRoomCfg.emoji
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1102,
                                columnNumber: 11
                            }, this),
                            t(activeRoomCfg.descKey)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 1088,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: activeRoom === "crisis-support" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    className: "mx-4 mt-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl p-3 flex items-start gap-3",
                        style: {
                            background: "linear-gradient(135deg, rgba(255,59,48,0.18), rgba(245, 158, 11,0.10))",
                            boxShadow: "inset 0 0 0 1px rgba(255,59,48,0.30)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                size: 20,
                                className: "text-[#FF3B30] shrink-0 mt-0.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1124,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-white/85 leading-snug",
                                        children: t("chatCrisisRoomBanner")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                        lineNumber: 1129,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].medium();
                                            navigate("sos");
                                        },
                                        className: "mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF3B30] text-white text-xs font-semibold btn-press glow-red",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                                lineNumber: 1140,
                                                columnNumber: 19
                                            }, this),
                                            t("chatCallSos")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                        lineNumber: 1132,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1128,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1116,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                    lineNumber: 1110,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 1108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: connectionStatus === "disconnected" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    className: "mx-4 mt-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl p-3 flex items-center gap-3 glass-card border border-[#FF3B30]/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__["WifiOff"], {
                                size: 16,
                                className: "text-[#FF3B30] shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1159,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[12px] text-white/70 flex-1",
                                children: t("chatConnectionLost")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1160,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleRetry,
                                className: "px-3 py-1.5 rounded-xl bg-[#F59E0B] text-white text-xs font-semibold btn-press",
                                children: t("chatRetry")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1163,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1158,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                    lineNumber: 1152,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 1150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: messagesListRef,
                className: "flex-1 overflow-y-auto custom-scroll px-4 py-3 min-h-[280px] max-h-[calc(100vh-280px)]",
                children: [
                    visibleMessages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full flex flex-col items-center justify-center text-center py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-14 h-14 rounded-2xl glass-card flex items-center justify-center mb-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                    size: 24,
                                    className: "text-white/40"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1182,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1181,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/50 text-sm",
                                children: t("chatEmptyState")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1184,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1180,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            (historyHasMore || loadingOlder || reachedStart) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center py-1",
                                children: historyHasMore ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: loadOlder,
                                    disabled: loadingOlder,
                                    className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card text-[11px] font-medium text-[#5EEAD4] hover:text-white hover:border-[#2DD4BF]/40 transition-colors focus-ring disabled:opacity-50 active:scale-95",
                                    children: [
                                        loadingOlder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            size: 12,
                                            className: "animate-spin",
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                            lineNumber: 1200,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                            size: 12,
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                            lineNumber: 1202,
                                            columnNumber: 23
                                        }, this),
                                        loadingOlder ? t("chatLoadingOlder") : t("chatLoadOlder")
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1194,
                                    columnNumber: 19
                                }, this) : reachedStart ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/25",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-px w-8 bg-white/10",
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                            lineNumber: 1208,
                                            columnNumber: 21
                                        }, this),
                                        t("chatHistoryStart"),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-px w-8 bg-white/10",
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                            lineNumber: 1210,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1207,
                                    columnNumber: 19
                                }, this) : null
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1192,
                                columnNumber: 15
                            }, this),
                            visibleMessages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageBubble, {
                                    msg: msg,
                                    isMine: msg.nickname === chatNickname && msg.type === "user",
                                    isPremium: isPremium,
                                    onReact: handleReact
                                }, msg.id, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1216,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: messagesEndRef
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1224,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1189,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: typingUsers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 6
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: 6
                            },
                            className: "flex items-center gap-2 px-2 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] text-white/50 italic",
                                    children: [
                                        typingDisplay,
                                        extraTyping > 0 ? ` +${extraTyping}` : "",
                                        " ",
                                        typingUsers.length > 1 ? t("chatTypingMany") : t("chatTypingOne")
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1237,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex gap-0.5",
                                    children: [
                                        0,
                                        1,
                                        2
                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                            animate: {
                                                opacity: [
                                                    0.3,
                                                    1,
                                                    0.3
                                                ],
                                                y: [
                                                    0,
                                                    -2,
                                                    0
                                                ]
                                            },
                                            transition: {
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: i * 0.18
                                            },
                                            className: "w-1.5 h-1.5 rounded-full bg-white/40"
                                        }, i, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                            lineNumber: 1244,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1242,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                            lineNumber: 1231,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1229,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 1175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-4 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
                            setShowRules((v)=>!v);
                        },
                        className: "w-full flex items-center justify-between px-3 py-2 rounded-xl glass-card text-xs text-white/70",
                        "aria-expanded": showRules,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                        size: 13,
                                        className: "text-[#2DD4BF]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                        lineNumber: 1273,
                                        columnNumber: 13
                                    }, this),
                                    t("chatRulesTitle")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1272,
                                columnNumber: 11
                            }, this),
                            showRules ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                size: 14,
                                className: "text-white/40"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1277,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                size: 14,
                                className: "text-white/40"
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1279,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showRules && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                            className: "overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card rounded-2xl p-4 mt-1 space-y-2",
                                children: [
                                    COMMUNITY_RULES_KEYS.map((ruleKey, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-2 text-[12px] text-white/70",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#F59E0B] font-bold mt-0.5",
                                                    children: [
                                                        i + 1,
                                                        "."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                                    lineNumber: 1296,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: t(ruleKey)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                                    lineNumber: 1299,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                            lineNumber: 1292,
                                            columnNumber: 19
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playClick();
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].light();
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(t("chatReportHint"));
                                        },
                                        className: "mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 text-[11px] text-white/60 hover:bg-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"], {
                                                size: 11
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                                lineNumber: 1312,
                                                columnNumber: 19
                                            }, this),
                                            t("chatReportBtn")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                        lineNumber: 1302,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1290,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                            lineNumber: 1284,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1282,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 1262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky bottom-0 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-2 z-20 bg-[#070B0E]/85 backdrop-blur-md",
                children: [
                    !isPremium && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-1.5 px-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-white/40",
                                children: chatRemaining > 0 ? t("chatQuotaRemaining", {
                                    n: chatRemaining
                                }) : t("chatQuotaEmpty")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1326,
                                columnNumber: 13
                            }, this),
                            chatRemaining <= 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>navigate("paywall"),
                                className: "text-[10px] font-semibold text-[#FBBF24] hover:underline",
                                children: t("chatQuotaUpgrade")
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1332,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1325,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-card-strong rounded-3xl p-2 flex items-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: input,
                                onChange: handleInputChange,
                                onKeyDown: handleKeyDown,
                                placeholder: t("chatInputPlaceholder", {
                                    room: t(activeRoomCfg.labelKey)
                                }),
                                rows: 1,
                                maxLength: MAX_MESSAGE_LENGTH,
                                className: "flex-1 bg-transparent resize-none px-3 py-2 text-white placeholder:text-white/30 focus:outline-none text-sm max-h-28 custom-scroll",
                                "aria-label": t("chatMessage"),
                                style: {
                                    minHeight: 36
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1342,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSend,
                                disabled: !input.trim() || connectionStatus !== "connected",
                                className: `w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all ${input.trim() && connectionStatus === "connected" ? "gradient-primary glow-green btn-press" : "bg-white/5 text-white/30"}`,
                                "aria-label": t("chatSend"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                    size: 16,
                                    className: "text-white"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1363,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1353,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1341,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mt-1 px-2 text-[10px] text-white/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: connectionStatus === "connected" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"], {
                                            size: 10,
                                            className: "text-[#4ADE80]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                            lineNumber: 1370,
                                            columnNumber: 17
                                        }, this),
                                        activeUsersByRoom[activeRoom] === 1 ? t("chatConnectedMemberOne") : t("chatConnectedMembers", {
                                            n: activeUsersByRoom[activeRoom]
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1369,
                                    columnNumber: 15
                                }, this) : connectionStatus === "connecting" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            size: 10,
                                            className: "animate-spin text-[#FBBF24]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                            lineNumber: 1379,
                                            columnNumber: 17
                                        }, this),
                                        t("chatConnecting")
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1378,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__["WifiOff"], {
                                            size: 10,
                                            className: "text-[#FF3B30]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                            lineNumber: 1384,
                                            columnNumber: 17
                                        }, this),
                                        t("chatOffline")
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1383,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1367,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: input.length > MAX_MESSAGE_LENGTH - 50 ? "text-[#F59E0B]" : "",
                                children: [
                                    input.length,
                                    "/",
                                    MAX_MESSAGE_LENGTH
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1389,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1366,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                lineNumber: 1322,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
        lineNumber: 1080,
        columnNumber: 5
    }, this);
}
_s4(CommunityChatScreen, "6Yu+36dix2H6+014KOKiMsMc8DE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c7 = CommunityChatScreen;
function Header({ onBack, status, activeUsers }) {
    _s5();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-30 px-4 pt-12 pb-3 bg-[#070B0E]/85 backdrop-blur-md border-b border-white/5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onBack,
                    className: "w-10 h-10 rounded-2xl glass-card-strong flex items-center justify-center btn-press",
                    "aria-label": t("back"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                        size: 20,
                        className: "text-white"
                    }, void 0, false, {
                        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                        lineNumber: 1418,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                    lineNumber: 1413,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex items-center gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-2xl gradient-primary glow-green flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                size: 18,
                                className: "text-white",
                                strokeWidth: 2.2
                            }, void 0, false, {
                                fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                lineNumber: 1423,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                            lineNumber: 1422,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "leading-tight",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-base font-extrabold text-white font-[family-name:var(--font-poppins)]",
                                    children: t("chatTitle")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1426,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-white/50",
                                    children: t("chatSubtitle")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1429,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                            lineNumber: 1425,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                    lineNumber: 1421,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-end gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusDot, {
                            status: status
                        }, void 0, false, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                            lineNumber: 1436,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] text-white/40 flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                    size: 10
                                }, void 0, false, {
                                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                                    lineNumber: 1438,
                                    columnNumber: 13
                                }, this),
                                t("chatUsersOnline", {
                                    n: activeUsers
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                            lineNumber: 1437,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
                    lineNumber: 1435,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
            lineNumber: 1412,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/zerobet/screens/CommunityChatScreen.tsx",
        lineNumber: 1411,
        columnNumber: 5
    }, this);
}
_s5(Header, "uZyfTDL5l50aWwhHvO0Py2n2h8Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$useT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useT"]
    ];
});
_c8 = Header;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "ROOM_BY_KEY$Object.fromEntries$ROOMS.map");
__turbopack_context__.k.register(_c1, "ROOM_BY_KEY$Object.fromEntries");
__turbopack_context__.k.register(_c2, "ROOM_BY_KEY");
__turbopack_context__.k.register(_c3, "StatusDot");
__turbopack_context__.k.register(_c4, "RoomTab");
__turbopack_context__.k.register(_c5, "MessageBubble");
__turbopack_context__.k.register(_c6, "NicknameSetup");
__turbopack_context__.k.register(_c7, "CommunityChatScreen");
__turbopack_context__.k.register(_c8, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/zerobet/screens/CommunityChatScreen.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/zerobet/screens/CommunityChatScreen.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_zerobet_screens_CommunityChatScreen_tsx_90287e1c._.js.map