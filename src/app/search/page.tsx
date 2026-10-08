import React from "react";
import Link from "next/link";
import { prisma } from "@/server/db/prisma";
import { Search, BookOpen, Clock, ArrowRight } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  const lessons = query
    ? await prisma.lesson.findMany({
        where: {
          status: "published",
          OR: [
            { title: { contains: query } },
            { intro: { contains: query } },
          ],
        },
        include: {
          topic: true,
        },
        take: 10,
      })
    : [];

  return (
    <div className="py-12 sm:py-16 bg-[#FFFDF9] dark:bg-[#0B0F19] min-h-[calc(100vh-140px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50">
            Search BharatGyaan Curriculum
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Search across verified lessons, technical Sanskrit terms, and primary sources.
          </p>
        </div>

        {/* Search Input Bar */}
        <form method="GET" action="/search" className="mb-10">
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search concepts (e.g. Baudhayana, Tridosha, Patanjali, Zero, Astronomy)..."
              className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-saffron-500 text-base"
            />
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-5 py-2 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-semibold shadow"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results */}
        {query && (
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Results for &ldquo;{query}&rdquo; ({lessons.length} found)
            </h2>

            {lessons.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center">
                <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  No verified lessons matching your query. Try searching for &ldquo;Baudhayana&rdquo;, &ldquo;Tridosha&rdquo;, or &ldquo;Yoga&rdquo;.
                </p>
              </div>
            ) : (
              lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.slug}`}
                  className="block p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-saffron-400 shadow-sm transition-all"
                >
                  <span className="text-[11px] font-bold text-saffron-600 uppercase tracking-wide">
                    {lesson.topic.title}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {lesson.intro}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.estMinutes} mins
                    </span>
                    <span className="text-saffron-600 font-semibold inline-flex items-center gap-1">
                      <span>Read lesson</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
