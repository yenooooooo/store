"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

const SAMPLE_RESULT = {
  title: "[1+1 특가] 프리미엄 무선 블루투스 이어폰 - 노이즈캔슬링 36시간 배터리",
  subtitle: "출퇴근길, 운동할 때, 잠들기 전까지. 하루 종일 끊김 없는 나만의 사운드.",
  features: [
    "하이브리드 노이즈캔슬링으로 지하철 소음 95% 차단",
    "36시간 연속 재생 — 일주일에 한 번만 충전하세요",
    "IPX5 방수로 러닝·헬스 중 땀에도 걱정 없이 사용",
    "무게 4.7g 초경량 설계로 장시간 착용해도 귀에 무리 없음",
    "원터치 페어링 — 케이스 열면 자동 연결, 1초 만에 음악 시작",
  ],
  score: 87,
};

export default function DemoPreview() {
  const [productName, setProductName] = useState("");
  const [showResult, setShowResult] = useState(false);

  function handleDemo() {
    if (productName.trim().length < 2) return;
    setShowResult(true);
  }

  const result = SAMPLE_RESULT;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-center mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-2">직접 체험해보세요</h3>
        <p className="text-sm text-gray-500">상품명을 입력하면 AI 결과 미리보기를 확인할 수 있습니다</p>
      </div>

      {/* Input */}
      <div className="flex gap-3 mb-8 max-w-lg mx-auto">
        <input
          type="text"
          value={productName}
          onChange={(e) => { setProductName(e.target.value); setShowResult(false); }}
          placeholder="예: 무선 블루투스 이어폰"
          onKeyDown={(e) => e.key === "Enter" && handleDemo()}
          className="flex-1 h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
        />
        <button
          onClick={handleDemo}
          disabled={productName.trim().length < 2}
          className="h-12 px-6 rounded-xl bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          미리보기
        </button>
      </div>

      {/* Result Preview (blurred bottom half) */}
      {showResult && (
        <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-lg shadow-gray-200/50">
          {/* Visible top portion */}
          <div className="p-6 pb-0">
            {/* Score */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex flex-col items-center rounded-xl bg-green-50 px-4 py-2">
                <span className="text-[10px] text-green-600">전환율</span>
                <span className="text-2xl font-black text-green-600">{result.score}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 mb-0.5">{result.title}</p>
                <p className="text-xs text-gray-500">{result.subtitle}</p>
              </div>
            </div>

            {/* Features (show first 2 clearly) */}
            <div className="space-y-2 mb-4">
              {result.features.slice(0, 2).map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-600">
                    {i + 1}
                  </span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Blurred bottom portion */}
          <div className="relative px-6 pb-6">
            <div className="filter blur-[6px] select-none pointer-events-none">
              <div className="space-y-2 mb-4">
                {result.features.slice(2).map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-600">
                      {i + 3}
                    </span>
                    {f}
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-gray-50 p-4 space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-4/5 bg-gray-200 rounded" />
                <div className="h-3 w-3/5 bg-gray-200 rounded" />
              </div>
              <div className="mt-3 flex gap-2">
                <div className="h-7 w-20 bg-blue-100 rounded-full" />
                <div className="h-7 w-24 bg-blue-100 rounded-full" />
                <div className="h-7 w-16 bg-blue-100 rounded-full" />
              </div>
            </div>

            {/* Overlay CTA */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-white via-white/90 to-transparent">
              <Lock className="h-5 w-5 text-gray-400 mb-2" />
              <p className="text-sm font-semibold text-gray-700 mb-1">전체 결과를 확인하세요</p>
              <p className="text-xs text-gray-400 mb-4">무료 가입 후 3회 무료 생성</p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-all active:scale-[0.98]"
              >
                무료로 시작하기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
