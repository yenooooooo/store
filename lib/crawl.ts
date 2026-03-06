import { searchShopping } from "@/lib/naver-api";
import * as cheerio from "cheerio";

export interface CrawledProduct {
  productName: string;
  price: string;
  category: string;
  features: string[];
  reviewSummary: string[];
  imageUrls: string[];
  platform: "naver" | "coupang" | "11st";
}

const CRAWL_CACHE = new Map<string, { data: CrawledProduct; ts: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24h

function detectPlatform(url: string): "naver" | "coupang" | "11st" {
  if (
    url.includes("smartstore.naver.com") ||
    url.includes("shopping.naver.com") ||
    url.includes("brand.naver.com") ||
    url.includes("naver.com")
  )
    return "naver";
  if (url.includes("coupang.com")) return "coupang";
  if (url.includes("11st.co.kr")) return "11st";
  throw new Error(
    "지원하지 않는 URL입니다. 스마트스토어, 쿠팡, 11번가 URL을 입력해주세요."
  );
}

// URL에서 스토어명과 상품번호 추출
function parseNaverUrl(url: string): { storeName: string; productNo: string } | null {
  const cleanUrl = (url.split("?")[0]) ?? url;
  const match = cleanUrl.match(/(?:smartstore|brand|m\.smartstore|m\.brand)\.naver\.com\/([^/]+)\/products\/(\d+)/);
  if (match) return { storeName: match[1]!, productNo: match[2]! };
  return null;
}

// URL에서 검색 힌트 추출 (nl-query, 쿼리 파라미터 등)
function extractSearchHint(url: string): string | null {
  try {
    const urlObj = new URL(url);
    // nl-query: 네이버 검색에서 넘어온 쿼리
    const nlQuery = urlObj.searchParams.get("nl-query");
    if (nlQuery) return nlQuery;
    // query: 일반 검색 쿼리
    const query = urlObj.searchParams.get("query");
    if (query) return query;
    return null;
  } catch {
    return null;
  }
}

// 네이버 검색 API로 상품 정보 조회 (가장 안정적인 방법)
async function searchNaverProduct(searchQuery: string, productNo?: string): Promise<Partial<CrawledProduct>> {
  console.log("[CRAWL] Searching Naver API:", searchQuery);
  const items = await searchShopping(searchQuery, 10);

  if (items.length === 0) return {};

  // productNo가 있으면 해당 상품과 매칭 시도 (link에 productId 포함 여부)
  let bestItem = items[0]!;
  if (productNo) {
    const matched = items.find((item) => item.link.includes(productNo) || item.productId === productNo);
    if (matched) bestItem = matched;
  }

  const productName = bestItem.title.replace(/<[^>]*>/g, "").trim();
  const category = [bestItem.category1, bestItem.category2, bestItem.category3, bestItem.category4]
    .filter(Boolean)
    .join(" > ");
  const features: string[] = [];
  if (bestItem.brand) features.push(`브랜드: ${bestItem.brand}`);
  if (bestItem.maker) features.push(`제조사: ${bestItem.maker}`);
  const imageUrls = bestItem.image ? [bestItem.image] : [];

  console.log("[CRAWL] Search API found:", productName);
  return {
    productName,
    price: bestItem.lprice || "",
    category,
    features,
    imageUrls,
  };
}

// 스마트스토어 내부 JSON API로 상품 정보 가져오기
async function fetchNaverProductApi(storeName: string, productNo: string): Promise<Partial<CrawledProduct>> {
  const apiUrls = [
    `https://m.smartstore.naver.com/i/v1/stores/${storeName}/products/${productNo}`,
    `https://smartstore.naver.com/i/v1/stores/${storeName}/products/${productNo}`,
  ];

  for (const apiUrl of apiUrls) {
    try {
      console.log("[CRAWL] Trying store API:", apiUrl);
      const res = await fetch(apiUrl, {
        headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
          "Referer": `https://m.smartstore.naver.com/${storeName}/products/${productNo}`,
        },
        signal: AbortSignal.timeout(5000),
      });

      if (!res.ok) continue;

      const data = await res.json();
      const product = data?.product || data;

      const productName = product?.name || product?.productName || "";
      const price = String(product?.salePrice || product?.price?.sale?.value || product?.benefitsView?.discountedSalePrice || "");
      const category = product?.category?.wholeCategoryName || product?.wholeCategoryName || "";
      const imageUrls: string[] = [];

      if (product?.representImage?.url) {
        imageUrls.push(product.representImage.url);
      } else if (product?.productImages?.[0]?.url) {
        imageUrls.push(product.productImages[0].url);
      }

      const features: string[] = [];
      if (product?.naverShoppingSearchInfo?.brandName) {
        features.push(`브랜드: ${product.naverShoppingSearchInfo.brandName}`);
      }
      if (product?.naverShoppingSearchInfo?.manufacturerName) {
        features.push(`제조사: ${product.naverShoppingSearchInfo.manufacturerName}`);
      }

      if (productName) {
        console.log("[CRAWL] Store API success:", productName);
        return { productName, price, category, features, imageUrls };
      }
    } catch (e) {
      console.log("[CRAWL] Store API failed:", e instanceof Error ? e.message : e);
    }
  }

  return {};
}

