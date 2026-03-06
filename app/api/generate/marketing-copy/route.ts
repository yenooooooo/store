import { withAuth, checkCredits, checkFeature, deductCredit } from "@/lib/api-helpers";
import { withDate } from "@/lib/prompt";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `당신은 네이버 스마트스토어 상위 1% 판매자 출신의 마케팅 카피라이터입니다.
상품 정보를 받으면 3가지 채널에 최적화된 마케팅 카피를 생성합니다.

응답은 반드시 다음 JSON 형식으로만 출력하세요. 설명 없이 JSON만 출력:
{
  "instagram": "인스타그램 홍보 문구 (해시태그 포함, 이모지 사용, 줄바꿈으로 가독성 확보)",
  "blogReview": "네이버 블로그 체험단 후기 초안 (500자 이상, 자연스러운 리뷰 톤, 실사용 경험 느낌)",
  "powerLink": ["파워링크 광고 문구 1 (15~25자)", "파워링크 광고 문구 2 (15~25자)", "파워링크 광고 문구 3 (15~25자)"]
}

작성 기준:
- instagram: 이모지와 해시태그를 적극 활용, 감성적이고 트렌디한 톤, CTA 포함
- blogReview: 실제 구매자가 쓴 것처럼 자연스러운 후기, 장단점 언급, 구매 동기→사용 경험→추천 흐름
- powerLink: 짧고 임팩트 있는 광고 카피, 클릭 유도, 핵심 베네핏 강조`;

export async function POST(request: Request) {
  return withAuth(async ({ profile, supabase }) => {
    checkFeature(profile, "marketing-copy");
    checkCredits(profile);

    const body = await request.json();
    const { productName, features, targetAudience } = body;

    if (!productName || typeof productName !== "string" || productName.trim().length < 2) {
      return Response.json({ error: "상품명을 2자 이상 입력해주세요" }, { status: 400 });
    }

    if (!Array.isArray(features) || features.filter((f: string) => f.trim()).length === 0) {
      return Response.json({ error: "핵심 특징을 1개 이상 입력해주세요" }, { status: 400 });
    }

    const validFeatures = features.filter((f: string) => f.trim());

    let userPrompt = `다음 상품의 마케팅 카피를 생성해주세요:

상품명: ${productName.trim()}
핵심 특징:
${validFeatures.map((f: string, i: number) => `${i + 1}. ${f.trim()}`).join("\n")}`;

    if (targetAudience && typeof targetAudience === "string" && targetAudience.trim()) {
      userPrompt += `\n타겟 고객: ${targetAudience.trim()}`;
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: withDate(SYSTEM_PROMPT),
      messages: [{ role: "user", content: userPrompt }],
    });

    await deductCredit(profile, supabase);

    const responseText = response.content[0]?.type === "text" ? response.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: "마케팅 카피를 생성할 수 없습니다" }, { status: 500 });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return Response.json(parsed);
  });
}
