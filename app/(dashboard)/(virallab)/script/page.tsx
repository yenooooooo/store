"use client";

import { useState } from "react";
import ScriptForm from "@/components/virallab/script-form";
import ScriptResult from "@/components/virallab/script-result";
import { useGenerationStore } from "@/stores/generation-store";
import CreditNudge from "@/components/shared/credit-nudge";
import { Film, Loader2, Sparkles } from "lucide-react";
import type { VirallabOutput } from "@/types";

export default function ScriptPage() {
  const [result, setResult] = useState<VirallabOutput | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const { isGenerating, error } = useGenerationStore();

  function handleResult(r: VirallabOutput, id?: string) {
    setResult(r);
    if (id) setGenerationId(id);
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/20">
          <Film className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">스크립트 생성</h1>
          <p className="text-sm text-gray-500">주제와 타겟을 입력하면 AI가 바이럴 스크립트를 생성합니다</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 좌측: 폼 */}
        <div>
          <ScriptForm onResult={handleResult} />
        </div>

        {/* 우측: 결과 */}
        <div>
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
              {error}
            </div>
          )}

          {isGenerating && !result && (
            <div className="rounded-xl border bg-white p-12 flex flex-col items-center justify-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">
                  AI가 바이럴 스크립트를 작성하고 있습니다
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  후킹 공식 분석 중... 약 15~20초 소요
                </p>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {result && !isGenerating && (
            <>
              <ScriptResult result={result} generationId={generationId} />
              <CreditNudge />
            </>
          )}

          {!result && !isGenerating && !error && (
            <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="p-8 filter blur-[6px] select-none pointer-events-none opacity-50">
                <div className="space-y-4">
                  <div className="rounded-xl bg-amber-50 p-4"><div className="h-3 w-24 bg-amber-200 rounded mb-2" /><div className="h-3 w-full bg-amber-100 rounded" /></div>
                  <div className="rounded-xl bg-gray-50 p-4"><div className="h-3 w-20 bg-gray-200 rounded mb-2" /><div className="h-3 w-full bg-gray-100 rounded" /><div className="h-3 w-4/5 bg-gray-100 rounded mt-1" /></div>
                  <div className="rounded-xl bg-blue-50 p-4"><div className="h-3 w-16 bg-blue-200 rounded mb-2" /><div className="h-3 w-3/4 bg-blue-100 rounded" /></div>
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center mb-3">
                  <Film className="h-6 w-6 text-violet-400" />
                </div>
                <p className="text-sm font-medium text-gray-600">스크립트가 여기에 표시됩니다</p>
                <p className="text-xs text-gray-400 mt-1">왼쪽에서 정보를 입력하고 생성하세요</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
