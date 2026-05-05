"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button, Card } from "@/components/ui";
import { CHAT_STARTERS } from "@/lib/constants";
import { ChatMessage } from "@/lib/types";
import { Send, Zap, User } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message || "Sorry, I couldn't process that." }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full pt-16 pb-20 md:pb-4">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-border">
          <h1 className="font-heading font-[800] text-xl uppercase flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />AI Coach
          </h1>
          <p className="text-text-muted text-xs">Ask anything about your program</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-16 h-16 rounded-2xl bg-accent-dim border border-accent/20 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-heading font-bold text-xl uppercase mb-2">Your AI Coach</h2>
              <p className="text-text-secondary text-sm text-center max-w-md mb-8">
                Ask about your program, exercise substitutions, volume adjustments, or any training question.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {CHAT_STARTERS.map((q, i) => (
                  <button key={i} onClick={() => send(q)}
                    className="px-3 py-2 rounded-lg text-xs border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-accent-dim border border-accent/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-black rounded-br-md"
                  : "bg-card border border-border text-text-secondary rounded-bl-md"
              }`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-elevated border border-border flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-text-muted" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-dim border border-accent/20 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-accent" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="px-4 md:px-6 py-3 border-t border-border bg-base">
          <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask your coach anything..."
              className="flex-1 bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10"
              disabled={loading} />
            <Button type="submit" disabled={loading || !input.trim()} className="px-4">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
