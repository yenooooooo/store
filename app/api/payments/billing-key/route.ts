import { withAuth } from "@/lib/api-helpers";

export async function POST(request: Request) {
  return withAuth(async ({ profile, supabase }) => {
    const { authKey, customerKey } = await request.json();

    const response = await fetch(
      "https://api.tosspayments.com/v1/billing/authorizations/issue",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ":").toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authKey, customerKey }),
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "빌링키 발급에 실패했습니다" },
        { status: 400 }
      );
    }

    const data = await response.json();

    await supabase
      .from("subscriptions")
      .upsert({
        user_id: profile.id,
        plan: "starter",
        status: "active",
        toss_billing_key: data.billingKey,
      });

    return Response.json({ success: true });
  });
}
