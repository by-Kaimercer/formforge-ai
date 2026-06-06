import { createClient } from "@supabase/supabase-js";

// Service-role client — bypasses RLS. Use ONLY in trusted server contexts
// (e.g. Stripe webhooks) where there is no authenticated user session.
// NEVER import this into client components.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Supabase admin client not configured (missing service role key)");
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
