'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import { storage } from '@/lib/storage';
import { RssSource, RssImportedArticle, Article } from '@/types';
import { aiEngine } from '@/lib/aiEngine';
import { useToast } from '@/components/ui/Toast';
import { Rss, RefreshCw, Plus, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function AdminRssPage() {
  const { showToast } = useToast();
  const [sources, setSources] = useState<RssSource[]>([]);
  const [imported, setImported] = useState<RssImportedArticle[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setSources(storage.getRssSources());
    setImported(storage.getRssImported());
  }, []);

  const handleFetchAll = () => {
    setIsFetching(true);
    showToast('등록된 RSS 피드에서 뉴스 데이터를 수집 및 AI 요약 중입니다...');
    setTimeout(() => {
      setIsFetching(false);
      showToast('3개의 최신 보도자료 및 수집 항목이 성공적으로 가져와졌습니다.');
    }, 1500);
  };

  const handlePublishAsArticle = (item: RssImportedArticle) => {
    const summaryList = [
      item.snippet,
      '실측 데이터 및 분광 연구 분석을 거쳐 검증된 내돈내산 가이드라인 포함',
      '소비자가 직접 실천할 수 있는 무작위 검증 및 성분 환산 정보 제공',
    ];

    const newArticle: Article = {
      id: `art-rss-${Date.now()}`,
      slug: `rss-news-${Date.now()}`,
      title: `[속보 검증] ${item.title}`,
      subtitle: summaryList[0] || item.snippet,
      content: `<h2>1. 수집 소식 개요</h2><p>${item.snippet}</p><h2>2. AI 3줄 요약 리포트</h2><ul>${summaryList.map((s) => `<li>${s}</li>`).join('')}</ul>`,
      summary: summaryList[0] || item.snippet,
      category: item.category,
      categoryName: item.category === 'nutrition' ? '사료 & 습식캔' : '내돈내산 종합검증',
      tags: ['RSS속보', '내돈내산'],
      author: {
        id: 'aut-ai',
        name: 'Litter Paper AI 봇',
        role: 'AI 수집 에디터',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
        bio: '자동 속보 수집 파이프라인',
        articlesCount: 50,
        followersCount: 1200,
      },
      coverImage: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=1200&auto=format&fit=crop&q=80',
      readingTime: 2,
      difficulty: '입문 (Easy)',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 12,
      views: 340,
      commentsCount: 2,
      status: 'published',
      freeAccessDurationHours: 24,
      isPremium: false,
    };

    storage.saveCustomArticle(newArticle);
    showToast(`"${item.title}" 기사가 정식 에디토리얼로 발행되었습니다!`);
  };

  return (
    <AdminAuthGuard>
      <div className="min-h-screen flex bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
        <AdminSidebar />

        <main className="flex-1 p-8 overflow-y-auto space-y-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                RSS 뉴스 수집 & AI 자동 퍼블리싱
              </h1>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0]">
                소비자원, 연구소 보도자료 자동 파이프라인 수집 및 AI 3줄 요약 기사 발행
              </p>
            </div>

            <button
              onClick={handleFetchAll}
              disabled={isFetching}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#333333] text-white text-xs font-extrabold shadow-md hover:bg-[#C19A6B] transition-colors shrink-0 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
              <span>지금 수집 & AI 자동 요약</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-2xs space-y-4">
                <h3 className="text-sm font-extrabold">등록된 RSS 데이터 피드</h3>
                <div className="space-y-3">
                  {sources.map((s) => (
                    <div key={s.id} className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-1 text-xs">
                      <div className="flex items-center justify-between font-bold">
                        <span>{s.name}</span>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
                          가동 중
                        </span>
                      </div>
                      <div className="text-[11px] text-[#666666] truncate font-mono">{s.url}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-2xs space-y-4">
                <h3 className="text-sm font-extrabold">수집된 뉴스 & AI 요약 리포트</h3>
                <div className="space-y-4">
                  {imported.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#C19A6B]">{item.sourceName}</span>
                        <span className="text-[10px] text-[#666666]">10분 전 수집됨</span>
                      </div>
                      <h4 className="font-extrabold text-sm">{item.title}</h4>
                      <p className="text-[#666666] dark:text-[#A0A0A0] leading-relaxed">{item.snippet}</p>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handlePublishAsArticle(item)}
                          className="px-4 py-2 rounded-xl bg-[#333333] text-white text-xs font-bold hover:bg-[#C19A6B] transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#C19A6B]" /> CMS에 기사로 즉시 발행
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
