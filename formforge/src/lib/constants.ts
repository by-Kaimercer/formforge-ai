// ==========================================
// FormForge — Static Constants & Form Options
// ==========================================

export const INJURY_OPTIONS = [
  { id: "lower_back", label: "Lower Back" },
  { id: "knees", label: "Knees" },
  { id: "shoulders", label: "Shoulders" },
  { id: "wrists", label: "Wrists" },
  { id: "hips", label: "Hips" },
  { id: "neck", label: "Neck" },
  { id: "elbows", label: "Elbows" },
  { id: "ankles", label: "Ankles" },
];

export const TRAINING_AGE_OPTIONS = [
  { value: "<6 months", label: "Less than 6 months" },
  { value: "6-12 months", label: "6-12 months" },
  { value: "1-2 years", label: "1-2 years" },
  { value: "3-5 years", label: "3-5 years" },
  { value: "5+ years", label: "5+ years" },
];

export const SESSION_DURATION_OPTIONS = [
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "60 min" },
  { value: "75", label: "75 min" },
  { value: "90+", label: "90+ min" },
];

export const EQUIPMENT_OPTIONS = [
  { value: "commercial_gym", label: "Commercial Gym", icon: "🏋️" },
  { value: "home_full", label: "Home Gym — Full", icon: "🏠" },
  { value: "home_dumbbells", label: "Home — Dumbbells Only", icon: "💪" },
  { value: "barbell_plates", label: "Barbell + Plates Only", icon: "🔩" },
  { value: "resistance_bands", label: "Resistance Bands", icon: "🎗️" },
  { value: "bodyweight", label: "Bodyweight Only", icon: "🤸" },
];

export const GOAL_OPTIONS = [
  { value: "muscle_gain", label: "Muscle Gain", icon: "💪", desc: "Maximize hypertrophy and muscle growth" },
  { value: "fat_loss", label: "Fat Loss", icon: "🔥", desc: "Lean down while preserving muscle" },
  { value: "strength", label: "Strength", icon: "🏆", desc: "Build maximal strength on key lifts" },
  { value: "athletic", label: "Athletic Performance", icon: "⚡", desc: "Power, speed, and functional fitness" },
  { value: "general", label: "General Fitness", icon: "❤️", desc: "Health, mobility, and well-being" },
  { value: "recomp", label: "Body Recomposition", icon: "🔄", desc: "Build muscle and lose fat simultaneously" },
];

export const TIMELINE_OPTIONS = [
  { value: "8 weeks", label: "8 Weeks" },
  { value: "12 weeks", label: "12 Weeks" },
  { value: "6 months", label: "6 Months" },
  { value: "ongoing", label: "Ongoing" },
];

export const SLEEP_OPTIONS = [
  { value: "<6hrs", label: "< 6 hours" },
  { value: "6-7hrs", label: "6-7 hours" },
  { value: "7-8hrs", label: "7-8 hours" },
  { value: "8hrs+", label: "8+ hours" },
];

export const DIET_OPTIONS = [
  { value: "bulking", label: "Bulking" },
  { value: "cutting", label: "Cutting" },
  { value: "maintenance", label: "Maintenance" },
  { value: "unsure", label: "Unsure" },
];

export const PROTEIN_OPTIONS = [
  { value: "low", label: "Low (< 0.6 g/lb)" },
  { value: "moderate", label: "Moderate (0.6-0.8 g/lb)" },
  { value: "high", label: "High (0.8+ g/lb)" },
];

export const CARDIO_OPTIONS = [
  { value: "none", label: "None" },
  { value: "light", label: "Light (1-2×/week)" },
  { value: "moderate", label: "Moderate (3-4×/week)" },
  { value: "heavy", label: "Heavy (5+/week)" },
];

export const SPLIT_OPTIONS = [
  { value: "ppl", label: "Push/Pull/Legs" },
  { value: "upper_lower", label: "Upper/Lower" },
  { value: "full_body", label: "Full Body" },
  { value: "bro_split", label: "Bro Split" },
  { value: "no_preference", label: "No Preference" },
];

export const COMMON_EXERCISES = [
  "Bench Press", "Squat", "Deadlift", "Overhead Press", "Barbell Row",
  "Pull-ups", "Chin-ups", "Dips", "Incline Bench Press", "Romanian Deadlift",
  "Leg Press", "Lat Pulldown", "Cable Fly", "Lateral Raise", "Face Pull",
  "Bicep Curl", "Tricep Pushdown", "Leg Curl", "Leg Extension", "Hip Thrust",
  "Hack Squat", "Cable Row", "Dumbbell Press", "Arnold Press", "Preacher Curl",
  "Skull Crusher", "Bulgarian Split Squat", "Front Squat", "Pendlay Row",
  "T-Bar Row", "Chest Dip", "Machine Fly", "Calf Raise",
];

