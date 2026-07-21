'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import { formatDate, getArticleAccessStatus } from '@/lib/utils';
import { FreeAccessCountdown } from './FreeAccessCountdown';
import { Heart, Eye, MessageSquare, Sparkles, Clock, Lock, ShieldCheck, Crown } from 'lucide-react';

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
        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF9F7] dark:hover:bg-[#252C26] transition-colors group"
      >
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#3D5A40] dark:text-[#E8DCC7] mb-0.5">
            <span>{article.categoryName}</span>
            {access.isLocked && <Lock className="w-3 h-3 text-[#C77B30]" />}
          </div>
          <h4 className="text-xs font-bold text-[#202020] dark:text-[#F2F5F3] group-hover:underline line-clamp-2 leading-snug">
            {article.title}
          </h4>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="group rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] overflow-hidden hover:border-[#3D5A40] dark:hover:border-[#E8DCC7] transition-all shadow-xs hover:shadow-lg flex flex-col sm:flex-row">
        <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden shrink-0">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            <span className="bg-[#3D5A40] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {article.categoryName}
            </span>
            {access.isFreeNow && (
              <FreeAccessCountdown freeWindowEndsAt={access.freeWindowEndsAt} compact />
            )}
            {access.isLocked && (
              <span className="bg-[#1D231E]/90 backdrop-blur-md text-[#E8DCC7] text-[10px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/10">
                <Lock className="w-3 h-3 text-[#C77B30]" /> 프리미엄 아카이브
              </span>
            )}
          </div>
        </div>

        <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#6E6E6E]">
              <span>{article.author.name}</span>
              <span>•</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <span>{article.readingTime}분 읽기</span>
            </div>
            <Link href={`/article/${article.slug}`}>
              <h3 className="text-lg font-bold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] group-hover:text-[#3D5A40] dark:group-hover:text-[#E8DCC7] transition-colors leading-snug">
                {article.title}
              </h3>
            </Link>
            <p className="text-xs text-[#6E6E6E] dark:text-[#9EAAA0] line-clamp-2 leading-relaxed">
              {article.summary}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#ECECEC] dark:border-[#2A332C] text-xs text-[#6E6E6E]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-500" /> {article.likes}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#3D5A40]" /> {article.views.toLocaleString()}
              </span>
            </div>
            <Link
              href={`/article/${article.slug}`}
              className="font-bold text-[#3D5A40] dark:text-[#E8DCC7] hover:underline"
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
    <div className="group rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] overflow-hidden hover:border-[#3D5A40] dark:hover:border-[#E8DCC7] transition-all shadow-xs hover:shadow-xl flex flex-col justify-between">
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
            <span className="bg-[#3D5A40] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {article.categoryName}
            </span>
            {access.isFreeNow && (
              <FreeAccessCountdown freeWindowEndsAt={access.freeWindowEndsAt} compact />
            )}
            {access.isLocked && (
              <span className="bg-black/70 backdrop-blur-md text-[#E8DCC7] text-[10px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1 border border-white/20">
                <Lock className="w-3 h-3 text-[#C77B30]" /> 프리미엄 아카이브
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
            {article.readingTime}분 읽기 • 난이도: {article.difficulty}
          </div>
        </div>

        <div className="p-6 space-y-3">
          <Link href={`/article/${article.slug}`}>
            <h3 className="text-lg font-bold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] group-hover:text-[#3D5A40] dark:group-hover:text-[#E8DCC7] transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>
          </Link>
          <p className="text-xs text-[#6E6E6E] dark:text-[#9EAAA0] line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 border-t border-[#ECECEC]/60 dark:border-[#2A332C]/60 flex items-center justify-between text-xs text-[#6E6E6E]">
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
