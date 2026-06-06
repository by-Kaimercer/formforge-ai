"use client";
import React from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  children: React.ReactNode;
}

const base = "inline-flex items-center justify-center font-body font-semibold rounded-lg transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const variants: Record<Variant, string> = {
  primary:   "bg-[#111111] text-white px-5 py-2.5 text-sm hover:bg-[#242424] active:bg-[#111111] shadow-sm",
  secondary: "bg-white text-[#111111] border border-[#e5e7eb] px-5 py-2.5 text-sm hover:bg-[#f8f9fa] shadow-sm",
  ghost:     "text-[#111111] px-4 py-2 text-sm hover:underline",
};

export default function Button({ variant = "primary", loading, children, className = "", ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
