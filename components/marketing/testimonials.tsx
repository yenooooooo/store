"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "김**",
    role: "스마트스토어 판매자",
    content: "상세페이지 외주 맡기면 10만원인데, 여기서 10초면 나옵니다. 전환율도 올랐어요.",
    rating: 5,
  },
  {
    name: "이**",
    role: "유튜브 크리에이터 (구독자 2.3만)",
    content: "스크립트 퀄리티는 좋은데, 가끔 톤이 제 채널이랑 안 맞을 때가 있어요. 그래도 수정하면 되니까 3시간 걸리던 게 10분이면 끝나요. Hook Score 기능은 진짜 유용합니다.",
    rating: 4,
  },
  {
    name: "박**",
    role: "쇼핑몰 운영자",
    content: "블로그 후기, 인스타 문구, 광고 카피를 한번에 뽑아주니까 마케팅 시간이 확 줄었습니다.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {REVIEWS.map((review, i) => (
        <motion.div
          key={review.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="rounded-2xl border border-gray-100 bg-white p-8 hover:shadow-md transition-all duration-300"
        >
          <div className="mb-4 text-4xl font-serif text-gray-200">&ldquo;</div>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {review.content}
          </p>
          <div className="flex gap-0.5 mb-3">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-bold text-gray-900">{review.name}</p>
            <p className="text-xs text-gray-400">{review.role}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
