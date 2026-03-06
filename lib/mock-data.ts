import type {
  Profile,
  SellerboostOutput,
  VirallabOutput,
} from "@/types";

// ─── Mock Profile ───
export const MOCK_PROFILE: Profile = {
  id: "mock-user-001",
  email: "demo@sellerboost.kr",
  full_name: "데모 사용자",
  plan: "free",
  credits_used: 2,
  credits_limit: 3,
  stripe_customer_id: null,
  created_at: new Date().toISOString(),
};

// ─── KPI ───
export const KPIS = [
  { label: "목표 수익", value: "MRR 1,000만+" },
  { label: "런칭 기간", value: "D + 14일" },
  { label: "Break-Even", value: "D + 60일" },
] as const;

// ─── Executive Summary ───
export const EXECUTIVE_SUMMARY = {
  description:
    "셀러부스트 AI + 바이럴랩 AI를 동시 개발·런칭하여 최단 기간 내 현금 흐름을 만들고 2억 원의 부채를 상환하기 위한 전략적 실행 계획서.",
  mission:
    "개발 방식: 바이브코딩 (Claude CLI) | 목표: 14일 런칭 → 6개월 MRR 1,000만원",
  strategies: [
    {
      label: "Product 1: 셀러부스트 AI",
      description: "스마트스토어 판매자를 위한 AI 통합 상품 최적화 플랫폼",
    },
    {
      label: "Product 2: 바이럴랩 AI",
      description: "유튜버/크리에이터를 위한 AI 바이럴 콘텐츠 엔진",
    },
    {
      label: "개발 방식",
      description: "바이브코딩 (Claude CLI + Next.js + Supabase + Vercel)",
    },
    {
      label: "수익 모델",
      description: "SaaS 월정액 구독 + 종량제 크레딧 혼합",
    },
    {
      label: "런칭 타겟",
      description: "14일 내 베타 런칭, 30일 내 유료 전환 100명 목표",
    },
  ],
};

// ─── Product Comparison (왜 이 두 제품인가?) ───
export const PRODUCT_COMPARISON = {
  sellerboost: {
    title: "셀러부스트 AI",
    icon: "📦",
    bullets: [
      "시장 규모: 스마트스토어 판매자 700만+",
      "월 신상품 등록 수: 수천만 건",
      "기존 솔루션: 없거나 UI가 구식",
      "단가: 건당 500~1000원, 체감 저렴",
      "재구매율: 매우 높음 (월정액 적합)",
      "바이럴 경로: 셀러 카페·블라인드",
    ],
  },
  virallab: {
    title: "바이럴랩 AI",
    icon: "🎬",
    bullets: [
      "시장 규모: 유튜버/크리에이터 200만+",
      "월 콘텐츠 필요량: 4~12개/인",
      "기존 솔루션: 영어 중심, 한국어 최적화 없음",
      "단가: 월 14,900원 (체감 ROI 매우 높음)",
      "재구매율: 매우 높음 (크리에이터 생존 도구)",
      "바이럴 경로: 유튜버 카페·디시·틱톡",
    ],
  },
};

// ─── 셀러부스트 AI ───

export const SELLERBOOST_HERO = {
  title: "스마트스토어 판매자 AI 통합 상품 최적화 플랫폼",
  subtitle:
    "단순한 '글쓰기 도구'가 아닌 — 경쟁 분석 + SEO 키워드 자동 삽입 + 전환율 예측까지 제공하는 판매자 성장 플랫폼",
};

export const SELLERBOOST_ADVANTAGES = [
  {
    number: "①",
    title: "경쟁상품 자동 분석 엔진",
    description: "URL 입력 → 경쟁사 상위 상품 키워드·구조 역분석",
  },
  {
    number: "②",
    title: "전환율 예측 스코어",
    description:
      "AI가 생성한 상세페이지에 '예상 전환율 85점' 같은 점수 부여",
  },
  {
    number: "③",
    title: "네이버 SEO 자동 삽입",
    description: "네이버 쇼핑 검색 알고리즘 맞춤 키워드 자동 배치",
  },
  {
    number: "④",
    title: "A/B 변형 3종 자동 생성",
    description: "하나 입력에 스타일이 다른 3개 버전 즉시 생성",
  },
  {
    number: "⑤",
    title: "상품 카테고리별 최적화 템플릿",
    description: "의류/식품/전자기기 등 카테고리별 맞춤 구조",
  },
  {
    number: "⑥",
    title: "이미지 분석 → 텍스트 연동",
    description: "상품 이미지 업로드 시 이미지 분석 후 설명 자동 생성",
  },
];

export const SELLERBOOST_CORE_FEATURES = [
  {
    title: "원클릭 상세페이지 생성기",
    number: 1,
    bullets: [
      "상품명, 카테고리, 핵심 특징 3가지 입력",
      "AI가 제목(SEO최적화) + 서브타이틀 + 특징 5가지 + 사용 시나리오 + CTA 자동 생성",
      "네이버/쿠팡/11번가 포맷 각각 최적화 버전으로 분리 출력",
      "원클릭 복사 / 스마트스토어 에디터 직접 붙여넣기 최적화",
    ],
  },
  {
    title: "경쟁사 역분석 리포트",
    number: 2,
    bullets: [
      "네이버 쇼핑 키워드 입력 → 상위 10개 경쟁 상품 구조 자동 분석",
      "'경쟁사가 쓰는 키워드 TOP 20' 리포트 생성",
      "내 상세페이지와 경쟁사 비교 갭 분석 차트 제공",
    ],
  },
  {
    title: "전환율 예측 AI 스코어보드",
    number: 3,
    bullets: [
      "생성된 상세페이지에 0~100점 '전환율 예측 점수' 부여",
      "점수 향상을 위한 구체적 개선 제안 3가지 자동 생성",
      "'이 문장을 이렇게 바꾸면 +5점' 형태의 인라인 코칭",
    ],
  },
  {
    title: "마케팅 카피 원스톱 생성",
    number: 4,
    bullets: [
      "상세페이지 → 인스타그램 홍보 문구 자동 변환",
      "상세페이지 → 네이버 블로그 체험단 후기 초안 자동 생성",
      "상세페이지 → 네이버 파워링크 광고 문구 3종 자동 생성",
    ],
  },
];

export const SELLERBOOST_PRICING = [
  {
    plan: "무료 플랜",
    price: "0원",
    features: "월 3회 생성",
    target: "바이럴 유입용",
    highlighted: false,
  },
  {
    plan: "스타터",
    price: "월 9,900원",
    features: "월 30회 생성",
    target: "개인 판매자",
    highlighted: false,
  },
  {
    plan: "프로",
    price: "월 19,900원",
    features: "월 150회 + 경쟁 분석",
    target: "전문 셀러",
    highlighted: true,
  },
  {
    plan: "비즈니스",
    price: "월 79,000원",
    features: "팀 계정 5명 + API",
    target: "대형 셀러·대행사",
    highlighted: false,
  },
  {
    plan: "크레딧 추가",
    price: "건당 200원",
    features: "초과 사용 시",
    target: "전체",
    highlighted: false,
  },
];

export const SELLERBOOST_TECH_STACK = {
  frontend: {
    title: "Frontend / Infra",
    icon: "🖥️",
    items: [
      "Frontend: Next.js 14 + TypeScript + Tailwind",
      "UI: shadcn/ui (대기업 느낌)",
      "인증: Supabase Auth + Google OAuth",
      "DB: Supabase (PostgreSQL)",
      "배포: Vercel (무료 시작)",
    ],
  },
  backend: {
    title: "AI / Backend",
    icon: "🤖",
    items: [
      "AI Core: Claude API (claude-sonnet-4-20250514)",
      "결제: 토스페이먼츠 (한국 특화)",
      "이미지 분석: Claude Vision API",
      "검색 데이터: 네이버 검색광고 API",
      "Analytics: Mixpanel / PostHog",
    ],
  },
};

// ─── 바이럴랩 AI ───

