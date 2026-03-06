import { withAuth, checkCredits, checkFeature, deductCredit } from "@/lib/api-helpers";
import { withDate } from "@/lib/prompt";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `당신은 다양한 쇼핑 플랫폼에서 수천 건의 리뷰를 작성해본 체험단 전문 리뷰어입니다.

핵심 원칙:
1. AI가 쓴 티가 절대 나면 안 됩니다. 사람이 직접 사용하고 쓴 것처럼 자연스럽게.
2. "강력 추천합니다", "매우 만족합니다", "대만족" 같은 AI 뻔한 표현 금지.
3. 구체적 경험담으로 확장하세요. "음질 좋음" → "출퇴근 지하철에서 써봤는데 옆사람 통화 소리가 안 들릴 정도"
4. 별점에 따라 톤을 조절하세요:
   - 5점: 칭찬 위주 + 사소한 아쉬운 점 1개 (더 자연스러움)
   - 4점: 전반적 만족 + 개선 바라는 점
   - 3점: 장단점 균형
   - 2점: 아쉬운 점 위주 + 그래도 괜찮은 점 1개
   - 1점: 구체적 불만 (하지만 악성은 X)
5. 플랫폼별 스타일:
   - 네이버 스마트스토어: 이모지 적당히, "~요" 체, 사진 언급("사진처럼~"), 재구매 의사 언급
   - 쿠팡: 간결 실용적, 배송 언급, 가성비 비교, 로켓배송 언급 가능
   - 11번가: 꼼꼼한 스타일, 상세한 사용 후기
   - 올리브영: 사용감/발림성/향/텍스처 중심, 피부타입 언급
   - 무신사: 착용감/핏/사이즈 정보 필수, 평소 사이즈 언급
   - 오늘의집: 인테리어 분위기, 조립 난이도, 공간 활용

6. 리뷰 포맷 규칙 (매우 중요):
   - 이모지를 적극 활용하여 섹션을 구분하세요
   - 줄바꿈을 충분히 넣어 가독성을 높이세요
   - 아래와 같은 구조로 작성하세요:

   📦 제목 (이모지 + 핵심 한줄)

   ✨ 첫인상 / 개봉기
   첫인상에 대한 1~2문장

   💡 사용 후기
   실제 사용 경험 2~3문장

   👍 장점
   • 장점1
   • 장점2
   • 장점3

   👎 아쉬운 점
   • 아쉬운 점 (자연스럽게 1~2개)

   📝 총평
   마무리 한줄 + 재구매/추천 의사

   - 위 구조를 반드시 따르되, 섹션 이모지와 제목은 자유롭게 변형 가능
   - 딱딱한 나열이 아니라 경험담 속에 자연스럽게 녹여서 작성
   - 리뷰 길이 설정에 맞게 각 섹션의 분량을 조절

반드시 아래 형식으로 리뷰 3개를 출력하세요. 다른 텍스트 없이 이 형식만 사용:

===REVIEW_1===
[제목] 리뷰 제목
[스타일] 이 리뷰의 특징 한줄
[본문]
리뷰 본문 내용

===REVIEW_2===
[제목] 리뷰 제목
[스타일] 이 리뷰의 특징 한줄
[본문]
리뷰 본문 내용

===REVIEW_3===
[제목] 리뷰 제목
[스타일] 이 리뷰의 특징 한줄
[본문]
리뷰 본문 내용`;

export async function POST(request: Request) {
  return withAuth(async ({ profile, supabase }) => {
    checkFeature(profile, "review-generator");
    checkCredits(profile);

    const body = await request.json();
    const { productName, platform, rating, memo, length, tone } = body;

    if (!productName || !platform || !rating || !memo) {
      return Response.json(
        { error: "상품명, 플랫폼, 별점, 메모는 필수입니다" },
        { status: 400 }
      );
    }

    const lengthMap: Record<string, string> = {
      short: "3~4줄 간결하게",
      medium: "8~12줄 적당히 상세하게",
      long: "20줄 이상 블로그급으로 상세하게, 사용 경험을 풍부하게",
    };
    const lengthGuide = lengthMap[length as string] || lengthMap["medium"]!;

    const toneMap: Record<string, string> = {
      honest: "솔직담백한 톤, 꾸미지 않은 느낌",
      friendly: "친근하고 수다스러운 톤, 친구한테 추천하는 느낌",
      professional: "꼼꼼하고 분석적인 톤, 전문 리뷰어 느낌",
    };
    const toneGuide = toneMap[tone as string] || toneMap["friendly"]!;

    const userPrompt = `다음 상품의 리뷰 3종을 작성해주세요. 각각 다른 스타일로 작성하세요.

상품명: ${productName}
플랫폼: ${platform}
별점: ${rating}점 / 5점
내 사용 메모: ${memo}
리뷰 길이: ${lengthGuide}
톤앤매너: ${toneGuide}

주의: 내 메모를 핵심으로 활용하되, 실제 경험담처럼 구체적으로 살을 붙여주세요. 완전히 없는 내용을 날조하지 마세요.
3개의 리뷰는 서로 말투와 초점이 달라야 합니다.`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: withDate(SYSTEM_PROMPT),
      messages: [{ role: "user", content: userPrompt }],
    });

    const firstBlock = response.content[0];
    const text = firstBlock && firstBlock.type === "text" ? firstBlock.text : "";

    // ===REVIEW_N=== 구분자로 파싱
    const reviewBlocks = text.split(/===REVIEW_\d+===/).filter((b) => b.trim());
    if (reviewBlocks.length === 0) {
      return Response.json(
        { error: "AI 응답을 파싱할 수 없습니다" },
        { status: 500 }
      );
    }

    const reviews = reviewBlocks.map((block) => {
      const titleMatch = block.match(/\[제목\]\s*(.+)/);
      const styleMatch = block.match(/\[스타일\]\s*(.+)/);
      const contentMatch = block.match(/\[본문\]\s*([\s\S]+)/);
      return {
        title: titleMatch?.[1]?.trim() ?? "",
        style: styleMatch?.[1]?.trim() ?? "",
        content: contentMatch?.[1]?.trim() ?? block.trim(),
      };
    });

    const parsed = { reviews };

    await deductCredit(profile, supabase);

    return Response.json(parsed);
  });
}
