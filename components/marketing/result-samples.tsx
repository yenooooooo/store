"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SAMPLES = [
  {
    id: "detail-page",
    label: "상세페이지",
    input: {
      "상품명": "프리미엄 올인원 에어프라이어 12L",
      "카테고리": "주방가전",
      "핵심 특징": "대용량 12L, 터치 디스플레이, 8가지 자동 요리모드, 스테인리스 내솥",
    },
    output: {
      title: "요리 초보도 셰프 급 결과물 — 프리미엄 올인원 에어프라이어 12L",
      subtitle: "터치 한 번이면 바삭한 치킨부터 홈베이킹까지, 기름 없이 건강하게",
      features: [
        "12L 대용량으로 4인 가족 한 끼 한 번에 조리",
        "8가지 자동 모드 — 버튼만 누르면 온도·시간 자동 설정",
        "304 스테인리스 내솥으로 환경호르몬 걱정 제로",
        "LED 터치 디스플레이로 직관적 조작",
        "자동 전원 차단 + 과열 방지 안전 설계",
      ],
      scenario:
        "퇴근 후 지친 저녁, 냉동 치킨을 꺼내 트레이에 올리고 '치킨 모드' 한 번 터치. 20분 뒤 갓 튀긴 듯 바삭한 치킨이 완성됩니다. 기름 냄새 없이, 설거지도 내솥만 헹구면 끝.",
      cta: "오늘 주문 시 전용 레시피북 무료 증정",
      seoKeywords: ["에어프라이어 대용량", "에어프라이어 추천", "12L 에어프라이어"],
      conversionScore: 92,
    },
  },
  {
    id: "review",
    label: "리뷰 분석",
    input: {
      "상품명": "무선 블루투스 이어폰 Pro X",
      "분석 대상": "1,247개 리뷰 분석",
      "목적": "상세페이지에 넣을 리뷰 요약 및 핵심 키워드 추출",
    },
    output: {
      title: "고객이 직접 말하는 구매 이유 TOP 5",
      positiveKeywords: ["노이즈캔슬링 최고", "가성비 미쳤다", "통화품질 좋음", "착용감 편함", "배터리 오래감"],
      negativeKeywords: ["케이스 싸구려", "터치 오작동"],
      summaryQuote:
        '"3만원대에서 이 정도 노캔이면 사기입니다. 에어팟 프로 안 부럽습니다." — 구매자 리뷰 중 공감 327회',
      buyerProfile: "20~30대 직장인 남성, 출퇴근 지하철 사용 목적",
      conversionTip:
        "노이즈캔슬링 성능을 메인 셀링포인트로 배치하고, 가성비 키워드를 상품명에 포함시키세요.",
      confidenceScore: 88,
    },
  },
  {
    id: "script",
    label: "영상 스크립트",
    input: {
      "주제": "직장인 퇴근 후 부업 브이로그",
      "플랫폼": "YouTube Shorts",
      "영상 길이": "60초",
      "톤": "친근하고 공감 가는 톤",
    },
    output: {
      title: "퇴근 후 2시간이 인생을 바꿨습니다",
      hook: "[화면: 야근 후 지하철 타는 모습] 월급만으로는 평생 이 생활 반복이에요. 그래서 퇴근 후 딱 2시간만 투자하기로 했습니다.",
      body: '[화면: 집에서 노트북 여는 모습] 처음엔 블로그부터 시작했어요. 한 달 수익 3,200원. 현타 왔죠. 근데 3개월 차부터 달라졌습니다. [수익 그래프 삽입] 지금은 월 부수입이 본업의 절반까지 올라왔어요.',
      cta: "제가 쓰는 도구 전부 댓글에 정리해뒀어요. 구독하면 다음 영상에서 구체적인 방법 알려드릴게요.",
      hashtags: ["#부업", "#직장인부업", "#퇴근후루틴", "#N잡러", "#부수입"],
      estimatedViews: "예상 조회수: 5만~15만 (트렌드 키워드 기반)",
      engagementScore: 85,
    },
  },
];

