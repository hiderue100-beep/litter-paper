'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TableOfContents } from '@/components/editorial/TableOfContents';
import { AuthorCard } from '@/components/editorial/AuthorCard';
import { CommentSection } from '@/components/editorial/CommentSection';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { AiSummaryModal } from '@/components/editorial/AiSummaryModal';
import { FreeAccessCountdown } from '@/components/editorial/FreeAccessCountdown';
import { ArticlePaywall } from '@/components/editorial/ArticlePaywall';
import { storage } from '@/lib/storage';
import { Article, UserSubscription } from '@/types';
import { formatDate, getArticleAccessStatus } from '@/lib/utils';
import { aiEngine } from '@/lib/aiEngine';
import { useToast } from '@/components/ui/Toast';
import { 
  Bookmark, 
  Heart, 
  Share2, 
  Sparkles, 
  Clock, 
  Calendar, 
  Eye, 
  Languages, 
  Check, 
  HelpCircle, 
  ChevronLeft,
  Lock,
  Crown
} from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription>({ isPremium: false });
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (!slug) return;
    const allArticles = storage.getArticles();
    const found = allArticles.find((a) => a.slug === slug) || allArticles[0];
    const sub = storage.getUserSubscription();
    
    setArticle(found);
    setSubscription(sub);
    setIsBookmarked(storage.isBookmarked(found.id));
    setIsLiked(storage.isLiked(found.id));
    setLikesCount(found.likes);

    // Save reading history
    storage.addHistory(found);

    // Related articles
    const related = allArticles.filter(
      (a) => a.id !== found.id && (a.category === found.category || a.tags.some((t) => found.tags.includes(t)))
    );
    setRelatedArticles(related.slice(0, 3));
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#1A1A1A] font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20 text-[#666666]">
          리뷰를 로딩 중입니다...
        </div>
        <Footer />
      </div>
    );
  }

  const access = getArticleAccessStatus(article, subscription.isPremium);

  const handleBookmarkToggle = () => {
    const updated = storage.toggleBookmark(article.id);
    const bookmarkedNow = updated.includes(article.id);
    setIsBookmarked(bookmarkedNow);
    showToast(
      bookmarkedNow ? '기사가 내 보관함에 저장되었습니다.' : '보관함에서 삭제되었습니다.',
      bookmarkedNow ? 'success' : 'info'
    );
  };

  const handleLikeToggle = () => {
    const res = storage.toggleLike(article.id);
    setIsLiked(res.isLiked);
    setLikesCount((prev) => (res.isLiked ? prev + 1 : prev - 1));
    showToast(res.isLiked ? '이 리뷰를 추천했습니다.' : '추천을 취소했습니다.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('기사 링크가 클립보드에 복사되었습니다.');
    }
  };

  const handleTranslateToggle = () => {
    if (translatedText) {
      setTranslatedText(null);
      showToast('원문(한국어)으로 재전환되었습니다.', 'info');
    } else {
      const translated = aiEngine.translateArticle(article.content, 'en');
      setTranslatedText(translated);
      showToast('English AI 번역본이 생성되었습니다.');
    }
  };

  const fontSizeClass =
    fontSize === 'xlarge'
      ? 'text-xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg leading-relaxed'
      : 'text-base leading-relaxed';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#666666] hover:text-[#C19A6B] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> 이전 목록으로
          </button>

          {subscription.isPremium && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C19A6B] text-white text-xs font-extrabold">
              <Crown className="w-3.5 h-3.5 text-white" /> 프리미엄 멤버십 전용 해제됨
            </span>
          )}
        </div>

        {/* 24-Hour Free Countdown Banner */}
        {access.isFreeNow && (
          <div className="max-w-4xl mx-auto mb-8">
            <FreeAccessCountdown freeWindowEndsAt={access.freeWindowEndsAt} />
          </div>
        )}

        {/* Article Header */}
        <article className="max-w-4xl mx-auto space-y-6 mb-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <Link
              href={`/category/${article.category}`}
              className="bg-[#333333] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider hover:bg-[#C19A6B] transition-colors"
            >
              {article.categoryName}
            </Link>
            <span className="bg-[#C19A6B]/20 text-[#C19A6B] text-xs font-bold px-3 py-1 rounded-full">
              난이도: {article.difficulty}
            </span>
            <span className="text-xs text-[#666666]">
              예상 읽기: {article.readingTime}분
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#333333] dark:text-[#FAF8F5] leading-[1.25] tracking-tight">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#666666] dark:text-[#A0A0A0] font-normal leading-relaxed">
            "{article.subtitle}"
          </p>

          {/* Author Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#EAE6DF] dark:border-[#333333] text-xs text-[#666666]">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#C19A6B]"
              />
              <div>
                <div className="font-extrabold text-sm text-[#333333] dark:text-[#FAF8F5]">
                  {article.author.name}
                </div>
                <div className="text-[11px] text-[#666666]">
                  {article.author.role}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> 발행: {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#C19A6B]" /> 조회수 {article.views.toLocaleString()}회
              </span>
            </div>
          </div>
        </article>

        {/* Cover Image */}
        <div className="max-w-5xl mx-auto mb-12 rounded-3xl overflow-hidden shadow-2xl border border-[#EAE6DF] dark:border-[#333333]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full max-h-[550px] object-cover"
          />
        </div>

        {/* Sticky Floating Control Toolbar */}
        <div className="sticky top-24 z-30 max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between p-3 rounded-2xl glass-nav shadow-lg border border-[#EAE6DF] dark:border-[#333333]">
            <div className="flex items-center gap-2">
              {/* AI Summary Trigger */}
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#333333] text-white text-xs font-extrabold hover:bg-[#C19A6B] transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#C19A6B]" /> AI 3줄 요약
              </button>

              {/* Translate */}
              <button
                onClick={handleTranslateToggle}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  translatedText
                    ? 'bg-[#C19A6B] text-white border-[#C19A6B]'
                    : 'bg-white dark:bg-[#242424] text-[#666666] border-[#EAE6DF] dark:border-[#333333]'
                }`}
              >
                <Languages className="w-4 h-4" /> {translatedText ? '한국어 원문' : 'EN Translation'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Font Size Toggle */}
              <div className="hidden sm:flex items-center bg-white dark:bg-[#242424] p-1 rounded-xl border border-[#EAE6DF] dark:border-[#333333] text-xs">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 rounded-lg ${fontSize === 'normal' ? 'bg-[#333333] text-white font-bold' : 'text-[#666666]'}`}
                >
                  기본
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 rounded-lg ${fontSize === 'large' ? 'bg-[#333333] text-white font-bold' : 'text-[#666666]'}`}
                >
                  크게
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-1 rounded-lg ${fontSize === 'xlarge' ? 'bg-[#333333] text-white font-bold' : 'text-[#666666]'}`}
                >
                  더크게
                </button>
              </div>

              {/* Like Button */}
              <button
                onClick={handleLikeToggle}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                  isLiked
                    ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30'
                    : 'bg-white dark:bg-[#242424] text-[#666666] border-[#EAE6DF] dark:border-[#333333]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                {likesCount}
              </button>

              {/* Bookmark */}
              <button
                onClick={handleBookmarkToggle}
                className={`p-2 rounded-xl border transition-colors ${
                  isBookmarked
                    ? 'bg-[#C19A6B] text-white border-[#C19A6B]'
                    : 'bg-white dark:bg-[#242424] text-[#666666] border-[#EAE6DF] dark:border-[#333333]'
                }`}
                title="보관함 저장"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-white dark:bg-[#242424] text-[#666666] border border-[#EAE6DF] dark:border-[#333333] hover:text-[#333333]"
                title="공유하기"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {access.isLocked ? (
              <div className="space-y-6">
                {/* Teaser Preview */}
                <div className="prose-cat text-base leading-relaxed opacity-60">
                  <div dangerouslySetInnerHTML={{ __html: article.content.slice(0, 350) + '...' }} />
                </div>
                {/* Premium Paywall */}
                <ArticlePaywall reason={access.status === 'premium_only' ? 'premium_only' : 'expired'} />
              </div>
            ) : (
              <div className={`prose-cat ${fontSizeClass}`}>
                {translatedText ? (
                  <div className="whitespace-pre-line p-6 rounded-2xl bg-[#C19A6B]/15 border border-[#C19A6B]/30">
                    {translatedText}
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                )}
              </div>
            )}

            {/* Article Tags */}
            <div className="mt-10 pt-6 border-t border-[#EAE6DF] dark:border-[#333333] flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <Link
                  key={t}
                  href={`/search?q=${encodeURIComponent(t)}`}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] hover:border-[#C19A6B] text-[#C19A6B]"
                >
                  #{t}
                </Link>
              ))}
            </div>

            {/* FAQ Module if exists */}
            {article.faq && article.faq.length > 0 && (
              <div className="mt-12 p-6 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333]">
                <h3 className="text-lg font-extrabold text-[#333333] dark:text-[#FAF8F5] flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-[#C19A6B]" /> 검증 에디터 FAQ
                </h3>
                <div className="space-y-4">
                  {article.faq.map((f, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A]">
                      <div className="font-bold text-sm text-[#C19A6B] mb-1">
                        Q. {f.question}
                      </div>
                      <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                        A. {f.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Card Box */}
            <div className="mt-12">
              <AuthorCard author={article.author} />
            </div>

            {/* Interactive Comment Section */}
            <CommentSection articleId={article.id} />
          </div>

          {/* Sidebar (TOC & Related Articles) */}
          <div className="lg:col-span-4 space-y-8">
            <TableOfContents toc={article.tableOfContents} />

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333]">
                <h3 className="text-base font-extrabold mb-4 text-[#333333] dark:text-[#FAF8F5]">
                  함께 읽으면 좋은 검증 기사
                </h3>
                <div className="space-y-3">
                  {relatedArticles.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} variant="compact" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* AI Summary Modal */}
      <AiSummaryModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        article={article}
      />

      <Footer />
    </div>
  );
}
