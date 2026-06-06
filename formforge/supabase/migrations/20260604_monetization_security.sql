-- =============================================
-- FormForge — Monetization & Security Hardening
-- Apply AFTER 20260603_psychology_features.sql
--
-- Fixes three issues:
--   1. Free-tier limit was unenforceable (no usage counter).
--   2. Any user could self-grant Pro by updating profiles.plan via RLS.
--   3. Leaderboard could not read other users' points.
-- =============================================

-- ---------------------------------------------
-- 1. Usage counter for free-tier enforcement
--    (no-op if the column already exists)
-- ---------------------------------------------
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS programs_generated INTEGER NOT NULL DEFAULT 0;

-- ---------------------------------------------
-- 2. Lock down billing columns.
--    Free users must NOT be able to self-grant Pro or reset their
--    usage counter. Only the service-role client (Stripe webhook,
--    trial endpoint, program-generation counter) may change
--    plan / stripe_* / programs_generated.
--    The trigger still fires for the service role, so we let it pass.
-- ---------------------------------------------
CREATE OR REPLACE FUNCTION public.protect_billing_columns()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- The admin (service role) client is trusted and may change anything.
  IF auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;

  IF NEW.plan                   IS DISTINCT FROM OLD.plan
     OR NEW.stripe_customer_id     IS DISTINCT FROM OLD.stripe_customer_id
     OR NEW.stripe_subscription_id IS DISTINCT FROM OLD.stripe_subscription_id
     OR NEW.programs_generated     IS DISTINCT FROM OLD.programs_generated THEN
    RAISE EXCEPTION 'Billing fields can only be modified by the server';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_billing_columns_trigger ON public.profiles;
CREATE TRIGGER protect_billing_columns_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_billing_columns();

-- ---------------------------------------------
-- 3. Public leaderboard read access.
--    user_stats currently only allows "read own". The leaderboard
--    needs everyone's points. Exposes user_id + points/level only —
--    no email or other PII.
-- ---------------------------------------------
DROP POLICY IF EXISTS "Anyone can view stats for leaderboard" ON public.user_stats;
CREATE POLICY "Anyone can view stats for leaderboard" ON public.user_stats
  FOR SELECT USING (true);
