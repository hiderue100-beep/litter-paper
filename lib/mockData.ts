import { Article, Author, Category, Breed, RssSource, RssImportedArticle } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-vet',
    name: '수의학 지식',
    nameEn: 'Veterinary',
    slug: 'veterinary',
    description: 'ISFM 인증 수의사진이 제공하는 질환 가이드, 예방의학, 검사 해석 및 최신 저널 분석.',
    icon: 'Stethoscope',
    count: 42,
    featured: true,
  },
  {
    id: 'cat-behavior',
    name: '행동 심리학',
    nameEn: 'Behavior',
    slug: 'behavior',
    description: '다묘가정 합사, 오줌 테러, 스트레스 행동 교정 및 고양이 언어 심층 분석.',
    icon: 'Brain',
    count: 28,
    featured: true,
  },
  {
    id: 'cat-nutrition',
    name: '식의학 & 영양',
    nameEn: 'Nutrition',
    slug: 'nutrition',
    description: '주식 캔 vs 건식 사료 분석, DM 영양 성분 계산법, 음수량 증대 및 영양제 검증.',
    icon: 'Apple',
    count: 35,
    featured: true,
  },
  {
    id: 'cat-rescue',
    name: '입양 & 구조',
    nameEn: 'Rescue',
    slug: 'rescue',
    description: '유기묘 구조 일기, 임시보호(임보) 일지 및 따뜻한 정식 입양 이야기.',
    icon: 'Home',
    count: 33,
    featured: true,
  },
  {
    id: 'cat-columns',
    name: '전문가 칼럼',
    nameEn: 'Columns',
    slug: 'columns',
    description: '행동교정사, 동물복지 전문가, 수의사의 심도 있는 피처 칼럼.',
    icon: 'Feather',
    count: 22,
  },
  {
    id: 'cat-travel',
    name: '동반 여행',
    nameEn: 'Travel',
    slug: 'travel',
    description: '병원 이동장 적응 훈련부터 동반 휴식 공간과 안전 케이지 팁.',
    icon: 'Compass',
    count: 12,
  },
  {
    id: 'cat-community',
    name: '커뮤니티 라운지',
    nameEn: 'Community',
    slug: 'community',
    description: '집사들의 질문과 답변, 육아 나눔, 자랑거리 및 일상 커뮤니케이션.',
    icon: 'Users',
    count: 65,
  },
];

export const AUTHORS: Author[] = [
  {
    id: 'author-1',
    name: '김서연 수의사',
    role: '고양이 전문 병원 원장 / ISFM 인증 수의사',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
    bio: '15년간 고양이 전용 병원을 운영하며 Feline Medicine을 연구해 온 전문 수의사입니다. 보호자가 알기 쉬운 의학 언어로 고양이 건강을 전합니다.',
    articlesCount: 48,
    followersCount: 12400,
    verified: true,
    socials: {
      instagram: 'https://instagram.com',
      website: 'https://litterpaper.kr/vet-kim',
    },
  },
  {
    id: 'author-2',
    name: '박진우 행동교정사',
    role: '국제 고양이 행동 컨설턴트 (IAABC-CDBC)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    bio: '고양이의 마음에 귀 기울이는 행동 전문가. 다묘가정의 갈등 해결과 긍정 강화 훈련 전문 칼럼을 기재합니다.',
    articlesCount: 35,
    followersCount: 8900,
    verified: true,
  },
  {
    id: 'author-3',
    name: '이수아 저널리스트',
    role: 'LITTER PAPER 수석 에디터',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    bio: '유기묘 3마리와 살고 있는 집사 9년 차 라이터. 반려동물 복지 정책과 전 세계 고양이 트렌드를 심층 탐사 취재합니다.',
    articlesCount: 62,
    followersCount: 15300,
    verified: true,
  },
  {
    id: 'author-4',
    name: '최민준 영양학 연구원',
    role: '반려동물 영양사 / 사료 분석가',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: '라벨 너머의 진짜 영양 성분을 분석합니다. 습식 건식 사료의 성분 비율과 칼로리 계산 노하우를 공유합니다.',
    articlesCount: 29,
    followersCount: 7100,
    verified: true,
  },
];

