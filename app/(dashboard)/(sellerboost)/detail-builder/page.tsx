"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Loader2,
  Download,
  Copy,
  Check,
  Palette,
  AlertCircle,
  Plus,
  X,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import UpgradeModal from "@/components/shared/upgrade-modal";
import FeatureGate from "@/components/shared/feature-gate";
import TemplateRenderer, {
  generateTemplateHtml,
} from "@/components/sellerboost/templates/template-renderer";
import TemplateEditor from "@/components/sellerboost/templates/template-editor";
import { TEMPLATES } from "@/components/sellerboost/templates/template-types";
import type { TemplateData } from "@/components/sellerboost/templates/template-types";
import type { SellerboostOutput } from "@/types";

const BRAND_COLORS = [
  { value: "#3b82f6", label: "블루" },
  { value: "#8b5cf6", label: "퍼플" },
  { value: "#ef4444", label: "레드" },
  { value: "#f97316", label: "오렌지" },
  { value: "#22c55e", label: "그린" },
  { value: "#c4a35a", label: "골드" },
  { value: "#78716c", label: "브라운" },
  { value: "#111111", label: "블랙" },
];

export default function DetailBuilderPage() {
  // Step 1: 정보 입력
  const [productName, setProductName] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [targetAudience, setTargetAudience] = useState("");
  const [productImages, setProductImages] = useState<string[]>([]);

  // Step 2: 템플릿 선택
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");
  const [brandColor, setBrandColor] = useState("#3b82f6");

  // State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<SellerboostOutput | null>(null);
  const [copied, setCopied] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [editableData, setEditableData] = useState<TemplateData | null>(null);
  const [originalData, setOriginalData] = useState<TemplateData | null>(null);

  const { profile, hasCredits, setProfile } = useAuthStore();

  function addFeature() {
    if (features.length < 8) setFeatures([...features, ""]);
  }

  function removeFeature(i: number) {
    setFeatures(features.filter((_, idx) => idx !== i));
  }

  function updateFeature(i: number, value: string) {
    const updated = [...features];
    updated[i] = value;
    setFeatures(updated);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (productImages.length >= 5) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        setProductImages((prev) => [...prev, base64].slice(0, 5));
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImage(i: number) {
    setProductImages(productImages.filter((_, idx) => idx !== i));
  }

  async function handleGenerate() {
    const validFeatures = features.filter((f) => f.trim());
    if (!productName.trim() || validFeatures.length === 0) return;

    if (!hasCredits()) {
      setShowUpgrade(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate/detail-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          category: "general",
          platform: "naver",
          features: validFeatures,
          targetAudience: targetAudience || undefined,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        let message = "생성에 실패했습니다";
        try {
          const err = JSON.parse(text);
          message = err.error || message;
        } catch {
          message = text || message;
        }
        throw new Error(message);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("스트리밍을 시작할 수 없습니다");

      const decoder = new TextDecoder();
      let fullText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if ("text" in data) fullText += data.text;
          } catch {
            // incomplete chunk
          }
        }
      }

      if (buffer.startsWith("data: ")) {
        try {
          const data = JSON.parse(buffer.slice(6));
          if ("text" in data) fullText += data.text;
        } catch {
          // skip
        }
      }

      const jsonMatch = fullText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("AI 응답을 파싱할 수 없습니다");

      const parsed: SellerboostOutput = JSON.parse(jsonMatch[0]);
      setResult(parsed);

      const tplData: TemplateData = {
        productName: parsed.title,
        subtitle: parsed.subtitle,
        features: parsed.features,
        scenario: parsed.scenario,
        cta: parsed.cta,
        seoKeywords: parsed.seoKeywords,
        productImages,
        brandColor,
      };
      setOriginalData({ ...tplData, features: [...tplData.features], seoKeywords: [...tplData.seoKeywords] });
      setEditableData({ ...tplData, features: [...tplData.features], seoKeywords: [...tplData.seoKeywords] });
      setStep(3);

      if (profile) {
        setProfile({ ...profile, credits_used: profile.credits_used + 1 });
      }

      fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "sellerboost",
          inputData: { productName, features: validFeatures, targetAudience, feature: "detail-builder" },
          outputData: parsed,
        }),
      }).catch(() => {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "생성에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyHtml() {
    if (!editableData) return;
    const html = generateTemplateHtml(selectedTemplate, editableData);
    await navigator.clipboard.writeText(html);
    setCopied(true);
    toast.success("HTML이 복사되었습니다! 스마트스토어 에디터에 붙여넣으세요.");
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDownloadHtml() {
    if (!editableData) return;
    const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<title>${editableData.productName}</title>
</head>
<body style="margin:0;padding:20px;background:#f5f5f5;">
${generateTemplateHtml(selectedTemplate, editableData)}
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${editableData.productName}_상세페이지.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("HTML 파일이 다운로드되었습니다!");
  }

  const canProceedStep1 = productName.trim() && features.some((f) => f.trim());

  return (
    <FeatureGate feature="detail-builder">
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">상세페이지 빌더</h1>
            <p className="text-sm text-gray-500">AI 카피 + 프로 디자인 템플릿 = 바로 쓸 수 있는 상세페이지</p>
          </div>
        </div>
      </div>

      {/* 스텝 표시 */}
      <div className="flex items-center gap-3 mb-10">
        {[
          { num: 1, label: "정보 입력" },
          { num: 2, label: "템플릿 선택" },
          { num: 3, label: "결과 확인" },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-3">
            <div className={`flex items-center gap-2 ${step >= s.num ? "text-gray-900" : "text-gray-300"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step > s.num ? "bg-gray-900 text-white" :
                step === s.num ? "bg-gray-900 text-white ring-4 ring-gray-900/10" :
                "bg-gray-100 text-gray-400"
              }`}>
                {step > s.num ? "\u2713" : s.num}
              </div>
              <span className={`text-sm font-medium ${step >= s.num ? "text-gray-900" : "text-gray-400"}`}>{s.label}</span>
            </div>
            {i < 2 && <div className={`w-12 h-px ${step > s.num ? "bg-gray-900" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3 mb-6">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Step 1: 정보 입력 */}
      {step === 1 && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">상품 정보</h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm text-gray-500">상품명</Label>
                <Input
                  placeholder="예: 프리미엄 무선 블루투스 이어폰"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-500">핵심 특징</Label>
                <div className="space-y-2">
                  {features.map((f, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        placeholder={`특징 ${i + 1}`}
                        value={f}
                        onChange={(e) => updateFeature(i, e.target.value)}
                        className="rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                      />
                      {features.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFeature(i)}
                          className="rounded-xl"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {features.length < 8 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                    className="gap-1 rounded-xl"
                  >
                    <Plus className="h-3.5 w-3.5" /> 특징 추가
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-500">타겟 고객 (선택)</Label>
                <Textarea
                  placeholder="예: 20~30대 직장인, 운동을 즐기는 사람"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  rows={2}
                  className="rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <Button
                disabled={!canProceedStep1}
                onClick={() => setStep(2)}
                className="w-full rounded-xl"
                size="lg"
              >
                다음: 템플릿 선택
              </Button>
            </div>
          </div>

          {/* 이미지 업로드 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-gray-400" /> 상품 이미지 (선택)
            </h2>
            <div className="space-y-4 mt-4">
              <p className="text-xs text-gray-500">
                상품 이미지를 올리면 상세페이지에 자동 배치됩니다. 최대 5장.
              </p>

              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                <ImageIcon className="h-8 w-8 text-gray-300 mb-2" />
                <span className="text-sm text-gray-400">클릭하여 이미지 업로드</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              {productImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {productImages.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img}
                        alt={`상품 ${i + 1}`}
                        className="w-full h-24 object-cover rounded-xl border border-gray-100"
                      />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: 템플릿 선택 */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Palette className="h-4 w-4 text-gray-400" /> 디자인 선택
            </h2>
            <div className="space-y-6">
              {/* 템플릿 */}
              <div>
                <Label className="mb-3 block text-sm text-gray-500">템플릿</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={`rounded-2xl border-2 p-4 text-left transition-all ${
                        selectedTemplate === t.id
                          ? "border-gray-900 bg-gray-50 shadow-sm"
                          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="text-2xl mb-2">{t.thumbnail}</div>
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {t.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 브랜드 컬러 */}
              <div>
                <Label className="mb-3 block text-sm text-gray-500">브랜드 컬러</Label>
                <div className="flex flex-wrap gap-2">
                  {BRAND_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setBrandColor(c.value)}
                      className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 transition-all ${
                        brandColor === c.value
                          ? "border-gray-900 shadow-sm bg-gray-50"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-gray-200"
                        style={{ background: c.value }}
                      />
                      <span className="text-xs font-medium text-gray-600">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl">
                  이전
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex-1 gap-2 rounded-xl"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      AI가 상세페이지를 만들고 있습니다...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      상세페이지 생성
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: 결과 */}
      {step === 3 && editableData && originalData && (
        <div className="space-y-6">
          {/* 액션 바 */}
          <div className="flex gap-3">
            <Button onClick={handleCopyHtml} className="flex-1 gap-2 rounded-xl" size="lg">
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "복사 완료!" : "HTML 복사 (스토어에 붙여넣기)"}
            </Button>
            <Button
              onClick={handleDownloadHtml}
              variant="outline"
              size="lg"
              className="gap-2 rounded-xl"
            >
              <Download className="h-4 w-4" />
              HTML 다운로드
            </Button>
          </div>

          {/* 템플릿 변경 */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">템플릿:</span>
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  selectedTemplate === t.id
                    ? "border-gray-900 bg-gray-900/5 text-gray-900 font-bold"
                    : "border-gray-200 text-gray-500 hover:border-gray-400"
                }`}
              >
                {t.thumbnail} {t.name}
              </button>
            ))}
          </div>

          {/* 편집 + 프리뷰 */}
          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            <div className="space-y-4">
              <TemplateEditor
                data={editableData}
                onChange={setEditableData}
                originalData={originalData}
              />

              {/* 분석 정보 */}
              {result && (
                <div className="rounded-2xl border border-gray-100 bg-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-900">전환율 예측</span>
                    <Badge
                      className={
                        result.conversionScore >= 85
                          ? "bg-green-100 text-green-800"
                          : result.conversionScore >= 70
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {result.conversionScore}점
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {result.seoKeywords.map((kw) => (
                      <Badge key={kw} variant="outline" className="text-xs rounded-lg">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {result.improvements.map((imp, i) => (
                      <p key={i} className="text-xs text-gray-500">
                        {imp}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 프리뷰 */}
            <TemplateRenderer templateId={selectedTemplate} data={editableData} />
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setResult(null);
              setEditableData(null);
              setOriginalData(null);
              setStep(1);
            }}
            className="w-full rounded-xl"
          >
            새로 만들기
          </Button>
        </div>
      )}

      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </div>
    </FeatureGate>
  );
}
