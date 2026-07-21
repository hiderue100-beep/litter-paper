'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { storage } from '@/lib/storage';
import { Article, RssSource, UserSubscription } from '@/types';
import { FileText, Eye, Users, Rss, Plus, ArrowUpRight, Sparkles, TrendingUp, Crown, Lock, Clock, Calendar } from 'lucide-react';
import { formatDate, getArticleAccessStatus } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [rssSources, setRssSources] = useState<RssSource[]>([]);
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({ isPremium: false });

  useEffect(() => {
    setArticles(storage.getArticles());
    setSubscribers(storage.getSubscribers());
    setRssSources(storage.getRssSources());
    setUserSubscription(storage.getUserSubscription());
  }, []);

  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
  const scheduledCount = articles.filter((a) => a.status === 'scheduled').length;
  const activeFreeCount = articles.filter((a) => getArticleAccessStatus(a).isFreeNow).length;
  const archivedCount = articles.filter((a) => getArticleAccessStatus(a).status === 'expired_premium').length;

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
              LITTER PAPER 에디토리얼 퍼블리싱, 24시간 무료 카운트다운 현황 및 Toss Payments 구독 통계
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
              <span>24h 무료 진행 기사</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-[#202020] dark:text-[#F2F5F3]">
              {activeFreeCount}건
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> 누구나 카운트다운 열람 가능
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6E6E6E]">
              <span>프리미엄 전환 아카이브</span>
              <Crown className="w-4 h-4 text-[#C77B30]" />
            </div>
            <div className="text-3xl font-extrabold text-[#202020] dark:text-[#F2F5F3]">
              {archivedCount}건
            </div>
            <div className="text-[11px] text-[#C77B30] font-semibold">Toss Payments 결제 전용</div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6E6E6E]">
              <span>예약 발행 대기</span>
              <Calendar className="w-4 h-4 text-[#3D5A40]" />
            </div>
            <div className="text-3xl font-extrabold text-[#202020] dark:text-[#F2F5F3]">
              {scheduledCount}건
            </div>
            <div className="text-[11px] text-[#3D5A40] dark:text-[#E8DCC7] font-semibold">자동 타이머 작동 중</div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#6E6E6E]">
              <span>누적 조회수 / 구독자</span>
              <Eye className="w-4 h-4 text-[#C77B30]" />
            </div>
            <div className="text-3xl font-extrabold text-[#202020] dark:text-[#F2F5F3]">
              {totalViews.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#6E6E6E]">뉴스레터 독자 {subscribers.length}명</div>
          </div>
        </div>

        {/* Published Articles List */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#ECECEC] dark:border-[#2A332C]">
            <h2 className="text-lg font-bold font-serif-editorial">
              최근 에디토리얼 상태 & 24h 카운트다운 관리
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
                  <th className="py-3 px-2">24h 상태 / 카운트다운</th>
                  <th className="py-3 px-2">발행일</th>
                  <th className="py-3 px-2">조회수</th>
                  <th className="py-3 px-2 text-right">작동</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECEC] dark:divide-[#2A332C]">
                {articles.slice(0, 6).map((art) => {
                  const access = getArticleAccessStatus(art);
                  return (
                    <tr key={art.id} className="hover:bg-[#FAF9F7] dark:hover:bg-[#252C26]">
                      <td className="py-3 px-2 font-bold text-[#202020] dark:text-[#F2F5F3] max-w-xs truncate">
                        {art.title}
                      </td>
                      <td className="py-3 px-2 text-[#3D5A40] font-semibold">
                        {art.categoryName}
                      </td>
                      <td className="py-3 px-2">
                        {access.status === 'scheduled' && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                            예약 발행 예정
                          </span>
                        )}
                        {access.status === 'free_now' && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            무료 공개 ({access.formattedCountdown})
                          </span>
                        )}
                        {access.status === 'expired_premium' && (
                          <span className="px-2 py-0.5 rounded-full bg-stone-200 dark:bg-white/10 text-[#3D5A40] dark:text-[#E8DCC7] font-bold text-[10px]">
                            프리미엄 아카이브
                          </span>
                        )}
                        {access.status === 'premium_only' && (
                          <span className="px-2 py-0.5 rounded-full bg-[#C77B30] text-white font-bold text-[10px]">
                            프리미엄 전용
                          </span>
                        )}
                      </td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
