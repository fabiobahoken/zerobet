(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/use-toast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reducer",
    ()=>reducer,
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
// Inspired by react-hot-toast library
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    _s();
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](memoryState);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useToast.useEffect": ()=>{
            listeners.push(setState);
            return ({
                "useToast.useEffect": ()=>{
                    const index = listeners.indexOf(setState);
                    if (index > -1) {
                        listeners.splice(index, 1);
                    }
                }
            })["useToast.useEffect"];
        }
    }["useToast.useEffect"], [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}
_s(useToast, "SPWE98mLGnlsnNfIwu/IAKTSZtk=");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toast",
    ()=>Toast,
    "ToastAction",
    ()=>ToastAction,
    "ToastClose",
    ()=>ToastClose,
    "ToastDescription",
    ()=>ToastDescription,
    "ToastProvider",
    ()=>ToastProvider,
    "ToastTitle",
    ()=>ToastTitle,
    "ToastViewport",
    ()=>ToastViewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const ToastProvider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"];
const ToastViewport = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = ToastViewport;
ToastViewport.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"].displayName;
const toastVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background text-foreground",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Toast = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(toastVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = Toast;
Toast.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
const ToastAction = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = ToastAction;
ToastAction.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"].displayName;
const ToastClose = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/toast.tsx",
            lineNumber: 86,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = ToastClose;
