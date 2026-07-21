'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { storage } from '@/lib/storage';
import { Article } from '@/types';
import { Bookmark, Clock, Trash2, BookOpen, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

export default function BookmarksPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history'>('bookmarks');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);
  const [historyItems, setHistoryItems] = useState<{ articleId: string; title: string; slug: string; categoryName: string; readAt: string }[]>([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const all = storage.getArticles();
    const bookmarkIds = storage.getBookmarks();
    setBookmarkedArticles(all.filter((a) => bookmarkIds.includes(a.id)));
    setHistoryItems(storage.getHistory());
  };

  const handleClearHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('catnote_history');
      setHistoryItems([]);
      showToast('읽기 히스토리가 삭제되었습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C77B30]">
              Personal Library
            </span>
            <h1 className="text-3xl font-extrabold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] mt-1">
              내 보관함 & 읽기 히스토리
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 bg-[#FAF9F7] dark:bg-[#252C26] p-1.5 rounded-2xl border border-[#ECECEC] dark:border-[#2A332C]">
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'bookmarks'
                  ? 'bg-[#3D5A40] text-white shadow-xs'
                  : 'text-[#6E6E6E] hover:text-[#202020]'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              보관함 기사 ({bookmarkedArticles.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'history'
                  ? 'bg-[#3D5A40] text-white shadow-xs'
                  : 'text-[#6E6E6E] hover:text-[#202020]'
              }`}
            >
              <Clock className="w-4 h-4" />
              읽은 기록 ({historyItems.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'bookmarks' ? (
          bookmarkedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedArticles.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-[#1D231E] rounded-3xl border border-[#ECECEC] dark:border-[#2A332C] p-8">
              <Bookmark className="w-12 h-12 text-[#6E6E6E] mx-auto mb-3 opacity-40" />
              <h3 className="text-lg font-bold text-[#202020] dark:text-[#F2F5F3]">
                보관함이 비어 있습니다.
              </h3>
              <p className="text-xs text-[#6E6E6E] mt-1 mb-4">
                마음에 드는 수의학 가이드나 기사를 읽고 북마크 버튼을 눌러보세요.
              </p>
              <Link
                href="/"
                className="inline-block px-5 py-2.5 rounded-xl bg-[#3D5A40] text-white text-xs font-bold"
              >
                에디토리얼 기사 탐색하기
              </Link>
            </div>
          )
        ) : (
          <div className="bg-white dark:bg-[#1D231E] p-6 sm:p-8 rounded-3xl border border-[#ECECEC] dark:border-[#2A332C] space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#ECECEC] dark:border-[#2A332C]">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C77B30]" /> 최근 읽은 기사 히스토리
              </h3>
              {historyItems.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-1 text-xs text-red-600 hover:underline"
                >
                  <Trash2 className="w-3.5 h-3.5" /> 기록 전체 삭제
                </button>
              )}
            </div>

            {historyItems.length > 0 ? (
              <div className="divide-y divide-[#ECECEC] dark:divide-[#2A332C]">
                {historyItems.map((h, i) => (
                  <div key={i} className="py-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#3D5A40] dark:text-[#E8DCC7]">
                        {h.categoryName}
                      </span>
                      <Link
                        href={`/article/${h.slug}`}
                        className="block font-bold text-sm text-[#202020] dark:text-[#F2F5F3] hover:underline mt-0.5"
                      >
                        {h.title}
                      </Link>
                    </div>
                    <span className="text-xs text-[#6E6E6E]">
                      {formatDate(h.readAt)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#6E6E6E]">
                최근 열람한 기사 기록이 없습니다.
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
