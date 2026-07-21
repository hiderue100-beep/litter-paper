'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AiAssistantPanel } from '@/components/admin/AiAssistantPanel';
import { storage } from '@/lib/storage';
import { CATEGORIES, AUTHORS } from '@/lib/mockData';
import { Article, CategorySlug, FaqItem, ArticleStatus } from '@/types';
import { calculateReadingTime, slugify, getArticleAccessStatus, formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { Save, Plus, FileText, Sparkles, Check, ChevronRight, Lock, Clock, Calendar } from 'lucide-react';

export default function AdminArticlesPage() {
  const { showToast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CategorySlug>('veterinary');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&auto=format&fit=crop&q=80');
  const [difficulty, setDifficulty] = useState<'입문 (Easy)' | '중급 (Medium)' | '전문가 (Expert)'>('중급 (Medium)');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState<string[]>(['고양이건강', '수의학가이드']);
  const [tagInput, setTagInput] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  // Premium & 24h Free Publishing System states
  const [publishedAt, setPublishedAt] = useState<string>(new Date().toISOString().slice(0, 16));
  const [freeAccessDurationHours, setFreeAccessDurationHours] = useState<number>(24);
  const [isPremiumOnly, setIsPremiumOnly] = useState<boolean>(false);
  const [isScheduled, setIsScheduled] = useState<boolean>(false);
  const [scheduledAt, setScheduledAt] = useState<string>(new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16));

  useEffect(() => {
    setArticles(storage.getArticles());
  }, []);

  const handleSelectArticle = (art: Article) => {
    setSelectedArticleId(art.id);
    setTitle(art.title);
    setSubtitle(art.subtitle);
    setCategory(art.category);
    setCoverImage(art.coverImage);
    setDifficulty(art.difficulty);
    setContent(art.content);
    setSummary(art.summary);
    setTags(art.tags);
    setSeoTitle(art.seoTitle || '');
    setSeoDescription(art.seoDescription || '');
    setFaqs(art.faq || []);

    // Premium & Publishing fields
    setPublishedAt(art.publishedAt ? new Date(art.publishedAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16));
    setFreeAccessDurationHours(art.freeAccessDurationHours || 24);
    setIsPremiumOnly(!!art.isPremiumOnly);
    setIsScheduled(art.status === 'scheduled');
    setScheduledAt(art.scheduledAt ? new Date(art.scheduledAt).toISOString().slice(0, 16) : new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16));
  };

  const handleCreateNew = () => {
    setSelectedArticleId(null);
    setTitle('');
    setSubtitle('');
    setCategory('veterinary');
    setCoverImage('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&auto=format&fit=crop&q=80');
    setDifficulty('중급 (Medium)');
    setContent('<h2>1. 주요 내용 작성</h2>\n<p>보호자들을 위한 정교한 수의학 가이드를 작성하세요.</p>');
    setSummary('');
    setTags(['고양이건강', '수의학']);
    setSeoTitle('');
    setSeoDescription('');
    setFaqs([]);

    setPublishedAt(new Date().toISOString().slice(0, 16));
    setFreeAccessDurationHours(24);
    setIsPremiumOnly(false);
    setIsScheduled(false);
    setScheduledAt(new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('기사 제목을 입력해 주세요.', 'error');
      return;
    }

    const catObj = CATEGORIES.find((c) => c.slug === category) || CATEGORIES[0];
    const slug = slugify(title) || `article-${Date.now()}`;
    const readingTime = calculateReadingTime(content);

    let status: ArticleStatus = 'published';
    let pubDateIso = new Date(publishedAt).toISOString();

    if (isScheduled) {
      status = 'scheduled';
      pubDateIso = new Date(scheduledAt).toISOString();
    } else if (isPremiumOnly) {
      status = 'premium_only';
    }

    const articleToSave: Article = {
      id: selectedArticleId || `art-cms-${Date.now()}`,
      slug,
      title,
      subtitle: subtitle || title,
      content,
      summary: summary || title,
      category,
      categoryName: catObj.name,
      tags,
      author: AUTHORS[0],
      coverImage,
      readingTime,
      difficulty,
      publishedAt: pubDateIso,
      updatedAt: new Date().toISOString(),
      likes: 0,
      views: 120,
      commentsCount: 0,
      isFeatured: true,
      seoTitle,
      seoDescription,
      faq: faqs,

      // Premium & Publishing Fields
      status,
      freeAccessDurationHours,
      scheduledAt: isScheduled ? new Date(scheduledAt).toISOString() : undefined,
      isPremium: isPremiumOnly || freeAccessDurationHours === 0,
      isPremiumOnly,
    };

    const updatedList = storage.saveCustomArticle(articleToSave);
    setArticles(updatedList);
    setSelectedArticleId(articleToSave.id);
    showToast('에디토리얼 기사가 성공적으로 발행 / 저장되었습니다!');
  };

  return (
    <div className="min-h-screen flex bg-[#FAF9F7] dark:bg-[#141815] text-[#202020] dark:text-[#F2F5F3]">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-editorial">
              기사 작성 & AI 스마트 퍼블리셔
            </h1>
            <p className="text-xs text-[#6E6E6E]">
              LITTER PAPER 에디터 전용 원스톱 콘텐츠 작성, 24시간 무료 카운트다운 및 프리미엄 아카이브 설정
            </p>
          </div>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#3D5A40] text-white text-xs font-bold shadow-md hover:bg-[#2F4732] transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> 새로 쓰기
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left List of Articles with Status Badges */}
          <div className="lg:col-span-4 p-5 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6E6E6E] mb-2">
              등록된 기사 목록 ({articles.length}개)
            </h3>
            <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1">
              {articles.map((art) => {
                const access = getArticleAccessStatus(art, false);
                return (
                  <button
                    key={art.id}
                    onClick={() => handleSelectArticle(art)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all text-xs ${
                      selectedArticleId === art.id
                        ? 'bg-[#3D5A40] text-white border-[#3D5A40] shadow-sm font-bold'
                        : 'bg-[#FAF9F7] dark:bg-[#252C26] text-[#202020] dark:text-[#F2F5F3] border-[#ECECEC] dark:border-[#2A332C] hover:border-[#3D5A40]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-80 mb-1">
                      <span>{art.categoryName}</span>
                      {access.status === 'scheduled' && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-bold">
                          예정됨
                        </span>
                      )}
                      {access.status === 'free_now' && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold">
                          24h 무료 ({access.formattedCountdown})
                        </span>
                      )}
                      {access.status === 'expired_premium' && (
                        <span className="px-2 py-0.5 rounded-md bg-stone-700 text-[#E8DCC7] font-bold">
                          프리미엄 아카이브
                        </span>
                      )}
                      {access.status === 'premium_only' && (
                        <span className="px-2 py-0.5 rounded-md bg-[#C77B30] text-white font-bold">
                          프리미엄 전용
                        </span>
                      )}
                    </div>
                    <div className="line-clamp-2 leading-snug">{art.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Form Editor */}
          <div className="lg:col-span-8 space-y-6">
            <form onSubmit={handleSave} className="space-y-6 p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#ECECEC] dark:border-[#2A332C]">
                <h3 className="text-lg font-bold font-serif-editorial">
                  {selectedArticleId ? '에디토리얼 수정' : '새 에디토리얼 작성'}
                </h3>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#3D5A40] text-white font-extrabold text-xs hover:bg-[#2F4732] transition-colors shadow-md"
                >
                  <Save className="w-4 h-4" /> 게시하기 / 저장
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#3D5A40] dark:text-[#E8DCC7] mb-1">
                    기사 제목 (Title)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="예: 원인 불명의 방광염 FIC, 집사가 알아야 할 신호"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-sm focus:outline-hidden focus:border-[#3D5A40]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E6E6E] mb-1">
                    부제목 (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="기사의 핵심 구절이나 핵심 요약 설명"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Premium Content & 24h Free System Control Panel */}
              <div className="p-5 rounded-2xl bg-[#E8DCC7]/20 border border-[#E8DCC7] dark:bg-white/5 dark:border-[#2A332C] space-y-4">
                <h4 className="text-xs font-extrabold text-[#3D5A40] dark:text-[#E8DCC7] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C77B30]" /> 퍼블리싱 & 24시간 무료 공개 설정
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Scheduled Toggle */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] space-y-2">
                    <label className="flex items-center gap-2 font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isScheduled}
                        onChange={(e) => setIsScheduled(e.target.checked)}
                        className="w-4 h-4 rounded text-[#3D5A40]"
                      />
                      <span>예약 발행 (Scheduled Publishing)</span>
                    </label>
                    {isScheduled && (
                      <input
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                        className="w-full p-2 rounded-lg bg-[#FAF9F7] dark:bg-[#1D231E] border border-[#ECECEC] text-xs font-mono"
                      />
                    )}
                  </div>

                  {/* Premium Only Toggle */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] space-y-2">
                    <label className="flex items-center gap-2 font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPremiumOnly}
                        onChange={(e) => setIsPremiumOnly(e.target.checked)}
                        className="w-4 h-4 rounded text-[#C77B30]"
                      />
                      <span className="text-[#C77B30]">즉시 프리미엄 전용 (No Free Access)</span>
                    </label>
                    <p className="text-[11px] text-[#6E6E6E]">
                      24시간 무료 공개 없이 즉시 프리미엄 결제 회원 전용으로만 공개됩니다.
                    </p>
                  </div>
                </div>

                {/* Free Access Duration Slider/Select */}
                {!isPremiumOnly && !isScheduled && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#ECECEC]/60 dark:border-[#2A332C]/60 text-xs">
                    <span className="font-bold text-[#6E6E6E]">무료 독서 공개 시간 (Hours):</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFreeAccessDurationHours(24)}
                        className={`px-3 py-1.5 rounded-lg font-bold ${freeAccessDurationHours === 24 ? 'bg-[#3D5A40] text-white' : 'bg-white dark:bg-[#252C26] text-[#6E6E6E]'}`}
                      >
                        24시간 (기본)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFreeAccessDurationHours(48)}
                        className={`px-3 py-1.5 rounded-lg font-bold ${freeAccessDurationHours === 48 ? 'bg-[#3D5A40] text-white' : 'bg-white dark:bg-[#252C26] text-[#6E6E6E]'}`}
                      >
                        48시간
                      </button>
                      <button
                        type="button"
                        onClick={() => setFreeAccessDurationHours(0)}
                        className={`px-3 py-1.5 rounded-lg font-bold ${freeAccessDurationHours === 0 ? 'bg-[#C77B30] text-white' : 'bg-white dark:bg-[#252C26] text-[#6E6E6E]'}`}
                      >
                        0시간 (아카이브)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#6E6E6E] mb-1">
                    카테고리 선택
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategorySlug)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-xs font-bold"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E6E6E] mb-1">
                    읽기 난이도
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-xs font-bold"
                  >
                    <option value="입문 (Easy)">입문 (Easy)</option>
                    <option value="중급 (Medium)">중급 (Medium)</option>
                    <option value="전문가 (Expert)">전문가 (Expert)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E6E6E] mb-1">
                    커버 이미지 URL
                  </label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-xs"
                  />
                </div>
              </div>

              {/* Content Body Editor */}
              <div>
                <label className="block text-xs font-bold text-[#3D5A40] dark:text-[#E8DCC7] mb-1">
                  기사 본문 (HTML/Rich Content)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  required
                  className="w-full p-4 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C] text-xs font-mono leading-relaxed focus:outline-hidden focus:border-[#3D5A40]"
                />
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-bold text-[#6E6E6E] mb-1">
                  태그 키워드 (엔터로 추가)
                </label>
                <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C]">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-[#3D5A40] text-white text-xs font-semibold flex items-center gap-1"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="hover:text-red-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="태그 입력..."
                    className="bg-transparent text-xs focus:outline-hidden p-1 min-w-[100px]"
                  />
                </div>
              </div>
            </form>

            {/* Integrated AI Assistant Panel */}
            <AiAssistantPanel
              title={title}
              content={content}
              categoryName={CATEGORIES.find((c) => c.slug === category)?.name || ''}
              onApplySeo={(sTitle, sDesc, sTags) => {
                setSeoTitle(sTitle);
                setSeoDescription(sDesc);
                setTags([...new Set([...tags, ...sTags])]);
              }}
              onApplyFaq={(newFaqs) => {
                setFaqs(newFaqs);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
