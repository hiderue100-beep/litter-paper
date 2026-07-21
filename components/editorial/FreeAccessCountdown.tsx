'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Lock, ShieldAlert } from 'lucide-react';
import { formatTimeRemaining } from '@/lib/utils';

interface FreeAccessCountdownProps {
  freeWindowEndsAt: Date;
  freeDurationHours?: number;
  compact?: boolean;
}

export function FreeAccessCountdown({
  freeWindowEndsAt,
  freeDurationHours = 24,
  compact = false,
}: FreeAccessCountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    const updateCountdown = () => {
      const diff = Math.max(0, Math.floor((freeWindowEndsAt.getTime() - Date.now()) / 1000));
      setSecondsLeft(diff);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [freeWindowEndsAt]);

  const isExpired = secondsLeft <= 0;
  const totalSeconds = freeDurationHours * 3600;
  const percentageLeft = Math.min(100, Math.max(0, (secondsLeft / totalSeconds) * 100));

  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 text-xs font-bold">
        <Lock className="w-3.5 h-3.5" /> 24시간 무료 공개 만료 (프리미엄 전환됨)
      </div>
    );
  }

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC7] text-[#3D5A40] text-xs font-extrabold shadow-2xs">
        <Clock className="w-3.5 h-3.5 animate-pulse text-[#C77B30]" />
        <span>무료 공개 {formatTimeRemaining(secondsLeft)} 남음</span>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#3D5A40] to-[#2F4732] text-white space-y-2.5 shadow-md border border-[#2F4732]">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold">
          <Sparkles className="w-4 h-4 text-[#C77B30]" />
          <span>누구나 24시간 무료 독서 혜택</span>
        </div>
        <div className="font-extrabold text-sm text-[#E8DCC7] font-mono tracking-wider">
          {formatTimeRemaining(secondsLeft)} 남음
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#E8DCC7] to-[#C77B30] transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${percentageLeft}%` }}
        />
      </div>

      <div className="text-[11px] text-[#E8DCC7]/80 flex items-center justify-between">
        <span>무료 기간 만료 후 프리미엄 전용 아카이브로 자동 전환됩니다.</span>
        <span className="font-semibold text-white">마감 시각: {freeWindowEndsAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
}