export const VIRALLAB_HERO = {
  title: "유튜브·쇼츠·릴스 바이럴 콘텐츠 AI 엔진",
  subtitle:
    "단순 '스크립트 생성기'가 아닌 — 바이럴의 공식을 수치화하고, 후킹 강도를 점수로 보여주며, 채널 성장 전략까지 제시하는 크리에이터 성장 플랫폼",
};

export const VIRALLAB_ADVANTAGES = [
  {
    number: "①",
    title: "바이럴 공식 분석 엔진",
    description:
      "100만뷰+ 영상 패턴을 학습한 후킹 공식 자동 적용",
  },
  {
    number: "②",
    title: "후킹 강도 점수 (Hook Score)",
    description: "영상 첫 3초~15초 대본에 0~100점 점수화",
  },
  {
    number: "③",
    title: "조회수 예측 AI",
    description:
      "제목+썸네일 문구 입력 시 '예상 클릭률 범위' 제공",
  },
  {
    number: "④",
    title: "플랫폼별 완전 분리 최적화",
    description:
      "유튜브 10분 / 쇼츠 60초 / 릴스 30초 각각 다른 구조",
  },
  {
    number: "⑤",
    title: "채널 톤앤매너 학습",
    description:
      "내 기존 영상 3개 입력 → 내 스타일 그대로 새 스크립트 생성",
  },
  {
    number: "⑥",
    title: "SEO 제목 A/B 10종 생성",
    description:
      "클릭 유도 심리 기법별로 10개 제목 후보 자동 생성",
  },
];

export const VIRALLAB_CORE_FEATURES = [
  {
    title: "바이럴 스크립트 생성기",
    number: 1,
    bullets: [
      "주제 + 타겟 시청자 + 영상 길이 입력",
      "훅(Hook) → 공감대 형성 → 핵심 내용 → 반전/클라이맥스 → CTA 구조로 자동 분배",
      "각 섹션마다 '왜 이렇게 쓰나' 코칭 코멘트 삽입",
      "자막용 타임스탬프 초안 자동 생성",
    ],
  },
  {
    title: "Hook Score 분석기",
    number: 2,
    bullets: [
      "작성한 대본의 첫 15초 분량 붙여넣기 → 즉시 점수화",
      "'이 문장에서 시청자가 이탈할 가능성이 높다' 구체적 지적",
      "개선된 버전 3가지 즉시 제안",
      "100만뷰 영상과 내 대본 비교 레이더 차트 시각화",
    ],
  },
  {
    title: "제목·썸네일 문구 생성기",
    number: 3,
    bullets: [
      "주제 입력 → 클릭 심리 기법별 제목 10종 생성 (궁금증 유발 / 숫자 / 공포 / 공감 등)",
      "각 제목의 '예상 CTR 등급' 표시 (S/A/B/C 등급)",
      "썸네일에 들어갈 임팩트 문구 5종 자동 생성",
    ],
  },
  {
    title: "채널 성장 전략 리포트",
    number: 4,
    bullets: [
      "채널 주제 + 현재 구독자 수 입력",
      "알고리즘 최적화를 위한 주간 업로드 전략 자동 생성",
      "경쟁 채널 분석 기반 '공략 틈새 키워드' 20개 제안",
    ],
  },
];

export const VIRALLAB_PRICING = [
  {
    plan: "무료 플랜",
    price: "0원",
    features: "월 3회 생성",
    target: "바이럴 유입용",
    highlighted: false,
  },
  {
    plan: "크리에이터",
    price: "월 14,900원",
    features: "월 무제한 + Hook Score",
    target: "개인 유튜버 주력",
    highlighted: true,
  },
  {
    plan: "프로",
    price: "월 39,000원",
    features: "전 기능 + 채널 분석 리포트",
    target: "성장 채널 운영자",
    highlighted: false,
  },
  {
    plan: "에이전시",
    price: "월 99,000원",
    features: "채널 10개 관리 + 팀 협업",
    target: "MCN·마케팅 대행사",
    highlighted: false,
  },
];

export const VIRALLAB_TECH_STACK = {
  frontend: {
    title: "Frontend / UX",
    icon: "🖥️",
    items: [
      "Frontend: Next.js 14 + TypeScript",
      "상태관리: Zustand",
      "에디터: TipTap (리치 텍스트)",
      "차트: Recharts (점수 시각화)",
      "배포: Vercel Edge Functions",
    ],
  },
  backend: {
    title: "AI / Data",
    icon: "🤖",
    items: [
      "AI: Claude API (Streaming 방식)",
      "결제: 토스페이먼츠",
      "DB: Supabase + Redis (캐시)",
      "비디오 메타: YouTube Data API v3",
      "이메일: Resend",
    ],
  },
};

// ─── GTM 전략 ───

export const GTM_PLAYBOOK = [
  {
    period: "D+0~7일",
    description:
      "핵심 기능 MVP만 개발. 상세페이지 3개 + 스크립트 3개 생성 되면 런칭",
  },
  {
    period: "D+7일",
    description: "베타 사이트 오픈 + 무료 플랜 제공 (가입 유도)",
  },
  {
    period: "D+8~10일",
    description: "커뮤니티 바이럴 폭격 시작",
  },
  {
    period: "D+11~14일",
    description: "유료 전환 첫 10명 목표, 사용 후기 수집",
  },
];

export const SELLERBOOST_VIRAL_CHANNELS = [
  "네이버 카페 '스마트스토어 판매자 모임' (회원 50만+): '무료로 상세페이지 써줌' 게시글",
  "블라인드 스타트업/이커머스 채널: '사이드프로젝트로 만든 셀러 도구' 스토리텔링",
  "유튜브 리뷰 요청: 셀러 관련 유튜버 10명에게 무료 계정 제공",
  "네이버 블로그 SEO: '스마트스토어 상세페이지 잘 쓰는 법' 키워드로 글 50개 작성",
];

export const VIRALLAB_VIRAL_CHANNELS = [
  "디시 유튜브 갤러리: '내 후킹 점수 올려줌' 이벤트성 게시물",
  "유튜버 카페 / 크리에이터 플랫폼 커뮤니티: 무료 스크립트 체험 이벤트",
  "틱톡/쇼츠: 도구 사용 전후 비교 영상 (조회수 올리기 전후)",
  "트위터(X): '내 유튜브 훅 점수는?' 참여형 바이럴 이벤트",
];

// ─── 가격 전략 (심리적 앵커링) ───

export const PRICE_STRATEGIES = [
  {
    title: "얼리버드 50% 할인",
    description:
      "론칭 초기 '얼리버드 50% 할인' 배너 필수 → 결제 전환율 3배 상승",
  },
  {
    title: "첫 달 990원 프로모션",
    description:
      "첫 달 990원 프로모션 → 다음 달 자동 정가 결제 (이탈률 낮음)",
  },
  {
    title: "연간 플랜 2개월 무료",
    description:
      "연간 플랜 2개월 무료 제공 → 연간 전환 시 현금 흐름 즉시 확보",
  },
  {
    title: "실시간 카운터",
    description:
      "'지금 몇 명이 사용 중' 실시간 카운터 표시 → 사회적 증거",
  },
];

// ─── 로드맵 ───

