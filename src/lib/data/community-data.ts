/**
 * Témoignages vérifiés + Mentors + Psychologues
 *
 * NOTE (Task 18-b): testimonials now use translation keys (titleKey/bodyKey)
 * instead of hardcoded French. Bodies that mention money use an `{amount}`
 * placeholder which the CommunityScreen fills with `formatCurrency(amountFCFA, currency)`
 * so the testimonial adapts to the user's selected currency.
 * `authorCountry` is now an ISO 3166-1 alpha-2 country code (ci, sn, ml, etc.)
 * rendered through the `country{XX}` dictionary key so the country name
 * follows the user's UI language.
 */

export interface Reply {
  id: string;
  authorName: string;
  isMentor?: boolean;
  isPsychologist?: boolean;
  content: string;
  likes: number;
  createdAt: string;
}

export interface SeedTestimonial {
  id: string;
  authorName: string;
  authorAge: number;
  authorCountry: string; // ISO 3166-1 alpha-2 country code (ci, sn, ml, cm, gn, fr)
  streakDays: number;
  titleKey: string; // translation key for title
  bodyKey: string; // translation key for body (may contain {amount} placeholder)
  /** When set, bodyKey should contain `{amount}` and the CommunityScreen
   *  will substitute `formatCurrency(amountFCFA, currency)`. */
  amountFCFA?: number;
  isVerified: boolean;
  likes: number;
  replies: Reply[];
  createdAt: string;
}

// `createdAt` is computed once at module load so the relative-time labels
// ("à l'instant", "il y a 1 j", …) stay stable across re-renders.
const now = Date.now();
const day = 86_400_000;

export const SEED_TESTIMONIALS: SeedTestimonial[] = [
  {
    id: "seed-t-0",
    authorName: "Koffi A.",
    authorAge: 26,
    authorCountry: "ci",
    streakDays: 234,
    titleKey: "testimonialKoffiTitle",
    bodyKey: "testimonialKoffiBody",
    amountFCFA: 4_000_000,
    isVerified: true,
    likes: 142,
    replies: [],
    createdAt: new Date(now - 0 * day).toISOString(),
  },
  {
    id: "seed-t-1",
    authorName: "Moussa D.",
    authorAge: 28,
    authorCountry: "sn",
    streakDays: 187,
    titleKey: "testimonialMoussaTitle",
    bodyKey: "testimonialMoussaBody",
    isVerified: true,
    likes: 98,
    replies: [],
    createdAt: new Date(now - 1 * day).toISOString(),
  },
  {
    id: "seed-t-2",
    authorName: "Omar T.",
    authorAge: 24,
    authorCountry: "ml",
    streakDays: 92,
    titleKey: "testimonialOmarTitle",
    bodyKey: "testimonialOmarBody",
    isVerified: true,
    likes: 76,
    replies: [],
    createdAt: new Date(now - 2 * day).toISOString(),
  },
  {
    id: "seed-t-3",
    authorName: "Ibrahim S.",
    authorAge: 31,
    authorCountry: "cm",
    streakDays: 365,
    titleKey: "testimonialIbrahimTitle",
    bodyKey: "testimonialIbrahimBody",
    amountFCFA: 1_200_000,
    isVerified: true,
    likes: 211,
    replies: [],
    createdAt: new Date(now - 3 * day).toISOString(),
  },
  {
    id: "seed-t-4",
    authorName: "Boubacar K.",
    authorAge: 22,
    authorCountry: "gn",
    streakDays: 45,
    titleKey: "testimonialBoubacarTitle",
    bodyKey: "testimonialBoubacarBody",
    isVerified: true,
    likes: 54,
    replies: [],
    createdAt: new Date(now - 4 * day).toISOString(),
  },
  {
    id: "seed-t-5",
    authorName: "Awa N.",
    authorAge: 29,
    authorCountry: "fr",
    streakDays: 156,
    titleKey: "testimonialAwaTitle",
    bodyKey: "testimonialAwaBody",
    // Original: "8 000 €" → convert to FCFA (1 EUR ≈ 655.957 FCFA)
    amountFCFA: 8_000 * 655,
    isVerified: true,
    likes: 87,
    replies: [],
    createdAt: new Date(now - 5 * day).toISOString(),
  },
];

export interface SeedMentor {
  displayName: string;
  bio: string;
  country: string;
  specialty: string;
  daysClean: number;
  verified: boolean;
  rating: number;
  sessionsCount: number;
}

