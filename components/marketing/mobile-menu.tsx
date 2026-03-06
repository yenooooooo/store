"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/sellerboost", label: "셀러부스트" },
  { href: "/virallab", label: "바이럴랩" },
  { href: "/pricing", label: "요금제" },
  { href: "/login", label: "로그인" },
  { href: "/signup", label: "무료로 시작하기" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 border-t border-gray-100 bg-white/95 backdrop-blur-xl z-50">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  link.href === "/signup"
                    ? "bg-gray-900 text-white text-center mt-2 rounded-full"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