export const ROADMAP = [
  {
    phase: "Phase 0",
    label: "D-Day",
    period: "개발 시작 즉시",
    tasks:
      "환경 세팅: Next.js + Supabase + Vercel / Claude API 키 발급 / 디자인 시스템 구축 (shadcn/ui)",
    goal: "로컬 개발 환경 완성",
  },
  {
    phase: "Phase 1",
    label: "D+1~7",
    period: "1주차 핵심 개발",
    tasks:
      "셀러부스트: 상세페이지 생성 Core 완성 / 바이럴랩: 스크립트 생성 Core 완성 / 로그인/결제 연동 (토스페이먼츠) / 랜딩페이지 완성",
    goal: "MVP 완성 · 베타 배포 준비",
  },
  {
    phase: "Phase 2",
    label: "D+8~14",
    period: "2주차 런칭",
    tasks:
      "베타 오픈 + 무료 100명 가입 이벤트 / 커뮤니티 바이럴 실행 / 버그 수정 + UX 개선 / 첫 유료 결제 달성",
    goal: "가입자 100명 · 유료 10명",
  },
  {
    phase: "Phase 3",
    label: "D+15~30",
    period: "1개월차 초기 성장",
    tasks:
      "사용자 피드백 반영 고도화 / 경쟁 분석 · Hook Score 기능 추가 / 블로그 SEO 콘텐츠 10개 발행 / 구글 애즈 소액 테스트 (5만원)",
    goal: "유료 50명 · MRR 50만원",
  },
  {
    phase: "Phase 4",
    label: "D+31~90",
    period: "2~3개월차 가속",
    tasks:
      "기능 확장 (A/B 생성, 채널 분석) / 제휴 마케팅 파트너 3곳 확보 / 언론/미디어 기고 2건 / YouTube 채널 시작 (도구 활용법)",
    goal: "유료 200명 · MRR 300만원",
  },
  {
    phase: "Phase 5",
    label: "D+91~180",
    period: "4~6개월차 수익화",
    tasks:
      "API 외부 판매 개시 / 엔터프라이즈 플랜 출시 / 타 서비스 임베드 파트너십 / 2억 원 상환 계획 실행",
    goal: "유료 500명+ · MRR 1,000만원+",
  },
];

// ─── 재무 계획 ───

export const INITIAL_COSTS = [
  { item: "도메인 2개", cost: "약 4만원/년", note: "셀러부스트.kr + 바이럴랩.kr" },
  { item: "Vercel 배포", cost: "무료 (Pro: 2만원/월)", note: "초기에는 무료 플랜으로 충분" },
  { item: "Supabase DB", cost: "무료 (Pro: 2.5만원/월)", note: "초기에는 무료 플랜으로 충분" },
  { item: "Claude API", cost: "사용량 기반 과금", note: "구독료로 커버 (수익의 10~15%)" },
  { item: "토스페이먼츠", cost: "수수료 3.5% 내외", note: "별도 초기 비용 없음" },
  { item: "총 초기 투자", cost: "약 4~5만원", note: "도메인 구입비만 필요" },
];

export const REVENUE_SCENARIO = [
  { month: "1개월", sbPaid: 20, vlPaid: 20, arpu: "15,000원", mrr: "60만원", cumulative: "60만원" },
  { month: "2개월", sbPaid: 50, vlPaid: 50, arpu: "16,000원", mrr: "160만원", cumulative: "220만원" },
  { month: "3개월", sbPaid: 120, vlPaid: 80, arpu: "17,000원", mrr: "340만원", cumulative: "560만원" },
  { month: "4개월", sbPaid: 200, vlPaid: 150, arpu: "18,000원", mrr: "630만원", cumulative: "1,190만원" },
  { month: "5개월", sbPaid: 300, vlPaid: 220, arpu: "19,000원", mrr: "1,000만원", cumulative: "2,190만원" },
  { month: "6개월", sbPaid: 400, vlPaid: 300, arpu: "20,000원", mrr: "1,400만원", cumulative: "3,590만원" },
];

export const FINANCE_HIGHLIGHTS = [
  "6개월 MRR 1,400만원 달성 시 연 환산 1.7억원 수준",
  "광고비 등 마진 60% 가정 시 순수익 약 840만원/월",
  "부채 이자 월 50~80만원 가정 → 충분히 커버 가능",
  "12개월 목표: MRR 3,000만원+ → 2억 원 전액 상환 가능 구조",
];

// ─── 리스크 관리 ───

export const RISKS = [
  {
    risk: "Claude API 비용 초과 → 수익 압박",
    level: "high" as const,
    response: "생성 1회당 비용 캡 설정 + 캐싱 전략으로 비용 70% 절감",
  },
  {
    risk: "경쟁사 유사 서비스 빠른 출현",
    level: "high" as const,
    response: "선점 효과 + 한국어 최적화로 해자 구축. 속도가 곧 해자",
  },
  {
    risk: "초기 유료 전환 저조",
    level: "high" as const,
    response:
      "첫 달 990원 프로모션 + 무료→유료 전환 트리거 UX 설계",
  },
  {
    risk: "기술적 버그로 서비스 중단",
    level: "high" as const,
    response:
      "Vercel 자동 롤백 + Supabase 자동 백업 + 모니터링 알림",
  },
  {
    risk: "네이버 알고리즘 변경으로 SEO 기능 약화",
    level: "medium" as const,
    response: "API 다변화 (네이버 검색 데이터 직접 크롤링 보완)",
  },
];

// ─── 마일스톤 ───

export const MILESTONES = [
  { date: "D+14", goal: "베타 런칭, 유료 결제 첫 발생" },
  { date: "D+30", goal: "MRR 50만원 (유료 50명)" },
  { date: "D+60", goal: "MRR 200만원 (Break-Even)" },
  { date: "D+90", goal: "MRR 500만원" },
  { date: "D+180", goal: "MRR 1,000만원+ → 빚 상환 시작" },
  { date: "D+365", goal: "2억 전액 상환 완료" },
];

// ─── 셀러부스트 카테고리 ───

export const SELLERBOOST_CATEGORIES = [
  { value: "fashion", label: "의류/패션" },
  { value: "food", label: "식품" },
  { value: "electronics", label: "전자기기" },
  { value: "beauty", label: "뷰티/화장품" },
  { value: "living", label: "생활/주방" },
  { value: "sports", label: "스포츠/레저" },
] as const;

export const SELLERBOOST_PLATFORMS = [
  { value: "naver" as const, label: "네이버 스마트스토어" },
  { value: "coupang" as const, label: "쿠팡" },
  { value: "11st" as const, label: "11번가" },
];

// ─── Mock 생성 결과 ───

export const MOCK_SELLERBOOST_OUTPUT: SellerboostOutput = {
  title:
    "[2025 신상] 프리미엄 무선 블루투스 이어폰 | 노이즈캔슬링 ANC | 48시간 배터리",
  subtitle: "출퇴근길 소음 완벽 차단, 하루 종일 끊김 없는 프리미엄 사운드",
  features: [
    "하이브리드 ANC 노이즈캔슬링으로 지하철·카페 소음 99% 차단",
    "48시간 연속 재생 — 일주일에 한 번만 충전하세요",
    "IPX5 방수 등급으로 운동 중에도 안심 사용",
    "13mm 대형 드라이버로 풍부한 저음과 선명한 고음 재현",
    "멀티포인트 연결 — 노트북과 스마트폰 동시 연결",
  ],
  scenario:
    "아침 출근길, 지하철 소음 속에서도 좋아하는 팟캐스트가 선명하게 들립니다. 점심시간 카페에서 ANC를 켜면 나만의 집중 공간이 됩니다. 퇴근 후 헬스장에서도 땀 걱정 없이 신나는 음악과 함께 운동하세요.",
  painPoints: [
    "유선 이어폰 줄 엉킴에 매번 스트레스 받으시죠?",
    "저렴한 무선 이어폰은 음질이 너무 떨어져서 실망한 경험",
    "배터리가 반나절도 안 가서 충전 케이블을 항상 들고 다녀야 하는 불편함",
  ],
  solution: "하이브리드 ANC + 48시간 배터리 + 프리미엄 사운드를 하나에 담았습니다. 더 이상 타협하지 마세요.",
  specs: [
    { label: "드라이버", value: "13mm 대형 다이나믹" },
    { label: "배터리", value: "48시간 (케이스 포함)" },
    { label: "방수등급", value: "IPX5" },
    { label: "연결", value: "블루투스 5.3 멀티포인트" },
  ],
  testimonial: "솔직히 이 가격에 ANC 이어폰은 기대 안 했는데, 에어팟 프로보다 소음 차단이 잘 되서 깜짝 놀랐어요. 출퇴근 지하철에서 세상이 달라집니다.",
  faq: [
    { q: "아이폰에서도 사용 가능한가요?", a: "네, iOS와 Android 모두 호환됩니다. 블루투스 5.3으로 안정적인 연결을 지원합니다." },
    { q: "운동할 때 빠지지 않나요?", a: "3가지 사이즈의 이어팁이 제공되어 귀에 딱 맞게 착용할 수 있습니다. IPX5 방수로 땀에도 안전합니다." },
    { q: "AS는 어떻게 되나요?", a: "1년 무상 A/S를 제공하며, 30일 이내 무조건 교환/환불이 가능합니다." },
  ],
  trustBadges: ["무료배송", "100% 정품 보장", "30일 무조건 환불"],
  cta: "지금 구매하면 정가 대비 40% 할인 + 전용 케이스 증정!",
  urgency: "한정 수량 200개 — 오늘 주문 시 내일 도착!",
  seoKeywords: [
    "무선 블루투스 이어폰",
    "노이즈캔슬링 이어폰",
    "ANC 이어폰 추천",
    "가성비 블루투스 이어폰",
    "48시간 배터리 이어폰",
  ],
  conversionScore: 87,
  improvements: [
    "리뷰 평점 또는 판매량 수치를 추가하면 신뢰도가 +8점 상승합니다",
    "'30일 무조건 환불 보장' 문구를 CTA 근처에 배치하면 구매 전환율이 올라갑니다",
    "경쟁 제품 대비 가격 비교표를 추가하면 가성비 어필이 강화됩니다",
  ],
};

