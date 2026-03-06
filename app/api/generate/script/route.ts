import { withAuth, checkCredits, deductCredit } from "@/lib/api-helpers";
import { virallabInputSchema } from "@/lib/validations";
import { streamGenerate, claudeStreamToSSE } from "@/lib/claude";
import { withDate } from "@/lib/prompt";

const SYSTEM_PROMPT = `당신은 100만 구독자 유튜버 출신의 바이럴 콘텐츠 전문가입니다.
조회수를 극대화하는 스크립트 작성이 전문입니다.
응답은 반드시 다음 JSON 형식으로만 출력하세요. 설명 없이 JSON만 출력:
{
  "title": "영상 제목",
  "hook": "첫 15초 후킹 대본",
  "script": "전체 스크립트",
  "hookScore": 85,
  "thumbnailSuggestions": ["썸네일 문구1", "썸네일 문구2", "썸네일 문구3"],
  "titleVariants": ["제목 변형1", "제목 변형2", "제목 변형3"],
  "improvements": ["개선점1", "개선점2", "개선점3"]
}`;

export async function POST(request: Request) {
  return withAuth(async ({ profile, supabase }) => {
    checkCredits(profile);

    const body = await request.json();
    const input = virallabInputSchema.parse(body);

    const platformLabel = {
      youtube: "유튜브 일반 영상",
      shorts: "유튜브 쇼츠",
      reels: "인스타 릴스",
    }[input.platform];

    const userPrompt = `주제: ${input.topic}
타겟 시청자: ${input.targetAudience}
플랫폼: ${platformLabel}
영상 길이: ${input.duration}
${input.tone ? `톤앤매너: ${input.tone}` : ""}`;

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
