"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CopyButton from "@/components/shared/copy-button";
import ScoreGauge from "@/components/shared/score-gauge";
import {
  Lightbulb,
  ImageIcon,
  Type,
  FileText,
  Eye,
  Check,
  Download,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import ShareButton from "@/components/shared/share-button";
import type { VirallabOutput } from "@/types";

interface Props {
  result: VirallabOutput;
  generationId?: string | null;
}

function buildFullScript(r: VirallabOutput): string {
  return `[제목] ${r.title}

[Hook]
${r.hook}

[스크립트]
${r.script}`;
}

export default function ScriptResult({ result, generationId }: Props) {
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);

  async function handleCopyAll() {
    try {
      await navigator.clipboard.writeText(buildFullScript(result));
      setCopied(true);
      toast.success("전체 스크립트가 복사되었습니다");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("복사에 실패했습니다");
    }
  }

  const scriptParagraphs = result.script
    .split("\n")
    .filter((line) => line.trim().length > 0);

  return (
    <div className="space-y-5">
      {/* 전체 스크립트 복사 + 공유 */}
      <div className="flex gap-3">
        <button
          onClick={handleCopyAll}
          className="flex-1 h-12 rounded-xl bg-gray-900 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-800 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {copied ? "복사 완료!" : "전체 스크립트 복사"}
        </button>
        <ShareButton generationId={generationId ?? null} />
      </div>

      {/* 탭: 스크립트 / 분석 */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b border-gray-100 px-1 pt-1">
            <TabsList className="w-full bg-transparent h-11 p-0 gap-0">
              <TabsTrigger
                value="preview"
                className="flex-1 rounded-t-xl rounded-b-none h-10 gap-1.5 text-sm data-[state=active]:bg-gray-50 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
              >
                <Eye className="h-3.5 w-3.5" />
                스크립트
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className="flex-1 rounded-t-xl rounded-b-none h-10 gap-1.5 text-sm data-[state=active]:bg-gray-50 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
              >
                <FileText className="h-3.5 w-3.5" />
                분석 & 제안
              </TabsTrigger>
            </TabsList>
          </div>

          {/* 스크립트 미리보기 탭 */}
          <TabsContent value="preview" className="m-0">
            <div className="p-6 space-y-5">
              {/* 제목 + Hook Score */}
              <div className="rounded-xl border border-gray-100 p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                        영상 제목
                      </span>
                      <CopyButton text={result.title} />
                    </div>
                    <p className="text-lg font-bold text-gray-900">{result.title}</p>
                  </div>
                  <div className="shrink-0">
                    <ScoreGauge
                      score={result.hookScore}
                      label="Hook Score"
                      size={120}
                    />
                  </div>
                </div>
              </div>

              {/* Hook 섹션 */}
              <div className="rounded-xl border border-gray-100 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-lg bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-600 uppercase tracking-wide">
                      Hook (처음 3초)
                    </span>
                    <Sparkles className="h-3.5 w-3.5 text-rose-400" />
                  </div>
                  <CopyButton text={result.hook} label="" />
                </div>
                <div className="rounded-xl border-l-[3px] border-l-rose-400 bg-rose-50/50 p-4">
                  <p className="text-sm leading-relaxed font-medium text-gray-800">
                    {result.hook}
                  </p>
                </div>
              </div>

              {/* 본문 스크립트 */}
              <div className="rounded-xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-900">본문 스크립트</span>
                  </div>
                  <CopyButton text={result.script} label="스크립트 복사" />
                </div>
                <div className="space-y-2.5">
                  {scriptParagraphs.map((paragraph, i) => (
                    <div
                      key={i}
                      className="group relative rounded-xl bg-gray-50/80 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-sm leading-relaxed text-gray-700 pr-8">{paragraph}</p>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CopyButton text={paragraph} label="" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 분석 & 제안 탭 */}
          <TabsContent value="analysis" className="m-0">
            <div className="p-6 space-y-8">
              {/* Hook Score 상세 */}
              <div className="flex flex-col items-center py-4">
                <ScoreGauge
                  score={result.hookScore}
                  label="Hook Score"
                  size={150}
                />
                <p className="text-xs text-gray-400 mt-4">
                  {result.hookScore >= 85
                    ? "상위 5% 수준의 훅입니다. 이탈률이 매우 낮을 것으로 예상됩니다."
                    : result.hookScore >= 70
                      ? "좋은 수준이지만 개선 여지가 있습니다."
                      : "아래 개선 제안을 적용해서 시청 유지율을 높여보세요."}
                </p>
              </div>

              <div className="h-px bg-gray-100" />

              {/* 제목 변형 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Type className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900">제목 변형</span>
                </div>
                <div className="space-y-2">
                  {result.titleVariants.map((variant, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5 hover:bg-gray-50/50 transition-colors"
                    >
                      <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500">
                        {i + 1}
                      </span>
                      <p className="flex-1 text-sm font-medium text-gray-800 min-w-0">
                        {variant}
                      </p>
                      <CopyButton text={variant} label="" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* 썸네일 제안 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900">썸네일 제안</span>
                </div>
                <div className="space-y-2">
                  {result.thumbnailSuggestions.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5 hover:bg-gray-50/50 transition-colors"
                    >
                      <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-xs font-bold text-violet-500">
                        {i + 1}
                      </span>
                      <span className="flex-1 text-sm text-gray-700">{s}</span>
                      <CopyButton text={s} label="" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* 개선 제안 */}
              <div>
                <div className="flex items-center gap-1.5 mb-4">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-semibold text-gray-900">
                    이렇게 개선하면 점수가 올라갑니다
                  </span>
                </div>
                <div className="space-y-2.5">
                  {result.improvements.map((imp, i) => (
                    <div
                      key={i}
                      className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50/50 p-4"
                    >
                      <div className="shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-amber-700">
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {imp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
