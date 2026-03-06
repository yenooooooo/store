import HeroSection from "@/components/marketing/hero-section";
import CtaSection from "@/components/marketing/cta-section";
import SectionHeading from "@/components/shared/section-heading";
import DemoPreview from "@/components/marketing/demo-preview";
import { FileText, BarChart3, Megaphone, ImageIcon, Target, TrendingUp } from "lucide-react";

const FEATURES = [
  {
    icon: FileText,
    title: "상세페이지 자동 생성",
    description: "상품명과 특징만 입력하면 전환율 높은 상세페이지 카피를 10초 만에 생성합니다. SEO 키워드까지 자동 포함.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: ImageIcon,
    title: "이미지 → 특징 자동 추출",
    description: "상품 사진을 올리면 AI가 핵심 특징을 자동으로 읽어냅니다. 타이핑할 필요 없이 바로 생성.",
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: BarChart3,
    title: "경쟁사 역분석",
    description: "키워드 하나로 상위 경쟁 상품을 분석. 그들이 쓰는 키워드, 가격대, 리뷰 전략을 한눈에 파악.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: Megaphone,
    title: "마케팅 카피 원스톱",
    description: "인스타그램 홍보, 블로그 후기, 네이버 파워링크 광고 문구를 한 번에 3채널 동시 생성.",
    color: "from-orange-500 to-amber-400",
  },
  {
    icon: Target,
    title: "전환율 점수 분석",
    description: "생성된 카피의 전환율을 AI가 점수화. 개선이 필요한 부분을 구체적으로 알려드립니다.",
    color: "from-pink-500 to-rose-400",
  },
  {
    icon: TrendingUp,
    title: "SEO 키워드 제안",
    description: "네이버 쇼핑 검색 최적화를 위한 키워드를 자동 추천. 노출 순위를 높이세요.",
    color: "from-sky-500 to-indigo-400",
  },
];

export default function SellerboostLandingPage() {
  return (
    <>
      <HeroSection
        title="상세페이지 10초 만에 완성"
        subtitle="AI가 전환율 높은 상품 카피를 대신 써드립니다"
        ctaLabel="무료로 시작하기"
        ctaHref="/signup"
      />

      <DemoPreview />

      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <SectionHeading
            title="판매자에게 필요한 모든 기능"
            subtitle="상세페이지부터 마케팅까지, AI가 한 번에 해결합니다"
            centered
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${feature.color}`} />
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-sm`}>
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900 leading-snug">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-20">
        <CtaSection ctaLabel="셀러부스트 시작하기" ctaHref="/signup" />
      </div>
    </>
  );
}
