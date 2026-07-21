import { Article } from '@/types';

export function calculateReadingTime(content: string): number {
  const plainText = content.replace(/<[^>]+>/g, '');
  const wordCount = plainText.trim().length;
  const wordsPerMinute = 500; // Average Korean reading speed
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return '00:00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-가-힣]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface ArticleAccessInfo {
  status: 'scheduled' | 'free_now' | 'expired_premium' | 'premium_only' | 'archived';
  isLocked: boolean;
  isFreeNow: boolean;
  remainingSeconds: number;
  formattedCountdown: string;
  freeWindowEndsAt: Date;
}

export function getArticleAccessStatus(
  article: Article,
  isUserPremium: boolean = false
): ArticleAccessInfo {
  const now = new Date();
  const publishedDate = new Date(article.publishedAt);
  const freeDurationHours = article.freeAccessDurationHours || 24;

  const freeWindowEndsAt = new Date(publishedDate.getTime() + freeDurationHours * 3600 * 1000);
  const remainingSeconds = Math.max(0, Math.floor((freeWindowEndsAt.getTime() - now.getTime()) / 1000));
  const isFreeNow = remainingSeconds > 0 && publishedDate <= now && !article.isPremiumOnly;
  const isScheduled = publishedDate > now || article.status === 'scheduled';

  let status: ArticleAccessInfo['status'] = 'free_now';
  let isLocked = false;

  if (isScheduled) {
    status = 'scheduled';
    isLocked = true;
  } else if (article.isPremiumOnly || article.status === 'premium_only') {
    status = 'premium_only';
    isLocked = !isUserPremium;
  } else if (isFreeNow) {
    status = 'free_now';
    isLocked = false;
  } else {
    status = 'expired_premium';
    isLocked = !isUserPremium;
  }

  return {
    status,
    isLocked,
    isFreeNow,
    remainingSeconds,
    formattedCountdown: formatTimeRemaining(remainingSeconds),
    freeWindowEndsAt,
  };
}
