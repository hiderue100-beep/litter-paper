'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LitterPaperLogo } from '@/components/ui/LitterPaperLogo';
import { ShoppingBag, ShieldCheck, Heart, Award, Sparkles, Box } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#333333] text-[#C19A6B] flex items-center justify-center mx-auto shadow-md border border-[#C19A6B] p-2">
            <LitterPaperLogo size={44} />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C19A6B]">
            About Litter Paper
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            100% 내돈내산 고양이 용품 검증 저널, 리터페이퍼란?
          </h1>
          <p className="text-sm sm:text-base text-[#666666] dark:text-[#A0A0A0] leading-relaxed max-w-2xl mx-auto">
            리터페이퍼(LITTER PAPER)는 제조사의 대가성 협찬을 100% 금지합니다. 무작위 직접 구매한 반려용품을 먼지 분광 측정기, 300g 무게 감지 센서, DM 영양 성분 환산표로 분석하여 가장 정직한 수치로 알립니다.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] space-y-8 shadow-xs">
          <h2 className="text-2xl font-extrabold text-[#333333] dark:text-[#FAF8F5]">
            리터페이퍼 4대 상품 검증 원칙
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#C19A6B]" />
              <h3 className="font-extrabold text-base">1. 대가성 협찬 0% 배제</h3>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                제조사 협찬이나 광고비를 일절 받지 않으며, 일반 집사 구매 경로와 동일하게 직접 무작위 내돈내산으로 테스트합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-2">
              <Award className="w-6 h-6 text-[#C19A6B]" />
              <h3 className="font-extrabold text-base">2. 연구 장비 실측 데이터</h3>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                '좋다' '나쁘다' 같은 주관적 감상 대신 분광 먼지 수치(ppm), 데시벨(dB), DM 단백질 비율로 정확히 수치화합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-2">
              <Sparkles className="w-6 h-6 text-[#C19A6B]" />
              <h3 className="font-extrabold text-base">3. 롱블랙 프리미엄 디자인</h3>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                롱블랙 스타일의 50/50 모던 분할 레이아웃과 프리텐다드 고딕 서체로 눈이 편안한 최고급 읽기 경험을 보장합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-2">
              <Heart className="w-6 h-6 text-[#C19A6B]" />
              <h3 className="font-extrabold text-base">4. 24시간 무료 & 픽캣 커뮤니티</h3>
              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                모든 최신 검증 리포트는 24시간 무료이며, 픽캣(Pick Cat) 투표와 100자 한줄 한마디로 집사 간 지식을 나눕니다.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
