import { Article, Author, Category, Breed, RssSource, RssImportedArticle } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-food',
    name: '사료 & 습식캔',
    nameEn: 'Food & Wet Food',
    slug: 'nutrition',
    description: 'AAFCO 성분 분석, DM 단백질 비율 계산, 주식 캔 20종 기호성 및 영양 검증.',
    icon: 'Apple',
    count: 54,
    featured: true,
  },
  {
    id: 'cat-litter',
    name: '모래 & 배변용품',
    nameEn: 'Litter & Bathroom',
    slug: 'veterinary', // alias for main reviews
    description: '벤토나이트 10종 먼지 분광 테스트, 두부모래 응고력 및 탈취력 24시간 실측.',
    icon: 'Box',
    count: 48,
    featured: true,
  },
  {
    id: 'cat-furniture',
    name: '캣타워 & 가구',
    nameEn: 'Toys & Furniture',
    slug: 'behavior',
    description: '원목 캣폴 하중 실측, 숨기 공간 내구성 및 스크래쳐 원단 100% 내돈내산 리뷰.',
    icon: 'Home',
    count: 36,
    featured: true,
  },
  {
    id: 'cat-[#0064FF]',
    name: '스마트 가전',
    nameEn: 'Smart Tech & Gadgets',
    slug: 'travel',
    description: '자동급식기 잼 현상 물리 실험, 자동화장실 센서 안전 테스트 및 드라이룸 비교.',
    icon: 'Zap',
    count: 29,
    featured: true,
  },
  {
    id: 'cat-hygiene',
    name: '위생 & 케어용품',
    nameEn: 'Hygiene & Care',
    slug: 'health',
    description: '페로몬 디퓨저 효과 검증, 고양이 치약 5종 마모도 테스트, 귀 세정제 성분 분석.',
    icon: 'Sparkles',
    count: 31,
  },
  {
    id: 'cat-verified',
    name: '내돈내산 종합검증',
    nameEn: 'Verified Reviews',
    slug: 'rescue',
    description: '대가성 협찬 0%, 연구실 장비로 측정한 집사 전용 객관적 상품 블라인드 테스트.',
    icon: 'ShieldCheck',
    count: 62,
  },
];

export const AUTHORS: Author[] = [
  {
    id: 'author-1',
    name: '이수아 수석 리뷰어',
    role: 'LITTER PAPER 상품 검증팀 리드',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    bio: '집사 9년 차 라이터. 협찬 없는 100% 내돈내산 제품 검증과 성분 분광 분석 리포트를 발행합니다.',
    articlesCount: 68,
    followersCount: 18400,
    verified: true,
    socials: {
      instagram: 'https://instagram.com',
      website: 'https://litterpaper.kr/reviews',
    },
  },
  {
    id: 'author-2',
    name: '최민준 소재 연구원',
    role: '반려동물용품 라벨 분석가',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: '라벨 너머의 진짜 소재와 원료 비율을 분석합니다. 벤토나이트 입자 크기 및 습식 캔 조단백 DM 환산을 연구합니다.',
    articlesCount: 42,
    followersCount: 11200,
    verified: true,
  },
  {
    id: 'author-3',
    name: '박진우 테크 에디터',
    role: '스마트 가전 & 캣타워 하중 테스트 에디터',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    bio: '자동 화장실, 자동 급식기, 정수기 소음 및 물리 안전 센서를 정밀 기기로 측정하여 리뷰합니다.',
    articlesCount: 35,
    followersCount: 9400,
    verified: true,
  },
];

