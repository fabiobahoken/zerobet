"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Shield,
  ChevronLeft,
  TrendingUp,
  History,
  Flame,
  Quote,
  Clock,
  Phone,
  Bot,
  Wind,
  Lock,
  Check,
  Trophy,
  RotateCcw,
  AlertTriangle,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useStore, type Emotion, type RelapseProtocolStep } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import {
  PROTOCOL_STEPS,
  RELAPSE_QUOTES,
  PHASE_META,
} from "@/lib/data/relapse-data";
import {
  containerVariants,
  itemVariants,
} from "@/lib/animations";

// Emotion chips for the acknowledgment form
const EMOTION_OPTIONS: { key: Emotion; emoji: string; label: string; color: string }[] = [
  { key: "frustrated", emoji: "😤", label: "Frustré", color: "#FF3B30" },
  { key: "anxious", emoji: "😰", label: "Anxieux", color: "#FBBF24" },
  { key: "tempted", emoji: "😈", label: "Tenté", color: "#FF9500" },
  { key: "calm", emoji: "😌", label: "Calme", color: "#64D2FF" },
  { key: "proud", emoji: "🦸", label: "Fier", color: "#BF5AF2" },
];

const EMOTION_META: Record<Emotion, { emoji: string; label: string; color: string }> = {
  frustrated: { emoji: "😤", label: "Frustré", color: "#FF3B30" },
  anxious: { emoji: "😰", label: "Anxieux", color: "#FBBF24" },
  tempted: { emoji: "😈", label: "Tenté", color: "#FF9500" },
  calm: { emoji: "😌", label: "Calme", color: "#64D2FF" },
  proud: { emoji: "🦸", label: "Fier", color: "#BF5AF2" },
  strong: { emoji: "💪", label: "Fort", color: "#4ADE80" },
};

// ─── Helper functions ──────────────────────────────────────────────────────

function getProgressPercent(protocol: RelapseProtocolStep[] | null): number {
  if (!protocol || protocol.length === 0) return 0;
  const done = protocol.filter((s) => s.completed).length;
  return Math.round((done / protocol.length) * 100);
}

function getCurrentStep(
  protocol: RelapseProtocolStep[] | null
): RelapseProtocolStep | null {
  if (!protocol) return null;
  return protocol.find((s) => !s.completed) ?? null;
}

function getCurrentPhase(
  protocol: RelapseProtocolStep[] | null
): RelapseProtocolStep["phase"] | null {
  const step = getCurrentStep(protocol);
  return step ? step.phase : null;
}

