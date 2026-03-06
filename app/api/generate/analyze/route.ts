import { withAuth, checkCredits, checkFeature, deductCredit } from "@/lib/api-helpers";
import { withDate } from "@/lib/prompt";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `당신은 네이버 쇼핑 데이터 분석 전문가이자 이커머스 컨설턴트입니다.
10년간 네이버 스마트스토어, 쿠팡, 11번가 등 국내 주요 마켓플레이스의 검색 알고리즘과 경쟁 구도를 분석해왔습니다.

사용자가 입력한 키워드를 기반으로 해당 키워드의 네이버 쇼핑 경쟁 분석 보고서를 작성합니다.
실제 시장 데이터에 기반한 현실적이고 구체적인 분석을 제공하세요.

반드시 아래 JSON 형식으로만 출력하세요. JSON 외 텍스트 금지:
{
  "keyword": "입력된 키워드",
  "totalProducts": 15000,
  "competitors": [
    { "rank": 1, "name": "상품명", "seller": "판매자명", "price": "39,900원", "reviewCount": 1234, "rating": 4.8 },
    { "rank": 2, "name": "상품명", "seller": "판매자명", "price": "29,900원", "reviewCount": 567, "rating": 4.6 }
  ],
  "topKeywords": [
    { "keyword": "관련 키워드", "count": 8, "importance": "high" },
    { "keyword": "관련 키워드2", "count": 5, "importance": "medium" }
  ],
  "gapAnalysis": [
    { "category": "분석 카테고리", "avgScore": 72, "recommendation": "구체적 개선 포인트" }
  ],
  "insights": ["핵심 인사이트1", "핵심 인사이트2", "핵심 인사이트3"]
}

규칙:
1. competitors는 상위 10개 상품을 현실적인 가격대와 리뷰 수로 작성
2. topKeywords는 20개, importance는 "high"/"medium"/"low" 중 하나
3. gapAnalysis는 6개 카테고리 (SEO 키워드 적합도, 제목 최적화, 특징 설명 상세도, CTA 강도, 리뷰 활용, 가격 경쟁력)
4. insights는 3~5개, 판매자가 즉시 실행할 수 있는 구체적 전략 제시
5. avgScore는 0~100 사이 현실적 점수
6. totalProducts는 해당 키워드의 예상 경쟁 상품 수`;

export async function POST(request: Request) {
  return withAuth(async ({ profile, supabase }) => {
    checkFeature(profile, "analyze");
    checkCredits(profile);

    const { keyword } = await request.json();
    if (!keyword || typeof keyword !== "string" || keyword.trim().length < 2) {
      return Response.json({ error: "키워드를 2자 이상 입력해주세요" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      system: withDate(SYSTEM_PROMPT),
      messages: [
        {
          role: "user",
          content: `다음 네이버 쇼핑 키워드의 경쟁 분석 보고서를 작성해주세요:\n\n키워드: ${keyword.trim()}`,
        },
      ],
    });

    await deductCredit(profile, supabase);

    const responseText =
      response.content[0]?.type === "text" ? response.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json(
        { error: "분석 결과를 생성할 수 없습니다" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return Response.json(parsed);
  });
}
