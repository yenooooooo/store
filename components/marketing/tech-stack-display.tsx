"use client";

import { motion } from "framer-motion";

interface StackColumn {
  title: string;
  icon: string;
  items: string[];
}

interface Props {
  frontend: StackColumn;
  backend: StackColumn;
}

export default function TechStackDisplay({ frontend, backend }: Props) {
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-xl border md:grid-cols-2">
      {[frontend, backend].map((col, ci) => (
        <div key={col.title}>
          <div
            className={`px-5 py-3 text-sm font-bold text-white ${
              ci === 0 ? "bg-blue-950" : "bg-blue-800"
            }`}
          >
            {col.icon} {col.title}
          </div>
          <ul className="divide-y">
            {col.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                className="px-5 py-2.5 text-xs font-mono odd:bg-blue-50"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