const now = new Date();
const fourHoursAgo = new Date(now.getTime() - 4 * 3600 * 1000).toISOString();
const twelveHoursAgo = new Date(now.getTime() - 12 * 3600 * 1000).toISOString();
const threeDaysAgo = new Date(now.getTime() - 72 * 3600 * 1000).toISOString();
const fiveDaysAgo = new Date(now.getTime() - 120 * 3600 * 1000).toISOString();
const eighteenHoursFromNow = new Date(now.getTime() + 18 * 3600 * 1000).toISOString();

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'bentonite-cat-litter-dust-test-2026',
    title: '벤토나이트 10종 먼지 분광 측정 & 30초 결분력 몰빵 실험',
    subtitle: '광고에 속지 마세요. 2m 낙하 기류 먼지 발생량(ppm) 및 소변 모래 뭉침 강도를 정밀 수치로 공개합니다.',
    summary: '시중 대표 벤토나이트 고양이 모래 10종을 무작위 구매하여 2m 낙하 분광 먼지 측정기 수치와 30초 굳기 결분력을 내돈내산으로 비교 검증한 리포트입니다.',
    category: 'veterinary', // mapped to 모래 & 배변용품
    categoryName: '모래 & 배변용품',
    tags: ['벤토나이트', '모래테스트', '내돈내산', '결분력', '먼지 측정'],
    author: AUTHORS[1],
    coverImage: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=1200&auto=format&fit=crop&q=80',
    readingTime: 6,
    difficulty: '중급 (Medium)',
    publishedAt: fourHoursAgo, // Live 24h Free countdown active!
    updatedAt: fourHoursAgo,
    likes: 542,
    views: 8900,
    commentsCount: 48,
    isHero: true,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    status: 'published',
    freeAccessDurationHours: 24,
    isPremium: false,
    isPremiumOnly: false,
    seoTitle: '고양이 벤토나이트 모래 10종 먼지 및 결분력 테스트 - LITTER PAPER',
    seoDescription: '2m 낙하 먼지 측정 수치와 뭉침 강도 실측 데이터를 확인하세요.',
    faq: [
      {
        question: '모래 먼지가 고양이 기관지에 미치는 구체적 위험은?',
        answer: '석영 미세먼지(PM2.5) 입자는 재채기와 눈물 유발을 넘어 재발성 기침 및 만성 상기도 자극을 유발할 수 있어 먼지 수치 5ppm 이하 제품을 권장합니다.',
      },
    ],
    tableOfContents: [
      { id: 'sec-1', title: '1. 실험 방식: 2m 낙하 분광 먼지 측정기 세팅', level: 2 },
      { id: 'sec-2', title: '2. 모래 10종 먼지 수치(ppm) 비교 결과', level: 2 },
      { id: 'sec-3', title: '3. 미온수 50ml 투여 30초 결분력 붕괴 실험', level: 2 },
      { id: 'sec-4', title: '4. 가성비 vs 품질 최종 추천 3종', level: 2 },
    ],
    content: `
<h2>1. 실험 방식: 2m 낙하 분광 먼지 측정기 세팅</h2>
<p>모래를 화장실에 부을 때 집사의 안구와 고양이 코로 직행하는 미세먼지를 측정하기 위해 밀폐 아크릴 챔버 내부 2m 높이에서 각 브랜드 1kg을 낙하 수치화했습니다.</p>
<p>측정 장비: 분광 입자 카운터 (Optical Particle Counter) - 0.3㎛ ~ 10㎛ 입자 세분화 기록.</p>

<blockquote>"광고문구의 '먼지 0%'는 불가능합니다. 천연 벤토나이트 공정에서 분진을 99% 털어낸 브랜드들의 실측 수치는 다음과 같았습니다." - 최민준 연구원</blockquote>

<h2>2. 모래 10종 먼지 수치(ppm) 비교 결과</h2>
<p>A 브랜드는 초기 먼지가 매우 적었으나 사용 3일 후 입자가 깨지면서 먼지량이 4배 증가했습니다. 반면, 공정 가공 처리가 잘 된 B 브랜드는 지속적인 3ppm 이하를 유지했습니다.</p>

<h2>3. 미온수 50ml 투여 30초 결분력 붕괴 실험</h2>
<p>소변이 닿은 뒤 바닥에 들러붙지 않고단단하게 굳어지는지 낙하 테스트(1m 높이에서 뭉친 감자 떨어뜨리기)를 실시했습니다.</p>
    `,
  },
  {
    id: 'art-2',
    slug: 'cat-wet-food-label-decoding-2026',
    title: '주식 캔 20종 성분 라벨 완벽 해독: DM 단백질 수치와 기호성 테스트',
    subtitle: '수분 80%에 속지 마세요! 진짜 영양 성분 DM(Dry Matter) 변환 공식과 20종 기호성 검증 데이터',
    summary: '단백질 표기량이 10%라고 써 있어도 습식 캔의 진짜 건조 단백질 함량(DM)은 50%가 넘을 수 있습니다. AAFCO 기준 통과 여부와 곡물 부산물 유무를 분석했습니다.',
    category: 'nutrition',
    categoryName: '사료 & 습식캔',
    tags: ['습식캔', 'AAFCO', '사료성분', 'DM환산', '기호성'],
    author: AUTHORS[0],
    coverImage: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=1200&auto=format&fit=crop&q=80',
    readingTime: 7,
    difficulty: '중급 (Medium)',
    publishedAt: threeDaysAgo, // Free time expired -> Premium Archive!
    updatedAt: threeDaysAgo,
    likes: 412,
    views: 6200,
    commentsCount: 31,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    status: 'archived',
    freeAccessDurationHours: 24,
    isPremium: true,
    isPremiumOnly: false,
    content: `
<h2>1. 습식 캔 라벨의 착시 현상: DM 환산법</h2>
<p>습식 캔 라벨에 적힌 조단백 10%는 수분이 포함된 상태입니다. 수분을 제외한 실제 건조 상태 단백질 함량(DM)을 구하는 공식: <code>(조단백질 % ÷ (100 - 수분 %)) × 100</code></p>
    `,
  },
  {
    id: 'art-3',
    slug: 'automatic-litter-box-safety-sensor-test',
    title: '자동화장실 5종 협착 안전 센서 반응 속도 & 악취 차단 100% 테스트',
    subtitle: '아이가 들어갔을 때 모터가 멈추는 데 걸리는 시간(ms)과 배변통 악취 밀폐력 물리 실험',
    summary: '고양이 자동 화장실의 가장 중요한 요소는 안전입니다. 샌드위치 무게 센서 및 적외선 센서의 오작동율을 시뮬레이션 인형으로 테스트했습니다.',
    category: 'travel', // mapped to 스마트 가전
    categoryName: '스마트 가전',
    tags: ['자동화장실', '안전센서', '스마트가전', '소음측정', '내돈내산'],
    author: AUTHORS[2],
    coverImage: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=1200&auto=format&fit=crop&q=80',
    readingTime: 8,
    difficulty: '전문가 (Expert)',
    publishedAt: fiveDaysAgo,
    updatedAt: fiveDaysAgo,
    likes: 389,
    views: 5400,
    commentsCount: 29,
    isFeatured: true,
    isTrending: false,
    isEditorsPick: false,
    aiGenerated: false,
    status: 'archived',
    freeAccessDurationHours: 24,
    isPremium: true,
    isPremiumOnly: false,
    content: `
<h2>1. 오작동 협착 방지 센서 테스트</h2>
<p>회전 돔 내부 300g 가벼운 아기 고양이 무게 감지 센서 반응 여부를 50회 연속 실험했습니다.</p>
    `,
  },
  {
    id: 'art-4',
    slug: 'cat-tree-wooden-pole-[#0064FF]-test-2026',
    title: '원목 캣폴 7종 하중 수직 흔들림 & 스크래쳐 카페트 내구성 검증',
    subtitle: '7kg 거대묘 2마리가 동시 점프할 때의 천장 고정력과 마모율 분석',
    summary: '캣폴 천장 고정 장치의 나사 풀림 현상과 수직 하중 50kg 인장 테스트 결과를 공개합니다.',
    category: 'behavior', // mapped to 캣타워 & 가구
    categoryName: '캣타워 & 가구',
    tags: ['캣폴', '원목캣타워', '스크래쳐', '하중실험', '가구리뷰'],
    author: AUTHORS[2],
    coverImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&auto=format&fit=crop&q=80',
    readingTime: 5,
    difficulty: '입문 (Easy)',
    publishedAt: twelveHoursAgo, // Live 24h Free active!
    updatedAt: twelveHoursAgo,
    likes: 290,
    views: 4100,
    commentsCount: 19,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: false,
    aiGenerated: false,
    status: 'published',
    freeAccessDurationHours: 24,
    isPremium: false,
    isPremiumOnly: false,
    content: `
<h2>1. 천장 고정 장치 인장 강도 테스트</h2>
<p>천장 석고보드 무너짐 없이 50kg 수직 하중을 버티는 원목 캣폴 3종을 선정했습니다.</p>
    `,
  },
  {
    id: 'art-5',
    slug: 'exclusive-feliway-pheromone-lab-test-2026',
    title: '[프리미엄 독점] 페로몬 디퓨저 3종 스트레스 호르몬(코르티솔) 분광 감소율 검증',
    subtitle: '펠리웨이 vs 국내산 페로몬 디퓨저의 다묘가정 혈액 코르티솔 수치 변화 실험 리포트',
    summary: '프리미엄 구독자 전용 단독 실험 리포트. 페로몬 디퓨저 설치 전후 다묘가정 고양이의 대변 내 코르티솔 호르몬 농도 변화를 질량분석기로 정밀 측정한 데이터를 독점 공개합니다.',
    category: 'health', // mapped to 위생 & 케어
    categoryName: '위생 & 케어용품',
    tags: ['프리미엄독점', '페로몬디퓨저', '펠리웨이', '스트레스호르몬', '실험리포트'],
    author: AUTHORS[0],
    coverImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1200&auto=format&fit=crop&q=80',
    readingTime: 9,
    difficulty: '전문가 (Expert)',
    publishedAt: fourHoursAgo,
    updatedAt: fourHoursAgo,
    likes: 620,
    views: 9500,
    commentsCount: 54,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    status: 'premium_only',
    freeAccessDurationHours: 0,
    isPremium: true,
    isPremiumOnly: true,
    content: `
<h2>1. 대변 내 코르티솔(Cortisol) 호르몬 분석</h2>
<p>본 리포트는 프리미엄 멤버 전용 독점 연구 보고서입니다. 페로몬 농도 분사 2주 후 스트레스 지수가 42% 감소한 실험군 데이터 분석을 다룹니다.</p>
    `,
  },
  {
    id: 'art-6',
    slug: 'scheduled-automatic-water-fountain-test-2026',
    title: '[예정 리뷰] 고양이 정수기 8종 세균 번식 속도 & 모터 무소음(dB) 실측',
    subtitle: '내일 아침 08:00 정식 공개! UV 살균등 효과와 3일 세균 배양 실험 결과',
    summary: '고양이 정수기 물때 발생과 모터 소음(dB)을 72시간 배양 검사로 비교한 리뷰가 내일 오전 8시 정식 공개됩니다.',
    category: 'travel',
    categoryName: '스마트 가전',
    tags: ['정수기리뷰', '무소음모터', 'UV살균', '음수량', '내일공개'],
    author: AUTHORS[2],
    coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&auto=format&fit=crop&q=80',
    readingTime: 6,
    difficulty: '중급 (Medium)',
    publishedAt: eighteenHoursFromNow,
    scheduledAt: eighteenHoursFromNow,
    updatedAt: eighteenHoursFromNow,
    likes: 150,
    views: 110,
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
<h2>1. 고양이 정수기 세균 배양 실험 프리뷰</h2>
<p>내일 아침 8시, 72시간 미청소 시 정수기 필터 세균 수(CFU) 및 데시벨(dB) 측정 결과가 정식 공개됩니다.</p>
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
    name: '한국소비자원 반려동물용품 안전실태',
    url: 'https://www.kca.go.kr/rss/news.xml',
    category: 'news',
    active: true,
    lastFetchedAt: '2026-07-21T08:00:00Z',
    itemsCount: 142,
  },
  {
    id: 'rss-2',
    name: 'PET Food Institute & Lab',
    url: 'https://petfoodinstitute.org/feed/reviews',
    category: 'nutrition',
    active: true,
    lastFetchedAt: '2026-07-20T18:30:00Z',
    itemsCount: 89,
  },
];

