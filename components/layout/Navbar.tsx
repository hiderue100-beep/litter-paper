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
  Stethoscope, 
  ShieldCheck,
  TrendingUp,
  LayoutDashboard,
  Crown
} from 'lucide-react';
import { SearchModal } from '../editorial/SearchModal';
import { storage } from '@/lib/storage';
import { CATEGORIES, BREAKING_NEWS } from '@/lib/mockData';

export function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Initialize theme & bookmark count
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    setBookmarkCount(storage.getBookmarks().length);
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
              <Sparkles className="w-3 h-3 text-[#C77B30]" /> 일간 뉴스레터 구독
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
                <BookOpen className="w-5 h-5 text-[#E8DCC7]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl font-serif-editorial tracking-tight text-[#202020] dark:text-[#F2F5F3] group-hover:text-[#3D5A40] dark:group-hover:text-[#E8DCC7] transition-colors">
                  LITTER PAPER
                </span>
                <span className="text-[10px] font-bold text-[#6E6E6E] dark:text-[#9EAAA0] tracking-widest uppercase -mt-1">
                  리터페이퍼 • Cat Media
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6E6E6E] dark:text-[#9EAAA0]">
              <Link
                href="/veterinary"
                className={`flex items-center gap-1.5 transition-colors ${
                  pathname === '/veterinary'
                    ? 'text-[#3D5A40] dark:text-[#E8DCC7] font-bold'
                    : 'hover:text-[#202020] dark:hover:text-[#F2F5F3]'
                }`}
              >
                <Stethoscope className="w-4 h-4 text-[#3D5A40] dark:text-[#E8DCC7]" />
                수의학 지식
              </Link>

              <Link
                href="/category/behavior"
                className={`transition-colors ${
                  pathname === '/category/behavior'
                    ? 'text-[#3D5A40] dark:text-[#E8DCC7] font-bold'
                    : 'hover:text-[#202020] dark:hover:text-[#F2F5F3]'
                }`}
              >
                행동 심리학
              </Link>

              <Link
                href="/category/nutrition"
                className={`transition-colors ${
                  pathname === '/category/nutrition'
                    ? 'text-[#3D5A40] dark:text-[#E8DCC7] font-bold'
                    : 'hover:text-[#202020] dark:hover:text-[#F2F5F3]'
                }`}
              >
                영양 & 사료
              </Link>

              <Link
                href="/breeds"
                className={`transition-colors ${
                  pathname === '/breeds'
                    ? 'text-[#3D5A40] dark:text-[#E8DCC7] font-bold'
                    : 'hover:text-[#202020] dark:hover:text-[#F2F5F3]'
                }`}
              >
                묘종 도감
              </Link>

              <Link
                href="/category/rescue"
                className={`transition-colors ${
                  pathname === '/category/rescue'
                    ? 'text-[#3D5A40] dark:text-[#E8DCC7] font-bold'
                    : 'hover:text-[#202020] dark:hover:text-[#F2F5F3]'
                }`}
              >
                입양 & 구조
              </Link>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3">
              {/* Global Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-[#ECECEC]/60 dark:hover:bg-[#2A332C]/60 text-[#202020] dark:text-[#F2F5F3] transition-colors"
                title="에디토리얼 검색 (Cmd+K)"
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
              href="/veterinary"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-[#3D5A40] dark:text-[#E8DCC7]"
            >
              🩺 수의학 지식 Hub
            </Link>
            <Link
              href="/category/behavior"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#202020] dark:text-[#F2F5F3]"
            >
              🐱 행동 심리학
            </Link>
            <Link
              href="/category/nutrition"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#202020] dark:text-[#F2F5F3]"
            >
              🐟 영양 & 사료
            </Link>
            <Link
              href="/breeds"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#202020] dark:text-[#F2F5F3]"
            >
              📖 묘종 도감
            </Link>
            <Link
              href="/category/rescue"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-[#202020] dark:text-[#F2F5F3]"
            >
              🐾 입양 & 구조
            </Link>
            <div className="pt-3 border-t border-[#ECECEC] dark:border-[#2A332C] flex justify-between text-xs text-[#6E6E6E]">
              <Link href="/newsletter" onClick={() => setIsMobileMenuOpen(false)}>뉴스레터 구독</Link>
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>CMS 퍼블리셔</Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
