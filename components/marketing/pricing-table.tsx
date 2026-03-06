"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

interface PricingRow {
  plan: string;
  price: string;
  features: string;
  target: string;
  highlighted?: boolean;
}

interface Props {
  rows: PricingRow[];
}

export default function PricingTable({ rows }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {rows
        .filter((r) => r.plan !== "크레딧 추가")
        .map((row, i) => (
          <motion.div
            key={row.plan}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
              row.highlighted
                ? "border-blue-500/50 bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-2xl shadow-blue-500/30"
                : "border-gray-100 bg-white shadow-sm hover:shadow-lg hover:shadow-blue-500/10"
            }`}
          >
            {row.highlighted && (
              <>
                {/* 상단 글로우 */}
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 px-3 py-1 text-[11px] font-bold text-blue-900">
                    <Sparkles className="h-3 w-3" /> 가장 인기
                  </span>
                </div>
              </>
            )}

            <div className={`mb-1 text-xs font-semibold uppercase tracking-wider ${row.highlighted ? "text-sky-200" : "text-muted-foreground"}`}>
              {row.target}
            </div>
            <h3 className={`text-xl font-black mb-3 ${row.highlighted ? "text-white" : "text-gray-900"}`}>
              {row.plan}
            </h3>
            <div className={`text-3xl font-black mb-5 ${row.highlighted ? "text-white" : "text-gray-900"}`}>
              {row.price}
              {row.price !== "0원" && (
                <span className={`text-sm font-normal ml-1 ${row.highlighted ? "text-sky-200" : "text-muted-foreground"}`}>
                  /월
                </span>
              )}
            </div>

            <div className={`flex items-start gap-2 text-sm mb-8 flex-1 ${row.highlighted ? "text-sky-100" : "text-muted-foreground"}`}>
              <Check className={`h-4 w-4 mt-0.5 shrink-0 ${row.highlighted ? "text-sky-300" : "text-green-500"}`} />
              {row.features}
            </div>

            <Link href="/signup" className="block">
              <button
                className={`w-full rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
                  row.highlighted
                    ? "bg-white text-blue-700 hover:bg-sky-50 shadow-lg"
                    : "border border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                {row.price === "0원" ? "무료로 시작" : "구독하기"}
              </button>
            </Link>
          </motion.div>
        ))}
    </div>
  );
}
