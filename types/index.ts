export type CategorySlug = 
  | 'news' 
  | 'health' 
  | 'nutrition' 
  | 'behavior' 
  | 'breeds' 
  | 'product-reviews' 
  | 'veterinary' 
  | 'lifestyle' 
  | 'travel' 
  | 'rescue' 
  | 'community' 
  | 'columns';

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  slug: CategorySlug;
  description: string;
  icon: string;
  count: number;
  featured?: boolean;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  articlesCount: number;
  followersCount: number;
  verified: boolean;
  socials?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  summary: string;
  category: CategorySlug;
  categoryName: string;
  tags: string[];
  author: Author;
  coverImage: string;
  readingTime: number; // in minutes
  difficulty: '입문 (Easy)' | '중급 (Medium)' | '전문가 (Expert)';
  publishedAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  commentsCount: number;
  isHero?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isEditorsPick?: boolean;
  aiGenerated?: boolean;
  rssImported?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  faq?: FaqItem[];
  tableOfContents?: { id: string; title: string; level: number }[];
}

export interface Comment {
  id: string;
  articleId: string;
  user: {
    name: string;
    avatar: string;
    badge?: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  isReported?: boolean;
  replies?: Comment[];
}

export interface Breed {
  id: string;
  name: string;
  nameEn: string;
  origin: string;
  temperament: string[];
  lifespan: string;
  weight: string;
  activityLevel: '낮음' | '보통' | '높음' | '매우 높음';
  groomingNeed: '쉬움' | '보통' | '자주 필요';
  description: string;
  image: string;
  healthCareTips: string[];
}

export interface RssSource {
  id: string;
  name: string;
  url: string;
  category: CategorySlug;
  active: boolean;
  lastFetchedAt: string;
  itemsCount: number;
}

export interface RssImportedArticle {
  id: string;
  sourceName: string;
  title: string;
  originalUrl: string;
  snippet: string;
  category: CategorySlug;
  status: 'imported' | 'auto_summarized' | 'published' | 'draft';
  fetchedAt: string;
}

export interface ReadingHistoryItem {
  articleId: string;
  articleSlug: string;
  articleTitle: string;
  categoryName: string;
  readAt: string;
  progressPercent: number;
}

export interface AiToolState {
  summary?: string[];
  seoTitle?: string;
  seoDescription?: string;
  extractedTags?: string[];
  translatedContent?: string;
  qualityScore?: number;
  faqs?: FaqItem[];
  headlineOptions?: string[];
}
