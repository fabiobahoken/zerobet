"use client";

import { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useStore, type Emotion } from "@/store/zerobet-store";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { MOOD_OPTIONS, getMoodMeta } from "@/lib/data/mood-data";
import { useT } from "@/lib/i18n/useT";


const MOOD_LABEL_KEYS: Record<Emotion, string> = {
  frustrated: "moodFrustrated",
  anxious: "moodAnxious",
  tempted: "moodTempted",
  calm: "moodCalm",
  proud: "moodProud",
  strong: "moodStrong",
};

// Pick the 5 quick-capture moods from the shared source of truth.
const QUICK_MOODS = MOOD_OPTIONS.map((m) => ({
  key: m.key,
  emoji: m.emoji,
  labelKey: MOOD_LABEL_KEYS[m.key],
  color: m.color,
}));

export function MoodTracker() {
  const t = useT();
  const { journalEntries, addJournalEntry, navigate } = useStore();

  // Today's moods from journal entries
  const todayMoods = useMemo(() => {
    const today = new Date().toDateString();
    return journalEntries
      .filter((e) => new Date(e.createdAt).toDateString() === today)
      .map((e) => e.emotion);
  }, [journalEntries]);

  const handleMood = useCallback(
    (mood: { key: Emotion; emoji: string; labelKey: string; color: string }) => {
      const moodLabel = t(mood.labelKey);
      // Quick journal entry with the chosen emotion
      addJournalEntry({
        content: `${t("moodEntryPrefix")} ${moodLabel} ${mood.emoji}`,
        emotion: mood.key,
        intensity: 3,
        trigger: "mood-tracker",
      });

      // Feedback
      sound.playPop();
      haptics.light();

      toast.success(t("moodSaved"), {
        description: `${mood.emoji} ${moodLabel}`,
        duration: 2500,
      });
    },
    [addJournalEntry, t]
  );

  const handleViewJournal = useCallback(() => {
    sound.playClick();
    haptics.light();
    navigate("journal");
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-4 relative overflow-hidden"
    >
      {/* Decorative accent */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#BF5AF2]/10 blur-2xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white text-sm font-semibold font-[family-name:var(--font-poppins)]">
              {t("moodQuestion")}
            </h3>
            <p className="text-white/40 text-xs mt-0.5">
              {t("moodHint")}
            </p>
          </div>
          {todayMoods.length > 0 && (
            <div className="flex items-center gap-1">
              {todayMoods.slice(-5).map((m, i) => {
                const opt = getMoodMeta(m);
                return (
                  <div
                    key={`${i}-${m}`}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: opt.color,
                    }}
                    title={opt.label}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Mood buttons */}
        <div className="grid grid-cols-5 gap-2">
          {QUICK_MOODS.map((mood, idx) => {
            const count = todayMoods.filter((m) => m === mood.key).length;
            return (
              <motion.button
                key={mood.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleMood(mood)}
                className="relative flex flex-col items-center gap-1 p-2.5 rounded-2xl glass-pill active:scale-95 transition-transform"
                style={{
                  background: `${mood.color}15`,
                  border: `1px solid ${mood.color}30`,
                }}
                aria-label={t(mood.labelKey)}
              >
                <span className="text-2xl leading-none">{mood.emoji}</span>
                <span
                  className="text-[10px] font-medium"
                  style={{ color: mood.color }}
                >
                  {t(mood.labelKey)}
                </span>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[16px] h-[16px] rounded-full flex items-center justify-center px-1 text-[9px] font-bold text-white"
                    style={{ background: mood.color }}
                  >
                    {count}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Today's moods summary + link */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <div className="text-white/50 text-xs">
            {todayMoods.length === 0
              ? t("moodNoneToday")
              : t("moodCountToday", { count: todayMoods.length })}
          </div>
          <button
            onClick={handleViewJournal}
            className="flex items-center gap-1 text-white/60 text-xs hover:text-white/80 transition-colors"
          >
            {t("moodViewJournal")}
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
