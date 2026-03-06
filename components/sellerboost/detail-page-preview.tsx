"use client";

import type { SellerboostOutput } from "@/types";

interface Props {
  result: SellerboostOutput;
}

export default function DetailPagePreview({ result }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* 상단: 상품명 영역 */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white px-6 py-5">
        <h2 className="text-lg font-bold text-gray-900 leading-snug">
          {result.title}
        </h2>
        <p className="mt-1.5 text-sm text-gray-500">{result.subtitle}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {result.seoKeywords.map((kw) => (
            <span
              key={kw}
              className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* 핵심 특징 */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">
          KEY FEATURES
        </div>
        <div className="space-y-3">
          {result.features.map((f, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="shrink-0 w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-500">{i + 1}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed pt-0.5">{f}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 사용 시나리오 */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-br from-blue-50/30 to-indigo-50/20">
        <div className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-3">
          USAGE SCENARIO
        </div>
        <p className="text-sm text-gray-700 leading-relaxed italic">
          &ldquo;{result.scenario}&rdquo;
        </p>
      </div>

      {/* CTA */}
      <div className="px-6 py-5 bg-gradient-to-r from-blue-50/50 to-blue-50/80 text-center">
        <p className="text-base font-bold text-blue-600">{result.cta}</p>
      </div>
    </div>
  );
}
