"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ChevronLeft,
  ShieldCheck,
  Users,
  Wrench,
  Crown,
  Sparkles,
  Check,
  ChevronDown,
  FileText,
  Video,
  MessageSquare,
  Clock,
  Stethoscope,
  AlertTriangle,
  Upload,
  Send,
  X,
  Award,
  Flame,
} from "lucide-react";
import { useStore } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

// ---------- Constants ----------

const REQUIRED_STREAK = 90;

const BENEFITS = [
  { emoji: "🛡️", labelKey: "mentorshipBenefitBadge" },
  { emoji: "🌟", labelKey: "mentorshipBenefitImpact" },
  { emoji: "🔧", labelKey: "mentorshipBenefitTools" },
  { emoji: "👑", labelKey: "mentorshipBenefitRecognition" },
];

const SPECIALTIES = [
  "mentorshipSpecYouth",
  "mentorshipSpecFathers",
  "mentorshipSpecStudents",
  "mentorshipSpecAthletes",
  "mentorshipSpecWomen",
  "mentorshipSpecDiaspora",
  "mentorshipSpecGeneral",
];

const COUNTRIES = [
  "mentorshipCountryCI",
  "mentorshipCountrySN",
  "mentorshipCountryML",
  "mentorshipCountryCM",
  "mentorshipCountryGN",
  "mentorshipCountryTG",
  "mentorshipCountryBJ",
  "mentorshipCountryFR",
  "mentorshipCountryBE",
  "mentorshipCountryCA",
  "mentorshipCountryOther",
];

const LANGUAGES = [
  "mentorshipLangFr",
  "mentorshipLangWo",
  "mentorshipLangBm",
  "mentorshipLangLn",
  "mentorshipLangEn",
  "mentorshipLangAr",
  "mentorshipLangPt",
  "mentorshipLangEs",
  "mentorshipLangDyu",
  "mentorshipLangFon",
];

const AVAILABILITIES = [
  "mentorshipAvailFewHours",
  "mentorshipAvail12h",
  "mentorshipAvail247",
];

const CODE_OF_CONDUCT = [
  "mentorshipCode1",
  "mentorshipCode2",
  "mentorshipCode3",
  "mentorshipCode4",
  "mentorshipCode5",
  "mentorshipCode6",
  "mentorshipCode7",
  "mentorshipCode8",
];

const RESOURCES = [
  {
    icon: FileText,
    titleKey: "mentorshipRes1Title",
    typeKey: "mentorshipResTypePdf",
    color: "#F59E0B",
    descKey: "mentorshipRes1Desc",
  },
  {
    icon: MessageSquare,
    titleKey: "mentorshipRes2Title",
    typeKey: "mentorshipResTypeArticle",
    color: "#2DD4BF",
    descKey: "mentorshipRes2Desc",
  },
  {
    icon: Video,
    titleKey: "mentorshipRes3Title",
    typeKey: "mentorshipResTypeVideo",
    color: "#C084FC",
    descKey: "mentorshipRes3Desc",
  },
];

const PSY_SPECIALTIES = [
  "mentorshipPsySpec1",
  "mentorshipPsySpec2",
  "mentorshipPsySpec3",
  "mentorshipPsySpec4",
];

// Simulated mentees for mentors (plan === "mentor")
const SIMULATED_MENTEES = [
  { id: "m1", name: "Karim T.", daysClean: 12, lastContactKey: "mentorshipLastContact2hAgo", statusKey: "mentorshipStatusActive" },
  { id: "m2", name: "Awa S.", daysClean: 34, lastContactKey: "mentorshipLastContactYesterday", statusKey: "mentorshipStatusActive" },
  { id: "m3", name: "Ibrahim K.", daysClean: 5, lastContactKey: "mentorshipLastContact3DaysAgo", statusKey: "mentorshipStatusToContact" },
  { id: "m4", name: "Fatou D.", daysClean: 67, lastContactKey: "mentorshipLastContactToday", statusKey: "mentorshipStatusActive" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 22 },
  },
};

// ---------- Helper components ----------

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-white/80 text-sm font-medium mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-white/40 text-xs mt-1.5">{hint}</p>}
    </div>
  );
}

interface DropdownProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}

