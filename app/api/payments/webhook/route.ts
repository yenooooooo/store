import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // TODO: 토스페이먼츠 웹훅 시그니처 검증
  // TODO: 결제 성공/실패 처리
  // TODO: 플랜 업데이트

  return NextResponse.json({ received: true });
}
