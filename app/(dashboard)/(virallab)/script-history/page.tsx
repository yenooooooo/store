"use client";

import { useEffect, useState } from "react";
import { Film, Loader2, History } from "lucide-react";
import Link from "next/link";
import FeatureGate from "@/components/shared/feature-gate";

interface Generation {
  id: string;
  input_data: { topic?: string };
  output_data: { hookScore?: number };
  created_at: string;
}

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
}

function scoreBadgeClass(score: number): string {
  if (score >= 80) return "bg-violet-50 text-violet-700";
  if (score >= 60) return "bg-yellow-50 text-yellow-700";
  return "bg-gray-100 text-gray-600";
}

export default function VirallabHistoryPage() {
  const [items, setItems] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/generations?type=virallab&limit=50")
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <FeatureGate feature="script-history">
    <div>
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/20">
            <Film className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">스크립트 기록</h1>
            <p className="text-sm text-gray-500">이전에 생성한 스크립트 목록입니다</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-4">
            <Film className="h-6 w-6 text-violet-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">아직 생성한 스크립트가 없습니다</p>
          <p className="text-xs text-gray-400 mt-1">스크립트를 생성하면 여기에 기록됩니다</p>
          <Link
            href="/script"
            className="inline-flex items-center gap-2 mt-6 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <Film className="h-4 w-4" />
            첫 스크립트 생성하기
          </Link>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_120px_100px_140px] gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50/50">
              <span className="text-xs font-medium text-gray-500">주제</span>
              <span className="text-xs font-medium text-gray-500">후킹 점수</span>
              <span className="text-xs font-medium text-gray-500">플랫폼</span>
              <span className="text-xs font-medium text-gray-500">생성일</span>
            </div>
            {/* Rows */}
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_120px_100px_140px] gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {item.input_data?.topic || "스크립트"}
                </span>
                <span>
                  {item.output_data?.hookScore ? (
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${scoreBadgeClass(item.output_data.hookScore)}`}>
                      {item.output_data.hookScore}점
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </span>
                <span>
                  <span className="inline-flex items-center rounded-md border border-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-500">바이럴랩</span>
                </span>
                <span className="text-sm text-gray-400">{formatRelativeTime(item.created_at)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/script"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Film className="h-4 w-4" />
              새 스크립트 생성하기
            </Link>
          </div>
        </>
      )}
    </div>
    </FeatureGate>
  );
}