export const MOCK_VIRALLAB_OUTPUT: VirallabOutput = {
  title:
    "직장인이 퇴근 후 월 300만원 버는 현실적인 방법 (99%가 모름)",
  hook: "여러분, 솔직히 말해볼게요. 저도 6개월 전까지 월급만으로 살았습니다. 그런데 지금 이 순간에도 제 계좌에는 자는 동안 돈이 들어오고 있어요. 오늘 이 영상을 끝까지 보시면, 여러분도 퇴근 후 딱 2시간만 투자해서 월 300만원을 만드는 구체적인 방법을 알게 됩니다.",
  script: `[Hook - 0:00~0:15]
여러분, 솔직히 말해볼게요. 저도 6개월 전까지 월급만으로 살았습니다. 그런데 지금 이 순간에도 제 계좌에는 자는 동안 돈이 들어오고 있어요.

[공감대 형성 - 0:15~1:30]
매달 월급날만 기다리면서 "이번 달도 빠듯하다" 한숨 쉬는 분들 많으시죠? 저도 정확히 그랬습니다. 회사에서는 야근하고, 주말에는 쉬고 싶고... 부업할 시간도 체력도 없다고 생각했어요.

[핵심 내용 - 1:30~7:00]
첫 번째 방법: 스마트스토어 자동화입니다. AI 도구를 활용하면 상품 등록부터 상세페이지까지 자동으로 만들 수 있습니다. 저는 이걸로 첫 달에 50만원을 벌었습니다.

두 번째 방법: 콘텐츠 재활용 전략입니다. 하나의 영상을 블로그, 인스타, 쇼츠로 동시에 변환하면 시간 대비 수익이 3배가 됩니다.

세 번째 방법: 디지털 상품 판매입니다. 한 번 만들면 계속 팔리는 구조를 만드세요. PDF 가이드, 템플릿, 온라인 강의가 대표적입니다.

[반전/클라이맥스 - 7:00~9:00]
근데 여기서 중요한 포인트가 하나 있습니다. 이 세 가지를 동시에 하면 안 됩니다. 하나를 먼저 월 100만원까지 만들고, 그 다음에 확장하세요. 저도 이 실수를 해서 처음 3개월을 날렸습니다.

[CTA - 9:00~10:00]
이 영상이 도움이 됐다면 구독과 좋아요 부탁드립니다. 그리고 제가 실제로 사용하는 AI 도구와 상세한 수익 인증은 아래 링크에 정리해뒀으니 꼭 확인해보세요.`,
  hookScore: 92,
  thumbnailSuggestions: [
    "통장 잔고 캡처 + 놀란 표정 (숫자 강조)",
    "'월 300만원' 큰 글씨 + 퇴근하는 직장인 실루엣",
    "노트북 화면에 수익 그래프 + '퇴근 후 2시간' 텍스트",
  ],
  titleVariants: [
    "직장인이 퇴근 후 월 300만원 버는 현실적인 방법 (99%가 모름)",
    "월급 외 월 300만원 만드는 3가지 방법 | 직장인 부업 끝판왕",
    "퇴근 후 2시간으로 월 300만원? 실제 수익 인증합니다",
  ],
  improvements: [
    "Hook에 구체적인 금액(예: 통장 잔고 인증)을 언급하면 이탈률이 15% 감소합니다",
    "영상 중간 2분 30초 지점에 '이건 꼭 알아야 하는데요' 같은 리텐션 후크를 추가하세요",
    "CTA에서 '댓글로 1번 남겨주세요' 같은 참여형 요소를 넣으면 알고리즘 가점을 받습니다",
  ],
};

// ─── 셀러부스트 A/B 변형 3종 ───

