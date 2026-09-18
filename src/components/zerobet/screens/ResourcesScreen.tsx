"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Clock,
  Play,
  Phone,
  BookOpen,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { useStore, getStreakMultiplier } from "@/store/zerobet-store";
import { useT } from "@/lib/i18n/useT";
import { CardSkeleton } from "@/components/zerobet/components/Skeletons";

/* ========================================================================
   Types & Data
   ======================================================================== */

type CategoryKey =
  | "addiction"
  | "techniques"
  | "finance"
  | "testimonials"
  | "meditation"
  | "stories";

interface Category {
  key: CategoryKey;
  labelKey: string;
  emoji: string;
  color: string;
}

interface Article {
  id: string;
  category: CategoryKey;
  titleKey: string;
  excerptKey: string;
  readingTime: number;
  authorKey: string;
}

interface FeaturedArticle {
  id: string;
  category: CategoryKey;
  titleKey: string;
  excerptKey: string;
  readingTime: number;
  authorKey: string;
}

interface VideoResource {
  id: string;
  titleKey: string;
  duration: string;
  categoryKey: string;
  gradient: string;
}

interface Hotline {
  id: string;
  nameKey: string;
  descKey: string;
  phone: string;
  color: string;
}

interface BookApp {
  id: string;
  name: string;
  type: "app" | "book";
  descKey: string;
  emoji: string;
  color: string;
}

const CATEGORIES: Category[] = [
  { key: "addiction", labelKey: "resourcesCategoryAddiction", emoji: "🧠", color: "#BF5AF2" },
  { key: "techniques", labelKey: "resourcesCategoryTechniques", emoji: "💪", color: "#4ADE80" },
  { key: "finance", labelKey: "resourcesCategoryFinance", emoji: "💰", color: "#FF9500" },
  { key: "testimonials", labelKey: "resourcesCategoryTestimonials", emoji: "👥", color: "#FF3B30" },
  { key: "meditation", labelKey: "resourcesCategoryMeditation", emoji: "🧘", color: "#64D2FF" },
  { key: "stories", labelKey: "resourcesCategoryStories", emoji: "📚", color: "#FBBF24" },
];

const FEATURED_ARTICLES: FeaturedArticle[] = [
  {
    id: "f1",
    category: "addiction",
    titleKey: "resourcesFeatured1Title",
    excerptKey: "resourcesFeatured1Excerpt",
    readingTime: 7,
    authorKey: "resourcesAuthorKone",
  },
  {
    id: "f2",
    category: "techniques",
    titleKey: "resourcesFeatured2Title",
    excerptKey: "resourcesFeatured2Excerpt",
    readingTime: 5,
    authorKey: "resourcesAuthorAllard",
  },
  {
    id: "f3",
    category: "testimonials",
    titleKey: "resourcesFeatured3Title",
    excerptKey: "resourcesFeatured3Excerpt",
    readingTime: 9,
    authorKey: "resourcesAuthorNdiaye",
  },
  {
    id: "f4",
    category: "finance",
    titleKey: "resourcesFeatured4Title",
    excerptKey: "resourcesFeatured4Excerpt",
    readingTime: 8,
    authorKey: "resourcesAuthorDiallo",
  },
  {
    id: "f5",
    category: "meditation",
    titleKey: "resourcesFeatured5Title",
    excerptKey: "resourcesFeatured5Excerpt",
    readingTime: 4,
    authorKey: "resourcesAuthorKone",
  },
];

