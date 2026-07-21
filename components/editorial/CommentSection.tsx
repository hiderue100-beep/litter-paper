'use client';

import React, { useState } from 'react';
import { Heart, MessageSquare, Flag, Send, CornerDownRight, Check } from 'lucide-react';
import { Comment } from '@/types';
import { useToast } from '../ui/Toast';

interface CommentSectionProps {
  articleId: string;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    articleId: 'art-1',
    user: {
      name: '치즈태비 집사',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      badge: '다묘 9년차',
    },
    content: '저희 치즈도 화장실을 자주 가다가 결국 응급실에서 방광염 진단을 받은 적이 있습니다. 식사와 물그릇을 떨어뜨려 놓는 팁을 적용해보니 음수량이 확실히 늘어난 것 같아요!',
    createdAt: '2026-07-21T02:30:00Z',
    likes: 18,
    isLiked: false,
    replies: [
      {
        id: 'c-1-1',
        articleId: 'art-1',
        user: {
          name: '김서연 수의사',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80',
          badge: '저자 수의사',
        },
        content: '맞습니다! 소변 모래 뭉치 크기를 매일 관찰해 주시는 것도 극초기 진단에 아주 훌륭한 신호가 됩니다.',
        createdAt: '2026-07-21T03:10:00Z',
        likes: 12,
        isLiked: false,
      },
    ],
  },
  {
    id: 'c-2',
    articleId: 'art-1',
    user: {
      name: '묘생역전',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      badge: '유기묘 임보자',
    },
    content: '페리웨이 디퓨저 설치 효과가 궁금했는데 기사 보고 거실과 침실에 바로 2개 주문했습니다. 좋은 정보 감사합니다.',
    createdAt: '2026-07-20T19:40:00Z',
    likes: 7,
    isLiked: false,
  },
];

