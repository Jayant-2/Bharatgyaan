import React from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck, Sparkles, HeartHandshake, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 bg-[#FFFDF9] dark:bg-[#0B0F19]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mission & Philosophy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-50">
            About BharatGyaan
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            An open educational platform bridging ancient Indian Knowledge Systems with contemporary scientific methodology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
              Source-Aware
            </h3>
            <p className="mt-2 text-xs text-stone-500 leading-relaxed">
              Every lesson maps directly to critical editions, manuscripts, and university publications.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm text-center">
            <Sparkles className="w-8 h-8 text-saffron-600 mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
              Grounded AI
            </h3>
            <p className="mt-2 text-xs text-stone-500 leading-relaxed">
              Our AI tutor only retrieves from admin-reviewed content, refusing to hallucinate or fabricate facts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm text-center">
            <HeartHandshake className="w-8 h-8 text-terracotta-600 mx-auto mb-3" />
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
              Student-First
            </h3>
            <p className="mt-2 text-xs text-stone-500 leading-relaxed">
              Structured paths designed for college/school students with clear progress tracking and no paywalls.
            </p>
          </div>
        </div>

        <div className="prose prose-stone dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-6">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            The Problem We Address
          </h2>
          <p>
            Online information regarding Indian Knowledge Systems is frequently scattered, exaggerated, or disconnected from primary textual evidence. Learners struggle to differentiate between authentic historical records, living traditional customs, scholarly hypotheses, and modern empirical studies.
          </p>
          <p>
            BharatGyaan solves this challenge by instituting strict claim-type labelling on every lesson section:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li><strong>Historical record:</strong> Inscriptions, archaeological findings, dated manuscripts.</li>
            <li><strong>Traditional belief:</strong> Oral lineage traditions and cultural practices.</li>
            <li><strong>Scholarly interpretation:</strong> Academic philological and historical critical consensus.</li>
            <li><strong>Modern scientific evidence:</strong> Laboratory experiments, genomic validations, and peer-reviewed trials.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
