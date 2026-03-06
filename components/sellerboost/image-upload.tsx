"use client";

import { useState, useCallback } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onAnalyzed: (features: string[]) => void;
}

export default function ImageUpload({ onAnalyzed }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드 가능합니다");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("이미지 크기는 5MB 이하만 가능합니다");
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        setPreview(base64);
        setAnalyzing(true);

        try {
          const res = await fetch("/api/analyze-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          });

          if (!res.ok) {
            throw new Error("이미지 분석에 실패했습니다");
          }

          const { features } = await res.json();
          onAnalyzed(features);
          toast.success("이미지 분석 완료! 특징이 자동으로 입력되었습니다.");
        } catch {
          toast.error("이미지 분석에 실패했습니다. 특징을 직접 입력해주세요.");
        } finally {
          setAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    },
    [onAnalyzed]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleRemove() {
    setPreview(null);
  }

  return (
    <div className="space-y-2">
      {!preview ? (
        <label
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50/30 p-8 transition-all hover:border-gray-300 hover:bg-gray-50/60"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <Upload className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-center">
            <span className="text-sm font-medium text-gray-600">이미지를 드래그하거나 클릭</span>
            <p className="text-xs text-gray-400 mt-1">AI가 이미지에서 특징을 자동 추출합니다</p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
        </label>
      ) : (
        <div className="relative rounded-2xl border border-gray-100 overflow-hidden">
          {analyzing && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm shadow-lg">
                <Loader2 className="h-4 w-4 animate-spin" />
                AI가 이미지를 분석하고 있습니다...
              </div>
            </div>
          )}
          <div className="relative aspect-video bg-muted flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="업로드된 상품 이미지"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <button
            type="button"
            className="absolute top-2 right-2 h-7 w-7 rounded-lg bg-white/80 hover:bg-white flex items-center justify-center transition-all"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 rounded-b-2xl bg-gray-50 px-4 py-2.5 text-xs text-gray-500">
            <ImageIcon className="h-3.5 w-3.5" />
            이미지 분석 완료
          </div>
        </div>
      )}
    </div>
  );
}
