import Link from "next/link";
import MobileMenu from "@/components/marketing/mobile-menu";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Nav */}
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between border-b border-gray-200/50 bg-white/80 backdrop-blur-xl rounded-b-2xl">
            <Link href="/" className="flex items-center gap-2 pl-4">
              <span className="text-lg font-extrabold tracking-tight text-gray-900">
                PROJECT <span className="text-gray-900">TITAN</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {[
                { href: "/sellerboost", label: "셀러부스트" },
                { href: "/virallab", label: "바이럴랩" },
                { href: "/pricing", label: "요금제" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3 pr-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-gray-900 text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                시작하기
              </Link>
            </div>

            <MobileMenu />
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-extrabold text-gray-900">PROJECT TITAN</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                AI로 판매자와 크리에이터의<br />성장을 돕습니다.
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">제품</div>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/sellerboost" className="text-gray-500 hover:text-gray-900 transition-colors">셀러부스트 AI</Link></li>
                <li><Link href="/virallab" className="text-gray-500 hover:text-gray-900 transition-colors">바이럴랩 AI</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">정보</div>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/pricing" className="text-gray-500 hover:text-gray-900 transition-colors">요금제</Link></li>
                <li><Link href="/signup" className="text-gray-500 hover:text-gray-900 transition-colors">무료 체험</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">문의</div>
              <p className="text-sm text-gray-500">support@antigravity.kr</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <span>&copy; 2026 Antigravity. All rights reserved.</span>
            <div className="flex gap-5">
              <span className="cursor-pointer hover:text-gray-600 transition-colors">개인정보처리방침</span>
              <span className="cursor-pointer hover:text-gray-600 transition-colors">이용약관</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