export const SEED_MENTORS: SeedMentor[] = [
  {
    displayName: "Karim L.",
    bio: "Ancien parieur pendant 6 ans. Clean depuis 2 ans. Je connais chaque recoin de l'addiction. Je peux t'aider.",
    country: "Côte d'Ivoire",
    specialty: "Jeunes 18-25",
    daysClean: 730,
    verified: true,
    rating: 4.9,
    sessionsCount: 127,
  },
  {
    displayName: "Yacouba M.",
    bio: "Père de famille, j'ai failli tout perdre. Aujourd'hui je guide les pères qui veulent se reprendre en main.",
    country: "Mali",
    specialty: "Pères de famille",
    daysClean: 540,
    verified: true,
    rating: 5.0,
    sessionsCount: 89,
  },
  {
    displayName: "Cheikh D.",
    bio: "Étudiant en finance, j'ai compris les maths des paris. Je t'explique pourquoi tu perds TOUJOURS.",
    country: "Sénégal",
    specialty: "Étudiants",
    daysClean: 410,
    verified: true,
    rating: 4.8,
    sessionsCount: 156,
  },
  {
    displayName: "Patrick O.",
    bio: "Sportif, je pensais connaître le foot. Les paris m'ont ruiné. Maintenant je parle aux autres sportifs.",
    country: "Cameroun",
    specialty: "Sportifs",
    daysClean: 380,
    verified: true,
    rating: 4.9,
    sessionsCount: 73,
  },
];

export interface SeedPsychologist {
  displayName: string;
  fullName: string;
  license: string;
  specialty: string;
  country: string;
  sessionPrice: number;
  verified: boolean;
  rating: number;
  sessionsCount: number;
  bio: string;
}

export const SEED_PSYCHOLOGISTS: SeedPsychologist[] = [
  {
    displayName: "Dr. Aminata K.",
    fullName: "Dr. Aminata Konaté",
    license: "PSY-CI-2018-0421",
    specialty: "Addictologie comportementale",
    country: "Côte d'Ivoire",
    sessionPrice: 15000,
    verified: true,
    rating: 4.9,
    sessionsCount: 234,
    bio: "Docteure en psychologie clinique, spécialisée dans les addictions comportementales depuis 8 ans. J'accompagne les patients avec bienveillance et méthode scientifique.",
  },
  {
    displayName: "Dr. Mamadou B.",
    fullName: "Dr. Mamadou Bah",
    license: "PSY-SN-2015-0188",
    specialty: "Thérapie cognitivo-comportementale",
    country: "Sénégal",
    sessionPrice: 12000,
    verified: true,
    rating: 5.0,
    sessionsCount: 312,
    bio: "Psychologue clinicien, formé aux TCC. 10 ans d'expérience avec les addictions. Approche directe et structurée.",
  },
  {
    displayName: "Dr. Fatou D.",
    fullName: "Dr. Fatou Diallo",
    license: "PSY-ML-2020-0094",
    specialty: "Soutien familial et conjugal",
    country: "Mali",
    sessionPrice: 10000,
    verified: true,
    rating: 4.8,
    sessionsCount: 187,
    bio: "Spécialiste des dynamiques familiales liées à l'addiction. J'aide les patients ET leurs proches à se reconstruire.",
  },
];

export interface DailyQuote {
  /** i18n key for the quote text (e.g., "quote1Text"). */
  textKey: string;
  /** i18n key for the quote author (e.g., "quote1Author"). */
  authorKey: string;
}

/**
 * Daily quotes are now driven entirely by i18n keys. The actual translations
 * live in `src/lib/i18n/dictionary.ts` (quote1Text/quote1Author … quote12*).
 * This array keeps the historical 12-entry rotation so the day-of-year →
 * quote-index mapping is unchanged from before Task 18-a.
 */
const DAILY_QUOTE_KEYS: DailyQuote[] = [
  { textKey: "quote1Text", authorKey: "quote1Author" },
  { textKey: "quote2Text", authorKey: "quote2Author" },
  { textKey: "quote3Text", authorKey: "quote3Author" },
  { textKey: "quote4Text", authorKey: "quote4Author" },
  { textKey: "quote5Text", authorKey: "quote5Author" },
  { textKey: "quote6Text", authorKey: "quote6Author" },
  { textKey: "quote7Text", authorKey: "quote7Author" },
  { textKey: "quote8Text", authorKey: "quote8Author" },
  { textKey: "quote9Text", authorKey: "quote9Author" },
  { textKey: "quote10Text", authorKey: "quote10Author" },
  { textKey: "quote11Text", authorKey: "quote11Author" },
  { textKey: "quote12Text", authorKey: "quote12Author" },
];

export function getDailyQuote(): DailyQuote {
  const day = Math.floor(Date.now() / 86400000);
  return DAILY_QUOTE_KEYS[day % DAILY_QUOTE_KEYS.length];
}
