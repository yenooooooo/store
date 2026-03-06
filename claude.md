# 🚀 PROJECT TITAN — claude.md 지침서
**셀러부스트 AI & 바이럴랩 AI 개발 전용 AI 행동 지침**
> Antigravity × Claude CLI 프로젝트 | 최종 목표: 14일 런칭 → 6개월 MRR 1,000만원

---

## 항상 마지막 설명은 한글로해라

## 🧠 너는 누구인가 (AI 역할 정의)

너는 **시니어 풀스택 개발자 + 스타트업 CTO**다.
빚 2억을 진 상태에서 생존을 위해 만드는 제품이다.
코드는 **실제 배포 가능한 프로덕션 품질**로 작성한다.
절대 교육용 예시 코드나 주석 투성이 코드를 쓰지 않는다.
완벽보다 **속도가 우선**이지만, 버그가 있으면 수익이 0원이다.

---

## 📁 프로젝트 구조 원칙

```
project-root/
├── app/                    # Next.js 14 App Router (필수)
│   ├── (auth)/             # 인증 관련 라우트 그룹
│   ├── (dashboard)/        # 로그인 후 대시보드
│   ├── api/                # API Route Handlers
│   └── globals.css
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트 (직접 수정 금지)
│   └── [feature]/          # 기능별 컴포넌트 폴더
├── lib/
│   ├── claude.ts           # Claude API 호출 함수 모음
│   ├── supabase.ts         # Supabase 클라이언트
│   └── utils.ts            # 공통 유틸
├── types/
│   └── index.ts            # 전역 TypeScript 타입
└── claude.md               # 이 파일
```

---

## ⚙️ 기술 스택 (절대 변경 금지)

| 영역 | 기술 | 이유 |
|------|------|------|
| Framework | Next.js 14 (App Router) | Vercel 무료 배포, SSR/SSG 지원 |
| Language | TypeScript (strict mode) | 런타임 버그 사전 차단 |
| Styling | Tailwind CSS + shadcn/ui | 빠른 대기업 느낌 UI |
| AI | Claude API (claude-sonnet-4-20250514) | 최고 품질 한국어 |
| DB | Supabase (PostgreSQL + Auth + Storage) | 무료 시작 가능 |
| 결제 | 토스페이먼츠 | 한국 표준, 연동 쉬움 |
| 배포 | Vercel | GitHub 연동 자동 배포 |
| 상태관리 | Zustand | Redux 대비 초간단 |
| 이메일 | Resend | 무료 100개/일 |

---

## 🤖 Claude API 사용 규칙

### 모델 선택
```typescript
// 항상 이 모델 사용
const MODEL = "claude-sonnet-4-20250514";
```

### 스트리밍 필수 사용 (응답 시간 체감 개선)
```typescript
// ✅ 올바른 방식 — 항상 스트리밍으로 응답
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function streamGenerate(prompt: string) {
  const stream = client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });
  return stream;
}
```

### 비용 절감 규칙 (생존에 직결)
```typescript
// 1. 시스템 프롬프트는 짧게 유지 (토큰 = 돈)
// 2. 동일한 입력 결과는 Redis로 캐싱 (30분 TTL)
// 3. max_tokens는 필요한 만큼만 설정
// 4. 무료 플랜은 하루 최대 5회 제한 (DB에서 체크)

// 비용 추정: claude-sonnet input $3/M, output $15/M 토큰
// 상세페이지 1회 생성 ≈ 약 2000 토큰 = 약 30원
// 구독료 9,900원 / 30원 = 330회까지 수익
```

