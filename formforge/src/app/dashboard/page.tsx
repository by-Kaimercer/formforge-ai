"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Button, Card, Badge } from "@/components/ui";
import { MOCK_PROGRAM } from "@/lib/mock-data";
import { ProgramJSON } from "@/lib/types";
import { Dumbbell, Zap, ChevronRight, Calendar, TrendingUp, Clock } from "lucide-react";

export default function DashboardPage() {
  const [program, setProgram] = useState<ProgramJSON | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("ff_program");
    setProgram(stored ? JSON.parse(stored) : MOCK_PROGRAM);
  }, []);

  const today = new Date();
  const dayOfWeek = today.getDay();
  const trainingDayIndex = dayOfWeek <= 4 ? Math.min(dayOfWeek, (program?.weeks[0]?.days.length || 1) - 1) : 0;
  const todaysWorkout = program?.weeks[0]?.days[trainingDayIndex];

  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <main className="max-w-content mx-auto px-4 md:px-6 pt-20 pb-24 md:pb-12">
        {/* Welcome */}
        <div className="mb-8">
          <p className="text-text-muted text-sm font-mono mb-1">{today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
          <h1 className="font-heading font-[800] text-3xl md:text-4xl uppercase">Dashboard</h1>
        </div>

        {/* Today's Workout CTA */}
        {todaysWorkout && (
          <Link href="/program/demo">
            <Card className="mb-6 border-accent/30 hover:border-accent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-dim border border-accent/20 flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-lg uppercase text-text-primary">{todaysWorkout.dayLabel} — {todaysWorkout.focus}</p>
                    <p className="text-sm text-text-secondary">{todaysWorkout.exercises.length} exercises · {todaysWorkout.totalVolumeSets} total sets</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-accent" />
              </div>
            </Card>
          </Link>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Current Week", value: "1", icon: Calendar, sub: "of " + (program?.durationWeeks || 4) },
            { label: "Sessions Done", value: "0", icon: Dumbbell, sub: "this week" },
            { label: "Total Volume", value: "0", icon: TrendingUp, sub: "sets logged" },
            { label: "Streak", value: "0", icon: Zap, sub: "days" },
          ].map((stat, i) => (
            <Card key={i} hover={false} className="text-center p-4">
              <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="font-mono text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-muted mt-1">{stat.label}</p>
              <p className="text-xs text-text-muted">{stat.sub}</p>
            </Card>
          ))}
        </div>

        {/* Current Program */}
        {program && (
          <Card hover={false} className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-lg uppercase">Active Program</h2>
              <Link href="/program/demo"><Button variant="ghost" className="text-xs">View Full →</Button></Link>
            </div>
            <h3 className="font-heading font-bold text-xl text-accent mb-2">{program.programName}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge>{program.split}</Badge>
              <Badge>{program.durationWeeks} WEEKS</Badge>
              <Badge>{program.sessionsPerWeek}×/WEEK</Badge>
            </div>
            <p className="text-sm text-text-secondary">{program.coachSummary}</p>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/onboarding">
            <Card className="text-center p-6">
              <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="font-heading font-bold text-sm uppercase">New Program</p>
              <p className="text-xs text-text-muted mt-1">Generate a fresh program</p>
            </Card>
          </Link>
          <Link href="/tracker">
            <Card className="text-center p-6">
              <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="font-heading font-bold text-sm uppercase">Log Workout</p>
              <p className="text-xs text-text-muted mt-1">Track today&apos;s session</p>
            </Card>
          </Link>
          <Link href="/chat">
            <Card className="text-center p-6">
              <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="font-heading font-bold text-sm uppercase">Ask Coach</p>
              <p className="text-xs text-text-muted mt-1">AI coaching chat</p>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
