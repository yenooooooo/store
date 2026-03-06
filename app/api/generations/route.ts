import { withAuth } from "@/lib/api-helpers";

export async function POST(request: Request) {
  return withAuth(async ({ userId, supabase }) => {
    const body = await request.json();
    const { productType, inputData, outputData, tokensUsed } = body;

    if (!productType || !inputData || !outputData) {
      return Response.json({ error: "필수 데이터가 누락되었습니다" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("generations")
      .insert({
        user_id: userId,
        product_type: productType,
        input_data: inputData,
        output_data: outputData,
        tokens_used: tokensUsed || null,
      })
      .select()
      .single();

    if (error) {
      return Response.json({ error: "저장에 실패했습니다" }, { status: 500 });
    }

    return Response.json(data);
  });
}

export async function GET(request: Request) {
  return withAuth(async ({ userId, supabase }) => {
    const { searchParams } = new URL(request.url);
    const productType = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "20");

    let query = supabase
      .from("generations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (productType) {
      query = query.eq("product_type", productType);
    }

    const { data, error } = await query;

    if (error) {
      return Response.json({ error: "조회에 실패했습니다" }, { status: 500 });
    }

    return Response.json(data);
  });
}
