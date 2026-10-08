import React from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ArrowRight, Sparkles, Clock, ShieldCheck } from "lucide-react";

export default function IntroductionPage() {
  const syllabus = [
    { num: 1, title: "What is Indian Knowledge Systems (IKS)?", desc: "Definition, scope, foundational philosophy, and contemporary relevance.", duration: "10 mins" },
    { num: 2, title: "Chronology & Geopolitics of Ancient India", desc: "Harappan engineering, Vedic epochs, Classical Golden Age, and intellectual geography.", duration: "12 mins" },
    { num: 3, title: "Epistemology: The Pramanas (Theory of Knowledge)", desc: "Perception (Pratyaksha), Inference (Anumana), Analogy (Upamana), and Testimony (Shabda).", duration: "15 mins" },
    { num: 4, title: "Vedic Literature & The Six Vedangas", desc: "Shiksha, Kalpa, Vyakarana, Nirukta, Chhandas, and Jyotisha as intellectual tools.", duration: "14 mins" },
    { num: 5, title: "The Classical Darshanas (Six Systems of Philosophy)", desc: "Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta comparative inquiry.", duration: "18 mins" },
    { num: 6, title: "Indian Mathematics: From Sulba Sutras to Kerala School", desc: "The concept of Sunya (zero), decimal place-value, trigonometry, and infinite series.", duration: "16 mins" },
    { num: 7, title: "Astronomy & Timekeeping (Kalachakra)", desc: "Aryabhata, Varahamihira, planetary models, solar-lunar sidereal calendars, and yantras.", duration: "15 mins" },
    { num: 8, title: "Ayurveda: The Science of Life & Preventive Health", desc: "Panchamahabhuta, Tridosha harmony, Dinacharya daily rhythms, and herbal pharmacopeia.", duration: "14 mins" },
    { num: 9, title: "Classical Yoga: Cognitive Taxonomy & Mind Stillness", desc: "Patanjali's Ashtanga Yoga, Chitta-vritti-nirodha, and breath regulation physiology.", duration: "12 mins" },
    { num: 10, title: "Traditional Metallurgy & Materials Science", desc: "Wootz crucible steel, Delhi rustless iron pillar, zinc distillation, and bronze iconography.", duration: "14 mins" },
    { num: 11, title: "Architecture: Vastu Shastra & Sacred Geometry", desc: "Nagara and Dravidian temple acoustics, stepwells (Baolis), and urban town planning.", duration: "15 mins" },
    { num: 12, title: "Indian Agriculture & Eco-Centric Krishi Shastra", desc: "Soil classification, organic composting (Kunapajala), seed conservation, and monsoon astronomy.", duration: "12 mins" },
    { num: 13, title: "Universities of Ancient India: Nalanda & Takshashila", desc: "Residential university architecture, admission standards, libraries, and global students.", duration: "14 mins" },
    { num: 14, title: "Aesthetics & Performing Arts: The Natya Shastra", desc: "Bharata Muni's 8-9 Rasas, Bhavas, abhinaya, and theatrical dramaturgy.", duration: "13 mins" },
    { num: 15, title: "Linguistics: Panini's Generative Grammar (Ashtadhyayi)", desc: "Formal generative grammar, algorithmic rules, and phonetic classification of Sanskrit.", duration: "16 mins" },
    { num: 16, title: "Maritime Heritage & Trans-Oceanic Trade", desc: "Shipbuilding treatises (Yuktikalpataru), navigational stars, and Southeast Asian ties.", duration: "14 mins" },
    { num: 17, title: "IKS in the 21st Century: Modern Scientific Synthesis", desc: "Interdisciplinary NEP 2020 integration, sustainable technologies, and open research.", duration: "15 mins" },
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#FFFDF9] dark:bg-[#0B0F19]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Foundational Curriculum</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
            Introduction to IKS (Series)
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-400">
            A comprehensive, 17-part sequential journey through the intellectual traditions, methodologies, and scientific contributions of ancient and classical India.
          </p>
        </div>

        {/* Progress Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm mb-10">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
            <span>Course Progress</span>
            <span>0 of 17 Lessons Completed (0%)</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-saffron-600 to-terracotta-600 rounded-full w-[0%]" />
          </div>
        </div>

        {/* Lesson List */}
        <div className="space-y-4">
          {syllabus.map((lesson) => (
            <div
              key={lesson.num}
              className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-saffron-400 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300 font-bold text-sm flex items-center justify-center shrink-0">
                  {lesson.num}
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {lesson.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-stone-100 dark:border-stone-800">
                <span className="flex items-center gap-1 text-xs text-stone-400">
                  <Clock className="w-3.5 h-3.5" />
                  {lesson.duration}
                </span>
                <Link
                  href="/topics/mathematics"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-saffron-600 hover:bg-saffron-700 shadow-sm"
                >
                  Start Lesson
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
