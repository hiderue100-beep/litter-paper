'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { storage } from '@/lib/storage';
import { RssImportedArticle, RssSource, CategorySlug, Article } from '@/types';
import { Rss, RefreshCw, Plus, Sparkles, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { CATEGORIES, AUTHORS } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

export default function AdminRssPage() {
  const { showToast } = useToast();
  const [sources, setSources] = useState<RssSource[]>([]);
  const [importedItems, setImportedItems] = useState<RssImportedArticle[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // New source state
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [newSourceCategory, setNewSourceCategory] = useState<CategorySlug>('news');

  useEffect(() => {
    setSources(storage.getRssSources());
    setImportedItems(storage.getRssImported());
  }, []);

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceName.trim() || !newSourceUrl.trim()) return;

    const newSource: RssSource = {
      id: `rss-${Date.now()}`,
      name: newSourceName.trim(),
      url: newSourceUrl.trim(),
      category: newSourceCategory,
      active: true,
      lastFetchedAt: new Date().toISOString(),
      itemsCount: 0,
    };

    const updated = storage.addRssSource(newSource);
    setSources(updated);
    setNewSourceName('');
    setNewSourceUrl('');
    showToast('새 RSS 소스가 등록되었습니다.');
  };

  const handleRunRssImport = () => {
    setIsFetching(true);
    showToast('전체 RSS 수집 소스에서 피드를 동기화 중입니다...');

    setTimeout(() => {
      const simulatedNews: RssImportedArticle[] = [
        {
          id: `rss-item-${Date.now()}-1`,
          sourceName: '농림축산검역본부 동물보호관리',
          title: '2026 하반기 유기묘 보호 시설 냉난방 지원 예산 확정 공고',
          originalUrl: 'https://animal.go.kr/news/2026-summer',
          snippet: '전국 시도 동물보호센터 내 무더위 대비 냉방 장비 확충 및 유기묘 수의 파견 사업 예산 확정...',
          category: 'news',
          status: 'auto_summarized',
          fetchedAt: new Date().toISOString(),
        },
        {
          id: `rss-item-${Date.now()}-2`,
          sourceName: '한국고양이수의사회 (KSFM)',
          title: '고양이 특발성 방광염(FIC) 치료용 신규 식이 유효성 데이터 발표',
          originalUrl: 'https://ksfm.or.kr/journal/2026-fic',
          snippet: 'Feline Medicine 저널에 발표된 최신 임상 시험 결과에 따르면 L-테아닌 첨가 습식 사료군의 스트레스 반응 지수가 40% 감소...',
          category: 'veterinary',
          status: 'imported',
          fetchedAt: new Date().toISOString(),
        },
      ];

      const updated = storage.addRssImported(simulatedNews);
      setImportedItems(updated);
      setIsFetching(false);
      showToast('AI 자동 RSS 수집 및 카테고리 분류가 완료되었습니다!');
    }, 1500);
  };

  const handlePublishToCms = (item: RssImportedArticle) => {
    const catObj = CATEGORIES.find((c) => c.slug === item.category) || CATEGORIES[0];
    const newArticle: Article = {
      id: `art-rss-${Date.now()}`,
      slug: `rss-imported-${Date.now()}`,
      title: item.title,
      subtitle: `${item.sourceName} 원문 뉴스 기반 AI 정리 브리핑`,
      content: `<h2>1. 뉴스 요약</h2><p>${item.snippet}</p><p>출처: <a href="${item.originalUrl}" target="_blank" rel="noopener noreferrer">${item.sourceName} 원문 읽기</a></p>`,
      summary: item.snippet,
      category: item.category,
      categoryName: catObj.name,
      tags: ['RSS속보', '고양이뉴스', item.category],
      author: AUTHORS[2],
      coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&auto=format&fit=crop&q=80',
      readingTime: 3,
      difficulty: '입문 (Easy)',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      views: 50,
      commentsCount: 0,
      rssImported: true,
      aiGenerated: true,
    };

    storage.saveCustomArticle(newArticle);
    showToast(`"${item.title}" 기사가 라이브 CMS에 게시되었습니다.`);
  };

  return (
    <div className="min-h-screen flex bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-editorial">
              RSS 피드 수집 & AI 뉴스 요약기
            </h1>
            <p className="text-xs text-[#6E6E6E]">
              외부 고양이 뉴스 및 수의학 저널 RSS를 자동 동기화하여 AI 요약본을 생성합니다.
            </p>
          </div>

          <button
            onClick={handleRunRssImport}
            disabled={isFetching}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3D5A40] text-white text-xs font-bold shadow-md hover:bg-[#2F4732] disabled:opacity-50 transition-colors shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            {isFetching ? '피드 동기화 중...' : '지금 RSS 동기화 실행'}
          </button>
        </div>

        {/* RSS Sources Box & Add Source */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active RSS Feeds */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-4 shadow-sm">
            <h3 className="text-base font-bold font-serif-editorial flex items-center gap-2">
              <Rss className="w-5 h-5 text-[#C77B30]" /> 등록된 RSS 수집 소스 ({sources.length}개)
            </h3>
            <div className="space-y-3">
              {sources.map((src) => (
                <div
                  key={src.id}
                  className="p-4 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#202020] dark:text-[#F2F5F3]">
                      {src.name}
                    </div>
                    <div className="text-[#6E6E6E] text-[11px] truncate max-w-xs mt-0.5">
                      {src.url}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#3D5A40] text-white font-bold text-[10px]">
                    {src.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Add New RSS Source */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-4 shadow-sm">
            <h3 className="text-base font-bold font-serif-editorial flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#3D5A40]" /> 신규 RSS 소스 추가
            </h3>
            <form onSubmit={handleAddSource} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#6E6E6E] mb-1">매체 / 서기관 이름</label>
                <input
                  type="text"
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  placeholder="예: 미국고양이의학저널"
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#6E6E6E] mb-1">RSS XML Feed URL</label>
                <input
                  type="url"
                  value={newSourceUrl}
                  onChange={(e) => setNewSourceUrl(e.target.value)}
                  placeholder="https://example.com/rss.xml"
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#6E6E6E] mb-1">자동 매핑 카테고리</label>
                <select
                  value={newSourceCategory}
                  onChange={(e) => setNewSourceCategory(e.target.value as CategorySlug)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] font-bold"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#3D5A40] text-white font-bold hover:bg-[#2F4732] transition-colors"
              >
                RSS 소스 추가 등록
              </button>
            </form>
          </div>
        </div>

        {/* Imported Feed Items Table */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-4 shadow-sm">
          <h3 className="text-lg font-bold font-serif-editorial flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C77B30]" /> AI 자동 요약 수집 결과 ({importedItems.length}건)
          </h3>

          <div className="space-y-3">
            {importedItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="font-bold text-[#3D5A40] dark:text-[#E8DCC7]">
                      {item.sourceName}
                    </span>
                    <span>•</span>
                    <span className="text-[#6E6E6E]">{formatDate(item.fetchedAt)}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#202020] dark:text-[#F2F5F3]">
                    {item.title}
                  </h4>
                  <p className="text-[#6E6E6E] line-clamp-1">{item.snippet}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={item.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-[#ECECEC] text-[#6E6E6E] hover:text-[#202020]"
                    title="원문 읽기"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handlePublishToCms(item)}
                    className="px-4 py-2 rounded-xl bg-[#3D5A40] text-white font-bold hover:bg-[#2F4732] transition-colors flex items-center gap-1"
                  >
                    CMS 기사 퍼블리싱 <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
