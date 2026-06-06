"use client";
import { useState, useEffect } from "react";

const CHALLENGES = [
  { id: "pause_sets", text: "Add a 30-sec pause at the bottom of each rep on your first exercise.", points: 5 },
  { id: "tempo_control", text: "Use a 3-second eccentric on every set today.", points: 5 },
  { id: "extra_set", text: "Add one extra set to your weakest muscle group.", points: 7 },
  { id: "mind_muscle", text: "Focus on mind-muscle connection — squeeze at the top of every rep.", points: 5 },
  { id: "hydration", text: "Drink 500ml of water before your workout starts.", points: 3 },
  { id: "mobility", text: "Complete a 5-minute mobility warm-up before training.", points: 5 },
  { id: "journal", text: "Write down one thing you want to improve after today\u2019s session.", points: 4 },
  { id: "breathing", text: "Practice proper bracing on every compound lift today.", points: 5 },
  { id: "stretch", text: "Hold a 60-second stretch for each muscle group trained.", points: 4 },
  { id: "no_phone", text: "No phone during rest periods — focus on breathing instead.", points: 6 },
];

interface DailyChallenge {
  text: string;
  points: number;
  completed: boolean;
  dismiss: () => void;
  complete: () => void;
}

export function useDailyChallenge(): DailyChallenge | null {
  const [challenge, setChallenge] = useState<typeof CHALLENGES[0] | null>(null);
  const [completed, setCompleted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const todayKey = new Date().toISOString().slice(0, 10);
    const storedDate = localStorage.getItem("ff_challenge_date");
    const storedDone = localStorage.getItem("ff_challenge_done");

    if (storedDate === todayKey && storedDone === "true") {
      setCompleted(true);
      // Still set the challenge so we can show "completed" state
      const storedIdx = parseInt(localStorage.getItem("ff_challenge_idx") || "0", 10);
      setChallenge(CHALLENGES[storedIdx % CHALLENGES.length]);
      return;
    }

    // Pick today's challenge deterministically from date
    const dayNum = parseInt(todayKey.replace(/-/g, ""), 10);
    const idx = dayNum % CHALLENGES.length;
    setChallenge(CHALLENGES[idx]);
    localStorage.setItem("ff_challenge_date", todayKey);
    localStorage.setItem("ff_challenge_idx", String(idx));
  }, []);

  if (!challenge || dismissed) return null;

  return {
    text: challenge.text,
    points: challenge.points,
    completed,
    dismiss: () => setDismissed(true),
    complete: () => {
      const todayKey = new Date().toISOString().slice(0, 10);
      localStorage.setItem("ff_challenge_date", todayKey);
      localStorage.setItem("ff_challenge_done", "true");
      setCompleted(true);
    },
  };
}
