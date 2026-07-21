'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { storage } from '@/lib/storage';
import { ShieldAlert, ArrowLeft, User } from 'lucide-react';
import { LitterPaperLogo } from '../ui/LitterPaperLogo';
import { AuthModal } from '../auth/AuthModal';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    setIsAuthenticated(storage.isAdminLoggedIn());
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    if (storage.isAdminLoggedIn()) {
      setIsAuthenticated(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#666666] font-sans">
        관리자 보안 권한을 검증 중입니다...
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
        <div className="w-full max-w-md bg-white dark:bg-[#242424] rounded-3xl shadow-2xl border border-[#EAE6DF] dark:border-[#333333] p-8 space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-3xl bg-[#333333] text-white flex items-center justify-center mx-auto shadow-md p-2 border border-[#C19A6B]">
            <LitterPaperLogo size={44} />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 text-xs font-extrabold border border-red-200 dark:border-red-900/40">
              <ShieldAlert className="w-4 h-4" /> 관리자 권한 필요
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight">
              접근이 제한된 페이지입니다
            </h2>
            <p className="text-xs text-[#666666] dark:text-[#A0A0A0] leading-relaxed">
              Litter Paper 퍼블리셔 대시보드는 최고 관리자 계정으로 로그인한 경우에만 이용 가능합니다.
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-[#333333] text-white font-extrabold text-xs hover:bg-[#C19A6B] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-[#C19A6B]" />
              <span>관리자 계정으로 로그인하기</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 w-full py-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] text-xs font-bold text-[#666666] hover:text-[#333333] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> 메인 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
