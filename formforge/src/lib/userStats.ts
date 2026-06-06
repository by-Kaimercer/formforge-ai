import { createClient } from "@/lib/supabase-browser";

// ── Helpers ──────────────────────────────────
export function isWeekend(): boolean {
  const day = new Date().getDay();
  return day === 0 || day === 6;
}

export function getLevel(points: number): number {
  // Every 100 pts = 1 level, minimum level 1
  return Math.max(1, Math.floor(points / 100) + 1);
}

export function pointsToNextLevel(points: number): number {
  const currentLevelThreshold = (getLevel(points) - 1) * 100;
  return currentLevelThreshold + 100 - points;
}

export function getLevelTitle(level: number): string {
  if (level >= 20) return "Legend";
  if (level >= 15) return "Champion";
  if (level >= 10) return "Veteran";
  if (level >= 7) return "Warrior";
  if (level >= 5) return "Athlete";
  if (level >= 3) return "Dedicated";
  return "Rookie";
}

// ── Database Operations ──────────────────────

export async function addPoints(pts: number): Promise<number> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  // Apply weekend multiplier
  const finalPts = isWeekend() ? pts * 2 : pts;

  // Get current points
  const { data: existing } = await supabase
    .from("user_stats")
    .select("points")
    .eq("user_id", user.id)
    .single();

  const newTotal = (existing?.points || 0) + finalPts;
  const newLevel = getLevel(newTotal);

  await supabase
    .from("user_stats")
    .upsert(
      { user_id: user.id, points: newTotal, level: newLevel },
      { onConflict: "user_id" }
    );

  return newTotal;
}

export async function getUserStats(): Promise<{ points: number; level: number } | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("user_stats")
    .select("points, level")
    .eq("user_id", user.id)
    .single();

  return data || { points: 0, level: 1 };
}
