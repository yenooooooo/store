"use client";

interface Props {
  score: number;
  label?: string;
  size?: number;
}

export default function ScoreGauge({
  score,
  label = "점수",
  size = 120,
}: Props) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedScore / 100) * circumference;
  const center = size / 2;

  function getColor(s: number) {
    if (s >= 80) return "text-green-500";
    if (s >= 60) return "text-yellow-500";
    return "text-red-500";
  }

  function getStroke(s: number) {
    if (s >= 80) return "#22c55e";
    if (s >= 60) return "#eab308";
    return "#ef4444";
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="currentColor"
            strokeWidth={8}
            fill="none"
            className="text-gray-100"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={getStroke(clampedScore)}
            strokeWidth={8}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${getColor(clampedScore)}`}>
            {clampedScore}
          </span>
        </div>
      </div>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}