function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function formatRelativeDays(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.floor((now - then) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return "Aujourd'hui";
  if (diff === 1) return "Hier";
  if (diff < 30) return `il y a ${diff} jours`;
  const months = Math.floor(diff / 30);
  if (months < 12) return `il y a ${months} mois`;
  return `il y a ${Math.floor(months / 12)} an${months < 24 ? "" : "s"}`;
}

// ─── Main component ────────────────────────────────────────────────────────

export function RelapseRecoveryScreen() {
  const t = useT();
  const {
    navigate,
    relapseHistory,
    currentRelapseProtocol,
    addRelapseEvent,
    startRelapseProtocol,
    completeRelapseStep,
    resetRelapseProtocol,
  } = useStore();

  const isActive = currentRelapseProtocol !== null;
  const allDone =
    isActive &&
    currentRelapseProtocol!.length > 0 &&
    currentRelapseProtocol!.every((s) => s.completed);

  if (isActive) {
    return (
      <ProtocolMode
        protocol={currentRelapseProtocol!}
        allDone={allDone}
        onCompleteStep={(id) => {
          completeRelapseStep(id);
          const nextStep = currentRelapseProtocol!.find(
            (s) => !s.completed && s.id !== id
          );
          // Determine if completing this step finishes everything
          const willFinish =
            currentRelapseProtocol!.filter((s) => s.completed).length + 1 >=
            currentRelapseProtocol!.length;
          if (willFinish) {
            sound.playAchievement();
            haptics.success();
            toast.success("Protocole 24h complété !", {
              description: "Tu t'es relevé. On est fier de toi.",
            });
          } else {
            sound.playSuccess();
            haptics.success();
            toast.success("Étape complétée !", {
              description: nextStep
                ? `Prochaine : ${t(nextStep.titleKey)}`
                : "Continue, tu y es presque.",
            });
          }
        }}
        onAbandon={() => {
          sound.playError();
          haptics.warning();
          resetRelapseProtocol();
          toast.info("Protocole interrompu", {
            description: "Tu peux le reprendre quand tu veux.",
          });
        }}
        navigate={navigate}
      />
    );
  }

  return (
    <LandingMode
      relapseHistory={relapseHistory}
      onStart={(payload) => {
        addRelapseEvent({
          trigger: payload.trigger || undefined,
          amountLost: payload.amountLost,
          emotion: payload.emotion,
        });
        startRelapseProtocol();
        sound.playWhoosh();
        haptics.medium();
        toast.success("Protocole démarré. On y va ensemble.", {
          description: "Respire. Tu n'es pas seul.",
        });
      }}
      navigate={navigate}
      t={t}
    />
  );
}

// ─── Landing Mode ─────────────────────────────────────────────────────────

interface LandingModeProps {
  relapseHistory: import("@/store/zerobet-store").RelapseEvent[];
  onStart: (payload: {
    trigger: string;
    amountLost?: number;
    emotion: Emotion;
  }) => void;
  navigate: (screen: import("@/store/zerobet-store").ScreenName) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

function LandingMode({ relapseHistory, onStart, navigate, t }: LandingModeProps) {
  const [trigger, setTrigger] = useState("");
  const [amountLost, setAmountLost] = useState("");
  const [emotion, setEmotion] = useState<Emotion | null>(null);

  const handleStart = () => {
    if (!emotion) {
      sound.playError();
      haptics.error();
      toast.error("Choisis une émotion pour continuer.", {
        description: "Cela nous aide à personnaliser ton accompagnement.",
      });
      return;
    }
    const amount = amountLost.trim() === "" ? undefined : Number(amountLost);
    onStart({
      trigger: trigger.trim(),
      amountLost: typeof amount === "number" && !Number.isNaN(amount) ? amount : undefined,
      emotion,
    });
  };

  const totalRelapses = relapseHistory.length;
  const daysSinceLast =
    relapseHistory.length > 0
      ? Math.floor(
          (Date.now() - new Date(relapseHistory[0].timestamp).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;
  const avgDaysBetween = useMemo(() => {
    if (relapseHistory.length < 2) return null;
    const first = new Date(
      relapseHistory[relapseHistory.length - 1].timestamp
    ).getTime();
    const last = new Date(relapseHistory[0].timestamp).getTime();
    const span = Math.max(1, (last - first) / (1000 * 60 * 60 * 24));
    return Math.round(span / relapseHistory.length);
  }, [relapseHistory]);

  const resilienceMessage =
    totalRelapses === 0
      ? "Tu n'as jamais rechuté. Continue, c'est magnifique."
      : totalRelapses === 1
      ? "Une rechute. C'est derrière toi. Apprends et avance."
      : avgDaysBetween && avgDaysBetween >= 14
      ? `Tu espaces tes rechutes : ~${avgDaysBetween} jours en moyenne. Tu progresses.`
      : avgDaysBetween
      ? `Tu espaces tes rechutes (~${avgDaysBetween} jours). Chaque jour compte.`
      : "Tu te relèves à chaque fois. C'est ce qui compte.";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen px-5 pt-12 pb-8"
    >
      {/* 1. Header */}
      <motion.div
        variants={itemVariants}
        className="sticky top-0 z-20 -mx-5 px-5 pt-3 pb-3 bg-gradient-to-b from-[#0A0A0F]/95 via-[#0A0A0F]/80 to-transparent backdrop-blur-md"
      >
        <div className="glass-card-strong p-4 rounded-2xl flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              haptics.light();
              navigate("dashboard");
            }}
            className="btn-press w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white"
            aria-label={t("back")}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-[#FF3B30]" fill="#FF3B30" />
              <h1 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)] truncate">
                {t("relapseTitle")}
              </h1>
            </div>
            <p className="text-xs text-white/50 mt-0.5">{t("relapseSubtitle")}</p>
          </div>
        </div>
      </motion.div>

      {/* 2. Compassion Hero Card */}
      <motion.div
        variants={itemVariants}
        className="glass-card-strong animate-glow-pulse p-6 rounded-3xl mt-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,59,48,0.18) 0%, rgba(255,149,0,0.12) 100%)",
        }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#FF3B30]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#FF9500]/20 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl mb-3"
            aria-hidden
          >
            💔
          </motion.div>
          <h2 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2">
            Tu as craqué ? Ce n'est pas fini.
          </h2>
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            La rechute fait partie du chemin. 80% des personnes en récupération
            rechutent au moins une fois. Ce qui compte, c'est ce que tu fais
            maintenant.
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-[#FF9500]/30">
            <TrendingUp size={14} className="text-[#FF9500]" />
            <span className="text-xs text-white/80 font-medium">
              80% rechutent — et 60% finissent par réussir
            </span>
          </div>
        </div>
      </motion.div>

      {/* 3. Acknowledgment Card */}
      <motion.div variants={itemVariants} className="glass-card p-5 rounded-3xl mt-4">
        <div className="flex items-center gap-2 mb-1">
          <Shield size={16} className="text-[#FF3B30]" />
          <h3 className="text-base font-semibold text-white font-[family-name:var(--font-poppins)]">
            Reconnaître la rechute
          </h3>
        </div>
        <p className="text-xs text-white/60 mb-4 leading-relaxed">
          Le premier pas est de reconnaître ce qui s'est passé. Pas de jugement,
          juste des faits.
        </p>

        {/* Trigger input */}
        <label className="text-xs text-white/70 font-medium mb-1.5 block">
          Qu'est-ce qui t'a amené à parier ?
          <span className="text-white/30 ml-1 font-normal">(optionnel)</span>
        </label>
        <textarea
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          placeholder="Ex : solitude, stress, publicité vue sur Instagram…"
          rows={3}
          maxLength={500}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#FF9500]/50 focus:bg-white/8 resize-none custom-scroll mb-1"
        />
        <div className="text-right text-white/30 text-[10px] mb-4">
          {trigger.length}/500
        </div>

        {/* Amount lost input */}
        <label className="text-xs text-white/70 font-medium mb-1.5 block">
          Combien as-tu perdu ?
          <span className="text-white/30 ml-1 font-normal">(optionnel)</span>
        </label>
        <div className="relative mb-4">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={amountLost}
            onChange={(e) => setAmountLost(e.target.value)}
            placeholder="0"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-16 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#FF9500]/50 focus:bg-white/8"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40 font-medium">
            FCFA
          </span>
        </div>

        {/* Emotion selector */}
        <label className="text-xs text-white/70 font-medium mb-2 block">
          Comment te sens-tu maintenant ?
        </label>
        <div className="grid grid-cols-5 gap-2 mb-5">
          {EMOTION_OPTIONS.map((opt) => {
            const selected = emotion === opt.key;
            return (
              <motion.button
                key={opt.key}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  sound.playPop();
                  haptics.selection();
                  setEmotion(opt.key);
                }}
                className="flex flex-col items-center gap-1 py-2 px-1 rounded-2xl transition-all"
                style={{
                  background: selected
                    ? `linear-gradient(135deg, ${opt.color}33, ${opt.color}11)`
                    : "rgba(255,255,255,0.04)",
                  border: selected
                    ? `1px solid ${opt.color}80`
                    : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: selected ? `0 0 12px -2px ${opt.color}80` : "none",
                }}
                aria-pressed={selected}
                aria-label={opt.label}
              >
                <span className="text-xl" aria-hidden>
                  {opt.emoji}
                </span>
                <span
                  className={`text-[10px] font-medium ${
                    selected ? "text-white" : "text-white/60"
                  }`}
                >
                  {opt.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className="btn-press w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base flex items-center justify-center gap-2 glow-red"
        >
          <Heart size={18} fill="#fff" />
          Commencer le protocole de 24h
        </motion.button>
      </motion.div>

      {/* 4. Past Relapses History */}
      {relapseHistory.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="glass-card p-5 rounded-3xl mt-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <History size={16} className="text-[#FF9500]" />
            <h3 className="text-base font-semibold text-white font-[family-name:var(--font-poppins)]">
              Ton historique de rechutes
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto custom-scroll space-y-3">
            {relapseHistory.map((r) => {
              const meta = EMOTION_META[r.emotion];
              return (
                <div
                  key={r.id}
                  className="glass-card p-3 rounded-2xl border-l-2"
                  style={{ borderLeftColor: meta.color }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs text-white/70 font-medium">
                      {formatDateTime(r.timestamp)}
                    </span>
                    <span className="text-[10px] text-white/40">
                      {formatRelativeDays(r.timestamp)}
                    </span>
                  </div>
                  {r.trigger && (
                    <p className="text-xs text-white/70 italic mb-1.5 line-clamp-2">
                      « {r.trigger} »
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1"
                      style={{
                        background: `${meta.color}22`,
                        color: meta.color,
                      }}
                    >
                      {meta.emoji} {meta.label}
                    </span>
                    {typeof r.amountLost === "number" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FF3B30]/15 text-[#FF6B6B]">
                        {r.amountLost.toLocaleString("fr-FR")} FCFA
                      </span>
                    )}
                    {r.protocolCompleted ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#4ADE80]/15 text-[#4ADE80] flex items-center gap-1">
                        <Check size={10} /> Protocole complété
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/40 flex items-center gap-1">
                        <X size={10} /> Protocole interrompu
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* 5. Recovery Stats Card */}
      <motion.div
        variants={itemVariants}
        className="glass-card-strong p-5 rounded-3xl mt-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Flame size={16} className="text-[#FF9500]" />
          <h3 className="text-base font-semibold text-white font-[family-name:var(--font-poppins)]">
            Ta résilience
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <StatBlock
            label="Rechutes"
            value={String(totalRelapses)}
            color="#FF3B30"
            emoji="📊"
          />
          <StatBlock
            label="Dernière"
            value={
              totalRelapses === 0
                ? "—"
                : daysSinceLast === 0
                ? "Aujourd'hui"
                : `J-${daysSinceLast}`
            }
            color="#FF9500"
            emoji="📅"
          />
          <StatBlock
            label="Moy. jours"
            value={avgDaysBetween ? `${avgDaysBetween}j` : "—"}
            color="#4ADE80"
            emoji="⏱️"
          />
        </div>
        <p className="text-xs text-white/70 leading-relaxed text-center italic">
          {resilienceMessage}
        </p>
      </motion.div>

      {/* 6. Quotes Section */}
      <motion.div variants={itemVariants} className="mt-4">
        <div className="flex items-center gap-2 mb-2 px-1">
          <Quote size={14} className="text-[#BF5AF2]" />
          <span className="text-xs text-white/60 font-medium">Pour t'inspirer</span>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {RELAPSE_QUOTES.map((q, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="card-hover glass-card p-4 rounded-2xl flex-shrink-0 w-64"
            >
              <Quote size={16} className="text-[#BF5AF2] mb-2" />
              <p className="text-sm text-white/80 italic leading-relaxed mb-2">
                {t(q.textKey)}
              </p>
              <p className="text-[10px] text-white/40 font-medium">
                — {t(q.authorKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 7. Footer Card */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-5 rounded-3xl mt-4 relative overflow-hidden gradient-border"
      >
        <div className="relative flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FF3B30]/15 flex items-center justify-center flex-shrink-0">
            <Heart size={18} className="text-[#FF3B30]" fill="#FF3B30" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white font-[family-name:var(--font-poppins)] mb-1">
              Rappelle-toi
            </h3>
            <p className="text-sm text-white/70 leading-relaxed italic">
              Tu n'es pas ta rechute. Tu es la personne qui se relève.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatBlock({
  label,
  value,
  color,
  emoji,
}: {
  label: string;
  value: string;
  color: string;
  emoji: string;
}) {
  return (
    <div
      className="rounded-2xl p-3 text-center"
      style={{ background: `${color}14`, border: `1px solid ${color}30` }}
    >
      <div className="text-lg mb-0.5" aria-hidden>
        {emoji}
      </div>
      <div
        className="text-base font-bold font-[family-name:var(--font-poppins)]"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-[10px] text-white/50 mt-0.5">{label}</div>
    </div>
  );
}

// ─── Protocol Mode ─────────────────────────────────────────────────────────

interface ProtocolModeProps {
  protocol: RelapseProtocolStep[];
  allDone: boolean;
  onCompleteStep: (id: string) => void;
  onAbandon: () => void;
  navigate: (screen: import("@/store/zerobet-store").ScreenName) => void;
}

function ProtocolMode({
  protocol,
  allDone,
  onCompleteStep,
  onAbandon,
  navigate,
}: ProtocolModeProps) {
  const t = useT();
  const [confirmAbandon, setConfirmAbandon] = useState(false);
  const percent = getProgressPercent(protocol);
  const currentStep = getCurrentStep(protocol);
  const currentPhase = getCurrentPhase(protocol);
  const completedCount = protocol.filter((s) => s.completed).length;
  const isLastStep =
    currentStep !== null &&
    protocol.filter((s) => !s.completed).length === 1;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen px-5 pt-12 pb-8"
    >
      {/* 1. Header */}
      <motion.div
        variants={itemVariants}
        className="sticky top-0 z-20 -mx-5 px-5 pt-3 pb-3 bg-gradient-to-b from-[#0A0A0F]/95 via-[#0A0A0F]/80 to-transparent backdrop-blur-md"
      >
        <div className="glass-card-strong p-4 rounded-2xl flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              haptics.light();
              navigate("dashboard");
            }}
            className="btn-press w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white"
            aria-label="Retour"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-[#FF3B30]" fill="#FF3B30" />
              <h1 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)] truncate">
                Protocole en cours
              </h1>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Tu te relèves, étape par étape
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2. Progress Hero Card */}
      <motion.div
        variants={itemVariants}
        className="glass-card-strong animate-glow-pulse p-6 rounded-3xl mt-4 relative overflow-hidden"
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#FF9500]/15 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col items-center text-center">
          <span className="text-[10px] tracking-widest font-bold text-[#FF9500] mb-3">
            PROTOCOLE 24H
          </span>
          <ProgressRing percent={percent} size={120} />
          <p className="text-sm text-white/70 mt-3">
            Étape {Math.min(completedCount + 1, protocol.length)} sur{" "}
            {protocol.length}
          </p>
          {currentPhase && (
            <div
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: `${PHASE_META[currentPhase].color}22`,
                border: `1px solid ${PHASE_META[currentPhase].color}50`,
              }}
            >
              <span className="text-base" aria-hidden>
                {PHASE_META[currentPhase].emoji}
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: PHASE_META[currentPhase].color }}
              >
                {t(PHASE_META[currentPhase].labelKey)}
              </span>
              <span className="text-[10px] text-white/40">
                · {PHASE_META[currentPhase].timeframe}
              </span>
            </div>
          )}
          <button
            onClick={() => {
              if (confirmAbandon) {
                onAbandon();
                setConfirmAbandon(false);
              } else {
                sound.playClick();
                haptics.warning();
                setConfirmAbandon(true);
                setTimeout(() => setConfirmAbandon(false), 3000);
              }
            }}
            className="mt-4 text-xs text-white/40 hover:text-[#FF6B6B] transition-colors flex items-center gap-1"
          >
            {confirmAbandon ? (
              <>
                <AlertTriangle size={12} />
                Confirmer l'abandon ?
              </>
            ) : (
              <>
                <X size={12} />
                Abandonner le protocole
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* 3. Current Step Card */}
      {currentStep && !allDone && (
        <CurrentStepCard
          step={currentStep}
          stepIndex={protocol.findIndex((s) => s.id === currentStep.id)}
          total={protocol.length}
          isLastStep={isLastStep}
          onComplete={() => onCompleteStep(currentStep.id)}
        />
      )}

      {/* 4. All Steps Timeline */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-5 rounded-3xl mt-4"
      >
        <h3 className="text-base font-semibold text-white font-[family-name:var(--font-poppins)] mb-4">
          Ton parcours de récupération
        </h3>
        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-white/10"
            aria-hidden
          />
          <div className="space-y-4">
            {protocol.map((step, idx) => {
              const meta = PHASE_META[step.phase];
              const isCurrent = currentStep?.id === step.id;
              const isFuture = !step.completed && !isCurrent;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                  className="relative flex items-start gap-3 pl-0"
                >
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCurrent ? "animate-glow-pulse" : ""
                    }`}
                    style={{
                      background: step.completed
                        ? "rgba(74,222,128,0.18)"
                        : isCurrent
                        ? `${meta.color}26`
                        : "rgba(255,255,255,0.04)",
                      border: step.completed
                        ? "1px solid #4ADE8080"
                        : isCurrent
                        ? `1px solid ${meta.color}80`
                        : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: isCurrent
                        ? `0 0 12px -2px ${meta.color}`
                        : "none",
                    }}
                  >
                    {step.completed ? (
                      <Check size={16} className="text-[#4ADE80]" />
                    ) : isFuture ? (
                      <Lock size={13} className="text-white/30" />
                    ) : (
                      <span className="text-sm" aria-hidden>
                        {meta.emoji}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-sm font-medium font-[family-name:var(--font-poppins)] ${
                          step.completed
                            ? "text-white/40 line-through"
                            : isFuture
                            ? "text-white/40"
                            : "text-white"
                        }`}
                      >
                        {t(step.titleKey)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full"
                        style={{
                          background: `${meta.color}18`,
                          color: meta.color,
                        }}
                      >
                        {t(meta.labelKey)}
                      </span>
                      <span className="text-[10px] text-white/40 flex items-center gap-0.5">
                        <Clock size={9} />
                        {step.duration}
                      </span>
                      {step.completedAt && (
                        <span className="text-[10px] text-[#4ADE80]">
                          ✓ {formatDateTime(step.completedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* 5. Emergency Contact Card */}
      <motion.div
        variants={itemVariants}
        className="glass-card-strong p-5 rounded-3xl mt-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,59,48,0.18) 0%, rgba(255,149,0,0.10) 100%)",
        }}
      >
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Phone size={16} className="text-[#FF3B30]" />
            <h3 className="text-base font-semibold text-white font-[family-name:var(--font-poppins)]">
              Besoin d'aide maintenant ?
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <EmergencyButton
              icon={<Phone size={16} />}
              label="SOS"
              onClick={() => {
                sound.playClick();
                haptics.medium();
                navigate("sos");
              }}
            />
            <EmergencyButton
              icon={<Wind size={16} />}
              label="Respirer"
              onClick={() => {
                sound.playClick();
                haptics.medium();
                navigate("panic");
              }}
            />
            <EmergencyButton
              icon={<Bot size={16} />}
              label="Atlas"
              onClick={() => {
                sound.playClick();
                haptics.medium();
                navigate("atlas");
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* 6. Completion Celebration */}
      <AnimatePresence>
        {allDone && (
          <CompletionModal
            onReturn={() => {
              sound.playClick();
              haptics.light();
              navigate("dashboard");
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CurrentStepCard({
  step,
  stepIndex,
  total,
  isLastStep,
  onComplete,
}: {
  step: RelapseProtocolStep;
  stepIndex: number;
  total: number;
  isLastStep: boolean;
  onComplete: () => void;
}) {
  const t = useT();
  const meta = PHASE_META[step.phase];
  return (
    <motion.div
      variants={itemVariants}
      className="glass-card-strong p-5 rounded-3xl mt-4 relative overflow-hidden"
      style={{
        boxShadow: `0 0 24px -8px ${meta.color}`,
        border: `1px solid ${meta.color}40`,
      }}
    >
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${meta.color}30` }}
      />
      <div className="relative">
        {/* Phase badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
          style={{
            background: `${meta.color}22`,
            border: `1px solid ${meta.color}50`,
          }}
        >
          <span aria-hidden>{meta.emoji}</span>
          <span
            className="text-xs font-semibold"
            style={{ color: meta.color }}
          >
            {t(meta.labelKey)}
          </span>
          <span className="text-[10px] text-white/40">· {meta.timeframe}</span>
        </div>

        {/* Step number */}
        <p className="text-[10px] tracking-widest font-bold text-white/40 mb-1">
          ÉTAPE {stepIndex + 1}/{total}
        </p>
        <h3 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2">
          {t(step.titleKey)}
        </h3>
        <p className="text-sm text-white/70 italic leading-relaxed mb-3">
          {t(step.descKey)}
        </p>

        {/* Action box */}
        <div
          className="rounded-2xl p-3.5 mb-4"
          style={{
            background: `${meta.color}11`,
            border: `1px solid ${meta.color}40`,
          }}
        >
          <p className="text-sm text-white font-medium leading-relaxed">
            👉 {t(step.actionKey)}
          </p>
        </div>

        {/* Duration badge */}
        <div className="flex items-center gap-1.5 mb-4">
          <Clock size={13} className="text-white/40" />
          <span className="text-xs text-white/50">{step.duration}</span>
        </div>

        {/* Complete button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="btn-press w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base flex items-center justify-center gap-2 glow-red"
        >
          {isLastStep ? (
            <>
              <Trophy size={18} />
              Terminer le protocole
            </>
          ) : (
            <>
              <Check size={18} />
              J'ai fait cette étape
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

function EmergencyButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="btn-press glass-card p-3 rounded-2xl flex flex-col items-center gap-1.5"
    >
      <span className="text-[#FF3B30]">{icon}</span>
      <span className="text-xs text-white font-medium">{label}</span>
    </motion.button>
  );
}

// ─── Progress Ring ─────────────────────────────────────────────────────────

function ProgressRing({ percent, size = 120 }: { percent: number; size?: number }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3B30" />
            <stop offset="100%" stopColor="#FF9500" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progress-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            filter: "drop-shadow(0 0 6px rgba(255,149,0,0.6))",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)]">
          {percent}%
        </span>
        <span className="text-[10px] text-white/50">complété</span>
      </div>
    </div>
  );
}

// ─── Completion Celebration Modal ──────────────────────────────────────────

function CompletionModal({ onReturn }: { onReturn: () => void }) {
  // 12 confetti particles
  const confetti = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 240,
        delay: Math.random() * 0.4,
        duration: 1.8 + Math.random() * 0.8,
        color: ["#FF3B30", "#FF9500", "#FBBF24", "#4ADE80", "#BF5AF2"][i % 5],
        shape: i % 3 === 0 ? "circle" : i % 3 === 1 ? "square" : "diamond",
      })),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-md p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="completion-title"
    >
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            initial={{ y: -40, x: 0, opacity: 1, rotate: 0 }}
            animate={{
              y: "110vh",
              x: c.x,
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
              opacity: [1, 1, 0.6, 0],
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              ease: "easeIn",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
            className="absolute top-0 left-1/2"
            style={{
              width: 10,
              height: 10,
              background: c.color,
              borderRadius: c.shape === "circle" ? "50%" : c.shape === "diamond" ? "2px" : "0",
              transform: c.shape === "diamond" ? "rotate(45deg)" : "none",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.7, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="glass-card-strong p-7 rounded-3xl max-w-[340px] w-full text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FBBF24]/30 to-[#FF9500]/20 flex items-center justify-center mx-auto mb-4 glow-orange border border-[#FBBF24]/40"
        >
          <Trophy size={36} className="text-[#FBBF24]" fill="#FBBF24" />
        </motion.div>
        <h2
          id="completion-title"
          className="text-2xl font-bold text-white font-[family-name:var(--font-poppins)] mb-2"
        >
          Tu l'as fait ! 🎉
        </h2>
        <p className="text-sm text-white/70 leading-relaxed mb-5">
          Tu as complété le protocole 24h. Ta série reprend. Tu es plus fort
          maintenant.
        </p>
        <div className="flex items-center justify-center gap-2 mb-5 text-xs text-white/50">
          <RotateCcw size={12} className="text-[#4ADE80]" />
          <span>Jour 1 — pas Jour 0</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onReturn}
          className="btn-press w-full py-4 rounded-2xl gradient-primary text-white font-[family-name:var(--font-poppins)] font-semibold text-base flex items-center justify-center gap-2 glow-red"
        >
          <Heart size={18} fill="#fff" />
          Retour à l'accueil
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
