"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
  {
    key: "sellerboost",
    title: "셀러부스트 AI",
    subtitle: "스마트스토어 판매자용",
    bullets: [
      "상세페이지 카피 자동 생성",
      "경쟁사 키워드 역분석",
      "인스타·블로그·광고 카피 원스톱",
      "상품 이미지 → 특징 자동 추출",
      "전환율 점수 + 개선 제안",
    ],
    href: "/sellerboost",
  },
  {
    key: "virallab",
    title: "바이럴랩 AI",
    subtitle: "유튜브 크리에이터용",
    bullets: [
      "바이럴 스크립트 자동 생성",
      "Hook Score 분석 (첫 15초)",
      "클릭률 높은 제목 10종 생성",
      "채널 맞춤 성장 전략",
      "쇼츠·릴스·긴영상 모두 지원",
    ],
    href: "/virallab",
  },
];

export default function ProductComparison() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {PRODUCTS.map((product, idx) => (
        <motion.div
          key={product.key}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <Link href={product.href}>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="mb-1 text-xs font-medium text-gray-400">{product.subtitle}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">{product.title}</h3>
              <ul className="space-y-3">
                {product.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-gray-400" />
                    <span className="text-sm text-gray-600">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
