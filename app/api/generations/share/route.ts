import { withAuth } from "@/lib/api-helpers";

export async function POST(request: Request) {
  return withAuth(async ({ userId, supabase }) => {
    const { generationId } = await request.json();

    if (!generationId || typeof generationId !== "string") {
      return Response.json({ error: "생성 ID가 필요합니다" }, { status: 400 });
    }

    const { data: generation, error: fetchError } = await supabase
      .from("generations")
      .select("id, share_token")
      .eq("id", generationId)
      .eq("user_id", userId)
      .single();

    if (fetchError || !generation) {
      return Response.json({ error: "해당 생성 결과를 찾을 수 없습니다" }, { status: 404 });
    }

    if (generation.share_token) {
      return Response.json({ shareToken: generation.share_token });
    }

    const token = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

    const { error: updateError } = await supabase
      .from("generations")
      .update({ share_token: token })
      .eq("id", generationId);

    if (updateError) {
      return Response.json({ error: "공유 링크 생성에 실패했습니다" }, { status: 500 });
    }

    return Response.json({ shareToken: token });
  });
}
