'use client';

import React from 'react';
import { Breed } from '@/types';
import { HeartPulse, Sparkles, ShieldAlert, Award } from 'lucide-react';

interface BreedCardProps {
  breed: Breed;
}

export function BreedCard({ breed }: BreedCardProps) {
  return (
    <div className="group rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] overflow-hidden hover:border-[#3D5A40] dark:hover:border-[#E8DCC7] transition-all shadow-sm hover:shadow-xl flex flex-col justify-between">
      <div>
        <div className="relative h-60 w-full overflow-hidden">
          <img
            src={breed.image}
            alt={breed.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase bg-[#C77B30] px-2 py-0.5 rounded-md">
                {breed.origin} 원산
              </span>
              <h3 className="text-2xl font-bold font-serif-editorial mt-1">
                {breed.name} <span className="text-xs font-normal opacity-80">({breed.nameEn})</span>
              </h3>
            </div>
            <span className="text-xs bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
              수명: {breed.lifespan}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Temperament Tags */}
          <div className="flex flex-wrap gap-1.5">
            {breed.temperament.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF9F7] dark:bg-[#252C26] text-[#3D5A40] dark:text-[#E8DCC7] border border-[#ECECEC] dark:border-[#2A332C]"
              >
                #{t}
              </span>
            ))}
          </div>

          <p className="text-xs text-[#6E6E6E] dark:text-[#9EAAA0] leading-relaxed line-clamp-3">
            {breed.description}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#ECECEC] dark:border-[#2A332C] text-center text-xs">
            <div>
              <div className="text-[10px] text-[#6E6E6E]">평균 체중</div>
              <div className="font-bold text-[#202020] dark:text-[#F2F5F3]">{breed.weight}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#6E6E6E]">활동량</div>
              <div className="font-bold text-[#3D5A40] dark:text-[#E8DCC7]">{breed.activityLevel}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#6E6E6E]">털 관리</div>
              <div className="font-bold text-[#C77B30]">{breed.groomingNeed}</div>
            </div>
          </div>

          {/* Health Care Tips */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#3D5A40] dark:text-[#E8DCC7] mb-2 flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5 text-[#C77B30]" /> 주요 수의학 관리 포인트
            </h4>
            <ul className="space-y-1 text-xs text-[#6E6E6E] dark:text-[#9EAAA0]">
              {breed.healthCareTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#C77B30] font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