// Helper for dynamic published dates for live 24h countdown testing
const now = new Date();
const fourHoursAgo = new Date(now.getTime() - 4 * 3600 * 1000).toISOString();
const twelveHoursAgo = new Date(now.getTime() - 12 * 3600 * 1000).toISOString();
const threeDaysAgo = new Date(now.getTime() - 72 * 3600 * 1000).toISOString();
const fiveDaysAgo = new Date(now.getTime() - 120 * 3600 * 1000).toISOString();
const eighteenHoursFromNow = new Date(now.getTime() + 18 * 3600 * 1000).toISOString();

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'feline-idiopathic-cystitis-guide-2026',
    title: '원인 불명의 방광염 FIC, 집사가 반드시 알아야 할 5가지 행동적 신호',
    subtitle: '음수량 부족만이 원인이 아니다? 고양이 스트레스가 방광에 미치는 놀라운 영향을 수의학 논문 기반으로 분석합니다.',
    summary: '특발성 방광염(FIC)은 고양이 하부요로질환(FLUTD) 중 가장 흔하지만 명확한 원인을 찾기 어렵습니다. 수의학 최신 가이드를 통해 환경적 스트레스 요인을 차단하고 완치율을 높이는 일상 관리 팁을 소개합니다.',
    category: 'veterinary',
    categoryName: '수의학 지식',
    tags: ['FIC방광염', '음수량', '하부요로질환', '고양이스트레스', '수의사자문'],
    author: AUTHORS[0],
    coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&auto=format&fit=crop&q=80',
    readingTime: 6,
    difficulty: '중급 (Medium)',
    publishedAt: fourHoursAgo, // Live 24h Free countdown active!
    updatedAt: fourHoursAgo,
    likes: 342,
    views: 4890,
    commentsCount: 28,
    isHero: true,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    status: 'published',
    freeAccessDurationHours: 24,
    isPremium: false,
    isPremiumOnly: false,
    seoTitle: '고양이 특발성 방광염(FIC) 원인과 해결법 - LITTER PAPER 가이드',
    seoDescription: '화장실 들락날락, 혈뇨 신호부터 수분 공급법과 수직 공간 배치가 방광염 치료에 미치는 수의학적 원리를 확인하세요.',
    faq: [
      {
        question: '특발성 방광염(FIC)과 일반 방광염의 차이는 무엇인가요?',
        answer: '일반 방광염은 세균 감염이 원인인 경우가 많지만, 특발성 방광염(FIC)은 세균 감염 없이 자율신경계 과활성화와 환경 스트레스로 인해 방광 점막이 손상되는 질환입니다.',
      },
      {
        question: '방광염 증상이 나타났을 때 응급 상황 기준은?',
        answer: '수컷 고양이가 12시간 이상 소변을 전혀 보지 못하고 배를 만지면 비명을 지르거나 토를 하는 경우 요도 폐색 위험이 있어 즉시 응급 병원에 내원해야 합니다.',
      },
    ],
    tableOfContents: [
      { id: 'sec-1', title: '1. 고양이 방광염의 70%를 차지하는 FIC란?', level: 2 },
      { id: 'sec-2', title: '2. 방광염을 의심해야 하는 미세한 행동 변화', level: 2 },
      { id: 'sec-3', title: '3. 수분 섭취량을 2배 늘리는 실전 세팅', level: 2 },
      { id: 'sec-4', title: '4. 스트레스 지수를 낮추는 환경 풍부화 솔루션', level: 2 },
    ],
    content: `
<h2>1. 고양이 방광염의 70%를 차지하는 FIC란?</h2>
<p>고양이가 화장실에서 오래 안절부절못하거나, 소변을 볼 때 감쪽같이 울음소리를 낸다면 가장 먼저 의심해보아야 할 질환이 <strong>고양이 특발성 방광염(Feline Idiopathic Cystitis, FIC)</strong>입니다. 전체 고양이 하부요로질환(FLUTD) 환묘의 약 60~70%가 이 특발성 방광염에 해당합니다.</p>
<p>'특발성(Idiopathic)'이란 병원체나 명확한 신체적 결함 없이 발생하는 상태를 의미합니다. 수의학적 연구에 따르면, 고양이의 뇌와 방광 점막 사이의 신경전달물질 반응 이상, 그리고 주변 환경 변화에서 오는 심리적 압박감이 핵심 기전으로 밝쳐졌습니다.</p>

<blockquote>"고양이의 방광은 '제2의 감정 기관'입니다. 보호자가 미처 깨닫지 못한 작은 소음이나 냄새의 변화도 방광 점막에 직접적인 염증 반응을 유발할 수 있습니다." - 김서연 수의사</blockquote>

<h2>2. 방광염을 의심해야 하는 미세한 행동 변화</h2>
<p>배뇨 장애가 심해지기 전, 아이들은 다음과 같은 초기 서명을 보냅니다.</p>
<ul>
  <li>화장실을 방문하는 횟수가 하루 5회 이상으로 급증함</li>
  <li>소변 모래 뭉치가 500원 동전 크기로 작아짐</li>
  <li>화장실 입구 주변을 오래 망설이거나 모래를 과도하게 파헤침</li>
  <li>배를 바닥에 대고 불편하게 웅크리는 그루밍 증가 (특히 하복부 털이 빠질 정도)</li>
</ul>

<h2>3. 수분 섭취량을 2배 늘리는 실전 세팅</h2>
<p>FIC 케어의 핵심은 소변을 묽게 만들어 방광 자극을 줄이는 것입니다. 무작정 물그릇만 늘리는 것은 효과가 낮습니다.</p>
<p><strong>수분 공급 3대 원칙:</strong></p>
<ol>
  <li><strong>물그릇 재질 분산:</strong> 유리, 도자기, 스테인리스 수전을 여러 장소에 배치해 선호도를 확인하세요.</li>
  <li><strong>식사와 물그릇 위치 분리:</strong> 고양이는 사냥감(사료) 옆의 물을 오염된 물로 인식하는 야생 본능이 있습니다. 2m 이상 떨어뜨려 놓으세요.</li>
  <li><strong>주식 캔 미온수 믹스:</strong> 하루 1회 습식 캔에 35~40도의 따뜻한 물 30ml를 섞어 스프 형태로 제공합니다.</li>
</ol>

<h2>4. 스트레스 지수를 낮추는 환경 풍부화 솔루션</h2>
<p>다묘가정이라면 화장실 개수를 '고양이 수 + 1개'로 늘리고, 독립된 수직 공간(캣타워, 캣폴)을 확보해야 합니다. 페로몬 디퓨저(Feliway)를 거실과 침실에 설치하는 것도 방광염 재발률을 40% 이상 낮추는 연구 데이터가 존재합니다.</p>
    `,
  },
  {
    id: 'art-2',
    slug: 'multicat-household-harmony-rules',
    title: '다묘가정 평화 협정: 첫째와 둘째의 서열 다툼을 멈추는 3가지 규칙',
    subtitle: '싸움과 장난을 구분하는 법부터 냄새 교환 단계별 합사 테크닉까지, 행동 컨설턴트의 1:1 리포트',
    summary: '새로운 고양이를 데려온 후 기존 고양이가 밥을 거부하거나 경계심을 세우나요? 하악질을 장난으로 오인하지 않고 두 아이 모두 편안한 영토 영역을 나누는 긍정 강화 방식을 공개합니다.',
    category: 'behavior',
    categoryName: '행동 심리학',
    tags: ['합사', '다묘가정', '고양이싸움', '영토권', '하악질'],
    author: AUTHORS[1],
    coverImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&auto=format&fit=crop&q=80',
    readingTime: 5,
    difficulty: '입문 (Easy)',
    publishedAt: threeDaysAgo, // Free time expired -> Premium Archive!
    updatedAt: threeDaysAgo,
    likes: 215,
    views: 3210,
    commentsCount: 16,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    status: 'archived',
    freeAccessDurationHours: 24,
    isPremium: true,
    isPremiumOnly: false,
    seoTitle: '고양이 합사 성공 가이드 - 다묘가정 행동 교정 솔루션',
    seoDescription: '첫 만남 격리 수칙부터 펠리웨이 활용법, 냄새 교환 스텝을 맞춰 아이들의 싸움을 예방하세요.',
    faq: [
      {
        question: '합사 초기 하악질을 하면 무조건 실패인가요?',
        answer: '아닙니다. 하악질은 "너에게 위해를 가할 의사가 없으니 거리를 둬달라"는 고양이 언어의 방어적 의사표시입니다. 격리 단계로 돌아가 천천히 진도를 낮추면 됩니다.',
      },
    ],
    tableOfContents: [
      { id: 'sec-1', title: '1. 장난과 실제 유혈 싸움 구분법', level: 2 },
      { id: 'sec-2', title: '2. 냄새 융합 테크닉 (Scent Exchange)', level: 2 },
      { id: 'sec-3', title: '3. 시각적 차단막을 이용한 단계별 만남', level: 2 },
    ],
    content: `
<h2>1. 장난과 실제 유혈 싸움 구분법</h2>
<p>두 고양이가 엉켜 구를 때, 보호자가 개입해야 할 타이밍인지 판단하기 어렵다면 <strong>소리와 귀의 각도</strong>를 관찰하세요.</p>
<ul>
  <li><strong>장난 플레이:</strong> 소리가 거의 나지 않고, 번갈아 가며 서로를 쫓아다니며 귀가 위를 향해 있습니다.</li>
  <li><strong>실제 싸움:</strong> 으르렁거리는 낮은 소리(Growling), 털이 곤두서고 귀가 뒤로 젖혀진 마징가 귀 상태이며 털이 사방으로 날립니다.</li>
</ul>

<blockquote>"서두르는 합사는 1년을 지연시킵니다. 천천히 밟아나가는 2주의 시간이 평생의 평화를 보장합니다." - 박진우 행동교정사</blockquote>

<h2>2. 냄새 융합 테크닉 (Scent Exchange)</h2>
<p>서로의 시선을 차단한 상태에서 각자의 양 볼 냄새를 묻힌 양말이나 타월을 교체해 줍니다. 냄새를 들이마시면서 좋아하는 간식을 먹게 하여 상대의 냄새 = 기분 좋은 경험이라는 연관 학습을 유도합니다.</p>
    `,
  },
  {
    id: 'art-3',
    slug: 'cat-wet-food-rotation-nutrition-guide',
    title: '주식 캔 vs 건식 사료, 완벽한 비율과 롤링 교체법',
    subtitle: '조단백, 조지방, 수분 수치부터 AAFCO 기준 검증까지! 집사가 꼭 숙지해야 할 사료 라벨 읽기',
    summary: '단일 브랜드 사료만 지속 수유 시 발생할 수 있는 영양 불균형을 막고, 성견 및 성묘로 넘어가는 시기에 맞는 단백질 섭취량을 계산하는 영양 가이드입니다.',
    category: 'nutrition',
    categoryName: '식의학 & 영양',
    tags: ['습식캔', '사료성분', 'AAFCO', '단백질비율', '음수량'],
    author: AUTHORS[3],
    coverImage: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=1200&auto=format&fit=crop&q=80',
    readingTime: 7,
    difficulty: '중급 (Medium)',
    publishedAt: fiveDaysAgo, // Premium Archive
    updatedAt: fiveDaysAgo,
    likes: 189,
    views: 2940,
    commentsCount: 12,
    isFeatured: true,
    isTrending: false,
    isEditorsPick: false,
    aiGenerated: false,
    status: 'archived',
    freeAccessDurationHours: 24,
    isPremium: true,
    isPremiumOnly: false,
    content: `
<h2>1. 고양이에게 육식동물 영양학이 필수인 이유</h2>
<p>고양이는 잡식성인 개와 달리 <strong>진정 육식동물(Obligate Carnivore)</strong>입니다. 타우린, 아라키돈산, 비타민A 등을 자체 합성하지 못하므로 고품질 동물성 단백질 사료 공급이 절대적입니다.</p>

<h2>2. 사료 포장지 뒤 라벨 해석법 (DM 환산 계산법)</h2>
<p>수분 함량이 80%인 습식 캔과 수분 함량이 10%인 건식 사료의 성분을 단순 비교할 수 없습니다. 건물 기준(Dry Matter, DM)으로 변환해야 진정한 단백질과 탄수화물 비율을 알 수 있습니다.</p>
    `,
  },
  {
    id: 'art-4',
    slug: 'korea-cat-welfare-policy-2026-news',
    title: '2026 하반기 전국 지자체 길고양이 TNR 예산 증액 및 동물등록제 확대',
    subtitle: '반려묘 등록 의무화 시도 및 길고양이 겨울철 쉼터 지원 정책 심층 리포트',
    summary: '농림축산식품부의 2026년 동물복지 종합계획에 따라 고양이 내장형 마이크로칩 등록 시범 사업 지역이 전국 광역시로 확대됩니다.',
    category: 'news',
    categoryName: '뉴스 & 이슈',
    tags: ['동물등록제', 'TNR', '동물보호법', '농림부', '길고양이'],
    author: AUTHORS[2],
    coverImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1200&auto=format&fit=crop&q=80',
    readingTime: 4,
    difficulty: '입문 (Easy)',
    publishedAt: twelveHoursAgo, // Live 24h Free active!
    updatedAt: twelveHoursAgo,
    likes: 310,
    views: 4500,
    commentsCount: 22,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: false,
    aiGenerated: false,
    status: 'published',
    freeAccessDurationHours: 24,
    isPremium: false,
    isPremiumOnly: false,
    content: `
<h2>1. 반려묘 내장형 마이크로칩 등록 지원책</h2>
<p>지자체별 시범 지원을 통해 1만 원 이하의 비용으로 반려묘 내장형 마이크로칩 등록이 가능해집니다.</p>
    `,
  },
  {
    id: 'art-5',
    slug: 'exclusive-feline-medical-journal-breakthrough-2026',
    title: '[프리미엄 독점] 최신 Feline CKD 만성 신부전 줄기세포 치료 임상 3상 데이터',
    subtitle: '미국 Feline Medical 저널 2026 최신 논문 원문 번역 및 자문 수의사의 단독 해설 리포트',
    summary: '프리미엄 구독자 전용 심층 수의학 연구 리포트. 만성 신부전(CKD) 3기 고양이의 신장 사구체 여과율(GFR)을 28% 개선시킨 최신 자가 줄기세포 치료제의 임상 데이터를 분석합니다.',
    category: 'veterinary',
    categoryName: '수의학 지식',
    tags: ['프리미엄독점', '만성신부전', 'CKD줄기세포', '수의학논문', 'FelineMedicine'],
    author: AUTHORS[0],
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    readingTime: 9,
    difficulty: '전문가 (Expert)',
    publishedAt: fourHoursAgo,
    updatedAt: fourHoursAgo,
    likes: 540,
    views: 8900,
    commentsCount: 45,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    status: 'premium_only',
    freeAccessDurationHours: 0,
    isPremium: true,
    isPremiumOnly: true,
    content: `
<h2>1. 만성 신부전(CKD) 3상 줄기세포 치료 임상 개요</h2>
<p>본 리포트는 프리미엄 멤버십 전용 수의학 심층 연구 보고서입니다. 신장 사구체 수용체 재생 반응 수치 및 혈중 크레아티닌(Creatinine) 수치 변화 추이를 기재합니다.</p>
<p>2026년 발표된 최신 임상 3상 연구에 따르면, 지방 유래 자가 줄기세포(AdMSC)를 주 1회 총 4회 투여한 시험군에서 BUN 수치가 평균 32mg/dL 감소했습니다.</p>
    `,
  },
  {
    id: 'art-6',
    slug: 'scheduled-cat-litter-bentonite-dust-test-2026',
    title: '[예정 에디토리얼] 벤토나이트 모래 10종 먼지 발생률 분광 측정 및 결분력 테스트',
    subtitle: '내일 아침 08:00 정식 공개! 캣노트 입자 연구팀의 내돈내산 물리 테스트 데이터',
    summary: '시중 대표 벤토나이트 모래 10종의 2m 낙하 먼지 측정 및 30초 결분력 강도 실험 데이터를 내일 오전 8시 공개합니다.',
    category: 'nutrition',
    categoryName: '식의학 & 영양',
    tags: ['벤토나이트', '모래테스트', '내돈내산', '결분력', '미세먼지'],
    author: AUTHORS[3],
    coverImage: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=1200&auto=format&fit=crop&q=80',
    readingTime: 6,
    difficulty: '중급 (Medium)',
    publishedAt: eighteenHoursFromNow, // Scheduled story!
    scheduledAt: eighteenHoursFromNow,
    updatedAt: eighteenHoursFromNow,
    likes: 120,
    views: 80,
    commentsCount: 0,
    isFeatured: false,
    isTrending: false,
    isEditorsPick: false,
    aiGenerated: false,
    status: 'scheduled',
    freeAccessDurationHours: 24,
    isPremium: false,
    isPremiumOnly: false,
    content: `
<h2>1. 벤토나이트 모래 10종 비교 테스트 프리뷰</h2>
<p>내일 아침 8시, 벤토나이트 10종의 먼지 발생량(ppm) 측정 및 물 50ml 투여 후 30초 결분력 붕괴도 실험 결과가 정식 공개됩니다.</p>
    `,
  },
];

