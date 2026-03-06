export interface TemplateData {
  productName: string;
  subtitle: string;
  painPoints: string[];
  solution: string;
  features: string[];
  specs: { label: string; value: string }[];
  scenario: string;
  testimonial: string;
  faq: { q: string; a: string }[];
  trustBadges: string[];
  cta: string;
  urgency: string;
  seoKeywords: string[];
  productImages: string[];
  brandColor: string;
}

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
}

export const TEMPLATES: TemplateInfo[] = [
  { id: "minimal", name: "미니멀 화이트", description: "깔끔한 화이트 베이스", thumbnail: "⬜", category: "기본" },
  { id: "premium", name: "프리미엄 다크", description: "럭셔리 다크 배경", thumbnail: "⬛", category: "고급" },
  { id: "vibrant", name: "비비드 컬러", description: "눈에 띄는 컬러풀", thumbnail: "🟧", category: "활기" },
  { id: "natural", name: "내추럴 소프트", description: "자연스러운 톤", thumbnail: "🟫", category: "자연" },
  { id: "tech", name: "테크 블루", description: "모던 IT 스타일", thumbnail: "🟦", category: "테크" },
  { id: "cute", name: "큐트 파스텔", description: "귀여운 파스텔 톤", thumbnail: "🩷", category: "귀여움" },
  { id: "luxury", name: "럭셔리 골드", description: "고급 브랜드 느낌", thumbnail: "🟡", category: "럭셔리" },
  { id: "fresh", name: "프레시 그린", description: "건강/식품에 최적", thumbnail: "🟩", category: "건강" },
  { id: "bold", name: "볼드 레드", description: "강렬한 임팩트", thumbnail: "🟥", category: "강렬" },
  { id: "soft", name: "소프트 그레이", description: "차분한 프로페셔널", thumbnail: "🩶", category: "차분" },
];
