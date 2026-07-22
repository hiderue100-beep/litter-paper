'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroStory } from '@/components/editorial/HeroStory';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { FreeAccessCountdown } from '@/components/editorial/FreeAccessCountdown';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CATEGORIES } from '@/lib/mockData';
import { storage } from '@/lib/storage';
import { Article, CategorySlug, UserSubscription, UserProfile } from '@/types';
import { getArticleAccessStatus } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { AuthModal } from '@/components/auth/AuthModal';
import { 
  Sparkles, 
  ChevronRight, 
  Flame, 
  Crown, 
  Clock, 
  ShieldCheck, 
  Vote,
  ShoppingBag,
  CheckCircle2,
  Heart,
  Send
} from 'lucide-react';

interface PickCatMemo {
  id: string;
  userName: string;
  userAvatar: string;
  voteOption: string;
  memo: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

const INITIAL_MEMOS: PickCatMemo[] = [
  {
    id: 'm-1',
    userName: '치즈태비 집사',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    voteOption: '벤토나이트 굳는 모래',
    memo: '먼지 날림은 벤토가 어쩔 수 없지만 응집력과 기호성 때문에 벤토나이트 절대 못 벗어납니다!',
    createdAt: '10분 전',
    likes: 24,
  },
  {
    id: 'm-2',
    userName: '묘생역전',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    voteOption: '두부/천연 모래',
    memo: '사막화 걱정 없고 변기 수세가 편해서 두부 모래 5년째 유지 중입니다.',
    createdAt: '30분 전',
    likes: 15,
  },
];

export default function HomePage() {
  const { showToast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscription, setSubscription] = useState<UserSubscription>({ isPremium: false });
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // PickCat Poll State
  const [votedOption, setVotedOption] = useState<'A' | 'B' | null>(null);
  const [optionACount, setOptionACount] = useState(1420);
  const [optionBCount, setOptionBCount] = useState(540);
  const [memoInput, setMemoInput] = useState('');
  const [memos, setMemos] = useState<PickCatMemo[]>(INITIAL_MEMOS);

  useEffect(() => {
    setArticles(storage.getArticles());
    setSubscription(storage.getUserSubscription());
    setCurrentUser(storage.getCurrentUser());
  }, []);

  const totalVotes = optionACount + optionBCount;
  const percentA = Math.round((optionACount / totalVotes) * 100);
  const percentB = 100 - percentA;

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

  const handleVote = (option: 'A' | 'B') => {
    if (!currentUser) {
      showToast('투표에 참여하시려면 먼저 로그인해 주세요.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    if (votedOption) {
      showToast('이미 투표에 참여하셨습니다.', 'info');
      return;
    }

    setVotedOption(option);
    if (option === 'A') setOptionACount((prev) => prev + 1);
    if (option === 'B') setOptionBCount((prev) => prev + 1);

    showToast(
      option === 'A'
        ? '벤토나이트 모래에 1표 투표하셨습니다!'
        : '두부/천연 모래에 1표 투표하셨습니다!'
    );
  };

  const handleAddMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('한줄 메모를 남기시려면 먼저 로그인해 주세요.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    if (!votedOption) {
      showToast('투표를 완료한 후 100자 한줄 메모를 남기실 수 있습니다.', 'info');
      return;
    }

    if (!memoInput.trim()) return;

    const newMemoItem: PickCatMemo = {
      id: `m-${Date.now()}`,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      voteOption: votedOption === 'A' ? '벤토나이트 굳는 모래' : '두부/천연 모래',
      memo: memoInput.trim().slice(0, 100),
      createdAt: '방금 전',
      likes: 0,
    };

    setMemos([newMemoItem, ...memos]);
    setMemoInput('');
    showToast('100자 한줄 픽캣 메모가 등록되었습니다!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-24">
        
        {/* Scheduled Article Alert */}
        {scheduledArticle && (
          <div className="py-3 border-y border-[#EAE6DF] dark:border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#333333] text-white font-extrabold text-[10px]">
                NEXT REVIEW
              </span>
              <span className="font-bold text-[#333333] dark:text-[#FAF8F5]">
                다음 내돈내산 검증 공개 예정: "{scheduledArticle.title}"
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-[#C19A6B]">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>공개 카운트다운: {getArticleAccessStatus(scheduledArticle).formattedCountdown}</span>
            </div>
          </div>
        )}

        {/* Hero Lead Story (LongBlack 50/50 Split Container) */}
        {heroArticle && (
          <div className="space-y-4">
            <HeroStory article={heroArticle} />
          </div>
        )}

        {/* Today's Free Story Highlight Box with Countdown */}
        {todaysFreeStory && (
          <section className="py-8 border-y border-[#EAE6DF] dark:border-[#333333] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE6DF] dark:border-[#333333] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C19A6B] flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> Today's Free Product Review
                </span>
                <h2 className="text-2xl font-extrabold text-[#333333] dark:text-[#FAF8F5] mt-1">
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

        {/* ========================================================================= */}
        {/* 🔥 요즘 화제 (Trending Articles & Issue Grid) */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAE6DF] dark:border-[#333333] pb-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C19A6B] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#FF8A00]" /> 요즘 화제
              </span>
              <h2 className="text-2xl sm:text-[2rem] font-extrabold tracking-tight text-[#333333] dark:text-[#FAF8F5] mt-1">
                실시간 독자 반응 1위 & 검증 이슈 기사 모음
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-[#333333] text-white shadow-xs'
                    : 'bg-white dark:bg-[#242424] text-[#666666] border border-[#EAE6DF] dark:border-[#333333] hover:border-[#C19A6B]'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedCategory('nutrition')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'nutrition'
                    ? 'bg-[#333333] text-white shadow-xs'
                    : 'bg-white dark:bg-[#242424] text-[#666666] border border-[#EAE6DF] dark:border-[#333333] hover:border-[#C19A6B]'
                }`}
              >
                사료 & 습식캔
              </button>
              <button
                onClick={() => setSelectedCategory('veterinary')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'veterinary'
                    ? 'bg-[#333333] text-white shadow-xs'
                    : 'bg-white dark:bg-[#242424] text-[#666666] border border-[#EAE6DF] dark:border-[#333333] hover:border-[#C19A6B]'
                }`}
              >
                모래 & 배변
              </button>
              <button
                onClick={() => setSelectedCategory('behavior')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'behavior'
                    ? 'bg-[#333333] text-white shadow-xs'
                    : 'bg-white dark:bg-[#242424] text-[#666666] border border-[#EAE6DF] dark:border-[#333333] hover:border-[#C19A6B]'
                }`}
              >
                캣타워 & 가구
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredArticles.slice(0, 6).map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 🐾 픽캣 (Pick Cat Live Poll & 100-Char Memo Feed) */}
        {/* ========================================================================= */}
        <section className="py-10 sm:py-12 border-y border-[#EAE6DF] dark:border-[#333333] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE6DF] dark:border-[#333333] pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C19A6B] flex items-center gap-1.5">
                <Vote className="w-4 h-4" /> 픽캣 (Pick Cat) 커뮤니티
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#333333] dark:text-[#FAF8F5] mt-1">
                집사들의 투표로 정하는 픽캣 한줄 한마디
              </h2>
            </div>
            <Link
              href="/pickcat"
              className="text-xs font-bold text-[#C19A6B] hover:underline flex items-center gap-1 shrink-0"
            >
              전체 픽캣 피드 보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Poll Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option A */}
            <button
              type="button"
              onClick={() => handleVote('A')}
              className={`p-6 rounded-2xl border-2 transition-all text-left space-y-3 ${
                votedOption === 'A'
                  ? 'border-[#C19A6B] bg-[#C19A6B]/10 dark:bg-[#C19A6B]/20 shadow-md'
                  : 'border-[#EAE6DF] dark:border-[#333333] hover:border-[#C19A6B] bg-[#FAF8F5] dark:bg-[#1A1A1A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base">A. 벤토나이트 굳는 모래</span>
                {votedOption === 'A' && <CheckCircle2 className="w-5 h-5 text-[#C19A6B]" />}
              </div>
              <p className="text-xs text-[#666666]">
                기호성과 응집력이 압도적! 먼지 수치 5ppm 이하 선택
              </p>
              
              <div className="space-y-1 pt-2">
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-[#C19A6B] transition-all duration-700"
                    style={{ width: `${percentA}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-extrabold text-[#C19A6B]">
                  <span>{percentA}%</span>
                  <span>{optionACount.toLocaleString()}표</span>
                </div>
              </div>
            </button>

            {/* Option B */}
            <button
              type="button"
              onClick={() => handleVote('B')}
              className={`p-6 rounded-2xl border-2 transition-all text-left space-y-3 ${
                votedOption === 'B'
                  ? 'border-[#C19A6B] bg-[#C19A6B]/10 dark:bg-[#C19A6B]/20 shadow-md'
                  : 'border-[#EAE6DF] dark:border-[#333333] hover:border-[#C19A6B] bg-[#FAF8F5] dark:bg-[#1A1A1A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base">B. 두부 / 카사바 / 천연 모래</span>
                {votedOption === 'B' && <CheckCircle2 className="w-5 h-5 text-[#C19A6B]" />}
              </div>
              <p className="text-xs text-[#666666]">
                사막화 걱정 제로! 변기 수세 및 가벼운 청소 용이
              </p>

              <div className="space-y-1 pt-2">
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-[#333333] dark:bg-white transition-all duration-700"
                    style={{ width: `${percentB}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                  <span>{percentB}%</span>
                  <span>{optionBCount.toLocaleString()}표</span>
                </div>
              </div>
            </button>
          </div>

          {/* 100-Char Memo Form */}
          <form onSubmit={handleAddMemo} className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-3">
            <div className="flex justify-between text-xs font-bold text-[#666666]">
              <span>100자 이하 한줄 픽캣 메모</span>
              <span>{memoInput.length} / 100자</span>
            </div>
            <textarea
              value={memoInput}
              onChange={(e) => setMemoInput(e.target.value.slice(0, 100))}
              maxLength={100}
              placeholder={votedOption ? '투표한 이유나 실전 노하우를 100자 이내로 적어주세요...' : '투표에 참여하신 후 100자 한줄 메모를 작성할 수 있습니다.'}
              rows={2}
              disabled={!votedOption}
              className="w-full bg-transparent text-sm focus:outline-hidden resize-none placeholder:text-[#666666]"
            />
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!votedOption || !memoInput.trim()}
                className="px-4 py-2 rounded-xl bg-[#333333] text-white font-extrabold text-xs disabled:opacity-50 hover:bg-[#C19A6B] transition-colors inline-flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-[#C19A6B]" /> 메모 남기기
              </button>
            </div>
          </form>
        </section>

        {/* ========================================================================= */}
        {/* 👑 프리미엄 (Premium Exclusive Archive) */}
        {/* ========================================================================= */}
        <section className="px-6 py-10 sm:px-10 sm:py-12 bg-[#242424] border-y border-[#333333] text-white space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#333333] pb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C19A6B] text-white text-xs font-extrabold">
                <Crown className="w-4 h-4" /> 프리미엄 (Premium Archive)
              </span>
              <h2 className="text-3xl font-extrabold mt-2 text-white">
                프리미엄 전용 상품 검증 아카이브
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl">
                24시간 무료 기간이 지났거나 독점 공개되는 100% 내돈내산 종합 검증 리포트 모음입니다.
              </p>
            </div>

            <Link
              href="/premium"
              className="px-6 py-3 rounded-2xl bg-[#C19A6B] text-white font-extrabold text-xs hover:bg-[#a88354] transition-all shadow-md shrink-0 text-center"
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


      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setCurrentUser(storage.getCurrentUser())}
      />
    </div>
  );
}
