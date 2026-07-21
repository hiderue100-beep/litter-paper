'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShoppingBag, ShieldCheck, Heart, Award, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#3D5A40] text-[#E8DCC7] flex items-center justify-center mx-auto shadow-md">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C77B30]">
            Our Editorial Philosophy
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-editorial">
            100% 내돈내산 반려동물 용품 검증 저널, LITTER PAPER
          </h1>
          <p className="text-sm sm:text-base text-[#6E6E6E] dark:text-[#9EAAA0] leading-relaxed max-w-2xl mx-auto">
            리터페이퍼(LITTER PAPER)는 대가성 협찬 글을 엄격히 금지합니다. 직접 구매한 제품을 분광 측정기, 하중 인장기, 세균 배양 키트로 분석하여 객관적인 수치로 알립니다.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-8 shadow-sm">
          <h2 className="text-2xl font-bold font-serif-editorial text-[#3D5A40] dark:text-[#E8DCC7]">
            리터페이퍼 4대 상품 검증 원칙
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#3D5A40]" />
              <h3 className="font-bold text-base">1. 대가성 협찬 0% 배제</h3>
              <p className="text-xs text-[#6E6E6E] leading-relaxed">
                제조사 협찬이나 협상 광고를 받지 않으며, 일반 소비자 경로로 직접 무작위 구매하여 테스트합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] space-y-2">
              <Award className="w-6 h-6 text-[#C77B30]" />
              <h3 className="font-bold text-base">2. 연구 장비 실측 데이터</h3>
              <p className="text-xs text-[#6E6E6E] leading-relaxed">
                '좋다' '나쁘다' 같은 주관적 감상 대신 분광 먼지 측정 수치(ppm), 데시벨(dB), DM 단백질 비율로 수치화합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] space-y-2">
              <Sparkles className="w-6 h-6 text-[#3D5A40]" />
              <h3 className="font-bold text-base">3. 극강의 독서 편안함</h3>
              <p className="text-xs text-[#6E6E6E] leading-relaxed">
                롱블랙 스타일의 50/50 딥 모던 레이아웃과 차분한 에디토리얼 서체로 깔끔한 읽기 경험을 보장합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] space-y-2">
              <Heart className="w-6 h-6 text-[#C77B30]" />
              <h3 className="font-bold text-base">4. 24시간 무료 + 아카이브 수유</h3>
              <p className="text-xs text-[#6E6E6E] leading-relaxed">
                모든 최신 검증 리포트는 발행 후 24시간 동안 누구나 무료로 읽을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
