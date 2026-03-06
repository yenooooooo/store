"use client";

import { useState } from "react";
import { Share2, Check, Loader2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface Props {
  generationId: string | null;
}

export default function ShareButton({ generationId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  if (!generationId) return null;

  async function handleShare() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/generations/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ generationId }),
      });

      if (!res.ok) throw new Error();

      const { shareToken } = await res.json();
      const url = `${window.location.origin}/share/${shareToken}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url);
      toast.success("공유 링크가 복사되었습니다!");
    } catch {
      toast.error("공유 링크 생성에 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  }

  if (shareUrl) {
    return (
      <button
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          toast.success("링크가 복사되었습니다!");
        }}
        className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 transition-colors"
      >
        <Check className="h-3.5 w-3.5" />
        링크 복사됨
      </button>
    );
  }

  return (
    <button
      onClick={handleShare}
      disabled={isLoading}
      className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Share2 className="h-3.5 w-3.5" />
      )}
      공유
    </button>
  );
}
