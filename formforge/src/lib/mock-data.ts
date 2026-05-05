import { ProgramJSON, Profile } from "./types";

export const MOCK_PROFILE: Profile = {
  age: 27, sex: "male", height_cm: 180, weight_kg: 82, body_fat: 16,
  injuries: ["lower_back"], injury_notes: "Mild lower back tightness on heavy deadlifts",
  training_age: "3-5 years", frequency: 4, session_duration: "60",
  equipment: "commercial_gym", current_program: "Running a basic PPL but stalling on progression",
  goal_primary: "muscle_gain", goal_secondary: "strength", target_description: "Add size to back and shoulders, bench 225lbs",
  timeline: "12 weeks", sleep: "7-8hrs", stress: 4, diet: "bulking",
  protein_intake: "high", cardio: "light", preferred_split: "upper_lower",
  favorite_exercises: ["Bench Press", "Pull-ups", "Romanian Deadlift", "Lateral Raise"],
  avoid_exercises: ["Behind-the-neck Press"], priority_muscles: ["back", "shoulders"],
  intensity_pref: "moderate",
};

const makeExercise = (order: number, name: string, mg: string, sets: number, reps: string, rir: string, rest: number, cue: string, sub: string, equip: string, tempo = "Controlled") => ({
  order, name, muscleGroup: mg, sets, repRange: reps, rir, restSeconds: rest, tempoNote: tempo, coachingCue: cue, substitute: sub, equipmentNeeded: equip,
});

