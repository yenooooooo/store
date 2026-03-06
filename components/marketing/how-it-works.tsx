"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    step: "1",
    title: "정보 입력",
    description: "상품명, 특징, 타겟 고객을 입력하세요. 이미지를 올리면 AI가 특징을 자동 추출합니다.",
  },
  {
    step: "2",
    title: "AI가 생성",
    description: "Claude AI가 전환율 높은 카피를 실시간으로 작성합니다. 10초면 완성.",
  },
  {
    step: "3",
    title: "복사해서 사용",
    description: "결과물을 한 클릭으로 복사. 스마트스토어, 유튜브에 바로 붙여넣기.",
  },
];

export default function HowItWorks() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {STEPS.map((step, i) => (
        <motion.div
          key={step.step}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="relative rounded-2xl border border-gray-100 bg-white p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-900 text-lg font-bold text-gray-900">
            {step.step}
          </div>
          <h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
