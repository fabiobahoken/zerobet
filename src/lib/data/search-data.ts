/**
 * Searchable article index used by the global SearchModal.
 * Curated content for the African francophone audience.
 */

export type SearchArticleCategory =
  | "addiction"
  | "techniques"
  | "finance"
  | "testimonials"
  | "meditation"
  | "stories";

export interface SearchArticle {
  id: string;
  category: SearchArticleCategory;
  title: string;
  excerpt: string;
  readingTime: number; // minutes
  author: string;
}

export const SEARCH_ARTICLE_CATEGORIES: Record<
  SearchArticleCategory,
  { label: string; color: string; emoji: string }
> = {
  addiction: { label: "Addiction", color: "#FFD166", emoji: "🧠" },
  techniques: { label: "Techniques", color: "#FFC94D", emoji: "💪" },
  finance: { label: "Finances", color: "#F59E0B", emoji: "💰" },
  testimonials: { label: "Témoignages", color: "#FF3B30", emoji: "👥" },
  meditation: { label: "Méditation", color: "#FFB020", emoji: "🧘" },
  stories: { label: "Histoires", color: "#FBBF24", emoji: "📚" },
};

export const SEARCH_ARTICLES: SearchArticle[] = [
  {
    id: "art-1",
    category: "addiction",
    title: "Pourquoi ton cerveau te trahit quand tu paris",
    excerpt:
      "Comprends le mécanisme de la dopamine et pourquoi chaque pari renforce le cycle addictif — même quand tu perds.",
    readingTime: 7,
    author: "Dr. Aïssata Koné",
  },
  {
    id: "art-2",
    category: "techniques",
    title: "Surmonter une envie soudaine en 90 secondes",
    excerpt:
      "La méthode U.R.G.E. pour désamorcer une envie de parier sans céder. Simple, prouvée, accessible.",
    readingTime: 5,
    author: "Marc Allard, thérapeute",
  },
  {
    id: "art-3",
    category: "testimonials",
    title: "Moussa, 32 ans : « J'ai tout perdu, puis tout reconstruit »",
    excerpt:
      "Récit authentique d'un ancien parieur de Dakar qui a surmonté 8 ans d'addiction et retrouvé sa famille.",
    readingTime: 9,
    author: "Moussa Ndiaye",
  },
  {
    id: "art-4",
    category: "finance",
    title: "Reconstruire ses finances après les paris",
    excerpt:
      "Un plan concret en 4 étapes pour rembourser tes dettes, reprendre le contrôle et économiser à nouveau.",
    readingTime: 8,
    author: "Awa Diallo, conseillère",
  },
  {
    id: "art-5",
    category: "meditation",
    title: "La respiration 4-7-8 : ton arme secrète anti-envie",
    excerpt:
      "Cette technique de respiration calme le système nerveux en moins de 2 minutes. À utiliser à vie.",
    readingTime: 4,
    author: "Dr. Aïssata Koné",
  },
  {
    id: "art-6",
    category: "addiction",
    title: "La dopamine et les paris",
    excerpt:
      "Comment les jeux d'argent détournent le système de récompense naturel de ton cerveau.",
    readingTime: 6,
    author: "Dr. Aïssata Koné",
  },
  {
    id: "art-7",
    category: "techniques",
    title: "Reconnaître les déclencheurs",
    excerpt:
      "Apprends à identifier les situations, émotions et personnes qui déclenchent ton envie de parier.",
    readingTime: 6,
    author: "Marc Allard",
  },
  {
    id: "art-8",
    category: "addiction",
    title: "Pourquoi tu perds toujours",
    excerpt:
      "La vérité mathématique derrière les paris sportifs : pourquoi la maison gagne toujours.",
    readingTime: 8,
    author: "Dr. Aïssata Koné",
  },
  {
    id: "art-9",
    category: "stories",
    title: "Reprendre sa virilité",
    excerpt:
      "L'addiction aux paris touche la confiance en soi et la masculinité. Voici comment se reconstruire.",
    readingTime: 7,
    author: "Marc Allard",
  },
  {
    id: "art-10",
    category: "finance",
    title: "L'économie que tu sauves",
    excerpt:
      "Calcule combien tu économises réellement chaque jour sans pari. Les chiffres vont te surprendre.",
    readingTime: 4,
    author: "Équipe Zerobet",
  },
  {
    id: "art-11",
    category: "meditation",
    title: "Méditation guidée anti-envie",
    excerpt:
      "10 minutes par jour pour réduire durablement tes envies de parier et retrouver le calme intérieur.",
    readingTime: 5,
    author: "Yoga & Mindfulness",
  },
  {
    id: "art-12",
    category: "techniques",
    title: "Le rôle du sommeil dans la récupération",
    excerpt:
      "Le manque de sommeil augmente les envies de parier de 40%. Mieux dormir pour mieux résister.",
    readingTime: 5,
    author: "Dr. Aïssata Koné",
  },
  {
    id: "art-13",
    category: "testimonials",
    title: "Koffi, 26 ans : 234 jours sans pari",
    excerpt:
      "« J'ai perdu 4 millions de FCFA en 3 ans sur 1xBet. Aujourd'hui, ma copine est revenue. »",
    readingTime: 6,
    author: "Koffi A.",
  },
  {
    id: "art-14",
    category: "stories",
    title: "Ibrahim, un an sans pari",
    excerpt:
      "365 jours. 1 200 000 FCFA économisés. Un terrain acheté. Si je l'ai fait, tu peux le faire.",
    readingTime: 7,
    author: "Ibrahim S.",
  },
  {
    id: "art-15",
    category: "finance",
    title: "Rembourser ses dettes sans culpabilité",
    excerpt:
      "Méthode pas à pas pour affronter tes dettes de paris, négocier avec tes créanciers et repartir.",
    readingTime: 6,
    author: "Awa Diallo",
  },
];

/* ------------------------------------------------------------------ */
/* Quick reply suggestions (used in CommunityScreen replies)           */
/* ------------------------------------------------------------------ */

export const QUICK_REPLIES: string[] = [
  "💪 Bravo, continue !",
  "🙏 Merci pour ce témoignage",
  "🔥 Tu es une inspiration",
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Computes a deterministic "online" status from a seed string (~70% online). */
export function isOnlineFromSeed(seed: string): boolean {
  // Simple deterministic hash → 0..99 ; online if < 70
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  }
  return hash % 100 < 70;
}

/** Computes the response-time badge from a mentor's sessionsCount. */
export function getResponseTime(sessionsCount: number): {
  label: string;
  minutes: number;
} {
  if (sessionsCount >= 200) return { label: "Répond en ~5min", minutes: 5 };
  if (sessionsCount >= 100) return { label: "Répond en ~30min", minutes: 30 };
  return { label: "Répond en ~2h", minutes: 120 };
}
