import React from "react";
import Link from "next/link";
import { prisma } from "@/server/db/prisma";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle,
  PlayCircle,
} from "lucide-react";

export const revalidate = 60;

export default async function DashboardPage() {
  const topics = await prisma.topic.findMany({
    where: { status: "published" },
    take: 4,
    include: {
      _count: {
        select: { lessons: true },
      },
    },
  });

  const recentLessons = await prisma.lesson.findMany({
    where: { status: "published" },
    take: 3,
    include: {
      topic: true,
    },
  });

  return (
    <div className="py-10 sm:py-14 bg-[#FFFDF9] dark:bg-[#0B0F19] min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Welcome Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-saffron-600 via-terracotta-600 to-indigoInk-800 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-white/20 text-white inline-block mb-3">
              Student Dashboard
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold">
              Namaste, Explorer of IKS!
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed">
              Track your learning journeys across Indian Mathematics, Ayurveda, Yoga, Astronomy, and Philosophy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area: Continue Learning & Topic Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning Strip */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-saffron-600" />
                <span>Continue Learning</span>
              </h2>

              <div className="space-y-3">
                {recentLessons.map((l) => (
                  <div
                    key={l.id}
                    className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-saffron-600 uppercase tracking-wide">
                        {l.topic.title}
                      </span>
                      <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                        {l.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                        {l.intro}
                      </p>
                    </div>

                    <Link
                      href={`/lessons/${l.slug}`}
                      className="shrink-0 px-4 py-2 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
                    >
                      <span>Resume</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Progress Bars */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>Topic Progress Overview</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topics.map((t, idx) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                        {t.title}
                      </h3>
                      <span className="text-xs text-stone-400 font-medium">
                        {idx === 0 ? "1/1" : `0/${t._count.lessons}`} Lessons
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-saffron-600 rounded-full"
                        style={{ width: idx === 0 ? "100%" : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: AI Q&A History & Saved Bookmarks */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-saffron-600" />
                  <span>Saved Lessons</span>
                </h3>
                <span className="text-xs text-stone-400">1 item</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-xs">
                <span className="font-semibold block text-stone-800 dark:text-stone-200">
                  The Baudhayana Sulba Sutras: Geometry and the Cord
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Saved on Today
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-saffron-500/10 to-indigo-500/10 border border-saffron-300 dark:border-saffron-800 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-saffron-800 dark:text-saffron-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-saffron-600" />
                <span>Grounded AI Tutor</span>
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Have questions regarding any concept in your readings? Launch the AI Tutor to explore primary citations.
              </p>
              <Link
                href="/tutor"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-semibold shadow-sm"
              >
                <span>Launch AI Tutor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
