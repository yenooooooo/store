import { withAuth } from "@/lib/api-helpers";
import { crawlProduct, searchProductByName } from "@/lib/crawl";

function isValidProductUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      u.protocol === "http:" ||
      u.protocol === "https:"
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  return withAuth(async () => {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "잘못된 요청입니다" }, { status: 400 });
    }

    const url = typeof body.url === "string" ? body.url.trim() : "";
    const productName = typeof body.productName === "string" ? body.productName.trim() : "";

    // 모드 1: 상품명으로 검색 (URL 크롤링 실패 후 폴백)
    if (productName && !url) {
      try {
        console.log("[CRAWL] Searching by product name:", productName);
        const product = await searchProductByName(productName);
        return Response.json(product);
      } catch (err) {
        const message = err instanceof Error ? err.message : "검색에 실패했습니다";
        return Response.json({ error: message }, { status: 422 });
      }
    }

    // 모드 2: URL 크롤링
    if (!url || !isValidProductUrl(url)) {
      return Response.json(
        { error: "올바른 URL을 입력해주세요. http:// 또는 https://로 시작해야 합니다." },
        { status: 400 }
      );
    }

    try {
      console.log("[CRAWL] Starting crawl for:", url);
      const product = await crawlProduct(url);
      console.log("[CRAWL] Result:", JSON.stringify({
        productName: product.productName,
        platform: product.platform,
        featuresCount: product.features.length,
        imageCount: product.imageUrls.length,
      }));

      if (!product.productName) {
        return Response.json(
          {
            error: "상품 정보를 자동으로 불러올 수 없습니다. 상품명을 직접 입력하면 AI가 나머지 정보를 채워드립니다.",
            partial: product,
            needsManualInput: true,
          },
          { status: 422 }
        );
      }

      return Response.json(product);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "크롤링에 실패했습니다";
      console.error("[CRAWL ERROR]", err);
      return Response.json({ error: message, needsManualInput: true }, { status: 422 });
    }
  });
}
