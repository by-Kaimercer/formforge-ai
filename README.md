<p align="center">
  <img src="https://img.shields.io/badge/⚡-FormForge-C8FF00?style=for-the-badge&labelColor=080808" alt="FormForge" />
</p>

<h1 align="center">FormForge</h1>

<p align="center">
  <strong>AI-powered workout programs built on real exercise science — not templates.</strong>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/Features-6-C8FF00?style=flat-square&labelColor=111111" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-Auth_%2B_DB-3FCF8E?style=flat-square&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq-Llama_3.1_70B-F55036?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-C8FF00?style=flat-square&labelColor=111111" />
</p>

<br />

<p align="center">
  <em>Scientific training programs backed by Schoenfeld, Israetel, Helms, Nuckols & the NSCA.<br/>Tailored to your body, goals, equipment, and experience — in under 60 seconds.</em>
</p>

---

## 🧬 What is FormForge?

Most workout generators spit out random exercises. **FormForge is different.**

It's a full-stack SaaS that uses AI grounded in peer-reviewed exercise science to generate **truly personalized, periodized training programs**. Think of it as having a PhD-level strength coach in your browser — one that respects your injuries, matches your equipment, and programs deloads like a professional.

> **One free program. No credit card. No generic templates. Real science.**

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🧠 Science-First Programming
MEV / MAV / MRV volume landmarks, RIR autoregulation, and structured periodization — pulled directly from peer-reviewed hypertrophy and strength research.

</td>
<td width="50%">

### 🛡️ Injury-Aware Generation
Flag your limitations during onboarding. The AI **never** prescribes movements that conflict with your injury history. Bad knees? Zero deep knee flexion under load.

</td>
</tr>
<tr>
<td width="50%">

### 🏋️ Equipment Matched
Home gym with just dumbbells? Bodyweight only? Resistance bands? Every single exercise is validated against your exact setup — no barbell movements for a dumbbell-only home gym.

</td>
<td width="50%">

### 📊 Progress Tracking *(Pro)*
Log every set, track volume per muscle group over time, and spot overreaching patterns before they derail your progress. Visual charts powered by Recharts.

</td>
</tr>
<tr>
<td width="50%">

### 💬 AI Coaching Chat *(Pro)*
Ask your AI coach anything — swap exercises, adjust for missed sessions, get form cues, or deep-dive into the science behind your program. Context-aware with full access to your profile.

</td>
<td width="50%">

### 📅 Periodized Deloads
Programmed deload weeks with 40-50% volume reduction. Built into every mesocycle — not an afterthought. Accumulation → intensification → deload, just like a real coach designs it.

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│  Next.js 16 (App Router) · React 19 · Tailwind CSS 3       │
│  Framer Motion · Recharts · Lucide Icons                    │
├─────────────────────────────────────────────────────────────┤
│                        API LAYER                            │
│  /api/generate-program  →  Groq AI (Llama 3.1 70B)         │
│  /api/chat              →  Groq AI + RAG Context           │
│  /api/create-checkout   →  Stripe Checkout Sessions         │
│  /api/webhook           →  Stripe Webhook Handler           │
├─────────────────────────────────────────────────────────────┤
│                        BACKEND                              │
│  Supabase (Auth + PostgreSQL + RLS)                         │
│  Stripe (Subscriptions + Billing)                           │
│  Groq SDK (LLM Inference)                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧪 How the AI Works

FormForge doesn't just call an LLM and hope for the best. The generation pipeline uses **RAG (Retrieval-Augmented Generation)** with a structured knowledge base:

| Component | What It Does |
|-----------|-------------|
| **System Prompt** | Encodes the complete methodology of Schoenfeld, Israetel, Helms, Nuckols, Nippard & NSCA guidelines |
| **Profile Context** | Injects your full onboarding data — body stats, injuries, equipment, goals, recovery, preferences |
| **Output Schema** | Enforces strict JSON structure with exercises, sets, rep ranges, RIR targets, rest periods, coaching cues, and substitutes |
| **Validation Rules** | Equipment matching, injury filtering, volume landmark compliance, split optimization by training age |