const ARTICLES: Article[] = [
  {
    id: "a1",
    category: "addiction",
    titleKey: "resourcesArticle1Title",
    excerptKey: "resourcesArticle1Excerpt",
    readingTime: 6,
    authorKey: "resourcesAuthorKone",
  },
  {
    id: "a2",
    category: "techniques",
    titleKey: "resourcesArticle2Title",
    excerptKey: "resourcesArticle2Excerpt",
    readingTime: 5,
    authorKey: "resourcesAuthorAllard",
  },
  {
    id: "a3",
    category: "testimonials",
    titleKey: "resourcesArticle3Title",
    excerptKey: "resourcesArticle3Excerpt",
    readingTime: 7,
    authorKey: "resourcesAuthorDiallo",
  },
  {
    id: "a4",
    category: "finance",
    titleKey: "resourcesArticle4Title",
    excerptKey: "resourcesArticle4Excerpt",
    readingTime: 4,
    authorKey: "resourcesAuthorZerobet",
  },
  {
    id: "a5",
    category: "addiction",
    titleKey: "resourcesArticle5Title",
    excerptKey: "resourcesArticle5Excerpt",
    readingTime: 8,
    authorKey: "resourcesAuthorKone",
  },
  {
    id: "a6",
    category: "meditation",
    titleKey: "resourcesArticle6Title",
    excerptKey: "resourcesArticle6Excerpt",
    readingTime: 5,
    authorKey: "resourcesAuthorYoga",
  },
  {
    id: "a7",
    category: "testimonials",
    titleKey: "resourcesArticle7Title",
    excerptKey: "resourcesArticle7Excerpt",
    readingTime: 9,
    authorKey: "resourcesAuthorNdiaye",
  },
  {
    id: "a8",
    category: "techniques",
    titleKey: "resourcesArticle8Title",
    excerptKey: "resourcesArticle8Excerpt",
    readingTime: 6,
    authorKey: "resourcesAuthorAllard",
  },
  {
    id: "a9",
    category: "addiction",
    titleKey: "resourcesArticle9Title",
    excerptKey: "resourcesArticle9Excerpt",
    readingTime: 5,
    authorKey: "resourcesAuthorKone",
  },
  {
    id: "a10",
    category: "stories",
    titleKey: "resourcesArticle10Title",
    excerptKey: "resourcesArticle10Excerpt",
    readingTime: 7,
    authorKey: "resourcesAuthorAllard",
  },
];

const VIDEOS: VideoResource[] = [
  {
    id: "v1",
    titleKey: "resourcesVideo1Title",
    duration: "10:00",
    categoryKey: "resourcesVideoCatMeditation",
    gradient: "linear-gradient(135deg, #64D2FF 0%, #5E5CE6 100%)",
  },
  {
    id: "v2",
    titleKey: "resourcesVideo2Title",
    duration: "06:42",
    categoryKey: "resourcesVideoCatTestimony",
    gradient: "linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)",
  },
  {
    id: "v3",
    titleKey: "resourcesVideo3Title",
    duration: "08:15",
    categoryKey: "resourcesVideoCatScience",
    gradient: "linear-gradient(135deg, #BF5AF2 0%, #FF3B30 100%)",
  },
  {
    id: "v4",
    titleKey: "resourcesVideo4Title",
    duration: "12:30",
    categoryKey: "resourcesVideoCatMeditation",
    gradient: "linear-gradient(135deg, #4ADE80 0%, #64D2FF 100%)",
  },
];

const HOTLINES: Hotline[] = [
  {
    id: "h1",
    nameKey: "resourcesHotline1Name",
    descKey: "resourcesHotline1Desc",
    phone: "3939",
    color: "#FF3B30",
  },
  {
    id: "h2",
    nameKey: "resourcesHotline2Name",
    descKey: "resourcesHotline2Desc",
    phone: "+441472544300",
    color: "#64D2FF",
  },
  {
    id: "h3",
    nameKey: "resourcesHotline3Name",
    descKey: "resourcesHotline3Desc",
    phone: "115",
    color: "#FBBF24",
  },
];

const BOOKS_APPS: BookApp[] = [
  {
    id: "b1",
    name: "Quittr",
    type: "app",
    descKey: "resourcesBook1Desc",
    emoji: "📱",
    color: "#4ADE80",
  },
  {
    id: "b2",
    name: "Atomic Habits",
    type: "book",
    descKey: "resourcesBook2Desc",
    emoji: "📖",
    color: "#64D2FF",
  },
  {
    id: "b3",
    name: "The Easy Way",
    type: "book",
    descKey: "resourcesBook3Desc",
    emoji: "📚",
    color: "#FBBF24",
  },
];

/* ========================================================================
   Helpers
   ======================================================================== */

function getDayOfYear(): number {
  const today = new Date();
  return Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
}

function getCategory(key: CategoryKey): Category {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[0];
}

/* ========================================================================
   Component
   ======================================================================== */

