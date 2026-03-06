import { createClient } from "@/lib/supabase/server";
import { AppError, ERRORS, handleApiError } from "@/lib/errors";
import { hasFeatureAccess, getRequiredPlan, getPlanDisplayName, isAdmin } from "@/lib/plan-features";
import type { FeatureKey } from "@/lib/plan-features";
import type { Database } from "@/types";
import type { Plan } from "@/types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

interface AuthenticatedContext {
  userId: string;
  profile: ProfileRow;
  supabase: Awaited<ReturnType<typeof createClient>>;
}

export async function withAuth(
  handler: (ctx: AuthenticatedContext) => Promise<Response>
): Promise<Response> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw ERRORS.UNAUTHORIZED;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      throw ERRORS.UNAUTHORIZED;
    }

    return await handler({ userId: user.id, profile, supabase });
  } catch (error) {
    return handleApiError(error);
  }
}

export function checkCredits(profile: ProfileRow): void {
  if (isAdmin(profile.email)) return;
  if (profile.credits_used >= profile.credits_limit) {
    throw new AppError(
      "크레딧이 소진되었습니다. 플랜을 업그레이드해주세요.",
      "CREDIT_EXCEEDED",
      429
    );
  }
}

export async function deductCredit(
  profile: ProfileRow,
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<void> {
  if (isAdmin(profile.email)) return;
  await supabase
    .from("profiles")
    .update({ credits_used: profile.credits_used + 1 })
    .eq("id", profile.id);
}

export function checkFeature(profile: ProfileRow, feature: FeatureKey): void {
  if (isAdmin(profile.email)) return;
  const plan = (profile.plan ?? "free") as Plan;
  if (!hasFeatureAccess(plan, feature)) {
    const required = getRequiredPlan(feature);
    const label = getPlanDisplayName(required);
    throw new AppError(
      `이 기능은 ${label} 플랜부터 사용할 수 있습니다.`,
      "FEATURE_LOCKED",
      403
    );
  }
}
