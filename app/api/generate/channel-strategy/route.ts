import { withAuth, checkCredits, checkFeature, deductCredit } from "@/lib/api-helpers";
import { withDate } from "@/lib/prompt";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `당신은 유튜브 채널을 0에서 10만 구독자까지 성장시킨 경험이 있는 채널 성장 전략가입니다.

사용자의 채널 정보를 받아 다음 JSON으로만 응답하세요. 설명 없이 JSON만 출력:
{
  "weeklyPlan": [
    { "day": "월요일", "action": "구체적 행동", "reason": "왜 이 요일에 이 행동인지" }
  ],
  "nicheKeywords": [
    {
      "keyword": "틈새 키워드",
      "competition": "낮음",
      "volume": "월 3,500",
      "opportunity": "왜 이 키워드가 기회인지 한 줄 설명"
    }
  ],
  "growthTips": ["구체적이고 즉시 실행 가능한 성장 팁"]
}

규칙:
- weeklyPlan: 월~일 7일간 구체적 행동 계획. 각 요일별 최적 행동과 이유
- nicheKeywords: 정확히 20개. competition은 "낮음"/"중간"/"높음". 실제 검색 트렌드 기반으로 현실적인 volume 추정
- growthTips: 5개. "~하세요" 형태의 즉시 실행 가능한 조언. 구체적 수치 포함
- 채널 주제에 맞는 맞춤형 전략 제시`;

export async function POST(request: Request) {
  return withAuth(async ({ profile, supabase }) => {
    checkFeature(profile, "channel-strategy");
    checkCredits(profile);

    const { channelInfo } = await request.json();
    if (!channelInfo || typeof channelInfo !== "string" || channelInfo.trim().length < 2) {
      return Response.json({ error: "채널 정보를 입력해주세요" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      system: withDate(SYSTEM_PROMPT),
      messages: [{ role: "user", content: `채널 정보: ${channelInfo}\n\n이 채널에 맞는 성장 전략을 수립해주세요.` }],
    });

    await deductCredit(profile, supabase);

    const responseText = response.content[0]?.type === "text" ? response.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: "전략을 생성할 수 없습니다" }, { status: 500 });
    }

    return Response.json(JSON.parse(jsonMatch[0]));
  });
}
