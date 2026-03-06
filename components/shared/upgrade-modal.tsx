"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Sparkles, Check, X, Zap, Flame, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PLANS = [
  {
    name: "스타터",
    price: "9,900",
    credits: "월 30회",
    features: [
      { text: "상세페이지 생성", included: true },
      { text: "스크립트 생성", included: true },
      { text: "리뷰 생성기", included: true },
      { text: "마케팅 카피", included: true },
      { text: "경쟁사 분석", included: false },
    ],
    highlighted: false,
  },
  {
    name: "프로",
    price: "19,900",
    credits: "월 150회",
    features: [
      { text: "모든 기능 사용", included: true },
      { text: "경쟁사 분석", included: true },
      { text: "채널 전략", included: true },
      { text: "A/B 변형 생성", included: true },
      { text: "우선 지원", included: true },
    ],
    highlighted: true,
  },
];

export default function UpgradeModal({ open, onOpenChange }: Props) {
  const [upgradeCount] = useState(
    () => Math.floor(Math.random() * 17) + 12
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {/* 상단 긴급성 배너 */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-center">
          <p className="text-white text-sm font-bold flex items-center justify-center gap-1.5">
            <Flame className="h-4 w-4" />
            무료 크레딧을 모두 사용했습니다
            <Flame className="h-4 w-4" />
          </p>
        </div>

        <div className="px-6 pb-6 pt-4">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
            <DialogTitle className="text-xl">
              업그레이드하고 계속 사용하세요
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm leading-relaxed">
              업그레이드하면{" "}
              <span className="font-semibold text-foreground">
                매달 외주비 30만원을 절약
              </span>
              할 수 있습니다
            </DialogDescription>
          </DialogHeader>

          {/* 비용 비교 */}
          <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2.5 text-center">
            <p className="text-xs text-amber-800 font-medium flex items-center justify-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              상세페이지 외주 1건 = 15만원 vs 프로 플랜 = 월 1.9만원
            </p>
          </div>

          {/* 소셜 프루프 */}
          <p className="text-center text-xs text-gray-400 mt-3">
            오늘 포함{" "}
            <span className="font-bold text-blue-600">{upgradeCount}명</span>이
            업그레이드했습니다
          </p>

          <div className="grid gap-3 mt-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border-2 p-4 transition-shadow ${
                  plan.highlighted
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 via-white to-violet-50 shadow-lg shadow-blue-100"
                    : "border-gray-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center bg-gradient-to-r from-blue-600 to-violet-600 text-white text-[10px] font-medium px-3 py-0.5 rounded-full shadow-md">
                      추천
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base">{plan.name}</span>
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                      {plan.credits}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-xs text-gray-400">
                      원/월
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5 mt-3">
                  {plan.features.map((f) => (
                    <div
                      key={f.text}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      {f.included ? (
                        <Check className="h-3 w-3 text-green-500 shrink-0" />
                      ) : (
                        <X className="h-3 w-3 text-gray-300 shrink-0" />
                      )}
                      <span className={f.included ? "text-gray-700" : "text-gray-400"}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2">
            <Link
              href="/billing"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-sm font-semibold shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              업그레이드하기
            </Link>
            <p className="text-center text-[10px] text-gray-400">
              언제든 해지 가능 · 카드 등록 후 즉시 이용
            </p>
            <button
              className="w-full py-2 text-xs text-gray-400 hover:text-gray-500 transition-colors"
              onClick={() => onOpenChange(false)}
            >
              나중에 하기
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
