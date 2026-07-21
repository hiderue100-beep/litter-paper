'use client';

import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import { MessageSquare, ThumbsUp, Trash2, ShieldCheck } from 'lucide-react';

export default function AdminCommentsPage() {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen flex bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
        <AdminSidebar />

        <main className="flex-1 p-8 overflow-y-auto space-y-8 max-w-7xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              댓글 및 독자 피드백 관리
            </h1>
            <p className="text-xs text-[#666666] dark:text-[#A0A0A0]">
              내돈내산 검증 리포트에 작성된 독자 댓글 실시간 모니터링
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] text-center space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#C19A6B]/20 text-[#C19A6B] flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">독자 클린 댓글 시스템 가동 중</h3>
            <p className="text-xs text-[#666666] max-w-md mx-auto">
              AI 부적절 댓글 필터링이 활성화되어 있으며, 악성 스팸 댓글은 자동으로 블라인드 처리됩니다.
            </p>
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
