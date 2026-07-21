'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroStory } from '@/components/editorial/HeroStory';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { BreedCard } from '@/components/editorial/BreedCard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CATEGORIES, AUTHORS, BREEDS } from '@/lib/mockData';
import { storage } from '@/lib/storage';
import { Article, CategorySlug } from '@/types';
import { Sparkles, TrendingUp, ChevronRight, Stethoscope, Mail, Send, Award, BookOpen, Flame } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function HomePage() {
  const { showToast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    setArticles(storage.getArticles());
  }, []);

  const heroArticle = articles.find((a) => a.isHero) || articles[0];
  const featuredArticles = articles.filter((a) => a.isFeatured && a.id !== heroArticle?.id);
  const trendingArticles = articles.filter((a) => a.isTrending);

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    const success = storage.addSubscriber(newsletterEmail.trim());
    if (success) {
      showToast('일간 캣노트 뉴스레터 구독이 성공적으로 신청되었습니다!');
    } else {
      showToast('이미 구독 등록된 이메일 주소입니다.', 'info');
    }
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16">
        {/* Hero Lead Story */}
        {heroArticle && <HeroStory article={heroArticle} />}

        {/* Popular Categories Strip */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C77B30]" /> 주요 에디토리얼 분야
            </h2>
            <Link
              href="/search"
              className="text-xs font-bold text-[#3D5A40] dark:text-[#E8DCC7] hover:underline flex items-center gap-1"
            >
              전체 보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40] dark:hover:border-[#E8DCC7] transition-all group text-center shadow-xs"
              >
                <div className="text-sm font-bold text-[#3D5A40] dark:text-[#E8DCC7] group-hover:scale-105 transition-transform">
                  {cat.name}
                </div>
                <div className="text-[11px] text-[#6E6E6E] dark:text-[#9EAAA0] mt-1 font-medium">
                  {cat.count}개 기사
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Editorial Articles Grid */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C77B30]">
                Curated Selection
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] mt-1">
                에디터 추천 기사 & 수의학 리포트
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
                onClick={() => setSelectedCategory('veterinary')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'veterinary'
                    ? 'bg-[#3D5A40] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1D231E] text-[#6E6E6E] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40]'
                }`}
              >
                수의학
              </button>
              <button
                onClick={() => setSelectedCategory('behavior')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'behavior'
                    ? 'bg-[#3D5A40] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1D231E] text-[#6E6E6E] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40]'
                }`}
              >
                행동학
              </button>
              <button
                onClick={() => setSelectedCategory('nutrition')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === 'nutrition'
                    ? 'bg-[#3D5A40] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1D231E] text-[#6E6E6E] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40]'
                }`}
              >
                영양학
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(0, 6).map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>

        {/* Veterinary Hub Highlight Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3D5A40] to-[#2F4732] text-white p-8 sm:p-12 shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC7] text-[#3D5A40] text-xs font-bold">
              <Stethoscope className="w-4 h-4" /> ISFM 수의사 검증 프로젝트
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-editorial leading-tight">
              질환 탐색부터 최신 의학 논문까지,<br />수의학 전문 지식 Hub
            </h2>
            <p className="text-sm sm:text-base text-[#E8DCC7]/90 leading-relaxed">
              인터넷 카더라 정보로 불안해하지 마세요. 15년 차 고양이 전문 수의사진의 자문과 논문 데이터를 기초로 완성된 의학 가이드를 검색할 수 있습니다.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/veterinary"
                className="px-6 py-3 rounded-2xl bg-[#E8DCC7] text-[#3D5A40] font-extrabold text-sm hover:bg-white transition-all shadow-md"
              >
                수의학 Knowledge Hub 입장
              </Link>
              <Link
                href="/search?q=방광염"
                className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white font-bold text-sm hover:bg-white/20 transition-all border border-white/20"
              >
                인기 증상 검색하기
              </Link>
            </div>
          </div>
        </section>

        {/* Trending & Most Read Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Trending Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#ECECEC] dark:border-[#2A332C]">
              <h2 className="text-xl font-bold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#C77B30]" /> 실시간 많이 본 기사 (Trending)
              </h2>
              <span className="text-xs text-[#6E6E6E]">24시간 기준 집계</span>
            </div>

            <div className="space-y-4">
              {trendingArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="horizontal" />
              ))}
            </div>
          </div>

          {/* Sidebar Columnist & Breed Preview */}
          <div className="lg:col-span-4 space-y-8">
            {/* Featured Author Box */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C77B30] mb-4 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> 이달의 대표 칼럼니스트
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={AUTHORS[0].avatar}
                  alt={AUTHORS[0].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#3D5A40]"
                />
                <div>
                  <h4 className="font-bold text-base text-[#202020] dark:text-[#F2F5F3]">
                    {AUTHORS[0].name}
                  </h4>
                  <p className="text-xs text-[#3D5A40] dark:text-[#E8DCC7] font-semibold">
                    {AUTHORS[0].role}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#6E6E6E] dark:text-[#9EAAA0] leading-relaxed mb-4">
                "{AUTHORS[0].bio}"
              </p>
              <Link
                href={`/search?q=${encodeURIComponent(AUTHORS[0].name)}`}
                className="block text-center py-2.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] text-xs font-bold text-[#3D5A40] dark:text-[#E8DCC7] hover:bg-[#E8DCC7]/40 transition-colors"
              >
                저자의 기사 모두 읽기 ({AUTHORS[0].articlesCount}개)
              </Link>
            </div>

            {/* Cat Breed Encyclopedia Quick Box */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#3D5A40]" /> 묘종 도감
                </h4>
                <Link href="/breeds" className="text-xs text-[#3D5A40] dark:text-[#E8DCC7] font-bold hover:underline">
                  전체 도감
                </Link>
              </div>
              <div className="space-y-3">
                {BREEDS.slice(0, 2).map((b) => (
                  <Link
                    key={b.id}
                    href="/breeds"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#FAF9F7] dark:hover:bg-[#252C26] transition-colors group"
                  >
                    <img
                      src={b.image}
                      alt={b.name}
                      className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="font-bold text-xs text-[#202020] dark:text-[#F2F5F3] group-hover:underline">
                        {b.name} ({b.nameEn})
                      </div>
                      <div className="text-[11px] text-[#6E6E6E] line-clamp-1">
                        {b.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
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
              매일 아침 배달되는 리터페이퍼(LITTER PAPER) 일간 에디토리얼
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6E6E] dark:text-[#9EAAA0] leading-relaxed">
              검증된 수의학 팁, 신제품 분석, 따뜻한 입양 일기까지. 15,000명의 스마트한 집사들과 함께 읽어보세요.
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
