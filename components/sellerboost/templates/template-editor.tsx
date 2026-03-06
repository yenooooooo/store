"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus, X, RotateCcw } from "lucide-react";
import type { TemplateData } from "./template-types";

interface Props {
  data: TemplateData;
  onChange: (data: TemplateData) => void;
  originalData: TemplateData;
}

export default function TemplateEditor({ data, onChange, originalData }: Props) {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  function update(partial: Partial<TemplateData>) {
    onChange({ ...data, ...partial });
  }

  function isModified(section: string): boolean {
    switch (section) {
      case "title": return data.productName !== originalData.productName || data.subtitle !== originalData.subtitle;
      case "painPoints": return JSON.stringify(data.painPoints) !== JSON.stringify(originalData.painPoints);
      case "solution": return data.solution !== originalData.solution;
      case "features": return JSON.stringify(data.features) !== JSON.stringify(originalData.features);
      case "specs": return JSON.stringify(data.specs) !== JSON.stringify(originalData.specs);
      case "scenario": return data.scenario !== originalData.scenario;
      case "testimonial": return data.testimonial !== originalData.testimonial;
      case "faq": return JSON.stringify(data.faq) !== JSON.stringify(originalData.faq);
      case "trustBadges": return JSON.stringify(data.trustBadges) !== JSON.stringify(originalData.trustBadges);
      case "cta": return data.cta !== originalData.cta || data.urgency !== originalData.urgency;
      case "keywords": return JSON.stringify(data.seoKeywords) !== JSON.stringify(originalData.seoKeywords);
      default: return false;
    }
  }

  function resetSection(section: string) {
    const map: Record<string, Partial<TemplateData>> = {
      title: { productName: originalData.productName, subtitle: originalData.subtitle },
      painPoints: { painPoints: [...originalData.painPoints] },
      solution: { solution: originalData.solution },
      features: { features: [...originalData.features] },
      specs: { specs: originalData.specs.map((s) => ({ ...s })) },
      scenario: { scenario: originalData.scenario },
      testimonial: { testimonial: originalData.testimonial },
      faq: { faq: originalData.faq.map((f) => ({ ...f })) },
      trustBadges: { trustBadges: [...originalData.trustBadges] },
      cta: { cta: originalData.cta, urgency: originalData.urgency },
      keywords: { seoKeywords: [...originalData.seoKeywords] },
    };
    if (map[section]) update(map[section]);
  }

  const sections = [
    { id: "title", label: "제목 / 부제목" },
    { id: "painPoints", label: "고민 포인트" },
    { id: "solution", label: "해결책" },
    { id: "features", label: "핵심 특징" },
    { id: "specs", label: "스펙 표" },
    { id: "scenario", label: "사용 시나리오" },
    { id: "testimonial", label: "후기" },
    { id: "faq", label: "FAQ" },
    { id: "trustBadges", label: "신뢰 배지" },
    { id: "cta", label: "CTA / 긴급성" },
    { id: "keywords", label: "SEO 키워드" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Pencil className="h-4 w-4" /> 내용 편집
        </CardTitle>
        <p className="text-xs text-muted-foreground">클릭해서 수정하세요. 실시간 반영됩니다.</p>
      </CardHeader>
      <CardContent className="space-y-1">
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${editingSection === section.id ? "bg-primary/5 border border-primary/20" : "hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{section.label}</span>
                {isModified(section.id) && <Badge className="bg-amber-100 text-amber-700 text-[10px]">수정됨</Badge>}
              </div>
              <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            {editingSection === section.id && (
              <div className="px-3 pb-3 pt-2 space-y-3">
                {section.id === "title" && (
                  <>
                    <div className="space-y-1.5">
                      <Label className="text-xs">상품명</Label>
                      <Input value={data.productName} onChange={(e) => update({ productName: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">부제목</Label>
                      <Input value={data.subtitle} onChange={(e) => update({ subtitle: e.target.value })} />
                    </div>
                  </>
                )}

                {section.id === "painPoints" && (
                  <StringListEditor
                    items={data.painPoints}
                    onChange={(v) => update({ painPoints: v })}
                    placeholder="고민 포인트"
                    max={5}
                  />
                )}

                {section.id === "solution" && (
                  <Textarea value={data.solution} onChange={(e) => update({ solution: e.target.value })} rows={3} className="text-sm" />
                )}

                {section.id === "features" && (
                  <StringListEditor
                    items={data.features}
                    onChange={(v) => update({ features: v })}
                    placeholder="특징"
                    max={8}
                  />
                )}

                {section.id === "specs" && (
                  <div className="space-y-2">
                    {data.specs.map((s, i) => (
                      <div key={i} className="flex gap-2">
                        <Input
                          value={s.label} placeholder="항목"
                          onChange={(e) => { const u = [...data.specs]; u[i] = { label: e.target.value, value: u[i]!.value }; update({ specs: u }); }}
                          className="text-sm w-28"
                        />
                        <Input
                          value={s.value} placeholder="값"
                          onChange={(e) => { const u = [...data.specs]; u[i] = { label: u[i]!.label, value: e.target.value }; update({ specs: u }); }}
                          className="text-sm"
                        />
                        <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9" onClick={() => update({ specs: data.specs.filter((_, idx) => idx !== i) })}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                    {data.specs.length < 8 && (
                      <Button variant="outline" size="sm" onClick={() => update({ specs: [...data.specs, { label: "", value: "" }] })} className="gap-1 text-xs">
                        <Plus className="h-3 w-3" /> 항목 추가
                      </Button>
                    )}
                  </div>
                )}

                {section.id === "scenario" && (
                  <Textarea value={data.scenario} onChange={(e) => update({ scenario: e.target.value })} rows={4} className="text-sm" />
                )}

                {section.id === "testimonial" && (
                  <Textarea value={data.testimonial} onChange={(e) => update({ testimonial: e.target.value })} rows={3} className="text-sm" />
                )}

                {section.id === "faq" && (
                  <div className="space-y-3">
                    {data.faq.map((item, i) => (
                      <div key={i} className="space-y-1 border rounded-lg p-2">
                        <div className="flex gap-2">
                          <Input value={item.q} placeholder="질문" onChange={(e) => { const u = [...data.faq]; u[i] = { q: e.target.value, a: u[i]!.a }; update({ faq: u }); }} className="text-sm" />
                          <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9" onClick={() => update({ faq: data.faq.filter((_, idx) => idx !== i) })}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <Textarea value={item.a} placeholder="답변" onChange={(e) => { const u = [...data.faq]; u[i] = { q: u[i]!.q, a: e.target.value }; update({ faq: u }); }} rows={2} className="text-sm" />
                      </div>
                    ))}
                    {data.faq.length < 5 && (
                      <Button variant="outline" size="sm" onClick={() => update({ faq: [...data.faq, { q: "", a: "" }] })} className="gap-1 text-xs">
                        <Plus className="h-3 w-3" /> FAQ 추가
                      </Button>
                    )}
                  </div>
                )}

                {section.id === "trustBadges" && (
                  <StringListEditor
                    items={data.trustBadges}
                    onChange={(v) => update({ trustBadges: v })}
                    placeholder="배지 (예: 무료배송)"
                    max={5}
                  />
                )}

                {section.id === "cta" && (
                  <>
                    <div className="space-y-1.5">
                      <Label className="text-xs">CTA 문구</Label>
                      <Input value={data.cta} onChange={(e) => update({ cta: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">긴급성 문구</Label>
                      <Input value={data.urgency} onChange={(e) => update({ urgency: e.target.value })} />
                    </div>
                  </>
                )}

                {section.id === "keywords" && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {data.seoKeywords.map((kw, i) => (
                        <div key={i} className="flex items-center gap-1 rounded-full border bg-gray-50 pl-3 pr-1 py-1">
                          <span className="text-xs">{kw}</span>
                          <button onClick={() => update({ seoKeywords: data.seoKeywords.filter((_, idx) => idx !== i) })} className="h-4 w-4 rounded-full hover:bg-gray-200 flex items-center justify-center">
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); const input = e.currentTarget.querySelector("input"); if (input && input.value.trim()) { update({ seoKeywords: [...data.seoKeywords, input.value.trim()] }); input.value = ""; } }}>
                      <Input placeholder="키워드 입력 후 Enter" className="text-sm" />
                    </form>
                  </div>
                )}

                {isModified(section.id) && (
                  <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground" onClick={() => resetSection(section.id)}>
                    <RotateCcw className="h-3 w-3" /> AI 원본으로 되돌리기
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function StringListEditor({ items, onChange, placeholder, max }: { items: string[]; onChange: (v: string[]) => void; placeholder: string; max: number }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => { const u = [...items]; u[i] = e.target.value; onChange(u); }}
            placeholder={`${placeholder} ${i + 1}`}
            className="text-sm"
          />
          {items.length > 1 && (
            <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      ))}
      {items.length < max && (
        <Button variant="outline" size="sm" onClick={() => onChange([...items, ""])} className="gap-1 text-xs">
          <Plus className="h-3 w-3" /> 추가
        </Button>
      )}
    </div>
  );
}
