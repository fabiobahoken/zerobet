"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Wallet,
  Award,
  Shield,
  X,
  Pencil,
  Target,
  Check,
  Mars,
  Venus,
  User as UserIcon,
  Calendar,
  TrendingUp,
  Trophy,
  Heart,
  BarChart3,
  Camera,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useStore, type Gender } from "@/store/zerobet-store";
import { LANGUAGES } from "@/lib/i18n/dictionary";
import { useT } from "@/lib/i18n/useT";
import { Flag } from "@/components/zerobet/components/Flag";
import { getCurrentRank, PARCOURS_RANKS } from "@/lib/data/parcours-data";
import { ENGAGEMENT_GOALS } from "@/lib/data/app-data";
import { SPECIAL_ACHIEVEMENTS, type AchievementContext } from "@/components/zerobet/screens/AchievementsScreen";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const PLAN_BADGES: Record<string, { labelKey: string; color: string; gradient: string; icon: string }> = {
  free: {
    labelKey: "settingsPlanFree",
    color: "#9CA3AF",
    gradient: "linear-gradient(135deg, #6B7280 0%, #374151 100%)",
    icon: "🌱",
  },
  premium: {
    labelKey: "settingsPlanPremium",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #F59E0B 100%)",
    icon: "⭐",
  },
  mentor: {
    labelKey: "settingsPlanMentor",
    color: "#4ADE80",
    gradient: "linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)",
    icon: "🛡️",
  },
  psychologist: {
    labelKey: "settingsPlanPsychologist",
    color: "#BF5AF2",
    gradient: "linear-gradient(135deg, #BF5AF2 0%, #5E5CE6 100%)",
    icon: "🎓",
  },
};

const AVATAR_COLOR_OPTIONS = [
  "#10B981",
  "#2DD4BF",
  "#FBBF24",
  "#4ADE80",
  "#F59E0B",
  "#BF5AF2",
];

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "Z";
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDateFR(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getMemberSinceDate(ctx: {
  streakDays: number;
  journalEntries: { createdAt: string }[];
  panicEvents: { createdAt: string }[];
  testimonials: { createdAt: string }[];
  forumPosts: { createdAt: string }[];
}): Date {
  const candidates: number[] = [];
  // Streak-based estimate
  candidates.push(Date.now() - ctx.streakDays * 86400000);
  // Earliest data points
  ctx.journalEntries.forEach((e) =>
    candidates.push(new Date(e.createdAt).getTime())
  );
  ctx.panicEvents.forEach((e) =>
    candidates.push(new Date(e.createdAt).getTime())
  );
  ctx.testimonials.forEach((t) =>
    candidates.push(new Date(t.createdAt).getTime())
  );
  ctx.forumPosts.forEach((p) =>
    candidates.push(new Date(p.createdAt).getTime())
  );
  const earliest = Math.min(...candidates);
  return new Date(earliest);
}

interface HeatmapCell {
  date: Date;
  count: number;
  intensity: 0 | 1 | 2 | 3 | 4;
}

function buildHeatmap(ctx: {
  journalEntries: { createdAt: string }[];
  panicEvents: { createdAt: string }[];
  meditationStreak: number;
  lastMeditationDate: string | null;
  lastCheckInDate: string | null;
}): HeatmapCell[][] {
  // Build a map of date string → count
  const counts = new Map<string, number>();
  const bump = (iso: string) => {
    const d = new Date(iso);
    const key = d.toDateString();
    counts.set(key, (counts.get(key) || 0) + 1);
  };
  ctx.journalEntries.forEach((e) => bump(e.createdAt));
  ctx.panicEvents.forEach((p) => bump(p.createdAt));

  // Meditation days — back-fill from lastMeditationDate for meditationStreak days
  if (ctx.lastMeditationDate && ctx.meditationStreak > 0) {
    const last = new Date(ctx.lastMeditationDate);
    for (let i = 0; i < ctx.meditationStreak; i++) {
      const d = new Date(last);
      d.setDate(d.getDate() - i);
      const key = d.toDateString();
      // Only count if not in the future
      if (d.getTime() <= Date.now()) {
        counts.set(key, (counts.get(key) || 0) + 1);
      }
    }
  }

  // Check-in day
  if (ctx.lastCheckInDate) {
    try {
      bump(ctx.lastCheckInDate);
    } catch {
      // ignore
    }
  }

  // Build 12 weeks × 7 days grid, ending today
  // We want columns to be weeks. Each column has 7 days (Sun-Sat or Mon-Sun).
  // Use Mon-Sun (more European/FR).
  const WEEKS = 12;
  const DAYS = 7;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find the Monday of the current week
  const dayOfWeek = today.getDay(); // 0 = Sunday
  const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const mondayOfCurrentWeek = new Date(today);
  mondayOfCurrentWeek.setDate(today.getDate() + offsetToMonday);

  // The grid ends at the Sunday after mondayOfCurrentWeek (i.e., end of current week)
  // Start = mondayOfCurrentWeek - (WEEKS-1) weeks
  const startDate = new Date(mondayOfCurrentWeek);
  startDate.setDate(mondayOfCurrentWeek.getDate() - (WEEKS - 1) * 7);

  const grid: HeatmapCell[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const week: HeatmapCell[] = [];
    for (let d = 0; d < DAYS; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);
      const key = date.toDateString();
      const count = counts.get(key) || 0;
      let intensity: 0 | 1 | 2 | 3 | 4 = 0;
      if (count >= 4) intensity = 4;
      else if (count === 3) intensity = 3;
      else if (count === 2) intensity = 2;
      else if (count === 1) intensity = 1;
      week.push({ date, count, intensity });
    }
    grid.push(week);
  }
  return grid;
}