export const MOCK_SELLERBOOST_VARIANTS: SellerboostOutput[] = [
  MOCK_SELLERBOOST_OUTPUT,
  {
    title: "프리미엄 ANC 블루투스 이어폰 | 48H 배터리 | 방수 IPX5 | 2025 최신형",
    subtitle: "당신의 귀에 딱 맞는 프리미엄 — 48시간 끊김 없이, 소음 없이",
    painPoints: [
      "지하철 소음 때문에 음악이 안 들려서 볼륨을 최대로 올리시나요?",
      "이어폰 배터리가 하루도 못 가서 매일 충전하시나요?",
      "운동할 때 땀 때문에 이어폰이 고장날까 걱정되시나요?",
    ],
    solution: "4마이크 하이브리드 ANC로 어떤 환경에서도 완벽한 사운드를 경험하세요. 48시간 재생으로 일주일에 한 번만 충전하면 됩니다.",
    features: [
      "4마이크 하이브리드 ANC — 외부 소음 99% 차단, 통화 품질도 완벽",
      "48시간 초장시간 재생 — 충전 스트레스 없이 일주일 사용",
      "IPX5 방수 인증 — 땀, 빗물, 운동 상관없이 사용 가능",
      "블루투스 5.3 + 멀티포인트 — 노트북↔스마트폰 끊김 없이 전환",
      "인체공학 커스텀 이어팁 3종 — 귀 크기에 맞는 완벽한 핏",
    ],
    specs: [
      { label: "드라이버", value: "13mm 대구경 다이나믹" },
      { label: "ANC", value: "4마이크 하이브리드 (-35dB)" },
      { label: "배터리", value: "48시간 (케이스 포함)" },
      { label: "방수", value: "IPX5 등급" },
      { label: "블루투스", value: "5.3 멀티포인트" },
      { label: "무게", value: "5.2g (이어폰 단체)" },
    ],
    scenario:
      "새벽 러닝 중 땀이 흘러도 걱정 없는 이어폰. 출근 지하철에서 ANC 한 번으로 나만의 세계로. 오후 회의는 노트북 연결로 바로 전환. 퇴근 후 넷플릭스는 저음 풍부한 사운드로 몰입하세요.",
    testimonial: "출퇴근 지하철에서 매일 사용 중인데, ANC 성능이 에어팟 프로랑 거의 비슷해요. 배터리는 비교도 안 되고요. 이 가격에 이 성능은 사기입니다! — 구매자 김*수",
    faq: [
      { q: "에어팟 프로와 ANC 성능 차이가 있나요?", a: "독립 테스트 결과 에어팟 프로 대비 95% 수준의 노이즈캔슬링 성능을 확인했습니다." },
      { q: "통화 품질은 어떤가요?", a: "4마이크 빔포밍 기술로 시끄러운 환경에서도 또렷한 통화가 가능합니다." },
      { q: "귀에서 잘 빠지지 않나요?", a: "S/M/L 3종 이어팁이 포함되어 있어 귀에 맞는 사이즈를 선택할 수 있습니다." },
    ],
    trustBadges: ["무료배송", "30일 무조건 환불", "1년 무상 A/S", "당일출고"],
    cta: "오늘만 40% 특가 + 무료 배송! 3,000개 한정 수량 — 지금 장바구니에 담으세요.",
    urgency: "한정 수량 3,000개 중 2,847개 판매 완료! 오늘 자정 특가 종료",
    seoKeywords: ["ANC 이어폰", "블루투스 5.3 이어폰", "방수 이어폰", "장시간 배터리 이어폰", "멀티포인트 이어폰"],
    conversionScore: 91,
    improvements: [
      "실제 사용자 후기 인용을 추가하면 신뢰도 +10점",
      "경쟁사(에어팟, 갤럭시버즈) 대비 가격 비교를 넣으면 가성비 어필 강화",
      "30일 무조건 환불 보장 문구 추가 시 구매 망설임 해소",
    ],
  },
  {
    title: "출퇴근 필수템 ANC 무선이어폰 | 48시간 배터리 | 노이즈캔슬링",
    subtitle: "3만원대에 에어팟 프로 부럽지 않은 노이즈캔슬링 성능",
    painPoints: [
      "에어팟 프로 사고 싶지만 30만원이 부담되시나요?",
      "저렴한 이어폰은 ANC가 안 되서 소음에 시달리시나요?",
      "매일 충전해야 하는 이어폰에 지치셨나요?",
    ],
    solution: "3만원대에 에어팟 프로 95% 수준 ANC 성능과 8배 더 긴 배터리를 경험해보세요. 4,800명의 구매자가 인정한 가성비 끝판왕입니다.",
    features: [
      "에어팟 프로 대비 1/3 가격, ANC 성능은 95% 수준",
      "48시간 재생 — 에어팟 프로(6시간)의 8배 배터리",
      "13mm 대구경 드라이버로 풍부한 베이스와 선명한 고음",
      "빠른 충전 — 10분 충전으로 2시간 사용",
      "자동 귀 감지 — 이어폰 빼면 자동 일시정지",
    ],
    specs: [
      { label: "드라이버", value: "13mm 대구경" },
      { label: "ANC", value: "하이브리드 (에어팟 프로 95%)" },
      { label: "배터리", value: "48시간 (케이스 포함)" },
      { label: "충전", value: "10분 → 2시간 사용" },
      { label: "블루투스", value: "5.3" },
    ],
    scenario:
      "에어팟 사고 싶지만 부담스러운 가격. 이 이어폰은 3만원대로 99% 같은 경험을 드립니다. 실제 구매자 4,800명 중 96%가 '가성비 끝판왕'이라고 평가했습니다.",
    testimonial: "솔직히 3만원이라 기대 안 했는데, ANC 켜는 순간 소름 돋았어요. 에어팟 프로 팔고 이거 두 개 샀습니다 ㅋㅋ — 구매자 이*진",
    faq: [
      { q: "정말 에어팟 프로급 ANC인가요?", a: "독립 테스트 결과 에어팟 프로 대비 95% 수준이며, 일상 소음 차단에는 체감 차이가 거의 없습니다." },
      { q: "48시간 배터리가 실제인가요?", a: "ANC 끈 상태 기준이며, ANC 사용 시에도 약 30시간 재생 가능합니다." },
    ],
    trustBadges: ["무료배송", "14일 무조건 환불", "스토어 이어폰 1위", "누적판매 12,000개"],
    cta: "★ 스마트스토어 이어폰 카테고리 1위 ★ 누적 판매 12,000개 돌파! 오늘 주문하면 내일 도착.",
    urgency: "리뷰 이벤트 진행 중! 구매 후 리뷰 작성 시 충전 케이블 증정 (이번 주까지)",
    seoKeywords: ["가성비 무선이어폰", "에어팟 대안", "3만원대 노이즈캔슬링", "출퇴근 이어폰", "배터리 좋은 이어폰"],
    conversionScore: 83,
    improvements: [
      "경쟁 제품과의 스펙 비교표를 이미지로 제작하면 체류 시간 2배 증가",
      "리뷰 평점(4.8/5.0) 배지를 제목 옆에 배치하면 클릭률 상승",
      "무이자 할부 안내를 추가하면 고가 상품 느낌을 줄일 수 있습니다",
    ],
  },
];

// ─── 셀러부스트 인라인 코칭 ───

export interface InlineCoaching {
  original: string;
  suggested: string;
  scoreDelta: number;
  reason: string;
}

export const MOCK_INLINE_COACHING: InlineCoaching[] = [
  {
    original: "하이브리드 ANC 노이즈캔슬링으로 지하철·카페 소음 99% 차단",
    suggested: "하이브리드 ANC 노이즈캔슬링으로 지하철·카페 소음 99% 차단 (KS 인증 테스트 기준)",
    scoreDelta: 5,
    reason: "구체적인 인증/테스트 근거를 추가하면 신뢰도가 상승합니다",
  },
  {
    original: "48시간 연속 재생 — 일주일에 한 번만 충전하세요",
    suggested: "48시간 연속 재생 — 에어팟 프로(6시간)의 8배! 일주일에 한 번만 충전",
    scoreDelta: 7,
    reason: "경쟁 제품과 직접 비교하면 수치의 체감이 훨씬 커집니다",
  },
  {
    original: "지금 구매하면 정가 대비 40% 할인 + 전용 케이스 증정! 한정 수량이니 서두르세요.",
    suggested: "지금 구매하면 정가 대비 40% 할인 + 전용 케이스 증정! 남은 수량 87개 — 오늘 자정 마감",
    scoreDelta: 6,
    reason: "구체적인 잔여 수량과 마감 시간을 명시하면 긴박감이 3배 높아집니다",
  },
];

// ─── 셀러부스트 플랫폼별 출력 ───

export interface PlatformOutput {
  platform: "naver" | "coupang" | "11st";
  platformLabel: string;
  title: string;
  optimizationTips: string[];
}

export const MOCK_PLATFORM_OUTPUTS: PlatformOutput[] = [
  {
    platform: "naver",
    platformLabel: "네이버 스마트스토어",
    title: "[2025 신상] 프리미엄 무선 블루투스 이어폰 노이즈캔슬링 ANC 48시간 배터리",
    optimizationTips: [
      "네이버 검색: '무선 블루투스 이어폰' 키워드를 제목 앞부분에 배치",
      "태그: #무선이어폰 #노이즈캔슬링 #ANC이어폰 필수 등록",
      "상세페이지 이미지: 가로 860px 기준으로 최적화",
    ],
  },
  {
    platform: "coupang",
    platformLabel: "쿠팡",
    title: "프리미엄 무선 블루투스 이어폰 노이즈캔슬링 ANC 48시간배터리 방수 IPX5",
    optimizationTips: [
      "쿠팡 A+ 콘텐츠: 비교표 이미지 필수 등록",
      "로켓배송 배지 노출 시 전환율 2배 — 로켓그로스 입점 권장",
      "검색 키워드: 속성값(색상, 연결방식) 최대한 입력",
    ],
  },
  {
    platform: "11st",
    platformLabel: "11번가",
    title: "[오늘의 특가] 프리미엄 ANC 무선 블루투스 이어폰 48시간 배터리 노이즈캔슬링",
    optimizationTips: [
      "11번가 디스커버리 노출: 카테고리 정확 매칭 필수",
      "셀러 등급 UP: 당일발송 설정 시 검색 가점",
      "가격비교 사이트 노출을 위해 모델명을 정확히 입력",
    ],
  },
];

// ─── 경쟁사 역분석 리포트 mock ───

export interface CompetitorProduct {
  rank: number;
  name: string;
  seller: string;
  price: string;
  reviewCount: number;
  rating: number;
  mainKeywords: string[];
}

export interface CompetitorAnalysis {
  keyword: string;
  totalProducts: number;
  competitors: CompetitorProduct[];
  topKeywords: { keyword: string; count: number; myUsage: boolean }[];
  gapAnalysis: { category: string; myScore: number; avgScore: number }[];
}

