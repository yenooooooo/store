"use client";

import type { TemplateData } from "./template-types";

interface Props {
  templateId: string;
  data: TemplateData;
}

// 각 템플릿의 인라인 HTML 생성 (이미지 다운로드용)
export function generateTemplateHtml(templateId: string, data: TemplateData): string {
  switch (templateId) {
    case "minimal":
      return minimalTemplate(data);
    case "premium":
      return premiumTemplate(data);
    case "vibrant":
      return vibrantTemplate(data);
    case "natural":
      return naturalTemplate(data);
    case "tech":
      return techTemplate(data);
    default:
      return minimalTemplate(data);
  }
}

function imageSection(images: string[]): string {
  if (images.length === 0) return "";
  return images
    .map(
      (img) =>
        `<div style="margin-bottom:16px;border-radius:12px;overflow:hidden;">
      <img src="${img}" style="width:100%;display:block;" />
    </div>`
    )
    .join("\n");
}

function minimalTemplate(d: TemplateData): string {
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#222;background:#fff;padding:0;">
  <!-- 헤더 -->
  <div style="text-align:center;padding:48px 32px 32px;">
    <h1 style="font-size:26px;font-weight:800;margin:0 0 12px;color:#111;">${d.productName}</h1>
    <p style="font-size:16px;color:#888;margin:0;font-weight:300;">${d.subtitle}</p>
  </div>

  <!-- 상품 이미지 -->
  <div style="padding:0 32px;">
    ${imageSection(d.productImages)}
  </div>

  <!-- 구분선 -->
  <div style="padding:0 32px;margin:24px 0;">
    <div style="height:1px;background:linear-gradient(90deg,transparent,#e5e7eb,transparent);"></div>
  </div>

  <!-- 핵심 특징 -->
  <div style="padding:0 32px 32px;">
    <div style="text-align:center;margin-bottom:28px;">
      <span style="font-size:11px;font-weight:700;letter-spacing:3px;color:#999;text-transform:uppercase;">Key Features</span>
    </div>
    ${d.features
      .map(
        (f, i) =>
          `<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;">
        <div style="min-width:36px;height:36px;background:${d.brandColor || "#3b82f6"};color:white;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;">0${i + 1}</div>
        <p style="font-size:15px;line-height:1.7;margin:0;padding-top:6px;color:#333;">${f}</p>
      </div>`
      )
      .join("\n    ")}
  </div>

  <!-- 사용 시나리오 -->
  <div style="background:#f9fafb;padding:36px 32px;margin:0;">
    <div style="text-align:center;margin-bottom:16px;">
      <span style="font-size:11px;font-weight:700;letter-spacing:3px;color:#999;text-transform:uppercase;">Story</span>
    </div>
    <p style="font-size:15px;line-height:1.8;color:#555;text-align:center;max-width:600px;margin:0 auto;font-style:italic;">"${d.scenario}"</p>
  </div>

  <!-- CTA -->
  <div style="text-align:center;padding:40px 32px;background:linear-gradient(135deg,${d.brandColor || "#3b82f6"}08,${d.brandColor || "#3b82f6"}15);">
    <p style="font-size:20px;font-weight:800;color:${d.brandColor || "#3b82f6"};margin:0 0 8px;">${d.cta}</p>
    <div style="display:flex;gap:8px;justify-content:center;margin-top:16px;flex-wrap:wrap;">
      ${d.seoKeywords.map((kw) => `<span style="font-size:11px;background:#f1f5f9;color:#64748b;padding:4px 10px;border-radius:20px;">#${kw}</span>`).join("\n      ")}
    </div>
  </div>
</div>`;
}

function premiumTemplate(d: TemplateData): string {
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#e5e5e5;background:#111;padding:0;">
  <!-- 헤더 -->
  <div style="text-align:center;padding:56px 32px 36px;background:linear-gradient(180deg,#1a1a1a,#111);">
    <div style="font-size:10px;font-weight:600;letter-spacing:4px;color:${d.brandColor || "#c4a35a"};text-transform:uppercase;margin-bottom:16px;">Premium Collection</div>
    <h1 style="font-size:28px;font-weight:800;margin:0 0 12px;color:#fff;">${d.productName}</h1>
    <p style="font-size:15px;color:#777;margin:0;">${d.subtitle}</p>
  </div>

  <!-- 상품 이미지 -->
  <div style="padding:0 32px;">
    ${imageSection(d.productImages)}
  </div>

  <!-- 골드 구분선 -->
  <div style="padding:0 32px;margin:32px 0;">
    <div style="height:1px;background:linear-gradient(90deg,transparent,${d.brandColor || "#c4a35a"}44,transparent);"></div>
  </div>

  <!-- 핵심 특징 -->
  <div style="padding:0 32px 36px;">
    ${d.features
      .map(
        (f, i) =>
          `<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:24px;padding:20px;border:1px solid #222;border-radius:12px;background:#1a1a1a;">
        <div style="min-width:32px;height:32px;border:2px solid ${d.brandColor || "#c4a35a"};color:${d.brandColor || "#c4a35a"};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">${i + 1}</div>
        <p style="font-size:14px;line-height:1.7;margin:0;padding-top:4px;color:#ccc;">${f}</p>
      </div>`
      )
      .join("\n    ")}
  </div>

  <!-- 시나리오 -->
  <div style="background:#0a0a0a;padding:40px 32px;border-top:1px solid #1a1a1a;border-bottom:1px solid #1a1a1a;">
    <p style="font-size:15px;line-height:1.8;color:#888;text-align:center;max-width:600px;margin:0 auto;font-style:italic;">"${d.scenario}"</p>
  </div>

  <!-- CTA -->
  <div style="text-align:center;padding:44px 32px;background:linear-gradient(135deg,#1a1a0a,#111);">
    <p style="font-size:20px;font-weight:800;color:${d.brandColor || "#c4a35a"};margin:0 0 16px;">${d.cta}</p>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
      ${d.seoKeywords.map((kw) => `<span style="font-size:11px;background:#1a1a1a;color:#666;padding:4px 10px;border-radius:20px;border:1px solid #333;">#${kw}</span>`).join("\n      ")}
    </div>
  </div>
</div>`;
}

function vibrantTemplate(d: TemplateData): string {
  const color = d.brandColor || "#f97316";
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#222;background:#fff;padding:0;">
  <!-- 헤더 -->
  <div style="text-align:center;padding:48px 32px 32px;background:linear-gradient(135deg,${color},${color}dd);color:white;">
    <h1 style="font-size:28px;font-weight:900;margin:0 0 12px;">${d.productName}</h1>
    <p style="font-size:15px;opacity:0.85;margin:0;">${d.subtitle}</p>
  </div>

  <!-- 상품 이미지 -->
  <div style="padding:16px 32px 0;">
    ${imageSection(d.productImages)}
  </div>

  <!-- 핵심 특징 -->
  <div style="padding:24px 32px 32px;">
    <div style="text-align:center;margin-bottom:24px;">
      <span style="font-size:18px;font-weight:900;color:${color};">왜 이 상품인가요?</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      ${d.features
        .map(
          (f, i) =>
            `<div style="background:${color}08;border:2px solid ${color}22;border-radius:16px;padding:20px;">
          <div style="font-size:24px;font-weight:900;color:${color};margin-bottom:8px;">${i + 1}</div>
          <p style="font-size:13px;line-height:1.6;margin:0;color:#444;">${f}</p>
        </div>`
        )
        .join("\n      ")}
    </div>
  </div>

  <!-- 시나리오 -->
  <div style="background:${color}08;padding:36px 32px;">
    <p style="font-size:15px;line-height:1.8;color:#555;text-align:center;max-width:600px;margin:0 auto;">"${d.scenario}"</p>
  </div>

  <!-- CTA -->
  <div style="text-align:center;padding:40px 32px;background:${color};color:white;">
    <p style="font-size:22px;font-weight:900;margin:0 0 12px;">${d.cta}</p>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
      ${d.seoKeywords.map((kw) => `<span style="font-size:11px;background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:20px;">#${kw}</span>`).join("\n      ")}
    </div>
  </div>
</div>`;
}

function naturalTemplate(d: TemplateData): string {
  const color = d.brandColor || "#78716c";
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#44403c;background:#faf8f5;padding:0;">
  <!-- 헤더 -->
  <div style="text-align:center;padding:56px 32px 36px;">
    <div style="font-size:10px;font-weight:600;letter-spacing:4px;color:${color};text-transform:uppercase;margin-bottom:16px;">Natural Choice</div>
    <h1 style="font-size:26px;font-weight:700;margin:0 0 12px;color:#292524;">${d.productName}</h1>
    <p style="font-size:15px;color:#a8a29e;margin:0;">${d.subtitle}</p>
  </div>

  <!-- 상품 이미지 -->
  <div style="padding:0 32px;">
    ${imageSection(d.productImages)}
  </div>

  <!-- 핵심 특징 -->
  <div style="padding:32px;">
    ${d.features
      .map(
        (f, i) =>
          `<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px;padding-bottom:20px;${i < d.features.length - 1 ? "border-bottom:1px solid #e7e5e4;" : ""}">
        <div style="min-width:8px;height:8px;margin-top:8px;background:${color};border-radius:50%;"></div>
        <p style="font-size:14px;line-height:1.8;margin:0;color:#57534e;">${f}</p>
      </div>`
      )
      .join("\n    ")}
  </div>

  <!-- 시나리오 -->
  <div style="background:#f5f0eb;padding:40px 32px;border-top:1px solid #e7e5e4;border-bottom:1px solid #e7e5e4;">
    <p style="font-size:15px;line-height:1.9;color:#78716c;text-align:center;max-width:580px;margin:0 auto;font-style:italic;">"${d.scenario}"</p>
  </div>

  <!-- CTA -->
  <div style="text-align:center;padding:44px 32px;">
    <p style="font-size:18px;font-weight:700;color:#292524;margin:0 0 16px;">${d.cta}</p>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
      ${d.seoKeywords.map((kw) => `<span style="font-size:11px;background:#e7e5e4;color:#78716c;padding:4px 10px;border-radius:20px;">#${kw}</span>`).join("\n      ")}
    </div>
  </div>
</div>`;
}

function techTemplate(d: TemplateData): string {
  const color = d.brandColor || "#2563eb";
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#e2e8f0;background:#0f172a;padding:0;">
  <!-- 헤더 -->
  <div style="text-align:center;padding:56px 32px 36px;background:linear-gradient(180deg,#1e293b,#0f172a);">
    <div style="display:inline-block;font-size:10px;font-weight:700;letter-spacing:3px;color:${color};background:${color}15;padding:6px 16px;border-radius:20px;border:1px solid ${color}33;margin-bottom:20px;">SPECIFICATION</div>
    <h1 style="font-size:28px;font-weight:800;margin:0 0 12px;color:#f1f5f9;">${d.productName}</h1>
    <p style="font-size:15px;color:#64748b;margin:0;">${d.subtitle}</p>
  </div>

  <!-- 상품 이미지 -->
  <div style="padding:0 32px;">
    ${imageSection(d.productImages)}
  </div>

  <!-- 핵심 특징 -->
  <div style="padding:32px;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      ${d.features
        .map(
          (f, i) =>
            `<div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;${i === 0 ? "grid-column:1/-1;" : ""}">
          <div style="font-size:12px;font-weight:700;color:${color};margin-bottom:8px;">FEATURE 0${i + 1}</div>
          <p style="font-size:13px;line-height:1.6;margin:0;color:#94a3b8;">${f}</p>
        </div>`
        )
        .join("\n      ")}
    </div>
  </div>

  <!-- 시나리오 -->
  <div style="background:#1e293b;padding:40px 32px;border-top:1px solid #334155;border-bottom:1px solid #334155;">
    <p style="font-size:15px;line-height:1.8;color:#94a3b8;text-align:center;max-width:600px;margin:0 auto;font-style:italic;">"${d.scenario}"</p>
  </div>

  <!-- CTA -->
  <div style="text-align:center;padding:44px 32px;background:linear-gradient(135deg,${color}15,#0f172a);">
    <p style="font-size:20px;font-weight:800;color:${color};margin:0 0 16px;">${d.cta}</p>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
      ${d.seoKeywords.map((kw) => `<span style="font-size:11px;background:#1e293b;color:#64748b;padding:4px 10px;border-radius:20px;border:1px solid #334155;">#${kw}</span>`).join("\n      ")}
    </div>
  </div>
</div>`;
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
