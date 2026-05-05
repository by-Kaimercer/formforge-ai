"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Button, Card } from "@/components/ui";
import { Zap, Target, Brain, Dumbbell, Shield, BarChart3, Clock, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { FAQ_ITEMS, TESTIMONIALS } from "@/lib/constants";

/* ── Hero ────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center noise-bg overflow-hidden">
      <div className="max-w-content mx-auto px-6 pt-24 pb-20 md:pt-0 w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <h1 className="font-heading font-[800] text-hero-mobile md:text-hero uppercase leading-none">
            <span className="text-text-primary block">Your Program.</span>
            <span className="text-accent block">Built on Science.</span>
          </h1>
          <p className="text-text-secondary font-body text-base md:text-lg mt-6 max-w-[480px] leading-relaxed">
            AI-generated training programs backed by Schoenfeld, Israetel, Helms & more. Tailored to your body, goals, equipment, and experience level.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/onboarding">
              <Button>Build My Program Free</Button>
            </Link>
            <a href="#sample">
              <Button variant="ghost">See Sample Program →</Button>
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3 text-text-muted text-xs">
            <span className="text-text-secondary">Built on research by:</span>
            <span>Schoenfeld</span><span className="text-border">·</span>
            <span>Israetel</span><span className="text-border">·</span>
            <span>Helms</span><span className="text-border">·</span>
            <span>Nuckols</span><span className="text-border">·</span>
            <span>NSCA</span>
          </div>
        </div>
        {/* Floating mock card */}
        <div className="hidden md:block relative z-10">
          <div className="transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="bg-card border border-border rounded-card p-6 shadow-accent-glow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg uppercase text-text-primary">Upper A — Push/Pull</h3>
                <span className="font-mono text-xs text-accent bg-accent-dim px-2 py-1 rounded">WEEK 2</span>
              </div>
              {[
                { name: "Barbell Bench Press", sets: "4", reps: "6-8", rir: "2", muscle: "Chest" },
                { name: "Barbell Row", sets: "4", reps: "8-10", rir: "2", muscle: "Back" },
                { name: "Incline DB Press", sets: "3", reps: "10-12", rir: "2", muscle: "Chest" },
                { name: "Lat Pulldown", sets: "3", reps: "10-12", rir: "2", muscle: "Back" },
                { name: "Lateral Raise", sets: "4", reps: "12-15", rir: "1", muscle: "Shoulders" },
              ].map((ex, i) => (
                <div key={i} className={`flex items-center justify-between py-3 ${i > 0 ? "border-t border-border" : ""}`}>
                  <div className="flex-1">
                    <p className="text-sm text-text-primary">{ex.name}</p>
                    <span className={`text-[10px] uppercase font-mono muscle-${ex.muscle.toLowerCase()}`}>{ex.muscle}</span>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <span className="font-mono text-lg text-text-primary">{ex.sets}×{ex.reps}</span>
                    <span className={`font-mono text-xs px-1.5 py-0.5 rounded ${ex.rir === "1" ? "text-yellow-400 bg-yellow-400/10" : "text-green-400 bg-green-400/10"}`}>
                      RIR {ex.rir}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] -translate-y-1/2 pointer-events-none" />
    </section>
  );
}

