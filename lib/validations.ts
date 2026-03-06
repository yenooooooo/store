import { z } from "zod/v4";

export const sellerboostInputSchema = z.object({
  productName: z.string().min(1, "상품명을 입력해주세요").max(100),
  category: z.string().min(1, "카테고리를 선택해주세요"),
  features: z
    .array(z.string().min(1))
    .min(1, "특징을 1개 이상 입력해주세요")
    .max(5),
  targetAudience: z.string().max(200).optional(),
  platform: z.enum(["naver", "coupang", "11st"]),
  reviewContext: z.array(z.string()).max(10).optional(),
});

export const virallabInputSchema = z.object({
  topic: z.string().min(1, "주제를 입력해주세요").max(200),
  targetAudience: z.string().min(1, "타겟 시청자를 입력해주세요").max(200),
  platform: z.enum(["youtube", "shorts", "reels"]),
  duration: z.enum(["30s", "60s", "3min", "10min"]),
  tone: z.string().max(100).optional(),
});
