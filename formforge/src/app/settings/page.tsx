"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Button, Card } from "@/components/ui";
import { User, CreditCard, LogOut, Trash2, Zap, Shield, Mail, Gift, Users } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("free");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      setEmail(data.user.email || "");
      supabase
        .from("profiles")
        .select("plan")
        .eq("id", data.user.id)
        .single()
        .then(({ data: profile }) => {
          if (profile?.plan) setPlan(profile.plan);
        });
    });
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  async function handleUpgrade(priceId: string | undefined) {
    if (!priceId) return;
    setBusy(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      // fall through to reset busy state
    }
    setBusy(false);
  }

  async function handleManageBilling() {
    setBusy(true);
    try {
      const res = await fetch("/api/billing-portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      // fall through to reset busy state
    }
    setBusy(false);
  }

  const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID;
  const yearlyPriceId = process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID;
  const isPro = plan === "pro";

  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 md:px-6 pt-20 pb-24 md:pb-12 md:pl-72">
        <h1 className="font-heading font-[800] text-2xl md:text-4xl uppercase mb-8">Settings</h1>

        {/* Profile */}
        <Card hover={false} className="mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent-dim border border-accent/20 flex items-center justify-center">
              <User className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg uppercase">{email.split("@")[0] || "User"}</h2>
              <p className="text-text-muted text-sm flex items-center gap-1">
                <Mail className="w-3 h-3" /> {email || "—"}
              </p>
            </div>
          </div>
        </Card>

        {/* Subscription */}
        <Card hover={false} className="mb-4 border-accent/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-accent" />
              <div>
                <h3 className="font-heading font-bold text-base uppercase">Subscription</h3>
                <p className="text-text-secondary text-sm">
                  Currently on <span className="text-accent font-mono font-bold">{plan.toUpperCase()}</span> plan
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-accent bg-accent-dim px-3 py-1.5 rounded">
              {plan.toUpperCase()}
            </span>
          </div>
          {isPro ? (
            <Button variant="ghost" className="text-xs" onClick={handleManageBilling} disabled={busy}>
              <Shield className="w-3 h-3 mr-1" />{busy ? "Loading…" : "Manage Billing"}
            </Button>
          ) : (
            <div className="bg-elevated rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-accent" />
                <span className="font-heading font-bold text-sm uppercase text-accent">Upgrade to Pro</span>
              </div>
              <p className="text-text-secondary text-xs mb-3">
                Unlimited programs, AI coaching, progress tracker, PDF export, and more.
              </p>
              <div className="flex items-center gap-3">
                <Button className="text-xs" onClick={() => handleUpgrade(monthlyPriceId)} disabled={busy}>
                  $12/month
                </Button>
                <Button
                  variant="secondary"
                  className="text-xs"
                  onClick={() => handleUpgrade(yearlyPriceId)}
                  disabled={busy}
                >
                  $99/year — Save 30%
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Referrals */}
        <Card hover={false} className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-5 h-5 text-accent" />
            <div>
              <h3 className="font-heading font-bold text-base uppercase">Refer a Friend</h3>
              <p className="text-text-secondary text-sm">
                Get <span className="text-accent font-bold">100 Points</span> (1 full Level) when they sign up!
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={`https://formforge.fit/ref?by=${email.split("@")[0] || "athlete"}`}
              className="flex-1 bg-elevated border border-border rounded-lg px-3 py-2 font-mono text-xs text-text-secondary select-all focus:outline-none"
            />
            <Button
              className="text-xs px-4"
              onClick={() => {
                navigator.clipboard.writeText(`https://formforge.fit/ref?by=${email.split("@")[0] || "athlete"}`);
                alert("Referral link copied!");
              }}
            >
              Copy Link
            </Button>
          </div>
        </Card>

        {/* Account Actions */}
        <Card hover={false} className="mb-4">
          <h3 className="font-heading font-bold text-base uppercase mb-4">Account</h3>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start text-text-secondary" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />Sign Out
            </Button>
            <Button variant="ghost" className="w-full justify-start text-ff-red">
              <Trash2 className="w-4 h-4 mr-2" />Delete Account
            </Button>
          </div>
        </Card>

        <p className="text-text-muted text-xs text-center mt-8 font-mono">FormForge v1.0 · Built on science, not hype.</p>
      </main>
    </div>
  );
}
