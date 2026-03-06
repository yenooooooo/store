import type { TemplateData } from "../template-types";

export function build(d: TemplateData): string {
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#1a2e1a;background:#f0fdf4;padding:0;">

  <!-- Hero: 소프트 그린 그라디언트 -->
  <div style="padding:64px 40px;text-align:center;background:linear-gradient(180deg,#dcfce7 0%,#f0fdf4 100%);border-radius:0 0 40px 40px;">
    <div style="display:inline-block;background:#16a34a;color:#fff;font-size:11px;font-weight:700;padding:5px 16px;border-radius:20px;margin-bottom:20px;">&#127807; Natural Choice</div>
    <h1 style="font-size:28px;font-weight:800;margin:0 0 14px;color:#14532d;line-height:1.35;">${d.productName}</h1>
    <p style="font-size:15px;color:#166534;margin:0;font-weight:400;line-height:1.7;opacity:0.8;">${d.subtitle}</p>
    ${d.trustBadges.length > 0 ? `<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:24px;">${d.trustBadges.map((b) => `<span style="font-size:11px;color:#15803d;background:#bbf7d0;padding:6px 14px;border-radius:20px;">&#10003; ${b}</span>`).join("")}</div>` : ""}
  </div>

  ${d.painPoints.length > 0 ? `
  <!-- Pain: 리프 아이콘 리스트 -->
  <div style="padding:40px;margin:0 24px;background:#fff;border-radius:20px;margin-top:-20px;box-shadow:0 2px 12px rgba(0,0,0,0.04);">
    <p style="font-size:17px;font-weight:800;color:#14532d;margin:0 0 20px;text-align:center;">&#128161; 혹시 이런 고민 있으셨나요?</p>
    ${d.painPoints.map((p) => `<div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;padding:12px 16px;background:#fef2f2;border-radius:12px;">
      <span style="font-size:14px;">&#10060;</span>
      <p style="font-size:14px;color:#991b1b;margin:0;line-height:1.6;">${p}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.solution ? `
  <!-- Solution: 그린 버블 -->
  <div style="padding:40px;text-align:center;">
    <div style="max-width:600px;margin:0 auto;background:#dcfce7;border-radius:24px;padding:32px;">
      <p style="font-size:11px;letter-spacing:3px;color:#16a34a;margin:0 0 12px;">&#127807; SOLUTION</p>
      <p style="font-size:15px;color:#14532d;line-height:1.8;margin:0;">${d.solution}</p>
    </div>
  </div>` : ""}

  ${d.features.length > 0 ? `
  <!-- Features: 둥근 버블 카드 -->
  <div style="padding:32px 40px;">
    <p style="font-size:11px;letter-spacing:3px;color:#4ade80;margin:0 0 28px;text-align:center;">FEATURES</p>
    ${d.features.map((f, i) => `<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:14px;padding:18px 20px;background:#fff;border-radius:16px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
      <div style="min-width:36px;height:36px;background:linear-gradient(135deg,#22c55e,#16a34a);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;">${i + 1}</div>
      <p style="font-size:14px;color:#166534;margin:0;line-height:1.7;padding-top:6px;">${f}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.specs.length > 0 ? `
  <!-- Specs: 오가닉 테이블 -->
  <div style="padding:32px 40px;">
    <div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
      ${d.specs.map((s, i) => `<div style="display:flex;${i > 0 ? "border-top:1px solid #dcfce7;" : ""}">
        <div style="flex:0 0 130px;padding:14px 20px;font-size:13px;font-weight:600;color:#16a34a;background:#f0fdf4;">${s.label}</div>
        <div style="flex:1;padding:14px 20px;font-size:13px;color:#166534;">${s.value}</div>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.scenario ? `
  <div style="padding:40px;text-align:center;">
    <div style="max-width:560px;margin:0 auto;padding:32px;background:#fff;border-radius:20px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
      <p style="font-size:14px;color:#166534;line-height:2;margin:0;font-style:italic;">"${d.scenario}"</p>
    </div>
  </div>` : ""}

  ${d.testimonial ? `
  <!-- Testimonial: 말풍선 -->
  <div style="padding:24px 40px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:20px;padding:24px;box-shadow:0 1px 4px rgba(0,0,0,0.04);position:relative;">
      <div style="color:#22c55e;font-size:14px;margin-bottom:8px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p style="font-size:14px;color:#166534;line-height:1.8;margin:0;">"${d.testimonial}"</p>
    </div>
  </div>` : ""}

  ${d.faq.length > 0 ? `
  <div style="padding:40px;">
    <p style="font-size:17px;font-weight:800;color:#14532d;margin:0 0 24px;text-align:center;">&#128587; 자주 묻는 질문</p>
    ${d.faq.map((item) => `<div style="margin-bottom:14px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
      <div style="padding:16px 20px;font-size:14px;font-weight:700;color:#14532d;">Q. ${item.q}</div>
      <div style="padding:0 20px 16px;font-size:13px;color:#166534;line-height:1.7;opacity:0.8;">${item.a}</div>
    </div>`).join("")}
  </div>` : ""}

  <!-- CTA -->
  <div style="padding:48px 40px;text-align:center;background:linear-gradient(180deg,#f0fdf4 0%,#dcfce7 100%);border-radius:40px 40px 0 0;">
    ${d.urgency ? `<p style="font-size:12px;color:#dc2626;font-weight:600;margin:0 0 12px;">${d.urgency}</p>` : ""}
    <p style="font-size:20px;font-weight:800;color:#14532d;margin:0 0 20px;">${d.cta}</p>
    <div style="display:inline-block;background:#16a34a;color:#fff;padding:14px 48px;border-radius:28px;font-size:15px;font-weight:700;">&#127807; 지금 구매하기</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:24px;">${d.seoKeywords.map((kw) => `<span style="font-size:10px;color:#4ade80;">#${kw}</span>`).join("")}</div>
  </div>
</div>`;
}
