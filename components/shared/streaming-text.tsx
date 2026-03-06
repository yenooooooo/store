"use client";

import { useEffect, useRef } from "react";

interface Props {
  text: string;
  className?: string;
}

export default function StreamingText({ text, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [text]);

  return (
    <div ref={ref} className={className}>
      {text}
      {text.length > 0 && (
        <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-text-bottom" />
      )}
    </div>
  );
}
