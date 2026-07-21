'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AiAssistantPanel } from '@/components/admin/AiAssistantPanel';
import { storage } from '@/lib/storage';
import { CATEGORIES, AUTHORS } from '@/lib/mockData';
import { Article, CategorySlug, FaqItem, ArticleStatus } from '@/types';
import { calculateReadingTime, slugify, getArticleAccessStatus, formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { Save, Plus, FileText, Sparkles, Check, ChevronRight, Lock, Clock, Calendar, Code, Edit3, Type, List, Quote, Bold } from 'lucide-react';

export default function AdminArticlesPage() {
  const { showToast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CategorySlug>('nutrition');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=1200&auto=format&fit=crop&q=80');
  const [difficulty, setDifficulty] = useState<'입문 (Easy)' | '중급 (Medium)' | '전문가 (Expert)'>('중급 (Medium)');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState<string[]>(['내돈내산', '상품리뷰']);
  const [tagInput, setTagInput] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  // Editor Mode State (Plain Text vs Raw HTML)
  const [editorMode, setEditorMode] = useState<'plain' | 'html'>('plain');
  const [plainText, setPlainText] = useState('');

  // Premium & 24h Free Publishing System states
  const [publishedAt, setPublishedAt] = useState<string>(new Date().toISOString().slice(0, 16));
  const [freeAccessDurationHours, setFreeAccessDurationHours] = useState<number>(24);
  const [isPremiumOnly, setIsPremiumOnly] = useState<boolean>(false);
  const [isScheduled, setIsScheduled] = useState<boolean>(false);
  const [scheduledAt, setScheduledAt] = useState<string>(new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16));

  useEffect(() => {
    setArticles(storage.getArticles());
  }, []);

  // HTML to Plain Text Converter
  const htmlToPlainText = (htmlString: string): string => {
    if (!htmlString) return '';
    let text = htmlString;
    text = text.replace(/<h2>(.*?)<\/h2>/gi, '\n\n## $1\n');
    text = text.replace(/<h3>(.*?)<\/h3>/gi, '\n\n### $1\n');
    text = text.replace(/<blockquote>(.*?)<\/blockquote>/gi, '\n\n> $1\n');
    text = text.replace(/<li>(.*?)<\/li>/gi, '- $1\n');
    text = text.replace(/<\/?ul>/gi, '\n');
    text = text.replace(/<\/?ol>/gi, '\n');
    text = text.replace(/<p>(.*?)<\/p>/gi, '$1\n\n');
    text = text.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
    text = text.replace(/<br\s*\/?>/gi, '\n');
    text = text.replace(/<[^>]+>/g, '');
    return text.trim();
  };

  // Plain Text to HTML Converter
  const plainTextToHtml = (textString: string): string => {
    if (!textString) return '';
    const paragraphs = textString.split(/\n\s*\n/);

    const htmlParagraphs = paragraphs.map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return '';

      if (trimmed.startsWith('## ')) {
        return `<h2>${trimmed.replace(/^##\s*/, '')}</h2>`;
      }
      if (trimmed.startsWith('### ')) {
        return `<h3>${trimmed.replace(/^###\s*/, '')}</h3>`;
      }
      if (trimmed.startsWith('> ')) {
        return `<blockquote>${trimmed.replace(/^>\s*/, '')}</blockquote>`;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed
          .split('\n')
          .map((line) => `  <li>${line.replace(/^[-*]\s*/, '')}</li>`)
          .join('\n');
        return `<ul>\n${items}\n</ul>`;
      }

      // Format bold text
      let formatted = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return `<p>${formatted}</p>`;
    });

    return htmlParagraphs.filter(Boolean).join('\n\n');
  };

  const handleSelectArticle = (art: Article) => {
    setSelectedArticleId(art.id);
    setTitle(art.title);
    setSubtitle(art.subtitle);
    setCategory(art.category);
    setCoverImage(art.coverImage);
    setDifficulty(art.difficulty);
    setContent(art.content);
    setPlainText(htmlToPlainText(art.content));
    setSummary(art.summary);
    setTags(art.tags);
    setSeoTitle(art.seoTitle || '');
    setSeoDescription(art.seoDescription || '');
    setFaqs(art.faq || []);

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
    setCategory('nutrition');
    setCoverImage('https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=1200&auto=format&fit=crop&q=80');
    setDifficulty('중급 (Medium)');
    const defaultText = `## 1. 100% 내돈내산 실험 개요
실측 데이터 및 연구 장비로 측정한 검증 결과를 작성하세요.

> "광고 협찬 없는 100% 직접 구매 실험 데이터를 공개합니다."

## 2. 세부 검증 결과 수치
- 측정 지표 1: 실측 수치 기록
- 측정 지표 2: 내구성 및 안전성 평가
`;
    setPlainText(defaultText);
    setContent(plainTextToHtml(defaultText));
    setSummary('');
    setTags(['내돈내산', '상품리뷰']);
    setSeoTitle('');
    setSeoDescription('');
    setFaqs([]);

    setPublishedAt(new Date().toISOString().slice(0, 16));
    setFreeAccessDurationHours(24);
    setIsPremiumOnly(false);
    setIsScheduled(false);
    setScheduledAt(new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16));
  };

  const handlePlainTextChange = (val: string) => {
    setPlainText(val);
    setContent(plainTextToHtml(val));
  };

  const handleHtmlContentChange = (val: string) => {
    setContent(val);
    setPlainText(htmlToPlainText(val));
  };

  // Helper Formatting Inserts
  const insertPlainTextFormat = (type: 'h2' | 'quote' | 'list' | 'bold') => {
    let snippet = '';
    if (type === 'h2') snippet = '\n\n## 2. 소제목 제목 입력\n';
    if (type === 'quote') snippet = '\n\n> "인용할 구절이나 핵심 강조 문구"\n';
    if (type === 'list') snippet = '\n\n- 항목 1\n- 항목 2\n';
    if (type === 'bold') snippet = ' **강조 텍스트** ';

    const nextText = plainText + snippet;
    handlePlainTextChange(nextText);
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
    const finalContent = editorMode === 'plain' ? plainTextToHtml(plainText) : content;
    const readingTime = calculateReadingTime(finalContent);

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
      content: finalContent,
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
    <div className="min-h-screen flex bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              기사 작성 & 스마트 에디터
            </h1>
            <p className="text-xs text-[#666666] dark:text-[#A0A0A0]">
              일반 텍스트 입력 모드 및 HTML 직접 편집 모드를 지원하는 에디토리얼 퍼블리셔
            </p>
          </div>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#333333] text-white text-xs font-extrabold shadow-md hover:bg-[#C19A6B] transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> 새로 쓰기
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left List of Articles with Status Badges */}
          <div className="lg:col-span-4 p-5 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] space-y-3 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#666666] mb-2">
              등록된 검증 기사 목록 ({articles.length}개)
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
                        ? 'bg-[#333333] text-white border-[#333333] shadow-xs font-extrabold'
                        : 'bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#FAF8F5] border-[#EAE6DF] dark:border-[#333333] hover:border-[#C19A6B]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-80 mb-1">
                      <span className="font-bold text-[#C19A6B]">{art.categoryName}</span>
                      {access.status === 'scheduled' && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-bold">
                          예약 발행
                        </span>
                      )}
                      {access.status === 'free_now' && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold">
                          24h 무료 ({access.formattedCountdown})
                        </span>
                      )}
                      {access.status === 'expired_premium' && (
                        <span className="px-2 py-0.5 rounded-md bg-[#C19A6B] text-white font-bold">
                          프리미엄 아카이브
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
            <form onSubmit={handleSave} className="space-y-6 p-6 rounded-3xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF] dark:border-[#333333]">
                <h3 className="text-lg font-extrabold">
                  {selectedArticleId ? '에디토리얼 수정' : '새 에디토리얼 작성'}
                </h3>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#333333] text-white font-extrabold text-xs hover:bg-[#C19A6B] transition-colors shadow-md"
                >
                  <Save className="w-4 h-4" /> 게시하기 / 저장
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#333333] dark:text-[#FAF8F5] mb-1">
                    기사 제목 (Title)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="예: 벤토나이트 10종 먼지 분광 측정 수치 및 결분력 테스트"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] text-sm focus:outline-hidden focus:border-[#C19A6B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#666666] mb-1">
                    부제목 (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="기사의 핵심 요약 문구"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Premium Content & 24h Free System Control Panel */}
              <div className="p-5 rounded-2xl bg-[#C19A6B]/15 border border-[#C19A6B]/30 space-y-4">
                <h4 className="text-xs font-extrabold text-[#C19A6B] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C19A6B]" /> 퍼블리싱 & 24시간 무료 공개 설정
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Scheduled Toggle */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] space-y-2">
                    <label className="flex items-center gap-2 font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isScheduled}
                        onChange={(e) => setIsScheduled(e.target.checked)}
                        className="w-4 h-4 rounded text-[#C19A6B]"
                      />
                      <span>예약 발행 (Scheduled Publishing)</span>
                    </label>
                    {isScheduled && (
                      <input
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                        className="w-full p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] text-xs font-mono"
                      />
                    )}
                  </div>

                  {/* Premium Only Toggle */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#242424] border border-[#EAE6DF] dark:border-[#333333] space-y-2">
                    <label className="flex items-center gap-2 font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPremiumOnly}
                        onChange={(e) => setIsPremiumOnly(e.target.checked)}
                        className="w-4 h-4 rounded text-[#C19A6B]"
                      />
                      <span className="text-[#C19A6B]">즉시 프리미엄 전용 (No Free Access)</span>
                    </label>
                    <p className="text-[11px] text-[#666666]">
                      24시간 무료 공개 없이 즉시 프리미엄 결제 회원 전용으로만 공개됩니다.
                    </p>
                  </div>
                </div>

                {/* Free Access Duration Slider/Select */}
                {!isPremiumOnly && !isScheduled && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#EAE6DF]/60 dark:border-[#333333]/60 text-xs">
                    <span className="font-bold text-[#666666]">무료 독서 공개 시간 (Hours):</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFreeAccessDurationHours(24)}
                        className={`px-3 py-1.5 rounded-lg font-bold ${freeAccessDurationHours === 24 ? 'bg-[#C19A6B] text-white' : 'bg-white dark:bg-[#242424] text-[#666666]'}`}
                      >
                        24시간 (기본)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFreeAccessDurationHours(48)}
                        className={`px-3 py-1.5 rounded-lg font-bold ${freeAccessDurationHours === 48 ? 'bg-[#C19A6B] text-white' : 'bg-white dark:bg-[#242424] text-[#666666]'}`}
                      >
                        48시간
                      </button>
                      <button
                        type="button"
                        onClick={() => setFreeAccessDurationHours(0)}
                        className={`px-3 py-1.5 rounded-lg font-bold ${freeAccessDurationHours === 0 ? 'bg-[#333333] text-white' : 'bg-white dark:bg-[#242424] text-[#666666]'}`}
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
                  <label className="block text-xs font-bold text-[#666666] mb-1">
                    카테고리 선택
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategorySlug)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] text-xs font-bold"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#666666] mb-1">
                    읽기 난이도
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] text-xs font-bold"
                  >
                    <option value="입문 (Easy)">입문 (Easy)</option>
                    <option value="중급 (Medium)">중급 (Medium)</option>
                    <option value="전문가 (Expert)">전문가 (Expert)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#666666] mb-1">
                    커버 이미지 URL
                  </label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] text-xs"
                  />
                </div>
              </div>

              {/* DUAL-MODE CONTENT EDITOR (Plain Text vs Raw HTML Tabs) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditorMode('plain');
                        setPlainText(htmlToPlainText(content));
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                        editorMode === 'plain'
                          ? 'bg-[#333333] text-white shadow-xs'
                          : 'bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#666666] border border-[#EAE6DF] dark:border-[#333333]'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#C19A6B]" /> 일반 텍스트 편집 모드
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditorMode('html');
                        setContent(plainTextToHtml(plainText));
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                        editorMode === 'html'
                          ? 'bg-[#333333] text-white shadow-xs'
                          : 'bg-[#FAF8F5] dark:bg-[#1A1A1A] text-[#666666] border border-[#EAE6DF] dark:border-[#333333]'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5 text-[#C19A6B]" /> HTML 소스 코드 편집 모드
                    </button>
                  </div>

                  <span className="text-[11px] text-[#666666]">
                    {editorMode === 'plain' ? '줄바꿈 시 자동 서식 변환' : 'HTML 직접 수정'}
                  </span>
                </div>

                {/* Plain Text Editor Toolbar Helpers */}
                {editorMode === 'plain' && (
                  <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] text-xs">
                    <span className="font-bold text-[#666666] text-[11px] mr-1">빠른 서식 서명:</span>
                    <button
                      type="button"
                      onClick={() => insertPlainTextFormat('h2')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#242424] border border-[#EAE6DF] hover:border-[#C19A6B] font-bold text-[11px] flex items-center gap-1"
                    >
                      <Type className="w-3 h-3 text-[#C19A6B]" /> + 소제목 (##)
                    </button>
                    <button
                      type="button"
                      onClick={() => insertPlainTextFormat('quote')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#242424] border border-[#EAE6DF] hover:border-[#C19A6B] font-bold text-[11px] flex items-center gap-1"
                    >
                      <Quote className="w-3 h-3 text-[#C19A6B]" /> + 인용문 (&gt;)
                    </button>
                    <button
                      type="button"
                      onClick={() => insertPlainTextFormat('list')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#242424] border border-[#EAE6DF] hover:border-[#C19A6B] font-bold text-[11px] flex items-center gap-1"
                    >
                      <List className="w-3 h-3 text-[#C19A6B]" /> + 리스트 (-)
                    </button>
                    <button
                      type="button"
                      onClick={() => insertPlainTextFormat('bold')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#242424] border border-[#EAE6DF] hover:border-[#C19A6B] font-bold text-[11px] flex items-center gap-1"
                    >
                      <Bold className="w-3 h-3 text-[#C19A6B]" /> + 강조 (**텍스트**)
                    </button>
                  </div>
                )}

                {/* Textarea */}
                {editorMode === 'plain' ? (
                  <textarea
                    value={plainText}
                    onChange={(e) => handlePlainTextChange(e.target.value)}
                    rows={14}
                    placeholder="HTML 코드 없이 편하게 작성하세요. 줄바꿈 시 문단으로 구분되며 소제목은 ## 제목 형식으로 작성할 수 있습니다."
                    className="w-full p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] text-xs leading-relaxed focus:outline-hidden focus:border-[#C19A6B]"
                  />
                ) : (
                  <textarea
                    value={content}
                    onChange={(e) => handleHtmlContentChange(e.target.value)}
                    rows={14}
                    placeholder="<h2>제목</h2> <p>본문 내용</p>"
                    className="w-full p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333] text-xs font-mono leading-relaxed focus:outline-hidden focus:border-[#C19A6B]"
                  />
                )}
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-bold text-[#666666] mb-1">
                  태그 키워드 (엔터로 추가)
                </label>
                <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE6DF] dark:border-[#333333]">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-[#333333] text-white text-xs font-semibold flex items-center gap-1"
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
