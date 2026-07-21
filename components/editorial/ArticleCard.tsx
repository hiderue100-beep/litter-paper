'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, Clock, Eye, Heart, Sparkles, Award } from 'lucide-react';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';
import { storage } from '@/lib/storage';
import { useToast } from '../ui/Toast';

interface ArticleCardProps {
  article: Article;
  variant?: 'standard' | 'horizontal' | 'compact' | 'featured';
}

export function ArticleCard({ article, variant = 'standard' }: ArticleCardProps) {
  const { showToast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(storage.isBookmarked(article.id));
  }, [article.id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = storage.toggleBookmark(article.id);
    const nowBookmarked = updated.includes(article.id);
    setIsBookmarked(nowBookmarked);
    showToast(
      nowBookmarked ? '보관함에 기사가 저장되었습니다.' : '보관함에서 삭제되었습니다.',
      nowBookmarked ? 'success' : 'info'
    );
  };

  if (variant === 'horizontal') {
    return (
      <div className="group flex flex-col sm:flex-row gap-5 p-4 rounded-2xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40] dark:hover:border-[#E8DCC7] transition-all shadow-xs hover:shadow-md">
        <Link
          href={`/article/${article.slug}`}
          className="relative w-full sm:w-48 h-36 shrink-0 rounded-xl overflow-hidden"
        >
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-[#3D5A40] dark:text-[#E8DCC7]">
                {article.categoryName}
              </span>
              <span className="text-[#6E6E6E]">{formatDate(article.publishedAt)}</span>
            </div>
            <Link href={`/article/${article.slug}`}>
              <h3 className="text-base sm:text-lg font-bold text-[#202020] dark:text-[#F2F5F3] group-hover:text-[#3D5A40] dark:group-hover:text-[#E8DCC7] transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
            <p className="text-xs text-[#6E6E6E] dark:text-[#9EAAA0] line-clamp-2 mt-1.5">
              {article.summary}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#ECECEC] dark:border-[#2A332C] text-xs text-[#6E6E6E]">
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
                <Clock className="w-3.5 h-3.5" /> {article.readingTime}분
              </span>
              <button
                onClick={handleBookmark}
                className={`p-1 rounded-md ${
                  isBookmarked ? 'text-[#3D5A40] dark:text-[#E8DCC7]' : 'text-[#6E6E6E] hover:text-[#202020]'
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="group flex items-start gap-3 py-3 border-b border-[#ECECEC] dark:border-[#2A332C] last:border-none">
        <Link href={`/article/${article.slug}`} className="shrink-0 w-16 h-16 rounded-lg overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold text-[#3D5A40] dark:text-[#E8DCC7]">
            {article.categoryName}
          </div>
          <Link href={`/article/${article.slug}`}>
            <h4 className="text-xs sm:text-sm font-bold text-[#202020] dark:text-[#F2F5F3] line-clamp-2 group-hover:underline">
              {article.title}
            </h4>
          </Link>
          <div className="text-[10px] text-[#6E6E6E] mt-1 flex items-center gap-2">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readingTime}분 읽기</span>
          </div>
        </div>
      </div>
    );
  }

  // Standard Card
  return (
    <div className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] overflow-hidden hover:border-[#3D5A40] dark:hover:border-[#E8DCC7] transition-all shadow-xs hover:shadow-lg">
      <div>
        {/* Image */}
        <Link href={`/article/${article.slug}`} className="relative block h-48 w-full overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-[#3D5A40] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            {article.categoryName}
          </span>
          {article.isEditorsPick && (
            <span className="absolute top-3 right-3 bg-[#C77B30] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <Award className="w-3 h-3" /> Pick
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-[#6E6E6E] mb-2">
            <span>난이도: {article.difficulty}</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          <Link href={`/article/${article.slug}`}>
            <h3 className="text-lg font-bold text-[#202020] dark:text-[#F2F5F3] group-hover:text-[#3D5A40] dark:group-hover:text-[#E8DCC7] transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs text-[#6E6E6E] dark:text-[#9EAAA0] line-clamp-2 mt-2.5 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      {/* Author & Footer */}
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-[#ECECEC] dark:border-[#2A332C] text-xs text-[#6E6E6E]">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover border border-[#3D5A40]"
            />
            <span className="font-medium text-[#202020] dark:text-[#F2F5F3]">{article.author.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readingTime}분
            </span>
            <button
              onClick={handleBookmark}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked ? 'bg-[#3D5A40] text-white' : 'hover:bg-[#FAF9F7] text-[#6E6E6E]'
              }`}
              aria-label="북마크"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
