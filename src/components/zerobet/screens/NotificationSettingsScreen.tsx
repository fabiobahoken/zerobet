"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronLeft,
  BellRing,
  Clock,
  Download,
  Moon,
  Settings as SettingsIcon,
  Shield,
  Calendar,
  Check,
  AlertTriangle,
  Smartphone,
  Info,
  Heart,
  Sparkles,
  Users,
  Trophy,
  FileBarChart,
  Quote,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useStore, type NotificationPreferences } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import {
  requestNotificationPermission,
  showLocalNotification,
  isStandaloneMode,
  type BeforeInstallPromptEvent,
} from "@/lib/pwa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

type ToggleKey =
  | "dailyReminder"
  | "cravingCheckin"
  | "milestoneAlerts"
  | "communityActivity"
  | "weeklyReport"
  | "motivationalQuotes"
  | "silentHours";

interface ToggleDef {
  key: ToggleKey;
  labelKey: string;
  descKey: string;
  icon: typeof Bell;
  color: string;
}

const TOGGLES: ToggleDef[] = [
  {
    key: "dailyReminder",
    labelKey: "notifDaily",
    descKey: "notifDailyDesc",
    icon: Clock,
    color: "#F59E0B",
  },
  {
    key: "cravingCheckin",
    labelKey: "notifCraving",
    descKey: "notifCravingDesc",
    icon: Heart,
    color: "#FF3B30",
  },
  {
    key: "milestoneAlerts",
    labelKey: "notifMilestones",
    descKey: "notifMilestonesDesc",
    icon: Trophy,
    color: "#FBBF24",
  },
  {
    key: "communityActivity",
    labelKey: "notifCommunity",
    descKey: "notifCommunityDesc",
    icon: Users,
    color: "#FFC94D",
  },
  {
    key: "weeklyReport",
    labelKey: "notifWeekly",
    descKey: "notifWeeklyDesc",
    icon: FileBarChart,
    color: "#FF6B00",
  },
  {
    key: "motivationalQuotes",
    labelKey: "notifQuotes",
    descKey: "notifQuotesDesc",
    icon: Quote,
    color: "#FFB020",
  },
  {
    key: "silentHours",
    labelKey: "notifSilent",
    descKey: "notifSilentDesc",
    icon: Moon,
    color: "#94A3B8",
  },
];

interface ScheduleItem {
  time: string;
  labelKey: string;
  icon: typeof Bell;
  color: string;
  enabledKey: ToggleKey | "always";
}

const SCHEDULE: ScheduleItem[] = [
  { time: "07:00", labelKey: "notifDaily", icon: Clock, color: "#F59E0B", enabledKey: "dailyReminder" },
  { time: "12:00", labelKey: "notifSchedCraving", icon: Heart, color: "#FF3B30", enabledKey: "cravingCheckin" },
  { time: "18:00", labelKey: "notifSchedQuote", icon: Quote, color: "#FFB020", enabledKey: "motivationalQuotes" },
  { time: "notifSchedTimeSunday", labelKey: "notifWeekly", icon: FileBarChart, color: "#FF6B00", enabledKey: "weeklyReport" },
  { time: "notifSchedTimeAnytime", labelKey: "notifMilestones", icon: Trophy, color: "#FBBF24", enabledKey: "milestoneAlerts" },
  { time: "notifSchedTimeAnytime", labelKey: "notifCommunity", icon: Users, color: "#FFC94D", enabledKey: "communityActivity" },
];

