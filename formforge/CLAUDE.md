# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Quick Start

```bash
npm install
npm run dev
# Navigate to http://localhost:3000 — app runs in demo mode without API keys
```

---

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Next.js dev server (hot reload) |
| `npm run build` | Production build (outputs to `.next/`) |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint on source files |

**Demo Mode**: App fully functional without `.env.local` — generates mock programs, chat responses, and all UI renders. Perfect for developing features without external services.

---

## Project Overview

**FormForge** is an AI-powered SaaS for generating personalized, science-backed workout programs. Users answer a 5-step onboarding form; Groq AI (Llama 3.1 70B) generates a periodized program respecting injuries, equipment, and training age. Pro tier unlocks unlimited generations, AI coaching chat, PDF export, progress tracking, and program history.

**Tech Stack**:
- **Frontend**: Next.js 16.2 (App Router), React 19, TypeScript 5, Tailwind CSS 3, Framer Motion
- **AI**: Groq SDK (Llama 3.1 70B Versatile) via `/api/generate-program` and `/api/chat`
- **Auth & DB**: Supabase (PostgreSQL + RLS via `@supabase/ssr`)
- **Payments**: Stripe (checkout sessions, webhook handler)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts (imported, not yet wired to UI)
- **PDF Export**: @react-pdf/renderer (imported, button is UI stub)
- **Fonts**: Barlow Condensed (headings), DM Sans (body), JetBrains Mono (code/data)

**Pricing Model**: Free (1 program, view online) | Pro ($12/mo or $99/yr: unlimited, PDF, AI chat, tracker, history)

---

## Architecture & File Structure

### Pages (App Router)
```
src/app/
├── page.tsx                      # Landing (Hero, HowItWorks, Features, Testimonials, Pricing, FAQ)
├── onboarding/page.tsx           # 5-step clinical intake form → sessionStorage
├── generating/page.tsx           # AI loading screen (calls POST /api/generate-program)
├── program/[id]/page.tsx         # Program viewer (tabs by week, accordion by day, exercise rows)
├── dashboard/page.tsx            # User home (stats hardcoded, today's workout, quick actions)
├── tracker/page.tsx              # Set-by-set workout logger (Pro only)
├── chat/page.tsx                 # AI coaching chat interface (Pro only)
├── settings/page.tsx             # Profile + billing (currently shows hardcoded demo data)
├── auth/
│   ├── login/page.tsx            # Email/password + Google OAuth
│   ├── signup/page.tsx           # Email/password signup
│   └── callback/route.ts         # OAuth callback handler
└── api/
    ├── generate-program/route.ts # POST: Groq → program JSON → Supabase save (or mock)
    ├── chat/route.ts             # POST: Groq coaching chat (context-aware if profile/program sent)
    ├── create-checkout/route.ts  # POST: Stripe checkout session
    └── webhook/route.ts          # POST: Stripe webhook (currently stubs — no DB updates)
```

### Core Libraries
```
src/lib/
├── types.ts                      # TypeScript interfaces (User, Profile, Exercise, Program, etc.)
├── constants.ts                  # Form options (training_age, equipment, goals), FAQ, testimonials
├── mock-data.ts                  # 4-week Upper/Lower split + week/day/exercise structure (18KB)
├── rag.ts                        # System prompts: SYSTEM_PROMPT_GENERATE, SYSTEM_PROMPT_CHAT
├── groq.ts                       # Groq SDK setup: generateProgram(), chatWithCoach(), getExerciseSubstitutes()
├── supabase.ts                   # Shared Supabase client (SSR + CSR)
├── supabase-browser.ts           # Browser client creation
├── supabase-server.ts            # Server client creation
└── stripe.ts                     # Stripe SDK setup
```

### Components
```
src/components/
├── Navbar.tsx                    # Global navigation (demo-aware)
└── ui/
    ├── Button.tsx                # Design system button
    ├── Card.tsx                  # Design system card container
    ├── Badge.tsx                 # Status badges (RIR levels, etc.)
    └── index.ts                  # Exports
```

### Database & Config
```
supabase-schema.sql              # Full migration: users, profiles, programs, workouts + RLS
supabase/schema.sql              # Duplicate of above
.env.example                      # Environment template
tailwind.config.ts               # Design tokens (colors, fonts, spacing, animations)
next.config.ts                   # Empty config (no custom rewrites/redirects yet)
```

---

## Key Data Flows

### Program Generation
1. User completes onboarding form (5 steps, validated by Zod) → stored in `sessionStorage`
2. Click "Generate Program" → POST `/api/generate-program` with serialized `Profile`
3. Groq receives `SYSTEM_PROMPT_GENERATE` + user profile context
4. Returns strict JSON: weeks → days → exercises with sets, reps, RIR, rest, cues
5. If logged in: save to `programs` table; otherwise fallback to mock data
6. Redirect to `/program/[id]` to view result