const HEATMAP_COLORS = [
  "rgba(255,255,255,0.05)",
  "rgba(74,222,128,0.35)",
  "rgba(74,222,128,0.55)",
  "rgba(74,222,128,0.75)",
  "rgba(74,222,128,1)",
];

const WEEKDAY_LABEL_KEYS = ["weekdayShortMon", "weekdayShortTue", "weekdayShortWed", "weekdayShortThu", "weekdayShortFri", "weekdayShortSat", "weekdayShortSun"];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ProfileScreen() {
  const t = useT();
  const {
    navigate,
    name,
    setName,
    gender,
    setGender,
    language,
    setLanguage,
    plan,
    avatarColor,
    setAvatarColor,
    profilePhoto,
    setProfilePhoto,
    streakDays,
    adminStreakOverride,
    weeklyBetAmount,
    unlockedRanks,
    panicEvents,
    journalEntries,
    testimonials,
    forumPosts,
    meditationStreak,
    lastMeditationDate,
    lastCheckInDate,
    selectedGoals,
    signatureData,
    articlesRead,
  } = useStore();

  const [editOpen, setEditOpen] = useState(false);
  const [editingName, setEditingName] = useState(name);
  const [editingGender, setEditingGender] = useState<Gender>(gender);
  const [editingLang, setEditingLang] = useState(language);
  const [editingColor, setEditingColor] = useState(avatarColor);

  // Hidden file input ref for profile photo upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic type/size guard
    if (!file.type.startsWith("image/")) {
      toast.error(t("profilePhotoErrorType"));
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error(t("profilePhotoErrorSize"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize to 256x256 with center-crop (cover)
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 256, 256);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setProfilePhoto(dataUrl);
        toast.success(t("profilePhotoUpdated"));
      };
      img.onerror = () => {
        toast.error(t("profilePhotoErrorRead"));
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      toast.error(t("profilePhotoErrorRead"));
    };
    reader.readAsDataURL(file);

    // Reset input value so the same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    toast.success(t("profilePhotoRemoved"));
  };

  const openEditModal = () => {
    // Sync editing fields from current store values when opening the modal
    setEditingName(name);
    setEditingGender(gender);
    setEditingLang(language);
    setEditingColor(avatarColor);
    setEditOpen(true);
  };

  const effectiveStreak = adminStreakOverride !== null ? adminStreakOverride : streakDays;
  const currentRank = getCurrentRank(effectiveStreak);
  const planBadge = PLAN_BADGES[plan];
  const displayName = name?.trim() || t("guestName");
  const initials = getInitials(name || "");
  const currentLangInfo = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const totalSaved = effectiveStreak * Math.round(weeklyBetAmount / 7);
  const monthlySavings = Math.round((weeklyBetAmount / 7) * 30);

  const memberSince = useMemo(
    () =>
      getMemberSinceDate({
        streakDays: effectiveStreak,
        journalEntries,
        panicEvents,
        testimonials,
        forumPosts,
      }),
    [effectiveStreak, journalEntries, panicEvents, testimonials, forumPosts]
  );

  const achievementContext: AchievementContext = useMemo(
    () => ({
      streakDays: effectiveStreak,
      panicEventsCount: panicEvents.length,
      resolvedPanicCount: panicEvents.filter((p) => p.resolved).length,
      journalCount: journalEntries.length,
      totalSaved,
      meditationStreak,
      testimonialsCount: testimonials.filter((t) => t.isMine).length,
      forumPostsCount: forumPosts.length,
      articlesRead,
    }),
    [
      effectiveStreak,
      panicEvents,
      journalEntries.length,
      totalSaved,
      meditationStreak,
      testimonials,
      forumPosts.length,
      articlesRead,
    ]
  );

  const unlockedSpecialCount = useMemo(
    () =>
      SPECIAL_ACHIEVEMENTS.filter((a) => a.getCurrent(achievementContext) >= a.target).length,
    [achievementContext]
  );

  const totalBadges = unlockedRanks.length + unlockedSpecialCount;

  // Hardest day = day with most panic events
  const hardestDay = useMemo(() => {
    const counts = new Map<string, number>();
    panicEvents.forEach((p) => {
      const key = new Date(p.createdAt).toDateString();
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    let max = 0;
    let maxDate: Date | null = null;
    counts.forEach((c, k) => {
      if (c > max) {
        max = c;
        maxDate = new Date(k);
      }
    });
    return { date: maxDate, count: max };
  }, [panicEvents]);

  // Longest streak (use current streak as approximation; could be enhanced)
  const longestStreak = effectiveStreak;

  // Heatmap
  const heatmap = useMemo(
    () =>
      buildHeatmap({
        journalEntries,
        panicEvents,
        meditationStreak,
        lastMeditationDate,
        lastCheckInDate,
      }),
    [journalEntries, panicEvents, meditationStreak, lastMeditationDate, lastCheckInDate]
  );

  const totalActivities = useMemo(
    () => heatmap.flat().reduce((sum, c) => sum + c.count, 0),
    [heatmap]
  );

  // Recovery stats 2x2
  const recoveryStats = [
    {
      label: t("profileStatDaysClean"),
      value: `${effectiveStreak}`,
      suffix: "j",
      icon: Flame,
      color: "#F59E0B",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    },
    {
      label: t("profileStatSaved"),
      value: totalSaved.toLocaleString("fr-FR"),
      suffix: " FCFA",
      icon: Wallet,
      color: "#4ADE80",
      gradient: "linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)",
    },
    {
      label: t("profileStatBadges"),
      value: `${totalBadges}`,
      suffix: "",
      icon: Trophy,
      color: "#FBBF24",
      gradient: "linear-gradient(135deg, #FBBF24 0%, #FF9500 100%)",
    },
    {
      label: t("profileStatCrises"),
      value: `${panicEvents.filter((p) => p.resolved).length}`,
      suffix: "",
      icon: Shield,
      color: "#64D2FF",
      gradient: "linear-gradient(135deg, #64D2FF 0%, #5E5CE6 100%)",
    },
  ];

  // Personal records
  const personalRecords = [
    {
      label: t("profileLongestStreak"),
      value: t("profileDaysCount", { n: longestStreak }),
      icon: Flame,
      color: "#F59E0B",
    },
    {
      label: t("profileMonthlySavings"),
      value: `${monthlySavings.toLocaleString("fr-FR")} FCFA`,
      icon: TrendingUp,
      color: "#4ADE80",
    },
    {
      label: t("profileTotalSavings"),
      value: `${totalSaved.toLocaleString("fr-FR")} FCFA`,
      icon: Wallet,
      color: "#FBBF24",
    },
    {
      label: t("profileHardestDay"),
      value: hardestDay.date
        ? `${formatDateFR(hardestDay.date).split(" ").slice(0, 2).join(" ")} (${hardestDay.count})`
        : t("profileNoCrisis"),
      icon: Heart,
      color: "#FF3B30",
    },
  ];

  // Goals with icons
  const goalLabels = useMemo(
    () =>
      selectedGoals
        .map((key) => ENGAGEMENT_GOALS.find((g) => g.key === key))
        .filter((g): g is (typeof ENGAGEMENT_GOALS)[number] => Boolean(g)),
    [selectedGoals]
  );

  const handleSave = () => {
    setName(editingName.trim());
    setGender(editingGender);
    setLanguage(editingLang);
    setAvatarColor(editingColor);
    setEditOpen(false);
  };

  const genderLabel =
    gender === "female" ? t("genderFemale") : gender === "male" ? t("genderMale") : t("genderUndefined");

  return (
    <div className="min-h-screen px-5 pt-12 pb-10 safe-bottom">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-5"
      >
        <button
          onClick={() => navigate("dashboard")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform focus-ring"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <h1 className="text-lg font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight">
          {t("profileTitleMain")}
        </h1>
        <button
          onClick={() => navigate("settings")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
          aria-label={t("settingsTitle")}
        >
          <Pencil size={16} className="text-white/70" />
        </button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        {/* ====== SECTION 1: Profile Header Card ====== */}
        <motion.div
          variants={itemVariants}
          className="glass-card-strong p-5 relative overflow-hidden"
          style={{ boxShadow: `0 0 40px ${avatarColor}40` }}
        >
          {/* Decorative glow */}
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-50"
            style={{ background: avatarColor }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-30"
            style={{ background: avatarColor }}
          />

          <div className="relative flex items-center gap-4">
            {/* Avatar + Photo upload */}
            <motion.div
              initial={{ scale: 0.7, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="relative"
            >
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="sr-only"
                aria-hidden
              />

              {profilePhoto ? (
                /* Profile photo (circular) */
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-24 h-24 rounded-3xl overflow-hidden flex-shrink-0 shadow-lg badge-aura block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  style={{
                    ["--aura-color" as string]: `${avatarColor}80`,
                  }}
                  aria-label={t("profilePhotoChange")}
                >
                  <img
                    src={profilePhoto}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                </button>
              ) : (
                /* Initials avatar (no photo yet) */
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-extrabold text-white flex-shrink-0 font-[family-name:var(--font-poppins)] shadow-lg badge-aura block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  style={{
                    background: `linear-gradient(135deg, ${avatarColor} 0%, ${avatarColor}99 100%)`,
                    ["--aura-color" as string]: `${avatarColor}80`,
                  }}
                  aria-label={t("profilePhotoAdd")}
                >
                  {initials}
                </button>
              )}

              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ border: `2px solid ${avatarColor}` }}
                animate={{ scale: [1, 1.15], opacity: [0.6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              />

              {/* Camera button overlay (bottom-right) */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#070B0E] border-2 border-white/15 flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform hover:bg-[#15151B] z-10"
                aria-label={profilePhoto ? t("profilePhotoChange") : t("profilePhotoAdd")}
              >
                <Camera size={15} className="text-white/90" />
              </button>

              {/* Remove photo button (top-right) — only when photo exists */}
              {profilePhoto && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-[#FF3B30] border-2 border-[#070B0E] flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform hover:bg-[#FF453A] z-10"
                  aria-label={t("profilePhotoRemove")}
                >
                  <Trash2 size={12} className="text-white" />
                </button>
              )}
            </motion.div>

            {/* Name + plan + member since + gender + language */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] truncate leading-tight">
                {displayName}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white inline-flex items-center gap-1"
                  style={{ background: planBadge.color }}
                >
                  <span aria-hidden>{planBadge.icon}</span> {t(planBadge.labelKey)}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold inline-flex items-center gap-1"
                  style={{ background: `${currentRank.color}25`, color: currentRank.color }}
                >
                  <Award size={10} /> {currentRank.name}
                </span>
              </div>

              {/* Member since */}
              <p className="text-white/50 text-[11px] mt-2 flex items-center gap-1.5">
                <Calendar size={11} />
                {t("profileMemberSince")} {formatDateFR(memberSince)}
              </p>

              {/* Gender + language */}
              <div className="flex items-center gap-3 mt-2 text-[11px] text-white/60">
                <span className="flex items-center gap-1">
                  {gender === "female" ? (
                    <Venus size={12} className="text-[#FF9500]" />
                  ) : gender === "male" ? (
                    <Mars size={12} className="text-[#64D2FF]" />
                  ) : (
                    <UserIcon size={12} className="text-white/40" />
                  )}
                  {genderLabel}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden />
                <span className="flex items-center gap-1.5">
                  <Flag code={currentLangInfo.flag} size={14} />
                  {currentLangInfo.nativeName}
                </span>
              </div>
            </div>
          </div>

          {/* Edit profile button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={openEditModal}
            className="relative mt-4 w-full py-3 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-sm flex items-center justify-center gap-2 glow-green"
          >
            <Pencil size={14} /> {t("profileEdit")}
          </motion.button>
        </motion.div>

        {/* ====== SECTION 2: Recovery Stats (2x2) ====== */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3 px-1">
            <BarChart3 size={14} className="text-[#FF9500]" />
            <h2 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("profileRecoveryStats")}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recoveryStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + idx * 0.07, type: "spring", stiffness: 260, damping: 20 }}
                  className="glass-card p-4 relative overflow-hidden"
                >
                  <div
                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-30"
                    style={{ background: stat.color }}
                  />
                  <div className="relative flex items-start justify-between mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: stat.gradient }}
                    >
                      <Icon size={18} className="text-white" />
                    </div>
                  </div>
                  <p className="relative text-2xl font-extrabold text-white font-[family-name:var(--font-poppins)] leading-none">
                    {stat.value}
                    <span className="text-white/50 text-sm font-medium ml-1">{stat.suffix}</span>
                  </p>
                  <p className="relative text-white/50 text-xs mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ====== SECTION 3: Personal Records ====== */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={14} className="text-[#FBBF24]" />
            <h2 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("profileRecords")}
            </h2>
          </div>
          <div className="space-y-2">
            {personalRecords.map((rec, idx) => {
              const Icon = rec.icon;
              return (
                <motion.div
                  key={rec.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${rec.color}20` }}
                  >
                    <Icon size={16} style={{ color: rec.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/50 text-[11px]">{rec.label}</p>
                    <p className="text-white text-sm font-semibold truncate">{rec.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ====== SECTION 4: Goals & Commitments ====== */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target size={14} className="text-[#10B981]" />
            <h2 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
              {t("profileMyGoals")}
            </h2>
          </div>

          {goalLabels.length > 0 ? (
            <div className="space-y-2 mb-4">
              {goalLabels.map((goal) => (
                <div
                  key={goal.key}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                >
                  <span className="text-2xl flex-shrink-0">{goal.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm">{t(goal.labelKey)}</div>
                    <div className="text-white/50 text-xs">{t(goal.descKey)}</div>
                  </div>
                  <Check size={14} className="text-[#4ADE80] flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-xs mb-4 italic">
              {t("profileNoGoals")}
            </p>
          )}

          {/* Signature thumbnail */}
          {signatureData && (
            <div className="pt-3 border-t border-white/5">
              <p className="text-white/50 text-[11px] mb-2 flex items-center gap-1.5">
                <Pencil size={10} /> {t("profileSignature")}
              </p>
              <div className="rounded-xl overflow-hidden bg-white/5 p-2">
                <img
                  src={signatureData}
                  alt={t("profileSignatureAlt")}
                  className="w-full h-16 object-contain"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* ====== SECTION 5: Activity Heatmap ====== */}
        <motion.div variants={itemVariants} className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#4ADE80]" />
              <h2 className="text-xs font-bold text-white/80 uppercase tracking-[0.12em]">
                {t("profileActivity", { n: 12 })}
              </h2>
            </div>
            <span className="text-[10px] text-white/50">
              {t("profileActivitiesCount", { n: totalActivities })}
            </span>
          </div>

          {/* Weekday labels column + grid */}
          <div className="flex gap-1.5">
            {/* Weekday labels */}
            <div className="flex flex-col gap-[3px] pt-0.5">
              {WEEKDAY_LABEL_KEYS.map((d, i) => (
                <div
                  key={i}
                  className="text-[8px] text-white/30 h-[10px] leading-[10px] text-right pr-0.5 w-3"
                >
                  {i % 2 === 0 ? t(d) : ""}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-[3px] flex-1 overflow-x-auto no-scrollbar">
              {heatmap.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((cell, dIdx) => (
                    <motion.div
                      key={`${wIdx}-${dIdx}`}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.01 * (wIdx * 7 + dIdx) }}
                      className="w-[10px] h-[10px] rounded-[2px]"
                      style={{
                        background: HEATMAP_COLORS[cell.intensity],
                        boxShadow:
                          cell.intensity >= 3
                            ? `0 0 6px ${HEATMAP_COLORS[cell.intensity]}`
                            : "none",
                      }}
                      title={`${cell.date.toDateString()} — ${t("profileActivities", { n: cell.count })}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="text-[9px] text-white/40 mr-1">{t("profileHeatmapLess")}</span>
            {HEATMAP_COLORS.map((c, i) => (
              <div
                key={i}
                className="w-[10px] h-[10px] rounded-[2px]"
                style={{ background: c }}
              />
            ))}
            <span className="text-[9px] text-white/40 ml-1">{t("profileHeatmapMore")}</span>
          </div>

          <p className="text-white/40 text-[10px] mt-3 text-center leading-relaxed">
            {t("profileHeatmapDesc")}
          </p>
        </motion.div>

        {/* Footer navigation help */}
        <motion.div variants={itemVariants} className="glass-card p-4 text-center">
          <p className="text-white/60 text-xs leading-relaxed mb-3">
            {t("profileDataPrivate")}
          </p>
          <button
            onClick={() => navigate("settings")}
            className="text-[#FF9500] text-xs font-semibold inline-flex items-center gap-1 active:opacity-70"
          >
            {t("profileAccessSettings")}
            <ChevronRight size={14} />
          </button>
        </motion.div>
      </motion.div>

      {/* ====== Edit Profile Modal ====== */}
      <AnimatePresence>
        {editOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md"
              onClick={() => setEditOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="fixed inset-0 z-[81] flex items-end sm:items-center justify-center p-3 pointer-events-none"
            >
              <div
                className="glass-card-strong w-full max-w-[400px] max-h-[90vh] overflow-y-auto p-5 pointer-events-auto rounded-3xl no-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-extrabold text-white font-[family-name:var(--font-poppins)]">
                    {t("profileEdit")}
                  </h3>
                  <button
                    onClick={() => setEditOpen(false)}
                    className="w-8 h-8 rounded-full glass-pill flex items-center justify-center"
                    aria-label={t("close")}
                  >
                    <X size={16} className="text-white/60" />
                  </button>
                </div>

                {/* Avatar color picker */}
                <div className="mb-5">
                  <label className="text-white/60 text-xs mb-2.5 block">{t("profileAvatarColor")}</label>
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-extrabold text-white flex-shrink-0 shadow-lg font-[family-name:var(--font-poppins)]"
                      style={{
                        background: `linear-gradient(135deg, ${editingColor} 0%, ${editingColor}99 100%)`,
                      }}
                    >
                      {getInitials(editingName || "Z")}
                    </div>
                    <div className="flex gap-2 flex-wrap flex-1 justify-end">
                      {AVATAR_COLOR_OPTIONS.map((c) => (
                        <button
                          key={c}
                          onClick={() => setEditingColor(c)}
                          className={`w-7 h-7 rounded-full transition-transform active:scale-90 ${
                            editingColor === c ? "ring-2 ring-white scale-110" : ""
                          }`}
                          style={{ background: c, boxShadow: `0 0 8px ${c}80` }}
                          aria-label={`Couleur ${c}`}
                        >
                          {editingColor === c && (
                            <Check size={12} className="text-white mx-auto" strokeWidth={3} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Name input */}
                <div className="mb-5">
                  <label className="text-white/60 text-xs mb-2.5 block">{t("settingsYourName")}</label>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    placeholder={t("settingsNamePlaceholder")}
                    maxLength={30}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 px-4 text-sm focus:outline-none focus:border-[#10B981]/60 focus:ring-2 focus:ring-[#10B981]/20"
                  />
                </div>

                {/* Gender toggle */}
                <div className="mb-5">
                  <label className="text-white/60 text-xs mb-2.5 block">{t("settingsGender")}</label>
                  <div className="flex p-1 glass-pill rounded-2xl">
                    <button
                      onClick={() => setEditingGender("male")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        editingGender === "male" ? "gradient-primary text-white" : "text-white/60"
                      }`}
                    >
                      <Mars size={14} /> {t("genderMale")}
                    </button>
                    <button
                      onClick={() => setEditingGender("female")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        editingGender === "female" ? "gradient-primary text-white" : "text-white/60"
                      }`}
                    >
                      <Venus size={14} /> {t("genderFemale")}
                    </button>
                  </div>
                </div>

                {/* Language dropdown */}
                <div className="mb-6">
                  <label className="text-white/60 text-xs mb-2.5 block">{t("settingsLanguage")}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {LANGUAGES.map((lang) => {
                      const isSelected = editingLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => setEditingLang(lang.code)}
                          className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all ${
                            isSelected
                              ? "glass-card-strong ring-2 ring-[#10B981]"
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <Flag code={lang.flag} size={22} />
                          <span className="text-[9px] text-white/70 text-center leading-tight truncate w-full">
                            {lang.nativeName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Save / Cancel */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditOpen(false)}
                    className="flex-1 py-3 rounded-2xl bg-white/5 text-white/80 text-sm font-semibold border border-white/10 active:scale-[0.98] transition-transform"
                  >
                    {t("cancel")}
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="flex-1 py-3 rounded-2xl gradient-primary text-white text-sm font-[family-name:var(--font-poppins)] font-semibold flex items-center justify-center gap-2 glow-green"
                  >
                    <Check size={15} /> {t("save")}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileScreen;
