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
  ChevronDown
} from 'lucide-react';
import { LitterPaperLogo } from '../ui/LitterPaperLogo';
import { SearchModal } from '../editorial/SearchModal';
import { AuthModal } from '../auth/AuthModal';
import { storage } from '@/lib/storage';
import { CATEGORIES, BREAKING_NEWS } from '@/lib/mockData';
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
  const [tickerIndex, setTickerIndex] = useState(0);

  // Initialize session & bookmark count
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    setBookmarkCount(storage.getBookmarks().length);
    setCurrentUser(storage.getCurrentUser());
  }, [pathname]);

  // Breaking news ticker auto cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % BREAKING_NEWS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

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
      {/* Top Breaking News Ticker Bar */}
      <div className="bg-[#333333] text-[#FAF8F5] text-xs py-2.5 px-4 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="bg-[#C19A6B] text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shrink-0 tracking-wider">
              LITTER PAPER BRIEF
            </span>
            <span className="truncate font-medium hover:underline cursor-pointer text-[#EAE6DF]">
              {BREAKING_NEWS[tickerIndex]}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#FAF8F5]/80 shrink-0">
            <Link href="/premium" className="hover:text-white transition-colors flex items-center gap-1 font-bold text-[#C19A6B]">
              <Crown className="w-3.5 h-3.5" /> 프리미엄 멤버십
            </Link>
            <span className="text-[#555555]">|</span>
            <Link href="/newsletter" className="hover:text-white transition-colors flex items-center gap-1 font-semibold">
              <Sparkles className="w-3 h-3 text-[#C19A6B]" /> 검증 리포트 구독
            </Link>
            <span className="text-[#555555]">|</span>
            <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1 font-semibold">
              <LayoutDashboard className="w-3 h-3" /> CMS 퍼블리셔
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#EAE6DF] dark:border-[#333333] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo with Official Cat-in-Box Symbol */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform p-1">
                <LitterPaperLogo size={36} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-[#333333] dark:text-[#FAF8F5] group-hover:text-[#C19A6B] transition-colors leading-none font-sans">
                  Litter Paper
                </span>
                <span className="text-[11px] font-extrabold text-[#C19A6B] tracking-wider uppercase mt-1">
                  리터페이퍼 • 100% 내돈내산 리뷰
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#666666] dark:text-[#A0A0A0]">
              <Link
                href="/category/nutrition"
                className={`transition-colors ${
                  pathname === '/category/nutrition'
                    ? 'text-[#333333] dark:text-[#FAF8F5] font-extrabold border-b-2 border-[#C19A6B] pb-1'
                    : 'hover:text-[#333333] dark:hover:text-[#FAF8F5]'
                }`}
              >
                사료 & 습식캔
              </Link>

              <Link
                href="/category/veterinary"
                className={`transition-colors ${
                  pathname === '/category/veterinary'
                    ? 'text-[#333333] dark:text-[#FAF8F5] font-extrabold border-b-2 border-[#C19A6B] pb-1'
                    : 'hover:text-[#333333] dark:hover:text-[#FAF8F5]'
                }`}
              >
                모래 & 배변
              </Link>

              <Link
                href="/category/behavior"
                className={`transition-colors ${
                  pathname === '/category/behavior'
                    ? 'text-[#333333] dark:text-[#FAF8F5] font-extrabold border-b-2 border-[#C19A6B] pb-1'
                    : 'hover:text-[#333333] dark:hover:text-[#FAF8F5]'
                }`}
              >
                캣타워 & 가구
              </Link>

              <Link
                href="/category/travel"
                className={`transition-colors ${
                  pathname === '/category/travel'
                    ? 'text-[#333333] dark:text-[#FAF8F5] font-extrabold border-b-2 border-[#C19A6B] pb-1'
                    : 'hover:text-[#333333] dark:hover:text-[#FAF8F5]'
                }`}
              >
                스마트 가전
              </Link>

              <Link
                href="/category/rescue"
                className={`flex items-center gap-1.5 transition-colors ${
                  pathname === '/category/rescue'
                    ? 'text-[#C19A6B] font-extrabold border-b-2 border-[#C19A6B] pb-1'
                    : 'hover:text-[#333333] dark:hover:text-[#FAF8F5]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#C19A6B]" />
                내돈내산 검증
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
                        <div className="pt-1">
                          {currentUser.isPremium ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C19A6B] text-white text-[10px] font-extrabold">
                              <Crown className="w-3 h-3" /> 프리미엄 멤버
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#666666] text-[10px] font-medium border">
                              일반 독자 회원
                            </span>
                          )}
                        </div>
                      </div>

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

                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#1A1A1A] font-semibold text-[#666666]"
                      >
                        <LayoutDashboard className="w-4 h-4" /> CMS 퍼블리셔
                      </Link>

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
          <div className="md:hidden border-t border-[#EAE6DF] dark:border-[#333333] bg-[#FAF8F5] dark:bg-[#1A1A1A] px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/category/nutrition"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-[#333333] dark:text-[#FAF8F5]"
            >
              🥫 사료 & 습식캔
            </Link>
            <Link
              href="/category/veterinary"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#333333] dark:text-[#FAF8F5]"
            >
              📦 모래 & 배변용품
            </Link>
            <Link
              href="/category/behavior"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#333333] dark:text-[#FAF8F5]"
            >
              🪵 캣타워 & 가구
            </Link>
            <Link
              href="/category/travel"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#333333] dark:text-[#FAF8F5]"
            >
              ⚡ 스마트 가전
            </Link>
            <Link
              href="/category/rescue"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#C19A6B]"
            >
              🛡️ 내돈내산 검증
            </Link>
            <div className="pt-3 border-t border-[#EAE6DF] dark:border-[#333333] flex justify-between text-xs text-[#666666]">
              <Link href="/premium" onClick={() => setIsMobileMenuOpen(false)}>프리미엄 멤버십</Link>
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
