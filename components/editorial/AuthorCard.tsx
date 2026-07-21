'use client';

import React, { useState, useEffect } from 'react';
import { Check, Plus, ShieldCheck, Users, BookOpen } from 'lucide-react';
import { Author } from '@/types';
import { storage } from '@/lib/storage';
import { useToast } from '../ui/Toast';

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const { showToast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(author.followersCount);

  useEffect(() => {
    const followedList = storage.getFollowedAuthors();
    const isAlreadyFollowing = followedList.includes(author.id);
    setIsFollowing(isAlreadyFollowing);
  }, [author.id]);

  const handleFollowToggle = () => {
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
    <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
      <div className="flex items-center gap-4">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-[#3D5A40] shrink-0"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-[#202020] dark:text-[#F2F5F3]">
              {author.name}
            </h3>
            {author.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8DCC7] text-[#3D5A40] text-[10px] font-extrabold">
                <ShieldCheck className="w-3 h-3 text-[#3D5A40]" /> 인증 수의사/에디터
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-[#3D5A40] dark:text-[#E8DCC7] mt-0.5">
            {author.role}
          </p>
          <p className="text-xs text-[#6E6E6E] dark:text-[#9EAAA0] line-clamp-2 mt-1 max-w-md">
            {author.bio}
          </p>
          <div className="flex items-center gap-4 text-[11px] text-[#6E6E6E] mt-2">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#3D5A40]" /> 기사 {author.articlesCount}개
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#C77B30]" /> 팔로워 {followers.toLocaleString()}명
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleFollowToggle}
        className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 w-full sm:w-auto justify-center ${
          isFollowing
            ? 'bg-[#E8DCC7] text-[#3D5A40] dark:bg-white/10 dark:text-[#E8DCC7]'
            : 'bg-[#3D5A40] hover:bg-[#2F4732] text-white'
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
  );
}
