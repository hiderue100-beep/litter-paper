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
  Newspaper, 
  BookOpen, 
  ShieldCheck,
  TrendingUp,
  LayoutDashboard,
  Crown,
  ShoppingBag,
  Box,
  Zap,
  Tag,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
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
      <div className="bg-[#3D5A40] text-[#E8DCC7] text-xs py-2 px-4 border-b border-[#2F4732]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="bg-[#E8DCC7] text-[#3D5A40] font-extrabold text-[10px] px-2 py-0.5 rounded-full shrink-0 tracking-wider">
              LITTER PAPER BRIEF
            </span>
            <span className="truncate font-medium hover:underline cursor-pointer">
              {BREAKING_NEWS[tickerIndex]}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#E8DCC7]/80 shrink-0">
            <Link href="/premium" className="hover:text-white transition-colors flex items-center gap-1 font-bold text-[#E8DCC7]">
              <Crown className="w-3.5 h-3.5 text-[#C77B30]" /> 프리미엄 멤버십
            </Link>
            <span className="text-[#2F4732]">|</span>
            <Link href="/newsletter" className="hover:text-white transition-colors flex items-center gap-1 font-semibold">
              <Sparkles className="w-3 h-3 text-[#C77B30]" /> 검증 리포트 구독
            </Link>
            <span className="text-[#2F4732]">|</span>
            <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1 font-semibold">
              <LayoutDashboard className="w-3 h-3" /> CMS 퍼블리셔
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF9F7]/95 dark:bg-[#141815]/95 backdrop-blur-md border-b border-[#ECECEC] dark:border-[#2A332C] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-[#3D5A40] text-[#E8DCC7] flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5 text-[#E8DCC7]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl font-serif-editorial tracking-tight text-[#202020] dark:text-[#F2F5F3] group-hover:text-[#3D5A40] dark:group-hover:text-[#E8DCC7] transition-colors">
                  LITTER PAPER
                </span>
                <span className="text-[10px] font-bold text-[#6E6E6E] dark:text-[#9EAAA0] tracking-widest uppercase -mt-1">
                  리터페이퍼 • 100% 내돈내산 리뷰
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6E6E6E] dark:text-[#9EAAA0]">
              <Link
                href="/category/nutrition"
                className={`transition-colors ${
                  pathname === '/category/nutrition'
                    ? 'text-[#3D5A40] dark:text-[#E8DCC7] font-bold'
                    : 'hover:text-[#202020] dark:hover:text-[#F2F5F3]'
                }`}
              >
                사료 & 습식캔
              </Link>

              <Link
                href="/category/veterinary"
                className={`transition-colors ${
                  pathname === '/category/veterinary'
                    ? 'text-[#3D5A40] dark:text-[#E8DCC7] font-bold'
                    : 'hover:text-[#202020] dark:hover:text-[#F2F5F3]'
                }`}
              >
                모래 & 배변
              </Link>

              <Link
                href="/category/behavior"
                className={`transition-colors ${
                  pathname === '/category/behavior'
                    ? 'text-[#3D5A40] dark:text-[#E8DCC7] font-bold'
                    : 'hover:text-[#202020] dark:hover:text-[#F2F5F3]'
                }`}
              >
                캣타워 & 가구
              </Link>

              <Link
                href="/category/travel"
                className={`transition-colors ${
                  pathname === '/category/travel'
                    ? 'text-[#3D5A40] dark:text-[#E8DCC7] font-bold'
                    : 'hover:text-[#202020] dark:hover:text-[#F2F5F3]'
                }`}
              >
                스마트 가전
              </Link>

              <Link
                href="/category/rescue"
                className={`flex items-center gap-1.5 transition-colors ${
                  pathname === '/category/rescue'
                    ? 'text-[#3D5A40] dark:text-[#E8DCC7] font-bold'
                    : 'hover:text-[#202020] dark:hover:text-[#F2F5F3]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#3D5A40] dark:text-[#E8DCC7]" />
                내돈내산 검증
              </Link>
            </nav>

            {/* Right Action Icons & User Session */}
            <div className="flex items-center gap-3">
              {/* Global Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-[#ECECEC]/60 dark:hover:bg-[#2A332C]/60 text-[#202020] dark:text-[#F2F5F3] transition-colors"
                title="상품 검증 검색 (Cmd+K)"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Bookmarks */}
              <Link
                href="/bookmarks"
                className="relative p-2.5 rounded-full hover:bg-[#ECECEC]/60 dark:hover:bg-[#2A332C]/60 text-[#202020] dark:text-[#F2F5F3] transition-colors"
                title="내 보관함"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarkCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#C77B30] text-white text-[10px] font-bold flex items-center justify-center">
                    {bookmarkCount}
                  </span>
                )}
              </Link>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-full hover:bg-[#ECECEC]/60 dark:hover:bg-[#2A332C]/60 text-[#202020] dark:text-[#F2F5F3] transition-colors"
                title="다크 모드 전환"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-[#E8DCC7]" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* User Authentication Menu */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2 rounded-full border border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40] transition-colors bg-white dark:bg-[#252C26]"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#3D5A40]"
                    />
                    <span className="hidden sm:inline text-xs font-bold text-[#202020] dark:text-[#F2F5F3] max-w-[90px] truncate">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#6E6E6E]" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1D231E] rounded-2xl shadow-xl border border-[#ECECEC] dark:border-[#2A332C] p-2 space-y-1 text-xs z-50">
                      <div className="p-3 border-b border-[#ECECEC] dark:border-[#2A332C] space-y-1">
                        <div className="font-bold text-[#202020] dark:text-[#F2F5F3]">
                          {currentUser.name}
                        </div>
                        <div className="text-[11px] text-[#6E6E6E] truncate">
                          {currentUser.email}
                        </div>
                        <div className="pt-1">
                          {currentUser.isPremium ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8DCC7] text-[#3D5A40] text-[10px] font-extrabold">
                              <Crown className="w-3 h-3 text-[#C77B30]" /> 프리미엄 멤버
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF9F7] dark:bg-[#252C26] text-[#6E6E6E] text-[10px] font-medium border">
                              일반 독자 회원
                            </span>
                          )}
                        </div>
                      </div>

                      <Link
                        href="/bookmarks"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FAF9F7] dark:hover:bg-[#252C26] font-semibold text-[#202020] dark:text-[#F2F5F3]"
                      >
                        <Bookmark className="w-4 h-4 text-[#3D5A40]" /> 내 보관함 & 히스토리
                      </Link>

                      <Link
                        href="/premium"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FAF9F7] dark:hover:bg-[#252C26] font-bold text-[#C77B30]"
                      >
                        <Crown className="w-4 h-4" /> 프리미엄 멤버십 관리
                      </Link>

                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FAF9F7] dark:hover:bg-[#252C26] font-semibold text-[#6E6E6E]"
                      >
                        <LayoutDashboard className="w-4 h-4" /> CMS 퍼블리셔
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 font-bold text-left transition-colors pt-2 border-t border-[#ECECEC] dark:border-[#2A332C]"
                      >
                        <LogOut className="w-4 h-4" /> 로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3D5A40] text-white text-xs font-extrabold hover:bg-[#2F4732] transition-colors shadow-xs"
                >
                  <User className="w-4 h-4" /> 로그인 / 회원가입
                </button>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full hover:bg-[#ECECEC]/60 dark:hover:bg-[#2A332C]/60 text-[#202020] dark:text-[#F2F5F3]"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#ECECEC] dark:border-[#2A332C] bg-[#FAF9F7] dark:bg-[#141815] px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/category/nutrition"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-[#3D5A40] dark:text-[#E8DCC7]"
            >
              🥫 사료 & 습식캔
            </Link>
            <Link
              href="/category/veterinary"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#202020] dark:text-[#F2F5F3]"
            >
              📦 모래 & 배변용품
            </Link>
            <Link
              href="/category/behavior"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#202020] dark:text-[#F2F5F3]"
            >
              🪵 캣타워 & 가구
            </Link>
            <Link
              href="/category/travel"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#202020] dark:text-[#F2F5F3]"
            >
              ⚡ 스마트 가전
            </Link>
            <Link
              href="/category/rescue"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#202020] dark:text-[#F2F5F3]"
            >
              🛡️ 내돈내산 검증
            </Link>
            <div className="pt-3 border-t border-[#ECECEC] dark:border-[#2A332C] flex justify-between text-xs text-[#6E6E6E]">
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
