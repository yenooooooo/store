"use client";

import PricingTable from "@/components/marketing/pricing-table";
import LiveCounter from "@/components/marketing/live-counter";
import SectionHeading from "@/components/shared/section-heading";
import CtaSection from "@/components/marketing/cta-section";
import { Check, X } from "lucide-react";

const PRICING_PLANS = [
  {
    plan: "무료",
    price: "0원",
    target: "처음 시작하는 분",
    features: "월 3회, 기본 기능 체험",
    highlighted: false,
  },
  {
    plan: "스타터",
    price: "9,900원",
    target: "개인 판매자 · 크리에이터",
    features: "월 30회, 리뷰·마케팅 카피 포함",
    highlighted: false,
  },
  {
    plan: "프로",
    price: "19,900원",
    target: "전문 판매자 · 풀타임 크리에이터",
    features: "월 150회, 모든 기능 + 우선 지원",
    highlighted: true,
  },
];

const FEATURE_COMPARISON = [
  { feature: "상세페이지 생성", free: true, starter: true, pro: true },
  { feature: "스크립트 생성", free: true, starter: true, pro: true },
  { feature: "리뷰 생성기", free: false, starter: true, pro: true },
  { feature: "마케팅 카피", free: false, starter: true, pro: true },
  { feature: "경쟁사 분석", free: false, starter: false, pro: true },
  { feature: "채널 전략", free: false, starter: false, pro: true },
  { feature: "A/B 변형 생성", free: false, starter: false, pro: true },
  { feature: "생성 기록 저장", free: false, starter: true, pro: true },
  { feature: "우선 지원", free: false, starter: false, pro: true },
];

const FAQ = [
  {
    q: "무료 체험은 어떻게 하나요?",
    a: "가입 즉시 3회 무료 크레딧이 제공됩니다. 카드 등록 없이 바로 사용할 수 있습니다.",
  },
  {
    q: "셀러부스트와 바이럴랩 따로 결제해야 하나요?",
    a: "아닙니다. 하나의 구독으로 셀러부스트 AI와 바이럴랩 AI 모든 기능을 사용할 수 있습니다.",
  },
  {
    q: "언제든 해지할 수 있나요?",
    a: "네, 약정 없이 언제든 해지 가능합니다. 해지 후에도 결제 기간까지 사용할 수 있습니다.",
  },
  {
    q: "생성된 콘텐츠의 저작권은 누구에게 있나요?",
    a: "AI가 생성한 모든 콘텐츠의 저작권은 사용자에게 있습니다. 상업적 용도로 자유롭게 사용하세요.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center">
        <SectionHeading
          title="심플한 요금제"
          subtitle="필요한 만큼만 쓰세요. 업그레이드할수록 더 많은 기능이 열립니다."
          centered
        />
        <div className="mt-6 flex justify-center">
          <LiveCounter />
        </div>
      </div>

      {/* 요금표 */}
      <PricingTable rows={PRICING_PLANS} />

      {/* 기능 비교표 */}
      <div>
        <h3 className="text-lg font-bold text-center mb-8">플랜별 기능 비교</h3>
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <span className="text-xs font-medium text-gray-500">기능</span>
            <span className="text-xs font-medium text-gray-500 text-center">무료</span>
            <span className="text-xs font-medium text-gray-500 text-center">스타터</span>
            <span className="text-xs font-bold text-gray-900 text-center">프로</span>
          </div>
          {/* Rows */}
          {FEATURE_COMPARISON.map((row) => (
            <div key={row.feature} className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-700">{row.feature}</span>
              {[row.free, row.starter, row.pro].map((included, i) => (
                <div key={i} className="flex justify-center">
                  {included ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-200" />
                  )}
                </div>
              ))}
            </div>
          ))}
          {/* Credits row */}
          <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50/30">
            <span className="text-sm font-medium text-gray-700">월 생성 횟수</span>
            <span className="text-sm text-gray-500 text-center">3회</span>
            <span className="text-sm text-gray-500 text-center">30회</span>
            <span className="text-sm font-bold text-gray-900 text-center">150회</span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-lg font-bold text-center mb-8">자주 묻는 질문</h3>
        <div className="space-y-4 max-w-2xl mx-auto">
          {FAQ.map((item) => (
            <div key={item.q} className="rounded-xl border border-gray-100 bg-white p-5">
              <h4 className="text-sm font-bold mb-2">{item.q}</h4>
              <p className="text-sm text-gray-400">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <CtaSection />
    </div>
  );
}
