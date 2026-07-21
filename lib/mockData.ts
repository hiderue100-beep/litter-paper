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

export const TRENDING_KEYWORDS = [
  '벤토나이트 먼지',
  'AAFCO 습식캔',
  '자동화장실 300g 센서',
  '원목 캣폴 100kg',
  'DM 단백질 환산',
  '내돈내산 리뷰',
];

const now = new Date();
const seventeenHoursAgo = new Date(now.getTime() - 17.42 * 3600 * 1000).toISOString(); // ~06:34:51 remaining live
const twelveHoursAgo = new Date(now.getTime() - 12 * 3600 * 1000).toISOString();
const threeDaysAgo = new Date(now.getTime() - 72 * 3600 * 1000).toISOString();
const fiveDaysAgo = new Date(now.getTime() - 120 * 3600 * 1000).toISOString();
const eighteenHoursFromNow = new Date(now.getTime() + 18 * 3600 * 1000).toISOString();

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'cat-bentonite-litter-dust-test-2026',
    title: '고양이 벤토나이트 모래 10종 먼지 및 30초 결분력 실측 비교',
    subtitle: '2m 낙하 분광 먼지 측정기와 50ml 응집력 테스트로 검증한 100% 내돈내산 리포트',
    summary: '인기 벤토나이트 모래 10종을 직접 무작위 구매하여 2m 높이 낙하 시 미세먼지 수치(ppm) 및 소변 반응 응집력을 30초 간격으로 정밀 측정했습니다.',
    category: 'veterinary',
    categoryName: '모래 & 배변용품',
    tags: ['벤토나이트', '모래먼지', '결분력', '사막화', '내돈내산'],
    author: AUTHORS[1],
    coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&auto=format&fit=crop&q=80',
    readingTime: 6,
    difficulty: '중급 (Medium)',
    publishedAt: seventeenHoursAgo, // Live 24h Free countdown active!
    updatedAt: seventeenHoursAgo,
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
    commentsCount: 32,
    isHero: false,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    status: 'published',
    freeAccessDurationHours: 24,
    isPremium: true,
    isPremiumOnly: false,
    seoTitle: '주식 캔 20종 DM 성분 분석 - LITTER PAPER',
    seoDescription: '건조 중량 기준 영양 성분 분석 결과.',
    content: `
<h2>1. 습식 캔 조단백 수치의 함정</h2>
<p>습식 캔 라벨에 적힌 '조단백 10%'는 수분 80%가 포함된 수치입니다. 수분을 제외한 Dry Matter(건물 기준)로 환산하면 (10 / 20) * 100 = 50%로 고단백 식품이 됩니다.</p>

<h2>2. 20종 캔 영양 성분표 전수 조사 결과</h2>
<p>AAFCO 가이드라인 단백질 26% 최소 기준을 상회하는 15종 및 칼슘:인 비율 1.2:1 황금 비율 제품 목록을 공개합니다.</p>
    `,
  },
  {
    id: 'art-3',
    slug: 'cat-litter-box-weight-sensor-safety-test',
    title: '자동 화장실 300g 무게 센서 정밀 감지 실험: 끼임 사고 방지 안전 장치',
    subtitle: '아기 고양이 안전과 모터 끼임 방지 레이저 센서 5종 가전 장비 오작동 테스트',
    summary: '자동 화장실 끼임 안전사고 방지를 위해 300g 인형 및 레이저 차단 테스트를 진행했습니다. 안전 센서 반응 속도를 밀리초 단위로 기록했습니다.',
    category: 'travel',
    categoryName: '스마트 가전',
    tags: ['자동화장실', '안전센서', '스마트가전', '물리실험', '끼임방지'],
    author: AUTHORS[2],
    coverImage: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=1200&auto=format&fit=crop&q=80',
    readingTime: 5,
    difficulty: '입문 (Easy)',
    publishedAt: twelveHoursAgo,
    updatedAt: twelveHoursAgo,
    likes: 289,
    views: 4100,
    commentsCount: 19,
    isHero: false,
    isFeatured: true,
    isTrending: false,
    isEditorsPick: false,
    aiGenerated: false,
    status: 'published',
    freeAccessDurationHours: 24,
    isPremium: false,
    isPremiumOnly: false,
    seoTitle: '자동 화장실 300g 무게 센서 안전 실험 - LITTER PAPER',
    seoDescription: '자동 화장실 끼임 사고 방지 센서 실측 데이터.',
    content: `
<h2>1. 자동 화장실 300g 감지 센서의 중요성</h2>
<p>아기 고양이가 작동 중인 화장실 통에 들어갔을 때 모터가 즉시 멈춰야 안전사고를 막을 수 있습니다.</p>

<h2>2. 5종 브랜드 멈춤 반응속도 실측</h2>
<p>300g 가중치 개입 시 0.2초 만에 역회전 멈춤이 작동한 A 제품과 반응 시간이 1.5초 이상 지연된 B 제품을 비교했습니다.</p>
    `,
  },
  {
    id: 'art-4',
    slug: 'cat-scratching-post-wood-durability',
    title: '원목 캣폴 100kg 하중 인장 테스트 및 삼줄 vs 삼아마 원단 6개월 비교',
    subtitle: '흔들림 없는 구조 설계를 위한 원목 천장 마감 고정 장치와 스크래처 내구성 실험',
    summary: '다묘 가정 필수 가구 캣폴의 원목 변형 여부와 100kg 가중 피크 하중 내구성을 기계 장비로 내돈내산 테스트했습니다.',
    category: 'behavior',
    categoryName: '캣타워 & 가구',
    tags: ['캣폴', '원목캣타워', '하중테스트', '스크래쳐', '내구성'],
    author: AUTHORS[2],
    coverImage: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=1200&auto=format&fit=crop&q=80',
    readingTime: 8,
    difficulty: '전문가 (Expert)',
    publishedAt: fiveDaysAgo, // Expired -> Premium Archive!
    updatedAt: fiveDaysAgo,
    likes: 620,
    views: 11200,
    commentsCount: 54,
    isHero: false,
    isFeatured: false,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    status: 'published',
    freeAccessDurationHours: 24,
    isPremium: true,
    isPremiumOnly: false,
    seoTitle: '원목 캣폴 하중 인장 테스트 - LITTER PAPER',
    seoDescription: '100kg 하중 내구성 실측 리포트.',
    content: `
<h2>1. 캣폴 흔들림과 천장 고정 장치 구조</h2>
<p>스프링 방식 압착 원목 캣폴은 6개월 사용 후 나사 풀림으로 기울어짐이 발생할 수 있습니다.</p>
    `,
  },
  {
    id: 'art-5',
    slug: 'cat-feline-idiopathic-cystitis-fic-guide-2026',
    title: '원인 불명의 방광염 FIC, 집사가 반드시 알아야 할 5가지 행동적 신호',
    subtitle: '음수량 부족만이 원인이 아니다? 고양이 스트레스가 방광에 미치는 놀라운 영향을 수의학 논문 기반으로 분석합니다.',
    summary: '특발성 방광염(FIC)은 소변 검사에서 세균이 나오지 않는 경우가 90% 이상입니다. 수의학 전문 논문 15편을 분석하여 가정에서 실천 가능한 행동 환경 조성 가이드를 정립했습니다.',
    category: 'veterinary',
    categoryName: '수의학 지식',
    tags: ['수의학', '방광염', 'FIC', '음수량', '고양이건강'],
    author: {
      id: 'author-vet-1',
      name: '김서연 수의사',
      role: '수의학 임상 에디터',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
      bio: '서울대 수의대 졸업, 임상 10년 차 수의사. 고양이 하부유로질환(FLUTD) 전문 칼럼을 연재합니다.',
      articlesCount: 52,
      followersCount: 21000,
      verified: true,
    },
    coverImage: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1200&auto=format&fit=crop&q=80',
    readingTime: 6,
    difficulty: '중급 (Medium)',
    publishedAt: eighteenHoursFromNow, // Scheduled release
    updatedAt: eighteenHoursFromNow,
    likes: 342,
    views: 4890,
    commentsCount: 27,
    isHero: false,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    status: 'scheduled',
    freeAccessDurationHours: 24,
    isPremium: false,
    isPremiumOnly: false,
    seoTitle: '고양이 특발성 방광염 FIC 치료 가이드 - LITTER PAPER',
    seoDescription: '수의학 논문 기반 방광염 5가지 관리 수칙.',
    content: `
<h2>1. 특발성 방광염(FIC)이란 무엇인가?</h2>
<p>방광염 증상으로 병원을 찾는 고양이의 60~70%는 결석이나 세균 감염이 아닌 '원인 불명(FIC)' 진단을 받습니다. 이는 뇌와 방광 축(Brain-Bladder Axis) 사이의 스트레스 호르몬 과다 분비가 주원인입니다.</p>

<h2>2. 집사가 체크해야 할 5가지 이상 행동 신호</h2>
<ul>
  <li>화장실에 들어가서 오랫동안 울거나 주저앉음</li>
  <li>소변 뭉치가 5백원 동전 크기로 작아짐</li>
  <li>이불이나 옷가지 등 화장실 이외의 장소에 배뇨 시도</li>
  <li>하복부 부위를 과도하게 그루밍하여 털이 빠짐</li>
  <li>혈뇨 또는 붉은 빛을 띠는 배뇨</li>
</ul>
    `,
  },
];

