import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import ShareResultView from "@/components/shared/share-result-view";

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("generations")
    .select("product_type, input_data")
    .eq("share_token", token)
    .single();

  if (!data) {
    return { title: "공유 결과 - PROJECT TITAN" };
  }

  const input = data.input_data as Record<string, string>;
  const productName = input.productName || input.topic || "AI 생성 결과";
  const type = data.product_type === "sellerboost" ? "셀러부스트" : "바이럴랩";

  return {
    title: `${productName} - ${type} AI 결과`,
    description: `AI가 생성한 ${productName}의 마케팅 콘텐츠를 확인하세요. PROJECT TITAN으로 제작되었습니다.`,
    openGraph: {
      title: `${productName} - ${type} AI 결과`,
      description: `AI가 생성한 마케팅 콘텐츠입니다. PROJECT TITAN에서 무료로 시작하세요.`,
    },
  };
}

export default async function SharePage({ params }: Props) {
  const { token } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("generations")
    .select("product_type, input_data, output_data, created_at")
    .eq("share_token", token)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-sky-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-black tracking-tight">
              PROJECT <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">TITAN</span>
            </span>
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors"
          >
            무료로 시작하기
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6 text-center">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {data.product_type === "sellerboost" ? "셀러부스트 AI" : "바이럴랩 AI"} 생성 결과
          </span>
          <p className="mt-2 text-xs text-gray-400">
            {new Date(data.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <ShareResultView
          productType={data.product_type}
          inputData={data.input_data as Record<string, unknown>}
          outputData={data.output_data as Record<string, unknown>}
        />

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-gray-100 bg-white p-8 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            나도 AI로 콘텐츠 만들기
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            가입 즉시 3회 무료 크레딧 제공. 카드 등록 없이 바로 시작하세요.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-all"
          >
            무료로 시작하기
          </Link>
        </div>
      </main>
    </div>
  );
}
