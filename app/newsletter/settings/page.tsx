'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { storage } from '@/lib/storage';
import { UserProfile, NewsletterSettings } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { ChevronLeft, Check, Bell } from 'lucide-react';

export default function NewsletterSettingsPage() {
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 w-full">
        
        {/* Back Link */}
        <div>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#666666] hover:text-[#FF8A00] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> 뉴스레터 안내 페이지로 돌아가기
          </Link>
        </div>

        {/* NOTIFICATION SETTINGS SECTION (Matching Screenshot 1) */}
        <section className="space-y-8 bg-white dark:bg-[#242424] p-8 sm:p-12 rounded-3xl border border-[#EAE6DF] dark:border-[#333333] shadow-2xs">
          <div className="space-y-2 pb-6 border-b border-[#EAE6DF] dark:border-[#333333]">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              알림 설정
            </h1>
            <p className="text-xs font-semibold text-[#666666]">
              뉴스레터 알림 (구독 이메일 : <span className="font-extrabold text-[#333333] dark:text-[#FAF8F5]">{currentUser ? currentUser.email : '로그인 시 이메일로 발송'}</span>)
            </p>
          </div>

          {/* Series Toggles */}
          <div className="space-y-5 max-w-xl">
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
