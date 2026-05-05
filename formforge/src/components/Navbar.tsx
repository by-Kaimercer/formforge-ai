"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, LayoutDashboard, ClipboardList, MessageSquare, Settings, Zap } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/program/demo", label: "Program", icon: ClipboardList },
  { href: "/tracker", label: "Track", icon: Dumbbell },
  { href: "/chat", label: "Coach", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/" || pathname === "/landing";

  if (isLanding) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-base/80 backdrop-blur-md border-b border-border">
        <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent" />
            <span className="font-heading font-bold text-xl uppercase tracking-wider text-text-primary">FormForge</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Features</a>
            <a href="#pricing" className="text-text-secondary hover:text-text-primary text-sm transition-colors">Pricing</a>
            <a href="#faq" className="text-text-secondary hover:text-text-primary text-sm transition-colors">FAQ</a>
            <Link href="/onboarding" className="bg-accent text-black font-heading font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg hover:brightness-110 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-base/90 backdrop-blur-md border-b border-border">
        <div className="max-w-content mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="font-heading font-bold text-lg uppercase tracking-wider">FormForge</span>
          </Link>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${active ? "text-accent bg-accent-dim" : "text-text-secondary hover:text-text-primary"}`}>
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around h-16 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1 min-w-[56px] ${active ? "text-accent" : "text-text-muted"}`}>
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
