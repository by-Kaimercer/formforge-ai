"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui";
import { createClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
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
          Welcome Back
        </h1>
        <p className="text-text-secondary text-sm text-center mb-8">
          Sign in to your account
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
              placeholder="••••••••"
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-ff-red font-mono bg-ff-red/10 border border-ff-red/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button className="w-full" loading={loading} disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-accent hover:brightness-110 transition-all"
          >
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
