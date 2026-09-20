"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  BookOpen,
  Wind,
  Flame,
  BookText,
  Check,
  Gift,
  Sparkles,
} from "lucide-react";
import {
  useStore,
  QUEST_REWARDS,
  getStreakMultiplier,
  type DailyQuest as DailyQuestType,
} from "@/store/zerobet-store";
import { toast } from "sonner";
import { useT } from "@/lib/i18n/useT";

/* ========================================================================
   Daily Quest definitions
   ======================================================================== */

interface QuestMeta {
  id: keyof DailyQuestType;
  titleKey: string;
  descKey: string;
  reward: number;
  icon: typeof CalendarCheck;
  color: string;
  bg: string;
}

const QUESTS: QuestMeta[] = [
  {
    id: "checkin",
    titleKey: "dailyQuestsCheckinTitle",
    descKey: "dailyQuestsCheckinDesc",
    reward: QUEST_REWARDS.checkin,
    icon: CalendarCheck,
    color: "#F59E0B",
    bg: "rgba(245, 158, 11,0.15)",
  },
  {
    id: "journal",
    titleKey: "dailyQuestsJournalTitle",
    descKey: "dailyQuestsJournalDesc",
    reward: QUEST_REWARDS.journal,
    icon: BookOpen,
    color: "#FFB020",
    bg: "rgba(255,176,32,0.15)",
  },
  {
    id: "meditation",
    titleKey: "dailyQuestsMeditationTitle",
    descKey: "dailyQuestsMeditationDesc",
    reward: QUEST_REWARDS.meditation,
    icon: Wind,
    color: "#FFC94D",
    bg: "rgba(255,201,77,0.15)",
  },
  {
    id: "streak",
    titleKey: "dailyQuestsStreakTitle",
    descKey: "dailyQuestsStreakDesc",
    reward: QUEST_REWARDS.streak,
    icon: Flame,
    color: "#FF3B30",
    bg: "rgba(255,59,48,0.15)",
  },
  {
    id: "article",
    titleKey: "dailyQuestsArticleTitle",
    descKey: "dailyQuestsArticleDesc",
    reward: QUEST_REWARDS.article,
    icon: BookText,
    color: "#FFD166",
    bg: "rgba(255, 209, 102,0.15)",
  },
];

const TOTAL_DAILY_XP = QUESTS.reduce((sum, q) => sum + q.reward, 0);

/* ========================================================================
   DailyQuests — list of 5 daily quests with progress + claim
   ======================================================================== */

interface DailyQuestsProps {
  /** Compact mode hides the section header (used when embedded in a screen that
   *  already shows a heading). */
  compact?: boolean;
  /** When true, completed quests show a "Réclamer" button (claimed state) until
   *  the user taps to confirm — here we auto-claim on completion so the button
   *  appears only for ready-to-claim quests (not yet completed in UI). */
  showHeader?: boolean;
}

export function DailyQuests({ compact = false, showHeader = true }: DailyQuestsProps) {
  const { dailyQuests, completeQuest, streakDays } = useStore();
  const t = useT();

  const completedCount = Object.values(dailyQuests).filter(Boolean).length;
  const multiplier = getStreakMultiplier(streakDays);
  const totalProgress = (completedCount / QUESTS.length) * 100;

  const handleClaim = (quest: QuestMeta) => {
    if (dailyQuests[quest.id]) return;
    completeQuest(quest.id);
    const adjusted = Math.round(quest.reward * multiplier);
    toast.success(`+${adjusted} XP`, {
      description: t("dailyQuestsToastDesc", { title: t(quest.titleKey) }),
      icon: <Gift size={16} className="text-[#FBBF24]" />,
      duration: 3000,
    });
  };

  return (
    <section className={compact ? "" : "mb-6"}>
      {showHeader && (
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#FBBF24]" />
            <h2 className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)]">
              {t("dailyQuestsTitle")}
            </h2>
          </div>
          <span className="text-white/50 text-xs">
            {completedCount}/{QUESTS.length} · {TOTAL_DAILY_XP} XP
          </span>
        </div>
      )}

      {/* Overall progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-3 mb-3"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-xs">{t("dailyQuestsProgress")}</span>
          <span className="text-white font-semibold text-xs">
            {Math.round(totalProgress)}%
          </span>
        </div>
        <div className="h-2 bg-white/8 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full relative"
            style={{
              background: "linear-gradient(90deg, #FF3B30 0%, #F59E0B 50%, #FBBF24 100%)",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* shimmer overlay */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s linear infinite",
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Quest list */}
      <div className="space-y-2.5">
        {QUESTS.map((quest, idx) => {
          const isDone = dailyQuests[quest.id];
          const Icon = quest.icon;
          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass-card p-3.5 relative overflow-hidden transition-all duration-300 ${
                isDone ? "border border-[#FFC94D]/40" : ""
              }`}
            >
              {/* Decorative glow when done */}
              <AnimatePresence>
                {isDone && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl"
                    style={{ background: "rgba(255,201,77,0.18)" }}
                  />
                )}
              </AnimatePresence>

              <div className="relative flex items-center gap-3">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isDone ? "rgba(255,201,77,0.18)" : quest.bg,
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isDone ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      >
                        <Check size={20} className="text-[#FFC94D]" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="icon"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                      >
                        <Icon size={20} style={{ color: quest.color }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-sm font-semibold truncate font-[family-name:var(--font-poppins)] ${
                        isDone ? "text-white/50 line-through" : "text-white"
                      }`}
                    >
                      {t(quest.titleKey)}
                    </h3>
                  </div>
                  <p className="text-white/50 text-xs truncate mt-0.5">
                    {t(quest.descKey)}
                  </p>
                </div>

                {/* Reward / Claim */}
                <div className="flex-shrink-0">
                  {isDone ? (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold text-[#FFC94D] bg-[#FFC94D]/15"
                    >
                      <Check size={11} strokeWidth={3} />
                      {t("dailyQuestsClaimed")}
                    </motion.span>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleClaim(quest)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold text-white gradient-primary active:scale-95 transition-transform"
                    >
                      <Gift size={11} />
                      +{quest.reward}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Streak multiplier hint */}
              {!isDone && multiplier > 1 && (
                <div className="relative mt-2 flex items-center justify-end">
                  <span className="text-[10px] text-[#FBBF24]/80 font-medium">
                    {t("dailyQuestsMultiplierHint", {
                      mult: multiplier,
                      xp: Math.round(quest.reward * multiplier),
                    })}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default DailyQuests;
