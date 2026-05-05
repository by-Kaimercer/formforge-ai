"use client";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = "", hover = true, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-card border border-border rounded-card p-6 ${hover ? "transition-all duration-200 hover:border-accent hover:shadow-accent-glow-sm cursor-pointer" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
