export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const ERRORS = {
  UNAUTHORIZED: new AppError("로그인이 필요합니다", "UNAUTHORIZED", 401),
  CREDIT_EXCEEDED: new AppError(
    "크레딧이 소진되었습니다. 플랜을 업그레이드해주세요.",
    "CREDIT_EXCEEDED",
    429
  ),
  RATE_LIMITED: new AppError(
    "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
    "RATE_LIMITED",
    429
  ),
  INVALID_INPUT: new AppError("입력값을 확인해주세요.", "INVALID_INPUT", 400),
  GENERATION_FAILED: new AppError(
    "생성에 실패했습니다. 다시 시도해주세요.",
    "GENERATION_FAILED",
    500
  ),
} as const;

export function handleApiError(error: unknown): Response {
  if (error instanceof AppError) {
    return Response.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }
  console.error("[API Error]", error);
  const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다";
  return Response.json(
    { error: message, code: "INTERNAL_ERROR" },
    { status: 500 }
  );
}
