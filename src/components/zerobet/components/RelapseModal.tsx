"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ChevronRight, LifeBuoy, RotateCcw } from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";

interface RelapseModalProps {
  open: boolean;
  onClose: () => void;
  /** Days the user had before reset (for the compassionate message) */
  previousStreak: number;
}

export function RelapseModal({ open, onClose, previousStreak }: RelapseModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <RelapseModalContent
          key="relapse-content"
          previousStreak={previousStreak}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}

function RelapseModalContent({
  previousStreak,
  onClose,
}: {
  previousStreak: number;
  onClose: () => void;
}) {
  const { resetStreak, addJournalEntry, navigate } = useStore();
  const t = useT();

  // Fresh state on every mount (modal opens with clean fields)
  const [trigger, setTrigger] = useState("");
  const [lesson, setLesson] = useState("");
  const [resumeNow, setResumeNow] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = () => {
    setSubmitting(true);

    // Build reflection content
    const reflectionParts: string[] = [t("relapseModalReflectionStart")];
    if (previousStreak > 0) {
      reflectionParts.push(
        t("relapseModalReflectionStreak", { n: previousStreak })
      );
    }
    if (trigger.trim()) {
      reflectionParts.push(t("relapseModalReflectionTrigger", { text: trigger.trim() }));
    }
    if (lesson.trim()) {
      reflectionParts.push(t("relapseModalReflectionLesson", { text: lesson.trim() }));
    }

    addJournalEntry({
      content: reflectionParts.join("\n\n"),
      emotion: "frustrated",
      trigger: trigger.trim() || undefined,
      intensity: 5,
    });

    resetStreak();

    setTimeout(() => {
      setSubmitting(false);
      onClose();
      if (resumeNow) {
        navigate("dashboard");
      }
    }, 350);
  };

  const handleNeedHelp = () => {
    onClose();
    navigate("sos");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md safe-top"
      role="dialog"
      aria-modal="true"
      aria-labelledby="relapse-modal-title"
    >
      <motion.div
        initial={{ y: "100%", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card-strong p-6 max-w-[430px] w-full rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto custom-scroll safe-bottom relative"
      >
        {/* Decorative blurs */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#FF3B30]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-[#BF5AF2]/15 blur-3xl pointer-events-none" />

        <div className="relative">
          {/* Header icon */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-[#FF3B30]/15 border border-[#FF3B30]/30 flex items-center justify-center mb-4 mx-auto glow-red"
          >
            <Heart size={28} className="text-[#FF3B30]" fill="#FF3B30" />
          </motion.div>

          {/* Title */}
          <h2
            id="relapse-modal-title"
            className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)] text-center mb-1"
          >
            {t("relapseModalTitle")}
          </h2>
          <p className="text-white/60 text-sm text-center mb-5">
            {t("relapseModalSubtitle")}
          </p>

          {/* Compassionate message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 mb-5 border-l-2 border-[#FF9500]/50"
          >
            <p className="text-white text-sm leading-relaxed">
              {t("relapseModalCompassionate", { n: previousStreak })}
            </p>
          </motion.div>

          {/* Reflection inputs */}
          <div className="space-y-4 mb-5">
            <div>
              <label
                htmlFor="relapse-trigger"
                className="text-white/70 text-xs font-medium mb-1.5 flex items-center gap-1.5"
              >
                <Sparkles size={11} className="text-[#FBBF24]" />
                {t("relapseModalTriggerLabel")}
                <span className="text-white/30 text-[10px] font-normal">{t("relapseModalTriggerOptional")}</span>
              </label>
              <textarea
                id="relapse-trigger"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                placeholder={t("relapseModalTriggerPlaceholder")}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#FF9500]/50 focus:bg-white/8 resize-none custom-scroll"
                maxLength={500}
              />
              <div className="text-right text-white/30 text-[10px] mt-1">
                {trigger.length}/500
              </div>
            </div>

            <div>
              <label
                htmlFor="relapse-lesson"
                className="text-white/70 text-xs font-medium mb-1.5 flex items-center gap-1.5"
              >
                <Sparkles size={11} className="text-[#4ADE80]" />
                {t("relapseModalLessonLabel")}
                <span className="text-white/30 text-[10px] font-normal">{t("relapseModalTriggerOptional")}</span>
              </label>
              <textarea
                id="relapse-lesson"
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                placeholder={t("relapseModalLessonPlaceholder")}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#4ADE80]/50 focus:bg-white/8 resize-none custom-scroll"
                maxLength={500}
              />
              <div className="text-right text-white/30 text-[10px] mt-1">
                {lesson.length}/500
              </div>
            </div>
          </div>

          {/* Resume toggle */}
          <button
            type="button"
            onClick={() => setResumeNow((v) => !v)}
            className="w-full glass-card p-3.5 mb-5 flex items-center justify-between active:scale-[0.99] transition-transform"
            aria-pressed={resumeNow}
          >
            <div className="text-left">
              <p className="text-white text-sm font-medium">
                {t("relapseModalResumeTitle")}
              </p>
              <p className="text-white/40 text-[11px] mt-0.5">
                {t("relapseModalResumeDesc")}
              </p>
            </div>
            <div
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                resumeNow ? "gradient-primary" : "bg-white/15"
              }`}
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
                style={{ left: resumeNow ? 22 : 2 }}
              />
            </div>
          </button>

          {/* Action buttons */}
          <div className="space-y-2.5">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirm}
              disabled={submitting}
              className="w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base flex items-center justify-center gap-2 glow-green disabled:opacity-60"
            >
              <RotateCcw size={18} />
              {t("relapseModalConfirmBtn")}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleNeedHelp}
              className="w-full py-3.5 rounded-2xl glass-card text-white font-medium text-sm flex items-center justify-center gap-2 border border-[#64D2FF]/30"
            >
              <LifeBuoy size={16} className="text-[#64D2FF]" />
              {t("relapseModalHelpBtn")}
              <ChevronRight size={14} className="text-white/40" />
            </motion.button>

            <button
              onClick={onClose}
              className="w-full py-2 text-white/40 text-xs hover:text-white/60 transition-colors"
            >
              {t("relapseModalLaterBtn")}
            </button>
          </div>

          <p className="text-white/30 text-[10px] text-center mt-4 italic leading-relaxed">
            {t("relapseModalFooter")}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
