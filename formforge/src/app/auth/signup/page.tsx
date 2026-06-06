"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui";
import { createClient } from "@/lib/supabase-browser";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-base flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-accent-dim border border-accent/30 flex items-center justify-center mb-6">
          <Zap className="w-8 h-8 text-accent" />
        </div>
        <h1 className="font-heading font-[800] text-3xl uppercase mb-3">
          Check Your Email
        </h1>
        <p className="text-text-secondary text-sm max-w-sm">
          We sent a confirmation link to{" "}
          <span className="text-text-primary">{email}</span>. Click it to
          activate your account and start training.
        </p>
        <Link href="/auth/login" className="mt-8">
          <Button variant="ghost">Back to Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center px-6">
      <Link href="/" className="flex items-center gap-2 mb-12">
        <Zap className="w-6 h-6 text-accent" />
        <span className="font-heading font-bold text-xl uppercase tracking-wider text-text-primary">
          FormForge
        </span>
      </Link>

      <div className="w-full max-w-sm">
        <h1 className="font-heading font-[800] text-3xl uppercase text-center mb-2 text-[#111111]">
          Create Account
        </h1>
        <p className="text-text-secondary text-sm text-center mb-8">
          Your first program is free — no credit card needed
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-text-muted uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-muted uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Min. 8 characters"
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-ff-red font-mono bg-ff-red/10 border border-ff-red/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button className="w-full" loading={loading} disabled={loading}>
            {loading ? "Creating account…" : "Get Started Free"}
          </Button>
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-accent hover:brightness-110 transition-all"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