/* ── How It Works ─────────────────────────── */
function HowItWorks() {
  const steps = [
    { icon: Target, title: "Fill Your Profile", desc: "5-step clinical intake: body stats, training history, goals, recovery, and preferences" },
    { icon: Brain, title: "AI Generates", desc: "Our AI applies real exercise science to build your periodized, volume-landmark-based program" },
    { icon: Dumbbell, title: "Train With Precision", desc: "Track workouts, get coaching feedback, and progress with scientific autoregulation" },
  ];
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6">
        <h2 className="font-heading font-bold text-section-mobile md:text-section uppercase text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent-dim border border-accent/20 flex items-center justify-center">
                <s.icon className="w-7 h-7 text-accent" />
              </div>
              <div className="font-mono text-xs text-accent mb-2">STEP {i + 1}</div>
              <h3 className="font-heading font-bold text-xl uppercase mb-3">{s.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
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
    { icon: Brain, title: "Science-First Programming", desc: "MEV/MAV/MRV volume landmarks, RIR autoregulation, and periodization from peer-reviewed research" },
    { icon: Shield, title: "Injury-Aware", desc: "Flag your limitations — the AI never prescribes movements that conflict with your injury history" },
    { icon: Dumbbell, title: "Equipment Matched", desc: "Home gym with dumbbells? Bodyweight only? Every exercise matches your exact setup" },
    { icon: BarChart3, title: "Progress Tracking", desc: "Log sets, track volume per muscle group, spot overreaching patterns before they happen" },
    { icon: Target, title: "AI Coaching Chat", desc: "Ask your AI coach anything — program adjustments, form cues, missed session recovery" },
    { icon: Clock, title: "Periodized Deloads", desc: "Programmed deload weeks with 40-50% volume reduction — built in, not an afterthought" },
  ];
  return (
    <section id="features" className="py-20 md:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6">
        <h2 className="font-heading font-bold text-section-mobile md:text-section uppercase text-center mb-16">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card key={i} className={`opacity-0 animate-fade-in-up`} hover={true}>
              <div style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}>
                <f.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-heading font-bold text-lg uppercase mb-2">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ─────────────────────────── */
function Testimonials() {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6">
        <h2 className="font-heading font-bold text-section-mobile md:text-section uppercase text-center mb-16">What Lifters Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} hover={false} className="flex flex-col">
              <p className="text-text-secondary text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-accent-dim border border-accent/30 flex items-center justify-center font-heading font-bold text-accent text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </Card>
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
  const pro = ["Unlimited generations", "PDF export", "AI coaching chat", "Progress tracker", "Program tweaking", "10 program history", "Priority speed"];
  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6">
        <h2 className="font-heading font-bold text-section-mobile md:text-section uppercase text-center mb-6">Pricing</h2>
        <p className="text-text-secondary text-center mb-10 max-w-md mx-auto">One free program to experience the quality. Upgrade for unlimited access.</p>
        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm ${!annual ? "text-text-primary" : "text-text-muted"}`}>Monthly</span>
          <button onClick={() => setAnnual(!annual)} className="relative w-14 h-7 bg-elevated rounded-full border border-border transition-colors">
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-accent transition-transform duration-300 ${annual ? "translate-x-7" : "translate-x-0.5"}`} />
          </button>
          <span className={`text-sm ${annual ? "text-text-primary" : "text-text-muted"}`}>Annual</span>
          {annual && <span className="font-mono text-xs text-accent bg-accent-dim px-2 py-1 rounded">SAVE 30%</span>}
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Free */}
          <Card hover={false} className="flex flex-col">
            <h3 className="font-heading font-bold text-xl uppercase mb-1">Free</h3>
            <div className="font-mono text-4xl font-bold text-text-primary mb-6">$0</div>
            <ul className="space-y-3 flex-1">
              {free.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Check className="w-4 h-4 text-accent shrink-0" />{f}
                </li>
              ))}
              {["PDF export", "AI coaching", "Progress tracker", "Program tweaking"].map((f, i) => (
                <li key={`no-${i}`} className="flex items-center gap-2 text-sm text-text-muted">
                  <X className="w-4 h-4 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="/onboarding" className="mt-8">
              <Button variant="secondary" className="w-full">Get Started</Button>
            </Link>
          </Card>
          {/* Pro */}
          <div className="relative">
            <div className="absolute -top-3 right-4 font-mono text-xs text-black bg-accent px-3 py-1 rounded font-bold z-10">MOST POPULAR</div>
            <Card hover={false} className="border-accent shadow-accent-glow-sm flex flex-col h-full">
              <h3 className="font-heading font-bold text-xl uppercase mb-1">Pro</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-mono text-4xl font-bold text-text-primary">{annual ? "$99" : "$12"}</span>
                <span className="text-text-muted text-sm">/{annual ? "year" : "month"}</span>
              </div>
              <ul className="space-y-3 flex-1">
                {pro.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <Check className="w-4 h-4 text-accent shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding" className="mt-8">
                <Button className="w-full">Upgrade to Pro</Button>
              </Link>
            </Card>
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
    <section id="faq" className="py-20 md:py-28 border-t border-border">
      <div className="max-w-content mx-auto px-6 max-w-2xl">
        <h2 className="font-heading font-bold text-section-mobile md:text-section uppercase text-center mb-16">FAQ</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border border-border rounded-card overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-elevated/50 transition-colors">
                <span className="text-sm font-medium text-text-primary pr-4">{item.question}</span>
                {open === i ? <ChevronUp className="w-4 h-4 text-accent shrink-0" /> : <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">{item.answer}</p>
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
    <footer className="py-12 border-t border-border">
      <div className="max-w-content mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          <span className="font-heading font-bold text-sm uppercase tracking-wider">FormForge</span>
        </div>
        <p className="text-text-muted text-xs">© {new Date().getFullYear()} FormForge. Built on science, not hype.</p>
      </div>
    </footer>
  );
}

/* ── Landing Page ─────────────────────────── */
export default function LandingPage() {
  return (
    <main className="bg-base min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      {/* Final CTA */}
      <section className="py-20 md:py-28 border-t border-border text-center">
        <div className="max-w-content mx-auto px-6">
          <h2 className="font-heading font-[800] text-section-mobile md:text-[4rem] uppercase leading-none mb-6">
            <span className="text-text-primary">Stop Guessing.</span><br />
            <span className="text-accent">Start Training.</span>
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">Your first program is free. No credit card. No generic templates. Real science.</p>
          <Link href="/onboarding">
            <Button>Build My Program Now</Button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
