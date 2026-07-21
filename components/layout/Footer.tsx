import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { LitterPaperLogo } from '../ui/LitterPaperLogo';
import { CATEGORIES } from '@/lib/mockData';

export function Footer() {
  return (
    <footer className="bg-[#242424] text-[#FAF8F5] pt-16 pb-12 border-t border-[#333333] mt-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white dark:bg-[#1A1A1A] flex items-center justify-center p-1 border border-[#333333]">
                <LitterPaperLogo size={32} />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Litter Paper
              </span>
            </div>
            <p className="text-xs text-[#FAF8F5]/80 leading-relaxed max-w-md">
              리터페이퍼(Litter Paper)는 대가성 협찬을 엄격히 배제하고 연구 장비와 실측 데이터로 고양이 용품, 사료, 모래, 가전을 100% 내돈내산으로 검증하는 에디토리얼 미디어입니다.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs">
              <span className="inline-flex items-center gap-1 text-[#C19A6B] font-bold">
                <ShieldCheck className="w-4 h-4" /> 협찬 0% 내돈내산 검증 원칙
              </span>
              <span className="text-[#444444]">|</span>
              <span className="text-[#FAF8F5]/60">분광 분석 & 실측 데이터</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C19A6B]">
              상품 검증 분야
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/80 font-medium">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-[#FAF8F5]/50">{cat.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Special Hubs */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C19A6B]">
              프리미엄 & 도감
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/80 font-medium">
              <li>
                <Link href="/premium" className="hover:text-white transition-colors text-[#C19A6B] font-bold">
                  프리미엄 아카이브 (Toss)
                </Link>
              </li>
              <li>
                <Link href="/breeds" className="hover:text-white transition-colors">
                  고양이 묘종 종합 도감
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-white transition-colors">
                  내 보관함 & 히스토리
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-white transition-colors">
                  검증 뉴스레터 신청
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-white font-bold">
                  CMS 퍼블리셔 스위트
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate / Ethics */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C19A6B]">
              리터페이퍼 소개
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/80 font-medium">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  검증 원칙 & 사명
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  개인정보 처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  서비스 이용약관
                </Link>
              </li>
              <li>
                <Link href="/rss.xml" target="_blank" className="hover:text-white transition-colors flex items-center gap-1">
                  RSS 피드 XML <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/60">
          <p>© 2026 Litter Paper Media Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Designed with <Heart className="w-3 h-3 text-[#C19A6B] fill-current" /> for all cats in Korea.
          </p>
        </div>
      </div>
    </footer>
  );
}
