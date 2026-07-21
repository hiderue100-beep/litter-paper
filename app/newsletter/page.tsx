'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { storage } from '@/lib/storage';
import { useToast } from '@/components/ui/Toast';
import { Mail, CheckCircle2, Send, Sparkles, ShieldCheck } from 'lucide-react';

export default function NewsletterPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const ok = storage.addSubscriber(email.trim());
    if (ok) {
      showToast('캣노트 일간 뉴스레터 구독이 시작되었습니다!');
    } else {
      showToast('이미 구독 중인 이메일 주소입니다.', 'info');
    }
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#E8DCC7] text-[#3D5A40] flex items-center justify-center mx-auto shadow-md">
            <Mail className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C77B30]">
            Daily & Weekly Feline Insights
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-editorial">
            매일 아침 8시, 집사의 지성을 높이는 리터페이퍼(LITTER PAPER) 뉴스레터
          </h1>
          <p className="text-sm sm:text-base text-[#6E6E6E] dark:text-[#9EAAA0] max-w-2xl mx-auto leading-relaxed">
            수의학 질환 정보, 행동학 칼럼, 신제품 내돈내산 검증 리포트까지. 바쁜 아침 3분으로 반려묘 삶의 질을 높여주세요.
          </p>
        </div>

        {/* Subscription Form Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] shadow-xl space-y-8">
          <form onSubmit={handleSubscribe} className="space-y-6 max-w-xl mx-auto">
            {/* Frequency options */}
            <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-xs">
              <button
                type="button"
                onClick={() => setFrequency('daily')}
                className={`py-3 rounded-xl font-bold transition-all ${
                  frequency === 'daily'
                    ? 'bg-[#3D5A40] text-white shadow-xs'
                    : 'text-[#6E6E6E]'
                }`}
              >
                매일 아침 일간 브리핑 (Daily)
              </button>
              <button
                type="button"
                onClick={() => setFrequency('weekly')}
                className={`py-3 rounded-xl font-bold transition-all ${
                  frequency === 'weekly'
                    ? 'bg-[#3D5A40] text-white shadow-xs'
                    : 'text-[#6E6E6E]'
                }`}
              >
                주간 하이라이트 (Weekly Digest)
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3D5A40] dark:text-[#E8DCC7]">
                구독하실 이메일 주소
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="flex-1 px-4 py-3.5 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-sm focus:outline-hidden focus:border-[#3D5A40]"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-[#3D5A40] text-white font-extrabold text-sm hover:bg-[#2F4732] transition-colors flex items-center justify-center gap-2 shadow-md shrink-0"
                >
                  <Send className="w-4 h-4" /> 무료 구독 신청
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#6E6E6E] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#3D5A40]" />
              <span>원클릭 언제든지 구독 해지 가능 / 스팸 없음 보장</span>
            </div>
          </form>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#ECECEC] dark:border-[#2A332C] text-center text-xs">
            <div className="space-y-1">
              <div className="font-bold text-sm text-[#3D5A40] dark:text-[#E8DCC7]">
                수의학 자문 검증
              </div>
              <p className="text-[#6E6E6E]">수의학 박사의 철저한 저널 리뷰 후 발행</p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-sm text-[#3D5A40] dark:text-[#E8DCC7]">
                AI 3줄 핵심 요약
              </div>
              <p className="text-[#6E6E6E]">급한 아침에도 핵심 요약으로 바쁘지 않게</p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-sm text-[#3D5A40] dark:text-[#E8DCC7]">
                시크릿 혜택 & 이벤트
              </div>
              <p className="text-[#6E6E6E]">구독자 전용 사료 체험단 및 증정 혜택</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
