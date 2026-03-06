// 데이터랩 (쇼핑인사이트) API
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID!;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET!;

const datalabHeaders = {
  "X-Naver-Client-Id": NAVER_CLIENT_ID,
  "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
};

// 검색 API
const NAVER_SEARCH_ID = process.env.NAVER_SEARCH_CLIENT_ID!;
const NAVER_SEARCH_SECRET = process.env.NAVER_SEARCH_CLIENT_SECRET!;

const searchHeaders = {
  "X-Naver-Client-Id": NAVER_SEARCH_ID,
  "X-Naver-Client-Secret": NAVER_SEARCH_SECRET,
};

// 네이버 쇼핑인사이트: 키워드별 쇼핑 검색 트렌드
export interface ShoppingTrend {
  title: string;
  keyword: string[];
  data: Array<{ period: string; ratio: number }>;
}

export async function getShoppingTrend(
  keyword: string,
  category?: string
): Promise<ShoppingTrend | null> {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);

    const body = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      timeUnit: "date",
      category: category || "",
      keyword: [{ name: keyword, param: [keyword] }],
    };

    const res = await fetch(
      "https://openapi.naver.com/v1/datalab/shopping",
      {
        method: "POST",
        headers: { ...datalabHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.results?.[0] || null;
  } catch {
    return null;
  }
}

// 네이버 검색 API: 쇼핑 검색 결과 (연관 키워드, 경쟁 상품 파악)
export interface ShoppingItem {
  title: string;
  link: string;
  image: string;
  lprice: string;
  hprice: string;
  productId: string;
  productType: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

export async function searchShopping(
  query: string,
  display: number = 10
): Promise<ShoppingItem[]> {
  try {
    const res = await fetch(
      `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(query)}&display=${display}&sort=sim`,
      {
        headers: searchHeaders,
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

// 경쟁 상품에서 키워드 추출
export async function extractCompetitorKeywords(
  productName: string
): Promise<string[]> {
  const items = await searchShopping(productName, 10);
  if (items.length === 0) return [];

  // 경쟁 상품 제목에서 자주 등장하는 단어 추출
  const wordCount = new Map<string, number>();
  const stopWords = new Set([
    "무료배송", "당일발송", "특가", "할인", "세일", "1+1",
    "the", "and", "for", "with", "of",
    "개", "세트", "팩", "ea", "ml", "g", "kg", "cm",
  ]);

  for (const item of items) {
    const title = item.title.replace(/<[^>]*>/g, ""); // HTML 태그 제거
    const words = title
      .split(/[\s/()[\]|+,·]+/)
      .map((w) => w.trim())
      .filter((w) => w.length >= 2 && !stopWords.has(w.toLowerCase()) && !/^\d+$/.test(w));

    for (const word of words) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
  }

  // 빈도순 정렬, 상위 15개
  return Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word);
}

// 쇼핑 검색 결과에서 카테고리/가격대 정보 추출
export async function getMarketInsight(productName: string): Promise<{
  avgPrice: number;
  priceRange: { min: number; max: number };
  topCategories: string[];
  topBrands: string[];
  competitorKeywords: string[];
}> {
  const items = await searchShopping(productName, 20);
  const competitorKeywords = await extractCompetitorKeywords(productName);

  const prices = items
    .map((i) => parseInt(i.lprice))
    .filter((p) => p > 0);

  const categories = items
    .map((i) => [i.category1, i.category2, i.category3].filter(Boolean).join(" > "))
    .filter(Boolean);

  const brands = items.map((i) => i.brand).filter(Boolean);

  // 고유값 빈도순
  const topCategories = Array.from(new Set(categories)).slice(0, 3);
  const brandCount = new Map<string, number>();
  for (const b of brands) brandCount.set(b, (brandCount.get(b) || 0) + 1);
  const topBrands = Array.from(brandCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([b]) => b);

  return {
    avgPrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0,
    priceRange: {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
    },
    topCategories,
    topBrands,
    competitorKeywords,
  };
}

function formatDate(d: Date): string {
  const iso = d.toISOString();
  return iso.slice(0, iso.indexOf("T"));
}
