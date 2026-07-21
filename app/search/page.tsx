'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { storage } from '@/lib/storage';
import { CATEGORIES, TRENDING_KEYWORDS } from '@/lib/mockData';
import { Article } from '@/types';
import { Search, Filter, Sparkles, SlidersHorizontal } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(storage.getArticles());
  }, []);

  const filtered = articles.filter((a) => {
    const q = query.toLowerCase().trim();
    const matchesQuery =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.author.name.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === 'all' || a.category === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === 'all' || a.difficulty.includes(selectedDifficulty);

    return matchesQuery && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="space-y-10">
      {/* Search Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] shadow-lg">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif-editorial text-center text-[#202020] dark:text-[#F2F5F3]">
            LITTER PAPER 리터페이퍼 에디토리얼 통합 검색
          </h1>

          {/* Input Box */}
          <div className="relative">
            <Search className="absolute left-4 top-4 w-6 h-6 text-[#3D5A40] dark:text-[#E8DCC7]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="방광염, 음수량, 벤토나이트, TNR, 렉돌..."
              className="w-full pl-14 pr-4 py-4 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-base focus:outline-hidden focus:border-[#3D5A40] text-[#202020] dark:text-[#F2F5F3]"
            />
          </div>

          {/* Quick Keywords */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-[#6E6E6E] font-bold">인기 탐색어:</span>
            {TRENDING_KEYWORDS.map((kw) => (
              <button
                key={kw}
                onClick={() => setQuery(kw)}
                className="px-2.5 py-1 rounded-full bg-[#E8DCC7]/40 dark:bg-white/10 text-[#3D5A40] dark:text-[#E8DCC7] hover:bg-[#3D5A40] hover:text-white transition-colors"
              >
                #{kw}
              </button>
            ))}
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#ECECEC] dark:border-[#2A332C] text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold flex items-center gap-1 text-[#3D5A40]">
                <SlidersHorizontal className="w-4 h-4" /> 카테고리 필터:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] font-semibold text-[#202020] dark:text-[#F2F5F3]"
              >
                <option value="all">전체 카테고리</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-[#6E6E6E]">난이도:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] font-semibold text-[#202020] dark:text-[#F2F5F3]"
              >
                <option value="all">전체 난이도</option>
                <option value="입문">입문 (Easy)</option>
                <option value="중급">중급 (Medium)</option>
                <option value="전문가">전문가 (Expert)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm">
        <div className="font-bold text-[#202020] dark:text-[#F2F5F3]">
          검색 결과 <span className="text-[#C77B30]">{filtered.length}건</span>
        </div>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="text-xs text-[#6E6E6E] hover:underline"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* Results Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-[#1D231E] rounded-3xl border border-[#ECECEC] dark:border-[#2A332C] p-8">
          <p className="text-base text-[#6E6E6E]">
            "{query}"에 부합하는 에디토리얼 검색 결과가 없습니다.
          </p>
          <p className="text-xs text-[#6E6E6E] mt-2">
            다른 단어나 인기 탐색 키워드를 클릭해 보세요.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div>검색 엔진 로딩 중...</div>}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