export const BREEDS: Breed[] = [
  {
    id: 'br-1',
    name: '코리안 숏헤어 (Korean Shorthair)',
    nameEn: 'Korean Shorthair',
    origin: '대한민국',
    description: '자연발생종으로 면역력이 강하며 치즈, 삼색, 턱시도, 고등어 등 다양한 모색 보유.',
    temperament: ['영리함', '강인한 생명력', '친근함', '뛰어난 호기심'],
    weight: '3.5 - 6.0 kg',
    activityLevel: '높음',
    groomingNeed: '쉬움',
    lifespan: '15 - 20 년',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
    healthCareTips: ['정기 예방접종', '음수량 확보'],
  },
  {
    id: 'br-2',
    name: '페르시안 (Persian)',
    nameEn: 'Persian Cat',
    origin: '이그제틱/이란',
    description: '풍성한 장모와 납작한 얼굴이 특징. 매일 빗질이 필요하며 얌전한 성격.',
    temperament: ['조용함', '온순함', '느긋함', '개냥이성향'],
    weight: '3.0 - 5.5 kg',
    activityLevel: '낮음',
    groomingNeed: '자주',
    lifespan: '12 - 17 년',
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=600&auto=format&fit=crop&q=80',
    healthCareTips: ['매일 모질 빗질', '안구 세정'],
  },
];