export const BREEDS: Breed[] = [
  {
    id: 'breed-ragdoll',
    name: '렉돌',
    nameEn: 'Ragdoll',
    origin: '미국',
    description: '안으면 인형처럼 몸을 맡기는 온순하고 부드러운 성격의 대형 묘종. 비단결 같은 긴 털과 푸른 눈이 특징입니다.',
    temperament: ['온순함', '사람을좋아함', '조용함', '안기기좋아함'],
    weight: '4.5 ~ 9 kg',
    activityLevel: '낮음',
    groomingNeed: '보통',
    lifespan: '12 ~ 17년',
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800&auto=format&fit=crop&q=80',
    healthCareTips: [
      '비후성 심근증(HCM) 유전자 검사 권장',
      '털 엉킴 방지를 위한 주 2~3회 브러싱 필수',
      '활동량이 낮아 체중 관리가 중요함',
    ],
  },
  {
    id: 'breed-british-shorthair',
    name: '브리티시 숏헤어',
    nameEn: 'British Shorthair',
    origin: '영국',
    description: '단단하고 체구가 동글동글한 테디베어 같은 외모. 독립적이면서도 조용히 보호자 곁을 지키는 젠틀맨 고양이입니다.',
    temperament: ['차분함', '독립적', '적응력높음', '충직함'],
    weight: '4 ~ 8 kg',
    activityLevel: '보통',
    groomingNeed: '쉬움',
    lifespan: '14 ~ 20년',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&auto=format&fit=crop&q=80',
    healthCareTips: [
      '밀도 높은 빽빽한 털 모질 관리',
      '과체중 방지를 위한 수직 공간 놀이 유도',
      '치주 질환 예방 양치질 매일 권장',
    ],
  },
  {
    id: 'breed-russian-blue',
    name: '러시안 블루',
    nameEn: 'Russian Blue',
    origin: '러시아',
    description: '에메랄드빛 눈동자와 은빛 감도는 블루 단모가 매력적인 고양이. 낯가림이 있지만 주인을 깊이 사랑합니다.',
    temperament: ['조용함', '지혜로움', '주인해바라기', '신중함'],
    weight: '3 ~ 5.5 kg',
    activityLevel: '보통',
    groomingNeed: '쉬움',
    lifespan: '15 ~ 20년',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&auto=format&fit=crop&q=80',
    healthCareTips: [
      '소음에 민감하므로 조용한 환경 조성',
      '음수량 부족으로 인한 요로결석 주의',
    ],
  },
];

