import { ProgramDay } from "@/lib/types";

const TEMPLATES = [
  (w: ProgramDay) =>
    `Great session on ${w.dayLabel}! You crushed ${w.exercises.length} exercises. Keep the momentum going.`,
  (w: ProgramDay) =>
    `${w.focus} day complete. Your total volume across ${w.totalVolumeSets} sets is tracking well — consider a small weight bump next week.`,
  (w: ProgramDay) =>
    `Nice work on ${w.dayLabel}. Your RIR targets look dialed in. Stay consistent and the gains will follow.`,
  (w: ProgramDay) =>
    `${w.exercises.length} exercises in the books for ${w.focus}. Recovery is where growth happens — hydrate and sleep well tonight.`,
  (w: ProgramDay) =>
    `Solid ${w.dayLabel} session! ${w.totalVolumeSets} total sets completed. You\u2019re building a strong foundation.`,
];

const GENERIC = [
  "Ready to train? Your AI coach is here to help you optimize every set.",
  "Consistency beats intensity. Show up today and your future self will thank you.",
  "Remember: progressive overload is a marathon, not a sprint. Trust the process.",
  "Your program is science-backed and tailored to you. Every rep counts.",
];

export function getMotivationalMessage(workout?: ProgramDay | null): string {
  if (workout) {
    const idx = Math.floor(Math.random() * TEMPLATES.length);
    return TEMPLATES[idx](workout);
  }
  return GENERIC[Math.floor(Math.random() * GENERIC.length)];
}
