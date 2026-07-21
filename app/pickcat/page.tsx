'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { storage } from '@/lib/storage';
import { UserProfile } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { Sparkles, Vote, MessageSquare, ThumbsUp, Send, CheckCircle2, Award, Heart } from 'lucide-react';

interface PickCatMemo {
  id: string;
  userName: string;
  userAvatar: string;
  voteOption: string;
  memo: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

const INITIAL_MEMOS: PickCatMemo[] = [
  {
    id: 'm-1',
    userName: '치즈태비 집사',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    voteOption: '벤토나이트 굳는 모래',
    memo: '먼지 날림은 벤토가 어쩔 수 없지만 응집력과 기호성 때문에 벤토나이트 절대 못 벗어납니다!',
    createdAt: '10분 전',
    likes: 24,
  },
  {
    id: 'm-2',
    userName: '묘생역전',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    voteOption: '두부/천연 모래',
    memo: '사막화 걱정 없고 변기 수세가 편해서 두부 모래 5년째 유지 중입니다. 냄새도 사과향이 최고예요.',
    createdAt: '30분 전',
    likes: 15,
  },
  {
    id: 'm-3',
    userName: '삼색이 러버',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    voteOption: '벤토나이트 굳는 모래',
    memo: '고양이 본능에는 벤토나이트가 1순위입니다. 분광 측정 수치 낮은 제품으로 골라 쓰고 있어요.',
    createdAt: '1시간 전',
    likes: 9,
  },
];

export default function PickCatPage() {
  const { showToast } = useToast();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Poll state
  const [votedOption, setVotedOption] = useState<'A' | 'B' | null>(null);
  const [optionACount, setOptionACount] = useState(1420);
  const [optionBCount, setOptionBCount] = useState(540);

  // Memo input state (100 char limit)
  const [memoInput, setMemoInput] = useState('');
  const [memos, setMemos] = useState<PickCatMemo[]>(INITIAL_MEMOS);

  React.useEffect(() => {
    setCurrentUser(storage.getCurrentUser());
  }, []);

  const totalVotes = optionACount + optionBCount;
  const percentA = Math.round((optionACount / totalVotes) * 100);
  const percentB = 100 - percentA;

  const handleVote = (option: 'A' | 'B') => {
    if (!currentUser) {
      showToast('투표에 참여하시려면 먼저 로그인해 주세요.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    if (votedOption) {
      showToast('이미 투표에 참여하셨습니다.', 'info');
      return;
    }

    setVotedOption(option);
    if (option === 'A') setOptionACount((prev) => prev + 1);
    if (option === 'B') setOptionBCount((prev) => prev + 1);

    showToast(
      option === 'A'
        ? '벤토나이트 모래에 1표 투표하셨습니다!'
        : '두부/천연 모래에 1표 투표하셨습니다!'
    );
  };

  const handleAddMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('한줄 메모를 남기시려면 먼저 로그인해 주세요.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    if (!votedOption) {
      showToast('투표를 완료한 후 100자 한줄 메모를 남기실 수 있습니다.', 'info');
      return;
    }

    if (!memoInput.trim()) return;

    const newMemoItem: PickCatMemo = {
      id: `m-${Date.now()}`,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      voteOption: votedOption === 'A' ? '벤토나이트 굳는 모래' : '두부/천연 모래',
      memo: memoInput.trim().slice(0, 100),
      createdAt: '방금 전',
      likes: 0,
    };

    setMemos([newMemoItem, ...memos]);
    setMemoInput('');
    showToast('100자 한줄 픽캣 메모가 등록되었습니다!');
  };

  const handleToggleLikeMemo = (id: string) => {
    if (!currentUser) {
      showToast('좋아요를 누르시려면 로그인해 주세요.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    setMemos(
      memos.map((m) => {
        if (m.id === id) {
          const isLikedNow = !m.isLiked;
          return {
            ...m,
            isLiked: isLikedNow,
            likes: isLikedNow ? m.likes + 1 : m.likes - 1,
          };
        }
        return m;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 w-full">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-[#333333] text-[#C19A6B] flex items-center justify-center mx-auto shadow-md font-extrabold text-2xl border border-[#C19A6B]">
            🐾
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C19A6B]/20 text-[#C19A6B] text-xs font-extrabold">
            <Vote className="w-4 h-4" /> 픽캣 (Pick Cat) 커뮤니티
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            집사들의 투표로 정하는 픽캣 한줄 토론
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] dark:text-[#A0A0A0] leading-relaxed max-w-xl mx-auto">
            하나의 주제에 대해 투표로 내 의견을 더하고, 100자 이하의 명쾌한 실전 집사 팁 메모를 공유해 보세요.
          </p>
        </div>

        {/* ACTIVE POLL CARD */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-xl space-y-8">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#C19A6B] text-white text-[11px] font-extrabold uppercase tracking-wider">
              금주의 픽캣 투표 주제
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#333333] dark:text-[#FAF8F5] leading-snug">
              "먼지 수치 낮춘 벤토나이트 vs 사막화 없는 두부/천연 모래, 당신 집사의 선택은?"
            </h2>
            <p className="text-xs text-[#666666] font-medium">
              총 {totalVotes.toLocaleString()}명의 집사가 투표에 참여했습니다.
            </p>
          </div>

          {/* Voting Option Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option A */}
            <button
              type="button"
              onClick={() => handleVote('A')}
              className={`p-6 rounded-2xl border-2 transition-all text-left space-y-3 ${
                votedOption === 'A'
                  ? 'border-[#C19A6B] bg-[#C19A6B]/10 dark:bg-[#C19A6B]/20 shadow-md'
                  : 'border-[#EAE6DF] dark:border-[#333333] hover:border-[#C19A6B] bg-[#FAF8F5] dark:bg-[#1A1A1A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base">A. 벤토나이트 굳는 모래</span>
                {votedOption === 'A' && <CheckCircle2 className="w-5 h-5 text-[#C19A6B]" />}
              </div>
              <p className="text-xs text-[#666666]">
                기호성과 응집력이 압도적! 먼지 방지 제품 위주 사용
              </p>
              
              {/* Progress Bar */}
              <div className="space-y-1 pt-2">
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-[#C19A6B] transition-all duration-700"
                    style={{ width: `${percentA}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-extrabold text-[#C19A6B]">
                  <span>{percentA}%</span>
                  <span>{optionACount.toLocaleString()}표</span>
                </div>
              </div>
            </button>

            {/* Option B */}
            <button
              type="button"
              onClick={() => handleVote('B')}
              className={`p-6 rounded-2xl border-2 transition-all text-left space-y-3 ${
                votedOption === 'B'
                  ? 'border-[#C19A6B] bg-[#C19A6B]/10 dark:bg-[#C19A6B]/20 shadow-md'
                  : 'border-[#EAE6DF] dark:border-[#333333] hover:border-[#C19A6B] bg-[#FAF8F5] dark:bg-[#1A1A1A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base">B. 두부 / 카사바 / 천연 모래</span>
                {votedOption === 'B' && <CheckCircle2 className="w-5 h-5 text-[#C19A6B]" />}
              </div>
              <p className="text-xs text-[#666666]">
                사막화 걱정 제로! 변기 수세 및 가벼운 청소 용이
              </p>

              {/* Progress Bar */}
              <div className="space-y-1 pt-2">
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-[#333333] dark:bg-white transition-all duration-700"
                    style={{ width: `${percentB}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                  <span>{percentB}%</span>
                  <span>{optionBCount.toLocaleString()}표</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 100-CHAR MEMO INPUT FORM */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-[#333333] dark:text-[#FAF8F5] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#C19A6B]" /> 100자 이하 픽캣 메모 피드
            </h3>
            <span className="text-xs font-bold text-[#666666]">
              {memoInput.length} / 100자
            </span>
          </div>

          <form onSubmit={handleAddMemo} className="p-4 rounded-2xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-xs space-y-3">
            <textarea
              value={memoInput}
              onChange={(e) => setMemoInput(e.target.value.slice(0, 100))}
              maxLength={100}
              placeholder={
                votedOption
                  ? '투표한 이유나 나만의 꿀팁을 100자 이내로 짧게 작성해 주세요...'
                  : '위의 투표에 참여하신 후 100자 이하 한줄 메모를 남기실 수 있습니다.'
              }
              rows={3}
              disabled={!votedOption}
              className="w-full bg-transparent text-sm focus:outline-hidden resize-none placeholder:text-[#666666]"
            />
            <div className="flex items-center justify-between pt-2 border-t border-[#EAE6DF] dark:border-[#333333] text-xs">
              <span className="text-[11px] text-[#666666]">
                {votedOption ? `투표한 항목: ${votedOption === 'A' ? '벤토나이트 모래' : '두부/천연 모래'}` : '투표 완료 후 입력 가능'}
              </span>
              <button
                type="submit"
                disabled={!votedOption || !memoInput.trim()}
                className="px-5 py-2 rounded-xl bg-[#333333] text-white font-extrabold text-xs disabled:opacity-50 hover:bg-[#C19A6B] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-[#C19A6B]" /> 메모 남기기
              </button>
            </div>
          </form>

          {/* MEMO FEED CARDS */}
          <div className="space-y-4">
            {memos.map((m) => (
              <div
                key={m.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={m.userAvatar}
                      alt={m.userName}
                      className="w-8 h-8 rounded-full object-cover border border-[#C19A6B]"
                    />
                    <div>
                      <span className="font-extrabold text-xs text-[#333333] dark:text-[#FAF8F5]">
                        {m.userName}
                      </span>
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-[#C19A6B]/15 text-[#C19A6B] font-bold">
                        {m.voteOption}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#666666]">{m.createdAt}</span>
                </div>

                <p className="text-xs text-[#333333] dark:text-[#FAF8F5] leading-relaxed font-medium">
                  "{m.memo}"
                </p>

                <div className="flex justify-end pt-2 border-t border-[#EAE6DF]/60 dark:border-[#333333]/60">
                  <button
                    onClick={() => handleToggleLikeMemo(m.id)}
                    className={`flex items-center gap-1 text-xs font-bold transition-colors ${
                      m.isLiked ? 'text-red-500' : 'text-[#666666] hover:text-[#333333]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${m.isLiked ? 'fill-current' : ''}`} />
                    공감 {m.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setCurrentUser(storage.getCurrentUser())}
      />
    </div>
  );
}