### AI Coaching Chat
1. User types question in `/chat`
2. POST `/api/chat` with messages array + profile context + program context
3. Groq receives `SYSTEM_PROMPT_CHAT` + injected profile + program JSON
4. Responds with context-aware coaching advice
5. **Gotcha**: Chat page does NOT currently send profile/program — API receives empty context

### Stripe Webhook
1. User subscribes via POST `/api/create-checkout` → Stripe checkout session
2. Stripe handles payment, sends webhook to `/api/webhook`
3. **Gotcha**: Webhook route exists but is a stub — doesn't update `profiles.plan` to "pro"
4. Result: Paid users stay in free tier (no Pro features accessible)

---

## Critical Implementation Gaps

These are not bugs to fix immediately, but important context for future work:

1. **Middleware Misnamed** (`proxy.ts` should be `middleware.ts`) — route protection is inactive
2. **Webhook Stubs** — Stripe payments received but user billing status not updated in DB
3. **Settings/Dashboard Hardcoded** — Show demo data, not real user profile
4. **Chat Missing Context** — No profile/program data sent to AI
5. **Dashboard Stats Hardcoded** — All zeros; no queries to `workouts` table
6. **PDF Export Stub** — Button exists, no implementation
7. **Recharts Not Wired** — Imported, no chart components rendered
8. **Duplicate Schema Files** — `supabase-schema.sql` (root) and `supabase/schema.sql` (same content)

---

## Database Schema

**Tables** (all with RLS enabled):
- `users` — auth user identity (id, email, plan, stripe_customer_id, stripe_subscription_id, created_at)
- `profiles` — onboarding data (age, sex, height, weight, body_fat, injuries, training_age, equipment, goals, sleep, stress, diet, etc.)
- `programs` — AI-generated programs (user_id, program_json JSONB, slug unique, split, is_active, created_at)
- `workouts` — logged sessions (user_id, program_id, week_number, day_number, exercises_json JSONB)

**Key Features**:
- Auto-create profile row on signup via trigger
- All tables enforce: users can only read/write their own rows
- `programs.slug` unique constraint allows shareable URLs

---

## Design System

Custom dark theme with clinical aesthetic:

| Token | Value | Use |
|-------|-------|-----|
| `base` | `#080808` | Page background |
| `card` | `#111111` | Card surfaces |
| `elevated` | `#1A1A1A` | Hover, elevated elements |
| `accent` | `#C8FF00` | Primary (acid green) |
| `accent-dim` | `rgba(200,255,0,0.08)` | Subtle backgrounds |
| `text-primary` | `#F0F0F0` | Main text |
| `text-secondary` | `#888888` | Secondary text |
| `text-muted` | `#444444` | Disabled, hints |
| `muscle.chest`, `back`, `legs`, `shoulders`, `arms`, `core` | Assigned colors | Volume chart colors |

**Animations**: Fade-in-up, slide transitions, glow effects via Framer Motion + Tailwind.

---

## Environment Variables

Create `.env.local` in project root (see `.env.example` for template):

```bash
# AI (Groq — free tier at console.groq.com)
GROQ_API_KEY=your-key-here

# Auth & Database (Supabase — supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# Payments (Stripe — dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Demo mode**: Omit keys and app still works — generates mock programs, hardcoded chat responses, all pages navigate.

---

## TypeScript Paths

```json
"@/*": ["./src/*"]
```

Use `@/lib`, `@/components`, etc. for imports.

---

## Next.js 16 Breaking Changes

See `AGENTS.md` — Next.js 16 has breaking changes from earlier versions. Consult `node_modules/next/dist/docs/` before writing API routes or modifying route behavior. Key areas: middleware syntax, streaming, cookies API, image optimization.

---

## Common Patterns

### Form Validation
Onboarding form uses React Hook Form + Zod. Each step validated before advancing. Profile object spreads into `sessionStorage` and API request.

### API Route Auth
Import Supabase server client via `@supabase/ssr` for auth checks in POST handlers. Verify session before accessing user data.

### Conditional Rendering (Demo vs Logged In)
Many components check `isPro` or user session via Supabase. Demo mode skips auth — hardcoded to show all UI. Once Supabase integrated, update these to use real user plan.

### RAG Context Injection
System prompts in `rag.ts` are static; user context (profile, program JSON) injected at API call time in message payload or system message suffix.

---

## Useful References

- **Supabase Docs**: https://supabase.com/docs (auth, RLS, postgres)
- **Groq API**: https://console.groq.com/docs
- **Stripe Docs**: https://stripe.com/docs/payments (checkout, webhooks)
- **Next.js 16**: https://nextjs.org/docs (check version-specific guides)
- **Tailwind**: https://tailwindcss.com/docs
- **Recharts**: https://recharts.org/ (volume tracking charts)
- **React Hook Form**: https://react-hook-form.com/

---

**Last Updated**: 2026-06-03
