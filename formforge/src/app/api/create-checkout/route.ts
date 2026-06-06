import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return NextResponse.json({ url: "/dashboard?upgrade=demo", demo: true });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!body.priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const { getOrCreateCustomer, createCheckoutSession } = await import("@/lib/stripe");

    // Look up an existing Stripe customer for this user.
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    const customerId = await getOrCreateCustomer(
      profile?.stripe_customer_id ?? null,
      user.email || "",
      user.id
    );

    // Persist the customer ID so the webhook can map events back to the user.
    // stripe_customer_id is a locked billing column → write via service role.
    if (!profile?.stripe_customer_id) {
      const { createAdminClient } = await import("@/lib/supabase-admin");
      const admin = createAdminClient();
      await admin
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const session = await createCheckoutSession({
      customerId,
      priceId: body.priceId,
      successUrl: `${appUrl}/dashboard?upgrade=success`,
      cancelUrl: `${appUrl}/settings?upgrade=cancelled`,
      userId: user.id,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
