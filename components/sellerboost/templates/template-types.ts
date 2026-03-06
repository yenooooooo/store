export interface TemplateData {
  productName: string;
  subtitle: string;
  features: string[];
  scenario: string;
  cta: string;
  seoKeywords: string[];
  productImages: string[]; // base64 or URLs
  brandColor: string;
}

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  thumbnail: string; // emoji for now
  category: string;
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: "minimal",
    name: "미니멀 화이트",
    description: "깔끔하고 세련된 화이트 베이스",
    thumbnail: "⬜",
    category: "기본",
  },
  {
    id: "premium",
    name: "프리미엄 다크",
    description: "고급스러운 다크 배경, 럭셔리 상품에 적합",
    thumbnail: "⬛",
    category: "고급",
  },
  {
    id: "vibrant",
    name: "비비드 컬러",
    description: "눈에 띄는 컬러풀 디자인, 생활용품/식품에 적합",
    thumbnail: "🟧",
    category: "활기",
  },
  {
    id: "natural",
    name: "내추럴 소프트",
    description: "자연스러운 톤, 뷰티/건강 상품에 적합",
    thumbnail: "🟫",
    category: "자연",
  },
  {
    id: "tech",
    name: "테크 블루",
    description: "모던한 블루 베이스, 전자기기/IT 상품에 적합",
    thumbnail: "🟦",
    category: "테크",
  },
];