export const MOCK_COMPETITOR_ANALYSIS: CompetitorAnalysis = {
  keyword: "무선 블루투스 이어폰",
  totalProducts: 42580,
  competitors: [
    { rank: 1, name: "삼성 갤럭시버즈3 프로", seller: "삼성전자", price: "189,000원", reviewCount: 12450, rating: 4.7, mainKeywords: ["갤럭시버즈", "ANC", "삼성이어폰"] },
    { rank: 2, name: "애플 에어팟 프로 2세대", seller: "Apple", price: "329,000원", reviewCount: 8920, rating: 4.8, mainKeywords: ["에어팟", "노이즈캔슬링", "아이폰이어폰"] },
    { rank: 3, name: "소니 WF-1000XM5", seller: "소니코리아", price: "279,000원", reviewCount: 5670, rating: 4.6, mainKeywords: ["소니이어폰", "하이레즈", "ANC"] },
    { rank: 4, name: "QCY T20 ANC", seller: "QCY공식", price: "29,900원", reviewCount: 18900, rating: 4.3, mainKeywords: ["가성비이어폰", "QCY", "저렴한ANC"] },
    { rank: 5, name: "JBL Tour Pro 2", seller: "JBL코리아", price: "199,000원", reviewCount: 3200, rating: 4.5, mainKeywords: ["JBL이어폰", "스마트케이스", "ANC"] },
    { rank: 6, name: "앤커 사운드코어 Liberty 4 NC", seller: "앤커다이렉트", price: "89,000원", reviewCount: 7800, rating: 4.4, mainKeywords: ["앤커이어폰", "가성비ANC", "사운드코어"] },
    { rank: 7, name: "보스 QuietComfort Ultra", seller: "보스코리아", price: "349,000원", reviewCount: 2100, rating: 4.7, mainKeywords: ["보스이어폰", "프리미엄ANC", "음질"] },
    { rank: 8, name: "샤오미 버즈4 프로", seller: "샤오미공식", price: "69,000원", reviewCount: 15600, rating: 4.2, mainKeywords: ["샤오미이어폰", "가성비", "LDAC"] },
    { rank: 9, name: "제이비엘 Live Pro 2", seller: "하만코리아", price: "149,000원", reviewCount: 4300, rating: 4.4, mainKeywords: ["JBL", "라이브프로", "적응형ANC"] },
    { rank: 10, name: "Nothing Ear (2)", seller: "Nothing", price: "149,000원", reviewCount: 3800, rating: 4.3, mainKeywords: ["낫싱이어폰", "투명디자인", "ANC"] },
  ],
  topKeywords: [
    { keyword: "무선 블루투스 이어폰", count: 38, myUsage: true },
    { keyword: "노이즈캔슬링", count: 35, myUsage: true },
    { keyword: "ANC 이어폰", count: 32, myUsage: true },
    { keyword: "가성비 이어폰", count: 28, myUsage: false },
    { keyword: "에어팟 대안", count: 24, myUsage: false },
    { keyword: "방수 이어폰", count: 22, myUsage: true },
    { keyword: "통화 품질", count: 20, myUsage: false },
    { keyword: "배터리 오래가는", count: 19, myUsage: true },
    { keyword: "가성비 ANC", count: 18, myUsage: false },
    { keyword: "출퇴근 이어폰", count: 16, myUsage: false },
    { keyword: "운동용 이어폰", count: 15, myUsage: false },
    { keyword: "블루투스 5.3", count: 14, myUsage: false },
    { keyword: "인이어 이어폰", count: 13, myUsage: false },
    { keyword: "게이밍 이어폰", count: 11, myUsage: false },
    { keyword: "저음 강한 이어폰", count: 10, myUsage: false },
    { keyword: "멀티포인트", count: 9, myUsage: true },
    { keyword: "고음질 이어폰", count: 8, myUsage: false },
    { keyword: "LDAC 이어폰", count: 7, myUsage: false },
    { keyword: "무선충전 이어폰", count: 6, myUsage: false },
    { keyword: "경량 이어폰", count: 5, myUsage: false },
  ],
  gapAnalysis: [
    { category: "SEO 키워드 적합도", myScore: 72, avgScore: 65 },
    { category: "제목 최적화", myScore: 85, avgScore: 70 },
    { category: "특징 설명 상세도", myScore: 80, avgScore: 75 },
    { category: "CTA 강도", myScore: 78, avgScore: 60 },
    { category: "리뷰 언급", myScore: 30, avgScore: 55 },
    { category: "가격 경쟁력 어필", myScore: 40, avgScore: 68 },
  ],
};

// ─── 마케팅 카피 원스톱 mock ───

export interface MarketingCopy {
  instagram: string;
  blogReview: string;
  powerLink: string[];
}

export const MOCK_MARKETING_COPY: MarketingCopy = {
  instagram: `🎧 드디어 찾았다, 가성비 끝판왕 이어폰!

출퇴근길 소음? ANC로 99% 차단 ✅
배터리 걱정? 48시간 연속 재생 ✅
운동 중 땀? IPX5 완벽 방수 ✅

에어팟 프로 1/3 가격에 같은 성능 🔥
지금 40% 할인 + 전용 케이스 무료!

👉 프로필 링크에서 확인하세요
#무선이어폰 #블루투스이어폰 #노이즈캔슬링 #ANC이어폰 #가성비이어폰 #출퇴근템 #이어폰추천`,
  blogReview: `[체험단 후기] 48시간 배터리 ANC 무선이어폰, 2주 사용 솔직 리뷰

안녕하세요, 오늘은 최근 2주간 사용한 프리미엄 무선 블루투스 이어폰 리뷰를 남겨볼게요.

▶ 첫인상
박스 오픈 순간부터 느낌이 달랐어요. 전용 케이스 마감이 꽤 고급스러웠고, 이어팁이 3종류나 들어있어서 귀 사이즈에 맞춰 골라 쓸 수 있었습니다.

▶ 노이즈캔슬링 성능
솔직히 3만원대에서 이 정도 ANC는 기대 안 했는데... 지하철에서 옆 사람 통화 소리가 거의 안 들릴 정도예요. 카페에서 공부할 때도 완전 집중 모드 가능합니다.

▶ 배터리
공식 스펙 48시간인데, 실사용 기준 ANC 켜고 하루 3시간씩 들으면 약 12일 갔어요. 충전 한 번이면 2주 버티는 느낌.

▶ 음질
가격 대비 음질은 매우 만족. 특히 저음이 풍부해서 힙합이나 EDM 들을 때 좋았고, 고음도 깨지지 않고 깨끗했어요.

▶ 아쉬운 점
- 이어폰 자체에 볼륨 조절이 터치 방식인데 가끔 오작동
- 케이스가 무선충전은 안 됨 (USB-C만 가능)

▶ 총평: ★★★★☆ (4.5/5)
이 가격에 이 성능이면 역대급 가성비. 에어팟 살까 말까 고민하는 분들께 강력 추천합니다.

📌 구매 링크: [스마트스토어 링크]`,
  powerLink: [
    "🎧 ANC 이어폰 48시간 배터리 | 에어팟 프로 1/3 가격 | 지금 40% 할인 → 29,900원",
    "출퇴근 필수! 노이즈캔슬링 무선이어폰 | ★4.8 리뷰 4,800건 | 오늘 무료배송",
    "30일 환불보장 ANC 블루투스 이어폰 | 48시간 재생 | 한정수량 특가진행중",
  ],
};

// ─── Hook Score 분석기 mock ───

export interface HookAnalysisResult {
  score: number;
  dropOffPoints: { timestamp: string; text: string; risk: "high" | "medium" | "low"; reason: string }[];
  improvedVersions: { version: string; score: number; changes: string }[];
  radarData: { metric: string; myScore: number; viralAvg: number }[];
}

