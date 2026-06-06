import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
export const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

interface CheckoutOptions {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  userId: string;
}

export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  userId,
}: CheckoutOptions) {
  if (!stripe) throw new Error("Stripe not configured");
  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    // client_reference_id + subscription metadata let the webhook map the
    // Stripe event back to our Supabase user.
    client_reference_id: userId,
    subscription_data: { metadata: { userId } },
  });
}

// Finds an existing Stripe customer for this user or creates a new one.
export async function getOrCreateCustomer(
  existingCustomerId: string | null,
  email: string,
  userId: string
): Promise<string> {
  if (!stripe) throw new Error("Stripe not configured");
  if (existingCustomerId) return existingCustomerId;
  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });
  return customer.id;
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  if (!stripe) throw new Error("Stripe not configured");
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}
