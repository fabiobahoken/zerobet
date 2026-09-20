"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronDown,
  HelpCircle,
  Mail,
  Bug,
  Lightbulb,
  Search,
  Play,
  Clock,
  Wrench,
  ArrowRight,
  Phone,
  AlertTriangle,
  Zap,
  Send,
  X,
  type LucideIcon,
} from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

/* ========================================================================
   Types & Data
   ======================================================================== */

type FAQCategory = "start" | "account" | "features" | "tech";

interface FAQItem {
  id: string;
  category: FAQCategory;
  questionKey: string;
  answerKey: string;
}

interface QuickHelpCard {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  color: string;
  action: () => void;
}

interface VideoTutorial {
  id: string;
  titleKey: string;
  duration: string;
  thumbnail: string;
  gradient: string;
  icon: string;
}

interface TroubleshootItem {
  id: string;
  issueKey: string;
  solutionKey: string;
  icon: LucideIcon;
  color: string;
  target: "settings" | "panic" | "meditation";
}

interface EmergencyNumber {
  id: string;
  nameKey: string;
  number: string;
  descKey: string;
}

const FAQ_ITEMS: FAQItem[] = [
  // Démarrage
  {
    id: "faq-1",
    category: "start",
    questionKey: "supportFaqQ1",
    answerKey: "supportFaqA1",
  },
  {
    id: "faq-2",
    category: "start",
    questionKey: "supportFaqQ2",
    answerKey: "supportFaqA2",
  },
  {
    id: "faq-3",
    category: "start",
    questionKey: "supportFaqQ3",
    answerKey: "supportFaqA3",
  },
  // Compte
  {
    id: "faq-4",
    category: "account",
    questionKey: "supportFaqQ4",
    answerKey: "supportFaqA4",
  },
  {
    id: "faq-5",
    category: "account",
    questionKey: "supportFaqQ5",
    answerKey: "supportFaqA5",
  },
  {
    id: "faq-6",
    category: "account",
    questionKey: "supportFaqQ6",
    answerKey: "supportFaqA6",
  },
  // Fonctionnalités
  {
    id: "faq-7",
    category: "features",
    questionKey: "supportFaqQ7",
    answerKey: "supportFaqA7",
  },
  {
    id: "faq-8",
    category: "features",
    questionKey: "supportFaqQ8",
    answerKey: "supportFaqA8",
  },
  {
    id: "faq-9",
    category: "features",
    questionKey: "supportFaqQ9",
    answerKey: "supportFaqA9",
  },
  // Technique
  {
    id: "faq-10",
    category: "tech",
    questionKey: "supportFaqQ10",
    answerKey: "supportFaqA10",
  },
  {
    id: "faq-11",
    category: "tech",
    questionKey: "supportFaqQ11",
    answerKey: "supportFaqA11",
  },
  {
    id: "faq-12",
    category: "tech",
    questionKey: "supportFaqQ12",
    answerKey: "supportFaqA12",
  },
];

const VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    id: "v1",
    titleKey: "supportVideo1Title",
    duration: "3 min",
    thumbnail: "🚀",
    gradient: "linear-gradient(135deg, #FF3B30 0%, #F59E0B 100%)",
    icon: "🚀",
  },
  {
    id: "v2",
    titleKey: "supportVideo2Title",
    duration: "2 min",
    thumbnail: "⚡",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    icon: "⚡",
  },
  {
    id: "v3",
    titleKey: "supportVideo3Title",
    duration: "5 min",
    thumbnail: "🤖",
    gradient: "linear-gradient(135deg, #FFD166 0%, #FFB020 100%)",
    icon: "🤖",
  },
  {
    id: "v4",
    titleKey: "supportVideo4Title",
    duration: "4 min",
    thumbnail: "👥",
    gradient: "linear-gradient(135deg, #FFC94D 0%, #FFB020 100%)",
    icon: "👥",
  },
];

const TROUBLESHOOT_ITEMS: TroubleshootItem[] = [
  {
    id: "t1",
    issueKey: "supportTrouble1Issue",
    solutionKey: "supportTrouble1Solution",
    icon: Zap,
    color: "#FBBF24",
    target: "settings",
  },
  {
    id: "t2",
    issueKey: "supportTrouble2Issue",
    solutionKey: "supportTrouble2Solution",
    icon: Zap,
    color: "#FFB020",
    target: "settings",
  },
  {
    id: "t3",
    issueKey: "supportTrouble3Issue",
    solutionKey: "supportTrouble3Solution",
    icon: Zap,
    color: "#FFD166",
    target: "settings",
  },
  {
    id: "t4",
    issueKey: "supportTrouble4Issue",
    solutionKey: "supportTrouble4Solution",
    icon: Zap,
    color: "#F59E0B",
    target: "settings",
  },
];

