import type { TemplateData } from "../template-types";
import { ac, renderImages } from "./shared";

export function build(d: TemplateData): string {
  const color = ac(d.brandColor, "#7c3aed");
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#1f2937;background:#fff;padding:0;">

  <!-- Hero: 즉시 CTA 포함 스플릿 히어로 -->
  <div style="background:${color};padding:56px 40px;text-align:center;">
    ${d.urgency ? `<div style="display:inline-block;background:#fbbf24;color:#111;font-size:13px;font-weight:800;padding:8px 24px;border-radius:4px;margin-bottom:20px;">&#9200; ${d.urgency}</div>` : ""}
    <h1 style="font-size:30px;font-weight:900;margin:0 0 14px;color:#fff;line-height:1.3;">${d.productName}</h1>
    <p style="font-size:16px;color:rgba(255,255,255,0.85);margin:0 0 24px;">${d.subtitle}</p>
    <div style="display:inline-block;background:#fbbf24;color:#111;padding:16px 56px;border-radius:8px;font-size:17px;font-weight:900;">&#128293; 지금 바로 구매하기</div>
    ${d.trustBadges.length > 0 ? `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:20px;">${d.trustBadges.map((b) => `<span style="font-size:11px;color:rgba(255,255,255,0.8);background:rgba(255,255,255,0.1);padding:6px 14px;border-radius:4px;">&#10003; ${b}</span>`).join("")}</div>` : ""}
  </div>

  <!-- 소셜 프루프 바 -->
  <div style="background:#fef3c7;padding:14px 40px;text-align:center;">
    <p style="font-size:14px;font-weight:700;color:#92400e;margin:0;">&#128293; 지금까지 <span style="color:#dc2626;font-size:18px;">12,847명</span>이 선택했습니다 | 평점 <span style="color:#f59e0b;">&#9733;&#9733;&#9733;&#9733;&#9733;</span> 4.9/5.0</p>
  </div>

  ${d.painPoints.length > 0 ? `
  <!-- Pain: Before/After 스타일 -->
  <div style="padding:48px 40px;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
      <div style="background:#fef2f2;border-radius:16px;padding:28px;border:2px solid #fecaca;">
        <p style="font-size:16px;font-weight:800;color:#dc2626;margin:0 0 16px;">&#10060; Before</p>
        ${d.painPoints.map((p) => `<p style="font-size:13px;color:#991b1b;margin:0 0 10px;line-height:1.6;display:flex;gap:8px;"><span>&#8226;</span>${p}</p>`).join("")}
      </div>
      <div style="background:#f0fdf4;border-radius:16px;padding:28px;border:2px solid #86efac;">
        <p style="font-size:16px;font-weight:800;color:#16a34a;margin:0 0 16px;">&#10004; After</p>
        ${d.features.slice(0, d.painPoints.length).map((f) => `<p style="font-size:13px;color:#166534;margin:0 0 10px;line-height:1.6;display:flex;gap:8px;"><span>&#10003;</span>${f}</p>`).join("")}
      </div>
    </div>
  </div>` : ""}

  ${d.solution ? `
  <!-- Solution: 보라 하이라이트 -->
  <div style="padding:40px;text-align:center;">
    <div style="background:linear-gradient(135deg,#ede9fe,#f5f3ff);border-radius:16px;padding:36px;border:1px solid #c4b5fd;">
      <p style="font-size:12px;color:#7c3aed;letter-spacing:3px;font-weight:700;margin:0 0 16px;">&#128161; WHY THIS PRODUCT</p>
      <p style="font-size:16px;color:#4c1d95;line-height:1.8;margin:0;font-weight:600;">${d.solution}</p>
    </div>
  </div>` : ""}

  ${d.features.length > 0 ? `
  <!-- Features: 미니 CTA 포함 -->
  <div style="padding:40px;">
    <p style="font-size:22px;font-weight:900;color:#111;margin:0 0 28px;text-align:center;">선택해야 하는 이유</p>
    ${d.features.map((f, i) => `<div style="display:flex;gap:16px;align-items:center;margin-bottom:14px;padding:20px;background:#f9fafb;border-radius:12px;border-left:4px solid #7c3aed;">
      <div style="min-width:40px;height:40px;background:#7c3aed;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;color:#fff;">${i + 1}</div>
      <p style="font-size:14px;color:#374151;margin:0;line-height:1.7;flex:1;">${f}</p>
    </div>`).join("")}
    <!-- 중간 CTA -->
    <div style="text-align:center;margin-top:28px;padding:20px;background:linear-gradient(135deg,#7c3aed,#6d28d9);border-radius:12px;">
      <p style="font-size:15px;color:#fff;font-weight:700;margin:0;">&#9889; 지금 구매하면 특별 혜택이 적용됩니다</p>
    </div>
  </div>` : ""}

  ${d.specs.length > 0 ? `
  <!-- Specs: "가장 인기" 하이라이트 -->
  <div style="padding:40px;background:#f9fafb;">
    <p style="font-size:11px;letter-spacing:3px;color:#6b7280;margin:0 0 20px;text-align:center;">SPECIFICATIONS</p>
    <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      ${d.specs.map((s, i) => `<div style="display:flex;${i > 0 ? "border-top:1px solid #e5e7eb;" : ""}${i === 0 ? "background:#ede9fe;" : "background:#fff;"}">
        <div style="flex:0 0 140px;padding:14px 20px;font-size:13px;font-weight:700;color:${i === 0 ? "#7c3aed" : "#374151"};">${i === 0 ? "&#11088; " : ""}${s.label}</div>
        <div style="flex:1;padding:14px 20px;font-size:13px;color:#6b7280;">${s.value}</div>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.testimonial ? `
  <!-- Testimonial: 별점 프로미넌트 -->
  <div style="padding:40px;">
    <div style="max-width:600px;margin:0 auto;text-align:center;background:#fff;border:2px solid #7c3aed;border-radius:16px;padding:32px;">
      <div style="font-size:20px;color:#f59e0b;margin-bottom:8px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p style="font-size:18px;font-weight:700;color:#111;margin:0 0 8px;">실제 구매자 후기</p>
      <p style="font-size:14px;color:#6b7280;line-height:1.8;margin:0;">"${d.testimonial}"</p>
    </div>
  </div>` : ""}

  ${d.scenario ? `
  <div style="padding:40px;background:#f9fafb;">
    <p style="font-size:15px;color:#374151;line-height:1.9;margin:0;text-align:center;max-width:600px;margin:0 auto;">${d.scenario}</p>
  </div>` : ""}

  ${d.faq.length > 0 ? `
  <div style="padding:40px;">
    <p style="font-size:20px;font-weight:900;color:#111;margin:0 0 24px;text-align:center;">구매 전 확인하세요</p>
    ${d.faq.map((item) => `<div style="margin-bottom:12px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="padding:16px 20px;background:#f9fafb;font-size:14px;font-weight:700;color:#111;">&#128172; ${item.q}</div>
      <div style="padding:14px 20px;font-size:13px;color:#6b7280;line-height:1.7;">${item.a}</div>
    </div>`).join("")}
  </div>` : ""}

  <!-- 이미지 -->
  ${d.productImages && d.productImages.length > 0 ? `<div style="padding:0 40px 24px;">${renderImages(d.productImages)}</div>` : ""}

  <!-- Final CTA: 최종 전환 -->
  <div style="padding:56px 40px;text-align:center;background:${color};">
    ${d.urgency ? `<div style="display:inline-block;background:#fbbf24;color:#111;font-size:14px;font-weight:800;padding:10px 32px;border-radius:4px;margin-bottom:20px;">&#9200; ${d.urgency}</div>` : ""}
    <p style="font-size:26px;font-weight:900;color:#fff;margin:0 0 8px;">${d.cta}</p>
    <p style="font-size:14px;color:rgba(255,255,255,0.7);margin:0 0 24px;">12,847명이 이미 선택한 검증된 제품</p>
    <div style="display:inline-block;background:#fbbf24;color:#111;padding:18px 64px;border-radius:8px;font-size:18px;font-weight:900;">&#128293; 한정 특가로 구매하기</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:24px;">${d.seoKeywords.map((kw) => `<span style="font-size:10px;color:rgba(255,255,255,0.4);">#${kw}</span>`).join("")}</div>
  </div>
</div>`;
}
