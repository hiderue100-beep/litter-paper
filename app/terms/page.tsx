'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <h1 className="text-3xl font-extrabold font-serif-editorial">서비스 이용약관 (Terms of Service)</h1>
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-4 text-xs text-[#6E6E6E] leading-relaxed">
          <p>본 약관은 LITTER PAPER 서비스 이용 조건 및 절차에 관한 사항을 규정합니다.</p>
          <h3 className="font-bold text-sm text-[#202020] dark:text-[#F2F5F3]">1. 지적 재산권</h3>
          <p>LITTER PAPER의 저작물(에디토리얼, 수의학 리포트, AI 요약문 등)의 저작권은 LITTER PAPER Media Inc.에 속합니다.</p>
          <h3 className="font-bold text-sm text-[#202020] dark:text-[#F2F5F3]">2. 수의학 정보 면책 조항</h3>
          <p>본 플랫폼의 정보는 보호자의 이해를 돕기 위한 참고 자료이며, 동물병원의 공식 진료를 대체할 수 없습니다. 응급 상황 시 동물병원을 방문하세요.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
