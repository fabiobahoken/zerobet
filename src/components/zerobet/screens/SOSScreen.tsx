"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Phone,
  Plus,
  Trash2,
  Shield,
  Check,
  ChevronDown,
  Heart,
  Zap,
  X,
  User,
  type LucideIcon,
} from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";

/* ========================================================================
   Types & Data
   ======================================================================== */

interface Hotline {
  id: string;
  name: string;
  description: string;
  phone: string;
  color: string;
}

interface SafetyStep {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const HOTLINES: Hotline[] = [
  {
    id: "h1",
    name: "Ligne d'écoute gambling",
    description: "24/7 • Gratuit • Confidentiel",
    phone: "3939",
    color: "#FF3B30",
  },
  {
    id: "h2",
    name: "Gambling Therapy International",
    description: "Support en ligne mondial",
    phone: "+441472544300",
    color: "#64D2FF",
  },
  {
    id: "h3",
    name: "SOS Amitié",
    description: "Écoute amicale 24/7",
    phone: "0972721212",
    color: "#4ADE80",
  },
  {
    id: "h4",
    name: "Samu Social",
    description: "Urgence sociale • 115",
    phone: "115",
    color: "#FBBF24",
  },
];

const SAFETY_STEPS: SafetyStep[] = [
  {
    id: 1,
    title: "Reconnaître les signes d'alerte",
    description:
      "Apprends à identifier les pensées, émotions et comportements qui précèdent une envie de parier : irritabilité, mensonges, isolement, obsession des résultats sportifs, recherche d'argent urgent.",
    icon: Check,
    color: "#4ADE80",
  },
  {
    id: 2,
    title: "Identifier tes déclencheurs",
    description:
      "Quelles situations, émotions ou personnes déclenchent ton envie de parier ? Le stress, l'ennui, la solitude, un match à la TV, une dette à rembourser ? Note-les dans ton journal.",
    icon: Zap,
    color: "#FF9500",
  },
  {
    id: 3,
    title: "Avoir des stratégies de distraction",
    description:
      "Prépare une liste d'activités de substitution : respiration 4-7-8, appel à un proche, marche de 10 minutes, sport, musique, lecture. Agis dans les 90 premières secondes de l'envie.",
    icon: Shield,
    color: "#64D2FF",
  },
  {
    id: 4,
    title: "Contacter quelqu'un de confiance",
    description:
      "Identifie 2-3 personnes que tu peux appeler sans jugement quand l'envie monte. Ajoute-les dans tes contacts de confiance ci-dessus. Tu n'as pas à traverser ça seul.",
    icon: Phone,
    color: "#BF5AF2",
  },
  {
    id: 5,
    title: "Demander de l'aide professionnelle",
    description:
      "Si tu ressens une perte de contrôle, contacte un professionnel : psychologue spécialisé en addictions, ligne d'écoute, ou groupe de soutien. Demander de l'aide est un acte de force.",
    icon: Heart,
    color: "#FF3B30",
  },
];

/* ========================================================================
   Component
   ======================================================================== */

export function SOSScreen() {
  const t = useT();
  const { navigate, trustedContacts, addTrustedContact, deleteTrustedContact } = useStore();
  const [showOptionsSheet, setShowOptionsSheet] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [readSteps, setReadSteps] = useState<number[]>([]);
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStepRead = (id: number) => {
    setReadSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen px-5 pt-12 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("dashboard")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95"
          aria-label={t("back")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
            {t("sosTitle")}
          </h1>
          <p className="text-white/50 text-xs">{t("sosSubtitle")}</p>
        </div>
        <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <Phone size={18} className="text-[#FF3B30]" />
        </div>
      </div>

      {/* Section 1: Big SOS Button */}
      <section className="mb-6">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowOptionsSheet(true)}
          className="w-full relative overflow-hidden rounded-3xl py-10 flex flex-col items-center justify-center glow-red"
          style={{
            background: "linear-gradient(135deg, #FF3B30 0%, #C9281F 100%)",
          }}
        >
          {/* Pulse rings */}
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-3xl border-2 border-[#FF3B30]"
          />
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            className="absolute inset-0 rounded-3xl border-2 border-[#FF3B30]"
          />

          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3"
            >
              <Phone size={36} className="text-white" fill="white" />
            </motion.div>
            <span className="text-white font-extrabold text-xl tracking-wider font-[family-name:var(--font-poppins)]">
              APPELER À L&apos;AIDE
            </span>
            <span className="text-white/80 text-xs mt-1.5">
              Touche ici pour voir les options
            </span>
          </div>
        </motion.button>
      </section>

      {/* Section 2: Trusted Contacts */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart size={14} className="text-[#FF3B30]" />
            <h2 className="text-white font-semibold text-sm">Contacts de confiance</h2>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddContact(true)}
            className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center"
            aria-label="Ajouter un contact"
          >
            <Plus size={16} className="text-white" />
          </motion.button>
        </div>

        {trustedContacts.length === 0 ? (
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
              <User size={20} className="text-white/40" />
            </div>
            <p className="text-white/60 text-sm mb-1">Aucun contact enregistré</p>
            <p className="text-white/40 text-xs mb-4">
              Ajoute des proches que tu peux appeler en cas d&apos;urgence
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAddContact(true)}
              className="px-4 py-2 rounded-xl glass-pill text-white text-xs font-medium inline-flex items-center gap-1.5"
            >
              <Plus size={12} /> Ajouter un contact
            </motion.button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {trustedContacts.map((contact, idx) => (
              <TrustedContactCard
                key={contact.id}
                contact={contact}
                index={idx}
                onDelete={() => deleteTrustedContact(contact.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Professional Help */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={14} className="text-[#64D2FF]" />
          <h2 className="text-white font-semibold text-sm">Aide professionnelle</h2>
        </div>
        <div className="space-y-2.5">
          {HOTLINES.map((hotline, idx) => (
            <HotlineCard key={hotline.id} hotline={hotline} index={idx} />
          ))}
        </div>
      </section>

      {/* Section 4: Safety Plan */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Check size={14} className="text-[#4ADE80]" />
            <h2 className="text-white font-semibold text-sm">Plan de sécurité</h2>
          </div>
          <span className="text-white/40 text-xs">
            {readSteps.length}/{SAFETY_STEPS.length} lus
          </span>
        </div>
        <div className="space-y-2.5">
          {SAFETY_STEPS.map((step, idx) => (
            <SafetyStepCard
              key={step.id}
              step={step}
              index={idx}
              isRead={readSteps.includes(step.id)}
              isOpen={openStep === step.id}
              onToggleRead={() => toggleStepRead(step.id)}
              onToggleOpen={() => setOpenStep(openStep === step.id ? null : step.id)}
            />
          ))}
        </div>
      </section>

      {/* Section 5: If you're in crisis now */}
      <section className="mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(255,59,48,0.35) 0%, rgba(255,149,0,0.2) 100%)",
            border: "1px solid rgba(255,59,48,0.4)",
          }}
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FF3B30]/30 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-8 h-8 rounded-full bg-[#FF3B30] flex items-center justify-center"
              >
                <Zap size={16} className="text-white" fill="white" />
              </motion.div>
              <h3 className="text-white font-bold text-base font-[family-name:var(--font-poppins)]">
                Si tu es en crise immédiate
              </h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Tu ressens une envie écrasante de parier ? Ne reste pas seul avec ça.
              Agis maintenant.
            </p>

            <div className="space-y-2.5">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("panic")}
                className="w-full py-3 rounded-xl gradient-primary text-white text-sm font-bold flex items-center justify-center gap-2"
              >
                <Zap size={16} fill="white" />
                Utiliser le bouton panique
              </motion.button>

              <motion.a
                href="tel:3939"
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm font-bold flex items-center justify-center gap-2 border border-white/20"
              >
                <Phone size={16} />
                Appeler un professionnel
              </motion.a>
            </div>

            <p className="text-white/70 text-center text-xs mt-4 italic">
              💚 Tu n&apos;es pas seul. Demander de l&apos;aide est un acte de force.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Options Sheet (from SOS button) */}
      <AnimatePresence>
        {showOptionsSheet && (
          <OptionsSheet
            hotlines={HOTLINES}
            trustedContacts={trustedContacts}
            onClose={() => setShowOptionsSheet(false)}
            onPanic={() => {
              setShowOptionsSheet(false);
              navigate("panic");
            }}
          />
        )}
      </AnimatePresence>

      {/* Add Contact Modal */}
      <AnimatePresence>
        {showAddContact && (
          <AddContactModal
            onClose={() => setShowAddContact(false)}
            onAdd={(c) => {
              addTrustedContact(c);
              setShowAddContact(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========================================================================
   Sub-components
   ======================================================================== */

function TrustedContactCard({
  contact,
  index,
  onDelete,
}: {
  contact: { id: string; name: string; phone: string; relationship: string };
  index: number;
  onDelete: () => void;
}) {
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4) }}
      className="glass-card p-3.5 flex items-center gap-3"
    >
      <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        {initials || <User size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{contact.name}</p>
        <p className="text-white/50 text-[11px] truncate">
          {contact.relationship} • {contact.phone}
        </p>
      </div>
      <motion.a
        href={`tel:${contact.phone}`}
        whileTap={{ scale: 0.92 }}
        className="w-9 h-9 rounded-full bg-[#4ADE80]/20 flex items-center justify-center flex-shrink-0"
        aria-label={`Appeler ${contact.name}`}
      >
        <Phone size={15} className="text-[#4ADE80]" />
      </motion.a>
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={onDelete}
        className="w-9 h-9 rounded-full bg-[#FF3B30]/15 flex items-center justify-center flex-shrink-0"
        aria-label={`Supprimer ${contact.name}`}
      >
        <Trash2 size={14} className="text-[#FF3B30]" />
      </motion.button>
    </motion.div>
  );
}

function HotlineCard({ hotline, index }: { hotline: Hotline; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4) }}
      className="glass-card p-3.5 flex items-center gap-3"
      style={{ borderLeft: `3px solid ${hotline.color}` }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${hotline.color}25` }}
      >
        <Phone size={16} style={{ color: hotline.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{hotline.name}</p>
        <p className="text-white/50 text-[11px] truncate">{hotline.description}</p>
      </div>
      <motion.a
        href={`tel:${hotline.phone}`}
        whileTap={{ scale: 0.95 }}
        className="px-3.5 py-2 rounded-xl text-white text-xs font-bold flex-shrink-0"
        style={{ background: hotline.color }}
      >
        Appeler
      </motion.a>
    </motion.div>
  );
}

function SafetyStepCard({
  step,
  index,
  isRead,
  isOpen,
  onToggleRead,
  onToggleOpen,
}: {
  step: SafetyStep;
  index: number;
  isRead: boolean;
  isOpen: boolean;
  onToggleRead: () => void;
  onToggleOpen: () => void;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4) }}
      className={`glass-card overflow-hidden transition-all ${
        isRead ? "border-[#4ADE80]/30" : ""
      }`}
    >
      <div className="flex items-stretch">
        {/* Step number */}
        <div
          className="flex items-center justify-center w-12 flex-shrink-0"
          style={{ background: `${step.color}20` }}
        >
          <span
            className="text-lg font-extrabold font-[family-name:var(--font-poppins)]"
            style={{ color: step.color }}
          >
            {step.id}
          </span>
        </div>

        <button
          onClick={onToggleOpen}
          className="flex-1 flex items-center gap-3 p-3 text-left min-w-0"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${step.color}25` }}
          >
            <Icon size={15} style={{ color: step.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`text-sm font-semibold leading-snug ${
                isRead ? "text-white/70" : "text-white"
              }`}
            >
              {step.title}
            </h3>
          </div>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown size={16} className="text-white/40 flex-shrink-0" />
          </motion.div>
        </button>

        {/* Read toggle */}
        <button
          onClick={onToggleRead}
          className="px-3 flex-shrink-0 flex items-center"
          aria-label={isRead ? "Marquer comme non lu" : "Marquer comme lu"}
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            className={`w-6 h-6 rounded-full flex items-center justify-center border ${
              isRead
                ? "bg-[#4ADE80] border-[#4ADE80]"
                : "border-white/30 bg-white/5"
            }`}
          >
            {isRead && <Check size={12} className="text-[#070B0E]" strokeWidth={3} />}
          </motion.div>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-white/65 text-xs leading-relaxed px-4 pb-4 pt-1">
              {step.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function OptionsSheet({
  hotlines,
  trustedContacts,
  onClose,
  onPanic,
}: {
  hotlines: Hotline[];
  trustedContacts: { id: string; name: string; phone: string; relationship: string }[];
  onClose: () => void;
  onPanic: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card-strong w-full max-w-[430px] rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto custom-scroll safe-bottom"
      >
        {/* Drag handle */}
        <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mb-4" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-[#FF3B30]" />
            <h3 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)]">
              Qui appeler ?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center"
            aria-label="Fermer"
          >
            <X size={16} className="text-white/60" />
          </button>
        </div>

        {/* Panic button option */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onPanic}
          className="w-full p-4 mb-3 rounded-2xl flex items-center gap-3 text-left"
          style={{
            background: "linear-gradient(135deg, rgba(255,59,48,0.25) 0%, rgba(255,149,0,0.15) 100%)",
            border: "1px solid rgba(255,59,48,0.4)",
          }}
        >
          <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
            <Zap size={20} className="text-white" fill="white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Bouton panique</p>
            <p className="text-white/60 text-xs">Respiration guidée 4-7-8</p>
          </div>
        </motion.button>

        {/* Trusted contacts (if any) */}
        {trustedContacts.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-2 mt-4">
              <Heart size={12} className="text-[#FF3B30]" />
              <p className="text-white/50 text-xs uppercase tracking-wider font-medium">
                Tes contacts de confiance
              </p>
            </div>
            <div className="space-y-2 mb-3">
              {trustedContacts.map((c) => (
                <a
                  key={c.id}
                  href={`tel:${c.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl glass-pill"
                >
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {c.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{c.name}</p>
                    <p className="text-white/50 text-[11px] truncate">{c.relationship}</p>
                  </div>
                  <Phone size={14} className="text-[#4ADE80] flex-shrink-0" />
                </a>
              ))}
            </div>
          </>
        )}

        {/* Hotlines */}
        <div className="flex items-center gap-2 mb-2 mt-4">
          <Shield size={12} className="text-[#64D2FF]" />
          <p className="text-white/50 text-xs uppercase tracking-wider font-medium">
            Lignes d&apos;urgence
          </p>
        </div>
        <div className="space-y-2">
          {hotlines.map((h) => (
            <a
              key={h.id}
              href={`tel:${h.phone}`}
              className="flex items-center gap-3 p-3 rounded-xl glass-pill"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${h.color}25` }}
              >
                <Phone size={14} style={{ color: h.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{h.name}</p>
                <p className="text-white/50 text-[11px] truncate">{h.description}</p>
              </div>
            </a>
          ))}
        </div>

        <p className="text-center text-white/50 text-xs mt-5 italic">
          💚 Tu fais le bon choix en demandant de l&apos;aide.
        </p>
      </motion.div>
    </motion.div>
  );
}

function AddContactModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (c: { name: string; phone: string; relationship: string }) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");

  const RELATIONSHIPS = ["Famille", "Ami", "Conjoint(e)", "Thérapeute", "Collègue", "Autre"];

  const canSubmit = name.trim().length > 0 && phone.trim().length >= 4;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onAdd({
      name: name.trim(),
      phone: phone.trim(),
      relationship: relationship || "Proche",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-5"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card-strong p-5 w-full max-w-[380px] rounded-3xl"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Plus size={18} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-white font-[family-name:var(--font-poppins)]">
              Nouveau contact
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center"
            aria-label="Fermer"
          >
            <X size={16} className="text-white/60" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Name */}
          <div>
            <label className="text-white/60 text-xs mb-1.5 block font-medium">
              Nom complet
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex : Aïssata Koné"
              className="w-full px-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#FF3B30]/50"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-white/60 text-xs mb-1.5 block font-medium">
              Téléphone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex : +221 77 123 45 67"
              className="w-full px-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#FF3B30]/50"
            />
          </div>

          {/* Relationship */}
          <div>
            <label className="text-white/60 text-xs mb-1.5 block font-medium">
              Relation
            </label>
            <div className="flex flex-wrap gap-1.5">
              {RELATIONSHIPS.map((r) => (
                <motion.button
                  key={r}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRelationship(r)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    relationship === r
                      ? "gradient-primary text-white"
                      : "glass-pill text-white/60"
                  }`}
                >
                  {r}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full mt-5 py-3.5 rounded-xl text-white text-sm font-bold ${
            canSubmit ? "gradient-primary" : "bg-white/10 text-white/40"
          }`}
        >
          Ajouter le contact
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
