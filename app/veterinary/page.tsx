'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { storage } from '@/lib/storage';
import { Stethoscope, AlertTriangle, Search, ShieldCheck, HeartPulse, ChevronRight } from 'lucide-react';

export default function VeterinaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const allArticles = storage.getArticles();
  
  const vetArticles = allArticles.filter(
    (a) => a.category === 'veterinary' || a.category === 'health'
  );

  const filteredVet = searchTerm.trim()
    ? vetArticles.filter(
        (a) =>
          a.title.includes(searchTerm) ||
          a.summary.includes(searchTerm) ||
          a.tags.some((t) => t.includes(searchTerm))
      )
    : vetArticles;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header Hero */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#3D5A40] via-[#2F4732] to-[#1E2E21] text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8DCC7] text-[#3D5A40] text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-[#C77B30]" /> ISFM Feline Medicine Guidelines
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-editorial leading-tight">
              고양이 수의학 Knowledge Hub
            </h1>
            <p className="text-sm sm:text-base text-[#E8DCC7]/90 leading-relaxed">
              특발성 방광염(FIC), 만성 신부전(CKD), 췌장염, 치주질환 등 수의사의 정교한 의학 검증을 거친 전용 데이터베이스입니다.
            </p>

            {/* Live Search Bar */}
            <div className="pt-2">
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#3D5A40]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="방광염, 혈뇨, 구토, 췌장염, 치통 검색..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-[#202020] text-sm focus:outline-hidden shadow-lg placeholder:text-[#6E6E6E]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Red Flags Warning Banner */}
        <div className="p-6 rounded-3xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-red-600 text-white shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-red-900 dark:text-red-200">
                [응급 자문 경보] 24시간 이내 동물병원 즉시 내원이 필요한 상황
              </h3>
              <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                12시간 이상 배뇨 불능, 개구 호흡(입을 벌리고 숨쉼), 2회 이상 연속 혈토, 갑작스러운 후지 마비는 생명이 위급합니다.
              </p>
            </div>
          </div>
          <Link
            href="/article/feline-idiopathic-cystitis-guide-2026"
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shrink-0 transition-colors"
          >
            응급 체크리스트 확인
          </Link>
        </div>

        {/* Articles Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-[#C77B30]" /> 검증된 수의학 가이드 ({filteredVet.length}건)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVet.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
