'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { storage } from '@/lib/storage';
import { Article, RssSource } from '@/types';
import { FileText, Eye, Users, Rss, Plus, ArrowUpRight, Sparkles, TrendingUp } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [rssSources, setRssSources] = useState<RssSource[]>([]);

  useEffect(() => {
    setArticles(storage.getArticles());
    setSubscribers(storage.getSubscribers());
    setRssSources(storage.getRssSources());
  }, []);

  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
  const totalLikes = articles.reduce((sum, a) => sum + (a.likes || 0), 0);

  return (
    <div className="min-h-screen flex bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-editorial">
              퍼블리셔 CMS 대시보드
            </h1>
            <p className="text-xs text-[#6E6E6E] dark:text-[#9EAAA0]">
              CAT NOTE 에디토리얼 퍼블리싱 현황 및 AI 뉴스 수집기 통계
            </p>
          </div>

          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#3D5A40] text-white text-xs font-bold shadow-md hover:bg-[#2F4732] transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> 새 에디토리얼 작성
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6E6E6E]">
              <span>발행 기사 총계</span>
              <FileText className="w-4 h-4 text-[#3D5A40]" />
            </div>
            <div className="text-3xl font-extrabold text-[#202020] dark:text-[#F2F5F3]">
              {articles.length}건
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> 이번 주 +3건 추가됨
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6E6E6E]">
              <span>누적 에디토리얼 조회수</span>
              <Eye className="w-4 h-4 text-[#C77B30]" />
            </div>
            <div className="text-3xl font-extrabold text-[#202020] dark:text-[#F2F5F3]">
              {totalViews.toLocaleString()}회
            </div>
            <div className="text-[11px] text-[#6E6E6E]">평균 기사당 4,200회</div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6E6E6E]">
              <span>뉴스레터 활성 구독자</span>
              <Users className="w-4 h-4 text-[#3D5A40]" />
            </div>
            <div className="text-3xl font-extrabold text-[#202020] dark:text-[#F2F5F3]">
              {subscribers.length.toLocaleString()}명
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold">도달률 94.2%</div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6E6E6E]">
              <span>RSS 피드 수집 소스</span>
              <Rss className="w-4 h-4 text-[#C77B30]" />
            </div>
            <div className="text-3xl font-extrabold text-[#202020] dark:text-[#F2F5F3]">
              {rssSources.length}개 소스
            </div>
            <div className="text-[11px] text-[#3D5A40] dark:text-[#E8DCC7] font-semibold">
              자동 AI 요약 작동 중
            </div>
          </div>
        </div>

        {/* Published Articles List */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#ECECEC] dark:border-[#2A332C]">
            <h2 className="text-lg font-bold font-serif-editorial">
              최근 발행된 기사 관리
            </h2>
            <Link
              href="/admin/articles"
              className="text-xs font-bold text-[#3D5A40] hover:underline"
            >
              전체 기사 관리 & 에디터
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#ECECEC] dark:border-[#2A332C] text-[#6E6E6E]">
                  <th className="py-3 px-2">제목 / 에디토리얼</th>
                  <th className="py-3 px-2">카테고리</th>
                  <th className="py-3 px-2">저자</th>
                  <th className="py-3 px-2">발행일</th>
                  <th className="py-3 px-2">조회수</th>
                  <th className="py-3 px-2 text-right">작동</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECEC] dark:divide-[#2A332C]">
                {articles.slice(0, 5).map((art) => (
                  <tr key={art.id} className="hover:bg-[#FAF9F7] dark:hover:bg-[#252C26]">
                    <td className="py-3 px-2 font-bold text-[#202020] dark:text-[#F2F5F3] max-w-xs truncate">
                      {art.title}
                    </td>
                    <td className="py-3 px-2 text-[#3D5A40] font-semibold">
                      {art.categoryName}
                    </td>
                    <td className="py-3 px-2">{art.author.name}</td>
                    <td className="py-3 px-2 text-[#6E6E6E]">
                      {formatDate(art.publishedAt)}
                    </td>
                    <td className="py-3 px-2 font-semibold">
                      {art.views.toLocaleString()}회
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Link
                        href={`/article/${art.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[#C77B30] font-bold hover:underline"
                      >
                        보기 <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
