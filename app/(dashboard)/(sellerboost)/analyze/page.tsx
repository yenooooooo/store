"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Loader2, TrendingUp, AlertCircle, BarChart3 } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import UpgradeModal from "@/components/shared/upgrade-modal";
import FeatureGate from "@/components/shared/feature-gate";

interface Competitor {
  rank: number;
  name: string;
  seller: string;
  price: string;
  reviewCount: number;
  rating: number;
}

interface TopKeyword {
  keyword: string;
  count: number;
  importance: "high" | "medium" | "low";
}

interface GapItem {
  category: string;
  avgScore: number;
  recommendation: string;
}

interface AnalysisResult {
  keyword: string;
  totalProducts: number;
  competitors: Competitor[];
  topKeywords: TopKeyword[];
  gapAnalysis: GapItem[];
  insights: string[];
}

const importanceBadge: Record<string, { className: string; label: string }> = {
  high: { className: "inline-flex items-center rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600", label: "높음" },
  medium: { className: "inline-flex items-center rounded-md bg-yellow-50 px-2 py-0.5 text-[10px] font-semibold text-yellow-600", label: "보통" },
  low: { className: "inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600", label: "낮음" },
};

export default function AnalyzePage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const { profile, hasCredits, setProfile } = useAuthStore();

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!keyword.trim()) return;

    if (!hasCredits()) {
      setShowUpgrade(true);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim() }),
      });

      if (!res.ok) {
        const body = await res.text();
        let message = "분석에 실패했습니다";
        try {
          const err = JSON.parse(body);
          message = err.error || message;
        } catch {
          message = body || message;
        }
        throw new Error(message);
      }

      const data: AnalysisResult = await res.json();
      setResult(data);

      // 로컬 크레딧 업데이트
      if (profile) {
        setProfile({ ...profile, credits_used: profile.credits_used + 1 });
      }

      // 생성 기록 저장 (비동기, 실패해도 무시)
      fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "sellerboost",
          inputData: { keyword: keyword.trim(), type: "analyze" },
          outputData: data,
        }),
      }).catch(() => {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "분석에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FeatureGate feature="analyze">
    <div>
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">경쟁사 역분석</h1>
            <p className="text-sm text-gray-500">키워드를 입력하면 AI가 경쟁 구도를 분석합니다</p>
          </div>
        </div>
      </div>

      {/* 검색 폼 - large prominent search */}
      <form onSubmit={handleAnalyze} className="relative mb-6">
        <input
          id="keyword"
          className="w-full h-14 rounded-2xl border border-gray-200 bg-white px-6 pr-32 text-lg placeholder:text-gray-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all outline-none"
          placeholder="네이버 쇼핑 키워드 입력 (예: 무선 블루투스 이어폰)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !keyword.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white transition-all hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          분석 시작
        </button>
      </form>

      {/* 에러 표시 */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-6 py-4">
          <div className="flex items-center gap-2 text-red-700 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Empty state - blurred dashboard mockup */}
      {!result && !loading && !error && (
        <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden mt-8">
          <div className="p-8 filter blur-[6px] select-none pointer-events-none opacity-50">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="h-24 bg-gray-100 rounded-xl" />
              <div className="h-24 bg-gray-100 rounded-xl" />
              <div className="h-24 bg-gray-100 rounded-xl" />
            </div>
            <div className="h-48 bg-gray-50 rounded-xl" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-3">
              <Search className="h-6 w-6 text-teal-400" />
            </div>
            <p className="text-sm font-medium text-gray-600">분석 결과가 여기에 표시됩니다</p>
            <p className="text-xs text-gray-400 mt-1">위에서 키워드를 검색하세요</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6 mt-8">
          {/* 요약 - dashboard stat cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
              <div className="text-2xl font-bold text-teal-600">{result.keyword}</div>
              <p className="text-xs text-gray-500 mt-1">분석 키워드</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">{result.totalProducts.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">전체 상품 수</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{result.topKeywords.filter((k) => k.importance === "high").length}</div>
              <p className="text-xs text-gray-500 mt-1">핵심 키워드 수</p>
            </div>
          </div>

          {/* 상위 10 경쟁 상품 - table style */}
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">상위 10 경쟁 상품</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">상품명</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">판매자</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">가격</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">리뷰</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">평점</th>
                  </tr>
                </thead>
                <tbody>
                  {result.competitors.map((c) => (
                    <tr key={c.rank} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3 font-bold text-teal-600">{c.rank}</td>
                      <td className="px-6 py-3 font-medium max-w-[200px] truncate text-gray-900">{c.name}</td>
                      <td className="px-6 py-3 text-gray-500">{c.seller}</td>
                      <td className="px-6 py-3 text-right text-gray-900">{c.price}</td>
                      <td className="px-6 py-3 text-right text-gray-900">{c.reviewCount.toLocaleString()}</td>
                      <td className="px-6 py-3 text-right">
                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{c.rating}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 키워드 TOP 20 */}
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">경쟁사가 쓰는 키워드 TOP 20</h2>
            </div>
            <div className="p-4 space-y-1.5">
              {result.topKeywords.map((k, i) => {
                const badge = importanceBadge[k.importance] ?? importanceBadge["low"]!;
                return (
                  <div key={k.keyword} className="flex items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-gray-50 transition-colors">
                    <span className="text-xs font-bold text-gray-400 w-6">{i + 1}</span>
                    <span className="flex-1 text-sm font-medium text-gray-900">{k.keyword}</span>
                    <span className="text-xs text-gray-400">{k.count}개 상품</span>
                    <span className={badge.className}>
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 갭 분석 */}
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">경쟁사 평균 점수 & 개선 포인트</h2>
            </div>
            <div className="p-6 space-y-4">
              {result.gapAnalysis.map((g) => (
                <div key={g.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{g.category}</span>
                    <span className="text-xs font-bold text-gray-500">{g.avgScore}점</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-teal-500 transition-all"
                        style={{ width: `${g.avgScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-8">{g.avgScore}</span>
                  </div>
                  <p className="text-xs text-gray-500">{g.recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 인사이트 */}
          {result.insights && result.insights.length > 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-teal-500" />
                  핵심 인사이트
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {result.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-teal-50 text-teal-600 text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </div>
    </FeatureGate>
  );
}
