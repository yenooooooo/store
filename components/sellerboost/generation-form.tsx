"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Loader2, Link2, Check } from "lucide-react";
import FeatureList from "./feature-list";
import ImageUpload from "./image-upload";
import {
  SELLERBOOST_CATEGORIES,
  SELLERBOOST_PLATFORMS,
} from "@/lib/mock-data";
import { useGenerationStore } from "@/stores/generation-store";
import { useAuthStore } from "@/stores/auth-store";
import { isAdmin } from "@/lib/plan-features";
import UpgradeModal from "@/components/shared/upgrade-modal";
import { toast } from "sonner";
import type { SellerboostOutput, StreamEvent } from "@/types";

interface CrawledProduct {
  productName: string;
  price: string;
  category: string;
  features: string[];
  reviewSummary: string[];
  imageUrls: string[];
  platform: "naver" | "coupang" | "11st";
}

interface Props {
  onResult: (result: SellerboostOutput, generationId?: string) => void;
}

const CATEGORY_MAP: Record<string, string> = {
  "패션": "fashion", "의류": "fashion", "신발": "fashion", "가방": "fashion",
  "식품": "food", "건강식품": "food", "음료": "food",
  "전자": "electronics", "가전": "electronics", "디지털": "electronics", "컴퓨터": "electronics",
  "뷰티": "beauty", "화장품": "beauty", "스킨케어": "beauty",
  "생활": "living", "주방": "living", "인테리어": "living", "가구": "living",
  "스포츠": "sports", "레저": "sports", "아웃도어": "sports",
};

function matchCategory(crawledCategory: string): string {
  const lower = crawledCategory.toLowerCase();
  for (const [keyword, value] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(keyword)) return value;
  }
  return "";
}

