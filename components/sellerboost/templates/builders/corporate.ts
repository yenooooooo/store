import type { TemplateData } from "../template-types";
import { ac, renderImages } from "./shared";

export function build(d: TemplateData): string {
  const color = ac(d.brandColor, "#1e3a5f");
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#1f2937;background:#fff;padding:0;">

  <!-- Hero: 네이비 헤더 밴드 -->
  <div style="background:#1e3a5f;padding:48px 40px 44px;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;">
      <div style="width:8px;height:8px;background:#10b981;border-radius:50%;"></div>
      <span style="font-size:11px;color:rgba(255,255,255,0.6);letter-spacing:1px;">OFFICIAL PRODUCT</span>
    </div>
    <h1 style="font-size:26px;font-weight:800;margin:0 0 12px;color:#fff;line-height:1.3;">${d.productName}</h1>
    <p style="font-size:15px;color:rgba(255,255,255,0.75);margin:0;line-height:1.6;">${d.subtitle}</p>
  </div>

  ${d.trustBadges.length > 0 ? `
  <!-- Trust: 수평 배지 바 -->
  <div style="display:flex;justify-content:center;gap:0;background:#f0f9ff;border-bottom:1px solid #e0f2fe;">
    ${d.trustBadges.map((b) => `<div style="flex:1;text-align:center;padding:14px 8px;font-size:12px;font-weight:600;color:#1e3a5f;border-right:1px solid #e0f2fe;">&#10003; ${b}</div>`).join("")}
  </div>` : ""}

  ${d.painPoints.length > 0 ? `
  <!-- Pain: 넘버링 리스트 -->
  <div style="padding:40px;background:#fff;">
    <p style="font-size:18px;font-weight:800;color:#1e3a5f;margin:0 0 24px;display:flex;align-items:center;gap:8px;"><span style="color:#ef4444;">&#9888;</span> 이런 문제, 해결해 드립니다</p>
    ${d.painPoints.map((p, i) => `<div style="display:flex;gap:16px;align-items:center;margin-bottom:12px;padding:14px 20px;background:#fef2f2;border-radius:8px;border-left:4px solid #fca5a5;">
      <span style="font-size:16px;font-weight:800;color:#dc2626;">${i + 1}</span>
      <p style="font-size:14px;color:#7f1d1d;margin:0;line-height:1.6;">${p}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.solution ? `
  <!-- Solution: 파란 강조 박스 -->
  <div style="margin:0 40px 40px;padding:28px;background:linear-gradient(135deg,#1e3a5f,#2563eb);border-radius:12px;text-align:center;">
    <p style="font-size:11px;color:rgba(255,255,255,0.7);letter-spacing:3px;margin:0 0 12px;">SOLUTION</p>
    <p style="font-size:16px;color:#fff;line-height:1.8;margin:0;font-weight:500;">${d.solution}</p>
  </div>` : ""}

  ${d.features.length > 0 ? `
  <!-- Features: 2x 그리드 카드 -->
  <div style="padding:0 40px 40px;">
    <p style="font-size:11px;letter-spacing:3px;color:#94a3b8;margin:0 0 24px;text-transform:uppercase;">Key Features</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      ${d.features.map((f, i) => `<div style="padding:20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;${i === 0 ? "grid-column:1/-1;background:linear-gradient(135deg,#eff6ff,#f0f9ff);" : ""}">
        <div style="display:flex;gap:12px;align-items:flex-start;">
          <div style="min-width:32px;height:32px;background:#1e3a5f;color:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">${String(i + 1).padStart(2, "0")}</div>
          <p style="font-size:13px;color:#334155;margin:0;line-height:1.7;padding-top:5px;">${f}</p>
        </div>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.specs.length > 0 ? `
  <!-- Specs: 프로 스트라이프 테이블 -->
  <div style="padding:0 40px 40px;">
    <p style="font-size:11px;letter-spacing:3px;color:#94a3b8;margin:0 0 16px;text-transform:uppercase;">Specifications</p>
    <div style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      ${d.specs.map((s, i) => `<div style="display:flex;${i > 0 ? "border-top:1px solid #e2e8f0;" : ""}background:${i % 2 === 0 ? "#f8fafc" : "#fff"};">
        <div style="flex:0 0 140px;padding:14px 20px;font-size:13px;font-weight:700;color:#1e3a5f;">${s.label}</div>
        <div style="flex:1;padding:14px 20px;font-size:13px;color:#475569;">${s.value}</div>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.scenario ? `
  <div style="padding:40px;background:#f8fafc;border-top:1px solid #e2e8f0;">
    <p style="font-size:11px;letter-spacing:3px;color:#94a3b8;margin:0 0 16px;">USE CASE</p>
    <p style="font-size:15px;color:#334155;line-height:1.9;margin:0;max-width:640px;">${d.scenario}</p>
  </div>` : ""}

  ${d.testimonial ? `
  <div style="padding:40px;border-top:1px solid #e2e8f0;">
    <div style="display:flex;gap:16px;align-items:flex-start;">
      <div style="min-width:44px;height:44px;background:#1e3a5f;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;color:#fff;">&#9733;</div>
      <div>
        <div style="font-size:13px;font-weight:700;color:#1e3a5f;margin-bottom:4px;">실제 구매자 후기 <span style="color:#f59e0b;">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>
        <p style="font-size:14px;color:#475569;line-height:1.8;margin:0;">${d.testimonial}</p>
      </div>
    </div>
  </div>` : ""}

  ${d.faq.length > 0 ? `
  <div style="padding:40px;background:#f8fafc;border-top:1px solid #e2e8f0;">
    <p style="font-size:18px;font-weight:800;color:#1e3a5f;margin:0 0 24px;">자주 묻는 질문</p>
    ${d.faq.map((item) => `<div style="margin-bottom:16px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <div style="padding:16px 20px;font-size:14px;font-weight:700;color:#1e3a5f;background:#f0f9ff;">Q. ${item.q}</div>
      <div style="padding:14px 20px;font-size:13px;color:#64748b;line-height:1.7;">A. ${item.a}</div>
    </div>`).join("")}
  </div>` : ""}

  <!-- 이미지 -->
  ${d.productImages && d.productImages.length > 0 ? `<div style="padding:0 40px 24px;">${renderImages(d.productImages)}</div>` : ""}

  <!-- CTA -->
  <div style="padding:48px 40px;background:${color};text-align:center;">
    ${d.urgency ? `<div style="display:inline-block;background:#dc2626;color:#fff;font-size:12px;font-weight:700;padding:6px 20px;border-radius:4px;margin-bottom:16px;">${d.urgency}</div>` : ""}
    <p style="font-size:22px;font-weight:800;color:#fff;margin:0 0 20px;">${d.cta}</p>
    <div style="display:inline-block;background:#fff;color:${color};padding:14px 48px;border-radius:8px;font-size:15px;font-weight:700;">지금 구매하기</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:24px;">${d.seoKeywords.map((kw) => `<span style="font-size:10px;color:rgba(255,255,255,0.4);">#${kw}</span>`).join("")}</div>
  </div>
</div>`;
}