export function NotificationSettingsScreen() {
  const t = useT();
  const {
    navigate,
    notificationPreferences,
    setNotificationPreferences,
    notificationPermission,
    setNotificationPermission,
    pwaInstalled,
    setPwaInstalled,
  } = useStore();

  // Capture beforeinstallprompt for the install button
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Reflect actual standalone state on mount
    if (isStandaloneMode() && !pwaInstalled) {
      setPwaInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    const installedHandler = () => {
      setInstallPrompt(null);
      setPwaInstalled(true);
      try {
        sound.playSuccess();
        haptics.success();
      } catch {
        /* noop */
      }
      toast.success(t("notifInstalledToast"));
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);
    window.addEventListener("appinstalled", installedHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler as EventListener);
      window.removeEventListener("appinstalled", installedHandler);
    };
    // t() is stable per language; re-binding keeps the toast message current
  }, [t]);

  const handleBack = useCallback(() => {
    sound.playClick();
    haptics.light();
    navigate("dashboard");
  }, [navigate]);

  const handleRequestPermission = useCallback(async () => {
    sound.playClick();
    haptics.light();
    const result = await requestNotificationPermission();
    setNotificationPermission(result);
    if (result === "granted") {
      sound.playSuccess();
      haptics.success();
      toast.success(t("notifEnabledToast"));
    } else if (result === "denied") {
      haptics.error();
      toast.error(t("notifDeniedToast"));
    }
  }, [setNotificationPermission, t]);

  const handleToggle = useCallback(
    (key: ToggleKey, value: boolean) => {
      sound.playClick();
      haptics.selection();
      setNotificationPreferences({ [key]: value } as Partial<NotificationPreferences>);
    },
    [setNotificationPreferences]
  );

  const handleTimeChange = useCallback(
    (field: "dailyReminderTime" | "silentHoursStart" | "silentHoursEnd", value: string) => {
      sound.playClick();
      haptics.selection();
      setNotificationPreferences({ [field]: value } as Partial<NotificationPreferences>);
    },
    [setNotificationPreferences]
  );

  const handleInstall = useCallback(async () => {
    if (!installPrompt) {
      sound.playError();
      haptics.warning();
      toast.info(t("notifInstallHint"));
      return;
    }
    sound.playClick();
    haptics.medium();
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setPwaInstalled(true);
        sound.playSuccess();
        haptics.success();
        toast.success(t("notifInstallStartedToast"));
      } else {
        toast.info(t("notifInstallCancelledToast"));
      }
      setInstallPrompt(null);
    } catch {
      toast.error(t("notifInstallErrorToast"));
    }
  }, [installPrompt, setPwaInstalled, t]);

  const handleTestNotification = useCallback(async () => {
    sound.playPop();
    haptics.light();
    await showLocalNotification(t("notifTestTitle"), t("notifTestBody"));
    toast.success(t("notifTestSentToast"));
  }, [t]);

  const permissionGranted = notificationPermission === "granted";

  return (
    <div className="min-h-screen px-4 pt-10 pb-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        {/* ============================================================
            1. Header (sticky, glass-card-strong)
            ============================================================ */}
        <motion.div
          variants={itemVariants}
          className="sticky top-0 z-30 -mx-4 px-4 py-3 mb-1 glass-card-strong backdrop-blur-xl"
          style={{ borderRadius: 0 }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center btn-press"
              aria-label={t("backToDashboard")}
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-white font-bold text-xl font-[family-name:var(--font-poppins)] leading-tight flex items-center gap-2">
                {t("notificationsTitle")}
                <Bell size={18} className="text-[#FBBF24]" />
              </h1>
              <p className="text-white/50 text-xs">{t("notificationsSubtitle")}</p>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            2. Permission Status Card
            ============================================================ */}
        <motion.div
          variants={itemVariants}
          className={`glass-card-strong p-5 relative overflow-hidden ${
            permissionGranted ? "glow-green" : notificationPermission === "denied" ? "glow-red" : "glow-orange"
          }`}
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none"
            style={{
              background: permissionGranted
                ? "rgba(255,201,77,0.18)"
                : notificationPermission === "denied"
                  ? "rgba(255,59,48,0.18)"
                  : "rgba(245, 158, 11,0.18)",
            }}
          />
          <div className="relative">
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: permissionGranted
                    ? "rgba(255,201,77,0.15)"
                    : notificationPermission === "denied"
                      ? "rgba(255,59,48,0.15)"
                      : "rgba(245, 158, 11,0.15)",
                }}
              >
                {permissionGranted ? (
                  <Check size={20} className="text-[#FFC94D]" />
                ) : notificationPermission === "denied" ? (
                  <AlertTriangle size={20} className="text-[#FF3B30]" />
                ) : (
                  <Bell size={20} className="text-[#F59E0B]" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                  {permissionGranted
                    ? t("notifStatusGranted")
                    : notificationPermission === "denied"
                      ? t("notifStatusBlocked")
                      : t("notifStatusEnable")}
                </h2>
                <p className="text-white/60 text-xs mt-1">
                  {permissionGranted
                    ? t("notifStatusDescGranted")
                    : notificationPermission === "denied"
                      ? t("notifStatusDescBlocked")
                      : t("notifStatusDescEnable")}
                </p>
              </div>
            </div>

            {notificationPermission === "default" && (
              <button
                onClick={handleRequestPermission}
                className="w-full py-3 rounded-2xl gradient-primary text-white font-semibold text-sm btn-press flex items-center justify-center gap-2"
              >
                <Bell size={16} />
                {t("notifAllowButton")}
              </button>
            )}

            {notificationPermission === "granted" && (
              <div className="text-[11px] text-white/50 italic flex items-start gap-1.5">
                <Info size={12} className="mt-0.5 shrink-0" />
                {t("notifGrantedTip")}
              </div>
            )}

            {notificationPermission === "denied" && (
              <div className="space-y-2">
                <div className="text-[11px] text-white/70 leading-relaxed bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-xl p-3">
                  <strong className="text-[#FF3B30]">{t("notifReenableTitle")}</strong>
                  <br />
                  {t("notifReenableDesc")}
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    haptics.light();
                    toast.info(t("notifReloadHint"));
                  }}
                  className="w-full py-2.5 rounded-2xl glass-card text-white/80 text-xs font-medium btn-press"
                >
                  {t("notifRecheckButton")}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* ============================================================
            3. PWA Install Card
            ============================================================ */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/15 flex items-center justify-center">
              <Download size={18} className="text-[#FF6B00]" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                {t("notifInstallHeading")}
              </h2>
              <p className="text-white/50 text-xs">{t("notifInstallSub")}</p>
            </div>
          </div>

          {pwaInstalled ? (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFC94D]/10 border border-[#FFC94D]/30">
              <Check size={18} className="text-[#FFC94D] shrink-0" />
              <span className="text-white text-sm font-medium">{t("notifInstalledBadge")}</span>
            </div>
          ) : (
            <>
              <p className="text-white/60 text-xs mb-3 leading-relaxed">
                {t("notifInstallDesc")}
              </p>
              <button
                onClick={handleInstall}
                className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm btn-press flex items-center justify-center gap-2 mb-3"
              >
                <Smartphone size={16} />
                {t("notifInstallButton")}
              </button>
              <div className="space-y-1.5 text-[11px] text-white/50">
                <p className="flex items-start gap-1.5">
                  <span className="text-[#FF6B00] font-bold">{t("notifIosLabel")}</span>
                  {t("notifIosSteps")}
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="text-[#FFC94D] font-bold">{t("notifAndroidLabel")}</span>
                  {t("notifAndroidSteps")}
                </p>
              </div>
            </>
          )}
        </motion.div>

        {/* ============================================================
            4. Notification Preferences Card (7 toggles)
            ============================================================ */}
        <motion.div variants={itemVariants} className="glass-card-strong p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#F59E0B]/15 flex items-center justify-center">
              <SettingsIcon size={18} className="text-[#F59E0B]" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                {t("notifPrefsHeading")}
              </h2>
              <p className="text-white/50 text-xs">{t("notifPrefsSub")}</p>
            </div>
          </div>

          <div className="space-y-3">
            {TOGGLES.map((tg) => {
              const Icon = tg.icon;
              const value = notificationPreferences[tg.key];
              return (
                <div
                  key={tg.key}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${tg.color}22` }}
                  >
                    <Icon size={16} style={{ color: tg.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium leading-tight">{t(tg.labelKey)}</div>
                    <div className="text-white/50 text-[11px] mt-0.5 leading-snug">{t(tg.descKey)}</div>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(v) => handleToggle(tg.key, v)}
                    aria-label={t(tg.labelKey)}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ============================================================
            5. Daily Reminder Time Card (conditional)
            ============================================================ */}
        {notificationPreferences.dailyReminder && (
          <motion.div variants={itemVariants} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F59E0B]/15 flex items-center justify-center">
                <Clock size={18} className="text-[#F59E0B]" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                  {t("notifTimeHeading")}
                </h2>
                <p className="text-white/50 text-xs">{t("notifTimeSub")}</p>
              </div>
            </div>
            <input
              type="time"
              value={notificationPreferences.dailyReminderTime}
              onChange={(e) => handleTimeChange("dailyReminderTime", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-lg font-semibold font-[family-name:var(--font-poppins)] [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50"
              aria-label={t("notifTimeAria")}
            />
            <p className="text-white/50 text-xs mt-2 text-center">
              {t("notifTimeNote", { time: notificationPreferences.dailyReminderTime })}
            </p>
          </motion.div>
        )}

        {/* ============================================================
            6. Silent Hours Card (conditional)
            ============================================================ */}
        {notificationPreferences.silentHours && (
          <motion.div variants={itemVariants} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#94A3B8]/15 flex items-center justify-center">
                <Moon size={18} className="text-[#94A3B8]" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                  {t("notifSilentHeading")}
                </h2>
                <p className="text-white/50 text-xs">{t("notifSilentSub")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/60 text-[11px] font-medium mb-1 block">{t("notifSilentStart")}</label>
                <input
                  type="time"
                  value={notificationPreferences.silentHoursStart}
                  onChange={(e) => handleTimeChange("silentHoursStart", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2.5 text-white text-base font-semibold [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#FFB020]/50"
                  aria-label={t("notifSilentStartAria")}
                />
              </div>
              <div>
                <label className="text-white/60 text-[11px] font-medium mb-1 block">{t("notifSilentEnd")}</label>
                <input
                  type="time"
                  value={notificationPreferences.silentHoursEnd}
                  onChange={(e) => handleTimeChange("silentHoursEnd", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2.5 text-white text-base font-semibold [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#FFB020]/50"
                  aria-label={t("notifSilentEndAria")}
                />
              </div>
            </div>
            <p className="text-white/50 text-xs mt-3 leading-relaxed">
              {t("notifSilentNote", {
                start: notificationPreferences.silentHoursStart,
                end: notificationPreferences.silentHoursEnd,
              })}
            </p>
          </motion.div>
        )}

        {/* ============================================================
            7. Test Notification Card
            ============================================================ */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FBBF24]/15 flex items-center justify-center">
              <BellRing size={18} className="text-[#FBBF24]" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                {t("notifTestHeading")}
              </h2>
              <p className="text-white/50 text-xs">{t("notifTestSub")}</p>
            </div>
          </div>
          <button
            onClick={handleTestNotification}
            disabled={!permissionGranted}
            className="w-full py-3 rounded-2xl bg-[#FBBF24]/15 hover:bg-[#FBBF24]/20 disabled:opacity-40 disabled:cursor-not-allowed text-[#FBBF24] font-semibold text-sm btn-press flex items-center justify-center gap-2"
          >
            <BellRing size={16} />
            {permissionGranted ? t("notifTestSend") : t("notifTestEnableFirst")}
          </button>
          <p className="text-white/35 text-[10px] mt-2.5 text-center leading-relaxed">
            {t("notifLocalScopeNote")}
          </p>
        </motion.div>

        {/* ============================================================
            8. Notification Schedule Preview Card
            ============================================================ */}
        <motion.div
          variants={itemVariants}
          className="glass-card-strong p-5 mesh-bg-calm relative overflow-hidden"
        >
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#FFC94D]/15 flex items-center justify-center">
                <Calendar size={18} className="text-[#FFC94D]" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                  {t("notifScheduleHeading")}
                </h2>
                <p className="text-white/50 text-xs">{t("notifScheduleSub")}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {SCHEDULE.map((item, idx) => {
                const Icon = item.icon;
                const enabled =
                  item.enabledKey === "always" ? true : notificationPreferences[item.enabledKey as ToggleKey];
                return (
                  <div
                    key={`${item.labelKey}-${idx}`}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                      enabled
                        ? "bg-white/[0.04] border-white/10"
                        : "bg-white/[0.01] border-white/5 opacity-40"
                    }`}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: enabled ? `${item.color}22` : "rgba(255,255,255,0.05)" }}
                    >
                      <Icon size={15} style={{ color: enabled ? item.color : "#888" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium leading-tight ${
                          enabled ? "text-white" : "text-white/50"
                        }`}
                      >
                        {t(item.labelKey)}
                      </div>
                      <div className="text-[11px] text-white/40 mt-0.5">
                        {item.time.startsWith("notif") ? t(item.time) : item.time}
                      </div>
                    </div>
                    {enabled ? (
                      <Check size={14} className="text-[#FFC94D] shrink-0" />
                    ) : (
                      <span className="text-[10px] text-white/40 uppercase tracking-wide">Off</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            9. Privacy Note Card
            ============================================================ */}
        <motion.div variants={itemVariants} className="glass-card p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FFC94D]/15 flex items-center justify-center shrink-0">
              <Shield size={15} className="text-[#FFC94D]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{t("notifPrivacyHeading")}</h3>
              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                {t("notifPrivacyDesc")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            10. Footer Note Card
            ============================================================ */}
        <motion.div variants={itemVariants} className="glass-card p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={14} className="text-[#F59E0B]" />
            <span className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
              {t("notifFooterBadge")}
            </span>
            <Sparkles size={14} className="text-[#F59E0B]" />
          </div>
          <p className="text-white/70 text-xs leading-relaxed italic">
            {t("notifFooterText")}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
