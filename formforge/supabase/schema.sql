-- ==========================================
-- FormForge — Supabase Database Schema
-- ==========================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT
);

-- Profiles table (onboarding data)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  age INTEGER,
  sex TEXT,
  height_cm NUMERIC,
  weight_kg NUMERIC,
  body_fat NUMERIC,
  injuries TEXT[] DEFAULT '{}',
  injury_notes TEXT DEFAULT '',
  training_age TEXT,
  frequency INTEGER,
  session_duration TEXT,
  equipment TEXT,
  current_program TEXT DEFAULT '',
  goal_primary TEXT,
  goal_secondary TEXT DEFAULT '',
  target_description TEXT DEFAULT '',
  timeline TEXT,
  sleep TEXT,
  stress INTEGER,
  diet TEXT,
  protein_intake TEXT,
  cardio TEXT,
  preferred_split TEXT,
  favorite_exercises TEXT[] DEFAULT '{}',
  avoid_exercises TEXT[] DEFAULT '{}',
  priority_muscles TEXT[] DEFAULT '{}',
  intensity_pref TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programs table
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  program_json JSONB NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  program_name TEXT NOT NULL,
  duration_weeks INTEGER,
  split TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Workouts table (tracker)
CREATE TABLE public.workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
  week_number INTEGER NOT NULL,
  day_number INTEGER NOT NULL,
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  exercises_json JSONB NOT NULL DEFAULT '[]'
);

-- Indexes
CREATE INDEX idx_profiles_user ON public.profiles(user_id);
CREATE INDEX idx_programs_user ON public.programs(user_id);
CREATE INDEX idx_programs_slug ON public.programs(slug);
CREATE INDEX idx_programs_active ON public.programs(user_id, is_active);
CREATE INDEX idx_workouts_user ON public.workouts(user_id);
CREATE INDEX idx_workouts_program ON public.workouts(program_id);

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;

-- Users: users can only read/update their own record
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Profiles: users can CRUD their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own profile" ON public.profiles FOR DELETE USING (auth.uid() = user_id);

-- Programs: users can CRUD their own programs, anyone can read via slug
CREATE POLICY "Users can view own programs" ON public.programs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view shared programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Users can insert own programs" ON public.programs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own programs" ON public.programs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own programs" ON public.programs FOR DELETE USING (auth.uid() = user_id);

-- Workouts: users can CRUD their own workouts
CREATE POLICY "Users can view own workouts" ON public.workouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own workouts" ON public.workouts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own workouts" ON public.workouts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own workouts" ON public.workouts FOR DELETE USING (auth.uid() = user_id);

-- Function to auto-create user record on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
