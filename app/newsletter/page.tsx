'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { storage } from '@/lib/storage';
import { UserProfile } from '@/types';
import { Sparkles, ExternalLink, Bell } from 'lucide-react';

export default function NewsletterPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const user = storage.getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Top Header Introduction (Newneek Style) */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            뉴스레터 구독하기
          </h1>
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C19A6B]/20 text-[#C19A6B] text-xs font-extrabold">
            <Sparkles className="w-4 h-4 text-[#C19A6B]" /> 이미 12만 명의 집사가 매일 받아보고 있어요.
          </div>
          <p className="text-xs sm:text-sm text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
            세상 돌아가는 반려용품 소식 궁금한데, 성분표는 어렵고 복잡하죠?<br />
            꼭 알아야 할 신제품 분석부터 내돈내산 물리 실험까지 쏙쏙 정리해서 이메일로 보내드려요.
          </p>
        </div>

        {/* 3 Curated Newsletter Series Cards (Matching Newneek Screenshot 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Series Card 1: Daily Food & Wet Food */}
          <div className="p-8 rounded-3xl bg-[#FFF9F2] dark:bg-[#25201A] border border-[#F5E6D3] dark:border-[#3D3227] flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#FF8A00] text-white flex items-center justify-center font-extrabold text-xl mx-auto sm:mx-0 shadow-md">
                🥫
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                  사료 & 습식캔 데일리
                </h3>
                
                {/* Sending Days Badges */}
                <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-[10px] font-bold">
                  <span className="w-5 h-5 rounded-full bg-[#FFE8D1] text-[#FF8A00] flex items-center justify-center">일</span>
                  <span className="w-5 h-5 rounded-full bg-[#FF8A00] text-white flex items-center justify-center">월</span>
                  <span className="w-5 h-5 rounded-full bg-[#FF8A00] text-white flex items-center justify-center">화</span>
                  <span className="w-5 h-5 rounded-full bg-[#FF8A00] text-white flex items-center justify-center">수</span>
                  <span className="w-5 h-5 rounded-full bg-[#FF8A00] text-white flex items-center justify-center">목</span>
                  <span className="w-5 h-5 rounded-full bg-[#FF8A00] text-white flex items-center justify-center">금</span>
                  <span className="w-5 h-5 rounded-full bg-[#FFE8D1] text-[#FF8A00] flex items-center justify-center">토</span>
                </div>
              </div>

              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                바빠도 놓칠 수 없는 신제품 사료 소식. AAFCO 기준 달성 여부와 DM 영양 성분 환산표를 차근차근 따져서 알기 쉽게 풀어드려요.
              </p>
            </div>

            <Link
              href="/category/nutrition"
              className="text-xs font-bold text-[#666666] hover:text-[#FF8A00] flex items-center justify-center sm:justify-start gap-1"
            >
              레터 미리보기 <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Series Card 2: Sand & Dust Lab */}
          <div className="p-8 rounded-3xl bg-[#F0FAF7] dark:bg-[#1A2623] border border-[#D5EFE8] dark:border-[#273B36] flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#00B88A] text-white flex items-center justify-center font-extrabold text-xl mx-auto sm:mx-0 shadow-md">
                🧪
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                  모래 & 배변 분광 리포트
                </h3>
                
                {/* Sending Days Badges */}
                <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-[10px] font-bold">
                  <span className="w-5 h-5 rounded-full bg-[#D5EFE8] text-[#00B88A] flex items-center justify-center">일</span>
                  <span className="w-5 h-5 rounded-full bg-[#D5EFE8] text-[#00B88A] flex items-center justify-center">월</span>
                  <span className="w-5 h-5 rounded-full bg-[#00B88A] text-white flex items-center justify-center">화</span>
                  <span className="w-5 h-5 rounded-full bg-[#D5EFE8] text-[#00B88A] flex items-center justify-center">수</span>
                  <span className="w-5 h-5 rounded-full bg-[#00B88A] text-white flex items-center justify-center">목</span>
                  <span className="w-5 h-5 rounded-full bg-[#D5EFE8] text-[#00B88A] flex items-center justify-center">금</span>
                  <span className="w-5 h-5 rounded-full bg-[#D5EFE8] text-[#00B88A] flex items-center justify-center">토</span>
                </div>
              </div>

              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                고양이 결막염과 호흡기를 지키는 벤토나이트 10종 미세먼지 분광 수치 측정과 30초 응집력 실측 데이터를 전해드려요.
              </p>
            </div>

            <Link
              href="/category/veterinary"
              className="text-xs font-bold text-[#666666] hover:text-[#00B88A] flex items-center justify-center sm:justify-start gap-1"
            >
              레터 미리보기 <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Series Card 3: Smart Gadget & Furniture */}
          <div className="p-8 rounded-3xl bg-[#FAF4FC] dark:bg-[#251A29] border border-[#EEDBF5] dark:border-[#3A2740] flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#A855F7] text-white flex items-center justify-center font-extrabold text-xl mx-auto sm:mx-0 shadow-md">
                ⚡
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                  스마트 가전 & 캣타워
                </h3>
                
                {/* Sending Days Badges */}
                <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-[10px] font-bold">
                  <span className="w-5 h-5 rounded-full bg-[#EEDBF5] text-[#A855F7] flex items-center justify-center">일</span>
                  <span className="w-5 h-5 rounded-full bg-[#EEDBF5] text-[#A855F7] flex items-center justify-center">월</span>
                  <span className="w-5 h-5 rounded-full bg-[#EEDBF5] text-[#A855F7] flex items-center justify-center">화</span>
                  <span className="w-5 h-5 rounded-full bg-[#A855F7] text-white flex items-center justify-center">수</span>
                  <span className="w-5 h-5 rounded-full bg-[#EEDBF5] text-[#A855F7] flex items-center justify-center">목</span>
                  <span className="w-5 h-5 rounded-full bg-[#A855F7] text-white flex items-center justify-center">금</span>
                  <span className="w-5 h-5 rounded-full bg-[#EEDBF5] text-[#A855F7] flex items-center justify-center">토</span>
                </div>
              </div>

              <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
                당신의 심장을 뛰게 할 최첨단 기기 검증. 자동 화장실 300g 무게 센서 정밀 감지 실험과 원목 캣폴 하중 인장 테스트를 알립니다.
              </p>
            </div>

            <Link
              href="/category/travel"
              className="text-xs font-bold text-[#666666] hover:text-[#A855F7] flex items-center justify-center sm:justify-start gap-1"
            >
              레터 미리보기 <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Bottom Action Area with Link Button to /newsletter/settings */}
        <div className="text-center space-y-4 pt-4 border-t border-[#EAE6DF] dark:border-[#333333]">
          <p className="text-xs text-[#666666] font-medium">
            {currentUser
              ? `${currentUser.email} 계정으로 로그인되어 있습니다.`
              : '리터페이퍼 가입 이메일로 뉴스레터 알림이 받아보실 수 있습니다.'}
          </p>

          <Link
            href="/newsletter/settings"
            className="px-8 py-3.5 rounded-2xl bg-[#FF8A00] text-white font-extrabold text-sm hover:bg-[#e07900] transition-all shadow-md inline-flex items-center gap-2"
          >
            <Bell className="w-4 h-4 text-white" />
            <span>뉴스레터 알림 설정</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
