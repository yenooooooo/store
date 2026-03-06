import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "요금제 - 심플한 구독 플랜",
  description:
    "무료 체험부터 프로 플랜까지. 필요한 만큼만 쓰세요. 월 9,900원부터 시작.",
  openGraph: {
    title: "PROJECT TITAN 요금제",
    description: "무료 체험부터 프로 플랜까지. 월 9,900원부터.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
