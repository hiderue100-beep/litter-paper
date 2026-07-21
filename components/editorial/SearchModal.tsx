'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CATEGORIES, TRENDING_KEYWORDS } from '@/lib/mockData';
import { storage } from '@/lib/storage';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const allArticles = storage.getArticles();
    const q = query.toLowerCase().trim();
    const filtered = allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.categoryName.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.author.name.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 5));
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleQuickKeyword = (kw: string) => {
    setQuery(kw);
    onClose();
    router.push(`/search?q=${encodeURIComponent(kw)}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-[#FAF9F7] dark:bg-[#1D231E] rounded-2xl shadow-2xl border border-[#ECECEC] dark:border-[#2A332C] overflow-hidden"
        >
          {/* Search Input Header */}
          <div className="p-4 sm:p-6 border-b border-[#ECECEC] dark:border-[#2A332C] flex items-center gap-3">
            <Search className="w-6 h-6 text-[#3D5A40] dark:text-[#E8DCC7] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="고양이 방광염, 습식캔, TNR, 렉돌 검색..."
              autoFocus
              className="w-full bg-transparent text-lg text-[#202020] dark:text-[#F2F5F3] focus:outline-hidden placeholder:text-[#6E6E6E]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-[#6E6E6E] hover:text-[#202020] dark:hover:text-[#F2F5F3]"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-[#6E6E6E] hover:text-[#202020] dark:hover:text-[#F2F5F3] bg-[#E8DCC7]/40 dark:bg-white/10 rounded-lg"
            >
              ESC
            </button>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {/* Live Search Results */}
            {query.trim() !== '' && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6E6E6E] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#C77B30]" />
                  검색 결과 ({results.length}건)
                </h3>
                {results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((art) => (
                      <Link
                        key={art.id}
                        href={`/article/${art.slug}`}
                        onClick={onClose}
                        className="block p-3 rounded-xl hover:bg-white dark:hover:bg-[#252C26] transition-colors border border-transparent hover:border-[#ECECEC] dark:hover:border-[#2A332C]"
                      >
                        <div className="flex items-center justify-between text-xs text-[#6E6E6E] mb-1">
                          <span className="font-semibold text-[#3D5A40] dark:text-[#E8DCC7]">
                            {art.categoryName}
                          </span>
                          <span>{formatDate(art.publishedAt)}</span>
                        </div>
                        <h4 className="text-base font-bold text-[#202020] dark:text-[#F2F5F3] line-clamp-1">
                          {art.title}
                        </h4>
                        <p className="text-xs text-[#6E6E6E] line-clamp-1 mt-1">
                          {art.summary}
                        </p>
                      </Link>
                    ))}
                    {results.length >= 5 && (
                      <button
                        onClick={() => {
                          onClose();
                          router.push(`/search?q=${encodeURIComponent(query)}`);
                        }}
                        className="w-full py-2 text-center text-xs font-semibold text-[#3D5A40] dark:text-[#E8DCC7] hover:underline flex items-center justify-center gap-1"
                      >
                        전체 검색 결과 보기 <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="py-8 text-center text-[#6E6E6E] text-sm">
                    "{query}"에 관한 검색 결과가 없습니다.
                  </div>
                )}
              </div>
            )}

            {/* Trending Keywords */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6E6E6E] mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#C77B30]" />
                실시간 인기 탐색 키워드
              </h3>
              <div className="flex flex-wrap gap-2">
                {TRENDING_KEYWORDS.map((kw, idx) => (
                  <button
                    key={kw}
                    onClick={() => handleQuickKeyword(kw)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40] dark:hover:border-[#E8DCC7] text-[#202020] dark:text-[#F2F5F3] transition-colors"
                  >
                    <span className="text-[#C77B30] font-bold">#{idx + 1}</span>
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Categories */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6E6E6E] mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#3D5A40] dark:text-[#E8DCC7]" />
                주요 에디토리얼 분야
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="p-3 rounded-xl bg-white dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40] dark:hover:border-[#E8DCC7] transition-all group"
                  >
                    <div className="text-xs font-bold text-[#3D5A40] dark:text-[#E8DCC7] group-hover:underline">
                      {cat.name}
                    </div>
                    <div className="text-[11px] text-[#6E6E6E] line-clamp-1 mt-0.5">
                      {cat.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
