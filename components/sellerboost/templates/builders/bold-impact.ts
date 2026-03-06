import type { TemplateData } from "../template-types";
import { ac, renderImages } from "./shared";

export function build(d: TemplateData): string {
  const color = ac(d.brandColor, "#dc2626");
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#1c1917;background:#fff;padding:0;">

  <!-- Hero: 블랙 + 레드 강렬한 히어로 -->
  <div style="background:#111;padding:64px 40px;text-align:center;">
    ${d.urgency ? `<div style="display:inline-block;background:#dc2626;color:#fff;font-size:12px;font-weight:800;padding:8px 24px;border-radius:4px;margin-bottom:24px;animation:pulse 2s infinite;">&#128293; ${d.urgency}</div>` : ""}
    <h1 style="font-size:36px;font-weight:900;margin:0 0 16px;color:#fff;line-height:1.2;">${d.productName}</h1>
    <p style="font-size:17px;color:#dc2626;margin:0;font-weight:700;">${d.subtitle}</p>
    ${d.trustBadges.length > 0 ? `<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:28px;">${d.trustBadges.map((b) => `<span style="font-size:12px;color:#fff;background:#dc2626;padding:8px 16px;border-radius:4px;font-weight:700;">${b}</span>`).join("")}</div>` : ""}
  </div>

  ${d.painPoints.length > 0 ? `
  <!-- Pain: 큰 X 마크 -->
  <div style="padding:48px 40px;background:#fef2f2;">
    <p style="font-size:28px;font-weight:900;color:#dc2626;margin:0 0 24px;text-align:center;">STOP!</p>
    <p style="font-size:15px;color:#7f1d1d;margin:0 0 24px;text-align:center;">이런 경험, 이제 그만하세요</p>
    ${d.painPoints.map((p) => `<div style="display:flex;gap:16px;align-items:center;margin-bottom:14px;">
      <div style="min-width:40px;height:40px;background:#dc2626;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;font-weight:900;">X</div>
      <p style="font-size:15px;color:#7f1d1d;margin:0;line-height:1.6;font-weight:500;">${p}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.solution ? `
  <!-- Solution: 풀폭 그라디언트 -->
  <div style="padding:48px 40px;background:linear-gradient(135deg,#dc2626 0%,#b91c1c 100%);text-align:center;">
    <p style="font-size:14px;color:rgba(255,255,255,0.8);letter-spacing:3px;margin:0 0 16px;">&#10024; THE ANSWER</p>
    <p style="font-size:20px;color:#fff;line-height:1.7;margin:0;font-weight:700;max-width:600px;margin:0 auto;">${d.solution}</p>
  </div>` : ""}

  ${d.features.length > 0 ? `
  <!-- Features: 풀폭 블록 + 큰 넘버 -->
  <div style="padding:48px 40px;">
    <p style="font-size:24px;font-weight:900;color:#111;margin:0 0 32px;text-align:center;">왜 이 제품인가?</p>
    ${d.features.map((f, i) => `<div style="margin-bottom:16px;padding:24px;background:${i % 2 === 0 ? "#111" : "#fef2f2"};border-radius:12px;display:flex;gap:20px;align-items:center;">
      <span style="font-size:48px;font-weight:900;color:${i % 2 === 0 ? "#dc2626" : "#b91c1c"};line-height:1;min-width:64px;text-align:center;">${String(i + 1).padStart(2, "0")}</span>
      <p style="font-size:15px;color:${i % 2 === 0 ? "#e5e5e5" : "#44403c"};margin:0;line-height:1.7;font-weight:500;">${f}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.specs.length > 0 ? `
  <!-- Specs: 하이 콘트라스트 -->
  <div style="padding:40px;background:#111;">
    <p style="font-size:11px;letter-spacing:4px;color:#dc2626;margin:0 0 20px;text-align:center;">SPEC</p>
    <div style="border:2px solid #dc2626;border-radius:8px;overflow:hidden;">
      ${d.specs.map((s, i) => `<div style="display:flex;${i > 0 ? "border-top:1px solid #333;" : ""}">
        <div style="flex:0 0 140px;padding:14px 20px;font-size:13px;font-weight:700;color:#dc2626;background:#1a1a1a;">${s.label}</div>
        <div style="flex:1;padding:14px 20px;font-size:13px;color:#d4d4d4;background:#111;">${s.value}</div>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.scenario ? `
  <div style="padding:48px 40px;text-align:center;">
    <p style="font-size:17px;color:#44403c;line-height:1.9;margin:0;max-width:600px;margin:0 auto;font-weight:500;">${d.scenario}</p>
  </div>` : ""}

  ${d.testimonial ? `
  <div style="padding:40px;background:#fef2f2;">
    <div style="max-width:600px;margin:0 auto;border-left:4px solid #dc2626;padding-left:24px;">
      <div style="color:#f59e0b;font-size:16px;margin-bottom:8px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p style="font-size:15px;color:#44403c;line-height:1.8;margin:0;font-weight:500;">"${d.testimonial}"</p>
    </div>
  </div>` : ""}

  ${d.faq.length > 0 ? `
  <div style="padding:48px 40px;">
    <p style="font-size:24px;font-weight:900;color:#111;margin:0 0 28px;text-align:center;">FAQ</p>
    ${d.faq.map((item) => `<div style="margin-bottom:14px;border:2px solid #fecaca;border-radius:8px;overflow:hidden;">
      <div style="padding:16px 20px;background:#fef2f2;font-size:15px;font-weight:700;color:#111;">Q. ${item.q}</div>
      <div style="padding:14px 20px;font-size:14px;color:#57534e;line-height:1.7;">A. ${item.a}</div>
    </div>`).join("")}
  </div>` : ""}

  <!-- 이미지 -->
  ${d.productImages && d.productImages.length > 0 ? `<div style="padding:0 40px 24px;">${renderImages(d.productImages)}</div>` : ""}

  <!-- CTA: 강렬한 레드 -->
  <div style="padding:56px 40px;background:#111;text-align:center;">
    ${d.urgency ? `<div style="display:inline-block;background:${color};color:#fff;font-size:14px;font-weight:800;padding:10px 32px;border-radius:4px;margin-bottom:20px;">&#9888; ${d.urgency}</div>` : ""}
    <p style="font-size:28px;font-weight:900;color:#fff;margin:0 0 24px;line-height:1.3;">${d.cta}</p>
    <div style="display:inline-block;background:${color};color:#fff;padding:18px 64px;border-radius:8px;font-size:18px;font-weight:900;">&#128293; 지금 바로 구매</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:28px;">${d.seoKeywords.map((kw) => `<span style="font-size:10px;color:#525252;">#${kw}</span>`).join("")}</div>
  </div>
</div>`;
}
