"use client";

import { motion } from "framer-motion";

interface Feature {
  title: string;
  number: number;
  bullets: string[];
}

interface Props {
  features: Feature[];
}

const featureColors = [
  { bg: "from-blue-500 to-cyan-400", light: "bg-blue-50", border: "border-blue-100", bullet: "bg-blue-400" },
  { bg: "from-violet-500 to-purple-400", light: "bg-violet-50", border: "border-violet-100", bullet: "bg-violet-400" },
  { bg: "from-emerald-500 to-teal-400", light: "bg-emerald-50", border: "border-emerald-100", bullet: "bg-emerald-400" },
  { bg: "from-orange-500 to-amber-400", light: "bg-orange-50", border: "border-orange-100", bullet: "bg-orange-400" },
];

export default function CoreFeatures({ features }: Props) {
  return (
    <div className="space-y-5">
      {features.map((f, i) => {
        const color = featureColors[i % featureColors.length]!;
        return (
          <motion.div
            key={f.number}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className={`rounded-2xl border ${color.border} ${color.light} p-6 hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${color.bg} text-xs font-black text-white shadow-sm`}>
                {f.number}
              </div>
              <h3 className="font-bold text-gray-900">
                Core Feature #{f.number}: {f.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {f.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className={`mt-2 block h-1.5 w-1.5 shrink-0 rounded-full ${color.bullet}`} />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
