import { withAuth, checkCredits, checkFeature, deductCredit } from "@/lib/api-helpers";
import { withDate } from "@/lib/prompt";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `당신은 100만뷰 이상 영상 10,000개의 후킹 패턴을 분석한 바이럴 콘텐츠 전문가입니다.

사용자가 제출한 영상 첫 15초 대본을 분석하여 다음 JSON으로만 응답하세요. 설명 없이 JSON만 출력:
{
  "score": 72,
  "dropOffPoints": [
    {
      "timestamp": "0:03",
      "text": "해당 구간의 텍스트",
      "risk": "high",
      "reason": "이탈 위험 이유와 구체적 개선 방향"
    }
  ],
  "improvedVersions": [
    {
      "version": "개선된 전체 15초 대본",
      "score": 91,
      "changes": "어떤 기법을 적용했는지 설명"
    }
  ],
  "radarData": [
    { "metric": "호기심 유발", "myScore": 65, "viralAvg": 88 },
    { "metric": "감정 자극", "myScore": 70, "viralAvg": 85 },
    { "metric": "구체성", "myScore": 55, "viralAvg": 90 },
    { "metric": "긴박감", "myScore": 40, "viralAvg": 82 },
    { "metric": "공감대", "myScore": 80, "viralAvg": 75 },
    { "metric": "시각적 묘사", "myScore": 45, "viralAvg": 78 }
  ]
}

분석 기준:
- score: 0~100. 80+ = 상위 10% 후킹, 90+ = 바이럴 가능성 높음
- dropOffPoints: 시청자가 이탈할 가능성이 높은 구간 2~4개 (risk: high/medium/low)
- improvedVersions: 서로 다른 후킹 기법(궁금증/공포/공감/충격)을 적용한 개선 버전 3개
- radarData: 6개 지표를 내 대본 vs 100만뷰 평균으로 비교. viralAvg는 75~90 사이로 현실적으로`;

export async function POST(request: Request) {
  return withAuth(async ({ profile, supabase }) => {
    checkFeature(profile, "hook-score");
    checkCredits(profile);

    const { text } = await request.json();
    if (!text || typeof text !== "string" || text.trim().length < 10) {
      return Response.json({ error: "대본을 10자 이상 입력해주세요" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: withDate(SYSTEM_PROMPT),
      messages: [{ role: "user", content: `다음 영상 첫 15초 대본을 분석해주세요:\n\n${text}` }],
    });

    await deductCredit(profile, supabase);

    const responseText = response.content[0]?.type === "text" ? response.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: "분석 결과를 생성할 수 없습니다" }, { status: 500 });
    }

    return Response.json(JSON.parse(jsonMatch[0]));
  });
}
