import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PROJECT TITAN - AI 상세페이지 & 바이럴 스크립트 생성기",
    template: "%s | PROJECT TITAN",
  },
  description:
    "AI가 10초 만에 전환율 높은 상세페이지와 바이럴 스크립트를 생성합니다. 스마트스토어 판매자와 유튜브 크리에이터의 필수 도구.",
  keywords: [
    "스마트스토어",
    "상세페이지",
    "AI",
    "자동생성",
    "셀러부스트",
    "바이럴랩",
    "유튜브 스크립트",
    "상세페이지 AI",
    "쿠팡 상세페이지",
    "마케팅 카피",
  ],
  openGraph: {
    title: "PROJECT TITAN - AI 상세페이지 & 바이럴 스크립트",
    description: "AI가 전환율 높은 상세페이지와 바이럴 스크립트를 10초 만에 생성합니다.",
    type: "website",
    locale: "ko_KR",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PROJECT TITAN",
    description: "AI 상세페이지 & 바이럴 스크립트 생성기",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
