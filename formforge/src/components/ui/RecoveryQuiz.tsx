"use client";
import React, { useState } from "react";
import { Card, Badge } from "@/components/ui";
import { Heart, Check, Sparkles } from "lucide-react";

const QUESTIONS = [
  {
    question: "What\u2019s the BEST way to reduce DOMS after a heavy leg day?",
    options: ["Ice bath immediately", "Light walking + stretching", "Complete rest for 48 hours", "Heavy training the next day"],
    correct: 1,
  },
  {
    question: "How much protein should you aim for per meal for optimal muscle protein synthesis?",
    options: ["10-15g", "20-40g", "60-80g", "As much as possible"],
    correct: 1,
  },
  {
    question: "Which factor matters MOST for muscle growth?",
    options: ["Supplements", "Progressive overload over time", "Training to failure every set", "Switching exercises every week"],
    correct: 1,
  },
];

interface RecoveryQuizProps {
  onComplete: (points: number) => void;
}

export default function RecoveryQuiz({ onComplete }: RecoveryQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = QUESTIONS[currentQ];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowResult(true);
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        const correct = newAnswers.filter((a, i) => a === QUESTIONS[i].correct).length;
        const pts = correct * 2; // 2 pts per correct answer
        setFinished(true);
        onComplete(pts);
      }
    }, 1200);
  };

  if (finished) {
    const correct = answers.filter((a, i) => a === QUESTIONS[i].correct).length;
    return (
      <Card hover={false} className="border-accent/20 text-center py-8">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 animate-bounce">
          <Sparkles className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-heading font-bold text-xl uppercase mb-2">Quiz Complete!</h3>
        <p className="text-text-secondary text-sm mb-3">
          You got <span className="text-accent font-bold">{correct}/{QUESTIONS.length}</span> correct
        </p>
        <Badge className="bg-[#111111] text-white border-none">+{correct * 2} Points Earned</Badge>
      </Card>
    );
  }

  return (
    <Card hover={false} className="border-accent/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent/20 flex items-center justify-center">
          <Heart className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-base uppercase">Recovery Quiz</h3>
          <p className="text-xs text-text-muted font-mono">REST DAY CHALLENGE • +2 PTS EACH</p>
        </div>
        <div className="ml-auto">
          <Badge className="bg-elevated text-text-secondary">
            {currentQ + 1}/{QUESTIONS.length}
          </Badge>
        </div>
      </div>

      <p className="text-sm text-text-primary font-medium mb-4">{q.question}</p>

      <div className="space-y-2 mb-4">
        {q.options.map((opt, i) => {
          let optClass = "bg-base border border-border hover:border-accent/50 cursor-pointer";
          if (showResult) {
            if (i === q.correct) optClass = "bg-green-500/10 border border-green-500/30";
            else if (i === selected && i !== q.correct) optClass = "bg-red-500/10 border border-red-500/30";
            else optClass = "bg-base border border-border opacity-50";
          } else if (i === selected) {
            optClass = "bg-accent/10 border border-accent/40";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left p-3 rounded-lg text-sm transition-all flex items-center gap-3 ${optClass}`}
            >
              <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center shrink-0 text-xs font-mono text-text-muted">
                {showResult && i === q.correct ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="text-text-primary">{opt}</span>
            </button>
          );
        })}
      </div>

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className={`w-full py-2.5 rounded-lg font-heading font-bold text-sm uppercase tracking-wider transition-all ${
            selected !== null
              ? "bg-[#111111] text-white hover:bg-[#242424]"
              : "bg-elevated text-text-muted cursor-not-allowed"
          }`}
        >
          Submit Answer
        </button>
      )}
    </Card>
  );
}
