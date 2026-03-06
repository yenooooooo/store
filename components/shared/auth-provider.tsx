"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { createClient } from "@/lib/supabase/client";
import { isAdmin } from "@/lib/plan-features";
import type { Profile } from "@/types";

interface Props {
  children: React.ReactNode;
}

// 관리자 계정이면 plan/credits를 자동 보정
function ensureAdminProfile(profile: Profile): Profile {
  if (!isAdmin(profile.email)) return profile;
  return {
    ...profile,
    plan: "business",
    credits_limit: 99999,
  };
}

export default function AuthProvider({ children }: Props) {
  const { setProfile, setLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setProfile(null);
        setLoading(false);
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        const p = ensureAdminProfile(profile as unknown as Profile);

        // DB에 관리자 plan이 free로 되어있으면 자동 수정
        if (isAdmin(p.email) && profile.plan !== "business") {
          supabase
            .from("profiles")
            .update({ plan: "business", credits_limit: 99999 })
            .eq("id", profile.id)
            .then(() => console.log("[AuthProvider] Admin plan fixed in DB"));
        }

        setProfile(p);
      }
      setLoading(false);
    }

    loadProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session?.user) {
          setProfile(null);
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setProfile(ensureAdminProfile(profile as unknown as Profile));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [setProfile, setLoading, router]);

  return <>{children}</>;
}
