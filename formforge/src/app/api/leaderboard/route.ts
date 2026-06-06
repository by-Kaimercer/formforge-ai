import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("user_stats")
      .select("user_id, points")
      .order("points", { ascending: false })
      .limit(10);

    if (error) throw error;

    // Map to add anonymous usernames (real app would join profiles table)
    const entries = (data || []).map((row) => ({
      user_id: row.user_id,
      username: `Athlete_${String(row.user_id).slice(0, 4)}`,
      points: row.points || 0,
    }));

    return NextResponse.json(entries);
  } catch {
    // Return empty array on any error (table might not exist yet)
    return NextResponse.json([]);
  }
}
