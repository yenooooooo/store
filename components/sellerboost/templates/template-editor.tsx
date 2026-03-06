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

  function updateFeature(index: number, value: string) {
    const updated = [...data.features];
    updated[index] = value;
    update({ features: updated });
  }

  function addFeature() {
    if (data.features.length < 8) {
      update({ features: [...data.features, "새 특징을 입력하세요"] });
    }
  }

  function removeFeature(index: number) {
    if (data.features.length > 1) {
      update({ features: data.features.filter((_, i) => i !== index) });
    }
  }

  function resetSection(section: string) {
    switch (section) {
      case "title":
        update({ productName: originalData.productName, subtitle: originalData.subtitle });
        break;
      case "features":
        update({ features: [...originalData.features] });
        break;
      case "scenario":
        update({ scenario: originalData.scenario });
        break;
      case "cta":
        update({ cta: originalData.cta });
        break;
      case "keywords":
        update({ seoKeywords: [...originalData.seoKeywords] });
        break;
    }
  }

  function isModified(section: string): boolean {
    switch (section) {
      case "title":
        return data.productName !== originalData.productName || data.subtitle !== originalData.subtitle;
      case "features":
        return JSON.stringify(data.features) !== JSON.stringify(originalData.features);
      case "scenario":
        return data.scenario !== originalData.scenario;
      case "cta":
        return data.cta !== originalData.cta;
      case "keywords":
        return JSON.stringify(data.seoKeywords) !== JSON.stringify(originalData.seoKeywords);
      default:
        return false;
    }
  }

  const sections = [
    { id: "title", label: "제목 · 부제목" },
    { id: "features", label: "핵심 특징" },
    { id: "scenario", label: "사용 시나리오" },
    { id: "cta", label: "구매 유도 문구" },
    { id: "keywords", label: "SEO 키워드" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Pencil className="h-4 w-4" />
          내용 편집
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          원하는 부분을 클릭해서 수정하세요. 템플릿에 실시간 반영됩니다.
        </p>
      </CardHeader>
      <CardContent className="space-y-1">
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() =>
                setEditingSection(editingSection === section.id ? null : section.id)
              }
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                editingSection === section.id
                  ? "bg-primary/5 border border-primary/20"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{section.label}</span>
                {isModified(section.id) && (
                  <Badge className="bg-amber-100 text-amber-700 text-[10px]">
                    수정됨
                  </Badge>
                )}
              </div>
              <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            {editingSection === section.id && (
              <div className="px-3 pb-3 pt-2 space-y-3">
                {section.id === "title" && (
                  <>
                    <div className="space-y-1.5">
                      <Label className="text-xs">상품명 / 제목</Label>
                      <Input
                        value={data.productName}
                        onChange={(e) => update({ productName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">부제목</Label>
                      <Input
                        value={data.subtitle}
                        onChange={(e) => update({ subtitle: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {section.id === "features" && (
                  <div className="space-y-2">
                    {data.features.map((f, i) => (
                      <div key={i} className="flex gap-2">
                        <Input
                          value={f}
                          onChange={(e) => updateFeature(i, e.target.value)}
                          className="text-sm"
                        />
                        {data.features.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 h-9 w-9"
                            onClick={() => removeFeature(i)}
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {data.features.length < 8 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addFeature}
                        className="gap-1 text-xs"
                      >
                        <Plus className="h-3 w-3" /> 특징 추가
                      </Button>
                    )}
                  </div>
                )}

                {section.id === "scenario" && (
                  <Textarea
                    value={data.scenario}
                    onChange={(e) => update({ scenario: e.target.value })}
                    rows={4}
                    className="text-sm"
                  />
                )}

                {section.id === "cta" && (
                  <Input
                    value={data.cta}
                    onChange={(e) => update({ cta: e.target.value })}
                  />
                )}

                {section.id === "keywords" && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {data.seoKeywords.map((kw, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1 rounded-full border bg-gray-50 pl-3 pr-1 py-1"
                        >
                          <span className="text-xs">{kw}</span>
                          <button
                            onClick={() =>
                              update({
                                seoKeywords: data.seoKeywords.filter((_, idx) => idx !== i),
                              })
                            }
                            className="h-4 w-4 rounded-full hover:bg-gray-200 flex items-center justify-center"
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.querySelector("input");
                        if (input && input.value.trim()) {
                          update({
                            seoKeywords: [...data.seoKeywords, input.value.trim()],
                          });
                          input.value = "";
                        }
                      }}
                    >
                      <Input placeholder="키워드 입력 후 Enter" className="text-sm" />
                    </form>
                  </div>
                )}

                {isModified(section.id) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs text-muted-foreground"
                    onClick={() => resetSection(section.id)}
                  >
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