export function ResourcesScreen() {
  const t = useT();
  const { navigate, addXP, completeQuest, dailyQuests, streakDays } = useStore();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">("all");
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);
  const [readArticleIds, setReadArticleIds] = useState<Set<string>>(new Set());
  const [articlesLoading, setArticlesLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setArticlesLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const featured = useMemo(() => {
    const idx = getDayOfYear() % FEATURED_ARTICLES.length;
    return FEATURED_ARTICLES[idx];
  }, []);

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") return ARTICLES;
    return ARTICLES.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const handleToggleArticle = (articleId: string) => {
    const isOpen = openArticleId === articleId;
    setOpenArticleId(isOpen ? null : articleId);
    // Award XP the first time this article is opened in this session
    if (!isOpen && !readArticleIds.has(articleId)) {
      setReadArticleIds((prev) => new Set(prev).add(articleId));
      if (!dailyQuests.article) {
        completeQuest("article");
      } else {
        addXP(20, "Article");
      }
      const multiplier = getStreakMultiplier(streakDays);
      const adjusted = Math.round(20 * multiplier);
      toast.success(`+${adjusted} XP`, {
        description: t("resourcesArticleRead"),
        duration: 3000,
      });
    }
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
            {t("resourcesTitle")}
          </h1>
          <p className="text-white/50 text-xs">{t("resourcesSubtitle")}</p>
        </div>
        <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <BookOpen size={18} className="text-[#BF5AF2]" />
        </div>
      </div>

      {/* Section 1: Categories */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-[#FBBF24]" />
          <h2 className="text-white/60 text-xs font-medium uppercase tracking-wider">
            {t("resourcesCategoriesLabel")}
          </h2>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          <CategoryPill
            active={activeCategory === "all"}
            label={t("resourcesCategoryAll")}
            emoji="✨"
            color="#9CA3AF"
            onClick={() => setActiveCategory("all")}
          />
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.key}
              active={activeCategory === cat.key}
              label={t(cat.labelKey)}
              emoji={cat.emoji}
              color={cat.color}
              onClick={() => setActiveCategory(cat.key)}
            />
          ))}
        </div>
      </section>

      {/* Section 2: Featured Article */}
      <section className="mb-6">
        <FeaturedArticleCard article={featured} />
      </section>

      {/* Section 3: Articles List */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-sm">{t("resourcesArticles")}</h2>
          <span className="text-white/40 text-xs">
            {articlesLoading ? "…" : t("resourcesArticleCount", { n: filteredArticles.length })}
          </span>
        </div>
        {articlesLoading ? (
          <div className="space-y-3">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
        <div className="space-y-3">
          {filteredArticles.map((article, idx) => {
            const cat = getCategory(article.category);
            const isOpen = openArticleId === article.id;
            return (
              <ArticleCard
                key={article.id}
                article={article}
                category={cat}
                index={idx}
                isOpen={isOpen}
                onToggle={() => handleToggleArticle(article.id)}
              />
            );
          })}
        </div>
        )}
      </section>

      {/* Section 4: Video Resources */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-sm">{t("resourcesVideos")}</h2>
          <span className="text-white/40 text-xs">{t("resourcesVideoCount", { n: VIDEOS.length })}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {VIDEOS.map((video, idx) => (
            <VideoCard key={video.id} video={video} index={idx} />
          ))}
        </div>
      </section>

      {/* Section 5: Emergency Resources */}
      <section className="mb-6">
        <EmergencyResourcesCard />
      </section>

      {/* Section 6: Books & Apps */}
      <section className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={14} className="text-[#4ADE80]" />
          <h2 className="text-white font-semibold text-sm">{t("resourcesBooksAppsTitle")}</h2>
        </div>
        <div className="space-y-3">
          {BOOKS_APPS.map((item, idx) => (
            <BookAppCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </section>

      <p className="text-center text-white/30 text-xs mt-6 px-4">
        {t("resourcesFooter")}
      </p>
    </div>
  );
}

/* ========================================================================
   Sub-components
   ======================================================================== */

function CategoryPill({
  active,
  label,
  emoji,
  color,
  onClick,
}: {
  active: boolean;
  label: string;
  emoji: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
        active ? "text-white" : "glass-pill text-white/70"
      }`}
      style={
        active
          ? { background: `${color}30`, border: `1px solid ${color}60`, color }
          : undefined
      }
    >
      <span className="text-sm">{emoji}</span>
      <span className="whitespace-nowrap">{label}</span>
    </motion.button>
  );
}

function FeaturedArticleCard({ article }: { article: FeaturedArticle }) {
  const t = useT();
  const cat = getCategory(article.category);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl p-5"
      style={{
        background: `linear-gradient(135deg, ${cat.color}40 0%, rgba(11,19,43,0.85) 100%)`,
        border: `1px solid ${cat.color}30`,
      }}
    >
      {/* Decorative blurs */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30"
        style={{ background: cat.color }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
        style={{ background: cat.color }}
      />

      <div className="relative">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: `${cat.color}30`, color: cat.color }}
          >
            <span>{cat.emoji}</span>
            <span>{t(cat.labelKey)}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-white/60 text-[11px]">
            <Sparkles size={11} className="text-[#FBBF24]" />
            {t("resourcesFeatured")}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg leading-tight mb-2 font-[family-name:var(--font-poppins)]">
          {t(article.titleKey)}
        </h3>

        {/* Excerpt */}
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          {t(article.excerptKey)}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/50 text-[11px]">
            <span className="inline-flex items-center gap-1">
              <Clock size={11} /> {article.readingTime} min
            </span>
            <span>•</span>
            <span>{t(article.authorKey)}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="px-3.5 py-2 rounded-xl text-white text-xs font-bold inline-flex items-center gap-1.5"
            style={{ background: cat.color }}
          >
            {t("resourcesReadArticle")}
            <ChevronLeft size={12} className="rotate-180" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function ArticleCard({
  article,
  category,
  index,
  isOpen,
  onToggle,
}: {
  article: Article;
  category: Category;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const t = useT();
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4) }}
      whileTap={{ scale: 0.99 }}
      onClick={onToggle}
      className="w-full glass-card p-4 text-left relative overflow-hidden"
      style={{ borderLeft: `3px solid ${category.color}` }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `${category.color}25` }}
        >
          {category.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm leading-snug mb-1 line-clamp-2">
            {t(article.titleKey)}
          </h3>
          <p
            className={`text-white/55 text-xs leading-relaxed mb-2 ${
              isOpen ? "" : "line-clamp-2"
            }`}
          >
            {t(article.excerptKey)}
          </p>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-white/70 text-xs leading-relaxed pt-1 pb-2">
                  {t("resourcesArticleExpanded")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-2 text-white/40 text-[11px]">
            <span className="inline-flex items-center gap-1">
              <Clock size={11} /> {article.readingTime} min
            </span>
            <span>•</span>
            <span>{t(article.authorKey)}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function VideoCard({ video, index }: { video: VideoResource; index: number }) {
  const t = useT();
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.97 }}
      className="text-left"
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-video rounded-2xl overflow-hidden mb-2 flex items-center justify-center"
        style={{ background: video.gradient }}
      >
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Play button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg"
        >
          <Play size={20} className="text-[#0A0A0F] ml-0.5" fill="currentColor" />
        </motion.div>
        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-medium">
          {video.duration}
        </span>
      </div>
      {/* Title */}
      <h3 className="text-white text-xs font-medium leading-snug line-clamp-2">
        {t(video.titleKey)}
      </h3>
      <p className="text-white/40 text-[10px] mt-0.5">{t(video.categoryKey)}</p>
    </motion.button>
  );
}

function EmergencyResourcesCard() {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong p-5 relative overflow-hidden border border-[#FF3B30]/30"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FF3B30]/20 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-9 h-9 rounded-xl bg-[#FF3B30]/20 flex items-center justify-center">
            <Phone size={18} className="text-[#FF3B30]" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base font-[family-name:var(--font-poppins)]">
              {t("resourcesEmergencyTitle")}
            </h3>
            <p className="text-white/50 text-xs">{t("resourcesEmergencySubtitle")}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
          {HOTLINES.map((hotline) => (
            <div
              key={hotline.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${hotline.color}25` }}
                >
                  <Phone size={14} style={{ color: hotline.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white text-xs font-medium truncate">
                    {t(hotline.nameKey)}
                  </p>
                  <p className="text-white/50 text-[11px] truncate">
                    {t(hotline.descKey)}
                  </p>
                </div>
              </div>
              <motion.a
                href={`tel:${hotline.phone}`}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 rounded-lg text-white text-[11px] font-bold flex-shrink-0"
                style={{ background: hotline.color }}
              >
                {t("resourcesCallBtn")}
              </motion.a>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BookAppCard({ item, index }: { item: BookApp; index: number }) {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card p-4 flex items-center gap-3"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ background: `${item.color}25` }}
      >
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-white font-semibold text-sm truncate">{item.name}</h3>
          <span
            className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
            style={{ background: `${item.color}25`, color: item.color }}
          >
            {item.type === "app" ? t("resourcesTypeApp") : t("resourcesTypeBook")}
          </span>
        </div>
        <p className="text-white/55 text-xs leading-snug line-clamp-1">
          {t(item.descKey)}
        </p>
      </div>
      <button
        className="w-8 h-8 rounded-full glass-pill flex items-center justify-center flex-shrink-0"
        aria-label={t("resourcesOpen")}
      >
        <ExternalLink size={14} className="text-white/60" />
      </button>
    </motion.div>
  );
}