function InputCard({ data }: { data: Record<string, string> }) {
  return (
    <Card className="border-dashed border-gray-300 bg-gray-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-500">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-200 text-xs font-bold text-gray-600">
            IN
          </span>
          사용자 입력
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex gap-2 text-sm">
            <span className="shrink-0 font-medium text-gray-500">{key}:</span>
            <span className="text-gray-700">{value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function DetailPageOutput({ output }: { output: typeof SAMPLES[0]["output"] }) {
  const data = output as typeof SAMPLES[0]["output"];
  return (
    <Card className="border-blue-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-blue-600">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-700">
              AI
            </span>
            AI 생성 결과
          </CardTitle>
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            전환율 점수 {data.conversionScore}점
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-lg font-bold text-gray-900">{data.title}</p>
          <p className="mt-1 text-sm text-gray-600">{data.subtitle}</p>
        </div>
        <div className="space-y-1.5">
          {data.features?.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 text-blue-500">&#10003;</span>
              {f}
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-blue-50 p-3">
          <p className="text-sm font-medium text-blue-800">사용 시나리오</p>
          <p className="mt-1 text-sm text-blue-700">{data.scenario}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.seoKeywords?.map((kw) => (
            <Badge key={kw} variant="outline" className="text-xs">
              {kw}
            </Badge>
          ))}
        </div>
        <p className="text-sm font-semibold text-orange-600">{data.cta}</p>
      </CardContent>
    </Card>
  );
}

function ReviewOutput({ output }: { output: typeof SAMPLES[1]["output"] }) {
  const data = output as typeof SAMPLES[1]["output"];
  return (
    <Card className="border-blue-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-blue-600">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-700">
              AI
            </span>
            AI 분석 결과
          </CardTitle>
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            신뢰도 {data.confidenceScore}점
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-bold text-gray-900">{data.title}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-green-50 p-3">
            <p className="mb-2 text-sm font-semibold text-green-800">긍정 키워드</p>
            <div className="flex flex-wrap gap-1.5">
              {data.positiveKeywords?.map((kw) => (
                <Badge key={kw} className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-red-50 p-3">
            <p className="mb-2 text-sm font-semibold text-red-800">개선 필요</p>
            <div className="flex flex-wrap gap-1.5">
              {data.negativeKeywords?.map((kw) => (
                <Badge key={kw} className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <blockquote className="border-l-4 border-blue-300 bg-blue-50 p-3 text-sm italic text-blue-800">
          {data.summaryQuote}
        </blockquote>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-medium text-gray-900">주요 구매층:</span> {data.buyerProfile}
          </p>
          <p>
            <span className="font-medium text-gray-900">전환율 팁:</span> {data.conversionTip}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ScriptOutput({ output }: { output: typeof SAMPLES[2]["output"] }) {
  const data = output as typeof SAMPLES[2]["output"];
  return (
    <Card className="border-blue-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-blue-600">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-700">
              AI
            </span>
            AI 생성 스크립트
          </CardTitle>
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            몰입도 {data.engagementScore}점
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-bold text-gray-900">{data.title}</p>
        <div className="space-y-3">
          <div className="rounded-lg bg-yellow-50 p-3">
            <p className="mb-1 text-xs font-bold uppercase text-yellow-700">Hook (0~5초)</p>
            <p className="text-sm text-yellow-900">{data.hook}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="mb-1 text-xs font-bold uppercase text-gray-500">Body (5~50초)</p>
            <p className="text-sm text-gray-700">{data.body}</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="mb-1 text-xs font-bold uppercase text-blue-700">CTA (50~60초)</p>
            <p className="text-sm text-blue-800">{data.cta}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {data.hashtags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs text-blue-600">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-500">{data.estimatedViews}</p>
      </CardContent>
    </Card>
  );
}

export default function ResultSamples() {
  return (
    <Tabs defaultValue="detail-page" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-3">
        {SAMPLES.map((sample) => (
          <TabsTrigger key={sample.id} value={sample.id} className="text-sm">
            {sample.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {SAMPLES.map((sample) => (
        <TabsContent key={sample.id} value={sample.id}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <InputCard data={sample.input as unknown as Record<string, string>} />
            </div>
            <div className="flex items-center justify-center text-2xl text-gray-300 lg:col-span-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rotate-90 lg:rotate-0"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <div className="lg:col-span-2">
              {sample.id === "detail-page" && <DetailPageOutput output={sample.output} />}
              {sample.id === "review" && <ReviewOutput output={sample.output} />}
              {sample.id === "script" && <ScriptOutput output={sample.output} />}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
