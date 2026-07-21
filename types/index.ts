export type CategorySlug = 
  | 'veterinary'
  | 'behavior'
  | 'nutrition'
  | 'rescue'
  | 'columns'
  | 'travel'
  | 'community'
  | 'news'
  | 'health';

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  articlesCount: number;
  followersCount: number;
  verified?: boolean;
  socials?: {
    instagram?: string;
    website?: string;
  };
}

export type AuthProvider = 'google' | 'naver' | 'email';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: AuthProvider;
  createdAt: string;
  isPremium?: boolean;
  isAdmin?: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  slug: CategorySlug;
  description: string;
  icon?: string;
  count: number;
  featured?: boolean;
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
  replies?: Comment[];
}

export interface Breed {
  id: string;
  name: string;
  nameEn: string;
  origin: string;
  description: string;
  temperament: string[];
  weight: string;
  activityLevel: '낮음' | '보통' | '높음';
  groomingNeed: '쉬움' | '보통' | '자주';
  lifespan: string;
  image: string;
  healthCareTips: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type ArticleStatus = 'scheduled' | 'published' | 'archived' | 'premium_only';

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string; // HTML string
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
  
  // Premium Content & 24h Free System
  status: ArticleStatus;
  freeAccessDurationHours: number; // Default 24
  scheduledAt?: string;
  isPremium?: boolean;
  isPremiumOnly?: boolean;
}

export type SubscriptionPlan = 'monthly' | 'yearly';

export interface UserSubscription {
  isPremium: boolean;
  plan?: SubscriptionPlan;
  subscribedAt?: string;
  expiresAt?: string;
  paymentMethod?: string;
  orderId?: string;
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
  status: 'imported' | 'auto_summarized' | 'draft';
  fetchedAt: string;
}