export const RSS_SOURCES: RssSource[] = [
  {
    id: 'rss-1',
    name: '수의학 신문 (Daily Vet)',
    url: 'https://www.dailyvet.co.kr/feed',
    category: 'veterinary',
    active: true,
    lastFetchedAt: '2026-07-21T01:00:00Z',
    itemsCount: 142,
  },
  {
    id: 'rss-2',
    name: 'AAFCO 반려동물 영양 표준 학회 뉴스',
    url: 'https://www.aafco.org/news/rss',
    category: 'nutrition',
    active: true,
    lastFetchedAt: '2026-07-20T18:00:00Z',
    itemsCount: 89,
  },
];

export const RSS_IMPORTED: RssImportedArticle[] = [
  {
    id: 'rss-item-1',
    sourceName: '수의학 신문 (Daily Vet)',
    title: '고양이 하부유로질환(FLUTD) 처방식 사료의 적정 투여 기간에 대한 연구',
    originalUrl: 'https://www.dailyvet.co.kr/news/12345',
    snippet: '스트루바이트 결석 용해용 처방식 사료의 장기 투여 시 칼슘 결석 위험성 경고...',
    category: 'veterinary',
    status: 'imported',
    fetchedAt: '2026-07-21T00:30:00Z',
  },
];

export const BREAKING_NEWS = [
  '벤토나이트 모래 10종 2m 낙하 분광 먼지 측정 수치 결과 전격 공개',
  '주식 캔 20종 AAFCO 단백질 DM 환산 수치표 단독 업데이트',
  '자동 화장실 300g 무게 센서 끼임 사고 방지 멈춤 시간 밀리초 실측',
  '페로몬 디퓨저 스트레스 진정 효과 100% 내돈내산 실험결과 수유',
];
