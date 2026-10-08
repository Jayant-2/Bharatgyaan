"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  ShieldCheck,
  ShieldAlert,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
  Bot,
  User,
  Info,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { CLAIM_BADGES, ClaimType } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: string[];
  claimType?: ClaimType;
  confidence?: number;
  isRefusal?: boolean;
  relatedLessons?: Array<{ title: string; slug: string }>;
  suggestedQuestions?: string[];
}

export default function TutorPage() {
  const [scope, setScope] = useState<"global" | "mathematics" | "ayurveda" | "yoga">("global");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro-msg",
      role: "assistant",
      content:
        "Namaste! I am the grounded AI Tutor for BharatGyaan. I answer inquiries strictly from reviewed primary sources, manuscripts, and administrative curriculum. I do not provide medical diagnosis or speculative claims. How can I guide your study of Indian Knowledge Systems today?",
      claimType: "scholarly",
      confidence: 1.0,
      suggestedQuestions: [
        "What is the Pythagorean theorem formulation in Baudhayana Sulba Sutras?",
        "How did Brahmagupta define mathematical zero in 628 CE?",
        "Explain the concept of Tridosha in Ayurveda.",
        "What did Aryabhata discover about the Earth's rotation?",
      ],
    },
  ]);

  const samplePrompts = [
    "What is the Pythagorean theorem formulation in Baudhayana Sulba Sutras?",
    "How was zero discovered in ancient India?",
    "Explain the concept of Tridosha in Ayurveda.",
    "What did Patanjali define as Yoga in the Yoga Sutras?",
    "Tell me about the Nalanda University entrance exam.",
    "What is the Delhi Iron Pillar and why doesn't it rust?",
    "Which herb cures diabetes?", // Triggers medical safety disclaimer
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          scope: scope,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to receive response from tutor");
      }

      const json = await res.json();
      const tutorData = json.data;

      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: tutorData.answer,
        citations: tutorData.citations,
        claimType: tutorData.claimType,
        confidence: tutorData.confidence,
        isRefusal: tutorData.isRefusal,
        relatedLessons: tutorData.relatedLessons,
        suggestedQuestions: tutorData.suggestedQuestions,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "An error occurred while accessing the knowledge base. Please check your network connection and try again.",
          isRefusal: true,
          confidence: 0,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FFFDF9] dark:bg-[#0B0F19] min-h-[calc(100vh-140px)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Grounded Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-stone-200 dark:border-stone-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>Grounded Knowledge Engine • Zero Speculation</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50">
              IKS AI Grounded Tutor
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Answers generated strictly from verified primary texts, manuscripts, and reviewed curriculum.
            </p>
          </div>

          {/* Scope Selector (Section 10) */}
          <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 p-1.5 rounded-xl text-xs font-medium">
            <span className="text-stone-400 pl-2">Scope:</span>
            <button
              type="button"
              onClick={() => setScope("global")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                scope === "global"
                  ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm font-semibold"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
              }`}
            >
              All IKS
            </button>
            <button
              type="button"
              onClick={() => setScope("mathematics")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                scope === "mathematics"
                  ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm font-semibold"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
              }`}
            >
              Mathematics
            </button>
            <button
              type="button"
              onClick={() => setScope("ayurveda")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                scope === "ayurveda"
                  ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm font-semibold"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
              }`}
            >
              Ayurveda
            </button>
            <button
              type="button"
              onClick={() => setScope("yoga")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                scope === "yoga"
                  ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm font-semibold"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
              }`}
            >
              Yoga
            </button>
          </div>
        </div>

        {/* Chat Window */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Flow (3 cols) */}
          <div className="lg:col-span-3 flex flex-col h-[650px] bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {messages.map((m) => {
                const isUser = m.role === "user";
                const badge = m.claimType ? CLAIM_BADGES[m.claimType] : null;

                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isUser
                          ? "bg-stone-800 text-white"
                          : "bg-saffron-600 text-white shadow-sm"
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                        isUser
                          ? "bg-stone-900 text-white"
                          : m.isRefusal
                          ? "bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-stone-800 dark:text-stone-200"
                          : "bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 text-stone-900 dark:text-stone-100"
                      }`}
                    >
                      {/* Evidence Badge if Assistant response */}
                      {!isUser && badge && (
                        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-stone-200/60 dark:border-stone-700/60">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge.bgClass} ${badge.textClass} ${badge.borderClass}`}
                          >
                            <ShieldCheck className="w-3 h-3" />
                            {badge.label}
                          </span>
                          {m.confidence && (
                            <span className="text-[10px] text-stone-400">
                              Confidence: {Math.round(m.confidence * 100)}%
                            </span>
                          )}
                        </div>
                      )}

                      <p className="whitespace-pre-line">{m.content}</p>

                      {/* Citations list under answer (Section 7.8 & 10) */}
                      {!isUser && m.citations && m.citations.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-stone-200/60 dark:border-stone-700/60 text-xs text-saffron-800 dark:text-saffron-300 space-y-1">
                          <span className="font-semibold text-[10px] uppercase tracking-wider block text-stone-400">
                            Citations & Primary Evidence:
                          </span>
                          {m.citations.map((c, i) => (
                            <div key={i} className="flex items-center gap-1 font-mono text-[11px]">
                              <span>[{i + 1}]</span>
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Related Lessons */}
                      {!isUser && m.relatedLessons && m.relatedLessons.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-stone-200/60 dark:border-stone-700/60 text-xs">
                          <span className="text-stone-400 text-[10px] uppercase font-semibold block mb-1">
                            Related Curriculum Lessons:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {m.relatedLessons.map((rl, idx) => (
                              <Link
                                key={idx}
                                href={`/lessons/${rl.slug}`}
                                className="px-2 py-0.5 rounded bg-saffron-100/70 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300 hover:underline inline-flex items-center gap-1 text-[11px]"
                              >
                                <span>{rl.title}</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggested Follow-up Prompts */}
                      {!isUser && m.suggestedQuestions && m.suggestedQuestions.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-stone-200/60 dark:border-stone-700/60 text-xs">
                          <span className="text-stone-400 text-[10px] uppercase font-semibold block mb-1">
                            Explore Next:
                          </span>
                          <div className="space-y-1">
                            {m.suggestedQuestions.map((sq, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleSend(sq)}
                                className="text-left text-[11px] text-saffron-700 dark:text-saffron-400 hover:underline block"
                              >
                                &bull; {sq}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-saffron-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 text-xs text-stone-500 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-saffron-600" />
                    <span>Searching verified primary texts and curriculum...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  disabled={isLoading}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about IKS (e.g. Baudhayana geometry, Zero, Aryabhata, Tridosha, Nalanda)..."
                  className="flex-1 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500 text-stone-900 dark:text-stone-100 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-5 py-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 disabled:opacity-50 text-white font-semibold text-sm flex items-center gap-1.5 shadow transition-all shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Send</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar / Recommended Questions (1 col) */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-wider">
                <Info className="w-4 h-4 text-saffron-600" />
                <span>Test Prompts</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Click any of these verified curriculum prompts to evaluate the grounded retrieval engine:
              </p>
              <div className="space-y-2">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleSend(p)}
                    className="w-full text-left p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-saffron-50 hover:text-saffron-800 dark:hover:bg-saffron-950/40 dark:hover:text-saffron-300 text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700 transition-colors disabled:opacity-50"
                  >
                    &ldquo;{p}&rdquo;
                  </button>
                ))}
              </div>
            </div>

            {/* Academic Safety Guardrail Note */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Safety Guardrails Enforced</span>
              </span>
              <p className="text-[11px] leading-relaxed">
                The tutor will politely refuse medical diagnosis, prescriptive dosages, prompt injections, and topics unsupported by reviewed citations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