**The AI follows 10 hard rules** — including compound-first sequencing, strict equipment matching, injury respect, and mandatory deload programming.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**

### 1. Clone & Install

```bash
git clone https://github.com/by-Kaimercer/formforge.git
cd formforge
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Fill in your keys (see [Environment Variables](#-environment-variables) below).

### 3. Run

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — you're live.

---

## 🎭 Demo Mode

**No API keys? No problem.** FormForge runs out-of-the-box in demo mode:

- ✅ Full landing page with all sections
- ✅ Complete 5-step onboarding flow
- ✅ AI loading screen with realistic animations
- ✅ Generates a mock 4-week Upper/Lower split program
- ✅ AI coaching chat with demo responses
- ✅ All pages fully navigable

> Perfect for evaluating the UI/UX or contributing without setting up external services.

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

| Variable | Required | Description | Source |
|----------|----------|-------------|--------|
| `GROQ_API_KEY` | For AI | LLM inference key | [console.groq.com](https://console.groq.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | For auth/db | Supabase project URL | [supabase.com](https://supabase.com) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For auth/db | Public anonymous key | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | For server ops | Service role key | Supabase Dashboard → Settings → API |
| `STRIPE_SECRET_KEY` | For payments | Secret API key | [stripe.com](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | For webhooks | Webhook signing secret | Stripe CLI |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For checkout | Publishable key | Stripe Dashboard |
| `NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID` | For pricing | Monthly price ID | Stripe Products |
| `NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID` | For pricing | Annual price ID | Stripe Products |
| `NEXT_PUBLIC_APP_URL` | Yes | Base URL | `http://localhost:3000` |

---

## 🗄️ Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Open the **SQL Editor** and run the migration:

```sql
-- Run the contents of supabase/schema.sql
-- Creates: users, profiles, programs, workouts tables
-- Enables: RLS policies, auto-user creation trigger, indexes
```

3. Enable **Email/Password** auth in Authentication → Providers
4. *(Optional)* Enable **Google OAuth** in Authentication → Providers
5. Copy your project URL + anon key to `.env.local`

### Database Schema

```
users             profiles          programs          workouts
├── id (PK)       ├── id (PK)       ├── id (PK)       ├── id (PK)
├── email         ├── user_id (FK)  ├── user_id (FK)  ├── user_id (FK)
├── plan          ├── age, sex      ├── program_json   ├── program_id (FK)
├── stripe_*      ├── injuries[]    ├── slug (unique)  ├── week_number
└── created_at    ├── goals         ├── split          ├── day_number
                  ├── recovery      ├── is_active      └── exercises_json
                  └── preferences   └── created_at
```

> All tables have **Row Level Security** enabled — users can only access their own data.

---

## 💳 Stripe Setup

