import type { Plan } from "@/types";

const ADMIN_EMAILS = ["yaya01234@naver.com"];

export function isAdmin(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email);
}

export type FeatureKey =
  | "detail-page"
  | "script"
  | "review-generator"
  | "marketing-copy"
  | "analyze"
  | "channel-strategy"
  | "hook-score"
  | "title-generator"
  | "detail-builder"
  | "history"
  | "script-history";

interface PlanConfig {
  credits: number;
  features: FeatureKey[];
}

const PLAN_FEATURES: Record<Plan, PlanConfig> = {
  free: {
    credits: 3,
    features: ["detail-page", "script"],
  },
  starter: {
    credits: 30,
    features: [
      "detail-page",
      "script",
      "review-generator",
      "marketing-copy",
      "hook-score",
      "title-generator",
      "detail-builder",
      "history",
      "script-history",
    ],
  },
  pro: {
    credits: 150,
    features: [
      "detail-page",
      "script",
      "review-generator",
      "marketing-copy",
      "analyze",
      "channel-strategy",
      "hook-score",
      "title-generator",
      "detail-builder",
      "history",
      "script-history",
    ],
  },
  business: {
    credits: 500,
    features: [
      "detail-page",
      "script",
      "review-generator",
      "marketing-copy",
      "analyze",
      "channel-strategy",
      "hook-score",
      "title-generator",
      "detail-builder",
      "history",
      "script-history",
    ],
  },
};

export function hasFeatureAccess(plan: Plan, feature: FeatureKey): boolean {
  return PLAN_FEATURES[plan].features.includes(feature);
}

export function getRequiredPlan(feature: FeatureKey): Plan {
  if (PLAN_FEATURES.free.features.includes(feature)) return "free";
  if (PLAN_FEATURES.starter.features.includes(feature)) return "starter";
  return "pro";
}

export function getPlanCredits(plan: Plan): number {
  return PLAN_FEATURES[plan].credits;
}

const PLAN_DISPLAY_NAME: Record<Plan, string> = {
  free: "무료",
  starter: "스타터",
  pro: "프로",
  business: "비즈니스",
};

export function getPlanDisplayName(plan: Plan): string {
  return PLAN_DISPLAY_NAME[plan];
}
