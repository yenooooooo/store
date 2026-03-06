import type { TemplateData } from "../template-types";
import { ac, renderImages } from "./shared";

export function build(d: TemplateData): string {
  const color = ac(d.brandColor, "${color}");
  return `<div style="max-width:820px;margin:0 auto;font-family:'Noto Serif KR','Noto Sans KR',serif;color:#2c2c2c;background:#faf8f3;padding:0;">

  <!-- Hero: 엘레강트 크림 -->
  <div style="padding:72px 48px;text-align:center;background:#faf8f3;">
    <div style="width:32px;height:1px;background:${color};margin:0 auto 24px;"></div>
    <h1 style="font-size:28px;font-weight:400;margin:0 0 16px;color:#2c2c2c;line-height:1.5;letter-spacing:1px;">${d.productName}</h1>
    <p style="font-size:15px;color:#8b7e6a;margin:0;font-weight:300;line-height:1.8;font-style:italic;">${d.subtitle}</p>
    <div style="width:32px;height:1px;background:${color};margin:24px auto 0;"></div>
    ${d.trustBadges.length > 0 ? `<div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-top:28px;">${d.trustBadges.map((b) => `<span style="font-size:11px;color:#8b7e6a;letter-spacing:1px;">${b}</span>`).join(`<span style="color:#d4c5a0;">|</span>`)}</div>` : ""}
  </div>

  ${d.painPoints.length > 0 ? `
  <!-- Pain: 이탤릭 리스트 -->
  <div style="padding:40px 48px;border-top:1px solid #e8e2d6;">
    <p style="font-size:15px;color:#8b7e6a;margin:0 0 24px;text-align:center;font-style:italic;letter-spacing:0.5px;">이런 고민을 해결해 드리고자 합니다</p>
    ${d.painPoints.map((p) => `<p style="font-size:14px;color:#6b6256;margin:0 0 14px;line-height:1.8;padding-left:20px;border-left:1px solid #d4c5a0;font-style:italic;">${p}</p>`).join("")}
  </div>` : ""}

  ${d.solution ? `
  <!-- Solution: 골드 보더 박스 -->
  <div style="padding:40px 48px;">
    <div style="border:1px solid #d4c5a0;padding:36px;text-align:center;">
      <p style="font-size:12px;letter-spacing:4px;color:${color};margin:0 0 16px;">SOLUTION</p>
      <p style="font-size:16px;color:#2c2c2c;line-height:1.9;margin:0;font-weight:300;">${d.solution}</p>
    </div>
  </div>` : ""}

  ${d.features.length > 0 ? `
  <!-- Features: 번호 + 세리프 -->
  <div style="padding:40px 48px;border-top:1px solid #e8e2d6;">
    <p style="font-size:12px;letter-spacing:4px;color:${color};margin:0 0 32px;text-align:center;">FEATURES</p>
    ${d.features.map((f, i) => `<div style="display:flex;gap:20px;align-items:baseline;margin-bottom:24px;padding-bottom:24px;${i < d.features.length - 1 ? "border-bottom:1px solid #ece8df;" : ""}">
      <span style="font-size:24px;font-weight:300;color:${color};min-width:40px;text-align:right;font-family:Georgia,serif;">${String(i + 1).padStart(2, "0")}</span>
      <p style="font-size:14px;color:#4a4538;margin:0;line-height:1.8;">${f}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.specs.length > 0 ? `
  <!-- Specs: 클래식 얇은 테이블 -->
  <div style="padding:40px 48px;">
    <p style="font-size:12px;letter-spacing:4px;color:${color};margin:0 0 24px;text-align:center;">DETAILS</p>
    ${d.specs.map((s) => `<div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #ece8df;">
      <span style="font-size:13px;color:#8b7e6a;font-style:italic;">${s.label}</span>
      <span style="font-size:13px;color:#2c2c2c;">${s.value}</span>
    </div>`).join("")}
  </div>` : ""}

  ${d.scenario ? `
  <div style="padding:48px;text-align:center;background:#f5f0e8;">
    <div style="font-size:36px;color:#d4c5a0;line-height:1;margin-bottom:16px;">&#10077;</div>
    <p style="font-size:15px;color:#6b6256;line-height:2;max-width:560px;margin:0 auto;font-style:italic;">${d.scenario}</p>
    <div style="font-size:36px;color:#d4c5a0;line-height:1;margin-top:16px;">&#10078;</div>
  </div>` : ""}

  ${d.testimonial ? `
  <div style="padding:40px 48px;border-top:1px solid #e8e2d6;">
    <div style="max-width:560px;margin:0 auto;text-align:center;">
      <div style="color:${color};font-size:14px;margin-bottom:12px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p style="font-size:14px;color:#6b6256;line-height:1.9;margin:0;font-style:italic;">"${d.testimonial}"</p>
    </div>
  </div>` : ""}

  ${d.faq.length > 0 ? `
  <div style="padding:40px 48px;border-top:1px solid #e8e2d6;">
    <p style="font-size:12px;letter-spacing:4px;color:${color};margin:0 0 28px;text-align:center;">FAQ</p>
    ${d.faq.map((item) => `<div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #ece8df;">
      <p style="font-size:14px;font-weight:400;color:#2c2c2c;margin:0 0 8px;letter-spacing:0.3px;">Q. ${item.q}</p>
      <p style="font-size:13px;color:#8b7e6a;margin:0;line-height:1.8;font-style:italic;">${item.a}</p>
    </div>`).join("")}
  </div>` : ""}

  <!-- 이미지 -->
  ${d.productImages && d.productImages.length > 0 ? `<div style="padding:0 48px 24px;">${renderImages(d.productImages)}</div>` : ""}

  <!-- CTA: 엘레강트 -->
  <div style="padding:56px 48px;text-align:center;background:#f5f0e8;border-top:1px solid #e8e2d6;">
    ${d.urgency ? `<p style="font-size:12px;color:#b91c1c;margin:0 0 16px;font-style:italic;">${d.urgency}</p>` : ""}
    <p style="font-size:20px;font-weight:300;color:#2c2c2c;margin:0 0 24px;line-height:1.5;letter-spacing:0.5px;">${d.cta}</p>
    <div style="display:inline-block;border:1px solid ${color};color:${color};padding:14px 48px;font-size:14px;font-weight:400;letter-spacing:2px;">PURCHASE NOW</div>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:28px;">${d.seoKeywords.map((kw) => `<span style="font-size:10px;color:#b8a88a;">#${kw}</span>`).join("")}</div>
  </div>
</div>`;
}
