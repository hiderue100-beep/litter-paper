'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import { getArticleAccessStatus } from '@/lib/utils';
import { Clock, ArrowUpRight, Lock, Heart, Eye } from 'lucide-react';

interface HeroStoryProps {
  article: Article;
}

export function HeroStory({ article }: HeroStoryProps) {
  const access = getArticleAccessStatus(article);
  const [activeTab, setActiveTab] = useState<'today' | 'premium'>('today');

  return (
    <section className="rounded-3xl overflow-hidden bg-[#242424] border border-[#333333] shadow-2xl text-[#FAF8F5] font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        
        {/* Left Image Section (50%) */}
        <div className="lg:col-span-6 relative overflow-hidden min-h-[320px] lg:min-h-[520px] bg-[#111]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Top Left Category Badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="bg-[#C19A6B] text-white text-xs font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-md">
              {article.categoryName}
            </span>
            <span className="bg-black/60 backdrop-blur-md text-white/90 text-xs px-3 py-1 rounded-md border border-white/20">
              100% 내돈내산 검증
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white/80 font-medium">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-7 h-7 rounded-full object-cover border border-[#C19A6B]"
              />
              <span className="font-bold">{article.author.name}</span>
            </div>
            <span>{article.readingTime}분 읽기 리포트</span>
          </div>
        </div>

        {/* Right LongBlack-style Dark Editorial Container (50%) */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6 bg-[#242424]">
          
          {/* Top Tabs & Live Countdown Header */}
          <div className="space-y-6">
            {/* Top Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-[#3D3D3D] pb-4">
              <div className="flex items-center gap-6 font-extrabold tracking-widest text-sm uppercase">
                <button
                  onClick={() => setActiveTab('today')}
                  className={`transition-colors flex items-center gap-1.5 pb-1 border-b-2 ${
                    activeTab === 'today'
                      ? 'text-[#C19A6B] border-[#C19A6B]'
                      : 'text-white/40 border-transparent hover:text-white'
                  }`}
                >
                  TODAY
                </button>
                <button
                  onClick={() => setActiveTab('premium')}
                  className={`transition-colors flex items-center gap-1.5 pb-1 border-b-2 ${
                    activeTab === 'premium'
                      ? 'text-[#C19A6B] border-[#C19A6B]'
                      : 'text-white/40 border-transparent hover:text-white'
                  }`}
                >
                  WITH LP
                </button>
              </div>

              <span className="text-[11px] text-white/40 font-mono tracking-wider">
                LITTER PAPER EDITORIAL
              </span>
            </div>

            {/* Ticking Countdown Header */}
            {access.isFreeNow ? (
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#FAF8F5]/90">
                  <Clock className="w-4 h-4 text-[#C19A6B] animate-pulse" />
                  <span>이 시간이 지나면 무료로 읽을 수 없습니다.</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-widest">
                  {access.formattedCountdown}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-[#C19A6B]">
                <Lock className="w-4 h-4" />
                <span>프리미엄 아카이브 전용 콘텐츠</span>
              </div>
            )}

            <div className="h-px bg-[#3D3D3D]" />
          </div>

          {/* Main Title & Subtitle in Pretendard Gothic */}
          <div className="space-y-4 my-auto">
            <Link href={`/article/${article.slug}`}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white hover:text-[#C19A6B] transition-colors leading-[1.3] tracking-tight">
                {article.title}
              </h2>
            </Link>

            <p className="text-sm sm:text-base text-white/70 font-normal leading-relaxed line-clamp-3">
              "{article.subtitle}"
            </p>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-[#3D3D3D] flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-white/60 font-medium">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" /> {article.likes}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-[#C19A6B]" /> {article.views.toLocaleString()}회
              </span>
            </div>

            <Link
              href={`/article/${article.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#C19A6B] hover:bg-[#a88354] text-white text-xs font-extrabold transition-all shadow-lg"
            >
              <span>지금 리뷰 읽기</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
