import React from "react";
import { prisma } from "@/server/db/prisma";
import { Database, ShieldCheck, ExternalLink, BookCheck, ScrollText } from "lucide-react";

export const revalidate = 60;

export default async function SourcesPage() {
  const sources = await prisma.source.findMany({
    where: { status: "active" },
    orderBy: { reliabilityTier: "asc" },
    include: {
      lessonSources: {
        include: {
          lesson: {
            select: { title: true, slug: true },
          },
        },
      },
    },
  });

  const getTierBadge = (tier: number) => {
    switch (tier) {
      case 1:
        return {
          label: "Tier 1: Primary Critical Text / Academic",
          classes: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200",
        };
      case 2:
        return {
          label: "Tier 2: Peer-Reviewed Institutional",
          classes: "bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200",
        };
      default:
        return {
          label: "Tier 3: Scholarly Reference",
          classes: "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300",
        };
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FFFDF9] dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Database className="w-3.5 h-3.5" />
            <span>Public Academic Registry</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
            Sources & Reference Registry
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-400">
            Every claim and lesson in BharatGyaan is mapped to verified primary manuscripts, critical editions, and university publications. No unsourced material is accepted.
          </p>
        </div>

        {/* Source Cards */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {sources.map((source) => {
            const tier = getTierBadge(source.reliabilityTier);
            return (
              <div
                key={source.id}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${tier.classes}`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{tier.label}</span>
                  </span>
                  <span className="text-xs uppercase font-semibold text-stone-400">
                    {source.sourceType.replace("_", " ")}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                  {source.title}
                </h2>

                <p className="mt-1 text-sm font-medium text-stone-700 dark:text-stone-300">
                  {source.authors} {source.year && `(${source.year})`}
                </p>

                {source.publisher && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Publisher: {source.publisher}
                  </p>
                )}

                {source.notes && (
                  <div className="mt-4 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-xs text-stone-600 dark:text-stone-300 border border-stone-100 dark:border-stone-800">
                    <strong className="text-stone-800 dark:text-stone-200">Editorial Note: </strong>
                    {source.notes}
                  </div>
                )}

                {/* Linked Lessons */}
                {source.lessonSources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2 flex-wrap text-xs">
                    <span className="text-stone-500 font-medium">Cited in:</span>
                    {source.lessonSources.map((ls, idx) => (
                      <a
                        key={idx}
                        href={`/lessons/${ls.lesson.slug}`}
                        className="px-2.5 py-1 rounded-md bg-saffron-50 dark:bg-saffron-950/40 text-saffron-800 dark:text-saffron-300 border border-saffron-200 dark:border-saffron-800 hover:underline"
                      >
                        {ls.lesson.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
