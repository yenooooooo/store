"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  ctaLabel?: string;
  ctaHref?: string;
}

export default function CtaSection({
  ctaLabel = "무료로 시작하기",
  ctaHref = "/signup",
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-gray-200 bg-gray-50 p-16 text-center"
    >
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
        콘텐츠 고민,<br />AI에게 맡기세요
      </h2>
      <p className="mt-4 text-base text-gray-500 max-w-md mx-auto">
        무료로 5회 체험하고, 마음에 들면 구독하세요. 카드 등록 없이 바로 시작.
      </p>

      <div className="mt-10 flex items-center justify-center gap-4">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl active:scale-[0.98]"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.section>
  );
}