export function CommentSection({ articleId }: CommentSectionProps) {
  const { showToast } = useToast();
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState<string | null>(null);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const created: Comment = {
      id: `c-${Date.now()}`,
      articleId,
      user: {
        name: '나의 고양이',
        avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&auto=format&fit=crop&q=80',
        badge: '캣노트 회원',
      },
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    setComments([created, ...comments]);
    setNewComment('');
    showToast('댓글이 등록되었습니다.');
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;

    const replyItem: Comment = {
      id: `c-reply-${Date.now()}`,
      articleId,
      user: {
        name: '나의 고양이',
        avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&auto=format&fit=crop&q=80',
        badge: '캣노트 회원',
      },
      content: replyText.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    setComments(
      comments.map((c) => {
        if (c.id === parentId) {
          return { ...c, replies: [...(c.replies || []), replyItem] };
        }
        return c;
      })
    );

    setReplyingToId(null);
    setReplyText('');
    showToast('답글이 작성되었습니다.');
  };

  const handleToggleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(
        comments.map((c) => {
          if (c.id === parentId) {
            const updatedReplies = c.replies?.map((r) => {
              if (r.id === commentId) {
                return {
                  ...r,
                  likes: r.isLiked ? r.likes - 1 : r.likes + 1,
                  isLiked: !r.isLiked,
                };
              }
              return r;
            });
            return { ...c, replies: updatedReplies };
          }
          return c;
        })
      );
    } else {
      setComments(
        comments.map((c) => {
          if (c.id === commentId) {
            return {
              ...c,
              likes: c.isLiked ? c.likes - 1 : c.likes + 1,
              isLiked: !c.isLiked,
            };
          }
          return c;
        })
      );
    }
  };

  const handleReport = (id: string) => {
    setReportModalOpen(null);
    showToast('신고가 접수되었습니다. 관리자 확인 후 조치됩니다.', 'info');
  };

  return (
    <section className="mt-16 pt-10 border-t border-[#ECECEC] dark:border-[#2A332C]">
      <h3 className="text-xl font-bold font-serif-editorial text-[#202020] dark:text-[#F2F5F3] flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-[#3D5A40] dark:text-[#E8DCC7]" />
        에디토리얼 댓글 토론방 ({comments.length})
      </h3>

      {/* Input Box */}
      <form onSubmit={handleAddComment} className="mb-8">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] focus-within:border-[#3D5A40] transition-all shadow-xs">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="전문가 지침이나 경험담에 대해 예의 있는 의견을 나누어 주세요..."
            rows={3}
            className="w-full bg-transparent text-sm text-[#202020] dark:text-[#F2F5F3] focus:outline-hidden resize-none placeholder:text-[#6E6E6E]"
          />
          <div className="flex items-center justify-between pt-3 border-t border-[#ECECEC]/60 dark:border-[#2A332C]/60 text-xs">
            <span className="text-[#6E6E6E]">클린 커뮤니티 가이드 준수</span>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3D5A40] text-white font-bold disabled:opacity-50 hover:bg-[#2F4732] transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> 댓글 등록
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#3D5A40]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#202020] dark:text-[#F2F5F3]">
                      {comment.user.name}
                    </span>
                    {comment.user.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E8DCC7] text-[#3D5A40] dark:bg-white/10 dark:text-[#E8DCC7]">
                        {comment.user.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#6E6E6E]">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => setReportModalOpen(comment.id)}
                className="text-[#6E6E6E] hover:text-red-500 p-1 transition-colors"
                title="신고하기"
              >
                <Flag className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <p className="text-sm text-[#202020] dark:text-[#F2F5F3] leading-relaxed mb-4">
              {comment.content}
            </p>

            {/* Footer */}
            <div className="flex items-center gap-4 text-xs text-[#6E6E6E]">
              <button
                onClick={() => handleToggleLike(comment.id)}
                className={`flex items-center gap-1.5 transition-colors ${
                  comment.isLiked ? 'text-red-500 font-bold' : 'hover:text-[#202020]'
                }`}
              >
                <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                좋아요 {comment.likes}
              </button>
              <button
                onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                className="flex items-center gap-1.5 hover:text-[#202020] transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> 답글 달기
              </button>
            </div>

            {/* Reply Input */}
            {replyingToId === comment.id && (
              <div className="mt-4 pt-3 border-t border-[#ECECEC] dark:border-[#2A332C] flex items-center gap-2">
                <CornerDownRight className="w-4 h-4 text-[#3D5A40] shrink-0" />
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="답글 내용을 입력하세요..."
                  className="w-full bg-[#FAF9F7] dark:bg-[#252C26] p-2.5 rounded-xl text-xs text-[#202020] dark:text-[#F2F5F3] focus:outline-hidden border border-[#ECECEC]"
                />
                <button
                  onClick={() => handleAddReply(comment.id)}
                  className="px-3 py-2 bg-[#3D5A40] text-white text-xs font-bold rounded-xl shrink-0"
                >
                  등록
                </button>
              </div>
            )}

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#ECECEC]/60 dark:border-[#2A332C]/60 space-y-3 pl-6">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-3">
                    <img
                      src={reply.user.avatar}
                      alt={reply.user.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div className="flex-1 bg-[#FAF9F7] dark:bg-[#252C26] p-3 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{reply.user.name}</span>
                        <span className="text-[10px] text-[#6E6E6E]">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-white dark:bg-[#1D231E] p-6 rounded-2xl shadow-xl">
            <h4 className="text-base font-bold mb-2">댓글 신고하기</h4>
            <p className="text-xs text-[#6E6E6E] mb-4">
              부적절한 내용이나 스팸성 댓글인 경우 관리자 팀에서 검토 후 삭제 처리됩니다.
            </p>
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setReportModalOpen(null)}
                className="px-4 py-2 rounded-xl bg-[#FAF9F7] dark:bg-white/10"
              >
                취소
              </button>
              <button
                onClick={() => handleReport(reportModalOpen)}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold"
              >
                신고 접수
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
