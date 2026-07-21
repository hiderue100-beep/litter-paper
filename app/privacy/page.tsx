'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <h1 className="text-3xl font-extrabold font-serif-editorial">개인정보 처리방침 (Privacy Policy)</h1>
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-4 text-xs text-[#6E6E6E] leading-relaxed">
          <p>LITTER PAPER (이하 "회사")는 보호자의 개인정보를 중시하며, 개인정보보호법 등 관련 법령을 준수합니다.</p>
          <h3 className="font-bold text-sm text-[#202020] dark:text-[#F2F5F3]">1. 수집하는 개인정보 항목</h3>
          <p>뉴스레터 구독 신청 시 이메일 주소, 서비스 이용 기록, 접속 로그, 쿠키 데이터를 수집합니다.</p>
          <h3 className="font-bold text-sm text-[#202020] dark:text-[#F2F5F3]">2. 개인정보의 이용 목적</h3>
          <p>맞춤형 에디토리얼 뉴스레터 발송, AI 기사 추천 서비스 제공, 서비스 이용 통계 분석 목적에 한해 활용됩니다.</p>
          <h3 className="font-bold text-sm text-[#202020] dark:text-[#F2F5F3]">3. 개인정보 파기 절차</h3>
          <p>구독 해지 신청 즉시 수집된 이메일 데이터는 복구 불가능한 방법으로 파기됩니다.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
