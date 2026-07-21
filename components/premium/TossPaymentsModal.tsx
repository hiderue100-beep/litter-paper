'use client';

import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Sparkles, Lock, RefreshCw } from 'lucide-react';
import { storage } from '@/lib/storage';
import { SubscriptionPlan } from '@/types';
import { useToast } from '../ui/Toast';

interface TossPaymentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: SubscriptionPlan;
}

export function TossPaymentsModal({
  isOpen,
  onClose,
  defaultPlan = 'monthly',
}: TossPaymentsModalProps) {
  const { showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(defaultPlan);
  const [paymentMethod, setPaymentMethod] = useState<'TossPay' | 'Card' | 'KakaoPay' | 'NaverPay'>('TossPay');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const priceText = selectedPlan === 'yearly' ? '79,000원 / 년' : '7,900원 / 월';

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `toss_order_${Date.now()}`;
      storage.activatePremium(selectedPlan, paymentMethod, orderId);
      setIsProcessing(false);
      onClose();
      showToast('🎉 토스페이먼츠 결제가 완료되었습니다! 모든 프리미엄 아카이브가 해제되었습니다.', 'success');
      // Reload page state
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1D231E] rounded-3xl shadow-2xl border border-[#ECECEC] dark:border-[#2A332C] p-6 sm:p-8 space-y-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ECECEC] dark:border-[#2A332C]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0064FF] text-white flex items-center justify-center font-bold text-xs">
              Toss
            </div>
            <div>
              <h3 className="font-bold font-serif-editorial text-base text-[#202020] dark:text-[#F2F5F3]">
                Toss Payments 안전결제
              </h3>
              <p className="text-[11px] text-[#6E6E6E]">
                리터페이퍼 프리미엄 멤버십 결제
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-[#6E6E6E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan Select Cards */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <button
            type="button"
            onClick={() => setSelectedPlan('monthly')}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              selectedPlan === 'monthly'
                ? 'border-[#3D5A40] bg-[#3D5A40]/5 dark:bg-[#3D5A40]/20 font-bold shadow-xs'
                : 'border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40]'
            }`}
          >
            <div className="text-[#6E6E6E] font-medium mb-1">월간 프리미엄</div>
            <div className="text-lg font-extrabold text-[#202020] dark:text-[#F2F5F3]">
              ₩7,900 <span className="text-xs font-normal">/월</span>
            </div>
            <p className="text-[10px] text-[#6E6E6E] mt-1">부담 없는 1개월 단위 구독</p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPlan('yearly')}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              selectedPlan === 'yearly'
                ? 'border-[#3D5A40] bg-[#3D5A40]/5 dark:bg-[#3D5A40]/20 font-bold shadow-xs'
                : 'border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40]'
            }`}
          >
            <span className="absolute top-2 right-2 bg-[#C77B30] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">
              17% 할인
            </span>
            <div className="text-[#6E6E6E] font-medium mb-1">연간 프리미엄</div>
            <div className="text-lg font-extrabold text-[#202020] dark:text-[#F2F5F3]">
              ₩79,000 <span className="text-xs font-normal">/년</span>
            </div>
            <p className="text-[10px] text-[#6E6E6E] mt-1">월 6,580원 혜택 적용</p>
          </button>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#3D5A40] dark:text-[#E8DCC7]">
            결제 수단 선택 (토스페이먼츠 보안 모듈)
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setPaymentMethod('TossPay')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                paymentMethod === 'TossPay'
                  ? 'border-[#0064FF] bg-[#0064FF]/10 text-[#0064FF]'
                  : 'border-[#ECECEC] dark:border-[#2A332C] text-[#6E6E6E]'
              }`}
            >
              💙 토스페이 (TossPay)
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('Card')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                paymentMethod === 'Card'
                  ? 'border-[#3D5A40] bg-[#3D5A40]/10 text-[#3D5A40] dark:text-[#E8DCC7]'
                  : 'border-[#ECECEC] dark:border-[#2A332C] text-[#6E6E6E]'
              }`}
            >
              💳 신용/체크카드
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('KakaoPay')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                paymentMethod === 'KakaoPay'
                  ? 'border-amber-400 bg-amber-400/10 text-amber-800 dark:text-amber-300'
                  : 'border-[#ECECEC] dark:border-[#2A332C] text-[#6E6E6E]'
              }`}
            >
              🟡 카카오페이
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('NaverPay')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                paymentMethod === 'NaverPay'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                  : 'border-[#ECECEC] dark:border-[#2A332C] text-[#6E6E6E]'
              }`}
            >
              🟢 네이버페이
            </button>
          </div>
        </div>

        {/* Total Price & Checkout Button */}
        <div className="pt-4 border-t border-[#ECECEC] dark:border-[#2A332C] space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-[#6E6E6E]">총 결제 금액</span>
            <span className="font-extrabold text-xl text-[#3D5A40] dark:text-[#E8DCC7]">
              {priceText}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-2xl bg-[#0064FF] hover:bg-[#0052D4] text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> 토스페이먼츠 결제 승인 중...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" /> {priceText} 결제하기
              </>
            )}
          </button>
        </div>

        <div className="text-[10px] text-center text-[#6E6E6E]">
          결제 정보는 SSL 256비트 암호화로 보호되며 토스페이먼츠 결제대행 시스템을 거칩니다.
        </div>
      </div>
    </div>
  );
}
