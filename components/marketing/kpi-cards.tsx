"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "2,847+", label: "생성된 콘텐츠", sublabel: "매일 증가하는 중" },
  { value: "10초", label: "평균 생성 시간", sublabel: "업계 최고 속도" },
  { value: "4.8", label: "사용자 만족도", sublabel: "5점 만점 기준" },
];

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl border border-gray-100 bg-white p-8 text-center"
        >
          <div className="text-4xl font-extrabold tracking-tight text-gray-900">{stat.value}</div>
          <div className="mt-1 text-sm font-medium text-gray-900">{stat.label}</div>
          <div className="mt-0.5 text-xs text-gray-400">{stat.sublabel}</div>
        </motion.div>
      ))}
    </div>
  );
}
