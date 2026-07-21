'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Rss, 
  MessageSquare, 
  Settings, 
  ShieldCheck,
  ChevronLeft,
  Crown,
  LogOut
} from 'lucide-react';
import { LitterPaperLogo } from '../ui/LitterPaperLogo';
import { storage } from '@/lib/storage';
import { useToast } from '../ui/Toast';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogoutAdmin = () => {
    storage.logoutAdmin();
    showToast('관리자 세션이 종료되었습니다.', 'info');
    window.location.reload();
  };

  const navItems = [
    {
      name: '대시보드 & 24h 현황',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: '기사 작성 & 에디터',
      href: '/admin/articles',
      icon: FileText,
    },
    {
      name: 'RSS 뉴스 수집 & AI 요약',
      href: '/admin/rss',
      icon: Rss,
    },
    {
      name: '댓글 및 독자 반응',
      href: '/admin/comments',
      icon: MessageSquare,
    },
  ];

  return (
    <aside className="w-64 bg-[#242424] text-[#FAF8F5] border-r border-[#333333] flex flex-col justify-between shrink-0 font-sans min-h-screen">
      <div className="p-6 space-y-6">
        
        {/* Brand Header */}
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1 border border-[#333333] group-hover:scale-105 transition-transform">
              <LitterPaperLogo size={28} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white leading-none">
                Litter Paper
              </span>
              <span className="text-[10px] font-bold text-[#C19A6B] tracking-wider uppercase mt-1">
                CMS 퍼블리셔
              </span>
            </div>
          </Link>

          <div className="p-3 rounded-2xl bg-[#333333] border border-[#444444] space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#C19A6B] font-bold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 최고 관리자 인가됨
              </span>
            </div>
            <p className="text-[10px] text-white/60">
              admin@litterpaper.kr
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold transition-all ${
                  isActive
                    ? 'bg-[#C19A6B] text-white shadow-md'
                    : 'text-white/70 hover:bg-[#333333] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-[#333333] space-y-2 text-xs">
        <Link
          href="/"
          className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl bg-[#333333] text-white/80 hover:text-white font-bold transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <ChevronLeft className="w-4 h-4" /> 메인 홈으로 이동
          </span>
        </Link>

        <button
          onClick={handleLogoutAdmin}
          className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 font-bold transition-colors border border-red-900/40"
        >
          <span className="flex items-center gap-1.5">
            <LogOut className="w-4 h-4" /> 관리자 세션 로그아웃
          </span>
        </button>
      </div>
    </aside>
  );
}
