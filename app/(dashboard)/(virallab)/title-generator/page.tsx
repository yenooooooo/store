"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, ImageIcon, Type } from "lucide-react";
import CopyButton from "@/components/shared/copy-button";
import FeatureGate from "@/components/shared/feature-gate";

interface TitleSuggestion {
  title: string;
  technique: string;
  ctrGrade: "S" | "A" | "B" | "C";
  ctrEstimate: string;
}

const gradeColors: Record<string, string> = {
  S: "bg-red-100 text-red-800",
  A: "bg-orange-100 text-orange-800",
  B: "bg-blue-100 text-blue-800",
  C: "bg-gray-100 text-gray-800",
};

export default function TitleGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [titles, setTitles] = useState<TitleSuggestion[] | null>(null);
  const [thumbnails, setThumbnails] = useState<string[] | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate/title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "생성에 실패했습니다");
      }

      const data = await res.json();
      setTitles(data.titles);
      setThumbnails(data.thumbnailTexts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "생성에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FeatureGate feature="title-generator">
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20">
          <Type className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">제목 & 썸네일 문구 생성기</h1>
          <p className="text-sm text-gray-500">주제를 입력하면 클릭 심리 기법별 제목 10종 + 썸네일 임팩트 문구를 생성합니다</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 mb-6">
        <form onSubmit={handleGenerate} className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="topic" className="sr-only">주제</label>
            <Input
              id="topic"
              placeholder="영상 주제 입력 (예: 직장인 퇴근 후 부업으로 월 300만원 버는 방법)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-50 transition-all flex-1"
            />
          </div>
          <button type="submit" disabled={loading || !topic.trim()} className="h-11 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "생성 중..." : "생성"}
          </button>
        </form>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>

      {!titles && !loading && !error && (
        <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="p-8 filter blur-[6px] select-none pointer-events-none opacity-50">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-600">{n}</div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="flex gap-2"><div className="h-2.5 w-14 bg-amber-100 rounded" /><div className="h-2.5 w-10 bg-blue-100 rounded" /></div>
                  </div>
                  <div className="h-6 w-6 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3">
              <Type className="h-6 w-6 text-amber-400" />
            </div>
            <p className="text-sm font-medium text-gray-600">제목과 썸네일 문구가 여기에 표시됩니다</p>
            <p className="text-xs text-gray-400 mt-1">위에서 영상 주제를 입력하고 생성하세요</p>
          </div>
        </div>
      )}

      {titles && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">클릭 심리 기법별 제목 랭킹</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {titles.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i < 3 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">{t.title}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-md border border-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-500">{t.technique}</span>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${gradeColors[t.ctrGrade]}`}>
                        CTR {t.ctrGrade}등급
                      </span>
                      <span className="text-[10px] text-gray-400">예상 CTR: {t.ctrEstimate}</span>
                    </div>
                  </div>
                  <CopyButton text={t.title} label="" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-gray-500" />
              <h2 className="text-base font-semibold text-gray-900">썸네일 임팩트 문구</h2>
            </div>
            <div className="p-6 space-y-3">
              {thumbnails?.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-900 to-blue-900 px-5 py-4 text-white"
                >
                  <span className="text-sm font-bold">{t}</span>
                  <CopyButton text={t} label="" />
                </div>
              ))}
              <p className="text-xs text-gray-400 pt-2">
                썸네일에 큰 글씨로 넣을 임팩트 문구입니다. 배경 위에 대비되는 색상으로 배치하세요.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    </FeatureGate>
  );
}
