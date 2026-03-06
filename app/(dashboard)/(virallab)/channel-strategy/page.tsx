"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Sparkles,
  Calendar,
  Search,
  TrendingUp,
} from "lucide-react";
import CopyButton from "@/components/shared/copy-button";
import FeatureGate from "@/components/shared/feature-gate";

interface WeeklyPlan {
  day: string;
  action: string;
  reason: string;
}

interface NicheKeyword {
  keyword: string;
  competition: "낮음" | "중간" | "높음";
  volume: string;
  opportunity: string;
}

interface ChannelStrategy {
  weeklyPlan: WeeklyPlan[];
  nicheKeywords: NicheKeyword[];
  growthTips: string[];
}

const competitionColors: Record<string, string> = {
  "낮음": "bg-green-100 text-green-800",
  "중간": "bg-yellow-100 text-yellow-800",
  "높음": "bg-red-100 text-red-800",
};

export default function ChannelStrategyPage() {
  const [channelName, setChannelName] = useState("");
  const [channelTopic, setChannelTopic] = useState("");
  const [subscribers, setSubscribers] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ChannelStrategy | null>(null);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!channelTopic.trim()) return;

    setLoading(true);
    setError("");

    const channelInfo = [
      channelName && `채널명: ${channelName}`,
      `주제/분야: ${channelTopic}`,
      subscribers && `현재 구독자: ${subscribers}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/generate/channel-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelInfo }),
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

  return (
    <FeatureGate feature="channel-strategy">
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">채널 성장 전략 리포트</h1>
          <p className="text-sm text-gray-500">채널 정보를 입력하면 주간 업로드 플랜, 블루오션 키워드, 성장 팁을 생성합니다</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 mb-6">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <span className="text-[13px] font-medium text-gray-700">채널명 (선택)</span>
              <Input
                id="channelName"
                placeholder="예: 부업의 정석"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[13px] font-medium text-gray-700">현재 구독자 수 (선택)</span>
              <Input
                id="subscribers"
                placeholder="예: 1,200명"
                value={subscribers}
                onChange={(e) => setSubscribers(e.target.value)}
                className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[13px] font-medium text-gray-700">채널 주제/분야</span>
            <Textarea
              id="channelTopic"
              placeholder="예: 직장인 대상 부업, 재테크, 스마트스토어 운영 노하우"
              value={channelTopic}
              onChange={(e) => setChannelTopic(e.target.value)}
              rows={2}
              className="rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 transition-all"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={loading || !channelTopic.trim()} className="w-full h-12 rounded-xl bg-gray-900 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "AI가 전략을 수립 중..." : "전략 리포트 생성"}
          </button>
        </form>
      </div>

      {!result && !loading && !error && (
        <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="p-8 filter blur-[6px] select-none pointer-events-none opacity-50">
            <div className="grid grid-cols-7 gap-2 mb-6">
              {["월", "화", "수", "목", "금", "토", "일"].map((d) => (
                <div key={d} className="rounded-xl bg-emerald-50 p-3 text-center">
                  <div className="h-2.5 w-6 bg-emerald-200 rounded mx-auto mb-2" />
                  <div className="h-2 w-full bg-emerald-100 rounded" />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-6 rounded-full bg-gray-100 px-4" />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-4/5 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-3">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-gray-600">전략 리포트가 여기에 표시됩니다</p>
            <p className="text-xs text-gray-400 mt-1">위에서 채널 정보를 입력하고 생성하세요</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* Weekly Plan - Timeline style */}
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-500" />
              <h2 className="text-base font-semibold text-gray-900">주간 업로드 플랜</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                {result.weeklyPlan.map((day, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 bg-gradient-to-b from-white to-gray-50/50 p-4 hover:shadow-md transition-shadow">
                    <div className="text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg px-2 py-1 text-center mb-3">
                      {day.day}
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1.5 line-clamp-2">{day.action}</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">{day.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Niche Keywords - Tag cloud + table */}
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <Search className="h-4 w-4 text-emerald-500" />
              <h2 className="text-base font-semibold text-gray-900">블루오션 니치 키워드 TOP 20</h2>
            </div>
            <div className="p-6">
              {/* Keyword tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {result.nicheKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border ${competitionColors[kw.competition] || "bg-gray-100 text-gray-800"}`}
                  >
                    {kw.keyword}
                    <CopyButton text={kw.keyword} label="" />
                  </span>
                ))}
              </div>
              {/* Detail table */}
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/80 text-left">
                      <th className="px-4 py-3 font-medium text-gray-500 text-xs">#</th>
                      <th className="px-4 py-3 font-medium text-gray-500 text-xs">키워드</th>
                      <th className="px-4 py-3 font-medium text-gray-500 text-xs">경쟁도</th>
                      <th className="px-4 py-3 font-medium text-gray-500 text-xs">월 검색량</th>
                      <th className="px-4 py-3 font-medium text-gray-500 text-xs">기회 분석</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {result.nicheKeywords.map((kw, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{kw.keyword}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold ${competitionColors[kw.competition] || ""}`}>
                            {kw.competition}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{kw.volume}</td>
                        <td className="px-4 py-3 text-xs text-gray-500 max-w-xs">{kw.opportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Growth Tips - Cards */}
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <h2 className="text-base font-semibold text-gray-900">채널 성장 핵심 팁</h2>
            </div>
            <div className="p-6 grid gap-3 sm:grid-cols-2">
              {result.growthTips.map((tip, i) => (
                <div key={i} className="rounded-xl border border-gray-100 bg-gradient-to-br from-emerald-50/50 to-white p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-relaxed text-gray-700">{tip}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <CopyButton text={tip} label="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </FeatureGate>
  );
}
