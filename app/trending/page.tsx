'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { storage } from '@/lib/storage';
import { Article } from '@/types';
import { Flame, TrendingUp, Sparkles, Award } from 'lucide-react';

export default function TrendingPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const all = storage.getArticles();
    // Sort by views & likes for trending
    const sorted = [...all].sort((a, b) => b.views + b.likes * 10 - (a.views + a.likes * 10));
    setArticles(sorted);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-[#333333] text-[#C19A6B] flex items-center justify-center mx-auto shadow-md font-extrabold text-2xl border border-[#C19A6B]">
            <Flame className="w-8 h-8 text-[#C19A6B]" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C19A6B]/20 text-[#C19A6B] text-xs font-extrabold">
            <TrendingUp className="w-4 h-4" /> 요즘 화제 & 이슈 리포트
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            집사들 사이에서 가장 뜨거운 이슈 기사 모음
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
            실시간 최고 조회수와 독자들의 활발한 토론이 이어지고 있는 내돈내산 검증 화제작을 확인하세요.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
