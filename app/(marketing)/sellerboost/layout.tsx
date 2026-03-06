import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "셀러부스트 AI - 상세페이지 AI 자동 생성",
  description:
    "상품명만 입력하면 AI가 전환율 높은 상세페이지를 10초 만에 생성합니다. 네이버 스마트스토어, 쿠팡 판매자 필수 도구.",
  openGraph: {
    title: "셀러부스트 AI - 상세페이지 AI 자동 생성",
    description: "AI가 전환율 높은 상세페이지를 10초 만에 생성합니다.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
