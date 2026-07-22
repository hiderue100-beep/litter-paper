'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import { getArticleAccessStatus, formatTimeRemaining } from '@/lib/utils';
import { Clock, ArrowUpRight, Lock, Heart, Eye } from 'lucide-react';

interface HeroStoryProps {
  article: Article;
}

export function HeroStory({ article }: HeroStoryProps) {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isFreeNow, setIsFreeNow] = useState<boolean>(true);

  useEffect(() => {
    const publishedDate = new Date(article.publishedAt);
    const freeDurationHours = article.freeAccessDurationHours || 24;
    const freeWindowEndsAt = new Date(publishedDate.getTime() + freeDurationHours * 3600 * 1000);

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((freeWindowEndsAt.getTime() - now) / 1000));
      setRemainingSeconds(diff);
      setIsFreeNow(diff > 0 && publishedDate.getTime() <= now && !article.isPremiumOnly);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [article]);

  return (
    <section className="overflow-hidden bg-white dark:bg-[#242424] border-y border-[#EAE6DF] dark:border-[#333333] text-[#333333] dark:text-[#FAF8F5] font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* Left Image Section (50%) */}
        <div className="lg:col-span-7 relative overflow-hidden min-h-[320px] lg:min-h-[500px] bg-[#111]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Top Left Category Badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="bg-[#C19A6B] text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider">
              {article.categoryName}
            </span>
            <span className="bg-black/60 backdrop-blur-md text-white/90 text-[11px] px-3 py-1 font-semibold">
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
        <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-6 bg-white dark:bg-[#242424]">
          
          {/* Top Header without WITH LP */}
          <div className="space-y-6">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between border-b border-[#EAE6DF] dark:border-[#3D3D3D] pb-4">
              <div className="flex items-center gap-2 font-extrabold tracking-widest text-sm uppercase">
                <span className="text-[#C19A6B] border-b-2 border-[#C19A6B] pb-1">
                  TODAY
                </span>
              </div>

              <span className="text-[10px] text-[#888888] dark:text-white/40 font-semibold tracking-[0.15em]">
                LITTER PAPER EDITORIAL
              </span>
            </div>

            {/* LIVE Ticking Countdown Header */}
            {isFreeNow ? (
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#666666] dark:text-[#FAF8F5]/90">
                  <Clock className="w-4 h-4 text-[#C19A6B] animate-pulse" />
                  <span>이 시간이 지나면 무료로 읽을 수 없습니다.</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-[#333333] dark:text-white tracking-wider">
                  {formatTimeRemaining(remainingSeconds)}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#C19A6B]">
                <Lock className="w-4 h-4" />
                <span>24시간 지나 유료화로 자동 전환되었습니다 (프리미엄 전용)</span>
              </div>
            )}

            <div className="h-px bg-[#EAE6DF] dark:bg-[#3D3D3D]" />
          </div>

          {/* Main Title & Subtitle in Pretendard Gothic */}
          <div className="space-y-4 my-auto">
            <Link href={`/article/${article.slug}`}>
              <h2 className="text-2xl sm:text-[2rem] font-extrabold text-[#222222] dark:text-white hover:text-[#C19A6B] transition-colors leading-[1.35] tracking-tight">
                {article.title}
              </h2>
            </Link>

            <p className="text-sm text-[#666666] dark:text-white/70 font-normal leading-7 line-clamp-3">
              "{article.subtitle}"
            </p>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-[#EAE6DF] dark:border-[#3D3D3D] flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-[#777777] dark:text-white/60 font-medium">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" /> {article.likes}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-[#C19A6B]" /> {article.views.toLocaleString()}회
              </span>
            </div>

            <Link
              href={`/article/${article.slug}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#222222] hover:bg-[#C19A6B] text-white text-xs font-bold transition-colors"
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
