"use client";

import { useState } from "react";
import { Loader2, Sparkles, AlertTriangle, CheckCircle, AlertCircle, Target } from "lucide-react";
import ScoreGauge from "@/components/shared/score-gauge";
import CopyButton from "@/components/shared/copy-button";
import FeatureGate from "@/components/shared/feature-gate";

interface DropOffPoint {
  timestamp: string;
  text: string;
  risk: "high" | "medium" | "low";
  reason: string;
}

interface ImprovedVersion {
  version: string;
  score: number;
  changes: string;
}

interface RadarItem {
  metric: string;
  myScore: number;
  viralAvg: number;
}

interface HookAnalysisResult {
  score: number;
  dropOffPoints: DropOffPoint[];
  improvedVersions: ImprovedVersion[];
  radarData: RadarItem[];
}

export default function HookScorePage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<HookAnalysisResult | null>(null);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate/hook-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "분석에 실패했습니다");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "분석에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  const riskIcon = {
    high: <AlertTriangle className="h-4 w-4 text-red-500" />,
    medium: <AlertCircle className="h-4 w-4 text-yellow-500" />,
    low: <CheckCircle className="h-4 w-4 text-green-500" />,
  };

  const riskLabel = { high: "높음", medium: "보통", low: "낮음" };

  const riskBadgeClass = {
    high: "inline-flex items-center rounded-lg bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600",
    medium: "inline-flex items-center rounded-lg bg-yellow-50 px-2.5 py-1 text-[11px] font-semibold text-yellow-600",
    low: "inline-flex items-center rounded-lg bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-600",
  };

  return (
    <FeatureGate feature="hook-score">
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 shadow-lg shadow-rose-500/20">
          <Target className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Hook Score 분석기</h1>
          <p className="text-sm text-gray-500">대본의 첫 15초 분량을 붙여넣으면 AI가 즉시 점수화하고 개선 버전을 제안합니다</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <form onSubmit={handleAnalyze} className="space-y-4">
            <textarea
              className="w-full min-h-[160px] rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-relaxed placeholder:text-gray-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-all resize-none outline-none"
              placeholder="영상 첫 15초 대본을 붙여넣으세요..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? "AI가 분석 중..." : "Hook Score 분석"}
            </button>
          </form>
        </div>

        {!result && !loading && !error && (
          <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="p-8 filter blur-[6px] select-none pointer-events-none opacity-50">
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full border-8 border-rose-200 flex items-center justify-center">
                  <span className="text-3xl font-bold text-rose-300">85</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><div className="h-3 w-full bg-rose-100 rounded-full" /><span className="text-xs text-gray-300 w-8">92</span></div>
                <div className="flex items-center gap-3"><div className="h-3 w-4/5 bg-amber-100 rounded-full" /><span className="text-xs text-gray-300 w-8">78</span></div>
                <div className="flex items-center gap-3"><div className="h-3 w-3/5 bg-blue-100 rounded-full" /><span className="text-xs text-gray-300 w-8">65</span></div>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center mb-3">
                <Target className="h-6 w-6 text-rose-400" />
              </div>
              <p className="text-sm font-medium text-gray-600">분석 결과가 여기에 표시됩니다</p>
              <p className="text-xs text-gray-400 mt-1">대본을 입력하고 분석 버튼을 누르세요</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="p-6 flex flex-col items-center">
                <ScoreGauge score={result.score} label="Hook Score" size={160} />
                <p className="text-xs text-gray-400 mt-3">
                  {result.score >= 85 ? "바이럴 가능성 높은 후킹입니다!" : result.score >= 70 ? "좋지만 개선 여지가 있습니다" : "아래 개선 버전을 참고하세요"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">이탈 위험 구간</h2>
              </div>
              <div className="p-6 space-y-3">
                {result.dropOffPoints.map((p, i) => (
                  <div key={i} className="rounded-xl border p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      {riskIcon[p.risk]}
                      <span className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600">{p.timestamp}</span>
                      <span className={riskBadgeClass[p.risk]}>
                        이탈 위험: {riskLabel[p.risk]}
                      </span>
                    </div>
                    <p className="text-sm font-medium">&ldquo;{p.text}&rdquo;</p>
                    <p className="text-xs text-gray-400">{p.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">개선된 버전 제안</h2>
              </div>
              <div className="p-6 space-y-3">
                {result.improvedVersions.map((v, i) => (
                  <div key={i} className="rounded-xl border p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-lg bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-600">
                        예상 점수: {v.score}점
                      </span>
                      <CopyButton text={v.version} />
                    </div>
                    <p className="text-sm leading-relaxed">{v.version}</p>
                    <p className="text-xs text-gray-400">{v.changes}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">100만뷰 영상 vs 내 대본 비교</h2>
              </div>
              <div className="p-6 space-y-3">
                {result.radarData.map((d) => (
                  <div key={d.metric} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{d.metric}</span>
                      <span className="text-gray-400">내 점수: {d.myScore} / 바이럴 평균: {d.viralAvg}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex gap-2 items-center">
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-gray-900 transition-all" style={{ width: `${d.myScore}%` }} />
                        </div>
                        <span className="text-xs w-6 text-right">{d.myScore}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-orange-400 transition-all" style={{ width: `${d.viralAvg}%` }} />
                        </div>
                        <span className="text-xs w-6 text-right">{d.viralAvg}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="h-px bg-gray-100" />
                <div className="flex gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-gray-900" /> 내 대본</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-400" /> 100만뷰 평균</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </FeatureGate>
  );
}
