'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { MessageSquare, ShieldAlert, Check, Trash2, Flag } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function AdminCommentsPage() {
  const { showToast } = useToast();

  const [comments, setComments] = useState([
    {
      id: 'c-mod-1',
      articleTitle: '고양이 특발성 방광염(FIC) 완전 정복 가이드 2026',
      userName: '치즈태비 집사',
      content: '저희 치즈도 화장실을 자주 가다가 결국 응급실에서 방광염 진단을 받은 적이 있습니다.',
      reported: false,
      date: '2026-07-21',
    },
    {
      id: 'c-mod-2',
      articleTitle: '벤토나이트 vs 두부모래: 먼지 발생율과 결분력 수의학 테스트',
      userName: '광고스팸계정',
      content: '비트코인 및 불법 가상자산 주식 리딩방 무료 입장 클릭하세요 http://spam-link.com',
      reported: true,
      reportReason: '스팸 및 부적절한 광고',
      date: '2026-07-20',
    },
  ]);

  const handleDelete = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
    showToast('해당 댓글이 규정 위반으로 삭제 처리되었습니다.', 'info');
  };

  const handleDismissReport = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, reported: false } : c))
    );
    showToast('신고건이 무혐의 처리되었습니다.');
  };

  return (
    <div className="min-h-screen flex bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-editorial">
            커뮤니티 댓글 & 신고 관리
          </h1>
          <p className="text-xs text-[#6E6E6E]">
            클린 에디토리얼 토론방을 위해 신고된 댓글 및 악성 스팸을 관리합니다.
          </p>
        </div>

        {/* Comments Table */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#ECECEC] dark:border-[#2A332C]">
            <h3 className="text-base font-bold font-serif-editorial flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#3D5A40]" /> 등록 댓글 목록 ({comments.length}건)
            </h3>
          </div>

          <div className="space-y-3">
            {comments.map((c) => (
              <div
                key={c.id}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs ${
                  c.reported
                    ? 'bg-red-50 dark:bg-red-950/20 border-red-200'
                    : 'bg-[#FAF9F7] dark:bg-[#252C26] border-[#ECECEC] dark:border-[#2A332C]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#202020] dark:text-[#F2F5F3]">{c.userName}</span>
                    <span className="text-[11px] text-[#6E6E6E]">• {c.articleTitle}</span>
                    {c.reported && (
                      <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-extrabold text-[10px] flex items-center gap-1">
                        <Flag className="w-3 h-3" /> 신고 접수: {c.reportReason}
                      </span>
                    )}
                  </div>
                  <p className="text-[#202020] dark:text-[#F2F5F3] font-medium">{c.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {c.reported && (
                    <button
                      onClick={() => handleDismissReport(c.id)}
                      className="px-3 py-1.5 rounded-xl bg-gray-200 dark:bg-white/10 text-xs font-bold"
                    >
                      신고 기각
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> 댓글 삭제
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
