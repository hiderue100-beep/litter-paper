'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Tag, FileText, Check, HelpCircle, RefreshCw } from 'lucide-react';
import { aiEngine } from '@/lib/aiEngine';
import { FaqItem } from '@/types';
import { useToast } from '../ui/Toast';

interface AiAssistantPanelProps {
  title: string;
  content: string;
  categoryName: string;
  onApplySeo: (seoTitle: string, seoDesc: string, tags: string[]) => void;
  onApplyFaq: (faqs: FaqItem[]) => void;
}

export function AiAssistantPanel({
  title,
  content,
  categoryName,
  onApplySeo,
  onApplyFaq,
}: AiAssistantPanelProps) {
  const { showToast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [qualityReport, setQualityReport] = useState<any>(null);
  const [headlineVariations, setHeadlineVariations] = useState<any>(null);
  const [generatedFaqs, setGeneratedFaqs] = useState<FaqItem[]>([]);

  const handleRunAiAnalysis = () => {
    if (!title.trim()) {
      showToast('기사 제목을 먼저 입력해 주세요.', 'error');
      return;
    }
    setAnalyzing(true);

    setTimeout(() => {
      const qReport = aiEngine.analyzeContentQuality(title, content);
      const hVars = aiEngine.generateHeadlineVariations(title);
      const faqs = aiEngine.generateFaqs(title, categoryName);

      setQualityReport(qReport);
      setHeadlineVariations(hVars);
      setGeneratedFaqs(faqs);
      setAnalyzing(false);
      showToast('AI 종합 진단 및 최적화 생성이 완료되었습니다.');
    }, 600);
  };

  const handleApplySeoMeta = () => {
    const res = aiEngine.generateSeoMeta(title, content, categoryName);
    onApplySeo(res.seoTitle, res.seoDescription, res.suggestedTags);
    showToast('AI SEO 제목, 메타 설명, 태그가 기사에 적용되었습니다.');
  };

  const handleApplyFaqs = () => {
    if (generatedFaqs.length > 0) {
      onApplyFaq(generatedFaqs);
      showToast('AI FAQ 모듈이 기사에 적용되었습니다.');
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#1D231E] border border-[#ECECEC] dark:border-[#2A332C] space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#C77B30]" />
          <h3 className="font-bold font-serif-editorial text-base text-[#202020] dark:text-[#F2F5F3]">
            LITTER PAPER AI 에디터 어시스턴트
          </h3>
        </div>
        <button
          onClick={handleRunAiAnalysis}
          disabled={analyzing}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3D5A40] text-white text-xs font-bold hover:bg-[#2F4732] disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${analyzing ? 'animate-spin' : ''}`} />
          {analyzing ? 'AI 분석 중...' : 'AI 종합 분석 실행'}
        </button>
      </div>

      {/* SEO & Auto Tag Action */}
      <div className="p-4 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#3D5A40] dark:text-[#E8DCC7] flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> 자동 SEO & 태그 추출기
          </span>
          <button
            onClick={handleApplySeoMeta}
            className="text-xs font-bold text-[#C77B30] hover:underline"
          >
            기사에 자동 적용
          </button>
        </div>
        <p className="text-xs text-[#6E6E6E]">
          기사 내용을 바탕으로 검색 엔진 노출용 메타 타이틀, 메타 디스크립션, 추천 태그 5개를 즉시 추출합니다.
        </p>
      </div>

      {/* Analysis Results Display */}
      {qualityReport && (
        <div className="space-y-4 pt-2 border-t border-[#ECECEC] dark:border-[#2A332C]">
          {/* Quality score */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#E8DCC7]/30 dark:bg-white/5 border border-[#E8DCC7] text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3D5A40]" />
              <span className="font-bold">AI 품질 점수:</span>
              <span className="font-extrabold text-[#3D5A40] text-sm">
                {qualityReport.score}점 ({qualityReport.readability})
              </span>
            </div>
            <span className="text-[11px] text-[#6E6E6E]">
              권장 난이도: {qualityReport.readingDifficulty}
            </span>
          </div>

          {/* Headline Variations */}
          {headlineVariations && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-[#3D5A40] dark:text-[#E8DCC7]">
                AI 헤드라인 A/B 테스트 아이디어:
              </div>
              <ul className="space-y-1.5 text-[#6E6E6E]">
                <li className="p-2 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26]">
                  <strong className="text-[#C77B30]">호기심 유발형:</strong> {headlineVariations.curiosityDriven}
                </li>
                <li className="p-2 rounded-xl bg-[#FAF9F7] dark:bg-[#252C26]">
                  <strong className="text-[#3D5A40]">전문가 스타일:</strong> {headlineVariations.expertStyle}
                </li>
              </ul>
            </div>
          )}

          {/* FAQ Apply */}
          {generatedFaqs.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-[#FAF9F7] dark:bg-[#252C26] flex items-center justify-between text-xs">
              <span className="font-bold text-[#3D5A40] flex items-center gap-1">
                <HelpCircle className="w-4 h-4 text-[#C77B30]" /> AI FAQ {generatedFaqs.length}개 생성됨
              </span>
              <button
                onClick={handleApplyFaqs}
                className="px-3 py-1.5 rounded-xl bg-[#3D5A40] text-white font-bold"
              >
                FAQ 기사 하단 삽입
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
