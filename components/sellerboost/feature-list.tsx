"use client";

import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  features: string[];
  onChange: (features: string[]) => void;
  maxCount?: number;
}

export default function FeatureList({
  features,
  onChange,
  maxCount = 5,
}: Props) {
  function addFeature() {
    if (features.length < maxCount) {
      onChange([...features, ""]);
    }
  }

  function removeFeature(index: number) {
    onChange(features.filter((_, i) => i !== index));
  }

  function updateFeature(index: number, value: string) {
    const next = [...features];
    next[index] = value;
    onChange(next);
  }

  return (
    <div className="space-y-2">
      {features.map((f, i) => (
        <div key={i} className="flex gap-2 items-center group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500 shrink-0">
            {i + 1}
          </div>
          <Input
            placeholder={`특징 ${i + 1}을 입력하세요`}
            value={f}
            onChange={(e) => updateFeature(i, e.target.value)}
            className="h-10 rounded-xl border-gray-200 bg-gray-50/50 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all"
          />
          {features.length > 1 && (
            <button
              type="button"
              onClick={() => removeFeature(i)}
              className="h-7 w-7 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      ))}
      {features.length < maxCount && (
        <button
          type="button"
          onClick={addFeature}
          className="flex items-center gap-1.5 rounded-xl border border-dashed border-gray-200 px-3 py-2 text-xs font-medium text-gray-400 hover:text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          특징 추가 ({features.length}/{maxCount})
        </button>
      )}
    </div>
  );
}
