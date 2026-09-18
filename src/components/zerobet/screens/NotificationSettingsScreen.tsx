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
  label: string;
  description: string;
  icon: typeof Bell;
  color: string;
}

const TOGGLES: ToggleDef[] = [
  {
    key: "dailyReminder",
    label: "Rappel quotidien",
    description: "Un rappel quotidien pour ton check-in du matin.",
    icon: Clock,
    color: "#FF9500",
  },
  {
    key: "cravingCheckin",
    label: "Check-in envie",
    description: "Vérifie comment tu vas pendant les heures critiques.",
    icon: Heart,
    color: "#FF3B30",
  },
  {
    key: "milestoneAlerts",
    label: "Alertes de jalons",
    description: "Célèbre chaque jalon franchi (7, 14, 30 jours…).",
    icon: Trophy,
    color: "#FBBF24",
  },
  {
    key: "communityActivity",
    label: "Activité communauté",
    description: "Réponses, mentions et citations de la communauté.",
    icon: Users,
    color: "#4ADE80",
  },
  {
    key: "weeklyReport",
    label: "Rapport hebdomadaire",
    description: "Un résumé de ta semaine chaque dimanche.",
    icon: FileBarChart,
    color: "#64D2FF",
  },
  {
    key: "motivationalQuotes",
    label: "Citations motivation",
    description: "Une citation motivante chaque jour à 18h.",
    icon: Quote,
    color: "#BF5AF2",
  },
  {
    key: "silentHours",
    label: "Heures silencieuses",
    description: "Aucune notification pendant tes heures de sommeil.",
    icon: Moon,
    color: "#5E5CE6",
  },
];

interface ScheduleItem {
  time: string;
  label: string;
  icon: typeof Bell;
  color: string;
  enabledKey: ToggleKey | "always";
}