export const MOCK_PROGRAM: ProgramJSON = {
  programName: "Hypertrophy Architect — Upper/Lower 4×",
  coachSummary: "Based on your intermediate training age and 4-day availability, an Upper/Lower split gives you the best frequency-recovery balance. Volume starts at MEV (week 1) and ramps toward MAV by week 3, with a deload at week 4. Back and shoulders get priority volume as requested, while lower back loading is managed carefully given your history.",
  split: "Upper/Lower",
  durationWeeks: 4,
  sessionsPerWeek: 4,
  volumeStrategy: "MEV → MAV progressive overload across 3 working weeks, then 40% volume deload",
  periodizationStyle: "Linear periodization within undulating rep ranges",
  weeks: [
    {
      weekNumber: 1, phase: "Accumulation — MEV", volumeNote: "Starting at minimum effective volume to establish baseline",
      days: [
        {
          dayLabel: "Day 1", focus: "Upper A — Horizontal Push/Pull", totalVolumeSets: 20,
          exercises: [
            makeExercise(1, "Barbell Bench Press", "Chest", 3, "8-10", "3", 180, "Retract scapula, drive feet into floor, control the eccentric", "Dumbbell Bench Press", "Barbell, Bench"),
            makeExercise(2, "Barbell Row", "Back", 3, "8-10", "3", 150, "Hinge at hips ~45°, pull to lower chest, squeeze lats at top", "Seated Cable Row", "Barbell"),
            makeExercise(3, "Incline Dumbbell Press", "Chest", 3, "10-12", "3", 120, "30° incline, full ROM, stretch at bottom", "Incline Machine Press", "Dumbbells, Incline Bench"),
            makeExercise(4, "Lat Pulldown", "Back", 3, "10-12", "3", 120, "Lean back slightly, pull to upper chest, initiate with lats", "Pull-ups", "Cable Machine"),
            makeExercise(5, "Lateral Raise", "Shoulders", 3, "12-15", "2", 90, "Slight forward lean, raise to parallel, control descent", "Cable Lateral Raise", "Dumbbells"),
            makeExercise(6, "Face Pull", "Shoulders", 3, "15-20", "2", 60, "External rotate at top, squeeze rear delts", "Reverse Fly", "Cable Machine"),
            makeExercise(7, "Tricep Pushdown", "Arms", 2, "12-15", "2", 60, "Keep elbows pinned, full extension at bottom", "Overhead Tricep Extension", "Cable Machine"),
          ],
        },
        {
          dayLabel: "Day 2", focus: "Lower A — Quad Dominant", totalVolumeSets: 18,
          exercises: [
            makeExercise(1, "Barbell Back Squat", "Legs", 3, "6-8", "3", 180, "Brace hard, sit back and down, knees track toes", "Leg Press", "Barbell, Squat Rack"),
            makeExercise(2, "Romanian Deadlift", "Legs", 3, "8-10", "3", 150, "Soft knees, hinge at hips, feel hamstring stretch, neutral spine", "Dumbbell RDL", "Barbell", "3-1-1-0"),
            makeExercise(3, "Leg Press", "Legs", 3, "10-12", "2", 120, "Feet shoulder-width, full ROM without butt lift", "Hack Squat", "Leg Press Machine"),
            makeExercise(4, "Leg Curl", "Legs", 3, "10-12", "2", 90, "Control the eccentric, squeeze at peak contraction", "Nordic Curl", "Leg Curl Machine"),
            makeExercise(5, "Standing Calf Raise", "Legs", 3, "12-15", "2", 60, "Full stretch at bottom, pause at top for 1 second", "Seated Calf Raise", "Calf Raise Machine"),
            makeExercise(6, "Cable Crunch", "Core", 3, "12-15", "2", 60, "Curl down toward knees, don't pull with arms", "Hanging Leg Raise", "Cable Machine"),
          ],
        },
        {
          dayLabel: "Day 3", focus: "Upper B — Vertical Push/Pull", totalVolumeSets: 20,
          exercises: [
            makeExercise(1, "Overhead Press", "Shoulders", 3, "6-8", "3", 180, "Brace core, press overhead in slight arc, lockout fully", "Seated Dumbbell Press", "Barbell"),
            makeExercise(2, "Weighted Pull-ups", "Back", 3, "6-8", "3", 180, "Full dead hang, pull until chin clears bar, control descent", "Lat Pulldown", "Pull-up Bar, Weight Belt"),
            makeExercise(3, "Dumbbell Bench Press", "Chest", 3, "10-12", "2", 120, "Slight arch, touch dumbbells to chest level, press up and in", "Cable Fly", "Dumbbells, Bench"),
            makeExercise(4, "Cable Row", "Back", 3, "10-12", "2", 120, "Sit tall, pull to navel, squeeze scapula together", "Chest-Supported Row", "Cable Machine"),
            makeExercise(5, "Lateral Raise", "Shoulders", 3, "12-15", "2", 90, "Control the negative, don't swing", "Machine Lateral Raise", "Dumbbells"),
            makeExercise(6, "EZ Bar Curl", "Arms", 2, "10-12", "2", 60, "Keep elbows forward, squeeze at top, slow negative", "Dumbbell Curl", "EZ Bar"),
            makeExercise(7, "Overhead Tricep Extension", "Arms", 2, "10-12", "2", 60, "Keep elbows close to head, full stretch at bottom", "Skull Crusher", "Cable Machine"),
            makeExercise(8, "Face Pull", "Shoulders", 2, "15-20", "1", 60, "High cable, pull apart and rotate externally", "Band Pull-Apart", "Cable Machine"),
          ],
        },
        {
          dayLabel: "Day 4", focus: "Lower B — Hip Dominant", totalVolumeSets: 18,
          exercises: [
            makeExercise(1, "Trap Bar Deadlift", "Back", 3, "6-8", "3", 180, "Neutral grip, drive through floor, lockout hips — protects lower back vs conventional", "Sumo Deadlift", "Trap Bar"),
            makeExercise(2, "Bulgarian Split Squat", "Legs", 3, "8-10", "3", 120, "Rear foot elevated, lean slight forward, control descent", "Walking Lunge", "Dumbbells, Bench"),
            makeExercise(3, "Hip Thrust", "Glutes", 3, "10-12", "2", 120, "Drive through heels, squeeze glutes at top, pause 1 second", "Cable Pull-Through", "Barbell, Bench"),
            makeExercise(4, "Leg Extension", "Legs", 3, "12-15", "2", 90, "Full extension, slow eccentric, squeeze quads at top", "Sissy Squat", "Leg Extension Machine"),
            makeExercise(5, "Seated Calf Raise", "Legs", 3, "15-20", "1", 60, "Full ROM, 2 second pause at stretch", "Single Leg Calf Raise", "Seated Calf Machine"),
            makeExercise(6, "Hanging Leg Raise", "Core", 3, "10-15", "2", 60, "Control the swing, curl pelvis up, don't use momentum", "Ab Wheel Rollout", "Pull-up Bar"),
          ],
        },
      ],
    },
    {
      weekNumber: 2, phase: "Accumulation — Volume Increase", volumeNote: "Adding 1 set to priority muscle groups (back, shoulders)",
      days: [
        {
          dayLabel: "Day 1", focus: "Upper A — Horizontal Push/Pull", totalVolumeSets: 22,
          exercises: [
            makeExercise(1, "Barbell Bench Press", "Chest", 4, "8-10", "2-3", 180, "Retract scapula, drive feet into floor, control the eccentric", "Dumbbell Bench Press", "Barbell, Bench"),
            makeExercise(2, "Barbell Row", "Back", 4, "8-10", "2-3", 150, "Hinge at hips ~45°, pull to lower chest, squeeze lats at top", "Seated Cable Row", "Barbell"),
            makeExercise(3, "Incline Dumbbell Press", "Chest", 3, "10-12", "2", 120, "30° incline, full ROM, stretch at bottom", "Incline Machine Press", "Dumbbells, Incline Bench"),
            makeExercise(4, "Lat Pulldown", "Back", 3, "10-12", "2", 120, "Lean back slightly, pull to upper chest, initiate with lats", "Pull-ups", "Cable Machine"),
            makeExercise(5, "Lateral Raise", "Shoulders", 4, "12-15", "2", 90, "Slight forward lean, raise to parallel, control descent", "Cable Lateral Raise", "Dumbbells"),
            makeExercise(6, "Face Pull", "Shoulders", 3, "15-20", "2", 60, "External rotate at top, squeeze rear delts", "Reverse Fly", "Cable Machine"),
            makeExercise(7, "Tricep Pushdown", "Arms", 2, "12-15", "2", 60, "Keep elbows pinned, full extension at bottom", "Overhead Tricep Extension", "Cable Machine"),
          ],
        },
        {
          dayLabel: "Day 2", focus: "Lower A — Quad Dominant", totalVolumeSets: 19,
          exercises: [
            makeExercise(1, "Barbell Back Squat", "Legs", 4, "6-8", "2-3", 180, "Brace hard, sit back and down, knees track toes", "Leg Press", "Barbell, Squat Rack"),
            makeExercise(2, "Romanian Deadlift", "Legs", 3, "8-10", "2-3", 150, "Soft knees, hinge at hips, feel hamstring stretch", "Dumbbell RDL", "Barbell"),
            makeExercise(3, "Leg Press", "Legs", 3, "10-12", "2", 120, "Feet shoulder-width, full ROM", "Hack Squat", "Leg Press Machine"),
            makeExercise(4, "Leg Curl", "Legs", 3, "10-12", "2", 90, "Control the eccentric", "Nordic Curl", "Leg Curl Machine"),
            makeExercise(5, "Standing Calf Raise", "Legs", 3, "12-15", "2", 60, "Full stretch at bottom", "Seated Calf Raise", "Calf Raise Machine"),
            makeExercise(6, "Cable Crunch", "Core", 3, "12-15", "2", 60, "Curl down toward knees", "Hanging Leg Raise", "Cable Machine"),
          ],
        },
        {
          dayLabel: "Day 3", focus: "Upper B — Vertical Push/Pull", totalVolumeSets: 22,
          exercises: [
            makeExercise(1, "Overhead Press", "Shoulders", 4, "6-8", "2-3", 180, "Brace core, press overhead", "Seated Dumbbell Press", "Barbell"),
            makeExercise(2, "Weighted Pull-ups", "Back", 4, "6-8", "2-3", 180, "Full dead hang, pull until chin clears", "Lat Pulldown", "Pull-up Bar"),
            makeExercise(3, "Dumbbell Bench Press", "Chest", 3, "10-12", "2", 120, "Slight arch, full ROM", "Cable Fly", "Dumbbells, Bench"),
            makeExercise(4, "Cable Row", "Back", 3, "10-12", "2", 120, "Sit tall, pull to navel", "Chest-Supported Row", "Cable Machine"),
            makeExercise(5, "Lateral Raise", "Shoulders", 3, "12-15", "2", 90, "Control the negative", "Machine Lateral Raise", "Dumbbells"),
            makeExercise(6, "EZ Bar Curl", "Arms", 3, "10-12", "2", 60, "Keep elbows forward", "Dumbbell Curl", "EZ Bar"),
            makeExercise(7, "Overhead Tricep Extension", "Arms", 2, "10-12", "2", 60, "Full stretch at bottom", "Skull Crusher", "Cable Machine"),
          ],
        },
        {
          dayLabel: "Day 4", focus: "Lower B — Hip Dominant", totalVolumeSets: 19,
          exercises: [
            makeExercise(1, "Trap Bar Deadlift", "Back", 4, "6-8", "2-3", 180, "Neutral grip, drive through floor", "Sumo Deadlift", "Trap Bar"),
            makeExercise(2, "Bulgarian Split Squat", "Legs", 3, "8-10", "2-3", 120, "Rear foot elevated, lean slight forward", "Walking Lunge", "Dumbbells, Bench"),
            makeExercise(3, "Hip Thrust", "Glutes", 3, "10-12", "2", 120, "Drive through heels, squeeze at top", "Cable Pull-Through", "Barbell, Bench"),
            makeExercise(4, "Leg Extension", "Legs", 3, "12-15", "2", 90, "Full extension, slow eccentric", "Sissy Squat", "Leg Extension Machine"),
            makeExercise(5, "Seated Calf Raise", "Legs", 3, "15-20", "1", 60, "Full ROM", "Single Leg Calf Raise", "Seated Calf Machine"),
            makeExercise(6, "Hanging Leg Raise", "Core", 3, "10-15", "2", 60, "Control the swing", "Ab Wheel Rollout", "Pull-up Bar"),
          ],
        },
      ],
    },
    {
      weekNumber: 3, phase: "Overreach — MAV", volumeNote: "Peak volume week — pushing toward maximum adaptive volume",
      days: [
        {
          dayLabel: "Day 1", focus: "Upper A — Horizontal Push/Pull", totalVolumeSets: 24,
          exercises: [
            makeExercise(1, "Barbell Bench Press", "Chest", 4, "6-8", "2", 180, "Retract scapula, drive feet into floor", "Dumbbell Bench Press", "Barbell, Bench"),
            makeExercise(2, "Barbell Row", "Back", 4, "6-8", "2", 150, "Hinge at hips, pull to lower chest", "Seated Cable Row", "Barbell"),
            makeExercise(3, "Incline Dumbbell Press", "Chest", 3, "8-10", "2", 120, "30° incline, full ROM", "Incline Machine Press", "Dumbbells"),
            makeExercise(4, "Lat Pulldown", "Back", 4, "10-12", "2", 120, "Pull to upper chest, initiate with lats", "Pull-ups", "Cable Machine"),
            makeExercise(5, "Lateral Raise", "Shoulders", 4, "12-15", "1", 90, "Raise to parallel, control descent", "Cable Lateral Raise", "Dumbbells"),
            makeExercise(6, "Face Pull", "Shoulders", 3, "15-20", "1", 60, "External rotate at top", "Reverse Fly", "Cable Machine"),
            makeExercise(7, "Tricep Pushdown", "Arms", 2, "10-12", "1", 60, "Full extension at bottom", "Overhead Tricep Extension", "Cable Machine"),
          ],
        },
        {
          dayLabel: "Day 2", focus: "Lower A — Quad Dominant", totalVolumeSets: 20,
          exercises: [
            makeExercise(1, "Barbell Back Squat", "Legs", 4, "5-7", "2", 180, "Brace hard, full depth", "Leg Press", "Barbell, Squat Rack"),
            makeExercise(2, "Romanian Deadlift", "Legs", 4, "8-10", "2", 150, "Hinge, hamstring stretch, neutral spine", "Dumbbell RDL", "Barbell"),
            makeExercise(3, "Leg Press", "Legs", 3, "10-12", "2", 120, "Full ROM", "Hack Squat", "Leg Press Machine"),
            makeExercise(4, "Leg Curl", "Legs", 3, "10-12", "1", 90, "Squeeze at peak contraction", "Nordic Curl", "Leg Curl Machine"),
            makeExercise(5, "Standing Calf Raise", "Legs", 3, "12-15", "1", 60, "Full stretch, pause at top", "Seated Calf Raise", "Calf Raise Machine"),
            makeExercise(6, "Cable Crunch", "Core", 3, "12-15", "1", 60, "Curl down, don't pull with arms", "Hanging Leg Raise", "Cable Machine"),
          ],
        },
        {
          dayLabel: "Day 3", focus: "Upper B — Vertical Push/Pull", totalVolumeSets: 24,
          exercises: [
            makeExercise(1, "Overhead Press", "Shoulders", 4, "5-7", "2", 180, "Brace core, full lockout", "Seated Dumbbell Press", "Barbell"),
            makeExercise(2, "Weighted Pull-ups", "Back", 4, "5-7", "2", 180, "Full ROM, control descent", "Lat Pulldown", "Pull-up Bar"),
            makeExercise(3, "Dumbbell Bench Press", "Chest", 4, "8-10", "2", 120, "Full ROM, press up and in", "Cable Fly", "Dumbbells, Bench"),
            makeExercise(4, "Cable Row", "Back", 4, "10-12", "2", 120, "Squeeze scapula together", "Chest-Supported Row", "Cable Machine"),
            makeExercise(5, "Lateral Raise", "Shoulders", 4, "12-15", "1", 90, "Don't swing", "Machine Lateral Raise", "Dumbbells"),
            makeExercise(6, "EZ Bar Curl", "Arms", 3, "10-12", "1", 60, "Slow negative, squeeze at top", "Dumbbell Curl", "EZ Bar"),
            makeExercise(7, "Overhead Tricep Extension", "Arms", 3, "10-12", "1", 60, "Full stretch at bottom", "Skull Crusher", "Cable Machine"),
          ],
        },
        {
          dayLabel: "Day 4", focus: "Lower B — Hip Dominant", totalVolumeSets: 20,
          exercises: [
            makeExercise(1, "Trap Bar Deadlift", "Back", 4, "5-7", "2", 180, "Drive through floor, lockout hips", "Sumo Deadlift", "Trap Bar"),
            makeExercise(2, "Bulgarian Split Squat", "Legs", 4, "8-10", "2", 120, "Control descent", "Walking Lunge", "Dumbbells, Bench"),
            makeExercise(3, "Hip Thrust", "Glutes", 3, "10-12", "2", 120, "Squeeze glutes at top", "Cable Pull-Through", "Barbell, Bench"),
            makeExercise(4, "Leg Extension", "Legs", 3, "12-15", "1", 90, "Slow eccentric", "Sissy Squat", "Leg Extension Machine"),
            makeExercise(5, "Seated Calf Raise", "Legs", 3, "15-20", "1", 60, "Full ROM", "Single Leg Calf Raise", "Seated Calf Machine"),
            makeExercise(6, "Hanging Leg Raise", "Core", 3, "10-15", "1", 60, "Curl pelvis up", "Ab Wheel Rollout", "Pull-up Bar"),
          ],
        },
      ],
    },
  ],
  deloadWeek: {
    weekNumber: 4,
    instructions: "Reduce all working sets by 40-50%. Keep intensity (weight) the same but drop from 3-4 sets to 2 sets per exercise. Rest periods can be shortened. Focus on movement quality and recovery. No sets taken close to failure — maintain RIR 4+. This is NOT a week off; it's active recovery to dissipate fatigue and prime you for the next mesocycle.",
  },
  progressionProtocol: "Double progression: When you hit the top of your rep range for all prescribed sets at the given RIR, increase weight by 2.5-5lbs for upper body or 5-10lbs for lower body next session. If you can't hit the bottom of the rep range, the weight is too heavy — reduce by 5%.",
  nutritionContext: "You're bulking — aim for a 300-500 calorie surplus. With your high protein intake (0.8+ g/lb), you're well-positioned for muscle growth. Prioritize protein timing around training (30-40g within 2 hours post-workout). Keep carbs high on training days for performance.",
  recoveryProtocol: "With 7-8 hours of sleep and moderate stress, your recovery capacity is solid. Ensure you're sleeping consistently at the same time. Consider 5-10 minutes of mobility work on off days, focusing on hip flexors and thoracic spine given your lower back history. Light cardio 1-2x/week is fine — keep it low-impact (walking, cycling).",
  redFlags: [
    "Monitor lower back fatigue on Lower B days — if Trap Bar Deadlift aggravates your lower back, switch to Sumo Deadlift or reduce load by 10%",
    "If you notice shoulder discomfort during overhead pressing, switch to a slight incline (75°) dumbbell press instead",
    "Track your bodyweight weekly — if you're gaining more than 1lb/week, you may be in too aggressive a surplus",
  ],
};