ToastClose.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"].displayName;
const ToastTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-semibold [&+div]:text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = ToastTitle;
ToastTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const ToastDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm opacity-90", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 107,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = ToastDescription;
ToastDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "ToastViewport$React.forwardRef");
__turbopack_context__.k.register(_c1, "ToastViewport");
__turbopack_context__.k.register(_c2, "Toast$React.forwardRef");
__turbopack_context__.k.register(_c3, "Toast");
__turbopack_context__.k.register(_c4, "ToastAction$React.forwardRef");
__turbopack_context__.k.register(_c5, "ToastAction");
__turbopack_context__.k.register(_c6, "ToastClose$React.forwardRef");
__turbopack_context__.k.register(_c7, "ToastClose");
__turbopack_context__.k.register(_c8, "ToastTitle$React.forwardRef");
__turbopack_context__.k.register(_c9, "ToastTitle");
__turbopack_context__.k.register(_c10, "ToastDescription$React.forwardRef");
__turbopack_context__.k.register(_c11, "ToastDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/toaster.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Toaster() {
    _s();
    const { toasts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastProvider"], {
        children: [
            toasts.map(function({ id, title, description, action, ...props }) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toast"], {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastTitle"], {
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/toaster.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastDescription"], {
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/toaster.tsx",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/toaster.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        action,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastClose"], {}, void 0, false, {
                            fileName: "[project]/src/components/ui/toaster.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/src/components/ui/toaster.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastViewport"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/toaster.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/toaster.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(Toaster, "1YTCnXrq2qRowe0H/LBWLjtXoYc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = Toaster;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/sonner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const Toaster = ({ ...props })=>{
    _s();
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)"
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sonner.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Toaster, "EriOrahfenYKDCErPq+L6926Dw4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = Toaster;
;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/sound.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        try {
            this.context = new AudioCtx();
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = this.volume;
            this.masterGain.connect(this.context.destination);
            this.initialized = true;
        } catch  {
            this.context = null;
            this.masterGain = null;
        }
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/haptics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return typeof window.navigator !== "undefined" && typeof window.navigator.vibrate === "function";
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/data/relapse-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/zerobet-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/haptics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/relapse-data.ts [app-client] (ecmascript)");
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
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].playCoin();
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["haptics"].selection();
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
                currentRelapseProtocol: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$relapse$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROTOCOL_STEPS"].map((step)=>({
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
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/zerobet/components/SoundInit.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SoundInit",
    ()=>SoundInit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/zerobet-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sound.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/haptics.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function SoundInit() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SoundInit.useEffect": ()=>{
            // Inject store getters so lib managers stay decoupled from the store.
            // The store keeps volume on a 0-100 scale; the SoundManager expects
            // 0-1, so we normalize here.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["configureSoundFromStore"])({
                "SoundInit.useEffect": ()=>{
                    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState();
                    return {
                        soundEnabled: s.soundEnabled,
                        volume: s.volume / 100
                    };
                }
            }["SoundInit.useEffect"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$haptics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["configureHapticsFromStore"])({
                "SoundInit.useEffect": ()=>{
                    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$zerobet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"].getState();
                    return {
                        hapticsEnabled: s.hapticsEnabled
                    };
                }
            }["SoundInit.useEffect"]);
            // Initialize audio context on first user gesture.
            const onFirstGesture = {
                "SoundInit.useEffect.onFirstGesture": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].init();
                    window.removeEventListener("click", onFirstGesture, true);
                    window.removeEventListener("touchstart", onFirstGesture, true);
                    window.removeEventListener("keydown", onFirstGesture, true);
                }
            }["SoundInit.useEffect.onFirstGesture"];
            window.addEventListener("click", onFirstGesture, true);
            window.addEventListener("touchstart", onFirstGesture, true);
            window.addEventListener("keydown", onFirstGesture, true);
            return ({
                "SoundInit.useEffect": ()=>{
                    window.removeEventListener("click", onFirstGesture, true);
                    window.removeEventListener("touchstart", onFirstGesture, true);
                    window.removeEventListener("keydown", onFirstGesture, true);
                }
            })["SoundInit.useEffect"];
        }
    }["SoundInit.useEffect"], []);
    return null;
}
_s(SoundInit, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = SoundInit;
var _c;
__turbopack_context__.k.register(_c, "SoundInit");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/pwa.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!("serviceWorker" in navigator)) return false;
    try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
            // updateViaCache: "none" ensures the SW itself is always fetched fresh
            updateViaCache: "none"
        });
        // Check for updates on every page load (in case the SW file changed)
        registration.update().catch(()=>{
        // Silent fail — update is non-critical
        });
        console.log("[PWA] Service worker registered:", registration.scope);
        return true;
    } catch (error) {
        console.error("[PWA] Service worker registration failed:", error);
        return false;
    }
}
async function clearServiceWorkerAndCaches() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!("serviceWorker" in navigator)) return;
    // Clear all caches
    const keys = await caches.keys();
    await Promise.all(keys.map((k)=>caches.delete(k)));
    // Unregister all service workers
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((r)=>r.unregister()));
    console.log("[PWA] Cleared all caches and unregistered service workers");
}
async function requestNotificationPermission() {
    if (("TURBOPACK compile-time value", "object") === "undefined" || !("Notification" in window)) {
        return "denied";
    }
    if (Notification.permission === "granted") return "granted";
    if (Notification.permission === "denied") return "denied";
    return await Notification.requestPermission();
}
async function subscribeToPush() {
    if (("TURBOPACK compile-time value", "object") === "undefined" || !("serviceWorker" in navigator)) return null;
    try {
        const registration = await navigator.serviceWorker.ready;
        // Note: in a real app, you'd get the VAPID public key from your server
        // For now, we just check if subscription exists
        const existing = await registration.pushManager.getSubscription();
        if (existing) return existing;
        return null;
    } catch (error) {
        console.error("[PWA] Push subscription failed:", error);
        return null;
    }
}
async function showLocalNotification(title, body, /** In-app screen name — forwarded back to the app on click (2.0.7 deep-link). */ deepLinkScreen) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    try {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(title, {
            body,
            icon: "/logo-zb.png",
            badge: "/logo-zb.png",
            vibrate: [
                100,
                50,
                100
            ],
            tag: "zerobet-local",
            data: {
                url: deepLinkScreen ?? "dashboard"
            }
        });
    } catch  {
        // Fallback to basic Notification API
        new Notification(title, {
            body
        });
    }
}
function isStandaloneMode() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // iOS Safari
    if (window.navigator.standalone === true) return true;
    // Chrome Android / Edge / Samsung
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
    return false;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/zerobet/components/PWARegister.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PWARegister",
    ()=>PWARegister
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pwa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pwa.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function PWARegister() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PWARegister.useEffect": ()=>{
            let reloading = false;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pwa$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerServiceWorker"])().then({
                "PWARegister.useEffect": (registered)=>{
                    if (!registered) return;
                    // Listen for SW updates
                    if ("serviceWorker" in navigator) {
                        navigator.serviceWorker.addEventListener("controllerchange", {
                            "PWARegister.useEffect": ()=>{
                                // The new SW has taken control — reload once to pick up new chunks
                                if (!reloading) {
                                    reloading = true;
                                    window.location.reload();
                                }
                            }
                        }["PWARegister.useEffect"]);
                        // Listen for messages from the SW
                        navigator.serviceWorker.addEventListener("message", {
                            "PWARegister.useEffect": (event)=>{
                                if (event.data === "cache-cleared" && !reloading) {
                                    reloading = true;
                                    window.location.reload();
                                }
                            }
                        }["PWARegister.useEffect"]);
                        // Force-clear any stale caches on mount (defensive — prevents
                        // "module factory not available" after HMR recompiles).
                        // Only do this in dev mode to avoid clearing prod cache on every visit.
                        if ("TURBOPACK compile-time truthy", 1) {
                            caches.keys().then({
                                "PWARegister.useEffect": (keys)=>{
                                    const staleCaches = keys.filter({
                                        "PWARegister.useEffect.staleCaches": (k)=>k !== "zerobet-v4"
                                    }["PWARegister.useEffect.staleCaches"]);
                                    if (staleCaches.length > 0) {
                                        Promise.all(staleCaches.map({
                                            "PWARegister.useEffect": (k)=>caches.delete(k)
                                        }["PWARegister.useEffect"])).then({
                                            "PWARegister.useEffect": ()=>{
                                                // Also tell the active SW to clear its cache
                                                navigator.serviceWorker.controller?.postMessage("clear-cache");
                                            }
                                        }["PWARegister.useEffect"]);
                                    }
                                }
                            }["PWARegister.useEffect"]);
                        }
                    }
                }
            }["PWARegister.useEffect"]);
        }
    }["PWARegister.useEffect"], []);
    return null;
}
_s(PWARegister, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = PWARegister;
var _c;
__turbopack_context__.k.register(_c, "PWARegister");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_d4e85a17._.js.map