### 프롬프트 작성 원칙
```typescript
// 셀러부스트용 시스템 프롬프트 예시
const SELLER_SYSTEM_PROMPT = `
당신은 네이버 스마트스토어 상위 1% 판매자 출신의 상품 마케팅 전문가입니다.
전환율을 높이는 상세페이지 카피 작성이 전문입니다.
응답은 반드시 다음 JSON 형식으로만 출력하세요. 설명 없이 JSON만 출력:
{
  "title": "SEO 최적화 상품명",
  "subtitle": "핵심 가치 한 줄",
  "features": ["특징1", "특징2", "특징3", "특징4", "특징5"],
  "scenario": "사용 시나리오 2~3문장",
  "cta": "구매 유도 문구",
  "seoKeywords": ["키워드1", "키워드2", "키워드3"],
  "conversionScore": 85,
  "improvements": ["개선점1", "개선점2", "개선점3"]
}
`;
```

---

## 🗄️ Supabase 데이터베이스 스키마

### 핵심 테이블 (초기 MVP)

```sql
-- 사용자 (Supabase Auth와 연동)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'business')),
  credits_used INTEGER DEFAULT 0,
  credits_limit INTEGER DEFAULT 5,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 생성 기록 (셀러부스트)
CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL, -- 'sellerboost' | 'virallab'
  input_data JSONB NOT NULL,
  output_data JSONB NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 구독 정보
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  toss_billing_key TEXT, -- 토스페이먼츠 자동결제 키
  next_billing_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 정책 (보안 필수)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can read own data" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users can insert own generations" ON generations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users can read own generations" ON generations FOR SELECT USING (auth.uid() = user_id);
```

---

## 🎨 UI/UX 설계 원칙

### 대기업 느낌을 내는 필수 요소
```
1. 로딩 상태: 항상 스켈레톤 UI 사용 (spinner 금지)
2. 에러 처리: toast 알림으로 친절하게 (콘솔 에러 노출 금지)
3. 빈 상태: Empty State 컴포넌트 항상 구현
4. 반응형: 모바일 퍼스트 (판매자들은 모바일로 접속)
5. 애니메이션: framer-motion으로 부드러운 전환
6. 색상 팔레트: 파란 계열 주색 + 흰 배경 (신뢰감)
```

### 컴포넌트 작성 규칙
```typescript
// ✅ 올바른 컴포넌트 구조
interface Props {
  // props 타입 항상 명시
}

export default function ComponentName({ prop }: Props) {
  // 1. hooks
  // 2. 파생 상태
  // 3. 핸들러
  // 4. 조기 반환 (로딩/에러)
  // 5. JSX 반환
}
```

### 절대 하면 안 되는 것
```
❌ any 타입 사용
❌ console.log를 프로덕션 코드에 남기기
❌ API 키를 클라이언트 컴포넌트에서 직접 사용
❌ 에러 처리 없는 async/await
❌ 무한 스크롤 없이 대량 데이터 조회
❌ 이미지 next/image 안 쓰기
```

---

## 💳 결제 연동 (토스페이먼츠)

### 구독 결제 플로우
```
1. 사용자가 플랜 선택 → 빌링키 발급 (카드 등록)
2. 빌링키를 Supabase에 암호화 저장
3. 매월 자동 결제 (서버에서 cron job)
4. 결제 성공 → plan 업데이트 → 이메일 발송
5. 결제 실패 → 3일간 재시도 → 플랜 다운그레이드
```

```typescript
// 빌링키 발급 API 예시
// app/api/payments/billing-key/route.ts
export async function POST(request: Request) {
  const { authKey, customerKey } = await request.json();
  
  const response = await fetch(
    "https://api.tosspayments.com/v1/billing/authorizations/issue",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ":").toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authKey, customerKey }),
    }
  );
  // billingKey를 supabase에 저장
}
```

---

## 🔒 보안 체크리스트

모든 API Route에 다음을 반드시 확인:

```typescript
// app/api/[any]/route.ts 기본 보일러플레이트
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  // 1. 인증 확인
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  // 2. 크레딧 확인
  const { data: profile } = await supabase
    .from("profiles")
    .select("credits_used, credits_limit, plan")
    .eq("id", session.user.id)
    .single();
  
  if (profile.credits_used >= profile.credits_limit && profile.plan === "free") {
    return new Response("Credit limit exceeded", { status: 429 });
  }

  // 3. Rate limiting (분당 10회 제한)
  // Redis 또는 Upstash Rate Limit 사용
  
  // 4. Input validation (zod 사용)
  // 5. 실제 비즈니스 로직
  // 6. 크레딧 차감
}
```

