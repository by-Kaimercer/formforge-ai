"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui";
import { Trophy, Crown, Medal, X } from "lucide-react";

interface LeaderboardEntry {
  user_id: string;
  username: string;
  points: number;
}

export default function Leaderboard({ onClose }: { onClose: () => void }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEntries(data);
        else {
          // Fallback demo data when API/table doesn't exist yet
          setEntries([
            { user_id: "1", username: "IronMike", points: 1420 },
            { user_id: "2", username: "SquatQueen", points: 1185 },
            { user_id: "3", username: "BenchBeast", points: 980 },
            { user_id: "4", username: "DeadliftDan", points: 875 },
            { user_id: "5", username: "GainzGuru", points: 740 },
            { user_id: "6", username: "RepRanger", points: 680 },
            { user_id: "7", username: "VolumeViking", points: 595 },
            { user_id: "8", username: "SetSlayer", points: 510 },
            { user_id: "9", username: "PressProdigy", points: 445 },
            { user_id: "10", username: "CurlCommander", points: 380 },
          ]);
        }
      })
      .catch(() => {
        // Fallback demo data
        setEntries([
          { user_id: "1", username: "IronMike", points: 1420 },
          { user_id: "2", username: "SquatQueen", points: 1185 },
          { user_id: "3", username: "BenchBeast", points: 980 },
          { user_id: "4", username: "DeadliftDan", points: 875 },
          { user_id: "5", username: "GainzGuru", points: 740 },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 1) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="font-mono text-sm text-text-muted w-5 text-center">{rank + 1}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="w-full max-w-md animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <Card hover={false} className="relative max-h-[80vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg uppercase">Leaderboard</h2>
                <p className="text-xs text-text-muted font-mono">TOP PERFORMERS THIS WEEK</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-elevated transition-colors"
              aria-label="Close leaderboard"
            >
              <X className="w-4 h-4 text-text-muted" />
            </button>
          </div>

          {/* List */}
          <div className="space-y-2 overflow-y-auto flex-1">
            {loading ? (
              <div className="py-12 text-center">
                <div className="animate-pulse text-accent font-mono text-sm">Loading...</div>
              </div>
            ) : (
              entries.map((entry, i) => (
                <div
                  key={entry.user_id}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                    i === 0
                      ? "bg-accent/10 border border-accent/20"
                      : "bg-base border border-border hover:border-border-hover"
                  }`}
                >
                  <div className="w-8 flex items-center justify-center">
                    {getRankIcon(i)}
                  </div>
                  <div className="w-9 h-9 rounded-full bg-elevated border border-border flex items-center justify-center">
                    <span className="font-heading font-bold text-xs text-text-secondary">
                      {entry.username.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm truncate ${i === 0 ? "text-accent" : "text-text-primary"}`}>
                      {entry.username}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-text-primary">{entry.points.toLocaleString()}</p>
                    <p className="text-[10px] text-text-muted uppercase">pts</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
