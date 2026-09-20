/**
 * Symptoms checker data + Engagement goals + Paywall plans
 *
 * All user-facing copy is exposed via i18n keys resolved against
 * `src/lib/i18n/dictionary.ts` (Task 19-a).
 */

export interface SymptomCategory {
  key: string;
  labelKey: string;
  symptomKeys: string[];
  icon: string;
  color: string;
}

export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  {
    key: "financial",
    labelKey: "symptomCatFinancialLabel",
    icon: "💸",
    color: "#FF3B30",
    symptomKeys: [
      "symptomFinancial1",
      "symptomFinancial2",
      "symptomFinancial3",
      "symptomFinancial4",
      "symptomFinancial5",
      "symptomFinancial6",
    ],
  },
  {
    key: "mental",
    labelKey: "symptomCatMentalLabel",
    icon: "🧠",
    color: "#FFD166",
    symptomKeys: [
      "symptomMental1",
      "symptomMental2",
      "symptomMental3",
      "symptomMental4",
      "symptomMental5",
      "symptomMental6",
    ],
  },
  {
    key: "social",
    labelKey: "symptomCatSocialLabel",
    icon: "👥",
    color: "#FFB020",
    symptomKeys: [
      "symptomSocial1",
      "symptomSocial2",
      "symptomSocial3",
      "symptomSocial4",
      "symptomSocial5",
      "symptomSocial6",
    ],
  },
  {
    key: "physical",
    labelKey: "symptomCatPhysicalLabel",
    icon: "💪",
    color: "#FBBF24",
    symptomKeys: [
      "symptomPhysical1",
      "symptomPhysical2",
      "symptomPhysical3",
      "symptomPhysical4",
      "symptomPhysical5",
      "symptomPhysical6",
    ],
  },
  {
    key: "family",
    labelKey: "symptomCatFamilyLabel",
    icon: "👨‍👩‍👧",
    color: "#FFC94D",
    symptomKeys: [
      "symptomFamily1",
      "symptomFamily2",
      "symptomFamily3",
      "symptomFamily4",
      "symptomFamily5",
      "symptomFamily6",
    ],
  },
];

export interface EngagementGoal {
  key: string;
  labelKey: string;
  descKey: string;
  icon: string;
}

export const ENGAGEMENT_GOALS: EngagementGoal[] = [
  { key: "family", labelKey: "goalFamilyLabel", descKey: "goalFamilyDesc", icon: "👨‍👩‍👧" },
  { key: "money", labelKey: "goalMoneyLabel", descKey: "goalMoneyDesc", icon: "💰" },
  { key: "health", labelKey: "goalHealthLabel", descKey: "goalHealthDesc", icon: "🧠" },
  { key: "dignity", labelKey: "goalDignityLabel", descKey: "goalDignityDesc", icon: "🛡️" },
  { key: "future", labelKey: "goalFutureLabel", descKey: "goalFutureDesc", icon: "🚀" },
  { key: "freedom", labelKey: "goalFreedomLabel", descKey: "goalFreedomDesc", icon: "🕊️" },
];

export interface PlanOption {
  id: "free" | "premium" | "mentor" | "psychologist";
  name: string;
  nameKey: string; // i18n key for the plan name (e.g., "planFree")
  tagline: string;
  taglineKey: string; // i18n key for the tagline (e.g., "planFreeTagline")
  monthlyPrice: number; // FCFA
  annualPrice: number;
  color: string;
  gradient: string;
  icon: string;
  popular?: boolean;
  bestValue?: boolean;
  features: string[];
  featureKeys: string[]; // i18n keys for the features (e.g., "planFreeFeature1")
  lockedFeatures?: string[];
}

