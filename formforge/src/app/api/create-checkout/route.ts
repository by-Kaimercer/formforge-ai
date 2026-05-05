import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return NextResponse.json({ url: "/dashboard?upgrade=demo", demo: true });
    }

    const { createCheckoutSession } = await import("@/lib/stripe");
    const session = await createCheckoutSession(
      body.customerId,
      body.priceId,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgrade=success`,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgrade=cancelled`
    );
    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
