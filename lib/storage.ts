import { Article, RssSource, RssImportedArticle, UserSubscription, SubscriptionPlan, UserProfile, AuthProvider } from '@/types';
import { ARTICLES, RSS_SOURCES, RSS_IMPORTED } from './mockData';

const KEYS = {
  ARTICLES: 'litterpaper_articles',
  BOOKMARKS: 'litterpaper_bookmarks',
  LIKES: 'litterpaper_likes',
  HISTORY: 'litterpaper_history',
  FOLLOWED_AUTHORS: 'litterpaper_followed_authors',
  SUBSCRIBERS: 'litterpaper_subscribers',
  RSS_SOURCES: 'litterpaper_rss_sources',
  RSS_IMPORTED: 'litterpaper_rss_imported',
  SUBSCRIPTION: 'litterpaper_user_subscription',
  CURRENT_USER: 'litterpaper_current_user',
  USERS_DB: 'litterpaper_registered_users',
};

const DEFAULT_SUBSCRIPTION: UserSubscription = {
  isPremium: false,
};

export const storage = {
  // User Authentication Methods
  getCurrentUser(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  setCurrentUser(user: UserProfile | null) {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  },

  loginSocial(provider: 'google' | 'naver'): UserProfile {
    const isGoogle = provider === 'google';
    const profile: UserProfile = {
      id: `usr_${provider}_${Date.now()}`,
      name: isGoogle ? '구글 독자 집사' : '네이버 독자 집사',
      email: isGoogle ? 'user.google@gmail.com' : 'user.naver@naver.com',
      avatar: isGoogle
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      provider,
      createdAt: new Date().toISOString(),
      isPremium: false,
    };

    this.setCurrentUser(profile);
    return profile;
  },

  signupEmail(email: string, password: string, name: string): UserProfile {
    const profile: UserProfile = {
      id: `usr_email_${Date.now()}`,
      name: name.trim() || '리터페이퍼 독자',
      email: email.trim().toLowerCase(),
      avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&auto=format&fit=crop&q=80',
      provider: 'email',
      createdAt: new Date().toISOString(),
      isPremium: false,
    };

    if (typeof window !== 'undefined') {
      const usersData = localStorage.getItem(KEYS.USERS_DB);
      const users: UserProfile[] = usersData ? JSON.parse(usersData) : [];
      users.push(profile);
      localStorage.setItem(KEYS.USERS_DB, JSON.stringify(users));
    }

    this.setCurrentUser(profile);
    return profile;
  },

  loginEmail(email: string, password: string): UserProfile {
    const emailClean = email.trim().toLowerCase();
    
    // Check if previously registered in mock DB
    let foundUser: UserProfile | null = null;
    if (typeof window !== 'undefined') {
      const usersData = localStorage.getItem(KEYS.USERS_DB);
      const users: UserProfile[] = usersData ? JSON.parse(usersData) : [];
      foundUser = users.find((u) => u.email === emailClean) || null;
    }

    if (!foundUser) {
      foundUser = {
        id: `usr_email_${Date.now()}`,
        name: emailClean.split('@')[0] || '리터페이퍼 독자',
        email: emailClean,
        avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&auto=format&fit=crop&q=80',
        provider: 'email',
        createdAt: new Date().toISOString(),
        isPremium: false,
      };
    }

    this.setCurrentUser(foundUser);
    return foundUser;
  },

  logout() {
    this.setCurrentUser(null);
  },

  getArticles(): Article[] {
    if (typeof window === 'undefined') return ARTICLES;
    const data = localStorage.getItem(KEYS.ARTICLES);
    if (!data) {
      localStorage.setItem(KEYS.ARTICLES, JSON.stringify(ARTICLES));
      return ARTICLES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return ARTICLES;
    }
  },

  saveCustomArticle(article: Article): Article[] {
    const articles = this.getArticles();
    const existingIndex = articles.findIndex((a) => a.id === article.id);
    let updated: Article[];
    if (existingIndex >= 0) {
      updated = [...articles];
      updated[existingIndex] = article;
    } else {
      updated = [article, ...articles];
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.ARTICLES, JSON.stringify(updated));
    }
    return updated;
  },

  // Subscription & Premium System
  getUserSubscription(): UserSubscription {
    if (typeof window === 'undefined') return DEFAULT_SUBSCRIPTION;
    const data = localStorage.getItem(KEYS.SUBSCRIPTION);
    if (!data) return DEFAULT_SUBSCRIPTION;
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_SUBSCRIPTION;
    }
  },

  activatePremium(plan: SubscriptionPlan = 'monthly', paymentMethod: string = 'TossPay', orderId?: string): UserSubscription {
    const now = new Date();
    const expiresAt = new Date();
    if (plan === 'yearly') {
      expiresAt.setFullYear(now.getFullYear() + 1);
    } else {
      expiresAt.setMonth(now.getMonth() + 1);
    }

    const subscription: UserSubscription = {
      isPremium: true,
      plan,
      subscribedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      paymentMethod,
      orderId: orderId || `toss_${Date.now()}`,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.SUBSCRIPTION, JSON.stringify(subscription));
    }

    // Update current user isPremium flag if logged in
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.isPremium = true;
      this.setCurrentUser(currentUser);
    }

    return subscription;
  },

  cancelPremium(): UserSubscription {
    const current = this.getUserSubscription();
    const updated: UserSubscription = {
      ...current,
      isPremium: false,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.SUBSCRIPTION, JSON.stringify(updated));
    }
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.isPremium = false;
      this.setCurrentUser(currentUser);
    }
    return updated;
  },

  getBookmarks(): string[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  },

  toggleBookmark(articleId: string): string[] {
    const bookmarks = this.getBookmarks();
    const isBookmarked = bookmarks.includes(articleId);
    const updated = isBookmarked
      ? bookmarks.filter((id) => id !== articleId)
      : [...bookmarks, articleId];
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updated));
    }
    return updated;
  },

  isBookmarked(articleId: string): boolean {
    return this.getBookmarks().includes(articleId);
  },

  getLikes(): string[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.LIKES);
    return data ? JSON.parse(data) : [];
  },

  toggleLike(articleId: string): { isLiked: boolean; countChange: number } {
    const likes = this.getLikes();
    const isLiked = likes.includes(articleId);
    const updatedLikes = isLiked
      ? likes.filter((id) => id !== articleId)
      : [...likes, articleId];
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.LIKES, JSON.stringify(updatedLikes));
    }

    const articles = this.getArticles();
    const article = articles.find((a) => a.id === articleId);
    if (article) {
      article.likes += isLiked ? -1 : 1;
      this.saveCustomArticle(article);
    }

    return { isLiked: !isLiked, countChange: isLiked ? -1 : 1 };
  },

  isLiked(articleId: string): boolean {
    return this.getLikes().includes(articleId);
  },

  getHistory(): { articleId: string; title: string; slug: string; categoryName: string; readAt: string }[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  },

  addHistory(article: Article) {
    if (typeof window === 'undefined') return;
    const history = this.getHistory();
    const filtered = history.filter((h) => h.articleId !== article.id);
    const newEntry = {
      articleId: article.id,
      title: article.title,
      slug: article.slug,
      categoryName: article.categoryName,
      readAt: new Date().toISOString(),
    };
    const updated = [newEntry, ...filtered].slice(0, 30);
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(updated));
  },

  getFollowedAuthors(): string[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.FOLLOWED_AUTHORS);
    return data ? JSON.parse(data) : [];
  },

  toggleFollowAuthor(authorId: string): boolean {
    const followed = this.getFollowedAuthors();
    const isFollowing = followed.includes(authorId);
    const updated = isFollowing
      ? followed.filter((id) => id !== authorId)
      : [...followed, authorId];
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.FOLLOWED_AUTHORS, JSON.stringify(updated));
    }
    return !isFollowing;
  },

  getSubscribers(): string[] {
    if (typeof window === 'undefined') return ['editorial@litterpaper.kr', 'editor@litterpaper.kr'];
    const data = localStorage.getItem(KEYS.SUBSCRIBERS);
    return data ? JSON.parse(data) : ['editorial@litterpaper.kr', 'editor@litterpaper.kr'];
  },

  addSubscriber(email: string): boolean {
    const list = this.getSubscribers();
    if (list.includes(email)) return false;
    const updated = [...list, email];
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.SUBSCRIBERS, JSON.stringify(updated));
    }
    return true;
  },

  getRssSources(): RssSource[] {
    if (typeof window === 'undefined') return RSS_SOURCES;
    const data = localStorage.getItem(KEYS.RSS_SOURCES);
    return data ? JSON.parse(data) : RSS_SOURCES;
  },

  addRssSource(source: RssSource): RssSource[] {
    const current = this.getRssSources();
    const updated = [source, ...current];
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.RSS_SOURCES, JSON.stringify(updated));
    }
    return updated;
  },

  getRssImported(): RssImportedArticle[] {
    if (typeof window === 'undefined') return RSS_IMPORTED;
    const data = localStorage.getItem(KEYS.RSS_IMPORTED);
    return data ? JSON.parse(data) : RSS_IMPORTED;
  },

  addRssImported(items: RssImportedArticle[]): RssImportedArticle[] {
    const current = this.getRssImported();
    const updated = [...items, ...current];
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.RSS_IMPORTED, JSON.stringify(updated));
    }
    return updated;
  },
};
