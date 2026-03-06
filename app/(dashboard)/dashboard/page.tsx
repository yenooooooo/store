"use client";

import { useAuthStore } from "@/stores/auth-store";
import {
  FileText,
  Film,
  Target,
  Type,
  TrendingUp,
  MessageSquareText,
  ArrowRight,
  Sparkles,
  BarChart3,
  Megaphone,
  Clock,
} from "lucide-react";
import Link from "next/link";

const SELLERBOOST_ACTIONS = [
  {
    title: "상세페이지 생성",
    description: "AI가 전환율 높은 상세페이지를 작성합니다",
    href: "/generate",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "상세페이지 빌더",
    description: "AI 카피 + 프로 템플릿 = 바로 쓸 수 있는 상세페이지",
    href: "/detail-builder",
    icon: Sparkles,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "리뷰 생성기",
    description: "체험단·구매 리뷰를 자연스럽게 생성합니다",
    href: "/review-generator",
    icon: MessageSquareText,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    title: "경쟁사 역분석",
    description: "경쟁 상품의 전략을 AI로 분석합니다",
    href: "/analyze",
    icon: BarChart3,
    color: "from-teal-500 to-teal-600",
  },
  {
    title: "마케팅 카피",
    description: "광고·SNS용 마케팅 카피를 자동 생성합니다",
    href: "/marketing-copy",
    icon: Megaphone,
    color: "from-pink-500 to-pink-600",
  },
];

const VIRALLAB_ACTIONS = [
  {
    title: "스크립트 생성",
    description: "바이럴 스크립트를 자동으로 작성합니다",
    href: "/script",
    icon: Film,
    color: "from-violet-500 to-violet-600",
  },
  {
    title: "Hook Score 분석",
    description: "대본 첫 15초의 후킹 강도를 점수화합니다",
    href: "/hook-score",
    icon: Target,
    color: "from-rose-500 to-rose-600",
  },
  {
    title: "제목·썸네일 생성",
    description: "클릭률 높은 제목 10종을 생성합니다",
    href: "/title-generator",
    icon: Type,
    color: "from-amber-500 to-amber-600",
  },
  {
    title: "채널 성장 전략",
    description: "맞춤형 채널 성장 전략을 수립합니다",
    href: "/channel-strategy",
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-600",
  },
];

interface ActionItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

function ActionCard({ action }: { action: ActionItem }) {
  return (
    <Link href={action.href}>
      <div className="group rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:border-gray-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer h-full">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
          <action.icon className="h-4 w-4 text-white" />
        </div>
        <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">{action.title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{action.description}</p>
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const profile = useAuthStore((s) => s.profile);

  if (!profile) return null;

  const remaining = Math.max(0, profile.credits_limit - profile.credits_used);
  const usagePercent = Math.min(
    100,
    (profile.credits_used / profile.credits_limit) * 100
  );
  const isLow = remaining <= 1;
  const isNewUser = profile.credits_used === 0;

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "좋은 아침이에요";
    if (hour < 18) return "좋은 오후에요";
    return "좋은 저녁이에요";
  })();

  const displayName = profile.full_name || profile.email.split("@")[0];

  return (
    <div className="max-w-5xl">
      {/* 환영 메시지 */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {greeting}, {displayName}님!
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          AI 도구로 매출을 높여보세요.
        </p>
      </div>

      {/* 신규 사용자 환영 배너 */}
      {isNewUser && (
        <div className="mb-8 mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                첫 방문을 환영합니다!
              </h3>
              <p className="text-xs text-gray-500">
                3회 무료 체험으로 AI가 만드는 상세페이지의 품질을 직접
                확인해보세요.
              </p>
            </div>
            <Link
              href="/generate"
              className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-all active:scale-[0.98]"
            >
              상세페이지 만들어보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 크레딧 소진 경고 */}
      {isLow && remaining > 0 && !isNewUser && (
        <div className="mb-6 mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-amber-900 mb-1">
                크레딧이 {remaining}회 남았습니다
              </h3>
              <p className="text-xs text-amber-700">
                업그레이드하면 더 많은 크레딧과 추가 기능을 사용할 수 있습니다.
              </p>
            </div>
            <Link
              href="/billing"
              className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-all active:scale-[0.98]"
            >
              업그레이드
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {remaining === 0 && !isNewUser && (
        <div className="mb-6 mt-4 rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-red-900 mb-1">
                크레딧을 모두 사용했습니다
              </h3>
              <p className="text-xs text-red-700">
                계속 사용하시려면 플랜을 업그레이드해주세요.
              </p>
            </div>
            <Link
              href="/billing"
              className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-all active:scale-[0.98]"
            >
              플랜 업그레이드
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 크레딧 현황 */}
      <div className="flex items-center gap-6 mt-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-gray-900">{remaining}</div>
          <div>
            <div className="text-xs font-medium text-gray-500">남은 크레딧</div>
            <div className="text-[11px] text-gray-400">{profile.credits_limit}회 중</div>
          </div>
        </div>
        <div className="flex-1 max-w-xs">
          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gray-900 transition-all"
              style={{ width: `${100 - usagePercent}%` }}
            />
          </div>
        </div>
        {profile.plan === "free" && (
          <Link
            href="/billing"
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            업그레이드
          </Link>
        )}
      </div>

      {/* 셀러부스트 AI */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide">셀러부스트</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SELLERBOOST_ACTIONS.map((action) => (
            <ActionCard key={action.href} action={action} />
          ))}
        </div>
      </div>

      {/* 바이럴랩 AI */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide">바이럴랩</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VIRALLAB_ACTIONS.map((action) => (
            <ActionCard key={action.href} action={action} />
          ))}
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="mb-4">
        <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide">최근 활동</h3>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-8">
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <Clock className="h-6 w-6 text-gray-300 mb-3" />
          <p className="text-sm text-gray-400">
            아직 생성한 콘텐츠가 없습니다. 위 도구를 사용해보세요!
          </p>
        </div>
      </div>
    </div>
  );
}
