'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Bookmark, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck,
  LayoutDashboard,
  Crown,
  User,
  LogOut,
  ChevronDown,
  Mail,
  Info,
  Flame,
  Vote
} from 'lucide-react';
import { SearchModal } from '../editorial/SearchModal';
import { AuthModal } from '../auth/AuthModal';
import { storage } from '@/lib/storage';
import { UserProfile } from '@/types';
import { useToast } from '../ui/Toast';

export function Navbar() {
  const pathname = usePathname();
  const { showToast } = useToast();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  // Initialize session & bookmark count
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    setBookmarkCount(storage.getBookmarks().length);
    setCurrentUser(storage.getCurrentUser());
  }, [pathname]);

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    storage.logout();
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    showToast('안전하게 로그아웃되었습니다.', 'info');
  };

  return (
    <>
      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#EAE6DF] dark:border-[#333333] transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            
            {/* Brand Logo - LITTERPAPER Wordmark */}
            <Link href="/" className="group shrink-0">
              <span className="font-black text-2xl sm:text-[28px] tracking-tight text-[#111111] dark:text-[#FAF8F5] group-hover:text-[#C19A6B] transition-colors leading-none" style={{fontFamily: 'sans-serif', letterSpacing: '-0.02em'}}>
                LITTERPAPER
              </span>
            </Link>

            {/* Desktop Navigation Links (EXACT 5 RESTRUCTURED ITEMS) */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#666666] dark:text-[#A0A0A0]">
              {/* 1. 리터페이퍼란? */}
              <Link
                href="/about"
                className={`transition-colors ${
                  pathname === '/about'
                    ? 'text-[#333333] dark:text-[#FAF8F5] font-black border-b-2 border-[#C19A6B] pb-1'
                    : 'hover:text-[#333333] dark:hover:text-[#FAF8F5]'
                }`}
              >
                리터페이퍼란?
              </Link>

              {/* 2. 요즘 화제 */}
              <Link
                href="/trending"
                className={`transition-colors flex items-center gap-1 ${
                  pathname === '/trending'
                    ? 'text-[#333333] dark:text-[#FAF8F5] font-black border-b-2 border-[#C19A6B] pb-1'
                    : 'hover:text-[#333333] dark:hover:text-[#FAF8F5]'
                }`}
              >
                <Flame className="w-4 h-4 text-[#C19A6B]" /> 요즘 화제
              </Link>

              {/* 3. 픽캣 */}
              <Link
                href="/pickcat"
                className={`transition-colors flex items-center gap-1 ${
                  pathname === '/pickcat'
                    ? 'text-[#333333] dark:text-[#FAF8F5] font-black border-b-2 border-[#C19A6B] pb-1'
                    : 'hover:text-[#333333] dark:hover:text-[#FAF8F5]'
                }`}
              >
                <Vote className="w-4 h-4 text-[#C19A6B]" /> 픽캣
              </Link>

              {/* 4. 프리미엄 */}
              <Link
                href="/premium"
                className={`transition-colors flex items-center gap-1 ${
                  pathname === '/premium'
                    ? 'text-[#C19A6B] font-black border-b-2 border-[#C19A6B] pb-1'
                    : 'hover:text-[#C19A6B]'
                }`}
              >
                <Crown className="w-4 h-4 text-[#C19A6B]" /> 프리미엄
              </Link>

              {/* 5. 뉴스레터 */}
              <Link
                href="/newsletter"
                className={`transition-colors flex items-center gap-1 ${
                  pathname === '/newsletter' || pathname === '/newsletter/settings'
                    ? 'text-[#333333] dark:text-[#FAF8F5] font-black border-b-2 border-[#C19A6B] pb-1'
                    : 'hover:text-[#333333] dark:hover:text-[#FAF8F5]'
                }`}
              >
                <Mail className="w-4 h-4" /> 뉴스레터
              </Link>
            </nav>

            {/* Right Action Icons & User Session */}
            <div className="flex items-center gap-3">
              {/* Global Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-[#EAE6DF]/60 dark:hover:bg-[#333333]/60 text-[#333333] dark:text-[#FAF8F5] transition-colors"
                title="상품 검증 검색 (Cmd+K)"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Bookmarks */}
              <Link
                href="/bookmarks"
                className="relative p-2.5 rounded-full hover:bg-[#EAE6DF]/60 dark:hover:bg-[#333333]/60 text-[#333333] dark:text-[#FAF8F5] transition-colors"
                title="내 보관함"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarkCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#C19A6B] text-white text-[10px] font-bold flex items-center justify-center">
                    {bookmarkCount}
                  </span>
                )}
              </Link>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-full hover:bg-[#EAE6DF]/60 dark:hover:bg-[#333333]/60 text-[#333333] dark:text-[#FAF8F5] transition-colors"
                title="다크 모드 전환"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-[#C19A6B]" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* User Authentication Menu */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2 rounded-full border border-[#EAE6DF] dark:border-[#333333] hover:border-[#C19A6B] transition-colors bg-white dark:bg-[#242424]"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#C19A6B]"
                    />
                    <span className="hidden sm:inline text-xs font-extrabold text-[#333333] dark:text-[#FAF8F5] max-w-[90px] truncate">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#666666]" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#242424] rounded-2xl shadow-xl border border-[#EAE6DF] dark:border-[#333333] p-2 space-y-1 text-xs z-50">
                      <div className="p-3 border-b border-[#EAE6DF] dark:border-[#333333] space-y-1">
                        <div className="font-bold text-[#333333] dark:text-[#FAF8F5]">
                          {currentUser.name}
                        </div>
                        <div className="text-[11px] text-[#666666] truncate">
                          {currentUser.email}
                        </div>
                        <div className="pt-1 flex flex-wrap gap-1">
                          {currentUser.isAdmin && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#333333] text-white text-[10px] font-extrabold">
                              ⚙️ 최고 관리자
                            </span>
                          )}
                          {currentUser.isPremium ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C19A6B] text-white text-[10px] font-extrabold">
                              <Crown className="w-3 h-3" /> 프리미엄 멤버
                            </span>
                          ) : (
                            !currentUser.isAdmin && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#666666] text-[10px] font-medium border">
                                일반 독자 회원
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <Link
                        href="/newsletter/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#1A1A1A] font-bold text-[#C19A6B]"
                      >
                        <Mail className="w-4 h-4" /> 뉴스레터 알림 설정
                      </Link>

                      <Link
                        href="/bookmarks"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#1A1A1A] font-semibold text-[#333333] dark:text-[#FAF8F5]"
                      >
                        <Bookmark className="w-4 h-4 text-[#C19A6B]" /> 내 보관함 & 히스토리
                      </Link>

                      <Link
                        href="/premium"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#1A1A1A] font-bold text-[#C19A6B]"
                      >
                        <Crown className="w-4 h-4" /> 프리미엄 멤버십 관리
                      </Link>

                      {/* Display CMS Link ONLY for Admin Users */}
                      {currentUser.isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#333333] text-white font-extrabold shadow-2xs hover:bg-[#C19A6B] transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#C19A6B]" /> CMS 퍼블리셔 관리자
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 font-bold text-left transition-colors pt-2 border-t border-[#EAE6DF] dark:border-[#333333]"
                      >
                        <LogOut className="w-4 h-4" /> 로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#333333] text-white text-xs font-extrabold hover:bg-[#C19A6B] transition-colors shadow-xs"
                >
                  <User className="w-4 h-4" /> 로그인 / 회원가입
                </button>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full hover:bg-[#EAE6DF]/60 dark:hover:bg-[#333333]/60 text-[#333333] dark:text-[#FAF8F5]"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#EAE6DF] dark:border-[#333333] bg-[#FAF8F5] dark:bg-[#1A1A1A] px-4 pt-3 pb-6 space-y-3 font-extrabold">
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-[#333333] dark:text-[#FAF8F5]"
            >
              📖 리터페이퍼란?
            </Link>
            <Link
              href="/trending"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-[#333333] dark:text-[#FAF8F5]"
            >
              🔥 요즘 화제
            </Link>
            <Link
              href="/pickcat"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-[#333333] dark:text-[#FAF8F5]"
            >
              🐾 픽캣 (투표 & 100자 토론)
            </Link>
            <Link
              href="/premium"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-[#C19A6B]"
            >
              👑 프리미엄 아카이브
            </Link>
            <Link
              href="/newsletter"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-[#333333] dark:text-[#FAF8F5]"
            >
              📧 뉴스레터
            </Link>
            <div className="pt-3 border-t border-[#EAE6DF] dark:border-[#333333] flex justify-between text-xs text-[#666666]">
              <Link href="/newsletter/settings" onClick={() => setIsMobileMenuOpen(false)}>알림 설정</Link>
              <button onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }}>로그인/가입</button>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setCurrentUser(storage.getCurrentUser())}
      />
    </>
  );
}
