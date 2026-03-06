import type { TemplateData } from "./template-types";
import type { TemplateTheme } from "./template-themes";

// Unicode icons for sections (no external dependencies)
const ICONS = {
  check: "&#10003;",
  pain: "&#10007;",
  star: "&#9733;",
  shield: "&#128737;",
  truck: "&#128666;",
  heart: "&#10084;",
  quote: "&#10077;",
  question: "Q",
  arrow: "&#10148;",
  fire: "&#128293;",
  sparkle: "&#10024;",
};

export function buildHeroSection(t: TemplateTheme, d: TemplateData): string {
  const hasImages = d.productImages.length > 0;
  return `<div style="background:${t.heroBg};padding:${hasImages ? "48px 32px 24px" : "56px 32px 48px"};text-align:center;">
  <h1 style="font-size:28px;font-weight:900;margin:0 0 12px;color:${t.heroText};line-height:1.3;">${d.productName}</h1>
  <p style="font-size:16px;color:${t.textSecondary};margin:0;font-weight:400;line-height:1.6;">${d.subtitle}</p>
  ${d.trustBadges.length > 0 ? `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:20px;">${d.trustBadges.map((b) => `<span style="font-size:11px;background:${t.badgeBg};color:${t.badgeText};padding:5px 12px;border-radius:20px;border:1px solid ${t.cardBorder};">${ICONS.shield} ${b}</span>`).join("")}</div>` : ""}
</div>
${hasImages ? buildImageSection(d.productImages) : ""}`;
}

function buildImageSection(images: string[]): string {
  if (images.length === 0) return "";
  if (images.length === 1) {
    return `<div style="padding:0 32px 16px;"><img src="${images[0]}" style="width:100%;border-radius:12px;display:block;" /></div>`;
  }
  return `<div style="padding:0 32px 16px;">
  <img src="${images[0]}" style="width:100%;border-radius:12px;display:block;margin-bottom:8px;" />
  <div style="display:grid;grid-template-columns:repeat(${Math.min(images.length - 1, 3)},1fr);gap:8px;">
    ${images.slice(1, 4).map((img) => `<img src="${img}" style="width:100%;border-radius:8px;display:block;aspect-ratio:1;object-fit:cover;" />`).join("")}
  </div>
</div>`;
}

export function buildPainSection(t: TemplateTheme, d: TemplateData): string {
  if (!d.painPoints || d.painPoints.length === 0) return "";
  return `<div style="background:${t.painBg};padding:36px 32px;">
  <div style="text-align:center;margin-bottom:20px;">
    <span style="font-size:20px;font-weight:800;color:${t.painIcon};">이런 고민, 있으셨죠?</span>
  </div>
  ${d.painPoints.map((p) => `<div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:14px;">
    <span style="color:${t.painIcon};font-size:16px;line-height:1;margin-top:2px;">${ICONS.pain}</span>
    <p style="font-size:14px;line-height:1.7;margin:0;color:${t.textSecondary};">${p}</p>
  </div>`).join("")}
</div>`;
}

export function buildSolutionSection(t: TemplateTheme, d: TemplateData): string {
  if (!d.solution) return "";
  return `<div style="padding:36px 32px;text-align:center;background:${t.accentLight};">
  <div style="display:inline-block;background:${t.accent};color:${t.ctaText};font-size:12px;font-weight:800;padding:6px 16px;border-radius:20px;margin-bottom:16px;">${ICONS.sparkle} 해결책을 찾았습니다</div>
  <p style="font-size:15px;line-height:1.8;color:${t.textPrimary};max-width:600px;margin:0 auto;font-weight:500;">${d.solution}</p>
</div>`;
}

export function buildFeaturesSection(t: TemplateTheme, d: TemplateData): string {
  if (d.features.length === 0) return "";
  return `<div style="padding:36px 32px;">
  <div style="text-align:center;margin-bottom:28px;">
    <span style="font-size:11px;font-weight:700;letter-spacing:3px;color:${t.textMuted};text-transform:uppercase;">KEY FEATURES</span>
  </div>
  ${d.features.map((f, i) => `<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:18px;padding:16px;background:${t.cardBg};border:1px solid ${t.cardBorder};border-radius:12px;">
    <div style="min-width:36px;height:36px;background:${d.brandColor || t.accent};color:${t.ctaText};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;">0${i + 1}</div>
    <p style="font-size:14px;line-height:1.7;margin:0;padding-top:6px;color:${t.textSecondary};">${f}</p>
  </div>`).join("")}
</div>`;
}

export function buildSpecsSection(t: TemplateTheme, d: TemplateData): string {
  if (!d.specs || d.specs.length === 0) return "";
  return `<div style="padding:32px;background:${t.specBg};">
  <div style="text-align:center;margin-bottom:20px;">
    <span style="font-size:11px;font-weight:700;letter-spacing:3px;color:${t.textMuted};text-transform:uppercase;">SPECIFICATION</span>
  </div>
  <div style="border:1px solid ${t.cardBorder};border-radius:12px;overflow:hidden;">
    ${d.specs.map((s, i) => `<div style="display:flex;${i > 0 ? `border-top:1px solid ${t.cardBorder};` : ""}">
      <div style="flex:0 0 120px;padding:12px 16px;background:${t.cardBg};font-size:13px;font-weight:700;color:${t.textPrimary};">${s.label}</div>
      <div style="flex:1;padding:12px 16px;font-size:13px;color:${t.textSecondary};background:${t.bg};">${s.value}</div>
    </div>`).join("")}
  </div>
</div>`;
}

export function buildScenarioSection(t: TemplateTheme, d: TemplateData): string {
  if (!d.scenario) return "";
  return `<div style="padding:40px 32px;background:${t.cardBg};border-top:1px solid ${t.cardBorder};border-bottom:1px solid ${t.cardBorder};">
  <div style="text-align:center;margin-bottom:16px;">
    <span style="font-size:11px;font-weight:700;letter-spacing:3px;color:${t.textMuted};text-transform:uppercase;">STORY</span>
  </div>
  <p style="font-size:15px;line-height:1.9;color:${t.textSecondary};text-align:center;max-width:600px;margin:0 auto;font-style:italic;">"${d.scenario}"</p>
</div>`;
}

export function buildTestimonialSection(t: TemplateTheme, d: TemplateData): string {
  if (!d.testimonial) return "";
  return `<div style="padding:36px 32px;">
  <div style="max-width:600px;margin:0 auto;background:${t.cardBg};border:1px solid ${t.cardBorder};border-radius:16px;padding:24px;">
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;">
      <span style="font-size:24px;">${ICONS.quote}</span>
      <div>
        <div style="font-size:13px;font-weight:700;color:${t.textPrimary};">실제 구매자 후기</div>
        <div style="color:${t.accent};font-size:12px;">${ICONS.star}${ICONS.star}${ICONS.star}${ICONS.star}${ICONS.star}</div>
      </div>
    </div>
    <p style="font-size:14px;line-height:1.8;color:${t.textSecondary};margin:0;">${d.testimonial}</p>
  </div>
</div>`;
}

export function buildFaqSection(t: TemplateTheme, d: TemplateData): string {
  if (!d.faq || d.faq.length === 0) return "";
  return `<div style="padding:36px 32px;background:${t.faqBg};">
  <div style="text-align:center;margin-bottom:24px;">
    <span style="font-size:18px;font-weight:800;color:${t.textPrimary};">자주 묻는 질문</span>
  </div>
  ${d.faq.map((item) => `<div style="margin-bottom:12px;background:${t.bg};border:1px solid ${t.cardBorder};border-radius:12px;overflow:hidden;">
    <div style="padding:14px 16px;font-size:14px;font-weight:700;color:${t.textPrimary};display:flex;gap:8px;align-items:center;">
      <span style="display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:24px;background:${d.brandColor || t.accent};color:${t.ctaText};border-radius:6px;font-size:12px;font-weight:800;">${ICONS.question}</span>
      ${item.q}
    </div>
    <div style="padding:0 16px 14px 48px;font-size:13px;line-height:1.7;color:${t.textSecondary};">${item.a}</div>
  </div>`).join("")}
</div>`;
}

export function buildCtaSection(t: TemplateTheme, d: TemplateData): string {
  return `<div style="text-align:center;padding:44px 32px;background:${d.brandColor || t.ctaBg};color:${t.ctaText};">
  ${d.urgency ? `<div style="font-size:13px;font-weight:700;margin-bottom:12px;opacity:0.9;">${ICONS.fire} ${d.urgency}</div>` : ""}
  <p style="font-size:22px;font-weight:900;margin:0 0 16px;">${d.cta}</p>
  <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:8px;">
    ${d.seoKeywords.map((kw) => `<span style="font-size:11px;background:rgba(255,255,255,0.2);color:inherit;padding:4px 12px;border-radius:20px;">#${kw}</span>`).join("")}
  </div>
</div>`;
}

export function buildFullTemplate(t: TemplateTheme, d: TemplateData): string {
  return `<div style="max-width:860px;margin:0 auto;font-family:${t.fontFamily};color:${t.textPrimary};background:${t.bg};padding:0;overflow:hidden;">
${buildHeroSection(t, d)}
${buildPainSection(t, d)}
${buildSolutionSection(t, d)}
${buildFeaturesSection(t, d)}
${buildSpecsSection(t, d)}
${buildScenarioSection(t, d)}
${buildTestimonialSection(t, d)}
${buildFaqSection(t, d)}
${buildCtaSection(t, d)}
</div>`;
}
