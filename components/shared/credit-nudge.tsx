"use client";

import { useAuthStore } from "@/stores/auth-store";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function CreditNudge() {
  const profile = useAuthStore((s) => s.profile);
  if (!profile) return null;

  const remaining = Math.max(0, profile.credits_limit - profile.credits_used);

  if (remaining > 2) return null;

  if (remaining === 0) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 mt-5">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="h-4 w-4 text-red-500" />
          <span className="text-sm font-semibold text-red-900">크레딧을 모두 사용했습니다</span>
        </div>
        <p className="text-xs text-red-700 mb-3">
          업그레이드하면 더 많은 크레딧과 고급 기능을 사용할 수 있습니다.
        </p>
        <Link
          href="/billing"
          className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition-all"
        >
          플랜 업그레이드
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 mt-5">
      <div className="flex items-center gap-3 mb-2">
        <Zap className="h-4 w-4 text-amber-500" />
        <span className="text-sm font-semibold text-amber-900">크레딧 {remaining}회 남음</span>
      </div>
      <p className="text-xs text-amber-700 mb-3">
        스타터 플랜으로 업그레이드하면 월 30회 + 추가 기능을 이용할 수 있습니다.
      </p>
      <Link
        href="/billing"
        className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition-all"
      >
        업그레이드
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
