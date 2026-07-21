'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, ShieldCheck, Heart, Award, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#3D5A40] text-[#E8DCC7] flex items-center justify-center mx-auto shadow-md">
            <BookOpen className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C77B30]">
            Our Editorial Philosophy
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-editorial">
            대한민국 고양이 에디토리얼 미디어, LITTER PAPER
          </h1>
          <p className="text-sm sm:text-base text-[#6E6E6E] dark:text-[#9EAAA0] leading-relaxed max-w-2xl mx-auto">
            리터페이퍼(LITTER PAPER)는 단지 정보를 나열하는 곳이 아닙니다. 차분한 미학, 정교한 수의학 저널리즘, 압도적인 읽기 편안함을 목표로 제작되는 프리미엄 고양이 미디어 플랫폼입니다.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-8 shadow-sm">
          <h2 className="text-2xl font-bold font-serif-editorial text-[#3D5A40] dark:text-[#E8DCC7]">
            리터페이퍼 LITTER PAPER 4대 저널리즘 원칙
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#3D5A40]" />
              <h3 className="font-bold text-base">1. 수의학적 근거 검증</h3>
              <p className="text-xs text-[#6E6E6E] leading-relaxed">
                출처가 불명확한 카더라 정보 대신 ISFM 수의사 자문 및 저널 논문 데이터로 검증된 콘텐츠만을 배포합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] space-y-2">
              <Award className="w-6 h-6 text-[#C77B30]" />
              <h3 className="font-bold text-base">2. 극강의 독서 편안함 (Reading Comfort)</h3>
              <p className="text-xs text-[#6E6E6E] leading-relaxed">
                불필요한 광고와 차분함을 방해하는 요소를 제거하고 눈이 편안한 여백과 명료한 서체 타이포그래피를 제공합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] space-y-2">
              <Sparkles className="w-6 h-6 text-[#3D5A40]" />
              <h3 className="font-bold text-base">3. AI 기반 가독성 혁신</h3>
              <p className="text-xs text-[#6E6E6E] leading-relaxed">
                바쁜 집사들을 위한 AI 3줄 요약, 용어 해설, 맞춤형 큐레이션으로 읽는 즐거움을 선사합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] space-y-2">
              <Heart className="w-6 h-6 text-[#C77B30]" />
              <h3 className="font-bold text-base">4. 동물복지 후원과 수호</h3>
              <p className="text-xs text-[#6E6E6E] leading-relaxed">
                길고양이 TNR 지침 알리기, 보호소 입양 지원, 유기묘 구조 스토리를 매주 지속적으로 알립니다.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