export const RSS_IMPORTED: RssImportedArticle[] = [
  {
    id: 'rss-item-101',
    sourceName: '한국소비자원 반려동물용품 안전실태',
    title: '시중 고양이 장난감 15종 미량 유해물질 불검출 안정성 결과 발표',
    originalUrl: 'https://kca.go.kr/news/10892',
    snippet: '소비자원은 고양이 플라스틱 장난감 및 깃털 스틱의 환경호르몬 안전 점검 결과 15종 모두 기준치 이하로 안전하다 발표...',
    category: 'news',
    status: 'auto_summarized',
    fetchedAt: '2026-07-21T08:05:00Z',
  },
];

export const TRENDING_KEYWORDS = [
  '벤토나이트모래',
  '습식캔비교',
  '자동화장실안전',
  '원목캣폴',
  '내돈내산리뷰',
  '페로몬디퓨저',
  'AAFCO성분',
  '고양이정수기',
  '스크래쳐추천',
  '자동급식기',
];

export const BREAKING_NEWS = [
  '[리터페이퍼 검증] 벤토나이트 모래 10종 먼지 분광 측정 수치 공개',
  '[단독 분석] 주식 캔 20종 DM 건조 단백질 환산 수치 비교 리포트',
  '[실험] 고양이 자동화장실 5종 안전 센서 오작동 정밀 테스트',
  '[공지] 100% 내돈내산 대가성 협찬 배제 검증 원칙 선언',
];
