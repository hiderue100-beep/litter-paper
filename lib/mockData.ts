import { Article, Author, Breed, Category, RssImportedArticle, RssSource } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-news',
    name: '뉴스',
    nameEn: 'News',
    slug: 'news',
    description: '국내외 최신 고양이 관련 정책, 이슈, 복지 소식을 신속하고 정확하게 전합니다.',
    icon: 'Newspaper',
    count: 42,
    featured: true,
  },
  {
    id: 'cat-vet',
    name: '수의학 지식',
    nameEn: 'Veterinary',
    slug: 'veterinary',
    description: '검증된 수의학 논문과 전문 수의사의 자문을 거친 정교한 질환 및 의료 가이드입니다.',
    icon: 'Stethoscope',
    count: 38,
    featured: true,
  },
  {
    id: 'cat-health',
    name: '건강 관리',
    nameEn: 'Health',
    slug: 'health',
    description: '연령별 검진, 음수량, 유산균, 영양제 및 질병 예방을 위한 실전 일상 케어 방법.',
    icon: 'HeartPulse',
    count: 56,
    featured: true,
  },
  {
    id: 'cat-nutrition',
    name: '식의학 & 영양',
    nameEn: 'Nutrition',
    slug: 'nutrition',
    description: '사료 성분 분석, 습식 캔 비교, 수분 섭취 계산기 및 수제 간식 레시피.',
    icon: 'Utensils',
    count: 29,
    featured: true,
  },
  {
    id: 'cat-behavior',
    name: '행동 심리학',
    nameEn: 'Behavior',
    slug: 'behavior',
    description: '골골송의 비밀부터 오버그루밍, 수직공간 활용, 합사(Multicat) 성공 기술까지.',
    icon: 'Brain',
    count: 47,
    featured: true,
  },
  {
    id: 'cat-breeds',
    name: '품종 도감',
    nameEn: 'Breeds',
    slug: 'breeds',
    description: '묘종별 유전적 특성, 성격, 케어 난이도 및 털 관리 노하우 가이드.',
    icon: 'BookOpen',
    count: 31,
    featured: true,
  },
  {
    id: 'cat-products',
    name: '제품 리뷰',
    nameEn: 'Product Reviews',
    slug: 'product-reviews',
    description: '캣타워, 벤토나이트 모래, 자동급식기, 정수기 직접 검증한 깐깐한 분석.',
    icon: 'Sparkles',
    count: 24,
  },
  {
    id: 'cat-lifestyle',
    name: '라이프스타일',
    nameEn: 'Lifestyle',
    slug: 'lifestyle',
    description: '반려묘와 함께하는 감성 인테리어, 집사의 하루, 홈카페와 힐링 굿즈.',
    icon: 'Coffee',
    count: 19,
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
      website: 'https://catnote.kr/vet-kim',
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
    role: 'CAT NOTE 수석 수석에디터',
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
    publishedAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-21T08:30:00Z',
    likes: 342,
    views: 4890,
    commentsCount: 28,
    isHero: true,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    seoTitle: '고양이 특발성 방광염(FIC) 원인과 해결법 - CAT NOTE 전문 가이드',
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
    publishedAt: '2026-07-19T14:20:00Z',
    updatedAt: '2026-07-19T14:20:00Z',
    likes: 215,
    views: 3210,
    commentsCount: 16,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
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
    subtitle: '조단백, 조지방, 수분 수치부터 AAFFO 기준 검증까지! 집사가 꼭 숙지해야 할 사료 라벨 읽기',
    summary: '단일 브랜드 사료만 지속 수유 시 발생할 수 있는 영양 불균형을 막고, 성견 및 성묘로 넘어가는 시기에 맞는 단백질 섭취량을 계산하는 영양 가이드입니다.',
    category: 'nutrition',
    categoryName: '식의학 & 영양',
    tags: ['습식캔', '사료성분', 'AAFCO', '단백질비율', '음수량'],
    author: AUTHORS[3],
    coverImage: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=1200&auto=format&fit=crop&q=80',
    readingTime: 7,
    difficulty: '중급 (Medium)',
    publishedAt: '2026-07-18T09:15:00Z',
    updatedAt: '2026-07-18T09:15:00Z',
    likes: 189,
    views: 2940,
    commentsCount: 12,
    isFeatured: true,
    isTrending: false,
    isEditorsPick: false,
    aiGenerated: false,
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
    title: '2026년부터 변경되는 길고양이 TNR 전국 표준 지침과 보호자 등록제 확정',
    subtitle: '농림축산식품부 발표: 길고양이 중성화 후 재방사 기온 기준 단축 및 동물등록제 고양이 전국 확대',
    summary: '올해 8월부터 시행되는 전국 고양이 등록제 의무화 지침 및 둔부 이식 마이크로칩 지원 정책, 길고양이 겨울철 TNR 안전 수칙 개정안을 정리했습니다.',
    category: 'news',
    categoryName: '뉴스',
    tags: ['TNR', '고양이등록제', '동물복지', '농림부정책', '마이크로칩'],
    author: AUTHORS[2],
    coverImage: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1200&auto=format&fit=crop&q=80',
    readingTime: 4,
    difficulty: '입문 (Easy)',
    publishedAt: '2026-07-21T07:00:00Z',
    updatedAt: '2026-07-21T07:00:00Z',
    likes: 412,
    views: 6540,
    commentsCount: 45,
    isHero: false,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    content: `
<h2>1. 고양이 내장형 마이크로칩 등록 전국 확대</h2>
<p>지자체별 시범 사업으로 진행되던 고양이 동물등록제가 전국으로 전면 확대 적용됩니다. 반려묘의 분실 및 유기를 방지하기 위해 2개월령 이상의 모든 반려묘가 대상입니다.</p>

<h2>2. TNR 길고양이 겨울철 포획 금지 기간 법제화</h2>
<p>영하 5도 이하의 혹한기 동안 길고양이 중성화 수술 후 체온 조절 실패로 인한 사고를 막기 위해 일시 중지 기간이 표준화됩니다.</p>
    `,
  },
  {
    id: 'art-5',
    slug: 'ragdoll-cat-breed-comprehensive-guide',
    title: '봉제인형 같은 안아주기의 대명사, 렉돌(Ragdoll) 완전 정복',
    subtitle: '대형묘 렉돌의 성장 기간, 털 빠짐 관리, HCM 심장병 유전자 검사의 중요성',
    summary: '사람 품에 안기면 힘을 풀고 늘어지는 렉돌 특유의 매력과, 성묘까지 3~4년이 걸리는 거대묘 품종 케어 노하우를 소개합니다.',
    category: 'breeds',
    categoryName: '품종 도감',
    tags: ['렉돌', '대형묘', 'HCM유전자', '고양이털관리', '품종특성'],
    author: AUTHORS[0],
    coverImage: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=1200&auto=format&fit=crop&q=80',
    readingTime: 5,
    difficulty: '입문 (Easy)',
    publishedAt: '2026-07-16T11:00:00Z',
    updatedAt: '2026-07-16T11:00:00Z',
    likes: 298,
    views: 4100,
    commentsCount: 19,
    isFeatured: true,
    isTrending: false,
    isEditorsPick: false,
    aiGenerated: false,
    content: `
<h2>1. 렉돌의 성격과 외형적 특징</h2>
<p>렉돌은 파란 눈과 럭셔리한 컬러포인트 코트를 가진 매력적인 중대형 묘종입니다. 성격이 온순하고 공격성이 거의 없어 초보 집사에게도 사랑받는 품종입니다.</p>

<h2>2. 렉돌 보호자가 주의해야 할 HCM(비대성 심근증)</h2>
<p>렉돌 유전자 데이터베이스 중 MYBPC3 변이는 심장 벽이 두꺼워지는 HCM 발병률을 높입니다. 분양 및 입양 전 키트 검사 여부를 확인하는 것이 권장됩니다.</p>
    `,
  },
  {
    id: 'art-6',
    slug: 'bentonite-cat-litter-dust-test-review-2026',
    title: '2026 벤토나이트 모래 먼지 zero 검증실험: Top 5 프리미엄 모래 비교',
    subtitle: '응집력, 탈취력, 결막염 예방 먼지 날림 테스트로 본 집사들의 최애 모래',
    summary: '고양이 호흡기 질환과 결막염의 원인이 되는 모래 먼지. 미세먼지 측정 장비로 직접 측정한 5가지 브랜드 벤토나이트의 객관적 실험 결과를 공개합니다.',
    category: 'product-reviews',
    categoryName: '제품 리뷰',
    tags: ['벤토나이트', '모래테스트', '호흡기케어', '집사꿀팁', '내돈내산'],
    author: AUTHORS[2],
    coverImage: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=1200&auto=format&fit=crop&q=80',
    readingTime: 6,
    difficulty: '입문 (Easy)',
    publishedAt: '2026-07-15T16:30:00Z',
    updatedAt: '2026-07-15T16:30:00Z',
    likes: 310,
    views: 5120,
    commentsCount: 33,
    isFeatured: false,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    content: `
<h2>1. 먼지가 고양이 눈과 기관지에 미치는 영향</h2>
<p>모래를 덮을 때 발생하는 석영 미세먼지는 안구 결막을 자극하고 재채기와 재발성 재채기 증상을 유발합니다.</p>
    `,
  },
  {
    id: 'art-7',
    slug: 'shelter-cat-adoption-first-week-checklist',
    title: '유기묘 임시보호에서 정식 입양까지: 첫 일주일 적응 방 체크리스트',
    subtitle: "숨어있는 고양이 억지로 꺼내지 않기! 불안감을 낮추는 '숨기 장소'와 은신처 배치의 기술",
    summary: '보호소에서 새로 집으로 온 아이가 침대 밑이나 장롱 뒤에서 나오지 않을 때 집사가 지켜야 할 기다림의 철학과 안전 수칙입니다.',
    category: 'rescue',
    categoryName: '입양 & 구조',
    tags: ['유기묘입양', '보호소', '임시보호', '적응방', '사지말고입양하세요'],
    author: AUTHORS[2],
    coverImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1200&auto=format&fit=crop&q=80',
    readingTime: 5,
    difficulty: '입문 (Easy)',
    publishedAt: '2026-07-14T13:00:00Z',
    updatedAt: '2026-07-14T13:00:00Z',
    likes: 480,
    views: 7200,
    commentsCount: 52,
    isFeatured: true,
    isTrending: true,
    isEditorsPick: true,
    aiGenerated: false,
    content: `
<h2>1. 적응방(Safe Room) 세팅하기</h2>
<p>새로운 환경에 노출된 고양이는 넓은 거실보다 작고 조용한 방 하나에서 시작할 때 안정감을 훨씬 빨리 느낍니다.</p>
    `,
  },
  {
    id: 'art-8',
    slug: 'senior-cat-dementia-cognitive-care',
    title: '노묘(12세 이상) 인지기능장애 증후군(CDS) 치매 초기 증상 파악하기',
    subtitle: '밤마다 크게 울고 벽을 보고 서 있는 아이, 나이 탓이 아닌 치료가 필요한 질환입니다',
    summary: '노령묘에게 나타나는 치매(CDS) 신호와 항산화제 수유, 항불안 영양제, 야간 조명 설치 등 수의학적 인지 케어 솔루션을 안내합니다.',
    category: 'veterinary',
    categoryName: '수의학 지식',
    tags: ['노묘케어', '고양이치매', 'CDS증후군', '노령묘', '수의사칼럼'],
    author: AUTHORS[0],
    coverImage: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=1200&auto=format&fit=crop&q=80',
    readingTime: 6,
    difficulty: '전문가 (Expert)',
    publishedAt: '2026-07-12T10:00:00Z',
    updatedAt: '2026-07-12T10:00:00Z',
    likes: 520,
    views: 8900,
    commentsCount: 41,
    isFeatured: true,
    isTrending: false,
    isEditorsPick: true,
    aiGenerated: false,
    content: `
<h2>1. 고양이 치매 인지기능장애(CDS) 주요 증상</h2>
<p>방향 감각 상실(Disorientation), 수면 패턴 변화, 화장실 위치를 잊어버리는 등 다양한 행동 양상이 파악됩니다.</p>
    `,
  },
];

