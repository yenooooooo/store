import HeroSection from "@/components/marketing/hero-section";
import CtaSection from "@/components/marketing/cta-section";
import SectionHeading from "@/components/shared/section-heading";
import DemoPreviewVirallab from "@/components/marketing/demo-preview-virallab";
import { Film, Target, Type, TrendingUp, Clock, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Film,
    title: "바이럴 스크립트 생성",
    description: "주제와 타겟만 입력하면 시청 유지율 높은 스크립트를 자동 생성. 쇼츠부터 긴 영상까지.",
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: Target,
    title: "Hook Score 분석",
    description: "대본 첫 15초의 후킹 강도를 100점 만점으로 분석. 이탈 구간과 개선안까지 제공.",
    color: "from-rose-500 to-pink-400",
  },
  {
    icon: Type,
    title: "제목 10종 + 썸네일 텍스트",
    description: "클릭률 높은 제목 10개를 한 번에 생성. 각 제목의 CTR 등급(S~C)까지 분석.",
    color: "from-amber-500 to-orange-400",
  },
  {
    icon: TrendingUp,
    title: "채널 성장 전략",
    description: "채널 정보를 입력하면 주간 업로드 계획, 틈새 키워드 20개, 성장 전략을 수립.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: Clock,
    title: "쇼츠·릴스 전용 모드",
    description: "30초·60초 짧은 영상에 최적화된 스크립트. 트렌드에 맞는 포맷으로 생성.",
    color: "from-sky-500 to-blue-400",
  },
  {
    icon: Zap,
    title: "톤앤매너 맞춤",
    description: "원하는 말투와 분위기를 지정하면 그에 맞게 스크립트를 작성합니다.",
    color: "from-indigo-500 to-violet-400",
  },
];

export default function VirallabLandingPage() {
  return (
    <>
      <HeroSection
        title="스크립트 고민 이제 끝"
        subtitle="AI가 바이럴되는 영상 대본을 써드립니다"
        ctaLabel="무료로 시작하기"
        ctaHref="/signup"
      />

      <DemoPreviewVirallab />

      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <SectionHeading
            title="크리에이터에게 필요한 모든 기능"
            subtitle="스크립트부터 채널 전략까지, AI가 한 번에 해결합니다"
            centered
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300"
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
        <CtaSection ctaLabel="바이럴랩 시작하기" ctaHref="/signup" />
      </div>
    </>
  );
}
