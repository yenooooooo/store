import type { TemplateData } from "../template-types";
import { ac, renderImages } from "./shared";

export function build(d: TemplateData): string {
  const color = ac(d.brandColor, "#111827");
  return `<div style="max-width:780px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#111;background:#fff;padding:0;">

  <!-- Hero: 극도로 심플한 센터 정렬 -->
  <div style="padding:80px 40px 40px;text-align:center;">
    <h1 style="font-size:32px;font-weight:300;letter-spacing:-0.5px;margin:0 0 16px;color:#111;line-height:1.4;">${d.productName}</h1>
    <div style="width:40px;height:1px;background:#ddd;margin:0 auto 16px;"></div>
    <p style="font-size:15px;color:#888;margin:0;font-weight:300;line-height:1.8;">${d.subtitle}</p>
  </div>

  ${d.painPoints.length > 0 ? `
  <!-- Pain: 미니멀 좌측 정렬 텍스트 -->
  <div style="padding:40px;border-top:1px solid #f0f0f0;">
    ${d.painPoints.map((p) => `<p style="font-size:14px;color:#999;margin:0 0 12px;padding-left:16px;border-left:2px solid #eee;line-height:1.7;">${p}</p>`).join("")}
  </div>` : ""}

  ${d.solution ? `
  <!-- Solution: 단일 문장 강조 -->
  <div style="padding:48px 40px;text-align:center;">
    <p style="font-size:18px;color:#333;line-height:1.8;font-weight:300;max-width:600px;margin:0 auto;">${d.solution}</p>
  </div>` : ""}

  ${d.features.length > 0 ? `
  <!-- Features: 심플 텍스트 리스트, 카드 없음 -->
  <div style="padding:40px;border-top:1px solid #f0f0f0;">
    <p style="font-size:11px;letter-spacing:4px;color:#bbb;margin:0 0 32px;text-align:center;">FEATURES</p>
    ${d.features.map((f, i) => `<div style="display:flex;gap:20px;align-items:baseline;margin-bottom:20px;">
      <span style="font-size:12px;color:#ccc;font-weight:300;">${String(i + 1).padStart(2, "0")}</span>
      <p style="font-size:14px;color:#555;margin:0;line-height:1.7;font-weight:400;">${f}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.specs.length > 0 ? `
  <!-- Specs: 인라인 key:value -->
  <div style="padding:32px 40px;background:#fafafa;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      ${d.specs.map((s) => `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;">
        <span style="font-size:12px;color:#999;">${s.label}</span>
        <span style="font-size:12px;color:#333;font-weight:500;">${s.value}</span>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.scenario ? `
  <div style="padding:48px 40px;text-align:center;">
    <p style="font-size:14px;color:#888;line-height:2;font-style:italic;max-width:560px;margin:0 auto;">"${d.scenario}"</p>
  </div>` : ""}

  ${d.testimonial ? `
  <div style="padding:32px 40px;border-top:1px solid #f0f0f0;">
    <p style="font-size:13px;color:#666;line-height:1.8;margin:0;font-style:italic;">"${d.testimonial}"</p>
  </div>` : ""}

  ${d.faq.length > 0 ? `
  <div style="padding:40px;border-top:1px solid #f0f0f0;">
    ${d.faq.map((item) => `<div style="margin-bottom:20px;">
      <p style="font-size:13px;font-weight:600;color:#333;margin:0 0 6px;">${item.q}</p>
      <p style="font-size:13px;color:#888;margin:0;line-height:1.7;">${item.a}</p>
    </div>`).join("")}
  </div>` : ""}

  <!-- 이미지 -->
  ${renderImages(d.productImages)}

  <!-- CTA: 언더스테이트 -->
  <div style="padding:48px 40px;text-align:center;border-top:1px solid #f0f0f0;">
    ${d.urgency ? `<p style="font-size:12px;color:#999;margin:0 0 12px;">${d.urgency}</p>` : ""}
    <p style="font-size:16px;color:#111;margin:0 0 20px;font-weight:400;">${d.cta}</p>
    <div style="display:inline-block;background:${color};color:#fff;padding:12px 40px;border-radius:8px;font-size:14px;font-weight:600;">구매하기</div>
    ${d.trustBadges.length > 0 ? `<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:16px;">${d.trustBadges.map((b) => `<span style="font-size:11px;color:#aaa;">${b}</span>`).join("")}</div>` : ""}
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:24px;">${d.seoKeywords.map((kw) => `<span style="font-size:10px;color:#ccc;">#${kw}</span>`).join("")}</div>
  </div>
</div>`;
}