### 환경변수 목록 (.env.local)
```bash
# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Toss Payments
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_...
TOSS_SECRET_KEY=test_sk_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📊 SEO 및 성능 최적화

### 필수 메타데이터 (랜딩페이지)
```typescript
// app/layout.tsx
export const metadata = {
  title: "셀러부스트 AI - 스마트스토어 상세페이지 AI 자동 생성",
  description: "AI가 5초 만에 전환율 높은 상세페이지를 써드립니다. 스마트스토어 700만 판매자의 필수 도구.",
  keywords: ["스마트스토어", "상세페이지", "AI", "자동생성", "셀러"],
  openGraph: {
    title: "셀러부스트 AI",
    description: "AI 상세페이지 생성기",
    images: ["/og-image.png"],
  },
};
```

### 성능 목표
```
Lighthouse 점수: 90+ (Core Web Vitals 통과)
FCP: < 1.5초
LCP: < 2.5초
API 응답: < 500ms (스트리밍 제외)
```

---

## 🚦 개발 우선순위 (MVP 기준)

### Must Have (런칭 필수)
```
✅ 회원가입/로그인 (Google OAuth)
✅ 핵심 생성 기능 1개 (상세페이지 or 스크립트)
✅ 결과 복사 버튼
✅ 무료 크레딧 제한
✅ 결제 페이지 (토스페이먼츠)
✅ 랜딩페이지 (전환 최적화)
```

### Should Have (D+7 이후)
```
🔄 생성 기록 저장/조회
🔄 A/B 변형 생성
🔄 점수/분석 기능
🔄 이메일 환영 메일
```

### Nice to Have (D+30 이후)
```
💡 경쟁사 분석 기능
💡 팀 협업 기능
💡 API 외부 제공
💡 크롬 익스텐션
```

---

## 파일이 커지지않게 항상 claude 가 읽을수있을만큼의 분량만 파일, 넘어가면 꼭 구조분리해서 오류가 생기지않게 작업한다 명시

## 🐛 에러 처리 패턴

```typescript
// lib/errors.ts — 프로젝트 전체 에러 처리 표준
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
  }
}

// API Route에서 사용
try {
  // 로직
} catch (error) {
  if (error instanceof AppError) {
    return Response.json({ error: error.message, code: error.code }, { status: error.statusCode });
  }
  console.error("[UNHANDLED]", error);
  return Response.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
}
```

---

## 📝 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
perf: 성능 개선
ui: UI/스타일 변경
refactor: 리팩토링
deploy: 배포 관련
```

---

## ⚡ 바이브코딩 시 Claude에게 지시하는 방법

### 기능 구현 요청 시 이 포맷 사용:
```
[기능명]: [설명]
- 파일 위치: app/api/.../route.ts
- 입력: {필드명: 타입}
- 출력: {필드명: 타입}
- 연동: Claude API (스트리밍) + Supabase (테이블명)
- 주의: [특별히 신경 써야 할 것]
```

### 예시:
```
상세페이지 생성 API 구현:
- 파일 위치: app/api/generate/detail-page/route.ts
- 입력: {productName: string, category: string, features: string[]}
- 출력: Server-Sent Events (스트리밍)
- 연동: Claude API (스트리밍) + Supabase (generations 테이블에 저장)
- 주의: 인증 체크 필수, 크레딧 차감 필수, 에러 시 롤백
```

---

## 🎯 최종 생존 목표

```
D+14  : 베타 런칭, 유료 결제 첫 발생
D+30  : MRR 50만원 (유료 50명)
D+60  : MRR 200만원 (Break-Even)
D+90  : MRR 500만원
D+180 : MRR 1,000만원+ → 빚 상환 시작
D+365 : 2억 전액 상환 완료
```

> **"코드 한 줄이 생존이다. 오늘 배포 안 하면 오늘 굶는다."**
