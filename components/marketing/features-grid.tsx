"use client";

import { motion } from "framer-motion";

interface Advantage {
  number: string;
  title: string;
  description: string;
}

interface Props {
  advantages: Advantage[];
  sectionTitle?: string;
}

const iconColors = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-emerald-500 to-teal-400",
  "from-orange-500 to-amber-400",
  "from-pink-500 to-rose-400",
  "from-sky-500 to-indigo-400",
];

export default function FeaturesGrid({
  advantages,
  sectionTitle = "핵심 차별점",
}: Props) {
  return (
    <div>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-1.5 text-xs font-bold text-blue-800">
        <span className="h-2 w-2 rounded-full bg-blue-500" />
        🔑 타사 대비 핵심 경쟁 우위 — {sectionTitle}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map((a, i) => (
          <motion.div
            key={a.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
          >
            {/* 상단 글로우 라인 */}
            <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${iconColors[i % iconColors.length]}`} />

            {/* 번호 아이콘 */}
            <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${iconColors[i % iconColors.length]} text-sm font-black text-white shadow-sm`}>
              {a.number}
            </div>

            <h3 className="mb-2 font-bold text-gray-900 leading-snug">{a.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>

            {/* 호버 배경 효과 */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 to-sky-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
