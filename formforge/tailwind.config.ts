import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base:                    "#ffffff",
        card:                    "#f5f5f5",
        elevated:                "#f8f9fa",
        border:                  "#e5e7eb",
        "border-hover":          "#d1d5db",
        "surface-dark":          "#101010",
        "surface-dark-elevated": "#1a1a1a",
        accent:                  "#111111",
        "accent-dim":            "rgba(17,17,17,0.06)",
        "brand-blue":            "#3b82f6",
        "text-primary":          "#111111",
        "text-secondary":        "#374151",
        "text-muted":            "#6b7280",
        "text-muted-soft":       "#898989",
        "on-dark":               "#ffffff",
        "on-dark-soft":          "#a1a1aa",
        "ff-red":                "#ef4444",
        "ff-blue":               "#3b82f6",
        muscle: {
          chest:     "#e53e3e",
          back:      "#2c9a93",
          legs:      "#b45309",
          shoulders: "#6d28d9",
          arms:      "#c2410c",
          core:      "#047857",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        heading: ["var(--font-inter)", "sans-serif"],
        body:    ["var(--font-inter)", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-xl":     ["4rem",   { lineHeight: "1.05", letterSpacing: "-0.05em" }],
        "display-lg":     ["3rem",   { lineHeight: "1.1",  letterSpacing: "-0.04em" }],
        "display-md":     ["2.25rem",{ lineHeight: "1.15", letterSpacing: "-0.03em" }],
        "display-sm":     ["1.75rem",{ lineHeight: "1.2",  letterSpacing: "-0.02em" }],
        "hero-mobile":    ["3rem",   { lineHeight: "1",    letterSpacing: "-0.02em" }],
        hero:             ["6rem",   { lineHeight: "1",    letterSpacing: "-0.02em" }],
        section:          ["3rem",   { lineHeight: "1.1",  letterSpacing: "-0.01em" }],
        "section-mobile": ["2rem",   { lineHeight: "1.1",  letterSpacing: "-0.01em" }],
      },
      spacing: {
        18:  "4.5rem",
        88:  "22rem",
        100: "25rem",
        120: "30rem",
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        card: "12px",
        pill: "9999px",
      },
      boxShadow: {
        card:          "0 1px 2px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)",
        "card-hover":  "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        "card-float":  "0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        "accent-glow":    "0 1px 2px rgba(0,0,0,0.05)",
        "accent-glow-sm": "0 1px 2px rgba(0,0,0,0.04)",
      },
      keyframes: {
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%":   { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-out-left": {
          "0%":   { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-30px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
        "count-up": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up":    "fade-in-up 0.4s ease-out forwards",
        "slide-in-right":"slide-in-right 0.3s ease-out forwards",
        "slide-out-left":"slide-out-left 0.3s ease-out forwards",
        pulse:           "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
