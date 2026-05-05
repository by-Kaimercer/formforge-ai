"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { LOADING_MESSAGES } from "@/lib/constants";

export default function GeneratingPage() {
  const router = useRouter();
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const generate = useCallback(async () => {
    const profileStr = sessionStorage.getItem("ff_profile");
    const profile = profileStr ? JSON.parse(profileStr) : null;

    try {
      const res = await fetch("/api/generate-program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("ff_program", JSON.stringify(data.program));
        setProgress(100);
        setTimeout(() => router.push(`/program/${data.programId || "demo"}`), 500);
      } else {
        throw new Error(data.error);
      }
    } catch {
      // Fallback: still redirect with demo data
      setProgress(100);
      setTimeout(() => router.push("/program/demo"), 500);
    }
  }, [router]);

  useEffect(() => {
    generate();
  }, [generate]);

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Animate progress
  useEffect(() => {
    if (progress >= 100) return;
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 0.7, 90));
    }, 100);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center relative">
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-elevated">
        <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Center content */}
      <div className="text-center px-6">
        {/* Pulsing logo */}
        <div className="w-20 h-20 mx-auto mb-10 rounded-2xl bg-accent-dim border border-accent/30 flex items-center justify-center animate-pulse">
          <Zap className="w-10 h-10 text-accent" />
        </div>

        <h1 className="font-heading font-[800] text-3xl md:text-5xl uppercase mb-4 text-text-primary">
          Building Your Program
        </h1>

        {/* Rotating message */}
        <div className="h-8 flex items-center justify-center">
          <p key={msgIndex} className="text-text-secondary text-sm md:text-base animate-fade-in-up font-body">
            {LOADING_MESSAGES[msgIndex]}
          </p>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {LOADING_MESSAGES.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === msgIndex ? "bg-accent" : "bg-border"}`} />
          ))}
        </div>
      </div>

      {/* Bottom subtle text */}
      <p className="absolute bottom-8 text-text-muted text-xs font-mono">
        FORMFORGE ENGINE v1.0
      </p>
    </div>
  );
}
