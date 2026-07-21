'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { CATEGORIES } from '@/lib/mockData';
import { storage } from '@/lib/storage';
import { Article, CategorySlug } from '@/types';
import { Sparkles, BookOpen } from 'lucide-react';

export default function CategoryArchivePage() {
  const params = useParams();
  const slug = params?.slug as CategorySlug;

  const [articles, setArticles] = useState<Article[]>([]);
  const categoryInfo = CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[0];

  useEffect(() => {
    const all = storage.getArticles();
    setArticles(all.filter((a) => a.category === slug || slug === 'news'));
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Category Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#3D5A40] to-[#2F4732] text-white shadow-xl">
          <div className="max-w-2xl space-y-3">
            <span className="bg-[#E8DCC7] text-[#3D5A40] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {categoryInfo.nameEn} 에디토리얼
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-editorial">
              {categoryInfo.name}
            </h1>
            <p className="text-sm sm:text-base text-[#E8DCC7]/90 leading-relaxed">
              {categoryInfo.description}
            </p>
            <div className="text-xs text-[#E8DCC7]/80 pt-2 font-medium">
              총 {articles.length}개의 정교한 가이드 및 기사 발행됨
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#6E6E6E]">
            아직 등록된 기사가 없습니다. 곧 업로드 될 예정입니다.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