export const RSS_SOURCES: RssSource[] = [
  {
    id: 'rss-1',
    name: '농림축산검역본부 동물보호관리',
    url: 'https://www.animal.go.kr/rss/news.xml',
    category: 'news',
    active: true,
    lastFetchedAt: '2026-07-21T08:00:00Z',
    itemsCount: 142,
  },
  {
    id: 'rss-2',
    name: '한국고양이수의사회 (KSFM)',
    url: 'https://ksfm.or.kr/feed/journal',
    category: 'veterinary',
    active: true,
    lastFetchedAt: '2026-07-20T18:30:00Z',
    itemsCount: 89,
  },
  {
    id: 'rss-3',
    name: 'Feline Medical Journal International',
    url: 'https://journals.sagepub.com/rss/jfm',
    category: 'health',
    active: true,
    lastFetchedAt: '2026-07-21T06:00:00Z',
    itemsCount: 210,
  },
];

export const RSS_IMPORTED: RssImportedArticle[] = [
  {
    id: 'rss-item-101',
    sourceName: '농림축산검역본부 동물보호관리',
    title: '올여름 유기묘 구조 보호 현황 및 혹서기 쉼터 가이드 발표',
    originalUrl: 'https://animal.go.kr/news/10892',
    snippet: '검역본부는 7월 폭염 대비 전국 시도 유기동물 보호소의 수의 인력 파견 및 온습도 자동 조절 시설 지원안을 구체화했습니다...',
    category: 'news',
    status: 'auto_summarized',
    fetchedAt: '2026-07-21T08:05:00Z',
  },
  {
    id: 'rss-item-102',
    sourceName: '한국고양이수의사회 (KSFM)',
    title: '노령묘 만성 췌장염(Pancreatitis) 식이요법 신규 트렌드 발표',
    originalUrl: 'https://ksfm.or.kr/news/2026-04',
    snippet: 'KSFM 학술대회 발표에 따르면 저지방 습식 캔과 파판(Papain) 소화효소 복합제 투여군에서 통증 반응 수치가 35% 감소했습니다...',
    category: 'veterinary',
    status: 'imported',
    fetchedAt: '2026-07-20T18:35:00Z',
  },
  {
    id: 'rss-item-103',
    sourceName: 'Feline Medical Journal International',
    title: 'Study on Feline Calicivirus Vaccine Strain Efficacy 2026',
    originalUrl: 'https://journals.sagepub.com/article/10112',
    snippet: 'New bivalent FCV recombinant strain demonstrates superior cross-neutralization antibodies in young shelter kittens...',
    category: 'health',
    status: 'draft',
    fetchedAt: '2026-07-21T06:10:00Z',
  },
];

export const TRENDING_KEYWORDS = [
  '특발성방광염',
  '음수량늘리기',
  '2026고양이등록제',
  '합사성공',
  '벤토나이트모래',
  '렉돌유전병',
  '습식캔비교',
  '길고양이TNR',
  '노묘치매',
  '캣타워추천',
];

export const BREAKING_NEWS = [
  '[리터페이퍼 이슈] 2026년 하반기 고양이 모묘등록제 시행 세부 지침 발표',
  '[수의학 저널] FIC 방광염 진단 3대 미세 신호 논문 검증 완료',
  '[단독 탐사] 벤토나이트 모래 10종 먼지 발생률 분광 분석 데이터 공개',
  '[동물복지] 전국 시도 유기묘 겨울철 쉼터 및 의료 지원 예산 통과',
];
