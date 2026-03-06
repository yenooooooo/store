import type { TemplateData } from "../template-types";

export function build(d: TemplateData): string {
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#1a1a1a;background:#fff;padding:0;">

  <!-- Hero: 매거진 풀폭 배너, 좌측 정렬 -->
  <div style="background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);padding:64px 48px;position:relative;">
    <div style="display:inline-block;border:1px solid rgba(255,255,255,0.2);padding:4px 14px;border-radius:2px;margin-bottom:20px;">
      <span style="font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.6);text-transform:uppercase;">Product Story</span>
    </div>
    <h1 style="font-size:36px;font-weight:900;margin:0 0 16px;color:#fff;line-height:1.25;max-width:600px;">${d.productName}</h1>
    <p style="font-size:16px;color:rgba(255,255,255,0.7);margin:0;max-width:500px;line-height:1.7;">${d.subtitle}</p>
    ${d.trustBadges.length > 0 ? `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:24px;">${d.trustBadges.map((b) => `<span style="font-size:11px;color:#fff;background:rgba(255,255,255,0.1);padding:6px 14px;border-radius:4px;">${b}</span>`).join("")}</div>` : ""}
  </div>

  ${d.painPoints.length > 0 ? `
  <!-- Pain: 사이드바 스타일 콜아웃 -->
  <div style="display:flex;gap:0;">
    <div style="flex:0 0 6px;background:#ef4444;"></div>
    <div style="flex:1;padding:36px 40px;background:#fef2f2;">
      <p style="font-size:16px;font-weight:800;color:#991b1b;margin:0 0 16px;">이런 경험, 있으시죠?</p>
      ${d.painPoints.map((p) => `<p style="font-size:14px;color:#7f1d1d;margin:0 0 10px;line-height:1.7;padding-left:20px;position:relative;"><span style="position:absolute;left:0;">&#8226;</span>${p}</p>`).join("")}
    </div>
  </div>` : ""}

  ${d.solution ? `
  <!-- Solution: 풀 배너 인용 -->
  <div style="padding:48px;background:#f8fafc;border-left:4px solid #3b82f6;">
    <p style="font-size:20px;font-weight:300;color:#1e293b;line-height:1.7;margin:0;max-width:640px;">${d.solution}</p>
  </div>` : ""}

  ${d.features.length > 0 ? `
  <!-- Features: 2컬럼 매거진 그리드 -->
  <div style="padding:48px;">
    <p style="font-size:24px;font-weight:900;color:#0f172a;margin:0 0 8px;">핵심 특징</p>
    <div style="width:48px;height:3px;background:#3b82f6;margin-bottom:32px;"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
      ${d.features.map((f, i) => `<div style="padding:24px;background:${i === 0 ? "#f0f9ff" : "#f8fafc"};border-radius:12px;${i === 0 ? "grid-column:1/-1;" : ""}">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <span style="font-size:28px;font-weight:900;color:#3b82f6;line-height:1;">${String(i + 1).padStart(2, "0")}</span>
          <p style="font-size:14px;color:#334155;margin:0;line-height:1.7;padding-top:4px;">${f}</p>
        </div>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.specs.length > 0 ? `
  <!-- Specs: 매거진 팩트 박스 -->
  <div style="padding:40px 48px;background:#0f172a;">
    <p style="font-size:11px;letter-spacing:4px;color:#64748b;margin:0 0 24px;text-transform:uppercase;">Specifications</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;">
      ${d.specs.map((s) => `<div style="padding:16px 0;border-bottom:1px solid #1e293b;display:flex;justify-content:space-between;padding-right:24px;">
        <span style="font-size:13px;color:#64748b;">${s.label}</span>
        <span style="font-size:13px;color:#e2e8f0;font-weight:600;">${s.value}</span>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.scenario ? `
  <!-- Scenario: 풀퀼 인용 -->
  <div style="padding:56px 48px;text-align:center;">
    <div style="font-size:48px;color:#e2e8f0;line-height:1;">&#10077;</div>
    <p style="font-size:17px;color:#475569;line-height:2;max-width:600px;margin:16px auto 0;font-style:italic;">${d.scenario}</p>
  </div>` : ""}

  ${d.testimonial ? `
  <!-- Testimonial: 풀퀄리티 인용 -->
  <div style="padding:40px 48px;background:#f8fafc;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
    <div style="display:flex;gap:20px;align-items:flex-start;max-width:600px;margin:0 auto;">
      <div style="min-width:48px;height:48px;background:#3b82f6;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;">&#9733;</div>
      <div>
        <p style="font-size:14px;color:#334155;line-height:1.8;margin:0 0 8px;">${d.testimonial}</p>
        <div style="color:#f59e0b;font-size:14px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      </div>
    </div>
  </div>` : ""}

  ${d.faq.length > 0 ? `
  <div style="padding:48px;">
    <p style="font-size:24px;font-weight:900;color:#0f172a;margin:0 0 8px;">FAQ</p>
    <div style="width:48px;height:3px;background:#3b82f6;margin-bottom:32px;"></div>
    ${d.faq.map((item) => `<div style="margin-bottom:16px;border-bottom:1px solid #e2e8f0;padding-bottom:16px;">
      <p style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 8px;">${item.q}</p>
      <p style="font-size:14px;color:#64748b;margin:0;line-height:1.7;">${item.a}</p>
    </div>`).join("")}
  </div>` : ""}

  <!-- CTA: 매거진 풀폭 배너 -->
  <div style="padding:56px 48px;background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);text-align:center;">
    ${d.urgency ? `<p style="font-size:13px;color:#f59e0b;font-weight:600;margin:0 0 16px;">${d.urgency}</p>` : ""}
    <p style="font-size:24px;font-weight:900;color:#fff;margin:0 0 24px;line-height:1.4;">${d.cta}</p>
    <div style="display:inline-block;background:#3b82f6;color:#fff;padding:16px 56px;border-radius:8px;font-size:16px;font-weight:700;">구매하기</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:24px;">${d.seoKeywords.map((kw) => `<span style="font-size:10px;color:rgba(255,255,255,0.4);">#${kw}</span>`).join("")}</div>
  </div>
</div>`;
}
