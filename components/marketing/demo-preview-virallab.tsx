"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

export default function DemoPreviewVirallab() {
  const [topic, setTopic] = useState("");
  const [showResult, setShowResult] = useState(false);

  function handleDemo() {
    if (topic.trim().length < 2) return;
    setShowResult(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-center mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-2">직접 체험해보세요</h3>
        <p className="text-sm text-gray-500">영상 주제를 입력하면 AI 스크립트 미리보기를 확인할 수 있습니다</p>
      </div>

      <div className="flex gap-3 mb-8 max-w-lg mx-auto">
        <input
          type="text"
          value={topic}
          onChange={(e) => { setTopic(e.target.value); setShowResult(false); }}
          placeholder="예: 직장인 퇴근 후 부업 브이로그"
          onKeyDown={(e) => e.key === "Enter" && handleDemo()}
          className="flex-1 h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all"
        />
        <button
          onClick={handleDemo}
          disabled={topic.trim().length < 2}
          className="h-12 px-6 rounded-xl bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          미리보기
        </button>
      </div>

      {showResult && (
        <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-lg shadow-gray-200/50">
          <div className="p-6 pb-0">
            {/* Score + Title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex flex-col items-center rounded-xl bg-violet-50 px-4 py-2">
                <span className="text-[10px] text-violet-600">Hook Score</span>
                <span className="text-2xl font-black text-violet-600">91</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 mb-0.5">&quot;이걸 몰랐다면 평생 회사만 다닐 뻔했습니다&quot;</p>
                <p className="text-xs text-gray-500">궁금증 유발 + 공포 기법 조합 · 예상 CTR 8~12%</p>
              </div>
            </div>

            {/* Hook visible */}
            <div className="rounded-xl bg-amber-50 p-4 mb-4">
              <span className="text-[10px] font-bold text-amber-700 mb-1 block">HOOK (첫 5초)</span>
              <p className="text-sm text-amber-900">&quot;저 월급이 200만원이었을 때 이걸 시작했는데요, 지금은 퇴근 후 2시간으로 월 매출 300만원을 넘기고 있습니다.&quot;</p>
            </div>
          </div>

          {/* Blurred portion */}
          <div className="relative px-6 pb-6">
            <div className="filter blur-[6px] select-none pointer-events-none">
              <div className="rounded-xl bg-gray-50 p-4 space-y-2 mb-3">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-4/5 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="h-7 w-28 bg-violet-100 rounded-full" />
                <div className="h-7 w-24 bg-violet-100 rounded-full" />
                <div className="h-7 w-20 bg-violet-100 rounded-full" />
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-white via-white/90 to-transparent">
              <Lock className="h-5 w-5 text-gray-400 mb-2" />
              <p className="text-sm font-semibold text-gray-700 mb-1">전체 스크립트를 확인하세요</p>
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
