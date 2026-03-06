export interface TemplateTheme {
  id: string;
  bg: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentLight: string;
  accentText: string;
  divider: string;
  badgeBg: string;
  badgeText: string;
  heroBg: string;
  heroText: string;
  ctaBg: string;
  ctaText: string;
  painBg: string;
  painIcon: string;
  faqBg: string;
  specBg: string;
  fontFamily: string;
}

export const THEMES: Record<string, TemplateTheme> = {
  minimal: {
    id: "minimal", bg: "#ffffff", cardBg: "#f9fafb", cardBorder: "#f3f4f6",
    textPrimary: "#111827", textSecondary: "#4b5563", textMuted: "#9ca3af",
    accent: "#3b82f6", accentLight: "#eff6ff", accentText: "#1d4ed8",
    divider: "#e5e7eb", badgeBg: "#f1f5f9", badgeText: "#64748b",
    heroBg: "#ffffff", heroText: "#111827", ctaBg: "#3b82f6", ctaText: "#ffffff",
    painBg: "#fef2f2", painIcon: "#ef4444", faqBg: "#f9fafb", specBg: "#f8fafc",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  premium: {
    id: "premium", bg: "#0a0a0a", cardBg: "#141414", cardBorder: "#262626",
    textPrimary: "#f5f5f5", textSecondary: "#a3a3a3", textMuted: "#737373",
    accent: "#c4a35a", accentLight: "#1a1810", accentText: "#c4a35a",
    divider: "#262626", badgeBg: "#1a1a1a", badgeText: "#737373",
    heroBg: "#111111", heroText: "#ffffff", ctaBg: "#c4a35a", ctaText: "#0a0a0a",
    painBg: "#1a1111", painIcon: "#ef4444", faqBg: "#141414", specBg: "#111111",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  vibrant: {
    id: "vibrant", bg: "#ffffff", cardBg: "#fff7ed", cardBorder: "#fed7aa",
    textPrimary: "#1c1917", textSecondary: "#44403c", textMuted: "#a8a29e",
    accent: "#f97316", accentLight: "#fff7ed", accentText: "#ea580c",
    divider: "#fed7aa", badgeBg: "#ffedd5", badgeText: "#9a3412",
    heroBg: "#f97316", heroText: "#ffffff", ctaBg: "#ea580c", ctaText: "#ffffff",
    painBg: "#fef2f2", painIcon: "#dc2626", faqBg: "#fffbeb", specBg: "#fff7ed",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  natural: {
    id: "natural", bg: "#faf8f5", cardBg: "#f5f0eb", cardBorder: "#e7e5e4",
    textPrimary: "#292524", textSecondary: "#57534e", textMuted: "#a8a29e",
    accent: "#78716c", accentLight: "#f5f5f4", accentText: "#57534e",
    divider: "#e7e5e4", badgeBg: "#e7e5e4", badgeText: "#78716c",
    heroBg: "#faf8f5", heroText: "#292524", ctaBg: "#57534e", ctaText: "#faf8f5",
    painBg: "#fef2f2", painIcon: "#b91c1c", faqBg: "#f5f0eb", specBg: "#faf8f5",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  tech: {
    id: "tech", bg: "#0f172a", cardBg: "#1e293b", cardBorder: "#334155",
    textPrimary: "#f1f5f9", textSecondary: "#94a3b8", textMuted: "#64748b",
    accent: "#3b82f6", accentLight: "#1e293b", accentText: "#60a5fa",
    divider: "#334155", badgeBg: "#1e293b", badgeText: "#64748b",
    heroBg: "#0f172a", heroText: "#f1f5f9", ctaBg: "#2563eb", ctaText: "#ffffff",
    painBg: "#1e1b2e", painIcon: "#f87171", faqBg: "#1e293b", specBg: "#0f172a",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  cute: {
    id: "cute", bg: "#fdf2f8", cardBg: "#fce7f3", cardBorder: "#f9a8d4",
    textPrimary: "#831843", textSecondary: "#9d174d", textMuted: "#db2777",
    accent: "#ec4899", accentLight: "#fce7f3", accentText: "#be185d",
    divider: "#f9a8d4", badgeBg: "#fce7f3", badgeText: "#9d174d",
    heroBg: "#fdf2f8", heroText: "#831843", ctaBg: "#ec4899", ctaText: "#ffffff",
    painBg: "#fff1f2", painIcon: "#f43f5e", faqBg: "#fdf2f8", specBg: "#fce7f3",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  luxury: {
    id: "luxury", bg: "#1a1a1a", cardBg: "#222222", cardBorder: "#333333",
    textPrimary: "#e5e5e5", textSecondary: "#a3a3a3", textMuted: "#737373",
    accent: "#d4af37", accentLight: "#2a2510", accentText: "#d4af37",
    divider: "#333333", badgeBg: "#2a2510", badgeText: "#d4af37",
    heroBg: "#111111", heroText: "#ffffff", ctaBg: "#d4af37", ctaText: "#111111",
    painBg: "#2a1515", painIcon: "#ef4444", faqBg: "#1a1a1a", specBg: "#222222",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  fresh: {
    id: "fresh", bg: "#f0fdf4", cardBg: "#dcfce7", cardBorder: "#86efac",
    textPrimary: "#14532d", textSecondary: "#166534", textMuted: "#4ade80",
    accent: "#16a34a", accentLight: "#dcfce7", accentText: "#15803d",
    divider: "#86efac", badgeBg: "#dcfce7", badgeText: "#166534",
    heroBg: "#f0fdf4", heroText: "#14532d", ctaBg: "#16a34a", ctaText: "#ffffff",
    painBg: "#fef2f2", painIcon: "#dc2626", faqBg: "#f0fdf4", specBg: "#dcfce7",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  bold: {
    id: "bold", bg: "#ffffff", cardBg: "#fef2f2", cardBorder: "#fecaca",
    textPrimary: "#1c1917", textSecondary: "#44403c", textMuted: "#78716c",
    accent: "#dc2626", accentLight: "#fef2f2", accentText: "#b91c1c",
    divider: "#fecaca", badgeBg: "#fee2e2", badgeText: "#991b1b",
    heroBg: "#dc2626", heroText: "#ffffff", ctaBg: "#b91c1c", ctaText: "#ffffff",
    painBg: "#fefce8", painIcon: "#ca8a04", faqBg: "#fef2f2", specBg: "#fff1f2",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  soft: {
    id: "soft", bg: "#fafafa", cardBg: "#f5f5f5", cardBorder: "#e5e5e5",
    textPrimary: "#262626", textSecondary: "#525252", textMuted: "#a3a3a3",
    accent: "#737373", accentLight: "#f5f5f5", accentText: "#525252",
    divider: "#e5e5e5", badgeBg: "#f5f5f5", badgeText: "#737373",
    heroBg: "#fafafa", heroText: "#262626", ctaBg: "#404040", ctaText: "#ffffff",
    painBg: "#fef2f2", painIcon: "#ef4444", faqBg: "#f5f5f5", specBg: "#fafafa",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
};
