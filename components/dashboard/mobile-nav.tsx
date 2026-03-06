"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  FileText,
  Film,
  History,
  Settings,
  CreditCard,
  Sparkles,
  BarChart3,
  Megaphone,
  MessageSquareText,
  Target,
  Type,
  TrendingUp,
  LayoutDashboard,
  Lock,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { hasFeatureAccess, isAdmin } from "@/lib/plan-features";
import type { FeatureKey } from "@/lib/plan-features";
import type { Plan } from "@/types";

const NAV_SECTIONS = [
  {
    title: "메인",
    items: [
      { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
    ],
  },
  {
    title: "셀러부스트",
    items: [
      { href: "/generate", label: "상세페이지 생성", icon: FileText, feature: "detail-page" as FeatureKey },
      { href: "/detail-builder", label: "상세페이지 빌더", icon: Sparkles, feature: "detail-builder" as FeatureKey },
      { href: "/analyze", label: "경쟁사 역분석", icon: BarChart3, feature: "analyze" as FeatureKey },
      { href: "/marketing-copy", label: "마케팅 카피", icon: Megaphone, feature: "marketing-copy" as FeatureKey },
      { href: "/review-generator", label: "리뷰 생성기", icon: MessageSquareText, feature: "review-generator" as FeatureKey },
      { href: "/history", label: "생성 기록", icon: History, feature: "history" as FeatureKey },
    ],
  },
  {
    title: "바이럴랩",
    items: [
      { href: "/script", label: "스크립트 생성", icon: Film, feature: "script" as FeatureKey },
      { href: "/hook-score", label: "Hook Score", icon: Target, feature: "hook-score" as FeatureKey },
      { href: "/title-generator", label: "제목·썸네일", icon: Type, feature: "title-generator" as FeatureKey },
      { href: "/channel-strategy", label: "채널 전략", icon: TrendingUp, feature: "channel-strategy" as FeatureKey },
      { href: "/script-history", label: "스크립트 기록", icon: History, feature: "script-history" as FeatureKey },
    ],
  },
  {
    title: "계정",
    items: [
      { href: "/settings", label: "설정", icon: Settings },
      { href: "/billing", label: "결제 관리", icon: CreditCard },
    ],
  },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const profile = useAuthStore((s) => s.profile);
  const userPlan = (profile?.plan ?? "free") as Plan;

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 border-r border-white/[0.06] bg-[#0A0A0B] p-0 text-white">
          <div className="flex h-14 items-center gap-2 px-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-sky-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-black tracking-tight text-white">
              PROJECT <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">TITAN</span>
            </span>
          </div>
          <nav className="space-y-5 px-3 py-4">
            {NAV_SECTIONS.map((section) => (
              <div key={section.title}>
                <div className="mb-1.5 px-3 text-[11px] font-medium uppercase tracking-widest text-white/30">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = pathname === item.href;
                    const locked = !isAdmin(profile?.email) && "feature" in item && item.feature && !hasFeatureAccess(userPlan, item.feature);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
                          active
                            ? "bg-white/[0.08] text-white"
                            : locked
                              ? "text-white/25 hover:text-white/40 hover:bg-white/[0.02]"
                              : "text-white/50 hover:text-white/90 hover:bg-white/[0.04]"
                        )}
                      >
                        <item.icon className={cn("h-[18px] w-[18px] shrink-0", active ? "text-white" : locked ? "text-white/20" : "text-white/40")} />
                        {item.label}
                        {locked && <Lock className="ml-auto h-3 w-3 text-white/20" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
