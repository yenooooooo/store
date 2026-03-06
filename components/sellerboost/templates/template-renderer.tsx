"use client";

import type { TemplateData } from "./template-types";
import { THEMES } from "./template-themes";
import { buildFullTemplate } from "./template-sections";

interface Props {
  templateId: string;
  data: TemplateData;
}

export function generateTemplateHtml(templateId: string, data: TemplateData): string {
  const theme = THEMES[templateId] ?? THEMES["minimal"]!;
  return buildFullTemplate(theme, data);
}

export default function TemplateRenderer({ templateId, data }: Props) {
  const html = generateTemplateHtml(templateId, data);
  return (
    <div
      className="rounded-xl overflow-hidden border shadow-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
