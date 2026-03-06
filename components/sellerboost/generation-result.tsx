"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ScoreGauge from "@/components/shared/score-gauge";
import DetailPagePreview from "./detail-page-preview";
import { generateTemplateHtml } from "./templates/template-renderer";
import { TEMPLATES } from "./templates/template-types";
import type { TemplateData } from "./templates/template-types";
import {
  Copy,
  Check,
  Eye,
  FileText,
  Lightbulb,
  Download,
  Search,
  Palette,
} from "lucide-react";
import { toast } from "sonner";
import ShareButton from "@/components/shared/share-button";
import type { SellerboostOutput } from "@/types";

interface Props {
  result: SellerboostOutput;
  generationId?: string | null;
}

function buildPlainText(r: SellerboostOutput): string {
  return `${r.title}

${r.subtitle}

${r.features.map((f, i) => `${i + 1}. ${f}`).join("\n")}

${r.scenario}

${r.cta}

SEO 키워드: ${r.seoKeywords.join(", ")}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildHtml(r: SellerboostOutput): string {
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#222;">
  <h1 style="font-size:22px;font-weight:700;margin-bottom:8px;">${r.title}</h1>
  <p style="font-size:15px;color:#666;margin-bottom:24px;">${r.subtitle}</p>

  <div style="background:#f8f9fa;border-radius:12px;padding:24px;margin-bottom:24px;">
    ${r.features
      .map(
        (f, i) =>
          `<div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:${i < r.features.length - 1 ? "16px" : "0"};">
        <div style="min-width:28px;height:28px;background:#3b82f6;color:white;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">${i + 1}</div>
        <p style="font-size:14px;line-height:1.6;margin:0;padding-top:3px;">${f}</p>
      </div>`
      )
      .join("\n    ")}
  </div>

  <div style="background:linear-gradient(135deg,#eff6ff,#eef2ff);border-radius:12px;padding:24px;margin-bottom:24px;">
    <p style="font-size:14px;line-height:1.7;color:#444;font-style:italic;margin:0;">"${r.scenario}"</p>
  </div>

  <div style="background:linear-gradient(90deg,#eff6ff,#dbeafe);border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
    <p style="font-size:16px;font-weight:700;color:#2563eb;margin:0;">${r.cta}</p>
  </div>
</div>`;
}

function resultToTemplateData(r: SellerboostOutput): TemplateData {
  return {
    productName: r.title,
    subtitle: r.subtitle,
    painPoints: r.painPoints || [],
    solution: r.solution || "",
    features: r.features,
    specs: r.specs || [],
    scenario: r.scenario,
    testimonial: r.testimonial || "",
    faq: r.faq || [],
    trustBadges: r.trustBadges || [],
    cta: r.cta,
    urgency: r.urgency || "",
    seoKeywords: r.seoKeywords,
    productImages: [],
    brandColor: "",
  };
}

export default function GenerationResult({ result, generationId }: Props) {
  const [activeTab, setActiveTab] = useState("preview");
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");

  function getSelectedHtml(): string {
    return generateTemplateHtml(selectedTemplate, resultToTemplateData(result));
  }

  async function handleCopy(type: "text" | "html") {
    try {
      const content = type === "html" ? getSelectedHtml() : buildPlainText(result);
      await navigator.clipboard.writeText(content);
      setCopiedType(type);
      toast.success(
        type === "html"
          ? "HTML이 복사되었습니다. 스마트스토어 에디터에 붙여넣으세요!"
          : "텍스트가 복사되었습니다."
      );
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      toast.error("복사에 실패했습니다");
    }
  }

  return (
    <div className="space-y-5">
      {/* 복사 버튼 바 */}
      <div className="flex gap-3">
        <button
          onClick={() => handleCopy("html")}
          className="flex-1 h-12 rounded-xl bg-gray-900 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-800 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {copiedType === "html" ? (
            <Check className="h-4 w-4" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {copiedType === "html" ? "복사 완료!" : "스마트스토어에 붙여넣기"}
        </button>
        <button
          onClick={() => handleCopy("text")}
          className="h-12 px-5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] flex items-center gap-2"
        >
          {copiedType === "text" ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          텍스트 복사
        </button>
        <ShareButton generationId={generationId ?? null} />
      </div>

      {/* 탭: 미리보기 / 분석 */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b border-gray-100 px-1 pt-1">
            <TabsList className="w-full bg-transparent h-11 p-0 gap-0">
              <TabsTrigger
                value="preview"
                className="flex-1 rounded-t-xl rounded-b-none h-10 gap-1.5 text-sm data-[state=active]:bg-gray-50 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
              >
                <Eye className="h-3.5 w-3.5" />
                미리보기
              </TabsTrigger>
              <TabsTrigger
                value="template"
                className="flex-1 rounded-t-xl rounded-b-none h-10 gap-1.5 text-sm data-[state=active]:bg-gray-50 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
              >
                <Palette className="h-3.5 w-3.5" />
                템플릿
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className="flex-1 rounded-t-xl rounded-b-none h-10 gap-1.5 text-sm data-[state=active]:bg-gray-50 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
              >
                <FileText className="h-3.5 w-3.5" />
                분석 & 개선
              </TabsTrigger>
            </TabsList>
          </div>

          {/* 미리보기 탭 */}
          <TabsContent value="preview" className="m-0">
            <div className="p-5">
              <DetailPagePreview result={result} />
            </div>
          </TabsContent>

          {/* 템플릿 탭 */}
          <TabsContent value="template" className="m-0">
            <div className="p-5 space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      selectedTemplate === t.id
                        ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span>{t.thumbnail}</span>
                    <span className="font-medium">{t.name}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-400">
                {TEMPLATES.find((t) => t.id === selectedTemplate)?.description}
              </p>
              <div
                className="rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                dangerouslySetInnerHTML={{ __html: getSelectedHtml() }}
              />
              <button
                onClick={() => handleCopy("html")}
                className="w-full h-11 rounded-xl bg-gray-900 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {copiedType === "html" ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                {copiedType === "html" ? "복사 완료!" : "이 템플릿 HTML 복사하기"}
              </button>
            </div>
          </TabsContent>

          {/* 분석 탭 */}
          <TabsContent value="analysis" className="m-0">
            <div className="p-6 space-y-8">
              {/* 전환율 점수 */}
              <div className="flex flex-col items-center py-4">
                <ScoreGauge
                  score={result.conversionScore}
                  label="전환율 예측 점수"
                  size={150}
                />
                <p className="text-xs text-gray-400 mt-4">
                  {result.conversionScore >= 85
                    ? "상위 5% 수준의 상세페이지입니다"
                    : result.conversionScore >= 70
                      ? "좋은 수준이지만 개선 여지가 있습니다"
                      : "아래 개선 제안을 적용해보세요"}
                </p>
              </div>

              <div className="h-px bg-gray-100" />

              {/* SEO 키워드 */}
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Search className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-[13px] font-medium text-gray-500">
                    SEO 키워드 (검색 노출용)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.seoKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* 개선 제안 */}
              <div>
                <div className="flex items-center gap-1.5 mb-4">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span className="text-[13px] font-medium text-gray-500">
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
