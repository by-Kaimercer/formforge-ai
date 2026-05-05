"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";
import { Profile, defaultProfile } from "@/lib/types";
import {
  INJURY_OPTIONS, TRAINING_AGE_OPTIONS, SESSION_DURATION_OPTIONS,
  EQUIPMENT_OPTIONS, GOAL_OPTIONS, TIMELINE_OPTIONS, SLEEP_OPTIONS,
  DIET_OPTIONS, PROTEIN_OPTIONS, CARDIO_OPTIONS, SPLIT_OPTIONS,
  COMMON_EXERCISES, MUSCLE_GROUPS, INTENSITY_OPTIONS,
} from "@/lib/constants";
import { ChevronLeft, ChevronRight, Check, Zap } from "lucide-react";

const STEPS = ["Body Stats", "Training", "Goals", "Recovery", "Preferences"];

/* ── Input wrapper ─── */
function Field({ label, children, optional }: { label: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-text-secondary flex items-center gap-2">
        {label} {optional && <span className="text-text-muted text-xs">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-elevated border border-border rounded-lg px-4 py-3 text-text-primary font-body text-base placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-colors";
const selectCls = inputCls;

/* ── Step 1 ─── */
function Step1({ p, u }: { p: Profile; u: (k: Partial<Profile>) => void }) {
  const [metric, setMetric] = useState(true);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Age">
          <input type="number" className={inputCls} value={p.age} onChange={e => u({ age: +e.target.value })} min={13} max={99} />
        </Field>
        <Field label="Biological Sex">
          <select className={selectCls} value={p.sex} onChange={e => u({ sex: e.target.value as Profile["sex"] })}>
            <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
          </select>
        </Field>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => setMetric(true)} className={`font-mono text-xs px-3 py-1.5 rounded ${metric ? "bg-accent text-black" : "bg-elevated text-text-secondary"}`}>Metric</button>
        <button onClick={() => setMetric(false)} className={`font-mono text-xs px-3 py-1.5 rounded ${!metric ? "bg-accent text-black" : "bg-elevated text-text-secondary"}`}>Imperial</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label={metric ? "Height (cm)" : "Height (in)"}>
          <input type="number" className={inputCls} value={metric ? p.height_cm : Math.round(p.height_cm / 2.54)}
            onChange={e => u({ height_cm: metric ? +e.target.value : Math.round(+e.target.value * 2.54) })} />
        </Field>
        <Field label={metric ? "Weight (kg)" : "Weight (lbs)"}>
          <input type="number" className={inputCls} value={metric ? p.weight_kg : Math.round(p.weight_kg * 2.205)}
            onChange={e => u({ weight_kg: metric ? +e.target.value : Math.round(+e.target.value / 2.205) })} />
        </Field>
      </div>
      <Field label="Body Fat %" optional>
        <input type="number" className={inputCls} value={p.body_fat ?? ""} placeholder="e.g. 15"
          onChange={e => u({ body_fat: e.target.value ? +e.target.value : null })} min={3} max={50} />
      </Field>
      <Field label="Injuries or Limitations">
        <div className="flex flex-wrap gap-2">
          {INJURY_OPTIONS.map(inj => (
            <button key={inj.id} onClick={() => {
              const has = p.injuries.includes(inj.id);
              u({ injuries: has ? p.injuries.filter(x => x !== inj.id) : [...p.injuries, inj.id] });
            }} className={`px-3 py-2 rounded-lg text-sm border transition-colors ${p.injuries.includes(inj.id) ? "border-accent text-accent bg-accent-dim" : "border-border text-text-secondary hover:border-border-hover"}`}>
              {inj.label}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Injury Notes" optional>
        <textarea className={`${inputCls} h-20 resize-none`} value={p.injury_notes} placeholder="Any details about your injuries..."
          onChange={e => u({ injury_notes: e.target.value })} />
      </Field>
    </div>
  );
}

/* ── Step 2 ─── */
function Step2({ p, u }: { p: Profile; u: (k: Partial<Profile>) => void }) {
  return (
    <div className="space-y-6">
      <Field label="Training Experience">
        <select className={selectCls} value={p.training_age} onChange={e => u({ training_age: e.target.value })}>
          {TRAINING_AGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </Field>
      <Field label={`Training Frequency: ${p.frequency} days/week`}>
        <input type="range" min={1} max={7} value={p.frequency} onChange={e => u({ frequency: +e.target.value })}
          className="w-full accent-accent" />
        <div className="flex justify-between text-xs text-text-muted font-mono">
          {[1,2,3,4,5,6,7].map(n => <span key={n} className={n === p.frequency ? "text-accent" : ""}>{n}</span>)}
        </div>
      </Field>
      <Field label="Average Session Duration">
        <div className="flex flex-wrap gap-2">
          {SESSION_DURATION_OPTIONS.map(o => (
            <button key={o.value} onClick={() => u({ session_duration: o.value })}
              className={`px-4 py-2.5 rounded-lg text-sm border transition-colors ${p.session_duration === o.value ? "border-accent text-accent bg-accent-dim" : "border-border text-text-secondary hover:border-border-hover"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Equipment Access">
        <div className="grid grid-cols-2 gap-3">
          {EQUIPMENT_OPTIONS.map(o => (
            <button key={o.value} onClick={() => u({ equipment: o.value })}
              className={`p-4 rounded-lg border text-left transition-colors ${p.equipment === o.value ? "border-accent bg-accent-dim" : "border-border hover:border-border-hover"}`}>
              <span className="text-xl mb-1 block">{o.icon}</span>
              <span className={`text-sm ${p.equipment === o.value ? "text-accent" : "text-text-secondary"}`}>{o.label}</span>
            </button>
          ))}
        </div>
      </Field>
      <Field label="Current Program" optional>
        <textarea className={`${inputCls} h-20 resize-none`} value={p.current_program} placeholder="What are you currently running?"
          onChange={e => u({ current_program: e.target.value })} />
      </Field>
    </div>
  );
}

/* ── Step 3 ─── */
function Step3({ p, u }: { p: Profile; u: (k: Partial<Profile>) => void }) {
  return (
    <div className="space-y-6">
      <Field label="Primary Goal">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GOAL_OPTIONS.map(g => (
            <button key={g.value} onClick={() => u({ goal_primary: g.value })}
              className={`p-4 rounded-lg border text-left transition-all ${p.goal_primary === g.value ? "border-accent bg-accent-dim shadow-accent-glow-sm" : "border-border hover:border-border-hover"}`}>
              <span className="text-2xl mb-2 block">{g.icon}</span>
              <span className={`text-sm font-medium block ${p.goal_primary === g.value ? "text-accent" : "text-text-primary"}`}>{g.label}</span>
              <span className="text-xs text-text-muted block mt-1">{g.desc}</span>
            </button>
          ))}
        </div>
      </Field>
      <Field label="Secondary Goal" optional>
        <select className={selectCls} value={p.goal_secondary} onChange={e => u({ goal_secondary: e.target.value })}>
          <option value="">None</option>
          {GOAL_OPTIONS.filter(g => g.value !== p.goal_primary).map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
        </select>
      </Field>
      <Field label="Specific Target" optional>
        <input className={inputCls} value={p.target_description} placeholder={`e.g. "Bench 225lbs" or "Add 2 inches to arms"`}
          onChange={e => u({ target_description: e.target.value })} />
      </Field>
      <Field label="Timeline">
        <div className="flex flex-wrap gap-2">
          {TIMELINE_OPTIONS.map(o => (
            <button key={o.value} onClick={() => u({ timeline: o.value })}
              className={`px-4 py-2.5 rounded-lg text-sm border transition-colors ${p.timeline === o.value ? "border-accent text-accent bg-accent-dim" : "border-border text-text-secondary hover:border-border-hover"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

/* ── Step 4 ─── */
function Step4({ p, u }: { p: Profile; u: (k: Partial<Profile>) => void }) {
  return (
    <div className="space-y-6">
      <Field label="Average Sleep">
        <div className="flex flex-wrap gap-2">
          {SLEEP_OPTIONS.map(o => (
            <button key={o.value} onClick={() => u({ sleep: o.value })}
              className={`px-4 py-2.5 rounded-lg text-sm border transition-colors ${p.sleep === o.value ? "border-accent text-accent bg-accent-dim" : "border-border text-text-secondary"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </Field>
      <Field label={`Daily Stress Level: ${p.stress}/10`}>
        <input type="range" min={1} max={10} value={p.stress} onChange={e => u({ stress: +e.target.value })} className="w-full accent-accent" />
        <div className="flex justify-between text-xs text-text-muted"><span>Chill</span><span>Overwhelmed</span></div>
      </Field>
      <Field label="Diet Approach">
        <div className="flex flex-wrap gap-2">
          {DIET_OPTIONS.map(o => (
            <button key={o.value} onClick={() => u({ diet: o.value })}
              className={`px-4 py-2.5 rounded-lg text-sm border transition-colors ${p.diet === o.value ? "border-accent text-accent bg-accent-dim" : "border-border text-text-secondary"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Estimated Daily Protein">
        <div className="flex flex-wrap gap-2">
          {PROTEIN_OPTIONS.map(o => (
            <button key={o.value} onClick={() => u({ protein_intake: o.value })}
              className={`px-4 py-2.5 rounded-lg text-sm border transition-colors ${p.protein_intake === o.value ? "border-accent text-accent bg-accent-dim" : "border-border text-text-secondary"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Current Cardio">
        <div className="flex flex-wrap gap-2">
          {CARDIO_OPTIONS.map(o => (
            <button key={o.value} onClick={() => u({ cardio: o.value })}
              className={`px-4 py-2.5 rounded-lg text-sm border transition-colors ${p.cardio === o.value ? "border-accent text-accent bg-accent-dim" : "border-border text-text-secondary"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

/* ── Step 5 ─── */
function Step5({ p, u }: { p: Profile; u: (k: Partial<Profile>) => void }) {
  const toggleArr = (arr: string[], val: string) => arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
  return (
    <div className="space-y-6">
      <Field label="Preferred Split">
        <div className="flex flex-wrap gap-2">
          {SPLIT_OPTIONS.map(o => (
            <button key={o.value} onClick={() => u({ preferred_split: o.value })}
              className={`px-4 py-2.5 rounded-lg text-sm border transition-colors ${p.preferred_split === o.value ? "border-accent text-accent bg-accent-dim" : "border-border text-text-secondary"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Favorite Exercises" optional>
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1">
          {COMMON_EXERCISES.map(ex => (
            <button key={ex} onClick={() => u({ favorite_exercises: toggleArr(p.favorite_exercises, ex) })}
              className={`px-2.5 py-1.5 rounded text-xs border transition-colors ${p.favorite_exercises.includes(ex) ? "border-accent text-accent bg-accent-dim" : "border-border text-text-muted hover:text-text-secondary"}`}>
              {ex}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Exercises to Avoid" optional>
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1">
          {COMMON_EXERCISES.map(ex => (
            <button key={ex} onClick={() => u({ avoid_exercises: toggleArr(p.avoid_exercises, ex) })}
              className={`px-2.5 py-1.5 rounded text-xs border transition-colors ${p.avoid_exercises.includes(ex) ? "border-ff-red text-ff-red bg-red-500/10" : "border-border text-text-muted hover:text-text-secondary"}`}>
              {ex}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Priority Muscle Groups">
        <div className="flex flex-wrap gap-2">
          {MUSCLE_GROUPS.map(mg => (
            <button key={mg.value} onClick={() => u({ priority_muscles: toggleArr(p.priority_muscles, mg.value) })}
              className={`px-3 py-2 rounded-lg text-sm border transition-colors`}
              style={p.priority_muscles.includes(mg.value) ? { borderColor: mg.color, color: mg.color, background: `${mg.color}15` } : {}}>
              {mg.label}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Intensity Preference">
        <div className="space-y-2">
          {INTENSITY_OPTIONS.map(o => (
            <button key={o.value} onClick={() => u({ intensity_pref: o.value })}
              className={`w-full p-4 rounded-lg border text-left transition-colors ${p.intensity_pref === o.value ? "border-accent bg-accent-dim" : "border-border hover:border-border-hover"}`}>
              <span className={`text-sm font-medium block ${p.intensity_pref === o.value ? "text-accent" : "text-text-primary"}`}>{o.label}</span>
              <span className="text-xs text-text-muted">{o.desc}</span>
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

/* ── Review ─── */
function Review({ p }: { p: Profile }) {
  const sections = [
    { title: "Body Stats", items: [`Age: ${p.age}`, `Sex: ${p.sex}`, `Height: ${p.height_cm}cm`, `Weight: ${p.weight_kg}kg`, p.body_fat ? `Body Fat: ${p.body_fat}%` : null, p.injuries.length ? `Injuries: ${p.injuries.join(", ")}` : null].filter(Boolean) },
    { title: "Training", items: [`Experience: ${p.training_age}`, `Frequency: ${p.frequency}×/week`, `Duration: ${p.session_duration} min`, `Equipment: ${p.equipment}`] },
    { title: "Goals", items: [`Primary: ${p.goal_primary}`, p.goal_secondary ? `Secondary: ${p.goal_secondary}` : null, p.target_description ? `Target: ${p.target_description}` : null, `Timeline: ${p.timeline}`].filter(Boolean) },
    { title: "Recovery", items: [`Sleep: ${p.sleep}`, `Stress: ${p.stress}/10`, `Diet: ${p.diet}`, `Protein: ${p.protein_intake}`, `Cardio: ${p.cardio}`] },
    { title: "Preferences", items: [`Split: ${p.preferred_split}`, p.priority_muscles.length ? `Priority: ${p.priority_muscles.join(", ")}` : null, `Intensity: ${p.intensity_pref}`].filter(Boolean) },
  ];
  return (
    <div className="space-y-4">
      <p className="text-text-secondary text-sm mb-4">Review your profile before generating your program.</p>
      {sections.map((s, i) => (
        <Card key={i} hover={false} className="p-4">
          <h4 className="font-heading font-bold text-sm uppercase text-accent mb-2">{s.title}</h4>
          <div className="space-y-1">{s.items.map((item, j) => <p key={j} className="text-sm text-text-secondary">{item}</p>)}</div>
        </Card>
      ))}
    </div>
  );
}

/* ── Main Page ─── */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>({ ...defaultProfile });
  const [loading, setLoading] = useState(false);
  const isReview = step === STEPS.length;

  const update = (partial: Partial<Profile>) => setProfile(prev => ({ ...prev, ...partial }));

  const handleSubmit = async () => {
    setLoading(true);
    // Store profile in sessionStorage for the generating page
    sessionStorage.setItem("ff_profile", JSON.stringify(profile));
    router.push("/generating");
  };

  return (
    <div className="min-h-screen bg-base flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-base/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="font-heading font-bold text-sm uppercase tracking-wider">FormForge</span>
          </div>
          <span className="font-mono text-xs text-text-muted">{isReview ? "REVIEW" : `STEP ${step + 1}/${STEPS.length}`}</span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1 bg-elevated">
        <div className="h-full bg-accent transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ width: `${((step + 1) / (STEPS.length + 1)) * 100}%` }} />
      </div>

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto px-6 py-8 w-full">
        <h2 className="font-heading font-bold text-2xl uppercase mb-2">
          {isReview ? "Review Your Profile" : STEPS[step]}
        </h2>
        <p className="text-text-muted text-sm mb-8">
          {isReview ? "Everything look correct?" : `Step ${step + 1} of ${STEPS.length}`}
        </p>

        <div className="mb-8">
          {step === 0 && <Step1 p={profile} u={update} />}
          {step === 1 && <Step2 p={profile} u={update} />}
          {step === 2 && <Step3 p={profile} u={update} />}
          {step === 3 && <Step4 p={profile} u={update} />}
          {step === 4 && <Step5 p={profile} u={update} />}
          {isReview && <Review p={profile} />}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="ghost" onClick={() => step > 0 ? setStep(step - 1) : router.push("/")} disabled={loading}>
            <ChevronLeft className="w-4 h-4 mr-1" /> {step === 0 ? "Home" : "Back"}
          </Button>
          {isReview ? (
            <Button onClick={handleSubmit} loading={loading}>
              <Check className="w-4 h-4 mr-2" /> Generate Program
            </Button>
          ) : (
            <Button onClick={() => setStep(step + 1)}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
