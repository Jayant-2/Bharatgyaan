import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/server/db/prisma";
import {
  Clock,
  BookOpen,
  ShieldCheck,
  Bookmark,
  CheckCircle,
  Sparkles,
  ArrowLeft,
  Share2,
  ExternalLink,
  ScrollText,
  AlertTriangle,
} from "lucide-react";
import { CLAIM_BADGES, ClaimType } from "@/lib/utils";
import { AskLessonAiPanel } from "./AskLessonAiPanel";
import { RelatedVideos, RelatedVideoItem } from "@/components/ui/RelatedVideos";

export const revalidate = 60;

interface LessonSection {
  type: string;
  title: string;
  claimType: ClaimType;
  content: string;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { slug },
    include: {
      topic: {
        include: {
          // Fetch all active topic-level videos for the fallback pool
          videos: {
            where: { status: "active" },
            orderBy: { sortOrder: "asc" },
          },
        },
      },
      subtopic: true,
      sources: {
        include: {
          source: true,
        },
      },
      keyTerms: {
        include: {
          keyTerm: true,
        },
      },
      // Fetch videos explicitly linked to this lesson via join table
      lessonVideos: {
        orderBy: { sortOrder: "asc" },
        include: {
          video: true,
        },
      },
    },
  });

  if (!lesson) {
    notFound();
  }

  // Build related-videos list: lesson-specific first, then topic-level to fill up to 10
  const lessonLinkedIds = new Set(lesson.lessonVideos.map((lv) => lv.videoId));
  const lessonLinkedVideos: RelatedVideoItem[] = lesson.lessonVideos.map((lv) => lv.video);
  const topicFillVideos: RelatedVideoItem[] = lesson.topic.videos
    .filter((v) => !lessonLinkedIds.has(v.id))
    .slice(0, Math.max(0, 10 - lessonLinkedVideos.length));
  const relatedVideos: RelatedVideoItem[] = [...lessonLinkedVideos, ...topicFillVideos];

  let bodySections: LessonSection[] = [];
  try {
    const parsed = JSON.parse(lesson.bodyJson);
    bodySections = parsed.sections || [];
  } catch (e) {
    bodySections = [];
  }

  const isMedical = lesson.topic.disclaimerType === "medical";
  const isPhysical = lesson.topic.disclaimerType === "physical_practice";

  return (
    <div className="py-10 bg-[#FFFDF9] dark:bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back and Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link
            href={`/topics/${lesson.topic.slug}`}
            className="inline-flex items-center gap-1 text-saffron-700 dark:text-saffron-400 font-semibold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {lesson.topic.title}</span>
          </Link>
          <span>/</span>
          <span className="text-stone-700 dark:text-stone-300 truncate max-w-xs">{lesson.title}</span>
        </div>

        {/* Safety Disclaimer Banner if applicable */}
        {(isMedical || isPhysical) && (
          <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Notice:</strong> This lesson is provided solely for academic and educational understanding of classical Indic traditions. It does not replace medical consultation or certified physical instruction.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Reading Column (Width ~70ch for optimal reading typography per Appendix A) */}
          <article className="lg:col-span-8 max-w-[72ch] space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 dark:text-saffron-400 bg-saffron-100 dark:bg-saffron-950/60 px-2.5 py-0.5 rounded-md">
                  {lesson.topic.title}
                </span>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs capitalize font-medium text-stone-500">
                  {lesson.difficulty} Level
                </span>
                <span className="text-xs text-stone-400">•</span>
                <span className="flex items-center gap-1 text-xs text-stone-500">
                  <Clock className="w-3.5 h-3.5" />
                  {lesson.estMinutes} mins reading time
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-stone-50 leading-tight">
                {lesson.title}
              </h1>

              {/* Geographical & Historical Anchor */}
              {(lesson.period || lesson.region) && (
                <div className="mt-3 flex items-center gap-3 text-xs text-stone-500">
                  {lesson.period && <span>Period: {lesson.period}</span>}
                  {lesson.period && lesson.region && <span>•</span>}
                  {lesson.region && <span>Geographic Region: {lesson.region}</span>}
                </div>
              )}
            </div>

            {/* Intro Lead Paragraph */}
            <div className="p-6 rounded-2xl bg-saffron-50/50 dark:bg-stone-900 border-l-4 border-saffron-600 text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-relaxed font-serif shadow-sm">
              {lesson.intro}
            </div>

            {/* Structured Content Sections with Claim-Type Badging (Section 7.5 & Appendix B) */}
            <div className="space-y-10">
              {bodySections.map((sec, idx) => {
                const claimType = sec.claimType || "scholarly";
                const badge = CLAIM_BADGES[claimType] || CLAIM_BADGES.scholarly;

                return (
                  <section key={idx} className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-2">
                      <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                        {sec.title}
                      </h2>
                      {/* Evidence Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badge.bgClass} ${badge.textClass} ${badge.borderClass}`}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        {badge.label}
                      </span>
                    </div>

                    <div className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line text-sm sm:text-base font-sans">
                      {sec.content}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Sanskrit Key Terms & Transliteration */}
            {lesson.keyTerms.length > 0 && (
              <div className="pt-8 border-t border-stone-200 dark:border-stone-800 space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <ScrollText className="w-5 h-5 text-saffron-600" />
                  <span>Key Sanskrit Technical Terms (Paribhasha)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lesson.keyTerms.map(({ keyTerm }) => (
                    <div
                      key={keyTerm.id}
                      className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm"
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                          {keyTerm.term}
                        </span>
                        {keyTerm.devanagari && (
                          <span className="text-sm text-saffron-700 dark:text-saffron-400 font-serif">
                            {keyTerm.devanagari}
                          </span>
                        )}
                      </div>
                      {keyTerm.transliteration && (
                        <span className="text-xs italic text-stone-500 block mb-1">
                          IAST: {keyTerm.transliteration}
                        </span>
                      )}
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                        {keyTerm.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Numbered References Linked to Source Registry */}
            {lesson.sources.length > 0 && (
              <div className="pt-8 border-t border-stone-200 dark:border-stone-800 space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Sources & References</span>
                </h3>
                <ol className="space-y-3">
                  {lesson.sources.map((ls, idx) => (
                    <li
                      key={ls.id}
                      className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300"
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-saffron-700 dark:text-saffron-400">
                          [{idx + 1}]
                        </span>
                        <div className="space-y-1">
                          <p className="font-semibold text-stone-900 dark:text-stone-100">
                            {ls.source.title} — {ls.source.authors} ({ls.source.year})
                          </p>
                          {ls.locator && (
                            <p className="text-stone-500">
                              Locator: <span className="font-mono text-stone-700 dark:text-stone-300">{ls.locator}</span>
                            </p>
                          )}
                          {ls.citationNote && (
                            <p className="italic text-stone-500">{ls.citationNote}</p>
                          )}
                          <Link
                            href="/sources"
                            className="inline-flex items-center gap-1 text-[11px] text-saffron-700 dark:text-saffron-400 hover:underline pt-1"
                          >
                            <span>View in Source Registry</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Related video lectures — lesson-linked first, topic fill-up to 10 */}
            <RelatedVideos
              videos={relatedVideos}
              heading={`Video Lectures: ${lesson.topic.title}`}
            />
          </article>

          {/* Right Column: "Ask AI About This Lesson" Panel & Action Controls (Section 7.5) */}
          <aside className="lg:col-span-4 space-y-6">
            <AskLessonAiPanel lessonTitle={lesson.title} lessonSlug={lesson.slug} />
          </aside>
        </div>
      </div>
    </div>
  );
}
