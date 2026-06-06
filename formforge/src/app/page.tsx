"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Button, Card } from "@/components/ui";
import { Zap, Target, Brain, Dumbbell, Shield, BarChart3, Clock, ChevronDown, ChevronUp, Check, X, Star } from "lucide-react";
import { FAQ_ITEMS, TESTIMONIALS } from "@/lib/constants";

/* ── Hero ────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      <div className="max-w-content mx-auto px-6 pt-24 pb-20 md:pt-0 w-full grid md:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <p className="label-overline mb-5">AI-powered · science-backed</p>
          <h1 className="font-display font-bold text-display-xl leading-none tracking-tight text-[#111111]">
            <span className="block">The smarter</span>
            <span className="block">way to train.</span>
          </h1>
          <p className="text-[#374151] text-lg mt-6 max-w-[480px] leading-relaxed">
            AI-generated training programs backed by Schoenfeld, Israetel, Helms & more. Tailored to your body, goals, equipment, and experience level.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/onboarding">
              <Button>Build My Program Free</Button>
            </Link>
            <a href="#sample">
              <Button variant="secondary">See Sample Program →</Button>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#6b7280] text-xs font-mono">
            <span className="text-[#374151] font-medium">Built on research by:</span>
            <span>Schoenfeld</span><span className="text-[#d1d5db]">·</span>
            <span>Israetel</span><span className="text-[#d1d5db]">·</span>
            <span>Helms</span><span className="text-[#d1d5db]">·</span>
            <span>Nuckols</span><span className="text-[#d1d5db]">·</span>
            <span>NSCA</span>
          </div>
        </div>

        {/* Hero app-mockup card */}
        <div className="hidden md:block relative z-10">
          <div className="transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-card-float">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#6b7280] uppercase tracking-widest">Week 2 of 12</span>
                <span className="text-[10px] font-mono text-white bg-[#111111] px-2 py-0.5 rounded-full">Active</span>
              </div>
              <h3 className="font-display font-bold text-lg tracking-tight text-[#111111] mb-4">Upper A — Push/Pull</h3>
              <div className="space-y-0">
                {[
                  { name: "Barbell Bench Press", sets: "4", reps: "6-8",   rir: "2", muscle: "chest" },
                  { name: "Barbell Row",          sets: "4", reps: "8-10",  rir: "2", muscle: "back" },
                  { name: "Incline DB Press",     sets: "3", reps: "10-12", rir: "2", muscle: "chest" },
                  { name: "Lat Pulldown",         sets: "3", reps: "10-12", rir: "2", muscle: "back" },
                  { name: "Lateral Raise",        sets: "4", reps: "12-15", rir: "1", muscle: "shoulders" },
                ].map((ex, i) => (
                  <div key={i} className={`flex items-center justify-between py-2.5 ${i > 0 ? "border-t border-[#f3f4f6]" : ""}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#111111] font-medium truncate">{ex.name}</p>
                      <span className={`text-[10px] uppercase font-mono muscle-${ex.muscle}`}>{ex.muscle}</span>
                    </div>
                    <div className="flex items-center gap-3 ml-4 shrink-0">
                      <span className="font-mono text-sm font-semibold text-[#111111]">{ex.sets}×{ex.reps}</span>
                      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${ex.rir === "1" ? "rir-moderate bg-amber-50" : "rir-easy bg-emerald-50"}`}>
                        RIR {ex.rir}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#f3f4f6] flex items-center justify-between">
                <span className="text-xs text-[#6b7280]">18 sets · ~65 min</span>
                <span className="text-xs font-semibold text-[#111111] bg-[#f5f5f5] px-3 py-1 rounded-full">Start Workout →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ─────────────────────────── */
function HowItWorks() {
  const steps = [
    { icon: Target, title: "Fill Your Profile", desc: "5-step clinical intake: body stats, training history, goals, recovery, and preferences." },
    { icon: Brain,  title: "AI Generates",      desc: "Our AI applies real exercise science to build your periodized, volume-landmark-based program." },
    { icon: Dumbbell, title: "Train With Precision", desc: "Track workouts, get coaching feedback, and progress with scientific autoregulation." },
  ];
  return (
    <section className="py-24 bg-[#f8f9fa] border-t border-[#e5e7eb]">
      <div className="max-w-content mx-auto px-6">
        <p className="label-overline text-center mb-3">The process</p>
        <h2 className="font-display font-bold text-display-lg tracking-tight text-center text-[#111111] mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}>
              <div className="font-display font-bold text-[5rem] leading-none text-[#e5e7eb] mb-3 select-none">0{i + 1}</div>
              <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-white border border-[#e5e7eb] shadow-card flex items-center justify-center">
                <s.icon className="w-5 h-5 text-[#111111]" />
              </div>
              <h3 className="font-display font-bold text-xl tracking-tight text-[#111111] mb-3">{s.title}</h3>
              <p className="text-[#374151] text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features ─────────────────────────────── */
function Features() {
  const features = [
    { icon: Brain,    title: "Science-First Programming", desc: "MEV/MAV/MRV volume landmarks, RIR autoregulation, and periodization from peer-reviewed research." },
    { icon: Shield,   title: "Injury-Aware",              desc: "Flag your limitations — the AI never prescribes movements that conflict with your injury history." },
    { icon: Dumbbell, title: "Equipment Matched",         desc: "Home gym with dumbbells? Bodyweight only? Every exercise matches your exact setup." },
    { icon: BarChart3,title: "Progress Tracking",         desc: "Log sets, track volume per muscle group, spot overreaching patterns before they happen." },
    { icon: Target,   title: "AI Coaching Chat",          desc: "Ask your AI coach anything — program adjustments, form cues, missed session recovery." },
    { icon: Clock,    title: "Periodized Deloads",        desc: "Programmed deload weeks with 40–50% volume reduction — built in, not an afterthought." },
  ];
  return (
    <section id="features" className="py-24 bg-white border-t border-[#e5e7eb]">
      <div className="max-w-content mx-auto px-6">
        <p className="label-overline text-center mb-3">What you get</p>
        <h2 className="font-display font-bold text-display-lg tracking-tight text-center text-[#111111] mb-16">Built for Serious Lifters</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i}
              className="bg-[#f5f5f5] border border-[#e5e7eb] rounded-card p-8 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}>
              <f.icon className="w-7 h-7 text-[#111111] mb-5" />
              <h3 className="font-display font-bold text-lg tracking-tight text-[#111111] mb-2">{f.title}</h3>
              <p className="text-[#374151] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ─────────────────────────── */
function Testimonials() {
  return (
    <section className="py-24 bg-[#f8f9fa] border-t border-[#e5e7eb]">
      <div className="max-w-content mx-auto px-6">
        <p className="label-overline text-center mb-3">Social proof</p>
        <h2 className="font-display font-bold text-display-lg tracking-tight text-center text-[#111111] mb-16">What Lifters Say</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-[#f5f5f5] border border-[#e5e7eb] rounded-card p-6 shadow-card flex flex-col">
              {/* Star rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-[#fb923c] text-[#fb923c]" />
                ))}
              </div>
              <p className="text-[#374151] text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#e5e7eb]">
                <div className="w-9 h-9 rounded-full bg-[#e5e7eb] flex items-center justify-center font-display font-bold text-[#374151] text-sm shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111111]">{t.name}</p>
                  <p className="text-xs text-[#6b7280]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ──────────────────────────────── */
function Pricing() {
  const [annual, setAnnual] = useState(false);
  const free = ["1 program generation", "View program online", "Basic exercise info"];
  const pro  = ["Unlimited generations", "PDF export", "AI coaching chat", "Progress tracker", "Program tweaking", "10 program history", "Priority speed"];
  return (
    <section id="pricing" className="py-24 bg-white border-t border-[#e5e7eb]">
      <div className="max-w-content mx-auto px-6">
        <p className="label-overline text-center mb-3">Pricing</p>
        <h2 className="font-display font-bold text-display-lg tracking-tight text-center text-[#111111] mb-4">Simple, Transparent Pricing</h2>
        <p className="text-[#374151] text-center mb-10 max-w-md mx-auto text-sm">One free program to experience the quality. Upgrade for unlimited access.</p>

        {/* Toggle — pill-group style */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm ${!annual ? "text-[#111111] font-medium" : "text-[#6b7280]"}`}>Monthly</span>
          <div className="relative w-14 h-7 bg-[#f5f5f5] rounded-full border border-[#e5e7eb] cursor-pointer" onClick={() => setAnnual(!annual)}>
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-[#111111] transition-transform duration-300 ${annual ? "translate-x-7" : "translate-x-0.5"}`} />
          </div>
          <span className={`text-sm ${annual ? "text-[#111111] font-medium" : "text-[#6b7280]"}`}>Annual</span>
          {annual && <span className="font-mono text-xs text-white bg-[#111111] px-2 py-1 rounded-full font-semibold">SAVE 30%</span>}
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {/* Free */}
          <div className="bg-white border border-[#e5e7eb] rounded-card p-8 shadow-card flex flex-col">
            <h3 className="font-display font-bold text-xl tracking-tight text-[#111111] mb-1">Free</h3>
            <div className="font-mono text-4xl font-bold text-[#111111] mb-6">$0</div>
            <ul className="space-y-3 flex-1">
              {free.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[#374151]">
                  <Check className="w-4 h-4 text-[#10b981] shrink-0" />{f}
                </li>
              ))}
              {["PDF export", "AI coaching", "Progress tracker", "Program tweaking"].map((f, i) => (
                <li key={`no-${i}`} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                  <X className="w-4 h-4 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="/onboarding" className="mt-8">
              <Button variant="secondary" className="w-full">Get Started</Button>
            </Link>
          </div>

          {/* Pro — dark featured card */}
          <div className="bg-[#101010] rounded-card p-8 shadow-card-float flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-bold text-xl tracking-tight text-white">Pro</h3>
              <span className="text-[10px] font-mono text-[#a1a1aa] uppercase tracking-widest">Most Popular</span>
            </div>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-mono text-4xl font-bold text-white">{annual ? "$99" : "$12"}</span>
              <span className="text-[#a1a1aa] text-sm">/{annual ? "year" : "month"}</span>
            </div>
            <ul className="space-y-3 flex-1">
              {pro.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[#d1d5db]">
                  <Check className="w-4 h-4 text-[#10b981] shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="/onboarding" className="mt-8">
              <button className="w-full bg-white text-[#111111] font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#f5f5f5] transition-colors">
                Upgrade to Pro
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 bg-[#f8f9fa] border-t border-[#e5e7eb]">
      <div className="max-w-2xl mx-auto px-6">
        <p className="label-overline text-center mb-3">FAQ</p>
        <h2 className="font-display font-bold text-display-lg tracking-tight text-center text-[#111111] mb-16">Common Questions</h2>
        <div className="bg-white rounded-card border border-[#e5e7eb] shadow-card overflow-hidden">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={i > 0 ? "border-t border-[#f3f4f6]" : ""}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#f8f9fa] transition-colors">
                <span className="text-sm font-semibold text-[#111111] pr-4">{item.question}</span>
                {open === i
                  ? <ChevronUp className="w-4 h-4 text-[#6b7280] shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-[#9ca3af] shrink-0" />
                }
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-6 pb-5 text-sm text-[#374151] leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#101010] py-16">
      <div className="max-w-content mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-white" />
          <span className="font-display font-bold text-xl tracking-tight text-white">FormForge</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/auth/login"  className="text-[#a1a1aa] hover:text-white text-sm transition-colors">Sign In</Link>
          <Link href="/onboarding" className="text-[#a1a1aa] hover:text-white text-sm transition-colors">Get Started</Link>
          <a href="#pricing"       className="text-[#a1a1aa] hover:text-white text-sm transition-colors">Pricing</a>
        </div>
        <p className="text-[#898989] text-xs font-mono">© {new Date().getFullYear()} FORMFORGE. BUILT ON SCIENCE, NOT HYPE.</p>
      </div>
    </footer>
  );
}

/* ── Landing Page ─────────────────────────── */
export default function LandingPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      {/* Final CTA band */}
      <section className="py-24 bg-white border-t border-[#e5e7eb]">
        <div className="max-w-content mx-auto px-6">
          <div className="bg-[#f5f5f5] border border-[#e5e7eb] rounded-card p-12 md:p-16 text-center shadow-card max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-display-md tracking-tight text-[#111111] mb-4">
              Stop guessing. Start training.
            </h2>
            <p className="text-[#374151] mb-8 max-w-md mx-auto text-sm">
              Your first program is free. No credit card. No generic templates. Real science.
            </p>
            <Link href="/onboarding">
              <Button>Build My Program Now</Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
