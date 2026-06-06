-- ============================================
-- FormForge — Supabase Schema
-- Paste this into: Supabase > SQL Editor > Run
-- ============================================

-- ---- Profiles (extends auth.users) ----
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  programs_generated INTEGER DEFAULT 0
);

-- ---- Onboarding data ----
CREATE TABLE public.user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  age INTEGER,
  sex TEXT,
  height_cm NUMERIC,
  weight_kg NUMERIC,
  body_fat NUMERIC,
  injuries TEXT[],
  injury_notes TEXT,
  training_age TEXT,
  frequency INTEGER,
  session_duration TEXT,
  equipment TEXT,
  current_program TEXT,
  goal_primary TEXT,
  goal_secondary TEXT,
  target_description TEXT,
  timeline TEXT,
  sleep TEXT,
  stress INTEGER,
  diet TEXT,
  protein_intake TEXT,
  cardio TEXT,
  preferred_split TEXT,
  favorite_exercises TEXT[],
  avoid_exercises TEXT[],
  priority_muscles TEXT[],
  intensity_pref TEXT
);

-- ---- Programs ----
CREATE TABLE public.programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  program_json JSONB NOT NULL,
  program_name TEXT,
  duration_weeks INTEGER,
  split TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  slug TEXT
);

-- ---- Workout logs ----
CREATE TABLE public.workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  week_number INTEGER,
  day_number INTEGER,
  exercises_json JSONB NOT NULL
);

-- ============================================
-- Enable Row Level Security
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;

-- ---- Profiles policies ----
CREATE POLICY "profiles: select own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles: insert own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles: update own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ---- User profiles policies ----
CREATE POLICY "user_profiles: select own" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_profiles: insert own" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_profiles: update own" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- ---- Programs policies ----
CREATE POLICY "programs: select own" ON public.programs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "programs: insert own" ON public.programs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "programs: update own" ON public.programs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "programs: delete own" ON public.programs FOR DELETE USING (auth.uid() = user_id);

-- ---- Workouts policies ----
CREATE POLICY "workouts: select own" ON public.workouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "workouts: insert own" ON public.workouts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "workouts: update own" ON public.workouts FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
