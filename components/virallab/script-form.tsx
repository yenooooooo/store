"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Loader2,
} from "lucide-react";
import { useGenerationStore } from "@/stores/generation-store";
import { useAuthStore } from "@/stores/auth-store";
import { isAdmin } from "@/lib/plan-features";
import UpgradeModal from "@/components/shared/upgrade-modal";
import type { VirallabOutput, StreamEvent } from "@/types";

const PLATFORMS = [
  { value: "youtube", label: "유튜브 (긴 영상)" },
  { value: "shorts", label: "쇼츠 (60초)" },
  { value: "reels", label: "릴스 (30초)" },
] as const;

const DURATIONS = [
  { value: "30s", label: "30초" },
  { value: "60s", label: "60초" },
  { value: "3min", label: "3분" },
  { value: "10min", label: "10분" },
] as const;

interface Props {
  onResult: (result: VirallabOutput, generationId?: string) => void;
}

export default function ScriptForm({ onResult }: Props) {
  const [topic, setTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [platform, setPlatform] = useState("");
  const [duration, setDuration] = useState("");
  const [tone, setTone] = useState("");

  const [showUpgrade, setShowUpgrade] = useState(false);

  const { isGenerating, setGenerating, appendText, reset } =
    useGenerationStore();
  const { profile, hasCredits, setProfile } = useAuthStore();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic || !targetAudience || !platform || !duration) return;

    if (!hasCredits()) {
      setShowUpgrade(true);
      return;
    }

    reset();
    setGenerating(true);

    try {
      const res = await fetch("/api/generate/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          targetAudience,
          platform,
          duration,
          tone: tone || undefined,
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
            if ("text" in data) {
              fullText += data.text;
              appendText(data.text);
            }
          } catch {
            // incomplete chunk
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

      const jsonMatch = fullText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("AI 응답에서 결과를 파싱할 수 없습니다");
      }
      const parsed: VirallabOutput = JSON.parse(jsonMatch[0]);
      onResult(parsed);

      if (profile && !isAdmin(profile.email)) {
        setProfile({ ...profile, credits_used: profile.credits_used + 1 });
      }

      fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "virallab",
          inputData: { topic, targetAudience, platform, duration, tone },
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
    topic.trim() &&
    targetAudience.trim() &&
    platform &&
    duration &&
    !isGenerating;

  const filledCount = [
    topic.trim(),
    targetAudience.trim(),
    platform,
    duration,
  ].filter(Boolean).length;
  const totalFields = 4;
  const filledPercent = Math.round((filledCount / totalFields) * 100);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-900">영상 정보 입력</h2>
        <p className="text-xs text-gray-400 mt-1">주제와 타겟을 입력하면 AI가 스크립트를 생성합니다</p>
      </div>
      <div className="flex items-center gap-2 mt-3 mb-6">
        <div className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full bg-gray-900 transition-all" style={{ width: `${filledPercent}%` }} />
        </div>
        <span className="text-[11px] text-gray-400">{filledCount}/{totalFields}</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 주제 */}
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-gray-700">주제</span>
          <Input
            id="topic"
            placeholder="예: 직장인 퇴근 후 부업으로 월 300만원 버는 방법"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all"
          />
        </div>

        {/* 타겟 시청자 */}
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-gray-700">타겟 시청자</span>
          <Input
            id="audience"
            placeholder="예: 20~30대 직장인"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all"
          />
        </div>

        {/* 플랫폼 + 영상 길이 */}
        <div className="grid grid-cols-2 gap-4">
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
            <span className="text-[13px] font-medium text-gray-700">영상 길이</span>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:ring-4 focus:ring-blue-50">
                <SelectValue placeholder="길이 선택" />
              </SelectTrigger>
              <SelectContent>
                {DURATIONS.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 톤앤매너 */}
        <div className="space-y-2">
          <span className="text-[13px] font-medium text-gray-700">톤앤매너 (선택)</span>
          <Textarea
            id="tone"
            placeholder="예: 친근하고 유머러스한 말투, 반말 사용"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
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
              스크립트 생성
            </>
          )}
        </button>
      </form>
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </div>
  );
}
