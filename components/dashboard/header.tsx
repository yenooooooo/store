"use client";

import { useAuthStore } from "@/stores/auth-store";
import CreditBadge from "@/components/shared/credit-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, CreditCard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import MobileNav from "./mobile-nav";

export default function DashboardHeader() {
  const profile = useAuthStore((s) => s.profile);
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    useAuthStore.getState().setProfile(null);
    router.push("/login");
  }

  const initials = profile?.full_name
    ? profile.full_name.slice(0, 2)
    : profile?.email?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200/60 bg-[#FAFAFA] px-6 sticky top-0 z-40">
      <MobileNav />
      <div className="flex items-center gap-3 ml-auto">
        {profile && (
          <CreditBadge
            used={profile.credits_used}
            limit={profile.credits_limit}
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-gray-200 text-gray-600">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-3 py-2">
              <p className="text-sm font-medium">
                {profile?.full_name ?? "사용자"}
              </p>
              <p className="text-xs text-muted-foreground">{profile?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="gap-2">
                <Settings className="h-4 w-4" />
                설정
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/billing" className="gap-2">
                <CreditCard className="h-4 w-4" />
                결제 관리
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-red-600" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