export const BREEDS: Breed[] = [
  {
    id: 'b-1',
    name: '렉돌',
    nameEn: 'Ragdoll',
    origin: '미국',
    temperament: ['온순함', '사람을 잘 따름', '느긋함', '조용함'],
    lifespan: '12 - 17년',
    weight: '4.5 - 9.0 kg',
    activityLevel: '보통',
    groomingNeed: '보통',
    description: '안으면 몸의 힘을 풀고 봉제인형처럼 늘어지는 다정한 대형묘입니다. 푸른 눈과 부드러운 중장모 코트가 대표적입니다.',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&auto=format&fit=crop&q=80',
    healthCareTips: [
      'HCM(비대성 심근증) 정기 초음파 검사 권장',
      '털 엉킴 방지를 위해 주 3회 빗질 필수',
      '과체중 예방을 위한 일일 칼로리 제한',
    ],
  },
  {
    id: 'b-2',
    name: '브리티시 숏헤어',
    nameEn: 'British Shorthair',
    origin: '영국',
    temperament: ['차분함', '독립적', '적응력 높음', '충직함'],
    lifespan: '12 - 20년',
    weight: '4.0 - 7.5 kg',
    activityLevel: '낮음',
    groomingNeed: '쉬움',
    description: '동그란 얼굴과 굵은 목, 체셔 고양이의 모델이 된 단단하고 귀여운 체형의 클래식 묘종입니다.',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&auto=format&fit=crop&q=80',
    healthCareTips: [
      '운동량이 적어 비만 관리가 필수적임',
      '치석 예방을 위한 일일 양치질 훈련',
    ],
  },
  {
    id: 'b-3',
    name: '노르웨이 숲',
    nameEn: 'Norwegian Forest Cat',
    origin: '노르웨이',
    temperament: ['호기심 많음', '지능 높음', '용감함', '자연 친화적'],
    lifespan: '14 - 16년',
    weight: '5.0 - 8.5 kg',
    activityLevel: '높음',
    groomingNeed: '자주 필요',
    description: '북유럽 혹한을 견뎌낸 방수 이중모와 삼각 얼굴 라인이 특징인 당당하고 아름다운 자연 발생 품종입니다.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
    healthCareTips: [
      '높은 수직 공간(캣타워, 캣폴) 설치 필수',
      '환절기 털 빠짐 기간 매일 슬리커 브러시질',
    ],
  },
  {
    id: 'b-4',
    name: '러시안 블루',
    nameEn: 'Russian Blue',
    origin: '러시아',
    temperament: ['조용함', '신중함', '애교 많음', '소심함'],
    lifespan: '15 - 20년',
    weight: '3.0 - 5.5 kg',
    activityLevel: '보통',
    groomingNeed: '쉬움',
    description: '에메랄드 빛 눈동자와 은빛 감도는 단모 피모를 지닌 귀족적이고 섬세한 분위기의 고양이입니다.',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&auto=format&fit=crop&q=80',
    healthCareTips: [
      '소음에 민감하므로 조용한 환경 제공',
      '규칙적인 식사 시간 준수로 스트레스 완화',
    ],
  },
  {
    id: 'b-5',
    name: '코리안 숏헤어 (코숏)',
    nameEn: 'Domestic Shorthair (KR)',
    origin: '한국',
    temperament: ['영리함', '환경 적응력 뛰어남', '개성 강함', '건강함'],
    lifespan: '15 - 22년',
    weight: '3.5 - 6.5 kg',
    activityLevel: '높음',
    groomingNeed: '쉬움',
    description: '치즈, 턱시도, 삼색이, 고등어태비 등 다채로운 패턴과 강인한 생명력을 지닌 친근한 한국의 자연 발생 묘종입니다.',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&auto=format&fit=crop&q=80',
    healthCareTips: [
      '유전병 발생 위험이 매우 낮으나 구강 건강 관리',
      '충분한 사냥 놀이를 통한 욕구 해소',
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

