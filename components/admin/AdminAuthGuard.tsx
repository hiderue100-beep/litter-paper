'use client';

import React, { useState, useEffect } from 'react';
import { storage, DEFAULT_ADMIN } from '@/lib/storage';
import { ShieldCheck, Lock, Mail, Key, ArrowRight, Sparkles } from 'lucide-react';
import { LitterPaperLogo } from '../ui/LitterPaperLogo';
import { useToast } from '../ui/Toast';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(storage.isAdminLoggedIn());
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = storage.loginAdmin(email, password);
    if (success) {
      setIsAuthenticated(true);
      showToast('최고 관리자 인증에 성공했습니다.', 'success');
    } else {
      showToast('관리자 이메일 또는 비밀번호가 올바르지 않습니다.', 'error');
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail(DEFAULT_ADMIN.email);
    setPassword(DEFAULT_ADMIN.password);
    showToast('기본 관리자 접속 정보가 입력되었습니다.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#666666] font-sans">
        보안 인증 상태를 확인 중입니다...
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
      <div className="w-full max-w-md bg-white dark:bg-[#242424] rounded-3xl shadow-2xl border border-[#EAE6DF] dark:border-[#333333] p-8 space-y-6">
        
        {/* Brand Logo & Security Badge */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-[#333333] text-white flex items-center justify-center mx-auto shadow-md p-2 border border-[#C19A6B]">
            <LitterPaperLogo size={44} />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C19A6B]/20 text-[#C19A6B] text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> 관리자 보안 로그인 관문
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Litter Paper CMS 퍼블리셔
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#A0A0A0]">
            인가된 최고 관리자만 기사 작성 및 퍼블리싱 시스템에 접근할 수 있습니다.
          </p>
        </div>

        {/* Demo Credentials Hint Box */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#C19A6B] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 기본 관리자 접속 정보
            </span>
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="text-[11px] font-extrabold text-[#333333] dark:text-[#FAF8F5] hover:underline"
            >
              자동 채우기
            </button>
          </div>
          <div className="text-[11px] text-[#666666] dark:text-[#A0A0A0] space-y-0.5 font-mono">
            <div>아이디: <span className="font-bold text-[#333333] dark:text-[#FAF8F5]">{DEFAULT_ADMIN.email}</span></div>
            <div>비밀번호: <span className="font-bold text-[#333333] dark:text-[#FAF8F5]">{DEFAULT_ADMIN.password}</span></div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#666666] mb-1">
              관리자 이메일
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#666666]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@litterpaper.kr"
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] text-xs font-mono focus:outline-hidden focus:border-[#C19A6B]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#666666] mb-1">
              관리자 비밀번호
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3 w-4 h-4 text-[#666666]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] text-xs font-mono focus:outline-hidden focus:border-[#C19A6B]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-[#333333] text-white font-extrabold text-xs hover:bg-[#C19A6B] transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <span>관리자 세션 인증 및 접속</span>
            <ArrowRight className="w-4 h-4 text-[#C19A6B]" />
          </button>
        </form>
      </div>
    </div>
  );
}
