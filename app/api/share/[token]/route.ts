import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token || token.length !== 12) {
    return Response.json({ error: "유효하지 않은 링크입니다" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("generations")
    .select("product_type, input_data, output_data, created_at")
    .eq("share_token", token)
    .single();

  if (error || !data) {
    return Response.json({ error: "공유 결과를 찾을 수 없습니다" }, { status: 404 });
  }

  return Response.json(data);
}
