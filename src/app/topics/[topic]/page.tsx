import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/server/db/prisma";
import {
  BookOpen,
  Video as VideoIcon,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { CLAIM_BADGES, ClaimType } from "@/lib/utils";

export const revalidate = 60;

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: slug } = await params;

  const topic = await prisma.topic.findUnique({
    where: { slug },
    include: {
      category: true,
      subtopics: {
        include: {
          lessons: {
            where: { status: "published" },
            include: {
              sources: {
                include: { source: true },
              },
            },
          },
        },
      },
      lessons: {
        where: { status: "published" },
        include: {
          sources: {
            include: { source: true },
          },
        },
      },
      videos: {
        where: { status: "active" },
      },
    },
  });

  if (!topic) {
    notFound();
  }

  const isMedical = topic.disclaimerType === "medical";
  const isPhysical = topic.disclaimerType === "physical_practice";

  return (
    <div className="py-10 sm:py-14 bg-[#FFFDF9] dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-stone-900 dark:hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/explore" className="hover:text-stone-900 dark:hover:text-white">Explore</Link>
          <span>/</span>
          <span className="text-saffron-700 dark:text-saffron-400 font-medium">{topic.title}</span>
        </div>

        {/* Safety Disclaimer Banner if Ayurveda or Yoga (Section 7.4) */}
        {(isMedical || isPhysical) && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
              <strong className="font-semibold block mb-0.5">
                {isMedical ? "Medical Disclaimer (Ayurveda):" : "Physical Practice & Safety Notice (Yoga):"}
              </strong>
              {isMedical
                ? "This course describes historical and classical Ayurvedic concepts and texts. It does NOT provide personal medical diagnosis, prescriptions, or dosages. Always seek the advice of a qualified physician or registered Ayurvedic doctor for any medical conditions."
                : "Classical yoga involves physical postures (asanas) and breath-control (pranayama) that should be learned under a qualified teacher. Individuals with spinal, cardiac, or respiratory issues should consult their healthcare provider prior to practice."}
            </div>
          </div>
        )}

        {/* Topic Header Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white p-8 sm:p-12 mb-12 shadow-xl border border-stone-800">
          {topic.coverImageUrl && (
            <Image
              src={topic.coverImageUrl}
              alt={topic.title}
              fill
              priority
              className="object-cover opacity-25"
            />
          )}
          <div className="relative z-10 max-w-3xl">
            <span className="px-3 py-1 rounded-md text-xs font-semibold bg-saffron-500/90 text-white uppercase tracking-wider mb-4 inline-block">
              {topic.category.name}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight">
              {topic.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-stone-300 leading-relaxed">
              {topic.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/tutor"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-stone-900 hover:bg-stone-100 shadow transition-colors"
              >
                <Sparkles className="w-4 h-4 text-saffron-600" />
                <span>Ask AI About {topic.title}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Lessons & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Lessons List (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-4 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Learning Path & Lessons
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Sequential, sourced curriculum modules for this discipline.
                </p>
              </div>
              <span className="text-xs font-semibold text-stone-500">
                {topic.lessons.length} {topic.lessons.length === 1 ? "Lesson" : "Lessons"}
              </span>
            </div>

            {topic.lessons.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center">
                <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">
                  Curriculum Coming Soon
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                  New lessons for {topic.title} are currently undergoing editorial and source verification in accordance with our academic guidelines.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {topic.lessons.map((lesson, idx) => {
                  const claimType = (lesson.sources[0]?.claimType as ClaimType) || "scholarly";
                  const badge = CLAIM_BADGES[claimType] || CLAIM_BADGES.scholarly;

                  return (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.slug}`}
                      className="group p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-saffron-400 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-saffron-600">
                            Lesson {idx + 1}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge.bgClass} ${badge.textClass} ${badge.borderClass}`}
                          >
                            <ShieldCheck className="w-3 h-3" />
                            {badge.label}
                          </span>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-saffron-600 transition-colors">
                          {lesson.title}
                        </h3>

                        <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                          {lesson.intro}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-stone-100 dark:border-stone-800 justify-between sm:justify-end text-xs text-stone-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {lesson.estMinutes} mins
                        </span>
                        <span className="w-7 h-7 rounded-full bg-saffron-50 dark:bg-saffron-950/60 text-saffron-700 flex items-center justify-center group-hover:bg-saffron-600 group-hover:text-white transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Video Resources for this Topic */}
            {topic.videos.length > 0 && (
              <div className="pt-8 border-t border-stone-200 dark:border-stone-800 space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <VideoIcon className="w-5 h-5 text-indigo-600" />
                  <span>Curated Video Lectures for {topic.title}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topic.videos.map((vid) => (
                    <a
                      key={vid.id}
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-indigo-400 flex items-center gap-3 group transition-all"
                    >
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-stone-950 shrink-0">
                        {vid.thumbnailUrl && (
                          <Image src={vid.thumbnailUrl} alt={vid.title} fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 line-clamp-2 group-hover:text-indigo-600">
                          {vid.title}
                        </h4>
                        <span className="text-[10px] text-stone-500 flex items-center gap-1 mt-1">
                          <span>{vid.channelName}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Tutor Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-saffron-500/10 via-terracotta-500/5 to-transparent border border-saffron-300 dark:border-saffron-800 shadow-sm">
              <div className="flex items-center gap-2 text-saffron-800 dark:text-saffron-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-saffron-600" />
                <span>Topic Tutor</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Ask Questions about {topic.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                Receive answers strictly grounded in the verified texts and scholarly articles for {topic.title}.
              </p>
              <Link
                href="/tutor"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-saffron-600 hover:bg-saffron-700 shadow-sm transition-colors"
              >
                <span>Launch Topic Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Subtopics Navigator */}
            {topic.subtopics.length > 0 && (
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                  Subtopics
                </h4>
                <ul className="space-y-2">
                  {topic.subtopics.map((st) => (
                    <li key={st.id} className="text-sm font-medium text-stone-700 dark:text-stone-300 flex items-center justify-between">
                      <span>{st.title}</span>
                      <span className="text-xs text-stone-400">({st.lessons.length})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