export const MOCK_HOOK_ANALYSIS: HookAnalysisResult = {
  score: 72,
  dropOffPoints: [
    {
      timestamp: "0:03",
      text: "여러분, 솔직히 말해볼게요.",
      risk: "medium",
      reason: "'여러분'으로 시작하는 패턴은 식상합니다. 구체적인 질문이나 충격적 사실로 시작하세요.",
    },
    {
      timestamp: "0:08",
      text: "저도 6개월 전까지 월급만으로 살았습니다.",
      risk: "low",
      reason: "개인 스토리는 좋지만, 구체적인 금액이나 상황을 먼저 던지면 더 강력합니다.",
    },
    {
      timestamp: "0:12",
      text: "그런데 지금 이 순간에도 제 계좌에는 자는 동안 돈이 들어오고 있어요.",
      risk: "high",
      reason: "이 문장이 0초에 나와야 합니다. 가장 강한 후킹인데 12초나 걸려서 나옵니다. 시청자의 50%는 이미 이탈한 후입니다.",
    },
  ],
  improvedVersions: [
    {
      version: "어젯밤 자는 동안 제 계좌에 47만원이 들어왔습니다. 6개월 전까지 저도 월급 200만원으로 살았는데요. 퇴근 후 딱 2시간, 이 방법 하나로 인생이 바뀌었습니다.",
      score: 91,
      changes: "구체적 금액(47만원)을 첫 문장에, 월급 금액 명시, 시간 투자량 즉시 제시",
    },
    {
      version: "퇴근 후 2시간으로 월급보다 더 버는 사람들의 비밀, 알고 싶으세요? 저는 6개월 만에 월 300만원을 만들었고, 지금부터 그 방법을 전부 공개합니다.",
      score: 88,
      changes: "질문형 후킹으로 시작, '비밀'과 '공개'로 호기심 자극, 결과를 먼저 제시",
    },
    {
      version: "이 영상을 보고도 안 하면, 솔직히 1년 뒤에도 월급만 받고 있을 겁니다. 퇴근 후 300만원 추가 수입, 생각보다 어렵지 않습니다.",
      score: 85,
      changes: "공포/위기감 후킹 기법 적용, 시청자의 현재 상황에 대한 위협 제시",
    },
  ],
  radarData: [
    { metric: "호기심 유발", myScore: 65, viralAvg: 88 },
    { metric: "감정 자극", myScore: 70, viralAvg: 85 },
    { metric: "구체성", myScore: 55, viralAvg: 90 },
    { metric: "긴박감", myScore: 40, viralAvg: 82 },
    { metric: "공감대", myScore: 80, viralAvg: 75 },
    { metric: "시각적 묘사", myScore: 45, viralAvg: 78 },
  ],
};

// ─── 제목·썸네일 생성기 mock ───

export interface TitleSuggestion {
  title: string;
  technique: string;
  ctrGrade: "S" | "A" | "B" | "C";
  ctrEstimate: string;
}

export const MOCK_TITLE_SUGGESTIONS: TitleSuggestion[] = [
  { title: "직장인이 퇴근 후 월 300만원 버는 현실적인 방법 (99%가 모름)", technique: "궁금증 유발 + 숫자", ctrGrade: "S", ctrEstimate: "8~12%" },
  { title: "월급 200만원인 내가 부업으로 연봉을 3배로 만든 비결", technique: "개인 스토리 + 숫자 대비", ctrGrade: "S", ctrEstimate: "7~11%" },
  { title: "이거 모르면 평생 월급만 받습니다 | 직장인 필수 부업 TOP 3", technique: "공포 + 리스트", ctrGrade: "A", ctrEstimate: "6~9%" },
  { title: "퇴근 후 2시간이 인생을 바꾼다 — 월 300만원 수익 인증", technique: "변화 + 증거", ctrGrade: "A", ctrEstimate: "6~8%" },
  { title: "직장인 부업 끝판왕: 초보도 첫 달 100만원 가능한 방법", technique: "초보 타겟 + 달성 가능한 목표", ctrGrade: "A", ctrEstimate: "5~8%" },
  { title: "나만 몰랐던 퇴근 후 돈 버는 법 (실제 통장 공개)", technique: "소외감 + 증거", ctrGrade: "B", ctrEstimate: "4~7%" },
  { title: "월 300만원 자동 수입, 이것만 알면 됩니다", technique: "단순화 + 자동화 매력", ctrGrade: "B", ctrEstimate: "4~6%" },
  { title: "직장인 부업 3가지로 월급 넘는 수입 만들기 | 현실 후기", technique: "리스트 + 현실성", ctrGrade: "B", ctrEstimate: "3~6%" },
  { title: "회사 다니면서 월 500만원? 가능합니다 (증거 있음)", technique: "높은 목표 + 증거 약속", ctrGrade: "C", ctrEstimate: "3~5%" },
  { title: "퇴근 후 부업 완벽 가이드: 시작부터 월 300만원까지", technique: "가이드형 + 숫자", ctrGrade: "C", ctrEstimate: "2~5%" },
];

export const MOCK_THUMBNAIL_TEXTS = [
  "월 300만원 추가 수입",
  "퇴근 후 2시간",
  "실제 통장 인증",
  "99%가 모르는 방법",
  "직장인 부업 끝판왕",
];

// ─── 채널 성장 전략 mock ───

export interface ChannelStrategy {
  weeklyPlan: { day: string; action: string; reason: string }[];
  nicheKeywords: { keyword: string; competition: "낮음" | "중간" | "높음"; volume: string; opportunity: string }[];
  growthTips: string[];
}

export const MOCK_CHANNEL_STRATEGY: ChannelStrategy = {
  weeklyPlan: [
    { day: "월요일", action: "메인 콘텐츠 촬영 (10분 영상)", reason: "월요일 업로드 영상은 주중 검색 트래픽 최대 활용" },
    { day: "화요일", action: "메인 영상 편집 + 업로드", reason: "화요일 저녁 7시가 직장인 타겟 최적 업로드 시간" },
    { day: "수요일", action: "쇼츠 2개 촬영 (메인 영상 핵심 클립)", reason: "메인 영상의 핵심 부분을 쇼츠로 재활용 → 채널 유입 경로 확대" },
    { day: "목요일", action: "쇼츠 업로드 + 커뮤니티 게시물", reason: "목요일은 쇼츠 알고리즘이 가장 활성화되는 요일" },
    { day: "금요일", action: "댓글 소통 + 다음 주 기획", reason: "금요일 댓글 소통은 커뮤니티 충성도를 높이고 알고리즘 가점" },
    { day: "토요일", action: "트렌드 리서치 + 경쟁 채널 분석", reason: "주말에 경쟁자 분석으로 다음 주 콘텐츠 방향 설정" },
    { day: "일요일", action: "다음 주 스크립트 작성", reason: "일요일 저녁 스크립트 완성 → 월요일 바로 촬영 가능" },
  ],
  nicheKeywords: [
    { keyword: "퇴근 후 부업 초보", competition: "낮음", volume: "월 12,000", opportunity: "검색량 대비 콘텐츠 부족 — 선점 기회" },
    { keyword: "직장인 스마트스토어", competition: "중간", volume: "월 8,500", opportunity: "경험담 중심 콘텐츠로 차별화 가능" },
    { keyword: "월급 외 수입 만들기", competition: "낮음", volume: "월 6,200", opportunity: "동기부여 + 방법론 조합으로 높은 시청 유지율" },
    { keyword: "퇴근 후 2시간 활용법", competition: "낮음", volume: "월 4,800", opportunity: "시간 제약 공감형 콘텐츠 블루오션" },
    { keyword: "직장인 디지털 노마드", competition: "중간", volume: "월 9,300", opportunity: "라이프스타일 콘텐츠와 결합 시 바이럴 가능성 높음" },
    { keyword: "부업 자동화 방법", competition: "낮음", volume: "월 3,500", opportunity: "AI 도구 활용법과 연계 가능" },
    { keyword: "N잡러 현실", competition: "낮음", volume: "월 5,100", opportunity: "현실적 스토리텔링으로 공감 유발" },
    { keyword: "온라인 수입 후기", competition: "중간", volume: "월 7,200", opportunity: "실제 수익 인증 시 신뢰도 극대화" },
    { keyword: "재테크 초보 가이드", competition: "높음", volume: "월 22,000", opportunity: "구독자 확보용 — 초보 타겟 유입 경로" },
    { keyword: "콘텐츠 수익화", competition: "중간", volume: "월 11,000", opportunity: "크리에이터 타겟 + 교차 시청 기대" },
    { keyword: "무자본 창업", competition: "중간", volume: "월 15,000", opportunity: "저비용 창업 경험담으로 차별화" },
    { keyword: "스마트스토어 자동화", competition: "낮음", volume: "월 4,200", opportunity: "AI 도구 리뷰와 조합 시 높은 관심" },
    { keyword: "유튜브 수익 공개", competition: "높음", volume: "월 18,000", opportunity: "수익 인증은 항상 높은 클릭률" },
    { keyword: "직장인 투잡 추천", competition: "낮음", volume: "월 6,800", opportunity: "추천 리스트 형태로 쉽게 구성 가능" },
    { keyword: "파이프라인 수입", competition: "낮음", volume: "월 2,900", opportunity: "개념 설명 + 구축 방법 시리즈 가능" },
    { keyword: "디지털 상품 판매", competition: "낮음", volume: "월 3,800", opportunity: "실제 판매 경험 콘텐츠로 차별화" },
    { keyword: "블로그 수익화", competition: "중간", volume: "월 8,100", opportunity: "블로그→유튜브 교차 유입 전략" },
    { keyword: "20대 재테크", competition: "높음", volume: "월 25,000", opportunity: "젊은 층 타겟 구독자 확보" },
    { keyword: "PDF 전자책 만들기", competition: "낮음", volume: "월 2,400", opportunity: "실전 튜토리얼로 높은 시청 유지율" },
    { keyword: "자동수입 구조", competition: "낮음", volume: "월 3,100", opportunity: "시스템 구축 시리즈로 장기 시청자 확보" },
  ],
  growthTips: [
    "첫 30개 영상은 쇼츠와 긴 영상을 1:1 비율로 올리세요. 쇼츠로 유입, 긴 영상으로 구독 전환.",
    "매 영상 처음 48시간 내 댓글 전부 답글 달기 — 알고리즘이 '활성 채널'로 인식합니다.",
    "경쟁 채널의 인기 영상 상위 10개를 분석해서 제목/썸네일 패턴을 벤치마킹하세요.",
    "커뮤니티 게시물을 주 2회 이상 올리면 구독자 유지율이 40% 증가합니다.",
    "영상 설명란에 챕터(타임스탬프)를 넣으면 검색 노출이 2배 증가합니다.",
  ],
};

