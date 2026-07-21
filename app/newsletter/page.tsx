'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { storage, DEFAULT_NEWSLETTER_SETTINGS } from '@/lib/storage';
import { UserProfile, NewsletterSettings } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { Mail, Sparkles, Check, ArrowRight, ExternalLink, ShieldCheck, Bell } from 'lucide-react';

export default function NewsletterPage() {
  const { showToast } = useToast();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Toggle states matched to screenshot
  const [dailyNews, setDailyNews] = useState(true);
  const [sandReport, setSandReport] = useState(true);
  const [smartGadget, setSmartGadget] = useState(true);
  const [marketingAlerts, setMarketingAlerts] = useState(true);

  useEffect(() => {
    const user = storage.getCurrentUser();
    setCurrentUser(user);
    if (user && user.newsletterSettings) {
      setDailyNews(user.newsletterSettings.dailyNews);
      setSandReport(user.newsletterSettings.sandReport);
      setSmartGadget(user.newsletterSettings.smartGadget);
      setMarketingAlerts(user.newsletterSettings.marketingAlerts);
    }
  }, []);

  const handleSaveSettings = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const updatedSettings: NewsletterSettings = {
      dailyNews,
      sandReport,
      smartGadget,
      marketingAlerts,
      agreedAt: '2026. 07. 21',
    };

    const updatedUser = storage.updateNewsletterSettings(updatedSettings);
    if (updatedUser) {
      setCurrentUser(updatedUser);
      showToast('뉴스레터 알림 설정이 안전하게 저장되었습니다.', 'success');
    }
  };

  const scrollToSettings = () => {
    const settingsElem = document.getElementById('notification-settings-section');
    if (settingsElem) {
      settingsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

        {/* Middle CTA Header */}
        <div className="text-center space-y-4 pt-6">
          <p className="text-xs text-[#666666] font-medium">
            {currentUser
              ? `${currentUser.email} 계정으로 로그인되어 있습니다.`
              : '리터페이퍼 회원가입 시 기본 계정 이메일로 자동 수신 설정됩니다.'}
          </p>
          <button
            onClick={scrollToSettings}
            className="px-8 py-3.5 rounded-2xl bg-[#FF8A00] text-white font-extrabold text-sm hover:bg-[#e07900] transition-all shadow-md inline-flex items-center gap-2"
          >
            <Bell className="w-4 h-4 text-white" />
            <span>뉴스레터 알림 설정</span>
          </button>
        </div>

        {/* NOTIFICATION SETTINGS SECTION (Matching Screenshot 1) */}
        <section
          id="notification-settings-section"
          className="pt-12 border-t border-[#EAE6DF] dark:border-[#333333] space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight">
              알림 설정
            </h2>
            <p className="text-xs font-semibold text-[#666666]">
              뉴스레터 알림 (구독 이메일 : <span className="font-extrabold text-[#333333] dark:text-[#FAF8F5]">{currentUser ? currentUser.email : '로그인 필요 (로그인 시 이메일로 발송)'}</span>)
            </p>
          </div>

          {/* Series Toggles */}
          <div className="space-y-4 max-w-xl">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => setDailyNews(!dailyNews)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    dailyNews ? 'bg-[#FF8A00]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      dailyNews ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-sm font-extrabold">사료 & 습식캔 데일리 검증</span>
              </label>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => setSandReport(!sandReport)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    sandReport ? 'bg-[#FF8A00]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      sandReport ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-sm font-extrabold">모래 & 배변용품 성분 분석</span>
              </label>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => setSmartGadget(!smartGadget)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    smartGadget ? 'bg-[#FF8A00]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      smartGadget ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-sm font-extrabold">스마트 가전 & 캣타워 안전 실험실</span>
              </label>
            </div>
          </div>

          <p className="text-[11px] text-[#666666]">
            뉴스레터 구독 시 <Link href="/privacy" className="underline font-bold">광고성 정보 수신</Link>에 동의한 것으로 간주합니다.
          </p>

          {/* Marketing Alerts Section */}
          <div className="pt-6 border-t border-[#EAE6DF] dark:border-[#333333] space-y-4 max-w-xl">
            <h3 className="text-xs font-bold text-[#666666] uppercase tracking-wider">
              마케팅 알림
            </h3>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => setMarketingAlerts(!marketingAlerts)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    marketingAlerts ? 'bg-[#FF8A00]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      marketingAlerts ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-sm font-extrabold">이벤트 및 소식 알림</span>
              </label>
              <Link href="/terms" className="text-xs text-[#666666] underline">
                약관보기
              </Link>
            </div>

            <p className="text-[11px] text-[#666666]">
              마케팅 정보 수신 동의 : 2026. 07. 21
            </p>
          </div>

          {/* Bottom Save Action Bar */}
          <div className="pt-6 border-t border-[#EAE6DF] dark:border-[#333333] flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-8 py-3.5 rounded-2xl bg-[#FF8A00] text-white font-extrabold text-sm hover:bg-[#e07900] transition-all shadow-md"
            >
              저장
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          const u = storage.getCurrentUser();
          setCurrentUser(u);
        }}
      />
    </div>
  );
}
