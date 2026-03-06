"use client";

import type { TemplateData } from "./template-types";
import { build as buildMinimal } from "./builders/minimal-clean";
import { build as buildPremium } from "./builders/premium-dark";
import { build as buildMagazine } from "./builders/magazine";
import { build as buildCorporate } from "./builders/corporate";
import { build as buildFresh } from "./builders/fresh-natural";
import { build as buildBold } from "./builders/bold-impact";
import { build as buildElegant } from "./builders/elegant-classic";
import { build as buildTech } from "./builders/modern-tech";
import { build as buildWarm } from "./builders/warm-lifestyle";
import { build as buildCute } from "./builders/cute-pastel";
import { build as buildConversion } from "./builders/conversion-max";

const BUILDERS: Record<string, (data: TemplateData) => string> = {
  minimal: buildMinimal,
  premium: buildPremium,
  magazine: buildMagazine,
  corporate: buildCorporate,
  fresh: buildFresh,
  bold: buildBold,
  elegant: buildElegant,
  tech: buildTech,
  warm: buildWarm,
  cute: buildCute,
  conversion: buildConversion,
};

export function generateTemplateHtml(templateId: string, data: TemplateData): string {
  const builder = BUILDERS[templateId] ?? BUILDERS["minimal"]!;
  return builder(data);
}

interface Props {
  templateId: string;
  data: TemplateData;
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
