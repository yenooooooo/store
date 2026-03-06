"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import {
  Check,
  CreditCard,
  Shield,
  Zap,
  Crown,
  Receipt,
  Loader2,
  X,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const PLANS = [
  {
    name: "무료",
    price: "0원",
    monthlyPrice: 0,
    icon: Zap,
    description: "AI 도구를 체험해보세요",
    credits: "월 3회",
    features: [
      { text: "상세페이지 생성", included: true },
      { text: "스크립트 생성", included: true },
      { text: "리뷰 생성기", included: false },
      { text: "마케팅 카피", included: false },
      { text: "경쟁사 분석", included: false },
      { text: "채널 전략", included: false },
      { text: "생성 기록", included: false, note: "최근 3개만" },
    ],
    highlighted: false,
  },
  {
    name: "스타터",
    price: "월 9,900원",
    monthlyPrice: 9900,
    icon: CreditCard,
    description: "본격적으로 매출을 올리세요",
    credits: "월 30회",
    features: [
      { text: "상세페이지 생성", included: true },
      { text: "스크립트 생성", included: true },
      { text: "리뷰 생성기", included: true },
      { text: "마케팅 카피", included: true },
      { text: "경쟁사 분석", included: false },
      { text: "채널 전략", included: false },
      { text: "생성 기록 전체 저장", included: true },
    ],
    highlighted: true,
  },
  {
    name: "프로",
    price: "월 19,900원",
    monthlyPrice: 19900,
    icon: Crown,
    description: "모든 기능을 제한 없이",
    credits: "월 150회",
    features: [
      { text: "상세페이지 생성", included: true },
      { text: "스크립트 생성", included: true },
      { text: "리뷰 생성기", included: true },
      { text: "마케팅 카피", included: true },
      { text: "경쟁사 분석", included: true },
      { text: "채널 전략", included: true },
      { text: "A/B 변형 생성", included: true },
      { text: "생성 기록 전체 저장", included: true },
      { text: "우선 지원", included: true },
    ],
    highlighted: false,
  },
];

export default function BillingPage() {
  const profile = useAuthStore((s) => s.profile);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  async function handleUpgrade(planName: string) {
    setSelectedPlan(planName);
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setSelectedPlan(null);
    toast.success(`${planName} 플랜으로 업그레이드 되었습니다! (Mock)`);
  }

  const currentPlan = profile?.plan ?? "free";
  const planNameMap: Record<string, string> = {
    free: "무료",
    starter: "스타터",
    pro: "프로",
  };

  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/20">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">결제 관리</h1>
            <p className="text-sm text-gray-500">구독 플랜과 결제 정보를 관리합니다</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* 현재 플랜 */}
        <div className="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">현재 플랜</p>
              <p className="text-2xl font-bold mt-1">{planNameMap[currentPlan] ?? "무료"}</p>
              <p className="text-sm text-white/50 mt-2">
                크레딧: {profile?.credits_used ?? 0}/{profile?.credits_limit ?? 3}회 사용
              </p>
            </div>
            {currentPlan === "free" && (
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium">업그레이드하고 더 많은 기능을 사용하세요</span>
              </div>
            )}
          </div>
        </div>

        {/* 플랜 비교 */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-4">플랜 선택</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {PLANS.map((plan) => {
              const isCurrent = planNameMap[currentPlan] === plan.name;
              const isProcessing = processing && selectedPlan === plan.name;
              return (
                <div
                  key={plan.name}
                  className={`rounded-2xl border bg-white p-6 relative transition-all ${
                    plan.highlighted
                      ? "border-gray-900 ring-1 ring-gray-900/10"
                      : "border-gray-100"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gray-900 text-white text-xs rounded-full px-3 py-1 font-medium">추천</span>
                    </div>
                  )}

                  {/* 플랜명 + 아이콘 */}
                  <div className="flex items-center gap-2 mb-1">
                    <plan.icon className="h-5 w-5 text-gray-400" />
                    <h3 className="font-bold text-gray-900">{plan.name}</h3>
                  </div>

                  {/* 설명 */}
                  <p className="text-xs text-gray-400 mb-3">{plan.description}</p>

                  {/* 가격 */}
                  <div className="text-lg font-extrabold text-gray-900">
                    {plan.price}
                  </div>

                  {/* 크레딧 */}
                  <div className="mt-1 mb-4">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600">
                      {plan.credits}
                    </span>
                  </div>

                  <div className="h-px bg-gray-100 mb-4" />

                  {/* 기능 목록 */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-2 text-sm">
                        {f.included ? (
                          <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-gray-300 shrink-0" />
                        )}
                        <span className={f.included ? "text-gray-700" : "text-gray-400"}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA 버튼 */}
                  <button
                    disabled={isCurrent || isProcessing}
                    onClick={() => handleUpgrade(plan.name)}
                    className={`w-full h-11 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                      isCurrent
                        ? "border border-gray-200 text-gray-400 cursor-not-allowed"
                        : plan.highlighted
                          ? "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98] shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1)]"
                          : "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50"
                    }`}
                  >
                    {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isCurrent
                      ? "현재 플랜"
                      : isProcessing
                        ? "처리 중..."
                        : plan.monthlyPrice === 0
                          ? "현재 플랜"
                          : "업그레이드"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 결제 수단 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">결제 수단</h2>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 mb-4">
              <CreditCard className="h-6 w-6 text-gray-300" />
            </div>
            <p className="text-sm text-gray-500 max-w-sm">
              결제 연동 준비 중입니다. 곧 토스페이먼츠로 간편하게 결제할 수 있습니다.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-400">
              <Shield className="h-3.5 w-3.5" />
              카드 정보는 토스페이먼츠에서 안전하게 관리됩니다
            </div>
          </div>
        </div>

        {/* 결제 내역 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">결제 내역</h2>
          <div className="relative">
            <div className="select-none pointer-events-none blur-[2px] opacity-40">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gray-200" />
                      <div className="space-y-1">
                        <div className="h-3 w-24 rounded bg-gray-200" />
                        <div className="h-2.5 w-16 rounded bg-gray-100" />
                      </div>
                    </div>
                    <div className="h-3 w-16 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Receipt className="h-6 w-6 text-gray-300 mb-2" />
              <p className="text-sm text-gray-400">아직 결제 내역이 없습니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
