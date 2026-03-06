import { withAuth } from "@/lib/api-helpers";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  return withAuth(async () => {
    const { image } = await request.json();

    if (!image || typeof image !== "string") {
      return Response.json({ error: "이미지가 필요합니다" }, { status: 400 });
    }

    const base64Match = image.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!base64Match) {
      return Response.json({ error: "올바른 이미지 형식이 아닙니다" }, { status: 400 });
    }

    const mediaType = base64Match[1]! as "image/jpeg" | "image/png" | "image/gif" | "image/webp";
    const base64Data = base64Match[2]!;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64Data },
            },
            {
              type: "text",
              text: `이 상품 이미지를 분석해서 판매에 도움이 되는 핵심 특징 4~5개를 추출해주세요.
외관, 소재, 기능, 디자인 포인트 등을 구체적으로 작성하세요.
JSON 배열로만 응답하세요. 예: ["특징1", "특징2", "특징3", "특징4"]`,
            },
          ],
        },
      ],
    });

    const firstBlock = response.content[0];
    const text = firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
    const match = text.match(/\[[\s\S]*\]/);
    const features: string[] = match ? JSON.parse(match[0]) : [];

    return Response.json({ features });
  });
}
