export function ac(brandColor: string | undefined, fallback: string): string {
  return brandColor && brandColor.trim() ? brandColor : fallback;
}

export function renderImages(images: string[]): string {
  if (!images || images.length === 0) return "";
  if (images.length === 1) {
    return `<div style="padding:0 0 24px;">
  <img src="${images[0]}" style="width:100%;border-radius:16px;display:block;object-fit:cover;max-height:480px;" />
</div>`;
  }
  return `<div style="padding:0 0 24px;">
  <img src="${images[0]}" style="width:100%;border-radius:16px;display:block;object-fit:cover;max-height:480px;margin-bottom:8px;" />
  <div style="display:grid;grid-template-columns:repeat(${Math.min(images.length - 1, 4)},1fr);gap:8px;">
    ${images.slice(1, 5).map((img) => `<img src="${img}" style="width:100%;border-radius:10px;display:block;aspect-ratio:1;object-fit:cover;" />`).join("")}
  </div>
</div>`;
}
