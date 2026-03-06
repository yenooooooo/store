import HeroSection from "@/components/marketing/hero-section";
import KpiCards from "@/components/marketing/kpi-cards";
import ProductComparison from "@/components/marketing/product-comparison";
import CtaSection from "@/components/marketing/cta-section";
import SectionHeading from "@/components/shared/section-heading";
import HowItWorks from "@/components/marketing/how-it-works";
import ResultSamples from "@/components/marketing/result-samples";
import Testimonials from "@/components/marketing/testimonials";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        title="AI가 대신 써드립니다"
        subtitle="상세페이지, 스크립트, 마케팅 카피 — 10초면 완성"
        ctaLabel="무료로 시작하기"
        ctaHref="/signup"
      />

      {/* 신뢰 지표 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <KpiCards />
        </div>
      </section>

      {/* 이렇게 동작합니다 */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-14 text-center">
          <SectionHeading
            title="3단계면 끝"
            subtitle="복잡한 설정 없이, 바로 결과물을 받아보세요"
            centered
          />
        </div>
        <HowItWorks />
      </section>

      {/* 실제 결과물 미리보기 */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <SectionHeading
              title="이런 결과물을 만들어드립니다"
              subtitle="실제 AI가 생성한 결과물 미리보기"
              centered
            />
          </div>
          <ResultSamples />
        </div>
      </section>

      {/* 두 가지 AI 도구 */}
      <section className="bg-gray-50/50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <SectionHeading
              title="어떤 콘텐츠가 필요하세요?"
              subtitle="판매자든 크리에이터든, 맞는 도구가 있습니다"
              centered
            />
          </div>
          <ProductComparison />
        </div>
      </section>

      {/* 사용자 후기 */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-14 text-center">
          <SectionHeading
            title="이미 사용하고 있습니다"
            subtitle="베타 사용자들의 실제 후기"
            centered
          />
        </div>
        <Testimonials />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <CtaSection />
      </section>
    </>
  );
}
