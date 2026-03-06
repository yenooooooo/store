import type { TemplateData } from "../template-types";
import { ac, renderImages } from "./shared";

export function build(d: TemplateData): string {
  const color = ac(d.brandColor, "#3b82f6");
  return `<div style="max-width:860px;margin:0 auto;font-family:'Noto Sans KR',sans-serif;color:#e2e8f0;background:#0f172a;padding:0;">

  <!-- Hero: 그라디언트 + 글래스 -->
  <div style="padding:64px 40px;text-align:center;background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%);">
    <div style="display:inline-block;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:#60a5fa;font-size:11px;font-weight:600;padding:6px 18px;border-radius:20px;margin-bottom:24px;backdrop-filter:blur(8px);">&#9889; Next Generation</div>
    <h1 style="font-size:32px;font-weight:800;margin:0 0 14px;color:#fff;line-height:1.3;letter-spacing:-0.5px;">${d.productName}</h1>
    <p style="font-size:15px;color:#60a5fa;margin:0;font-weight:500;">${d.subtitle}</p>
    ${d.trustBadges.length > 0 ? `<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:28px;">${d.trustBadges.map((b) => `<span style="font-size:11px;color:#94a3b8;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:6px 14px;border-radius:8px;">${b}</span>`).join("")}</div>` : ""}
  </div>

  ${d.painPoints.length > 0 ? `
  <!-- Pain: 글래스 카드 -->
  <div style="padding:48px 40px;">
    <p style="font-size:18px;font-weight:700;color:#fff;margin:0 0 24px;text-align:center;">&#9888; 현재 겪고 계신 문제</p>
    ${d.painPoints.map((p) => `<div style="display:flex;gap:14px;align-items:center;margin-bottom:12px;padding:16px 20px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:12px;">
      <span style="color:#f87171;font-size:16px;">&#10007;</span>
      <p style="font-size:14px;color:#fca5a5;margin:0;line-height:1.6;">${p}</p>
    </div>`).join("")}
  </div>` : ""}

  ${d.solution ? `
  <!-- Solution: 네온 글로우 박스 -->
  <div style="padding:40px;">
    <div style="padding:32px;background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.3);border-radius:16px;text-align:center;">
      <p style="font-size:12px;color:#60a5fa;letter-spacing:3px;margin:0 0 16px;">&#10024; SOLUTION</p>
      <p style="font-size:16px;color:#e2e8f0;line-height:1.8;margin:0;max-width:580px;margin:0 auto;">${d.solution}</p>
    </div>
  </div>` : ""}

  ${d.features.length > 0 ? `
  <!-- Features: 네온 보더 카드 -->
  <div style="padding:40px;">
    <p style="font-size:11px;letter-spacing:4px;color:#3b82f6;margin:0 0 32px;text-align:center;">FEATURES</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      ${d.features.map((f, i) => `<div style="padding:20px;background:rgba(255,255,255,0.03);border:1px solid rgba(59,130,246,${i === 0 ? "0.4" : "0.15"});border-radius:12px;${i === 0 ? "grid-column:1/-1;background:rgba(59,130,246,0.06);" : ""}">
        <div style="display:flex;gap:14px;align-items:flex-start;">
          <div style="min-width:32px;height:32px;background:linear-gradient(135deg,#3b82f6,#2563eb);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;">${String(i + 1).padStart(2, "0")}</div>
          <p style="font-size:13px;color:#94a3b8;margin:0;line-height:1.7;padding-top:5px;">${f}</p>
        </div>
      </div>`).join("")}
    </div>
  </div>` : ""}

  ${d.specs.length > 0 ? `
  <!-- Specs: 터미널 스타일 -->
  <div style="padding:40px;">
    <div style="background:#020617;border:1px solid #1e293b;border-radius:12px;overflow:hidden;">
      <div style="padding:10px 16px;background:#1e293b;display:flex;gap:6px;">
        <span style="width:10px;height:10px;background:#ef4444;border-radius:50%;"></span>
        <span style="width:10px;height:10px;background:#f59e0b;border-radius:50%;"></span>
        <span style="width:10px;height:10px;background:#22c55e;border-radius:50%;"></span>
        <span style="font-size:11px;color:#64748b;margin-left:8px;">spec.config</span>
      </div>
      <div style="padding:16px;">
        ${d.specs.map((s) => `<div style="display:flex;padding:8px 0;font-family:'Courier New',monospace;">
          <span style="font-size:12px;color:#3b82f6;min-width:140px;">${s.label}:</span>
          <span style="font-size:12px;color:#94a3b8;">${s.value}</span>
        </div>`).join("")}
      </div>
    </div>
  </div>` : ""}

  ${d.scenario ? `
  <div style="padding:48px 40px;text-align:center;">
    <div style="max-width:580px;margin:0 auto;padding:28px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;">
      <p style="font-size:14px;color:#94a3b8;line-height:1.9;margin:0;font-style:italic;">"${d.scenario}"</p>
    </div>
  </div>` : ""}

  ${d.testimonial ? `
  <div style="padding:40px;">
    <div style="max-width:580px;margin:0 auto;padding:24px;background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);border-radius:16px;">
      <div style="color:#f59e0b;font-size:14px;margin-bottom:10px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0;">"${d.testimonial}"</p>
    </div>
  </div>` : ""}

  ${d.faq.length > 0 ? `
  <div style="padding:40px;">
    <p style="font-size:11px;letter-spacing:4px;color:#3b82f6;margin:0 0 28px;text-align:center;">FAQ</p>
    ${d.faq.map((item) => `<div style="margin-bottom:12px;border:1px solid #1e293b;border-radius:12px;overflow:hidden;">
      <div style="padding:16px 20px;background:rgba(255,255,255,0.03);font-size:14px;font-weight:600;color:#e2e8f0;">${item.q}</div>
      <div style="padding:14px 20px;font-size:13px;color:#64748b;line-height:1.7;">${item.a}</div>
    </div>`).join("")}
  </div>` : ""}

  <!-- 이미지 -->
  ${d.productImages && d.productImages.length > 0 ? `<div style="padding:0 40px 24px;">${renderImages(d.productImages)}</div>` : ""}

  <!-- CTA: 네온 그라디언트 -->
  <div style="padding:56px 40px;text-align:center;background:linear-gradient(180deg,#0f172a 0%,#1e293b 100%);">
    ${d.urgency ? `<p style="font-size:13px;color:#f87171;font-weight:600;margin:0 0 16px;">&#9889; ${d.urgency}</p>` : ""}
    <p style="font-size:24px;font-weight:800;color:#fff;margin:0 0 24px;">${d.cta}</p>
    <div style="display:inline-block;background:${color};color:#fff;padding:16px 56px;border-radius:12px;font-size:16px;font-weight:700;">&#9889; Get Now</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:28px;">${d.seoKeywords.map((kw) => `<span style="font-size:10px;color:#475569;">#${kw}</span>`).join("")}</div>
  </div>
</div>`;
}
