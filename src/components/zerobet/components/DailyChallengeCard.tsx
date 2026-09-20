"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, CheckCircle2, Flame, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";
import type { ScreenName } from "@/store/zerobet-store";
import { DAILY_CHALLENGE_XP } from "@/store/zerobet-store";

/* ========================================================================
   DailyChallengeCard — dashboard "Défi du jour" with completion tracking.

   States:
   - pending   : challenge text + "J'ai réussi ce défi" (+{xp} XP) + quick nav
   - justDone  : particle burst celebration (fades automatically)
   - completed : calm emerald state with challenge streak + "new challenge
                 tomorrow" message
   ======================================================================== */

type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

interface DailyChallenge {
  textKey: string;
  screen: ScreenName;
}

interface DailyChallengeCardProps {
  challenge: DailyChallenge;
  completedToday: boolean;
  justDone: boolean;
  streak: number;
  t: TranslateFn;
  onComplete: () => void;
  onNavigate: (screen: ScreenName) => void;
}

/** Radiating particle burst shown right after completing the challenge. */
function ChallengeBurst() {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        angle: (i / 12) * Math.PI * 2,
        color: i % 3 === 0 ? "#FBBF24" : i % 3 === 1 ? "#10B981" : "#2DD4BF",
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos(p.angle) * 90,
            y: Math.sin(p.angle) * 60,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ background: p.color }}
        />
      ))}
    </div>
  );
}

export function DailyChallengeCard({
  challenge,
  completedToday,
  justDone,
  streak,
  t,
  onComplete,
  onNavigate,
}: DailyChallengeCardProps) {
  const done = completedToday || justDone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card card-hover p-4 mb-4 relative overflow-hidden border transition-colors duration-500 ${
        done
          ? "border-[#10B981]/40"
          : "border-[#FBBF24]/20"
      }`}
    >
      {/* Decorative accent */}
      <div
        className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-colors duration-500 ${
          done ? "bg-[#10B981]/15" : "bg-[#FBBF24]/10"
        }`}
      />

      {justDone && <ChallengeBurst />}

      <div className="relative flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
            done ? "bg-[#10B981]/20" : "bg-[#FBBF24]/20"
          }`}
        >
          {done ? (
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <CheckCircle2 size={20} className="text-[#10B981]" />
            </motion.span>
          ) : (
            <Target size={20} className="text-[#FBBF24]" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                done ? "text-[#10B981]" : "text-[#FBBF24]"
              }`}
            >
              {t("dashboardDailyChallenge")}
            </span>
            {!done && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                +{DAILY_CHALLENGE_XP} XP
              </span>
            )}
          </div>

          {done ? (
            <>
              <p className="text-white text-sm leading-relaxed mb-2">
                {t("dashboardChallengeDoneTitle", { n: DAILY_CHALLENGE_XP })}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {streak > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FBBF24] bg-[#FBBF24]/10 border border-[#FBBF24]/25 rounded-full px-2 py-0.5">
                    <Flame size={11} />
                    {t("dashboardChallengeStreak", { n: streak })}
                  </span>
                )}
                <span className="text-[11px] text-white/45">
                  {t("dashboardChallengeComeBack")}
                </span>
              </div>
            </>
          ) : (
            <>
              <p className="text-white text-sm leading-relaxed mb-3">
                {t(challenge.textKey)}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    sound.playSuccess();
                    onComplete();
                  }}
                  className="px-4 py-2 rounded-xl gradient-primary btn-press text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 size={12} />
                  {t("dashboardChallengeMarkDone")}
                </motion.button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigate(challenge.screen);
                  }}
                  className="px-3 py-2 rounded-xl text-white/60 hover:text-white/90 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  {t("dashboardChallengeGo")}
                  <ArrowRight size={12} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
