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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e5e7eb]">
        <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#111111]" />
            <span className="font-display font-bold text-xl tracking-tight text-[#111111]">FormForge</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#6b7280] hover:text-[#111111] text-sm font-medium transition-colors">Features</a>
            <a href="#pricing"  className="text-[#6b7280] hover:text-[#111111] text-sm font-medium transition-colors">Pricing</a>
            <a href="#faq"      className="text-[#6b7280] hover:text-[#111111] text-sm font-medium transition-colors">FAQ</a>
            <Link href="/auth/login" className="text-[#6b7280] hover:text-[#111111] text-sm font-medium transition-colors">
              Sign In
            </Link>
            <Link href="/auth/signup"
              className="bg-[#111111] text-white font-body font-semibold text-sm px-5 py-2 rounded-lg hover:bg-[#242424] transition-colors shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-64 z-50 bg-white border-r border-[#e5e7eb]">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2 mb-8">
            <Zap className="w-5 h-5 text-[#111111]" />
            <span className="font-display font-bold text-xl tracking-tight text-[#111111]">FormForge</span>
          </Link>
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    active
                      ? "text-[#111111] bg-[#f8f9fa] font-semibold border-l-2 border-[#111111]"
                      : "text-[#6b7280] hover:text-[#111111] hover:bg-[#f8f9fa] font-medium"
                  }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#e5e7eb]">
        <div className="flex items-center justify-around h-16 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1 min-w-[56px] ${active ? "text-[#111111]" : "text-[#9ca3af]"}`}>
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
