"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n/useT";
import {
  Search as SearchIcon,
  X,
  Clock,
  Flame,
  Globe,
  BadgeCheck,
  ShieldCheck,
  MessageSquare,
  BookOpen,
  Users,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useStore, type Testimonial, type ForumPost } from "@/store/zerobet-store";
import {
  SEED_MENTORS,
  SEED_TESTIMONIALS,
} from "@/lib/data/community-data";
import {
  SEARCH_ARTICLES,
  SEARCH_ARTICLE_CATEGORIES,
  type SearchArticle,
} from "@/lib/data/search-data";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type CategoryKey = "all" | "mentors" | "articles" | "forum" | "testimonials";

interface Tab {
  key: CategoryKey;
  label: string;
  icon: typeof Users;
}

const TABS: Tab[] = [
  { key: "all", label: "Tout", icon: Sparkles },
  { key: "mentors", label: "Mentors", icon: ShieldCheck },
  { key: "articles", label: "Articles", icon: BookOpen },
  { key: "forum", label: "Forum", icon: Users },
  { key: "testimonials", label: "Témoignages", icon: MessageSquare },
];

const RECENT_KEY = "zerobet-recent-searches";
const MAX_RECENT = 5;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "?";
  const first = parts[0][0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}

function avatarGradient(name: string): string {
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const grads = [
    "linear-gradient(135deg, #FF3B30, #F59E0B)",
    "linear-gradient(135deg, #FFC94D, #FFB020)",
    "linear-gradient(135deg, #FFD166, #FF3B30)",
    "linear-gradient(135deg, #FFB020, #FFB020)",
    "linear-gradient(135deg, #F59E0B, #FBBF24)",
    "linear-gradient(135deg, #FFC94D, #FBBF24)",
  ];
  return grads[hash % grads.length];
}

function loadRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string").slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

function saveRecentSearch(term: string): string[] {
  if (typeof window === "undefined") return [];
  const cleaned = term.trim();
  if (!cleaned) return loadRecentSearches();
  const current = loadRecentSearches();
  const next = [cleaned, ...current.filter((s) => s.toLowerCase() !== cleaned.toLowerCase())].slice(
    0,
    MAX_RECENT
  );
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}

function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(RECENT_KEY);
  } catch {
    /* ignore */
  }
}

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function matches(haystack: string, query: string): boolean {
  return normalize(haystack).includes(normalize(query));
}

/* ------------------------------------------------------------------ */
/* Result item types                                                   */
/* ------------------------------------------------------------------ */

interface MentorResult {
  type: "mentor";
  id: string;
  name: string;
  specialty: string;
  country: string;
  daysClean: number;
  rating: number;
}

interface ArticleResult {
  type: "article";
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryKey: keyof typeof SEARCH_ARTICLE_CATEGORIES;
  readingTime: number;
  author: string;
}

interface ForumResult {
  type: "forum";
  id: string;
  title: string;
  content: string;
  category: ForumPost["category"];
  authorName: string;
  likes: number;
  replyCount: number;
}

interface TestimonialResult {
  type: "testimonial";
  id: string;
  title: string;
  content: string;
  authorName: string;
  streakDays: number;
  isVerified: boolean;
}

type AnyResult = MentorResult | ArticleResult | ForumResult | TestimonialResult;

interface SearchResults {
  mentors: MentorResult[];
  articles: ArticleResult[];
  forum: ForumResult[];
  testimonials: TestimonialResult[];
}