const EMERGENCY_NUMBERS: EmergencyNumber[] = [
  { id: "e1", nameKey: "supportEmergency1Name", number: "3939", descKey: "supportEmergency1Desc" },
  { id: "e2", nameKey: "supportEmergency2Name", number: "09 72 72 12 12", descKey: "supportEmergency2Desc" },
  { id: "e3", nameKey: "supportEmergency3Name", number: "115", descKey: "supportEmergency3Desc" },
  { id: "e4", nameKey: "supportEmergency4Name", number: "112", descKey: "supportEmergency4Desc" },
];

const SUBJECT_OPTIONS = [
  { value: "question", labelKey: "supportSubjectQuestion" },
  { value: "bug", labelKey: "supportSubjectBug" },
  { value: "suggestion", labelKey: "supportSubjectSuggestion" },
  { value: "autre", labelKey: "supportSubjectOther" },
] as const;

type SubjectValue = (typeof SUBJECT_OPTIONS)[number]["value"];

/* ========================================================================
   Main Component
   ======================================================================== */

export function SupportScreen() {
  const t = useT();
  const { navigate } = useStore();

  const [faqSearch, setFaqSearch] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">("all");

  const [contactOpen, setContactOpen] = useState(false);
  const [subject, setSubject] = useState<SubjectValue>("question");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const filteredFaqs = useMemo(() => {
    const q = faqSearch.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (!q) return true;
      const qText = t(item.questionKey).toLowerCase();
      const aText = t(item.answerKey).toLowerCase();
      const cText = t(`supportCategory${item.category.charAt(0).toUpperCase()}${item.category.slice(1)}`).toLowerCase();
      return qText.includes(q) || aText.includes(q) || cText.includes(q);
    });
  }, [faqSearch, activeCategory, t]);

  const faqCategories: (FAQCategory | "all")[] = ["all", "start", "account", "features", "tech"];

  const handleQuickHelp = (id: string) => {
    sound.playClick();
    haptics.light();
    if (id === "faq") {
      // Scroll to FAQ section
      const el = document.getElementById("faq-section");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (id === "contact") {
      setContactOpen(true);
    } else if (id === "bug") {
      setSubject("bug");
      setContactOpen(true);
    } else if (id === "suggestion") {
      setSubject("suggestion");
      setContactOpen(true);
    }
  };

  const quickHelpCards: QuickHelpCard[] = [
    {
      id: "faq",
      icon: HelpCircle,
      titleKey: "supportFaq",
      descKey: "supportFaqDesc",
      color: "#FFB020",
      action: () => handleQuickHelp("faq"),
    },
    {
      id: "contact",
      icon: Mail,
      titleKey: "supportContact",
      descKey: "supportContactDesc",
      color: "#FFC94D",
      action: () => handleQuickHelp("contact"),
    },
    {
      id: "bug",
      icon: Bug,
      titleKey: "supportBug",
      descKey: "supportBugDesc",
      color: "#F59E0B",
      action: () => handleQuickHelp("bug"),
    },
    {
      id: "suggestion",
      icon: Lightbulb,
      titleKey: "supportSuggestion",
      descKey: "supportSuggestionDesc",
      color: "#FFD166",
      action: () => handleQuickHelp("suggestion"),
    },
  ];

  const handleContactSubmit = () => {
    if (message.trim().length < 10) {
      toast.error(t("supportMessageTooShort"));
      return;
    }
    sound.playSuccess();
    haptics.success();
    toast.success(t("supportSent"));
    setContactOpen(false);
    setMessage("");
    setEmail("");
    setSubject("question");
  };

  const handleTroubleshoot = (target: TroubleshootItem["target"]) => {
    sound.playClick();
    haptics.light();
    navigate(target);
  };

  const handlePanic = () => {
    sound.playClick();
    haptics.medium();
    navigate("panic");
  };

  const handleVideoClick = (video: VideoTutorial) => {
    sound.playClick();
    haptics.light();
    toast.info(t("supportVideoPlaying", { title: t(video.titleKey) }), {
      description: t("supportVideoDuration", { duration: video.duration }),
    });
  };

  return (
    <div className="min-h-screen px-5 pt-12 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 mb-6"
      >
        <button
          onClick={() => {
            sound.playClick();
            haptics.light();
            navigate("dashboard");
          }}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
          aria-label={t("backToDashboard")}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight">
            {t("supportTitle")}
          </h1>
          <p className="text-white/50 text-xs">{t("supportSubtitle")}</p>
        </div>
        <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <HelpCircle size={18} className="text-[#FFB020]" />
        </div>
      </motion.div>

      {/* Section 1: Quick Help Cards */}
      <section className="mb-6">
        <div className="grid grid-cols-2 gap-3">
          {quickHelpCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={card.action}
                className="glass-card p-4 flex flex-col items-start text-left"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                  style={{ background: `${card.color}25` }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <h3 className="text-white text-sm font-semibold mb-0.5">{t(card.titleKey)}</h3>
                <p className="text-white/50 text-[11px]">{t(card.descKey)}</p>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Section 2: FAQ */}
      <section id="faq-section" className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle size={14} className="text-[#FFB020]" />
          <h2 className="text-white font-semibold text-sm">{t("supportFaqTitle")}</h2>
        </div>

        {/* Search bar */}
        <div className="relative mb-3">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
          />
          <input
            type="text"
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            placeholder={t("supportSearchFaqQuestion")}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#FFB020]/50 transition-colors"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-3">
          {faqCategories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  haptics.light();
                  setActiveCategory(cat);
                }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  active
                    ? "gradient-primary text-white"
                    : "glass-pill text-white/60"
                }`}
              >
                {cat === "all" ? t("supportCategoryAll") : t(`supportCategory${cat.charAt(0).toUpperCase()}${cat.slice(1)}`)}
              </button>
            );
          })}
        </div>

        {/* FAQ items */}
        <div className="space-y-2">
          {filteredFaqs.length === 0 && (
            <div className="glass-card p-6 text-center">
              <p className="text-white/40 text-sm">{t("supportNoFaqResults")}</p>
            </div>
          )}
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => {
                    sound.playClick();
                    haptics.light();
                    setOpenFaqId(isOpen ? null : faq.id);
                  }}
                  className="w-full flex items-center gap-3 p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-[#FFB020] uppercase tracking-wider">
                      {t(`supportCategory${faq.category.charAt(0).toUpperCase()}${faq.category.slice(1)}`)}
                    </span>
                    <h3 className="text-white text-sm font-medium mt-0.5">{t(faq.questionKey)}</h3>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} className="text-white/50 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-4 pt-1">
                        <p className="text-white/60 text-xs leading-relaxed">{t(faq.answerKey)}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Contact Form (inline) */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Mail size={14} className="text-[#FFC94D]" />
          <h2 className="text-white font-semibold text-sm">{t("supportContact")}</h2>
        </div>
        <div className="glass-card p-5">
          <div className="space-y-3">
            <div>
              <label className="text-white/60 text-xs mb-1.5 block">{t("supportSubject")}</label>
              <div className="flex gap-2 flex-wrap">
                {SUBJECT_OPTIONS.map((opt) => {
                  const active = subject === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => {
                        sound.playClick();
                        haptics.light();
                        setSubject(opt.value);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        active
                          ? "gradient-primary text-white"
                          : "glass-pill text-white/60"
                      }`
                    }
                    >
                      {t(opt.labelKey)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-white/60 text-xs mb-1.5 block">{t("supportMessage")}</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("supportMessagePlaceholder")}
                maxLength={500}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl text-sm min-h-[100px] resize-none focus-visible:border-[#FFC94D]/60 focus-visible:ring-[#FFC94D]/20"
              />
              <div className="flex items-center justify-between mt-1">
                <span className="text-white/40 text-[10px]">
                  {message.trim().length < 10
                    ? t("supportMessageMin", { n: message.trim().length })
                    : t("supportMessageValid")}
                </span>
                <span className="text-white/40 text-[10px]">{message.length}/500</span>
              </div>
            </div>

            <div>
              <label className="text-white/60 text-xs mb-1.5 block">{t("supportEmailOptional")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("supportEmailPlaceholder")}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#FFC94D]/50 transition-colors"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleContactSubmit}
              disabled={message.trim().length < 10}
              className="w-full py-3 rounded-2xl gradient-primary text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              <Send size={14} /> {t("supportSend")}
            </motion.button>

            <div className="flex items-center justify-center gap-1.5 mt-1">
              <Clock size={11} className="text-white/40" />
              <span className="text-white/40 text-[11px]">{t("supportResponseTime")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Video Tutorials */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Play size={14} className="text-[#FFD166]" />
          <h2 className="text-white font-semibold text-sm">{t("supportVideos")}</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
          {VIDEO_TUTORIALS.map((video, idx) => (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleVideoClick(video)}
              className="flex-shrink-0 w-44 glass-card overflow-hidden"
            >
              <div
                className="relative h-24 flex items-center justify-center"
                style={{ background: video.gradient }}
              >
                <span className="text-4xl" aria-hidden>{video.icon}</span>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <Play size={16} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold flex items-center gap-1">
                  <Clock size={9} /> {video.duration}
                </span>
              </div>
              <div className="p-3 text-left">
                <h3 className="text-white text-xs font-semibold leading-tight">{t(video.titleKey)}</h3>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Section 5: Troubleshooting */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Wrench size={14} className="text-[#FBBF24]" />
          <h2 className="text-white font-semibold text-sm">{t("supportTroubleshooting")}</h2>
        </div>
        <div className="space-y-2">
          {TROUBLESHOOT_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="glass-card p-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}25` }}
                  >
                    <Icon size={16} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-semibold mb-1">{t(item.issueKey)}</h3>
                    <p className="text-white/50 text-xs leading-relaxed mb-2.5">{t(item.solutionKey)}</p>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleTroubleshoot(item.target)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-pill text-white text-xs font-medium"
                    >
                      {t("supportResolveBtn")} <ArrowRight size={11} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Section 6: Emergency Notice */}
      <section className="mb-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-5 border border-[#FF3B30]/40"
          style={{
            background: "linear-gradient(135deg, rgba(255,59,48,0.20) 0%, rgba(201,40,31,0.15) 100%)",
          }}
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(255,59,48,0.3)" }} />

          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#FF3B30]/30 flex items-center justify-center">
                <AlertTriangle size={16} className="text-[#FF3B30]" />
              </div>
              <h2 className="text-white font-bold text-base font-[family-name:var(--font-poppins)]">
                {t("supportEmergencyTitle")}
              </h2>
            </div>

            <p className="text-white/70 text-xs leading-relaxed mb-3">
              {t("supportEmergencyDesc")}
            </p>

            <div className="space-y-2 mb-4">
              {EMERGENCY_NUMBERS.map((num) => (
                <a
                  key={num.id}
                  href={`tel:${num.number.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={() => {
                    sound.playClick();
                    haptics.medium();
                  }}
                >
                  <div className="w-9 h-9 rounded-full bg-[#FF3B30]/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-[#FF3B30]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-semibold">{t(num.nameKey)}</span>
                      <span className="text-[#FF3B30] text-xs font-bold">{num.number}</span>
                    </div>
                    <p className="text-white/50 text-[10px]">{t(num.descKey)}</p>
                  </div>
                </a>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handlePanic}
              className="w-full py-3 rounded-2xl bg-[#FF3B30] text-white text-sm font-bold flex items-center justify-center gap-2 pulse-glow"
            >
              <Zap size={16} /> {t("supportUsePanicBtn")}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Contact Modal (alt entry for bug/suggestion quick help) */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContactOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong w-full max-w-md p-5 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-[#FFC94D]" />
                  <h3 className="text-white font-bold text-base">{t("supportContact")}</h3>
                </div>
                <button
                  onClick={() => setContactOpen(false)}
                  className="w-8 h-8 rounded-full glass-pill flex items-center justify-center"
                  aria-label={t("close")}
                >
                  <X size={16} className="text-white/60" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-white/60 text-xs mb-1.5 block">{t("supportSubject")}</label>
                  <div className="flex gap-2 flex-wrap">
                    {SUBJECT_OPTIONS.map((opt) => {
                      const active = subject === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setSubject(opt.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            active ? "gradient-primary text-white" : "glass-pill text-white/60"
                          }`}
                        >
                          {t(opt.labelKey)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs mb-1.5 block">{t("supportMessage")}</label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("supportMessagePlaceholder")}
                    maxLength={500}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl text-sm min-h-[100px] resize-none focus-visible:border-[#FFC94D]/60 focus-visible:ring-[#FFC94D]/20"
                  />
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/40 text-[10px]">
                      {message.trim().length < 10
                        ? t("supportMessageMin", { n: message.trim().length })
                        : t("supportMessageValid")}
                    </span>
                    <span className="text-white/40 text-[10px]">{message.length}/500</span>
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs mb-1.5 block">{t("supportEmailOptional")}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("supportEmailPlaceholder")}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#FFC94D]/50 transition-colors"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContactSubmit}
                  disabled={message.trim().length < 10}
                  className="w-full py-3 rounded-2xl gradient-primary text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send size={14} /> {t("supportSend")}
                </motion.button>

                <div className="flex items-center justify-center gap-1.5">
                  <Clock size={11} className="text-white/40" />
                  <span className="text-white/40 text-[11px]">{t("supportResponseTime")}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
