'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BreedCard } from '@/components/editorial/BreedCard';
import { BREEDS } from '@/lib/mockData';
import { Search, BookOpen, Sparkles } from 'lucide-react';

export default function BreedsPage() {
  const [query, setQuery] = useState('');
  const [filterActivity, setFilterActivity] = useState<string>('all');

  const filteredBreeds = BREEDS.filter((b) => {
    const matchesQuery =
      b.name.includes(query) ||
      b.nameEn.toLowerCase().includes(query.toLowerCase()) ||
      b.origin.includes(query) ||
      b.temperament.some((t) => t.includes(query));

    const matchesActivity =
      filterActivity === 'all' || b.activityLevel === filterActivity;

    return matchesQuery && matchesActivity;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#3D5A40] to-[#2F4732] text-white shadow-xl">
          <div className="max-w-2xl space-y-4">
            <span className="bg-[#E8DCC7] text-[#3D5A40] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Cat Breeds Encyclopedia
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-editorial">
              고양이 품종 종합 도감
            </h1>
            <p className="text-sm sm:text-base text-[#E8DCC7]/90 leading-relaxed">
              묘종별 성격, 유전병 주의사항, 털 관리 난이도 및 수명까지 한눈에 파악해보세요.
            </p>

            {/* Filter controls */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#3D5A40]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="렉돌, 브리티시숏헤어, 러시안블루 검색..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-[#202020] text-xs focus:outline-hidden"
                />
              </div>

              <select
                value={filterActivity}
                onChange={(e) => setFilterActivity(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white text-[#202020] text-xs font-bold focus:outline-hidden"
              >
                <option value="all">전체 활동량</option>
                <option value="낮음">활동량 낮음</option>
                <option value="보통">활동량 보통</option>
                <option value="높음">활동량 높음</option>
              </select>
            </div>
          </div>
        </div>

        {/* Breed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBreeds.map((breed) => (
            <BreedCard key={breed.id} breed={breed} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
