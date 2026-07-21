'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Rss, MessageSquare, BookOpen, Home } from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: '대시보드 (Dashboard)', icon: LayoutDashboard },
    { href: '/admin/articles', label: '기사 작성 & AI 에디터', icon: FileText },
    { href: '/admin/rss', label: 'RSS 자동 수집 & AI 요약', icon: Rss },
    { href: '/admin/comments', label: '댓글 & 신고 관리', icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-[#3D5A40] text-[#E8DCC7] shrink-0 p-6 flex flex-col justify-between min-h-screen">
      <div className="space-y-8">
        {/* Brand */}
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#E8DCC7] text-[#3D5A40] flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold font-serif-editorial text-white text-lg">
              LITTER PAPER
            </div>
            <div className="text-[10px] text-[#E8DCC7]/70 uppercase font-semibold">
              CMS Publisher Suite
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2 text-xs font-semibold">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-[#E8DCC7] text-[#3D5A40] font-bold shadow-md'
                    : 'text-[#E8DCC7]/80 hover:bg-[#2F4732] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-[#2F4732] space-y-3">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#2F4732] text-white text-xs font-bold hover:bg-[#253927] transition-colors"
        >
          <Home className="w-4 h-4" /> 리터페이퍼 메인으로
        </Link>
        <div className="text-[10px] text-center text-[#E8DCC7]/60">
          LITTER PAPER v2.0 • Editorial AI Engine
        </div>
      </div>
    </aside>
  );
}
