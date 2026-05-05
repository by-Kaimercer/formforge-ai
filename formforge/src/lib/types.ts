// ==========================================
// FormForge — TypeScript Type Definitions
// ==========================================

// ---- User & Auth ----
export interface User {
  id: string;
  email: string;
  created_at: string;
  plan: "free" | "pro";
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
}

// ---- Profile (Onboarding Data) ----
export interface Profile {
  id?: string;
  user_id?: string;
  // Step 1 — Body Stats
  age: number;
  sex: "male" | "female" | "other";
  height_cm: number;
  weight_kg: number;
  body_fat: number | null;
  injuries: string[];
  injury_notes: string;
  // Step 2 — Training Background
  training_age: string;
  frequency: number;
  session_duration: string;
  equipment: string;
  current_program: string;
  // Step 3 — Goals
  goal_primary: string;
  goal_secondary: string;
  target_description: string;
  timeline: string;
  // Step 4 — Recovery & Lifestyle
  sleep: string;
  stress: number;
  diet: string;
  protein_intake: string;
  cardio: string;
  // Step 5 — Preferences
  preferred_split: string;
  favorite_exercises: string[];
  avoid_exercises: string[];
  priority_muscles: string[];
  intensity_pref: string;
}

export const defaultProfile: Profile = {
  age: 25,
  sex: "male",
  height_cm: 178,
  weight_kg: 80,
  body_fat: null,
  injuries: [],
  injury_notes: "",
  training_age: "1-2 years",
  frequency: 4,
  session_duration: "60",
  equipment: "commercial_gym",
  current_program: "",
  goal_primary: "",
  goal_secondary: "",
  target_description: "",
  timeline: "12 weeks",
  sleep: "7-8hrs",
  stress: 5,
  diet: "maintenance",
  protein_intake: "moderate",
  cardio: "none",
  preferred_split: "no_preference",
  favorite_exercises: [],
  avoid_exercises: [],
  priority_muscles: [],
  intensity_pref: "moderate",
};

// ---- Program (AI Output) ----
export interface Exercise {
  order: number;
  name: string;
  muscleGroup: string;
  sets: number;
  repRange: string;
  rir: string;
  restSeconds: number;
  tempoNote: string;
  coachingCue: string;
  substitute: string;
  equipmentNeeded: string;
}

export interface ProgramDay {
  dayLabel: string;
  focus: string;
  totalVolumeSets: number;
  exercises: Exercise[];
}

export interface ProgramWeek {
  weekNumber: number;
  phase: string;
  volumeNote: string;
  days: ProgramDay[];
}

export interface DeloadWeek {
  weekNumber: number;
  instructions: string;
}

export interface ProgramJSON {
  programName: string;
  coachSummary: string;
  split: string;
  durationWeeks: number;
  sessionsPerWeek: number;
  volumeStrategy: string;
  periodizationStyle: string;
  weeks: ProgramWeek[];
  deloadWeek: DeloadWeek;
  progressionProtocol: string;
  nutritionContext: string;
  recoveryProtocol: string;
  redFlags: string[];
}

export interface Program {
  id: string;
  user_id: string;
  created_at: string;
  program_json: ProgramJSON;
  slug: string;
  program_name: string;
  duration_weeks: number;
  split: string;
  is_active: boolean;
}

// ---- Workout Tracker ----
export interface WorkoutSet {
  weight: number;
  reps: number;
  completed: boolean;
}

export interface LoggedExercise {
  name: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id: string;
  user_id: string;
  program_id: string;
  week_number: number;
  day_number: number;
  logged_at: string;
  exercises_json: LoggedExercise[];
}

// ---- Chat ----
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}
