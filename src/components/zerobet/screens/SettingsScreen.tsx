"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Shield, Crown, Settings as SettingsIcon,
  Mail, FileText, Lock, AlertTriangle, Sparkles, User, Venus, Mars,
  Heart, Palette, Bell, Database, Volume2, Eye, Download, Upload,
  Trash2, Smartphone, Moon, Sun, Vibrate, Clock,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useStore, type Plan } from "@/store/zerobet-store";
import { LANGUAGES } from "@/lib/i18n/dictionary";
import { useT } from "@/lib/i18n/useT";
import { Flag } from "@/components/zerobet/components/Flag";

const PLAN_INFO: Record<Plan, {
  labelKey: string;
  descKey: string;
  color: string;
  gradient: string;
  icon: string;
  glowClass: string;
}> = {
  free: {
    labelKey: "settingsPlanFree",
    descKey: "planFreeDesc",
    color: "#9CA3AF",
    gradient: "linear-gradient(135deg, #6B7280 0%, #374151 100%)",
    icon: "🌱",
    glowClass: "",
  },
  premium: {
    labelKey: "settingsPlanPremium",
    descKey: "planPremiumDesc",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #F59E0B 100%)",
    icon: "⭐",
    glowClass: "glow-green",
  },
  mentor: {
    labelKey: "settingsPlanMentor",
    descKey: "planMentorDesc",
    color: "#4ADE80",
    gradient: "linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)",
    icon: "🛡️",
    glowClass: "glow-green",
  },
  psychologist: {
    labelKey: "settingsPlanPsychologist",
    descKey: "planPsychologistDesc",
    color: "#BF5AF2",
    gradient: "linear-gradient(135deg, #BF5AF2 0%, #5E5CE6 100%)",
    icon: "🎓",
    glowClass: "glow-purple",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "Z";
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function SettingsScreen() {
  const t = useT();
  const {
    plan, language, setLanguage, gender, setGender, name, setName,
    anonymousMode, setAnonymousMode, dataConsent, setDataConsent,
    navigate, resetAll, isAdmin,
    // Appearance
    themeMode, setThemeMode,
    starfieldIntensity, setStarfieldIntensity,
    glassEffect, setGlassEffect,
    // Notifications
    notificationPrefs, setNotificationPref,
    notificationTime, setNotificationTime,
    // Privacy & security
    appLock, setAppLock,
    discreteMode, setDiscreteMode,
    autoLockMinutes, setAutoLockMinutes,
    // Sound & haptics
    soundEnabled, setSoundEnabled,
    hapticsEnabled, setHapticsEnabled,
    volume, setVolume,
    // Cloud sync (Zerobet 2.0)
    lastSyncAt, cloudSyncStatus, requestSync,
    restoreFromSnapshot,
    // Journal / streak counters (for the RGPD export)
    streakDays, xp, level,
  } = useStore();

  const planInfo = PLAN_INFO[plan];
  const displayName = name?.trim() || t("guestName");
  const initials = getInitials(name || "");
  const currentLangInfo = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const handleReset = () => {
    resetAll();
    // Defer reload so dialog can close cleanly & state flushes
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }, 50);
  };

  const genderLabel = gender === "female"
    ? t("genderFemale")
    : gender === "male"
      ? t("genderMale")
      : t("genderUndefined");

  // ---- Data management helpers (Task 9-a) ----
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dataSizeKB, setDataSizeKB] = useState<string>("0 KB");

  useEffect(() => {
    try {
      let total = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const v = localStorage.getItem(key) ?? "";
        total += key.length + v.length;
      }
      const kb = total / 1024;
      const fmt = kb >= 1024
        ? `${(kb / 1024).toFixed(2)} MB`
        : `${kb.toFixed(1)} KB`;
      setDataSizeKB(fmt);
    } catch {
      setDataSizeKB("—");
    }
  }, [anonymousMode, dataConsent, themeMode, glassEffect, soundEnabled, hapticsEnabled, appLock, discreteMode, volume, starfieldIntensity, autoLockMinutes, notificationTime, notificationPrefs]);

  const handleExport = () => {
    try {
      const snapshot: Record<string, unknown> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        snapshot[key] = localStorage.getItem(key);
      }
      const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `zerobet-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(t("dataExportedToast"));
    } catch {
      toast.error(t("dataExportError"));
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target?.result ?? "{}")) as Record<string, string>;
        if (typeof parsed !== "object" || parsed === null) throw new Error("invalid");
        for (const [k, v] of Object.entries(parsed)) {
          if (typeof v === "string") localStorage.setItem(k, v);
        }
        toast.success(t("dataImportedToast"));
        setTimeout(() => window.location.reload(), 800);
      } catch {
        toast.error(t("dataImportError"));
      }
    };
    reader.onerror = () => toast.error(t("fileReadError"));
    reader.readAsText(file);
    // reset input value so the same file can be re-selected later
    e.target.value = "";
  };

  const handleClearCache = () => {
    try {
      const preserve = new Set(["zerobet-store-v1"]);
      const toRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !preserve.has(key)) toRemove.push(key);
      }
      toRemove.forEach((k) => localStorage.removeItem(k));
      toast.success(t("cacheClearedToast"));
      // re-trigger size recompute
      setTimeout(() => {
        try {
          let total = 0;
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (!k) continue;
            total += k.length + (localStorage.getItem(k)?.length ?? 0);
          }
          const kb = total / 1024;
          setDataSizeKB(kb >= 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(1)} KB`);
        } catch {
          /* ignore */
        }
      }, 50);
    } catch {
      toast.error(t("cacheClearError"));
    }
  };

  return (
    <div className="min-h-screen px-5 pt-12 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-5"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("dashboard")}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform focus-ring"
            aria-label={t("backToDashboard")}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <h1 className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight">
            {t("settingsTitle")}
          </h1>
        </div>
        {isAdmin && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="px-2.5 py-1 rounded-full text-[10px] font-bold text-[#FBBF24] bg-[#FBBF24]/15 border border-[#FBBF24]/30 flex items-center gap-1"
          >
            <Sparkles size={10} /> {t("settingsAdmin")}
          </motion.span>
        )}
      </motion.div>

      {/* User profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className={`glass-card-strong p-5 mb-5 relative overflow-hidden ${planInfo.glowClass}`}
      >
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none"
          style={{ background: `${planInfo.color}33` }}
        />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: `${planInfo.color}1f` }} />

        <div className="relative flex items-center gap-4">
          {/* Avatar with initials */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white flex-shrink-0 font-[family-name:var(--font-poppins)] shadow-lg"
            style={{ background: planInfo.gradient }}
            aria-hidden
          >
            {initials}
          </div>

          {/* Name + badges */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <h2 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)] truncate">
                {displayName}
              </h2>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1 flex-shrink-0"
                style={{ background: planInfo.color }}
              >
                <span aria-hidden>{planInfo.icon}</span> {t(planInfo.labelKey)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span className="flex items-center gap-1">
                {gender === "female" ? (
                  <Venus size={12} className="text-[#FF9500]" />
                ) : gender === "male" ? (
                  <Mars size={12} className="text-[#64D2FF]" />
                ) : (
                  <User size={12} className="text-white/40" />
                )}
                {genderLabel}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden />
              <span className="flex items-center gap-1.5 min-w-0">
                <Flag code={currentLangInfo.flag} size={16} />
                <span className="truncate">{currentLangInfo.nativeName}</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sections — staggered entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* ============ SECTION 1: Mon plan ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Crown size={16} style={{ color: planInfo.color }} />
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("settingsPlan")}
            </h3>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg"
              style={{ background: planInfo.gradient }}
              aria-hidden
            >
              {planInfo.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-white font-[family-name:var(--font-poppins)] leading-tight">
                {t("planLabel")} {t(planInfo.labelKey)}
              </p>
              <p className="text-white/50 text-xs mt-0.5">{t(planInfo.descKey)}</p>
            </div>
          </div>

          {plan === "free" ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("paywall")}
              className="w-full py-3.5 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-sm glow-red flex items-center justify-center gap-2 transition-transform"
            >
              <Crown size={16} /> {t("upgradeToPremium")}
            </motion.button>
          ) : (
            <button
              onClick={() => navigate("paywall")}
              className="w-full py-2.5 text-center text-sm text-white/70 hover:text-white transition-colors flex items-center justify-center gap-1 group"
            >
              {t("manageSubscription")}
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </motion.section>

        {/* ============ SECTION 2: Préférences ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <SettingsIcon size={16} className="text-[#FF9500]" />
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("settingsPreferences")}
            </h3>
          </div>

          {/* Language selector */}
          <div className="mb-5">
            <label className="text-white/60 text-xs mb-2.5 block">
              {t("settingsLanguageLabel")}
            </label>
            <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label={t("chooseLanguage")}>
              {LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <motion.button
                    key={lang.code}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLanguage(lang.code)}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={lang.nativeName}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all ${
                      isSelected
                        ? "glass-card-strong ring-2 ring-[#10B981]"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Flag code={lang.flag} size={28} />
                    <span className="text-[10px] text-white/70 text-center leading-tight truncate w-full">
                      {lang.nativeName}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Gender selector */}
          <div className="mb-5">
            <label className="text-white/60 text-xs mb-2.5 block">{t("settingsGender")}</label>
            <div className="flex p-1 glass-pill rounded-2xl" role="radiogroup" aria-label={t("chooseGender")}>
              <button
                onClick={() => setGender("male")}
                role="radio"
                aria-checked={gender === "male"}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  gender === "male" ? "gradient-primary text-white" : "text-white/60"
                }`}
              >
                <Mars size={14} /> {t("genderMale")}
              </button>
              <button
                onClick={() => setGender("female")}
                role="radio"
                aria-checked={gender === "female"}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  gender === "female" ? "gradient-primary text-white" : "text-white/60"
                }`}
              >
                <Venus size={14} /> {t("genderFemale")}
              </button>
            </div>
          </div>

          {/* Name input */}
          <div>
            <label htmlFor="settings-name-input" className="text-white/60 text-xs mb-2.5 block">
              {t("settingsYourName")}
            </label>
            <Input
              id="settings-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("settingsNamePlaceholder")}
              maxLength={30}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 focus-visible:border-[#10B981]/60 focus-visible:ring-[#10B981]/20"
            />
          </div>
        </motion.section>

        {/* ============ SECTION 3: Confidentialité & Protection des données ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={16} className="text-[#64D2FF]" />
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("settingsPrivacy")}
            </h3>
          </div>

          {/* Mode anonyme */}
          <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-white/5">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{t("settingsAnonymousMode")}</p>
              <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                {t("settingsAnonymousDesc")}
              </p>
            </div>
            <Switch
              checked={anonymousMode}
              onCheckedChange={setAnonymousMode}
              aria-label={t("settingsAnonymousMode")}
              className="data-[state=checked]:bg-[#10B981] data-[state=unchecked]:bg-white/15"
            />
          </div>

          {/* Consentement aux données */}
          <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-white/5">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{t("settingsDataConsent")}</p>
              <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                {t("settingsDataConsentDesc")}
              </p>
            </div>
            <Switch
              checked={dataConsent}
              onCheckedChange={setDataConsent}
              aria-label={t("settingsDataConsent")}
              className="data-[state=checked]:bg-[#10B981] data-[state=unchecked]:bg-white/15"
            />
          </div>

          {/* Data protection info card */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#64D2FF]/10 border border-[#64D2FF]/20">
            <div className="w-9 h-9 rounded-xl bg-[#64D2FF]/20 flex items-center justify-center flex-shrink-0">
              <Shield size={16} className="text-[#64D2FF]" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold leading-tight">
                {t("settingsDataProtected")}
              </p>
              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                {t("settingsDataProtectedDesc")}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============ SECTION 3a: Sauvegarde cloud & Export (Zerobet 2.0) ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Database size={16} className="text-[#4ADE80]" />
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("settingsBackupTitle")}
            </h3>
          </div>

          {/* Sync status row */}
          <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-white/5">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{t("settingsBackupSync")}</p>
              <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                {t("settingsBackupSyncDesc")}
              </p>
              <p className="text-white/35 text-[11px] mt-1.5">
                {lastSyncAt
                  ? t("settingsBackupLastSync", {
                      date: new Date(lastSyncAt).toLocaleString(
                        language === "en" ? "en-US" : language === "es" ? "es-ES" : "fr-FR",
                        { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }
                      ),
                    })
                  : t("settingsBackupNever")}
              </p>
            </div>
            <button
              onClick={() => {
                requestSync();
                toast.success(t("settingsBackupStarted"));
              }}
              disabled={cloudSyncStatus === "syncing"}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                cloudSyncStatus === "syncing"
                  ? "bg-white/10 text-white/40 cursor-wait"
                  : "gradient-primary text-white active:scale-95"
              }`}
              aria-label={t("settingsBackupSyncNow")}
            >
              {cloudSyncStatus === "syncing"
                ? t("settingsBackupSyncing")
                : cloudSyncStatus === "error"
                  ? t("settingsBackupRetry")
                  : t("settingsBackupSyncNow")}
            </button>
          </div>

          {/* RGPD data export */}
          <button
            onClick={() => {
              try {
                const exportData = {
                  exportedAt: new Date().toISOString(),
                  app: "Zerobet",
                  version: "2.0",
                  summary: { streakDays, xp, level, plan },
                  data: useStore.getState(),
                };
                const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `zerobet-mes-donnees-${new Date().toISOString().slice(0, 10)}.json`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                toast.success(t("settingsExportDone"));
              } catch {
                toast.error(t("settingsExportError"));
              }
            }}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left mb-3"
            aria-label={t("settingsExportData")}
          >
            <div className="w-9 h-9 rounded-xl bg-[#4ADE80]/15 flex items-center justify-center flex-shrink-0">
              <Download size={16} className="text-[#4ADE80]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{t("settingsExportData")}</p>
              <p className="text-white/50 text-xs mt-0.5">{t("settingsExportDesc")}</p>
            </div>
            <ChevronRight size={16} className="text-white/30 flex-shrink-0" />
          </button>

          {/* Zerobet 2.0 — cloud restore (récupération après réinstallation) */}
          <button
            onClick={async () => {
              try {
                const raw = localStorage.getItem("zerobet-device-id");
                if (!raw) {
                  toast.info(t("settingsRestoreNone"));
                  return;
                }
                const res = await fetch(`/api/progress?deviceId=${encodeURIComponent(raw)}`);
                if (res.status === 404) {
                  toast.info(t("settingsRestoreNone"));
                  return;
                }
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                const ok = restoreFromSnapshot(data?.snapshot ?? {});
                if (ok) {
                  toast.success(t("settingsRestoreDone"));
                } else {
                  toast.info(t("settingsRestoreNone"));
                }
              } catch {
                toast.error(t("settingsRestoreError"));
              }
            }}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
            aria-label={t("settingsRestoreData")}
          >
            <div className="w-9 h-9 rounded-xl bg-[#64D2FF]/15 flex items-center justify-center flex-shrink-0">
              <Upload size={16} className="text-[#64D2FF]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{t("settingsRestoreData")}</p>
              <p className="text-white/50 text-xs mt-0.5">{t("settingsRestoreDesc")}</p>
            </div>
            <ChevronRight size={16} className="text-white/30 flex-shrink-0" />
          </button>
        </motion.section>

        {/* ============ SECTION 3b: Apparence (Task 9-a) ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Palette size={16} className="text-[#FF9500]" />
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("settingsAppearance")}
            </h3>
          </div>

          {/* Theme selector */}
          <div className="mb-5">
            <label className="text-white/60 text-xs mb-2.5 block">{t("settingsTheme")}</label>
            <div className="flex p-1 glass-pill rounded-2xl" role="radiogroup" aria-label={t("chooseTheme")}>
              <button
                onClick={() => setThemeMode("dark")}
                role="radio"
                aria-checked={themeMode === "dark"}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  themeMode === "dark" ? "gradient-primary text-white" : "text-white/60"
                }`}
              >
                <Moon size={14} /> {t("settingsThemeDark")}
                <Lock size={10} className="opacity-60" />
              </button>
              <button
                onClick={() => setThemeMode("auto")}
                role="radio"
                aria-checked={themeMode === "auto"}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  themeMode === "auto" ? "gradient-primary text-white" : "text-white/60"
                }`}
              >
                <Sun size={14} /> {t("settingsThemeAuto")}
              </button>
            </div>
            <p className="text-white/40 text-[10px] mt-1.5">
              {t("themeLockNote")}
            </p>
          </div>

          {/* Starfield intensity slider */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-white/60 text-xs">{t("starfieldIntensity")}</label>
              <span className="text-white text-xs font-mono bg-white/5 px-2 py-0.5 rounded-md">
                {starfieldIntensity}%
              </span>
            </div>
            <Slider
              value={[starfieldIntensity]}
              min={0}
              max={100}
              step={5}
              onValueChange={(v) => setStarfieldIntensity(v[0] ?? 60)}
              className="data-[slot=slider-track]:bg-white/10"
              aria-label={t("starfieldIntensity")}
            />
          </div>

          {/* Glass effect toggle */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{t("glassEffect")}</p>
              <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                {t("glassEffectDesc")}
              </p>
            </div>
            <Switch
              checked={glassEffect}
              onCheckedChange={setGlassEffect}
              aria-label={t("glassEffect")}
              className="data-[state=checked]:bg-[#FF9500] data-[state=unchecked]:bg-white/15"
            />
          </div>
        </motion.section>

        {/* ============ SECTION 3c: Notifications (Task 9-a) ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-[#FF9500]" />
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("notificationPrefs")}
            </h3>
          </div>

          <div className="space-y-3">
            <NotificationToggle
              label={t("streakReminders")}
              description={t("streakRemindersDesc")}
              checked={notificationPrefs.streak}
              onChange={(v) => setNotificationPref("streak", v)}
            />
            <NotificationToggle
              label={t("dailyMotivation")}
              description={t("dailyMotivationDesc")}
              checked={notificationPrefs.motivation}
              onChange={(v) => setNotificationPref("motivation", v)}
            />
            <NotificationToggle
              label={t("newMilestones")}
              description={t("newMilestonesDesc")}
              checked={notificationPrefs.milestones}
              onChange={(v) => setNotificationPref("milestones", v)}
            />
            <NotificationToggle
              label={t("verification")}
              description={t("verificationDesc")}
              checked={notificationPrefs.checkin}
              onChange={(v) => setNotificationPref("checkin", v)}
            />
            <NotificationToggle
              label={t("weeklySummary")}
              description={t("weeklySummaryDesc")}
              checked={notificationPrefs.weekly}
              onChange={(v) => setNotificationPref("weekly", v)}
            />
          </div>

          {/* Notification time picker */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <label
              htmlFor="settings-notification-time"
              className="text-white/60 text-xs mb-2.5 flex items-center gap-1.5"
            >
              <Clock size={12} /> {t("preferredNotificationTime")}
            </label>
            <Input
              id="settings-notification-time"
              type="time"
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
              className="bg-white/5 border-white/10 text-white rounded-xl h-11 focus-visible:border-[#FF9500]/60 focus-visible:ring-[#FF9500]/20 [color-scheme:dark]"
            />
          </div>
        </motion.section>

        {/* ============ SECTION 3d: Gestion des données (Task 9-a) ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Database size={16} className="text-[#4ADE80]" />
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("dataManagement")}
            </h3>
          </div>

          {/* Data size display */}
          <div className="flex items-center justify-between mb-4 p-3 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-white/70 text-sm">{t("dataSize")}</span>
            <span className="text-white text-sm font-mono bg-[#4ADE80]/10 text-[#4ADE80] px-2.5 py-0.5 rounded-md">
              {dataSizeKB}
            </span>
          </div>

          {/* Export / Import */}
          <div className="grid grid-cols-2 gap-2.5 mb-2.5">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleExport}
              className="py-3 rounded-2xl bg-[#4ADE80]/15 text-[#4ADE80] text-xs font-semibold border border-[#4ADE80]/25 flex items-center justify-center gap-1.5 transition-colors hover:bg-[#4ADE80]/20"
            >
              <Download size={14} /> {t("export")}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleImportClick}
              className="py-3 rounded-2xl bg-[#64D2FF]/15 text-[#64D2FF] text-xs font-semibold border border-[#64D2FF]/25 flex items-center justify-center gap-1.5 transition-colors hover:bg-[#64D2FF]/20"
            >
              <Upload size={14} /> {t("import")}
            </motion.button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleImportFile}
            className="hidden"
            aria-hidden
          />

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleClearCache}
            className="w-full py-3 rounded-2xl bg-[#FF9500]/15 text-[#FF9500] text-xs font-semibold border border-[#FF9500]/25 flex items-center justify-center gap-1.5 transition-colors hover:bg-[#FF9500]/20"
          >
            <Trash2 size={14} /> {t("clearCache")}
          </motion.button>

          <p className="text-white/40 text-[10px] mt-3 leading-relaxed">
            {t("exportImportDesc")}
          </p>
        </motion.section>

        {/* ============ SECTION 3e: Confidentialité & Sécurité (Task 9-a) ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={16} className="text-[#10B981]" />
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("privacySecurity")}
            </h3>
          </div>

          <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-white/5">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium flex items-center gap-1.5">
                <Lock size={12} className="text-[#10B981]" /> {t("appLock")}
              </p>
              <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                {t("appLockDesc")}
              </p>
            </div>
            <Switch
              checked={appLock}
              onCheckedChange={setAppLock}
              aria-label={t("appLock")}
              className="data-[state=checked]:bg-[#10B981] data-[state=unchecked]:bg-white/15"
            />
          </div>

          <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-white/5">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium flex items-center gap-1.5">
                <Eye size={12} className="text-[#BF5AF2]" /> {t("discreteMode")}
              </p>
              <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                {t("discreteModeDesc")}
              </p>
            </div>
            <Switch
              checked={discreteMode}
              onCheckedChange={setDiscreteMode}
              aria-label={t("discreteMode")}
              className="data-[state=checked]:bg-[#BF5AF2] data-[state=unchecked]:bg-white/15"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-white/60 text-xs flex items-center gap-1.5">
                <Smartphone size={12} /> {t("autoLockSession")}
              </label>
              <span className="text-white text-xs font-mono bg-white/5 px-2 py-0.5 rounded-md">
                {autoLockMinutes} min
              </span>
            </div>
            <Slider
              value={[autoLockMinutes]}
              min={1}
              max={30}
              step={1}
              onValueChange={(v) => setAutoLockMinutes(v[0] ?? 5)}
              aria-label={t("autoLockSession")}
            />
            <p className="text-white/40 text-[10px] mt-1.5">
              {t("autoLockDesc", { n: autoLockMinutes })}
            </p>
          </div>
        </motion.section>

        {/* ============ SECTION 3f: Son & Haptiques (Task 9-a) ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Volume2 size={16} className="text-[#64D2FF]" />
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("soundHaptics")}
            </h3>
          </div>

          <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-white/5">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium flex items-center gap-1.5">
                <Volume2 size={12} className="text-[#64D2FF]" /> {t("settingsSound")}
              </p>
              <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                {t("soundDescFull")}
              </p>
            </div>
            <Switch
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
              aria-label={t("settingsSound")}
              className="data-[state=checked]:bg-[#64D2FF] data-[state=unchecked]:bg-white/15"
            />
          </div>

          <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-white/5">
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium flex items-center gap-1.5">
                <Vibrate size={12} className="text-[#FF9500]" /> {t("settingsHaptics")}
              </p>
              <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                {t("hapticsDescFull")}
              </p>
            </div>
            <Switch
              checked={hapticsEnabled}
              onCheckedChange={setHapticsEnabled}
              aria-label={t("settingsHaptics")}
              className="data-[state=checked]:bg-[#FF9500] data-[state=unchecked]:bg-white/15"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-white/60 text-xs">{t("volume")}</label>
              <span className="text-white text-xs font-mono bg-white/5 px-2 py-0.5 rounded-md">
                {volume}%
              </span>
            </div>
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={5}
              onValueChange={(v) => setVolume(v[0] ?? 70)}
              disabled={!soundEnabled}
              aria-label={t("volume")}
            />
          </div>
        </motion.section>

        {/* ============ SECTION 4: À propos ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} className="text-[#BF5AF2]" />
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("settingsAbout")}
            </h3>
          </div>

          <div className="flex items-center justify-between mb-2 pb-3 border-b border-white/5">
            <span className="text-white/70 text-sm">{t("appVersion")}</span>
            <span className="text-white text-sm font-mono bg-white/5 px-2 py-0.5 rounded-md">v1.0.0</span>
          </div>

          <AboutLink icon={<FileText size={14} className="text-white/50" />} label={t("settingsTerms")} />
          <AboutLink icon={<Shield size={14} className="text-white/50" />} label={t("settingsPolicy")} />
          <AboutLink icon={<Mail size={14} className="text-white/50" />} label={t("contactUs")} />

          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-white/40 text-xs leading-relaxed text-center italic">
              {t("aboutMission")}
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <Heart size={10} className="text-[#FF3B30]" fill="currentColor" />
              <span className="text-white/30 text-[10px]">{t("designedWithCare")}</span>
            </div>
          </div>
        </motion.section>

        {/* ============ SECTION 5: Réinitialiser ============ */}
        <motion.section variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-[#FF3B30]" />
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("reset")}
            </h3>
          </div>

          <p className="text-white/60 text-xs mb-4 leading-relaxed">
            {t("resetDesc")}
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-2xl bg-[#FF3B30]/15 text-[#FF3B30] text-sm font-semibold border border-[#FF3B30]/30 flex items-center justify-center gap-2 transition-colors hover:bg-[#FF3B30]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]/40"
              >
                <AlertTriangle size={16} /> {t("settingsResetApp")}
              </motion.button>
            </AlertDialogTrigger>
            <AlertDialogContent className="glass-card-strong border-white/10 max-w-[360px] w-[calc(100%-2rem)] p-6 rounded-3xl bg-[#0B132B]/95 backdrop-blur-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white text-lg font-bold font-[family-name:var(--font-poppins)] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#FF3B30]/20 flex items-center justify-center">
                    <AlertTriangle size={16} className="text-[#FF3B30]" />
                  </span>
                  {t("resetAppConfirmTitle")}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white/60 text-sm leading-relaxed">
                  {t("resetAppConfirmDesc")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row gap-2 sm:justify-end mt-2">
                <AlertDialogCancel className="mt-0 bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white rounded-xl h-11 flex-1 sm:flex-initial sm:px-6">
                  {t("cancel")}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleReset}
                  className="bg-[#FF3B30] hover:bg-[#FF3B30]/90 text-white rounded-xl h-11 font-semibold flex-1 sm:flex-initial sm:px-6 border-0"
                >
                  {t("reset")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.section>

        {/* Footer mini-tag */}
        <motion.p
          variants={itemVariants}
          className="text-center text-white/30 text-[10px] pt-2"
        >
          Zerobet • {t("version")} 1.0.0
        </motion.p>
      </motion.div>
    </div>
  );
}

function AboutLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-between py-3 border-b border-white/5 last:border-b-0 active:opacity-70 transition-opacity group"
    >
      <span className="flex items-center gap-2.5 text-white/80 text-sm">
        {icon}
        {label}
      </span>
      <ChevronRight size={16} className="text-white/30 group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}

function NotificationToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium">{label}</p>
        <p className="text-white/50 text-xs mt-0.5 leading-relaxed">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        aria-label={label}
        className="data-[state=checked]:bg-[#FF9500] data-[state=unchecked]:bg-white/15"
      />
    </div>
  );
}