export const PLAN_OPTIONS: PlanOption[] = [
  {
    id: "free",
    name: "Gratuit",
    nameKey: "planFree",
    tagline: "Pour commencer ton parcours",
    taglineKey: "planFreeTagline",
    monthlyPrice: 0,
    annualPrice: 0,
    color: "#9CA3AF",
    gradient: "linear-gradient(135deg, #6B7280 0%, #374151 100%)",
    icon: "🌱",
    features: [
      "Quiz complet (15 questions)",
      "Score et niveau d'addiction",
      "Carousel éducatif (8 slides)",
      "Vérificateur de symptômes",
      "3 témoignages par jour",
      "Compteur de série basique",
      "Coffre de récupération (visualisation)",
      "Notifications de rappel",
    ],
    featureKeys: [
      "planFreeFeature1",
      "planFreeFeature2",
      "planFreeFeature3",
      "planFreeFeature4",
      "planFreeFeature5",
      "planFreeFeature6",
      "planFreeFeature7",
      "planFreeFeature8",
    ],
    lockedFeatures: [
      "Bouton Panique complet",
      "Atlas AI Coach",
      "Journal illimité + analyse IA",
      "Bloqueur de paris",
      "Communauté complète",
      "Accès mentors & psychologues",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    nameKey: "planPremium",
    tagline: "Le plus populaire — récupération complète",
    taglineKey: "planPremiumTagline",
    // Quittr-inspired premium pricing: ~$20/month, ~$200/year at 600 FCFA/USD.
    // Higher than Quittr ($19.99/mo, $119.99/yr) because Zerobet is a more
    // comprehensive app (13 artifacts, AI coach, community chat, betting
    // blocker, etc.) targeting the African francophone market.
    monthlyPrice: 12000,
    annualPrice: 120000,
    color: "#FF3B30",
    gradient: "linear-gradient(135deg, #FF3B30 0%, #F59E0B 100%)",
    icon: "⭐",
    popular: true,
    features: [
      "Tout le plan Gratuit",
      "Bouton Panique complet (4-7-8)",
      "Atlas AI Coach illimité",
      "Journal illimité + analyse IA",
      "Bloqueur de paris (50+ sites)",
      "Mode Fort 72h",
      "Statistiques détaillées (30/60/90j)",
      "Communauté complète (forum, témoignages)",
      "Contenu exclusif Premium",
      "Suppression des publicités",
      "Support prioritaire",
    ],
    featureKeys: [
      "planPremiumFeature1",
      "planPremiumFeature2",
      "planPremiumFeature3",
      "planPremiumFeature4",
      "planPremiumFeature5",
      "planPremiumFeature6",
      "planPremiumFeature7",
      "planPremiumFeature8",
      "planPremiumFeature9",
      "planPremiumFeature10",
      "planPremiumFeature11",
    ],
  },
  {
    id: "mentor",
    name: "Mentor",
    nameKey: "planMentor",
    tagline: "Deviens un guide pour les autres",
    taglineKey: "planMentorTagline",
    // Mentor tier: ~$33/month, ~$333/year. Includes everything in Premium
    // plus mentor access (verified badge, mentor directory, coaching tools).
    monthlyPrice: 20000,
    annualPrice: 200000,
    color: "#FFC94D",
    gradient: "linear-gradient(135deg, #FFC94D 0%, #FFB020 100%)",
    icon: "🛡️",
    features: [
      "Tout le plan Premium",
      "Badge Mentor vérifié",
      "Répondre en tant que mentor",
      "Annuaire des mentors",
      "Statistiques de mentorat",
      "Outils de coaching",
      "Conditions : 90 jours sans pari minimum",
    ],
    featureKeys: [
      "planMentorFeature1",
      "planMentorFeature2",
      "planMentorFeature3",
      "planMentorFeature4",
      "planMentorFeature5",
      "planMentorFeature6",
      "planMentorFeature7",
    ],
  },
  {
    id: "psychologist",
    name: "Psychologue",
    nameKey: "planPsychologist",
    tagline: "Pour les professionnels certifiés",
    taglineKey: "planPsychologistTagline",
    // Psychologist tier: ~$67/month, ~$667/year. Includes everything in
    // Premium plus a professional profile, member chat, session management,
    // and customization — designed for certified therapists.
    monthlyPrice: 40000,
    annualPrice: 400000,
    color: "#FFD166",
    gradient: "linear-gradient(135deg, #FFD166 0%, #FFB020 100%)",
    icon: "🎓",
    features: [
      "Tout le plan Premium",
      "Profil professionnel certifié",
      "Chat avec les membres",
      "Badge professionnel certifié",
      "Gestion des sessions",
      "Tarif de session personnalisable",
      "Vérification sous 48h",
    ],
    featureKeys: [
      "planPsychologistFeature1",
      "planPsychologistFeature2",
      "planPsychologistFeature3",
      "planPsychologistFeature4",
      "planPsychologistFeature5",
      "planPsychologistFeature6",
      "planPsychologistFeature7",
    ],
  },
];

export const SAVINGS_GOALS = [
  { label: "Un téléphone", amount: 75000, icon: "📱" },
  { label: "Une moto", amount: 450000, icon: "🏍️" },
  { label: "Un terrain", amount: 1500000, icon: "🏠" },
  { label: "Un business", amount: 500000, icon: "🏪" },
  { label: "Un voyage", amount: 300000, icon: "✈️" },
  { label: "Les études des enfants", amount: 800000, icon: "🎓" },
];
