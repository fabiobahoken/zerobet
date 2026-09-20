"use client";

import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Flame, Dumbbell, Trophy, BarChart3, Heart } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import type { Notification } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";

const TYPE_CONFIG: Record<
  Notification["type"],
  { icon: React.ReactNode; color: string; borderColor: string }
> = {
  streak: {
    icon: <Flame size={18} />,
    color: "#FF6B35",
    borderColor: "#FF3B30",
  },
  motivation: {
    icon: <Dumbbell size={18} />,
    color: "#FFC94D",
    borderColor: "#FFC94D",
  },
  milestone: {
    icon: <Trophy size={18} />,
    color: "#FBBF24",
    borderColor: "#FBBF24",
  },
  weekly: {
    icon: <BarChart3 size={18} />,
    color: "#FFB020",
    borderColor: "#FFB020",
  },
  checkin: {
    icon: <Heart size={18} />,
    color: "#FF3B30",
    borderColor: "#FF3B30",
  },
};

// Locale mapping for relative-time formatting
const INTL_LOCALES: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
  es: "es-ES",
};

function formatRelativeTime(
  iso: string,
  t: (key: string, params?: Record<string, string | number>) => string,
  lang: string
): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = now - then;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return t("notifTimeNow");
  if (minutes < 60) return t("notifTimeMinAgo", { n: minutes });
  if (hours < 24) return t("notifTimeHoursAgo", { n: hours });
  if (days === 1) return t("notifTimeYesterday");
  if (days < 7) return t("notifTimeDaysAgo", { n: days });
  return new Date(iso).toLocaleDateString(INTL_LOCALES[lang] ?? "fr-FR", {
    day: "numeric",
    month: "short",
  });
}

// Seed notifications store i18n KEYS in `title` and `message` rather than localized
// text — the renderer resolves them via `t()` so each user sees their own language.
const SEED_NOTIFICATIONS: Omit<Notification, "id" | "createdAt" | "read">[] = [
  {
    type: "streak",
    title: "notifStreakTitle",
    message: "notifStreakMessage1",
  },
  {
    type: "motivation",
    title: "notifMotivationTitle",
    message: "notifMotivationMessage1",
  },
  {
    type: "milestone",
    title: "notifMilestoneTitle",
    message: "notifMilestoneMessage",
  },
  {
    type: "weekly",
    title: "notifWeeklyTitle",
    message: "notifWeeklyMessage",
  },
  {
    type: "checkin",
    title: "notifCheckinTitle",
    message: "notifCheckinMessage",
  },
  {
    type: "motivation",
    title: "notifMotivationTitle",
    message: "notifMotivationMessage2",
  },
  {
    type: "streak",
    title: "notifStreakTitle",
    message: "notifStreakMessage2",
  },
];

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { notifications, addNotification, markAllRead, language } = useStore();
  const t = useT();

  // Seed notifications on first load if empty
  useEffect(() => {
    if (useStore.getState().notifications.length === 0) {
      SEED_NOTIFICATIONS.forEach((n, i) => {
        setTimeout(() => addNotification(n), i * 50);
      });
    }
  }, [addNotification]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  return (
    <>
      {/* Badge count on bell icon — rendered by parent */}

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Slide-in panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-[400px] glass-card-strong flex flex-col rounded-l-3xl overflow-hidden"
            style={{ borderRight: "none" }}
          >
            {/* Header */}
            <div className="safe-top flex items-center justify-between border-b border-white/10 px-5 pb-5">
              <div className="flex items-center gap-2.5">
                <Bell size={20} className="text-[#F59E0B]" />
                <h2 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)]">
                  {t("notifTitle")}
                </h2>
                {unreadCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-white gradient-primary">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[#FFB020] text-xs font-medium hover:underline"
                  >
                    {t("notifMarkAllRead")}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full glass-card flex items-center justify-center active:scale-95"
                  aria-label={t("notifCloseAria")}
                >
                  <X size={16} className="text-white/70" />
                </button>
              </div>
            </div>

            {/* Notification list */}
            <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-2">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Bell size={40} className="text-white/20 mb-3" />
                  <p className="text-white/40 text-sm">{t("notifEmpty")}</p>
                  <p className="text-white/25 text-xs mt-1">
                    {t("notifEmptyHint")}
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {notifications.map((notif, idx) => {
                    const config = TYPE_CONFIG[notif.type];
                    return (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ delay: idx * 0.03, duration: 0.25 }}
                        className={`relative glass-card p-4 flex items-start gap-3 ${
                          !notif.read
                            ? "border-l-2"
                            : ""
                        }`}
                        style={
                          !notif.read
                            ? { borderLeftColor: config.borderColor }
                            : undefined
                        }
                      >
                        {/* Icon */}
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${config.color}20` }}
                        >
                          <span style={{ color: config.color }}>
                            {config.icon}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className="text-sm font-semibold truncate"
                              style={{ color: config.color }}
                            >
                              {t(notif.title)}
                            </span>
                            {!notif.read && (
                              <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ background: config.color }}
                              />
                            )}
                          </div>
                          <p className="text-white/70 text-xs leading-relaxed">
                            {t(notif.message)}
                          </p>
                          <p className="text-white/30 text-[10px] mt-1.5">
                            {formatRelativeTime(notif.createdAt, t, language)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <p className="text-white/25 text-[10px] text-center">
                {t("notifFooter")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
