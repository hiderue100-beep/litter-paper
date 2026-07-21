'use client';

import React, { useState, useEffect } from 'react';
import { Check, Plus, ShieldCheck, Users, BookOpen } from 'lucide-react';
import { Author } from '@/types';
import { storage } from '@/lib/storage';
import { useToast } from '../ui/Toast';
import { AuthModal } from '../auth/AuthModal';

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const { showToast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(author.followersCount);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const followedList = storage.getFollowedAuthors();
    const isAlreadyFollowing = followedList.includes(author.id);
    setIsFollowing(isAlreadyFollowing);
  }, [author.id]);

  const handleFollowToggle = () => {
    const user = storage.getCurrentUser();
    if (!user) {
      showToast('저자를 팔로우하려면 먼저 로그인해 주세요.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    const nowFollowing = storage.toggleFollowAuthor(author.id);
    setIsFollowing(nowFollowing);
    setFollowers((prev) => (nowFollowing ? prev + 1 : prev - 1));
    showToast(
      nowFollowing
        ? `${author.name} 저자를 팔로우했습니다.`
        : `${author.name} 저자 팔로우를 취소했습니다.`,
      nowFollowing ? 'success' : 'info'
    );
  };

  return (
    <>
      <div className="p-6 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 font-sans">
        <div className="flex items-center gap-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#C19A6B] shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-[#333333] dark:text-[#FAF8F5]">
                {author.name}
              </h3>
              {author.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C19A6B]/20 text-[#C19A6B] text-[10px] font-extrabold">
                  <ShieldCheck className="w-3 h-3 text-[#C19A6B]" /> 검증 연구원/에디터
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-[#C19A6B] mt-0.5">
              {author.role}
            </p>
            <p className="text-xs text-[#666666] dark:text-[#A0A0A0] line-clamp-2 mt-1 max-w-md">
              {author.bio}
            </p>
            <div className="flex items-center gap-4 text-[11px] text-[#666666] mt-2">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#C19A6B]" /> 기사 {author.articlesCount}개
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#C19A6B]" /> 팔로워 {followers.toLocaleString()}명
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleFollowToggle}
          className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all shrink-0 w-full sm:w-auto justify-center ${
            isFollowing
              ? 'bg-[#C19A6B] text-white shadow-xs'
              : 'bg-[#333333] hover:bg-[#C19A6B] text-white'
          }`}
        >
          {isFollowing ? (
            <>
              <Check className="w-4 h-4" /> 팔로잉 중
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" /> 저자 팔로우
            </>
          )}
        </button>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => handleFollowToggle()}
      />
    </>
  );
}
