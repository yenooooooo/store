"use client";

import { useAuthStore } from "@/stores/auth-store";
import { hasFeatureAccess, getRequiredPlan, getPlanDisplayName, isAdmin } from "@/lib/plan-features";
import type { FeatureKey } from "@/lib/plan-features";
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  feature: FeatureKey;
  children: React.ReactNode;
}

export default function FeatureGate({ feature, children }: Props) {
  const profile = useAuthStore((s) => s.profile);
  const plan = profile?.plan ?? "free";

  if (isAdmin(profile?.email) || hasFeatureAccess(plan, feature)) {
    return <>{children}</>;
  }

  const requiredPlan = getRequiredPlan(feature);
  const requiredLabel = getPlanDisplayName(requiredPlan);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 mb-6">
        <Lock className="h-7 w-7 text-gray-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {requiredLabel} 플랜 이상 필요
      </h2>
      <p className="text-sm text-gray-500 max-w-sm mb-8 leading-relaxed">
        이 기능은 <span className="font-semibold text-gray-700">{requiredLabel}</span> 플랜부터
        사용할 수 있습니다. 업그레이드하고 모든 기능을 활용하세요.
      </p>
      <Link
        href="/billing"
        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-all active:scale-[0.98]"
      >
        플랜 업그레이드
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
