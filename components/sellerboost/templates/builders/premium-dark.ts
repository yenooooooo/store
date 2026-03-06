import type { TemplateData } from "../template-types";
import { ac, renderImages } from "./shared";

export function build(d: TemplateData): string {
  const color = ac(d.brandColor, "#c4a35a");
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#e5e5e5;background:#0a0a0a;padding:0;">

  <!-- Hero: 다크 럭셔리 -->
  <div style="padding:72px 40px;text-align:center;background:linear-gradient(180deg,#111 0%,#0a0a0a 100%);border-bottom:1px solid #1a1a1a;">
    ${d.trustBadges.length > 0 ? `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:28px;">${d.trustBadges.map((b) => `<span style="font-size:10px;color:${color};border:1px solid #2a2510;padding:4px 14px;border-radius:2px;letter-spacing:1px;text-transform:uppercase;">${b}</span>`).join("")}</div>` : ""}
    <h1 style="font-size:30px;font-weight:700;margin:0 0 16px;color:#fff;line-height:1.3;letter-spacing:-0.5px;">${d.productName}</h1>
    <p style="font-size:15px;color:${color};margin:0;font-weight:400;">${d.subtitle}</p>
    <div style="width:60px;height:2px;background:${color};margin:28px auto 0;"></div>
  </div>

  ${d.painPoints.length > 0 ? `
  <!-- Pain: 다크 카드 -->
  <div style="padding:48px 40px;background:#0e0e0e;">
    <p style="text-align:center;font-size:18px;font-weight:700;color:#fff;margin:0 0 28px;">이런 불편, 겪고 계셨죠?</p>
    ${d.painPoints.map((p) => `<div style="display:flex;gap:16px;align-items:center;margin-bottom:14px;padding:16px 20px;background:#141414;border:1px solid #222;border-radius:8px;">
      <span style="color:#ef4444;font-size:18px;line-height:1;">&#10007;</span>
      <p style="font-size:14px;color:#a3a3a3;margin:0;line-height:1.6;">${p}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.solution ? `
  <!-- Solution: 골드 하이라이트 -->
  <div style="padding:48px 40px;text-align:center;background:linear-gradient(135deg,#1a1810 0%,#0a0a0a 100%);">
    <div style="display:inline-block;background:linear-gradient(135deg,#c4a35a,#d4b86a);color:#0a0a0a;font-size:11px;font-weight:800;padding:6px 20px;border-radius:2px;margin-bottom:20px;letter-spacing:2px;">SOLUTION</div>
    <p style="font-size:16px;color:#d4d4d4;line-height:1.8;max-width:600px;margin:0 auto;">${d.solution}</p>
  </div>` : ""}

  ${d.features.length > 0 ? `
  <!-- Features: 골드 넘버 카드 -->
  <div style="padding:48px 40px;">
    <p style="text-align:center;font-size:11px;letter-spacing:4px;color:#c4a35a;margin:0 0 36px;">KEY FEATURES</p>
    ${d.features.map((f, i) => `<div style="display:flex;gap:20px;align-items:flex-start;margin-bottom:16px;padding:20px;background:linear-gradient(135deg,#141414,#111);border:1px solid #222;border-radius:8px;">
      <div style="min-width:44px;height:44px;background:linear-gradient(135deg,#c4a35a,#8b7635);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:#0a0a0a;">0${i + 1}</div>
      <p style="font-size:14px;color:#a3a3a3;margin:0;line-height:1.7;padding-top:10px;">${f}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.specs.length > 0 ? `
  <!-- Specs: 다크 테이블 -->
  <div style="padding:40px;">
    <div style="border:1px solid #222;border-radius:8px;overflow:hidden;">
      ${d.specs.map((s, i) => `<div style="display:flex;${i > 0 ? "border-top:1px solid #222;" : ""}">
        <div style="flex:0 0 140px;padding:14px 20px;background:#141414;font-size:13px;font-weight:600;color:#c4a35a;">${s.label}</div>
        <div style="flex:1;padding:14px 20px;font-size:13px;color:#a3a3a3;">${s.value}</div>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.scenario ? `
  <div style="padding:48px 40px;background:#0e0e0e;text-align:center;">
    <p style="font-size:15px;color:#737373;line-height:1.9;max-width:600px;margin:0 auto;font-style:italic;border-left:3px solid #c4a35a;padding-left:24px;text-align:left;">${d.scenario}</p>
  </div>` : ""}

  ${d.testimonial ? `
  <div style="padding:48px 40px;">
    <div style="max-width:600px;margin:0 auto;background:#141414;border:1px solid #222;border-radius:8px;padding:28px;">
      <div style="font-size:36px;color:#c4a35a;line-height:1;margin-bottom:12px;">&#10077;</div>
      <p style="font-size:14px;color:#a3a3a3;line-height:1.8;margin:0;">${d.testimonial}</p>
      <div style="margin-top:12px;color:#c4a35a;font-size:14px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    </div>
  </div>` : ""}

  ${d.faq.length > 0 ? `
  <div style="padding:48px 40px;background:#0e0e0e;">
    <p style="text-align:center;font-size:11px;letter-spacing:4px;color:#c4a35a;margin:0 0 32px;">FAQ</p>
    ${d.faq.map((item) => `<div style="margin-bottom:16px;border:1px solid #222;border-radius:8px;overflow:hidden;">
      <div style="padding:16px 20px;background:#141414;font-size:14px;font-weight:600;color:#e5e5e5;">${item.q}</div>
      <div style="padding:14px 20px;font-size:13px;color:#737373;line-height:1.7;">${item.a}</div>
    </div>`).join("")}
  </div>` : ""}

  <!-- 이미지 -->
  ${d.productImages && d.productImages.length > 0 ? `<div style="padding:0 40px 24px;">${renderImages(d.productImages)}</div>` : ""}

  <!-- CTA: 골드 그라디언트 -->
  <div style="padding:56px 40px;text-align:center;background:linear-gradient(180deg,#0a0a0a 0%,#111 100%);">
    ${d.urgency ? `<p style="font-size:13px;color:#ef4444;font-weight:600;margin:0 0 16px;">&#128293; ${d.urgency}</p>` : ""}
    <p style="font-size:24px;font-weight:800;color:#fff;margin:0 0 20px;">${d.cta}</p>
    <div style="display:inline-block;background:${color};color:#0a0a0a;padding:14px 48px;border-radius:4px;font-size:15px;font-weight:800;letter-spacing:1px;">SHOP NOW</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:28px;">${d.seoKeywords.map((kw) => `<span style="font-size:10px;color:#525252;">#${kw}</span>`).join("")}</div>
  </div>
</div>`;
}