const EMPTY_RESULTS: SearchResults = {
  mentors: [],
  articles: [],
  forum: [],
  testimonials: [],
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { forumPosts, testimonials, navigate, plan } = useStore();
  const translate = useT();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeTab, setActiveTab] = useState<CategoryKey>("all");
  const [recent, setRecent] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /* ----- autofocus when opening ----- */
  useEffect(() => {
    if (isOpen) {
      setRecent(loadRecentSearches());
      // small delay so the input is mounted before focus
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
    // reset state when closing
    setQuery("");
    setDebouncedQuery("");
    setActiveTab("all");
    setIsSearching(false);
  }, [isOpen]);

  /* ----- close on Escape ----- */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /* ----- debounce 300ms ----- */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setDebouncedQuery("");
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setIsSearching(false);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  /* ----- build searchable indexes ----- */
  const forumIndex = useMemo<ForumResult[]>(() => {
    const seedForum: ForumPost[] = [
      {
        id: "search-seed-f-0",
        authorName: "Moussa D.",
        authorStreak: 187,
        category: "success",
        title: "Une semaine de plus, je n'y croyais plus",
        content:
          "Jour 7 sans pari. Je pensais que c'était impossible. Le bouton panique m'a sauvé deux fois cette semaine.",
        likes: 24,
        replies: [],
        liked: false,
        createdAt: new Date(Date.now() - 7200_000).toISOString(),
      },
      {
        id: "search-seed-f-1",
        authorName: "Cheikh D.",
        authorStreak: 410,
        category: "motivation",
        title: "Les maths des paris : pourquoi tu perds TOUJOURS",
        content:
          "1xBet prend 7% de marge sur chaque pari. Sur 100 paris à 10 000 FCFA, tu perds en moyenne 70 000 FCFA.",
        likes: 58,
        replies: [],
        liked: false,
        createdAt: new Date(Date.now() - 86400_000).toISOString(),
      },
    ];
    return [...forumPosts, ...seedForum].map((p) => ({
      type: "forum" as const,
      id: p.id,
      title: p.title,
      content: p.content,
      category: p.category,
      authorName: p.authorName,
      likes: p.likes,
      replyCount: p.replies.length,
    }));
  }, [forumPosts]);

  const testimonialIndex = useMemo<TestimonialResult[]>(() => {
    const seedAsTestimonials: Testimonial[] = SEED_TESTIMONIALS.map((t, i) => ({
      id: `seed-t-search-${i}`,
      authorName: t.authorName,
      authorAge: t.authorAge,
      authorCountry: t.authorCountry,
      streakDays: t.streakDays,
      title: (t as { titleKey?: string; title?: string }).titleKey ? translate((t as { titleKey: string }).titleKey) : (t as { title?: string }).title || "",
      content: (t as { bodyKey?: string; content?: string }).bodyKey ? translate((t as { bodyKey: string }).bodyKey) : (t as { content?: string }).content || "",
      isVerified: t.isVerified,
      isAnonymous: false,
      isMine: false,
      likes: 20 + i * 10,
      liked: false,
      replies: [],
      createdAt: new Date(Date.now() - i * 86400_000).toISOString(),
    }));
    return [...testimonials, ...seedAsTestimonials].map((t) => ({
      type: "testimonial" as const,
      id: t.id,
      title: t.title || "",
      content: t.content || "",
      authorName: t.isAnonymous ? "Anonyme" : t.authorName,
      streakDays: t.streakDays,
      isVerified: t.isVerified,
    }));
  }, [testimonials]);

  const mentorIndex = useMemo<MentorResult[]>(
    () =>
      SEED_MENTORS.map((m) => ({
        type: "mentor" as const,
        id: `mentor-${m.displayName}`,
        name: m.displayName,
        specialty: m.specialty,
        country: m.country,
        daysClean: m.daysClean,
        rating: m.rating,
      })),
    []
  );

  const articleIndex = useMemo<ArticleResult[]>(
    () =>
      SEARCH_ARTICLES.map((a: SearchArticle) => ({
        type: "article" as const,
        id: a.id,
        title: a.title,
        excerpt: a.excerpt,
        category: SEARCH_ARTICLE_CATEGORIES[a.category].label,
        categoryKey: a.category,
        readingTime: a.readingTime,
        author: a.author,
      })),
    []
  );

  /* ----- perform search ----- */
  const results = useMemo<SearchResults>(() => {
    const q = debouncedQuery.trim();
    if (!q) return EMPTY_RESULTS;

    const mentors = mentorIndex.filter(
      (m) =>
        matches(m.name, q) ||
        matches(m.specialty, q) ||
        matches(m.country, q)
    );

    const articles = articleIndex.filter(
      (a) =>
        matches(a.title, q) ||
        matches(a.excerpt, q) ||
        matches(a.category, q) ||
        matches(a.author, q)
    );

    const forum = forumIndex.filter(
      (f) =>
        matches(f.title, q) ||
        matches(f.content, q) ||
        matches(f.authorName, q)
    );

    const testimonials = testimonialIndex.filter(
      (t) =>
        matches(t.title, q) ||
        matches(t.content, q) ||
        matches(t.authorName, q)
    );

    return { mentors, articles, forum, testimonials };
  }, [debouncedQuery, mentorIndex, articleIndex, forumIndex, testimonialIndex]);

  const totalCount =
    results.mentors.length +
    results.articles.length +
    results.forum.length +
    results.testimonials.length;

  /* ----- navigation handlers ----- */
  const openMentor = useCallback(() => {
    // Community -> Mentors tab is the second sub-tab. The screen defaults to testimonials,
    // so we just navigate to community; mentor tab is reachable by user.
    const isPremium = plan !== "free";
    navigate(isPremium ? "community" : "paywall");
    onClose();
  }, [navigate, onClose, plan]);

  const openArticle = useCallback(() => {
    navigate("resources");
    onClose();
  }, [navigate, onClose]);

  const openForum = useCallback(() => {
    const isPremium = plan !== "free";
    navigate(isPremium ? "community" : "paywall");
    onClose();
  }, [navigate, onClose, plan]);

  const openTestimonial = useCallback(() => {
    navigate("community");
    onClose();
  }, [navigate, onClose]);

  const handleResultClick = (r: AnyResult) => {
    // Save the current query as a recent search
    if (debouncedQuery.trim()) {
      setRecent(saveRecentSearch(debouncedQuery));
    }
    switch (r.type) {
      case "mentor":
        openMentor();
        break;
      case "article":
        openArticle();
        break;
      case "forum":
        openForum();
        break;
      case "testimonial":
        openTestimonial();
        break;
    }
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecent([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // immediate search (skip debounce) — set debounced right away
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setDebouncedQuery(query.trim());
    setRecent(saveRecentSearch(query.trim()));
  };

  /* ----- visibility by tab ----- */
  const showMentors = activeTab === "all" || activeTab === "mentors";
  const showArticles = activeTab === "all" || activeTab === "articles";
  const showForum = activeTab === "all" || activeTab === "forum";
  const showTestimonials = activeTab === "all" || activeTab === "testimonials";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-[#0B0704]/80 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card-strong w-full max-w-[430px] min-h-screen flex flex-col"
          >
            {/* Search bar */}
            <div className="px-4 pt-12 pb-3 sticky top-0 z-10 bg-[#0B0704]/60 backdrop-blur-xl border-b border-white/5">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 h-11 rounded-2xl bg-white/5 border border-white/10 focus-within:border-[#FF3B30]/60 transition-colors">
                  <SearchIcon size={18} className="text-white/40 shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Recherche mentors, articles, forum..."
                    className="flex-1 bg-transparent text-white text-sm placeholder-white/30 focus:outline-none"
                    aria-label="Recherche globale"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      aria-label="Effacer"
                      className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <X size={12} className="text-white/60" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-white/60 text-sm font-medium px-2 active:scale-95 transition-transform"
                >
                  Fermer
                </button>
              </form>

              {/* Category tabs */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar mt-3 -mx-4 px-4">
                {TABS.map((tab) => {
                  const active = activeTab === tab.key;
                  const Icon = tab.icon;
                  const count =
                    tab.key === "all"
                      ? totalCount
                      : tab.key === "mentors"
                        ? results.mentors.length
                        : tab.key === "articles"
                          ? results.articles.length
                          : tab.key === "forum"
                            ? results.forum.length
                            : results.testimonials.length;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                        active
                          ? "gradient-primary text-white glow-green"
                          : "glass-card text-white/60"
                      }`}
                    >
                      <Icon size={13} />
                      {tab.label}
                      {debouncedQuery && count > 0 && (
                        <span
                          className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                            active ? "bg-white/20" : "bg-white/10"
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scroll px-4 pt-3 pb-12">
              {/* Empty query — show recent searches */}
              {!debouncedQuery && (
                <RecentSearches
                  recent={recent}
                  onPick={handleRecentClick}
                  onClear={handleClearRecent}
                />
              )}

              {/* Searching spinner */}
              {debouncedQuery && isSearching && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#FF3B30] mb-3"
                  />
                  <p className="text-white/50 text-xs">Recherche en cours...</p>
                </div>
              )}

              {/* No results */}
              {debouncedQuery && !isSearching && totalCount === 0 && (
                <EmptyState query={debouncedQuery} />
              )}

              {/* Results */}
              {debouncedQuery && !isSearching && totalCount > 0 && (
                <div className="space-y-4">
                  {showMentors && results.mentors.length > 0 && (
                    <ResultSection
                      title="Mentors"
                      icon={ShieldCheck}
                      accent="#FFC94D"
                      count={results.mentors.length}
                    >
                      {results.mentors.map((m) => (
                        <MentorCard key={m.id} mentor={m} onClick={() => handleResultClick(m)} />
                      ))}
                    </ResultSection>
                  )}

                  {showArticles && results.articles.length > 0 && (
                    <ResultSection
                      title="Articles"
                      icon={BookOpen}
                      accent="#FFD166"
                      count={results.articles.length}
                    >
                      {results.articles.map((a) => (
                        <ArticleCard key={a.id} article={a} onClick={() => handleResultClick(a)} />
                      ))}
                    </ResultSection>
                  )}

                  {showForum && results.forum.length > 0 && (
                    <ResultSection
                      title="Forum"
                      icon={Users}
                      accent="#F59E0B"
                      count={results.forum.length}
                    >
                      {results.forum.map((f) => (
                        <ForumCard key={f.id} post={f} onClick={() => handleResultClick(f)} />
                      ))}
                    </ResultSection>
                  )}

                  {showTestimonials && results.testimonials.length > 0 && (
                    <ResultSection
                      title="Témoignages"
                      icon={MessageSquare}
                      accent="#FF3B30"
                      count={results.testimonials.length}
                    >
                      {results.testimonials.map((t) => (
                        <TestimonialCard
                          key={t.id}
                          testimonial={t}
                          onClick={() => handleResultClick(t)}
                        />
                      ))}
                    </ResultSection>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function RecentSearches({
  recent,
  onPick,
  onClear,
}: {
  recent: string[];
  onPick: (term: string) => void;
  onClear: () => void;
}) {
  const suggestions = ["Respiration 4-7-8", "Dopamine", "Mentors Sénégal", "Dettes"];

  return (
    <div className="pt-4 space-y-6">
      {recent.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-white/60 text-xs font-semibold uppercase tracking-wider">
              <Clock size={12} />
              Recherches récentes
            </div>
            <button
              onClick={onClear}
              className="text-white/40 text-[11px] hover:text-white/70 transition-colors"
            >
              Effacer
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recent.map((r, i) => (
              <button
                key={`${r}-${i}`}
                onClick={() => onPick(r)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-white/80 text-xs hover:text-white active:scale-95 transition-all"
              >
                <Clock size={11} className="text-white/40" />
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-1.5 text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles size={12} />
          Suggestions
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onPick(s)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs hover:text-white hover:border-white/20 active:scale-95 transition-all"
            >
              <TrendingUp size={11} className="text-[#F59E0B]" />
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card p-4 text-center">
        <div className="text-3xl mb-2">🔍</div>
        <p className="text-white font-semibold text-sm font-[family-name:var(--font-poppins)] mb-1">
          Recherche Zerobet
        </p>
        <p className="text-white/50 text-xs leading-relaxed">
          Trouve des mentors, des articles, des discussions et des témoignages en une seule recherche.
        </p>
      </div>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <SearchIcon size={28} className="text-white/30" />
      </div>
      <h3 className="text-white font-semibold text-base mb-1 font-[family-name:var(--font-poppins)]">
        Aucun résultat
      </h3>
      <p className="text-white/50 text-sm mb-4 max-w-[260px]">
        Aucun contenu ne correspond à «&nbsp;<span className="text-white/80">{query}</span>&nbsp;».
      </p>
      <p className="text-white/40 text-xs max-w-[260px] mb-4">
        Essaie avec un mot-clé plus simple comme « respiration », « mentor » ou « dettes ».
      </p>
    </motion.div>
  );
}

function ResultSection({
  title,
  icon: Icon,
  accent,
  count,
  children,
}: {
  title: string;
  icon: typeof Users;
  accent: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-2 px-1">
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: `${accent}20` }}
        >
          <Icon size={13} style={{ color: accent }} />
        </div>
        <h3 className="text-white font-semibold text-xs uppercase tracking-wider">
          {title}
        </h3>
        <span
          className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
          style={{ background: `${accent}20`, color: accent }}
        >
          {count}
        </span>
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function MentorCard({ mentor, onClick }: { mentor: MentorResult; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full glass-card p-3 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0"
        style={{ background: avatarGradient(mentor.name) }}
      >
        {getInitials(mentor.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-white text-sm font-semibold truncate">{mentor.name}</span>
          <BadgeCheck size={12} className="text-[#FFB020] shrink-0" />
        </div>
        <p className="text-[#F59E0B] text-xs truncate">{mentor.specialty}</p>
        <div className="flex items-center gap-2 text-white/40 text-[10px] mt-0.5">
          <span className="flex items-center gap-0.5">
            <Globe size={9} />
            {mentor.country}
          </span>
          <span className="flex items-center gap-0.5 text-[#F59E0B]">
            <Flame size={9} />
            {mentor.daysClean}j clean
          </span>
        </div>
      </div>
      <ChevronRight size={14} className="text-white/30 shrink-0" />
    </button>
  );
}

function ArticleCard({ article, onClick }: { article: ArticleResult; onClick: () => void }) {
  const cat = SEARCH_ARTICLE_CATEGORIES[article.categoryKey];
  return (
    <button
      onClick={onClick}
      className="w-full glass-card p-3 text-left active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
          style={{ background: `${cat.color}25`, color: cat.color }}
        >
          {cat.emoji} {cat.label}
        </span>
        <span className="text-white/40 text-[10px] flex items-center gap-0.5">
          <Clock size={9} />
          {article.readingTime} min
        </span>
      </div>
      <h4 className="text-white text-sm font-semibold mb-1 line-clamp-1">
        {article.title}
      </h4>
      <p className="text-white/50 text-xs line-clamp-2 leading-relaxed">{article.excerpt}</p>
      <p className="text-white/30 text-[10px] mt-1.5">{article.author}</p>
    </button>
  );
}

function ForumCard({ post, onClick }: { post: ForumResult; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full glass-card p-3 text-left active:scale-[0.98] transition-transform"
    >
      <h4 className="text-white text-sm font-semibold mb-1 line-clamp-1">{post.title}</h4>
      <p className="text-white/50 text-xs line-clamp-2 leading-relaxed mb-2">{post.content}</p>
      <div className="flex items-center gap-3 text-white/40 text-[10px]">
        <span className="text-white/70">par {post.authorName}</span>
        <span className="flex items-center gap-0.5">
          <MessageSquare size={9} />
          {post.replyCount}
        </span>
        <span className="flex items-center gap-0.5">
          <TrendingUp size={9} />
          {post.likes}
        </span>
      </div>
    </button>
  );
}

function TestimonialCard({
  testimonial,
  onClick,
}: {
  testimonial: TestimonialResult;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full glass-card p-3 text-left active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center gap-1.5 mb-1">
        {testimonial.isVerified && (
          <span className="flex items-center gap-0.5 text-[#FFB020] text-[10px] font-bold">
            <BadgeCheck size={11} />
            Vérifié
          </span>
        )}
        <span className="flex items-center gap-0.5 text-[#F59E0B] text-[10px] font-bold">
          <Flame size={10} />
          {testimonial.streakDays} jours
        </span>
      </div>
      <h4 className="text-white text-sm font-semibold mb-1 line-clamp-1">{testimonial.title}</h4>
      <p className="text-white/50 text-xs line-clamp-2 leading-relaxed">{testimonial.content}</p>
      <p className="text-white/30 text-[10px] mt-1.5">— {testimonial.authorName}</p>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Search trigger button (used in DashboardScreen header)              */
/* ------------------------------------------------------------------ */

export function SearchTriggerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full glass-card flex items-center justify-center active:scale-95 transition-transform"
      aria-label="Recherche"
    >
      <SearchIcon size={18} className="text-white/70" />
    </button>
  );
}
