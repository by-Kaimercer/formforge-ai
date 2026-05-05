"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { Button, Card } from "@/components/ui";
import { User, CreditCard, LogOut, Trash2, Zap, Shield, Mail } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 md:px-6 pt-20 pb-24 md:pb-12">
        <h1 className="font-heading font-[800] text-2xl md:text-4xl uppercase mb-8">Settings</h1>

        {/* Profile */}
        <Card hover={false} className="mb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-accent-dim border border-accent/20 flex items-center justify-center">
              <User className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg uppercase">Demo User</h2>
              <p className="text-text-muted text-sm flex items-center gap-1"><Mail className="w-3 h-3" /> demo@formforge.app</p>
            </div>
          </div>
          <Button variant="secondary" className="text-xs">Edit Profile</Button>
        </Card>

        {/* Subscription */}
        <Card hover={false} className="mb-4 border-accent/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-accent" />
              <div>
                <h3 className="font-heading font-bold text-base uppercase">Subscription</h3>
                <p className="text-text-secondary text-sm">Currently on <span className="text-accent font-mono font-bold">FREE</span> plan</p>
              </div>
            </div>
            <span className="font-mono text-xs text-accent bg-accent-dim px-3 py-1.5 rounded">FREE</span>
          </div>
          <div className="bg-elevated rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-accent" />
              <span className="font-heading font-bold text-sm uppercase text-accent">Upgrade to Pro</span>
            </div>
            <p className="text-text-secondary text-xs mb-3">Unlimited programs, AI coaching, progress tracker, PDF export, and more.</p>
            <div className="flex items-center gap-3">
              <Button className="text-xs">$12/month</Button>
              <Button variant="secondary" className="text-xs">$99/year — Save 30%</Button>
            </div>
          </div>
          <Button variant="ghost" className="text-xs"><Shield className="w-3 h-3 mr-1" />Manage Billing</Button>
        </Card>

        {/* Account Actions */}
        <Card hover={false} className="mb-4">
          <h3 className="font-heading font-bold text-base uppercase mb-4">Account</h3>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start text-text-secondary">
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
