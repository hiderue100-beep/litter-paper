'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Clock, Sparkles, ChevronRight, Eye, Heart, Award } from 'lucide-react';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';
import { storage } from '@/lib/storage';
import { useToast } from '../ui/Toast';
import { AiSummaryModal } from './AiSummaryModal';

interface HeroStoryProps {
  article: Article;
}

export function HeroStory({ article }: HeroStoryProps) {
  const { showToast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  useEffect(() => {
    setIsBookmarked(storage.isBookmarked(article.id));
  }, [article.id]);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = storage.toggleBookmark(article.id);
    const bookmarkedNow = updated.includes(article.id);
    setIsBookmarked(bookmarkedNow);
    showToast(
      bookmarkedNow ? '기사가 내 보관함에 저장되었습니다.' : '보관함에서 삭제되었습니다.',
      bookmarkedNow ? 'success' : 'info'
    );
  };

  return (
    <>
      <section className="relative overflow-hidden bg-white dark:bg-[#1D231E] rounded-3xl border border-[#ECECEC] dark:border-[#2A332C] shadow-xl transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Content Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Category & Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-[#3D5A40] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {article.categoryName}
                </span>
                <span className="bg-[#E8DCC7] text-[#3D5A40] dark:bg-white/10 dark:text-[#E8DCC7] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#C77B30]" /> Today's Lead Story
                </span>
                <span className="text-xs text-[#6E6E6E] dark:text-[#9EAAA0] font-medium ml-auto sm:ml-0">
                  난이도: {article.difficulty}
                </span>
              </div>

              {/* Title */}
              <Link href={`/article/${article.slug}`}>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] leading-[1.25] tracking-tight hover:text-[#3D5A40] dark:hover:text-[#E8DCC7] transition-colors mb-4">
                  {article.title}
                </h1>
              </Link>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#6E6E6E] dark:text-[#9EAAA0] line-clamp-3 leading-relaxed mb-6 font-normal">
                {article.subtitle}
              </p>
            </div>

            {/* Bottom Meta & Action Buttons */}
            <div>
              <div className="flex items-center justify-between pt-6 border-t border-[#ECECEC] dark:border-[#2A332C] text-xs text-[#6E6E6E]">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#3D5A40]"
                  />
                  <div>
                    <div className="font-bold text-[#202020] dark:text-[#F2F5F3] text-sm">
                      {article.author.name}
                    </div>
                    <div className="text-[11px] text-[#6E6E6E]">
                      {formatDate(article.publishedAt)} • {article.readingTime}분 읽기
                    </div>
                  </div>
                </div>

                {/* Interactive Buttons */}
                <div className="flex items-center gap-2">
                  {/* AI Summary Trigger */}
                  <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] text-[#3D5A40] dark:text-[#E8DCC7] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40] text-xs font-semibold transition-all shadow-2xs"
                  >
                    <Sparkles className="w-4 h-4 text-[#C77B30]" />
                    AI 3줄 요약
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={handleBookmarkToggle}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isBookmarked
                        ? 'bg-[#3D5A40] text-white border-[#3D5A40]'
                        : 'bg-white dark:bg-[#252C26] text-[#6E6E6E] border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40]'
                    }`}
                    aria-label="북마크"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image Column */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden group">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* AI Summary Modal */}
      <AiSummaryModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        article={article}
      />
    </>
  );
}
