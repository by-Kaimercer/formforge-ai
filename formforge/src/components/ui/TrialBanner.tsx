"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { Gift, X } from "lucide-react";

export default function TrialBanner() {
  const [visible, setVisible] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session or if user already has trial/pro
    const dismissed = sessionStorage.getItem("ff_trial_dismissed");
    if (dismissed) return;
    // Show after 2 seconds for a non-intrusive entrance
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("ff_trial_dismissed", "true");
  };

  const startTrial = async () => {
    setStarting(true);
    try {
      const res = await fetch("/api/trial", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        dismiss();
        // Refresh to reflect pro status
        window.location.reload();
      }
    } catch {
      // Silently fail — user might not be authenticated
    }
    setStarting(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] animate-fade-in-up">
      <div className="bg-accent/10 border-b border-accent/30 backdrop-blur-md">
        <div className="max-w-content mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Gift className="w-5 h-5 text-accent shrink-0" />
            <p className="text-sm text-text-primary truncate">
              <span className="font-bold text-accent">30-Day Free Pro Trial</span>
              <span className="hidden sm:inline"> — Unlimited programs, AI coaching, progress tracking. No credit card.</span>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button className="text-xs px-4 py-1.5" onClick={startTrial} disabled={starting}>
              {starting ? "Starting..." : "Start Free Trial"}
            </Button>
            <button
              onClick={dismiss}
              className="p-1.5 rounded hover:bg-elevated transition-colors"
              aria-label="Dismiss trial banner"
            >
              <X className="w-4 h-4 text-text-muted" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
