"use client";

import { useEffect, useState } from "react";
import { FileText, Loader2, History, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import FeatureGate from "@/components/shared/feature-gate";
import GenerationResult from "@/components/sellerboost/generation-result";
import type { SellerboostOutput } from "@/types";

interface Generation {
  id: string;
  input_data: { productName?: string; productUrl?: string };
  output_data: SellerboostOutput & { conversionScore?: number };
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
  if (score >= 80) return "bg-green-50 text-green-700";
  if (score >= 60) return "bg-yellow-50 text-yellow-700";
  return "bg-gray-100 text-gray-600";
}

export default function SellerboostHistoryPage() {
  const [items, setItems] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Generation | null>(null);

  useEffect(() => {
    fetch("/api/generations?type=sellerboost&limit=50")
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  // 상세보기 모드
  if (selected) {
    const output = selected.output_data;
    const isValid = output?.title && output?.features;

    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          목록으로 돌아가기
        </button>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            {selected.input_data?.productName || "상세페이지"}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {formatRelativeTime(selected.created_at)}에 생성됨
            {selected.input_data?.productUrl && (
              <> · <a href={selected.input_data.productUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">원본 상품 보기</a></>
            )}
          </p>
        </div>

        {isValid ? (
          <GenerationResult result={output as SellerboostOutput} generationId={selected.id} />
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
            <p className="text-sm text-gray-500">결과 데이터를 표시할 수 없습니다</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <FeatureGate feature="history">
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 shadow-lg shadow-gray-500/20">
            <History className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">생성 기록</h1>
            <p className="text-sm text-gray-500">이전에 생성한 상세페이지를 클릭하면 상세 결과를 볼 수 있습니다</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <History className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">아직 생성 기록이 없습니다</p>
          <p className="text-xs text-gray-400 mt-1">상세페이지를 생성하면 여기에 기록됩니다</p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 mt-6 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <FileText className="h-4 w-4" />
            첫 상세페이지 생성하기
          </Link>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <div className="grid grid-cols-[1fr_120px_100px_140px] gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50/50">
              <span className="text-xs font-medium text-gray-500">상품명</span>
              <span className="text-xs font-medium text-gray-500">전환율 점수</span>
              <span className="text-xs font-medium text-gray-500">유형</span>
              <span className="text-xs font-medium text-gray-500">생성일</span>
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelected(item)}
                className="grid grid-cols-[1fr_120px_100px_140px] gap-4 px-6 py-4 border-b border-gray-50 hover:bg-blue-50/50 transition-colors cursor-pointer group"
              >
                <span className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {item.input_data?.productName || "상세페이지"}
                </span>
                <span>
                  {item.output_data?.conversionScore ? (
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${scoreBadgeClass(item.output_data.conversionScore)}`}>
                      {item.output_data.conversionScore}점
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </span>
                <span>
                  <span className="inline-flex items-center rounded-md border border-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-500">셀러부스트</span>
                </span>
                <span className="text-sm text-gray-400">{formatRelativeTime(item.created_at)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
            >
              <FileText className="h-4 w-4" />
              새 상세페이지 생성하기
            </Link>
          </div>
        </>
      )}
    </div>
    </FeatureGate>
  );
}
