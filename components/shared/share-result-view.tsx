import CopyButton from "@/components/shared/copy-button";

interface Props {
  productType: string;
  inputData: Record<string, unknown>;
  outputData: Record<string, unknown>;
}

export default function ShareResultView({ productType, inputData, outputData }: Props) {
  if (productType === "sellerboost") {
    return <SellerboostResult input={inputData} output={outputData} />;
  }
  return <VirallabResult input={inputData} output={outputData} />;
}

function SellerboostResult({ output }: { input: Record<string, unknown>; output: Record<string, unknown> }) {
  const title = output.title as string | undefined;
  const subtitle = output.subtitle as string | undefined;
  const features = output.features as string[] | undefined;
  const scenario = output.scenario as string | undefined;
  const cta = output.cta as string | undefined;
  const seoKeywords = output.seoKeywords as string[] | undefined;
  const conversionScore = output.conversionScore as number | undefined;
  const improvements = output.improvements as string[] | undefined;

  return (
    <div className="space-y-6">
      {/* Score */}
      {conversionScore !== undefined && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-8 py-6">
            <span className="text-xs text-gray-500 mb-1">전환율 점수</span>
            <span className={`text-4xl font-black ${conversionScore >= 80 ? "text-green-600" : conversionScore >= 60 ? "text-amber-500" : "text-red-500"}`}>
              {conversionScore}
            </span>
          </div>
        </div>
      )}

      {/* Title & Subtitle */}
      {(title || subtitle) && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          {title && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">SEO 최적화 제목</span>
                <CopyButton text={title} />
              </div>
              <p className="text-lg font-bold text-gray-900">{title}</p>
            </div>
          )}
          {subtitle && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">서브 카피</span>
                <CopyButton text={subtitle} />
              </div>
              <p className="text-sm text-gray-700">{subtitle}</p>
            </div>
          )}
        </div>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <span className="text-xs font-medium text-gray-500 mb-3 block">핵심 특징</span>
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-600">
                  {i + 1}
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Scenario & CTA */}
      {(scenario || cta) && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4">
          {scenario && (
            <div>
              <span className="text-xs font-medium text-gray-500 mb-1 block">사용 시나리오</span>
              <p className="text-sm text-gray-700 leading-relaxed">{scenario}</p>
            </div>
          )}
          {cta && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">CTA 문구</span>
                <CopyButton text={cta} />
              </div>
              <p className="text-sm font-semibold text-gray-900">{cta}</p>
            </div>
          )}
        </div>
      )}

      {/* SEO Keywords */}
      {seoKeywords && seoKeywords.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <span className="text-xs font-medium text-gray-500 mb-3 block">SEO 키워드</span>
          <div className="flex flex-wrap gap-2">
            {seoKeywords.map((kw, i) => (
              <span key={i} className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Improvements */}
      {improvements && improvements.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <span className="text-xs font-medium text-gray-500 mb-3 block">개선 포인트</span>
          <ul className="space-y-2">
            {improvements.map((imp, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">*</span>
                {imp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function VirallabResult({ output }: { input: Record<string, unknown>; output: Record<string, unknown> }) {
  const title = output.title as string | undefined;
  const hook = output.hook as string | undefined;
  const script = output.script as string | undefined;
  const hookScore = output.hookScore as number | undefined;
  const thumbnailSuggestions = output.thumbnailSuggestions as string[] | undefined;
  const titleVariants = output.titleVariants as string[] | undefined;

  return (
    <div className="space-y-6">
      {/* Hook Score */}
      {hookScore !== undefined && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-8 py-6">
            <span className="text-xs text-gray-500 mb-1">Hook Score</span>
            <span className={`text-4xl font-black ${hookScore >= 80 ? "text-green-600" : hookScore >= 60 ? "text-amber-500" : "text-red-500"}`}>
              {hookScore}
            </span>
          </div>
        </div>
      )}

      {/* Title & Hook */}
      {(title || hook) && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4">
          {title && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">제목</span>
                <CopyButton text={title} />
              </div>
              <p className="text-lg font-bold text-gray-900">{title}</p>
            </div>
          )}
          {hook && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">Hook</span>
                <CopyButton text={hook} />
              </div>
              <p className="text-sm text-gray-700">{hook}</p>
            </div>
          )}
        </div>
      )}

      {/* Script */}
      {script && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500">스크립트</span>
            <CopyButton text={script} />
          </div>
          <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
            {script}
          </div>
        </div>
      )}

      {/* Title Variants */}
      {titleVariants && titleVariants.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <span className="text-xs font-medium text-gray-500 mb-3 block">제목 변형</span>
          <ul className="space-y-2">
            {titleVariants.map((t, i) => (
              <li key={i} className="flex items-center justify-between text-sm text-gray-700">
                <span>{t}</span>
                <CopyButton text={t} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Thumbnail Suggestions */}
      {thumbnailSuggestions && thumbnailSuggestions.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <span className="text-xs font-medium text-gray-500 mb-3 block">썸네일 아이디어</span>
          <div className="flex flex-wrap gap-2">
            {thumbnailSuggestions.map((s, i) => (
              <span key={i} className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
