'use client';

import React, { useState } from 'react';
import { Lock, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { TossPaymentsModal } from '../premium/TossPaymentsModal';

interface ArticlePaywallProps {
  reason?: 'expired' | 'premium_only';
}

export function ArticlePaywall({ reason = 'expired' }: ArticlePaywallProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <>
      <div className="relative mt-8 rounded-3xl overflow-hidden border border-[#ECECEC] dark:border-[#2A332C] bg-white dark:bg-[#1D231E] shadow-2xl p-8 sm:p-12 text-center space-y-6">
        {/* Background Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF9F7]/90 to-[#FAF9F7] dark:via-[#141815]/90 dark:to-[#141815] pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#3D5A40] text-[#E8DCC7] flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8DCC7] text-[#3D5A40] text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C77B30]" /> LITTER PAPER PREMIUM ARCHIVE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-editorial text-[#202020] dark:text-[#F2F5F3]">
              {reason === 'expired'
                ? '24시간 무료 공개 기간이 만료되었습니다.'
                : '본 에디토리얼은 프리미엄 멤버 전용 단독 리포트입니다.'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6E6E] dark:text-[#9EAAA0] leading-relaxed">
              리터페이퍼는 발행 후 24시간 동안 모든 독자에게 무료로 공개되며, 이후 수의학 검증 아카이브로 전환됩니다. 지금 멤버십을 시작하고 전체 가이드를 읽어보세요.
            </p>
          </div>

          {/* Premium Benefits Checklist */}
          <div className="p-4 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-left text-xs space-y-2">
            <div className="font-bold text-[#3D5A40] dark:text-[#E8DCC7] mb-1">
              프리미엄 독자만의 4가지 무제한 혜택:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#6E6E6E] dark:text-[#9EAAA0]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3D5A40] shrink-0" />
                <span>수의학 & 아카이브 전 기사 무제한</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3D5A40] shrink-0" />
                <span>AI 3줄 요약 및 품질 리포트</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3D5A40] shrink-0" />
                <span>프라이빗 뉴스레터 아카이브</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3D5A40] shrink-0" />
                <span>개인 보관함 & 히스토리 동기화</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#3D5A40] hover:bg-[#2F4732] text-white font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Toss Payments로 프리미엄 시작하기</span>
              <ArrowRight className="w-4 h-4 text-[#E8DCC7]" />
            </button>
          </div>

          <div className="text-[11px] text-[#6E6E6E] flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#3D5A40]" />
            <span>토스페이먼츠 간편결제 지원 • 언제든 자유로운 해지</span>
          </div>
        </div>
      </div>

      {/* Toss Payments Modal */}
      <TossPaymentsModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </>
  );
}