// 모바일 페이지에서 OG 태그 추출 (1회만 시도, 타임아웃 짧게)
async function fetchMobilePage(url: string): Promise<Partial<CrawledProduct>> {
  const cleanUrl = (url.split("?")[0]) ?? url;
  const mobileUrl = cleanUrl
    .replace("://smartstore.naver.com", "://m.smartstore.naver.com")
    .replace("://brand.naver.com", "://m.brand.naver.com");

  try {
    console.log("[CRAWL] Fetching mobile page:", mobileUrl);
    const res = await fetch(mobileUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        Accept: "text/html",
        "Accept-Language": "ko-KR,ko;q=0.9",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    console.log("[CRAWL] Mobile page status:", res.status);
    const html = await res.text();

    // 429여도 본문에 OG 태그가 있을 수 있음
    const $ = cheerio.load(html);
    const ogTitle = $("meta[property='og:title']").attr("content") ?? "";
    if (!ogTitle) return {};

    const ogDesc = $("meta[property='og:description']").attr("content") ?? "";
    const ogImage = $("meta[property='og:image']").attr("content") ?? "";
    const productName = ogTitle.split(" : ")[0]?.trim() ?? ogTitle.trim();
    const price = $("meta[property='product:price:amount']").attr("content") ?? "";
    const category = $("meta[property='product:category']").attr("content") ?? "";
    const imageUrls: string[] = [];
    if (ogImage) imageUrls.push(ogImage);
    const features: string[] = [];
    if (ogDesc) {
      ogDesc.split(/[,./·|]/).map((s) => s.trim()).filter((s) => s.length > 3).slice(0, 5).forEach((s) => features.push(s));
    }

    if (productName) {
      console.log("[CRAWL] Mobile page success:", productName);
      return { productName, price, category, features, imageUrls };
    }
  } catch (e) {
    console.log("[CRAWL] Mobile page failed:", e instanceof Error ? e.message : e);
  }

  return {};
}

// 네이버 쇼핑 검색 API로 추가 정보 보강
async function enrichWithSearchApi(
  productName: string,
  partial: Partial<CrawledProduct>
): Promise<CrawledProduct> {
  const platform = "naver" as const;

  if (!productName) {
    return {
      productName: "",
      price: partial.price ?? "",
      category: partial.category ?? "",
      features: partial.features ?? [],
      reviewSummary: [],
      imageUrls: partial.imageUrls ?? [],
      platform,
    };
  }

  console.log("[CRAWL] Enriching with search API:", productName);
  const items = await searchShopping(productName, 5);

  const enrichedFeatures = partial.features ?? [];
  let enrichedCategory = partial.category ?? "";
  let enrichedPrice = partial.price ?? "";
  const enrichedImages = partial.imageUrls ?? [];

  if (items.length > 0) {
    const item = items[0]!;

    if (!enrichedCategory) {
      enrichedCategory = [item.category1, item.category2, item.category3, item.category4]
        .filter(Boolean)
        .join(" > ");
    }

    if (!enrichedPrice && item.lprice) {
      enrichedPrice = item.lprice;
    }

    if (enrichedFeatures.length < 3) {
      if (item.brand && !enrichedFeatures.some((f) => f.includes(item.brand))) {
        enrichedFeatures.push(`브랜드: ${item.brand}`);
      }
      if (item.maker && !enrichedFeatures.some((f) => f.includes(item.maker))) {
        enrichedFeatures.push(`제조사: ${item.maker}`);
      }
    }

    if (enrichedImages.length === 0 && item.image) {
      enrichedImages.push(item.image);
    }
  }

  return {
    productName,
    price: enrichedPrice,
    category: enrichedCategory,
    features: enrichedFeatures.slice(0, 5),
    reviewSummary: [],
    imageUrls: enrichedImages,
    platform,
  };
}

// 상품명으로 네이버 쇼핑 검색 → 상품 정보 구성
export async function searchProductByName(productName: string): Promise<CrawledProduct> {
  return enrichWithSearchApi(productName, {});
}

// 쿠팡 URL → 네이버 쇼핑 검색으로 대체
async function crawlCoupang(url: string): Promise<CrawledProduct> {
  const platform = "coupang" as const;
  const cleanUrl = (url.split("?")[0]) ?? url;
  let productName = "";

  try {
    console.log("[CRAWL] Fetching Coupang OG:", cleanUrl);
    const res = await fetch(cleanUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
        Accept: "text/html",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok) {
      const html = await res.text();
      const ogMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
      if (ogMatch && ogMatch[1]) {
        productName = ogMatch[1].trim();
        console.log("[CRAWL] Coupang OG title:", productName);
      }
    }
  } catch (e) {
    console.log("[CRAWL] Coupang fetch failed:", e instanceof Error ? e.message : e);
  }

  if (!productName) {
    return { productName: "", price: "", category: "", features: [], reviewSummary: [], imageUrls: [], platform };
  }

  const items = await searchShopping(productName, 5);
  if (items.length > 0) {
    const item = items[0]!;
    return {
      productName,
      price: item.lprice || "",
      category: [item.category1, item.category2, item.category3].filter(Boolean).join(" > "),
      features: [
        ...(item.brand ? [`브랜드: ${item.brand}`] : []),
        ...(item.maker ? [`제조사: ${item.maker}`] : []),
      ],
      reviewSummary: [],
      imageUrls: item.image ? [item.image] : [],
      platform,
    };
  }

  return { productName, price: "", category: "", features: [], reviewSummary: [], imageUrls: [], platform };
}

export async function crawlProduct(url: string): Promise<CrawledProduct> {
  const cached = CRAWL_CACHE.get(url);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;

  const platform = detectPlatform(url);
  let result: CrawledProduct;

  switch (platform) {
    case "naver": {
      const parsed = parseNaverUrl(url);
      const searchHint = extractSearchHint(url);
      let partialData: Partial<CrawledProduct> = {};

      // Step 1: URL의 nl-query 파라미터로 검색 API 조회 (가장 빠르고 안정적)
      if (searchHint) {
        partialData = await searchNaverProduct(searchHint, parsed?.productNo);
      }

      // Step 2: 모바일 페이지 OG 태그 시도
      if (!partialData.productName) {
        partialData = await fetchMobilePage(url);
      }

      // Step 3: 스마트스토어 내부 API 시도
      if (!partialData.productName && parsed) {
        partialData = await fetchNaverProductApi(parsed.storeName, parsed.productNo);
      }

      // Step 4: 스토어명으로 검색 API 폴백
      if (!partialData.productName && parsed) {
        partialData = await searchNaverProduct(parsed.storeName, parsed.productNo);
      }

      // 최종: 검색 API로 보강
      result = await enrichWithSearchApi(partialData.productName ?? "", partialData);
      break;
    }
    case "coupang": {
      result = await crawlCoupang(url);
      break;
    }
    default: {
      result = { productName: "", price: "", category: "", features: [], reviewSummary: [], imageUrls: [], platform };
      break;
    }
  }

  if (result.productName) {
    CRAWL_CACHE.set(url, { data: result, ts: Date.now() });
  }

  return result;
}
