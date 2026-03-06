"use client";

import { create } from "zustand";
import { isAdmin } from "@/lib/plan-features";
import type { Profile } from "@/types";

interface AuthState {
  profile: Profile | null;
  isLoading: boolean;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  hasCredits: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  profile: null,
  isLoading: true,
  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),
  hasCredits: () => {
    const { profile } = get();
    if (!profile) return false;
    if (isAdmin(profile.email)) return true;
    return profile.credits_used < profile.credits_limit;
  },
}));
