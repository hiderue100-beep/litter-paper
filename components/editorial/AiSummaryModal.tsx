'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, CheckCircle2, ShieldCheck, Languages, Copy, Check } from 'lucide-react';
import { Article } from '@/types';
import { aiEngine } from '@/lib/aiEngine';
import { useToast } from '../ui/Toast';

interface AiSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article;
}

export function AiSummaryModal({ isOpen, onClose, article }: AiSummaryModalProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<'kr' | 'en'>('kr');

  if (!isOpen) return null;

  const summaryData = aiEngine.generateArticleSummary(article);
  const qualityReport = aiEngine.analyzeContentQuality(article.title, article.content);

  const handleCopySummary = () => {
    const textToCopy = `[CAT NOTE AI 3줄 요약]\n제목: ${article.title}\n\n1. ${summaryData.bulletPoints[0]}\n2. ${summaryData.bulletPoints[1]}\n3. ${summaryData.bulletPoints[2]}\n\n💡 핵심 인사이트: ${summaryData.keyInsight}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('AI 요약문이 클립보드에 복사되었습니다.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-xl bg-white dark:bg-[#1D231E] rounded-3xl shadow-2xl border border-[#ECECEC] dark:border-[#2A332C] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#3D5A40] to-[#2F4732] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-[#E8DCC7]">
                <Sparkles className="w-5 h-5 text-[#C77B30]" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold font-serif-editorial">
                  CAT NOTE AI Executive Summary
                </h3>
                <p className="text-xs text-[#E8DCC7]/80">
                  인공지능 수의학 컨텐츠 분석엔진 2.0
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-[#202020] dark:text-[#F2F5F3]">
            {/* Target Article Reference */}
            <div className="p-3.5 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] border border-[#ECECEC] dark:border-[#2A332C]">
              <div className="text-[11px] font-bold text-[#3D5A40] dark:text-[#E8DCC7] uppercase">
                {article.categoryName} • 읽기 {article.readingTime}분
              </div>
              <h4 className="text-sm font-bold mt-0.5 line-clamp-1">
                {article.title}
              </h4>
            </div>

            {/* Quality Score & Readiness */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#E8DCC7]/30 dark:bg-white/5 border border-[#E8DCC7] dark:border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3D5A40] dark:text-[#E8DCC7]" />
                <span className="font-medium">AI 신뢰도 분석점수:</span>
                <span className="font-bold text-[#3D5A40] dark:text-[#E8DCC7]">
                  {qualityReport.score}점 ({qualityReport.readability})
                </span>
              </div>
              <button
                onClick={() => setLang(lang === 'kr' ? 'en' : 'kr')}
                className="flex items-center gap-1 text-[#C77B30] font-bold hover:underline"
              >
                <Languages className="w-3.5 h-3.5" />
                {lang === 'kr' ? 'English View' : '한국어 보기'}
              </button>
            </div>

            {/* Bullet Points */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E6E6E] dark:text-[#9EAAA0] mb-3">
                핵심 요약 3선 (3-Bullet Takeaways)
              </h4>
              <div className="space-y-3">
                {summaryData.bulletPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26] text-sm leading-relaxed"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#3D5A40] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>
                      {lang === 'en'
                        ? aiEngine.translateArticle(pt, 'en')
                        : pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Action Box */}
            <div className="p-4 rounded-2xl bg-[#C77B30]/10 border border-[#C77B30]/30 text-sm">
              <div className="font-bold text-[#C77B30] mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 집사 실천 가이드
              </div>
              <p className="text-xs text-[#202020] dark:text-[#F2F5F3] leading-relaxed">
                {summaryData.recommendedAction}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-[#FAF9F7] dark:bg-[#252C26] border-t border-[#ECECEC] dark:border-[#2A332C] flex items-center justify-between">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#ECECEC] dark:border-[#2A332C] bg-white dark:bg-[#1D231E] text-xs font-semibold hover:border-[#3D5A40] transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? '복사됨' : '요약 텍스트 복사'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#3D5A40] text-white text-xs font-bold hover:bg-[#2F4732] transition-colors"
            >
              확인 닫기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
