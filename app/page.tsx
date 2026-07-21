'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroStory } from '@/components/editorial/HeroStory';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { BreedCard } from '@/components/editorial/BreedCard';
import { FreeAccessCountdown } from '@/components/editorial/FreeAccessCountdown';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CATEGORIES, AUTHORS, BREEDS } from '@/lib/mockData';
import { storage } from '@/lib/storage';
import { Article, CategorySlug, UserSubscription } from '@/types';
import { getArticleAccessStatus } from '@/lib/utils';
import { Sparkles, TrendingUp, ChevronRight, Mail, Send, Award, BookOpen, Flame, Lock, Crown, Clock, ShieldCheck, Box, Zap, ShoppingBag } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function HomePage() {
  const { showToast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscription, setSubscription] = useState<UserSubscription>({ isPremium: false });
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    setArticles(storage.getArticles());
    setSubscription(storage.getUserSubscription());
  }, []);

  const heroArticle = articles.find((a) => a.isHero) || articles[0];
  const scheduledArticle = articles.find((a) => a.status === 'scheduled');
  
  // Today's Free Product Review Story
  const todaysFreeStory = articles.find((a) => {
    const access = getArticleAccessStatus(a, subscription.isPremium);
    return access.isFreeNow && !a.isHero;
  }) || articles[1];

  // Premium Archive Product Reviews
  const premiumArchiveArticles = articles.filter((a) => {
    const access = getArticleAccessStatus(a, subscription.isPremium);
    return access.status === 'expired_premium' || access.status === 'premium_only';
  });

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    const success = storage.addSubscriber(newsletterEmail.trim());
    if (success) {
      showToast('일간 리터페이퍼 상품 검증 뉴스레터 구독이 완료되었습니다!');
    } else {
      showToast('이미 구독 등록된 이메일 주소입니다.', 'info');
    }
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16">
        
        {/* Next Scheduled Article Countdown Banner */}
        {scheduledArticle && (
          <div className="p-4 rounded-2xl bg-[#E8DCC7]/50 dark:bg-white/5 border border-[#E8DCC7] dark:border-[#2A332C] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#3D5A40] text-white font-extrabold text-[10px]">
                NEXT REVIEW
              </span>
              <span className="font-bold text-[#202020] dark:text-[#F2F5F3]">
                다음 내돈내산 검증 공개 예정: "{scheduledArticle.title}"
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-[#3D5A40] dark:text-[#E8DCC7]">
              <Clock className="w-4 h-4 text-[#C77B30] animate-pulse" />
              <span>공개 카운트다운: {getArticleAccessStatus(scheduledArticle).formattedCountdown}</span>
            </div>
          </div>
        )}

        {/* Hero Lead Story (LongBlack-inspired 50/50 Split Container) */}
        {heroArticle && (
          <div className="space-y-4">
            <HeroStory article={heroArticle} />
          </div>
        )}

        {/* Today's Free Story Highlight Box with Countdown */}
        {todaysFreeStory && (
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECECEC] dark:border-[#2A332C] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C77B30] flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> Today's Free Product Review
                </span>
                <h2 className="text-2xl font-extrabold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] mt-1">
                  오늘의 24시간 무료 상품 검증 리포트
                </h2>
              </div>

              {/* Free Access Ticking Timer */}
              <FreeAccessCountdown
                freeWindowEndsAt={getArticleAccessStatus(todaysFreeStory).freeWindowEndsAt}
              />
            </div>

            <ArticleCard article={todaysFreeStory} variant="horizontal" />
          </section>
        )}

        {/* Product Review Categories Strip */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C77B30]" /> 주요 상품 검증 분야
            </h2>
            <Link
              href="/search"
              className="text-xs font-bold text-[#3D5A40] dark:text-[#E8DCC7] hover:underline flex items-center gap-1"
            >
              전체 리뷰 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40] dark:hover:border-[#E8DCC7] transition-all group text-center shadow-xs"
              >
                <div className="text-sm font-bold text-[#3D5A40] dark:text-[#E8DCC7] group-hover:scale-105 transition-transform">
                  {cat.name}
                </div>
                <div className="text-[11px] text-[#6E6E6E] dark:text-[#9EAAA0] mt-1 font-medium">
                  {cat.count}개 리뷰
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Curated Product Reviews Grid */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C77B30]">
                Verified Lab Tests
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] mt-1">
                에디터 추천 상품 검증 & 성분 분석 리포트
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-[#3D5A40] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1D231E] text-[#6E6E6E] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40]'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedCategory('nutrition')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'nutrition'
                    ? 'bg-[#3D5A40] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1D231E] text-[#6E6E6E] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40]'
                }`}
              >
                사료 & 습식캔
              </button>
              <button
                onClick={() => setSelectedCategory('veterinary')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'veterinary'
                    ? 'bg-[#3D5A40] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1D231E] text-[#6E6E6E] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40]'
                }`}
              >
                모래 & 배변
              </button>
              <button
                onClick={() => setSelectedCategory('behavior')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'behavior'
                    ? 'bg-[#3D5A40] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1D231E] text-[#6E6E6E] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40]'
                }`}
              >
                캣타워 & 가구
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(0, 6).map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>

        {/* Premium Archive Section */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1D231E] via-[#2F4732] to-[#3D5A40] text-white shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC7] text-[#3D5A40] text-xs font-bold">
                <Crown className="w-4 h-4 text-[#C77B30]" /> LITTER PAPER PREMIUM REVIEWS
              </span>
              <h2 className="text-3xl font-extrabold font-serif-editorial mt-2">
                프리미엄 전용 상품 검증 아카이브
              </h2>
              <p className="text-xs sm:text-sm text-[#E8DCC7]/80 mt-1 max-w-xl">
                24시간 무료 기간이 지난 내돈내산 종합 검증 리포트 및 독점 단독 실험 모음입니다.
              </p>
            </div>

            <Link
              href="/premium"
              className="px-6 py-3 rounded-2xl bg-[#E8DCC7] text-[#3D5A40] font-extrabold text-xs hover:bg-white transition-all shadow-md shrink-0 text-center"
            >
              프리미엄 멤버십 둘러보기 (Toss Payments)
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {premiumArchiveArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>

        {/* Product Lab Testing Guarantee Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3D5A40] to-[#2F4732] text-white p-8 sm:p-12 shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC7] text-[#3D5A40] text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-[#C77B30]" /> 대가성 협찬 0% 보장 원칙
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-editorial leading-tight">
              무작위 직접 구매 & 물리 장비 실험,<br />100% 내돈내산 검증 플랫폼
            </h2>
            <p className="text-sm sm:text-base text-[#E8DCC7]/90 leading-relaxed">
              광고 협찬글에 지친 집사들을 위해 모래 먼지 분광 측정기, 사료 DM 영양 성분 환산, 스마트 가전 안전 센서를 직접 실험하여 객관적 수치로 알립니다.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/search?q=내돈내산"
                className="px-6 py-3 rounded-2xl bg-[#E8DCC7] text-[#3D5A40] font-extrabold text-sm hover:bg-white transition-all shadow-md"
              >
                전체 검증 리포트 보기
              </Link>
              <Link
                href="/search?q=벤토나이트"
                className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white font-bold text-sm hover:bg-white/20 transition-all border border-white/20"
              >
                인기 벤토나이트 실험
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription CTA Banner */}
        <section className="rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8DCC7] text-[#3D5A40] flex items-center justify-center mx-auto font-bold shadow-xs">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-editorial text-[#202020] dark:text-[#F2F5F3]">
              매일 아침 배달되는 리터페이퍼(LITTER PAPER) 검증 리포트
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6E6E] dark:text-[#9EAAA0] leading-relaxed">
              실패 없는 반려용품 구매 가이드. 신제품 분광 분석부터 성분 표기 해독까지 이메일로 받아보세요.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요"
                required
                className="flex-1 px-4 py-3 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-sm focus:outline-hidden focus:border-[#3D5A40]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-[#3D5A40] text-white font-bold text-sm hover:bg-[#2F4732] transition-colors shrink-0 shadow-md flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" /> 무료 구독하기
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
