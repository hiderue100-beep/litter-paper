import { Article, FaqItem } from '@/types';

export interface AiSummaryResult {
  bulletPoints: string[];
  keyInsight: string;
  recommendedAction: string;
}

export interface AiSeoResult {
  seoTitle: string;
  seoDescription: string;
  suggestedTags: string[];
  targetAudience: string;
}

export interface AiQualityReport {
  score: number;
  readability: '매우 우수' | '우수' | '보통' | '개선 필요';
  strengths: string[];
  improvements: string[];
  readingDifficulty: '입문 (Easy)' | '중급 (Medium)' | '전문가 (Expert)';
}

export interface AiHeadlineVariations {
  curiosityDriven: string;
  actionOriented: string;
  expertStyle: string;
  seoOptimized: string;
}

export const aiEngine = {
  // Generate 3-bullet AI Summary
  generateArticleSummary(article: Article): AiSummaryResult {
    const isVet = article.category === 'veterinary' || article.category === 'health';
    return {
      bulletPoints: [
        article.summary,
        isVet 
          ? '수의학 논문 및 전문 수의사의 자문을 거쳐 검증된 일상 홈케어 지침 포함'
          : '보호자가 즉시 실천할 수 있는 행동 및 환경 풍부화 솔루션 제시',
        `예상 읽기 시간 ${article.readingTime}분으로 ${article.difficulty} 레벨 보호자 맞춤형 에디토리얼`,
      ],
      keyInsight: `이 글의 핵심 포인트: "${article.title}"에 대한 명확한 문제 인식과 사전 예방법 제시`,
      recommendedAction: isVet 
        ? '증상이 24시간 이상 지속되거나 이상 배뇨 행동 발견 시 즉시 동물병원 전문의 자문을 구하세요.'
        : '오늘부터 반려묘의 수직 공간 확장과 긍정 강화 스킨십을 15분씩 실천해 보세요.',
    };
  },

  // Generate SEO metadata & tags
  generateSeoMeta(title: string, content: string, categoryName: string): AiSeoResult {
    const cleanContent = content.replace(/<[^>]*>?/gm, '').slice(0, 150);
    return {
      seoTitle: `${title} | CAT NOTE ${categoryName}`,
      seoDescription: `${cleanContent}... 고양이 전문 미디어 캣노트에서 확인하세요.`,
      suggestedTags: ['고양이건강', '수의학가이드', categoryName, '반려묘케어', '집사필독'],
      targetAudience: '반려묘의 미세한 건강/행동 변화에 관심이 높은 2040 집사',
    };
  },

  // Calculate AI Content Quality Score (1-100)
  analyzeContentQuality(title: string, content: string): AiQualityReport {
    const length = content.length;
    const hasHeadings = content.includes('<h2>');
    const hasQuotes = content.includes('blockquote');
    
    let baseScore = 75;
    if (length > 1000) baseScore += 10;
    if (hasHeadings) baseScore += 8;
    if (hasQuotes) baseScore += 7;

    const score = Math.min(baseScore, 98);

    return {
      score,
      readability: score >= 90 ? '매우 우수' : score >= 80 ? '우수' : '보통',
      strengths: [
        '단락 구성 및 H2 목차 배치가 논리적입니다.',
        '전문적 용어와 쉬운 해설의 균형이 우수합니다.',
        '독자 몰입도를 높이는 인용구 및 하이라이트 제공.',
      ],
      improvements: [
        '시각적 이해를 높이기 위한 인포그래픽 요소를 추가하면 좋습니다.',
        '연관 카테고리 기사 하단 링크 배치를 권장합니다.',
      ],
      readingDifficulty: length > 2500 ? '전문가 (Expert)' : length > 1200 ? '중급 (Medium)' : '입문 (Easy)',
    };
  },

  // Generate Headline A/B Testing Variations
  generateHeadlineVariations(originalTitle: string): AiHeadlineVariations {
    return {
      curiosityDriven: `왜 고양이는 이 신호를 보낼까? ${originalTitle.split(':')[0] || originalTitle}`,
      actionOriented: `오늘부터 실천하는 고양이 케어: ${originalTitle}`,
      expertStyle: `[수의학 수석 칼럼] ${originalTitle}`,
      seoOptimized: `2026 필수 가이드: ${originalTitle} (전문 분석)`,
    };
  },

  // AI FAQ Generator
  generateFaqs(title: string, category: string): FaqItem[] {
    return [
      {
        question: `"${title}" 내용을 초보 집사도 바로 적용할 수 있나요?`,
        answer: '네, 캣노트 에디토리얼 팀은 어려운 수의학 용어를 보호자의 눈높이에 맞춰 검증 및 재구성하여 제공하고 있습니다.',
      },
      {
        question: '이상 증상이 지속될 때 병원 방문 전 준비할 사항은?',
        answer: '반려묘의 식사, 배뇨, 이상 행동 상태를 15초 내외의 동영상으로 촬영하여 수의사에게 보여주시면 훨씬 정확한 진단에 도움이 됩니다.',
      },
      {
        question: '관련 추가 정보는 어디서 볼 수 있나요?',
        answer: `CAT NOTE의 [${category}] 카테고리 검색창에서 연관 단어를 입력하시면 수의학 논문 요약본과 전문가 칼럼을 확인하실 수 있습니다.`,
      },
    ];
  },

  // Translate Article
  translateArticle(text: string, targetLang: 'en' | 'kr'): string {
    if (targetLang === 'en') {
      return `[AI Translated Version]\n\n${text
        .replace(/특발성 방광염/g, 'Feline Idiopathic Cystitis (FIC)')
        .replace(/수의사/g, 'Veterinarian')
        .replace(/고양이/g, 'Cat')
        .replace(/집사/g, 'Cat Owner')
        .replace(/음수량/g, 'Water Intake')}`;
    }
    return text;
  },

  // Social Media Caption Generator
  generateSocialCaption(article: Article): string {
    return `🐱 [CAT NOTE 에디터 PICK]\n\n"${article.title}"\n\n📌 ${article.summary}\n\n👉 읽기 시간 ${article.readingTime}분 | 캣노트에서 전문 가이드를 확인해보세요!\n#캣노트 #고양이 #반려묘 #${article.categoryName.replace(/\s+/g, '')}`;
  },
};
