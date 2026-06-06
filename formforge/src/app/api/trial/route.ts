import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check if trial already used
    const { data: existing } = await supabase
      .from("user_trials")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (existing) {
      return NextResponse.json({ error: "Trial already used" }, { status: 400 });
    }

    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 30);

    // Create trial record
    await supabase.from("user_trials").insert({
      user_id: user.id,
      started_at: new Date().toISOString(),
      ends_at: trialEnd.toISOString(),
    });

    // Upgrade user to pro via the service role — plan is a locked billing
    // column that users cannot modify themselves.
    const { createAdminClient } = await import("@/lib/supabase-admin");
    const admin = createAdminClient();
    await admin
      .from("profiles")
      .update({ plan: "pro" })
      .eq("id", user.id);

    return NextResponse.json({ success: true, trialEndsAt: trialEnd.toISOString() });
  } catch {
    return NextResponse.json({ error: "Failed to start trial" }, { status: 500 });
  }
}
