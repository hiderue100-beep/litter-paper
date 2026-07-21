'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TossPaymentsModal } from '@/components/premium/TossPaymentsModal';
import { storage } from '@/lib/storage';
import { UserSubscription, SubscriptionPlan } from '@/types';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  BookOpen, 
  Bookmark, 
  Mail, 
  HelpCircle, 
  ArrowRight,
  Zap,
  CreditCard
} from 'lucide-react';

export default function PremiumPage() {
  const { showToast } = useToast();
  const [subscription, setSubscription] = useState<UserSubscription>({ isPremium: false });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('monthly');

  useEffect(() => {
    setSubscription(storage.getUserSubscription());
  }, []);

  const handleOpenCheckout = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  const handleCancelPremium = () => {
    const updated = storage.cancelPremium();
    setSubscription(updated);
    showToast('프리미엄 멤버십 구독이 해지되었습니다.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC7] text-[#3D5A40] text-xs font-extrabold">
            <Crown className="w-4 h-4 text-[#C77B30]" /> LITTER PAPER PREMIUM
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-editorial leading-tight">
            깊이 있는 지식으로 반려묘의 삶을 바꾸는 프리미엄 멤버십
          </h1>
          <p className="text-sm sm:text-base text-[#6E6E6E] dark:text-[#9EAAA0] leading-relaxed">
            24시간 무료 공개 기간이 지난 수의학 저널 아카이브, AI 3줄 핵심 요약, 독점 수의학 보고서까지 제한 없이 이용해 보세요.
          </p>
        </div>

        {/* Current Active Subscription Status if User is Premium */}
        {subscription.isPremium && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#3D5A40] to-[#2F4732] text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8 text-[#E8DCC7]" />
                <div>
                  <h3 className="text-xl font-bold font-serif-editorial">
                    현재 프리미엄 멤버십 구독 중입니다
                  </h3>
                  <p className="text-xs text-[#E8DCC7]/80 mt-0.5">
                    구독 플랜: {subscription.plan === 'yearly' ? '연간 패스 (₩79,000)' : '월간 패스 (₩7,900)'} • 결제 수단: {subscription.paymentMethod || 'TossPay'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCancelPremium}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors border border-white/20"
              >
                구독 관리 / 해지
              </button>
            </div>
            {subscription.expiresAt && (
              <div className="text-xs text-[#E8DCC7]/90 pt-2 border-t border-white/10">
                다음 정기 결제 예정일: {formatDate(subscription.expiresAt)}
              </div>
            )}
          </div>
        )}

        {/* Pricing Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] shadow-lg flex flex-col justify-between space-y-6 hover:border-[#3D5A40] transition-all">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6E6E6E]">
                Monthly Pass
              </span>
              <h3 className="text-2xl font-bold font-serif-editorial text-[#202020] dark:text-[#F2F5F3]">
                월간 프리미엄
              </h3>
              <div className="text-4xl font-extrabold text-[#3D5A40] dark:text-[#E8DCC7]">
                ₩7,900 <span className="text-sm font-normal text-[#6E6E6E]">/월</span>
              </div>
              <p className="text-xs text-[#6E6E6E] dark:text-[#9EAAA0]">
                부담 없이 1개월 단위로 경험하는 수의학 에디토리얼 구독
              </p>

              <ul className="space-y-2.5 text-xs text-[#202020] dark:text-[#F2F5F3] pt-4 border-t border-[#ECECEC] dark:border-[#2A332C]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3D5A40] shrink-0" />
                  <span>24시간 만료 아카이브 전체 무제한 열람</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3D5A40] shrink-0" />
                  <span>AI 3줄 요약 및 품질 리포트</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3D5A40] shrink-0" />
                  <span>보관함 & 히스토리 동기화</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenCheckout('monthly')}
              className="w-full py-3.5 rounded-2xl bg-[#3D5A40] hover:bg-[#2F4732] text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>월간 플랜 결제하기 (Toss)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Yearly Plan */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#3D5A40]/5 to-transparent bg-white dark:bg-[#1D231E] border-2 border-[#3D5A40] shadow-xl flex flex-col justify-between space-y-6">
            <span className="absolute -top-3.5 right-6 bg-[#C77B30] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
              BEST • 17% 특별 할인
            </span>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C77B30]">
                Yearly Pass
              </span>
              <h3 className="text-2xl font-bold font-serif-editorial text-[#202020] dark:text-[#F2F5F3]">
                연간 프리미엄
              </h3>
              <div className="text-4xl font-extrabold text-[#3D5A40] dark:text-[#E8DCC7]">
                ₩79,000 <span className="text-sm font-normal text-[#6E6E6E]">/년</span>
              </div>
              <p className="text-xs text-[#6E6E6E] dark:text-[#9EAAA0]">
                월 6,580원 수준의 압도적인 1년 정기구독 혜택
              </p>

              <ul className="space-y-2.5 text-xs text-[#202020] dark:text-[#F2F5F3] pt-4 border-t border-[#ECECEC] dark:border-[#2A332C]">
                <li className="flex items-center gap-2 font-bold text-[#3D5A40] dark:text-[#E8DCC7]">
                  <Sparkles className="w-4 h-4 text-[#C77B30] shrink-0" />
                  <span>월간 헤택 전부 포함 + 17% 할인가</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3D5A40] shrink-0" />
                  <span>프리미엄 독점 단독 저널 리포트 접근권</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3D5A40] shrink-0" />
                  <span>뉴스레터 전체 아카이브 모음집</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenCheckout('yearly')}
              className="w-full py-3.5 rounded-2xl bg-[#0064FF] hover:bg-[#0052D4] text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>연간 플랜 결제하기 (Toss Payments)</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Benefits Comparison Table */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-6 shadow-sm">
          <h3 className="text-xl font-bold font-serif-editorial text-center text-[#202020] dark:text-[#F2F5F3]">
            무료 독자 vs 프리미엄 독자 혜택 비교
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#ECECEC] dark:border-[#2A332C] text-[#6E6E6E]">
                  <th className="py-3 px-4">혜택 항목</th>
                  <th className="py-3 px-4 text-center">무료 회원</th>
                  <th className="py-3 px-4 text-center text-[#3D5A40] dark:text-[#E8DCC7] font-bold">프리미엄 멤버</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECECEC] dark:divide-[#2A332C]">
                <tr>
                  <td className="py-3 px-4 font-bold">발행 후 24시간 기사 열람</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">무료 (카운트다운)</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">무료</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">24시간 만료 수의학 아카이브</td>
                  <td className="py-3 px-4 text-center text-[#6E6E6E]">미리보기 차단</td>
                  <td className="py-3 px-4 text-center font-bold text-[#3D5A40] dark:text-[#E8DCC7]">무제한 해제</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">AI 3줄 요약 & 품질 분석</td>
                  <td className="py-3 px-4 text-center text-[#6E6E6E]">일부 지원</td>
                  <td className="py-3 px-4 text-center font-bold text-[#3D5A40] dark:text-[#E8DCC7]">무제한 사용</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">프리미엄 독점 수의학 논문 해설</td>
                  <td className="py-3 px-4 text-center text-[#6E6E6E]">열람 불가</td>
                  <td className="py-3 px-4 text-center font-bold text-[#3D5A40] dark:text-[#E8DCC7]">전용 리포트 제공</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Toss Payments Security Banner */}
        <div className="p-6 rounded-3xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] flex items-center justify-between text-xs text-[#6E6E6E]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#3D5A40] shrink-0" />
            <div>
              <div className="font-bold text-[#202020] dark:text-[#F2F5F3]">
                토스페이먼츠(Toss Payments) 공식 가맹점 안전결제
              </div>
              <div>신용카드, 토스페이, 카카오페이, 네이버페이를 모두 지원하며 원클릭으로 언제든 해지 가능합니다.</div>
            </div>
          </div>
        </div>
      </main>

      {/* Checkout Modal */}
      <TossPaymentsModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        defaultPlan={selectedPlan}
      />

      <Footer />
    </div>
  );
}