const SCHEDULE: ScheduleItem[] = [
  { time: "07:00", label: "Rappel quotidien", icon: Clock, color: "#FF9500", enabledKey: "dailyReminder" },
  { time: "12:00", label: "Check-in envie (si activé)", icon: Heart, color: "#FF3B30", enabledKey: "cravingCheckin" },
  { time: "18:00", label: "Citation de motivation", icon: Quote, color: "#BF5AF2", enabledKey: "motivationalQuotes" },
  { time: "Dim. 09:00", label: "Rapport hebdomadaire", icon: FileBarChart, color: "#64D2FF", enabledKey: "weeklyReport" },
  { time: "À tout moment", label: "Alertes de jalons", icon: Trophy, color: "#FBBF24", enabledKey: "milestoneAlerts" },
  { time: "À tout moment", label: "Activité communauté", icon: Users, color: "#4ADE80", enabledKey: "communityActivity" },
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
      toast.success("Zerobet est installé ! 🎉");
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);
    window.addEventListener("appinstalled", installedHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler as EventListener);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

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
      toast.success("Notifications activées ! 🔔");
    } else if (result === "denied") {
      haptics.error();
      toast.error("Notifications refusées. Tu peux les activer dans les réglages du navigateur.");
    }
  }, [setNotificationPermission]);

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
      toast.info(
        "Pour installer : ouvre le menu de ton navigateur et choisis « Installer l'application » ou « Ajouter à l'écran d'accueil »."
      );
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
        toast.success("Installation démarrée ! 📲");
      } else {
        toast.info("Installation annulée. Tu pourras réessayer plus tard.");
      }
      setInstallPrompt(null);
    } catch {
      toast.error("Impossible d'installer l'application pour le moment.");
    }
  }, [installPrompt, setPwaInstalled]);

  const handleTestNotification = useCallback(async () => {
    sound.playPop();
    haptics.light();
    await showLocalNotification(
      "Zerobet",
      "Ceci est une notification de test. Tu es fort ! 💪"
    );
    toast.success("Notification de test envoyée ! 👍");
  }, []);

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
                ? "rgba(74,222,128,0.18)"
                : notificationPermission === "denied"
                  ? "rgba(255,59,48,0.18)"
                  : "rgba(255,149,0,0.18)",
            }}
          />
          <div className="relative">
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: permissionGranted
                    ? "rgba(74,222,128,0.15)"
                    : notificationPermission === "denied"
                      ? "rgba(255,59,48,0.15)"
                      : "rgba(255,149,0,0.15)",
                }}
              >
                {permissionGranted ? (
                  <Check size={20} className="text-[#4ADE80]" />
                ) : notificationPermission === "denied" ? (
                  <AlertTriangle size={20} className="text-[#FF3B30]" />
                ) : (
                  <Bell size={20} className="text-[#FF9500]" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                  {permissionGranted
                    ? "Notifications activées"
                    : notificationPermission === "denied"
                      ? "Notifications bloquées"
                      : "Active les notifications"}
                </h2>
                <p className="text-white/60 text-xs mt-1">
                  {permissionGranted
                    ? "Tu recevras les rappels importants. Pour désactiver, ouvre les paramètres de ton navigateur."
                    : notificationPermission === "denied"
                      ? "Autorise les notifications dans les paramètres de ton navigateur pour recevoir les rappels."
                      : "Reçois des rappels bienveillants pour rester sur le chemin de la récupération."}
                </p>
              </div>
            </div>

            {notificationPermission === "default" && (
              <button
                onClick={handleRequestPermission}
                className="w-full py-3 rounded-2xl gradient-primary text-white font-semibold text-sm btn-press flex items-center justify-center gap-2"
              >
                <Bell size={16} />
                Autoriser les notifications
              </button>
            )}

            {notificationPermission === "granted" && (
              <div className="text-[11px] text-white/50 italic flex items-start gap-1.5">
                <Info size={12} className="mt-0.5 shrink-0" />
                Astuce : pour les désactiver plus tard, ouvre les paramètres du site dans ton navigateur.
              </div>
            )}

            {notificationPermission === "denied" && (
              <div className="space-y-2">
                <div className="text-[11px] text-white/70 leading-relaxed bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-xl p-3">
                  <strong className="text-[#FF3B30]">Comment réactiver :</strong>
                  <br />
                  Clique sur l&apos;icône cadenas/verrou dans la barre d&apos;adresse →
                  Autorise les notifications → Recharge la page.
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    haptics.light();
                    toast.info("Recharge la page après avoir changé l'autorisation.");
                  }}
                  className="w-full py-2.5 rounded-2xl glass-card text-white/80 text-xs font-medium btn-press"
                >
                  J&apos;ai réactivé — revérifier
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
            <div className="w-10 h-10 rounded-2xl bg-[#64D2FF]/15 flex items-center justify-center">
              <Download size={18} className="text-[#64D2FF]" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                Installer l&apos;application
              </h2>
              <p className="text-white/50 text-xs">Accès rapide + notifications natives</p>
            </div>
          </div>

          {pwaInstalled ? (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#4ADE80]/10 border border-[#4ADE80]/30">
              <Check size={18} className="text-[#4ADE80] shrink-0" />
              <span className="text-white text-sm font-medium">Application installée ✓</span>
            </div>
          ) : (
            <>
              <p className="text-white/60 text-xs mb-3 leading-relaxed">
                Installe Zerobet sur ton téléphone pour un accès rapide et des notifications.
              </p>
              <button
                onClick={handleInstall}
                className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm btn-press flex items-center justify-center gap-2 mb-3"
              >
                <Smartphone size={16} />
                Installer
              </button>
              <div className="space-y-1.5 text-[11px] text-white/50">
                <p className="flex items-start gap-1.5">
                  <span className="text-[#64D2FF] font-bold">iOS :</span>
                  Safari → Partager → « Sur l&apos;écran d&apos;accueil »
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="text-[#4ADE80] font-bold">Android :</span>
                  Chrome → menu ⋮ → « Installer l&apos;application »
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
            <div className="w-10 h-10 rounded-2xl bg-[#FF9500]/15 flex items-center justify-center">
              <SettingsIcon size={18} className="text-[#FF9500]" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                Mes préférences
              </h2>
              <p className="text-white/50 text-xs">Choisis ce qui te parle</p>
            </div>
          </div>

          <div className="space-y-3">
            {TOGGLES.map((t) => {
              const Icon = t.icon;
              const value = notificationPreferences[t.key];
              return (
                <div
                  key={t.key}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${t.color}22` }}
                  >
                    <Icon size={16} style={{ color: t.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium leading-tight">{t.label}</div>
                    <div className="text-white/50 text-[11px] mt-0.5 leading-snug">{t.description}</div>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(v) => handleToggle(t.key, v)}
                    aria-label={t.label}
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
              <div className="w-10 h-10 rounded-2xl bg-[#FF9500]/15 flex items-center justify-center">
                <Clock size={18} className="text-[#FF9500]" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                  Heure du rappel quotidien
                </h2>
                <p className="text-white/50 text-xs">Quand tu recevras ton check-in</p>
              </div>
            </div>
            <input
              type="time"
              value={notificationPreferences.dailyReminderTime}
              onChange={(e) => handleTimeChange("dailyReminderTime", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-lg font-semibold font-[family-name:var(--font-poppins)] [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#FF9500]/50"
              aria-label="Heure du rappel quotidien"
            />
            <p className="text-white/50 text-xs mt-2 text-center">
              Tu recevras un rappel chaque jour à{" "}
              <span className="text-[#FF9500] font-semibold">
                {notificationPreferences.dailyReminderTime}
              </span>
            </p>
          </motion.div>
        )}

        {/* ============================================================
            6. Silent Hours Card (conditional)
            ============================================================ */}
        {notificationPreferences.silentHours && (
          <motion.div variants={itemVariants} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#5E5CE6]/15 flex items-center justify-center">
                <Moon size={18} className="text-[#5E5CE6]" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                  Heures silencieuses
                </h2>
                <p className="text-white/50 text-xs">Paix pendant ton sommeil</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/60 text-[11px] font-medium mb-1 block">Début</label>
                <input
                  type="time"
                  value={notificationPreferences.silentHoursStart}
                  onChange={(e) => handleTimeChange("silentHoursStart", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2.5 text-white text-base font-semibold [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#5E5CE6]/50"
                  aria-label="Début des heures silencieuses"
                />
              </div>
              <div>
                <label className="text-white/60 text-[11px] font-medium mb-1 block">Fin</label>
                <input
                  type="time"
                  value={notificationPreferences.silentHoursEnd}
                  onChange={(e) => handleTimeChange("silentHoursEnd", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2.5 text-white text-base font-semibold [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#5E5CE6]/50"
                  aria-label="Fin des heures silencieuses"
                />
              </div>
            </div>
            <p className="text-white/50 text-xs mt-3 leading-relaxed">
              Aucune notification ne sera envoyée entre{" "}
              <span className="text-[#5E5CE6] font-semibold">
                {notificationPreferences.silentHoursStart}
              </span>{" "}
              et{" "}
              <span className="text-[#5E5CE6] font-semibold">
                {notificationPreferences.silentHoursEnd}
              </span>{" "}
              (sauf urgences).
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
                Tester les notifications
              </h2>
              <p className="text-white/50 text-xs">Vérifie que tout fonctionne</p>
            </div>
          </div>
          <button
            onClick={handleTestNotification}
            disabled={!permissionGranted}
            className="w-full py-3 rounded-2xl bg-[#FBBF24]/15 hover:bg-[#FBBF24]/20 disabled:opacity-40 disabled:cursor-not-allowed text-[#FBBF24] font-semibold text-sm btn-press flex items-center justify-center gap-2"
          >
            <BellRing size={16} />
            {permissionGranted ? "Envoyer une notification de test" : "Active les notifications d'abord"}
          </button>
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
              <div className="w-10 h-10 rounded-2xl bg-[#4ADE80]/15 flex items-center justify-center">
                <Calendar size={18} className="text-[#4ADE80]" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
                  Ton programme de notifications
                </h2>
                <p className="text-white/50 text-xs">Aperçu de ta semaine</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {SCHEDULE.map((item, idx) => {
                const Icon = item.icon;
                const enabled =
                  item.enabledKey === "always" ? true : notificationPreferences[item.enabledKey as ToggleKey];
                return (
                  <div
                    key={`${item.label}-${idx}`}
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
                        {item.label}
                      </div>
                      <div className="text-[11px] text-white/40 mt-0.5">{item.time}</div>
                    </div>
                    {enabled ? (
                      <Check size={14} className="text-[#4ADE80] shrink-0" />
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
            <div className="w-8 h-8 rounded-xl bg-[#4ADE80]/15 flex items-center justify-center shrink-0">
              <Shield size={15} className="text-[#4ADE80]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Tes notifications sont privées</h3>
              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                Nous n&apos;avons pas accès au contenu de tes notifications. Elles sont générées
                localement sur ton appareil.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            10. Footer Note Card
            ============================================================ */}
        <motion.div variants={itemVariants} className="glass-card p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={14} className="text-[#FF9500]" />
            <span className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
              Rappel bienveillant
            </span>
            <Sparkles size={14} className="text-[#FF9500]" />
          </div>
          <p className="text-white/70 text-xs leading-relaxed italic">
            Les notifications t&apos;aident à rester sur le chemin de la récupération. Mais
            n&apos;oublie pas : tu es le maître de ton téléphone, pas l&apos;inverse.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
