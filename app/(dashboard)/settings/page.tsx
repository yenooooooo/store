"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth-store";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  Settings,
  BarChart3,
  LogOut,
  AlertTriangle,
  Save,
  Loader2,
  Mail,
  Calendar,
} from "lucide-react";

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  free: { label: "Free", color: "bg-gray-100 text-gray-700" },
  starter: { label: "Starter", color: "bg-blue-50 text-blue-700" },
  pro: { label: "Pro", color: "bg-purple-50 text-purple-700" },
  business: { label: "Business", color: "bg-amber-50 text-amber-700" },
};

export default function SettingsPage() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const router = useRouter();

  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const creditsUsed = profile?.credits_used ?? 0;
  const creditsLimit = profile?.credits_limit ?? 3;
  const usagePercent = creditsLimit > 0 ? Math.min((creditsUsed / creditsLimit) * 100, 100) : 0;
  const planInfo = PLAN_LABELS[profile?.plan ?? "free"] ?? { label: "Free", color: "bg-gray-100 text-gray-700" };

  async function handleSaveProfile() {
    if (!profile) return;
    setIsSaving(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName.trim() || null })
        .eq("id", profile.id);

      if (error) throw error;

      setProfile({ ...profile, full_name: fullName.trim() || null });
      toast.success("프로필이 저장되었습니다.");
    } catch {
      toast.error("프로필 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setProfile(null);
      router.push("/");
    } catch {
      toast.error("로그아웃에 실패했습니다.");
      setIsLoggingOut(false);
    }
  }

  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 shadow-lg shadow-gray-500/20">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">설정</h1>
            <p className="text-sm text-gray-500">계정과 프로필을 관리합니다</p>
          </div>
        </div>
      </div>

      <div className="max-w-xl space-y-6">
        {/* 프로필 수정 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">프로필 정보</h2>
          <div className="space-y-5">
            <div className="space-y-2">
              <span className="text-[13px] font-medium text-gray-700">이름</span>
              <Input
                id="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="이름을 입력하세요"
                className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all"
              />
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                이메일
              </div>
              <span className="text-sm font-medium text-gray-900">
                {profile?.email ?? "-"}
              </span>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                가입일
              </div>
              <span className="text-sm font-medium text-gray-900">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString("ko-KR")
                  : "-"}
              </span>
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full h-11 rounded-xl bg-gray-900 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              저장
            </button>
          </div>
        </div>

        {/* 사용량 통계 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-gray-400" />
            사용량
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">현재 플랜</span>
              <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ${planInfo.color}`}>
                {planInfo.label}
              </span>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">크레딧 사용량</span>
                <span className="font-medium text-gray-900">
                  {creditsUsed} / {creditsLimit}회
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    usagePercent >= 90
                      ? "bg-red-500"
                      : usagePercent >= 70
                        ? "bg-amber-500"
                        : "bg-blue-500"
                  }`}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
              {usagePercent >= 90 && (
                <p className="text-xs text-red-500">
                  크레딧이 거의 소진되었습니다. 플랜 업그레이드를 고려해주세요.
                </p>
              )}
            </div>

            {profile?.plan === "free" && (
              <button
                onClick={() => router.push("/billing")}
                className="w-full h-11 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                플랜 업그레이드
              </button>
            )}
          </div>
        </div>

        {/* 계정 관리 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">계정 관리</h2>
          <div className="space-y-4">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              로그아웃
            </button>

            <div className="h-px bg-gray-100" />

            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-red-700 font-medium text-sm">
                <AlertTriangle className="h-4 w-4" />
                계정 삭제
              </div>
              <p className="text-xs text-red-600/80 leading-relaxed">
                계정 삭제를 원하시면{" "}
                <span className="font-semibold">support@projecttitan.kr</span>
                로 연락주세요. 삭제 시 모든 데이터가 영구적으로 제거되며 복구할
                수 없습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