function Dropdown({ value, onChange, options, placeholder }: DropdownProps) {
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full h-11 rounded-xl glass-pill px-4 flex items-center justify-between text-left text-sm text-white/90 transition-colors hover:bg-white/[0.07]"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "text-white" : "text-white/40"}>
          {value ? t(value) : placeholder || t("mentorshipSelectPlaceholder")}
        </span>
        <ChevronDown
          size={16}
          className={`text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 mt-2 w-full glass-card-strong rounded-xl p-1.5 max-h-64 overflow-y-auto"
            role="listbox"
          >
            {options.map((opt) => {
              const selected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    sound.playClick();
                    haptics.light();
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    selected
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                  role="option"
                  aria-selected={selected}
                >
                  <span>{t(opt)}</span>
                  {selected && <Check size={14} className="text-[#4ADE80]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Main component ----------

export function MentorshipScreen() {
  const t = useT();
  const { navigate, streakDays, plan, addXP } = useStore();

  const isMentor = plan === "mentor";
  const isPsychologistPlan = plan === "psychologist";
  const [psyMode, setPsyMode] = useState(isPsychologistPlan);

  const isEligible = streakDays >= REQUIRED_STREAK;

  // Mentor form state
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [country, setCountry] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");
  const [motivation, setMotivation] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Psy form state
  const [psyName, setPsyName] = useState("");
  const [psyLicense, setPsyLicense] = useState("");
  const [psySpecialty, setPsySpecialty] = useState("");
  const [psyCountry, setPsyCountry] = useState("");
  const [psyPrice, setPsyPrice] = useState("");
  const [psyBio, setPsyBio] = useState("");
  const [psyDocUploaded, setPsyDocUploaded] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);

  const progressPercent = Math.min(100, Math.round((streakDays / REQUIRED_STREAK) * 100));
  const daysRemaining = Math.max(0, REQUIRED_STREAK - streakDays);

  const toggleLanguage = (lang: string) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
    sound.playPop();
    haptics.light();
  };

  const canSubmitMentor =
    displayName.trim().length >= 2 &&
    bio.trim().length >= 100 &&
    specialty &&
    country &&
    languages.length > 0 &&
    availability &&
    motivation.trim().length >= 50 &&
    agreed;

  const canSubmitPsy =
    psyName.trim().length >= 2 &&
    psyLicense.trim().length >= 3 &&
    psySpecialty &&
    psyCountry &&
    psyPrice.trim().length > 0 &&
    psyBio.trim().length >= 50 &&
    psyDocUploaded;

  const handleSubmitMentor = () => {
    if (!canSubmitMentor) return;
    sound.playSuccess();
    haptics.success();
    addXP(100, t("mentorshipApplication"));
    setShowSuccess(true);
  };

  const handleSubmitPsy = () => {
    if (!canSubmitPsy) return;
    sound.playSuccess();
    haptics.success();
    addXP(100, t("mentorshipPsyTitle"));
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigate("dashboard");
  };

  const successTitle = psyMode ? t("mentorshipSuccessPsy") : t("mentorshipSuccessMentor");
  const successMsg = psyMode
    ? t("mentorshipSuccessMsgPsy")
    : t("mentorshipSuccessMsgMentor");

  const activeMentees = useMemo(
    () => SIMULATED_MENTEES.filter((m) => m.statusKey === "mentorshipStatusActive"),
    []
  );

  return (
    <div className="min-h-screen px-4 pt-12 pb-10 relative">
      {/* ---------- Header ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-5 px-1"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("dashboard")}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform focus-ring"
            aria-label={t("backToDashboard")}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-white font-[family-name:var(--font-poppins)] tracking-tight leading-tight">
              {t("mentorshipTitle")}
            </h1>
            <p className="text-white/50 text-xs">{t("mentorshipSubtitle")}</p>
          </div>
        </div>
        <div
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
          aria-hidden
        >
          <ShieldCheck size={18} className="text-[#4ADE80]" />
        </div>
      </motion.div>

      {/* ---------- Psychologist mode toggle (only show if user is not already on psychologist plan) ---------- */}
      {!isPsychologistPlan && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => {
            setPsyMode((v) => !v);
            sound.playClick();
            haptics.light();
          }}
          className="w-full glass-card p-3.5 mb-4 flex items-center justify-between active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${psyMode ? "#C084FC" : "#9CA3AF"}22` }}
            >
              <Stethoscope
                size={18}
                style={{ color: psyMode ? "#C084FC" : "#9CA3AF" }}
              />
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-semibold">
                {t("mentorshipPsyToggle")}
              </p>
              <p className="text-white/50 text-xs">
                {t("mentorshipPsyToggleDesc")}
              </p>
            </div>
          </div>
          <div
            className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
              psyMode ? "bg-[#C084FC]" : "bg-white/15"
            }`}
          >
            <motion.div
              animate={{ x: psyMode ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-5 h-5 rounded-full bg-white"
            />
          </div>
        </motion.button>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* ============================================================ */}
        {/* SECTION 1: Overview hero                                     */}
        {/* ============================================================ */}
        <motion.section
          variants={itemVariants}
          className="glass-card-strong p-5 relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none bg-[#4ADE80]/20" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-3xl pointer-events-none bg-[#2DD4BF]/15" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#4ADE80]" />
              <h2 className="text-base font-bold text-white font-[family-name:var(--font-poppins)]">
                {t("mentorshipHeroTitle")}
              </h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {t("mentorshipHeroDesc")}
            </p>

            <div className="space-y-2.5">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.labelKey}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-lg">{b.emoji}</span>
                  <span className="text-white/85 text-sm">{t(b.labelKey)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 7: PSYCHOLOGIST VERIFICATION (when psyMode)          */}
        {/* ============================================================ */}
        <AnimatePresence mode="wait">
          {psyMode ? (
            <motion.section
              key="psy"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="glass-card p-5 relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none bg-[#C084FC]/20" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Stethoscope size={18} className="text-[#C084FC]" />
                  <h2 className="text-base font-bold text-white font-[family-name:var(--font-poppins)]">
                    {t("mentorshipPsyTitle")}
                  </h2>
                </div>

                <Field label={t("mentorshipPsyName")} hint={t("mentorshipPsyNameHint")}>
                  <Input
                    value={psyName}
                    onChange={(e) => setPsyName(e.target.value)}
                    placeholder="Dr. ..."
                    className="h-11 rounded-xl glass-pill border-white/10 text-white placeholder:text-white/30"
                  />
                </Field>

                <Field label={t("mentorshipPsyLicense")}>
                  <Input
                    value={psyLicense}
                    onChange={(e) => setPsyLicense(e.target.value)}
                    placeholder="Ex: CI-PSY-2023-0456"
                    className="h-11 rounded-xl glass-pill border-white/10 text-white placeholder:text-white/30"
                  />
                </Field>

                <Field label={t("mentorshipPsySpecialty")}>
                  <Dropdown
                    value={psySpecialty}
                    onChange={setPsySpecialty}
                    options={PSY_SPECIALTIES}
                    placeholder={t("mentorshipPsySpecialty")}
                  />
                </Field>

                <Field label={t("mentorshipPsyCountry")}>
                  <Dropdown
                    value={psyCountry}
                    onChange={setPsyCountry}
                    options={COUNTRIES}
                    placeholder={t("mentorshipPsyCountry")}
                  />
                </Field>

                <Field label={t("mentorshipPsyPrice")}>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={psyPrice}
                    onChange={(e) => setPsyPrice(e.target.value)}
                    placeholder="Ex: 15000"
                    className="h-11 rounded-xl glass-pill border-white/10 text-white placeholder:text-white/30"
                  />
                </Field>

                <Field label={t("mentorshipPsyDoc")}>
                  <button
                    type="button"
                    onClick={() => {
                      setPsyDocUploaded(true);
                      sound.playPop();
                      haptics.light();
                      toast.success(t("mentorshipPsyDocUploaded"));
                    }}
                    className={`w-full h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-colors ${
                      psyDocUploaded
                        ? "border-[#4ADE80]/60 bg-[#4ADE80]/10"
                        : "border-white/15 hover:border-white/30"
                    }`}
                  >
                    {psyDocUploaded ? (
                      <>
                        <Check size={20} className="text-[#4ADE80]" />
                        <span className="text-white text-xs font-medium">
                          licence.pdf
                        </span>
                        <span className="text-white/50 text-[10px]">
                          {t("mentorshipPsyDocUploaded")}
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload size={20} className="text-white/40" />
                        <span className="text-white/60 text-xs">
                          {t("mentorshipPsyDocUpload")}
                        </span>
                        <span className="text-white/30 text-[10px]">
                          {t("mentorshipPsyDocHint")}
                        </span>
                      </>
                    )}
                  </button>
                </Field>

                <Field
                  label={t("mentorshipPsyBio")}
                  hint={t("mentorshipPsyBioHint", { n: psyBio.trim().length })}
                >
                  <Textarea
                    value={psyBio}
                    onChange={(e) => setPsyBio(e.target.value)}
                    placeholder={t("mentorshipPsyBioPlaceholder")}
                    className="min-h-[110px] rounded-xl glass-pill border-white/10 text-white placeholder:text-white/30 resize-none"
                  />
                </Field>

                <div className="flex items-start gap-2 p-3 rounded-xl bg-[#C084FC]/10 border border-[#C084FC]/25 mb-4">
                  <AlertTriangle
                    size={16}
                    className="text-[#C084FC] mt-0.5 flex-shrink-0"
                  />
                  <p className="text-white/70 text-xs leading-relaxed">
                    {t("mentorshipPsyAlert")}
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmitPsy}
                  disabled={!canSubmitPsy}
                  className={`w-full h-12 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                    canSubmitPsy
                      ? "gradient-primary text-white glow-green"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }`}
                >
                  <Send size={16} />
                  {t("mentorshipFormSubmit")}
                </motion.button>
              </div>
            </motion.section>
          ) : (
            <motion.div
              key="mentor-flow"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* ============================================================ */}
              {/* SECTION 2: Eligibility check                                 */}
              {/* ============================================================ */}
              <motion.section
                variants={itemVariants}
                className="glass-card p-5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-white font-[family-name:var(--font-poppins)]">
                    {t("mentorshipJourneyTitle", { current: streakDays, target: REQUIRED_STREAK })}
                  </h2>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      isEligible
                        ? "bg-[#4ADE80]/20 text-[#4ADE80]"
                        : "bg-[#FBBF24]/20 text-[#FBBF24]"
                    }`}
                  >
                    {isEligible ? t("mentorshipEligible") : t("mentorshipDaysLeft", { n: daysRemaining })}
                  </span>
                </div>

                <div className="relative h-3 rounded-full bg-white/8 overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 18,
                      delay: 0.2,
                    }}
                    className="absolute inset-y-0 left-0 rounded-full gradient-success"
                    style={{ boxShadow: "0 0 16px rgba(74,222,128,0.45)" }}
                  />
                </div>

                {isEligible ? (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#4ADE80]/20 flex items-center justify-center flex-shrink-0">
                      <Check size={18} className="text-[#4ADE80]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">
                        {t("mentorshipEligibleTitle")}
                      </p>
                      <p className="text-white/55 text-xs mb-2.5">
                        {t("mentorshipEligibleDesc")}
                      </p>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          sound.playClick();
                          haptics.medium();
                          const el = document.getElementById(
                            "mentor-application-form"
                          );
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="px-4 py-2 rounded-xl bg-[#4ADE80] text-[#070B0E] text-xs font-bold flex items-center gap-1.5"
                      >
                        <Crown size={14} />
                        {t("mentorshipApplyBtn")}
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FBBF24]/20 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-[#FBBF24]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {t("mentorshipNotEligibleTitle", { n: daysRemaining })}
                      </p>
                      <p className="text-white/55 text-xs mt-0.5">
                        {t("mentorshipNotEligibleDesc")}
                      </p>
                    </div>
                  </div>
                )}
              </motion.section>

              {/* ============================================================ */}
              {/* SECTION 5: Current mentees (only if mentor plan)             */}
              {/* ============================================================ */}
              {isMentor && (
                <motion.section
                  variants={itemVariants}
                  className="glass-card p-5 relative overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none bg-[#4ADE80]/15" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-sm font-bold text-white font-[family-name:var(--font-poppins)] flex items-center gap-2">
                        <Users size={16} className="text-[#4ADE80]" />
                        {t("mentorshipMenteesTitle")}
                      </h2>
                      <div className="flex gap-1.5">
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-[#4ADE80]/20 text-[#4ADE80]">
                          {t("mentorshipMenteesActive", { n: activeMentees.length })}
                        </span>
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-[#2DD4BF]/20 text-[#2DD4BF]">
                          {t("mentorshipMenteesSessions")}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 custom-scroll">
                      {SIMULATED_MENTEES.map((m, idx) => (
                        <motion.div
                          key={m.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.06 }}
                          className="glass-pill rounded-xl p-3 flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#FF3B30] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {m.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-white text-sm font-medium truncate">
                                {m.name}
                              </p>
                              <span
                                className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                                  m.statusKey === "mentorshipStatusActive"
                                    ? "bg-[#4ADE80]/20 text-[#4ADE80]"
                                    : "bg-[#FBBF24]/20 text-[#FBBF24]"
                                }`}
                              >
                                {t(m.statusKey)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-white/50 text-[11px] mt-0.5">
                              <span className="flex items-center gap-1">
                                <Flame size={10} /> {m.daysClean}j
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={10} /> {t(m.lastContactKey)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              sound.playClick();
                              haptics.light();
                              navigate("community");
                            }}
                            className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center active:scale-95 transition-transform"
                            aria-label={t("mentorshipAriaMessages", { name: m.name })}
                          >
                            <MessageSquare size={15} className="text-white/70" />
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        sound.playClick();
                        haptics.light();
                        navigate("community");
                      }}
                      className="w-full mt-3 h-10 rounded-xl glass-pill text-white text-xs font-medium flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare size={14} />
                      {t("mentorshipMenteesMessages")}
                    </motion.button>
                  </div>
                </motion.section>
              )}

              {/* ============================================================ */}
              {/* SECTION 3: Mentor application form                           */}
              {/* ============================================================ */}
              {isEligible && (
                <motion.section
                  id="mentor-application-form"
                  variants={itemVariants}
                  className="glass-card p-5 relative overflow-hidden scroll-mt-20"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none bg-[#4ADE80]/15" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Award size={18} className="text-[#4ADE80]" />
                      <h2 className="text-base font-bold text-white font-[family-name:var(--font-poppins)]">
                        {t("mentorshipFormTitle")}
                      </h2>
                    </div>

                <Field label={t("mentorshipFormDisplayName")}>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t("mentorshipFormDisplayNamePlaceholder")}
                    className="h-11 rounded-xl glass-pill border-white/10 text-white placeholder:text-white/30"
                  />
                </Field>

                <Field
                  label={t("mentorshipFormBioLabel")}
                  hint={t("mentorshipFormBioHint", { n: bio.trim().length })}
                >
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={t("mentorshipFormBioPlaceholder")}
                    className="min-h-[120px] rounded-xl glass-pill border-white/10 text-white placeholder:text-white/30 resize-none"
                  />
                </Field>

                <Field label={t("mentorshipFormSpecialtyLabel")}>
                  <Dropdown
                    value={specialty}
                    onChange={setSpecialty}
                    options={SPECIALTIES}
                    placeholder={t("mentorshipFormSpecialtyPlaceholder")}
                  />
                </Field>

                <Field label={t("mentorshipFormCountryLabel")}>
                  <Dropdown
                    value={country}
                    onChange={setCountry}
                    options={COUNTRIES}
                    placeholder={t("mentorshipFormCountryPlaceholder")}
                  />
                </Field>

                <Field
                  label={t("mentorshipFormLanguagesLabel")}
                  hint={t("mentorshipFormLanguagesHint")}
                >
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => {
                      const sel = languages.includes(lang);
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => toggleLanguage(lang)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
                            sel
                              ? "bg-[#4ADE80] text-[#070B0E]"
                              : "glass-pill text-white/70"
                          }`}
                        >
                          {sel && <Check size={11} className="inline mr-1" />}
                          {t(lang)}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <Field label={t("mentorshipFormAvailabilityLabel")}>
                  <Dropdown
                    value={availability}
                    onChange={setAvailability}
                    options={AVAILABILITIES}
                    placeholder={t("mentorshipFormAvailabilityPlaceholder")}
                  />
                </Field>

                <Field
                  label={t("mentorshipFormMotivationLabel")}
                  hint={t("mentorshipFormMotivationHint", { n: motivation.trim().length })}
                >
                  <Textarea
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder={t("mentorshipFormMotivationPlaceholder")}
                    className="min-h-[90px] rounded-xl glass-pill border-white/10 text-white placeholder:text-white/30 resize-none"
                  />
                </Field>

                <label className="flex items-start gap-2.5 cursor-pointer mb-4 p-3 rounded-xl glass-pill">
                  <Checkbox
                    checked={agreed}
                    onCheckedChange={(v) => {
                      setAgreed(v === true);
                      sound.playClick();
                      haptics.light();
                    }}
                    className="border-white/30 data-[state=checked]:bg-[#4ADE80] data-[state=checked]:border-[#4ADE80] data-[state=checked]:text-[#070B0E] mt-0.5"
                  />
                  <span className="text-white/80 text-xs leading-relaxed">
                    {t("mentorshipAgreePrefix")}{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setCodeOpen(true);
                      }}
                      className="text-[#4ADE80] underline"
                    >
                      {t("mentorshipCodeLink")}
                    </button>
                  </span>
                </label>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSubmitMentor}
                      disabled={!canSubmitMentor}
                      className={`w-full h-12 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                        canSubmitMentor
                          ? "gradient-success text-[#070B0E]"
                          : "bg-white/10 text-white/40 cursor-not-allowed"
                      }`}
                    >
                      <Send size={16} />
                      {t("mentorshipSubmit")}
                    </motion.button>
                  </div>
                </motion.section>
              )}

              {/* ============================================================ */}
              {/* SECTION 4: Code of Conduct (collapsible)                     */}
              {/* ============================================================ */}
              <motion.section variants={itemVariants} className="glass-card overflow-hidden">
                <button
                  onClick={() => {
                    setCodeOpen((o) => !o);
                    sound.playClick();
                    haptics.light();
                  }}
                  className="w-full p-4 flex items-center justify-between active:scale-[0.99] transition-transform"
                  aria-expanded={codeOpen}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={18} className="text-[#4ADE80]" />
                    <span className="text-white text-sm font-bold font-[family-name:var(--font-poppins)]">
                      {t("mentorshipCodeHeader")}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-white/50 transition-transform ${
                      codeOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {codeOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-2">
                        {CODE_OF_CONDUCT.map((rule, i) => (
                          <motion.div
                            key={rule}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-full bg-[#4ADE80]/20 text-[#4ADE80] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-white/80 text-sm leading-relaxed">
                              {t(rule)}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>

              {/* ============================================================ */}
              {/* SECTION 6: Mentor Resources                                  */}
              {/* ============================================================ */}
              <motion.section variants={itemVariants} className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench size={16} className="text-[#F59E0B]" />
                  <h2 className="text-sm font-bold text-white font-[family-name:var(--font-poppins)]">
                    {t("mentorshipResourcesTitle")}
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {RESOURCES.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div
                        key={r.titleKey}
                        className="glass-pill rounded-xl p-3 flex items-center gap-3"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${r.color}22` }}
                        >
                          <Icon size={18} style={{ color: r.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-white text-sm font-medium truncate">
                              {t(r.titleKey)}
                            </p>
                            <span
                              className="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase"
                              style={{ background: `${r.color}25`, color: r.color }}
                            >
                              {t(r.typeKey)}
                            </span>
                          </div>
                          <p className="text-white/50 text-xs mt-0.5 line-clamp-2">
                            {t(r.descKey)}
                          </p>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            sound.playClick();
                            haptics.light();
                            toast.success(t("mentorshipResSoon", { title: t(r.titleKey) }));
                          }}
                          className="px-3 py-2 rounded-xl text-[11px] font-bold flex-shrink-0"
                          style={{ background: `${r.color}22`, color: r.color }}
                        >
                          {t("mentorshipResAccess")}
                        </motion.button>
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ---------- Success modal ---------- */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
            onClick={closeSuccess}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong p-7 w-full max-w-sm text-center relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl bg-[#4ADE80]/30 pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-3xl bg-[#2DD4BF]/20 pointer-events-none" />

              <button
                onClick={closeSuccess}
                className="absolute top-3 right-3 w-8 h-8 rounded-full glass-pill flex items-center justify-center"
                aria-label={t("close")}
              >
                <X size={14} className="text-white/70" />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="relative w-16 h-16 mx-auto mb-4 rounded-full bg-[#4ADE80]/20 flex items-center justify-center"
              >
                <Check size={32} className="text-[#4ADE80]" />
              </motion.div>

              <h3 className="relative text-lg font-extrabold text-white font-[family-name:var(--font-poppins)] mb-2">
                {successTitle}
              </h3>
              <p className="relative text-white/65 text-sm leading-relaxed mb-5">
                {successMsg}
              </p>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={closeSuccess}
                className="relative w-full h-11 rounded-2xl gradient-success text-[#070B0E] font-bold text-sm"
              >
                {t("mentorshipSuccessContinue")}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