1. Create two products in your [Stripe Dashboard](https://dashboard.stripe.com):
   - **Pro Monthly**: `$12/month`
   - **Pro Annual**: `$99/year` *(30% savings)*
2. Copy the Price IDs to your `.env.local`
3. For local webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

---

## 📁 Project Structure

```
formforge/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing page (Hero, Features, Pricing, FAQ)
│   │   ├── layout.tsx                # Root layout + fonts
│   │   ├── globals.css               # Global styles + design tokens
│   │   ├── onboarding/               # 5-step clinical intake form
│   │   ├── generating/               # AI loading screen with progress
│   │   ├── program/[id]/             # Program viewer (exercises, volume, cues)
│   │   ├── dashboard/                # User home — active programs
│   │   ├── tracker/                  # Workout logger (Pro)
│   │   ├── chat/                     # AI coaching chat (Pro)
│   │   ├── settings/                 # Profile + billing management
│   │   └── api/
│   │       ├── generate-program/     # POST → Groq AI → structured program JSON
│   │       ├── chat/                 # POST → Groq AI + RAG context
│   │       ├── create-checkout/      # POST → Stripe checkout session
│   │       └── webhook/             # POST → Stripe event handler
│   ├── components/
│   │   ├── Navbar.tsx                # Global navigation
│   │   └── ui/
│   │       ├── Button.tsx            # Design system button
│   │       ├── Card.tsx              # Design system card
│   │       └── Badge.tsx             # Status badges
│   └── lib/
│       ├── types.ts                  # TypeScript interfaces (Profile, Program, etc.)
│       ├── constants.ts              # Form options, FAQ, testimonials
│       ├── mock-data.ts              # Demo mode data (18KB of realistic mock programs)
│       ├── rag.ts                    # System prompts + context builders
│       ├── groq.ts                   # Groq SDK client
│       ├── supabase.ts               # Supabase client
│       └── stripe.ts                 # Stripe client
├── supabase/
│   └── schema.sql                    # Full database migration (RLS, triggers, indexes)
├── tailwind.config.ts                # Custom design system (colors, fonts, animations)
├── package.json
└── tsconfig.json
```

---

## 🎨 Design System

FormForge uses a custom dark theme with a clinical, research-grade aesthetic:

| Token | Value | Usage |
|-------|-------|-------|
| `base` | `#080808` | Page background |
| `card` | `#111111` | Card surfaces |
| `elevated` | `#1A1A1A` | Hover states, elevated surfaces |
| `accent` | `#C8FF00` | Primary accent (acid green) |
| `accent-dim` | `rgba(200,255,0,0.08)` | Subtle accent backgrounds |

**Typography**: Barlow (headings) · DM Sans (body) · JetBrains Mono (data)

**Animations**: Fade-in-up, slide transitions, glow effects — all via Framer Motion + CSS keyframes.

---

## 💰 Pricing Model

| | Free | Pro |
|---|---|---|
| Program generations | 1 | Unlimited |
| View program online | ✅ | ✅ |
| Basic exercise info | ✅ | ✅ |
| PDF export | ❌ | ✅ |
| AI coaching chat | ❌ | ✅ |
| Progress tracker | ❌ | ✅ |
| Program tweaking | ❌ | ✅ |
| Program history | — | 10 programs |
| Price | **$0** | **$12/mo** or **$99/yr** |

---

## 🧠 Research Foundation

FormForge's AI is grounded in the work of:

- **Brad Schoenfeld** — Mechanical tension, metabolic stress, and hypertrophy mechanisms
- **Dr. Mike Israetel** — Volume landmarks (MEV/MAV/MRV), scientific programming, mesocycle design
- **Eric Helms** — RPE/RIR autoregulation, evidence-based natural bodybuilding
- **Greg Nuckols** — Strength programming, powerlifting periodization
- **Jeff Nippard** — Practical application of exercise science
- **NSCA** — Periodization models (linear, undulating, block, conjugate)

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 (App Router) | Server components, API routes, streaming |
| **Language** | TypeScript 5 | Type safety across the full stack |
| **Styling** | Tailwind CSS 3 | Utility-first with custom design tokens |
| **Animation** | Framer Motion | Smooth, physics-based micro-animations |
| **Charts** | Recharts | Volume tracking visualizations |
| **Database** | Supabase (PostgreSQL) | Auth, RLS, real-time, zero-config |
| **AI** | Groq (Llama 3.1 70B) | Fast inference, structured JSON output |
| **Payments** | Stripe | Subscriptions, checkout, webhooks |
| **Forms** | React Hook Form + Zod | Validated 5-step onboarding |
| **PDF** | @react-pdf/renderer | Program export to PDF |
| **Icons** | Lucide React | Consistent, lightweight icon set |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

> 💡 The app runs in **demo mode** without API keys — you can develop and test UI changes without any external service setup.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>Built on science, not hype.</strong><br/>
  <sub>Stop guessing. Start training.</sub>
</p>

<p align="center">
  <a href="#-quick-start"><img src="https://img.shields.io/badge/Get_Started-→-C8FF00?style=for-the-badge&labelColor=080808" /></a>
</p>
