'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, User, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { storage } from '@/lib/storage';
import { useToast } from '../ui/Toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  if (!isOpen) return null;

  const handleSocialLogin = (provider: 'google' | 'naver') => {
    const user = storage.loginSocial(provider);
    showToast(
      provider === 'google'
        ? 'Google 계정으로 로그인되었습니다.'
        : '네이버 계정으로 로그인되었습니다.',
      'success'
    );
    if (onSuccess) onSuccess();
    onClose();
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('이메일과 비밀번호를 입력해 주세요.', 'error');
      return;
    }

    if (activeTab === 'signup') {
      if (!agreeTerms) {
        showToast('서비스 이용약관에 동의해 주세요.', 'error');
        return;
      }
      const user = storage.signupEmail(email, password, name);
      showToast(`반갑습니다, ${user.name}님! 회원가입이 완료되었습니다.`);
    } else {
      const user = storage.loginEmail(email, password);
      showToast(`${user.name}님, 환영합니다!`);
    }

    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1D231E] rounded-3xl shadow-2xl border border-[#ECECEC] dark:border-[#2A332C] p-6 sm:p-8 space-y-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ECECEC] dark:border-[#2A332C]">
          <div>
            <h3 className="font-bold font-serif-editorial text-lg text-[#202020] dark:text-[#F2F5F3]">
              LITTER PAPER 독자 라운지
            </h3>
            <p className="text-xs text-[#6E6E6E]">
              100% 내돈내산 반려동물 용품 검증 저널
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-[#6E6E6E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Login / Signup Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'login'
                ? 'bg-[#3D5A40] text-white shadow-xs'
                : 'text-[#6E6E6E] hover:text-[#202020]'
            }`}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'signup'
                ? 'bg-[#3D5A40] text-white shadow-xs'
                : 'text-[#6E6E6E] hover:text-[#202020]'
            }`}
          >
            회원가입
          </button>
        </div>

        {/* Social OAuth Buttons */}
        <div className="space-y-2.5">
          {/* Google Social */}
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40] text-[#202020] dark:text-[#F2F5F3] font-bold text-xs flex items-center justify-center gap-3 transition-all shadow-2xs"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google 계정으로 {activeTab === 'signup' ? '시작하기' : '로그인'}</span>
          </button>

          {/* Naver Social */}
          <button
            type="button"
            onClick={() => handleSocialLogin('naver')}
            className="w-full py-3 px-4 rounded-2xl bg-[#03CF5D] hover:bg-[#02b350] text-white font-bold text-xs flex items-center justify-center gap-3 transition-all shadow-2xs"
          >
            <span className="w-4 h-4 rounded-md bg-white text-[#03CF5D] flex items-center justify-center font-extrabold text-[10px] shrink-0">
              N
            </span>
            <span>네이버 계정으로 {activeTab === 'signup' ? '시작하기' : '로그인'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 text-[11px] text-[#6E6E6E]">
          <div className="flex-1 h-px bg-[#ECECEC] dark:bg-[#2A332C]" />
          <span>또는 이메일로 {activeTab === 'signup' ? '가입' : '로그인'}</span>
          <div className="flex-1 h-px bg-[#ECECEC] dark:bg-[#2A332C]" />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3.5 text-xs">
          {activeTab === 'signup' && (
            <div>
              <label className="block font-bold text-[#6E6E6E] mb-1">이름 / 닉네임</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-[#6E6E6E]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 치즈태비 집사"
                  required={activeTab === 'signup'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] focus:outline-hidden focus:border-[#3D5A40]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-[#6E6E6E] mb-1">이메일 주소</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#6E6E6E]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] focus:outline-hidden focus:border-[#3D5A40]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#6E6E6E] mb-1">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#6E6E6E]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] focus:outline-hidden focus:border-[#3D5A40]"
              />
            </div>
          </div>

          {activeTab === 'signup' && (
            <label className="flex items-center gap-2 text-[11px] text-[#6E6E6E] pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#3D5A40]"
              />
              <span>서비스 이용약관 및 개인정보 처리방침 동의</span>
            </label>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#3D5A40] text-white font-extrabold text-xs hover:bg-[#2F4732] transition-colors shadow-md flex items-center justify-center gap-1.5"
          >
            <span>{activeTab === 'signup' ? '회원가입 완료' : '이메일 로그인'}</span>
            <ArrowRight className="w-4 h-4 text-[#E8DCC7]" />
          </button>
        </form>
      </div>
    </div>
  );
}
