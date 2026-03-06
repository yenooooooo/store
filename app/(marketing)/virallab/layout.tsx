import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "바이럴랩 AI - 유튜브 스크립트 AI 생성기",
  description:
    "AI가 바이럴되는 유튜브 스크립트, 제목, 썸네일 문구를 자동 생성합니다. 크리에이터 성장 필수 도구.",
  openGraph: {
    title: "바이럴랩 AI - 유튜브 스크립트 AI 생성기",
    description: "AI가 바이럴되는 유튜브 스크립트를 자동 생성합니다.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
