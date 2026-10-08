import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Compass, BookOpen, Video, ArrowRight, Atom, HeartPulse, Palette, Layers, AlertTriangle } from "lucide-react";
import { getCategoryTree } from "@/server/services/content";

export const revalidate = 60;

export default async function ExplorePage() {
  const categories = await getCategoryTree();

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "knowledge-science":
        return <Atom className="w-5 h-5 text-amber-600" />;
      case "health-lifestyle":
        return <HeartPulse className="w-5 h-5 text-emerald-600" />;
      case "philosophy-education":
        return <Compass className="w-5 h-5 text-indigo-600" />;
      case "culture-arts":
        return <Palette className="w-5 h-5 text-orange-600" />;
      default:
        return <Layers className="w-5 h-5 text-stone-600" />;
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FFFDF9] dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-800 dark:text-saffron-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Curriculum Explorer</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
            Explore Indian Knowledge Systems
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-400">
            Browse our 4 master categories and 12 subject areas. Fully editable through administrative categories and grounded in peer-reviewed scholarship.
          </p>
        </div>

        {/* Categories Tree */}
        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category.id} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800">
                  {getCategoryIcon(category.slug)}
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {category.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.topics.map((topic) => {
                  const isHealthOrPractice = topic.disclaimerType !== "none";
                  return (
                    <Link
                      key={topic.id}
                      href={`/topics/${topic.slug}`}
                      className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-saffron-400 shadow-sm hover:shadow-lg transition-all duration-200"
                    >
                      <div className="relative h-44 w-full bg-stone-200 dark:bg-stone-800">
                        {topic.coverImageUrl && (
                          <Image
                            src={topic.coverImageUrl}
                            alt={topic.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                        {isHealthOrPractice && (
                          <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500 text-white shadow-sm">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{topic.disclaimerType === "medical" ? "Medical Notice" : "Practice Notice"}</span>
                          </span>
                        )}

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h3 className="font-serif text-lg font-bold group-hover:text-saffron-300 transition-colors">
                            {topic.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
                          {topic.summary}
                        </p>
                        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-saffron-600" />
                            {topic._count.lessons} Lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="w-3.5 h-3.5 text-indigo-600" />
                            {topic._count.videos} Videos
                          </span>
                          <span className="text-saffron-600 group-hover:translate-x-1 transition-transform">
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
