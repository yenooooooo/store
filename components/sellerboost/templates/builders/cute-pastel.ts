import type { TemplateData } from "../template-types";
import { ac, renderImages } from "./shared";

export function build(d: TemplateData): string {
  const color = ac(d.brandColor, "#ec4899");
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#831843;background:#fdf2f8;padding:0;">

  <!-- Hero: 파스텔 핑크 -->
  <div style="padding:64px 40px;text-align:center;background:linear-gradient(180deg,#fce7f3 0%,#fdf2f8 100%);">
    <div style="display:inline-block;font-size:32px;margin-bottom:16px;">&#127800;</div>
    <h1 style="font-size:26px;font-weight:800;margin:0 0 14px;color:#831843;line-height:1.4;">${d.productName}</h1>
    <p style="font-size:14px;color:#be185d;margin:0;line-height:1.7;opacity:0.7;">${d.subtitle}</p>
    ${d.trustBadges.length > 0 ? `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:24px;">${d.trustBadges.map((b) => `<span style="font-size:11px;color:#ec4899;background:#fce7f3;border:1px solid #f9a8d4;padding:6px 14px;border-radius:20px;">&#10084; ${b}</span>`).join("")}</div>` : ""}
  </div>

  ${d.painPoints.length > 0 ? `
  <!-- Pain: 핑크 버블 -->
  <div style="padding:40px;">
    <p style="font-size:17px;font-weight:800;color:#831843;margin:0 0 20px;text-align:center;">&#128557; 이런 고민 있으시죠?</p>
    ${d.painPoints.map((p) => `<div style="display:flex;gap:12px;align-items:center;margin-bottom:10px;padding:14px 18px;background:#fff;border-radius:20px;border:1px solid #fce7f3;">
      <span style="font-size:16px;">&#128546;</span>
      <p style="font-size:14px;color:#9d174d;margin:0;line-height:1.6;">${p}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.solution ? `
  <!-- Solution: 귀여운 카드 -->
  <div style="padding:0 40px 40px;">
    <div style="background:linear-gradient(135deg,#ec4899,#f472b6);border-radius:24px;padding:32px;text-align:center;">
      <p style="font-size:24px;margin:0 0 12px;">&#10024;</p>
      <p style="font-size:15px;color:#fff;line-height:1.8;margin:0;font-weight:500;">${d.solution}</p>
    </div>
  </div>` : ""}

  ${d.features.length > 0 ? `
  <!-- Features: 귀여운 라운드 -->
  <div style="padding:32px 40px;">
    <p style="font-size:11px;letter-spacing:3px;color:#ec4899;margin:0 0 24px;text-align:center;">&#127775; FEATURES</p>
    ${d.features.map((f, i) => `<div style="display:flex;gap:14px;align-items:flex-start;margin-bottom:12px;padding:16px 18px;background:#fff;border-radius:20px;border:1px solid #fce7f3;">
      <div style="min-width:32px;height:32px;background:linear-gradient(135deg,#ec4899,#f472b6);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;">${i + 1}</div>
      <p style="font-size:13px;color:#9d174d;margin:0;line-height:1.7;padding-top:4px;">${f}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.specs.length > 0 ? `
  <!-- Specs: 파스텔 테이블 -->
  <div style="padding:32px 40px;">
    <div style="background:#fff;border-radius:20px;overflow:hidden;border:1px solid #fce7f3;">
      ${d.specs.map((s, i) => `<div style="display:flex;${i > 0 ? "border-top:1px solid #fce7f3;" : ""}">
        <div style="flex:0 0 120px;padding:12px 18px;font-size:12px;font-weight:700;color:#ec4899;background:#fdf2f8;">${s.label}</div>
        <div style="flex:1;padding:12px 18px;font-size:12px;color:#9d174d;">${s.value}</div>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.scenario ? `
  <div style="padding:40px;text-align:center;">
    <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:24px;padding:28px;border:2px solid #f9a8d4;">
      <p style="font-size:24px;margin:0 0 12px;">&#128149;</p>
      <p style="font-size:13px;color:#9d174d;line-height:2;margin:0;font-style:italic;">"${d.scenario}"</p>
    </div>
  </div>` : ""}

  ${d.testimonial ? `
  <div style="padding:24px 40px;">
    <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:24px;padding:24px;border:1px solid #fce7f3;">
      <div style="display:flex;gap:6px;margin-bottom:8px;">
        <span style="font-size:14px;">&#128150;</span>
        <span style="color:#f472b6;font-size:13px;">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
      </div>
      <p style="font-size:13px;color:#9d174d;line-height:1.8;margin:0;">"${d.testimonial}"</p>
    </div>
  </div>` : ""}

  ${d.faq.length > 0 ? `
  <div style="padding:40px;">
    <p style="font-size:16px;font-weight:800;color:#831843;margin:0 0 20px;text-align:center;">&#128587; Q&A</p>
    ${d.faq.map((item) => `<div style="margin-bottom:12px;background:#fff;border-radius:20px;overflow:hidden;border:1px solid #fce7f3;">
      <div style="padding:14px 18px;font-size:13px;font-weight:700;color:#831843;background:#fdf2f8;">&#128172; ${item.q}</div>
      <div style="padding:12px 18px;font-size:12px;color:#9d174d;line-height:1.7;">${item.a}</div>
    </div>`).join("")}
  </div>` : ""}

  <!-- 이미지 -->
  ${d.productImages && d.productImages.length > 0 ? `<div style="padding:0 40px 24px;">${renderImages(d.productImages)}</div>` : ""}

  <!-- CTA -->
  <div style="padding:48px 40px;text-align:center;background:linear-gradient(180deg,#fdf2f8 0%,#fce7f3 100%);">
    ${d.urgency ? `<p style="font-size:12px;color:#dc2626;font-weight:600;margin:0 0 12px;">${d.urgency}</p>` : ""}
    <p style="font-size:18px;font-weight:800;color:#831843;margin:0 0 20px;">${d.cta}</p>
    <div style="display:inline-block;background:${color};color:#fff;padding:14px 48px;border-radius:28px;font-size:15px;font-weight:700;">&#127800; 구매하기</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:20px;">${d.seoKeywords.map((kw) => `<span style="font-size:10px;color:#f9a8d4;">#${kw}</span>`).join("")}</div>
  </div>
</div>`;
}
