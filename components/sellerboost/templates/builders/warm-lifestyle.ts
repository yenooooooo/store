import type { TemplateData } from "../template-types";

export function build(d: TemplateData): string {
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#44403c;background:#fffbf5;padding:0;">

  <!-- Hero: 웜 피치 그라디언트 -->
  <div style="padding:64px 40px;text-align:center;background:linear-gradient(180deg,#fff1e6 0%,#fffbf5 100%);">
    <div style="display:inline-block;background:#fb923c;color:#fff;font-size:11px;font-weight:700;padding:6px 18px;border-radius:20px;margin-bottom:20px;">&#10084; Best Choice</div>
    <h1 style="font-size:28px;font-weight:800;margin:0 0 14px;color:#1c1917;line-height:1.4;">${d.productName}</h1>
    <p style="font-size:15px;color:#a8a29e;margin:0;line-height:1.7;">${d.subtitle}</p>
    ${d.trustBadges.length > 0 ? `<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:24px;">${d.trustBadges.map((b) => `<span style="font-size:11px;color:#ea580c;background:#fff7ed;border:1px solid #fed7aa;padding:6px 14px;border-radius:20px;">${b}</span>`).join("")}</div>` : ""}
  </div>

  ${d.painPoints.length > 0 ? `
  <!-- Pain: 따뜻한 톤 라운드 카드 -->
  <div style="padding:40px;">
    <div style="background:#fff;border-radius:24px;padding:32px;box-shadow:0 2px 12px rgba(0,0,0,0.04);">
      <p style="font-size:17px;font-weight:700;color:#1c1917;margin:0 0 20px;text-align:center;">&#128546; 이런 고민 있으셨나요?</p>
      ${d.painPoints.map((p) => `<div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;padding:14px 16px;background:#fef2f2;border-radius:14px;">
        <span style="font-size:16px;">&#128148;</span>
        <p style="font-size:14px;color:#991b1b;margin:0;line-height:1.6;">${p}</p>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.solution ? `
  <!-- Solution: 웜 톤 카드 -->
  <div style="padding:0 40px 40px;">
    <div style="background:linear-gradient(135deg,#fb923c,#f97316);border-radius:20px;padding:32px;text-align:center;">
      <p style="font-size:12px;color:rgba(255,255,255,0.8);letter-spacing:2px;margin:0 0 12px;">SOLUTION</p>
      <p style="font-size:16px;color:#fff;line-height:1.8;margin:0;font-weight:500;">${d.solution}</p>
    </div>
  </div>` : ""}

  ${d.features.length > 0 ? `
  <!-- Features: 소프트 라운드 카드 -->
  <div style="padding:32px 40px;">
    <p style="font-size:11px;letter-spacing:3px;color:#fb923c;margin:0 0 28px;text-align:center;">WHY WE LOVE IT</p>
    ${d.features.map((f, i) => `<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:14px;padding:18px 20px;background:#fff;border-radius:18px;box-shadow:0 1px 4px rgba(0,0,0,0.03);">
      <div style="min-width:36px;height:36px;background:linear-gradient(135deg,#fb923c,#f97316);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;">${i + 1}</div>
      <p style="font-size:14px;color:#57534e;margin:0;line-height:1.7;padding-top:6px;">${f}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.specs.length > 0 ? `
  <!-- Specs: 코지 라운드 테이블 -->
  <div style="padding:32px 40px;">
    <div style="background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.03);">
      ${d.specs.map((s, i) => `<div style="display:flex;${i > 0 ? "border-top:1px solid #fef3c7;" : ""}">
        <div style="flex:0 0 130px;padding:14px 20px;font-size:13px;font-weight:600;color:#ea580c;background:#fff7ed;">${s.label}</div>
        <div style="flex:1;padding:14px 20px;font-size:13px;color:#57534e;">${s.value}</div>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.scenario ? `
  <div style="padding:40px;text-align:center;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:24px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
      <p style="font-size:28px;margin:0 0 16px;">&#128156;</p>
      <p style="font-size:14px;color:#78716c;line-height:2;margin:0;font-style:italic;">"${d.scenario}"</p>
    </div>
  </div>` : ""}

  ${d.testimonial ? `
  <!-- Testimonial: 하트 카드 -->
  <div style="padding:24px 40px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:20px;padding:24px;box-shadow:0 1px 4px rgba(0,0,0,0.03);border:2px solid #fed7aa;">
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;">
        <span style="font-size:18px;">&#10084;</span>
        <span style="color:#f59e0b;font-size:14px;">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
      </div>
      <p style="font-size:14px;color:#57534e;line-height:1.8;margin:0;">"${d.testimonial}"</p>
    </div>
  </div>` : ""}

  ${d.faq.length > 0 ? `
  <div style="padding:40px;">
    <p style="font-size:17px;font-weight:700;color:#1c1917;margin:0 0 24px;text-align:center;">&#128172; 자주 묻는 질문</p>
    ${d.faq.map((item) => `<div style="margin-bottom:14px;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.03);">
      <div style="padding:16px 20px;font-size:14px;font-weight:600;color:#1c1917;background:#fff7ed;">Q. ${item.q}</div>
      <div style="padding:14px 20px;font-size:13px;color:#78716c;line-height:1.7;">A. ${item.a}</div>
    </div>`).join("")}
  </div>` : ""}

  <!-- CTA: 코랄 -->
  <div style="padding:48px 40px;text-align:center;background:linear-gradient(180deg,#fffbf5 0%,#fff1e6 100%);">
    ${d.urgency ? `<p style="font-size:12px;color:#dc2626;font-weight:600;margin:0 0 12px;">&#128293; ${d.urgency}</p>` : ""}
    <p style="font-size:20px;font-weight:800;color:#1c1917;margin:0 0 20px;">${d.cta}</p>
    <div style="display:inline-block;background:linear-gradient(135deg,#fb923c,#f97316);color:#fff;padding:16px 48px;border-radius:28px;font-size:15px;font-weight:700;">&#10084; 지금 구매하기</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:24px;">${d.seoKeywords.map((kw) => `<span style="font-size:10px;color:#d6d3d1;">#${kw}</span>`).join("")}</div>
  </div>
</div>`;
}
