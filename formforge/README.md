# FormForge — AI-Powered Workout Program Generator

> Scientific training programs built on research from Schoenfeld, Israetel, Helms, Nuckols & the NSCA. Not another generic workout generator.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Mode

The app works out-of-the-box without any API keys in **demo mode**:
- Landing page, onboarding, and all UI pages render with mock data
- Program generation returns a realistic 4-week Upper/Lower split
- Chat returns demo responses
- All pages are fully navigable

## Environment Variables

Create a `.env.local` file with:

| Variable | Required | Source |
|----------|----------|--------|
| `GROQ_API_KEY` | For AI | [console.groq.com](https://console.groq.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | For auth/db | [supabase.com](https://supabase.com) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For auth/db | Supabase dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | For server | Supabase dashboard |
| `STRIPE_SECRET_KEY` | For payments | [stripe.com](https://stripe.com) |
| `STRIPE_WEBHOOK_SECRET` | For webhooks | Stripe CLI |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For checkout | Stripe dashboard |
| `NEXT_PUBLIC_APP_URL` | Required | `http://localhost:3000` |

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL migration in `supabase/schema.sql` via the SQL Editor
3. Enable Email/Password auth in Authentication → Providers
4. (Optional) Enable Google OAuth in Authentication → Providers
5. Copy your project URL and anon key to `.env.local`

## Stripe Setup

1. Create products in Stripe Dashboard:
   - Pro Monthly: $12/month
   - Pro Annual: $99/year
2. Copy the Price IDs to `.env.local`
3. For webhooks locally: `stripe listen --forward-to localhost:3000/api/webhook`

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v3
- **Database + Auth**: Supabase
- **AI**: Groq API (Llama 3.1 70B)
- **Payments**: Stripe
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── onboarding/           # 5-step intake form
│   ├── generating/           # AI loading screen
│   ├── program/[id]/         # Program viewer
│   ├── dashboard/            # User home
│   ├── tracker/              # Workout logger (Pro)
│   ├── chat/                 # AI coaching (Pro)
│   ├── settings/             # Profile + billing
│   └── api/
│       ├── generate-program/ # AI program generation
│       ├── chat/             # AI coaching chat
│       ├── create-checkout/  # Stripe checkout
│       └── webhook/          # Stripe webhooks
├── components/
│   ├── Navbar.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Badge.tsx
└── lib/
    ├── types.ts              # TypeScript interfaces
    ├── constants.ts          # Static data
    ├── mock-data.ts          # Demo mode data
    ├── supabase.ts           # DB client
    ├── groq.ts               # AI integration
    ├── stripe.ts             # Payments
    └── rag.ts                # Context injection
```
