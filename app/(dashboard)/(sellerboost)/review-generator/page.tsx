"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Loader2, Star, AlertCircle, MessageSquareText } from "lucide-react";
import CopyButton from "@/components/shared/copy-button";
import { useAuthStore } from "@/stores/auth-store";
import UpgradeModal from "@/components/shared/upgrade-modal";
import FeatureGate from "@/components/shared/feature-gate";

const PLATFORMS = [
  { value: "네이버 스마트스토어", label: "네이버 스마트스토어" },
  { value: "쿠팡", label: "쿠팡" },
  { value: "11번가", label: "11번가" },
  { value: "올리브영", label: "올리브영" },
  { value: "무신사", label: "무신사" },
  { value: "오늘의집", label: "오늘의집" },
];

const LENGTHS = [
  { value: "short", label: "간단 (3~4줄)" },
  { value: "medium", label: "정성 (8~12줄)" },
  { value: "long", label: "블로그급 (20줄+)" },
];

const TONES = [
  { value: "honest", label: "솔직담백" },
  { value: "friendly", label: "친근한" },
  { value: "professional", label: "꼼꼼한" },
];

interface Review {
  title: string;
  content: string;
  style: string;
}

export default function ReviewGeneratorPage() {
  const [productName, setProductName] = useState("");
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState(5);
  const [memo, setMemo] = useState("");
  const [length, setLength] = useState("medium");
  const [tone, setTone] = useState("friendly");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const { profile, hasCredits, setProfile } = useAuthStore();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!productName.trim() || !platform || !memo.trim()) return;

    if (!hasCredits()) {
      setShowUpgrade(true);
      return;
    }

    setLoading(true);
    setError("");
    setReviews([]);

    try {
      const res = await fetch("/api/generate/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          platform,
          rating,
          memo,
          length,
          tone,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "생성에 실패했습니다");
      }

      const data = await res.json();
      setReviews(data.reviews || []);

      if (profile) {
        setProfile({ ...profile, credits_used: profile.credits_used + 1 });
      }

      fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "sellerboost",
          inputData: { productName, platform, rating, memo, length, tone, feature: "review" },
          outputData: data,
        }),
      }).catch(() => {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "생성에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = productName.trim() && platform && memo.trim() && !loading;

  return (
    <FeatureGate feature="review-generator">
    <div>
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/20">
            <MessageSquareText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">리뷰 생성기</h1>
            <p className="text-sm text-gray-500">간단한 메모만 입력하면 플랫폼에 맞는 자연스러운 리뷰를 생성합니다</p>
          </div>
        </div>
      </div>

      {/* Form section - compact card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row 1: 상품명 + 메모 */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <span className="text-[13px] font-medium text-gray-700">상품명</span>
                <Input
                  id="productName"
                  placeholder="예: 삼성 갤럭시 버즈3 프로"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <span className="text-[13px] font-medium text-gray-700">사용 메모</span>
                <Input
                  id="memo"
                  placeholder="예: 음질 좋음, 노이즈캔슬링 강력, 케이스가 좀 큼"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all"
                />
              </div>
            </div>

            {/* Row 2: 플랫폼 + 별점 + 길이 + 톤 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <span className="text-[13px] font-medium text-gray-700">플랫폼</span>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:ring-4 focus:ring-blue-50">
                    <SelectValue placeholder="플랫폼 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <span className="text-[13px] font-medium text-gray-700">별점</span>
                <div className="flex gap-0.5 pt-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-0.5 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-1 text-sm text-gray-400 self-center">
                    {rating}점
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[13px] font-medium text-gray-700">리뷰 길이</span>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:ring-4 focus:ring-blue-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LENGTHS.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <span className="text-[13px] font-medium text-gray-700">톤앤매너</span>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:ring-4 focus:ring-blue-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TONES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={!canSubmit}
                className="h-12 rounded-xl bg-gray-900 px-6 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    리뷰 생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    리뷰 3종 생성
                  </>
                )}
              </button>
              <p className="text-xs text-gray-400">
                짧게 적어도 AI가 자연스럽게 살을 붙여줍니다
              </p>
            </div>
          </form>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3 mb-6">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading && reviews.length === 0 && (
        <div className="rounded-2xl border bg-white p-12 flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center">
              <MessageSquareText className="h-7 w-7 text-cyan-500" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Loader2 className="h-5 w-5 text-cyan-500 animate-spin" />
            </div>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">
              AI가 리뷰를 작성하고 있습니다
            </p>
            <p className="text-sm text-gray-400 mt-1">
              자연스러운 3종 리뷰 생성 중... 약 10초 소요
            </p>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      )}

      {/* Results: review cards */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex items-stretch">
                {/* Left accent bar with number */}
                <div className="flex flex-col items-center justify-center w-14 shrink-0 bg-gradient-to-b from-cyan-500 to-cyan-600 text-white">
                  <span className="text-lg font-bold">{i + 1}</span>
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-lg bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-600">
                        리뷰 {i + 1}
                      </span>
                      <span className="text-xs text-gray-400">
                        {review.style}
                      </span>
                    </div>
                    <CopyButton
                      text={review.title ? `${review.title}\n\n${review.content}` : review.content}
                    />
                  </div>
                  {review.title && (
                    <p className="text-sm font-bold text-gray-900 mb-2">{review.title}</p>
                  )}
                  <div className="rounded-lg bg-gray-50 p-4 text-sm whitespace-pre-wrap leading-relaxed text-gray-700">
                    {review.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state: 3 blurred placeholder review cards */}
      {!loading && reviews.length === 0 && !error && (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="flex items-stretch">
                <div className="w-14 shrink-0 bg-gradient-to-b from-gray-200 to-gray-300" />
                <div className="flex-1 p-5 filter blur-[5px] select-none pointer-events-none opacity-50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-5 w-14 bg-cyan-100 rounded-full" />
                    <div className="h-3 w-16 bg-gray-100 rounded" />
                  </div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded mb-3" />
                  <div className="space-y-1.5 rounded-lg bg-gray-50 p-4">
                    <div className="h-3 w-full bg-gray-100 rounded" />
                    <div className="h-3 w-5/6 bg-gray-100 rounded" />
                    <div className="h-3 w-3/4 bg-gray-100 rounded" />
                  </div>
                </div>
              </div>
              {n === 2 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-[1px]">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center mb-3">
                    <MessageSquareText className="h-6 w-6 text-cyan-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-600">3종의 자연스러운 리뷰가 여기에 생성됩니다</p>
                  <p className="text-xs text-gray-400 mt-1">위에서 상품 정보를 입력하고 생성하세요</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </div>
    </FeatureGate>
  );
}
