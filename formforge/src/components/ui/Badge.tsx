"use client";
import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "chest" | "back" | "legs" | "shoulders" | "arms" | "core" | "glutes";
  className?: string;
}

const colorMap: Record<string, string> = {
  default: "text-text-secondary bg-elevated",
  chest: "muscle-chest",
  back: "muscle-back",
  legs: "muscle-legs",
  shoulders: "muscle-shoulders",
  arms: "muscle-arms",
  core: "muscle-core",
  glutes: "muscle-glutes",
};

export function getMuscleVariant(group: string): BadgeProps["variant"] {
  const g = group.toLowerCase();
  if (g.includes("chest") || g.includes("pec")) return "chest";
  if (g.includes("back") || g.includes("lat") || g.includes("trap") || g.includes("rear delt")) return "back";
  if (g.includes("leg") || g.includes("quad") || g.includes("ham") || g.includes("calf")) return "legs";
  if (g.includes("shoulder") || g.includes("delt")) return "shoulders";
  if (g.includes("arm") || g.includes("bicep") || g.includes("tricep")) return "arms";
  if (g.includes("core") || g.includes("ab")) return "core";
  if (g.includes("glute")) return "glutes";
  return "default";
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span className={`inline-block rounded px-2.5 py-1 font-mono text-xs uppercase tracking-wide ${colorMap[variant]} ${className}`}>
      {children}
    </span>
  );
}
