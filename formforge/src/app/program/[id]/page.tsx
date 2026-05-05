"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button, Card, Badge, getMuscleVariant } from "@/components/ui";
import { MOCK_PROGRAM } from "@/lib/mock-data";
import { ProgramJSON, Exercise } from "@/lib/types";
import { ChevronDown, ChevronUp, Clock, Share2, Download, RefreshCw, Zap, AlertTriangle } from "lucide-react";

function RirBadge({ rir }: { rir: string }) {
  const n = parseInt(rir);
  const cls = isNaN(n) ? "rir-moderate" : n <= 1 ? "rir-hard" : n <= 3 ? "rir-moderate" : "rir-easy";
  return <span className={`font-mono text-xs px-2 py-0.5 rounded ${cls} bg-current/10`}>RIR {rir}</span>;
}

function ExerciseRow({ ex }: { ex: Exercise }) {
  const variant = getMuscleVariant(ex.muscleGroup);
  return (
    <div className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-0 py-3.5 px-4 border-l-[3px] border-transparent hover:border-accent transition-colors even:bg-white/[0.02]">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-text-muted w-5">{ex.order}.</span>
          <span className="text-sm text-text-primary font-medium truncate">{ex.name}</span>
        </div>
        <div className="flex items-center gap-2 ml-7">
          <Badge variant={variant}>{ex.muscleGroup}</Badge>
          <span className="text-xs text-text-muted">{ex.equipmentNeeded}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6 ml-7 md:ml-0">
        <span className="font-mono text-lg text-text-primary whitespace-nowrap">{ex.sets}<span className="text-text-muted mx-1">×</span>{ex.repRange}</span>
        <RirBadge rir={ex.rir} />
        <span className="flex items-center gap-1 text-text-muted text-xs font-mono">
          <Clock className="w-3 h-3" />{ex.restSeconds}s
        </span>
      </div>
      {/* Coaching cue on hover - desktop */}
      <div className="hidden md:block ml-4 max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-xs text-text-muted italic truncate" title={ex.coachingCue}>💡 {ex.coachingCue}</p>
      </div>
    </div>
  );
}

function DayAccordion({ day, defaultOpen }: { day: { dayLabel: string; focus: string; totalVolumeSets: number; exercises: Exercise[] }; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <div className="border border-border rounded-card overflow-hidden mb-3">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-elevated/50 transition-colors">
        <div className="flex items-center gap-4">
          <span className="font-heading font-bold text-base uppercase text-text-primary">{day.dayLabel}</span>
          <span className="text-sm text-text-secondary hidden md:inline">{day.focus}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent">{day.totalVolumeSets} SETS</span>
          {open ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
        </div>
      </button>
      <div className={`transition-all duration-250 ease-out ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
        <div className="border-t border-border">
          <p className="px-5 py-2 text-xs text-text-muted font-mono md:hidden">{day.focus}</p>
          {day.exercises.map((ex, i) => <ExerciseRow key={i} ex={ex} />)}
        </div>
      </div>
    </div>
  );
}

export default function ProgramPage() {
  const [program, setProgram] = useState<ProgramJSON | null>(null);
  const [activeWeek, setActiveWeek] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("ff_program");
    setProgram(stored ? JSON.parse(stored) : MOCK_PROGRAM);
  }, []);

  if (!program) return <div className="min-h-screen bg-base flex items-center justify-center"><div className="animate-pulse text-accent font-mono">Loading...</div></div>;

  const currentWeek = program.weeks[activeWeek];

  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <main className="max-w-content mx-auto px-4 md:px-6 pt-20 md:pt-20 pb-24 md:pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-[800] text-2xl md:text-4xl uppercase mb-3">{program.programName}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>{program.split}</Badge>
            <Badge>{program.durationWeeks} WEEKS</Badge>
            <Badge>{program.sessionsPerWeek}×/WEEK</Badge>
            <Badge>{program.periodizationStyle}</Badge>
          </div>
        </div>

        {/* Coach Summary */}
        <Card hover={false} className="mb-8 border-accent/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-dim border border-accent/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm uppercase text-accent mb-1">Coach Summary</p>
              <p className="text-sm text-text-secondary leading-relaxed">{program.coachSummary}</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant="secondary" onClick={() => { navigator.clipboard.writeText(window.location.href); }}>
            <Share2 className="w-4 h-4 mr-2" />Share
          </Button>
          <Button variant="ghost"><Download className="w-4 h-4 mr-2" />Export PDF</Button>
          <Button variant="ghost"><RefreshCw className="w-4 h-4 mr-2" />Regenerate</Button>
        </div>

        {/* Week tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {program.weeks.map((w, i) => (
            <button key={i} onClick={() => setActiveWeek(i)}
              className={`shrink-0 px-4 py-2 rounded-lg font-mono text-xs uppercase transition-colors ${activeWeek === i ? "bg-accent text-black" : "bg-elevated text-text-secondary hover:text-text-primary border border-border"}`}>
              Week {w.weekNumber}
            </button>
          ))}
          <button className="shrink-0 px-4 py-2 rounded-lg font-mono text-xs uppercase bg-elevated text-ff-blue border border-border">
            Deload (Wk {program.deloadWeek.weekNumber})
          </button>
        </div>

        {/* Current week info */}
        {currentWeek && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-heading font-bold text-lg uppercase">{currentWeek.phase}</span>
              <span className="text-xs text-text-muted font-mono">{currentWeek.volumeNote}</span>
            </div>
            {currentWeek.days.map((day, i) => (
              <DayAccordion key={i} day={day} defaultOpen={i === 0} />
            ))}
          </>
        )}

        {/* Red flags */}
        {program.redFlags.length > 0 && (
          <Card hover={false} className="mt-8 border-ff-red/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-ff-red shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-bold text-sm uppercase text-ff-red mb-2">Watch For</p>
                <ul className="space-y-1.5">
                  {program.redFlags.map((flag, i) => (
                    <li key={i} className="text-sm text-text-secondary">• {flag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Protocols */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { title: "Progression", text: program.progressionProtocol },
            { title: "Nutrition", text: program.nutritionContext },
            { title: "Recovery", text: program.recoveryProtocol },
          ].map((item, i) => (
            <Card key={i} hover={false}>
              <h3 className="font-heading font-bold text-sm uppercase text-accent mb-2">{item.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{item.text}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
