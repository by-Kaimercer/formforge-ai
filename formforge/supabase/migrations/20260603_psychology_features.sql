-- =============================================
-- FormForge — Psychology Features Migration
-- Run this against your Supabase SQL editor
-- =============================================

-- 1. Points & Level System
CREATE TABLE IF NOT EXISTS user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  points  INTEGER NOT NULL DEFAULT 0,
  level   INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own stats" ON user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own stats" ON user_stats
  FOR ALL USING (auth.uid() = user_id);


-- 2. Trial System
CREATE TABLE IF NOT EXISTS user_trials (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ends_at    TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

ALTER TABLE user_trials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own trials" ON user_trials
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trial" ON user_trials
  FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 3. Referral System
CREATE TABLE IF NOT EXISTS referrals (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invitee_email TEXT NOT NULL,
  rewarded      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own referrals" ON referrals
  FOR SELECT USING (auth.uid() = referrer_id);

CREATE POLICY "Users can insert own referrals" ON referrals
  FOR INSERT WITH CHECK (auth.uid() = referrer_id);


-- 4. Leaderboard View (read-only, no RLS needed on views)
CREATE OR REPLACE VIEW leaderboard AS
SELECT
  us.user_id,
  COALESCE(LEFT(au.email, POSITION('@' IN au.email) - 1), 'Athlete') AS username,
  us.points
FROM user_stats us
JOIN auth.users au ON au.id = us.user_id
ORDER BY us.points DESC
LIMIT 50;