export const MUSCLE_GROUPS = [
  { value: "chest", label: "Chest", color: "#FF6B6B" },
  { value: "back", label: "Back", color: "#4ECDC4" },
  { value: "shoulders", label: "Shoulders", color: "#A78BFA" },
  { value: "arms", label: "Arms", color: "#F97316" },
  { value: "legs", label: "Legs", color: "#FFE66D" },
  { value: "glutes", label: "Glutes", color: "#F472B6" },
  { value: "core", label: "Core", color: "#6EE7B7" },
];

export const INTENSITY_OPTIONS = [
  { value: "conservative", label: "Conservative", desc: "Leave lots in the tank (RIR 3-4)" },
  { value: "moderate", label: "Moderate", desc: "Balanced effort (RIR 2-3)" },
  { value: "push_hard", label: "Push Hard", desc: "Close to failure (RIR 0-2)" },
];

export const LOADING_MESSAGES = [
  "Calculating your optimal weekly volume...",
  "Selecting exercises for your equipment...",
  "Structuring your periodization phases...",
  "Accounting for your injury history...",
  "Finalizing your progressive overload model...",
  "Analyzing recovery capacity...",
  "Mapping muscle group frequency targets...",
  "Calibrating RIR autoregulation...",
  "Building deload protocol...",
  "Optimizing exercise order for compound-first sequencing...",
];

export const MUSCLE_GROUP_MAP: Record<string, string> = {
  chest: "muscle-chest",
  back: "muscle-back",
  legs: "muscle-legs",
  shoulders: "muscle-shoulders",
  arms: "muscle-arms",
  core: "muscle-core",
  glutes: "muscle-glutes",
  biceps: "muscle-arms",
  triceps: "muscle-arms",
  quads: "muscle-legs",
  hamstrings: "muscle-legs",
  calves: "muscle-legs",
  traps: "muscle-back",
  lats: "muscle-back",
  delts: "muscle-shoulders",
  abs: "muscle-core",
};

export const CHAT_STARTERS = [
  "Why did you choose this split for me?",
  "I missed leg day — how do I adjust?",
  "Can I swap bench press for dumbbell press?",
  "Am I doing enough volume for my back?",
  "How should I warm up before heavy squats?",
  "What should I do if I plateau on bench?",
];

export const FAQ_ITEMS = [
  {
    question: "How is this different from other workout generators?",
    answer: "FormForge doesn't just spit out random exercises. Our AI reasons through real exercise science — progressive overload, volume landmarks (MEV/MAV/MRV), RIR-based autoregulation, and proper periodization. Every program considers your injuries, equipment, experience level, and goals individually.",
  },
  {
    question: "What research is this based on?",
    answer: "Our AI is trained on the methodologies of Brad Schoenfeld (hypertrophy research), Dr. Mike Israetel (volume landmarks and scientific programming), Eric Helms (RPE/RIR autoregulation), Jeff Nippard (practical application), Greg Nuckols (strength programming), and NSCA periodization guidelines.",
  },
  {
    question: "Can I use this if I only have dumbbells at home?",
    answer: "Absolutely. During onboarding, you select your exact equipment setup. The AI will ONLY prescribe exercises you can actually do — no barbell movements for a dumbbell-only setup, guaranteed.",
  },
  {
    question: "What if I have injuries or limitations?",
    answer: "We take injuries seriously. You'll flag any problem areas during onboarding, and the AI respects ALL constraints. Bad knees? No deep knee flexion under load. Bad shoulders? Alternative pressing patterns. The program adapts to you.",
  },
  {
    question: "How long are the programs?",
    answer: "You choose: 8 weeks, 12 weeks, 6 months, or ongoing. Every program includes structured mesocycles with accumulation phases and programmed deloads — just like a real coach would design.",
  },
  {
    question: "Can I cancel my Pro subscription anytime?",
    answer: "Yes, cancel anytime from your settings page. You'll keep Pro access until the end of your billing period. No contracts, no hidden fees.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Marcus J.",
    role: "Intermediate Lifter • 3 years training",
    quote: "I've been running the Upper/Lower split FormForge built me for 8 weeks. Hit a 315 bench for the first time. The volume progression across weeks was perfectly calibrated — I never felt overtrained but always felt like I was pushing.",
    avatar: "MJ",
  },
  {
    name: "Sarah K.",
    role: "Home Gym • Dumbbells Only",
    quote: "As someone with only dumbbells and a bench at home, I was skeptical any AI could write a legit program for me. FormForge nailed it — creative exercise selection, proper periodization, and it respected my shoulder injury completely.",
    avatar: "SK",
  },
  {
    name: "David R.",
    role: "Advanced • 7 years training",
    quote: "This feels like it was written by Mike Israetel himself. The RIR targets, the volume landmarks, the deload protocol — everything is dialed in. I've paid coaches $200/month for programs that weren't this thorough.",
    avatar: "DR",
  },
];
