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
        base: "#080808",
        card: "#111111",
        elevated: "#1A1A1A",
        border: "#222222",
        "border-hover": "#333333",
        accent: "#C8FF00",
        "accent-dim": "rgba(200,255,0,0.08)",
        "text-primary": "#F0F0F0",
        "text-secondary": "#888888",
        "text-muted": "#444444",
        "ff-red": "#FF3B3B",
        "ff-blue": "#3B82F6",
        muscle: {
          chest: "#FF6B6B",
          back: "#4ECDC4",
          legs: "#FFE66D",
          shoulders: "#A78BFA",
          arms: "#F97316",
          core: "#6EE7B7",
        },
      },
      fontFamily: {
        heading: ["var(--font-barlow)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "hero-mobile": ["3rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        hero: ["6rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        section: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "section-mobile": ["2rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        100: "25rem",
        120: "30rem",
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        "accent-glow": "0 0 30px rgba(200,255,0,0.2)",
        "accent-glow-sm": "0 0 15px rgba(200,255,0,0.15)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-out-left": {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-30px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "count-up": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out forwards",
        "slide-in-right": "slide-in-right 0.3s ease-out forwards",
        "slide-out-left": "slide-out-left 0.3s ease-out forwards",
        pulse: "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
