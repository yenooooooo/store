import { withAuth, checkCredits, checkFeature, deductCredit } from "@/lib/api-helpers";
import { withDate } from "@/lib/prompt";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `당신은 유튜브 알고리즘과 클릭 심리를 완벽히 이해한 바이럴 제목 전문가입니다.

사용자의 영상 주제를 받아 다음 JSON으로만 응답하세요. 설명 없이 JSON만 출력:
{
  "titles": [
    {
      "title": "클릭을 유도하는 제목",
      "technique": "사용된 심리 기법 (예: 궁금증 유발, 숫자, 공포, 공감, 소외감, 변화+증거 등)",
      "ctrGrade": "S",
      "ctrEstimate": "8~12%"
    }
  ],
  "thumbnailTexts": ["썸네일에 넣을 임팩트 문구1", "문구2", "문구3", "문구4", "문구5"]
}

규칙:
- titles: 정확히 10개. 다양한 심리 기법을 사용하여 차별화
- ctrGrade: S(상위 5%), A(상위 15%), B(상위 30%), C(평균)
- ctrEstimate: 현실적인 예상 CTR 범위
- S등급 2~3개, A등급 3~4개, B등급 2~3개, C등급 1~2개로 분포
- 한국 유튜브 트렌드에 맞는 표현 사용
- thumbnailTexts: 짧고 임팩트 있는 문구 5개 (썸네일 위에 큰 글씨로 들어갈 것)`;

export async function POST(request: Request) {
  return withAuth(async ({ profile, supabase }) => {
    checkFeature(profile, "title-generator");
    checkCredits(profile);

    const { topic } = await request.json();
    if (!topic || typeof topic !== "string" || topic.trim().length < 2) {
      return Response.json({ error: "주제를 입력해주세요" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: withDate(SYSTEM_PROMPT),
      messages: [{ role: "user", content: `영상 주제: ${topic}` }],
    });

    await deductCredit(profile, supabase);

    const responseText = response.content[0]?.type === "text" ? response.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: "제목을 생성할 수 없습니다" }, { status: 500 });
    }

    return Response.json(JSON.parse(jsonMatch[0]));
  });
}
