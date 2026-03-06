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
  { id: "minimal", name: "미니멀 클린", description: "Apple 스타일 — 극도의 여백, 가벼운 타이포그래피, 세련된 심플함", thumbnail: "⬜", category: "심플" },
  { id: "premium", name: "프리미엄 다크", description: "럭셔리 브랜드 — 다크 배경, 골드 악센트, 고급스러운 카드 레이아웃", thumbnail: "⬛", category: "고급" },
  { id: "magazine", name: "매거진 에디토리얼", description: "편집 매거진 — 풀폭 배너, 2단 그리드, 대담한 타이포그래피", thumbnail: "📰", category: "매거진" },
  { id: "corporate", name: "비즈니스 프로", description: "기업 전문 — 네이비 헤더, 스트라이프 테이블, 신뢰감 있는 구조", thumbnail: "🏢", category: "비즈니스" },
  { id: "fresh", name: "프레시 내추럴", description: "건강/자연 — 그린 톤, 둥근 버블 카드, 오가닉 감성", thumbnail: "🌿", category: "자연" },
  { id: "bold", name: "볼드 임팩트", description: "강렬한 전환 — 블랙+레드, 대형 타이포, STOP! 인트로", thumbnail: "🔥", category: "강렬" },
  { id: "elegant", name: "엘레강트 클래식", description: "고전적 품격 — 크림 배경, 세리프 폰트, 골드 디바이더", thumbnail: "✨", category: "품격" },
  { id: "tech", name: "모던 테크", description: "IT/가전 — 다크 그라디언트, 글래스모피즘, 터미널 스펙표", thumbnail: "💻", category: "테크" },
  { id: "warm", name: "웜 라이프스타일", description: "라이프스타일 — 피치/코랄 톤, 부드러운 라운드, 따뜻한 감성", thumbnail: "🧡", category: "라이프" },
  { id: "cute", name: "큐트 파스텔", description: "귀여운 감성 — 핑크 파스텔, 둥근 카드, 이모지 포인트", thumbnail: "🩷", category: "귀여움" },
  { id: "conversion", name: "전환 극대화", description: "랜딩페이지 — Before/After, 다중 CTA, 소셜프루프 강조", thumbnail: "🚀", category: "전환" },
];
