"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { MOCK_PROFILE } from "@/lib/mock-data";

interface Props {
  children: React.ReactNode;
}

export default function MockAuthProvider({ children }: Props) {
  const setProfile = useAuthStore((s) => s.setProfile);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    setProfile(MOCK_PROFILE);
    setLoading(false);
  }, [setProfile, setLoading]);

  return <>{children}</>;
}