// ─── 채널 톤앤매너 분석 mock ───

export interface ToneAnalysis {
  detectedTone: string;
  characteristics: string[];
  samplePhrases: string[];
  recommendation: string;
}

export const MOCK_TONE_ANALYSIS: ToneAnalysis = {
  detectedTone: "친근한 반말 + 유머러스",
  characteristics: [
    "반말 사용 (\"~거든요\", \"~잖아요\" 스타일의 편안한 존댓말 혼용)",
    "유머와 자기비하를 적절히 섞어 친근감 형성",
    "핵심 포인트에서는 진지한 톤으로 전환하여 신뢰감 부여",
    "시청자를 '형', '누나', '여러분' 대신 '당신'으로 지칭하는 독특한 스타일",
  ],
  samplePhrases: [
    "솔직히 저도 처음에는 이게 된다고? 했거든요.",
    "근데 진짜 해보니까... 아 이건 사기 아닌가 싶을 정도예요.",
    "여기서 중요한 게 하나 있는데, 이거 놓치면 진짜 손해봐요.",
  ],
  recommendation:
    "현재 톤은 20~30대 직장인 타겟에 매우 적합합니다. 이 톤을 유지하되, Hook 부분에서만 좀 더 강한 긴박감을 추가하면 이탈률이 낮아집니다.",
};

// ─── 바이럴랩 스크립트 코칭 코멘트 mock ───

export interface ScriptSection {
  label: string;
  timestamp: string;
  text: string;
  coaching: string;
}

export const MOCK_SCRIPT_SECTIONS: ScriptSection[] = [
  {
    label: "Hook",
    timestamp: "0:00~0:15",
    text: "여러분, 솔직히 말해볼게요. 저도 6개월 전까지 월급만으로 살았습니다. 그런데 지금 이 순간에도 제 계좌에는 자는 동안 돈이 들어오고 있어요.",
    coaching: "후킹의 핵심은 '첫 3초에 가장 강한 문장'입니다. 현재 구조는 12초째에 핵심 문장이 나옵니다. '자는 동안 돈이 들어온다'를 맨 앞으로 옮기세요.",
  },
  {
    label: "공감대 형성",
    timestamp: "0:15~1:30",
    text: "매달 월급날만 기다리면서 \"이번 달도 빠듯하다\" 한숨 쉬는 분들 많으시죠? 저도 정확히 그랬습니다. 회사에서는 야근하고, 주말에는 쉬고 싶고... 부업할 시간도 체력도 없다고 생각했어요.",
    coaching: "공감 형성은 시청자가 '이 사람이 내 상황을 이해하는구나'라고 느끼게 합니다. 여기서 구체적 월급 금액(예: 230만원)을 언급하면 공감 강도가 2배 올라갑니다.",
  },
  {
    label: "핵심 내용",
    timestamp: "1:30~7:00",
    text: "첫 번째 방법: 스마트스토어 자동화입니다. AI 도구를 활용하면 상품 등록부터 상세페이지까지 자동으로 만들 수 있습니다...",
    coaching: "핵심 내용이 5분 30초로 적절합니다. 각 방법 사이에 '리텐션 후크'를 넣으세요. 예: '두 번째 방법이 진짜 핵심인데요...' 이런 문장이 시청 유지율을 15% 높입니다.",
  },
  {
    label: "반전/클라이맥스",
    timestamp: "7:00~9:00",
    text: "근데 여기서 중요한 포인트가 하나 있습니다. 이 세 가지를 동시에 하면 안 됩니다...",
    coaching: "반전 구간은 100만뷰 영상의 핵심 패턴입니다. '동시에 하면 안 된다'는 예상을 뒤집는 조언으로 매우 좋습니다. 여기에 실패 경험을 추가하면 진정성이 올라갑니다.",
  },
  {
    label: "CTA",
    timestamp: "9:00~10:00",
    text: "이 영상이 도움이 됐다면 구독과 좋아요 부탁드립니다...",
    coaching: "CTA는 '구독'만 요청하지 말고 '참여'를 유도하세요. '댓글로 1번 남겨주세요', '어떤 방법이 제일 끌리는지 투표해주세요' 등. 참여형 CTA는 알고리즘 가점이 큽니다.",
  },
];

// ─── 생성 기록 mock ───

export const MOCK_GENERATION_HISTORY = [
  {
    id: "gen-001",
    productType: "sellerboost" as const,
    title: "프리미엄 무선 블루투스 이어폰 상세페이지",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    score: 87,
  },
  {
    id: "gen-002",
    productType: "sellerboost" as const,
    title: "오가닉 그린티 클렌징폼 상세페이지",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    score: 82,
  },
  {
    id: "gen-003",
    productType: "virallab" as const,
    title: "직장인 퇴근 후 월 300만원 버는 방법",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    score: 92,
  },
  {
    id: "gen-004",
    productType: "virallab" as const,
    title: "1인 가구 자취 꿀팁 TOP 10",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    score: 78,
  },
  {
    id: "gen-005",
    productType: "sellerboost" as const,
    title: "실리콘 주방 조리도구 5종 세트",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    score: 85,
  },
];

// ─── 스트리밍 시뮬레이션 ───

export async function simulateStreaming(
  text: string,
  onChunk: (chunk: string) => void,
  options?: { chunkSize?: number; delay?: number }
): Promise<void> {
  const { chunkSize = 3, delay = 30 } = options ?? {};
  const chars = Array.from(text);

  for (let i = 0; i < chars.length; i += chunkSize) {
    const chunk = chars.slice(i, i + chunkSize).join("");
    onChunk(chunk);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

// ─── 명언 ───

export const QUOTE = {
  text: "속도가 곧 해자다. 내일은 없다. 오늘 시작하라.",
  author: "ANTIGRAVITY × CLAUDE / PROJECT TITAN",
};
