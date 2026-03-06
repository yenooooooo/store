import { withAuth, checkCredits, deductCredit } from "@/lib/api-helpers";
import { sellerboostInputSchema } from "@/lib/validations";
import { streamGenerate, claudeStreamToSSE } from "@/lib/claude";
import { withDate } from "@/lib/prompt";
import { getMarketInsight } from "@/lib/naver-api";

const SYSTEM_PROMPT = `당신은 네이버 스마트스토어 상위 0.1% 판매자 출신이자, 쿠팡·11번가까지 멀티채널로 월 매출 5억 이상을 기록한 상품 마케팅 전문가입니다.

당신의 전문 분야:
- 전환율 300% 이상 끌어올리는 상세페이지 카피라이팅
- 네이버 쇼핑 검색 알고리즘 최적화 (SEO)
- 구매 심리를 자극하는 설득 기법 (AIDA, PAS, 사회적 증거, 긴급성)
- 카테고리별 최적화된 상세페이지 구조 설계

작성 규칙:
1. 제목은 네이버 쇼핑 검색에 최적화된 키워드 조합으로 작성 (핵심키워드 앞배치)
2. 서브타이틀은 고객이 "이건 나를 위한 상품이다"라고 느끼게 감성적으로 작성
3. 특징은 "기능"이 아닌 "고객이 얻는 혜택" 중심으로 구체적 수치와 함께 작성
4. 시나리오는 타겟 고객의 하루를 따라가며 상품이 어떻게 삶을 바꾸는지 생생하게 묘사
5. CTA는 긴급성 + 혜택 + 사회적 증거를 결합하여 즉시 구매를 유도
6. SEO 키워드는 아래 제공된 "네이버 쇼핑 실시간 경쟁 키워드"를 반드시 참고하여 선정
7. 전환율 점수는 실제 업계 기준으로 냉정하게 평가 (80점 이상이면 상위 10% 수준)
8. 개선점은 "이렇게 바꾸면 +몇점" 형태로 구체적 액션 제시

네이버 쇼핑 SEO 최적화 필수 규칙:
- 상품명은 "메인키워드 + 서브키워드 + 상품 특성" 순서로 구성 (50자 이내)
- 핵심 키워드는 반드시 상품명 앞쪽 20자 이내에 배치
- 네이버 자동완성 검색어 패턴 활용: "[카테고리] 추천", "[카테고리] 인기", "[상품] 후기" 등
- 특수문자(★, ●, ▶) 사용 금지 — 네이버 검색 노출에 불이익
- "무료배송", "당일발송" 같은 쇼핑 의도 키워드를 seoKeywords에 포함
- 플랫폼별 차이: 네이버는 키워드 밀도 중시, 쿠팡은 상품명 간결성 중시, 11번가는 카테고리 적합성 중시

반드시 아래 JSON 형식으로만 출력하세요. JSON 외 텍스트 금지:
{
  "title": "SEO 최적화 상품명 (50자 이내, 핵심키워드 앞배치)",
  "subtitle": "고객의 마음을 사로잡는 한 줄 카피",
  "painPoints": ["타겟 고객의 고민1 (공감 유발)", "고민2", "고민3"],
  "solution": "이 상품이 위 고민을 어떻게 해결하는지 2~3문장",
  "features": ["혜택 중심 특징1 (구체적 수치 포함)", "특징2", "특징3", "특징4", "특징5"],
  "specs": [{"label": "스펙명1", "value": "스펙값1"}, {"label": "스펙명2", "value": "스펙값2"}, {"label": "스펙명3", "value": "스펙값3"}, {"label": "스펙명4", "value": "스펙값4"}],
  "scenario": "타겟 고객의 하루를 따라가는 생생한 사용 시나리오 3~4문장",
  "testimonial": "실제 구매자가 쓸 법한 생생한 후기 2~3문장 (자연스럽고 진정성 있게)",
  "faq": [{"q": "자주 묻는 질문1", "a": "명확한 답변1"}, {"q": "질문2", "a": "답변2"}, {"q": "질문3", "a": "답변3"}],
  "trustBadges": ["무료배송", "100% 정품 보장", "30일 교환/환불"],
  "cta": "강력한 구매 유도 한 줄 문구",
  "urgency": "긴급성을 자극하는 한 줄 (예: 오늘 주문 시 내일 도착!)",
  "seoKeywords": ["검색량 높은 키워드1", "키워드2", "키워드3", "키워드4", "키워드5"],
  "conversionScore": 85,
  "improvements": ["구체적 개선 액션1 (+예상 점수)", "개선2", "개선3"]
}`;

export async function POST(request: Request) {
  return withAuth(async ({ profile, supabase }) => {
    checkCredits(profile);

    const body = await request.json();
    const input = sellerboostInputSchema.parse(body);

    const platformLabel = {
      naver: "네이버 스마트스토어",
      coupang: "쿠팡",
      "11st": "11번가",
    }[input.platform];

    const categoryLabel = {
      fashion: "의류/패션",
      food: "식품",
      electronics: "전자기기",
      beauty: "뷰티/화장품",
      living: "생활/주방",
      sports: "스포츠/레저",
    }[input.category] || input.category;

    // 네이버 쇼핑 API로 실시간 경쟁 데이터 가져오기
    const marketInsight = await getMarketInsight(input.productName);

    let marketContext = "";
    if (marketInsight.competitorKeywords.length > 0) {
      marketContext += `\n\n[네이버 쇼핑 실시간 경쟁 데이터 — 반드시 참고]`;
      marketContext += `\n경쟁 상품에서 자주 사용되는 키워드: ${marketInsight.competitorKeywords.join(", ")}`;
      if (marketInsight.avgPrice > 0) {
        marketContext += `\n시장 평균 가격: ${marketInsight.avgPrice.toLocaleString()}원 (${marketInsight.priceRange.min.toLocaleString()}원 ~ ${marketInsight.priceRange.max.toLocaleString()}원)`;
      }
      if (marketInsight.topBrands.length > 0) {
        marketContext += `\n주요 경쟁 브랜드: ${marketInsight.topBrands.join(", ")}`;
      }
      if (marketInsight.topCategories.length > 0) {
        marketContext += `\n주요 카테고리: ${marketInsight.topCategories.join(" | ")}`;
      }
      marketContext += `\n→ 위 경쟁 키워드 중 관련성 높은 것을 seoKeywords에 반드시 포함하세요.`;
    }

    const userPrompt = `다음 상품의 전환율 극대화 상세페이지를 작성해주세요.

상품명: ${input.productName}
카테고리: ${categoryLabel}
판매 플랫폼: ${platformLabel}
핵심 특징:
${input.features.map((f, i) => `${i + 1}. ${f}`).join("\n")}
${input.targetAudience ? `\n타겟 고객: ${input.targetAudience}` : ""}

이 상품을 구매할 고객의 입장에서, 왜 이 상품이 경쟁 제품보다 나은지, 구매하면 삶이 어떻게 달라지는지에 초점을 맞춰 작성하세요.${
      input.reviewContext && input.reviewContext.length > 0
        ? `\n\n실제 구매 리뷰에서 추출한 고객 반응 (이 내용을 반영해 카피를 작성하세요):\n${input.reviewContext.map((r, i) => `${i + 1}. "${r}"`).join("\n")}`
        : ""
    }${marketContext}`;

    const stream = streamGenerate({
      systemPrompt: withDate(SYSTEM_PROMPT),
      userPrompt,
      maxTokens: 3000,
    });

    await deductCredit(profile, supabase);

    return new Response(claudeStreamToSSE(stream), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  });
}
