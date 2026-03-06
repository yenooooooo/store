"use client";

import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface Props {
  used: number;
  limit: number;
}

export default function CreditBadge({ used, limit }: Props) {
  const remaining = Math.max(0, limit - used);
  const isLow = remaining <= 1;

  return (
    <Badge variant={isLow ? "destructive" : "secondary"} className="gap-1">
      <Zap className="h-3 w-3" />
      {remaining}/{limit} 크레딧
    </Badge>
  );
}
