"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function LiveCounter() {
  const [count, setCount] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 rounded-full border bg-white px-5 py-2.5 shadow-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
      </span>
      <Users className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium">
        지금 <strong className="text-primary">{count}명</strong>이 사용 중
      </span>
    </div>
  );
}
