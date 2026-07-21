'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroStory } from '@/components/editorial/HeroStory';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { FreeAccessCountdown } from '@/components/editorial/FreeAccessCountdown';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LitterPaperLogo } from '@/components/ui/LitterPaperLogo';
import { CATEGORIES, AUTHORS } from '@/lib/mockData';
import { storage } from '@/lib/storage';
import { Article, CategorySlug, UserSubscription, UserProfile } from '@/types';
import { getArticleAccessStatus } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { AuthModal } from '@/components/auth/AuthModal';
import { 
  Sparkles, 
  TrendingUp, 
  ChevronRight, 
  Mail, 
  BookOpen, 
  Flame, 
  Crown, 
  Clock, 
  ShieldCheck, 
  Vote,
  ShoppingBag,
  Info,
  CheckCircle2,
  Heart,
  Send,
  MessageSquare,
  Award,
  ExternalLink,
  Bell
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

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-20">
        
        {/* Scheduled Article Alert */}
        {scheduledArticle && (
          <div className="p-4 rounded-2xl bg-[#C19A6B]/15 dark:bg-white/5 border border-[#C19A6B]/30 dark:border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
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

        {/* ========================================================================= */}
        {/* MENU CONTENT SECTION 1: 📖 리터페이퍼란? (About & 4 Guiding Principles) */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE6DF] dark:border-[#333333] pb-6">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C19A6B] flex items-center gap-1.5">
                <Info className="w-4 h-4" /> 1. 리터페이퍼란?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                100% 내돈내산 반려동물 용품 검증 저널
              </h2>
            </div>
            <Link
              href="/about"
              className="text-xs font-bold text-[#C19A6B] hover:underline flex items-center gap-1 shrink-0"
            >
              상세 소개 더보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-sm text-[#666666] dark:text-[#A0A0A0] leading-relaxed max-w-3xl">
            리터페이퍼(LITTER PAPER)는 대가성 협찬 글을 엄격히 금지합니다. 직접 무작위 구매한 제품을 분광 먼지 측정기, 300g 무게 감지 센서, DM 영양 성분 환산표로 분석하여 가장 객관적인 수치로 집사들에게 알립니다.
          </p>

          {/* 4 Guiding Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-2">
              <ShieldCheck className="w-5 h-5 text-[#C19A6B]" />
              <h3 className="font-extrabold text-sm">1. 대가성 협찬 0% 배제</h3>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                제조사 광고비를 받지 않으며 무작위 내돈내산으로 테스트합니다.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-2">
              <Award className="w-5 h-5 text-[#C19A6B]" />
              <h3 className="font-extrabold text-sm">2. 연구 장비 실측 데이터</h3>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                분광 먼지 수치(ppm), 데시벨(dB), DM 단백질 비율로 수치화합니다.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-2">
              <Sparkles className="w-5 h-5 text-[#C19A6B]" />
              <h3 className="font-extrabold text-sm">3. 롱블랙 스타일 읽기</h3>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                50/50 분할 레이아웃과 프리텐다드 서체로 편안한 읽기를 제공합니다.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-2">
              <Clock className="w-5 h-5 text-[#C19A6B]" />
              <h3 className="font-extrabold text-sm">4. 24시간 무료 공개</h3>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                모든 최신 검증 리포트는 24시간 동안 누구나 무료로 읽습니다.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MENU CONTENT SECTION 2: 🔥 요즘 화제 (Trending Articles & Issue Grid) */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE6DF] dark:border-[#333333] pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C19A6B] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#FF8A00]" /> 2. 요즘 화제
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#333333] dark:text-[#FAF8F5] mt-1">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(0, 6).map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MENU CONTENT SECTION 3: 🐾 픽캣 (Pick Cat Live Poll & 100-Char Memo Feed) */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE6DF] dark:border-[#333333] pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C19A6B] flex items-center gap-1.5">
                <Vote className="w-4 h-4" /> 3. 픽캣 (Pick Cat) 커뮤니티
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
        {/* MENU CONTENT SECTION 4: 👑 프리미엄 (Premium Exclusive Archive) */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#242424] border border-[#333333] text-white shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#333333] pb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C19A6B] text-white text-xs font-extrabold">
                <Crown className="w-4 h-4" /> 4. 프리미엄 (Premium Archive)
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

        {/* ========================================================================= */}
        {/* MENU CONTENT SECTION 5: 📧 뉴스레터 (Newsletter Series Cards & Settings Link) */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE6DF] dark:border-[#333333] pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C19A6B] flex items-center gap-1.5">
                <Mail className="w-4 h-4" /> 5. 뉴스레터
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#333333] dark:text-[#FAF8F5] mt-1">
                매일 아침 배달되는 3대 검증 뉴스레터 시리즈
              </h2>
            </div>

            <Link
              href="/newsletter/settings"
              className="px-6 py-2.5 rounded-2xl bg-[#FF8A00] text-white font-extrabold text-xs hover:bg-[#e07900] transition-colors shadow-md inline-flex items-center gap-1.5 shrink-0"
            >
              <Bell className="w-4 h-4 text-white" /> 뉴스레터 알림 설정
            </Link>
          </div>

          {/* 3 Newsletter Series Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Series 1 */}
            <div className="p-6 rounded-3xl bg-[#FFF9F2] dark:bg-[#25201A] border border-[#F5E6D3] dark:border-[#3D3227] space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FF8A00] text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                🥫
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                  사료 & 습식캔 데일리
                </h3>
                <div className="flex gap-1 mt-1 text-[10px] font-bold text-white">
                  <span className="w-4 h-4 rounded-full bg-[#FF8A00] flex items-center justify-center">월</span>
                  <span className="w-4 h-4 rounded-full bg-[#FF8A00] flex items-center justify-center">화</span>
                  <span className="w-4 h-4 rounded-full bg-[#FF8A00] flex items-center justify-center">수</span>
                  <span className="w-4 h-4 rounded-full bg-[#FF8A00] flex items-center justify-center">목</span>
                  <span className="w-4 h-4 rounded-full bg-[#FF8A00] flex items-center justify-center">금</span>
                </div>
              </div>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                AAFCO 기준 달성 여부와 DM 영양 성분 환산표를 차근차근 따져서 보내드립니다.
              </p>
            </div>

            {/* Series 2 */}
            <div className="p-6 rounded-3xl bg-[#F0FAF7] dark:bg-[#1A2623] border border-[#D5EFE8] dark:border-[#273B36] space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#00B88A] text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                🧪
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                  모래 & 배변 분광 리포트
                </h3>
                <div className="flex gap-1 mt-1 text-[10px] font-bold text-white">
                  <span className="w-4 h-4 rounded-full bg-[#00B88A] flex items-center justify-center">화</span>
                  <span className="w-4 h-4 rounded-full bg-[#00B88A] flex items-center justify-center">목</span>
                </div>
              </div>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                벤토나이트 10종 먼지 분광 수치 측정과 30초 응집력 실측 데이터를 전합니다.
              </p>
            </div>

            {/* Series 3 */}
            <div className="p-6 rounded-3xl bg-[#FAF4FC] dark:bg-[#251A29] border border-[#EEDBF5] dark:border-[#3A2740] space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#A855F7] text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                ⚡
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                  스마트 가전 & 캣타워
                </h3>
                <div className="flex gap-1 mt-1 text-[10px] font-bold text-white">
                  <span className="w-4 h-4 rounded-full bg-[#A855F7] flex items-center justify-center">수</span>
                  <span className="w-4 h-4 rounded-full bg-[#A855F7] flex items-center justify-center">금</span>
                </div>
              </div>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                자동 화장실 300g 무게 센서 감지 정밀 실험과 원목 캣폴 하중 인장 테스트를 알립니다.
              </p>
            </div>
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
