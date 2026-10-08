"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Bookmark,
  CheckCircle,
  Send,
  ArrowRight,
  Loader2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

interface AiResponseItem {
  prompt: string;
  answer: string;
  citations: string[];
  isRefusal: boolean;
  relatedLessons?: Array<{ title: string; slug: string }>;
}

export function AskLessonAiPanel({
  lessonTitle,
  lessonSlug,
}: {
  lessonTitle: string;
  lessonSlug: string;
}) {
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<AiResponseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const QUICK_PROMPTS = [
    "What is the main idea?",
    "Explain simply for a beginner",
    "Give a real-world example",
    "What to remember for exams?",
  ] as const;

  async function askAI(promptText: string) {
    if (!promptText.trim() || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/v1/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: promptText.trim(),
          // Pass lesson slug as scope so the retriever filters to this lesson's topic
          scope: lessonSlug,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        const msg = json?.error?.message ?? "Something went wrong. Please try again.";
        setError(msg);
        return;
      }

      const data = json.data;
      const newItem: AiResponseItem = {
        prompt: promptText,
        answer: data.answer ?? "No answer returned.",
        citations: Array.isArray(data.citations) ? data.citations : [],
        isRefusal: data.isRefusal ?? false,
        relatedLessons: data.relatedLessons,
      };

      setResponses((prev) => [newItem, ...prev]);

      // Announce to screen readers
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = "Answer ready: " + newItem.answer.slice(0, 100);
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleQuickPrompt(promptText: string) {
    askAI(promptText);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    askAI(query);
    setQuery("");
  }

  return (
    <div className="sticky top-24 space-y-6">
      {/* Accessibility live region */}
      <div
        ref={liveRegionRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Student Action Controls: Progress & Save */}
      <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <button
          type="button"
          onClick={() => setCompleted(!completed)}
          aria-pressed={completed}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
            completed
              ? "bg-emerald-600 text-white shadow"
              : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
          }`}
        >
          <CheckCircle className="w-4 h-4" aria-hidden="true" />
          <span>{completed ? "Lesson Completed!" : "Mark as Completed"}</span>
        </button>

        <button
          type="button"
          onClick={() => setBookmarked(!bookmarked)}
          aria-pressed={bookmarked}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 ${
            bookmarked
              ? "border-saffron-500 bg-saffron-50 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300"
              : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} aria-hidden="true" />
          <span>{bookmarked ? "Saved to Dashboard" : "Save / Bookmark"}</span>
        </button>
      </div>

      {/* Grounded Lesson AI Tutor */}
      <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-saffron-200 dark:border-stone-800 shadow-md space-y-4">
        {/* Panel header */}
        <div className="flex items-center gap-2">
          <div
            className="p-1.5 rounded-lg bg-saffron-100 dark:bg-saffron-950/60 text-saffron-700 dark:text-saffron-400"
            aria-hidden="true"
          >
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Ask AI About This Lesson
            </h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              Scoped to this lesson&apos;s topic
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-stone-400 dark:text-stone-500 leading-relaxed border border-stone-100 dark:border-stone-800 rounded-lg px-2.5 py-1.5">
          Educational assistant. Answers are grounded in the platform curriculum. Not medical advice.
        </p>

        {/* Quick Prompts */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
            Quick actions:
          </span>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Quick question prompts">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                disabled={loading}
                onClick={() => handleQuickPrompt(p)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-saffron-50 hover:text-saffron-800 dark:hover:bg-saffron-950/60 dark:hover:text-saffron-300 border border-stone-200 dark:border-stone-700 text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-1"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Custom question input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor={`ai-input-${lessonSlug}`} className="sr-only">
            Ask a question about {lessonTitle}
          </label>
          <input
            id={`ai-input-${lessonSlug}`}
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask about "${lessonTitle}"…`}
            disabled={loading}
            className="flex-1 min-w-0 text-xs px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-saffron-500 disabled:opacity-50"
            maxLength={500}
            aria-label={`Ask a question about ${lessonTitle}`}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            aria-label="Send question to AI tutor"
            className="shrink-0 p-2 rounded-xl bg-saffron-600 text-white hover:bg-saffron-700 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </form>

        {/* Error state */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span className="flex-1">{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              className="shrink-0 text-red-500 hover:text-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded"
              aria-label="Dismiss error"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div
            aria-busy="true"
            className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
            <span>Searching the curriculum…</span>
          </div>
        )}

        {/* Response stream */}
        {responses.length > 0 && (
          <div
            className="space-y-3 pt-2 max-h-72 overflow-y-auto pr-1"
            aria-label="AI tutor responses"
          >
            {responses.map((item, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-xs space-y-2 ${
                  item.isRefusal
                    ? "bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                    : "bg-saffron-50/60 dark:bg-stone-800/80 border-saffron-100 dark:border-stone-700"
                }`}
              >
                <div className="font-semibold text-stone-700 dark:text-stone-300">
                  Q: {item.prompt}
                </div>
                <div className="text-stone-700 dark:text-stone-200 leading-relaxed whitespace-pre-line">
                  {item.answer}
                </div>
                {item.citations.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-saffron-200/40 dark:border-stone-700">
                    {item.citations.map((c, ci) => (
                      <span
                        key={ci}
                        className="px-1.5 py-0.5 rounded bg-saffron-100 dark:bg-stone-700 text-saffron-800 dark:text-saffron-300 text-[10px] font-medium"
                      >
                        [{ci + 1}] {c}
                      </span>
                    ))}
                  </div>
                )}
                {item.relatedLessons && item.relatedLessons.length > 0 && (
                  <div className="pt-1 border-t border-saffron-200/40 dark:border-stone-700">
                    <p className="text-[10px] font-semibold text-stone-500 mb-1">Related lessons:</p>
                    <div className="flex flex-col gap-0.5">
                      {item.relatedLessons.slice(0, 2).map((l) => (
                        <Link
                          key={l.slug}
                          href={`/lessons/${l.slug}`}
                          className="text-[10px] text-saffron-700 dark:text-saffron-400 hover:underline"
                        >
                          → {l.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
          <Link
            href="/tutor"
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-saffron-700 dark:text-saffron-400 hover:underline py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-1 rounded"
          >
            <span>Open Full AI Tutor Chat</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
