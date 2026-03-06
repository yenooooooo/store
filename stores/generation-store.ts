"use client";

import { create } from "zustand";

interface GenerationState {
  isGenerating: boolean;
  streamedText: string;
  error: string | null;
  setGenerating: (generating: boolean) => void;
  appendText: (text: string) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  isGenerating: false,
  streamedText: "",
  error: null,
  setGenerating: (isGenerating) => set({ isGenerating }),
  appendText: (text) =>
    set((state) => ({ streamedText: state.streamedText + text })),
  setError: (error) => set({ error }),
  reset: () => set({ isGenerating: false, streamedText: "", error: null }),
}));
