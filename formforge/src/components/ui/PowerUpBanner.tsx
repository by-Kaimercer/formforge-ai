"use client";
import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { isWeekend } from "@/lib/userStats";

export default function PowerUpBanner() {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!isWeekend()) return;
    setVisible(true);

    const updateTimer = () => {
      const now = new Date();
      // End of Sunday 23:59:59
      const endOfSunday = new Date(now);
      const daysUntilSunday = 7 - now.getDay(); // 0 if Sunday
      endOfSunday.setDate(now.getDate() + daysUntilSunday);
      endOfSunday.setHours(23, 59, 59, 999);

      const diff = endOfSunday.getTime() - now.getTime();
      if (diff <= 0) {
        setVisible(false);
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 flex items-center gap-3 animate-fade-in-up">
      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
        <Zap className="w-4 h-4 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-accent">
          Weekend Power-Up Active
        </p>
        <p className="text-xs text-text-secondary">
          Earn <span className="text-accent font-mono font-bold">2×</span> points on every set. Ends Sunday 23:59.
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-mono text-lg font-bold text-accent">{timeLeft}</p>
        <p className="text-[10px] text-text-muted uppercase">remaining</p>
      </div>
    </div>
  );
}
