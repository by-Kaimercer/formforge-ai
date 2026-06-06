/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button, Card, Badge, getMuscleVariant } from "@/components/ui";
import { MOCK_PROGRAM } from "@/lib/mock-data";
import { ProgramJSON, WorkoutSet } from "@/lib/types";
import { Check, Plus, Minus, Save } from "lucide-react";
import { addPoints } from "@/lib/userStats";

interface TrackerExercise {
  name: string;
  muscleGroup: string;
  targetSets: number;
  targetReps: string;
  targetRir: string;
  sets: WorkoutSet[];
}

export default function TrackerPage() {
  const [program, setProgram] = useState<ProgramJSON | null>(null);
  const [exercises, setExercises] = useState<TrackerExercise[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("ff_program");
    const prog = stored ? JSON.parse(stored) : MOCK_PROGRAM;
    setProgram(prog);
    const day = prog.weeks[0]?.days[0];
    if (day) {
      setExercises(
        day.exercises.map((ex: { name: string; muscleGroup: string; sets: number; repRange: string; rir: string }) => ({
          name: ex.name,
          muscleGroup: ex.muscleGroup,
          targetSets: ex.sets,
          targetReps: ex.repRange,
          targetRir: ex.rir,
          sets: Array.from({ length: ex.sets }, () => ({ weight: 0, reps: 0, completed: false })),
        }))
      );
    }
  }, []);

  const updateSet = (exIdx: number, setIdx: number, field: keyof WorkoutSet, value: number | boolean) => {
    setExercises(prev => {
      const next = [...prev];
      next[exIdx] = {
        ...next[exIdx],
        sets: next[exIdx].sets.map((s, i) => (i === setIdx ? { ...s, [field]: value } : s)),
      };
      return next;
    });
  };

  const addSet = (exIdx: number) => {
    setExercises(prev => {
      const next = [...prev];
      next[exIdx] = { ...next[exIdx], sets: [...next[exIdx].sets, { weight: 0, reps: 0, completed: false }] };
      return next;
    });
  };

  const removeSet = (exIdx: number) => {
    setExercises(prev => {
      const next = [...prev];
      if (next[exIdx].sets.length > 1) {
        next[exIdx] = { ...next[exIdx], sets: next[exIdx].sets.slice(0, -1) };
      }
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const programId = sessionStorage.getItem("ff_program_id") || null;
    try {
      const res = await fetch("/api/tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId,
          weekNumber: 1,
          dayNumber: 1,
          exercises: exercises.map(ex => ({ name: ex.name, sets: ex.sets })),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        // Award points: 10 base points for saving, 2 points per completed set
        const completedSetsCount = exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
        const earnedPoints = 10 + completedSetsCount * 2;
        await addPoints(earnedPoints);
      }
    } catch {
      // silent fail — middleware handles auth, network errors are non-critical
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <main className="max-w-content mx-auto px-4 md:px-6 pt-20 pb-24 md:pb-12 md:pl-72">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-[800] text-2xl md:text-4xl uppercase">Workout Tracker</h1>
            <p className="text-text-muted text-sm mt-1">
              {program?.weeks[0]?.days[0]?.dayLabel} — {program?.weeks[0]?.days[0]?.focus}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saved && <span className="text-accent text-xs font-mono animate-fade-in-up">Saved!</span>}
            <Button variant="secondary" onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />{saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {exercises.map((ex, exIdx) => (
            <Card key={exIdx} hover={false}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading font-bold text-base uppercase text-text-primary">{ex.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getMuscleVariant(ex.muscleGroup)}>{ex.muscleGroup}</Badge>
                    <span className="font-mono text-xs text-text-muted">
                      Target: {ex.targetSets}×{ex.targetReps} @ RIR {ex.targetRir}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => removeSet(exIdx)} className="p-1.5 rounded hover:bg-elevated text-text-muted">
                    <Minus className="w-4 h-4" />
                  </button>
                  <button onClick={() => addSet(exIdx)} className="p-1.5 rounded hover:bg-elevated text-text-muted">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[40px_1fr_1fr_48px] gap-2 mb-2 px-1">
                <span className="text-xs text-text-muted font-mono">SET</span>
                <span className="text-xs text-text-muted font-mono">WEIGHT</span>
                <span className="text-xs text-text-muted font-mono">REPS</span>
                <span className="text-xs text-text-muted font-mono text-center">✓</span>
              </div>
              {ex.sets.map((set, setIdx) => (
                <div key={setIdx} className="grid grid-cols-[40px_1fr_1fr_48px] gap-2 mb-2 items-center">
                  <span className="font-mono text-sm text-text-muted text-center">{setIdx + 1}</span>
                  <input
                    type="number"
                    className="bg-elevated border border-border rounded-lg px-3 py-2 font-mono text-sm text-text-primary focus:border-accent focus:outline-none"
                    value={set.weight || ""}
                    placeholder="lbs"
                    onChange={e => updateSet(exIdx, setIdx, "weight", +e.target.value)}
                  />
                  <input
                    type="number"
                    className="bg-elevated border border-border rounded-lg px-3 py-2 font-mono text-sm text-text-primary focus:border-accent focus:outline-none"
                    value={set.reps || ""}
                    placeholder="reps"
                    onChange={e => updateSet(exIdx, setIdx, "reps", +e.target.value)}
                  />
                  <button
                    onClick={() => updateSet(exIdx, setIdx, "completed", !set.completed)}
                    className={`w-10 h-10 mx-auto rounded-lg border flex items-center justify-center transition-colors ${
                      set.completed
                        ? "bg-[#111111] border-[#111111] text-white"
                        : "border-border text-text-muted hover:border-border-hover"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
