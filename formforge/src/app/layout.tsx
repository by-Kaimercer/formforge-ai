import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FormForge — AI-Powered Workout Programs Built on Real Science",
  description:
    "Get a scientifically-designed training program tailored to your body, goals, and equipment. Built on research from Schoenfeld, Israetel, Helms & more.",
  keywords: [
    "workout program",
    "AI training",
    "hypertrophy",
    "strength training",
    "progressive overload",
    "Jeff Nippard",
    "Mike Israetel",
  ],
  openGraph: {
    title: "FormForge — Your AI Strength Coach",
    description: "Scientific training programs tailored to you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}