export default function GenerationForm({ onResult }: Props) {
  const [productUrl, setProductUrl] = useState("");
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawled, setCrawled] = useState(false);
  const [crawlFailed, setCrawlFailed] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [targetAudience, setTargetAudience] = useState("");
  const [reviewContext, setReviewContext] = useState<string[]>([]);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const productNameRef = useRef<HTMLInputElement>(null);

  const { isGenerating, setGenerating, appendText, reset } =
    useGenerationStore();
  const { profile, hasCredits, setProfile } = useAuthStore();

  async function handleCrawl() {
    if (!productUrl.trim()) return;
    setIsCrawling(true);
    setCrawled(false);
    setCrawlFailed(false);
    try {
      const res = await fetch("/api/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: productUrl.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "크롤링에 실패했습니다" }));
        throw new Error(err.error);
      }
      const data: CrawledProduct = await res.json();

      if (data.productName) setProductName(data.productName);
      if (data.platform) setPlatform(data.platform);
      if (data.category) {
        const mapped = matchCategory(data.category);
        if (mapped) setCategory(mapped);
      }
      if (data.features.length > 0) setFeatures(data.features.slice(0, 5));
      if (data.reviewSummary.length > 0) setReviewContext(data.reviewSummary);

      setCrawled(true);
      toast.success(`"${data.productName}" 상품 정보를 불러왔습니다`);
    } catch {
      setCrawlFailed(true);
      toast.info("아래에 상품명을 입력하고 '자동 채우기'를 눌러주세요!");

      // URL에서 플랫폼은 자동 설정
      const url = productUrl.trim();
      if (url.includes("smartstore.naver.com") || url.includes("brand.naver.com")) {
        setPlatform("naver");
      } else if (url.includes("coupang.com")) {
        setPlatform("coupang");
      } else if (url.includes("11st.co.kr")) {
        setPlatform("11st");
      }

      // 상품명 입력란으로 포커스 이동
      setTimeout(() => productNameRef.current?.focus(), 300);
    } finally {
      setIsCrawling(false);
    }
  }

  // 상품명 입력 후 자동 보강 (URL 크롤링 실패 시)
  async function handleEnrichByName() {
    if (!productName.trim()) return;
    setIsEnriching(true);
    try {
      const res = await fetch("/api/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: productName.trim() }),
      });
      if (!res.ok) return;
      const data: CrawledProduct = await res.json();

      if (data.category && !category) {
        const mapped = matchCategory(data.category);
        if (mapped) setCategory(mapped);
      }
      if (data.features.length > 0 && features.every((f) => !f.trim())) {
        setFeatures(data.features.slice(0, 5));
      }
      if (data.price) {
        toast.success(`시장 정보를 불러왔습니다 (평균가: ${Number(data.price).toLocaleString()}원)`);
      }
      setCrawlFailed(false);
      setCrawled(true);
    } catch {
      // 실패해도 무시 — 사용자가 직접 입력 가능
    } finally {
      setIsEnriching(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validFeatures = features.filter((f) => f.trim());
    if (!productName || !category || !platform || validFeatures.length === 0) return;

    if (!hasCredits()) {
      setShowUpgrade(true);
      return;
    }

    reset();
    setGenerating(true);

    try {
      const res = await fetch("/api/generate/detail-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          category,
          platform,
          features: validFeatures,
          targetAudience: targetAudience || undefined,
          reviewContext: reviewContext.length > 0 ? reviewContext : undefined,
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
            const data: StreamEvent = JSON.parse(line.slice(6));
            if ("error" in data) {
              throw new Error(data.error);
            }
            if ("text" in data) {
              fullText += data.text;
              appendText(data.text);
            }
          } catch (parseErr) {
            if (parseErr instanceof Error && parseErr.message !== "Unexpected end of JSON input") {
              throw parseErr;
            }
          }
        }
      }

      if (buffer.startsWith("data: ")) {
        try {
          const data: StreamEvent = JSON.parse(buffer.slice(6));
          if ("text" in data) {
            fullText += data.text;
            appendText(data.text);
          }
        } catch {
          // skip
        }
      }

      // Claude가 JSON 외 텍스트를 포함할 수 있으므로 { } 블록만 추출
      console.log("[DEBUG] fullText:", fullText);

      if (!fullText.trim()) {
        throw new Error("AI 응답이 비어있습니다. 다시 시도해주세요.");
      }

      const jsonMatch = fullText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("AI 응답을 파싱할 수 없습니다. 응답: " + fullText.slice(0, 200));
      }
      const parsed: SellerboostOutput = JSON.parse(jsonMatch[0]);
      onResult(parsed);

      // 로컬 크레딧 업데이트 (관리자 제외)
      if (profile && !isAdmin(profile.email)) {
        setProfile({ ...profile, credits_used: profile.credits_used + 1 });
      }

      // 생성 기록 저장 → ID를 콜백으로 전달
      fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "sellerboost",
          inputData: { productName, category, platform, features: validFeatures, targetAudience, productUrl: productUrl || undefined },
          outputData: parsed,
        }),
      })
        .then((r) => r.ok ? r.json() : null)
        .then((data) => { if (data?.id) onResult(parsed, data.id); })
        .catch(() => {});
    } catch (err) {
      const message = err instanceof Error ? err.message : "생성에 실패했습니다";
      useGenerationStore.getState().setError(message);
    } finally {
      setGenerating(false);
    }
  }

  const canSubmit =
    productName.trim() &&
    category &&
    platform &&
    features.some((f) => f.trim()) &&
    !isGenerating;

  const filledCount = [
    productName.trim(),
    category,
    platform,
    features.some((f) => f.trim()),
  ].filter(Boolean).length;
  const totalFields = 4;
  const filledPercent = Math.round((filledCount / totalFields) * 100);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-900">상품 정보 입력</h2>
        <p className="text-xs text-gray-400 mt-1">필수 항목을 입력하면 AI가 상세페이지를 생성합니다</p>
      </div>
      <div className="flex items-center gap-2 mt-3 mb-6">
        <div className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full bg-gray-900 transition-all" style={{ width: `${filledPercent}%` }} />
        </div>
        <span className="text-[11px] text-gray-400">{filledCount}/{totalFields}</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* URL 자동 입력 */}
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-gray-700">상품 URL로 자동 입력</span>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="스마트스토어 / 쿠팡 URL 붙여넣기"
                value={productUrl}
                onChange={(e) => { setProductUrl(e.target.value); setCrawled(false); }}
                className="h-11 pl-9 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all"
              />
            </div>
            <button
              type="button"
              onClick={handleCrawl}
              disabled={!productUrl.trim() || isCrawling}
              className="h-11 px-4 rounded-xl bg-blue-600 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
            >
              {isCrawling ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : crawled ? (
                <Check className="h-4 w-4" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
              {isCrawling ? "분석 중..." : crawled ? "완료" : "불러오기"}
            </button>
          </div>
          <p className="text-[11px] text-gray-400">URL을 입력하면 상품명, 카테고리, 특징을 자동으로 채워줍니다</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center"><span className="bg-white px-3 text-[11px] text-gray-400">또는 직접 입력</span></div>
        </div>

        {/* 상품명 */}
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-gray-700">상품명</span>
          <div className="flex gap-2">
            <Input
              ref={productNameRef}
              id="productName"
              placeholder="예: 프리미엄 무선 블루투스 이어폰"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={`h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all ${crawlFailed ? "border-amber-300 bg-amber-50/30" : ""}`}
            />
            {crawlFailed && productName.trim() && (
              <button
                type="button"
                onClick={handleEnrichByName}
                disabled={isEnriching}
                className="h-11 px-3 rounded-xl bg-green-600 text-sm font-semibold text-white transition-all hover:bg-green-700 active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5 shrink-0"
              >
                {isEnriching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {isEnriching ? "검색 중..." : "자동 채우기"}
              </button>
            )}
          </div>
          {crawlFailed && (
            <p className="text-[11px] text-amber-600">URL에서 상품 정보를 불러올 수 없었습니다. 상품명을 입력 후 &quot;자동 채우기&quot;를 누르면 AI가 카테고리와 특징을 채워드립니다.</p>
          )}
        </div>

        {/* 카테고리 + 플랫폼 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[13px] font-medium text-gray-700">카테고리</span>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:ring-4 focus:ring-blue-50">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                {SELLERBOOST_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <span className="text-[13px] font-medium text-gray-700">플랫폼</span>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:ring-4 focus:ring-blue-50">
                <SelectValue placeholder="플랫폼 선택" />
              </SelectTrigger>
              <SelectContent>
                {SELLERBOOST_PLATFORMS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 이미지 분석 */}
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-gray-700">상품 이미지 (선택)</span>
          <ImageUpload
            onAnalyzed={(analyzed) => setFeatures(analyzed)}
          />
        </div>

        {/* 특징 */}
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-gray-700">핵심 특징</span>
          <FeatureList features={features} onChange={setFeatures} />
        </div>

        {/* 타겟 고객 */}
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-gray-700">타겟 고객 (선택)</span>
          <Textarea
            id="target"
            placeholder="예: 20~30대 직장인, 운동을 즐기는 사람"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            rows={2}
            className="rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full h-12 rounded-xl bg-gray-900 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              생성 중...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              상세페이지 생성
            </>
          )}
        </button>
      </form>
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </div>
  );
}
