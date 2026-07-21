'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import { storage } from '@/lib/storage';
import { Article, UserSubscription } from '@/types';
import { getArticleAccessStatus, formatDate } from '@/lib/utils';
import { 
  Users, 
  FileText, 
  Clock, 
  Crown, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageSquare,
  Sparkles,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [subscription, setSubscription] = useState<UserSubscription>({ isPremium: false });
  const [subscribers, setSubscribers] = useState<string[]>([]);

  useEffect(() => {
    setArticles(storage.getArticles());
    setSubscription(storage.getUserSubscription());
    setSubscribers(storage.getSubscribers());
  }, []);

  const freeArticlesCount = articles.filter(
    (a) => getArticleAccessStatus(a).status === 'free_now'
  ).length;

  const premiumArticlesCount = articles.filter(
    (a) => getArticleAccessStatus(a).status === 'expired_premium' || a.isPremiumOnly
  ).length;

  const totalViews = articles.reduce((acc, curr) => acc + curr.views, 0);

  return (
    <AdminAuthGuard>
      <div className="min-h-screen flex bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
        <AdminSidebar />

        <main className="flex-1 p-8 overflow-y-auto space-y-8 max-w-7xl">
          {/* Top Banner Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                Litter Paper 퍼블리셔 대시보드
              </h1>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0]">
                24시간 무료 실시간 카운트다운 현황 및 내돈내산 검증 아카이브 통합 모니터링
              </p>
            </div>

            <Link
              href="/admin/articles"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#333333] text-white text-xs font-extrabold shadow-md hover:bg-[#C19A6B] transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" /> 새 검증 기사 쓰기
            </Link>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#666666]">
                <span>현재 24시간 무료 독서</span>
                <Clock className="w-4 h-4 text-[#C19A6B]" />
              </div>
              <div className="text-3xl font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                {freeArticlesCount}개
              </div>
              <p className="text-[11px] text-[#666666]">실시간 무료 카운트다운 작동 중</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#666666]">
                <span>프리미엄 전용 아카이브</span>
                <Crown className="w-4 h-4 text-[#C19A6B]" />
              </div>
              <div className="text-3xl font-extrabold text-[#C19A6B]">
                {premiumArticlesCount}개
              </div>
              <p className="text-[11px] text-[#666666]">유료 멤버십 전용 수유 콘텐츠</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#666666]">
                <span>총 독자 누적 조회수</span>
                <Eye className="w-4 h-4 text-[#C19A6B]" />
              </div>
              <div className="text-3xl font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                {totalViews.toLocaleString()}회
              </div>
              <p className="text-[11px] text-[#666666]">실측 검증 리포트 열람 수</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#666666]">
                <span>검증 뉴스레터 구독자</span>
                <Users className="w-4 h-4 text-[#C19A6B]" />
              </div>
              <div className="text-3xl font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                {subscribers.length}명
              </div>
              <p className="text-[11px] text-[#666666]">일간 이메일 리포트 수신자</p>
            </div>
          </div>

          {/* Real-time Article List Status Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                퍼블리싱 기사 24시간 카운트다운 상태
              </h3>
              <Link
                href="/admin/articles"
                className="text-xs font-bold text-[#C19A6B] hover:underline flex items-center gap-1"
              >
                전체 관리 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#EAE6DF] dark:border-[#333333] text-[#666666]">
                    <th className="py-3 px-4">카테고리</th>
                    <th className="py-3 px-4">기사 제목</th>
                    <th className="py-3 px-4">공개 상태</th>
                    <th className="py-3 px-4">남은 무료 시간</th>
                    <th className="py-3 px-4">발행일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE6DF] dark:divide-[#333333]">
                  {articles.map((art) => {
                    const access = getArticleAccessStatus(art);
                    return (
                      <tr key={art.id} className="hover:bg-[#FAF8F5] dark:hover:bg-[#1A1A1A]">
                        <td className="py-3 px-4 font-bold text-[#C19A6B]">{art.categoryName}</td>
                        <td className="py-3 px-4 font-extrabold max-w-xs truncate">{art.title}</td>
                        <td className="py-3 px-4">
                          {access.status === 'scheduled' && (
                            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white font-bold text-[10px]">
                              예약 발행 예정
                            </span>
                          )}
                          {access.status === 'free_now' && (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                              24시간 무료 공개 중
                            </span>
                          )}
                          {access.status === 'expired_premium' && (
                            <span className="px-2.5 py-1 rounded-full bg-[#C19A6B] text-white font-bold text-[10px]">
                              프리미엄 전환 완료
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-[#C19A6B]">
                          {access.isFreeNow ? access.formattedCountdown : '-'}
                        </td>
                        <td className="py-3 px-4 text-[#666666]">{formatDate(art.publishedAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
