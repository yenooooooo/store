"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Instagram, BookOpen, Megaphone, Loader2, Sparkles, Plus, X, AlertCircle, PenTool } from "lucide-react";
import CopyButton from "@/components/shared/copy-button";
import UpgradeModal from "@/components/shared/upgrade-modal";
import { useAuthStore } from "@/stores/auth-store";
import FeatureGate from "@/components/shared/feature-gate";

interface MarketingCopyResult {
  instagram: string;
  blogReview: string;
  powerLink: string[];
}

export default function MarketingCopyPage() {
  const [productName, setProductName] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [targetAudience, setTargetAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MarketingCopyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const { profile, hasCredits, setProfile } = useAuthStore();

  function addFeature() {
    if (features.length < 5) {
      setFeatures([...features, ""]);
    }
  }

  function removeFeature(index: number) {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  }

  function updateFeature(index: number, value: string) {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  }

  async function handleGenerate() {
    const validFeatures = features.filter((f) => f.trim());
    if (!productName.trim() || validFeatures.length === 0) return;

    if (!hasCredits()) {
      setShowUpgrade(true);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate/marketing-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: productName.trim(),
          features: validFeatures,
          targetAudience: targetAudience.trim() || undefined,
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

      const data: MarketingCopyResult = await res.json();
      setResult(data);

      if (profile) {
        setProfile({ ...profile, credits_used: profile.credits_used + 1 });
      }

      fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "sellerboost",
          inputData: { productName, features: validFeatures, targetAudience },
          outputData: data,
        }),
      }).catch(() => {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "생성에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = productName.trim() && features.some((f) => f.trim()) && !loading;

  return (
    <FeatureGate feature="marketing-copy">
    <div>
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/20">
            <Megaphone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">마케팅 카피 원스톱 생성</h1>
            <p className="text-sm text-gray-500">상품 정보를 입력하면 인스타그램, 블로그, 파워링크 광고 문구를 자동 생성합니다</p>
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 mb-8">
        <div className="space-y-5">
          {/* Row 1: 상품명 + 타겟 고객 */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <span className="text-[13px] font-medium text-gray-700">상품명</span>
              <Input
                id="productName"
                placeholder="예: 프리미엄 무선 블루투스 이어폰"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[13px] font-medium text-gray-700">타겟 고객 (선택)</span>
              <Input
                id="targetAudience"
                placeholder="예: 20~30대 직장인, 출퇴근 시 음악 듣는 사람"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <span className="text-[13px] font-medium text-gray-700">핵심 특징</span>
            <div className="space-y-2">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-2 items-center group">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500 shrink-0">{i + 1}</div>
                  <Input
                    placeholder={`특징 ${i + 1}`}
                    value={feature}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      className="h-7 w-7 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center shrink-0"
                      onClick={() => removeFeature(i)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {features.length < 5 && (
              <button type="button" className="flex items-center gap-1.5 rounded-xl border border-dashed border-gray-200 px-3 py-2 text-xs font-medium text-gray-400 hover:text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all" onClick={addFeature}>
                <Plus className="h-3.5 w-3.5" /> 특징 추가
              </button>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <button onClick={handleGenerate} disabled={!canSubmit} className="w-full h-12 rounded-xl bg-gray-900 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> 생성 중...</>
            ) : (
              <><Sparkles className="h-4 w-4" /> 마케팅 카피 생성</>
            )}
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && !result && (
        <div className="rounded-2xl border bg-white p-12 flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center">
              <Megaphone className="h-7 w-7 text-pink-500" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Loader2 className="h-5 w-5 text-pink-500 animate-spin" />
            </div>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">3개 채널 마케팅 카피를 작성하고 있습니다</p>
            <p className="text-sm text-gray-400 mt-1">인스타그램, 블로그, 파워링크 문구 생성 중... 약 15초 소요</p>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      )}

      {/* Empty state: 3 blurred channel cards */}
      {!loading && !result && !error && (
        <div className="relative">
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { icon: Instagram, label: "인스타그램", color: "from-pink-400 to-rose-500" },
              { icon: BookOpen, label: "블로그 후기", color: "from-green-400 to-emerald-500" },
              { icon: Megaphone, label: "파워링크", color: "from-blue-400 to-indigo-500" },
            ].map((channel) => (
              <div key={channel.label} className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
                <div className="p-5 filter blur-[5px] select-none pointer-events-none opacity-50">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${channel.color} flex items-center justify-center`}>
                      <channel.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-100 rounded" />
                    <div className="h-3 w-5/6 bg-gray-100 rounded" />
                    <div className="h-3 w-4/6 bg-gray-100 rounded" />
                    <div className="h-3 w-full bg-gray-100 rounded" />
                    <div className="h-3 w-3/4 bg-gray-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px]">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center mb-3">
              <PenTool className="h-6 w-6 text-pink-400" />
            </div>
            <p className="text-sm font-medium text-gray-600">3개 채널 마케팅 카피가 여기에 생성됩니다</p>
            <p className="text-xs text-gray-400 mt-1">위에서 상품 정보를 입력하고 생성하세요</p>
          </div>
        </div>
      )}

      {/* Results: 3 channel cards side by side */}
      {result && (
        <div className="space-y-6">
          <button onClick={() => setResult(null)} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
            새로 생성하기
          </button>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Instagram */}
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-pink-400 to-rose-500" />
              <div className="px-5 py-4 flex items-center justify-between">
                <div className="text-sm font-semibold flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                    <Instagram className="h-3.5 w-3.5 text-white" />
                  </div>
                  인스타그램
                </div>
                <CopyButton text={result.instagram} />
              </div>
              <div className="px-5 pb-5">
                <div className="rounded-lg bg-gray-50 p-4 text-sm whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
                  {result.instagram}
                </div>
              </div>
            </div>

            {/* Blog */}
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-green-400 to-emerald-500" />
              <div className="px-5 py-4 flex items-center justify-between">
                <div className="text-sm font-semibold flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <BookOpen className="h-3.5 w-3.5 text-white" />
                  </div>
                  블로그 후기
                </div>
                <CopyButton text={result.blogReview} />
              </div>
              <div className="px-5 pb-5">
                <div className="rounded-lg bg-gray-50 p-4 text-sm whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
                  {result.blogReview}
                </div>
              </div>
            </div>

            {/* PowerLink */}
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500" />
              <div className="px-5 py-4 flex items-center justify-between">
                <div className="text-sm font-semibold flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                    <Megaphone className="h-3.5 w-3.5 text-white" />
                  </div>
                  파워링크 3종
                </div>
              </div>
              <div className="px-5 pb-5 space-y-2">
                {result.powerLink.map((text, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 rounded-lg border p-3">
                    <div className="flex gap-2">
                      <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed">{text}</p>
                    </div>
                    <CopyButton text={text} label="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </div>
    </FeatureGate>
  );
}
