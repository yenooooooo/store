"use client";

import { motion } from "framer-motion";
import { PRICE_STRATEGIES } from "@/lib/mock-data";
import { Lightbulb } from "lucide-react";

export default function PriceStrategyBanner() {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
      <div className="flex items-center gap-2 mb-4 text-sm font-bold text-blue-900">
        <Lightbulb className="h-4 w-4" />
        가격 책정 원칙
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PRICE_STRATEGIES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="rounded-lg border bg-white p-4"
          >
            <h4 className="text-sm font-semibold mb-1">{s.title}</h4>
            <p className="text-xs text-muted-foreground">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
