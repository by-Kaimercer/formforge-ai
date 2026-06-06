/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Button, Card, Badge, Leaderboard, PowerUpBanner, RecoveryQuiz, TrialBanner } from "@/components/ui";
import { ProgramJSON } from "@/lib/types";
import { Dumbbell, Zap, ChevronRight, Calendar, TrendingUp, Clock, Send, Trophy, X, Check } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { getUserStats, addPoints, getLevelTitle, getLevel } from "@/lib/userStats";
import { useDailyChallenge } from "@/hooks/useDailyChallenge";
import { getMotivationalMessage } from "@/lib/coachMessages";

const placeholderVolumeData = [
  { day: "Mon", volume: 18500 },
  { day: "Tue", volume: 21000 },
  { day: "Wed", volume: 0 },
  { day: "Thu", volume: 19200 },
  { day: "Fri", volume: 24500 },
  { day: "Sat", volume: 15000 },
  { day: "Sun", volume: 0 },
];

export default function DashboardPage() {
  const [program, setProgram] = useState<ProgramJSON | null>(null);
  const [programId, setProgramId] = useState<string>("demo");
  const [sessionsThisWeek, setSessionsThisWeek] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [coachMsg, setCoachMsg] = useState("");
  const [mounted, setMounted] = useState(false);

  const dailyChallenge = useDailyChallenge();

  const handleCompleteChallenge = async () => {
    if (!dailyChallenge) return;
    dailyChallenge.complete();
    const newTotal = await addPoints(dailyChallenge.points);
    setPoints(newTotal);
    setLevel(getLevel(newTotal));
  };

  const handleQuizComplete = async (earnedPoints: number) => {
    const newTotal = await addPoints(earnedPoints);
    setPoints(newTotal);
    setLevel(getLevel(newTotal));
  };

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("ff_program");
    if (stored) setProgram(JSON.parse(stored));
    const storedId = sessionStorage.getItem("ff_program_id");
    if (storedId) setProgramId(storedId);

    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;

      // Load user stats
      const stats = await getUserStats();
      if (stats) {
        setPoints(stats.points);
        setLevel(stats.level);
      }

      const { data: programRow } = await supabase
        .from("programs")
        .select("id, program_json")
        .eq("user_id", data.user.id)
        .eq("is_active", true)
        .single();

      if (programRow) {
        setProgram(programRow.program_json as ProgramJSON);
        setProgramId(programRow.id);
        sessionStorage.setItem("ff_program", JSON.stringify(programRow.program_json));
        sessionStorage.setItem("ff_program_id", programRow.id);
      }

      const { data: workouts, count } = await supabase
        .from("workouts")
        .select("logged_at", { count: "exact" })
        .eq("user_id", data.user.id)
        .order("logged_at", { ascending: false });

      setTotalSessions(count || 0);

      if (workouts && workouts.length > 0) {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const thisWeek = workouts.filter(w => new Date(w.logged_at) >= weekAgo).length;
        setSessionsThisWeek(thisWeek);

        const msDay = 1000 * 60 * 60 * 24;
        const todayMidnight = new Date();
        todayMidnight.setHours(0, 0, 0, 0);
        const uniqueDays = [...new Set(workouts.map(w => new Date(w.logged_at).toDateString()))];
        let currentStreak = 0;
        // The streak is "alive" if the most recent workout was today or yesterday;
        // then count back over consecutive calendar days.
        const firstDiff = Math.round((todayMidnight.getTime() - new Date(uniqueDays[0]).getTime()) / msDay);
        if (firstDiff <= 1) {
          let expected = firstDiff;
          for (const day of uniqueDays) {
            const diffDays = Math.round((todayMidnight.getTime() - new Date(day).getTime()) / msDay);
            if (diffDays === expected) {
              currentStreak++;
              expected++;
            } else break;
          }
        }
        setStreak(currentStreak);
      }
    });
  }, []);

  const today = new Date();
  const dayOfWeek = today.getDay();
  const trainingDayIndex = dayOfWeek <= 4 ? Math.min(dayOfWeek, (program?.weeks[0]?.days.length || 1) - 1) : 0;
  const todaysWorkout = program?.weeks[0]?.days[trainingDayIndex];

  useEffect(() => {
    setCoachMsg(getMotivationalMessage(todaysWorkout));
  }, [todaysWorkout]);

  return (
    <div className="min-h-screen bg-base">
      <TrialBanner />
      <Navbar />
      
      {/* 
        Main wrapper adds left padding on desktop to clear the w-64 sidebar.
        We use grid layout for the desktop multi-column structure.
      */}
      <main className="md:pl-64 min-h-screen flex flex-col lg:flex-row">
        
        {/* Left Column: Dashboard Content */}
        <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8 pb-24 md:pb-12 overflow-y-auto">
          {/* PowerUp Banner if weekend */}
          <div className="mb-6">
            <PowerUpBanner />
          </div>

          {/* Welcome & Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-text-muted text-sm font-mono mb-1">
                {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
              <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight">Overview</h1>
            </div>
            
            <div 
              className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-2 hover:border-accent/40 hover:bg-elevated/40 transition-all cursor-pointer shadow-sm select-none" 
              onClick={() => setShowLeaderboard(true)} 
              title="View Leaderboard"
            >
              <div className="text-right">
                <p className="text-[10px] text-text-muted font-mono uppercase">{getLevelTitle(level)}</p>
                <p className="text-sm font-bold text-accent font-mono">{points} PTS</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center relative">
                <span className="font-heading font-black text-accent text-base">{level}</span>
                {streak > 0 && (
                  <span className="absolute -top-2 -right-2 bg-ff-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                    🔥{streak}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Program Overview (Hero) */}
          <Card className="mb-6 border-accent/20 bg-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-[#111111] text-white border-none">Active Phase</Badge>
                  <span className="text-xs font-mono text-text-muted">WK 1 / {program?.durationWeeks || 4}</span>
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase text-text-primary mb-1">
                  {program ? program.programName : "Hypertrophy Phase 1"}
                </h2>
                <p className="text-sm text-text-secondary max-w-md">
                  {program?.split || "4-Day Upper/Lower Split"} • Focused on progressive overload and metabolic stress.
                </p>
              </div>
              <div className="w-full md:w-48">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-text-secondary">Weekly Volume</span>
                  <span className="text-accent">75%</span>
                </div>
                <div className="h-2 bg-base rounded-full overflow-hidden border border-border">
                  <div className="h-full bg-accent rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Daily Micro-Challenge Card */}
          {dailyChallenge && !dailyChallenge.completed && (
            <Card hover={false} className="mb-6 border-accent/30 bg-accent/5 py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-heading font-bold text-sm uppercase text-accent">Daily Micro-Challenge</h4>
                      <Badge className="bg-[#111111] text-white text-[10px] font-bold border-none">+{dailyChallenge.points} PTS</Badge>
                    </div>
                    <p className="text-sm text-text-primary pr-4">{dailyChallenge.text}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <Button className="text-xs px-4 py-2" onClick={handleCompleteChallenge}>
                    Complete
                  </Button>
                  <button onClick={dailyChallenge.dismiss} className="p-1.5 rounded hover:bg-elevated transition-colors text-text-muted">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          )}

          {dailyChallenge && dailyChallenge.completed && (
            <Card hover={false} className="mb-6 border-green-500/30 bg-green-500/5 py-3 px-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-xs text-text-secondary">
                  Daily Challenge Completed! <span className="text-green-400 font-bold font-mono font-medium">+{dailyChallenge.points} PTS</span> added to your profile.
                </p>
              </div>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Today's Session */}
            <div className="lg:col-span-2">
              <h3 className="font-heading font-bold text-lg uppercase mb-3 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-accent" />
                Today&apos;s Session
              </h3>
              {todaysWorkout ? (
                <Card className="border-border hover:border-accent/50 transition-colors h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="font-heading font-bold text-xl uppercase text-text-primary">
                        {todaysWorkout.dayLabel}
                      </p>
                      <p className="text-sm text-accent font-mono">{todaysWorkout.focus}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-1">
                    {todaysWorkout.exercises.slice(0, 3).map((ex, idx) => (
                      <div key={idx} className="bg-base rounded-lg p-3 border border-border flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm text-text-primary">{ex.name}</p>
                          <p className="text-xs text-text-muted font-mono mt-1">
                            {ex.sets} SETS • {ex.repRange} REPS • RIR {ex.rir}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-card">
                          <span className="text-xs font-mono text-text-secondary">{idx + 1}</span>
                        </div>
                      </div>
                    ))}
                    {todaysWorkout.exercises.length > 3 && (
                      <p className="text-xs text-text-muted text-center font-mono">
                        + {todaysWorkout.exercises.length - 3} more exercises
                      </p>
                    )}
                  </div>
                  
                  <Link href={`/program/${programId}`}>
                    <Button className="w-full font-heading font-bold uppercase tracking-wider">
                      Start Workout
                    </Button>
                  </Link>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-4 h-full">
                  <Card hover={false} className="flex flex-col items-center justify-center py-12 border-dashed h-full">
                    <Calendar className="w-8 h-8 text-text-muted mb-3" />
                    <p className="text-text-secondary mb-4">Rest Day or No Program Active</p>
                    <Link href="/onboarding">
                      <Button variant="secondary">Generate Program</Button>
                    </Link>
                  </Card>
                  
                  <RecoveryQuiz onComplete={handleQuizComplete} />
                </div>
              )}
            </div>

            {/* Volume Chart */}
            <div className="lg:col-span-1">
              <h3 className="font-heading font-bold text-lg uppercase mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                Volume Trend
              </h3>
              <Card className="h-full flex flex-col">
                <div className="mb-4">
                  <p className="text-xs text-text-muted font-mono uppercase tracking-wide">Weekly Total (KG)</p>
                  <p className="text-2xl font-bold text-text-primary font-mono mt-1">98,200</p>
                </div>
                <div className="flex-1 min-h-[150px] w-full">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={placeholderVolumeData}>
                        <YAxis domain={['auto', 'auto']} hide />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                          itemStyle={{ color: '#111111', fontWeight: 'bold' }}
                          labelStyle={{ color: '#6b7280', marginBottom: '4px' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="volume"
                          stroke="#111111"
                          strokeWidth={2}
                          dot={{ r: 4, fill: '#ffffff', stroke: '#111111', strokeWidth: 2 }}
                          activeDot={{ r: 6, fill: '#111111', stroke: '#ffffff' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full bg-elevated/50 animate-pulse rounded-lg flex items-center justify-center">
                      <span className="text-xs text-text-muted font-mono">Loading chart...</span>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Sessions", value: String(sessionsThisWeek), icon: Dumbbell, sub: "this week" },
              { label: "Total Done", value: String(totalSessions), icon: TrendingUp, sub: "all time" },
              { label: "Streak", value: String(streak), icon: Zap, sub: "days active" },
              { label: "Avg RIR", value: "1.8", icon: Clock, sub: "past 7 days" },
            ].map((stat, i) => (
              <Card key={i} hover={false} className="p-4 flex items-center gap-4">
                <div className="bg-base p-2 rounded-lg border border-border">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-mono text-xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: AI Coach Sidebar (Visible on large screens) */}
        <div className="hidden lg:flex w-80 border-l border-border bg-card flex-col h-[calc(100vh-0px)] sticky top-0">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm uppercase leading-none">Coach_Sys</h3>
                <span className="text-[10px] text-accent font-mono">ONLINE</span>
              </div>
            </div>
            <Link href="/chat">
              <Button variant="ghost" className="h-8 w-8 p-0" title="Expand Chat">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
            <p className="text-xs text-text-muted text-center font-mono my-2">TODAY</p>
            
            {/* System Message */}
            <div className="bg-base border border-border rounded-lg p-3 text-sm">
              <p className="text-text-primary">
                Analyzing training bio-metrics...
              </p>
            </div>
            
            {/* Coach Message */}
            <div className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg rounded-tl-none p-3 text-sm animate-fade-in-up">
              <p className="text-text-primary">
                {coachMsg || "Hi there! I am loading your daily advice..."}
              </p>
            </div>
          </div>
          
          <div className="p-4 border-t border-border bg-base">
            <Link href="/chat">
              <div className="w-full bg-card border border-border rounded-lg p-3 flex items-center justify-between text-text-muted hover:border-accent/50 transition-colors cursor-pointer">
                <span className="text-sm">Reply to coach...</span>
                <Send className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </main>

      {showLeaderboard && (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      )}
    </div>
  );
}
