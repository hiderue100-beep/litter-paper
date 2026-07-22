'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import { formatDate, getArticleAccessStatus } from '@/lib/utils';
import { FreeAccessCountdown } from './FreeAccessCountdown';
import { Heart, Eye, Lock } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'standard' | 'horizontal' | 'compact';
  isUserPremium?: boolean;
}

export function ArticleCard({ article, variant = 'standard', isUserPremium = false }: ArticleCardProps) {
  const access = getArticleAccessStatus(article, isUserPremium);

  if (variant === 'compact') {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#242424] transition-colors group font-sans"
      >
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#C19A6B] mb-0.5">
            <span>{article.categoryName}</span>
            {access.isLocked && <Lock className="w-3 h-3 text-[#C19A6B]" />}
          </div>
          <h4 className="text-xs font-bold text-[#333333] dark:text-[#FAF8F5] group-hover:underline line-clamp-2 leading-snug">
            {article.title}
          </h4>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="group bg-white dark:bg-[#242424] border-y border-[#EAE6DF] dark:border-[#333333] overflow-hidden hover:border-[#C19A6B] dark:hover:border-[#C19A6B] transition-colors flex flex-col sm:flex-row font-sans">
        <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden shrink-0">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            <span className="bg-[#333333] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
              {article.categoryName}
            </span>
            {access.isFreeNow && (
              <FreeAccessCountdown freeWindowEndsAt={access.freeWindowEndsAt} compact />
            )}
            {access.isLocked && (
              <span className="bg-black/80 backdrop-blur-md text-[#FAF8F5] text-[10px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/20">
                <Lock className="w-3 h-3 text-[#C19A6B]" /> 프리미엄 아카이브
              </span>
            )}
          </div>
        </div>

        <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#666666]">
              <span>{article.author.name}</span>
              <span>•</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <span>{article.readingTime}분 읽기</span>
            </div>
            <Link href={`/article/${article.slug}`}>
              <h3 className="text-lg font-extrabold text-[#333333] dark:text-[#FAF8F5] group-hover:text-[#C19A6B] transition-colors leading-snug">
                {article.title}
              </h3>
            </Link>
            <p className="text-xs text-[#666666] dark:text-[#A0A0A0] line-clamp-2 leading-relaxed">
              {article.summary}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#EAE6DF] dark:border-[#333333] text-xs text-[#666666]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-500" /> {article.likes}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#C19A6B]" /> {article.views.toLocaleString()}
              </span>
            </div>
            <Link
              href={`/article/${article.slug}`}
              className="font-bold text-[#C19A6B] hover:underline"
            >
              기사 읽기 →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Standard vertical card
  return (
      <div className="group bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] overflow-hidden hover:border-[#C19A6B] dark:hover:border-[#C19A6B] transition-colors flex flex-col justify-between font-sans">
      <div>
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="bg-[#333333] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
              {article.categoryName}
            </span>
            {access.isFreeNow && (
              <FreeAccessCountdown freeWindowEndsAt={access.freeWindowEndsAt} compact />
            )}
            {access.isLocked && (
              <span className="bg-black/80 backdrop-blur-md text-[#FAF8F5] text-[10px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/20">
                <Lock className="w-3 h-3 text-[#C19A6B]" /> 프리미엄 아카이브
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
            {article.readingTime}분 읽기 • 난이도: {article.difficulty}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <Link href={`/article/${article.slug}`}>
            <h3 className="text-lg font-extrabold text-[#333333] dark:text-[#FAF8F5] group-hover:text-[#C19A6B] transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>
          </Link>
          <p className="text-xs text-[#666666] dark:text-[#A0A0A0] line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-[#EAE6DF]/60 dark:border-[#333333]/60 flex items-center justify-between text-xs text-[#666666]">
        <div className="flex items-center gap-2">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span>{article.author.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-red-500" /> {article.likes}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {article.views.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
